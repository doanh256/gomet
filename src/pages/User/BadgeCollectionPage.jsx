import React from 'react';
import { useNavigate } from 'react-router-dom';

const regionBadges = [
  { id: 'tayBac', name: 'Tây Bắc', icon: 'landscape', earned: true, color: '#8BC34A', tried: 12, total: 15, pct: 80 },
  { id: 'dongBac', name: 'Đông Bắc', icon: 'forest', earned: false, color: '#4CAF50', tried: 4, total: 12, pct: 33 },
  { id: 'dbSongHong', name: 'Đồng bằng sông Hồng', icon: 'rice_bowl', earned: true, color: '#FF9800', tried: 18, total: 20, pct: 90 },
  { id: 'bacTrungBo', name: 'Bắc Trung Bộ', icon: 'phishing', earned: true, color: '#2196F3', tried: 15, total: 18, pct: 83 },
  { id: 'namTrungBo', name: 'Nam Trung Bộ', icon: 'wb_sunny', earned: true, color: '#FF5722', tried: 14, total: 14, pct: 100 },
  { id: 'tayNguyen', name: 'Tây Nguyên', icon: 'coffee', earned: true, color: '#795548', tried: 8, total: 10, pct: 80 },
  { id: 'dongNamBo', name: 'Đông Nam Bộ', icon: 'location_city', earned: true, color: '#E91E63', tried: 20, total: 22, pct: 91 },
  { id: 'tayNamBo', name: 'Tây Nam Bộ', icon: 'water', earned: true, color: '#00BCD4', tried: 14, total: 16, pct: 88 },
];

const specialBadges = [
  { name: 'Pho Master', icon: 'ramen_dining', desc: 'Thử 10 loại phở khác nhau', earned: true, color: '#FF571A' },
  { name: 'Street Food King', icon: 'takeout_dining', desc: 'Ăn 50 món đường phố', earned: true, color: '#FFD54F' },
  { name: 'Spice Lord', icon: 'local_fire_department', desc: 'Thử 20 món cay nhất', earned: false, color: '#E91E63' },
  { name: 'Sweet Tooth', icon: 'cake', desc: 'Thử 15 món tráng miệng', earned: true, color: '#FFB59E' },
  { name: 'Seafood Sultan', icon: 'set_meal', desc: 'Thử 25 món hải sản', earned: false, color: '#2196F3' },
  { name: 'Veggie Hero', icon: 'eco', desc: 'Thử 10 món chay', earned: true, color: '#4CAF50' },
];

const BadgeCollectionPage = () => {
  const navigate = useNavigate();
  const earnedRegions = regionBadges.filter(b => b.earned).length;
  const totalRegions = regionBadges.length;
  const overallPct = Math.round(regionBadges.reduce((sum, b) => sum + b.pct, 0) / totalRegions);

  const ringSize = 160;
  const ringStroke = 12;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (overallPct / 100) * ringCircumference;

  const s = {
    page: {
      flex: 1, backgroundColor: '#FDF9F3', overflowY: 'auto',
      padding: '40px 24px 100px', maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: '#393834',
    },
    backBtn: {
      background: 'none', border: 'none', cursor: 'pointer',
      color: '#666460',
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, marginBottom: 24, padding: 0,
    },
    heading: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 26, fontWeight: 800, fontStyle: 'italic',
      color: '#393834', marginBottom: 8,
    },
    highlight: { color: '#b83500' },
    subtitle: { fontSize: 14, color: '#666460', marginBottom: 28 },
    masteryCard: {
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      padding: '28px 24px', borderRadius: '1.5rem',
      backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      marginBottom: 32,
    },
    ringWrap: { position: 'relative', width: ringSize, height: ringSize, flexShrink: 0 },
    ringCenter: {
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    },
    ringPct: {
      fontFamily: 'var(--font-headline)', fontSize: 36, fontWeight: 800, color: '#b83500',
    },
    ringLabel: { fontSize: 11, color: '#666460' },
    masteryInfo: { textAlign: 'center' },
    masteryTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: '#393834', marginBottom: 4,
    },
    masteryDesc: { fontSize: 13, color: '#666460', lineHeight: 1.5 },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: '#393834', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#b83500' },
    regionGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 36,
    },
    regionCard: (earned, color) => ({
      padding: '20px 16px', borderRadius: '1.5rem', textAlign: 'center',
      background: earned ? `linear-gradient(135deg, ${color}15, ${color}08)` : '#ffffff',
      border: earned ? `2px solid ${color}` : '2px solid #F0EBE3',
      opacity: earned ? 1 : 0.55, position: 'relative', overflow: 'hidden',
      boxShadow: earned ? `0 4px 16px ${color}20` : '0 2px 8px rgba(0,0,0,0.04)',
    }),
    regionIcon: (earned, color) => ({
      fontSize: 36, color: earned ? color : '#999', marginBottom: 8, display: 'block',
    }),
    regionName: {
      fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 700,
      color: '#393834', marginBottom: 4,
    },
    regionCount: { fontSize: 12, color: '#666460', marginBottom: 8 },
    regionBar: {
      height: 6, borderRadius: 3, backgroundColor: '#F0EBE3',
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
      background: earned ? `linear-gradient(135deg, ${color}18, ${color}08)` : '#ffffff',
      border: earned ? `2px solid ${color}` : '2px solid #F0EBE3',
      opacity: earned ? 1 : 0.45,
      boxShadow: earned ? `0 4px 12px ${color}20` : '0 2px 8px rgba(0,0,0,0.04)',
    }),
    specialIcon: (earned, color) => ({
      fontSize: 32, color: earned ? color : '#999', marginBottom: 6, display: 'block',
    }),
    specialName: {
      fontFamily: 'var(--font-headline)', fontSize: 11, fontWeight: 700,
      color: '#393834', marginBottom: 2,
    },
    specialDesc: { fontSize: 10, color: '#666460' },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lại
      </button>

      <div style={s.heading}>
        The <span style={s.highlight}>Connoisseur's</span> Collection
      </div>
      <div style={s.subtitle}>{earnedRegions}/{totalRegions} vùng miền đã chinh phục</div>

      {/* Overall Mastery Ring */}
      <div style={s.masteryCard}>
        <div style={s.ringWrap}>
          <svg width={ringSize} height={ringSize}>
            <defs>
              <linearGradient id="masteryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b83500" />
                <stop offset="100%" stopColor="#FF4D00" />
              </linearGradient>
            </defs>
            <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius}
              fill="none" stroke="#F0EBE3" strokeWidth={ringStroke} />
            <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius}
              fill="none" stroke="url(#masteryGradient)" strokeWidth={ringStroke}
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
            Bạn đã khám phá {earnedRegions} trong {totalRegions} vùng miền. Tiếp tục hành trình ẩm thực!
          </div>
        </div>
      </div>

      {/* Region Badges */}
      <div style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>public</span>
        Huy hiệu vùng miền
      </div>
      <div style={s.regionGrid}>
        {regionBadges.map(b => (
          <div key={b.id} style={s.regionCard(b.earned, b.color)}>
            {!b.earned && (
              <div style={s.lockOverlay}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.lockIcon}>lock</span>
              </div>
            )}
            <span aria-hidden="true" className="material-symbols-outlined" style={s.regionIcon(b.earned, b.color)}>
              {b.earned ? b.icon : 'lock'}
            </span>
            <div style={s.regionName}>{b.name}</div>
            <div style={s.regionCount}>{b.tried}/{b.total} món</div>
            <div style={s.regionBar}>
              <div style={s.regionBarFill(b.pct, b.color)} />
            </div>
          </div>
        ))}
      </div>

      {/* Special Badges */}
      <div style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>military_tech</span>
        Huy hiệu đặc biệt
      </div>
      <div style={s.specialGrid}>
        {specialBadges.map(b => (
          <div key={b.name} style={s.specialCard(b.earned, b.color)}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.specialIcon(b.earned, b.color)}>
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
