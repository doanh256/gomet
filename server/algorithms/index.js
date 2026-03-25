/**
 * GOMET Algorithm Suite
 * Tất cả thuật toán core của nền tảng
 *
 * 1. Taste Match (42 indicators) - Ghép đôi theo khẩu vị
 * 2. Vàng Points - Hệ thống điểm tín dụng ẩm thực
 * 3. Chemistry Score - Điểm tương thích tổng hợp
 * 4. Recommendation Engine - Xếp hạng matches
 * 5. Venue Recommendation - Gợi ý địa điểm hẹn hò
 * 6. Ice Breaker - Gợi ý câu mở đầu
 * 7. Regional Quest - Khám phá 8 vùng ẩm thực
 * 8. Daily Challenges - Thử thách hàng ngày
 */

export {
  calculateTasteMatch,
  calculateVangPoints,
  getVangTier,
  calculateChemistryScore,
  rankMatches,
  recommendVenues,
} from './tasteMatch.js';

export {
  generateIceBreakers,
} from './iceBreaker.js';

export {
  REGIONS,
  calculateRegionalProgress,
  generateDailyChallenges,
} from './regionalQuest.js';
