import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const myGroups = [
  {
    id: 1,
    name: 'Hoi an vat Sai Gon',
    memberCount: 12,
    avatarColors: ['#ae2f34', '#ff6b6b', '#894e45', '#5f5e5e'],
    nextEvent: 'Lau Thai T7 nay',
  },
  {
    id: 2,
    name: 'Foodie Team',
    memberCount: 8,
    avatarColors: ['#ff6b6b', '#894e45', '#ae2f34', '#5f5e5e'],
    nextEvent: 'BBQ Chu nhat tuan sau',
  },
];

const suggestedGroups = [
  { id: 3, name: 'Seoul Food Lovers', memberCount: 45, category: 'Am thuc Han', color: '#ae2f34' },
  { id: 4, name: 'BBQ Masters SG', memberCount: 32, category: 'BBQ', color: '#894e45' },
  { id: 5, name: 'Hoi An Chay', memberCount: 28, category: 'An chay', color: '#2e7d32' },
];

const upcomingEvents = [
  { id: 1, title: 'Lau Thai Hai San', venue: 'Bangkok House, Q1', date: 'T7, 28/03/2026', rsvp: 8 },
  { id: 2, title: 'BBQ Party', venue: 'Seoul Garden, Q7', date: 'CN, 05/04/2026', rsvp: 15 },
];

const GroupDiningPage = () => {
  const navigate = useNavigate();
  const [joinedGroups, setJoinedGroups] = useState([]);

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      color: 'var(--primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: 20,
    },
    header: {
      textAlign: 'center',
      marginBottom: 28,
    },
    headerIcon: {
      fontSize: 48,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    groupCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 18,
      boxShadow: 'var(--card-shadow)',
      marginBottom: 14,
    },
    groupHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    groupName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    avatarStack: {
      display: 'flex',
      marginBottom: 4,
    },
    avatar: (color, i) => ({
      width: 30,
      height: 30,
      borderRadius: '50%',
      backgroundColor: color,
      border: '2px solid var(--surface-container-lowest)',
      marginLeft: i === 0 ? 0 : -10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 4 - i,
    }),
    avatarText: {
      fontFamily: 'var(--font-body)',
      fontSize: 10,
      fontWeight: 700,
      color: '#fff',
    },
    memberCount: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginBottom: 10,
    },
    nextEvent: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 12px',
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 8,
      marginBottom: 12,
    },
    nextEventIcon: {
      fontSize: 18,
      color: 'var(--tertiary)',
    },
    nextEventText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    viewGroupBtn: {
      width: '100%',
      padding: '10px 0',
      borderRadius: 'var(--radius-full)',
      border: '1.5px solid var(--outline-variant)',
      backgroundColor: 'transparent',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
    },
    suggestedGrid: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 8,
      marginBottom: 28,
    },
    suggestedCard: {
      minWidth: 200,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden',
      flexShrink: 0,
    },
    suggestedImage: (color) => ({
      width: '100%',
      height: 100,
      background: `linear-gradient(135deg, ${color}, ${color}88)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    suggestedImageIcon: {
      fontSize: 40,
      color: 'rgba(255,255,255,0.5)',
    },
    suggestedBody: {
      padding: 14,
    },
    suggestedName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    suggestedMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    suggestedMembers: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    categoryChip: (color) => ({
      padding: '3px 10px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: color + '18',
      color: color,
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
    }),
    joinBtn: (joined) => ({
      width: '100%',
      padding: '9px 0',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: joined ? 'var(--surface-container-high)' : 'var(--primary-gradient)',
      color: joined ? 'var(--on-surface-variant)' : 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
    }),
    createCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 32,
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      marginBottom: 28,
    },
    createIcon: {
      fontSize: 48,
      color: 'var(--primary)',
    },
    createText: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
      textAlign: 'center',
    },
    createBtn: {
      padding: '12px 32px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    },
    eventCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 18,
      boxShadow: 'var(--card-shadow)',
      marginBottom: 14,
    },
    eventTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 8,
    },
    eventDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 6,
    },
    eventIcon: {
      fontSize: 18,
      color: 'var(--on-surface-variant)',
    },
    eventText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    rsvpRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    rsvpCount: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    rsvpIcon: {
      fontSize: 18,
      color: 'var(--primary)',
    },
    eventJoinBtn: {
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
    },
  };

  const toggleJoin = (id) => {
    setJoinedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>groups</span>
        <h1 style={s.heading}>Hoi nhom an uong</h1>
        <p style={s.subtitle}>Ket noi qua nhung bua an chung</p>
      </div>

      <h2 style={s.sectionTitle}>Nhom cua ban</h2>
      {myGroups.map((group) => (
        <div key={group.id} style={s.groupCard}>
          <div style={s.groupHeader}>
            <div>
              <div style={s.groupName}>{group.name}</div>
              <div style={s.avatarStack}>
                {group.avatarColors.map((color, i) => (
                  <div key={i} style={s.avatar(color, i)}>
                    <span style={s.avatarText}>{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
            </div>
            <span style={s.memberCount}>{group.memberCount} thanh vien</span>
          </div>
          <div style={s.nextEvent}>
            <span className="material-symbols-outlined" style={s.nextEventIcon}>calendar_today</span>
            <span style={s.nextEventText}>{group.nextEvent}</span>
          </div>
          <button style={s.viewGroupBtn}>Xem nhom</button>
        </div>
      ))}

      <h2 style={{ ...s.sectionTitle, marginTop: 14 }}>Nhom de xuat</h2>
      <div style={s.suggestedGrid}>
        {suggestedGroups.map((group) => {
          const joined = joinedGroups.includes(group.id);
          return (
            <div key={group.id} style={s.suggestedCard}>
              <div style={s.suggestedImage(group.color)}>
                <span className="material-symbols-outlined" style={s.suggestedImageIcon}>restaurant</span>
              </div>
              <div style={s.suggestedBody}>
                <div style={s.suggestedName}>{group.name}</div>
                <div style={s.suggestedMeta}>
                  <span style={s.suggestedMembers}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>group</span>
                    {group.memberCount}
                  </span>
                  <span style={s.categoryChip(group.color)}>{group.category}</span>
                </div>
                <button style={s.joinBtn(joined)} onClick={() => toggleJoin(group.id)}>
                  {joined ? 'Da tham gia' : 'Tham gia'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={s.createCard}>
        <span className="material-symbols-outlined" style={s.createIcon}>add_circle</span>
        <div style={s.createText}>Tao nhom an uong cua ban</div>
        <button style={s.createBtn}>Tao nhom moi</button>
      </div>

      <h2 style={s.sectionTitle}>Su kien nhom sap toi</h2>
      {upcomingEvents.map((event) => (
        <div key={event.id} style={s.eventCard}>
          <div style={s.eventTitle}>{event.title}</div>
          <div style={s.eventDetail}>
            <span className="material-symbols-outlined" style={s.eventIcon}>location_on</span>
            <span style={s.eventText}>{event.venue}</span>
          </div>
          <div style={s.eventDetail}>
            <span className="material-symbols-outlined" style={s.eventIcon}>calendar_today</span>
            <span style={s.eventText}>{event.date}</span>
          </div>
          <div style={s.rsvpRow}>
            <span style={s.rsvpCount}>
              <span className="material-symbols-outlined" style={s.rsvpIcon}>how_to_reg</span>
              {event.rsvp} nguoi tham gia
            </span>
            <button style={s.eventJoinBtn}>Tham gia</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupDiningPage;
