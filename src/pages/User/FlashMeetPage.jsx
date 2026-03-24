import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const recentSparks = [
  { id: 1, name: 'Linh', verified: true, time: '2 phut truoc', gradient: 'linear-gradient(180deg, #FF571A 0%, #3A0B00 100%)' },
  { id: 2, name: 'Minh', verified: true, time: '5 phut truoc', gradient: 'linear-gradient(180deg, #FFB59E 0%, #FF571A 100%)' },
  { id: 3, name: 'Trang', verified: false, time: '12 phut truoc', gradient: 'linear-gradient(180deg, #3A0B00 0%, #FF571A 100%)' },
  { id: 4, name: 'Duc', verified: true, time: '18 phut truoc', gradient: 'linear-gradient(180deg, #FF571A 0%, #FFB59E 100%)' },
];

const steps = [
  { num: 1, icon: 'queue', label: 'Vao hang doi' },
  { num: 2, icon: 'videocam', label: '5 phut hen do' },
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
      backgroundColor: '#131313',
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
      color: '#FFB59E',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
    },
    liveBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'rgba(255, 87, 26, 0.15)',
      padding: '6px 14px',
      borderRadius: 9999,
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      color: '#FF571A',
    },
    liveDot: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: '#FF571A',
      animation: 'pulse 1.5s ease-in-out infinite',
    },
    timerSection: {
      textAlign: 'center',
      marginBottom: 28,
    },
    timerLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
      marginBottom: 12,
    },
    timerRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    digitCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      width: 64,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 60,
      fontWeight: 800,
      color: '#FDF9F3',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    colon: {
      fontFamily: 'var(--font-headline)',
      fontSize: 48,
      fontWeight: 800,
      color: '#FFB59E',
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
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '12px 16px',
    },
    statIcon: {
      fontSize: 20,
      color: '#FFB59E',
    },
    statText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
      fontWeight: 500,
    },
    joinBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: 9999,
      padding: '18px 24px',
      fontSize: 18,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      marginBottom: 16,
    },
    privacy: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontSize: 12,
      color: '#E6BEB2',
      fontFamily: 'var(--font-body)',
      marginBottom: 36,
    },
    privacyIcon: {
      fontSize: 16,
      color: '#E6BEB2',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 16,
    },
    stepsRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 36,
    },
    stepCard: {
      flex: 1,
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '20px 12px',
      textAlign: 'center',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    stepNum: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
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
      color: '#FFB59E',
      display: 'block',
      marginBottom: 8,
    },
    stepLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    themeCard: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '1.5rem',
      padding: 24,
      marginBottom: 36,
      color: '#3A0B00',
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
      backgroundColor: 'rgba(58, 11, 0, 0.3)',
      border: '2px solid #3A0B00',
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
      backgroundColor: 'rgba(58, 11, 0, 0.25)',
      border: '2px solid #3A0B00',
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
      borderRadius: '1.5rem',
      aspectRatio: '3/4',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    sparkOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 8px 10px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
      color: '#FDF9F3',
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
      color: '#FFB59E',
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
