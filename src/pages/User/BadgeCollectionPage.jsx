import React from 'react';
import { useNavigate } from 'react-router-dom';

const regionBadges = [
  { id: 'tayBac', name: 'Tay Bac', icon: 'landscape', earned: true, color: '#8BC34A', tried: 12, total: 15, pct: 80 },
  { id: 'dongBac', name: 'Dong Bac', icon: 'forest', earned: false, color: '#4CAF50', tried: 4, total: 12, pct: 33 },
  { id: 'dbSongHong', name: 'Dong bang song Hong', icon: 'rice_bowl', earned: true, color: '#FF9800', tried: 18, total: 20, pct: 90 },
  { id: 'bacTrungBo', name: 'Bac Trung Bo', icon: 'phishing', earned: true, color: '#2196F3', tried: 15, total: 18, pct: 83 },
  { id: 'namTrungBo', name: 'Nam Trung Bo', icon: 'wb_sunny', earned: true, color: '#FF5722', tried: 14, total: 14, pct: 100 },
  { id: 'tayNguyen', name: 'Tay Nguyen', icon: 'coffee', earned: true, color: '#795548', tried: 8, total: 10, pct: 80 },
  { id: 'dongNamBo', name: 'Dong Nam Bo', icon: 'location_city', earned: true, color: '#E91E63', tried: 20, total: 22, pct: 91 },
  { id: 'tayNamBo', name: 'Tay Nam Bo', icon: 'water', earned: true, color: '#00BCD4', tried: 14, total: 16, pct: 88 },
];

const specialBadges = [
  { name: 'Pho Master', icon: 'ramen_dining', desc: 'Thu 10 loai pho khac nhau', earned: true, color: '#FF571A' },
  { name: 'Street Food King', icon: 'takeout_dining', desc: 'An 50 mon duong pho', earned: true, color: '#FFD54F' },
  { name: 'Spice Lord', icon: 'local_fire_department', desc: 'Thu 20 mon cay nhat', earned: false, color: '#E91E63' },
  { name: 'Sweet Tooth', icon: 'cake', desc: 'Thu 15 mon trang mieng', earned: true, color: '#FFB59E' },
  { name: 'Seafood Sultan', icon: 'set_meal', desc: 'Thu 25 mon hai san', earned: false, color: '#2196F3' },
  { name: 'Veggie Hero', icon: 'eco', desc: 'Thu 10 mon chay', earned: true, color: '#4CAF50' },
];

const BadgeCollectionPage = () => {
  const navigate = useNavigate();
  const earnedRegions = regionBadges.filter(b => b.earned).length;
  const totalRegions = regionBadges.length;
  const overallPct = Math.round(regionBadges.reduce((sum, b) => sum + b.pct, 0) / totalRegions);

  const ringSize = 120;
  const ringStroke = 10;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (overallPct / 100) * ringCircumference;

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
    heading: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 26, fontWeight: 800, fontStyle: 'italic',
      color: 'var(--on-surface)', marginBottom: 8,
    },
    highlight: { color: '#FF571A' },
    subtitle: { fontSize: 14, color: 'var(--on-surface-variant)', marginBottom: 28 },
    masteryCard: {
      display: 'flex', alignItems: 'center', gap: 20,
      padding: '24px', borderRadius: '1.5rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
      marginBottom: 32,
    },
    ringWrap: { position: 'relative', width: ringSize, height: ringSize, flexShrink: 0 },
    ringCenter: {
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    },
    ringPct: {
      fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800, color: '#FF571A',
    },
    ringLabel: { fontSize: 10, color: 'var(--on-surface-variant)' },
    masteryInfo: { flex: 1 },
    masteryTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 4,
    },
    masteryDesc: { fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.5 },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#FF571A' },
    regionGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 36,
    },
    regionCard: (earned, color) => ({
      padding: '20px 16px', borderRadius: '1.5rem', textAlign: 'center',
      backgroundColor: earned ? `${color}10` : 'var(--surface-container, #F0EBE3)',
      border: earned ? `2px solid ${color}` : '2px solid transparent',
      opacity: earned ? 1 : 0.55, position: 'relative', overflow: 'hidden',
    }),
    regionIcon: (earned, color) => ({
      fontSize: 36, color: earned ? color : '#999', marginBottom: 8, display: 'block',
    }),
    regionName: {
      fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 4,
    },
    regionCount: { fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 8 },
    regionBar: {
      height: 6, borderRadius: 3, backgroundColor: 'var(--surface-container, #F0EBE3)',
      overflow: 'hidden',
    },
    regionBarFill: (pct, color) => ({
      height: '100%', borderRadius: 3, width: `${pct}%`,
      backgroundColor: color, transition: 'width 0.5s ease',
    }),
    lockOverlay: {
      position: 'absolute', top: 8, right: 8,
    },
    lockIcon: { fontSize: 18, color: '#999' },
    specialGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20,
    },
    specialCard: (earned, color) => ({
      padding: '18px 10px', borderRadius: '1.5rem', textAlign: 'center',
      backgroundColor: earned ? `${color}10` : 'var(--surface-container, #F0EBE3)',
      border: earned ? `2px solid ${color}` : '2px solid transparent',
      opacity: earned ? 1 : 0.45,
    }),
    specialIcon: (earned, color) => ({
      fontSize: 32, color: earned ? color : '#999', marginBottom: 6, display: 'block',
    }),
    specialName: {
      fontFamily: 'var(--font-headline)', fontSize: 11, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 2,
    },
    specialDesc: { fontSize: 10, color: 'var(--on-surface-variant)' },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.heading}>
        The <span style={s.highlight}>Connoisseur's</span> Collection
      </div>
      <div style={s.subtitle}>{earnedRegions}/{totalRegions} vung mien da chinh phuc</div>

      {/* Overall Mastery Ring */}
      <div style={s.masteryCard}>
        <div style={s.ringWrap}>
          <svg width={ringSize} height={ringSize}>
            <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius}
              fill="none" stroke="#F0EBE3" strokeWidth={ringStroke} />
            <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius}
              fill="none" stroke="#FF571A" strokeWidth={ringStroke}
              strokeDasharray={ringCircumference} strokeDashoffset={ringOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
          </svg>
          <div style={s.ringCenter}>
            <div style={s.ringPct}>{overallPct}%</div>
            <div style={s.ringLabel}>Mastery</div>
          </div>
        </div>
        <div style={s.masteryInfo}>
          <div style={s.masteryTitle}>Overall Mastery</div>
          <div style={s.masteryDesc}>
            Ban da kham pha {earnedRegions} trong {totalRegions} vung mien. Tiep tuc hanh trinh am thuc!
          </div>
        </div>
      </div>

      {/* Region Badges */}
      <div style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>public</span>
        Huy hieu vung mien
      </div>
      <div style={s.regionGrid}>
        {regionBadges.map(b => (
          <div key={b.id} style={s.regionCard(b.earned, b.color)}>
            {!b.earned && (
              <div style={s.lockOverlay}>
                <span className="material-symbols-outlined" style={s.lockIcon}>lock</span>
              </div>
            )}
            <span className="material-symbols-outlined" style={s.regionIcon(b.earned, b.color)}>
              {b.earned ? b.icon : 'lock'}
            </span>
            <div style={s.regionName}>{b.name}</div>
            <div style={s.regionCount}>{b.tried}/{b.total} mon</div>
            <div style={s.regionBar}>
              <div style={s.regionBarFill(b.pct, b.color)} />
            </div>
          </div>
        ))}
      </div>

      {/* Special Badges */}
      <div style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>military_tech</span>
        Huy hieu dac biet
      </div>
      <div style={s.specialGrid}>
        {specialBadges.map(b => (
          <div key={b.name} style={s.specialCard(b.earned, b.color)}>
            <span className="material-symbols-outlined" style={s.specialIcon(b.earned, b.color)}>
              {b.earned ? b.icon : 'lock'}
            </span>
            <div style={s.specialName}>{b.name}</div>
            <div style={s.specialDesc}>{b.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCollectionPage;
