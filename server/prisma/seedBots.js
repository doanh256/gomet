import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================
// Map 10 bot personas to existing seed user IDs
// ============================================================
const U = {
  tuanMinh:  'u1',
  hoaiAn:    'u2',
  ducHuy:    'f1',  // existing "Hoai An" in seed — will be overwritten
  lanKhue:   'f2',
  baoTram:   'f3',
  kyDuyen:   'f4',
  nhatLinh:  'f5',
  camVan:    'f6',
  minhKhang: 'f7',
  thuHa:     'f8',
};

// ============================================================
// A. Bot Persona Profile Updates
// ============================================================
const PROFILES = [
  {
    id: U.tuanMinh, name: 'Tuan Minh', age: 28, gender: 'male',
    location: 'TP.HCM',
    bio: 'Blogger am thuc | Di khap Sai Gon tim pho ngon nhat | Team cay',
    interests: JSON.stringify(['Am thuc', 'Pho', 'Street food', 'Review quan an']),
    walletBalance: 350000,
  },
  {
    id: U.hoaiAn, name: 'Hoai An', age: 25, gender: 'female',
    location: 'TP.HCM',
    bio: 'Barista tai The Workshop | Yeu latte art va banh ngot | Coffee date?',
    interests: JSON.stringify(['Ca phe', 'Latte art', 'Banh ngot', 'Specialty coffee']),
    walletBalance: 180000,
  },
  {
    id: U.ducHuy, name: 'Duc Huy', age: 30, gender: 'male',
    location: 'Ha Noi',
    bio: 'Sous chef | Me French-Vietnamese fusion | Wine pairing lover',
    interests: JSON.stringify(['Nau an', 'Fine dining', 'Wine', 'French cuisine']),
    walletBalance: 420000,
  },
  {
    id: U.lanKhue, name: 'Lan Khue', age: 27, gender: 'female',
    location: 'TP.HCM',
    bio: 'Yoga instructor | An clean, song xanh | Plant-based curious',
    interests: JSON.stringify(['Yoga', 'Healthy food', 'Meditation', 'Plant-based']),
    walletBalance: 250000,
  },
  {
    id: U.baoTram, name: 'Bao Tram', age: 24, gender: 'female',
    location: 'Da Nang',
    bio: 'Sinh vien Da Nang | An vat la dam me | Cay max',
    interests: JSON.stringify(['An vat', 'Do cay', 'Bun bo', 'Kham pha quan']),
    walletBalance: 75000,
  },
  {
    id: U.kyDuyen, name: 'Ky Duyen', age: 29, gender: 'female',
    location: 'TP.HCM',
    bio: 'Marketing @ tech startup | Cuoi tuan = brunch date | Food photography',
    interests: JSON.stringify(['Brunch', 'Marketing', 'Food photography', 'Networking']),
    walletBalance: 310000,
  },
  {
    id: U.nhatLinh, name: 'Nhat Linh', age: 26, gender: 'male',
    location: 'TP.HCM',
    bio: 'Dev by day, foodie by night | Lau luc 2AM is my love language',
    interests: JSON.stringify(['Coding', 'Lau', 'An dem', 'Tech']),
    walletBalance: 290000,
  },
  {
    id: U.camVan, name: 'Cam Van', age: 23, gender: 'female',
    location: 'TP.HCM',
    bio: 'Fashion designer | An bang mat truoc | Aesthetic first',
    interests: JSON.stringify(['Fashion', 'Aesthetic', 'Food photography', 'Design']),
    walletBalance: 160000,
  },
  {
    id: U.minhKhang, name: 'Minh Khang', age: 31, gender: 'male',
    location: 'TP.HCM',
    bio: 'Founder startup F&B | Networking qua bua an | Business meets food',
    interests: JSON.stringify(['F&B', 'Startup', 'Networking', 'Business dining']),
    walletBalance: 480000,
  },
  {
    id: U.thuHa, name: 'Thu Ha', age: 22, gender: 'female',
    location: 'Ha Noi',
    bio: 'Travel vlogger | Kham pha am thuc 63 tinh | Da di 45/63',
    interests: JSON.stringify(['Travel', 'Vlog', 'Am thuc vung mien', 'Kham pha']),
    walletBalance: 130000,
  },
];

// ============================================================
// B. Match Pairs  (10 pairs)
// ============================================================
const MATCH_PAIRS = [
  [U.tuanMinh, U.hoaiAn],
  [U.tuanMinh, U.kyDuyen],
  [U.hoaiAn,   U.nhatLinh],
  [U.ducHuy,   U.lanKhue],
  [U.ducHuy,   U.camVan],
  [U.lanKhue,  U.minhKhang],
  [U.baoTram,  U.nhatLinh],
  [U.baoTram,  U.thuHa],
  [U.kyDuyen,  U.minhKhang],
  [U.camVan,   U.thuHa],
];

// ============================================================
// C. Conversation Messages
// ============================================================
function buildMessages(convIdx) {
  // convIdx matches MATCH_PAIRS index
  const ALL = [
    // 0: tuanMinh <-> hoaiAn  (foodie + barista)
    [
      [U.tuanMinh, 'Hey! Thay ban lam barista o The Workshop. Quan do ca phe ngon that'],
      [U.hoaiAn,   'Cam on! Ban hay uong gi? Minh co the pha rieng cho ban ne'],
      [U.tuanMinh, 'Minh thich cappuccino. Cuoi tuan nay ban ranh khong? Di thu quan moi mo o quan 3'],
      [U.hoaiAn,   'Oke luon! Minh biet quan do, ca phe specialty ngon lam'],
      [U.tuanMinh, 'Hen 10h sang thu 7 nhe? Tien the an brunch luon'],
      [U.hoaiAn,   'Perfect! Minh se goi y menu cho ban'],
    ],
    // 1: tuanMinh <-> kyDuyen  (foodie + marketing)
    [
      [U.tuanMinh, 'Chao Ky Duyen! Thay ban cung thich food photography'],
      [U.kyDuyen,  'Hi Tuan Minh! Blog am thuc cua ban hay lam. Minh follow roi ne'],
      [U.tuanMinh, 'Cam on! Cuoi tuan di review quan moi khong? Minh can content moi'],
      [U.kyDuyen,  'Deal! Minh cung dang can anh cho Instagram'],
      [U.tuanMinh, 'Quan com nieu SG moi mo o Phu Nhuan, nghe noi trang tri dep lam'],
      [U.kyDuyen,  'Nghe hap dan qua! Thu 7 nay nhe'],
    ],
    // 2: hoaiAn <-> nhatLinh  (barista + developer)
    [
      [U.nhatLinh, 'Chao Hoai An! Minh la dev, hay den The Workshop lam viec. Co khi nao gap ban chua?'],
      [U.hoaiAn,   'Oi that a? Minh thuong ca chieu. Ban hay ngoi goc nao?'],
      [U.nhatLinh, 'Goc cua so tang 2. Minh uong flat white nha'],
      [U.hoaiAn,   'A minh biet roi! Lan sau minh pha rieng cho ban nhe, single origin moi ve'],
      [U.nhatLinh, 'Ngon qua! Cuoi tuan nay ban co pha khong?'],
      [U.hoaiAn,   'Co! Qua luc 3h chieu, minh se chuan bi'],
    ],
    // 3: ducHuy <-> lanKhue  (chef + yoga teacher)
    [
      [U.ducHuy,  'Chao Lan Khue! Minh thay ban an healthy. Minh dang nghien cuu plant-based menu'],
      [U.lanKhue, 'That a? Hay qua! Minh dang tim nguoi hieu ve dinh duong thuc vat'],
      [U.ducHuy,  'Minh co the nau bua toi plant-based cho ban thu. Fusion kieu Phap-Viet'],
      [U.lanKhue, 'Nghe hap dan qua! Khi nao duoc thu?'],
      [U.ducHuy,  'Thu 6 nay nhe? Minh se chuan bi 5 mon'],
      [U.lanKhue, 'Wow 5 mon! Minh mang ruou vang trang nhe'],
    ],
    // 4: ducHuy <-> camVan  (chef + designer)
    [
      [U.camVan, 'Anh Duc Huy! Mon Phap-Viet cua anh tren IG dep qua'],
      [U.ducHuy, 'Cam on! Fashion designer thi mat tham my chac cao lam'],
      [U.camVan, 'Minh thich quan nao plating dep. Anh co goi y khong?'],
      [U.ducHuy, 'La Maison 1888! Fine dining dep nhat Viet Nam'],
      [U.camVan, 'Oi minh mo uoc duoc den do lau roi'],
      [U.ducHuy, 'Cuoi thang nay minh co reservation, di cung khong?'],
    ],
    // 5: lanKhue <-> minhKhang  (yoga + business)
    [
      [U.minhKhang, 'Chao Lan Khue! Minh dang mo F&B healthy food, can tu van dinh duong'],
      [U.lanKhue,   'Hay qua! Minh co chung chi dinh duong. Giup duoc gi?'],
      [U.minhKhang, 'Muon lam menu healthy cho dan van phong. Gap trao doi khong?'],
      [U.lanKhue,   'Duoc! Hen o dau?'],
      [U.minhKhang, 'Pizza 4Ps Hai Ba Trung? Vua an vua ban'],
      [U.lanKhue,   'OK! Minh se mang tai lieu dinh duong theo'],
    ],
    // 6: baoTram <-> nhatLinh  (student + developer)
    [
      [U.baoTram,  'Anh oi, team cay level max gap nhau roi ne'],
      [U.nhatLinh, 'Haha cuoi cung cung tim duoc nguoi cung gu! Da thu mi cay 7 cap chua?'],
      [U.baoTram,  'Roi! O Da Nang co quan bun bo sieu cay, anh phai thu'],
      [U.nhatLinh, 'Lan toi ra Da Nang nhat dinh phai ghe. O SG minh hay an lau Thai sieu cay'],
      [U.baoTram,  'Lau luc 2AM a? Haha dung style anh'],
      [U.nhatLinh, 'Biet ngay! Cuoi thang minh bay ra DN, hen di an cay nhe?'],
    ],
    // 7: baoTram <-> thuHa  (student + vlogger)
    [
      [U.baoTram, 'Thu Ha oi! Minh o Da Nang ne. Vlog cua ban ve am thuc mien Trung hay qua'],
      [U.thuHa,   'Cam on! Da Nang nhieu mon ngon lam. Ban co spot nao bi mat khong?'],
      [U.baoTram, 'Co! Quan banh trang cuon thit heo o Hai Chau, re ma ngon'],
      [U.thuHa,   'Perfect cho vlog! Lan toi ra DN minh quay nhe?'],
      [U.baoTram, 'Oke! Minh dan di an het Da Nang luon'],
      [U.thuHa,   'Deal! Minh se lien he truoc khi bay'],
    ],
    // 8: kyDuyen <-> minhKhang  (marketing + business)
    [
      [U.kyDuyen,  'Hi Minh Khang! Thay anh cung trong nganh F&B. Hay qua'],
      [U.minhKhang,'Chao Ky Duyen! Marketing cho tech startup a? Nganh nao?'],
      [U.kyDuyen,  'Food delivery app. Nen minh hay review quan. Anh co goi y quan brunch ngon khong?'],
      [U.minhKhang,'The Deck Saigon! View song, brunch ngon. Cuoi tuan nay di khong?'],
      [U.kyDuyen,  'Deal! Tien networking luon'],
      [U.minhKhang,'Exactly! Business meets food dung motto minh'],
    ],
    // 9: camVan <-> thuHa  (designer + travel vlogger)
    [
      [U.camVan, 'Thu Ha oi! Minh xem vlog ban ve am thuc Hue. Dep qua!'],
      [U.thuHa,  'Cam on chi! Bun bo Hue la tinh yeu. Chi thich am thuc vung nao?'],
      [U.camVan, 'Minh thich quan nao dep de chup anh hehe. Aesthetic first ma'],
      [U.thuHa,  'Vay phai thu quan com Hue decor sieu dep o quan 1!'],
      [U.camVan, 'Send dia chi di! Minh muon food photography o do'],
      [U.thuHa,  'Ok! Cuoi tuan di cung nhe? Minh quay vlog luon'],
    ],
  ];
  return ALL[convIdx] || [];
}

// ============================================================
// D. Date Posts  (15 posts)
// ============================================================
const DATE_POSTS = [
  {
    id: 'dp01', authorId: U.tuanMinh, category: 'tim_ban',
    title: 'Tim nguoi di an pho Thin Bo Ho o SG',
    description: 'Pho Thin moi mo chi nhanh o Sai Gon. Can ban dong hanh thu pho chuan vi Ha Noi. Ai la fan pho thi len tieng!',
    icon: 'restaurant', time: 'Thu 7, 11:00', place: 'Pho Thin, Ly Tu Trong, Q1',
    price: null, status: 'open',
  },
  {
    id: 'dp02', authorId: U.hoaiAn, category: 'tim_yeu',
    title: 'Coffee date cuoi tuan - Workshop Q1',
    description: 'Muon tim ban uong ca phe specialty cuoi tuan. Minh se pha pour-over va giai thich ve ca phe. Yeu cau: thich ca phe that su!',
    icon: 'coffee', time: 'Chu nhat, 09:00', place: 'The Workshop, Q1, TP.HCM',
    price: null, status: 'open',
  },
  {
    id: 'dp03', authorId: U.ducHuy, category: 'tim_yeu',
    title: 'Dinner date French-Vietnamese fusion',
    description: 'Minh se nau 5 mon fusion Phap-Viet tai nha. Can mot nguoi dong hanh thuong thuc va cho feedback chan thanh.',
    icon: 'restaurant', time: 'Thu 6, 19:00', place: 'Nha rieng, Q3, TP.HCM',
    price: null, status: 'open',
  },
  {
    id: 'dp04', authorId: U.baoTram, category: 'tim_ban',
    title: 'Ai an cay cung minh? Lau Thai sieu cay!',
    description: 'Tim nguoi chiu duoc cay level max. Lau Thai nguyen lieu nhap Thai Lan. Ai yeu thi den, khong chiu duoc thi dung thu!',
    icon: 'restaurant', time: 'Thu 7, 18:30', place: 'Lau Thai Siam, Hai Chau, Da Nang',
    price: null, status: 'open',
  },
  {
    id: 'dp05', authorId: U.kyDuyen, category: 'tim_yeu',
    title: 'Brunch date Saturday - The Deck Saigon',
    description: 'Cuoi tuan di brunch sang chanh. View song Sai Gon, co pancake va eggs benedict. Uu tien nguoi thich chup anh dep.',
    icon: 'coffee', time: 'Thu 7, 10:00', place: 'The Deck Saigon, Q2',
    price: null, status: 'open',
  },
  {
    id: 'dp06', authorId: U.nhatLinh, category: 'tim_ban',
    title: 'Lau 2AM - Ai thuc khuya cung di an?',
    description: 'Developer thuc khuya code xong doi bung. Tim ban an lau luc 2h sang. Chi can ban chiu thuc khuya va an cay duoc.',
    icon: 'restaurant', time: 'Thu 6, 02:00', place: 'Lau bo Nha Trang, Q10, TP.HCM',
    price: null, status: 'open',
  },
  {
    id: 'dp07', authorId: U.minhKhang, category: 'tra_phi',
    title: 'Business lunch networking - Pizza 4Ps',
    description: 'Moi an trua networking danh cho nguoi trong nganh F&B va tech. Minh dai tiec, ban chi can mang y tuong va name card.',
    icon: 'restaurant', time: 'Thu 4, 12:00', place: 'Pizza 4Ps, Hai Ba Trung, Q1',
    price: 200000, status: 'open',
  },
  {
    id: 'dp08', authorId: U.thuHa, category: 'tim_ban',
    title: 'Group date kham pha am thuc Hue o SG',
    description: 'Lap nhom 4-5 nguoi di thu het quan Hue ngon nhat Sai Gon trong 1 ngay. Minh se quay vlog, ban duoc len hinh!',
    icon: 'restaurant', time: 'Chu nhat, 10:00', place: 'Tap trung tai Bui Vien, Q1',
    price: null, status: 'open',
  },
  {
    id: 'dp09', authorId: U.lanKhue, category: 'tim_yeu',
    title: 'Yoga + smoothie bowl morning date',
    description: 'Buoi sang tap yoga nhe nhang roi di an smoothie bowl. Tim ban co loi song lanh manh, thich su binh yen.',
    icon: 'coffee', time: 'Chu nhat, 06:30', place: 'Yoga studio, Q7, TP.HCM',
    price: null, status: 'open',
  },
  {
    id: 'dp10', authorId: U.camVan, category: 'tim_ban',
    title: 'Quan moi khai truong, can ban di thu',
    description: 'Quan ca phe phong cach Nhat moi mo o Q3. Decor sieu dep, can ban di chup anh cung. Ai co gu tham my thi len!',
    icon: 'coffee', time: 'Thu 7, 14:00', place: 'Kissa Cafe, Q3, TP.HCM',
    price: null, status: 'open',
  },
  {
    id: 'dp11', authorId: U.tuanMinh, category: 'tra_phi',
    title: 'Can nguoi di an cuoi nguoi yeu cu',
    description: 'Cuoi thang nay nguoi yeu cu moi di dam cuoi. Can mot ban nu di cung de cuoc song bot kho. Minh bao an bao uong!',
    icon: 'heart', time: 'Chu nhat, 11:00', place: 'Trung tam hoi nghi, Q7, TP.HCM',
    price: 500000, status: 'open',
  },
  {
    id: 'dp12', authorId: U.ducHuy, category: 'tra_phi',
    title: 'Wine tasting date - La Maison 1888',
    description: 'Dem wine tasting voi 5 loai vang Phap. Minh se giai thich cach thuong thuc. Chi phi bao gom ruou va cheese board.',
    icon: 'restaurant', time: 'Thu 6, 20:00', place: 'La Maison 1888, Q1, TP.HCM',
    price: 300000, status: 'open',
  },
  {
    id: 'dp13', authorId: U.kyDuyen, category: 'tim_ban',
    title: 'Food photography walk Saigon',
    description: 'Di dao chup anh am thuc duong pho Sai Gon. Tu banh mi den che, chup het! Can ban co dien thoai chup dep la du.',
    icon: 'coffee', time: 'Chu nhat, 16:00', place: 'Xuat phat tai cho Ben Thanh, Q1',
    price: null, status: 'open',
  },
  {
    id: 'dp14', authorId: U.baoTram, category: 'tim_ban',
    title: 'Thu het quan bun bo Da Nang trong 1 ngay',
    description: 'Thach thuc: an 5 quan bun bo trong 1 ngay. Ai du can dam va da day thi join. Chi phi tu tra, tinh than la chinh!',
    icon: 'restaurant', time: 'Thu 7, 08:00', place: 'Quan 1: Ba Phuong, Hai Chau, Da Nang',
    price: null, status: 'open',
  },
  {
    id: 'dp15', authorId: U.nhatLinh, category: 'tim_yeu',
    title: 'Coding + Cafe date cho developers',
    description: 'Tim ban dev cung ngoi cafe, code side project. Co the pair programming hoac chi im lang code canh nhau cung vui.',
    icon: 'coffee', time: 'Thu 7, 14:00', place: 'The Workshop, Q1, TP.HCM',
    price: null, status: 'open',
  },
];

// ============================================================
// E. Date Applications  (10 applications)
// ============================================================
const DATE_APPLICATIONS = [
  { postId: 'dp01', applicantId: U.hoaiAn,   message: 'Minh cung thich pho! Di cung nhe' },
  { postId: 'dp04', applicantId: U.nhatLinh,  message: 'Team cay max co mat! San sang roi' },
  { postId: 'dp03', applicantId: U.lanKhue,   message: 'Minh rat muon thu menu plant-based cua ban' },
  { postId: 'dp07', applicantId: U.kyDuyen,   message: 'Marketing cho food app, minh muon networking' },
  { postId: 'dp08', applicantId: U.camVan,    message: 'Minh muon chup anh mon Hue dep lam!' },
  { postId: 'dp05', applicantId: U.tuanMinh,  message: 'Blogger am thuc xin phep dong hanh' },
  { postId: 'dp06', applicantId: U.baoTram,   message: 'Sinh vien thuc khuya chuyen nghiep day!' },
  { postId: 'dp09', applicantId: U.ducHuy,    message: 'Chef cung can can bang, minh tap yoga nhe' },
  { postId: 'dp02', applicantId: U.nhatLinh,  message: 'Dev can ca phe de song, cho minh tham gia' },
  { postId: 'dp15', applicantId: U.hoaiAn,    message: 'Minh khong code nhung muon pha ca phe cho cac ban' },
];

// ============================================================
// F. Transactions (20 records)
// ============================================================
const TRANSACTIONS = [
  { userId: U.tuanMinh,  type: 'topup',        amount: 200000, description: 'Nap vi qua MoMo' },
  { userId: U.tuanMinh,  type: 'date_payment',  amount: -500000, description: 'Thanh toan date post: An cuoi nguoi yeu cu', relatedPostId: 'dp11' },
  { userId: U.hoaiAn,    type: 'topup',        amount: 100000, description: 'Nap vi qua ZaloPay' },
  { userId: U.hoaiAn,    type: 'reward',       amount: 50000,  description: 'Thuong match dau tien' },
  { userId: U.ducHuy,    type: 'topup',        amount: 300000, description: 'Nap vi qua chuyen khoan' },
  { userId: U.ducHuy,    type: 'date_payment',  amount: -300000, description: 'Thanh toan date post: Wine tasting', relatedPostId: 'dp12' },
  { userId: U.lanKhue,   type: 'topup',        amount: 150000, description: 'Nap vi qua MoMo' },
  { userId: U.lanKhue,   type: 'reward',       amount: 30000,  description: 'Thuong hoan thanh profile' },
  { userId: U.baoTram,   type: 'topup',        amount: 50000,  description: 'Nap vi qua the cao' },
  { userId: U.baoTram,   type: 'reward',       amount: 25000,  description: 'Thuong dang date post dau tien' },
  { userId: U.kyDuyen,   type: 'topup',        amount: 200000, description: 'Nap vi qua MoMo' },
  { userId: U.kyDuyen,   type: 'date_payment',  amount: -100000, description: 'Apply business lunch networking', relatedPostId: 'dp07' },
  { userId: U.nhatLinh,  type: 'topup',        amount: 200000, description: 'Nap vi qua VNPay' },
  { userId: U.nhatLinh,  type: 'reward',       amount: 40000,  description: 'Thuong moi ban be' },
  { userId: U.camVan,    type: 'topup',        amount: 100000, description: 'Nap vi qua chuyen khoan' },
  { userId: U.camVan,    type: 'reward',       amount: 60000,  description: 'Thuong review date post' },
  { userId: U.minhKhang, type: 'topup',        amount: 500000, description: 'Nap vi qua chuyen khoan' },
  { userId: U.minhKhang, type: 'date_payment',  amount: -200000, description: 'Thanh toan date post: Business lunch', relatedPostId: 'dp07' },
  { userId: U.thuHa,     type: 'topup',        amount: 100000, description: 'Nap vi qua ZaloPay' },
  { userId: U.thuHa,     type: 'reward',       amount: 35000,  description: 'Thuong vlog am thuc hay' },
];

// ============================================================
// Main seed function
// ============================================================
async function main() {
  console.log('=== GOMET Bot Seed Script ===');
  console.log('This script adds rich bot data ON TOP of existing seed data.\n');

  // ----------------------------------------------------------
  // A. Update user profiles
  // ----------------------------------------------------------
  console.log('[A] Updating 10 bot user profiles...');
  for (const p of PROFILES) {
    const { id, ...data } = p;
    try {
      await prisma.user.update({ where: { id }, data });
      console.log(`    Updated ${id} -> ${data.name}`);
    } catch (err) {
      console.warn(`    WARN: Could not update user ${id}: ${err.message}`);
    }
  }

  // ----------------------------------------------------------
  // B. Create Matches + Conversations + Members
  // ----------------------------------------------------------
  console.log('\n[B] Creating 10 matches with conversations...');

  // First clean up any existing matches/convos between these pairs so we don't conflict
  for (const [id1, id2] of MATCH_PAIRS) {
    const [sorted1, sorted2] = [id1, id2].sort();
    try {
      await prisma.match.deleteMany({ where: { user1Id: sorted1, user2Id: sorted2 } });
    } catch (_) { /* ignore */ }
  }

  const convMap = {}; // index -> conversationId

  for (let i = 0; i < MATCH_PAIRS.length; i++) {
    const [id1, id2] = MATCH_PAIRS[i];
    const [sorted1, sorted2] = [id1, id2].sort();

    // Create Match
    await prisma.match.create({
      data: { user1Id: sorted1, user2Id: sorted2 },
    });

    // Create Conversation with members
    const conv = await prisma.conversation.create({
      data: {
        type: 'match',
        members: { create: [{ userId: id1 }, { userId: id2 }] },
      },
    });
    convMap[i] = conv.id;

    // System icebreaker
    await prisma.message.create({
      data: {
        conversationId: conv.id,
        senderId: id1,
        text: 'Ban da ket noi! Nhan tin pha bang ngay!',
        isSystem: true,
      },
    });

    console.log(`    Match ${sorted1} <-> ${sorted2}  |  conv=${conv.id.slice(0, 8)}...`);
  }

  // ----------------------------------------------------------
  // C. Create Messages in conversations
  // ----------------------------------------------------------
  console.log('\n[C] Creating messages across 10 conversations...');
  let totalMessages = 0;
  for (let i = 0; i < MATCH_PAIRS.length; i++) {
    const msgs = buildMessages(i);
    const convId = convMap[i];
    if (!convId || msgs.length === 0) continue;

    const baseTime = new Date('2025-03-01T10:00:00Z');
    for (let j = 0; j < msgs.length; j++) {
      const [senderId, text] = msgs[j];
      const createdAt = new Date(baseTime.getTime() + (i * 86400000) + (j * 300000)); // stagger by 5 min
      await prisma.message.create({
        data: { conversationId: convId, senderId, text, createdAt },
      });
      totalMessages++;
    }
  }
  console.log(`    Created ${totalMessages} messages total`);

  // ----------------------------------------------------------
  // D. Create Date Posts
  // ----------------------------------------------------------
  console.log('\n[D] Creating 15 date posts...');
  for (const post of DATE_POSTS) {
    try {
      await prisma.datePost.create({ data: post });
      console.log(`    ${post.id}: "${post.title.slice(0, 40)}..."`);
    } catch (err) {
      console.warn(`    WARN: Could not create post ${post.id}: ${err.message}`);
    }
  }

  // ----------------------------------------------------------
  // E. Create Date Applications
  // ----------------------------------------------------------
  console.log('\n[E] Creating 10 date applications...');
  for (const app of DATE_APPLICATIONS) {
    try {
      await prisma.dateApplication.create({ data: app });
      console.log(`    ${app.applicantId} -> post ${app.postId}`);
    } catch (err) {
      console.warn(`    WARN: Could not create application: ${err.message}`);
    }
  }

  // ----------------------------------------------------------
  // F. Create Transactions
  // ----------------------------------------------------------
  console.log('\n[F] Creating 20 transactions...');
  for (const tx of TRANSACTIONS) {
    try {
      await prisma.transaction.create({ data: tx });
    } catch (err) {
      console.warn(`    WARN: Could not create transaction: ${err.message}`);
    }
  }
  console.log(`    Created ${TRANSACTIONS.length} transactions`);

  // ----------------------------------------------------------
  // Also create mutual Swipes for each match pair (like + like)
  // ----------------------------------------------------------
  console.log('\n[+] Creating mutual swipes for matches...');
  for (const [id1, id2] of MATCH_PAIRS) {
    try {
      await prisma.swipe.createMany({
        data: [
          { senderId: id1, targetId: id2, action: 'like' },
          { senderId: id2, targetId: id1, action: 'like' },
        ],
        skipDuplicates: true,
      });
    } catch (err) {
      // might already exist from base seed
      console.warn(`    Swipe pair ${id1}<->${id2} may already exist`);
    }
  }

  console.log('\n=== Bot seed complete! ===');
}

main()
  .catch((err) => {
    console.error('FATAL:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
