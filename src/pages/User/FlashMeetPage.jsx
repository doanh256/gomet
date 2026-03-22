import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const recentSparks = [
  { id: 1, name: 'Linh', verified: true, time: '2 phut truoc', gradient: 'linear-gradient(180deg, #ff6b6b 0%, #ae2f34 100%)' },
  { id: 2, name: 'Minh', verified: true, time: '5 phut truoc', gradient: 'linear-gradient(180deg, #894e45 0%, #cf8a7f 100%)' },
  { id: 3, name: 'Trang', verified: false, time: '12 phut truoc', gradient: 'linear-gradient(180deg, #ae2f34 0%, #ff6b6b 100%)' },
  { id: 4, name: 'Duc', verified: true, time: '18 phut truoc', gradient: 'linear-gradient(180deg, #cf8a7f 0%, #894e45 100%)' },
];

const steps = [
  { num: 1, icon: 'queue', label: 'Vao hang doi' },
  { num: 2, icon: 'videocam', label: '5 phut hen ho' },
  { num: 3, icon: 'handshake', label: 'Quyet dinh ket noi' },
];

const FlashMeetPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(292);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 292));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const digits = [mins[0], mins[1], secs[0], secs[1]];

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 28,
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    headerIcon: {
      fontSize: 36,
      color: 'var(--primary)',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    liveBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'var(--error-container)',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      color: 'var(--error)',
    },
    liveDot: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'var(--error)',
      animation: 'pulse 1.5s ease-in-out infinite',
    },
    timerSection: {
      textAlign: 'center',
      marginBottom: 28,
    },
    timerLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 12,
    },
    timerRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    digitCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      width: 64,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 60,
      fontWeight: 800,
      color: 'var(--on-surface)',
      boxShadow: 'var(--card-shadow)',
    },
    colon: {
      fontFamily: 'var(--font-headline)',
      fontSize: 48,
      fontWeight: 800,
      color: 'var(--primary)',
    },
    statsRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 24,
    },
    statChip: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      padding: '12px 16px',
    },
    statIcon: {
      fontSize: 20,
      color: 'var(--primary)',
    },
    statText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      fontWeight: 500,
    },
    joinBtn: {
      width: '100%',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '18px 24px',
      fontSize: 18,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      boxShadow: 'var(--editorial-shadow)',
      marginBottom: 16,
    },
    privacy: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
      marginBottom: 36,
    },
    privacyIcon: {
      fontSize: 16,
      color: 'var(--on-surface-variant)',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    stepsRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 36,
    },
    stepCard: {
      flex: 1,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px 12px',
      textAlign: 'center',
      boxShadow: 'var(--card-shadow)',
    },
    stepNum: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      marginBottom: 10,
    },
    stepIcon: {
      fontSize: 28,
      color: 'var(--primary)',
      display: 'block',
      marginBottom: 8,
    },
    stepLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    themeCard: {
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      marginBottom: 36,
      color: 'var(--on-primary)',
      position: 'relative',
      overflow: 'hidden',
    },
    themeLabel: {
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      textTransform: 'uppercase',
      letterSpacing: 1,
      opacity: 0.85,
      marginBottom: 6,
    },
    themeName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      marginBottom: 4,
    },
    themeDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      opacity: 0.9,
      marginBottom: 16,
    },
    avatarStack: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.3)',
      border: '2px solid var(--on-primary)',
      marginLeft: -8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontWeight: 700,
    },
    avatarMore: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.25)',
      border: '2px solid var(--on-primary)',
      marginLeft: -8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
    },
    sparksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10,
      marginBottom: 24,
    },
    sparkCard: {
      borderRadius: 'var(--radius)',
      aspectRatio: '3/4',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    },
    sparkOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 8px 10px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
      color: '#fff',
    },
    sparkName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    sparkVerified: {
      fontSize: 14,
      color: '#4fc3f7',
    },
    sparkTime: {
      fontSize: 10,
      opacity: 0.8,
      marginTop: 2,
    },
  };

  return (
    <div style={s.page}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>

      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <span className="material-symbols-outlined" style={s.headerIcon}>bolt</span>
          <h1 style={s.heading}>Flash Meet</h1>
        </div>
        <div style={s.liveBadge}>
          <div style={s.liveDot} />
          LIVE NOW
        </div>
      </div>

      {/* Countdown Timer */}
      <div style={s.timerSection}>
        <div style={s.timerLabel}>Vong tiep theo bat dau sau</div>
        <div style={s.timerRow}>
          <div style={s.digitCard}>{digits[0]}</div>
          <div style={s.digitCard}>{digits[1]}</div>
          <div style={s.colon}>:</div>
          <div style={s.digitCard}>{digits[2]}</div>
          <div style={s.digitCard}>{digits[3]}</div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={s.statsRow}>
        <div style={s.statChip}>
          <span className="material-symbols-outlined" style={s.statIcon}>group</span>
          <span style={s.statText}>1,248 Trong hang doi</span>
        </div>
        <div style={s.statChip}>
          <span className="material-symbols-outlined" style={s.statIcon}>timer</span>
          <span style={s.statText}>5 phut / vong</span>
        </div>
      </div>

      {/* Join Button */}
      <button style={s.joinBtn}>
        <span className="material-symbols-outlined">bolt</span>
        Tham gia Flash Meet
      </button>

      {/* Privacy Note */}
      <div style={s.privacy}>
        <span className="material-symbols-outlined" style={s.privacyIcon}>lock</span>
        Video & chat duoc ma hoa. Danh tinh an toan.
      </div>

      {/* How It Works */}
      <div style={s.sectionTitle}>Cach thuc hoat dong</div>
      <div style={s.stepsRow}>
        {steps.map(step => (
          <div key={step.num} style={s.stepCard}>
            <div style={s.stepNum}>{step.num}</div>
            <span className="material-symbols-outlined" style={s.stepIcon}>{step.icon}</span>
            <div style={s.stepLabel}>{step.label}</div>
          </div>
        ))}
      </div>

      {/* Chef's Special Theme Card */}
      <div style={s.sectionTitle}>Chef's Special</div>
      <div style={s.themeCard}>
        <div style={s.themeLabel}>Chu de toi nay</div>
        <div style={s.themeName}>Date Night: Italian Cuisine</div>
        <div style={s.themeDetail}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>restaurant</span>
          Nha hang La Pasta, Quan 1
        </div>
        <div style={s.avatarStack}>
          {['L', 'M', 'T', 'D', 'H'].map((letter, i) => (
            <div key={i} style={{ ...s.avatar, marginLeft: i === 0 ? 0 : -8 }}>{letter}</div>
          ))}
          <div style={s.avatarMore}>+42</div>
        </div>
      </div>

      {/* Recent Sparks */}
      <div style={s.sectionTitle}>Sparks gan day</div>
      <div style={s.sparksGrid}>
        {recentSparks.map(spark => (
          <div key={spark.id} style={{ ...s.sparkCard, background: spark.gradient }}>
            <div style={s.sparkOverlay}>
              <div style={s.sparkName}>
                {spark.name}
                {spark.verified && (
                  <span className="material-symbols-outlined filled" style={s.sparkVerified}>verified</span>
                )}
              </div>
              <div style={s.sparkTime}>{spark.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashMeetPage;
