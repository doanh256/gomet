import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const completeKeyframes = `
@keyframes confetti1 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(-80px, 400px) rotate(720deg); opacity: 0; }
}
@keyframes confetti2 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(60px, 380px) rotate(-540deg); opacity: 0; }
}
@keyframes confetti3 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(-40px, 420px) rotate(360deg); opacity: 0; }
}
@keyframes confetti4 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(90px, 360px) rotate(-720deg); opacity: 0; }
}
@keyframes badgeGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255,213,79,0.3), 0 0 40px rgba(255,213,79,0.1); }
  50% { box-shadow: 0 0 40px rgba(255,213,79,0.6), 0 0 80px rgba(255,213,79,0.2); }
}
@keyframes scaleIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes goldShimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

const confettiPieces = [
  { left: '10%', color: '#FF571A', delay: '0s', anim: 'confetti1' },
  { left: '25%', color: '#FFD54F', delay: '0.2s', anim: 'confetti2' },
  { left: '40%', color: '#FFB59E', delay: '0.4s', anim: 'confetti3' },
  { left: '55%', color: '#117500', delay: '0.1s', anim: 'confetti4' },
  { left: '70%', color: '#E91E63', delay: '0.3s', anim: 'confetti1' },
  { left: '85%', color: '#2196F3', delay: '0.5s', anim: 'confetti2' },
  { left: '15%', color: '#FF9800', delay: '0.6s', anim: 'confetti3' },
  { left: '50%', color: '#00BCD4', delay: '0.15s', anim: 'confetti4' },
  { left: '80%', color: '#FFD54F', delay: '0.35s', anim: 'confetti1' },
  { left: '35%', color: '#FF571A', delay: '0.45s', anim: 'confetti2' },
  { left: '65%', color: '#FFB59E', delay: '0.25s', anim: 'confetti3' },
  { left: '5%', color: '#117500', delay: '0.55s', anim: 'confetti4' },
];

const dishes = [
  { name: 'Pho bo tai lan', restaurant: 'Pho Thin' },
  { name: 'Pho bo nam gau', restaurant: 'Pho Gia Truyen' },
  { name: 'Pho bo dac biet', restaurant: 'Pho 10 Ly Quoc Su' },
];

const MissionCompletePage = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const s = {
    page: {
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      padding: '40px 24px 100px', maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: '#FDF9F3',
      position: 'relative', overflow: 'hidden',
    },
    confetti: (piece) => ({
      position: 'absolute', top: -10, left: piece.left, width: 10, height: 10,
      backgroundColor: piece.color, borderRadius: '2px',
      animation: `${piece.anim} 3s ease-out ${piece.delay} infinite`,
      pointerEvents: 'none', zIndex: 0,
    }),
    content: {
      position: 'relative', zIndex: 1,
      opacity: showContent ? 1 : 0, transition: 'opacity 0.5s ease',
    },
    vangHero: {
      textAlign: 'center', marginBottom: 36, marginTop: 40,
      animation: 'scaleIn 0.8s ease-out 0.3s both',
    },
    vangAmount: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 56, fontWeight: 800,
      background: 'linear-gradient(90deg, #FFD54F, #F57C00, #FFD54F)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'goldShimmer 2s linear infinite',
      marginBottom: 4,
    },
    vangLabel: { fontSize: 14, color: '#E6BEB2', fontWeight: 600, letterSpacing: '0.1em' },
    badgeSection: {
      textAlign: 'center', marginBottom: 36,
      animation: 'fadeInUp 0.6s ease-out 0.6s both',
    },
    badgeCircle: {
      width: 120, height: 120, borderRadius: '50%', margin: '0 auto 16px',
      background: 'linear-gradient(135deg, #FFD54F, #F57C00)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'badgeGlow 2s ease-in-out infinite',
    },
    badgeIconEl: { fontSize: 56, color: '#1a1a1a' },
    badgeName: {
      fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800,
      color: '#FFD54F', marginBottom: 4,
    },
    badgeDesc: { fontSize: 14, color: '#E6BEB2' },
    summaryCard: {
      padding: '20px', borderRadius: '1.5rem', backgroundColor: '#1C1B1B',
      marginBottom: 28, animation: 'fadeInUp 0.6s ease-out 0.9s both',
    },
    summaryTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
      color: '#FDF9F3', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    summaryIcon: { fontSize: 20, color: '#FFB59E' },
    dishItem: {
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    dishCheck: { fontSize: 20, color: '#117500' },
    dishInfo: { flex: 1 },
    dishName: { fontSize: 14, fontWeight: 600, color: '#FDF9F3' },
    dishRestaurant: { fontSize: 12, color: '#E6BEB2' },
    statsRow: {
      display: 'flex', gap: 12, marginBottom: 28,
      animation: 'fadeInUp 0.6s ease-out 1.1s both',
    },
    statCard: {
      flex: 1, textAlign: 'center', padding: '16px 8px', borderRadius: '1rem',
      backgroundColor: '#1C1B1B',
    },
    statValue: {
      fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800, color: '#FF571A',
    },
    statLabel: { fontSize: 11, color: '#E6BEB2', marginTop: 4 },
    btnRow: {
      display: 'flex', gap: 12,
      animation: 'fadeInUp 0.6s ease-out 1.3s both',
    },
    shareCta: {
      flex: 1, padding: '16px', borderRadius: '9999px',
      border: '2px solid #FFD54F', background: 'transparent',
      color: '#FFD54F', fontSize: 14, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    nextCta: {
      flex: 1, padding: '16px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3', fontSize: 14, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
  };

  return (
    <div style={s.page}>
      <style>{completeKeyframes}</style>

      {/* Confetti */}
      {confettiPieces.map((p, i) => (
        <div key={i} style={s.confetti(p)} />
      ))}

      <div style={s.content}>
        {/* Vang Amount */}
        <div style={s.vangHero}>
          <div style={s.vangAmount}>+250 VANG</div>
          <div style={s.vangLabel}>THUONG NHIEM VU</div>
        </div>

        {/* Badge */}
        <div style={s.badgeSection}>
          <div style={s.badgeCircle}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.badgeIconEl}>workspace_premium</span>
          </div>
          <div style={s.badgeName}>Mekong Master</div>
          <div style={s.badgeDesc}>Ban da nhan duoc huy hieu moi!</div>
        </div>

        {/* Summary */}
        <div style={s.summaryCard}>
          <div style={s.summaryTitle}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.summaryIcon}>checklist</span>
            The Pho Trinity - 3/3 hoan thanh
          </div>
          {dishes.map((d, i) => (
            <div key={i} style={s.dishItem}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.dishCheck}>check_circle</span>
              <div style={s.dishInfo}>
                <div style={s.dishName}>{d.name}</div>
                <div style={s.dishRestaurant}>{d.restaurant}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          <div style={s.statCard}>
            <div style={s.statValue}>12</div>
            <div style={s.statLabel}>Nhiem vu hoan thanh</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statValue}>Top 5%</div>
            <div style={s.statLabel}>Xep hang</div>
          </div>
        </div>

        {/* Buttons */}
        <div style={s.btnRow}>
          <button style={s.shareCta}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>share</span>
            Chia se
          </button>
          <button style={s.nextCta} onClick={() => navigate('/app/quests')}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            Nhiem vu tiep
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionCompletePage;
