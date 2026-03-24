import React from 'react';
import { useNavigate } from 'react-router-dom';

const tips = [
  {
    icon: 'location_on',
    title: 'Chon dia diem phu hop',
    desc: 'Chon noi yeu tinh, thoai mai de ca hai co the tro chuyen thoai mai. Quan ca phe hoac cong vien la lua chon tuyet voi.',
  },
  {
    icon: 'checkroom',
    title: 'An mac tu tin',
    desc: 'Mac trang phuc gon gang, lich su va phu hop voi dia diem. Tu tin voi phong cach cua ban se tao an tuong tot.',
  },
  {
    icon: 'schedule',
    title: 'Den dung gio',
    desc: 'Dung gio the hien su ton trong. Hay den som 5-10 phut de chuan bi tinh than va tao khong khi thoai mai.',
  },
  {
    icon: 'hearing',
    title: 'Lang nghe nhieu hon',
    desc: 'Dat cau hoi va lang nghe chan thanh. Moi nguoi deu thich cam giac duoc quan tam va thau hieu.',
  },
  {
    icon: 'phonelink_off',
    title: 'Dat dien thoai xuong',
    desc: 'Tap trung vao nguoi doi dien. Tat thong bao va dat dien thoai sang mot ben the hien su ton trong.',
  },
  {
    icon: 'favorite',
    title: 'La chinh minh',
    desc: 'Dung co tao an tuong bang hinh anh gia tao. Su chan thanh va tu nhien la dieu hap dan nhat.',
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
        <span className="material-symbols-outlined" style={s.heroIcon}>handshake</span>
        <h1 style={s.heading}>
          Cam nang <span style={s.headingAccent}>hen ho dau tien</span>
        </h1>
        <p style={s.heroSub}>6 bi quyet giup buoi hen dau tien cua ban tro nen tuyet voi</p>
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
              <span className="material-symbols-outlined" style={s.cardIcon}>{tip.icon}</span>
            </div>
            <div style={s.cardTitle}>{tip.title}</div>
            <div style={s.cardDesc}>{tip.desc}</div>
          </div>
        ))}
      </div>

      <div style={s.cta}>
        <div style={s.ctaTitle}>San sang hen ho?</div>
        <button style={s.ctaBtn} onClick={() => navigate('/app')}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>explore</span>
          Tim nguoi phu hop
        </button>
      </div>
    </div>
  );
};

export default FirstDateGuidePage;
