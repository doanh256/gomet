import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tasteAxes = [
  { label: 'Cay', value: 85 },
  { label: 'Umami', value: 70 },
  { label: 'Chua', value: 55 },
  { label: 'Ngot', value: 60 },
  { label: 'Dang', value: 30 },
  { label: 'Man', value: 75 },
];

const foodMoments = [
  { id: 1, color: '#FF571A' }, { id: 2, color: '#FFB59E' }, { id: 3, color: '#FFD54F' },
  { id: 4, color: '#117500' }, { id: 5, color: '#E91E63' }, { id: 6, color: '#2196F3' },
  { id: 7, color: '#FF9800' }, { id: 8, color: '#795548' }, { id: 9, color: '#00BCD4' },
];

const interests = [
  'Pho', 'Street Food', 'Fine Dining', 'Ca phe', 'Bun bo Hue',
  'Lau', 'Banh mi', 'Hai san', 'Chay',
];

const PublicProfilePage = () => {
  const navigate = useNavigate();
  const [activePhotoTab] = useState('moments');

  const generateSpiderPath = (axes, maxRadius) => {
    const n = axes.length;
    const angleStep = (2 * Math.PI) / n;
    const cx = 100, cy = 100;
    return axes.map((a, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (a.value / 100) * maxRadius;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
  };

  const generateGridLines = (maxRadius, levels) => {
    const n = tasteAxes.length;
    const angleStep = (2 * Math.PI) / n;
    const cx = 100, cy = 100;
    const lines = [];
    for (let l = 1; l <= levels; l++) {
      const r = (l / levels) * maxRadius;
      const pts = [];
      for (let i = 0; i < n; i++) {
        const angle = i * angleStep - Math.PI / 2;
        pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
      }
      lines.push(pts.join(' '));
    }
    return lines;
  };

  const s = {
    page: {
      flex: 1, backgroundColor: 'var(--surface, #FDF9F3)', overflowY: 'auto',
      padding: '40px 24px 100px', maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: 'var(--on-surface, #2A2A2A)',
    },
    backBtn: {
      background: 'none', border: 'none', cursor: 'pointer',
      color: 'var(--on-surface-variant, #6B6B6B)',
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, marginBottom: 24, padding: 0,
    },
    profileHeader: { textAlign: 'center', marginBottom: 32 },
    avatarWrap: {
      position: 'relative', display: 'inline-block', marginBottom: 12,
    },
    avatar: {
      width: 96, height: 96, borderRadius: '50%',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    avatarIcon: { fontSize: 48, color: '#FDF9F3' },
    tierBadge: {
      position: 'absolute', bottom: -4, right: -4, width: 32, height: 32,
      borderRadius: '50%', background: 'linear-gradient(135deg, #FFD54F, #F57C00)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '3px solid var(--surface, #FDF9F3)',
    },
    tierBadgeIcon: { fontSize: 16, color: '#1a1a1a' },
    name: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 24, fontWeight: 800, color: 'var(--on-surface)',
    },
    title: {
      fontSize: 13, color: '#FF571A', fontWeight: 600, marginBottom: 4,
      fontFamily: 'var(--font-headline)',
    },
    location: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 13, color: 'var(--on-surface-variant)',
    },
    statsRow: { display: 'flex', gap: 12, marginBottom: 28 },
    statCard: {
      flex: 1, textAlign: 'center', padding: '16px 8px', borderRadius: '1.5rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
    },
    statValue: {
      fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 800,
      color: 'var(--on-surface)',
    },
    statLabel: { fontSize: 11, color: 'var(--on-surface-variant)', marginTop: 2 },
    radarSection: { marginBottom: 28 },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#FF571A' },
    radarWrap: {
      display: 'flex', justifyContent: 'center', padding: '12px 0',
    },
    photoGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 28,
    },
    photoItem: (color) => ({
      aspectRatio: '1', borderRadius: '0.75rem', backgroundColor: color,
      opacity: 0.75,
    }),
    tagsWrap: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 },
    tag: {
      padding: '8px 16px', borderRadius: '9999px',
      backgroundColor: 'var(--surface-container, #F0EBE3)',
      fontSize: 13, fontWeight: 600, color: 'var(--on-surface)',
    },
    btnRow: { display: 'flex', gap: 12 },
    btnPrimary: {
      flex: 1, padding: '14px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3', fontSize: 14, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    },
    btnSecondary: {
      flex: 1, padding: '14px', borderRadius: '9999px',
      border: '2px solid #FF571A', background: 'transparent',
      color: '#FF571A', fontSize: 14, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    },
  };

  const gridLines = generateGridLines(70, 4);
  const dataPath = generateSpiderPath(tasteAxes, 70);
  const n = tasteAxes.length;
  const angleStep = (2 * Math.PI) / n;

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      {/* Profile Header */}
      <div style={s.profileHeader}>
        <div style={s.avatarWrap}>
          <div style={s.avatar}>
            <span className="material-symbols-outlined" style={s.avatarIcon}>person</span>
          </div>
          <div style={s.tierBadge}>
            <span className="material-symbols-outlined" style={s.tierBadgeIcon}>diamond</span>
          </div>
        </div>
        <div style={s.name}>Minh Anh</div>
        <div style={s.title}>Culinary Adventurer</div>
        <div style={s.location}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
          TP. Ho Chi Minh
        </div>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div style={s.statValue}>12,450</div>
          <div style={s.statLabel}>Vang Points</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>87</div>
          <div style={s.statLabel}>Mon da thu</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>6</div>
          <div style={s.statLabel}>Vung mien</div>
        </div>
      </div>

      {/* Taste Radar */}
      <div style={s.radarSection}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>radar</span>
          Taste Radar
        </div>
        <div style={s.radarWrap}>
          <svg viewBox="0 0 200 200" width="220" height="220">
            {gridLines.map((pts, i) => (
              <polygon key={i} points={pts} fill="none" stroke="#999" strokeWidth="0.5" opacity={0.4} />
            ))}
            {tasteAxes.map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              return (
                <line key={i} x1={100} y1={100}
                  x2={100 + 70 * Math.cos(angle)} y2={100 + 70 * Math.sin(angle)}
                  stroke="#999" strokeWidth="0.5" opacity={0.3} />
              );
            })}
            <polygon points={dataPath} fill="rgba(255,87,26,0.2)" stroke="#FF571A" strokeWidth="2" />
            {tasteAxes.map((a, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const lx = 100 + 85 * Math.cos(angle);
              const ly = 100 + 85 * Math.sin(angle);
              return (
                <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fill="#6B6B6B" fontWeight="600" fontFamily="Inter, sans-serif">
                  {a.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Food Moments */}
      <div style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>photo_library</span>
        Food Moments
      </div>
      <div style={s.photoGrid}>
        {foodMoments.map(p => (
          <div key={p.id} style={s.photoItem(p.color)} />
        ))}
      </div>

      {/* Interest Tags */}
      <div style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>sell</span>
        So thich am thuc
      </div>
      <div style={s.tagsWrap}>
        {interests.map(tag => (
          <div key={tag} style={s.tag}>{tag}</div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={s.btnRow}>
        <button style={s.btnPrimary}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>mail</span>
          Gui Kitchen Card
        </button>
        <button style={s.btnSecondary}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>restaurant</span>
          Hen an cung
        </button>
      </div>
    </div>
  );
};

export default PublicProfilePage;
