import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `GOMET-${code}`;
};

const invitedFriends = [
  { name: 'Nguyen Van A', status: 'joined', date: '15/03/2026' },
  { name: 'Tran Thi B', status: 'joined', date: '12/03/2026' },
  { name: 'Le Van C', status: 'pending', date: '18/03/2026' },
  { name: 'Pham Thi D', status: 'joined', date: '10/03/2026' },
  { name: 'Hoang Van E', status: 'pending', date: '20/03/2026' },
];

const ReferralPage = () => {
  const navigate = useNavigate();
  const [code] = useState(generateCode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const joinedCount = invitedFriends.filter((f) => f.status === 'joined').length;

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    hero: {
      textAlign: 'center',
      marginBottom: 32,
    },
    heroIcon: {
      fontSize: 48,
      color: 'var(--primary)',
      marginBottom: 12,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 8,
    },
    heroSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    codeCard: {
      backgroundColor: 'var(--inverse-surface)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 24px',
      textAlign: 'center',
      marginBottom: 32,
    },
    codeLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--inverse-on-surface)',
      opacity: 0.7,
      marginBottom: 12,
    },
    codeText: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 800,
      color: 'var(--inverse-on-surface)',
      letterSpacing: 3,
      marginBottom: 16,
    },
    copyBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 24px',
      backgroundColor: copied ? '#4ecdc4' : 'rgba(255,255,255,0.15)',
      color: 'var(--inverse-on-surface)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 20,
    },
    stepsRow: {
      display: 'flex',
      gap: 16,
      marginBottom: 36,
    },
    stepCard: {
      flex: 1,
      textAlign: 'center',
      padding: '20px 12px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--card-shadow)',
    },
    stepIconCircle: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--primary-fixed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 12px',
    },
    stepIcon: {
      fontSize: 22,
      color: 'var(--on-primary-container)',
    },
    stepNum: {
      fontFamily: 'var(--font-headline)',
      fontSize: 11,
      fontWeight: 800,
      color: 'var(--primary)',
      marginBottom: 6,
    },
    stepLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--on-surface)',
    },
    rewardsRow: {
      display: 'flex',
      gap: 16,
      marginBottom: 36,
    },
    rewardCard: (accent) => ({
      flex: 1,
      padding: 20,
      backgroundColor: accent ? 'var(--primary-fixed)' : 'var(--tertiary-container)',
      borderRadius: 'var(--radius-lg)',
      textAlign: 'center',
    }),
    rewardLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--on-primary-container)',
      marginBottom: 8,
    },
    rewardAmount: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--on-primary-container)',
    },
    rewardUnit: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-primary-container)',
      marginTop: 4,
    },
    shareRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 36,
    },
    shareBtn: (bg) => ({
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-full)',
      backgroundColor: bg,
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#ffffff',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
    }),
    statsRow: {
      display: 'flex',
      gap: 16,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      textAlign: 'center',
      padding: '16px 12px',
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius)',
    },
    statNum: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--primary)',
    },
    statLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginTop: 4,
    },
    friendList: {
      marginBottom: 24,
    },
    friendItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid var(--outline-variant)',
    },
    friendLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    friendAvatar: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface-variant)',
    },
    friendName: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--on-surface)',
    },
    friendDate: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
    },
    badge: (isJoined) => ({
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      backgroundColor: isJoined ? '#e8f5e9' : 'var(--error-container)',
      color: isJoined ? '#2e7d32' : 'var(--error)',
    }),
  };

  const steps = [
    { icon: 'share', num: 'Buoc 1', label: 'Chia se ma' },
    { icon: 'person_add', num: 'Buoc 2', label: 'Ban dang ky' },
    { icon: 'redeem', num: 'Buoc 3', label: 'Nhan thuong' },
  ];

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <span className="material-symbols-outlined" style={s.heroIcon}>redeem</span>
        <h1 style={s.heading}>Moi ban be, nhan thuong</h1>
        <p style={s.heroSub}>Chia se GOMET voi ban be va cung nhan uu dai hap dan</p>
      </div>

      <div style={s.codeCard}>
        <div style={s.codeLabel}>Ma gioi thieu cua ban</div>
        <div style={s.codeText}>{code}</div>
        <button style={s.copyBtn} onClick={handleCopy}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? 'Da sao chep!' : 'Sao chep ma'}
        </button>
      </div>

      <div style={s.sectionTitle}>Cach thuc hoat dong</div>
      <div style={s.stepsRow}>
        {steps.map((step, i) => (
          <div key={i} style={s.stepCard}>
            <div style={s.stepIconCircle}>
              <span className="material-symbols-outlined" style={s.stepIcon}>{step.icon}</span>
            </div>
            <div style={s.stepNum}>{step.num}</div>
            <div style={s.stepLabel}>{step.label}</div>
          </div>
        ))}
      </div>

      <div style={s.sectionTitle}>Phan thuong</div>
      <div style={s.rewardsRow}>
        <div style={s.rewardCard(true)}>
          <div style={s.rewardLabel}>Ban nhan duoc</div>
          <div style={s.rewardAmount}>50k</div>
          <div style={s.rewardUnit}>credits</div>
        </div>
        <div style={s.rewardCard(false)}>
          <div style={s.rewardLabel}>Ban be nhan duoc</div>
          <div style={s.rewardAmount}>30k</div>
          <div style={s.rewardUnit}>credits</div>
        </div>
      </div>

      <div style={{ ...s.sectionTitle, textAlign: 'center' }}>Chia se qua</div>
      <div style={s.shareRow}>
        <button style={s.shareBtn('#1877f2')} title="Facebook">f</button>
        <button style={s.shareBtn('#0068ff')} title="Zalo">Z</button>
        <button style={s.shareBtn('#8c706f')} title="Copy link" onClick={handleCopy}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff' }}>link</span>
        </button>
      </div>

      <div style={s.sectionTitle}>Ban da moi</div>
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div style={s.statNum}>{invitedFriends.length}</div>
          <div style={s.statLabel}>ban da moi</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statNum}>250k</div>
          <div style={s.statLabel}>da nhan</div>
        </div>
      </div>

      <div style={s.friendList}>
        {invitedFriends.map((friend, i) => (
          <div key={i} style={s.friendItem}>
            <div style={s.friendLeft}>
              <div style={s.friendAvatar}>{friend.name.charAt(0)}</div>
              <div>
                <div style={s.friendName}>{friend.name}</div>
                <div style={s.friendDate}>{friend.date}</div>
              </div>
            </div>
            <span style={s.badge(friend.status === 'joined')}>
              {friend.status === 'joined' ? 'Da tham gia' : 'Cho xac nhan'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralPage;
