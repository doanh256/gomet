import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { id: 'tayBac', name: 'Tay Bac', icon: 'landscape', dishes: ['Thit trau gac bep', 'Xoi ngu sac', 'Rau cai meo'], tried: 2, total: 15, color: '#8BC34A', top: '18%', left: '15%' },
  { id: 'dongBac', name: 'Dong Bac', icon: 'forest', dishes: ['Pho chua', 'Banh cuon', 'Vit quay'], tried: 1, total: 12, color: '#4CAF50', top: '15%', left: '40%' },
  { id: 'dbSongHong', name: 'Dong bang song Hong', icon: 'rice_bowl', dishes: ['Bun cha', 'Pho Ha Noi', 'Cha ca'], tried: 5, total: 20, color: '#FF9800', top: '28%', left: '38%' },
  { id: 'bacTrungBo', name: 'Bac Trung Bo', icon: 'phishing', dishes: ['Bun bo Hue', 'Banh bot loc', 'Com hen'], tried: 3, total: 18, color: '#2196F3', top: '42%', left: '42%' },
  { id: 'namTrungBo', name: 'Nam Trung Bo', icon: 'wb_sunny', dishes: ['Mi Quang', 'Cao lau', 'Banh trang cuon'], tried: 2, total: 14, color: '#FF5722', top: '55%', left: '50%' },
  { id: 'tayNguyen', name: 'Tay Nguyen', icon: 'coffee', dishes: ['Ca phe', 'Com lam', 'Ga nuong'], tried: 1, total: 10, color: '#795548', top: '58%', left: '38%' },
  { id: 'dongNamBo', name: 'Dong Nam Bo', icon: 'location_city', dishes: ['Banh mi', 'Com tam', 'Hu tieu'], tried: 7, total: 22, color: '#E91E63', top: '72%', left: '42%' },
  { id: 'tayNamBo', name: 'Tay Nam Bo', icon: 'water', dishes: ['Lau mam', 'Banh xeo', 'Ca kho to'], tried: 4, total: 16, color: '#00BCD4', top: '80%', left: '30%' },
];

const badges = [
  { id: 'tayBac', name: 'Tay Bac', unlocked: false, color: '#8BC34A' },
  { id: 'dongBac', name: 'Dong Bac', unlocked: false, color: '#4CAF50' },
  { id: 'dbSongHong', name: 'Song Hong', unlocked: true, color: '#FF9800' },
  { id: 'bacTrungBo', name: 'Trung Bo', unlocked: true, color: '#2196F3' },
  { id: 'namTrungBo', name: 'Nam Trung', unlocked: false, color: '#FF5722' },
  { id: 'tayNguyen', name: 'Tay Nguyen', unlocked: false, color: '#795548' },
  { id: 'dongNamBo', name: 'Dong Nam Bo', unlocked: true, color: '#E91E63' },
  { id: 'tayNamBo', name: 'Tay Nam Bo', unlocked: false, color: '#00BCD4' },
];

const RegionalExplorePage = () => {
  const navigate = useNavigate();
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 100px',
      maxWidth: 720,
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      marginBottom: 24,
      padding: 0,
    },
    headerPill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--surface-container-high)',
      color: 'var(--primary)',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: 12,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      fontStyle: 'italic',
      color: 'var(--on-surface)',
      lineHeight: 1.2,
      marginBottom: 8,
    },
    highlight: { color: 'var(--primary)' },
    sub: {
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      marginBottom: 28,
    },
    mapWrap: {
      position: 'relative',
      width: '100%',
      height: 350,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-lg)',
      marginBottom: 32,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
      opacity: 0.5,
      textAlign: 'center',
      zIndex: 1,
    },
    mapDot: (region, hovered) => ({
      position: 'absolute',
      top: region.top,
      left: region.left,
      width: hovered ? 20 : 14,
      height: hovered ? 20 : 14,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${region.color}, ${region.color}88)`,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: hovered ? `0 0 16px ${region.color}88` : `0 0 8px ${region.color}44`,
      zIndex: 2,
    }),
    mapTooltip: {
      position: 'absolute',
      top: '-32px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'var(--surface-container-highest)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: 11,
      fontWeight: 600,
      fontFamily: 'var(--font-headline)',
      color: 'var(--on-surface)',
      whiteSpace: 'nowrap',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 14,
      marginBottom: 36,
    },
    card: {
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease',
    },
    cardAccent: (color) => ({
      height: 4,
      background: `linear-gradient(90deg, ${color}, ${color}88)`,
    }),
    cardBody: {
      padding: '16px 14px',
    },
    cardIcon: (color) => ({
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-full)',
      backgroundColor: `${color}22`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    }),
    cardName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    cardDishes: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginBottom: 10,
      lineHeight: 1.5,
    },
    progressRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    progressTrack: {
      flex: 1,
      height: 4,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    progressFill: (pct, color) => ({
      height: '100%',
      width: `${pct}%`,
      backgroundColor: color,
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.5s ease',
    }),
    progressLabel: {
      fontSize: 11,
      color: 'var(--on-surface-variant)',
      fontWeight: 600,
      whiteSpace: 'nowrap',
    },
    exploreBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 700,
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    badgeSection: {
      marginBottom: 32,
    },
    badgeScroll: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      paddingBottom: 8,
      scrollbarWidth: 'none',
    },
    badge: (unlocked, color) => ({
      flexShrink: 0,
      width: 72,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    }),
    badgeCircle: (unlocked, color) => ({
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: unlocked ? `linear-gradient(135deg, ${color}, ${color}88)` : 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: unlocked ? `0 4px 16px ${color}44` : 'none',
    }),
    badgeName: (unlocked) => ({
      fontSize: 10,
      fontWeight: 600,
      fontFamily: 'var(--font-headline)',
      color: unlocked ? 'var(--on-surface)' : 'var(--on-surface-variant)',
      textAlign: 'center',
      opacity: unlocked ? 1 : 0.5,
    }),
  };

  return (
    <div style={s.page}>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        .region-dot:hover { animation: pulse-dot 1s ease infinite; }
        .badge-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.headerPill}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>explore</span>
        KHAM PHA
      </div>

      <h1 style={s.heading}>
        Kham pha <span style={s.highlight}>8 vung</span><br />am thuc Viet Nam
      </h1>
      <p style={s.sub}>Hanh trinh am thuc qua tung vung mien dat nuoc.</p>

      {/* Map area */}
      <div style={s.mapWrap}>
        <span style={s.mapLabel}>Ban do am thuc Viet Nam</span>
        {regions.map(r => (
          <div
            key={r.id}
            className="region-dot"
            style={s.mapDot(r, hoveredRegion === r.id)}
            onMouseEnter={() => setHoveredRegion(r.id)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            {hoveredRegion === r.id && <div style={s.mapTooltip}>{r.name}</div>}
          </div>
        ))}
      </div>

      {/* Region cards */}
      <div style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--primary)' }}>pin_drop</span>
        Cac vung am thuc
      </div>
      <div style={s.grid}>
        {regions.map(r => {
          const pct = Math.round((r.tried / r.total) * 100);
          return (
            <div key={r.id} style={s.card}>
              <div style={s.cardAccent(r.color)} />
              <div style={s.cardBody}>
                <div style={s.cardIcon(r.color)}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: r.color }}>{r.icon}</span>
                </div>
                <div style={s.cardName}>{r.name}</div>
                <div style={s.cardDishes}>{r.dishes.join(', ')}</div>
                <div style={s.progressRow}>
                  <div style={s.progressTrack}>
                    <div style={s.progressFill(pct, r.color)} />
                  </div>
                  <span style={s.progressLabel}>{r.tried}/{r.total} mon</span>
                </div>
                <button style={s.exploreBtn} onClick={() => navigate(`/app/regional/${r.id}`)}>
                  Kham pha
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge section */}
      <div style={s.badgeSection}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--tertiary-container)' }}>military_tech</span>
          Huy hieu da mo
        </div>
        <div className="badge-scroll" style={s.badgeScroll}>
          {badges.map(b => (
            <div key={b.id} style={s.badge(b.unlocked, b.color)}>
              <div style={s.badgeCircle(b.unlocked, b.color)}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: b.unlocked ? '#fff' : 'var(--on-surface-variant)' }}>
                  {b.unlocked ? 'emoji_events' : 'lock'}
                </span>
              </div>
              <span style={s.badgeName(b.unlocked)}>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionalExplorePage;
