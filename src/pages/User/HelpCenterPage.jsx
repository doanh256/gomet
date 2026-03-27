import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = {
  background: '#fcf9f8',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  surfaceContainerHighest: '#e5e2e1',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryContainer: '#d83900',
  primaryFixed: '#ffdbd1',
  onPrimaryFixed: '#3b0900',
  outlineVariant: '#e7bdb2',
  outline: '#926f66',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  onPrimary: '#ffffff',
};

const categories = [
  { icon: 'account_balance_wallet', label: 'Tài khoản & Thanh toán', desc: 'Quản lý gói đăng ký, cài đặt quyền riêng tư và khôi phục tài khoản.' },
  { icon: 'shield', label: 'An toàn', desc: 'Hướng dẫn bảo vệ bản thân khi gặp mặt và sử dụng ứng dụng an toàn.' },
  { icon: 'restaurant', label: 'Đặt chỗ & Sự kiện', desc: 'Cách thức hoạt động của tính năng đặt bàn và hủy lịch hẹn.' },
  { icon: 'verified_user', label: 'Xác minh Danh tính', desc: 'Hướng dẫn nhận dấu tích xanh và nâng cao độ tin cậy của hồ sơ.' },
  { icon: 'help_outline', label: 'Khác', desc: 'Các câu hỏi khác về ứng dụng, tính năng và trải nghiệm người dùng.' },
];

const faqs = [
  {
    q: 'Làm cách nào để báo cáo một tài khoản giả mạo?',
    a: 'Nhấn vào hồ sơ người dùng, chọn biểu tượng 3 chấm ở góc trên cùng bên phải, sau đó chọn "Báo cáo". Chọn lý do báo cáo phù hợp và cung cấp thêm thông tin chi tiết. Đội ngũ kiểm duyệt sẽ xem xét trong vòng 24 giờ.',
  },
  {
    q: 'Tôi có thể hủy buổi hẹn đã xác nhận không?',
    a: 'Có, bạn có thể hủy buổi hẹn trước ít nhất 2 giờ. Vào mục "Buổi hẹn của tôi", chọn buổi hẹn cần hủy rồi nhấn "Hủy". Lưu ý: hủy nhiều lần có thể ảnh hưởng đến điểm đánh giá hồ sơ của bạn.',
  },
  {
    q: 'Làm sao để xác minh tài khoản GoMet?',
    a: 'Vào Cài đặt > Xác minh danh tính. Bạn cần chụp ảnh selfie và ảnh giấy tờ tùy thân hợp lệ. Quá trình xác minh thường mất từ 1-3 ngày làm việc. Sau khi xác minh thành công, hồ sơ của bạn sẽ hiển thị dấu tích xanh.',
  },
  {
    q: 'Cách nạp tiền vào ví GoMet?',
    a: 'Vào mục Ví GoMet > Nạp tiền. Bạn có thể nạp qua thẻ ngân hàng nội địa, MoMo, ZaloPay hoặc chuyển khoản trực tiếp. Tiền sẽ được cộng vào ví trong vòng vài phút sau khi giao dịch thành công.',
  },
  {
    q: 'Dữ liệu cá nhân của tôi được bảo mật như thế nào?',
    a: 'GoMet sử dụng mã hóa end-to-end cho mọi tin nhắn và bảo vệ dữ liệu theo tiêu chuẩn quốc tế. Chúng tôi không bao giờ chia sẻ thông tin cá nhân của bạn với bên thứ ba mà không có sự đồng ý. Xem thêm tại Chính sách Quyền riêng tư.',
  },
  {
    q: 'GoMet Premium có gì đặc biệt?',
    a: 'Premium bao gồm: Xem ai đã thích bạn, Không giới hạn lượt thích mỗi ngày, Boost hồ sơ hàng ngày, Ưu tiên hiển thị trong kết quả tìm kiếm, Bộ lọc nâng cao và nhiều tính năng độc quyền khác.',
  },
];

const safetyTips = [
  { icon: 'location_on', tip: 'Chọn địa điểm hẹn công cộng cho những buổi gặp đầu tiên.' },
  { icon: 'phone', tip: 'Thông báo cho người thân hoặc bạn bè về kế hoạch của bạn.' },
  { icon: 'directions_car', tip: 'Tự thu xếp phương tiện đi lại để chủ động kiểm soát.' },
  { icon: 'local_drink', tip: 'Không để đồ uống của bạn không có người trông coi.' },
];

const HelpCenterPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleFaq = (i) => {
    setExpandedQuestion(prev => prev === i ? null : i);
  };

  const filteredFaqs = search
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs;

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', fontFamily: "'Manrope', sans-serif", color: colors.onSurface }}>

      <header style={{ backgroundColor: colors.surfaceContainerLow, position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${colors.outlineVariant}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', color: colors.onSurface, flexShrink: 0 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: colors.primary, letterSpacing: '-0.5px', flexShrink: 0 }}>GoMet</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: colors.onSurface }}>Trợ giúp & An toàn</div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        <section style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: '-1px', color: colors.onSurface, marginBottom: 16, lineHeight: 1.15 }}>
            Chúng tôi có thể giúp gì cho bạn?
          </h1>
          <p style={{ fontSize: 16, color: colors.onSurfaceVariant, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Tìm câu trả lời nhanh chóng hoặc liên hệ đội ngũ hỗ trợ của chúng tôi.
          </p>
          <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontSize: 22, color: colors.onSurfaceVariant, pointerEvents: 'none' }}>search</span>
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi, hướng dẫn hoặc sự cố..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                height: 56,
                paddingLeft: 52,
                paddingRight: 20,
                borderRadius: 9999,
                border: `2px solid ${searchFocused ? colors.primary : colors.outlineVariant}`,
                backgroundColor: colors.surfaceContainerLowest,
                fontSize: 15,
                fontFamily: "'Manrope', sans-serif",
                color: colors.onSurface,
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 280, position: 'relative', overflow: 'hidden', border: `1px solid ${colors.outlineVariant}` }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 9999, backgroundColor: colors.primaryFixed, color: colors.onPrimaryFixed, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Ưu tiên hàng đầu</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: colors.onSurface, marginBottom: 12, lineHeight: 1.25 }}>Hướng dẫn An toàn khi Hẹn hò</h2>
              <p style={{ fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 1.65, marginBottom: 24, maxWidth: 320 }}>
                Trải nghiệm của bạn sẽ tuyệt vời nhất khi bạn cảm thấy an toàn. Hãy tìm hiểu các bước để bảo vệ bản thân khi gặp mặt trực tiếp.
              </p>
              <button
                style={{ backgroundColor: colors.primary, color: '#ffffff', border: 'none', borderRadius: 9999, padding: '12px 24px', fontSize: 14, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                Xem chi tiết
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
            </div>
            <div style={{ position: 'absolute', right: -20, bottom: -20, width: 140, height: 140, borderRadius: '50%', backgroundColor: colors.primaryFixed, opacity: 0.5 }} />
          </div>

          <div style={{ backgroundColor: colors.errorContainer, borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 44, color: colors.onErrorContainer, marginBottom: 20, fontVariationSettings: "'FILL' 1" }}>report</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: colors.onErrorContainer, marginBottom: 12 }}>Báo cáo & Chặn</h2>
            <p style={{ fontSize: 14, color: colors.onErrorContainer, lineHeight: 1.65, marginBottom: 24, opacity: 0.85 }}>
              Nếu bạn gặp hành vi không phù hợp hoặc cảm thấy không an toàn, hãy sử dụng công cụ báo cáo ngay lập tức.
            </p>
            <button
              style={{ backgroundColor: colors.onErrorContainer, color: '#ffffff', border: 'none', borderRadius: 9999, padding: '12px 24px', fontSize: 14, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer', alignSelf: 'flex-start' }}
            >
              Gửi báo cáo ngay
            </button>
          </div>
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: colors.onSurface, marginBottom: 16 }}>Danh mục hỗ trợ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                style={{
                  backgroundColor: activeCategory === i ? colors.primaryFixed : colors.surfaceContainerLow,
                  border: `1px solid ${activeCategory === i ? colors.primary : colors.outlineVariant}`,
                  borderRadius: 16,
                  padding: '20px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                  textAlign: 'center',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: activeCategory === i ? colors.primary : colors.onSurfaceVariant }}>
                  {cat.icon}
                </span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: activeCategory === i ? colors.primary : colors.onSurface, lineHeight: 1.3 }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
          {activeCategory !== null && (
            <div style={{ marginTop: 12, padding: '16px 20px', backgroundColor: colors.surfaceContainerLowest, borderRadius: 12, border: `1px solid ${colors.outlineVariant}`, fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
              {categories[activeCategory].desc}
            </div>
          )}
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: colors.onSurface }}>Câu hỏi thường gặp</h2>
            <span style={{ fontSize: 13, color: colors.primary, fontWeight: 700, cursor: 'pointer' }}>Xem tất cả</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredFaqs.length === 0 && (
              <div style={{ padding: '24px 20px', textAlign: 'center', color: colors.onSurfaceVariant, fontSize: 14 }}>
                Không tìm thấy câu hỏi phù hợp.
              </div>
            )}
            {filteredFaqs.map((faq, i) => (
              <div
                key={i}
                style={{ backgroundColor: colors.surfaceContainerLow, borderRadius: 16, overflow: 'hidden', border: `1px solid ${expandedQuestion === i ? colors.outlineVariant : 'transparent'}`, transition: 'border-color 0.2s' }}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}
                >
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: colors.onSurface, flex: 1, lineHeight: 1.4 }}>{faq.q}</span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 22, color: colors.onSurfaceVariant, flexShrink: 0, transform: expandedQuestion === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
                  >
                    expand_more
                  </span>
                </button>
                {expandedQuestion === i && (
                  <div style={{ padding: '0 20px 18px', fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 20, padding: 32, marginBottom: 40, border: `1px solid ${colors.outlineVariant}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 28, color: colors.primary, fontVariationSettings: "'FILL' 1" }}>security</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: colors.onSurface }}>Mẹo An toàn khi Hẹn hò</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {safetyTips.map((tip, i) => (
              <div
                key={i}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, backgroundColor: colors.surfaceContainerLow, borderRadius: 12, padding: '14px 16px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: colors.primary, marginTop: 1, flexShrink: 0 }}>{tip.icon}</span>
                <span style={{ fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 1.55 }}>{tip.tip}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: colors.surfaceContainerHigh, borderRadius: 24, padding: '40px 32px', textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 44, color: colors.primary, marginBottom: 16, display: 'block' }}>support_agent</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: colors.onSurface, marginBottom: 10 }}>Vẫn cần sự trợ giúp?</h2>
          <p style={{ fontSize: 15, color: colors.onSurfaceVariant, marginBottom: 28, maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.65 }}>
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc của bạn.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{ backgroundColor: colors.primary, color: '#ffffff', border: 'none', borderRadius: 9999, padding: '14px 28px', fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chat</span>
              Liên hệ hỗ trợ
            </button>
            <button
              style={{ backgroundColor: colors.surfaceContainerLowest, color: colors.onSurface, border: `1px solid ${colors.outlineVariant}`, borderRadius: 9999, padding: '14px 28px', fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>mail</span>
              Gửi Email hỗ trợ
            </button>
          </div>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: colors.onSurfaceVariant }}>call</span>
            <span style={{ fontSize: 13, color: colors.onSurfaceVariant }}>Hotline: <strong style={{ color: colors.onSurface }}>1900-xxxx</strong> (8:00 – 22:00 hàng ngày)</span>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HelpCenterPage;
