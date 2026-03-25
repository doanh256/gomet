import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const topics = [
  { icon: 'account_circle', title: 'Tài khoản' },
  { icon: 'favorite', title: 'Hẹn hò & Match' },
  { icon: 'payments', title: 'Thanh toán' },
  { icon: 'verified_user', title: 'Xác minh' },
  { icon: 'report', title: 'An toàn' },
  { icon: 'event', title: 'Sự kiện' },
];

const faqs = [
  { q: 'Làm sao để xác minh tài khoản?', a: 'Bạn có thể xác minh tài khoản bằng cách chụp ảnh selfie và giấy tờ tùy thân. Vào Cài đặt > Xác minh danh tính để bắt đầu quy trình.' },
  { q: 'Cách nạp tiền vào ví GOMET?', a: 'Vào mục Ví GOMET > Nạp tiền. Bạn có thể nạp qua thẻ ngân hàng, MoMo, ZaloPay hoặc chuyển khoản trực tiếp.' },
  { q: 'Tôi có thể hủy buổi hẹn không?', a: 'Có, bạn có thể hủy buổi hẹn trước 2 giờ. Vào Buổi hẹn của tôi > Chọn buổi hẹn > Hủy. Lưu ý hủy nhiều lần có thể ảnh hưởng đến đánh giá.' },
  { q: 'Làm sao báo cáo người dùng?', a: 'Nhấn vào hồ sơ người dùng > Biểu tượng 3 chấm > Báo cáo. Chọn lý do báo cáo và cung cấp chi tiết. Đội ngũ sẽ xem xét trong 24h.' },
  { q: 'GOMET Premium có gì đặc biệt?', a: 'Premium bao gồm: Xem ai thích bạn, Không giới hạn lượt thích, Boost hồ sơ mỗi ngày, Ưu tiên hiển thị, và nhiều tính năng độc quyền khác.' },
  { q: 'Cách liên hệ hỗ trợ?', a: 'Bạn có thể liên hệ qua chat trực tiếp trong ứng dụng, gửi email hotro@gomet.vn, hoặc gọi 1900-xxxx từ 8h-22h hàng ngày.' },
];

const HelpCenterPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (i) => {
    setOpenFaq(prev => prev === i ? null : i);
  };

  const filteredFaqs = search
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()))
    : faqs;

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 24,
    },
    headerIcon: {
      fontSize: 48,
      color: '#FFB59E',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    searchWrapper: {
      position: 'relative',
      marginBottom: 28,
    },
    searchIcon: {
      position: 'absolute',
      left: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 22,
      color: '#E6BEB2',
    },
    searchInput: {
      width: '100%',
      padding: '14px 16px 14px 48px',
      borderRadius: 9999,
      border: 'none',
      backgroundColor: '#1C1B1B',
      fontSize: 15,
      fontFamily: 'var(--font-body)',
      color: '#FDF9F3',
      outline: 'none',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
    },
    topicsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      marginBottom: 32,
    },
    topicCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '20px 12px',
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      cursor: 'pointer',
    },
    topicIcon: {
      fontSize: 32,
      color: '#FFB59E',
    },
    topicTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 600,
      color: '#FDF9F3',
      textAlign: 'center',
    },
    faqList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 32,
    },
    faqItem: {
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      overflow: 'hidden',
    },
    faqQuestion: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    faqArrow: (open) => ({
      fontSize: 20,
      color: '#E6BEB2',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
    }),
    faqAnswer: {
      padding: '0 16px 14px',
      fontSize: 13,
      lineHeight: 1.6,
      color: '#E6BEB2',
    },
    supportCard: {
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      padding: '24px 20px',
      textAlign: 'center',
    },
    supportTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    supportSubtitle: {
      fontSize: 13,
      color: '#E6BEB2',
      marginBottom: 20,
    },
    supportActions: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    supportBtn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: '16px 20px',
      borderRadius: '1.5rem',
      backgroundColor: '#2A2A2A',
      cursor: 'pointer',
      flex: 1,
      minWidth: 90,
    },
    supportBtnIcon: {
      fontSize: 28,
      color: '#FFB59E',
    },
    supportBtnLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: '#FDF9F3',
      fontFamily: 'var(--font-headline)',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>support_agent</span>
        <h1 style={s.heading}>Trung tâm trợ giúp</h1>
      </div>

      {/* Search */}
      <div style={s.searchWrapper}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.searchIcon}>search</span>
        <input
          style={s.searchInput}
          placeholder="Tìm kiếm câu hỏi..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Topics */}
      <h2 style={s.sectionTitle}>Chủ đề phổ biến</h2>
      <div style={s.topicsGrid}>
        {topics.map((t, i) => (
          <div key={i} style={s.topicCard}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.topicIcon}>{t.icon}</span>
            <span style={s.topicTitle}>{t.title}</span>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <h2 style={s.sectionTitle}>Câu hỏi thường gặp</h2>
      <div style={s.faqList}>
        {filteredFaqs.map((f, i) => (
          <div key={i} style={s.faqItem}>
            <button style={s.faqQuestion} onClick={() => toggleFaq(i)}>
              {f.q}
              <span aria-hidden="true" className="material-symbols-outlined" style={s.faqArrow(openFaq === i)}>
                expand_more
              </span>
            </button>
            {openFaq === i && (
              <div style={s.faqAnswer}>{f.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* Support contact */}
      <div style={s.supportCard}>
        <div style={s.supportTitle}>Vẫn cần hỗ trợ?</div>
        <p style={s.supportSubtitle}>Chọn cách liên hệ phù hợp với bạn</p>
        <div style={s.supportActions}>
          <div style={s.supportBtn}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.supportBtnIcon}>chat</span>
            <span style={s.supportBtnLabel}>Liên hệ trực tiếp</span>
          </div>
          <div style={s.supportBtn}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.supportBtnIcon}>mail</span>
            <span style={s.supportBtnLabel}>Gửi email</span>
          </div>
          <div style={s.supportBtn}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.supportBtnIcon}>call</span>
            <span style={s.supportBtnLabel}>Gọi điện</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
