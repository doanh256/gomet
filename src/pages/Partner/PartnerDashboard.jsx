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
  const chartData = [{ day: 'T2', value: 18 }, { day: 'T3', value: 25 }, { day: 'T4', value: 22 }, { day: 'T5', value: 30 }, { day: 'T6', value: 42 }, { day: 'T7', value: 55 }, { day: 'CN', value: 48 }];
  const maxChart = Math.max(...chartData.map(d => d.value));
  const stats = [{ label: 'Luot dat cho', value: '150', icon: 'calendar_today' }, { label: 'Khach hom nay', value: '32', icon: 'group' }, { label: 'Danh gia TB', value: '4.8', icon: 'star' }, { label: 'Doanh thu thang', value: '15.2M VND', icon: 'payments' }];
  const quickActions = [{ label: 'Tao su kien', icon: 'add_circle', path: '/partner/events' }, { label: 'Cap nhat menu', icon: 'restaurant_menu', path: '/partner/menu' }, { label: 'Xem thong ke', icon: 'analytics', path: '/partner/analytics' }];

  const st = {
    page: { minHeight: '100vh', background: '#FDF9F3', fontFamily: 'var(--font-body)', color: '#393834', padding: '24px', maxWidth: 1200, margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 },
    headerIcon: { fontSize: 32, color: '#b83500' },
    title: { fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 700, color: '#393834' },
    venueName: { fontSize: 15, color: '#666460', marginBottom: 28, marginLeft: 44 },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 },
    statCard: { background: '#ffffff', borderRadius: '1.5rem', padding: '20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
    statIconWrap: { width: 48, height: 48, borderRadius: '1.5rem', background: '#F7F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    statIcon: { fontSize: 24, color: '#b83500' },
    statValue: { fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 700, color: '#393834' },
    statLabel: { fontSize: 13, color: '#666460', marginTop: 2 },
    section: { marginBottom: 32 },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#393834' },
    bookingItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', borderRadius: '1.5rem', padding: '14px 18px', marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
    bookingTime: { fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 600, color: '#b83500', minWidth: 52 },
    bookingGuest: { fontSize: 15, fontWeight: 500, color: '#393834' },
    bookingParty: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#666460', marginTop: 2 },
    badgeConfirmed: { padding: '4px 12px', borderRadius: '9999px', fontSize: 12, fontWeight: 600, background: 'rgba(17,117,0,0.15)', color: '#117500' },
    badgePending: { padding: '4px 12px', borderRadius: '9999px', fontSize: 12, fontWeight: 600, background: 'rgba(255,213,79,0.15)', color: '#FFD54F' },
    actionBtn: { width: 34, height: 34, borderRadius: '9999px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    acceptBtn: { background: 'rgba(17,117,0,0.15)', color: '#117500' },
    rejectBtn: { background: 'rgba(255,87,26,0.15)', color: '#FF571A' },
    chartContainer: { background: '#ffffff', borderRadius: '1.5rem', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
    chartBars: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, gap: 12, paddingTop: 8 },
    chartBar: { width: '100%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(135deg, #FF571A, #b83500)', minHeight: 8, transition: 'height 0.3s ease' },
    chartLabel: { fontSize: 12, fontWeight: 500, color: '#666460' },
    chartValue: { fontSize: 11, fontWeight: 600, color: '#b83500' },
    reviewCard: { background: '#ffffff', borderRadius: '1.5rem', padding: '18px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
    reviewName: { fontWeight: 600, fontSize: 15, color: '#393834' },
    reviewDate: { fontSize: 12, color: '#666460' },
    starFilled: { fontSize: 18, color: '#FFD54F' },
    reviewComment: { fontSize: 14, fontStyle: 'italic', color: '#666460', lineHeight: 1.5 },
    quickActionBtn: { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FF571A, #b83500)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'transform 0.15s' },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 },
  };

  return (
    <div style={st.page}>
      <div style={st.header}><span className="material-symbols-outlined" style={st.headerIcon}>storefront</span><h1 style={st.title}>Bang dieu khien doi tac</h1></div>
      <p style={st.venueName}>Velvet Bistro</p>
      <div style={st.statsRow}>{stats.map((s, i) => (<div key={i} style={st.statCard}><div style={st.statIconWrap}><span className="material-symbols-outlined" style={st.statIcon}>{s.icon}</span></div><div><div style={st.statValue}>{s.value}</div><div style={st.statLabel}>{s.label}</div></div></div>))}</div>
      <div style={st.twoCol}>
        <div style={st.section}><h2 style={st.sectionTitle}>Dat cho sap toi</h2>{bookings.map((b) => (<div key={b.id} style={st.bookingItem}><div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><div style={st.bookingTime}>{b.time}</div><div><div style={st.bookingGuest}>{b.guest}</div><div style={st.bookingParty}><span className="material-symbols-outlined" style={{ fontSize: 16, color: '#666460' }}>group</span>{b.party} khach</div></div></div><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={b.status === 'confirmed' ? st.badgeConfirmed : st.badgePending}>{b.status === 'confirmed' ? 'Xac nhan' : 'Cho duyet'}</span><button style={{ ...st.actionBtn, ...st.acceptBtn }} title="Xac nhan"><span className="material-symbols-outlined" style={{ fontSize: 18 }}>check</span></button><button style={{ ...st.actionBtn, ...st.rejectBtn }} title="Tu choi"><span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span></button></div></div>))}</div>
        <div style={st.section}><h2 style={st.sectionTitle}>Bieu do luot dat</h2><div style={st.chartContainer}><div style={st.chartBars}>{chartData.map((d, i) => (<div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 6 }}><div style={st.chartValue}>{d.value}</div><div style={{ ...st.chartBar, height: `${(d.value / maxChart) * 130}px` }} /><div style={st.chartLabel}>{d.day}</div></div>))}</div></div></div>
      </div>
      <div style={st.section}><h2 style={st.sectionTitle}>Danh gia gan day</h2>{reviews.map((r) => (<div key={r.id} style={st.reviewCard}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}><span style={st.reviewName}>{r.name}</span><span style={st.reviewDate}>{r.date}</span></div><div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>{[1,2,3,4,5].map((s) => (<span key={s} className={`material-symbols-outlined ${s <= r.rating ? 'filled' : ''}`} style={st.starFilled}>star</span>))}</div><p style={st.reviewComment}>{r.comment}</p></div>))}</div>
      <div style={st.section}><h2 style={st.sectionTitle}>Hanh dong nhanh</h2><div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{quickActions.map((a, i) => (<button key={i} style={st.quickActionBtn} onClick={() => navigate(a.path)} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>{a.icon}</span>{a.label}</button>))}</div></div>
    </div>
  );
};

export default PartnerDashboard;
