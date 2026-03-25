/**
 * GOMET Ice Breaker Algorithm
 * Gợi ý câu mở đầu dựa trên sở thích chung
 */

const TEMPLATES = {
  cuisine_shared: [
    'Nghe nói bạn cũng thích {cuisine}? Quán nào ở {location} ngon nhất theo bạn?',
    'Tôi vừa thử {cuisine} ở một quán mới. Bạn có muốn nghe review không? 😄',
    'Một người thích {cuisine} như bạn chắc biết nhiều quán hay lắm. Chia sẻ cho tôi với!',
  ],
  spice_high: [
    'Wow, cùng team ăn cay level max! Đã thử bún bò Huế gốc chưa? 🌶️',
    'Thấy bạn chịu cay giỏi quá. Thách bạn thử mì cay 7 cấp nhé? 😈',
    'Team cay tìm đồng đội! Bạn thích cay kiểu Thái, Hàn hay Việt?',
  ],
  spice_low: [
    'Tôi cũng thích ăn nhẹ nhàng. Bạn có quán nào ấm cúng gợi ý không?',
    'Cùng team "không cay" nè. Cuối tuần đi uống trà sữa không? 🧋',
  ],
  style_street_food: [
    'Thấy bạn thích street food! Đã khám phá hẻm ăn vặt nào thú vị chưa?',
    'Team street food gặp nhau rồi. Hẹn đi ăn vặt vỉa hè không? 🛵',
  ],
  style_fine_dining: [
    'Bạn cũng thích fine dining? Tôi đang tìm người đi thử Chef\'s Table. Đi cùng không?',
    'Cuối tuần này có wine pairing dinner hay lắm. Bạn có hứng thú không?',
  ],
  region_shared: [
    'Bạn cũng từ {region} à? Nhớ món {dish} quê mình quá!',
    'Thấy bạn thích ẩm thực {region}. Có quán nào "chuẩn vị" ở Sài Gòn không?',
  ],
  general: [
    'Nếu chỉ được ăn một món suốt đời, bạn chọn gì? 🤔',
    'Phở hay cơm tấm vào buổi sáng? Câu hỏi triệu đô đây! 😄',
    'Bạn có phải kiểu người thích thử quán mới mỗi tuần không?',
    'Cuối tuần bạn thường ăn ở đâu? Tôi đang cần gợi ý nè!',
    'Team bún bò hay team phở? Đây là câu hỏi quan trọng nhất! 🍜',
    'Nếu được mời một người ăn tối, bạn sẽ chọn quán kiểu gì?',
  ],
};

/**
 * Generate personalized ice breaker suggestions
 * @param {Object} sender - Current user
 * @param {Object} receiver - Match partner
 * @returns {Array} 5 ice breaker suggestions with categories
 */
export function generateIceBreakers(sender, receiver) {
  const suggestions = [];

  // 1. Shared cuisine-based
  const sharedCuisines = getShared(sender.favCuisines, receiver.favCuisines);
  if (sharedCuisines.length > 0) {
    const template = pickRandom(TEMPLATES.cuisine_shared);
    suggestions.push({
      text: template
        .replace('{cuisine}', sharedCuisines[0])
        .replace('{location}', sender.location || 'Sài Gòn'),
      category: 'Ẩm thực',
      icon: 'restaurant',
    });
  }

  // 2. Spice-level based
  const senderSpice = sender.spiceLevel || 3;
  const receiverSpice = receiver.spiceLevel || 3;
  if (senderSpice >= 4 && receiverSpice >= 4) {
    suggestions.push({
      text: pickRandom(TEMPLATES.spice_high),
      category: 'Hài hước',
      icon: 'local_fire_department',
    });
  } else if (senderSpice <= 2 && receiverSpice <= 2) {
    suggestions.push({
      text: pickRandom(TEMPLATES.spice_low),
      category: 'Tự nhiên',
      icon: 'favorite',
    });
  }

  // 3. Dining style based
  const style = receiver.diningStyle || 'casual';
  if (style === 'street_food' && TEMPLATES.style_street_food) {
    suggestions.push({
      text: pickRandom(TEMPLATES.style_street_food),
      category: 'Phiêu lưu',
      icon: 'explore',
    });
  } else if (style === 'fine_dining') {
    suggestions.push({
      text: pickRandom(TEMPLATES.style_fine_dining),
      category: 'Sâu sắc',
      icon: 'dinner_dining',
    });
  }

  // 4. Fill with general suggestions
  while (suggestions.length < 5) {
    const text = pickRandom(TEMPLATES.general);
    if (!suggestions.find(s => s.text === text)) {
      suggestions.push({
        text,
        category: pickRandom(['Tự nhiên', 'Hài hước', 'Sâu sắc']),
        icon: 'tips_and_updates',
      });
    }
  }

  return suggestions.slice(0, 5);
}

function getShared(arrA = [], arrB = []) {
  const setB = new Set((arrB).map(x => x?.toLowerCase()));
  return (arrA).filter(x => setB.has(x?.toLowerCase()));
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default { generateIceBreakers };
