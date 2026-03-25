import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlphaTestPage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isBug, setIsBug] = useState(false);

  const features = [
    { id: 'ai-match', name: 'AI Gợi ý thông minh', desc: 'Thuật toán AI mới giúp gợi ý người phù hợp hơn dựa trên hành vi', version: 'v0.3', status: 'testing', feedbackCount: 12, tested: false },
    { id: 'voice-date', name: 'Hẹn hò bằng giọng nói', desc: 'Gọi điện thoại ngẫu nhiên với người match để làm quen', version: 'v0.2', status: 'testing', feedbackCount: 8, tested: true },
    { id: 'ar-venue', name: 'AR Xem trước địa điểm', desc: 'Dùng AR để xem trước nhà hàng và quán cafe trước khi đến', version: 'v0.1', status: 'completed', feedbackCount: 23, tested: true },
  ];
  const pastFeedback = [
    { date: '19/03/2026', feature: 'Hẹn hò bằng giọng nói', status: 'Đã đọc' },
    { date: '15/03/2026', feature: 'AI Gợi ý thông minh', status: 'Đang xử lý' },
    { date: '10/03/2026', feature: 'AR Xem trước địa điểm', status: 'Đã sửa' },
  ];
  const statusStyles = { 'Đã đọc': { bg: '#2A2A2A', color: '#E6BEB2' }, 'Đang xử lý': { bg: '#FF571A30', color: '#FF571A' }, 'Đã sửa': { bg: '#11750030', color: '#117500' } };

  const s = {
    page: { flex: 1, backgroundColor: '#131313', overflowY: 'auto', padding: '40px 32px 80px' },
    header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#FDF9F3', display: 'flex', alignItems: 'center' },
    pageTitle: { fontFamily: 'var(--font-headline)', fontSize: '28px', fontWeight: 800, color: '#FDF9F3' },
    scienceIcon: { color: '#FFB59E', fontSize: '28px' },
    subtitleRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '44px' },
    subtitle: { fontSize: '14px', color: '#E6BEB2' },
    alphaBadge: { padding: '4px 12px', borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-headline)', letterSpacing: '1px' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, color: '#FDF9F3', marginBottom: '16px' },
    featureCard: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: '20px', marginBottom: '12px' },
    featureHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' },
    featureName: { fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 700, color: '#FDF9F3' },
    versionBadge: { padding: '2px 10px', borderRadius: '9999px', backgroundColor: '#2A2A2A', fontSize: '11px', fontWeight: 600, color: '#E6BEB2' },
    featureDesc: { fontSize: '13px', color: '#E6BEB2', marginBottom: '12px', lineHeight: '1.5' },
    featureFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    statusBadge: (status) => ({ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: status === 'testing' ? '#FF571A30' : '#11750030', color: status === 'testing' ? '#FF571A' : '#117500' }),
    statusDot: (status) => ({ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: status === 'testing' ? '#FF571A' : '#117500', animation: status === 'testing' ? 'pulse 2s infinite' : 'none' }),
    feedbackCount: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#E6BEB2' },
    tryBtn: { padding: '10px 24px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '1.5rem', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-headline)' },
    triedBtn: { padding: '10px 24px', backgroundColor: '#2A2A2A', color: '#E6BEB2', border: 'none', borderRadius: '1.5rem', fontSize: '13px', fontWeight: 600, cursor: 'default' },
    feedbackSection: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: '24px', marginBottom: '32px' },
    selectWrap: { width: '100%', padding: '12px 16px', borderRadius: '1.5rem', border: 'none', backgroundColor: '#2A2A2A', fontSize: '14px', color: '#FDF9F3', marginBottom: '16px', fontFamily: 'var(--font-body)', appearance: 'none', cursor: 'pointer' },
    starsRow: { display: 'flex', gap: '8px', marginBottom: '16px' },
    starBtn: (filled) => ({ background: 'none', border: 'none', cursor: 'pointer', color: filled ? '#FFD54F' : '#353535', fontSize: '32px', transition: 'color 0.2s' }),
    textarea: { width: '100%', padding: '14px 16px', borderRadius: '1.5rem', border: 'none', backgroundColor: '#2A2A2A', fontSize: '14px', color: '#FDF9F3', fontFamily: 'var(--font-body)', resize: 'vertical', minHeight: '100px', marginBottom: '16px' },
    bugToggle: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
    toggleTrack: (on) => ({ width: '44px', height: '24px', borderRadius: '9999px', backgroundColor: on ? '#FF571A' : '#353535', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }),
    toggleThumb: (on) => ({ width: '20px', height: '20px', borderRadius: '9999px', backgroundColor: '#131313', position: 'absolute', top: '2px', left: on ? '22px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }),
    bugLabel: { fontSize: '14px', color: '#FDF9F3', fontWeight: 500 },
    submitBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '1.5rem', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-headline)', cursor: 'pointer' },
    pastFeedbackItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #2A2A2A' },
    pastInfo: { flex: 1 },
    pastFeature: { fontSize: '14px', fontWeight: 600, color: '#FDF9F3' },
    pastDate: { fontSize: '12px', color: '#E6BEB2', marginTop: '2px' },
    pastStatus: (status) => ({ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: statusStyles[status]?.bg || '#2A2A2A', color: statusStyles[status]?.color || '#E6BEB2' }),
    rewardCard: { background: 'linear-gradient(135deg, #FFB59E, #FF571A)', borderRadius: '1.5rem', padding: '24px', color: '#3A0B00', marginTop: '32px' },
    rewardTitle: { fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, marginBottom: '8px' },
    rewardScore: { fontFamily: 'var(--font-headline)', fontSize: '36px', fontWeight: 800, marginBottom: '8px' },
    rewardText: { fontSize: '13px', opacity: 0.9 },
  };

  return (
    <div style={s.page}>
      <style>{`@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }`}</style>
      <div style={s.header}><button style={s.backBtn} onClick={() => navigate(-1)}><span aria-hidden="true" className="material-symbols-outlined">arrow_back</span></button><h1 style={s.pageTitle}>GOMET Alpha</h1><span aria-hidden="true" className="material-symbols-outlined" style={s.scienceIcon}>science</span></div>
      <div style={s.subtitleRow}><span style={s.subtitle}>Trải nghiệm tính năng mới trước tất cả</span><span style={s.alphaBadge}>ALPHA</span></div>
      <h2 style={s.sectionTitle}>Tính năng đang thử nghiệm</h2>
      {features.map(f => (<div key={f.id} style={s.featureCard}><div style={s.featureHeader}><span style={s.featureName}>{f.name}</span><span style={s.versionBadge}>{f.version}</span></div><p style={s.featureDesc}>{f.desc}</p><div style={s.featureFooter}><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={s.statusBadge(f.status)}><div style={s.statusDot(f.status)} />{f.status === 'testing' ? 'Đang test' : 'Hoàn thành'}</div><span style={s.feedbackCount}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat_bubble</span>{f.feedbackCount} phản hồi</span></div>{f.tested ? (<button style={s.triedBtn} disabled>Đã thử</button>) : (<button style={s.tryBtn}>Thử ngay</button>)}</div></div>))}
      <h2 style={{ ...s.sectionTitle, marginTop: '32px' }}>Gửi phản hồi</h2>
      <div style={s.feedbackSection}>
        <select style={s.selectWrap} value={selectedFeature} onChange={e => setSelectedFeature(e.target.value)}><option value="">Chọn tính năng...</option>{features.map(f => (<option key={f.id} value={f.id}>{f.name}</option>))}</select>
        <div style={s.starsRow}>{[1, 2, 3, 4, 5].map(i => (<button key={i} style={s.starBtn(i <= feedbackRating)} onClick={() => setFeedbackRating(i)}><span className="material-symbols-outlined filled">star</span></button>))}</div>
        <textarea style={s.textarea} placeholder="Mô tả trải nghiệm..." value={feedbackText} onChange={e => setFeedbackText(e.target.value)} />
        <div style={s.bugToggle}><div style={s.toggleTrack(isBug)} onClick={() => setIsBug(!isBug)}><div style={s.toggleThumb(isBug)} /></div><span style={s.bugLabel}>Đây là lỗi?</span>{isBug && (<span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#FF571A', fontSize: '20px' }}>bug_report</span>)}</div>
        <button style={s.submitBtn}>Gửi phản hồi</button>
      </div>
      <h2 style={s.sectionTitle}>Phản hồi của bạn</h2>
      {pastFeedback.map((fb, i) => (<div key={i} style={s.pastFeedbackItem}><div style={s.pastInfo}><div style={s.pastFeature}>{fb.feature}</div><div style={s.pastDate}>{fb.date}</div></div><span style={s.pastStatus(fb.status)}>{fb.status}</span></div>))}
      <div style={s.rewardCard}><div style={s.rewardTitle}>Điểm Alpha</div><div style={s.rewardScore}>350</div><div style={s.rewardText}>Bạn đã kiếm 350 điểm Alpha. Đổi điểm để nhận quà tặng độc quyền!</div></div>
    </div>
  );
};

export default AlphaTestPage;
