import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const matchData = {
  user: { name: 'Bạn', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  match: { name: 'Minh Anh', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face' },
  totalScore: 87,
  categories: [
    { label: 'Khẩu vị ẩm thực', score: 92, icon: 'restaurant' },
    { label: 'Phong cách ăn', score: 85, icon: 'dining' },
    { label: 'Độ cay', score: 78, icon: 'local_fire_department' },
    { label: 'Vùng miền', score: 90, icon: 'map' },
    { label: 'Sở thích chung', score: 80, icon: 'favorite' },
  ],
};

const venue = {
  name: 'The Lissome Cafe & Bistro',
  cuisine: 'Fusion Việt - Ý',
  address: 'Q1, Hồ Chí Minh',
  img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop',
};

const tips = [
  { text: 'Cùng thử một nhà hàng mới để tăng chemistry ẩm thực.', icon: 'lightbulb' },
  { text: 'Chia sẻ công thức nấu ăn yêu thích của bạn.', icon: 'lightbulb' },
  { text: 'Đặt lịch ăn thử món mới mỗi tuần cùng nhau.', icon: 'lightbulb' },
];

const getLabel = (score) => {
  if (score >= 90) return 'Tuyệt vời!';
  if (score >= 70) return 'Tương thích cao!';
  if (score >= 50) return 'Tiềm năng';
  return 'Cần khám phá thêm';
};

const getLabelColor = (score) => {
  if (score >= 90) return '#FFD54F';
  if (score >= 70) return '#FFB59E';
  if (score >= 50) return '#E6BEB2';
  return '#8c706f';
};

const ChemistryScorePage = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedCats, setAnimatedCats] = useState(matchData.categories.map(() => 0));

  useEffect(() => {
    const target = matchData.totalScore;
    const dur = 1500;
    const start = Date.now();
    const anim = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setAnimatedScore(Math.round(eased * target));
      setAnimatedCats(matchData.categories.map(c => Math.round(eased * c.score)));
      if (pct < 1) requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  }, []);

  const circumference = 2 * Math.PI * 76;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

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
      marginBottom: 32,
    },
    highlight: { color: 'var(--primary)' },
    avatarSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 32,
    },
    avatarWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: '50%',
      objectFit: 'cover',
    },
    avatarName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    heartIcon: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(255,87,26,0.3)',
    },
    ringWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 8,
    },
    ringContainer: {
      position: 'relative',
      width: 180,
      height: 180,
    },
    ringCenter: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
    ringScore: {
      fontFamily: 'var(--font-headline)',
      fontSize: 44,
      fontWeight: 900,
      fontStyle: 'italic',
      color: 'var(--on-surface)',
      lineHeight: 1,
    },
    ringPercent: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--primary)',
    },
    compatLabel: (score) => ({
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: getLabelColor(score),
      marginBottom: 32,
      textAlign: 'center',
    }),
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
    catList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginBottom: 36,
    },
    catRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    catIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    catInfo: {
      flex: 1,
    },
    catLabel: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    catBarTrack: {
      height: 6,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    catBarFill: (pct) => ({
      height: '100%',
      width: `${pct}%`,
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-full)',
      transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)',
    }),
    catScore: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--primary)',
      minWidth: 40,
      textAlign: 'right',
    },
    venueCard: {
      backgroundColor: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 36,
      boxShadow: 'var(--editorial-shadow)',
    },
    venueImg: {
      width: '100%',
      height: 160,
      objectFit: 'cover',
      display: 'block',
    },
    venueBody: {
      padding: '16px 20px',
    },
    venuePill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'var(--primary-container)',
      color: 'var(--on-primary)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: 10,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      marginBottom: 8,
    },
    venueName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    venueCuisine: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 14,
    },
    bookBtn: {
      background: 'var(--primary-gradient)',
      border: 'none',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      padding: '10px 24px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
    },
    tipsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      marginBottom: 36,
    },
    tipCard: {
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 14px',
      textAlign: 'center',
    },
    tipIconWrap: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'rgba(255,213,79,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 10px',
    },
    tipText: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
    },
    actions: {
      display: 'flex',
      gap: 12,
    },
    primaryBtn: {
      flex: 1,
      background: 'var(--primary-gradient)',
      border: 'none',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      padding: '14px 20px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    secondaryBtn: {
      flex: 1,
      backgroundColor: 'var(--surface-container-high)',
      border: 'none',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      padding: '14px 20px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
        Quay lại
      </button>

      <div style={s.headerPill}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>science</span>
        CHEMISTRY SCORE
      </div>

      <h1 style={s.heading}>
        Chemistry <span style={s.highlight}>Score</span>
      </h1>

      {/* Avatars */}
      <div style={s.avatarSection}>
        <div style={s.avatarWrap}>
          <img src={matchData.user.avatar} alt={matchData.user.name} style={s.avatar} />
          <span style={s.avatarName}>{matchData.user.name}</span>
        </div>
        <div style={s.heartIcon}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff' }}>favorite</span>
        </div>
        <div style={s.avatarWrap}>
          <img src={matchData.match.avatar} alt={matchData.match.name} style={s.avatar} />
          <span style={s.avatarName}>{matchData.match.name}</span>
        </div>
      </div>

      {/* Score Ring */}
      <div style={s.ringWrap}>
        <div style={s.ringContainer}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB59E" />
                <stop offset="100%" stopColor="#FF571A" />
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r="76" fill="none" stroke="var(--surface-container-high)" strokeWidth="8" />
            <circle
              cx="90" cy="90" r="76"
              fill="none"
              stroke="url(#scoreGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)' }}
            />
          </svg>
          <div style={s.ringCenter}>
            <div style={s.ringScore}>{animatedScore}</div>
            <div style={s.ringPercent}>%</div>
          </div>
        </div>
      </div>
      <div style={s.compatLabel(matchData.totalScore)}>{getLabel(matchData.totalScore)}</div>

      {/* Breakdown */}
      <div style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--primary)' }}>analytics</span>
        Chi tiết tương thích
      </div>
      <div style={s.catList}>
        {matchData.categories.map((cat, i) => (
          <div key={cat.label} style={s.catRow}>
            <div style={s.catIconWrap}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--primary)' }}>{cat.icon}</span>
            </div>
            <div style={s.catInfo}>
              <div style={s.catLabel}>{cat.label}</div>
              <div style={s.catBarTrack}>
                <div style={s.catBarFill(animatedCats[i])} />
              </div>
            </div>
            <span style={s.catScore}>{animatedCats[i]}%</span>
          </div>
        ))}
      </div>

      {/* Venue suggestion */}
      <div style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--primary)' }}>place</span>
        Địa điểm gợi ý
      </div>
      <div style={s.venueCard}>
        <img src={venue.img} alt={venue.name} style={s.venueImg} />
        <div style={s.venueBody}>
          <div style={s.venuePill}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 12 }}>auto_awesome</span>
            PHÙ HỢP VỚI CẢ HAI
          </div>
          <div style={s.venueName}>{venue.name}</div>
          <div style={s.venueCuisine}>{venue.cuisine} · {venue.address}</div>
          <button style={s.bookBtn} onClick={() => navigate('/app/booking-confirm')}>
            Đặt ngay
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--tertiary-container)' }}>tips_and_updates</span>
        Tăng Chemistry
      </div>
      <div style={s.tipsGrid}>
        {tips.map((t, i) => (
          <div key={i} style={s.tipCard}>
            <div style={s.tipIconWrap}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--tertiary-container)' }}>{t.icon}</span>
            </div>
            <div style={s.tipText}>{t.text}</div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={s.actions}>
        <button style={s.primaryBtn} onClick={() => navigate('/app/chat')}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>chat</span>
          Gửi lời chào
        </button>
        <button style={s.secondaryBtn} onClick={() => navigate(`/app/profile/${matchId || 'minh-anh'}`)}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
          Xem hồ sơ
        </button>
      </div>
    </div>
  );
};

export default ChemistryScorePage;
