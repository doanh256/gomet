import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_EVENT = {
  id: 1,
  title: 'Dem nhac Acoustic & Wine Tasting',
  date: 'Thu 7, 28 Thang 3, 2026',
  time: '19:00 - 22:00',
  location: 'The Myst Rooftop, Quan 1, TP.HCM',
  price: '350.000 VND',
  attendees: 24,
  maxAttendees: 40,
  description:
    'Mot buoi toi lang man voi am nhac acoustic song dong va thuong thuc cac loai ruou vang hang dau. Day la co hoi tuyet voi de gap go nhung nguoi cung so thich trong khong gian am cung va sang trong. Chuong trinh bao gom 3 ly ruou vang, do an nhe va bieu dien nhac song.',
  attendeesList: [
    { id: 1, name: 'Minh Thu', avatar: null },
    { id: 2, name: 'Hoang Nam', avatar: null },
    { id: 3, name: 'Thuy Linh', avatar: null },
    { id: 4, name: 'Duc Anh', avatar: null },
    { id: 5, name: 'Ha My', avatar: null },
    { id: 6, name: 'Quang Huy', avatar: null },
  ],
  similarEvents: [
    { id: 2, title: 'Speed Dating tai Saigon', date: 'CN, 30 Thang 3', image: null },
    { id: 3, title: 'Board Game & Coffee Meet', date: 'Thu 5, 3 Thang 4', image: null },
  ],
};

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [rsvp, setRsvp] = useState(false);
  const event = MOCK_EVENT;

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'var(--surface)',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      paddingBottom: 100,
    },
    hero: {
      position: 'relative',
      height: 400,
      background: 'var(--primary-gradient)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 24,
      overflow: 'hidden',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
      zIndex: 1,
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
    },
    backBtn: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 3,
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: 'none',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    rsvpBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: rsvp ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
      color: '#fff',
      padding: '6px 16px',
      borderRadius: 'var(--radius-full)',
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 12,
      backdropFilter: 'blur(8px)',
      cursor: 'pointer',
      border: 'none',
      fontFamily: 'var(--font-body)',
    },
    heroTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 26,
      fontWeight: 800,
      color: '#fff',
      marginBottom: 8,
      lineHeight: 1.2,
    },
    heroMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'rgba(255,255,255,0.85)',
      fontSize: 14,
      marginBottom: 4,
    },
    avatarStack: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 12,
    },
    stackAvatar: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-full)',
      background: 'var(--tertiary-container)',
      border: '2px solid #fff',
      marginLeft: -8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      color: '#fff',
    },
    stackCount: {
      marginLeft: 8,
      color: 'rgba(255,255,255,0.9)',
      fontSize: 13,
      fontWeight: 600,
    },
    body: {
      padding: '24px 20px',
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 14,
    },
    description: {
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--on-surface-variant)',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
    },
    infoCard: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      padding: '16px 14px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
    },
    infoIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: 'var(--primary-fixed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary)',
      flexShrink: 0,
    },
    infoLabel: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    attendeesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
    },
    attendeeItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    },
    attendeeAvatar: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--on-primary)',
    },
    attendeeName: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--on-surface)',
      textAlign: 'center',
    },
    actions: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--surface-container-lowest)',
      padding: '16px 20px',
      display: 'flex',
      gap: 12,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      zIndex: 10,
    },
    primaryBtn: {
      flex: 1,
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '16px 24px',
      fontSize: 16,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    outlineBtn: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '2px solid var(--primary)',
      borderRadius: 'var(--radius-full)',
      padding: '16px 20px',
      fontSize: 15,
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    similarScroll: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      paddingBottom: 8,
      scrollbarWidth: 'none',
    },
    similarCard: {
      minWidth: 220,
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      background: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
      cursor: 'pointer',
      flexShrink: 0,
    },
    similarImage: {
      height: 120,
      background: 'linear-gradient(135deg, var(--tertiary-container), var(--primary-container))',
    },
    similarInfo: {
      padding: 14,
    },
    similarTitle: {
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    similarDate: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        <div style={styles.heroContent}>
          <button
            style={styles.rsvpBadge}
            onClick={() => setRsvp(!rsvp)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {rsvp ? 'check_circle' : 'event_available'}
            </span>
            {rsvp ? 'Da dang ky' : 'RSVP'}
          </button>
          <div style={styles.heroTitle}>{event.title}</div>
          <div style={styles.heroMeta}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
            {event.date}
          </div>
          <div style={styles.heroMeta}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
            {event.location}
          </div>
          <div style={styles.avatarStack}>
            {event.attendeesList.slice(0, 4).map((a, i) => (
              <div key={a.id} style={{ ...styles.stackAvatar, marginLeft: i === 0 ? 0 : -8 }}>
                {a.name.charAt(0)}
              </div>
            ))}
            <span style={styles.stackCount}>+{event.attendees} nguoi tham gia</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Description */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Mo ta su kien</div>
          <p style={styles.description}>{event.description}</p>
        </div>

        {/* Info Grid */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Chi tiet su kien</div>
          <div style={styles.infoGrid}>
            {[
              { icon: 'calendar_today', label: 'Ngay', value: event.date },
              { icon: 'schedule', label: 'Thoi gian', value: event.time },
              { icon: 'location_on', label: 'Dia diem', value: 'The Myst Rooftop' },
              { icon: 'payments', label: 'Gia ve', value: event.price },
            ].map((item) => (
              <div key={item.icon} style={styles.infoCard}>
                <div style={styles.infoIcon}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                </div>
                <div>
                  <div style={styles.infoLabel}>{item.label}</div>
                  <div style={styles.infoValue}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendees */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Nguoi tham gia ({event.attendees})</div>
          <div style={styles.attendeesGrid}>
            {event.attendeesList.map((a) => (
              <div key={a.id} style={styles.attendeeItem}>
                <div style={styles.attendeeAvatar}>{a.name.charAt(0)}</div>
                <div style={styles.attendeeName}>{a.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Events */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Su kien tuong tu</div>
          <div style={styles.similarScroll}>
            {event.similarEvents.map((se) => (
              <div key={se.id} style={styles.similarCard} onClick={() => navigate(`/events/${se.id}`)}>
                <div style={styles.similarImage} />
                <div style={styles.similarInfo}>
                  <div style={styles.similarTitle}>{se.title}</div>
                  <div style={styles.similarDate}>{se.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Actions */}
      <div style={styles.actions}>
        <button style={styles.primaryBtn} onClick={() => setRsvp(true)}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>event_available</span>
          Tham gia
        </button>
        <button style={styles.outlineBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
          Chia se
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
