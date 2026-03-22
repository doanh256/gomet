import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestManager = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Tong VIP', value: '128', icon: 'stars' },
    { label: 'Check-in hom nay', value: '12', icon: 'login' },
    { label: 'Chi tieu TB', value: '2.5M VND', icon: 'payments' },
  ];

  const guests = [
    { id: 1, name: 'Nguyen Minh Tuan', phone: '****1234', visits: 15, spent: '12.5M', tier: 'Platinum', lastVisit: '20/03/2026' },
    { id: 2, name: 'Tran Thu Hang', phone: '****5678', visits: 12, spent: '9.8M', tier: 'Gold', lastVisit: '19/03/2026' },
    { id: 3, name: 'Le Quang Huy', phone: '****9012', visits: 10, spent: '8.2M', tier: 'Gold', lastVisit: '18/03/2026' },
    { id: 4, name: 'Pham Ngoc Anh', phone: '****3456', visits: 8, spent: '6.5M', tier: 'Silver', lastVisit: '17/03/2026' },
    { id: 5, name: 'Vo Thanh Dat', phone: '****7890', visits: 20, spent: '18.3M', tier: 'Platinum', lastVisit: '20/03/2026' },
    { id: 6, name: 'Hoang Mai Linh', phone: '****2345', visits: 6, spent: '4.8M', tier: 'Silver', lastVisit: '15/03/2026' },
    { id: 7, name: 'Dang Duc Manh', phone: '****6789', visits: 14, spent: '11.2M', tier: 'Gold', lastVisit: '19/03/2026' },
    { id: 8, name: 'Bui Thuy Tien', phone: '****0123', visits: 5, spent: '3.9M', tier: 'Silver', lastVisit: '14/03/2026' },
  ];

  const tiers = [
    { name: 'Platinum', count: 15, color: 'var(--primary-gradient)', textColor: 'var(--on-primary)', benefits: 'Giam 20%, Uu tien dat cho, Qua sinh nhat' },
    { name: 'Gold', count: 45, color: '#f59e0b', textColor: '#fff', benefits: 'Giam 15%, Do uong mien phi, Uu dai su kien' },
    { name: 'Silver', count: 68, color: '#9ca3af', textColor: '#fff', benefits: 'Giam 10%, Tich diem x2' },
  ];

  const getTierStyle = (tier) => {
    if (tier === 'Platinum') return { background: 'var(--primary-gradient)', color: 'var(--on-primary)' };
    if (tier === 'Gold') return { background: '#f59e0b', color: '#fff' };
    return { background: '#9ca3af', color: '#fff' };
  };

  const getInitial = (name) => name.split(' ').pop()[0];

  const filteredGuests = guests.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.phone.includes(searchQuery)
  );

  const s = {
    page: {
      minHeight: '100vh',
      background: 'var(--surface)',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      padding: '24px',
      maxWidth: 1200,
      margin: '0 auto',
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
    },
    headerIcon: {
      fontSize: 32,
      background: 'var(--primary-gradient)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
    },
    subtitle: {
      color: 'var(--on-surface-variant)',
      fontSize: 14,
      marginBottom: 24,
    },
    searchRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 24,
      flexWrap: 'wrap',
    },
    searchBox: {
      flex: 1,
      minWidth: 200,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-full)',
      padding: '10px 20px',
      border: '1.5px solid var(--outline-variant)',
    },
    searchInput: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      flex: 1,
    },
    gradientBtn: {
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      whiteSpace: 'nowrap',
    },
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 16,
      marginBottom: 28,
    },
    statCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    statIcon: {
      fontSize: 28,
      color: 'var(--primary)',
      background: 'var(--primary-fixed)',
      borderRadius: 'var(--radius)',
      padding: 8,
    },
    statValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
    },
    statLabel: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    guestList: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden',
      marginBottom: 28,
    },
    guestRow: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 24px',
      gap: 16,
      borderBottom: '1px solid var(--outline-variant)',
      flexWrap: 'wrap',
      transition: 'background 0.15s',
    },
    avatar: (tier) => ({
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 16,
      flexShrink: 0,
      ...getTierStyle(tier),
    }),
    guestInfo: {
      flex: 1,
      minWidth: 140,
    },
    guestName: {
      fontWeight: 600,
      fontSize: 15,
    },
    guestPhone: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    badge: {
      background: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--on-surface)',
      whiteSpace: 'nowrap',
    },
    spentText: {
      fontWeight: 700,
      fontSize: 14,
      minWidth: 60,
      textAlign: 'right',
    },
    tierChip: (tier) => ({
      padding: '4px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: 'nowrap',
      ...getTierStyle(tier),
    }),
    lastVisit: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      minWidth: 80,
    },
    guestActions: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
    smallBtn: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '6px 14px',
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    textLink: {
      background: 'none',
      border: 'none',
      color: 'var(--primary)',
      fontWeight: 600,
      fontSize: 13,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      padding: 0,
    },
    tierSection: {
      marginBottom: 24,
    },
    tierSectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    tierGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 16,
    },
    tierCard: (bgColor) => ({
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      color: '#fff',
      background: bgColor,
      boxShadow: 'var(--card-shadow)',
    }),
    tierName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 800,
      marginBottom: 8,
    },
    tierCount: {
      fontSize: 32,
      fontFamily: 'var(--font-headline)',
      fontWeight: 800,
      marginBottom: 8,
    },
    tierBenefits: {
      fontSize: 13,
      opacity: 0.9,
      lineHeight: 1.5,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--primary)',
      fontWeight: 600,
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      marginBottom: 16,
      padding: 0,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate('/partner')}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.headerRow}>
        <span className="material-symbols-outlined" style={s.headerIcon}>stars</span>
        <h1 style={s.title}>Quan ly khach VIP</h1>
      </div>
      <p style={s.subtitle}>Quan ly danh sach khach hang than thiet</p>

      <div style={s.searchRow}>
        <div style={s.searchBox}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>search</span>
          <input
            style={s.searchInput}
            placeholder="Tim khach hang..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button style={s.gradientBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person_add</span>
          Them khach VIP
        </button>
      </div>

      <div style={s.statsRow}>
        {stats.map((st, i) => (
          <div key={i} style={s.statCard}>
            <span className="material-symbols-outlined" style={s.statIcon}>{st.icon}</span>
            <div>
              <div style={s.statValue}>{st.value}</div>
              <div style={s.statLabel}>{st.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={s.guestList}>
        {filteredGuests.map((g, i) => (
          <div key={g.id} style={{ ...s.guestRow, background: i % 2 === 0 ? 'transparent' : 'var(--surface-container-low)' }}>
            <div style={s.avatar(g.tier)}>{getInitial(g.name)}</div>
            <div style={s.guestInfo}>
              <div style={s.guestName}>{g.name}</div>
              <div style={s.guestPhone}>{g.phone}</div>
            </div>
            <span style={s.badge}>{g.visits} lan</span>
            <span style={s.spentText}>{g.spent}</span>
            <span style={s.tierChip(g.tier)}>{g.tier}</span>
            <span style={s.lastVisit}>{g.lastVisit}</span>
            <div style={s.guestActions}>
              <button style={s.smallBtn}>Gui uu dai</button>
              <button style={s.textLink}>Xem</button>
            </div>
          </div>
        ))}
      </div>

      <div style={s.tierSection}>
        <div style={s.tierSectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>military_tech</span>
          Phan loai khach
        </div>
        <div style={s.tierGrid}>
          {tiers.map((t, i) => (
            <div key={i} style={s.tierCard(typeof t.color === 'string' && t.color.includes('gradient') ? t.color : t.color)}>
              <div style={s.tierName}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6 }}>
                  {t.name === 'Platinum' ? 'diamond' : t.name === 'Gold' ? 'workspace_premium' : 'shield'}
                </span>
                {t.name}
              </div>
              <div style={s.tierCount}>{t.count}</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>thanh vien</div>
              <div style={s.tierBenefits}>{t.benefits}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestManager;
