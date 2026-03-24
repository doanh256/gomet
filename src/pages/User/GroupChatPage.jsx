import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const members = [
  { id: 1, name: 'Minh Anh', color: '#FF571A' },
  { id: 2, name: 'Thanh Tung', color: '#2196F3' },
  { id: 3, name: 'Ngoc Anh', color: '#E91E63' },
];

const messages = [
  { id: 1, senderId: 1, text: 'Chao moi nguoi! Toi ngay gap mat nhe 🍜', time: '10:30' },
  { id: 2, senderId: 2, text: 'Ok, minh den som! Quan nao nhi?', time: '10:32' },
  { id: 3, senderId: 0, type: 'venue', venueName: 'Nha hang Pho Thin', venueAddr: '13 Lo Duc, Ha Noi', venueRating: 4.8, venueMatch: '94% hoa hop', time: '10:33' },
  { id: 4, senderId: 3, text: 'O tuyet voi! Minh thich Pho Thin lam', time: '10:35' },
  { id: 5, senderId: 1, text: 'Minh cung vay! Nuoc dung o day rat ngon', time: '10:36' },
  { id: 6, senderId: 2, type: 'photo', time: '10:38' },
  { id: 7, senderId: 2, text: 'Day la lan truoc minh an o day, ngon phai biet!', time: '10:38' },
  { id: 8, senderId: 3, text: 'Hen 7h toi nhe moi nguoi!', time: '10:40' },
];

const GroupChatPage = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const getMember = (id) => members.find(m => m.id === id);

  const s = {
    page: {
      flex: 1, backgroundColor: '#131313', display: 'flex', flexDirection: 'column',
      maxWidth: 600, margin: '0 auto', fontFamily: 'var(--font-body, "Inter", sans-serif)',
      color: '#FDF9F3', height: '100vh',
    },
    header: {
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '16px 20px', backgroundColor: '#1C1B1B',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    backBtn: {
      background: 'none', border: 'none', cursor: 'pointer', color: '#FDF9F3',
      display: 'flex', alignItems: 'center', padding: 0,
    },
    headerInfo: { flex: 1 },
    groupName: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 16, fontWeight: 700, color: '#FDF9F3',
    },
    groupMeta: {
      fontSize: 12, color: '#E6BEB2', display: 'flex', alignItems: 'center', gap: 6,
    },
    avatarStack: {
      display: 'flex', marginLeft: 'auto',
    },
    miniAvatar: (color, idx) => ({
      width: 28, height: 28, borderRadius: '50%', backgroundColor: color,
      border: '2px solid #1C1B1B', marginLeft: idx === 0 ? 0 : -8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, color: '#FDF9F3', zIndex: 3 - idx,
    }),
    synergyBadge: {
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '10px 20px', margin: '12px 20px',
      borderRadius: '1rem', background: 'rgba(255,87,26,0.1)',
    },
    synergyIcon: { fontSize: 20, color: '#FF571A' },
    synergyText: { fontSize: 13, fontWeight: 600, color: '#FFB59E' },
    synergyValue: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 800,
      color: '#FF571A', marginLeft: 'auto',
    },
    chatArea: {
      flex: 1, overflowY: 'auto', padding: '12px 20px',
      display: 'flex', flexDirection: 'column', gap: 12,
    },
    msgWrap: (isAI) => ({
      display: 'flex', flexDirection: 'column',
      alignItems: isAI ? 'center' : 'flex-start',
    }),
    senderRow: {
      display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
    },
    senderDot: (color) => ({
      width: 8, height: 8, borderRadius: '50%', backgroundColor: color,
    }),
    senderName: (color) => ({
      fontSize: 11, fontWeight: 700, color,
    }),
    bubble: (color) => ({
      padding: '10px 16px', borderRadius: '1rem',
      backgroundColor: `${color}20`, maxWidth: '80%',
    }),
    bubbleText: { fontSize: 14, color: '#FDF9F3', lineHeight: 1.5 },
    time: { fontSize: 10, color: '#E6BEB250', marginTop: 4 },
    venueCard: {
      padding: '16px', borderRadius: '1rem', maxWidth: '85%',
      background: 'linear-gradient(135deg, rgba(255,87,26,0.12), rgba(255,181,158,0.06))',
      border: '1px solid rgba(255,87,26,0.2)',
    },
    venueLabel: {
      fontSize: 10, fontWeight: 700, color: '#FFB59E',
      letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8,
    },
    venueName: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
      color: '#FDF9F3', marginBottom: 4,
    },
    venueAddr: { fontSize: 12, color: '#E6BEB2', marginBottom: 8 },
    venueFooter: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    venueRating: {
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: '#FFD54F',
    },
    venueMatch: { fontSize: 12, fontWeight: 600, color: '#117500' },
    photoPlaceholder: {
      width: 200, height: 150, borderRadius: '1rem',
      background: 'linear-gradient(135deg, #FF571A30, #FFB59E20)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    photoIcon: { fontSize: 36, color: '#FF571A50' },
    inputBar: {
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 20px', backgroundColor: '#1C1B1B',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    },
    input: {
      flex: 1, padding: '12px 16px', borderRadius: '9999px',
      border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#131313',
      color: '#FDF9F3', fontSize: 14, fontFamily: 'var(--font-body)',
      outline: 'none',
    },
    sendBtn: {
      width: 44, height: 44, borderRadius: '50%', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
    },
    sendIcon: { fontSize: 20, color: '#FDF9F3' },
    planCta: {
      padding: '14px 20px', borderRadius: '1rem', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3', fontSize: 14, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      margin: '0 20px 12px',
    },
    infoPanel: {
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 280,
      backgroundColor: '#1C1B1B', padding: '24px 20px', zIndex: 10,
      boxShadow: '-4px 0 20px rgba(0,0,0,0.5)',
      overflowY: 'auto',
    },
    infoPanelTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
      color: '#FDF9F3', marginBottom: 20,
    },
    memberItem: {
      display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
    },
    memberAvatar: (color) => ({
      width: 40, height: 40, borderRadius: '50%', backgroundColor: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }),
    memberAvatarIcon: { fontSize: 20, color: '#FDF9F3' },
    memberName: { fontSize: 14, fontWeight: 600, color: '#FDF9F3' },
  };

  return (
    <div style={{ ...s.page, position: 'relative' }}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        <div style={s.headerInfo}>
          <div style={s.groupName}>The Pho Trinity</div>
          <div style={s.groupMeta}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>group</span>
            {members.length} thanh vien
          </div>
        </div>
        <div style={s.avatarStack}>
          {members.map((m, idx) => (
            <div key={m.id} style={s.miniAvatar(m.color, idx)}>
              {m.name.charAt(0)}
            </div>
          ))}
        </div>
        <button style={{ ...s.backBtn, marginLeft: 8 }} onClick={() => setShowInfo(!showInfo)}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>info</span>
        </button>
      </div>

      {/* Synergy Badge */}
      <div style={s.synergyBadge}>
        <span className="material-symbols-outlined" style={s.synergyIcon}>psychology</span>
        <div style={s.synergyText}>Group Synergy</div>
        <div style={s.synergyValue}>92%</div>
      </div>

      {/* Chat Area */}
      <div style={s.chatArea}>
        {messages.map(msg => {
          if (msg.type === 'venue') {
            return (
              <div key={msg.id} style={s.msgWrap(true)}>
                <div style={s.venueCard}>
                  <div style={s.venueLabel}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12, verticalAlign: 'middle', marginRight: 4 }}>smart_toy</span>
                    Goi y tu AI
                  </div>
                  <div style={s.venueName}>{msg.venueName}</div>
                  <div style={s.venueAddr}>{msg.venueAddr}</div>
                  <div style={s.venueFooter}>
                    <div style={s.venueRating}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>star</span>
                      {msg.venueRating}
                    </div>
                    <div style={s.venueMatch}>{msg.venueMatch}</div>
                  </div>
                </div>
                <div style={s.time}>{msg.time}</div>
              </div>
            );
          }

          const member = getMember(msg.senderId);
          if (!member) return null;

          return (
            <div key={msg.id} style={s.msgWrap(false)}>
              <div style={s.senderRow}>
                <div style={s.senderDot(member.color)} />
                <div style={s.senderName(member.color)}>{member.name}</div>
              </div>
              {msg.type === 'photo' ? (
                <div style={s.photoPlaceholder}>
                  <span className="material-symbols-outlined" style={s.photoIcon}>image</span>
                </div>
              ) : (
                <div style={s.bubble(member.color)}>
                  <div style={s.bubbleText}>{msg.text}</div>
                </div>
              )}
              <div style={s.time}>{msg.time}</div>
            </div>
          );
        })}
      </div>

      {/* Plan Group Date CTA */}
      <button style={s.planCta}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
        Len ke hoach nhom
      </button>

      {/* Input Bar */}
      <div style={s.inputBar}>
        <input
          style={s.input}
          placeholder="Nhan tin..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button style={s.sendBtn}>
          <span className="material-symbols-outlined" style={s.sendIcon}>send</span>
        </button>
      </div>

      {/* Info Sidebar */}
      {showInfo && (
        <div style={s.infoPanel}>
          <div style={s.infoPanelTitle}>Thong tin nhom</div>
          {members.map(m => (
            <div key={m.id} style={s.memberItem}>
              <div style={s.memberAvatar(m.color)}>
                <span className="material-symbols-outlined" style={s.memberAvatarIcon}>person</span>
              </div>
              <div style={s.memberName}>{m.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupChatPage;
