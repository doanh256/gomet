import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlphaTestPage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isBug, setIsBug] = useState(false);

  const features = [
    {
      id: 'ai-match',
      name: 'AI Goi y thong minh',
      desc: 'Thuat toan AI moi giup goi y nguoi phu hop hon dua tren hanh vi',
      version: 'v0.3',
      status: 'testing',
      feedbackCount: 12,
      tested: false,
    },
    {
      id: 'voice-date',
      name: 'Hen ho bang giong noi',
      desc: 'Goi dien thoai ngau nhien voi nguoi match de lam quen',
      version: 'v0.2',
      status: 'testing',
      feedbackCount: 8,
      tested: true,
    },
    {
      id: 'ar-venue',
      name: 'AR Xem truoc dia diem',
      desc: 'Dung AR de xem truoc nha hang va quan cafe truoc khi den',
      version: 'v0.1',
      status: 'completed',
      feedbackCount: 23,
      tested: true,
    },
  ];

  const pastFeedback = [
    { date: '19/03/2026', feature: 'Hen ho bang giong noi', status: 'Da doc' },
    { date: '15/03/2026', feature: 'AI Goi y thong minh', status: 'Dang xu ly' },
    { date: '10/03/2026', feature: 'AR Xem truoc dia diem', status: 'Da sua' },
  ];

  const statusStyles = {
    'Da doc': { bg: 'var(--surface-container-high)', color: 'var(--on-surface-variant)' },
    'Dang xu ly': { bg: '#fff3e0', color: '#e65100' },
    'Da sua': { bg: '#e8f5e9', color: '#2e7d32' },
  };

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 32px 80px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '8px',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--on-surface)',
      display: 'flex',
      alignItems: 'center',
    },
    pageTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    scienceIcon: {
      color: 'var(--primary)',
      fontSize: '28px',
    },
    subtitleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '32px',
      paddingLeft: '44px',
    },
    subtitle: {
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
    },
    alphaBadge: {
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontSize: '11px',
      fontWeight: 800,
      fontFamily: 'var(--font-headline)',
      letterSpacing: '1px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: '16px',
    },
    featureCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      marginBottom: '12px',
      boxShadow: 'var(--card-shadow)',
      border: '1px solid var(--outline-variant)',
    },
    featureHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px',
    },
    featureName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    versionBadge: {
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      fontSize: '11px',
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
    },
    featureDesc: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      marginBottom: '12px',
      lineHeight: '1.5',
    },
    featureFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusBadge: (status) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: '12px',
      fontWeight: 600,
      backgroundColor: status === 'testing' ? '#fff3e0' : '#e8f5e9',
      color: status === 'testing' ? '#e65100' : '#2e7d32',
    }),
    statusDot: (status) => ({
      width: '8px',
      height: '8px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: status === 'testing' ? '#ff9800' : '#4caf50',
      animation: status === 'testing' ? 'pulse 2s infinite' : 'none',
    }),
    feedbackCount: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
    },
    tryBtn: {
      padding: '10px 24px',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius)',
      fontSize: '13px',
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: 'var(--font-headline)',
    },
    triedBtn: {
      padding: '10px 24px',
      backgroundColor: 'var(--surface-container-high)',
      color: 'var(--on-surface-variant)',
      border: 'none',
      borderRadius: 'var(--radius)',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'default',
    },
    feedbackSection: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: 'var(--card-shadow)',
    },
    selectWrap: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--outline-variant)',
      backgroundColor: 'var(--surface)',
      fontSize: '14px',
      color: 'var(--on-surface)',
      marginBottom: '16px',
      fontFamily: 'var(--font-body)',
      appearance: 'none',
      cursor: 'pointer',
    },
    starsRow: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
    },
    starBtn: (filled) => ({
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: filled ? '#ffd700' : 'var(--outline-variant)',
      fontSize: '32px',
      transition: 'color 0.2s',
    }),
    textarea: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--outline-variant)',
      backgroundColor: 'var(--surface)',
      fontSize: '14px',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      resize: 'vertical',
      minHeight: '100px',
      marginBottom: '16px',
    },
    bugToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    },
    toggleTrack: (on) => ({
      width: '44px',
      height: '24px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: on ? 'var(--error)' : 'var(--outline-variant)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }),
    toggleThumb: (on) => ({
      width: '20px',
      height: '20px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'white',
      position: 'absolute',
      top: '2px',
      left: on ? '22px' : '2px',
      transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }),
    bugLabel: {
      fontSize: '14px',
      color: 'var(--on-surface)',
      fontWeight: 500,
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius)',
      fontSize: '15px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
    },
    pastFeedbackItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid var(--outline-variant)',
    },
    pastInfo: {
      flex: 1,
    },
    pastFeature: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    pastDate: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginTop: '2px',
    },
    pastStatus: (status) => ({
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: '12px',
      fontWeight: 600,
      backgroundColor: statusStyles[status]?.bg || 'var(--surface-container-high)',
      color: statusStyles[status]?.color || 'var(--on-surface-variant)',
    }),
    rewardCard: {
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      color: 'var(--on-primary)',
      marginTop: '32px',
      boxShadow: 'var(--editorial-shadow)',
    },
    rewardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 700,
      marginBottom: '8px',
    },
    rewardScore: {
      fontFamily: 'var(--font-headline)',
      fontSize: '36px',
      fontWeight: 800,
      marginBottom: '8px',
    },
    rewardText: {
      fontSize: '13px',
      opacity: 0.9,
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 style={s.pageTitle}>GOMET Alpha</h1>
        <span className="material-symbols-outlined" style={s.scienceIcon}>science</span>
      </div>
      <div style={s.subtitleRow}>
        <span style={s.subtitle}>Trai nghiem tinh nang moi truoc tat ca</span>
        <span style={s.alphaBadge}>ALPHA</span>
      </div>

      {/* Features */}
      <h2 style={s.sectionTitle}>Tinh nang dang thu nghiem</h2>
      {features.map(f => (
        <div key={f.id} style={s.featureCard}>
          <div style={s.featureHeader}>
            <span style={s.featureName}>{f.name}</span>
            <span style={s.versionBadge}>{f.version}</span>
          </div>
          <p style={s.featureDesc}>{f.desc}</p>
          <div style={s.featureFooter}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={s.statusBadge(f.status)}>
                <div style={s.statusDot(f.status)} />
                {f.status === 'testing' ? 'Dang test' : 'Hoan thanh'}
              </div>
              <span style={s.feedbackCount}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat_bubble</span>
                {f.feedbackCount} phan hoi
              </span>
            </div>
            {f.tested ? (
              <button style={s.triedBtn} disabled>Da thu</button>
            ) : (
              <button style={s.tryBtn}>Thu ngay</button>
            )}
          </div>
        </div>
      ))}

      {/* Send Feedback */}
      <h2 style={{ ...s.sectionTitle, marginTop: '32px' }}>Gui phan hoi</h2>
      <div style={s.feedbackSection}>
        <select
          style={s.selectWrap}
          value={selectedFeature}
          onChange={e => setSelectedFeature(e.target.value)}
        >
          <option value="">Chon tinh nang...</option>
          {features.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        <div style={s.starsRow}>
          {[1, 2, 3, 4, 5].map(i => (
            <button key={i} style={s.starBtn(i <= feedbackRating)} onClick={() => setFeedbackRating(i)}>
              <span className="material-symbols-outlined filled">star</span>
            </button>
          ))}
        </div>

        <textarea
          style={s.textarea}
          placeholder="Mo ta trai nghiem..."
          value={feedbackText}
          onChange={e => setFeedbackText(e.target.value)}
        />

        <div style={s.bugToggle}>
          <div style={s.toggleTrack(isBug)} onClick={() => setIsBug(!isBug)}>
            <div style={s.toggleThumb(isBug)} />
          </div>
          <span style={s.bugLabel}>Day la loi?</span>
          {isBug && (
            <span className="material-symbols-outlined" style={{ color: 'var(--error)', fontSize: '20px' }}>bug_report</span>
          )}
        </div>

        <button style={s.submitBtn}>Gui phan hoi</button>
      </div>

      {/* Past Feedback */}
      <h2 style={s.sectionTitle}>Phan hoi cua ban</h2>
      {pastFeedback.map((fb, i) => (
        <div key={i} style={s.pastFeedbackItem}>
          <div style={s.pastInfo}>
            <div style={s.pastFeature}>{fb.feature}</div>
            <div style={s.pastDate}>{fb.date}</div>
          </div>
          <span style={s.pastStatus(fb.status)}>{fb.status}</span>
        </div>
      ))}

      {/* Alpha Points Reward */}
      <div style={s.rewardCard}>
        <div style={s.rewardTitle}>Diem Alpha</div>
        <div style={s.rewardScore}>350</div>
        <div style={s.rewardText}>Ban da kiem 350 diem Alpha. Doi diem de nhan qua tang doc quyen!</div>
      </div>
    </div>
  );
};

export default AlphaTestPage;
