import React from 'react';
import { useNavigate } from 'react-router-dom';

const featuredMatch = {
  name: 'Minh Anh',
  age: 26,
  profession: 'UX Designer',
  distance: '2.5 km',
  matchPercent: 98,
  avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
};

const insights = [
  { icon: 'group', text: '3 ban chung', label: 'Ban chung' },
  { icon: 'event', text: 'Da tham gia 2 su kien', label: 'Su kien' },
  { icon: 'restaurant', text: 'Cung thich cafe', label: 'Am thuc' },
  { icon: 'favorite', text: '87% so thich trung', label: 'So thich' },
];

const venueTeaser = {
  name: 'The Lissome Cafe',
  cuisine: 'Cafe & Brunch',
  label: 'Dia diem chung cua ban',
};

const secondaryMatches = [
  { name: 'Thao Vy', age: 24, matchPercent: 91, interest: '"Cung me phim Nhat"', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop' },
  { name: 'Bao Ngoc', age: 27, matchPercent: 88, interest: '"Thich chay bo buoi sang"', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop' },
  { name: 'Ha My', age: 25, matchPercent: 85, interest: '"Fan cua ca phe sua da"', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop' },
];

const AIMatchInsightsPage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 720,
      margin: '0 auto',
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
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--primary-fixed)',
      color: 'var(--on-primary-container)',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: 12,
    },
    pillIcon: {
      fontSize: 16,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 32,
    },
    headingAccent: {
      fontStyle: 'italic',
      color: 'var(--primary)',
    },
    featuredCard: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 32,
      boxShadow: 'var(--editorial-shadow)',
    },
    featuredImg: {
      width: '100%',
      height: 380,
      objectFit: 'cover',
      display: 'block',
    },
    featuredOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '60px 24px 24px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
      color: '#fff',
    },
    matchBadge: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(12px)',
      border: '3px solid transparent',
      backgroundClip: 'padding-box',
      position: 'absolute',
      top: 20,
      right: 20,
      boxShadow: '0 0 0 3px var(--primary-container)',
    },
    matchPercent: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#fff',
    },
    matchLabel: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.85)',
    },
    featuredName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 4,
    },
    featuredMeta: {
      fontSize: 14,
      opacity: 0.85,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    insightsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginBottom: 32,
    },
    insightItem: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      boxShadow: 'var(--card-shadow)',
    },
    insightIcon: {
      fontSize: 24,
      color: 'var(--primary)',
      backgroundColor: 'var(--primary-fixed)',
      borderRadius: 'var(--radius-full)',
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    insightText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    insightLabel: {
      fontSize: 11,
      color: 'var(--on-surface-variant)',
      marginTop: 2,
    },
    venueCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      marginBottom: 32,
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    },
    venueIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    venueIconInner: {
      fontSize: 24,
      color: 'var(--on-primary)',
    },
    venueName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    venueCuisine: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    venueLabel: {
      fontSize: 11,
      color: 'var(--primary)',
      fontWeight: 600,
      marginTop: 2,
    },
    actions: {
      display: 'flex',
      gap: 12,
      marginBottom: 40,
    },
    btnPrimary: {
      flex: 1,
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '14px 24px',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    btnSurface: {
      flex: 1,
      background: 'var(--surface-container-low)',
      color: 'var(--on-surface)',
      border: '1px solid var(--outline-variant)',
      borderRadius: 'var(--radius-full)',
      padding: '14px 24px',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    secondaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
    },
    secondaryCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    },
    secondaryImg: {
      width: '100%',
      height: 160,
      objectFit: 'cover',
      display: 'block',
    },
    secondaryBody: {
      padding: '12px',
    },
    secondaryBadge: {
      display: 'inline-block',
      background: 'var(--primary-gradient)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 700,
      padding: '3px 8px',
      borderRadius: 'var(--radius-full)',
      marginBottom: 6,
    },
    secondaryName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    secondaryInterest: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontStyle: 'italic',
      color: 'var(--on-surface-variant)',
      marginTop: 4,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.pill}>
        <span className="material-symbols-outlined" style={s.pillIcon}>auto_awesome</span>
        CULINARY CURATOR AI
      </div>

      <h1 style={s.heading}>
        Table <span style={s.headingAccent}>Chemistry</span>
      </h1>

      {/* Featured Match */}
      <div style={s.featuredCard}>
        <img src={featuredMatch.avatar} alt={featuredMatch.name} style={s.featuredImg} />
        <div style={s.matchBadge}>
          <span style={s.matchPercent}>{featuredMatch.matchPercent}%</span>
          <span style={s.matchLabel}>MATCH</span>
        </div>
        <div style={s.featuredOverlay}>
          <div style={s.featuredName}>{featuredMatch.name}, {featuredMatch.age}</div>
          <div style={s.featuredMeta}>
            <span>{featuredMatch.profession}</span>
            <span>·</span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
            <span>{featuredMatch.distance}</span>
          </div>
        </div>
      </div>

      {/* Why you'll vibe */}
      <h2 style={s.sectionTitle}>Why you'll vibe</h2>
      <div style={s.insightsGrid}>
        {insights.map((item, i) => (
          <div key={i} style={s.insightItem}>
            <div style={s.insightIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{item.icon}</span>
            </div>
            <div>
              <div style={s.insightText}>{item.text}</div>
              <div style={s.insightLabel}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Venue teaser */}
      <h2 style={s.sectionTitle}>Dia diem goi y</h2>
      <div style={s.venueCard}>
        <div style={s.venueIconWrap}>
          <span className="material-symbols-outlined" style={s.venueIconInner}>storefront</span>
        </div>
        <div>
          <div style={s.venueName}>{venueTeaser.name}</div>
          <div style={s.venueCuisine}>{venueTeaser.cuisine}</div>
          <div style={s.venueLabel}>{venueTeaser.label}</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={s.actions}>
        <button style={s.btnPrimary}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>waving_hand</span>
          Gui loi chao
        </button>
        <button style={s.btnSurface}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>search</span>
          Tim tuong tu
        </button>
      </div>

      {/* Secondary matches */}
      <h2 style={s.sectionTitle}>Goi y khac</h2>
      <div style={s.secondaryGrid}>
        {secondaryMatches.map((m, i) => (
          <div key={i} style={s.secondaryCard}>
            <img src={m.avatar} alt={m.name} style={s.secondaryImg} />
            <div style={s.secondaryBody}>
              <div style={s.secondaryBadge}>{m.matchPercent}%</div>
              <div style={s.secondaryName}>{m.name}, {m.age}</div>
              <div style={s.secondaryInterest}>{m.interest}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIMatchInsightsPage;
