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
    { id: 1, name: 'Mai Anh', rating: 5, comment: 'Khong gian tuyet voi, mon an rat ngon. Se quay lai lan nua!', date: '20/03/2026' },
    { id: 2, name: 'Duc Thinh', rating: 4, comment: 'Phuc vu tot, gia ca hop ly. Nen dat truoc vi quan dong.', date: '19/03/2026' },
    { id: 3, name: 'Linh Chi', rating: 5, comment: 'Date night hoan hao. Nhac song rat hay, do uong dac biet.', date: '18/03/2026' },
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

  const stats = [
    { label: 'Luot dat cho', value: '150', icon: 'calendar_today' },
    { label: 'Khach hom nay', value: '32', icon: 'group' },
    { label: 'Danh gia TB', value: '4.8', icon: 'star' },
    { label: 'Doanh thu thang', value: '15.2M VND', icon: 'payments' },
  ];

  const quickActions = [
    { label: 'Tao su kien', icon: 'add_circle', path: '/partner/events' },
    { label: 'Cap nhat menu', icon: 'restaurant_menu', path: '/partner/menu' },
    { label: 'Xem thong ke', icon: 'analytics', path: '/partner/analytics' },
  ];

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'var(--surface)',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      padding: '24px',
      maxWidth: 1200,
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
    },
    headerIcon: {
      fontSize: 32,
      color: 'var(--primary)',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    venueName: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--on-surface-variant)',
      marginBottom: 28,
      marginLeft: 44,
    },
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 16,
      marginBottom: 32,
    },
    statCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    },
    statIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius)',
      background: 'var(--primary-fixed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statIcon: {
      fontSize: 24,
      color: 'var(--primary)',
    },
    statValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    statLabel: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginTop: 2,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 16,
      color: 'var(--on-surface)',
    },
    bookingItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '14px 18px',
      marginBottom: 10,
      boxShadow: 'var(--card-shadow)',
    },
    bookingLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    },
    bookingTime: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--primary)',
      minWidth: 52,
    },
    bookingGuest: {
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--on-surface)',
    },
    bookingParty: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginTop: 2,
    },
    partyIcon: {
      fontSize: 16,
      color: 'var(--on-surface-variant)',
    },
    bookingRight: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    badgeConfirmed: {
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 600,
      background: '#e8f5e9',
      color: '#2e7d32',
    },
    badgePending: {
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 600,
      background: '#fff8e1',
      color: '#f57f17',
    },
    actionBtn: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.15s',
    },
    acceptBtn: {
      background: '#e8f5e9',
      color: '#2e7d32',
    },
    rejectBtn: {
      background: 'var(--error-container)',
      color: 'var(--error)',
    },
    chartContainer: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
    },
    chartBars: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 160,
      gap: 12,
      paddingTop: 8,
    },
    chartBarWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      gap: 6,
    },
    chartBar: {
      width: '100%',
      borderRadius: '6px 6px 0 0',
      background: 'var(--primary-gradient)',
      minHeight: 8,
      transition: 'height 0.3s ease',
    },
    chartLabel: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--on-surface-variant)',
    },
    chartValue: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--primary)',
    },
    reviewCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '18px',
      marginBottom: 12,
      boxShadow: 'var(--card-shadow)',
    },
    reviewHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    reviewName: {
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--on-surface)',
    },
    reviewDate: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    stars: {
      display: 'flex',
      gap: 2,
      marginBottom: 8,
    },
    starFilled: {
      fontSize: 18,
      color: '#f59e0b',
    },
    reviewComment: {
      fontSize: 14,
      fontStyle: 'italic',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
    },
    quickActionsRow: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
    },
    quickActionBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 20px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.15s, box-shadow 0.15s',
    },
    quickActionIcon: {
      fontSize: 20,
    },
    twoCol: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginBottom: 32,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span className="material-symbols-outlined" style={styles.headerIcon}>storefront</span>
        <h1 style={styles.title}>Bang dieu khien doi tac</h1>
      </div>
      <p style={styles.venueName}>Velvet Bistro</p>

      {/* Stats */}
      <div style={styles.statsRow}>
        {stats.map((s, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statIconWrap}>
              <span className="material-symbols-outlined" style={styles.statIcon}>{s.icon}</span>
            </div>
            <div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.twoCol}>
        {/* Upcoming Bookings */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Dat cho sap toi</h2>
          {bookings.map((b) => (
            <div key={b.id} style={styles.bookingItem}>
              <div style={styles.bookingLeft}>
                <div style={styles.bookingTime}>{b.time}</div>
                <div>
                  <div style={styles.bookingGuest}>{b.guest}</div>
                  <div style={styles.bookingParty}>
                    <span className="material-symbols-outlined" style={styles.partyIcon}>group</span>
                    {b.party} khach
                  </div>
                </div>
              </div>
              <div style={styles.bookingRight}>
                <span style={b.status === 'confirmed' ? styles.badgeConfirmed : styles.badgePending}>
                  {b.status === 'confirmed' ? 'Xac nhan' : 'Cho duyet'}
                </span>
                <button
                  style={{ ...styles.actionBtn, ...styles.acceptBtn }}
                  title="Xac nhan"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check</span>
                </button>
                <button
                  style={{ ...styles.actionBtn, ...styles.rejectBtn }}
                  title="Tu choi"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Bieu do luot dat</h2>
          <div style={styles.chartContainer}>
            <div style={styles.chartBars}>
              {chartData.map((d, i) => (
                <div key={i} style={styles.chartBarWrap}>
                  <div style={styles.chartValue}>{d.value}</div>
                  <div
                    style={{
                      ...styles.chartBar,
                      height: `${(d.value / maxChart) * 130}px`,
                    }}
                  />
                  <div style={styles.chartLabel}>{d.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Danh gia gan day</h2>
        {reviews.map((r) => (
          <div key={r.id} style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <span style={styles.reviewName}>{r.name}</span>
              <span style={styles.reviewDate}>{r.date}</span>
            </div>
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`material-symbols-outlined ${s <= r.rating ? 'filled' : ''}`}
                  style={styles.starFilled}
                >
                  star
                </span>
              ))}
            </div>
            <p style={styles.reviewComment}>{r.comment}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Hanh dong nhanh</h2>
        <div style={styles.quickActionsRow}>
          {quickActions.map((a, i) => (
            <button
              key={i}
              style={styles.quickActionBtn}
              onClick={() => navigate(a.path)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span className="material-symbols-outlined" style={styles.quickActionIcon}>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
