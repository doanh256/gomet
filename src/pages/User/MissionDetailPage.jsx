import React from 'react';
import { useNavigate } from 'react-router-dom';

const missionKeyframes = `
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

const checkpoints = [
  {
    id: 1, name: 'Pho Thin', dish: 'Pho bo tai lan',
    completed: true, restaurant: '13 Lo Duc, Ha Noi', vang: 80,
  },
  {
    id: 2, name: 'Pho Gia Truyen', dish: 'Pho bo nam gau',
    completed: true, restaurant: '49 Bat Dan, Ha Noi', vang: 80,
  },
  {
    id: 3, name: 'Pho 10 Ly Quoc Su', dish: 'Pho bo dac biet',
    completed: false, restaurant: '10 Ly Quoc Su, Ha Noi', vang: 90,
  },
];

const MissionDetailPage = () => {
  const navigate = useNavigate();
  const completedCount = checkpoints.filter(c => c.completed).length;
  const totalReward = 250;

  const s = {
    page: {
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      padding: '40px 24px 100px', maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: '#FDF9F3',
    },
    backBtn: {
      background: 'none', border: 'none', cursor: 'pointer', color: '#E6BEB2',
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, marginBottom: 28, padding: 0,
    },
    header: { textAlign: 'center', marginBottom: 32 },
    missionIcon: {
      width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
      background: 'linear-gradient(135deg, rgba(255,87,26,0.2), rgba(255,181,158,0.1))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    missionIconEl: { fontSize: 36, color: '#FF571A' },
    missionName: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 26, fontWeight: 800, color: '#FDF9F3', marginBottom: 8,
    },
    timer: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 16px', borderRadius: '9999px',
      background: 'rgba(255,87,26,0.15)', fontSize: 13, fontWeight: 600, color: '#FF571A',
    },
    rewardBadge: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: '16px 24px', borderRadius: '1.5rem', marginBottom: 32,
      background: 'linear-gradient(135deg, rgba(255,213,79,0.15), rgba(255,213,79,0.05))',
      animation: 'pulse 2s ease-in-out infinite',
    },
    rewardIcon: { fontSize: 28, color: '#FFD54F' },
    rewardText: {
      fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800, color: '#FFD54F',
    },
    rewardLabel: { fontSize: 12, color: '#E6BEB2', marginLeft: 4 },
    progressRow: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 12,
    },
    progressLabel: { fontSize: 13, color: '#E6BEB2', fontWeight: 600 },
    progressCount: {
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 800, color: '#FF571A',
    },
    progressBar: {
      height: 8, borderRadius: 4, backgroundColor: '#1C1B1B',
      overflow: 'hidden', marginBottom: 28,
    },
    progressFill: {
      height: '100%', borderRadius: 4,
      background: 'linear-gradient(90deg, #FF571A, #FFB59E)',
    },
    mapSection: { marginBottom: 32 },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: '#FDF9F3', marginBottom: 20,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#FFB59E' },
    checkpointList: { position: 'relative', paddingLeft: 32 },
    cpLine: {
      position: 'absolute', left: 14, top: 0, bottom: 0, width: 3,
      background: 'linear-gradient(180deg, #117500, #FF571A, #1C1B1B)',
      borderRadius: 2,
    },
    checkpoint: { position: 'relative', marginBottom: 24 },
    cpDot: (completed) => ({
      position: 'absolute', left: -26, top: 8, width: 20, height: 20,
      borderRadius: '50%', border: '3px solid #131313',
      background: completed
        ? 'linear-gradient(135deg, #117500, #4CAF50)'
        : '#1C1B1B',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }),
    cpDotIcon: { fontSize: 12, color: '#FDF9F3' },
    cpCard: (completed) => ({
      padding: '16px', borderRadius: '1rem',
      backgroundColor: completed ? '#1C1B1B' : 'rgba(28,27,27,0.5)',
      boxShadow: completed ? '0 4px 16px rgba(0,0,0,0.3)' : 'none',
      border: completed ? '1px solid rgba(17,117,0,0.3)' : '1px solid rgba(255,255,255,0.05)',
    }),
    cpHeader: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6,
    },
    cpName: (completed) => ({
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700,
      color: completed ? '#FDF9F3' : 'rgba(253,249,243,0.4)',
    }),
    cpStatus: (completed) => ({
      display: 'flex', alignItems: 'center', gap: 4,
      fontSize: 12, fontWeight: 600,
      color: completed ? '#117500' : 'rgba(253,249,243,0.3)',
    }),
    cpDish: (completed) => ({
      fontSize: 13, color: completed ? '#E6BEB2' : 'rgba(230,190,178,0.3)',
      marginBottom: 4,
    }),
    cpRestaurant: (completed) => ({
      fontSize: 12, color: completed ? '#E6BEB280' : 'rgba(230,190,178,0.2)',
      display: 'flex', alignItems: 'center', gap: 4,
    }),
    cpVang: {
      marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: '9999px',
      background: 'rgba(255,213,79,0.15)', fontSize: 12, fontWeight: 700, color: '#FFD54F',
    },
    continueCta: {
      width: '100%', padding: '16px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3', fontSize: 16, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
  };

  return (
    <div style={s.page}>
      <style>{missionKeyframes}</style>

      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      {/* Header */}
      <div style={s.header}>
        <div style={s.missionIcon}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.missionIconEl}>ramen_dining</span>
        </div>
        <div style={s.missionName}>The Pho Trinity</div>
        <div style={s.timer}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
          3 ngay con lai
        </div>
      </div>

      {/* Reward */}
      <div style={s.rewardBadge}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.rewardIcon}>toll</span>
        <div style={s.rewardText}>+{totalReward} VANG</div>
        <div style={s.rewardLabel}>tong thuong</div>
      </div>

      {/* Progress */}
      <div style={s.progressRow}>
        <div style={s.progressLabel}>Tien trinh nhiem vu</div>
        <div style={s.progressCount}>{completedCount}/{checkpoints.length}</div>
      </div>
      <div style={s.progressBar}>
        <div style={{ ...s.progressFill, width: `${(completedCount / checkpoints.length) * 100}%` }} />
      </div>

      {/* Mission Map */}
      <div style={s.mapSection}>
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>flag</span>
          Ban do nhiem vu
        </div>
        <div style={s.checkpointList}>
          <div style={s.cpLine} />
          {checkpoints.map(cp => (
            <div key={cp.id} style={s.checkpoint}>
              <div style={s.cpDot(cp.completed)}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.cpDotIcon}>
                  {cp.completed ? 'check' : 'lock'}
                </span>
              </div>
              <div style={s.cpCard(cp.completed)}>
                <div style={s.cpHeader}>
                  <div style={s.cpName(cp.completed)}>{cp.name}</div>
                  <div style={s.cpStatus(cp.completed)}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      {cp.completed ? 'check_circle' : 'lock'}
                    </span>
                    {cp.completed ? 'Hoan thanh' : 'Chua mo'}
                  </div>
                </div>
                <div style={s.cpDish(cp.completed)}>{cp.dish}</div>
                <div style={s.cpRestaurant(cp.completed)}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
                  {cp.restaurant}
                </div>
                {cp.completed && (
                  <div style={s.cpVang}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 12 }}>toll</span>
                    +{cp.vang} Vang
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue CTA */}
      <button style={s.continueCta}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
        Tiep tuc nhiem vu
      </button>
    </div>
  );
};

export default MissionDetailPage;
