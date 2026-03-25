import React from 'react';
import { useNavigate } from 'react-router-dom';

const timelineKeyframes = `
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 12px rgba(255,87,26,0.3); }
  50% { box-shadow: 0 0 24px rgba(255,87,26,0.6); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const milestones = [
  {
    date: '15/01/2026', restaurant: 'Phở Thìn', dish: 'Phở bò tái lăn',
    vang: 30, badge: 'First Meal', badgeIcon: 'restaurant', badgeColor: '#FF571A',
    note: 'Bữa ăn đầu tiên cùng nhau',
  },
  {
    date: '28/01/2026', restaurant: 'Bún Chả Đắc Kim', dish: 'Bún chả Hà Nội',
    vang: 25, badge: null, badgeIcon: null, badgeColor: null,
    note: 'Khám phá ẩm thực Hà Nội',
  },
  {
    date: '14/02/2026', restaurant: 'La Maison 1888', dish: 'Set menu Valentine',
    vang: 100, badge: '10 Dishes Together', badgeIcon: 'favorite', badgeColor: '#E91E63',
    note: 'Valentine đặc biệt',
  },
  {
    date: '02/03/2026', restaurant: 'Quán Bụi', dish: 'Lẩu Thái',
    vang: 30, badge: null, badgeIcon: null, badgeColor: null,
    note: 'Khám phá món mới',
  },
  {
    date: '18/03/2026', restaurant: 'Cơm Tấm Bà Ghiền', dish: 'Cơm tấm sườn bì chả',
    vang: 20, badge: 'Same Favorite', badgeIcon: 'thumb_up', badgeColor: '#FFD54F',
    note: 'Phát hiện món yêu thích chung!',
  },
];

const RelationshipTimelinePage = () => {
  const navigate = useNavigate();

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
    avatarRow: {
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 20, marginBottom: 32,
    },
    avatarWrap: {
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    },
    avatar: {
      width: 72, height: 72, borderRadius: '50%',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    avatarIcon: { fontSize: 36, color: '#FDF9F3' },
    avatarName: {
      fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 700, color: '#FDF9F3',
    },
    heartIcon: { fontSize: 28, color: '#FF571A', animation: 'pulseGlow 2s ease-in-out infinite' },
    chemBadge: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
      padding: '20px 24px', borderRadius: '1.5rem',
      background: 'linear-gradient(135deg, rgba(255,87,26,0.2), rgba(255,181,158,0.1))',
      marginBottom: 36,
      boxShadow: '0 0 30px rgba(255,87,26,0.25), 0 0 60px rgba(255,87,26,0.1)',
      border: '1px solid rgba(255,213,79,0.3)',
    },
    chemIcon: { fontSize: 32, color: '#FFD54F', filter: 'drop-shadow(0 0 8px rgba(255,213,79,0.5))' },
    chemLabel: { fontSize: 13, color: '#E6BEB2', marginBottom: 2 },
    chemValue: {
      fontFamily: 'var(--font-headline)', fontSize: 32, fontWeight: 800, color: '#FF571A',
      textShadow: '0 0 20px rgba(255,87,26,0.4)',
    },
    chemTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700,
      color: '#FFD54F', letterSpacing: '0.06em',
      textShadow: '0 0 12px rgba(255,213,79,0.4)',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: '#FDF9F3', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#FFB59E' },
    timeline: { position: 'relative', paddingLeft: 28, marginBottom: 36 },
    timelineLine: {
      position: 'absolute', left: 10, top: 0, bottom: 0, width: 2,
      background: 'linear-gradient(180deg, #FF571A, #FFB59E, rgba(255,181,158,0.2))',
    },
    milestone: {
      position: 'relative', marginBottom: 28, animation: 'fadeInUp 0.5s ease-out',
    },
    dot: (hasBadge) => ({
      position: 'absolute', left: -23, top: 8, width: 16, height: 16,
      borderRadius: '50%', border: '3px solid #131313',
      background: hasBadge
        ? 'linear-gradient(135deg, #FF571A, #FFD54F)'
        : '#FFB59E',
    }),
    msDate: { fontSize: 11, color: '#E6BEB2', fontWeight: 600, marginBottom: 6 },
    msCard: {
      padding: '16px', borderRadius: '1rem',
      backgroundColor: '#1C1B1B',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    },
    msRestaurant: {
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700,
      color: '#FDF9F3', marginBottom: 4,
    },
    msDish: { fontSize: 13, color: '#E6BEB2', marginBottom: 8 },
    msNote: { fontSize: 12, color: '#FFB59E', fontStyle: 'italic', marginBottom: 8 },
    msFooter: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    msVang: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: '9999px',
      background: 'rgba(255,213,79,0.15)', fontSize: 12, fontWeight: 700, color: '#FFD54F',
    },
    msBadge: (color) => ({
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: '9999px',
      background: `${color}25`, fontSize: 11, fontWeight: 700, color,
    }),
    shareCta: {
      width: '100%', padding: '16px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3', fontSize: 16, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
  };

  return (
    <div style={s.page}>
      <style>{timelineKeyframes}</style>

      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lại
      </button>

      {/* Avatars */}
      <div style={s.avatarRow}>
        <div style={s.avatarWrap}>
          <div style={s.avatar}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.avatarIcon}>person</span>
          </div>
          <div style={s.avatarName}>Minh Anh</div>
        </div>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.heartIcon}>favorite</span>
        <div style={s.avatarWrap}>
          <div style={s.avatar}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.avatarIcon}>person</span>
          </div>
          <div style={s.avatarName}>Thanh Tùng</div>
        </div>
      </div>

      {/* Chemistry Badge */}
      <div style={s.chemBadge}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.chemIcon}>science</span>
        <div>
          <div style={s.chemTitle}>Culinary Alchemist</div>
          <div style={s.chemLabel}>Hóa học ẩm thực</div>
        </div>
        <div style={s.chemValue}>87%</div>
      </div>

      {/* Timeline */}
      <div style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>timeline</span>
        Hành trình cùng nhau
      </div>
      <div style={s.timeline}>
        <div style={s.timelineLine} />
        {milestones.map((ms, idx) => (
          <div key={idx} style={{ ...s.milestone, animationDelay: `${idx * 0.1}s` }}>
            <div style={s.dot(!!ms.badge)} />
            <div style={s.msDate}>{ms.date}</div>
            <div style={s.msCard}>
              {/* Food photo placeholder */}
              <div style={{ width: '100%', height: 100, borderRadius: '0.75rem', background: 'linear-gradient(135deg, rgba(255,87,26,0.2), rgba(255,181,158,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 36, color: '#FFB59E', opacity: 0.5 }}>lunch_dining</span>
              </div>
              <div style={s.msRestaurant}>{ms.restaurant}</div>
              <div style={s.msDish}>{ms.dish}</div>
              <div style={s.msNote}>{ms.note}</div>
              <div style={s.msFooter}>
                <div style={s.msVang}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>toll</span>
                  +{ms.vang} Vang
                </div>
                {ms.badge && (
                  <div style={s.msBadge(ms.badgeColor)}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>{ms.badgeIcon}</span>
                    {ms.badge}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share CTA */}
      <button style={s.shareCta}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
        Chia sẻ hành trình
      </button>
    </div>
  );
};

export default RelationshipTimelinePage;
