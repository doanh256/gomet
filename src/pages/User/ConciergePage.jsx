import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const suggestedChips = [
  { icon: 'restaurant', label: 'Tìm nhà hàng' },
  { icon: 'favorite', label: 'Gợi ý hẹn hò' },
  { icon: 'help', label: 'Hỗ trợ' },
];

const initialMessages = [
  { id: 1, from: 'bot', text: 'Xin chào! Tôi là GOMET Concierge. Tôi có thể giúp bạn tìm nhà hàng, lên kế hoạch hẹn hò, hoặc bất cứ điều gì bạn cần.' },
  { id: 2, from: 'user', text: 'Tôi muốn tìm nhà hàng lãng mạn cho tối nay.' },
  { id: 3, from: 'bot', text: 'Tuyệt vời! Tôi gợi ý nhà hàng La Maison ở Quận 1 - không gian lãng mạn, thực đơn Pháp, giá trung bình 500k/người. Bạn muốn tôi đặt chỗ không?' },
  { id: 4, from: 'user', text: 'Nghe hay đó! Đặt chỗ 2 người lúc 7h tối nhé.' },
  { id: 5, from: 'bot', text: 'Đã đặt chỗ thành công! Bàn 2 người lúc 19:00 tại La Maison. Tôi đã gửi xác nhận qua tin nhắn. Chúc bạn có buổi tối tuyệt vời!' },
  { id: 6, from: 'user', text: 'Cảm ơn bạn nhiều!' },
];

const specialServices = [
  { icon: 'star', title: 'Đặt chỗ VIP', desc: 'Để GOMET lo toàn mọi thứ' },
  { icon: 'event', title: 'Lên kế hoạch hẹn đó', desc: 'Từ địa điểm đến menu' },
];

const ConciergePage = () => {
  const navigate = useNavigate();
  const [messages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
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
      color: '#FFB59E',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
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
      backgroundColor: '#1C1B1B',
      border: 'none',
      borderRadius: 9999,
      padding: '8px 16px',
      fontSize: 13,
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      color: '#FDF9F3',
      cursor: 'pointer',
    },
    chipIcon: {
      fontSize: 18,
      color: '#FFB59E',
    },
    chatArea: {
      flex: 1,
      overflowY: 'auto',
      backgroundColor: '#1C1B1B',
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
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    botAvatarIcon: {
      fontSize: 20,
      color: '#3A0B00',
    },
    botBubble: {
      backgroundColor: '#2A2A2A',
      borderRadius: '4px 18px 18px 18px',
      padding: '12px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#FDF9F3',
      lineHeight: 1.5,
    },
    userRow: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    userBubble: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '18px 4px 18px 18px',
      padding: '12px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#3A0B00',
      lineHeight: 1.5,
      maxWidth: '80%',
    },
    specialSection: {
      padding: '16px 16px 8px',
      backgroundColor: '#1C1B1B',
    },
    specialTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 10,
    },
    specialRow: {
      display: 'flex',
      gap: 10,
      marginBottom: 12,
    },
    specialCard: {
      flex: 1,
      backgroundColor: '#2A2A2A',
      borderRadius: '1.5rem',
      padding: '16px 14px',
      cursor: 'pointer',
    },
    specialIcon: {
      fontSize: 24,
      color: '#FFB59E',
      marginBottom: 8,
    },
    specialCardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    specialCardDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
    },
    inputBar: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px 28px',
      backgroundColor: '#1C1B1B',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      flexShrink: 0,
    },
    textInput: {
      flex: 1,
      backgroundColor: '#2A2A2A',
      border: 'none',
      borderRadius: 9999,
      padding: '14px 20px',
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      color: '#FDF9F3',
      outline: 'none',
    },
    sendBtn: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
    },
    sendIcon: {
      fontSize: 22,
      color: '#3A0B00',
    },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.headerSection}>
        <div style={s.headerRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>support_agent</span>
          <h1 style={s.heading}>Trợ lý ghép đôi</h1>
        </div>
        <div style={s.subtitle}>GOMET Concierge</div>

        {/* Suggested Action Chips */}
        <div style={s.chipsRow}>
          {suggestedChips.map((chip, i) => (
            <div key={i} style={s.chip}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.chipIcon}>{chip.icon}</span>
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
                <span aria-hidden="true" className="material-symbols-outlined" style={s.botAvatarIcon}>smart_toy</span>
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
        <div style={s.specialTitle}>Yêu cầu đặc biệt</div>
        <div style={s.specialRow}>
          {specialServices.map((svc, i) => (
            <div key={i} style={s.specialCard}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.specialIcon}>{svc.icon}</span>
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
          placeholder="Nhập tin nhắn..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button style={s.sendBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sendIcon}>send</span>
        </button>
      </div>
    </div>
  );
};

export default ConciergePage;
