import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_EVENT = {
  id: 1,
  title: 'Đêm nhạc Acoustic & Wine Tasting',
  date: 'Thứ 7, 28 Tháng 3, 2026',
  time: '19:00 - 22:00',
  location: 'The Myst Rooftop, Quận 1, TP.HCM',
  price: '350.000 VND',
  attendees: 24,
  maxAttendees: 40,
  description:
    'Một buổi tối lãng mạn với âm nhạc acoustic sống động và thưởng thức các loại rượu vang hàng đầu. Đây là cơ hội tuyệt vời để gặp gỡ những người cùng sở thích trong không gian ấm cúng và sang trọng. Chương trình bao gồm 3 ly rượu vang, đồ ăn nhẹ và biểu diễn nhạc sống.',
  attendeesList: [
    { id: 1, name: 'Minh Thu', avatar: null },
    { id: 2, name: 'Hoang Nam', avatar: null },
    { id: 3, name: 'Thuy Linh', avatar: null },
    { id: 4, name: 'Duc Anh', avatar: null },
    { id: 5, name: 'Ha My', avatar: null },
    { id: 6, name: 'Quang Huy', avatar: null },
  ],
  similarEvents: [
    { id: 2, title: 'Speed Dating tại Saigon', date: 'CN, 30 Tháng 3', image: null },
    { id: 3, title: 'Board Game & Coffee Meet', date: 'Thứ 5, 3 Tháng 4', image: null },
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
      background: '#131313',
      color: '#FDF9F3',
      paddingBottom: 100,
    },
    hero: {
      position: 'relative',
      height: 400,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 24,
      overflow: 'hidden',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(19,19,19,0.85) 0%, rgba(19,19,19,0.2) 50%, transparent 100%)',
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
      borderRadius: '9999px',
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: 'none',
      color: '#FDF9F3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    rsvpBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: rsvp ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : 'rgba(57,57,57,0.6)',
      color: rsvp ? '#3A0B00' : '#FDF9F3',
      padding: '6px 16px',
      borderRadius: '9999px',
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 12,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      cursor: 'pointer',
      border: 'none',
    },
    heroTitle: {
      fontSize: 26,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 8,
      lineHeight: 1.2,
    },
    heroMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'rgba(253,249,243,0.85)',
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
      borderRadius: '9999px',
      background: '#2A2A2A',
      border: '2px solid #131313',
      marginLeft: -8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    stackCount: {
      marginLeft: 8,
      color: 'rgba(253,249,243,0.9)',
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
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
    },
    description: {
      fontSize: 15,
      lineHeight: 1.7,
      color: '#E6BEB2',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
    },
    infoCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '16px 14px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
    },
    infoIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: 'rgba(255,181,158,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFB59E',
      flexShrink: 0,
    },
    infoLabel: {
      fontSize: 12,
      color: '#E6BEB2',
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: 600,
      color: '#FDF9F3',
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
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      fontWeight: 700,
      color: '#3A0B00',
    },
    attendeeName: {
      fontSize: 13,
      fontWeight: 500,
      color: '#FDF9F3',
      textAlign: 'center',
    },
    actions: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '16px 20px',
      display: 'flex',
      gap: 12,
      zIndex: 10,
    },
    primaryBtn: {
      flex: 1,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      padding: '16px 24px',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    outlineBtn: {
      background: 'transparent',
      color: '#FFB59E',
      border: '2px solid #FFB59E',
      borderRadius: '9999px',
      padding: '16px 20px',
      fontSize: 15,
      fontWeight: 600,
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
      borderRadius: '1.5rem',
      overflow: 'hidden',
      background: '#1C1B1B',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      cursor: 'pointer',
      flexShrink: 0,
    },
    similarImage: {
      height: 120,
      background: 'linear-gradient(135deg, #2A2A2A, #353535)',
    },
    similarInfo: {
      padding: 14,
    },
    similarTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    similarDate: {
      fontSize: 12,
      color: '#E6BEB2',
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        <div style={styles.heroContent}>
          <button
            style={styles.rsvpBadge}
            onClick={() => setRsvp(!rsvp)}
          >
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {rsvp ? 'check_circle' : 'event_available'}
            </span>
            {rsvp ? 'Đã đăng ký' : 'RSVP'}
          </button>
          <div style={styles.heroTitle}>{event.title}</div>
          <div style={styles.heroMeta}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
            {event.date}
          </div>
          <div style={styles.heroMeta}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
            {event.location}
          </div>
          <div style={styles.avatarStack}>
            {event.attendeesList.slice(0, 4).map((a, i) => (
              <div key={a.id} style={{ ...styles.stackAvatar, marginLeft: i === 0 ? 0 : -8 }}>
                {a.name.charAt(0)}
              </div>
            ))}
            <span style={styles.stackCount}>+{event.attendees} người tham gia</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Description */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Mô tả sự kiện</div>
          <p style={styles.description}>{event.description}</p>
        </div>

        {/* Info Grid */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Chi tiết sự kiện</div>
          <div style={styles.infoGrid}>
            {[
              { icon: 'calendar_today', label: 'Ngày', value: event.date },
              { icon: 'schedule', label: 'Thời gian', value: event.time },
              { icon: 'location_on', label: 'Địa điểm', value: 'The Myst Rooftop' },
              { icon: 'payments', label: 'Giá vé', value: event.price },
            ].map((item) => (
              <div key={item.icon} style={styles.infoCard}>
                <div style={styles.infoIcon}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
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
          <div style={styles.sectionTitle}>Người tham gia ({event.attendees})</div>
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
          <div style={styles.sectionTitle}>Sự kiện tương tự</div>
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
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>event_available</span>
          Tham gia
        </button>
        <button style={styles.outlineBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
          Chia sẻ
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
