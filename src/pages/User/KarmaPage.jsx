import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KarmaPage = () => {
  const navigate = useNavigate();
  const [score] = useState(850);
  const maxScore = 1000;
  const levels = [
    { name: 'Bronze', min: 0, max: 200, color: '#cd7f32', emoji: '🥉' },
    { name: 'Silver', min: 200, max: 400, color: '#c0c0c0', emoji: '🥈' },
    { name: 'Gold', min: 400, max: 600, color: '#FFD54F', emoji: '🥇' },
    { name: 'Platinum', min: 600, max: 800, color: '#E6BEB2', emoji: '💎' },
    { name: 'Diamond', min: 800, max: 1000, color: '#FFB59E', emoji: '👑' },
  ];
  const currentLevel = levels.find(l => score >= l.min && score <= l.max) || levels[4];
  const scoringRules = [
    { activity: 'Hoan thanh hen do', points: '+50', icon: 'restaurant', color: '#117500' },
    { activity: 'Danh gia tot', points: '+30', icon: 'thumb_up', color: '#FFB59E' },
    { activity: 'Xac minh tai khoan', points: '+100', icon: 'verified', color: '#FFD54F' },
    { activity: 'Bi bao cao', points: '-100', icon: 'flag', color: '#FF571A' },
    { activity: 'Huy hen', points: '-20', icon: 'cancel', color: '#FF571A' },
  ];
  const history = [
    { date: '20/03/2026', reason: 'Hoan thanh hen tai Runam Bistro', change: '+50', total: 850 },
    { date: '18/03/2026', reason: 'Nhan danh gia 5 sao', change: '+30', total: 800 },
    { date: '15/03/2026', reason: 'Xac minh CCCD', change: '+100', total: 770 },
    { date: '12/03/2026', reason: 'Hoan thanh hen tai The Coffee House', change: '+50', total: 670 },
    { date: '10/03/2026', reason: 'Huy hen cuoi tuan', change: '-20', total: 620 },
  ];
  const perks = [
    { icon: 'visibility', title: 'Hien thi uu tien', desc: 'Profile cua ban duoc xep hang cao hon' },
    { icon: 'verified', title: 'Huy hieu Diamond', desc: 'Badge Diamond doc quyen tren profile' },
    { icon: 'event_available', title: 'Truy cap su kien VIP', desc: 'Tham gia cac su kien gioi han' },
  ];
  const circumference = 2 * Math.PI * 68;
  const dashOffset = circumference - (score / maxScore) * circumference;

  const s = {
    page: { flex: 1, backgroundColor: '#131313', overflowY: 'auto', padding: '40px 32px 80px' },
    header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#FDF9F3', display: 'flex', alignItems: 'center' },
    pageTitle: { fontFamily: 'var(--font-headline)', fontSize: '28px', fontWeight: 800, color: '#FDF9F3' },
    verifiedIcon: { color: '#FFB59E', fontSize: '28px' },
    scoreSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', marginBottom: '32px' },
    scoreRing: { position: 'relative', width: '160px', height: '160px' },
    scoreValue: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' },
    scoreNumber: { fontFamily: 'var(--font-headline)', fontSize: '36px', fontWeight: 800, color: '#FDF9F3' },
    scoreMax: { fontSize: '14px', color: '#E6BEB2', fontFamily: 'var(--font-body)' },
    scoreLabel: { marginTop: '16px', fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, color: '#FFB59E' },
    starRow: { display: 'flex', gap: '4px', marginTop: '8px' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, color: '#FDF9F3', marginBottom: '16px' },
    levelsRow: { display: 'flex', gap: '12px', marginBottom: '36px', overflowX: 'auto', paddingBottom: '8px' },
    levelBadge: (level) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 14px', borderRadius: '1.5rem', backgroundColor: '#1C1B1B', border: level.name === currentLevel.name ? '2px solid #FFB59E' : '2px solid transparent', boxShadow: level.name === currentLevel.name ? '0 0 16px rgba(255,181,158,0.2)' : 'none', minWidth: '80px', transition: 'all 0.3s' }),
    levelEmoji: { fontSize: '28px' },
    levelName: { fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-headline)', color: '#FDF9F3' },
    levelRange: { fontSize: '10px', color: '#E6BEB2' },
    scoringSection: { marginBottom: '36px' },
    scoringRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', backgroundColor: '#1C1B1B', borderRadius: '1.5rem', marginBottom: '8px' },
    scoringIcon: (color) => ({ width: '40px', height: '40px', borderRadius: '9999px', backgroundColor: color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, fontSize: '20px', flexShrink: 0 }),
    scoringActivity: { flex: 1, fontSize: '14px', fontWeight: 500, color: '#FDF9F3' },
    pointsBadge: (positive) => ({ padding: '4px 12px', borderRadius: '9999px', backgroundColor: positive ? '#11750030' : '#FF571A30', color: positive ? '#117500' : '#FF571A', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-headline)' }),
    historySection: { marginBottom: '36px' },
    historyItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderBottom: '1px solid #2A2A2A' },
    historyDot: (positive) => ({ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: positive ? '#117500' : '#FF571A', flexShrink: 0 }),
    historyInfo: { flex: 1 },
    historyReason: { fontSize: '14px', fontWeight: 500, color: '#FDF9F3' },
    historyDate: { fontSize: '12px', color: '#E6BEB2', marginTop: '2px' },
    historyChange: (positive) => ({ fontSize: '14px', fontWeight: 700, color: positive ? '#117500' : '#FF571A', marginRight: '12px' }),
    historyTotal: { fontSize: '12px', color: '#E6BEB2', fontWeight: 600, minWidth: '40px', textAlign: 'right' },
    perksSection: { marginBottom: '36px' },
    perkCard: { display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#1C1B1B', borderRadius: '1.5rem', marginBottom: '12px' },
    perkIconWrap: { width: '48px', height: '48px', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A0B00', flexShrink: 0 },
    perkTitle: { fontSize: '15px', fontWeight: 700, color: '#FDF9F3', fontFamily: 'var(--font-headline)' },
    perkDesc: { fontSize: '13px', color: '#E6BEB2', marginTop: '2px' },
  };

  return (
    <div style={s.page}>
      <div style={s.header}><button style={s.backBtn} onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button><h1 style={s.pageTitle}>Diem uy tin</h1><span className="material-symbols-outlined filled" style={s.verifiedIcon}>verified</span></div>
      <div style={s.scoreSection}>
        <div style={s.scoreRing}>
          <svg width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="68" fill="none" stroke="#353535" strokeWidth="10" /><circle cx="80" cy="80" r="68" fill="none" stroke="url(#karmaGrad)" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" transform="rotate(-90 80 80)" style={{ transition: 'stroke-dashoffset 1s ease' }} /><defs><linearGradient id="karmaGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFB59E" /><stop offset="100%" stopColor="#FF571A" /></linearGradient></defs></svg>
          <div style={s.scoreValue}><div style={s.scoreNumber}>{score}</div><div style={s.scoreMax}>/ {maxScore}</div></div>
        </div>
        <div style={s.scoreLabel}>Xuat sac</div>
        <div style={s.starRow}>{[1, 2, 3, 4, 5].map(i => (<span key={i} className="material-symbols-outlined filled" style={{ color: '#FFD54F', fontSize: '20px' }}>star</span>))}</div>
      </div>
      <h2 style={s.sectionTitle}>Cap do</h2>
      <div style={s.levelsRow}>{levels.map(level => (<div key={level.name} style={s.levelBadge(level)}><span style={s.levelEmoji}>{level.emoji}</span><span style={s.levelName}>{level.name}</span><span style={s.levelRange}>{level.min}-{level.max}</span></div>))}</div>
      <div style={s.scoringSection}><h2 style={s.sectionTitle}>Cach tinh diem</h2>{scoringRules.map((rule, i) => (<div key={i} style={s.scoringRow}><div style={s.scoringIcon(rule.color)}><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{rule.icon}</span></div><span style={s.scoringActivity}>{rule.activity}</span><span style={s.pointsBadge(rule.points.startsWith('+'))}>{rule.points}</span></div>))}</div>
      <div style={s.historySection}><h2 style={s.sectionTitle}>Lich su diem</h2>{history.map((item, i) => { const positive = item.change.startsWith('+'); return (<div key={i} style={s.historyItem}><div style={s.historyDot(positive)} /><div style={s.historyInfo}><div style={s.historyReason}>{item.reason}</div><div style={s.historyDate}>{item.date}</div></div><span style={s.historyChange(positive)}>{item.change}</span><span style={s.historyTotal}>{item.total}</span></div>); })}</div>
      <div style={s.perksSection}><h2 style={s.sectionTitle}>Dac quyen cua ban</h2>{perks.map((perk, i) => (<div key={i} style={s.perkCard}><div style={s.perkIconWrap}><span className="material-symbols-outlined">{perk.icon}</span></div><div><div style={s.perkTitle}>{perk.title}</div><div style={s.perkDesc}>{perk.desc}</div></div></div>))}</div>
    </div>
  );
};

export default KarmaPage;
