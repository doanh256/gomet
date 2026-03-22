import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageEvents = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const events = [
    {
      id: 1,
      name: 'Wine & Dine Night',
      date: '25/03/2026',
      time: '19:00 - 22:00',
      venue: 'Velvet Bistro - Tang 2',
      attendees: 28,
      maxAttendees: 40,
      status: 'upcoming',
      revenue: '3.500.000',
      avatars: ['NV', 'TH', 'LM', 'PD'],
    },
    {
      id: 2,
      name: 'Speed Dating - Singles Mixer',
      date: '22/03/2026',
      time: '18:00 - 21:00',
      venue: 'Velvet Bistro - Khu vuon',
      attendees: 36,
      maxAttendees: 36,
      status: 'ongoing',
      revenue: '5.400.000',
      avatars: ['MA', 'DT', 'LC', 'HN'],
    },
    {
      id: 3,
      name: 'Cooking Class Date',
      date: '28/03/2026',
      time: '17:00 - 20:00',
      venue: 'Velvet Bistro - Bep mo',
      attendees: 12,
      maxAttendees: 20,
      status: 'upcoming',
      revenue: '2.500.000',
      avatars: ['QA', 'BT'],
    },
    {
      id: 4,
      name: 'Jazz & Cocktails Evening',
      date: '15/03/2026',
      time: '20:00 - 23:00',
      venue: 'Velvet Bistro - San thuong',
      attendees: 45,
      maxAttendees: 50,
      status: 'ended',
      revenue: '8.100.000',
      avatars: ['KL', 'MT', 'NP', 'VH'],
    },
  ];

  const filters = [
    { key: 'all', label: 'Tat ca' },
    { key: 'upcoming', label: 'Sap dien ra' },
    { key: 'ongoing', label: 'Dang dien ra' },
    { key: 'ended', label: 'Da ket thuc' },
  ];

  const filtered = activeFilter === 'all' ? events : events.filter(e => e.status === activeFilter);

  const statusConfig = {
    upcoming: { label: 'Sap dien ra', bg: 'var(--primary-fixed)', color: 'var(--primary)', dot: false },
    ongoing: { label: 'Dang dien ra', bg: '#e8f5e9', color: '#2e7d32', dot: true },
    ended: { label: 'Da ket thuc', bg: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', dot: false },
  };

  const gradients = [
    'linear-gradient(135deg, #ae2f34, #ff6b6b)',
    'linear-gradient(135deg, #894e45, #cf8a7f)',
    'linear-gradient(135deg, #5f5e5e, #ae2f34)',
    'linear-gradient(135deg, #ff6b6b, #894e45)',
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
    topRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    headerIcon: {
      fontSize: 32,
      color: 'var(--primary)',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 700,
    },
    createBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 24px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.15s',
    },
    filterRow: {
      display: 'flex',
      gap: 10,
      marginBottom: 24,
    },
    filterChip: (active) => ({
      padding: '8px 18px',
      borderRadius: 'var(--radius-full)',
      border: active ? 'none' : '1px solid var(--outline-variant)',
      background: active ? 'var(--primary)' : 'var(--surface-container-lowest)',
      color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.15s',
    }),
    eventCard: {
      display: 'flex',
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
      marginBottom: 16,
      transition: 'box-shadow 0.2s',
    },
    eventImage: (gradient) => ({
      width: 200,
      minHeight: 200,
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    eventImageIcon: {
      fontSize: 48,
      color: 'rgba(255,255,255,0.5)',
    },
    eventBody: {
      flex: 1,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    eventName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 6,
      color: 'var(--on-surface)',
    },
    eventMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 4,
    },
    metaIcon: {
      fontSize: 16,
      color: 'var(--on-surface-variant)',
    },
    eventMiddle: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      marginTop: 12,
      marginBottom: 12,
    },
    attendeeSection: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    avatarStack: {
      display: 'flex',
      marginLeft: 4,
    },
    avatar: (index) => ({
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontSize: 10,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid var(--surface-container-lowest)',
      marginLeft: index > 0 ? -8 : 0,
      zIndex: 4 - index,
      position: 'relative',
    }),
    attendeeCount: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    statusBadge: (status) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 600,
      background: statusConfig[status].bg,
      color: statusConfig[status].color,
    }),
    pulsingDot: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#2e7d32',
      animation: 'pulse 1.5s infinite',
    },
    revenue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--primary)',
    },
    revenueLabel: {
      fontSize: 11,
      color: 'var(--on-surface-variant)',
    },
    eventActions: {
      display: 'flex',
      gap: 8,
      marginTop: 4,
    },
    actionBtn: (variant) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      borderRadius: 'var(--radius-full)',
      border: variant === 'error' ? '1px solid var(--error)' : '1px solid var(--outline-variant)',
      background: variant === 'error' ? 'var(--error-container)' : 'var(--surface-container-low)',
      color: variant === 'error' ? 'var(--error)' : 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background 0.15s',
    }),
    actionIcon: {
      fontSize: 16,
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: 'var(--on-surface-variant)',
    },
    emptyIcon: {
      fontSize: 64,
      color: 'var(--outline-variant)',
      marginBottom: 16,
    },
    emptyTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 14,
    },
    pulseKeyframes: `
      @keyframes pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.3); }
        100% { opacity: 1; transform: scale(1); }
      }
    `,
  };

  return (
    <div style={styles.page}>
      <style>{styles.pulseKeyframes}</style>

      <div style={styles.topRow}>
        <div style={styles.header}>
          <span className="material-symbols-outlined" style={styles.headerIcon}>event</span>
          <h1 style={styles.title}>Quan ly su kien</h1>
        </div>
        <button
          style={styles.createBtn}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
          Tao su kien moi
        </button>
      </div>

      <div style={styles.filterRow}>
        {filters.map((f) => (
          <button
            key={f.key}
            style={styles.filterChip(activeFilter === f.key)}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={styles.emptyState}>
          <span className="material-symbols-outlined" style={styles.emptyIcon}>event_busy</span>
          <div style={styles.emptyTitle}>Khong co su kien nao</div>
          <div style={styles.emptyText}>Khong tim thay su kien trong muc nay.</div>
        </div>
      ) : (
        filtered.map((event, idx) => (
          <div
            key={event.id}
            style={styles.eventCard}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--editorial-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
          >
            <div style={styles.eventImage(gradients[idx % gradients.length])}>
              <span className="material-symbols-outlined" style={styles.eventImageIcon}>celebration</span>
            </div>
            <div style={styles.eventBody}>
              <div>
                <div style={styles.eventName}>{event.name}</div>
                <div style={styles.eventMeta}>
                  <span className="material-symbols-outlined" style={styles.metaIcon}>calendar_today</span>
                  {event.date} | {event.time}
                </div>
                <div style={styles.eventMeta}>
                  <span className="material-symbols-outlined" style={styles.metaIcon}>location_on</span>
                  {event.venue}
                </div>
              </div>

              <div style={styles.eventMiddle}>
                <div style={styles.attendeeSection}>
                  <span className="material-symbols-outlined" style={styles.metaIcon}>group</span>
                  <div style={styles.avatarStack}>
                    {event.avatars.map((a, i) => (
                      <div key={i} style={styles.avatar(i)}>{a}</div>
                    ))}
                  </div>
                  <span style={styles.attendeeCount}>{event.attendees}/{event.maxAttendees}</span>
                </div>
                <span style={styles.statusBadge(event.status)}>
                  {statusConfig[event.status].dot && <span style={styles.pulsingDot} />}
                  {statusConfig[event.status].label}
                </span>
                <div>
                  <div style={styles.revenue}>{event.revenue} VND</div>
                  <div style={styles.revenueLabel}>Doanh thu</div>
                </div>
              </div>

              <div style={styles.eventActions}>
                <button style={styles.actionBtn('default')}>
                  <span className="material-symbols-outlined" style={styles.actionIcon}>edit</span>
                  Chinh sua
                </button>
                <button style={styles.actionBtn('default')}>
                  <span className="material-symbols-outlined" style={styles.actionIcon}>visibility</span>
                  Xem chi tiet
                </button>
                {event.status !== 'ended' && (
                  <button style={styles.actionBtn('error')}>
                    <span className="material-symbols-outlined" style={styles.actionIcon}>cancel</span>
                    Huy
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageEvents;
