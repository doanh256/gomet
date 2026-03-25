import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';
import {
  calculateTasteMatch,
  calculateVangPoints,
  getVangTier,
  calculateChemistryScore,
  recommendVenues,
} from '../algorithms/tasteMatch.js';
import { generateIceBreakers } from '../algorithms/iceBreaker.js';
import {
  calculateRegionalProgress,
  generateDailyChallenges,
} from '../algorithms/regionalQuest.js';

const prisma = new PrismaClient();
const router = Router();

// All routes require authentication
router.use(authMiddleware);

// ============================================
// 1. GET /taste-match/:targetId
//    Calculate taste match between current user and target
// ============================================
router.get('/taste-match/:targetId', async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { targetId } = req.params;

    const [currentUser, targetUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUserId } }),
      prisma.user.findUnique({ where: { id: targetId } }),
    ]);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    // Parse JSON fields stored as strings
    const userA = parseUserTasteProfile(currentUser);
    const userB = parseUserTasteProfile(targetUser);

    const result = calculateTasteMatch(userA, userB);

    res.json({
      score: result.score,
      breakdown: result.breakdown,
      explanation: result.explanation,
    });
  } catch (err) {
    console.error('Error calculating taste match:', err);
    res.status(500).json({ error: 'Lỗi tính toán taste match' });
  }
});

// ============================================
// 2. GET /chemistry/:targetId
//    Calculate chemistry score (taste + interactions)
// ============================================
router.get('/chemistry/:targetId', async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { targetId } = req.params;

    const [currentUser, targetUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUserId } }),
      prisma.user.findUnique({ where: { id: targetId } }),
    ]);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    // Gather interaction history between the two users
    // Find conversations they share
    const sharedConversations = await prisma.conversation.findMany({
      where: {
        members: {
          every: {
            userId: { in: [currentUserId, targetId] },
          },
        },
      },
      include: {
        members: true,
      },
    });

    const sharedConvoIds = sharedConversations
      .filter(c => {
        const memberIds = c.members.map(m => m.userId);
        return memberIds.includes(currentUserId) && memberIds.includes(targetId);
      })
      .map(c => c.id);

    // Count messages between them
    const messageCount = sharedConvoIds.length > 0
      ? await prisma.message.count({
          where: {
            conversationId: { in: sharedConvoIds },
          },
        })
      : 0;

    // Count completed dates (date posts where both participated and status is completed)
    const completedDates = await prisma.datePost.count({
      where: {
        status: 'completed',
        OR: [
          { authorId: currentUserId, applications: { some: { applicantId: targetId, status: 'accepted' } } },
          { authorId: targetId, applications: { some: { applicantId: currentUserId, status: 'accepted' } } },
        ],
      },
    });

    const interactions = {
      messageCount,
      completedDates,
      avgMutualRating: 0, // No rating model yet, default
      avgResponseMinutes: null,
    };

    const userA = parseUserTasteProfile(currentUser);
    const userB = parseUserTasteProfile(targetUser);

    const result = calculateChemistryScore(userA, userB, interactions);

    res.json({
      score: result.score,
      factors: result.factors,
      label: result.label,
    });
  } catch (err) {
    console.error('Error calculating chemistry:', err);
    res.status(500).json({ error: 'Lỗi tính toán chemistry score' });
  }
});

// ============================================
// 3. GET /ice-breakers/:targetId
//    Get ice breaker suggestions for a match
// ============================================
router.get('/ice-breakers/:targetId', async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { targetId } = req.params;

    const [currentUser, targetUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUserId } }),
      prisma.user.findUnique({ where: { id: targetId } }),
    ]);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    const sender = parseUserTasteProfile(currentUser);
    const receiver = parseUserTasteProfile(targetUser);

    const suggestions = generateIceBreakers(sender, receiver);

    res.json({ suggestions });
  } catch (err) {
    console.error('Error generating ice breakers:', err);
    res.status(500).json({ error: 'Lỗi tạo gợi ý ice breaker' });
  }
});

// ============================================
// 4. GET /my-vang
//    Get current user's Vang tier and points
// ============================================
router.get('/my-vang', async (req, res) => {
  try {
    const userId = req.user.id;

    // Sum all transaction amounts as total points
    const result = await prisma.transaction.aggregate({
      where: { userId },
      _sum: { amount: true },
    });

    const totalPoints = result._sum.amount || 0;
    const tierInfo = getVangTier(totalPoints);

    res.json({
      tier: tierInfo.tier,
      label: tierInfo.label,
      totalPoints: tierInfo.totalPoints,
      progress: tierInfo.progress,
      nextTier: tierInfo.nextTier,
      pointsToNext: tierInfo.pointsToNext,
    });
  } catch (err) {
    console.error('Error fetching Vang tier:', err);
    res.status(500).json({ error: 'Lỗi lấy thông tin Vàng' });
  }
});

// ============================================
// 5. POST /vang/earn
//    Earn Vang points for an action
// ============================================
router.post('/vang/earn', async (req, res) => {
  try {
    const userId = req.user.id;
    const { action } = req.body;

    if (!action) {
      return res.status(400).json({ error: 'Thiếu trường action' });
    }

    const pointsEarned = calculateVangPoints(action);

    if (pointsEarned === 0) {
      return res.status(400).json({ error: 'Hành động không hợp lệ' });
    }

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId,
        type: 'vang_earn',
        amount: pointsEarned,
        description: `Vàng: ${action}`,
      },
    });

    // Update wallet balance
    await prisma.user.update({
      where: { id: userId },
      data: { walletBalance: { increment: pointsEarned } },
    });

    // Calculate new total and tier
    const totalResult = await prisma.transaction.aggregate({
      where: { userId },
      _sum: { amount: true },
    });

    const newBalance = totalResult._sum.amount || 0;
    const tierInfo = getVangTier(newBalance);

    res.json({
      pointsEarned,
      newBalance,
      tier: tierInfo.tier,
    });
  } catch (err) {
    console.error('Error earning Vang points:', err);
    res.status(500).json({ error: 'Lỗi cộng điểm Vàng' });
  }
});

// ============================================
// 6. GET /regional-progress
//    Get user's regional exploration progress
// ============================================
router.get('/regional-progress', async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's tried dishes from transactions with type 'try_dish'
    const dishTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'vang_earn',
        description: { startsWith: 'Vàng: try_new_dish' },
      },
    });

    // For now, extract dish names from transaction descriptions
    // In a full implementation, there would be a separate TriedDish model
    // Use interests field as a fallback for tried dishes
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const triedDishes = safeParseJSON(user?.interests, [])
      .filter(i => typeof i === 'string');

    const progress = calculateRegionalProgress(user, triedDishes);

    res.json({
      regions: progress.regions,
      completedRegions: progress.completedRegions,
      totalRegions: progress.totalRegions,
      overallProgress: progress.overallProgress,
      badges: progress.badges,
      totalVangEarned: progress.totalVangEarned,
    });
  } catch (err) {
    console.error('Error fetching regional progress:', err);
    res.status(500).json({ error: 'Lỗi lấy tiến trình vùng miền' });
  }
});

// ============================================
// 7. GET /daily-challenges
//    Get today's challenges for the user
// ============================================
router.get('/daily-challenges', async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const triedDishes = safeParseJSON(user?.interests, [])
      .filter(i => typeof i === 'string');

    const progress = calculateRegionalProgress(user, triedDishes);
    const challenges = generateDailyChallenges(progress);

    res.json({ challenges });
  } catch (err) {
    console.error('Error generating daily challenges:', err);
    res.status(500).json({ error: 'Lỗi tạo thử thách hàng ngày' });
  }
});

// ============================================
// 8. GET /venue-recommend/:targetId
//    Recommend venues for a date between two users
// ============================================
router.get('/venue-recommend/:targetId', async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { targetId } = req.params;

    const [currentUser, targetUser, venues] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUserId } }),
      prisma.user.findUnique({ where: { id: targetId } }),
      prisma.venue.findMany({ orderBy: { rating: 'desc' } }),
    ]);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    const userA = parseUserTasteProfile(currentUser);
    const userB = parseUserTasteProfile(targetUser);

    const recommended = recommendVenues(userA, userB, venues);

    res.json({ venues: recommended });
  } catch (err) {
    console.error('Error recommending venues:', err);
    res.status(500).json({ error: 'Lỗi gợi ý địa điểm' });
  }
});

// ============================================
// HELPERS
// ============================================

function safeParseJSON(str, fallback = []) {
  if (!str) return fallback;
  if (Array.isArray(str)) return str;
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Parse user record into taste profile object expected by algorithms.
 * The Prisma User model stores arrays as JSON strings in `interests`.
 */
function parseUserTasteProfile(user) {
  const interests = safeParseJSON(user.interests, []);

  return {
    id: user.id,
    name: user.name,
    location: user.location || 'TP.HCM',
    // Taste profile fields — stored in interests JSON or defaults
    spiceLevel: user.spiceLevel ?? 3,
    favCuisines: user.favCuisines ? safeParseJSON(user.favCuisines) : interests,
    diningStyle: user.diningStyle || 'casual',
    budgetRange: user.budgetRange || 'medium',
    preferredTimes: user.preferredTimes ? safeParseJSON(user.preferredTimes) : ['evening'],
    texturePrefs: user.texturePrefs ? safeParseJSON(user.texturePrefs) : ['crispy', 'soft'],
    flavorPrefs: user.flavorPrefs ? safeParseJSON(user.flavorPrefs) : ['umami', 'sweet'],
    // Extra fields for recommendation engine
    lastActiveAt: user.updatedAt,
    isVerified: user.isVerified ?? false,
    age: user.age,
    gender: user.gender,
    bio: user.bio,
    avatar: user.avatar,
  };
}

export default router;
