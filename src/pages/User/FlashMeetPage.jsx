import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FlashMeetPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flash-meet');

  const events = [
    {
      id: 1,
      badge: 'Dish Visa',
      timeLabel: 'Bắt đầu sau 45 phút',
      title: 'Đêm Miso Cay nồng',
      distance: '0.8 km',
      avatarCount: '+2',
      gradient: 'linear-gradient(135deg, #3a1a0a, #7a3010)',
    },
    {
      id: 2,
      badge: 'Dish Visa',
      timeLabel: 'Bắt đầu sau 1 giờ 20 phút',
      title: 'Bữa trưa đậm chất Ý',
      distance: '1.2 km',
      avatarCount: '+4',
      gradient: 'linear-gradient(135deg, #1a2a3a, #2a4a6a)',
    },
  ];

  const styles = {
    page: {
      backgroundColor: '#fcf9f8',
      minHeight: '100vh',
      fontFamily: "'Manrope', sans-serif",
      color: '#1c1b1b',
      paddingBottom: '120px',
    },
    header: {
      backgroundColor: 'rgba(252, 249, 248, 0.92)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    },
    headerInner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
    },
    logo: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '24px',
      fontWeight: 900,
      color: '#1c1b1b',
      letterSpacing: '-0.04em',
      margin: 0,
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    iconBtn: {
      padding: '8px',
      color: 'rgba(28,27,27,0.6)',
      background: 'none',
      border: 'none',
      borderRadius: '9999px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabsSection: {
      padding: '8px 24px 0',
      overflowX: 'auto',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    tabsRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
      paddingBottom: '8px',
    },
    tabActive: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '24px',
      fontWeight: 700,
      color: '#ad2c00',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      position: 'relative',
      whiteSpace: 'nowrap',
      paddingBottom: '4px',
    },
    tabActiveUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '4px',
      backgroundColor: '#ad2c00',
      borderRadius: '9999px',
    },
    tabInactive: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '24px',
      fontWeight: 700,
      color: 'rgba(28,27,27,0.3)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      whiteSpace: 'nowrap',
    },
    darkCardSection: {
      padding: '24px 24px 0',
    },
    darkCard: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#1c1b1b',
      borderRadius: '24px',
      padding: '24px',
      height: '224px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 20px 60px rgba(173,44,0,0.25), 0 8px 32px rgba(0,0,0,0.4)',
    },
    darkCardGlow1: {
      position: 'absolute',
      top: '-40px',
      right: '-40px',
      width: '192px',
      height: '192px',
      backgroundColor: 'rgba(173,44,0,0.2)',
      borderRadius: '9999px',
      filter: 'blur(40px)',
      pointerEvents: 'none',
    },
    darkCardGlow2: {
      position: 'absolute',
      bottom: '-40px',
      left: '-40px',
      width: '128px',
      height: '128px',
      backgroundColor: 'rgba(255,120,82,0.1)',
      borderRadius: '9999px',
      filter: 'blur(32px)',
      pointerEvents: 'none',
    },
    darkCardTop: {
      position: 'relative',
      zIndex: 1,
    },
    darkCardBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: 'rgba(173,44,0,0.2)',
      border: '1px solid rgba(173,44,0,0.3)',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '10px',
      fontWeight: 700,
      color: '#ffdbd1',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: '12px',
    },
    darkCardTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '22px',
      fontWeight: 800,
      color: '#ffffff',
      lineHeight: 1.2,
      margin: 0,
    },
    darkCardBottom: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '16px',
    },
    darkCardDesc: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: '12px',
      fontWeight: 500,
      maxWidth: '160px',
      lineHeight: 1.6,
      margin: 0,
    },
    shuffleBtn: {
      backgroundColor: '#ffffff',
      color: '#1c1b1b',
      padding: '16px',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'transform 0.1s',
    },
    feedSection: {
      padding: '40px 24px 0',
    },
    feedHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    feedTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '18px',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      margin: 0,
    },
    seeAllBtn: {
      fontSize: '10px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: '#ad2c00',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    eventList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    eventCard: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    eventImageWrap: {
      position: 'relative',
      aspectRatio: '4 / 5',
      borderRadius: '32px',
      overflow: 'hidden',
      backgroundColor: '#f0edec',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    },
    eventImagePlaceholder: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    eventBadge: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      backgroundColor: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      padding: '6px 12px',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      border: '1px solid rgba(255,255,255,0.2)',
    },
    eventBadgeText: {
      fontSize: '9px',
      fontWeight: 700,
      color: '#1c1b1b',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    eventOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
    },
    eventOverlayInner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      color: '#ffffff',
    },
    eventTimeLabel: {
      fontSize: '10px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: 'rgba(255,255,255,0.8)',
      marginBottom: '4px',
    },
    eventTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '20px',
      fontWeight: 700,
      margin: 0,
    },
    distancePill: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(8px)',
      padding: '4px 8px',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    distanceText: {
      fontSize: '10px',
      fontWeight: 700,
      color: '#ffffff',
    },
    eventFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '8px',
      paddingRight: '8px',
    },
    avatarRow: {
      display: 'flex',
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '9999px',
      border: '2px solid #fcf9f8',
      marginLeft: '-12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 700,
      color: '#5d4038',
      flexShrink: 0,
      overflow: 'hidden',
    },
    avatarFirst: {
      marginLeft: 0,
    },
    avatarExtra: {
      backgroundColor: '#ebe7e7',
    },
    avatarImg1: {
      background: 'linear-gradient(135deg, #f0edec, #e7bdb2)',
    },
    avatarImg2: {
      background: 'linear-gradient(135deg, #e7bdb2, #f0edec)',
    },
    joinBtn: {
      backgroundColor: '#ad2c00',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '14px',
      boxShadow: '0 4px 16px rgba(173,44,0,0.2)',
      transition: 'transform 0.1s',
    },
    bottomNav: {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '92%',
      maxWidth: '448px',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
      backgroundColor: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRadius: '9999px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
      border: '1px solid rgba(255,255,255,0.2)',
    },
    navItemInactive: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(28,27,27,0.4)',
      padding: '12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      gap: '2px',
      textDecoration: 'none',
    },
    navItemActive: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ad2c00',
      color: '#ffffff',
      borderRadius: '9999px',
      padding: '12px 24px',
      border: 'none',
      cursor: 'pointer',
      gap: '2px',
      textDecoration: 'none',
      boxShadow: '0 4px 16px rgba(173,44,0,0.3)',
    },
    navLabel: {
      fontSize: '9px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
    },
    fab: {
      position: 'fixed',
      bottom: '112px',
      right: '24px',
      backgroundColor: '#1c1b1b',
      color: '#ffffff',
      padding: '16px',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.15s',
    },
  };

  return (
    <div style={styles.page}>
      <div style={{ ...styles.header, position: 'sticky', top: 0, zIndex: 40 }}>
        <section style={styles.tabsSection}>
          <div style={styles.tabsRow}>
            <button
              style={activeTab === 'flash-meet' ? styles.tabActive : styles.tabInactive}
              onClick={() => setActiveTab('flash-meet')}
            >
              Flash Meet
              {activeTab === 'flash-meet' && <span style={styles.tabActiveUnderline} />}
            </button>
            <button
              style={activeTab === 'blind-soup' ? styles.tabActive : styles.tabInactive}
              onClick={() => setActiveTab('blind-soup')}
            >
              Blind Soup Date
              {activeTab === 'blind-soup' && <span style={styles.tabActiveUnderline} />}
            </button>
          </div>
        </section>
      </div>

      <main>
        <section style={styles.darkCardSection}>
          <div style={styles.darkCard}>
            <div style={styles.darkCardGlow1} />
            <div style={styles.darkCardGlow2} />
            <div style={styles.darkCardTop}>
              <div style={styles.darkCardBadge}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
                >
                  restaurant_menu
                </span>
                Blind Soup Date
              </div>
              <h2 style={styles.darkCardTitle}>Ghép đôi ngẫu nhiên cùng bạn mới</h2>
            </div>
            <div style={styles.darkCardBottom}>
              <p style={styles.darkCardDesc}>
                Đang có người đợi để cùng thưởng thức một tô ramen đấy.
              </p>
              <button
                style={styles.shuffleBtn}
                onClick={() => navigate('/app/flash-meet')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '24px', fontWeight: 700 }}>
                  shuffle
                </span>
              </button>
            </div>
          </div>
        </section>

        <section style={styles.feedSection}>
          <div style={styles.feedHeader}>
            <h3 style={styles.feedTitle}>Đang diễn ra gần đây</h3>
            <button style={styles.seeAllBtn}>Xem tất cả</button>
          </div>

          <div style={styles.eventList}>
            {events.map((ev, idx) => (
              <div key={ev.id} style={styles.eventCard}>
                <div style={styles.eventImageWrap}>
                  <div
                    style={{
                      ...styles.eventImagePlaceholder,
                      background: ev.gradient,
                    }}
                  />
                  <div style={styles.eventBadge}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: '#ad2c00',
                        fontSize: '14px',
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      local_dining
                    </span>
                    <span style={styles.eventBadgeText}>{ev.badge}</span>
                  </div>
                  <div style={styles.eventOverlay}>
                    <div style={styles.eventOverlayInner}>
                      <div>
                        <p style={styles.eventTimeLabel}>{ev.timeLabel}</p>
                        <h4 style={styles.eventTitle}>{ev.title}</h4>
                      </div>
                      <div style={styles.distancePill}>
                        <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#ffffff' }}>
                          near_me
                        </span>
                        <span style={styles.distanceText}>{ev.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.eventFooter}>
                  <div style={styles.avatarRow}>
                    <div
                      style={{
                        ...styles.avatar,
                        ...styles.avatarFirst,
                        ...styles.avatarImg1,
                      }}
                    />
                    {idx === 0 && (
                      <div
                        style={{
                          ...styles.avatar,
                          ...styles.avatarImg2,
                        }}
                      />
                    )}
                    <div
                      style={{
                        ...styles.avatar,
                        ...styles.avatarExtra,
                      }}
                    >
                      {ev.avatarCount}
                    </div>
                  </div>
                  <button
                    style={styles.joinBtn}
                    onClick={() => navigate('/app/events/1')}
                  >
                    Tham gia ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
};

export default FlashMeetPage;
