import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LivestreamPage = () => {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  const [reactions, setReactions] = useState({ '❤️': 0, '🔥': 0, '😍': 0, '👏': 0, '🎉': 0 });
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Minh Anh', avatar: '🧑', msg: 'Wow sự kiện tuyệt vời quá!' },
    { id: 2, user: 'Hoàng Nam', avatar: '👨', msg: 'Ai ở Sài Gòn không, gặp nhau đi' },
    { id: 3, user: 'Thu Hương', avatar: '👩', msg: 'Nhạc hay quá mọi người ơi ❤️' },
    { id: 4, user: 'Đức Thịnh', avatar: '🧔', msg: 'Lần đầu tham gia, vui thật' },
    { id: 5, user: 'Linh Chi', avatar: '👧', msg: 'Có ai muốn làm bạn không 😊' },
  ]);

  const handleReaction = (emoji) => { setReactions(prev => ({ ...prev, [emoji]: prev[emoji] + 1 })); };
  const handleSendChat = () => { if (!chatInput.trim()) return; setChatMessages(prev => [...prev, { id: Date.now(), user: 'Bạn', avatar: '😎', msg: chatInput }]); setChatInput(''); };

  const relatedEvents = [
    { id: 1, title: 'Speed Dating Sài Gòn', date: '28/03', viewers: 856, icon: 'groups' },
    { id: 2, title: 'Nhạc sống & Kết nối', date: '02/04', viewers: 1102, icon: 'music_note' },
  ];

  const s = {
    page: { minHeight: '100vh', background: '#131313', color: '#FDF9F3', fontFamily: 'var(--font-body)' },
    header: { display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px' },
    backBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FDF9F3', borderRadius: '9999px', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    headerTitle: { fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700 },
    mainLayout: { display: 'flex', gap: 0, flexWrap: 'wrap' },
    videoSection: { flex: 1, minWidth: 0 },
    videoArea: { position: 'relative', width: '100%', height: 400, background: 'linear-gradient(135deg, #131313, rgba(255,87,26,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
    playIcon: { fontSize: 80, color: '#FDF9F3', opacity: 0.8, cursor: 'pointer' },
    liveBadge: { position: 'absolute', top: 16, left: 16, background: '#FF571A', color: '#3A0B00', padding: '4px 12px', borderRadius: '9999px', fontSize: 12, fontWeight: 700, letterSpacing: 1, animation: 'pulse 1.5s infinite' },
    viewerCount: { position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.6)', color: '#FDF9F3', padding: '4px 12px', borderRadius: '9999px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 },
    videoOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' },
    videoTitle: { fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 800, color: '#FDF9F3' },
    videoSubtitle: { fontSize: 13, color: 'rgba(253,249,243,0.7)', marginTop: 4 },
    chatSidebar: { width: 320, background: '#1C1B1B', display: 'flex', flexDirection: 'column', maxHeight: 400 },
    chatHeader: { padding: '12px 16px', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 15, borderBottom: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', gap: 8 },
    chatMessages: { flex: 1, overflowY: 'auto', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 8 },
    chatMsg: { display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 },
    chatAvatar: { width: 24, height: 24, borderRadius: '50%', background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 },
    chatUser: { fontWeight: 700, color: '#FF571A', marginRight: 4 },
    chatInputArea: { display: 'flex', gap: 8, padding: '10px 12px', borderTop: '1px solid #2A2A2A' },
    chatField: { flex: 1, padding: '8px 12px', borderRadius: '9999px', border: 'none', background: '#2A2A2A', color: '#FDF9F3', fontSize: 13, outline: 'none' },
    sendBtn: { background: '#FFB59E', border: 'none', color: '#3A0B00', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    reactionBar: { display: 'flex', justifyContent: 'center', gap: 12, padding: '16px 20px' },
    reactionBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: '#1C1B1B', border: 'none', borderRadius: '1.5rem', padding: '10px 16px', cursor: 'pointer', fontSize: 24, transition: 'transform 0.15s' },
    reactionCount: { fontSize: 11, color: '#E6BEB2', opacity: 0.7 },
    section: { padding: '20px 20px' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: 17, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
    eventInfoCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: 16, marginBottom: 12 },
    hostRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
    hostAvatar: { width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A0B00', fontWeight: 700 },
    relatedCards: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 24 },
    relatedCard: { flex: '0 0 260px', background: '#1C1B1B', borderRadius: '1.5rem', padding: 16, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' },
    relatedIcon: { width: 48, height: 48, borderRadius: '1.5rem', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A0B00' },
    relatedTitle: { fontWeight: 700, fontSize: 14 },
    relatedMeta: { fontSize: 12, opacity: 0.6, marginTop: 2 },
  };

  return (
    <div style={s.page}>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}><span aria-hidden="true" className="material-symbols-outlined">arrow_back</span></button>
        <span style={s.headerTitle}>Livestream</span>
      </div>
      <div style={s.mainLayout}>
        <div style={s.videoSection}>
          <div style={s.videoArea}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.playIcon}>play_circle</span>
            <div style={s.liveBadge}>LIVE</div>
            <div style={s.viewerCount}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>visibility</span>1,234 đang xem</div>
            <div style={s.videoOverlay}><div style={s.videoTitle}>GOMET Date Night: Nhạc sống & Kết nối</div><div style={s.videoSubtitle}>Hosted by GOMET Events • Bắt đầu 30 phút trước</div></div>
          </div>
        </div>
        <div style={s.chatSidebar}>
          <div style={s.chatHeader}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>chat</span>Chat trực tiếp</div>
          <div style={s.chatMessages}>{chatMessages.map(m => (<div key={m.id} style={s.chatMsg}><div style={s.chatAvatar}>{m.avatar}</div><div><span style={s.chatUser}>{m.user}</span><span>{m.msg}</span></div></div>))}</div>
          <div style={s.chatInputArea}>
            <input style={s.chatField} placeholder="Nhắn tin..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendChat()} />
            <button style={s.sendBtn} onClick={handleSendChat}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span></button>
          </div>
        </div>
      </div>
      <div style={s.reactionBar}>
        {Object.entries(reactions).map(([emoji, count]) => (
          <button key={emoji} style={s.reactionBtn} onClick={() => handleReaction(emoji)} onMouseDown={e => (e.currentTarget.style.transform = 'scale(1.2)')} onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <span>{emoji}</span>{count > 0 && <span style={s.reactionCount}>{count}</span>}
          </button>
        ))}
      </div>
      <div style={s.section}>
        <div style={s.sectionTitle} onClick={() => setShowEventInfo(!showEventInfo)}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>info</span>Thông tin sự kiện
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, marginLeft: 'auto' }}>{showEventInfo ? 'expand_less' : 'expand_more'}</span>
        </div>
        {showEventInfo && (
          <div style={s.eventInfoCard}>
            <div style={s.hostRow}><div style={s.hostAvatar}>G</div><div><div style={{ fontWeight: 700, fontSize: 14 }}>GOMET Events</div><div style={{ fontSize: 12, opacity: 0.6 }}>Ban tổ chức chính thức</div></div></div>
            <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.85, marginBottom: 12 }}>Đêm nhạc sống kết hợp giao lưu dành cho các bạn độc thân tại TP.HCM. Cùng tham gia các hoạt động phá băng, trò chơi nhóm và tìm kiếm nửa kia của bạn!</p>
            <div style={{ fontSize: 13, opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>20:00 - 22:30 • Thứ 7, 28/03/2026</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>The Myst Dong Khoi, Quận 1, TP.HCM</div>
            </div>
          </div>
        )}
      </div>
      <div style={s.section}>
        <div style={s.sectionTitle}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>event</span>Sự kiện liên quan</div>
        <div style={s.relatedCards}>
          {relatedEvents.map(ev => (<div key={ev.id} style={s.relatedCard}><div style={s.relatedIcon}><span aria-hidden="true" className="material-symbols-outlined">{ev.icon}</span></div><div><div style={s.relatedTitle}>{ev.title}</div><div style={s.relatedMeta}>{ev.date} • {ev.viewers} người quan tâm</div></div></div>))}
        </div>
      </div>
    </div>
  );
};

export default LivestreamPage;
