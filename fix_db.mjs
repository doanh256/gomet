import { PrismaClient } from './node_modules/@prisma/client/index.js';

const prisma = new PrismaClient({
  datasources: { db: { url: 'file:C:/Users/doanh/Desktop/ungdungmoi/server/prisma/dev.db' } }
});

async function fix() {
  // 1. Fix user profiles
  const profiles = [
    { id: 'u1', name: 'Tuấn Minh', location: 'TP.HCM', bio: 'Blogger ẩm thực | Đi khắp Sài Gòn tìm phở ngon nhất | Team cay', interests: JSON.stringify(['Ẩm thực', 'Phở', 'Street food', 'Review quán ăn']) },
    { id: 'u2', name: 'Hoài An',   location: 'TP.HCM', bio: 'Barista tại The Workshop | Yêu latte art và bánh ngọt | Coffee date?', interests: JSON.stringify(['Cà phê', 'Latte art', 'Bánh ngọt', 'Specialty coffee']) },
    { id: 'f1', name: 'Đức Huy',   location: 'Hà Nội', bio: 'Sous chef | Mê French-Vietnamese fusion | Wine pairing lover', interests: JSON.stringify(['Nấu ăn', 'Fine dining', 'Wine', 'French cuisine']) },
    { id: 'f2', name: 'Lan Khuê',  location: 'TP.HCM', bio: 'Yoga instructor | Ăn clean, sống xanh | Plant-based curious', interests: JSON.stringify(['Yoga', 'Healthy food', 'Meditation', 'Plant-based']) },
    { id: 'f3', name: 'Bảo Trâm',  location: 'Đà Nẵng', bio: 'Sinh viên Đà Nẵng | Ăn vặt là đam mê | Cay max', interests: JSON.stringify(['Ăn vặt', 'Đồ cay', 'Bún bò', 'Khám phá quán']) },
    { id: 'f4', name: 'Kỳ Duyên',  location: 'TP.HCM', bio: 'Marketing @ tech startup | Cuối tuần = brunch date | Food photography', interests: JSON.stringify(['Brunch', 'Marketing', 'Food photography', 'Networking']) },
    { id: 'f5', name: 'Nhật Linh', location: 'TP.HCM', bio: 'Dev by day, foodie by night | Lẩu lúc 2AM is my love language', interests: JSON.stringify(['Coding', 'Lẩu', 'Ăn đêm', 'Tech']) },
    { id: 'f6', name: 'Cẩm Vân',   location: 'TP.HCM', bio: 'Fashion designer | Ăn bằng mắt trước | Aesthetic first', interests: JSON.stringify(['Fashion', 'Aesthetic', 'Food photography', 'Design']) },
    { id: 'f7', name: 'Minh Khang', location: 'TP.HCM', bio: 'Founder startup F&B | Networking qua bữa ăn | Business meets food', interests: JSON.stringify(['F&B', 'Startup', 'Networking', 'Business dining']) },
    { id: 'f8', name: 'Thu Hà',    location: 'Hà Nội', bio: 'Travel vlogger | Khám phá ẩm thực 63 tỉnh | Đã đi 45/63', interests: JSON.stringify(['Travel', 'Vlog', 'Ẩm thực vùng miền', 'Khám phá']) },
  ];
  for (const p of profiles) {
    const { id, ...data } = p;
    await prisma.user.update({ where: { id }, data });
    process.stdout.write('u');
  }
  console.log(' Users OK');

  // 2. Fix DatePosts
  const posts = [
    { id: 'dp01', title: 'Tìm người đi ăn phở Thìn Bờ Hồ ở SG', description: 'Phở Thìn mới mở chi nhánh ở Sài Gòn. Cần bạn đồng hành thử phở chuẩn vị Hà Nội. Ai là fan phở thì lên tiếng!', time: 'Thứ 7, 11:00', place: 'Phở Thìn, Lý Tự Trọng, Q1' },
    { id: 'dp02', title: 'Coffee date cuối tuần - Workshop Q1', description: 'Muốn tìm bạn uống cà phê specialty cuối tuần. Mình sẽ pha pour-over và giải thích về cà phê. Yêu cầu: thích cà phê thật sự!', time: 'Chủ nhật, 09:00', place: 'The Workshop, Q1, TP.HCM' },
    { id: 'dp03', title: 'Dinner date French-Vietnamese fusion', description: 'Mình sẽ nấu 5 món fusion Pháp-Việt tại nhà. Cần một người đồng hành thưởng thức và cho feedback chân thành.', time: 'Thứ 6, 19:00', place: 'Nhà riêng, Q3, TP.HCM' },
    { id: 'dp04', title: 'Ai ăn cay cùng mình? Lẩu Thái siêu cay!', description: 'Tìm người chịu được cay level max. Lẩu Thái nguyên liệu nhập Thái Lan. Ai yếu thì đến, không chịu được thì đừng thử!', time: 'Thứ 7, 18:30', place: 'Lẩu Thái Siam, Hải Châu, Đà Nẵng' },
    { id: 'dp05', title: 'Brunch date Saturday - The Deck Saigon', description: 'Cuối tuần đi brunch sang chảnh. View sông Sài Gòn, có pancake và eggs benedict. Ưu tiên người thích chụp ảnh đẹp.', time: 'Thứ 7, 10:00', place: 'The Deck Saigon, Q2' },
    { id: 'dp06', title: 'Lẩu 2AM - Ai thức khuya cùng đi ăn?', description: 'Developer thức khuya code xong đói bụng. Tìm bạn ăn lẩu lúc 2h sáng. Chỉ cần bạn chịu thức khuya và ăn cay được.', time: 'Thứ 6, 02:00', place: 'Lẩu bò Nha Trang, Q10, TP.HCM' },
    { id: 'dp07', title: 'Business lunch networking - Pizza 4Ps', description: 'Mời ăn trưa networking dành cho người trong ngành F&B và tech. Mình đãi tiệc, bạn chỉ cần mang ý tưởng và name card.', time: 'Thứ 4, 12:00', place: 'Pizza 4Ps, Hai Bà Trưng, Q1' },
    { id: 'dp08', title: 'Group date khám phá ẩm thực Huế ở SG', description: 'Lập nhóm 4-5 người đi thử hết quán Huế ngon nhất Sài Gòn trong 1 ngày. Mình sẽ quay vlog, bạn được lên hình!', time: 'Chủ nhật, 10:00', place: 'Tập trung tại Bùi Viện, Q1' },
    { id: 'dp09', title: 'Yoga + smoothie bowl morning date', description: 'Buổi sáng tập yoga nhẹ nhàng rồi đi ăn smoothie bowl. Tìm bạn có lối sống lành mạnh, thích sự bình yên.', time: 'Chủ nhật, 06:30', place: 'Yoga studio, Q7, TP.HCM' },
    { id: 'dp10', title: 'Quán mới khai trương, cần bạn đi thử', description: 'Quán cà phê phong cách Nhật mới mở ở Q3. Decor siêu đẹp, cần bạn đi chụp ảnh cùng. Ai có gu thẩm mỹ thì lên!', time: 'Thứ 7, 14:00', place: 'Kissa Cafe, Q3, TP.HCM' },
    { id: 'dp11', title: 'Cần người đi ăn cưới người yêu cũ', description: 'Cuối tháng này người yêu cũ mới đi đám cưới. Cần một bạn nữ đi cùng để cuộc sống bớt khổ. Mình bao ăn bao uống!', time: 'Chủ nhật, 11:00', place: 'Trung tâm hội nghị, Q7, TP.HCM' },
    { id: 'dp12', title: 'Wine tasting date - La Maison 1888', description: 'Đêm wine tasting với 5 loại vang Pháp. Mình sẽ giải thích cách thưởng thức. Chi phí bao gồm rượu và cheese board.', time: 'Thứ 6, 20:00', place: 'La Maison 1888, Q1, TP.HCM' },
    { id: 'dp13', title: 'Food photography walk Saigon', description: 'Đi dạo chụp ảnh ẩm thực đường phố Sài Gòn. Từ bánh mì đến chè, chụp hết! Cần bạn có điện thoại chụp đẹp là đủ.', time: 'Chủ nhật, 16:00', place: 'Xuất phát tại chợ Bến Thành, Q1' },
    { id: 'dp14', title: 'Thử hết quán bún bò Đà Nẵng trong 1 ngày', description: 'Thách thức: ăn 5 quán bún bò trong 1 ngày. Ai đủ can đảm và dạ dày thì join. Chi phí tự trả, tinh thần là chính!', time: 'Thứ 7, 08:00', place: 'Quán 1: Bà Phước, Hải Châu, Đà Nẵng' },
    { id: 'dp15', title: 'Coding + Cafe date cho developers', description: 'Tìm bạn dev cùng ngồi cafe, code side project. Có thể pair programming hoặc chỉ im lặng code cạnh nhau cũng vui.', time: 'Thứ 7, 14:00', place: 'The Workshop, Q1, TP.HCM' },
  ];
  for (const p of posts) {
    const { id, ...data } = p;
    await prisma.datePost.update({ where: { id }, data });
    process.stdout.write('p');
  }
  console.log(' DatePosts OK');

  // 3. Fix transaction descriptions
  const txFixes = [
    ['Nap vi qua MoMo', 'Nạp ví qua MoMo'],
    ['Thanh toan date post: An cuoi nguoi yeu cu', 'Thanh toán date post: Ăn cưới người yêu cũ'],
    ['Nap vi qua ZaloPay', 'Nạp ví qua ZaloPay'],
    ['Thuong match dau tien', 'Thưởng match đầu tiên'],
    ['Nap vi qua chuyen khoan', 'Nạp ví qua chuyển khoản'],
    ['Thanh toan date post: Wine tasting', 'Thanh toán date post: Wine tasting'],
    ['Thuong hoan thanh profile', 'Thưởng hoàn thành profile'],
    ['Nap vi qua the cao', 'Nạp ví qua thẻ cào'],
    ['Thuong dang date post dau tien', 'Thưởng đăng date post đầu tiên'],
    ['Thuong moi ban be', 'Thưởng mời bạn bè'],
    ['Thuong review date post', 'Thưởng review date post'],
    ['Thanh toan date post: Business lunch', 'Thanh toán date post: Business lunch'],
    ['Nap vi qua VNPay', 'Nạp ví qua VNPay'],
    ['Thuong vlog am thuc hay', 'Thưởng vlog ẩm thực hay'],
  ];
  for (const [old, fix] of txFixes) {
    await prisma.transaction.updateMany({ where: { description: old }, data: { description: fix } });
    process.stdout.write('t');
  }
  console.log(' Transactions OK');

  // 4. Fix system icebreaker messages
  const r = await prisma.message.updateMany({
    where: { text: 'Ban da ket noi! Nhan tin pha bang ngay!', isSystem: true },
    data: { text: 'Bạn đã kết nối! Nhắn tin phá băng ngay!' }
  });
  console.log(' System messages OK (' + r.count + ' updated)');

  console.log('\n✅ All database fixes applied!');
}

fix().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
