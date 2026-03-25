import React from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumPage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      minHeight: '100vh',
      background: '#131313',
      color: '#FDF9F3',
    },
    container: {
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '0 24px',
    },
    hero: {
      padding: '64px 0 48px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      borderRadius: '9999px',
      padding: '8px 20px',
      fontSize: '13px',
      fontWeight: 600,
      marginBottom: '24px',
    },
    heading: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1.08,
      marginBottom: '20px',
      color: '#FDF9F3',
    },
    accent: {
      background: 'linear-gradient(135deg, #FFD54F, #FF571A)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontStyle: 'italic',
    },
    desc: {
      fontSize: '16px',
      lineHeight: 1.7,
      color: '#E6BEB2',
      marginBottom: '32px',
      maxWidth: '560px',
    },
    btnRow: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    btnGrad: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      padding: '14px 28px',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      transition: 'transform 0.2s',
    },
    btnSurface: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: '#353535',
      color: '#FDF9F3',
      border: 'none',
      borderRadius: '9999px',
      padding: '14px 28px',
      fontSize: '15px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    section: {
      padding: '48px 0',
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 800,
      textAlign: 'center',
      marginBottom: '32px',
      color: '#FDF9F3',
    },
    bento: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
    },
    bentoCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,181,158,0.15)',
      color: '#FFB59E',
    },
    cardTitle: {
      fontSize: '17px',
      fontWeight: 700,
      color: '#FDF9F3',
    },
    cardDesc: {
      fontSize: '13px',
      color: '#E6BEB2',
      lineHeight: 1.6,
    },
    avatarStack: {
      display: 'flex',
      marginTop: '8px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '9999px',
      border: '2px solid #1C1B1B',
      background: '#353535',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 700,
      color: '#E6BEB2',
    },
    pricingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      maxWidth: '720px',
      margin: '0 auto',
      alignItems: 'start',
    },
    pricingCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '36px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'transform 0.2s',
    },
    pricingFeatured: {
      border: '2px solid #FFB59E',
      transform: 'scale(1.05)',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      position: 'relative',
    },
    pricingBadge: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      borderRadius: '9999px',
      padding: '4px 16px',
      fontSize: '12px',
      fontWeight: 700,
      whiteSpace: 'nowrap',
    },
    pricingName: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#FDF9F3',
    },
    pricingPrice: {
      fontSize: '40px',
      fontWeight: 800,
      lineHeight: 1,
      color: '#FDF9F3',
    },
    pricingUnit: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#E6BEB2',
    },
    pricingSub: {
      fontSize: '13px',
      color: '#E6BEB2',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#FDF9F3',
    },
    checkIcon: {
      fontSize: '18px',
      color: '#FFB59E',
    },
    testGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
    testCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    quoteIcon: {
      fontSize: '28px',
      color: '#FFB59E',
      opacity: 0.5,
    },
    quoteText: {
      fontSize: '14px',
      lineHeight: 1.7,
      fontStyle: 'italic',
      color: '#FDF9F3',
    },
    testUser: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: 'auto',
    },
    testAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '9999px',
      background: 'rgba(255,181,158,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '15px',
      color: '#FFB59E',
    },
    testName: {
      fontWeight: 700,
      fontSize: '14px',
      color: '#FDF9F3',
    },
    testTitle: {
      fontSize: '12px',
      color: '#E6BEB2',
    },
    ctaBanner: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '1.5rem',
      padding: '48px 36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      flexWrap: 'wrap',
      marginBottom: '48px',
    },
    ctaHeading: {
      fontSize: '24px',
      fontWeight: 800,
      color: '#3A0B00',
    },
    ctaDesc: {
      fontSize: '14px',
      color: 'rgba(58,11,0,0.75)',
      marginTop: '8px',
    },
    ctaBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: '#3A0B00',
      color: '#FFB59E',
      border: 'none',
      borderRadius: '9999px',
      padding: '14px 28px',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
  };

  const features = [
    { icon: 'celebration', title: 'Exclusive Events', desc: 'Truy cap vao nhung su kien doc quyen danh rieng cho thanh vien Premium.', colSpan: 2 },
    { icon: 'bookmark', title: 'Priority Booking', desc: 'Dat cho truoc tai nhung dia diem hot nhat.', colSpan: 1 },
    { icon: 'bolt', title: 'Daily Boosts', desc: 'Tang gap 3x luot xuat hien moi ngay.', colSpan: 1, primary: true },
    { icon: 'all_inclusive', title: 'Uninterrupted Discovery', desc: 'Kham pha khong gioi han, khong quang cao, trai nghiem muot ma.', colSpan: 2 },
  ];

  const plans = [
    {
      name: 'Monthly',
      price: '199k',
      unit: '/thang',
      sub: 'Thanh toan hang thang',
      features: ['Unlimited Swipes', 'Xem ai da thich ban', '5 Super Likes / ngay', 'Khong quang cao'],
      featured: false,
    },
    {
      name: 'Annual',
      price: '149k',
      unit: '/thang',
      sub: 'Thanh toan 1.788k / nam',
      features: ['Tat ca tinh nang Monthly', '10 Super Likes / ngay', 'Priority Support', 'Exclusive Events access', 'Profile Boost moi tuan'],
      featured: true,
    },
  ];

  const testimonials = [
    { text: 'Premium da thay doi hoan toan cach minh hen ho. Nhung su kien doc quyen thuc su rat dang gia!', name: 'Minh Anh', title: 'Premium Member', initial: 'M' },
    { text: 'Daily Boosts giup minh nhan duoc nhieu luot match hon gap 5 lan. Dau tu xung dang!', name: 'Thu Trang', title: 'Premium Member', initial: 'T' },
    { text: 'Tinh nang Priority Booking giup minh luon co cho tai nhung nha hang hot nhat thanh pho.', name: 'Duc Huy', title: 'Premium Member', initial: 'D' },
  ];

  const avatarNames = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Hero */}
        <div style={s.hero}>
          <div style={s.pill}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>diamond</span>
            The Exclusive Club
          </div>
          <h1 style={s.heading}>
            Nang Cap{' '}
            <span style={s.accent}>Trai Nghiem.</span>
          </h1>
          <p style={s.desc}>
            Mo khoa nhung dac quyen doc nhat chi danh cho thanh vien Premium.
            Trai nghiem hen ho chua bao gio tuyet voi den the.
          </p>
          <div style={s.btnRow}>
            <button
              style={s.btnGrad}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>lock_open</span>
              Unlock Premium
            </button>
            <button
              style={s.btnSurface}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
              View Features
            </button>
          </div>
        </div>

        {/* Why Go Premium */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Why Go Premium?</h2>
          <div style={s.bento}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  ...s.bentoCard,
                  gridColumn: `span ${f.colSpan}`,
                  background: f.primary ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#1C1B1B',
                  color: f.primary ? '#3A0B00' : '#FDF9F3',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0px 20px 40px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  ...s.cardIcon,
                  background: f.primary ? 'rgba(58,11,0,0.2)' : 'rgba(255,181,158,0.15)',
                  color: f.primary ? '#3A0B00' : '#FFB59E',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined">{f.icon}</span>
                </div>
                <div style={{ ...s.cardTitle, color: f.primary ? '#3A0B00' : '#FDF9F3' }}>{f.title}</div>
                <div style={{ ...s.cardDesc, color: f.primary ? 'rgba(58,11,0,0.75)' : '#E6BEB2' }}>
                  {f.desc}
                </div>
                {i === 0 && (
                  <div style={s.avatarStack}>
                    {avatarNames.map((name, j) => (
                      <div key={j} style={{ ...s.avatar, marginLeft: j === 0 ? 0 : '-8px', zIndex: 5 - j }}>{name}</div>
                    ))}
                    <div style={{ ...s.avatar, marginLeft: '-8px', background: 'rgba(255,181,158,0.15)', color: '#FFB59E', fontSize: '11px', zIndex: 0 }}>+99</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Chon Goi Cua Ban</h2>
          <div style={s.pricingGrid}>
            {plans.map((plan, i) => (
              <div key={i} style={{ ...s.pricingCard, ...(plan.featured ? s.pricingFeatured : {}) }}>
                {plan.featured && <div style={s.pricingBadge}>Most Exclusive</div>}
                <div style={s.pricingName}>{plan.name}</div>
                <div>
                  <span style={s.pricingPrice}>{plan.price}</span>
                  <span style={s.pricingUnit}>{plan.unit}</span>
                </div>
                <div style={s.pricingSub}>{plan.sub}</div>
                <ul style={s.featureList}>
                  {plan.features.map((feat, j) => (
                    <li key={j} style={s.featureItem}>
                      <span aria-hidden="true" className="material-symbols-outlined" style={s.checkIcon}>check_circle</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    ...s.btnGrad,
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '8px',
                    background: plan.featured ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#353535',
                    color: plan.featured ? '#3A0B00' : '#FDF9F3',
                    boxShadow: plan.featured ? '0px 20px 40px rgba(0,0,0,0.4)' : 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Chon {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Thanh Vien Noi Gi?</h2>
          <div style={s.testGrid}>
            {testimonials.map((t, i) => (
              <div key={i} style={s.testCard}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.quoteIcon}>format_quote</span>
                <p style={s.quoteText}>{t.text}</p>
                <div style={s.testUser}>
                  <div style={s.testAvatar}>{t.initial}</div>
                  <div>
                    <div style={s.testName}>{t.name}</div>
                    <div style={s.testTitle}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={s.ctaBanner}>
          <div>
            <div style={s.ctaHeading}>San sang nang cap trai nghiem?</div>
            <div style={s.ctaDesc}>Tham gia cung hang ngan thanh vien Premium ngay hom nay.</div>
          </div>
          <button
            style={s.ctaBtn}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>diamond</span>
            Bat Dau Ngay
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="max-width: 720px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumPage;
