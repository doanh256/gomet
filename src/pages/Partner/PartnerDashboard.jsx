import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [bookings] = useState([
    { id: 1, time: '18:00', guest: 'Nguyen Van An', party: 4, status: 'confirmed' },
    { id: 2, time: '18:30', guest: 'Tran Thi Bich', party: 2, status: 'pending' },
    { id: 3, time: '19:00', guest: 'Le Hoang Minh', party: 6, status: 'confirmed' },
    { id: 4, time: '19:30', guest: 'Pham Duc Huy', party: 3, status: 'pending' },
    { id: 5, time: '20:00', guest: 'Vo Thanh Tam', party: 2, status: 'confirmed' },
  ]);
  const [reviews] = useState([
    { id: 1, name: 'Mai Anh', rating: 5, comment: 'Không gian tuyệt vời, món ăn rất ngon. Sẽ quay lại lần nữa!', date: '20/03/2026' },
    { id: 2, name: 'Duc Thinh', rating: 4, comment: 'Phục vụ tốt, giá cả hợp lý. Nên đặt trước vì quán đông.', date: '19/03/2026' },
    { id: 3, name: 'Linh Chi', rating: 5, comment: 'Date night hoàn hảo. Nhạc sống rất hay, đồ uống đặc biệt.', date: '18/03/2026' },
  ]);
  const chartData = [
    { day: 'T2', value: 18 },
    { day: 'T3', value: 25 },
    { day: 'T4', value: 22 },
    { day: 'T5', value: 30 },
    { day: 'T6', value: 42 },
    { day: 'T7', value: 55 },
    { day: 'CN', value: 48 },
  ];
  const maxChart = Math.max(...chartData.map(d => d.value));

  const navItems = [
    { icon: 'dashboard', label: 'Tổng quan', path: '/partner', active: true },
    { icon: 'restaurant_menu', label: 'Menu', path: '/partner/menu' },
    { icon: 'event', label: 'Sự kiện', path: '/partner/events' },
    { icon: 'analytics', label: 'Thống kê', path: '/partner/analytics' },
    { icon: 'star', label: 'VIP', path: '/partner/guests' },
  ];

  const styles = {
    root: {
      minHeight: '100vh',
      background: '#fcf9f8',
      fontFamily: "'Manrope', sans-serif",
      color: '#1c1b1b',
    },
    header: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      background: '#fcf9f8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: 64,
      boxSizing: 'border-box',
      borderBottom: '1px solid #e7bdb2',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    logoText: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      fontSize: 20,
      color: '#1c1b1b',
      letterSpacing: '-0.5px',
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    avatarWrap: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: '#ffdbd1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    avatarOnline: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 12,
      height: 12,
      background: '#22c55e',
      borderRadius: '50%',
      border: '2px solid #fcf9f8',
    },
    main: {
      paddingTop: 80,
      paddingBottom: 120,
      paddingLeft: 24,
      paddingRight: 24,
      maxWidth: 480,
      margin: '0 auto',
      boxSizing: 'border-box',
    },
    welcomeSection: {
      marginBottom: 32,
    },
    welcomeGreeting: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: '#5d4038',
      marginBottom: 4,
    },
    welcomeTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: '#1c1b1b',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    welcomeAccent: {
      color: '#ad2c00',
    },
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 32,
    },
    revenueCard: {
      gridColumn: '1 / -1',
      background: '#ad2c00',
      color: '#ffffff',
      padding: 24,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      aspectRatio: '16/9',
    },
    revenueLabel: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      opacity: 0.8,
      marginBottom: 4,
    },
    revenueValue: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 36,
      fontWeight: 800,
      lineHeight: 1,
    },
    revenueTrend: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'rgba(255,255,255,0.2)',
      padding: '4px 12px',
      borderRadius: 9999,
      fontSize: 12,
      fontWeight: 700,
    },
    statCard: {
      background: '#f6f3f2',
      padding: 20,
      borderRadius: 16,
    },
    statIcon: {
      fontSize: 24,
      color: '#ad2c00',
      marginBottom: 8,
      display: 'block',
    },
    statCardLabel: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: 10,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#5d4038',
      marginBottom: 4,
    },
    statCardValue: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 22,
      fontWeight: 700,
      color: '#1c1b1b',
    },
    sectionTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 20,
      fontWeight: 700,
      color: '#1c1b1b',
      marginBottom: 16,
      letterSpacing: '-0.3px',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    sectionLink: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: 11,
      fontWeight: 700,
      color: '#ad2c00',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
    },
    quickActionsSection: {
      marginBottom: 32,
    },
    quickActionsRow: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 8,
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    quickActionPrimary: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: '#ad2c00',
      color: '#ffffff',
      padding: '14px 20px',
      borderRadius: 16,
      border: 'none',
      fontFamily: "'Manrope', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'transform 0.1s, opacity 0.1s',
      whiteSpace: 'nowrap',
    },
    quickActionSecondary: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: '#ebe7e7',
      color: '#1c1b1b',
      padding: '14px 20px',
      borderRadius: 16,
      border: 'none',
      fontFamily: "'Manrope', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'transform 0.1s, opacity 0.1s',
      whiteSpace: 'nowrap',
    },
    bookingsSection: {
      marginBottom: 32,
    },
    bookingItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#ffffff',
      borderRadius: 16,
      padding: '14px 18px',
      marginBottom: 10,
      boxShadow: '0 2px 8px rgba(28,27,27,0.06)',
    },
    bookingLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    },
    bookingTime: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 15,
      fontWeight: 700,
      color: '#ad2c00',
      minWidth: 48,
    },
    bookingGuest: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: 14,
      fontWeight: 600,
      color: '#1c1b1b',
    },
    bookingParty: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 12,
      color: '#5d4038',
      marginTop: 2,
    },
    bookingRight: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    badgeConfirmed: {
      padding: '4px 10px',
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 700,
      background: 'rgba(17,117,0,0.12)',
      color: '#117500',
    },
    badgePending: {
      padding: '4px 10px',
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 700,
      background: 'rgba(173,44,0,0.1)',
      color: '#ad2c00',
    },
    actionBtn: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
    },
    acceptBtn: {
      background: 'rgba(17,117,0,0.12)',
      color: '#117500',
    },
    rejectBtn: {
      background: 'rgba(173,44,0,0.1)',
      color: '#ad2c00',
    },
    chartSection: {
      background: '#f6f3f2',
      borderRadius: 16,
      padding: 24,
      marginBottom: 32,
    },
    chartBars: {
      height: 160,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 8,
      paddingTop: 8,
    },
    chartBarWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      flex: 1,
    },
    chartBarLabel: {
      fontSize: 10,
      fontWeight: 700,
      color: '#5d4038',
    },
    reviewsSection: {
      marginBottom: 32,
    },
    reviewCard: {
      background: '#ffffff',
      borderRadius: 16,
      padding: 18,
      marginBottom: 12,
      boxShadow: '0 2px 8px rgba(28,27,27,0.06)',
    },
    reviewHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    reviewName: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 700,
      fontSize: 14,
      color: '#1c1b1b',
    },
    reviewDate: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: 12,
      color: '#5d4038',
    },
    reviewStars: {
      display: 'flex',
      gap: 2,
      marginBottom: 8,
    },
    starIcon: {
      fontSize: 16,
      color: '#FFD54F',
    },
    reviewComment: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: 13,
      fontStyle: 'italic',
      color: '#5d4038',
      lineHeight: 1.6,
      margin: 0,
    },
    bottomNav: {
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: 420,
      borderRadius: 9999,
      zIndex: 50,
      background: 'rgba(252,249,248,0.9)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid #e7bdb2',
      boxShadow: '0 20px 40px rgba(28,27,27,0.1)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 4px',
      boxSizing: 'border-box',
    },
    navItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '4px 8px',
      gap: 2,
    },
    navItemActive: {
      background: '#ad2c00',
      borderRadius: 9999,
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
    },
    navLabel: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 9,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#1c1b1b',
    },
  };

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span className="material-symbols-outlined" style={{ color: '#ad2c00', cursor: 'pointer', fontSize: 24 }}>menu</span>
          <span style={styles.logoText}>GoMet</span>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.avatarWrap}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#ad2c00' }}>person</span>
            <div style={styles.avatarOnline} />
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.welcomeSection}>
          <p style={styles.welcomeGreeting}>Chào buổi sáng,</p>
          <h1 style={styles.welcomeTitle}>
            Nhà hàng <br />
            <span style={styles.welcomeAccent}>Velvet Bistro</span>
          </h1>
        </section>

        <section style={styles.bentoGrid}>
          <div style={styles.revenueCard}>
            <div>
              <div style={styles.revenueLabel}>Doanh thu hôm nay</div>
              <div style={styles.revenueValue}>15.2Mđ</div>
            </div>
            <div>
              <span style={styles.revenueTrend}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>
                +15.2% so với hôm qua
              </span>
            </div>
          </div>

          <div style={styles.statCard}>
            <span className="material-symbols-outlined" style={styles.statIcon}>confirmation_number</span>
            <div style={styles.statCardLabel}>Lượt đặt chỗ</div>
            <div style={styles.statCardValue}>150</div>
          </div>

          <div style={styles.statCard}>
            <span className="material-symbols-outlined" style={{ ...styles.statIcon, color: '#005daa' }}>star</span>
            <div style={styles.statCardLabel}>Đánh giá</div>
            <div style={styles.statCardValue}>4.8/5</div>
          </div>

          <div style={styles.statCard}>
            <span className="material-symbols-outlined" style={styles.statIcon}>group</span>
            <div style={styles.statCardLabel}>Khách hôm nay</div>
            <div style={styles.statCardValue}>32</div>
          </div>

          <div style={styles.statCard}>
            <span className="material-symbols-outlined" style={styles.statIcon}>visibility</span>
            <div style={styles.statCardLabel}>Lượt xem</div>
            <div style={styles.statCardValue}>1.2k</div>
          </div>
        </section>

        <section style={styles.quickActionsSection}>
          <h2 style={styles.sectionTitle}>Hành động nhanh</h2>
          <div style={styles.quickActionsRow}>
            <button
              style={styles.quickActionPrimary}
              onClick={() => navigate('/partner/events')}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add_circle</span>
              Tạo sự kiện mới
            </button>
            <button
              style={styles.quickActionSecondary}
              onClick={() => navigate('/partner/menu')}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>restaurant_menu</span>
              Cập nhật menu
            </button>
            <button
              style={styles.quickActionSecondary}
              onClick={() => navigate('/partner/analytics')}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>analytics</span>
              Xem thống kê
            </button>
            <button
              style={styles.quickActionSecondary}
              onClick={() => navigate('/partner/guests')}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>workspace_premium</span>
              Khách VIP
            </button>
          </div>
        </section>

        <section style={styles.bookingsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Đặt chỗ hôm nay</h2>
            <button style={styles.sectionLink} onClick={() => navigate('/partner/analytics')}>Xem tất cả</button>
          </div>
          {bookings.map(b => (
            <div key={b.id} style={styles.bookingItem}>
              <div style={styles.bookingLeft}>
                <div style={styles.bookingTime}>{b.time}</div>
                <div>
                  <div style={styles.bookingGuest}>{b.guest}</div>
                  <div style={styles.bookingParty}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#5d4038' }}>group</span>
                    {b.party} khách
                  </div>
                </div>
              </div>
              <div style={styles.bookingRight}>
                <span style={b.status === 'confirmed' ? styles.badgeConfirmed : styles.badgePending}>
                  {b.status === 'confirmed' ? 'Xác nhận' : 'Chờ duyệt'}
                </span>
                <button style={{ ...styles.actionBtn, ...styles.acceptBtn }} title="Xác nhận">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
                </button>
                <button style={{ ...styles.actionBtn, ...styles.rejectBtn }} title="Từ chối">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
                </button>
              </div>
            </div>
          ))}
        </section>

        <section style={styles.chartSection}>
          <h2 style={{ ...styles.sectionTitle, marginBottom: 20 }}>Lưu lượng khách hàng</h2>
          <div style={styles.chartBars}>
            {chartData.map((d, i) => (
              <div key={i} style={styles.chartBarWrap}>
                <div
                  style={{
                    width: '100%',
                    borderRadius: '6px 6px 0 0',
                    background: d.value === maxChart
                      ? '#ad2c00'
                      : `rgba(173,44,0,${0.2 + 0.6 * (d.value / maxChart)})`,
                    height: `${(d.value / maxChart) * 130}px`,
                    minHeight: 8,
                  }}
                />
                <span style={styles.chartBarLabel}>{d.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.reviewsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Đánh giá gần đây</h2>
            <button style={styles.sectionLink} onClick={() => navigate('/partner/analytics')}>Xem tất cả</button>
          </div>
          {reviews.map(r => (
            <div key={r.id} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <span style={styles.reviewName}>{r.name}</span>
                <span style={styles.reviewDate}>{r.date}</span>
              </div>
              <div style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map(s => (
                  <span
                    key={s}
                    className="material-symbols-outlined"
                    style={{ ...styles.starIcon, opacity: s <= r.rating ? 1 : 0.25 }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p style={styles.reviewComment}>{r.comment}</p>
            </div>
          ))}
        </section>
      </main>

      <nav style={styles.bottomNav}>
        {navItems.map((item, i) =>
          item.active ? (
            <button key={i} style={styles.navItemActive} onClick={() => navigate(item.path)}>
              <span className="material-symbols-outlined" style={{ color: '#ffffff', fontSize: 24 }}>{item.icon}</span>
            </button>
          ) : (
            <button key={i} style={styles.navItem} onClick={() => navigate(item.path)}>
              <span className="material-symbols-outlined" style={{ color: '#1c1b1b', fontSize: 24 }}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          )
        )}
      </nav>
    </div>
  );
};

export default PartnerDashboard;
