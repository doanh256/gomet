import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const secretKeyframes = `
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 183, 77, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 183, 77, 0.6); }
}
`;

const SecretEventPage = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const revealedItems = [
    { text: 'Ngay: 28/03/2026' },
    { text: 'Khu vuc: Quan 1, TP.HCM' },
    { text: 'So luong: 20 nguoi' },
  ];

  const hiddenItems = [
    'Dia diem: ???',
    'Chu de: ???',
    'Dress code: ???',
  ];

  const rules = [
    { num: 1, text: 'Khong tiet lo dia diem va chu de cho nguoi ngoai' },
    { num: 2, text: 'Tuan thu dress code khi duoc cong bo' },
    { num: 3, text: 'Den dung gio - Tre 15 phut se mat suat' },
  ];

  const goldColor = '#FFB74D';
  const goldDark = '#F57C00';

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: 'var(--inverse-surface)',
      color: 'var(--inverse-on-surface)',
      fontFamily: 'var(--font-body)',
      padding: '0 0 48px',
      overflowY: 'auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '24px 20px 20px',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--inverse-on-surface)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    headerIcon: {
      fontSize: '28px',
      color: goldColor,
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 700,
      color: goldColor,
    },
    mysteryCard: {
      margin: '0 20px 28px',
      padding: '48px 20px',
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(145deg, rgba(255,183,77,0.08), rgba(255,183,77,0.02))',
      border: '1px solid rgba(255,183,77,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      animation: 'glow 3s ease-in-out infinite',
    },
    mysteryOverlay: {
      position: 'absolute',
      inset: 0,
      backdropFilter: 'blur(2px)',
      background: 'rgba(49,48,45,0.3)',
      borderRadius: 'var(--radius-lg)',
    },
    mysteryContent: {
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
    },
    mysteryIcon: {
      fontSize: '100px',
      color: goldColor,
      animation: 'float 3s ease-in-out infinite',
      display: 'block',
      marginBottom: '16px',
      opacity: 0.9,
    },
    mysteryText: {
      fontSize: '14px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.7,
      letterSpacing: '0.5px',
    },
    section: {
      margin: '0 20px 24px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      color: goldColor,
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    sectionIcon: {
      fontSize: '20px',
    },
    revealedItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      marginBottom: '8px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,183,77,0.15)',
    },
    checkIcon: {
      fontSize: '22px',
      color: '#66bb6a',
    },
    revealedText: {
      fontSize: '15px',
      color: 'var(--inverse-on-surface)',
      fontWeight: 500,
    },
    hiddenItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      marginBottom: '8px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    lockIcon: {
      fontSize: '22px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.4,
    },
    hiddenText: {
      fontSize: '15px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.35,
      filter: 'blur(3px)',
      userSelect: 'none',
    },
    registerSection: {
      margin: '0 20px 28px',
      padding: '24px',
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(145deg, rgba(255,183,77,0.12), rgba(255,183,77,0.04))',
      border: '1px solid rgba(255,183,77,0.2)',
      textAlign: 'center',
    },
    urgencyBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'rgba(255,183,77,0.2)',
      color: goldColor,
      fontSize: '13px',
      fontWeight: 700,
      marginBottom: '16px',
    },
    urgencyDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: goldColor,
    },
    goldBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: `linear-gradient(45deg, ${goldDark}, ${goldColor})`,
      color: '#1a1a1a',
      fontSize: '16px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      marginBottom: '12px',
      letterSpacing: '0.3px',
    },
    registeredBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: 'var(--radius-full)',
      border: '2px solid #66bb6a',
      background: 'transparent',
      color: '#66bb6a',
      fontSize: '16px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'default',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    price: {
      fontSize: '14px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.6,
    },
    ruleItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '14px',
      marginBottom: '16px',
    },
    ruleNum: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,183,77,0.15)',
      color: goldColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      flexShrink: 0,
    },
    ruleText: {
      fontSize: '14px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.85,
      lineHeight: 1.5,
      paddingTop: '5px',
    },
  };

  return (
    <div style={s.page}>
      <style>{secretKeyframes}</style>

      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="material-symbols-outlined" style={s.headerIcon}>lock</span>
        <h1 style={s.headerTitle}>Su kien bi mat</h1>
      </div>

      {/* Mystery Card */}
      <div style={s.mysteryCard}>
        <div style={s.mysteryOverlay} />
        <div style={s.mysteryContent}>
          <span className="material-symbols-outlined" style={s.mysteryIcon}>help</span>
          <p style={s.mysteryText}>Chi tiet duoc tiet lo truoc 24h</p>
        </div>
      </div>

      {/* Revealed Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>visibility</span>
          Thong tin da biet
        </div>
        {revealedItems.map((item, i) => (
          <div key={i} style={s.revealedItem}>
            <span className="material-symbols-outlined" style={s.checkIcon}>check_circle</span>
            <span style={s.revealedText}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Hidden Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>visibility_off</span>
          Con an
        </div>
        {hiddenItems.map((item, i) => (
          <div key={i} style={s.hiddenItem}>
            <span className="material-symbols-outlined" style={s.lockIcon}>lock</span>
            <span style={s.hiddenText}>{item}</span>
          </div>
        ))}
      </div>

      {/* Register */}
      <div style={s.registerSection}>
        <div style={s.urgencyBadge}>
          <div style={s.urgencyDot} />
          Chi con 5 suat
        </div>
        <div style={{ marginBottom: '4px' }} />
        {!registered ? (
          <button style={s.goldBtn} onClick={() => setRegistered(true)}>
            Dang ky tham gia
          </button>
        ) : (
          <div style={s.registeredBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>check_circle</span>
            Da dang ky thanh cong
          </div>
        )}
        <div style={s.price}>500.000 VND</div>
      </div>

      {/* Rules */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>gavel</span>
          Quy tac
        </div>
        {rules.map((rule) => (
          <div key={rule.num} style={s.ruleItem}>
            <div style={s.ruleNum}>{rule.num}</div>
            <span style={s.ruleText}>{rule.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretEventPage;
