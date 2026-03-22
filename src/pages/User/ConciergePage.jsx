import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const suggestedChips = [
  { icon: 'restaurant', label: 'Tim nha hang' },
  { icon: 'favorite', label: 'Goi y hen ho' },
  { icon: 'help', label: 'Ho tro' },
];

const initialMessages = [
  { id: 1, from: 'bot', text: 'Xin chao! Toi la GOMET Concierge. Toi co the giup ban tim nha hang, len ke hoach hen ho, hoac bat cu dieu gi ban can.' },
  { id: 2, from: 'user', text: 'Toi muon tim nha hang lang man cho toi nay.' },
  { id: 3, from: 'bot', text: 'Tuyet voi! Toi goi y nha hang La Maison o Quan 1 - khong gian lang man, thuc don Phap, gia trung binh 500k/nguoi. Ban muon toi dat cho khong?' },
  { id: 4, from: 'user', text: 'Nghe hay do! Dat cho 2 nguoi luc 7h toi nhe.' },
  { id: 5, from: 'bot', text: 'Da dat cho thanh cong! Ban 2 nguoi luc 19:00 tai La Maison. Toi da gui xac nhan qua tin nhan. Chuc ban co buoi toi tuyet voi!' },
  { id: 6, from: 'user', text: 'Cam on ban nhieu!' },
];

const specialServices = [
  { icon: 'star', title: 'Dat cho VIP', desc: 'De GOMET lo toan moi thu' },
  { icon: 'event', title: 'Len ke hoach hen ho', desc: 'Tu dia diem den menu' },
];

const ConciergePage = () => {
  const navigate = useNavigate();
  const [messages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 600,
      margin: '0 auto',
      height: '100vh',
      overflow: 'hidden',
    },
    headerSection: {
      padding: '40px 24px 20px',
      flexShrink: 0,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 4,
    },
    headerIcon: {
      fontSize: 36,
      color: 'var(--primary)',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      marginBottom: 16,
      paddingLeft: 48,
    },
    chipsRow: {
      display: 'flex',
      gap: 8,
      marginBottom: 16,
    },
    chip: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'var(--surface-container-lowest)',
      border: '1px solid var(--outline-variant)',
      borderRadius: 'var(--radius-full)',
      padding: '8px 16px',
      fontSize: 13,
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      color: 'var(--on-surface)',
      cursor: 'pointer',
    },
    chipIcon: {
      fontSize: 18,
      color: 'var(--primary)',
    },
    chatArea: {
      flex: 1,
      overflowY: 'auto',
      backgroundColor: 'var(--surface-container-lowest)',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    botRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      maxWidth: '85%',
    },
    botAvatar: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    botAvatarIcon: {
      fontSize: 20,
      color: 'var(--on-primary)',
    },
    botBubble: {
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: '4px 18px 18px 18px',
      padding: '12px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface)',
      lineHeight: 1.5,
    },
    userRow: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    userBubble: {
      background: 'var(--primary-gradient)',
      borderRadius: '18px 4px 18px 18px',
      padding: '12px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-primary)',
      lineHeight: 1.5,
      maxWidth: '80%',
    },
    specialSection: {
      padding: '16px 16px 8px',
      backgroundColor: 'var(--surface-container-lowest)',
    },
    specialTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 10,
    },
    specialRow: {
      display: 'flex',
      gap: 10,
      marginBottom: 12,
    },
    specialCard: {
      flex: 1,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius)',
      padding: '16px 14px',
      cursor: 'pointer',
    },
    specialIcon: {
      fontSize: 24,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    specialCardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    specialCardDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    inputBar: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px 28px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderTop: '1px solid var(--outline-variant)',
      flexShrink: 0,
    },
    textInput: {
      flex: 1,
      backgroundColor: 'var(--surface-container-high)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '14px 20px',
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      outline: 'none',
    },
    sendBtn: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--primary-gradient)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
    },
    sendIcon: {
      fontSize: 22,
      color: 'var(--on-primary)',
    },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.headerSection}>
        <div style={s.headerRow}>
          <span className="material-symbols-outlined" style={s.headerIcon}>support_agent</span>
          <h1 style={s.heading}>Tro ly ghep doi</h1>
        </div>
        <div style={s.subtitle}>GOMET Concierge</div>

        {/* Suggested Action Chips */}
        <div style={s.chipsRow}>
          {suggestedChips.map((chip, i) => (
            <div key={i} style={s.chip}>
              <span className="material-symbols-outlined" style={s.chipIcon}>{chip.icon}</span>
              {chip.label}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={s.chatArea}>
        {messages.map(msg =>
          msg.from === 'bot' ? (
            <div key={msg.id} style={s.botRow}>
              <div style={s.botAvatar}>
                <span className="material-symbols-outlined" style={s.botAvatarIcon}>smart_toy</span>
              </div>
              <div style={s.botBubble}>{msg.text}</div>
            </div>
          ) : (
            <div key={msg.id} style={s.userRow}>
              <div style={s.userBubble}>{msg.text}</div>
            </div>
          )
        )}
      </div>

      {/* Special Services */}
      <div style={s.specialSection}>
        <div style={s.specialTitle}>Yeu cau dac biet</div>
        <div style={s.specialRow}>
          {specialServices.map((svc, i) => (
            <div key={i} style={s.specialCard}>
              <span className="material-symbols-outlined" style={s.specialIcon}>{svc.icon}</span>
              <div style={s.specialCardTitle}>{svc.title}</div>
              <div style={s.specialCardDesc}>{svc.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div style={s.inputBar}>
        <input
          style={s.textInput}
          placeholder="Nhap tin nhan..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button style={s.sendBtn}>
          <span className="material-symbols-outlined" style={s.sendIcon}>send</span>
        </button>
      </div>
    </div>
  );
};

export default ConciergePage;
