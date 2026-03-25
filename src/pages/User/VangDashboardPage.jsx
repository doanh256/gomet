import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryData = [
  { label: 'Ăn uống', icon: 'restaurant', points: 4820, color: '#FF571A' },
  { label: 'Đánh giá', icon: 'rate_review', points: 3200, color: '#FFB59E' },
  { label: 'Thử thách', icon: 'emoji_events', points: 2680, color: '#FFD54F' },
  { label: 'Xã hội', icon: 'groups', points: 1750, color: '#117500' },
];

const monthlyData = [
  { month: 'T10', value: 820 },
  { month: 'T11', value: 1450 },
  { month: 'T12', value: 980 },
  { month: 'T1', value: 2100 },
  { month: 'T2', value: 1780 },
  { month: 'T3', value: 3320 },
];

const regionBadges = [
  { name: 'Tây Bắc', earned: true, color: '#8BC34A' },
  { name: 'Đông Bắc', earned: false, color: '#4CAF50' },
  { name: 'Sông Hồng', earned: true, color: '#FF9800' },
  { name: 'Trung Bộ', earned: true, color: '#2196F3' },
  { name: 'Nam Trung', earned: false, color: '#FF5722' },
  { name: 'Tây Nguyên', earned: false, color: '#795548' },
  { name: 'Đông Nam Bộ', earned: true, color: '#E91E63' },
  { name: 'Tây Nam Bộ', earned: true, color: '#00BCD4' },
];

const rewardCards = [
  { id: 1, icon: 'confirmation_number', title: 'Voucher 100k', cost: 2000, desc: 'Giảm giá tại nhà hàng đối tác' },
  { id: 2, icon: 'workspace_premium', title: 'Khung VIP 7 ngày', cost: 1500, desc: 'Nổi bật hồ sơ của bạn' },
  { id: 3, icon: 'local_activity', title: 'Vé Secret Table', cost: 5000, desc: 'Tham gia sự kiện độc quyền' },
];

const transactions = [
  { id: 1, icon: 'restaurant', label: 'Ăn tại Phở Thìn', points: '+30', date: '24/03', type: 'earn' },
  { id: 2, icon: 'rate_review', label: 'Đánh giá Bún Chả', points: '+15', date: '23/03', type: 'earn' },
  { id: 3, icon: 'redeem', label: 'Đổi Voucher 50k', points: '-1000', date: '22/03', type: 'spend' },
  { id: 4, icon: 'emoji_events', label: 'Hoàn thành thử thách', points: '+250', date: '21/03', type: 'earn' },
  { id: 5, icon: 'groups', label: 'Mời bạn bè', points: '+100', date: '20/03', type: 'earn' },
  { id: 6, icon: 'restaurant', label: 'Ăn tại Cơm Tấm Bà Ghiền', points: '+20', date: '19/03', type: 'earn' },
];

const VangDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const maxMonthly = Math.max(...monthlyData.map(d => d.value));

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface, #FDF9F3)',
      overflowY: 'auto',
      padding: '40px 24px 100px',
      maxWidth: 600,
      margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)',
      color: 'var(--on-surface, #2A2A2A)',
    },
    backBtn: {
      background: 'none', border: 'none', cursor: 'pointer',
      color: 'var(--on-surface-variant, #6B6B6B)',
      display: 'flex', alignItems: 'center', gap: 4,
      fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 24, padding: 0,
    },
    tierBadge: {
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 12, padding: '20px 24px', borderRadius: '1.5rem',
      background: 'linear-gradient(135deg, #FFD54F 0%, #F57C00 100%)',
      marginBottom: 28, position: 'relative', overflow: 'hidden',
    },
    tierShine: {
      position: 'absolute', top: -30, right: -30, width: 120, height: 120,
      borderRadius: '50%', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none',
    },
    tierIcon: { fontSize: 40, color: '#1a1a1a', zIndex: 1 },
    tierInfo: { zIndex: 1 },
    tierLabel: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'rgba(26,26,26,0.7)', marginBottom: 2,
    },
    tierPoints: {
      fontFamily: 'var(--font-headline)', fontSize: 32,
      fontWeight: 800, color: '#1a1a1a',
    },
    tierUnit: { fontSize: 14, fontWeight: 600, marginLeft: 4 },
    tabs: {
      display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto',
    },
    tab: (active) => ({
      padding: '8px 18px', borderRadius: '9999px', border: 'none',
      fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
      background: active ? '#FF571A' : 'var(--surface-container, #F0EBE3)',
      color: active ? '#FDF9F3' : 'var(--on-surface-variant, #6B6B6B)',
      whiteSpace: 'nowrap',
    }),
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#FF571A' },
    catGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 },
    catCard: (color) => ({
      padding: '18px 16px', borderRadius: '1.5rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
      border: `2px solid ${color}20`,
    }),
    catIcon: (color) => ({ fontSize: 28, color, marginBottom: 8, display: 'block' }),
    catLabel: { fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 4 },
    catPoints: {
      fontFamily: 'var(--font-headline)', fontSize: 22,
      fontWeight: 800, color: 'var(--on-surface)',
    },
    mapSection: { marginBottom: 32 },
    badgeGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
    },
    badge: (earned, color) => ({
      textAlign: 'center', padding: '14px 6px', borderRadius: '1rem',
      backgroundColor: earned ? `${color}15` : 'var(--surface-container, #F0EBE3)',
      border: earned ? `2px solid ${color}` : '2px solid transparent',
      opacity: earned ? 1 : 0.5,
    }),
    badgeIcon: (earned, color) => ({
      fontSize: 24, color: earned ? color : '#999', display: 'block', marginBottom: 4,
    }),
    badgeName: { fontSize: 10, fontWeight: 600, color: 'var(--on-surface-variant)' },
    chartSection: { marginBottom: 32 },
    chartBars: {
      display: 'flex', alignItems: 'flex-end', gap: 10, height: 140,
      padding: '0 4px',
    },
    barCol: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
    bar: (h) => ({
      width: '100%', height: `${h}%`, borderRadius: '8px 8px 4px 4px',
      background: 'linear-gradient(180deg, #FF571A, #FFB59E)',
      minHeight: 8, transition: 'height 0.5s ease',
    }),
    barLabel: { fontSize: 11, color: 'var(--on-surface-variant)', fontWeight: 600 },
    barValue: { fontSize: 10, color: '#FF571A', fontWeight: 700 },
    rewardSection: { marginBottom: 32 },
    rewardScroll: {
      display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8,
    },
    rewardCard: {
      minWidth: 180, padding: '20px 16px', borderRadius: '1.5rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
      flexShrink: 0,
    },
    rewardIcon: { fontSize: 32, color: '#FFD54F', marginBottom: 10, display: 'block' },
    rewardTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700,
      marginBottom: 4, color: 'var(--on-surface)',
    },
    rewardDesc: { fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 12 },
    rewardCost: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '6px 12px', borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FFD54F, #F57C00)',
      fontSize: 12, fontWeight: 700, color: '#1a1a1a', cursor: 'pointer',
      border: 'none', fontFamily: 'var(--font-body)',
    },
    txList: { display: 'flex', flexDirection: 'column', gap: 10 },
    txItem: {
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', borderRadius: '1rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
    },
    txIconWrap: (type) => ({
      width: 42, height: 42, borderRadius: '50%',
      backgroundColor: type === 'earn' ? '#11750015' : '#FF571A15',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }),
    txIconEl: (type) => ({ fontSize: 20, color: type === 'earn' ? '#117500' : '#FF571A' }),
    txInfo: { flex: 1 },
    txLabel: { fontSize: 14, fontWeight: 600, color: 'var(--on-surface)', marginBottom: 2 },
    txDate: { fontSize: 11, color: 'var(--on-surface-variant)' },
    txPoints: (type) => ({
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 800,
      color: type === 'earn' ? '#117500' : '#FF571A',
    }),
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lại
      </button>

      {/* Tier Badge */}
      <div style={s.tierBadge}>
        <div style={s.tierShine} />
        <span aria-hidden="true" className="material-symbols-outlined" style={s.tierIcon}>diamond</span>
        <div style={s.tierInfo}>
          <div style={s.tierLabel}>VÀNG</div>
          <div style={s.tierPoints}>12,450<span style={s.tierUnit}>VÀNG</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {['overview', 'rewards', 'history'].map(tab => (
          <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
            {tab === 'overview' ? 'Tổng quan' : tab === 'rewards' ? 'Đổi thưởng' : 'Lịch sử'}
          </button>
        ))}
      </div>

      {(activeTab === 'overview' || activeTab === 'rewards') && (
        <>
          {/* Culinary Journey */}
          <div style={s.sectionTitle}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>route</span>
            Hành trình ẩm thực
          </div>
          <div style={s.catGrid}>
            {categoryData.map(cat => (
              <div key={cat.label} style={s.catCard(cat.color)}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.catIcon(cat.color)}>{cat.icon}</span>
                <div style={s.catLabel}>{cat.label}</div>
                <div style={s.catPoints}>{cat.points.toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Regional Footprint */}
          <div style={s.mapSection}>
            <div style={s.sectionTitle}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>map</span>
              Dấu chân vùng miền
            </div>
            <div style={s.badgeGrid}>
              {regionBadges.map(b => (
                <div key={b.name} style={s.badge(b.earned, b.color)}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={s.badgeIcon(b.earned, b.color)}>
                    {b.earned ? 'verified' : 'lock'}
                  </span>
                  <div style={s.badgeName}>{b.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Velocity */}
          <div style={s.chartSection}>
            <div style={s.sectionTitle}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>trending_up</span>
              Tốc độ hàng tháng
            </div>
            <div style={s.chartBars}>
              {monthlyData.map(d => (
                <div key={d.month} style={s.barCol}>
                  <div style={s.barValue}>{d.value}</div>
                  <div style={s.bar((d.value / maxMonthly) * 100)} />
                  <div style={s.barLabel}>{d.month}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {(activeTab === 'overview' || activeTab === 'rewards') && (
        <div style={s.rewardSection}>
          <div style={s.sectionTitle}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>redeem</span>
            Đổi thưởng
          </div>
          <div style={s.rewardScroll}>
            {rewardCards.map(r => (
              <div key={r.id} style={s.rewardCard}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.rewardIcon}>{r.icon}</span>
                <div style={s.rewardTitle}>{r.title}</div>
                <div style={s.rewardDesc}>{r.desc}</div>
                <button style={s.rewardCost}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>toll</span>
                  {r.cost.toLocaleString()} Vàng
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'overview' || activeTab === 'history') && (
        <div>
          <div style={s.sectionTitle}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>receipt_long</span>
            Lịch sử giao dịch
          </div>
          <div style={s.txList}>
            {transactions.map(tx => (
              <div key={tx.id} style={s.txItem}>
                <div style={s.txIconWrap(tx.type)}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={s.txIconEl(tx.type)}>{tx.icon}</span>
                </div>
                <div style={s.txInfo}>
                  <div style={s.txLabel}>{tx.label}</div>
                  <div style={s.txDate}>{tx.date}</div>
                </div>
                <div style={s.txPoints(tx.type)}>{tx.points}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VangDashboardPage;
