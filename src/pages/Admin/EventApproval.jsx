import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventApproval = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('pending');

  const initialEvents = [
    {
      id: 1, name: 'Lop nau an Italian', host: 'Nguyen Minh Anh', hostAvatar: 'A',
      date: '28/03/2026', time: '18:00', venue: 'Kitchen Studio Q1', attendees: 20,
      category: 'Am thuc', price: '200.000 VND/nguoi', submitted: '2 gio truoc', status: 'pending',
    },
    {
      id: 2, name: 'Wine Tasting Thu 7', host: 'Tran Duc Huy', hostAvatar: 'H',
      date: '29/03/2026', time: '19:30', venue: 'The Wine Bar Q3', attendees: 30,
      category: 'Am thuc', price: '350.000 VND/nguoi', submitted: '3 gio truoc', status: 'pending',
    },
    {
      id: 3, name: 'Trieu lam tranh cuoi tuan', host: 'Le Bich Ngoc', hostAvatar: 'N',
      date: '30/03/2026', time: '10:00', venue: 'Gallery 42 Q2', attendees: 50,
      category: 'Nghe thuat', price: 'Mien phi', submitted: '5 gio truoc', status: 'pending',
    },
    {
      id: 4, name: 'Chay bo sang Landmark', host: 'Pham Hoang Long', hostAvatar: 'L',
      date: '27/03/2026', time: '06:00', venue: 'Landmark 81', attendees: 40,
      category: 'The thao', price: 'Mien phi', submitted: '8 gio truoc', status: 'pending',
    },
    {
      id: 5, name: 'Board game & Coffee', host: 'Vo Thanh Tam', hostAvatar: 'T',
      date: '28/03/2026', time: '14:00', venue: 'Cong Cafe Nguyen Hue', attendees: 16,
      category: 'Xa hoi', price: '100.000 VND/nguoi', submitted: '1 ngay truoc', status: 'pending',
    },
  ];

  const [events, setEvents] = useState(initialEvents);

  const handleAction = (id, action) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: action } : e))
    );
  };

  const filters = [
    { key: 'pending', label: 'Cho duyet' },
    { key: 'approved', label: 'Da duyet' },
    { key: 'rejected', label: 'Tu choi' },
  ];

  const filtered = events.filter((e) => e.status === activeFilter);
  const approvedToday = events.filter((e) => e.status === 'approved').length;
  const rejectedToday = events.filter((e) => e.status === 'rejected').length;
  const pendingCount = events.filter((e) => e.status === 'pending').length;

  const catColor = (cat) => {
    switch (cat) {
      case 'Am thuc': return { bg: '#fff3e0', text: '#e65100' };
      case 'Nghe thuat': return { bg: '#f3e5f5', text: '#7b1fa2' };
      case 'Xa hoi': return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'The thao': return { bg: '#e3f2fd', text: '#1565c0' };
      default: return { bg: 'var(--surface-container-high)', text: 'var(--on-surface-variant)' };
    }
  };

  const s = {
    page: {
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
    },
    headerIcon: {
      fontSize: '32px',
      color: 'var(--primary)',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    badge: {
      marginLeft: '8px',
      background: 'var(--error)',
      color: 'var(--on-primary)',
      borderRadius: 'var(--radius-full)',
      padding: '2px 10px',
      fontSize: '13px',
      fontWeight: 700,
    },
    filterRow: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
    },
    filterChip: (active) => ({
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      border: active ? 'none' : '1px solid var(--outline-variant)',
      background: active ? 'var(--primary-gradient)' : 'var(--surface-container-lowest)',
      color: active ? 'var(--on-primary)' : 'var(--on-surface)',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
    }),
    eventList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '32px',
    },
    eventCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-start',
    },
    eventImage: (cat) => {
      const c = catColor(cat);
      return {
        width: '120px',
        height: '120px',
        borderRadius: 'var(--radius)',
        background: `linear-gradient(135deg, ${c.text}33, ${c.text}11)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      };
    },
    eventImgIcon: (cat) => ({
      fontSize: '40px',
      color: catColor(cat).text,
      opacity: 0.5,
    }),
    eventBody: {
      flex: 1,
      minWidth: 0,
    },
    eventName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '17px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: '6px',
    },
    hostRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '10px',
    },
    hostAvatar: {
      width: '24px',
      height: '24px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 600,
    },
    hostName: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
    },
    detailRow: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      marginBottom: '10px',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
    },
    detailIcon: {
      fontSize: '16px',
      color: 'var(--on-surface-variant)',
    },
    chipRow: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginBottom: '12px',
    },
    catChip: (cat) => {
      const c = catColor(cat);
      return {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        background: c.bg,
        color: c.text,
        fontSize: '12px',
        fontWeight: 600,
      };
    },
    priceChip: {
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--primary)',
    },
    submittedText: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginBottom: '12px',
    },
    actionRow: {
      display: 'flex',
      gap: '8px',
    },
    approveBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
    },
    rejectBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      border: '1.5px solid var(--error)',
      background: 'transparent',
      color: 'var(--error)',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
    },
    viewBtn: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'transparent',
      color: 'var(--primary)',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
    },
    smallIcon: {
      fontSize: '16px',
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
    },
    summaryCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
      textAlign: 'center',
    },
    summaryValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    summaryLabel: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      marginTop: '4px',
    },
    section: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: '16px',
    },
    emptyState: {
      padding: '40px',
      textAlign: 'center',
      color: 'var(--on-surface-variant)',
      fontSize: '14px',
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>event_available</span>
        <h1 style={s.title}>Duyet su kien</h1>
        {pendingCount > 0 && <span style={s.badge}>{pendingCount}</span>}
      </div>

      {/* Filters */}
      <div style={s.filterRow}>
        {filters.map((f) => (
          <button
            key={f.key}
            style={s.filterChip(activeFilter === f.key)}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Event queue */}
      <div style={s.eventList}>
        {filtered.length === 0 && (
          <div style={s.emptyState}>Khong co su kien nao trong danh sach nay.</div>
        )}
        {filtered.map((ev) => (
          <div key={ev.id} style={s.eventCard}>
            <div style={s.eventImage(ev.category)}>
              <span className="material-symbols-outlined" style={s.eventImgIcon(ev.category)}>image</span>
            </div>
            <div style={s.eventBody}>
              <div style={s.eventName}>{ev.name}</div>
              <div style={s.hostRow}>
                <div style={s.hostAvatar}>{ev.hostAvatar}</div>
                <span style={s.hostName}>{ev.host}</span>
              </div>
              <div style={s.detailRow}>
                <div style={s.detailItem}>
                  <span className="material-symbols-outlined" style={s.detailIcon}>calendar_today</span>
                  {ev.date} - {ev.time}
                </div>
                <div style={s.detailItem}>
                  <span className="material-symbols-outlined" style={s.detailIcon}>location_on</span>
                  {ev.venue}
                </div>
                <div style={s.detailItem}>
                  <span className="material-symbols-outlined" style={s.detailIcon}>group</span>
                  {ev.attendees} nguoi
                </div>
              </div>
              <div style={s.chipRow}>
                <span style={s.catChip(ev.category)}>{ev.category}</span>
                <span style={s.priceChip}>{ev.price}</span>
              </div>
              <div style={s.submittedText}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>schedule</span>
                Gui {ev.submitted}
              </div>
              {ev.status === 'pending' && (
                <div style={s.actionRow}>
                  <button style={s.approveBtn} onClick={() => handleAction(ev.id, 'approved')}>
                    <span className="material-symbols-outlined" style={s.smallIcon}>check</span>
                    Duyet
                  </button>
                  <button style={s.rejectBtn} onClick={() => handleAction(ev.id, 'rejected')}>
                    <span className="material-symbols-outlined" style={s.smallIcon}>close</span>
                    Tu choi
                  </button>
                  <button style={s.viewBtn}>Xem chi tiet</button>
                </div>
              )}
              {ev.status === 'approved' && (
                <div style={{ color: '#2e7d32', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                  Da duyet
                </div>
              )}
              {ev.status === 'rejected' && (
                <div style={{ color: 'var(--error)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cancel</span>
                  Da tu choi
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Thong ke duyet */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Thong ke duyet</h2>
        <div style={s.summaryGrid}>
          <div style={s.summaryCard}>
            <div style={{ ...s.summaryValue, color: '#2e7d32' }}>{approvedToday}</div>
            <div style={s.summaryLabel}>Da duyet hom nay</div>
          </div>
          <div style={s.summaryCard}>
            <div style={{ ...s.summaryValue, color: 'var(--error)' }}>{rejectedToday}</div>
            <div style={s.summaryLabel}>Tu choi hom nay</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryValue}>15 phut</div>
            <div style={s.summaryLabel}>Thoi gian duyet TB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventApproval;
