import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/users/profiles - Swipe deck
router.get('/profiles', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get IDs already swiped
    const swiped = await prisma.swipe.findMany({
      where: { senderId: req.user.id },
      select: { targetId: true },
    });
    const swipedIds = swiped.map(s => s.targetId);

    // Get blocked user IDs (both directions)
    const blocks = await prisma.block.findMany({
      where: {
        OR: [
          { blockerId: req.user.id },
          { blockedId: req.user.id },
        ],
      },
      select: { blockerId: true, blockedId: true },
    });
    const blockedIds = blocks.map(b =>
      b.blockerId === req.user.id ? b.blockedId : b.blockerId
    );

    const profiles = await prisma.user.findMany({
      where: {
        id: { notIn: [req.user.id, ...swipedIds, ...blockedIds] },
        role: { not: 'admin' },
      },
      include: { images: { orderBy: { order: 'asc' } } },
      skip,
      take: limit,
    });

    const cleaned = profiles.map(({ password, ...rest }) => ({
      ...rest,
      interests: rest.interests ? JSON.parse(rest.interests) : [],
    }));
    res.json({ profiles: cleaned });
  } catch (err) {
    console.error('Get profiles error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/users/matches
router.get('/matches', async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { user1Id: req.user.id },
          { user2Id: req.user.id },
        ],
      },
    });

    const otherIds = matches.map(m =>
      m.user1Id === req.user.id ? m.user2Id : m.user1Id
    );

    const users = await prisma.user.findMany({
      where: { id: { in: otherIds } },
      include: { images: { orderBy: { order: 'asc' } } },
    });

    const cleaned = users.map(({ password, ...rest }) => ({
      ...rest,
      interests: rest.interests ? JSON.parse(rest.interests) : [],
    }));
    res.json({ matches: cleaned });
  } catch (err) {
    console.error('Get matches error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { images: { orderBy: { order: 'asc' } } },
    });

    if (!user) return res.status(404).json({ error: 'User không tồn tại' });

    const { password, ...cleaned } = user;
    cleaned.interests = cleaned.interests ? JSON.parse(cleaned.interests) : [];
    res.json({ user: cleaned });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// PUT /api/users/me
router.put('/me', async (req, res) => {
  try {
    const { name, age, gender, location, bio, interests } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(age !== undefined && { age: parseInt(age) }),
        ...(gender !== undefined && { gender }),
        ...(location !== undefined && { location }),
        ...(bio !== undefined && { bio }),
        ...(interests !== undefined && { interests: JSON.stringify(interests) }),
      },
      include: { images: { orderBy: { order: 'asc' } } },
    });

    const { password, ...cleaned } = updated;
    cleaned.interests = cleaned.interests ? JSON.parse(cleaned.interests) : [];
    res.json({ user: cleaned });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
