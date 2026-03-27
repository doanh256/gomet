# UX Audit Report — GOMET App
**Date:** 2026-03-25
**Auditor:** Claude (UX Tester)
**Method:** Code review + live browser snapshot (port 5173)
**Stack:** React 19 + Vite 8 + Express + Prisma (SQLite/PostgreSQL)
**Focus:** Giai đoạn 1 — Post buổi hẹn (DatePostsPage) là core flow

---

## TÓM TẮT ĐIỂM SỐ

| Heuristic Nielsen | Điểm | Ghi chú |
|---|---|---|
| 1. Visibility of system status | 6/10 | Loading states có, nhưng thiếu progress trên submit |
| 2. Match between system & real world | 4/10 | **Text không có dấu tiếng Việt là lỗi nghiêm trọng** |
| 3. User control & freedom | 5/10 | Không có undo swipe, không có back trên modal |
| 4. Consistency & standards | 5/10 | Nav links broken, icon text fallback |
| 5. Error prevention | 5/10 | Thiếu validation, time field là free text |
| 6. Recognition vs recall | 6/10 | Icons rõ ràng nhưng shortcuts ẩn |
| 7. Flexibility & efficiency | 6/10 | Keyboard shortcuts tốt, nhưng chỉ desktop |
| 8. Aesthetic & minimalist design | 7/10 | Dark theme đẹp, nhưng DatePosts quá desktop-first |
| 9. Error recovery | 5/10 | Toast có, nhưng không có chi tiết lỗi |
| 10. Help & documentation | 3/10 | Không có onboarding tips, không có tooltips |

**Tổng thể: 5.2/10** — Có nền tảng tốt về visual design nhưng nhiều broken flows nghiêm trọng.

---

## 🔴 CRITICAL BUGS (phải fix trước launch)

### BUG-01: Toàn bộ text tiếng Việt bị mất dấu
**Nơi xảy ra:** OnboardingPage, SwipePage, DatePostsPage, ProfilePage, UserLayout
**Ví dụ:**
```
"Buoc 1/4"          → nên là "Bước 1/4"
"Gioi tinh & Tuoi"  → nên là "Giới tính & Tuổi"
"Tim nguoi phu hop" → nên là "Tìm người phù hợp"
"Ung Tuyen"         → nên là "Ứng Tuyển"
"Het roi!"          → nên là "Hết rồi!"
"Dang cho"          → nên là "Đang chờ"
"Bo qua"            → nên là "Bỏ qua"
"Chua co keo nao"   → nên là "Chưa có kèo nào"
```
**Impact:** Cực kỳ nghiêm trọng. App nhắm đến người Việt Nam nhưng text hiển thị như Viet Latinh không dấu. Gây ấn tượng app chưa hoàn thiện. Làm hỏng toàn bộ brand "premium dating app".

---

### BUG-02: Navigation links chết — Mobile Bottom Nav
**File:** `src/layouts/UserLayout.jsx` (line 30-36)
```js
const mobileNav = [
  { label: 'GO',   icon: 'home',   path: '/app' },       // ✅ OK
  { label: 'QUIZ', icon: 'quiz',   path: '/app/quiz' },  // ❌ Route không tồn tại
  { label: 'MEET', icon: 'groups', path: '/app/meet' },  // ❌ Route không tồn tại
  { label: 'CHAT', icon: 'chat',   path: '/app/chat' },  // ✅ OK
  { label: 'ME',   icon: 'person', path: '/app/profile'},// ✅ OK
];
```
**Impact:** 2/5 tab của bottom nav dẫn đến 404. Người dùng mobile không thể access QUIZ và MEET flows.

---

### BUG-03: Navigation links chết — Desktop Sidebar
**File:** `src/layouts/UserLayout.jsx` (line 22-28)
```js
{ label: 'Hotspots',    path: '/app/hotspots' },    // ❌ 404
{ label: "Chef's Table",path: '/app/chefs-table' }, // ❌ 404
{ label: 'My Vang',     path: '/app/my-vang' },     // ❌ 404
{ label: 'Cai dat',     path: '/app/settings' },    // ✅ OK
```
Nút "Thach thuc moi" → `/app/challenges` cũng 404.
**Impact:** 60% nav items trên desktop là broken.

---

### BUG-04: FAB bị che bởi Bottom Nav trên mobile
**File:** `src/pages/User/DatePostsPage.jsx` (line 541-561)
```js
// FAB position:
bottom: '32px',  // ← Chỉ 32px từ bottom
right: '32px',

// Bottom nav height: 80px
// → FAB bị che mất hoàn toàn bởi bottom nav bar
```
**Fix cần:** FAB phải ở `bottom: 96px` trên mobile.
**Impact:** Người dùng mobile không thể nhấn nút tạo bài đăng mới — core feature bị khoá.

---

### BUG-05: Group date route không tồn tại
**File:** `src/pages/User/DatePostsPage.jsx` (line 508)
```js
navigate(`/app/dates/${post.id}/group`)
// Route này không có trong App.jsx
```
**Impact:** Nhấn "Tham Gia" trên group event → 404.

---

## 🟠 HIGH SEVERITY ISSUES

### ISSUE-01: Onboarding thiếu bước chọn sở thích ẩm thực
**Core value prop của GOMET là ghép đôi theo khẩu vị.** Onboarding chỉ hỏi:
- Bước 1: Giới tính, tuổi, vị trí
- Bước 2: Ảnh đại diện
- Bước 3: Bio + Interests (generic: "Ca phe, Du lich, Am nhac"...)
- Bước 4: Success

**Không có bước nào hỏi:**
- Độ cay yêu thích
- Phong cách ăn uống (Street food vs Fine dining)
- Vùng miền ẩm thực
- Budget cho buổi hẹn

Kết quả: SwipePage hiển thị "taste profile" nhưng dữ liệu là mocked/random vì onboarding chưa thu thập.

---

### ISSUE-02: Match score là random, không phải AI
**File:** `src/pages/User/SwipePage.jsx` (line 158)
```js
const matchScore = currentProfile?.matchScore || Math.floor(Math.random() * 15) + 82;
```
Người dùng thấy "94% match" — nhưng đây là số ngẫu nhiên từ 82–97%.
**Ethical concern:** Misleading users về AI capabilities. Ảnh hưởng đến trust.

---

### ISSUE-03: DatePostsPage — CreatePostModal thiếu image upload
Form tạo date post không có trường upload ảnh. Cards hiển thị hình (`post.image`) nhưng không có cách nào để user set ảnh khi tạo bài.
Kết quả: Cards mới tạo luôn dùng ảnh avatar của tác giả làm fallback — trông không đúng với concept.

---

### ISSUE-04: Category khi create post bị hardcode khi ở tab "Tất Cả"
**File:** `src/pages/User/DatePostsPage.jsx` (line 63)
```js
await api.post('/date-posts', {
  ...formData,
  category: activeTab === 'all' ? 'tim_yeu' : activeTab
  // Tự động gán "tim_yeu" mà không hỏi user
});
```
User không được chọn category trong modal. Nếu đang ở tab "Tất Cả" → luôn tạo "Tìm Yêu" kể cả khi user muốn "Tìm Bạn".

---

### ISSUE-05: "Icon" field gây nhầm lẫn trong CreatePostModal
```js
<input value={icon} placeholder="VD: coffee, heart, star" />
```
Placeholder gợi ý Material Icons names — không phải emoji. User Việt Nam sẽ không biết "coffee" là gì. Nên thay bằng emoji picker hoặc preset icon buttons.

---

### ISSUE-06: Profile page dùng hardcoded mock data
**File:** `src/pages/User/ProfilePage.jsx` (line 18-24)
```js
const RECENT_DISHES = [
  { id: 1, name: 'Bun bo Hue', restaurant: 'Quan Hue Xua', ... },
  // ← Hardcoded, không fetch từ API
];
const TASTE_AXES = [
  { key: 'cay', value: 75, ... }, // ← Hardcoded values
];
```
User không thấy data thật của mình. dishCount hardcoded là `84`.

---

### ISSUE-07: SuperLike button misleadingly labeled "Nhắn tin"
**File:** `src/pages/User/SwipePage.jsx` (line 691)
```js
renderActionBtn(..., 'chat_bubble', ..., handleSuperLike, 'Nhan tin')
```
- Icon: `chat_bubble` (trông như chat)
- aria-label: "Nhan tin" (nhắn tin)
- Thực tế: gọi `handleSuperLike()`

User bấm "chat" để nhắn tin nhưng thực ra là superlike. Rất confusing.

---

## 🟡 MEDIUM ISSUES

### ISSUE-08: Không có date/time picker
Time field trong CreatePostModal là free-text: `placeholder="VD: Tối nay 20:00"`. Cần `<input type="datetime-local">` hoặc date picker để dữ liệu có cấu trúc.

### ISSUE-09: Age validation yếu
```html
<input type="number" min="18" max="99" />
```
HTML `min` không ngăn user nhập 17 vào — chỉ affect form validation khi submit. Không có client-side feedback khi giá trị không hợp lệ.

### ISSUE-10: Location là free text, không có autocomplete
Placeholder "VD: Ha Noi" (lại không dấu). Nên integrate Google Places API hoặc ít nhất dropdown danh sách thành phố Việt Nam.

### ISSUE-11: Không có undo swipe
Swipe là destructive action — sau khi left-swipe không có cách undo. Tinder, Bumble đều có undo (premium). Cân nhắc ít nhất 1 undo free/ngày.

### ISSUE-12: `window.confirm()` trong delete account
```js
if (!window.confirm('Ban co chac chan muon xoa tai khoan?...'))
```
Native browser dialog: mất consistent với design system, không stylable, tên file/URL lộ ra, trông unprofessional.

### ISSUE-13: Apply button loading state thiếu
Khi user nhấn "Gửi" apply, không có loading indicator. User không biết request đang xử lý.

### ISSUE-14: DatePostsPage layout desktop-first
```js
padding: '48px 32px 32px',    // 32px horizontal padding
maxWidth: '1200px',
gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
```
Trên mobile (390px), 32px padding × 2 = 64px → chỉ còn 326px cho card. Grid 340px minimum → force single column, nhưng padding quá lớn. **Nên 16px padding trên mobile.**

### ISSUE-15: Drag threshold 100px là quá lớn
```js
if (dragX > 100) handleSwipe('right');  // 100px = 25% màn hình
```
Feedback hiện ở 50px nhưng action chỉ trigger ở 100px. Users thấy "LIKE" hiện nhưng card không swipe → confusing. Đề xuất: threshold 80px hoặc velocity-based.

---

## 🟢 UX ĐIỂM TÍCH CỰC

| Điểm mạnh | Mô tả |
|---|---|
| **Dark theme premium** | "Persimmon Pulse Nocturnal" — màu sắc nhất quán, glass morphism đẹp |
| **Confetti completion** | Step 4 onboarding có confetti + animation — delight moment tốt |
| **Progress bar onboarding** | 4-step dot indicator rõ ràng, pill animation mượt |
| **Swipe multi-gesture** | Cả drag, tap buttons, AND keyboard shortcuts đều hoạt động |
| **Shimmer loading** | Card image có skeleton loading tốt |
| **Match popup** | Khi match, có popup riêng — standard dating app pattern |
| **Toast notifications** | Feedback consistent qua toàn app |
| **Responsive nav** | Mobile bottom nav + Desktop sidebar — đúng pattern |
| **"Đang chờ" thumbnails** | Preview next profiles sau khi swipe — nice touch |
| **Empty states** | Có empty state và loading state cho mọi list |
| **Code splitting** | 40+ pages lazy loaded — performance tốt |
| **Keyboard shortcuts** | Arrow keys, Space, Enter work trong swipe — desktop UX tốt |

---

## FLOW MAP — VẤN ĐỀ CỤ THỂ

```
LANDING (/)
  ├─ [OK] Value prop rõ ràng — 3 steps + 4 stats
  ├─ [OK] 2 CTAs: Đăng Nhập + Bắt Đầu Miễn Phí
  └─ [WARN] "arrow_forward" text xuất hiện nếu Material Icons không load

REGISTER → ONBOARDING
  ├─ [CRITICAL] Tất cả text không dấu tiếng Việt
  ├─ [CRITICAL] Thiếu bước chọn khẩu vị ẩm thực
  ├─ [BUG] Location field là free text, không có geo
  └─ [OK] 4 bước, progress bar, confetti at end

APP — SWIPE (/app)
  ├─ [CRITICAL] Match score là random (82-97%)
  ├─ [BUG] Superlike button labeled "Nhắn tin"
  ├─ [WARN] Không có undo
  ├─ [WARN] Text không dấu: "Tim nguoi phu hop"
  └─ [OK] Drag + button + keyboard, shimmer loading, empty state

APP — DATE POSTS (/app/dates) ← CORE
  ├─ [CRITICAL] FAB bị che bởi bottom nav (mobile)
  ├─ [CRITICAL] Group route /app/dates/:id/group không tồn tại
  ├─ [HIGH] Không có image upload trong create form
  ├─ [HIGH] Category không cho user chọn khi ở tab "Tất Cả"
  ├─ [HIGH] Icon field confusing (Material Icons names ≠ emoji)
  ├─ [WARN] Time là free text, không có date picker
  ├─ [WARN] Apply button không có loading state
  └─ [OK] Card design đẹp, glass overlay, category badges

APP — PROFILE (/app/profile)
  ├─ [HIGH] Dish history và Taste axes là hardcoded mock data
  ├─ [WARN] window.confirm() cho delete — không consisten
  ├─ [WARN] Max 8 interests không có visual feedback
  └─ [OK] Edit mode toggle, avatar upload, toast feedback

NAVIGATION
  ├─ [CRITICAL] QUIZ + MEET tabs → 404 trên mobile
  ├─ [CRITICAL] Hotspots, Chef's Table, My Vang → 404 trên desktop
  └─ [CRITICAL] /app/challenges → 404
```

---

## PRIORITY FIX LIST

### Phải fix trước khi người dùng thật test:

1. **Tất cả text tiếng Việt** — Thêm dấu cho toàn bộ codebase (BUG-01)
2. **FAB position trên mobile** — Đổi `bottom: '32px'` → `bottom: 'calc(80px + 16px)'` (BUG-04)
3. **Nav links broken** — Map lại QUIZ/MEET → đúng route hoặc ẩn đi (BUG-02, BUG-03)
4. **SuperLike vs Chat button** — Tách rõ 2 action (ISSUE-07)
5. **Match score** — Dùng real data hoặc ẩn đi, không fake (ISSUE-02)

### Phải fix trong sprint 1:

6. **Onboarding thêm bước food preference** (ISSUE-01)
7. **Image upload trong CreatePostModal** (ISSUE-03)
8. **Category selector trong modal** (ISSUE-04)
9. **Date/time picker** (ISSUE-08)
10. **Apply button loading state** (ISSUE-13)

### Cải tiến sau:

11. Profile page: fetch real dish history từ API
12. Location autocomplete
13. Undo swipe
14. Replace `window.confirm()` bằng custom modal
15. Giảm drag threshold xuống 80px

---

## KẾT LUẬN

GOMET có một **design language đẹp** — dark premium theme, glass morphism, gradient brand color nhất quán. Nhưng **execution layer có quá nhiều lỗi nghiêm trọng** khiến core user journey bị gián đoạn:

- Text không dấu tiếng Việt: Nhìn như MVP chưa hoàn thiện
- 60% nav items là broken: User click xong bị 404
- FAB core action bị che trên mobile: Không tạo được bài đăng
- Onboarding không thu thập food data: Core differentiator bị miss

**App cần ít nhất 1-2 sprint để fix các critical bugs trước khi ra public.**

---
*Audit conducted via code analysis + browser snapshot. Live screenshots bị timeout do môi trường dev. Toàn bộ findings dựa trên static code review + accessibility tree snapshot của landing page.*
