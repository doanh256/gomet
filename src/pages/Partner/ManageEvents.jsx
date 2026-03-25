import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageEvents = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const events = [
    { id: 1, name: 'Wine & Dine Night', date: '25/03/2026', time: '19:00 - 22:00', venue: 'Velvet Bistro - Tang 2', attendees: 28, maxAttendees: 40, status: 'upcoming', revenue: '3.500.000', avatars: ['NV', 'TH', 'LM', 'PD'] },
    { id: 2, name: 'Speed Dating - Singles Mixer', date: '22/03/2026', time: '18:00 - 21:00', venue: 'Velvet Bistro - Khu vuon', attendees: 36, maxAttendees: 36, status: 'ongoing', revenue: '5.400.000', avatars: ['MA', 'DT', 'LC', 'HN'] },
    { id: 3, name: 'Cooking Class Date', date: '28/03/2026', time: '17:00 - 20:00', venue: 'Velvet Bistro - Bep mo', attendees: 12, maxAttendees: 20, status: 'upcoming', revenue: '2.500.000', avatars: ['QA', 'BT'] },
    { id: 4, name: 'Jazz & Cocktails Evening', date: '15/03/2026', time: '20:00 - 23:00', venue: 'Velvet Bistro - San thuong', attendees: 45, maxAttendees: 50, status: 'ended', revenue: '8.100.000', avatars: ['KL', 'MT', 'NP', 'VH'] },
  ];
  const filters = [{ key: 'all', label: 'Tat ca' }, { key: 'upcoming', label: 'Sap dien ra' }, { key: 'ongoing', label: 'Dang dien ra' }, { key: 'ended', label: 'Da ket thuc' }];
  const filtered = activeFilter === 'all' ? events : events.filter(e => e.status === activeFilter);
  const statusConfig = {
    upcoming: { label: 'Sap dien ra', bg: 'rgba(255,181,158,0.15)', color: '#FFB59E', dot: false },
    ongoing: { label: 'Dang dien ra', bg: 'rgba(17,117,0,0.15)', color: '#117500', dot: true },
    ended: { label: 'Da ket thuc', bg: '#2A2A2A', color: '#E6BEB2', dot: false },
  };
  const gradients = ['linear-gradient(135deg, #FF571A, #FFB59E)', 'linear-gradient(135deg, #5a3028, #FFB59E)', 'linear-gradient(135deg, #353535, #FF571A)', 'linear-gradient(135deg, #FFB59E, #5a3028)'];

  const styles = {
    page: { minHeight: '100vh', background: '#131313', fontFamily: 'var(--font-body)', color: '#FDF9F3', padding: '24px', maxWidth: 1200, margin: '0 auto' },
    topRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
    header: { display: 'flex', alignItems: 'center', gap: 12 },
    headerIcon: { fontSize: 32, color: '#FFB59E' },
    title: { fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 700 },
    createBtn: { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'transform 0.15s' },
    filterChip: (active) => ({ padding: '8px 18px', borderRadius: '9999px', border: 'none', background: active ? '#FFB59E' : '#1C1B1B', color: active ? '#3A0B00' : '#E6BEB2', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }),
    eventCard: { display: 'flex', background: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden', marginBottom: 16, transition: 'box-shadow 0.2s' },
    eventImage: (gradient) => ({ width: 200, minHeight: 200, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }),
    eventImageIcon: { fontSize: 48, color: 'rgba(255,255,255,0.5)' },
    eventBody: { flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    eventName: { fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 700, marginBottom: 6, color: '#FDF9F3' },
    eventMeta: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#E6BEB2', marginBottom: 4 },
    metaIcon: { fontSize: 16, color: '#E6BEB2' },
    avatar: (index) => ({ width: 28, height: 28, borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: index > 0 ? -8 : 0, zIndex: 4 - index, position: 'relative' }),
    attendeeCount: { fontSize: 13, color: '#E6BEB2' },
    statusBadge: (status) => ({ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: '9999px', fontSize: 12, fontWeight: 600, background: statusConfig[status].bg, color: statusConfig[status].color }),
    pulsingDot: { width: 8, height: 8, borderRadius: '50%', background: '#117500', animation: 'pulse 1.5s infinite' },
    revenue: { fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, color: '#FFB59E' },
    revenueLabel: { fontSize: 11, color: '#E6BEB2' },
    actionBtn: (variant) => ({ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: '9999px', border: 'none', background: variant === 'error' ? 'rgba(255,87,26,0.15)' : '#2A2A2A', color: variant === 'error' ? '#FF571A' : '#FDF9F3', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'background 0.15s' }),
    emptyState: { textAlign: 'center', padding: '60px 20px', color: '#E6BEB2' },
    emptyIcon: { fontSize: 64, color: '#353535', marginBottom: 16 },
    pulseKeyframes: `@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } 100% { opacity: 1; transform: scale(1); } }`,
  };

  return (
    <div style={styles.page}>
      <style>{styles.pulseKeyframes}</style>
      <div style={styles.topRow}><div style={styles.header}><span aria-hidden="true" className="material-symbols-outlined" style={styles.headerIcon}>event</span><h1 style={styles.title}>Quan ly su kien</h1></div><button style={styles.createBtn} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>Tao su kien moi</button></div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>{filters.map((f) => (<button key={f.key} style={styles.filterChip(activeFilter === f.key)} onClick={() => setActiveFilter(f.key)}>{f.label}</button>))}</div>
      {filtered.length === 0 ? (<div style={styles.emptyState}><span aria-hidden="true" className="material-symbols-outlined" style={styles.emptyIcon}>event_busy</span><div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Khong co su kien nao</div><div style={{ fontSize: 14 }}>Khong tim thay su kien trong muc nay.</div></div>) : (
        filtered.map((event, idx) => (
          <div key={event.id} style={styles.eventCard}>
            <div style={styles.eventImage(gradients[idx % gradients.length])}><span aria-hidden="true" className="material-symbols-outlined" style={styles.eventImageIcon}>celebration</span></div>
            <div style={styles.eventBody}>
              <div><div style={styles.eventName}>{event.name}</div><div style={styles.eventMeta}><span aria-hidden="true" className="material-symbols-outlined" style={styles.metaIcon}>calendar_today</span>{event.date} | {event.time}</div><div style={styles.eventMeta}><span aria-hidden="true" className="material-symbols-outlined" style={styles.metaIcon}>location_on</span>{event.venue}</div></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={styles.metaIcon}>group</span><div style={{ display: 'flex', marginLeft: 4 }}>{event.avatars.map((a, i) => (<div key={i} style={styles.avatar(i)}>{a}</div>))}</div><span style={styles.attendeeCount}>{event.attendees}/{event.maxAttendees}</span></div>
                <span style={styles.statusBadge(event.status)}>{statusConfig[event.status].dot && <span style={styles.pulsingDot} />}{statusConfig[event.status].label}</span>
                <div><div style={styles.revenue}>{event.revenue} VND</div><div style={styles.revenueLabel}>Doanh thu</div></div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}><button style={styles.actionBtn('default')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>Chinh sua</button><button style={styles.actionBtn('default')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>visibility</span>Xem chi tiet</button>{event.status !== 'ended' && (<button style={styles.actionBtn('error')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>cancel</span>Huy</button>)}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageEvents;
