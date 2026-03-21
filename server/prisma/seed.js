import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const MOCK_USERS = [
  {
    id: 'u1', name: 'Tuấn Minh', role: 'user', age: 26, gender: 'male', location: 'Hà Nội',
    bio: 'Đam mê công nghệ, thích code và làm bánh cuối tuần.',
    images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop'],
    interests: ['Công nghệ', 'Nấu ăn', 'Coffee'],
  },
  {
    id: 'u2', name: 'Mai Lan', role: 'user', age: 23, gender: 'female', location: 'TP.HCM',
    bio: 'Art director ban ngày, overthinker ban đêm. Thích đi bảo tàng và uống latte không đường.',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop'],
    interests: ['Nghệ thuật', 'Cafe', 'Đọc sách'],
  },
  {
    id: 'f1', name: 'Hoài An', role: 'user', age: 24, gender: 'female', location: 'Đà Nẵng',
    bio: 'Yêu động vật, đặc biệt là chó Corgi. Cuối tuần thường đi cắm trại chân mây.',
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop'],
    interests: ['Thú cưng', 'Yoga', 'Camping'],
  },
  {
    id: 'f2', name: 'Bảo Trâm', role: 'user', age: 22, gender: 'female', location: 'Hà Nội',
    bio: 'Sinh viên năm cuối Kiến Trúc, tìm người đi lượn ngắm phố phường lấp lánh.',
    images: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop'],
    interests: ['Dạo phố', 'Nghe nhạc', 'Nhiếp ảnh'],
  },
  {
    id: 'f3', name: 'Kỳ Duyên', role: 'user', age: 26, gender: 'female', location: 'TP.HCM',
    bio: 'Chuyên viên kế toán. Cần một bờ vai để tựa vào mỗi tối thứ 6.',
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop'],
    interests: ['Cocktail', 'Mua sắm', 'Xem phim'],
  },
  {
    id: 'f4', name: 'Nhật Linh', role: 'user', age: 21, gender: 'female', location: 'Đà Lạt',
    bio: 'Cô bé má hồng bán bánh dâu tây.',
    images: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop'],
    interests: ['Bánh ngọt', 'Âm nhạc Indie', 'Thơ thẩn'],
  },
  {
    id: 'f5', name: 'Minh Thúy', role: 'user', age: 29, gender: 'female', location: 'Hà Nội',
    bio: 'Giảng viên Tiếng Anh. Tìm kiếm một người trưởng thành.',
    images: ['https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop'],
    interests: ['Ngoại ngữ', 'Đọc sách cổ', 'Jazz'],
  },
  {
    id: 'f6', name: 'Cẩm Vân', role: 'user', age: 25, gender: 'female', location: 'TP.HCM',
    bio: 'Thiết kế đồ hoạ. Hay thức khuya, mắt hay thâm quầng. Thích những chàng trai biết code.',
    images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop'],
    interests: ['Đồ họa', 'Anime', 'Mèo'],
  },
  {
    id: 'f7', name: 'Ngọc Hân', role: 'user', age: 23, gender: 'female', location: 'Hải Phòng',
    bio: 'Sống vì đồ ăn. Nhìn nhỏ con nhưng ăn cả thế giới.',
    images: ['https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=800&auto=format&fit=crop'],
    interests: ['Food tour', 'Chụp ảnh', 'Trà sữa'],
  },
  {
    id: 'f8', name: 'Hương Tràm', role: 'user', age: 27, gender: 'female', location: 'Đà Nẵng',
    bio: 'Hướng dẫn viên du lịch bụi. Yêu sự tự do.',
    images: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop'],
    interests: ['Phượt', 'Văn hóa', 'Thể thao mạo hiểm'],
  },
  {
    id: 'f9', name: 'Phương Anh', role: 'user', age: 20, gender: 'female', location: 'TP.HCM',
    bio: 'Tân sinh viên, đang tập tành học trang điểm. Thích Kpop.',
    images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop'],
    interests: ['Kpop', 'Skincare', 'Shopping'],
  },
  {
    id: 'f10', name: 'Lan Khuê', role: 'user', age: 31, gender: 'female', location: 'Hà Nội',
    bio: 'Chủ shop hoa online. Sống chậm.',
    images: ['https://images.unsplash.com/photo-1508214751196-bfd252787cdd?w=800&auto=format&fit=crop'],
    interests: ['Trồng cây', 'Hoa', 'Thiền'],
  },
  {
    id: 'm1', name: 'Hoàng Phong', role: 'user', age: 28, gender: 'male', location: 'TP.HCM',
    bio: 'Fitness trainer. Sống healthy và yêu thiên nhiên.',
    images: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop'],
    interests: ['Gym', 'Healthy', 'Du lịch'],
  },
  {
    id: 'm2', name: 'Quang Đại', role: 'user', age: 25, gender: 'male', location: 'Hà Nội',
    bio: 'Nhiếp ảnh gia nghiệp dư. Thích ngắm thành phố qua lăng kính 35mm.',
    images: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop'],
    interests: ['Nhiếp ảnh', 'Cafe', 'Phượt'],
  },
  {
    id: 'm3', name: 'Đức Tâm', role: 'user', age: 29, gender: 'male', location: 'Đà Nẵng',
    bio: 'Kiến trúc sư trầm tính. Cuối tuần ôm đàn Guitar.',
    images: ['https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&auto=format&fit=crop'],
    interests: ['Kiến trúc', 'Guitar', 'Gỗ'],
  },
  {
    id: 'm4', name: 'Hải Long', role: 'user', age: 22, gender: 'male', location: 'TP.HCM',
    bio: 'Tuyển thủ E-sport. Nếu cần người gánh rank thì gọi anh.',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop'],
    interests: ['Game', 'Livestream', 'Trà đá'],
  },
  {
    id: 'm5', name: 'Khắc Tiệp', role: 'user', age: 32, gender: 'male', location: 'Hà Nội',
    bio: 'Doanh nhân khởi nghiệp. Vẫn đang tìm cách làm giàu.',
    images: ['https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&auto=format&fit=crop'],
    interests: ['Khởi nghiệp', 'Đọc sách', 'Rượu vang'],
  },
  {
    id: 'm6', name: 'Trọng Hiếu', role: 'user', age: 26, gender: 'male', location: 'Hải Phòng',
    bio: 'Nhân viên ngân hàng. Cuối tuần thích chạy bộ.',
    images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop'],
    interests: ['Kinh tế', 'Golf', 'Chạy bộ'],
  },
  {
    id: 'm7', name: 'Chí Phèo', role: 'user', age: 24, gender: 'male', location: 'Bắc Ninh',
    bio: 'Tính tình lương thiện, hay nấu ăn cho gia đình.',
    images: ['https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=800&auto=format&fit=crop'],
    interests: ['Tattoo', 'Nấu ăn', 'Chăm sóc thú cưng'],
  },
  {
    id: 'm8', name: 'Phan Cường', role: 'user', age: 27, gender: 'male', location: 'Vũng Tàu',
    bio: 'Rapper Underground.',
    images: ['https://images.unsplash.com/photo-1523307730650-594bc63f9d67?w=800&auto=format&fit=crop'],
    interests: ['Rap', 'Hip Hop', 'Skate'],
  },
  // Admin account
  {
    id: 'admin1', name: 'Admin Gomet', role: 'admin', age: 30, gender: 'male', location: 'Hà Nội',
    bio: 'Quản trị viên hệ thống Gomet',
    images: [],
    interests: [],
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.conversationMember.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.match.deleteMany();
  await prisma.swipe.deleteMany();
  await prisma.dateApplication.deleteMany();
  await prisma.datePost.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.userImage.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create users
  for (const u of MOCK_USERS) {
    await prisma.user.create({
      data: {
        id: u.id,
        email: `${u.id}@gomet.vn`,
        password: hashedPassword,
        name: u.name,
        role: u.role,
        age: u.age,
        gender: u.gender,
        location: u.location,
        bio: u.bio,
        avatar: u.images[0] || null,
        interests: JSON.stringify(u.interests),
        walletBalance: u.role === 'admin' ? 0 : 100000,
      },
    });

    // Create UserImage records
    for (let i = 0; i < u.images.length; i++) {
      await prisma.userImage.create({
        data: { userId: u.id, url: u.images[i], order: i },
      });
    }
  }

  // Create some matches
  const matchPairs = [
    ['u1', 'u2'], ['u1', 'f1'], ['u1', 'f6'], ['u2', 'm1'],
  ];

  for (const [id1, id2] of matchPairs) {
    const [sorted1, sorted2] = [id1, id2].sort();
    await prisma.match.create({ data: { user1Id: sorted1, user2Id: sorted2 } });

    // Create conversations for each match
    const conv = await prisma.conversation.create({
      data: {
        type: 'match',
        members: { create: [{ userId: id1 }, { userId: id2 }] },
      },
    });

    // Add icebreaker message
    await prisma.message.create({
      data: {
        conversationId: conv.id,
        senderId: id1,
        text: `🎉 Bạn và đã kết nối! Nhắn tin phá băng ngay!`,
        isSystem: true,
      },
    });
  }

  // Create some sample date posts
  const datePosts = [
    {
      authorId: 'f1', category: 'tim_ban', title: 'Dạo chó ở công viên 🐕',
      description: 'Cần bạn đi dạo chó Corgi cuối tuần', icon: '🐾',
      time: 'Sáng Chủ nhật 07:30', place: 'Công viên 29/3, Đà Nẵng',
    },
    {
      authorId: 'f3', category: 'tim_yeu', title: 'Tìm người đu concert Rap Việt 🎤',
      description: 'Một mình đi buồn lắm, tìm người đi cùng nha', icon: '🎶',
      time: 'Thứ 7, 18:00', place: 'Nhà hát TP.HCM',
    },
    {
      authorId: 'm5', category: 'tra_phi', title: 'Cần người đi ăn cưới người yêu cũ 💒',
      description: 'Đám cưới tuần sau, cần một bạn nữ đi cùng để coi như đang hạnh phúc', icon: '💍',
      time: 'Chủ nhật tuần sau, 11:00', place: 'Trung tâm hội nghị, Cầu Giấy, HN',
      price: 500000,
    },
    {
      authorId: 'f6', category: 'tra_phi', title: 'Tìm người cùng chạy deadline ☕',
      description: 'Cần motivation buddy ngồi chạy deadline design, ai code cùng không?', icon: '💻',
      time: 'Tối nay 22:00', place: 'Katinat, Nguyễn Huệ, Q1',
      price: 100000,
    },
    {
      authorId: 'm2', category: 'tim_ban', title: 'Tìm mẫu ruột đi bắn ảnh đường phố 📷',
      description: 'Cần bạn nữ có phong cách để chụp ảnh cuối tuần', icon: '🌆',
      time: 'Chiều tà 17:00 thứ 7', place: 'Phố Bích Họa, Phùng Hưng, HN',
    },
  ];

  for (const post of datePosts) {
    await prisma.datePost.create({
      data: {
        ...post,
        price: post.price || null,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Login accounts: [any_user_id]@gomet.vn / password123');
  console.log('🔑 Admin: admin1@gomet.vn / password123');
  console.log('👤 Demo: u1@gomet.vn / password123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
