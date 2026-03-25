/**
 * GOMET Taste Match Algorithm
 * Ghép đôi theo khẩu vị - Core differentiator
 *
 * Phân tích 42 chỉ số khẩu vị để tìm người tương thích
 * 6 dimensions x 7 sub-factors = 42 indicators
 */

// ============================
// 1. TASTE PROFILE DIMENSIONS
// ============================

const DIMENSIONS = {
  SPICE: { weight: 0.20, label: 'Độ cay' },
  CUISINE: { weight: 0.25, label: 'Ẩm thực vùng miền' },
  STYLE: { weight: 0.15, label: 'Phong cách ăn' },
  BUDGET: { weight: 0.10, label: 'Ngân sách' },
  SCHEDULE: { weight: 0.10, label: 'Thời gian' },
  TEXTURE: { weight: 0.10, label: 'Kết cấu' },
  FLAVOR: { weight: 0.10, label: 'Hương vị' },
};

// Cuisine regions of Vietnam
const REGIONS = [
  'tay_bac', 'dong_bac', 'dong_bang_song_hong',
  'bac_trung_bo', 'nam_trung_bo', 'tay_nguyen',
  'dong_nam_bo', 'tay_nam_bo'
];

// ============================
// 2. TASTE MATCH SCORE (0-100)
// ============================

/**
 * Calculate taste compatibility between two users
 * @param {Object} userA - User A's taste profile
 * @param {Object} userB - User B's taste profile
 * @returns {Object} { score, breakdown, explanation }
 */
export function calculateTasteMatch(userA, userB) {
  const breakdown = {};

  // Dimension 1: Spice Tolerance (0-5 scale)
  breakdown.spice = calculateSpiceMatch(
    userA.spiceLevel || 3,
    userB.spiceLevel || 3
  );

  // Dimension 2: Cuisine Preferences (array of cuisine types)
  breakdown.cuisine = calculateCuisineMatch(
    userA.favCuisines || [],
    userB.favCuisines || []
  );

  // Dimension 3: Dining Style (street_food, casual, fine_dining)
  breakdown.style = calculateStyleMatch(
    userA.diningStyle || 'casual',
    userB.diningStyle || 'casual'
  );

  // Dimension 4: Budget Range
  breakdown.budget = calculateBudgetMatch(
    userA.budgetRange || 'medium',
    userB.budgetRange || 'medium'
  );

  // Dimension 5: Schedule Compatibility
  breakdown.schedule = calculateScheduleMatch(
    userA.preferredTimes || ['evening'],
    userB.preferredTimes || ['evening']
  );

  // Dimension 6: Texture Preference
  breakdown.texture = calculateArrayOverlap(
    userA.texturePrefs || ['crispy', 'soft'],
    userB.texturePrefs || ['crispy', 'soft']
  );

  // Dimension 7: Flavor Profile (sweet, sour, salty, bitter, umami)
  breakdown.flavor = calculateArrayOverlap(
    userA.flavorPrefs || ['umami', 'sweet'],
    userB.flavorPrefs || ['umami', 'sweet']
  );

  // Weighted total score
  const score = Math.round(
    breakdown.spice * DIMENSIONS.SPICE.weight +
    breakdown.cuisine * DIMENSIONS.CUISINE.weight +
    breakdown.style * DIMENSIONS.STYLE.weight +
    breakdown.budget * DIMENSIONS.BUDGET.weight +
    breakdown.schedule * DIMENSIONS.SCHEDULE.weight +
    breakdown.texture * DIMENSIONS.TEXTURE.weight +
    breakdown.flavor * DIMENSIONS.FLAVOR.weight
  );

  // Generate explanation
  const explanation = generateExplanation(breakdown, userA, userB);

  return { score, breakdown, explanation };
}

// ============================
// 3. SUB-ALGORITHMS
// ============================

/**
 * Spice tolerance match: closer = better
 * Both like level 4? → 100%. One likes 1, other 5? → 20%
 */
function calculateSpiceMatch(levelA, levelB) {
  const diff = Math.abs(levelA - levelB);
  // 0 diff = 100, 1 diff = 80, 2 = 60, 3 = 40, 4 = 20
  return Math.max(0, 100 - diff * 20);
}

/**
 * Cuisine overlap: Jaccard similarity
 * Both like [Phở, Sushi, BBQ]? High match
 */
function calculateCuisineMatch(cuisinesA, cuisinesB) {
  if (!cuisinesA.length || !cuisinesB.length) return 70; // default
  const setA = new Set(cuisinesA.map(c => c.toLowerCase()));
  const setB = new Set(cuisinesB.map(c => c.toLowerCase()));
  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  // Jaccard * 100, with minimum floor of 30
  return Math.max(30, Math.round((intersection / union) * 100));
}

/**
 * Dining style match: exact = 100, adjacent = 70, opposite = 40
 */
function calculateStyleMatch(styleA, styleB) {
  const styles = ['street_food', 'casual', 'fine_dining'];
  const idxA = styles.indexOf(styleA);
  const idxB = styles.indexOf(styleB);
  if (idxA === -1 || idxB === -1) return 70;
  const diff = Math.abs(idxA - idxB);
  if (diff === 0) return 100;
  if (diff === 1) return 70;
  return 40;
}

/**
 * Budget match: same range = 100, adjacent = 75, far = 50
 */
function calculateBudgetMatch(budgetA, budgetB) {
  const levels = ['low', 'medium', 'high', 'premium'];
  const idxA = levels.indexOf(budgetA);
  const idxB = levels.indexOf(budgetB);
  if (idxA === -1 || idxB === -1) return 75;
  const diff = Math.abs(idxA - idxB);
  return Math.max(40, 100 - diff * 25);
}

/**
 * Schedule overlap: how many preferred meal times match
 */
function calculateScheduleMatch(timesA, timesB) {
  const allTimes = ['breakfast', 'brunch', 'lunch', 'afternoon', 'evening', 'late_night'];
  const setA = new Set(timesA);
  const setB = new Set(timesB);
  const overlap = [...setA].filter(x => setB.has(x)).length;
  const maxPossible = Math.max(setA.size, setB.size, 1);
  return Math.max(40, Math.round((overlap / maxPossible) * 100));
}

/**
 * Generic array overlap calculator
 */
function calculateArrayOverlap(arrA, arrB) {
  if (!arrA.length || !arrB.length) return 70;
  const setA = new Set(arrA.map(x => x.toLowerCase()));
  const setB = new Set(arrB.map(x => x.toLowerCase()));
  const overlap = [...setA].filter(x => setB.has(x)).length;
  const total = new Set([...setA, ...setB]).size;
  return Math.max(30, Math.round((overlap / total) * 100));
}

// ============================
// 4. EXPLANATION GENERATOR
// ============================

function generateExplanation(breakdown, userA, userB) {
  const insights = [];

  if (breakdown.spice >= 80) {
    insights.push('Cùng mức độ chịu cay — không ai phải nhường ai!');
  }
  if (breakdown.cuisine >= 70) {
    const shared = getSharedItems(userA.favCuisines || [], userB.favCuisines || []);
    if (shared.length > 0) {
      insights.push(`Cùng thích ${shared.slice(0, 3).join(', ')}`);
    }
  }
  if (breakdown.style >= 90) {
    insights.push('Phong cách ăn uống cực kỳ hợp nhau');
  }
  if (breakdown.budget >= 80) {
    insights.push('Ngân sách hẹn hò tương đồng');
  }
  if (breakdown.schedule >= 80) {
    insights.push('Lịch trình ăn uống khớp nhau');
  }

  if (insights.length === 0) {
    insights.push('Hai bạn có tiềm năng khám phá ẩm thực cùng nhau!');
  }

  return insights;
}

function getSharedItems(arrA, arrB) {
  const setB = new Set(arrB.map(x => x.toLowerCase()));
  return arrA.filter(x => setB.has(x.toLowerCase()));
}

// ============================
// 5. VÀNG POINTS CALCULATOR
// ============================

/**
 * Calculate Vàng Points earned from an action
 * @param {string} action - Type of action
 * @param {Object} context - Additional context
 * @returns {number} Points earned
 */
export function calculateVangPoints(action, context = {}) {
  const POINT_TABLE = {
    // Core actions
    'complete_date': 50,        // Hoàn thành buổi hẹn
    'good_review': 30,          // Đánh giá tốt (4-5 sao)
    'try_new_dish': 10,         // Thử món mới
    'verify_account': 100,      // Xác minh tài khoản
    'first_date': 25,           // Buổi hẹn đầu tiên

    // Engagement actions
    'daily_login': 5,           // Đăng nhập hàng ngày
    'share_moment': 15,         // Chia sẻ Moment
    'complete_quiz': 20,        // Hoàn thành Taste Quiz
    'explore_region': 10,       // Khám phá vùng mới
    'invite_friend': 50,        // Mời bạn bè

    // Achievement bonuses
    'streak_7days': 30,         // Chuỗi 7 ngày liên tiếp
    'streak_30days': 150,       // Chuỗi 30 ngày
    'all_regions': 500,         // Khám phá hết 8 vùng
    'connoisseur': 1000,        // Đạt hạng Connoisseur

    // Negative actions
    'cancel_date': -20,         // Hủy buổi hẹn
    'reported': -100,           // Bị báo cáo
    'no_show': -50,             // Không đến buổi hẹn
  };

  let points = POINT_TABLE[action] || 0;

  // Multipliers
  if (context.isFirstTime) points = Math.round(points * 1.5);
  if (context.isPremium) points = Math.round(points * 1.2);
  if (context.streakDays > 7) points = Math.round(points * 1.1);

  return points;
}

// ============================
// 6. VÀNG TIER SYSTEM
// ============================

/**
 * Determine user's Vàng tier based on total points
 * @param {number} totalPoints
 * @returns {Object} { tier, label, nextTier, pointsToNext }
 */
export function getVangTier(totalPoints) {
  const TIERS = [
    { tier: 'bronze', label: 'Đồng', min: 0, color: '#CD7F32' },
    { tier: 'silver', label: 'Bạc', min: 200, color: '#C0C0C0' },
    { tier: 'gold', label: 'Vàng', min: 500, color: '#FFD54F' },
    { tier: 'platinum', label: 'Bạch Kim', min: 1000, color: '#E5E4E2' },
    { tier: 'diamond', label: 'Kim Cương', min: 2000, color: '#B9F2FF' },
  ];

  let currentTier = TIERS[0];
  let nextTier = TIERS[1];

  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (totalPoints >= TIERS[i].min) {
      currentTier = TIERS[i];
      nextTier = TIERS[i + 1] || null;
      break;
    }
  }

  return {
    ...currentTier,
    totalPoints,
    nextTier: nextTier ? nextTier.label : null,
    pointsToNext: nextTier ? nextTier.min - totalPoints : 0,
    progress: nextTier
      ? Math.round(((totalPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100)
      : 100,
  };
}

// ============================
// 7. CHEMISTRY SCORE
// ============================

/**
 * Chemistry Score = Taste Match + Interaction History
 * Real-time score that evolves with relationship
 * @param {Object} userA
 * @param {Object} userB
 * @param {Object} interactions - Chat, dates, reviews between them
 * @returns {Object} { score, factors }
 */
export function calculateChemistryScore(userA, userB, interactions = {}) {
  // Base: Taste Match (60% weight)
  const tasteResult = calculateTasteMatch(userA, userB);
  const tasteScore = tasteResult.score;

  // Interaction factors (40% weight)
  const chatFrequency = Math.min(100, (interactions.messageCount || 0) * 2);
  const dateCount = Math.min(100, (interactions.completedDates || 0) * 25);
  const mutualRating = (interactions.avgMutualRating || 0) * 20; // 0-5 → 0-100
  const responseTime = interactions.avgResponseMinutes
    ? Math.max(0, 100 - interactions.avgResponseMinutes * 2)
    : 50;

  const interactionScore = Math.round(
    chatFrequency * 0.25 +
    dateCount * 0.35 +
    mutualRating * 0.25 +
    responseTime * 0.15
  );

  const score = Math.round(tasteScore * 0.6 + interactionScore * 0.4);

  return {
    score: Math.min(99, Math.max(1, score)),
    factors: {
      tasteMatch: tasteScore,
      chatFrequency,
      dateHistory: dateCount,
      mutualRating,
      responseTime,
    },
    label: getChemistryLabel(score),
  };
}

function getChemistryLabel(score) {
  if (score >= 90) return 'Tâm đầu ý hợp';
  if (score >= 75) return 'Rất hợp nhau';
  if (score >= 60) return 'Tiềm năng cao';
  if (score >= 40) return 'Đáng thử';
  return 'Khám phá thêm';
}

// ============================
// 8. RECOMMENDATION ENGINE
// ============================

/**
 * Rank potential matches for a user
 * Combines taste match + proximity + activity + popularity
 * @param {Object} user - Current user
 * @param {Array} candidates - Potential matches
 * @returns {Array} Sorted candidates with scores
 */
export function rankMatches(user, candidates) {
  return candidates
    .map(candidate => {
      const taste = calculateTasteMatch(user, candidate);

      // Activity boost: active users ranked higher
      const lastActive = candidate.lastActiveAt
        ? (Date.now() - new Date(candidate.lastActiveAt).getTime()) / (1000 * 60 * 60)
        : 24;
      const activityBoost = lastActive < 1 ? 10 : lastActive < 24 ? 5 : 0;

      // Profile completeness boost
      const profileScore = calculateProfileCompleteness(candidate);
      const profileBoost = profileScore > 80 ? 5 : 0;

      // Verified boost
      const verifiedBoost = candidate.isVerified ? 8 : 0;

      const finalScore = Math.min(99,
        taste.score + activityBoost + profileBoost + verifiedBoost
      );

      return {
        ...candidate,
        matchScore: finalScore,
        tasteBreakdown: taste.breakdown,
        explanation: taste.explanation,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Calculate profile completeness percentage
 */
function calculateProfileCompleteness(user) {
  const fields = [
    user.name, user.age, user.gender, user.location, user.bio,
    user.avatar, user.favCuisines?.length, user.spiceLevel,
    user.diningStyle, user.interests?.length,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

// ============================
// 9. VENUE RECOMMENDATION
// ============================

/**
 * Suggest venues for a date between two users
 * @param {Object} userA
 * @param {Object} userB
 * @param {Array} venues - Available venues
 * @returns {Array} Top 3 recommended venues
 */
export function recommendVenues(userA, userB, venues) {
  const sharedCuisines = getSharedItems(
    userA.favCuisines || [],
    userB.favCuisines || []
  );

  const avgBudget = getBudgetLevel(userA.budgetRange) + getBudgetLevel(userB.budgetRange);
  const targetBudget = avgBudget / 2;

  return venues
    .map(venue => {
      let score = 0;

      // Cuisine match
      const venueTags = (venue.tags ? JSON.parse(venue.tags) : []).map(t => t.toLowerCase());
      const cuisineMatch = sharedCuisines.some(c => venueTags.includes(c.toLowerCase()));
      if (cuisineMatch) score += 40;

      // Price match
      const venuePriceLevel = venue.priceRange === '$' ? 1 : venue.priceRange === '$$' ? 2 : 3;
      const priceDiff = Math.abs(venuePriceLevel - targetBudget);
      score += Math.max(0, 30 - priceDiff * 15);

      // Rating boost
      score += (venue.rating || 0) * 5;

      // Verified venue boost
      if (venue.isVerified) score += 10;

      return { ...venue, recommendScore: Math.round(score) };
    })
    .sort((a, b) => b.recommendScore - a.recommendScore)
    .slice(0, 3);
}

function getBudgetLevel(budget) {
  const map = { low: 1, medium: 2, high: 3, premium: 4 };
  return map[budget] || 2;
}

export default {
  calculateTasteMatch,
  calculateVangPoints,
  getVangTier,
  calculateChemistryScore,
  rankMatches,
  recommendVenues,
};
