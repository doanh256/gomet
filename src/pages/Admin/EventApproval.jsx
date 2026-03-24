import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventApproval = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('pending');

  const initialEvents = [
    { id: 1, name: 'Lop nau an Italian', host: 'Nguyen Minh Anh', hostAvatar: 'A', date: '28/03/2026', time: '18:00', venue: 'Kitchen Studio Q1', attendees: 20, category: 'Am thuc', price: '200.000 VND/nguoi', submitted: '2 gio truoc', status: 'pending' },
    { id: 2, name: 'Wine Tasting Thu 7', host: 'Tran Duc Huy', hostAvatar: 'H', date: '29/03/2026', time: '19:30', venue: 'The Wine Bar Q3', attendees: 30, category: 'Am thuc', price: '350.000 VND/nguoi', submitted: '3 gio truoc', status: 'pending' },
    { id: 3, name: 'Trieu lam tranh cuoi tuan', host: 'Le Bich Ngoc', hostAvatar: 'N', date: '30/03/2026', time: '10:00', venue: 'Gallery 42 Q2', attendees: 50, category: 'Nghe thuat', price: 'Mien phi', submitted: '5 gio truoc', status: 'pending' },
    { id: 4, name: 'Chay bo sang Landmark', host: 'Pham Hoang Long', hostAvatar: 'L', date: '27/03/2026', time: '06:00', venue: 'Landmark 81', attendees: 40, category: 'The thao', price: 'Mien phi', submitted: '8 gio truoc', status: 'pending' },
    { id: 5, name: 'Board game & Coffee', host: 'Vo Thanh Tam', hostAvatar: 'T', date: '28/03/2026', time: '14:00', venue: 'Cong Cafe Nguyen Hue', attendees: 16, category: 'Xa hoi', price: '100.000 VND/nguoi', submitted: '1 ngay truoc', status: 'pending' },
  ];

  const [events, setEvents] = useState(initialEvents);
  const handleAction = (id, action) => { setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status: action } : e))); };

  const filters = [{ key: 'pending', label: 'Cho duyet' }, { key: 'approved', label: 'Da duyet' }, { key: 'rejected', label: 'Tu choi' }];
  const filtered = events.filter((e) => e.status === activeFilter);
  const approvedToday = events.filter((e) => e.status === 'approved').length;
  const rejectedToday = events.filter((e) => e.status === 'rejected').length;
  const pendingCount = events.filter((e) => e.status === 'pending').length;

  const catColor = (cat) => {
    switch (cat) {
      case 'Am thuc': return { bg: 'rgba(255,87,26,0.15)', text: '#FF571A' };
      case 'Nghe thuat': return { bg: 'rgba(230,190,178,0.15)', text: '#E6BEB2' };
      case 'Xa hoi': return { bg: 'rgba(17,117,0,0.15)', text: '#117500' };
      case 'The thao': return { bg: 'rgba(255,181,158,0.15)', text: '#FFB59E' };
      default: return { bg: '#2A2A2A', text: '#E6BEB2' };
    }
  };

  const s = {
    page: { padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-body)', color: '#FDF9F3' },
    header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' },
    headerIcon: { fontSize: '32px', color: '#FFB59E' },
    title: { fontFamily: 'var(--font-headline)', fontSize: '28px', fontWeight: 700, color: '#FDF9F3' },
    badge: { marginLeft: '8px', background: '#FF571A', color: '#3A0B00', borderRadius: '9999px', padding: '2px 10px', fontSize: '13px', fontWeight: 700 },
    filterRow: { display: 'flex', gap: '8px', marginBottom: '24px' },
    filterChip: (active) => ({ padding: '8px 20px', borderRadius: '9999px', border: 'none', background: active ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#1C1B1B', color: active ? '#3A0B00' : '#FDF9F3', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }),
    eventList: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' },
    eventCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px', display: 'flex', gap: '20px', alignItems: 'flex-start' },
    eventImage: (cat) => { const c = catColor(cat); return { width: '120px', height: '120px', borderRadius: '1.5rem', background: `linear-gradient(135deg, ${c.text}33, ${c.text}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }; },
    eventImgIcon: (cat) => ({ fontSize: '40px', color: catColor(cat).text, opacity: 0.5 }),
    eventBody: { flex: 1, minWidth: 0 },
    eventName: { fontFamily: 'var(--font-headline)', fontSize: '17px', fontWeight: 600, color: '#FDF9F3', marginBottom: '6px' },
    hostRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' },
    hostAvatar: { width: '24px', height: '24px', borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600 },
    hostName: { fontSize: '13px', color: '#E6BEB2' },
    detailRow: { display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' },
    detailItem: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#E6BEB2' },
    detailIcon: { fontSize: '16px', color: '#E6BEB2' },
    chipRow: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' },
    catChip: (cat) => { const c = catColor(cat); return { display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', background: c.bg, color: c.text, fontSize: '12px', fontWeight: 600 }; },
    priceChip: { fontSize: '13px', fontWeight: 600, color: '#FFB59E' },
    submittedText: { fontSize: '12px', color: '#E6BEB2', marginBottom: '12px' },
    actionRow: { display: 'flex', gap: '8px' },
    approveBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 20px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' },
    rejectBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 20px', borderRadius: '9999px', border: 'none', background: 'rgba(255,87,26,0.15)', color: '#FF571A', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' },
    viewBtn: { padding: '8px 16px', borderRadius: '9999px', border: 'none', background: 'transparent', color: '#FFB59E', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' },
    smallIcon: { fontSize: '16px' },
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' },
    summaryCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px', textAlign: 'center' },
    summaryValue: { fontFamily: 'var(--font-headline)', fontSize: '28px', fontWeight: 700, color: '#FDF9F3' },
    summaryLabel: { fontSize: '13px', color: '#E6BEB2', marginTop: '4px' },
    section: { marginBottom: '32px' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 600, color: '#FDF9F3', marginBottom: '16px' },
    emptyState: { padding: '40px', textAlign: 'center', color: '#E6BEB2', fontSize: '14px', background: '#1C1B1B', borderRadius: '1.5rem' },
  };

  return (
    <div style={s.page}>
      <div style={s.header}><span className="material-symbols-outlined" style={s.headerIcon}>event_available</span><h1 style={s.title}>Duyet su kien</h1>{pendingCount > 0 && <span style={s.badge}>{pendingCount}</span>}</div>
      <div style={s.filterRow}>{filters.map((f) => (<button key={f.key} style={s.filterChip(activeFilter === f.key)} onClick={() => setActiveFilter(f.key)}>{f.label}</button>))}</div>
      <div style={s.eventList}>
        {filtered.length === 0 && <div style={s.emptyState}>Khong co su kien nao trong danh sach nay.</div>}
        {filtered.map((ev) => (
          <div key={ev.id} style={s.eventCard}>
            <div style={s.eventImage(ev.category)}><span className="material-symbols-outlined" style={s.eventImgIcon(ev.category)}>image</span></div>
            <div style={s.eventBody}>
              <div style={s.eventName}>{ev.name}</div>
              <div style={s.hostRow}><div style={s.hostAvatar}>{ev.hostAvatar}</div><span style={s.hostName}>{ev.host}</span></div>
              <div style={s.detailRow}>
                <div style={s.detailItem}><span className="material-symbols-outlined" style={s.detailIcon}>calendar_today</span>{ev.date} - {ev.time}</div>
                <div style={s.detailItem}><span className="material-symbols-outlined" style={s.detailIcon}>location_on</span>{ev.venue}</div>
                <div style={s.detailItem}><span className="material-symbols-outlined" style={s.detailIcon}>group</span>{ev.attendees} nguoi</div>
              </div>
              <div style={s.chipRow}><span style={s.catChip(ev.category)}>{ev.category}</span><span style={s.priceChip}>{ev.price}</span></div>
              <div style={s.submittedText}><span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>schedule</span>Gui {ev.submitted}</div>
              {ev.status === 'pending' && (<div style={s.actionRow}><button style={s.approveBtn} onClick={() => handleAction(ev.id, 'approved')}><span className="material-symbols-outlined" style={s.smallIcon}>check</span>Duyet</button><button style={s.rejectBtn} onClick={() => handleAction(ev.id, 'rejected')}><span className="material-symbols-outlined" style={s.smallIcon}>close</span>Tu choi</button><button style={s.viewBtn}>Xem chi tiet</button></div>)}
              {ev.status === 'approved' && (<div style={{ color: '#117500', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>Da duyet</div>)}
              {ev.status === 'rejected' && (<div style={{ color: '#FF571A', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cancel</span>Da tu choi</div>)}
            </div>
          </div>
        ))}
      </div>
      <div style={s.section}><h2 style={s.sectionTitle}>Thong ke duyet</h2><div style={s.summaryGrid}><div style={s.summaryCard}><div style={{ ...s.summaryValue, color: '#117500' }}>{approvedToday}</div><div style={s.summaryLabel}>Da duyet hom nay</div></div><div style={s.summaryCard}><div style={{ ...s.summaryValue, color: '#FF571A' }}>{rejectedToday}</div><div style={s.summaryLabel}>Tu choi hom nay</div></div><div style={s.summaryCard}><div style={s.summaryValue}>15 phut</div><div style={s.summaryLabel}>Thoi gian duyet TB</div></div></div></div>
    </div>
  );
};

export default EventApproval;
