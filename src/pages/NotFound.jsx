import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const styles = {
    page: { minHeight: '100vh', background: '#131313', color: '#FDF9F3', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column' },
    container: { maxWidth: '1152px', margin: '0 auto', padding: '48px 24px', flex: 1 },
    heroRow: { display: 'flex', alignItems: 'center', gap: '48px', marginBottom: '64px', flexWrap: 'wrap' },
    heroLeft: { flex: '7 1 400px', minWidth: 0 },
    heroRight: { flex: '5 1 300px', minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: '320px' },
    pill: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#2A2A2A', color: '#FFB59E', borderRadius: '9999px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-headline)', marginBottom: '24px' },
    heading: { fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.08, marginBottom: '20px', color: '#FDF9F3' },
    headingAccent: { color: '#FFB59E', fontStyle: 'italic' },
    description: { fontSize: '16px', lineHeight: 1.7, color: '#E6BEB2', marginBottom: '32px', maxWidth: '480px' },
    buttonRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
    btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '9999px', padding: '14px 28px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-headline)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' },
    btnSecondary: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#353535', color: '#FDF9F3', border: 'none', borderRadius: '9999px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-headline)', cursor: 'pointer', transition: 'transform 0.2s' },
    decoBase: { position: 'absolute', borderRadius: '1.5rem' },
    decoShape1: { width: '200px', height: '240px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', transform: 'rotate(-8deg)', top: '10px', right: '40px', opacity: 0.9, borderRadius: '1.5rem' },
    decoShape2: { width: '180px', height: '200px', background: '#2A2A2A', transform: 'rotate(6deg)', top: '40px', right: '80px', borderRadius: '1.5rem' },
    decoShape3: { width: '160px', height: '160px', background: '#353535', transform: 'rotate(-3deg)', top: '80px', right: '20px', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    decoIcon: { fontSize: '64px', color: '#FFB59E', opacity: 0.6 },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#FDF9F3' },
    bentoGrid: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '48px' },
    bentoCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' },
    bentoCardIcon: { width: '48px', height: '48px', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2A2A2A', color: '#FFB59E' },
    bentoCardTitle: { fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 700, color: '#FDF9F3' },
    bentoCardDesc: { fontSize: '13px', color: '#E6BEB2', lineHeight: 1.5 },
    footer: { padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', maxWidth: '1152px', margin: '0 auto', width: '100%' },
    footerText: { fontSize: '13px', color: '#E6BEB2' },
    footerLinks: { display: 'flex', gap: '24px' },
    footerLink: { fontSize: '13px', color: '#E6BEB2', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font-body)', textDecoration: 'none' },
  };

  const bentoCards = [
    { icon: 'favorite', title: 'Find a Date', desc: 'Kham pha nhung ket noi moi me va thu vi danh cho ban.', colSpan: 2, bg: '#1C1B1B' },
    { icon: 'restaurant', title: 'Explore Venues', desc: 'Tim dia diem hen ho tuyet voi.', colSpan: 1, bg: '#1C1B1B' },
    { icon: 'auto_awesome', title: 'Taste Insights', desc: 'Phan tich so thich cua ban.', colSpan: 1, bg: '#1C1B1B' },
    { icon: 'calendar_today', title: 'Planner', desc: 'Len lich hen hoan hao.', colSpan: 2, bg: '#353535', centered: true },
    { icon: 'chat', title: 'Personal Concierge', desc: 'Tro ly hen ho ca nhan, san sang giup ban bat cu luc nao.', colSpan: 3, bg: '#2A2A2A', hasChat: true },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heroRow}>
          <div style={styles.heroLeft}>
            <div style={styles.pill}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>Error 404</div>
            <h1 style={styles.heading}>Oi! Ban da{' '}<span style={styles.headingAccent}>lac duong</span>{' '}roi.</h1>
            <p style={styles.description}>Trang ban dang tim khong ton tai hoac da bi di chuyen. Dung lo, chung toi se giup ban tim duong ve nha.</p>
            <div style={styles.buttonRow}>
              <button style={styles.btnPrimary} onClick={() => navigate('/')} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>home</span>Quay ve Trang chu</button>
              <button style={styles.btnSecondary} onClick={() => navigate('/faq')} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>support_agent</span>Lien he Ho tro</button>
            </div>
          </div>
          <div style={styles.heroRight} className="not-found-deco">
            <div style={{ ...styles.decoBase, ...styles.decoShape2 }} />
            <div style={{ ...styles.decoBase, ...styles.decoShape1 }} />
            <div style={{ ...styles.decoBase, ...styles.decoShape3 }}><span className="material-symbols-outlined" style={styles.decoIcon}>explore_off</span></div>
          </div>
        </div>
        <h2 style={styles.sectionTitle}>Popular Destinations</h2>
        <div style={styles.bentoGrid}>
          {bentoCards.map((card, i) => (
            <div key={i} style={{ ...styles.bentoCard, gridColumn: `span ${card.colSpan}`, background: card.bg, alignItems: card.centered ? 'center' : undefined, textAlign: card.centered ? 'center' : undefined }} onClick={() => navigate('/')} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ ...styles.bentoCardIcon, background: card.bg === '#2A2A2A' ? 'rgba(255,255,255,0.08)' : '#2A2A2A', color: card.bg === '#2A2A2A' ? '#FDF9F3' : '#FFB59E' }}><span className="material-symbols-outlined">{card.icon}</span></div>
              <div style={{ ...styles.bentoCardTitle, color: '#FDF9F3' }}>{card.title}</div>
              <div style={{ ...styles.bentoCardDesc }}>{card.desc}</div>
              {card.hasChat && (<button style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', color: '#FDF9F3', border: 'none', borderRadius: '9999px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-headline)' }}><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>Chat voi Concierge</button>)}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.footer}>
        <span style={styles.footerText}>&copy; 2026 GOMET. All rights reserved.</span>
        <div style={styles.footerLinks}>
          <span style={styles.footerLink} onClick={() => navigate('/privacy')}>Privacy</span>
          <span style={styles.footerLink} onClick={() => navigate('/terms')}>Terms</span>
          <span style={styles.footerLink} onClick={() => navigate('/safety')}>Safety</span>
          <span style={styles.footerLink} onClick={() => navigate('/faq')}>Help</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .not-found-deco { display: none !important; } }
        @media (max-width: 640px) { div[style*="grid-template-columns: repeat(6"] { grid-template-columns: repeat(2, 1fr) !important; } div[style*="grid-column: span 3"] { grid-column: span 2 !important; } }
      `}</style>
    </div>
  );
};

export default NotFound;
