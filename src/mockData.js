export const MOCK_USERS = [
  // --- 2 Tài khoản Dev / Admin Role ---
  {
    id: 'u1',
    name: 'Tuấn Minh',
    role: 'user-a',
    age: 26,
    gender: 'male',
    location: 'Hà Nội',
    bio: 'Đam mê công nghệ, thích code và làm bánh cuối tuần. Tìm người cùng "chữa lành" những dòng code rác.',
    images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop'],
    interests: ['Công nghệ', 'Nấu ăn', 'Coffee'],
    activityIntent: 'Tìm người đá PES 2024 tối nay 🎮',
    activityIcon: '⚽',
    activityTime: 'Tối nay 20:00',
    activityPlace: 'Online - Mạng Noob',
  },
  {
    id: 'u2',
    name: 'Mai Lan',
    role: 'user-b',
    age: 23,
    gender: 'female',
    location: 'TP.HCM',
    bio: 'Art director ban ngày, overthinker ban đêm. Thích đi bảo tàng và uống latte không đường.',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop'],
    interests: ['Nghệ thuật', 'Cafe', 'Đọc sách'],
    activityIntent: 'Dạo triển lãm VCCA cuối tuần 🎨',
    activityIcon: '🖼️',
    activityTime: 'Thứ 7, 09:00',
    activityPlace: 'VCCA, Royal City, HN',
  },

  // --- 10 Bots Nữ Đa dạng ---
  {
    id: 'f1', name: 'Hoài An', age: 24, gender: 'female', location: 'Đà Nẵng',
    bio: 'Yêu động vật, đặc biệt là chó Corgi. Cuối tuần thường đi cắm trại chân mây.',
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop'],
    interests: ['Thú cưng', 'Yoga', 'Camping'],
    activityIntent: 'Dạo chó ở công viên 🐕', activityIcon: '🐾',
    activityTime: 'Sáng Chủ nhật 07:30', activityPlace: 'Công viên 29/3, Đà Nẵng',
  },
  {
    id: 'f2', name: 'Bảo Trâm', age: 22, gender: 'female', location: 'Hà Nội',
    bio: 'Sinh viên năm cuối Kiến Trúc, tìm người đi lượn ngắm phố phường lấp lánh.',
    images: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop'],
    interests: ['Dạo phố', 'Nghe nhạc', 'Nhiếp ảnh'],
    activityIntent: 'Lượn phố cổ ăn kem Tràng Tiền 🍦', activityIcon: '🛵',
    activityTime: 'Tối thứ 6, 19:00', activityPlace: 'Hồ Hoàn Kiếm, Hà Nội',
  },
  {
    id: 'f3', name: 'Kỳ Duyên', age: 26, gender: 'female', location: 'TP.HCM',
    bio: 'Chuyên viên kế toán gánh KPIs mệt mỏi. Cần một bờ vai để tựa vào mỗi tối thứ 6.',
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop'],
    interests: ['Cocktail', 'Mua sắm', 'Xem phim'],
    activityIntent: 'Tìm người đu idol concert Rap Việt 🎤', activityIcon: '🎶',
    activityTime: 'Thứ 7, 18:00', activityPlace: 'Nhà hát TP.HCM',
  },
  {
    id: 'f4', name: 'Nhật Linh', age: 21, gender: 'female', location: 'Đà Lạt',
    bio: 'Cô bé má hồng bán bánh dâu tây. Nếu bạn thích đồ ngọt thì quẹt phải liền tay nha.',
    images: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop'],
    interests: ['Bánh ngọt', 'Âm nhạc Indie', 'Thơ thẩn'],
    activityIntent: 'Cheer up bằng Bánh bọt biển 🍰', activityIcon: '🍓',
    activityTime: 'Chiều nay 15:00', activityPlace: 'Tiệm bánh nhà mình, Đà Lạt',
  },
  {
    id: 'f5', name: 'Minh Thúy', age: 29, gender: 'female', location: 'Hà Nội',
    bio: 'Giảng viên Tiếng Anh. Tìm kiếm một người trưởng thành, có thể nói chuyện 3 thứ tiếng.',
    images: ['https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop'],
    interests: ['Ngoại ngữ', 'Đọc sách cổ', 'Jazz'],
    activityIntent: 'Luyện giao tiếp tiếng Nhật T7 🇯🇵', activityIcon: '📚',
    activityTime: 'Thứ 7, 14:00', activityPlace: 'Cà phê sách, Đống Đa, HN',
  },
  {
    id: 'f6', name: 'Cẩm Vân', age: 25, gender: 'female', location: 'TP.HCM',
    bio: 'Thiết kế đồ hoạ. Hay thức khuya, mắt hay thâm quầng. Thích những chàng trai biết code.',
    images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop'],
    interests: ['Đồ họa', 'Anime', 'Mèo'],
    activityIntent: 'Chạy deadline qua đêm ở Katinat ☕', activityIcon: '💻',
    activityTime: 'Tối nay 22:00', activityPlace: 'Katinat, Nguyễn Huệ, Q1',
  },
  {
    id: 'f7', name: 'Ngọc Hân', age: 23, gender: 'female', location: 'Hải Phòng',
    bio: 'Sống vì đồ ăn. Nhìn nhỏ con nhưng ăn cả thế giới. Dẫn đi ăn món gì cũng chịu.',
    images: ['https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=800&auto=format&fit=crop'],
    interests: ['Food tour', 'Chụp ảnh', 'Trà sữa'],
    activityIntent: 'Truy tìm quán Ốc ngon nhất thành phố 🐌', activityIcon: '🍲',
    activityTime: 'Tối thứ 5, 19:30', activityPlace: 'Khu ẩm thực bờ sông, HP',
  },
  {
    id: 'f8', name: 'Hương Tràm', age: 27, gender: 'female', location: 'Đà Nẵng',
    bio: 'Hướng dẫn viên du lịch bụi. Yêu sự tự do và những chuyến đi xuyên Việt.',
    images: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop'],
    interests: ['Phượt', 'Văn hóa', 'Thể thao mạo hiểm'],
    activityIntent: 'Săn mây Tà Xùa cuối tháng này ☁️', activityIcon: '⛰️',
    activityTime: '25-27/03 (2 đêm)', activityPlace: 'Tà Xùa, Sơn La',
  },
  {
    id: 'f9', name: 'Phương Anh', age: 20, gender: 'female', location: 'TP.HCM',
    bio: 'Tân sinh viên, đang tập tành học trang điểm. Thích Kpop và mấy con Gấu bông.',
    images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop'],
    interests: ['Kpop', 'Skincare', 'Shopping'],
    activityIntent: 'Tìm người rủ đi chụp ảnh thẻ Sinh viên 📸', activityIcon: '🎀',
    activityTime: 'Từ 15:00 Thứ 3', activityPlace: 'Studio ảnh thẻ, Q.Bình Thạnh',
  },
  {
    id: 'f10', name: 'Lan Khuê', age: 31, gender: 'female', location: 'Hà Nội',
    bio: 'Chủ shop hoa online. Sống chậm. Đang đi tìm một người biết trân trọng những điều giản dị.',
    images: ['https://images.unsplash.com/photo-1508214751196-bfd252787cdd?w=800&auto=format&fit=crop'],
    interests: ['Trồng cây', 'Hoa', 'Thiền'],
    activityIntent: 'Tĩnh tâm bằng Yoga Hatha 🧘‍♀️', activityIcon: '🌿',
    activityTime: 'Sáng Chủ nhật 06:30', activityPlace: 'Studio Yoga An Nhiên, Tây Hồ',
  },

  // --- 8 Bots Nam Đa dạng ---
  {
    id: 'm1', name: 'Hoàng Phong', age: 28, gender: 'male', location: 'TP.HCM',
    bio: 'Fitness trainer. Sống healthy và yêu thiên nhiên. Tìm bạn cùng gym.',
    images: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop'],
    interests: ['Gym', 'Healthy', 'Du lịch'],
    activityIntent: 'Tập Gym gánh tạ chung Cali Quận 1 💪', activityIcon: '🏋️',
    activityTime: 'Sáng hàng ngày 06:00', activityPlace: 'California Fitness, Q1, HCM',
  },
  {
    id: 'm2', name: 'Quang Đại', age: 25, gender: 'male', location: 'Hà Nội',
    bio: 'Nhiếp ảnh gia nghiệp dư. Thích ngắm nhìn thành phố qua lăng kính 35mm.',
    images: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop'],
    interests: ['Nhiếp ảnh', 'Cafe', 'Phượt'],
    activityIntent: 'Tìm mẫu ruột đi bắn ảnh đường phố 📷', activityIcon: '🌆',
    activityTime: 'Chiều tà 17:00 thứ 7', activityPlace: 'Phố Bích Họa, Phùng Hưng, HN',
  },
  {
    id: 'm3', name: 'Đức Tâm', age: 29, gender: 'male', location: 'Đà Nẵng',
    bio: 'Kiến trúc sư trầm tính. Cuối tuần thường đóng rèm ôm đàn Guitar.',
    images: ['https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&auto=format&fit=crop'],
    interests: ['Kiến trúc', 'Guitar', 'Gỗ'],
    activityIntent: 'Cần người đệm đàn chung bài Mưa Hồng 🎸', activityIcon: '🎵',
    activityTime: 'Tối thứ 6, 20:00', activityPlace: 'Nhà mình (Q. Sơn Trà, ĐN)',
  },
  {
    id: 'm4', name: 'Hải Long', age: 22, gender: 'male', location: 'TP.HCM',
    bio: 'Tuyển thủ E-sport mỏ hỗn. Nếu e cần người gánh rank Liên Minh thì gọi anh.',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop'],
    interests: ['Game', 'Livestream', 'Trà đá'],
    activityIntent: 'Tuyển SP ruột kéo Rank Kim Cương 🎮', activityIcon: '🕹️',
    activityTime: 'Tối hàng ngày từ 21:00', activityPlace: 'Online - Server Việt Nam',
  },
  {
    id: 'm5', name: 'Khắc Tiệp', age: 32, gender: 'male', location: 'Hà Nội',
    bio: 'Doanh nhân khởi nghiệp Thất Bại 3 lần. Vẫn đang tìm cách làm giàu và tìm vợ.',
    images: ['https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&auto=format&fit=crop'],
    interests: ['Khởi nghiệp', 'Đọc sách', 'Rượu vang'],
    activityIntent: 'Mời cafe lắng nghe ý tưởng khởi nghiệp ☕', activityIcon: '💼',
    activityTime: 'Thứ 3 hoặc thứ 5, 08:30', activityPlace: 'The Coffee House, Cầu Giấy',
  },
  {
    id: 'm6', name: 'Trọng Hiếu', age: 26, gender: 'male', location: 'Hải Phòng',
    bio: 'Nhân viên ngân hàng áo trắng đóng thùng. Tháng 10 kiếm 1 tỷ chỉ là chuyện nhỏ.',
    images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop'],
    interests: ['Kinh tế', 'Golf', 'Chạy bộ'],
    activityIntent: 'Tìm hội chạy bộ Marathon 10km sáng Chủ nhật 🏃', activityIcon: '👟',
    activityTime: 'Chủ nhật, 05:30', activityPlace: 'Công viên Bờ Sông, Hải Phòng',
  },
  {
    id: 'm7', name: 'Chí Phèo', age: 24, gender: 'male', location: 'Bắc Ninh',
    bio: 'Thích xăm trổ nhưng rất sợ đau. Tính tình lương thiện, hay nấu ăn cho gia đình.',
    images: ['https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=800&auto=format&fit=crop'],
    interests: ['Tattoo', 'Nấu ăn', 'Chăm sóc thú cưng'],
    activityIntent: 'Mời qua nhà tui nấu cơm sườn nướng hông? 🍖', activityIcon: '👨‍🍳',
    activityTime: 'Thứ 7 tuần này, trưa 12h', activityPlace: 'Nhà mình, Bắc Ninh (có xe đón)',
  },
  {
    id: 'm8', name: 'Phan Cường', age: 27, gender: 'male', location: 'Vũng Tàu',
    bio: 'Rapper Undergroud. Rhymastic gọi tao là thằng nhóc ác.',
    images: ['https://images.unsplash.com/photo-1523307730650-594bc63f9d67?w=800&auto=format&fit=crop'],
    interests: ['Rap', 'Hip Hop', 'Skate'],
    activityIntent: 'Cần cạ cứng đi Cypher Rap tối Thứ 7 🔥', activityIcon: '🎤',
    activityTime: 'Thứ 7, 22:00', activityPlace: 'Pub Underground, Bãi Trước VT',
  }
];

// Hệ sinh thái Tin nhắn Khởi tạo
export const INITIAL_MESSAGES = {
  'u1_u2': [ 
    { id: 'm1', senderId: 'u2', text: 'Chào Tuấn Minh, mình là Mai Lan. Mình thấy avatar bạn đang đứng ở cái quán cafe quen lắm.', timestamp: '14:30' },
    { id: 'm2', senderId: 'u1', text: 'Đúng rồi Lan, đó là Vợt Cafe ở Gò Vấp đó. Lan thích uống Latte hả?', timestamp: '14:35' },
  ],
  'f1_u1': [
    { id: 'm3', senderId: 'f1', text: 'Minh ơi, cuối tuần này rảnh thì chạy lên đồi chơi với mình không? Mình mang corgi đi theo.', timestamp: '08:00' },
  ],
  'f6_u1': [
    { id: 'm4', senderId: 'f6', text: 'Giao diện app Gomet này nhìn giống Tinder ghê ha bạn trai code dạo?', timestamp: '23:45' }
  ],
  'm1_u2': [
    { id: 'm5', senderId: 'm1', text: 'Lan uống Latte không đường thì giống anh rồi. Bữa nào đi bảo tàng Mỹ Thuật với anh không?', timestamp: '09:20' }
  ],
  'f9_u1': [
    { id: 'm6', senderId: 'u1', text: 'Phương Anh ơi, nhóc mua gấu bông ở đâu mà bự bằng người vậy?', timestamp: '10:00' },
    { id: 'm7', senderId: 'f9', text: 'Dạ, mẹ em săn sale 12/12 bên Shopee mua cho đó ạ, ôm ấm lắm anh ơi =)))', timestamp: '10:05' }
  ]
};

// Dữ liệu Matches — dùng ID-based lookup thay vì index để tránh bug khi thay đổi thứ tự mảng
const findUser = (id) => MOCK_USERS.find(u => u.id === id);

export const INITIAL_MATCHES = {
  'u1': [findUser('u2'), findUser('f1'), findUser('f6'), findUser('m1')].filter(Boolean),
  'u2': [findUser('u1'), findUser('m2'), findUser('m5')].filter(Boolean),
  'f1': [findUser('u1')].filter(Boolean),
  'f6': [findUser('u1')].filter(Boolean),
  'f9': [findUser('u1')].filter(Boolean),
  'm1': [findUser('u2')].filter(Boolean),
};

// Báo cáo hệ thống Admin
export const SYSTEM_REPORTS = [
  { id: 1, reportedUser: 'Phan Cường', reason: 'Dùng từ ngữ thô tục trong bio', status: 'pending', date: '2026-03-15' },
  { id: 2, reportedUser: 'Khắc Tiệp', reason: 'Spam Crypto đa cấp', status: 'resolved', date: '2026-03-14' },
  { id: 3, reportedUser: 'Trọng Hiếu', reason: 'Giả danh nhân viên ngân hàng', status: 'pending', date: '2026-03-16' }
];
