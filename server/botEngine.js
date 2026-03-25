/**
 * GOMET Bot Engine
 * 10 bots hoạt động liên tục: đăng bài, chat, swipe, review, earn Vàng
 * Chạy: node server/botEngine.js
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ============================
// BOT PROFILES
// ============================
const BOTS = [
  { id: 'u1', name: 'Tuấn Minh', style: 'foodie', activeHours: [7,12,18,21] },
  { id: 'u2', name: 'Hoài An', style: 'barista', activeHours: [6,10,14,20] },
  { id: 'f1', name: 'Đức Huy', style: 'chef', activeHours: [9,15,21,23] },
  { id: 'f2', name: 'Lan Khuê', style: 'yoga', activeHours: [5,8,12,17] },
  { id: 'f3', name: 'Bảo Trâm', style: 'student', activeHours: [10,13,19,22] },
  { id: 'f4', name: 'Kỳ Duyên', style: 'marketing', activeHours: [8,11,15,20] },
  { id: 'f5', name: 'Nhật Linh', style: 'developer', activeHours: [10,14,22,2] },
  { id: 'f6', name: 'Cẩm Vân', style: 'designer', activeHours: [9,13,17,21] },
  { id: 'f7', name: 'Minh Khang', style: 'business', activeHours: [7,11,14,19] },
  { id: 'f8', name: 'Thu Hà', style: 'vlogger', activeHours: [8,12,16,20] },
];

// ============================
// POST TEMPLATES
// ============================
const POST_TEMPLATES = {
  foodie: [
    { title: 'Ai đi ăn phở sáng không?', desc: 'Mình vừa phát hiện quán phở gà siêu ngon ở quận 3. Nước dùng trong veo, thịt gà ta dai ngọt. Cần bạn đồng hành thử ngay sáng mai!', place: 'Phở Gà Quận 3', cat: 'tim_ban' },
    { title: 'Review quán bún bò mới mở', desc: 'Quán bún bò Huế gốc mới khai trương trên đường Pasteur. Ai muốn đi cùng mình review? Đảm bảo cay xé lưỡi 🌶️', place: 'Bún Bò Pasteur', cat: 'tim_ban' },
    { title: 'Tìm người đi food tour Chợ Lớn', desc: 'Cuối tuần này mình lên kế hoạch food tour khu Chợ Lớn. Dim sum, hủ tiếu, chè... Ai cùng đam mê ẩm thực Hoa đi cùng!', place: 'Chợ Lớn Q5', cat: 'tim_ban' },
    { title: 'Date ăn hải sản tươi sống', desc: 'Biết quán hải sản vừa đánh bắt sáng nay ở quận 4. Tôm hùm, cua, ghẹ... Cần người cùng thưởng thức!', place: 'Quán Hải Sản Q4', cat: 'tim_yeu' },
  ],
  barista: [
    { title: 'Coffee date sáng cuối tuần ☕', desc: 'Mình sẽ pha specialty coffee cho bạn thử. Pour over, V60, hoặc espresso — bạn chọn! Địa điểm: The Workshop Q1.', place: 'The Workshop Q1', cat: 'tim_yeu' },
    { title: 'Latte art workshop cho couples', desc: 'Muốn tổ chức buổi học latte art cho các cặp đôi. Vừa học vừa date, ai hứng thú?', place: 'Coffee Lab Q3', cat: 'tim_ban' },
    { title: 'Thử cà phê specialty mới rang', desc: 'Vừa nhận được batch cà phê Arabica Đà Lạt mới rang. Ai muốn cupping cùng mình sáng mai?', place: 'Home studio Q1', cat: 'tim_ban' },
  ],
  chef: [
    { title: 'Private dinner 5 món Pháp-Việt 🍷', desc: 'Mình chuẩn bị tasting menu 5 course fusion Pháp-Việt tại nhà. Cần người appreciate fine dining cùng thưởng thức.', place: 'Private Kitchen Q2', cat: 'tra_phi', price: 500000 },
    { title: 'Cooking date: Học nấu phở chuẩn vị', desc: 'Muốn dạy bạn nấu tô phở Hà Nội chuẩn gốc. Từ ninh xương đến gia vị. Date vừa vui vừa có ích!', place: 'Kitchen Studio Q1', cat: 'tim_yeu' },
    { title: 'Wine pairing dinner tại La Maison', desc: 'Đặt bàn wine pairing 7 course tại La Maison. Cần người cùng thưởng thức và thảo luận về ẩm thực.', place: 'La Maison Q1', cat: 'tra_phi', price: 800000 },
  ],
  yoga: [
    { title: 'Yoga sáng + smoothie bowl date 🧘‍♀️', desc: 'Buổi sáng hoàn hảo: yoga 45 phút rồi đi ăn smoothie bowl organic. Ai thích lối sống healthy join không?', place: 'Yoga Studio Q2', cat: 'tim_yeu' },
    { title: 'Plant-based brunch cuối tuần', desc: 'Mình biết quán brunch plant-based siêu ngon ở Thảo Điền. Menu toàn đồ organic, không gluten. Ai đi cùng?', place: 'Green Kitchen Thảo Điền', cat: 'tim_ban' },
  ],
  student: [
    { title: 'Ăn vặt đêm khuya ai đi? 🌙', desc: 'Sinh viên đói bụng lúc 10 giờ tối. Ai muốn đi ăn xiên que, trà sữa, bánh tráng trộn ở khu Đại học?', place: 'Khu ĐH Thủ Đức', cat: 'tim_ban' },
    { title: 'Thử hết quán mì cay Đà Nẵng', desc: 'Challenge: ăn mì cay 7 cấp ở 5 quán khác nhau trong 1 ngày. Ai đủ can đảm đi cùng? 🌶️🔥', place: 'Đà Nẵng', cat: 'tim_ban' },
    { title: 'Budget date 50k: ăn no bụng SG', desc: 'Thử thách date với ngân sách 50k/người mà vẫn ăn no. Cơm tấm, bánh mì, nước mía... Ai vào?', place: 'Q1 Sài Gòn', cat: 'tim_yeu' },
  ],
  marketing: [
    { title: 'Brunch & Brainstorm Saturday 📸', desc: 'Cuối tuần chill tại brunch spot mới. Vừa ăn ngon vừa brainstorm ý tưởng content. Food photography lovers welcome!', place: 'The Deck Saigon Q2', cat: 'tim_ban' },
    { title: 'Food photography walk quận 1', desc: 'Tổ chức buổi đi bộ chụp ảnh ẩm thực quận 1. Từ chợ Bến Thành đến hẻm ăn vặt. Ai mang máy ảnh đi!', place: 'Quận 1 TPHCM', cat: 'tim_ban' },
  ],
  developer: [
    { title: 'Code & Café đêm khuya 💻☕', desc: 'Tìm bạn code đêm khuya. Mang laptop ra quán café 24/7, vừa code vừa uống cà phê. Deadline nhưng không cô đơn!', place: 'Café 24h Q1', cat: 'tim_ban' },
    { title: 'Lẩu 2AM cho team thức khuya 🍲', desc: 'Ai thức khuya cùng đi ăn lẩu Thái siêu cay lúc 2 giờ sáng? Vừa ăn vừa tâm sự chuyện đời.', place: 'Lẩu Thái Q10', cat: 'tim_ban' },
    { title: 'Tìm bạn gái cùng mê công nghệ & ẩm thực', desc: 'Developer tìm người hiểu niềm vui khi deploy thành công lúc 3AM rồi đi ăn phở. Đó là tình yêu! 😂', place: 'Anywhere SG', cat: 'tim_yeu' },
  ],
  designer: [
    { title: 'Quán mới khai trương, decor siêu đẹp 🎨', desc: 'Phát hiện quán cà phê mới mở, decor Wes Anderson style. Cần người đi cùng chụp ảnh và thưởng thức!', place: 'Café Aesthetic Q3', cat: 'tim_ban' },
    { title: 'Art exhibition + dinner date', desc: 'Triển lãm nghệ thuật mới ở The Factory, xong đi ăn tối gần đó. Ai thích nghệ thuật và ẩm thực?', place: 'The Factory Q2', cat: 'tim_yeu' },
  ],
  business: [
    { title: 'Business lunch networking 🤝', desc: 'Đặt bàn VIP tại Pizza 4P\'s cho buổi networking lunch. Dành cho founders và professionals trong ngành F&B.', place: 'Pizza 4P\'s Q1', cat: 'tra_phi', price: 300000 },
    { title: 'Startup dinner — Chia sẻ kinh nghiệm F&B', desc: 'Mời 5 người cùng bàn chuyện kinh doanh F&B tại nhà hàng. Ăn tối sang trọng, networking chất lượng.', place: 'Noir Dining Q1', cat: 'tra_phi', price: 600000 },
  ],
  vlogger: [
    { title: 'Quay vlog ẩm thực Huế ở Sài Gòn 📹', desc: 'Mình đang làm series "Huế trong Sài Gòn". Cần bạn đồng hành thử các quán cơm Huế authentic!', place: 'Quận 1-3 TPHCM', cat: 'tim_ban' },
    { title: 'Group date khám phá quán ăn hidden gem', desc: 'Tổ chức group 4-6 người đi tìm quán ăn bí mật trong hẻm Sài Gòn. Mình quay vlog, các bạn ăn!', place: 'Hẻm Sài Gòn', cat: 'tim_ban' },
    { title: 'Cùng đi review quán ăn Nhật Bản', desc: 'Tuần này theme là ẩm thực Nhật. Sushi, ramen, gyoza... Ai muốn lên sóng cùng mình?', place: 'Q1 TPHCM', cat: 'tim_ban' },
  ],
};

// ============================
// CHAT MESSAGES
// ============================
const CHAT_MESSAGES = {
  foodie: [
    'Hôm nay mình vừa thử quán bún chả mới mở ở quận 3. Ngon lắm!',
    'Bạn có biết quán phở nào mở sớm ở Sài Gòn không? Mình hay dậy sớm ăn phở 🍜',
    'Cuối tuần này đi ăn lẩu không? Mình biết quán lẩu nấm siêu ngon',
    'Review nhanh: quán bánh xèo ở Đinh Công Tráng — 9/10. Phải thử!',
    'Trời mưa thế này chỉ muốn ăn bánh canh cua. Ai đi cùng? 😭',
    'Mình vừa đạt Gold Tier trên GOMET! Ăn đã đủ 50 món rồi 🎉',
  ],
  barista: [
    'Sáng nay pha được shot espresso hoàn hảo. Crema dày 3mm! ☕',
    'Bạn uống cà phê gì? Mình đoán bạn thích cappuccino 😄',
    'Vừa nhận batch cà phê mới từ Đà Lạt. Hương hoa nhài tuyệt vời!',
    'Nếu bạn chưa thử pour over V60, mình sẽ pha cho bạn thử. Game changer!',
    'Coffee date cuối tuần nhé? Mình sẽ mang máy pha đi ☕',
    'Fun fact: Việt Nam là nước sản xuất cà phê lớn thứ 2 thế giới! 🇻🇳',
  ],
  chef: [
    'Vừa hoàn thành recipe mới: phở sốt truffle. Fusion nhưng vẫn giữ gốc Việt 🍜',
    'Tối nay mình thử nấu cơm tấm kiểu molecular gastronomy. Wish me luck!',
    'Wine pairing tip: Pinot Noir hợp với bò kho Việt Nam cực kỳ!',
    'Cuối tuần mình tổ chức dinner party 5 course. Bạn có muốn tham gia?',
    'Secret recipe: thêm một chút mắm nêm vào sốt pasta. Umami bùng nổ! 🤫',
    'Đang nghiên cứu ẩm thực Huế. Mỗi món đều là một tác phẩm nghệ thuật.',
  ],
  yoga: [
    'Namaste! Sáng nay yoga xong đi ăn smoothie bowl. Ngày hoàn hảo 🧘‍♀️',
    'Bạn đã thử overnight oats chưa? Recipe mình chia sẻ nhé!',
    'Ăn clean không có nghĩa là ăn dở. Mình biết quán salad ngon bất ngờ!',
    'Mình tin rằng "you are what you eat". Ăn healthy = sống happy 🌱',
    'Weekend plan: yoga buổi sáng → farmers market → nấu ăn tại nhà',
    'Thử kombucha tự làm rồi chưa? Mình có thể hướng dẫn bạn! 🍵',
  ],
  student: [
    'Sinh viên mà, budget eo hẹp nhưng ăn vẫn phải ngon! Ai giống mình? 😂',
    'Vừa tìm được quán cơm 25k ở Thủ Đức. Cơm đầy đủ 3 món!',
    'Ai ở khu ĐH không? Tối nay đi ăn xiên que hẻm 47 không?',
    'Thử mì cay cấp 7... Miệng cháy luôn nhưng đáng lắm 🌶️🔥🔥🔥',
    'Deadline ngày mai nhưng bụng đói. Priorities! 🍜📚',
    'Phát hiện quán trà sữa mua 1 tặng 1 nè. Ai đi cùng?',
  ],
  marketing: [
    'Vừa chụp được tấm ảnh food cực đẹp. Golden hour + phở = perfect shot 📸',
    'Content idea: "Top 10 quán brunch đẹp nhất Sài Gòn". Ai góp ý?',
    'Brunch spot mới ở quận 2 decor quá đẹp. Instagram-worthy 100%!',
    'Marketing tip: quán ăn nào ảnh đẹp thì khách đông. Fact! 📷',
    'Cuối tuần đi food tour quận 1 với mình không? Mình cần content!',
    'Flat white + bánh croissant + view sông = buổi sáng hoàn hảo ☕🥐',
  ],
  developer: [
    'Bug fix xong lúc 1AM. Reward: lẩu Thái siêu cay! 🍲💻',
    'Deployed successfully → celebrate with phở 🎉',
    'Có ai code đêm rồi đi ăn khuya không? Mình hay như vậy 😅',
    'Stack overflow cho code, GOMET cho food recommendation. Balanced! 🤓',
    'Café có wifi mạnh + ổ cắm + đồ ăn ngon = workspace hoàn hảo',
    'Mình build app về food delivery. Ironic là mình toàn ăn ngoài 😂',
  ],
  designer: [
    'Quán này decor đẹp quá, mình phải vẽ lại interior design! 🎨',
    'Plating matters! Đĩa đẹp thì ăn ngon hơn. Change my mind 😄',
    'Aesthetic cafe mới ở Q3: tone màu terracotta + đèn warm. Perfect!',
    'Food photography tip: chụp từ 45 độ, ánh sáng tự nhiên, minimal props',
    'Mình thiết kế menu cho quán mới. Muốn khoe cho bạn xem!',
    'Color palette của phở: amber broth, white noodles, green herbs. Beautiful! 🍜',
  ],
  business: [
    'Networking lunch hôm nay rất productive. Kết nối được 3 đối tác mới! 🤝',
    'F&B startup tip: location is king, nhưng food quality is emperor 👑',
    'Ai đang kinh doanh nhà hàng/cafe? Mình muốn kết nối và chia sẻ kinh nghiệm',
    'ROI của việc đi ăn networking: priceless. Relationships > transactions',
    'Đang tìm co-founder cho dự án food tech. Ai hứng thú inbox mình!',
    'Business dinner tối nay tại Noir. Dark dining experience — thú vị lắm!',
  ],
  vlogger: [
    'Vừa upload vlog mới: "24h ăn sập Đà Nẵng". 50k views rồi! 🎬',
    'Bí mật: quán ăn ngon nhất thường nằm trong hẻm nhỏ 🗺️',
    'Series mới: "Ẩm thực 63 tỉnh Việt Nam". Đã đi được 45 tỉnh!',
    'Filming tip: quay food ASMR vào ban đêm, âm thanh rõ hơn 🎤',
    'Fan hỏi mình: "Ăn nhiều sao không mập?" Secret: mình đi bộ 10km/ngày 😂',
    'Collab ai không? Cần food blogger cùng quay "Phở Wars" — tìm phở ngon nhất VN!',
  ],
};

// ============================
// ENGINE FUNCTIONS
// ============================

async function createRandomPost(bot) {
  const templates = POST_TEMPLATES[bot.style] || POST_TEMPLATES.foodie;
  const template = templates[Math.floor(Math.random() * templates.length)];

  try {
    const post = await prisma.datePost.create({
      data: {
        authorId: bot.id,
        title: template.title,
        description: template.desc,
        category: template.cat,
        price: template.price || 0,
        time: getRandomFutureTime(),
        place: template.place,
        icon: template.cat === 'tra_phi' ? '💰' : template.cat === 'tim_yeu' ? '❤️' : '👋',
        status: 'open',
      },
    });
    console.log(`📝 ${bot.name} đăng: "${template.title}"`);
    return post;
  } catch (e) {
    console.log(`⚠️ ${bot.name} post error:`, e.message);
  }
}

async function sendRandomMessage(bot) {
  const messages = CHAT_MESSAGES[bot.style] || CHAT_MESSAGES.foodie;
  const text = messages[Math.floor(Math.random() * messages.length)];

  try {
    // Find a conversation for this bot
    const membership = await prisma.conversationMember.findFirst({
      where: { userId: bot.id },
      include: { conversation: { include: { members: true } } },
    });

    if (!membership) return;

    const msg = await prisma.message.create({
      data: {
        conversationId: membership.conversationId,
        senderId: bot.id,
        text,
      },
    });

    const otherMember = membership.conversation.members.find(m => m.userId !== bot.id);
    console.log(`💬 ${bot.name} → ${otherMember?.userId || '?'}: "${text.substring(0, 50)}..."`);
    return msg;
  } catch (e) {
    console.log(`⚠️ ${bot.name} chat error:`, e.message);
  }
}

async function applyToRandomPost(bot) {
  try {
    const posts = await prisma.datePost.findMany({
      where: {
        status: 'open',
        authorId: { not: bot.id },
      },
      take: 10,
    });

    if (posts.length === 0) return;

    const post = posts[Math.floor(Math.random() * posts.length)];

    await prisma.dateApplication.create({
      data: {
        postId: post.id,
        applicantId: bot.id,
        message: `Mình là ${bot.name}, rất muốn tham gia! 🙋`,
        status: 'pending',
      },
    });

    console.log(`🙋 ${bot.name} ứng tuyển: "${post.title}"`);
  } catch (e) {
    // Duplicate application is fine
    if (!e.message.includes('Unique constraint')) {
      console.log(`⚠️ ${bot.name} apply error:`, e.message);
    }
  }
}

async function earnVangPoints(bot) {
  const actions = [
    { type: 'reward', desc: 'Đăng nhập hàng ngày', amount: 5 },
    { type: 'reward', desc: 'Thử món mới', amount: 10 },
    { type: 'reward', desc: 'Chia sẻ Moment', amount: 15 },
    { type: 'reward', desc: 'Hoàn thành thử thách', amount: 50 },
  ];

  const action = actions[Math.floor(Math.random() * actions.length)];

  try {
    await prisma.transaction.create({
      data: {
        userId: bot.id,
        type: action.type,
        amount: action.amount,
        description: action.desc,
      },
    });

    await prisma.user.update({
      where: { id: bot.id },
      data: { walletBalance: { increment: action.amount } },
    });

    console.log(`⭐ ${bot.name} +${action.amount} Vàng (${action.desc})`);
  } catch (e) {
    console.log(`⚠️ ${bot.name} vang error:`, e.message);
  }
}

// ============================
// HELPERS
// ============================

function getRandomFutureTime() {
  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  const times = ['8:00', '10:00', '11:30', '12:00', '14:00', '17:00', '18:30', '19:00', '20:00', '21:00'];
  return `${days[Math.floor(Math.random() * days.length)]} ${times[Math.floor(Math.random() * times.length)]}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================
// MAIN LOOP
// ============================

async function runCycle() {
  const hour = new Date().getHours();
  console.log(`\n🔄 === Cycle at ${new Date().toLocaleTimeString('vi-VN')} ===`);

  for (const bot of BOTS) {
    // Each bot has 30% chance to act per cycle
    if (Math.random() > 0.3) continue;

    // Pick random action
    const roll = Math.random();
    if (roll < 0.25) {
      await createRandomPost(bot);
    } else if (roll < 0.55) {
      await sendRandomMessage(bot);
    } else if (roll < 0.75) {
      await applyToRandomPost(bot);
    } else {
      await earnVangPoints(bot);
    }

    await sleep(500); // Delay between bot actions
  }
}

async function main() {
  console.log('🤖 GOMET Bot Engine Started');
  console.log(`👥 ${BOTS.length} bots active`);
  console.log('📋 Actions: Post, Chat, Apply, Earn Vàng');
  console.log('⏰ Cycle every 60 seconds\n');

  // Run immediately
  await runCycle();

  // Then run every 60 seconds
  setInterval(async () => {
    try {
      await runCycle();
    } catch (e) {
      console.error('Cycle error:', e.message);
    }
  }, 60000);
}

main().catch(console.error);
