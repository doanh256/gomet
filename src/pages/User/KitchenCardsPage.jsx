import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cardDesigns = [
  { id: 'classic', name: 'Classic', emoji: '🍽️' },
  { id: 'persimmon', name: 'Persimmon', emoji: '🔥' },
  { id: 'gold', name: 'Gold', emoji: '💎' },
];

const receivedCards = [
  {
    id: 1,
    sender: 'Minh Anh',
    avatar: '👩',
    venue: 'La Maison 1888',
    date: '28/03/2026',
    time: '19:00',
    message: 'Minh muon moi ban den mot bua toi dac biet tai nha hang yeu thich cua minh!',
    design: 'persimmon',
  },
  {
    id: 2,
    sender: 'Duc Huy',
    avatar: '👨',
    venue: 'Noir Dining in the Dark',
    date: '01/04/2026',
    time: '20:00',
    message: 'Hay cung trai nghiem bua toi trong bong toi nhe!',
    design: 'gold',
  },
];

const KitchenCardsPage = () => {
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState('classic');
  const [recipient, setRecipient] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 32,
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
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    section: {
      marginBottom: 32,
    },
    cardScroll: {
      display: 'flex',
      gap: 16,
      overflowX: 'auto',
      paddingBottom: 8,
    },
    // Classic card
    classicCard: {
      minWidth: 200,
      height: 260,
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--surface-container)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      outline: '2px dashed var(--outline-variant)',
      outlineOffset: -8,
      cursor: 'pointer',
      flexShrink: 0,
    },
    classicTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    classicText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      fontStyle: 'italic',
      lineHeight: 1.5,
    },
    classicFooter: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
      opacity: 0.7,
    },
    // Persimmon card
    persimmonCard: {
      minWidth: 200,
      height: 260,
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    },
    persimmonEmojis: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      fontSize: 24,
      opacity: 0.15,
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'center',
      gap: 12,
      pointerEvents: 'none',
    },
    persimmonTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#fff',
      position: 'relative',
      zIndex: 1,
    },
    persimmonText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'rgba(255,255,255,0.9)',
      position: 'relative',
      zIndex: 1,
      lineHeight: 1.5,
    },
    // Gold card
    goldCard: {
      minWidth: 200,
      height: 260,
      borderRadius: 'var(--radius-lg)',
      backgroundColor: '#FFD54F',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',
      flexShrink: 0,
    },
    goldTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#3A0B00',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
    goldText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#3A0B00',
      lineHeight: 1.5,
    },
    goldFooter: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'rgba(58,11,0,0.6)',
    },
    label: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
      marginBottom: 8,
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-high)',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      border: 'none',
      outline: 'none',
      marginBottom: 16,
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-high)',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      border: 'none',
      outline: 'none',
      marginBottom: 16,
      minHeight: 100,
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    designSelect: {
      display: 'flex',
      gap: 12,
      marginBottom: 16,
    },
    designOption: (active) => ({
      flex: 1,
      padding: '12px 8px',
      borderRadius: 'var(--radius)',
      backgroundColor: active ? 'var(--primary-container)' : 'var(--surface-container-high)',
      color: active ? '#fff' : 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      textAlign: 'center',
      cursor: 'pointer',
      border: 'none',
    }),
    submitBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    receivedCard: {
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--surface-container-low)',
      padding: 20,
      marginBottom: 16,
    },
    receivedHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 12,
    },
    receivedAvatar: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
    },
    receivedName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    receivedMeta: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    receivedMessage: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      fontStyle: 'italic',
      marginBottom: 16,
      lineHeight: 1.5,
    },
    receivedActions: {
      display: 'flex',
      gap: 12,
    },
    acceptBtn: {
      flex: 1,
      padding: '12px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
    },
    declineBtn: {
      flex: 1,
      padding: '12px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      color: 'var(--on-surface-variant)',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
    },
    row: {
      display: 'flex',
      gap: 12,
    },
    half: {
      flex: 1,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--on-surface)',
      cursor: 'pointer',
      padding: 0,
      marginBottom: 16,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
      </button>

      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>card_giftcard</span>
        <div style={s.heading}>Kitchen Cards</div>
        <div style={s.subtitle}>Gui loi moi an toi doc dao</div>
      </div>

      {/* Collection */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Bo suu tap cua ban</div>
        <div style={s.cardScroll}>
          {/* Classic */}
          <div style={s.classicCard}>
            <div>
              <div style={s.classicTitle}>Classic</div>
              <div style={s.classicText}>"Ban duoc moi den mot bua toi dac biet"</div>
            </div>
            <div>
              <div style={s.classicFooter}>Tu: Ten nguoi gui</div>
              <div style={s.classicFooter}>Ngay • Dia diem</div>
            </div>
          </div>
          {/* Persimmon */}
          <div style={s.persimmonCard}>
            <div style={s.persimmonEmojis}>
              {'🍜🥢🍣🍲🥘🫕🍛🍝🥗🍱'.split('').filter(c => c.trim()).map((e, i) => (
                <span key={i}>{e}</span>
              ))}
            </div>
            <div style={s.persimmonTitle}>Persimmon</div>
            <div style={s.persimmonText}>Loi moi am ap nhu mua thu</div>
          </div>
          {/* Gold */}
          <div style={s.goldCard}>
            <div style={s.goldTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#3A0B00' }}>diamond</span>
              Gold
            </div>
            <div style={s.goldText}>Bua toi thuong luu danh rieng cho ban</div>
            <div style={s.goldFooter}>Premium Experience</div>
          </div>
        </div>
      </div>

      {/* Create form */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Tao Kitchen Card</div>

        <span style={s.label}>Chon thiet ke</span>
        <div style={s.designSelect}>
          {cardDesigns.map(d => (
            <button
              key={d.id}
              style={s.designOption(selectedDesign === d.id)}
              onClick={() => setSelectedDesign(d.id)}
            >
              {d.emoji} {d.name}
            </button>
          ))}
        </div>

        <span style={s.label}>Nguoi nhan</span>
        <input
          style={s.input}
          placeholder="Chon nguoi nhan"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
        />

        <span style={s.label}>Nha hang</span>
        <input
          style={s.input}
          placeholder="Chon nha hang"
          value={restaurant}
          onChange={e => setRestaurant(e.target.value)}
        />

        <div style={s.row}>
          <div style={s.half}>
            <span style={s.label}>Ngay</span>
            <input
              type="date"
              style={s.input}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div style={s.half}>
            <span style={s.label}>Gio</span>
            <input
              type="time"
              style={s.input}
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </div>
        </div>

        <span style={s.label}>Loi nhan ca nhan</span>
        <textarea
          style={s.textarea}
          placeholder="Viet loi nhan ca nhan..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <button style={s.submitBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
          Gui Kitchen Card
        </button>
      </div>

      {/* Received cards */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Kitchen Cards da nhan</div>
        {receivedCards.map(card => (
          <div key={card.id} style={s.receivedCard}>
            <div style={s.receivedHeader}>
              <div style={s.receivedAvatar}>{card.avatar}</div>
              <div>
                <div style={s.receivedName}>{card.sender}</div>
                <div style={s.receivedMeta}>{card.venue} • {card.date} luc {card.time}</div>
              </div>
            </div>
            <div style={s.receivedMessage}>"{card.message}"</div>
            <div style={s.receivedActions}>
              <button style={s.acceptBtn}>Chap nhan</button>
              <button style={s.declineBtn}>Tu choi</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenCardsPage;
