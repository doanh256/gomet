import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `GOMET-${code}`;
};

const invitedFriends = [
  { name: 'Nguyễn Văn A', status: 'joined', date: '15/03/2026' },
  { name: 'Trần Thị B', status: 'joined', date: '12/03/2026' },
  { name: 'Lê Văn C', status: 'pending', date: '18/03/2026' },
  { name: 'Phạm Thị D', status: 'joined', date: '10/03/2026' },
  { name: 'Hoàng Văn E', status: 'pending', date: '20/03/2026' },
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
      backgroundColor: '#131313',
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
      color: '#FFB59E',
      marginBottom: 12,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 8,
    },
    heroSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    codeCard: {
      backgroundColor: '#2A2A2A',
      borderRadius: '1.5rem',
      padding: '28px 24px',
      textAlign: 'center',
      marginBottom: 32,
    },
    codeLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
      opacity: 0.7,
      marginBottom: 12,
    },
    codeText: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 800,
      color: '#FDF9F3',
      letterSpacing: 3,
      marginBottom: 16,
    },
    copyBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 24px',
      backgroundColor: copied ? '#117500' : 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: '#FDF9F3',
      border: 'none',
      borderRadius: '9999px',
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
      color: '#FDF9F3',
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
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    stepIconCircle: {
      width: 44,
      height: 44,
      borderRadius: '9999px',
      backgroundColor: '#2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 12px',
    },
    stepIcon: {
      fontSize: 22,
      color: '#FFB59E',
    },
    stepNum: {
      fontFamily: 'var(--font-headline)',
      fontSize: 11,
      fontWeight: 800,
      color: '#FFB59E',
      marginBottom: 6,
    },
    stepLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 500,
      color: '#FDF9F3',
    },
    rewardsRow: {
      display: 'flex',
      gap: 16,
      marginBottom: 36,
    },
    rewardCard: (accent) => ({
      flex: 1,
      padding: 20,
      backgroundColor: accent ? 'rgba(255,181,158,0.15)' : '#2A2A2A',
      borderRadius: '1.5rem',
      textAlign: 'center',
    }),
    rewardLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 500,
      color: '#E6BEB2',
      marginBottom: 8,
    },
    rewardAmount: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: '#FFB59E',
    },
    rewardUnit: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
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
      borderRadius: '9999px',
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
      backgroundColor: '#2A2A2A',
      borderRadius: '1.5rem',
    },
    statNum: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: '#FFB59E',
    },
    statLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
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
    },
    friendLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    friendAvatar: {
      width: 36,
      height: 36,
      borderRadius: '9999px',
      backgroundColor: '#2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#E6BEB2',
    },
    friendName: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      color: '#FDF9F3',
    },
    friendDate: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: '#E6BEB2',
    },
    badge: (isJoined) => ({
      padding: '4px 12px',
      borderRadius: '9999px',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      backgroundColor: isJoined ? 'rgba(17,117,0,0.2)' : 'rgba(255,87,26,0.15)',
      color: isJoined ? '#117500' : '#FF571A',
    }),
  };

  const steps = [
    { icon: 'share', num: 'Bước 1', label: 'Chia sẻ mã' },
    { icon: 'person_add', num: 'Bước 2', label: 'Bạn đăng ký' },
    { icon: 'redeem', num: 'Bước 3', label: 'Nhận thưởng' },
  ];

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.heroIcon}>redeem</span>
        <h1 style={s.heading}>Mời bạn bè, nhận thưởng</h1>
        <p style={s.heroSub}>Chia sẻ GOMET với bạn bè và cùng nhận ưu đãi hấp dẫn</p>
      </div>

      <div style={s.codeCard}>
        <div style={s.codeLabel}>Mã giới thiệu của bạn</div>
        <div style={s.codeText}>{code}</div>
        <button style={s.copyBtn} onClick={handleCopy}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? 'Đã sao chép!' : 'Sao chép mã'}
        </button>
      </div>

      <div style={s.sectionTitle}>Cách thức hoạt động</div>
      <div style={s.stepsRow}>
        {steps.map((step, i) => (
          <div key={i} style={s.stepCard}>
            <div style={s.stepIconCircle}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.stepIcon}>{step.icon}</span>
            </div>
            <div style={s.stepNum}>{step.num}</div>
            <div style={s.stepLabel}>{step.label}</div>
          </div>
        ))}
      </div>

      <div style={s.sectionTitle}>Phần thưởng</div>
      <div style={s.rewardsRow}>
        <div style={s.rewardCard(true)}>
          <div style={s.rewardLabel}>Bạn nhận được</div>
          <div style={s.rewardAmount}>50k</div>
          <div style={s.rewardUnit}>credits</div>
        </div>
        <div style={s.rewardCard(false)}>
          <div style={s.rewardLabel}>Bạn bè nhận được</div>
          <div style={s.rewardAmount}>30k</div>
          <div style={s.rewardUnit}>credits</div>
        </div>
      </div>

      <div style={{ ...s.sectionTitle, textAlign: 'center' }}>Chia sẻ qua</div>
      <div style={s.shareRow}>
        <button style={s.shareBtn('#1877f2')} title="Facebook">f</button>
        <button style={s.shareBtn('#0068ff')} title="Zalo">Z</button>
        <button style={s.shareBtn('#FF571A')} title="Copy link" onClick={handleCopy}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff' }}>link</span>
        </button>
      </div>

      <div style={s.sectionTitle}>Bạn đã mời</div>
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div style={s.statNum}>{invitedFriends.length}</div>
          <div style={s.statLabel}>bạn đã mời</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statNum}>250k</div>
          <div style={s.statLabel}>đã nhận</div>
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
              {friend.status === 'joined' ? 'Đã tham gia' : 'Chờ xác nhận'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralPage;
