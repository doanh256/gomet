import React from 'react';
import { useNavigate } from 'react-router-dom';

const tips = [
  {
    icon: 'location_on',
    title: 'Chọn địa điểm phù hợp',
    desc: 'Chọn nơi yên tĩnh, thoải mái để cả hai có thể trò chuyện thoải mái. Quán cà phê hoặc công viên là lựa chọn tuyệt vời.',
  },
  {
    icon: 'checkroom',
    title: 'Ăn mặc tự tin',
    desc: 'Mặc trang phục gọn gàng, lịch sự và phù hợp với địa điểm. Tự tin với phong cách của bạn sẽ tạo ấn tượng tốt.',
  },
  {
    icon: 'schedule',
    title: 'Đến đúng giờ',
    desc: 'Đúng giờ thể hiện sự tôn trọng. Hãy đến sớm 5-10 phút để chuẩn bị tinh thần và tạo không khí thoải mái.',
  },
  {
    icon: 'hearing',
    title: 'Lắng nghe nhiều hơn',
    desc: 'Đặt câu hỏi và lắng nghe chân thành. Mọi người đều thích cảm giác được quan tâm và thấu hiểu.',
  },
  {
    icon: 'phonelink_off',
    title: 'Đặt điện thoại xuống',
    desc: 'Tập trung vào người đối diện. Tắt thông báo và đặt điện thoại sang một bên thể hiện sự tôn trọng.',
  },
  {
    icon: 'favorite',
    title: 'Là chính mình',
    desc: 'Đừng cố tạo ấn tượng bằng hình ảnh giả tạo. Sự chân thành và tự nhiên là điều hấp dẫn nhất.',
  },
];

const FirstDateGuidePage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 720,
      margin: '0 auto',
    },
    hero: {
      textAlign: 'center',
      marginBottom: 40,
    },
    heroIcon: {
      fontSize: 48,
      color: '#FFB59E',
      marginBottom: 12,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    headingAccent: {
      fontStyle: 'italic',
      color: '#FFB59E',
    },
    heroSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
      marginTop: 8,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 20,
      marginBottom: 48,
    },
    card: {
      padding: 24,
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: '9999px',
      backgroundColor: '#2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    cardIcon: {
      fontSize: 24,
      color: '#FFB59E',
    },
    cardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 8,
    },
    cardDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.6,
      color: '#E6BEB2',
    },
    cta: {
      textAlign: 'center',
      padding: '40px 24px',
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
    },
    ctaTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 16,
    },
    ctaBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '14px 32px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    number: {
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 800,
      color: '#3A0B00',
      backgroundColor: '#FFB59E',
      width: 24,
      height: 24,
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
  };

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.heroIcon}>handshake</span>
        <h1 style={s.heading}>
          Cẩm nang <span style={s.headingAccent}>hẹn hò đầu tiên</span>
        </h1>
        <p style={s.heroSub}>6 bí quyết giúp buổi hẹn đầu tiên của bạn trở nên tuyệt vời</p>
      </div>

      <div style={s.grid}>
        {tips.map((tip, i) => (
          <div
            key={i}
            style={s.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 20px 40px rgba(0,0,0,0.4)';
            }}
          >
            <div style={s.number}>{i + 1}</div>
            <div style={s.iconCircle}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.cardIcon}>{tip.icon}</span>
            </div>
            <div style={s.cardTitle}>{tip.title}</div>
            <div style={s.cardDesc}>{tip.desc}</div>
          </div>
        ))}
      </div>

      <div style={s.cta}>
        <div style={s.ctaTitle}>Sẵn sàng hẹn hò?</div>
        <button style={s.ctaBtn} onClick={() => navigate('/app')}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>explore</span>
          Tìm người phù hợp
        </button>
      </div>
    </div>
  );
};

export default FirstDateGuidePage;
