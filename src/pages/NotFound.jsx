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
    { icon: 'favorite', title: 'Tìm Hẹn Hò', desc: 'Khám phá những kết nối mới mẻ và thú vị dành cho bạn.', colSpan: 2, bg: '#1C1B1B' },
    { icon: 'restaurant', title: 'Khám Phá Địa Điểm', desc: 'Tìm địa điểm hẹn hò tuyệt vời.', colSpan: 1, bg: '#1C1B1B' },
    { icon: 'auto_awesome', title: 'Hồ Sơ Ẩm Thực', desc: 'Phân tích sở thích của bạn.', colSpan: 1, bg: '#1C1B1B' },
    { icon: 'calendar_today', title: 'Lên Kế Hoạch', desc: 'Lên lịch hẹn hoàn hảo.', colSpan: 2, bg: '#353535', centered: true },
    { icon: 'chat', title: 'Trợ Lý Cá Nhân', desc: 'Trợ lý hẹn hò cá nhân, sẵn sàng giúp bạn bất cứ lúc nào.', colSpan: 3, bg: '#2A2A2A', hasChat: true },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heroRow}>
          <div style={styles.heroLeft}>
            <div style={styles.pill}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>Error 404</div>
            <h1 style={styles.heading}>Ôi! Bạn đã{' '}<span style={styles.headingAccent}>lạc đường</span>{' '}rồi.</h1>
            <p style={styles.description}>Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển. Đừng lo, chúng tôi sẽ giúp bạn tìm đường về nhà.</p>
            <div style={styles.buttonRow}>
              <button style={styles.btnPrimary} onClick={() => navigate('/')} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>home</span>Quay về Trang chủ</button>
              <button style={styles.btnSecondary} onClick={() => navigate('/faq')} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>support_agent</span>Liên hệ Hỗ trợ</button>
            </div>
          </div>
          <div style={styles.heroRight} className="not-found-deco">
            <div style={{ ...styles.decoBase, ...styles.decoShape2 }} />
            <div style={{ ...styles.decoBase, ...styles.decoShape1 }} />
            <div style={{ ...styles.decoBase, ...styles.decoShape3 }}><span aria-hidden="true" className="material-symbols-outlined" style={styles.decoIcon}>explore_off</span></div>
          </div>
        </div>
        <h2 style={styles.sectionTitle}>Điểm Đến Phổ Biến</h2>
        <div style={styles.bentoGrid}>
          {bentoCards.map((card, i) => (
            <div key={i} style={{ ...styles.bentoCard, gridColumn: `span ${card.colSpan}`, background: card.bg, alignItems: card.centered ? 'center' : undefined, textAlign: card.centered ? 'center' : undefined }} onClick={() => navigate('/')} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ ...styles.bentoCardIcon, background: card.bg === '#2A2A2A' ? 'rgba(255,255,255,0.08)' : '#2A2A2A', color: card.bg === '#2A2A2A' ? '#FDF9F3' : '#FFB59E' }}><span aria-hidden="true" className="material-symbols-outlined">{card.icon}</span></div>
              <div style={{ ...styles.bentoCardTitle, color: '#FDF9F3' }}>{card.title}</div>
              <div style={{ ...styles.bentoCardDesc }}>{card.desc}</div>
              {card.hasChat && (<button style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', color: '#FDF9F3', border: 'none', borderRadius: '9999px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-headline)' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>Chat với Concierge</button>)}
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
