import React from 'react';
import { useNavigate } from 'react-router-dom';

const tips = [
  {
    icon: 'location_on',
    title: 'Chon dia diem phu hop',
    desc: 'Chon noi yeu tinh, thoai mai de ca hai co the tro chuyen thoai mai. Quan ca phe hoac cong vien la lua chon tuyet voi.',
    color: 'var(--primary-fixed)',
  },
  {
    icon: 'checkroom',
    title: 'An mac tu tin',
    desc: 'Mac trang phuc gon gang, lich su va phu hop voi dia diem. Tu tin voi phong cach cua ban se tao an tuong tot.',
    color: 'var(--tertiary-container)',
  },
  {
    icon: 'schedule',
    title: 'Den dung gio',
    desc: 'Dung gio the hien su ton trong. Hay den som 5-10 phut de chuan bi tinh than va tao khong khi thoai mai.',
    color: 'var(--primary-fixed)',
  },
  {
    icon: 'hearing',
    title: 'Lang nghe nhieu hon',
    desc: 'Dat cau hoi va lang nghe chan thanh. Moi nguoi deu thich cam giac duoc quan tam va thau hieu.',
    color: 'var(--tertiary-container)',
  },
  {
    icon: 'phonelink_off',
    title: 'Dat dien thoai xuong',
    desc: 'Tap trung vao nguoi doi dien. Tat thong bao va dat dien thoai sang mot ben the hien su ton trong.',
    color: 'var(--primary-fixed)',
  },
  {
    icon: 'favorite',
    title: 'La chinh minh',
    desc: 'Dung co tao an tuong bang hinh anh gia tao. Su chan thanh va tu nhien la dieu hap dan nhat.',
    color: 'var(--tertiary-container)',
  },
];

const FirstDateGuidePage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
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
      color: 'var(--primary)',
      marginBottom: 12,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    headingAccent: {
      fontStyle: 'italic',
      color: 'var(--primary)',
    },
    heroSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
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
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    iconCircle: (bg) => ({
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-full)',
      backgroundColor: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    }),
    cardIcon: {
      fontSize: 24,
      color: 'var(--on-primary-container)',
    },
    cardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 8,
    },
    cardDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--on-surface-variant)',
    },
    cta: {
      textAlign: 'center',
      padding: '40px 24px',
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-lg)',
    },
    ctaTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    ctaBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '14px 32px',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: 'var(--editorial-shadow)',
    },
    number: {
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 800,
      color: 'var(--primary)',
      backgroundColor: 'var(--primary-fixed)',
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-full)',
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
              e.currentTarget.style.boxShadow = 'var(--editorial-shadow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--card-shadow)';
            }}
          >
            <div style={s.number}>{i + 1}</div>
            <div style={s.iconCircle(tip.color)}>
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
