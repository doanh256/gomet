import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const selectionKeyframes = `
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const availableEvents = [
  {
    id: 1, name: 'The Midnight Pho', restaurant: 'Pho Thin Secret Kitchen',
    date: '28/03/2026', time: '20:00', price: '500.000 VND',
    chemistry: 94, seats: 3, gradient: 'linear-gradient(135deg, #FF571A, #E91E63)',
  },
  {
    id: 2, name: 'Mekong Whisper', restaurant: 'La Maison 1888',
    date: '02/04/2026', time: '19:30', price: '825.000 VND',
    chemistry: 87, seats: 5, gradient: 'linear-gradient(135deg, #2196F3, #00BCD4)',
  },
  {
    id: 3, name: 'Saigon After Dark', restaurant: 'Noir. Dining in the Dark',
    date: '05/04/2026', time: '21:00', price: '650.000 VND',
    chemistry: 91, seats: 2, gradient: 'linear-gradient(135deg, #FFD54F, #F57C00)',
  },
  {
    id: 4, name: 'Highland Feast', restaurant: 'Mountain Kitchen',
    date: '10/04/2026', time: '19:00', price: '450.000 VND',
    chemistry: 82, seats: 8, gradient: 'linear-gradient(135deg, #8BC34A, #4CAF50)',
  },
];

const myReservations = [
  { id: 10, name: 'The Silk Road', restaurant: 'Hidden Gem Q3', date: '25/03/2026', status: 'confirmed' },
];

const SecretTableSelectionPage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      padding: '40px 24px 100px', maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: '#FDF9F3',
    },
    backBtn: {
      background: 'none', border: 'none', cursor: 'pointer', color: '#E6BEB2',
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, marginBottom: 28, padding: 0,
    },
    headerRow: {
      display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
    },
    lockIcon: { fontSize: 28, color: '#FFD54F' },
    heading: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 28, fontWeight: 800, color: '#FDF9F3',
    },
    subtitle: {
      fontSize: 14, color: '#E6BEB2', marginBottom: 32,
      fontStyle: 'italic',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
      color: '#FFD54F', marginBottom: 16, letterSpacing: '0.06em',
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 20 },
    eventGrid: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 },
    eventCard: {
      borderRadius: '1.5rem', overflow: 'hidden', position: 'relative',
      animation: 'fadeInUp 0.5s ease-out both',
    },
    eventGradient: (gradient) => ({
      padding: '24px 20px 16px', background: gradient, position: 'relative',
    }),
    eventGlass: {
      position: 'absolute', inset: 0,
      background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
    },
    eventContent: { position: 'relative', zIndex: 1 },
    eventName: {
      fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800,
      color: '#FDF9F3', marginBottom: 4,
    },
    eventRestaurant: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 12 },
    eventMeta: {
      display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 14,
    },
    eventMetaItem: {
      display: 'flex', alignItems: 'center', gap: 4,
      fontSize: 12, color: 'rgba(255,255,255,0.9)',
    },
    eventMetaIcon: { fontSize: 16 },
    chemBadge: (score) => ({
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 12px', borderRadius: '9999px',
      background: score >= 90 ? 'rgba(17,117,0,0.3)' : 'rgba(255,213,79,0.2)',
      fontSize: 12, fontWeight: 700,
      color: score >= 90 ? '#4CAF50' : '#FFD54F',
    }),
    eventFooter: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', backgroundColor: '#1C1B1B',
    },
    eventPrice: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 800, color: '#FFD54F',
    },
    eventSeats: { fontSize: 12, color: '#E6BEB2' },
    reserveBtn: {
      padding: '10px 24px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FFD54F, #F57C00)',
      fontSize: 13, fontWeight: 700, color: '#1a1a1a',
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
    },
    reservationsSection: { marginTop: 8 },
    resCard: {
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px', borderRadius: '1rem', backgroundColor: '#1C1B1B',
      marginBottom: 10,
    },
    resIconWrap: {
      width: 48, height: 48, borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(255,213,79,0.2), rgba(255,213,79,0.05))',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    },
    resIcon: { fontSize: 24, color: '#FFD54F' },
    resInfo: { flex: 1 },
    resName: { fontSize: 14, fontWeight: 700, color: '#FDF9F3', marginBottom: 2 },
    resRestaurant: { fontSize: 12, color: '#E6BEB2' },
    resStatus: {
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: '9999px',
      background: 'rgba(17,117,0,0.15)', fontSize: 11, fontWeight: 700, color: '#117500',
    },
  };

  return (
    <div style={s.page}>
      <style>{selectionKeyframes}</style>

      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lại
      </button>

      <div style={s.headerRow}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.lockIcon}>lock</span>
        <div style={s.heading}>Secret Tables</div>
      </div>
      <div style={s.subtitle}>The Nocturnal Experience</div>

      {/* Available Events */}
      <div style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>event_available</span>
        Sự kiện sắp diễn ra
      </div>
      <div style={s.eventGrid}>
        {availableEvents.map((ev, idx) => (
          <div key={ev.id} style={{ ...s.eventCard, animationDelay: `${idx * 0.1}s` }}>
            <div style={s.eventGradient(ev.gradient)}>
              <div style={s.eventGlass} />
              <div style={s.eventContent}>
                <div style={s.eventName}>{ev.name}</div>
                <div style={s.eventRestaurant}>{ev.restaurant}</div>
                <div style={s.eventMeta}>
                  <div style={s.eventMetaItem}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={s.eventMetaIcon}>calendar_today</span>
                    {ev.date}
                  </div>
                  <div style={s.eventMetaItem}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={s.eventMetaIcon}>schedule</span>
                    {ev.time}
                  </div>
                  <div style={s.eventMetaItem}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={s.eventMetaIcon}>event_seat</span>
                    {ev.seats} chỗ còn
                  </div>
                </div>
                <div style={s.chemBadge(ev.chemistry)}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>favorite</span>
                  {ev.chemistry}% hoà hợp
                </div>
              </div>
            </div>
            <div style={s.eventFooter}>
              <div>
                <div style={s.eventPrice}>{ev.price}</div>
                <div style={s.eventSeats}>{ev.seats} chỗ còn lại</div>
              </div>
              <button style={s.reserveBtn}>Đặt chỗ</button>
            </div>
          </div>
        ))}
      </div>

      {/* Your Reservations */}
      <div style={s.reservationsSection}>
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>confirmation_number</span>
          Đặt chỗ của bạn
        </div>
        {myReservations.map(r => (
          <div key={r.id} style={s.resCard}>
            <div style={s.resIconWrap}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.resIcon}>confirmation_number</span>
            </div>
            <div style={s.resInfo}>
              <div style={s.resName}>{r.name}</div>
              <div style={s.resRestaurant}>{r.restaurant} - {r.date}</div>
            </div>
            <div style={s.resStatus}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 12 }}>check_circle</span>
              Đã xác nhận
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretTableSelectionPage;
