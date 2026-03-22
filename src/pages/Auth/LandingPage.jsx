import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      minHeight: '100vh',
      background: 'var(--surface)',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      maxWidth: '480px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      position: 'sticky',
      top: 0,
      background: 'var(--surface)',
      zIndex: 10,
    },
    logo: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 800,
      color: 'var(--primary)',
      letterSpacing: '-0.5px',
    },
    topIcon: {
      width: '40px',
      height: '40px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
      color: 'var(--on-surface)',
    },
    // Hero
    hero: {
      padding: '32px 20px 40px',
      textAlign: 'center',
    },
    heroTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '48px',
      fontWeight: 800,
      lineHeight: 1,
      marginBottom: '8px',
      color: 'var(--on-surface)',
      letterSpacing: '-1px',
    },
    heroAccent: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
      fontStyle: 'italic',
      color: 'var(--primary)',
      display: 'block',
      marginBottom: '16px',
    },
    heroDesc: {
      fontSize: '15px',
      lineHeight: 1.7,
      color: 'var(--on-surface-variant)',
      maxWidth: '340px',
      margin: '0 auto',
    },
    // Section
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      marginBottom: '16px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 800,
    },
    sectionLink: {
      fontSize: '13px',
      color: 'var(--primary)',
      fontWeight: 600,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontFamily: 'var(--font-body)',
    },
    // Featured Events scroll
    scrollRow: {
      display: 'flex',
      gap: '14px',
      overflowX: 'auto',
      padding: '0 20px 20px',
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    eventCard: {
      minWidth: '260px',
      height: '180px',
      borderRadius: 'var(--radius-lg)',
      position: 'relative',
      overflow: 'hidden',
      scrollSnapAlign: 'start',
      cursor: 'pointer',
      flexShrink: 0,
    },
    eventGradient: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.75) 100%)',
    },
    eventContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      color: 'white',
    },
    eventTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 700,
      marginBottom: '6px',
    },
    eventMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '12px',
      opacity: 0.85,
    },
    eventMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    // How It Works
    stepsRow: {
      display: 'flex',
      gap: '16px',
      padding: '0 20px 32px',
      justifyContent: 'center',
    },
    stepCard: {
      flex: 1,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    stepCircle: {
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 800,
      boxShadow: 'var(--editorial-shadow)',
    },
    stepTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 700,
    },
    stepDesc: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
    },
    // Venues grid
    venueGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '14px',
      padding: '0 20px 32px',
    },
    venueCard: {
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      background: 'var(--surface-container-low)',
      border: '1px solid var(--outline-variant)',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    venueImg: {
      width: '100%',
      height: '110px',
      objectFit: 'cover',
      display: 'block',
    },
    venueImgPlaceholder: {
      width: '100%',
      height: '110px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      color: 'var(--primary)',
    },
    venueInfo: {
      padding: '12px',
    },
    venueName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 700,
      marginBottom: '4px',
    },
    venueLoc: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    // CTA
    ctaSection: {
      padding: '32px 20px',
      textAlign: 'center',
    },
    ctaTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
      marginBottom: '20px',
    },
    btnGrad: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '14px 32px',
      fontSize: '15px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      boxShadow: 'var(--editorial-shadow)',
      transition: 'transform 0.2s',
      width: '100%',
      justifyContent: 'center',
    },
    btnSecondary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'transparent',
      color: 'var(--on-surface-variant)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      width: '100%',
      justifyContent: 'center',
      marginTop: '8px',
    },
    // Auth buttons
    authSection: {
      padding: '16px 20px 24px',
      display: 'flex',
      gap: '12px',
    },
    btnLogin: {
      flex: 1,
      padding: '14px 0',
      borderRadius: 'var(--radius-full)',
      border: '1.5px solid var(--outline-variant)',
      background: 'transparent',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    btnRegister: {
      flex: 1,
      padding: '14px 0',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: 'var(--editorial-shadow)',
      transition: 'transform 0.2s',
    },
    // Footer
    footer: {
      padding: '24px 20px 32px',
      borderTop: '1px solid var(--outline-variant)',
      textAlign: 'center',
    },
    footerLogo: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 800,
      fontStyle: 'italic',
      color: 'var(--primary)',
      marginBottom: '16px',
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    footerLink: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontFamily: 'var(--font-body)',
    },
    copyright: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      opacity: 0.7,
    },
  };

  const featuredEvents = [
    { title: 'Dinner & Jazz Night', date: '28 Thg 3', location: 'District 1', bg: 'var(--primary)' },
    { title: 'Rooftop Wine Tasting', date: '2 Thg 4', location: 'District 2', bg: 'var(--tertiary)' },
    { title: 'Cooking Class for Two', date: '5 Thg 4', location: 'District 7', bg: 'var(--inverse-surface)' },
    { title: 'Sunset Kayak Date', date: '10 Thg 4', location: 'Thu Duc', bg: 'var(--primary-container)' },
  ];

  const steps = [
    { num: '1', title: 'Kham Pha', desc: 'Tim su kien va dia diem phu hop voi ban.' },
    { num: '2', title: 'Ket Noi', desc: 'Match voi nguoi cung so thich.' },
    { num: '3', title: 'Trai Nghiem', desc: 'Cung nhau tao nen nhung ky niem dep.' },
  ];

  const venues = [
    { name: 'The Deck Saigon', loc: 'District 2', icon: 'restaurant' },
    { name: 'L\'Usine Le Loi', loc: 'District 1', icon: 'local_cafe' },
    { name: 'Chill Sky Bar', loc: 'District 1', icon: 'nightlife' },
    { name: 'The Workshop', loc: 'District 3', icon: 'coffee' },
  ];

  return (
    <div style={s.page}>
      {/* Top Bar */}
      <div style={s.topBar}>
        <div style={s.logo}>GOMET</div>
        <button
          style={s.topIcon}
          onClick={() => navigate('/login')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>account_circle</span>
        </button>
      </div>

      {/* Hero */}
      <div style={s.hero}>
        <h1 style={s.heroTitle}>GOMET</h1>
        <span style={s.heroAccent}>Nghe thuat ket noi</span>
        <p style={s.heroDesc}>
          Kham pha nhung trai nghiem hen ho doc dao, tu dinner date den adventure date,
          duoc thiet ke rieng cho ban.
        </p>
      </div>

      {/* Featured Events */}
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>Featured Events</h2>
        <button style={s.sectionLink}>Xem tat ca</button>
      </div>
      <div style={s.scrollRow}>
        {featuredEvents.map((ev, i) => (
          <div
            key={i}
            style={{
              ...s.eventCard,
              background: ev.bg,
            }}
          >
            <div style={s.eventGradient} />
            <div style={s.eventContent}>
              <div style={s.eventTitle}>{ev.title}</div>
              <div style={s.eventMeta}>
                <span style={s.eventMetaItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_today</span>
                  {ev.date}
                </span>
                <span style={s.eventMetaItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                  {ev.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>How It Works</h2>
      </div>
      <div style={s.stepsRow}>
        {steps.map((step, i) => (
          <div key={i} style={s.stepCard}>
            <div style={s.stepCircle}>{step.num}</div>
            <div style={s.stepTitle}>{step.title}</div>
            <div style={s.stepDesc}>{step.desc}</div>
          </div>
        ))}
      </div>

      {/* Trending Venues */}
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>Trending Venues</h2>
        <button style={s.sectionLink}>Xem tat ca</button>
      </div>
      <div style={s.venueGrid}>
        {venues.map((v, i) => (
          <div
            key={i}
            style={s.venueCard}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{
              ...s.venueImgPlaceholder,
              background: i % 2 === 0 ? 'var(--primary-fixed)' : 'var(--surface-container-highest)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>{v.icon}</span>
            </div>
            <div style={s.venueInfo}>
              <div style={s.venueName}>{v.name}</div>
              <div style={s.venueLoc}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                {v.loc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={s.ctaSection}>
        <h2 style={s.ctaTitle}>San sang chua?</h2>
        <button
          style={s.btnGrad}
          onClick={() => navigate('/register')}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>rocket_launch</span>
          Bat Dau Ngay
        </button>
        <button
          style={s.btnSecondary}
          onClick={() => navigate('/faq')}
        >
          Tim Hieu Them
        </button>
      </div>

      {/* Login / Register */}
      <div style={s.authSection}>
        <button
          style={s.btnLogin}
          onClick={() => navigate('/login')}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-container-high)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Dang Nhap
        </button>
        <button
          style={s.btnRegister}
          onClick={() => navigate('/register')}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Dang Ky
        </button>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerLogo}>GOMET</div>
        <div style={s.footerLinks}>
          <span style={s.footerLink} onClick={() => navigate('/privacy')}>Privacy</span>
          <span style={s.footerLink} onClick={() => navigate('/terms')}>Terms</span>
          <span style={s.footerLink} onClick={() => navigate('/safety')}>Safety</span>
          <span style={s.footerLink} onClick={() => navigate('/faq')}>Contact</span>
        </div>
        <div style={s.copyright}>&copy; 2026 GOMET. All rights reserved.</div>
      </footer>

      {/* Hide scrollbar for horizontal scroll */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default LandingPage;
