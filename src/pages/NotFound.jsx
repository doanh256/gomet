import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'var(--surface)',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '48px 24px',
      flex: 1,
    },
    heroRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '48px',
      marginBottom: '64px',
      flexWrap: 'wrap',
    },
    heroLeft: {
      flex: '7 1 400px',
      minWidth: 0,
    },
    heroRight: {
      flex: '5 1 300px',
      minWidth: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      minHeight: '320px',
    },
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'var(--primary-fixed)',
      color: 'var(--on-primary-container)',
      borderRadius: 'var(--radius-full)',
      padding: '8px 20px',
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'var(--font-headline)',
      marginBottom: '24px',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1.08,
      marginBottom: '20px',
      color: 'var(--on-surface)',
    },
    headingAccent: {
      color: 'var(--primary)',
      fontStyle: 'italic',
    },
    description: {
      fontSize: '16px',
      lineHeight: 1.7,
      color: 'var(--on-surface-variant)',
      marginBottom: '32px',
      maxWidth: '480px',
    },
    buttonRow: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    btnPrimary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '14px 28px',
      fontSize: '15px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      boxShadow: 'var(--editorial-shadow)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    btnSecondary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'var(--surface-container-highest)',
      color: 'var(--on-surface)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '14px 28px',
      fontSize: '15px',
      fontWeight: 600,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    // Decorative shapes for right side
    decoBase: {
      position: 'absolute',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--card-shadow)',
    },
    decoShape1: {
      width: '200px',
      height: '240px',
      background: 'var(--primary-gradient)',
      transform: 'rotate(-8deg)',
      top: '10px',
      right: '40px',
      opacity: 0.9,
      borderRadius: 'var(--radius-lg)',
    },
    decoShape2: {
      width: '180px',
      height: '200px',
      background: 'var(--primary-fixed)',
      transform: 'rotate(6deg)',
      top: '40px',
      right: '80px',
      borderRadius: 'var(--radius-lg)',
    },
    decoShape3: {
      width: '160px',
      height: '160px',
      background: 'var(--surface-container-highest)',
      transform: 'rotate(-3deg)',
      top: '80px',
      right: '20px',
      borderRadius: 'var(--radius)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    decoIcon: {
      fontSize: '64px',
      color: 'var(--primary)',
      opacity: 0.6,
    },
    // Bento grid
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '24px',
      fontWeight: 800,
      marginBottom: '24px',
      color: 'var(--on-surface)',
    },
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '16px',
      marginBottom: '48px',
    },
    bentoCard: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      border: '1px solid var(--outline-variant)',
    },
    bentoCardIcon: {
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--primary-fixed)',
      color: 'var(--primary)',
    },
    bentoCardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    bentoCardDesc: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
    },
    // Footer
    footer: {
      borderTop: '1px solid var(--outline-variant)',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      maxWidth: '1152px',
      margin: '0 auto',
      width: '100%',
    },
    footerText: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
    },
    footerLinks: {
      display: 'flex',
      gap: '24px',
    },
    footerLink: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontFamily: 'var(--font-body)',
      textDecoration: 'none',
    },
  };

  const bentoCards = [
    {
      icon: 'favorite',
      title: 'Find a Date',
      desc: 'Kham pha nhung ket noi moi me va thu vi danh cho ban.',
      colSpan: 2,
      bg: 'var(--surface-container-low)',
    },
    {
      icon: 'restaurant',
      title: 'Explore Venues',
      desc: 'Tim dia diem hen ho tuyet voi.',
      colSpan: 1,
      bg: 'var(--surface-container-low)',
    },
    {
      icon: 'auto_awesome',
      title: 'Taste Insights',
      desc: 'Phan tich so thich cua ban.',
      colSpan: 1,
      bg: 'var(--surface-container-low)',
    },
    {
      icon: 'calendar_today',
      title: 'Planner',
      desc: 'Len lich hen hoan hao.',
      colSpan: 2,
      bg: 'var(--surface-container-highest)',
      centered: true,
    },
    {
      icon: 'chat',
      title: 'Personal Concierge',
      desc: 'Tro ly hen ho ca nhan, san sang giup ban bat cu luc nao.',
      colSpan: 3,
      bg: 'var(--inverse-surface)',
      textColor: 'var(--inverse-on-surface)',
      hasChat: true,
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Hero Section */}
        <div style={styles.heroRow}>
          <div style={styles.heroLeft}>
            <div style={styles.pill}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
              Error 404
            </div>
            <h1 style={styles.heading}>
              Oi! Ban da{' '}
              <span style={styles.headingAccent}>lac duong</span>{' '}
              roi.
            </h1>
            <p style={styles.description}>
              Trang ban dang tim khong ton tai hoac da bi di chuyen.
              Dung lo, chung toi se giup ban tim duong ve nha.
            </p>
            <div style={styles.buttonRow}>
              <button
                style={styles.btnPrimary}
                onClick={() => navigate('/')}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>home</span>
                Quay ve Trang chu
              </button>
              <button
                style={styles.btnSecondary}
                onClick={() => navigate('/faq')}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>support_agent</span>
                Lien he Ho tro
              </button>
            </div>
          </div>

          {/* Right decorative side - hidden on small screens via JS-based responsive */}
          <div style={styles.heroRight} className="not-found-deco">
            <div style={{ ...styles.decoBase, ...styles.decoShape2 }} />
            <div style={{ ...styles.decoBase, ...styles.decoShape1 }} />
            <div style={{ ...styles.decoBase, ...styles.decoShape3 }}>
              <span className="material-symbols-outlined" style={styles.decoIcon}>explore_off</span>
            </div>
          </div>
        </div>

        {/* Popular Destinations Bento Grid */}
        <h2 style={styles.sectionTitle}>Popular Destinations</h2>
        <div style={styles.bentoGrid}>
          {bentoCards.map((card, i) => (
            <div
              key={i}
              style={{
                ...styles.bentoCard,
                gridColumn: `span ${card.colSpan}`,
                background: card.bg,
                color: card.textColor || 'var(--on-surface)',
                borderColor: card.bg === 'var(--inverse-surface)' ? 'transparent' : undefined,
                alignItems: card.centered ? 'center' : undefined,
                textAlign: card.centered ? 'center' : undefined,
              }}
              onClick={() => navigate('/')}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--editorial-shadow)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                ...styles.bentoCardIcon,
                background: card.bg === 'var(--inverse-surface)' ? 'rgba(255,255,255,0.12)' : 'var(--primary-fixed)',
                color: card.bg === 'var(--inverse-surface)' ? 'var(--inverse-on-surface)' : 'var(--primary)',
              }}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <div style={{ ...styles.bentoCardTitle, color: card.textColor || 'var(--on-surface)' }}>
                {card.title}
              </div>
              <div style={{ ...styles.bentoCardDesc, color: card.textColor ? 'rgba(244,240,234,0.7)' : 'var(--on-surface-variant)' }}>
                {card.desc}
              </div>
              {card.hasChat && (
                <button style={{
                  marginTop: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'var(--inverse-on-surface)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-headline)',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
                  Chat voi Concierge
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerText}>&copy; 2026 GOMET. All rights reserved.</span>
        <div style={styles.footerLinks}>
          <span style={styles.footerLink} onClick={() => navigate('/privacy')}>Privacy</span>
          <span style={styles.footerLink} onClick={() => navigate('/terms')}>Terms</span>
          <span style={styles.footerLink} onClick={() => navigate('/safety')}>Safety</span>
          <span style={styles.footerLink} onClick={() => navigate('/faq')}>Help</span>
        </div>
      </div>

      {/* Responsive media query via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .not-found-deco { display: none !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(6"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-column: span 3"] {
            grid-column: span 2 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
