/**
 * GOMET Regional Quest Algorithm
 * Hệ thống khám phá 8 vùng ẩm thực Việt Nam
 */

// ============================
// 1. VIETNAM'S 8 CULINARY REGIONS
// ============================

export const REGIONS = [
  {
    id: 'tay_bac',
    name: 'Tây Bắc',
    emoji: '🏔️',
    signatureDishes: ['Thắng cố', 'Xôi ngũ sắc', 'Pa pỉnh tộp', 'Cơm lam', 'Rượu táo mèo'],
    description: 'Hương vị khói và đất của ẩm thực núi',
    requiredDishes: 3,
    vangReward: 100,
  },
  {
    id: 'dong_bac',
    name: 'Đông Bắc',
    emoji: '🌿',
    signatureDishes: ['Phở chua Lạng Sơn', 'Khâu nhục', 'Bánh coóng', 'Vịt quay Lạng Sơn', 'Xôi trám'],
    description: 'Ẩm thực biên giới đậm đà',
    requiredDishes: 3,
    vangReward: 100,
  },
  {
    id: 'dong_bang_song_hong',
    name: 'Đồng Bằng Sông Hồng',
    emoji: '🍜',
    signatureDishes: ['Phở Hà Nội', 'Bún chả', 'Bánh cuốn', 'Chả cá Lã Vọng', 'Bún thang', 'Bánh tôm Hồ Tây', 'Kem Tràng Tiền'],
    description: 'Tinh hoa ẩm thực ngàn năm Thăng Long',
    requiredDishes: 5,
    vangReward: 150,
  },
  {
    id: 'bac_trung_bo',
    name: 'Bắc Trung Bộ',
    emoji: '🌶️',
    signatureDishes: ['Bún bò Huế', 'Cơm hến', 'Bánh bèo', 'Bánh nậm', 'Chè Huế'],
    description: 'Đất cay — nơi hương vị mạnh mẽ nhất',
    requiredDishes: 3,
    vangReward: 100,
  },
  {
    id: 'nam_trung_bo',
    name: 'Nam Trung Bộ',
    emoji: '🐟',
    signatureDishes: ['Mì Quảng', 'Cao lầu', 'Bánh tráng cuốn thịt heo', 'Cơm gà Hội An', 'Bê thui Cầu Mống'],
    description: 'Biển và phố cổ hòa quyện',
    requiredDishes: 3,
    vangReward: 100,
  },
  {
    id: 'tay_nguyen',
    name: 'Tây Nguyên',
    emoji: '☕',
    signatureDishes: ['Cơm lam', 'Gà nướng Tây Nguyên', 'Rượu cần', 'Phở khô Gia Lai', 'Cà phê Buôn Ma Thuột'],
    description: 'Hương vị đại ngàn',
    requiredDishes: 3,
    vangReward: 100,
  },
  {
    id: 'dong_nam_bo',
    name: 'Đông Nam Bộ',
    emoji: '🏙️',
    signatureDishes: ['Cơm tấm Sài Gòn', 'Bánh mì', 'Hủ tiếu', 'Gỏi cuốn', 'Bò kho', 'Chè đậu đỏ bánh lọt', 'Bánh tráng trộn'],
    description: 'Sài Gòn — thủ phủ ẩm thực đường phố',
    requiredDishes: 5,
    vangReward: 150,
  },
  {
    id: 'tay_nam_bo',
    name: 'Tây Nam Bộ',
    emoji: '🛶',
    signatureDishes: ['Lẩu mắm', 'Bún nước lèo', 'Bánh xèo miền Tây', 'Cá kho tộ', 'Chuột đồng quay'],
    description: 'Sông nước miền Tây và hương vị đồng quê',
    requiredDishes: 3,
    vangReward: 100,
  },
];

// ============================
// 2. QUEST PROGRESS TRACKER
// ============================

/**
 * Calculate user's regional exploration progress
 * @param {Object} user
 * @param {Array} triedDishes - Dishes the user has marked as tried
 * @returns {Object} Progress per region + overall stats
 */
export function calculateRegionalProgress(user, triedDishes = []) {
  const triedSet = new Set(triedDishes.map(d => d.toLowerCase()));

  const regions = REGIONS.map(region => {
    const tried = region.signatureDishes.filter(d => triedSet.has(d.toLowerCase()));
    const progress = Math.round((tried.length / region.requiredDishes) * 100);
    const isComplete = tried.length >= region.requiredDishes;

    return {
      ...region,
      triedCount: tried.length,
      totalDishes: region.signatureDishes.length,
      progress: Math.min(100, progress),
      isComplete,
      triedDishes: tried,
      remainingDishes: region.signatureDishes.filter(d => !triedSet.has(d.toLowerCase())),
    };
  });

  const completedRegions = regions.filter(r => r.isComplete).length;
  const totalVangEarned = regions
    .filter(r => r.isComplete)
    .reduce((sum, r) => sum + r.vangReward, 0);

  return {
    regions,
    completedRegions,
    totalRegions: REGIONS.length,
    overallProgress: Math.round((completedRegions / REGIONS.length) * 100),
    totalVangEarned,
    nextRegion: regions.find(r => !r.isComplete && r.progress > 0) || regions.find(r => !r.isComplete),
    badges: generateBadges(completedRegions, triedDishes.length),
  };
}

// ============================
// 3. BADGE SYSTEM
// ============================

function generateBadges(completedRegions, totalDishes) {
  const badges = [];

  if (totalDishes >= 1) badges.push({ id: 'first_bite', name: 'Miếng Đầu Tiên', emoji: '🍴', desc: 'Thử món đầu tiên' });
  if (totalDishes >= 10) badges.push({ id: 'foodie', name: 'Tín Đồ Ẩm Thực', emoji: '🍜', desc: 'Thử 10 món' });
  if (totalDishes >= 25) badges.push({ id: 'explorer', name: 'Nhà Thám Hiểm', emoji: '🗺️', desc: 'Thử 25 món' });
  if (totalDishes >= 50) badges.push({ id: 'connoisseur', name: 'Sành Ăn', emoji: '👨‍🍳', desc: 'Thử 50 món' });
  if (completedRegions >= 1) badges.push({ id: 'region_1', name: 'Người Mở Đường', emoji: '🏅', desc: 'Hoàn thành 1 vùng' });
  if (completedRegions >= 4) badges.push({ id: 'region_4', name: 'Nửa Chặng Đường', emoji: '🎖️', desc: 'Hoàn thành 4 vùng' });
  if (completedRegions >= 8) badges.push({ id: 'region_8', name: 'Bậc Thầy Ẩm Thực', emoji: '👑', desc: 'Hoàn thành 8 vùng' });

  return badges;
}

// ============================
// 4. DAILY CHALLENGES
// ============================

/**
 * Generate daily challenges based on user's progress
 * @param {Object} userProgress - From calculateRegionalProgress()
 * @returns {Array} 3 daily challenges
 */
export function generateDailyChallenges(userProgress) {
  const challenges = [];

  // Challenge 1: Try a dish from incomplete region
  const incompleteRegion = userProgress.nextRegion;
  if (incompleteRegion && incompleteRegion.remainingDishes.length > 0) {
    const dish = incompleteRegion.remainingDishes[0];
    challenges.push({
      id: `try_${dish.replace(/\s/g, '_').toLowerCase()}`,
      title: `Thử ${dish}`,
      description: `Món đặc trưng vùng ${incompleteRegion.name}`,
      icon: 'restaurant',
      vangReward: 10,
      type: 'try_dish',
      region: incompleteRegion.id,
    });
  }

  // Challenge 2: Social challenge
  challenges.push({
    id: 'share_moment',
    title: 'Chia sẻ Moment',
    description: 'Chụp ảnh món ăn và chia sẻ lên GOMET',
    icon: 'photo_camera',
    vangReward: 15,
    type: 'social',
  });

  // Challenge 3: Dating challenge
  challenges.push({
    id: 'send_kitchen_card',
    title: 'Gửi Kitchen Card',
    description: 'Mời ai đó đi ăn cùng bạn',
    icon: 'card_giftcard',
    vangReward: 20,
    type: 'dating',
  });

  return challenges.slice(0, 3);
}

export default {
  REGIONS,
  calculateRegionalProgress,
  generateDailyChallenges,
};
