import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Mock data ───────────────────────────────────────────────────────────────
const conversations = [
  { id: 1, name: 'Hoàng Nam', lastMsg: 'Mình đi ăn Phở Thin nhé?', time: '10:45 SA', matchDish: 'PHỞ BÒ', unread: 2, match: 82, color: '#ad2c00' },
  { id: 2, name: 'Linh Chi',  lastMsg: 'Đã gửi một ảnh',            time: 'Thứ 3',    matchDish: 'PIZZA',  unread: 0, match: 88, color: '#6b3fa0' },
  { id: 3, name: 'Đức Duy',   lastMsg: 'Hẹn gặp sau nhé!',          time: 'Thứ 2',    matchDish: 'SUSHI',  unread: 1, match: 74, color: '#1565c0' },
];

const selectedUser = { name: 'Linh Chi', age: 24, location: 'Hoàn Kiếm, Hà Nội', match: 98, color: '#6b3fa0' };

const messages = [
  { id: 1, from: 'other', text: 'Chào Linh! Thấy profile của bạn có "Visa Phở Bò" hạng Diamond, mình rất tương đồng! Bạn hay ăn Phở ở đâu thế?', time: '09:41 SA' },
  { id: 2, from: 'me',    text: 'Hi Phi! Phải công nhận là mình nghiện Phở thật. Mình hay ghé quán Phở Thin Lô Đức, vì ở đó nước dùng đặc trưng. Bạn đã thử chưa?', time: '09:47 SA' },
  { id: 3, from: 'other', text: 'Lí mình cũng thích chỗ đó đấy! Đây là bát phở mình vừa ăn sáng nay 🍜', time: '09:49 SA' },
];

const newMatches = [
  { id: 1, name: 'Minh Ánh', color: '#2e7d32' },
  { id: 2, name: 'Thu Thủy', color: '#c62828' },
];

const sharedDishes = ['PHỞ BÒ', 'PIZZA', 'BÚN CHẢ', 'BÁNH MÌ', 'MÌ QUẢNG', 'LẨU THÁI'];

// ─── Taste Match Radar SVG (pentagon) ────────────────────────────────────────
const TasteRadar = ({ match = 98 }) => {
  const cx = 100, cy = 100, r = 75;
  const axes = 5;

  const point = (angle, radius) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  const pentagonPoints = (radius) =>
    Array.from({ length: axes }, (_, i) => point((360 / axes) * i, radius));

  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z';

  const outerPts = pentagonPoints(r);
  const innerPts = pentagonPoints(r * (match / 100));

  return (
    <svg viewBox="0 0 200 200" width="160" height="160" style={{ display: 'block', margin: '0 auto' }}>
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((scale, i) => (
        <path key={i} d={toPath(pentagonPoints(r * scale))} fill="none" stroke="#e7bdb2" strokeWidth="1" />
      ))}
      {/* Spokes */}
      {outerPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p[0]} y2={p[1]} stroke="#e7bdb2" strokeWidth="1" />
      ))}
      {/* Filled radar area */}
      <path d={toPath(innerPts)} fill="rgba(173,44,0,0.18)" stroke="#ad2c00" strokeWidth="2" />
      {/* Dots */}
      {innerPts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#ad2c00" />
      ))}
      {/* Center label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="800" fill="#ad2c00">{match}%</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#5d4038">TƯƠNG HỢP</text>
    </svg>
  );
};

// ─── Avatar circle ────────────────────────────────────────────────────────────
const Avatar = ({ name = '', color = '#ad2c00', size = 44 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontWeight: 700, fontSize: size * 0.4, flexShrink: 0,
  }}>
    {name.charAt(0).toUpperCase()}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const ChatPage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [activeId, setActiveId] = useState(2); // Linh Chi selected by default
  const [isMobileChat, setIsMobileChat] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatMsgs, setChatMsgs] = useState(messages);

  const activeConv = conversations.find(c => c.id === activeId);

  const filtered = conversations.filter(c =>
    !searchText.trim() || c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSend = () => {
    if (!inputText.trim()) return;
    setChatMsgs(prev => [...prev, { id: Date.now(), from: 'me', text: inputText, time: 'Vừa xong' }]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // ─── Responsive: detect desktop ───────────────────────────────────────────
  const isDesktop = window.innerWidth >= 900;

  // ═══════════════════════════════════════════════════════════════════════════
  // MOBILE LAYOUT
  // ═══════════════════════════════════════════════════════════════════════════
  if (!isDesktop) {
    return (
      <div style={{
        minHeight: '100dvh', background: '#fcf9f8',
        fontFamily: 'var(--font-body, "Manrope", sans-serif)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* ── Chat window (mobile) ── */}
        {isMobileChat && activeConv ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
            {/* Header */}
            <div style={{
              background: '#fff', borderBottom: '1px solid #e7bdb2',
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <button onClick={() => setIsMobileChat(false)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#ad2c00', fontSize: 22, padding: 0, lineHeight: 1,
              }}>←</button>
              <Avatar name={activeConv.name} color={activeConv.color} size={38} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1c1b1b',
                  fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)' }}>
                  {activeConv.name}
                </div>
                <div style={{ fontSize: 11, color: '#5d4038' }}>
                  MATCHINGDISH: {activeConv.matchDish}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {chatMsgs.map(msg => (
                <div key={msg.id} style={{
                  display: 'flex', flexDirection: msg.from === 'me' ? 'row-reverse' : 'row',
                  gap: 8, alignItems: 'flex-end',
                }}>
                  {msg.from === 'other' && <Avatar name={activeConv.name} color={activeConv.color} size={30} />}
                  <div style={{ maxWidth: '72%' }}>
                    <div style={{
                      background: msg.from === 'me' ? '#ad2c00' : '#fff',
                      color: msg.from === 'me' ? '#fff' : '#1c1b1b',
                      borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      padding: '10px 14px', fontSize: 14, lineHeight: 1.5,
                      border: msg.from === 'me' ? 'none' : '1px solid #e7bdb2',
                    }}>{msg.text}</div>
                    <div style={{ fontSize: 10, color: '#5d4038', marginTop: 4,
                      textAlign: msg.from === 'me' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{
              background: '#fff', borderTop: '1px solid #e7bdb2',
              padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhắn tin..."
                style={{
                  flex: 1, border: '1.5px solid #e7bdb2', borderRadius: 24,
                  padding: '10px 16px', fontSize: 14, outline: 'none',
                  background: '#fcf9f8', color: '#1c1b1b',
                  fontFamily: 'var(--font-body, "Manrope", sans-serif)',
                }}
              />
              <button onClick={handleSend} style={{
                background: '#ad2c00', border: 'none', borderRadius: '50%',
                width: 40, height: 40, cursor: 'pointer', color: '#fff',
                fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>➤</button>
            </div>
          </div>
        ) : (
          /* ── Conversation list (mobile) ── */
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ padding: '20px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{
                margin: 0, fontSize: 28, fontWeight: 800, color: '#1c1b1b',
                fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              }}>Tin nhắn</h1>
              <Avatar name="T" color="#ad2c00" size={38} />
            </div>

            {/* Search */}
            <div style={{ padding: '0 20px 16px' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5d4038', fontSize: 16 }}>🔍</span>
                <input
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeholder="Tìm kiếm bạn bè hoặc món ăn..."
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    border: '1.5px solid #e7bdb2', borderRadius: 24,
                    padding: '11px 16px 11px 40px', fontSize: 14,
                    background: '#fff', color: '#1c1b1b', outline: 'none',
                    fontFamily: 'var(--font-body, "Manrope", sans-serif)',
                  }}
                />
              </div>
            </div>

            {/* New Matches */}
            <div style={{ padding: '0 20px 12px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#5d4038', letterSpacing: 1, marginBottom: 12 }}>
                LƯỢT TƯƠNG HỢP MỚI
              </div>
              <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4 }}>
                {newMatches.map(m => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <Avatar name={m.name} color={m.color} size={52} />
                    <span style={{ fontSize: 12, color: '#1c1b1b', fontWeight: 600, textAlign: 'center', maxWidth: 56 }}>{m.name}</span>
                  </div>
                ))}
                {/* Tin thêm button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    border: '2px dashed #ad2c00', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#ad2c00', fontSize: 22, fontWeight: 300,
                  }}>+</div>
                  <span style={{ fontSize: 12, color: '#ad2c00', fontWeight: 600 }}>Tin thêm</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#e7bdb2', margin: '0 20px 4px' }} />

            {/* Conversation list */}
            <div>
              {filtered.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => { setActiveId(conv.id); setIsMobileChat(true); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 20px', cursor: 'pointer',
                    background: activeId === conv.id ? '#fff5f2' : 'transparent',
                    borderBottom: '1px solid #faeae5',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <Avatar name={conv.name} color={conv.color} size={48} />
                    {conv.unread > 0 && (
                      <div style={{
                        position: 'absolute', top: -2, right: -2,
                        background: '#ad2c00', color: '#fff', borderRadius: '50%',
                        width: 18, height: 18, fontSize: 10, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{conv.unread}</div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: '#1c1b1b',
                        fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)' }}>
                        {conv.name}
                      </span>
                      <span style={{ fontSize: 11, color: '#5d4038' }}>{conv.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#5d4038', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 5 }}>
                      {conv.lastMsg}
                    </div>
                    <span style={{
                      display: 'inline-block', background: '#fff0ed',
                      border: '1px solid #ad2c00', color: '#ad2c00',
                      borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                    }}>
                      MATCHINGDISH: {conv.matchDish}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DESKTOP LAYOUT — 3 panels
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{
      display: 'flex', height: '100vh', background: '#fcf9f8',
      fontFamily: 'var(--font-body, "Manrope", sans-serif)',
      overflow: 'hidden',
    }}>

      {/* ── LEFT PANEL (280px) ── */}
      <div style={{
        width: 280, flexShrink: 0,
        background: '#fff',
        borderRight: '1px solid #e7bdb2',
        display: 'flex', flexDirection: 'column',
        padding: '28px 0',
      }}>
        {/* Brand */}
        <div style={{ padding: '0 28px 24px' }}>
          <div style={{
            fontSize: 26, fontWeight: 800, color: '#ad2c00', letterSpacing: 1,
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          }}>GOMET</div>
          <div style={{ fontSize: 11, color: '#5d4038', fontWeight: 600, letterSpacing: 1.5, marginTop: 2 }}>
            HẸN HÒ ẨM THỰC
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {[
            { icon: '💬', label: 'Trò chuyện', active: true,  path: '/app/chat' },
            { icon: '🔍', label: 'Khám phá',   active: false, path: '/app/discover' },
            { icon: '❤️', label: 'Yêu thích',  active: false, path: '/app/favorites' },
            { icon: '👤', label: 'Cá nhân',    active: false, path: '/app/profile' },
          ].map(item => (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px', borderRadius: 12, cursor: 'pointer', marginBottom: 4,
                background: item.active ? '#fff0ed' : 'transparent',
                color: item.active ? '#ad2c00' : '#5d4038',
                fontWeight: item.active ? 700 : 500, fontSize: 15,
                transition: 'background 0.15s',
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Tìm bạn mới */}
        <div style={{ padding: '0 20px' }}>
          <button
            onClick={() => navigate('/app/discover')}
            style={{
              width: '100%', background: '#ad2c00', color: '#fff',
              border: 'none', borderRadius: 12, padding: '13px 0',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              letterSpacing: 0.5,
            }}
          >
            Tìm bạn mới
          </button>
        </div>
      </div>

      {/* ── CENTER PANEL (flex-1) ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        borderRight: '1px solid #e7bdb2', minWidth: 0,
      }}>
        {/* Center header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid #e7bdb2',
          background: '#fff',
        }}>
          <h2 style={{
            margin: '0 0 14px', fontSize: 20, fontWeight: 800, color: '#1c1b1b',
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          }}>Tin nhắn</h2>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5d4038' }}>🔍</span>
            <input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Tìm kiếm bạn bè hoặc món ăn..."
              style={{
                width: '100%', boxSizing: 'border-box',
                border: '1.5px solid #e7bdb2', borderRadius: 24,
                padding: '10px 16px 10px 40px', fontSize: 14,
                background: '#fcf9f8', color: '#1c1b1b', outline: 'none',
                fontFamily: 'var(--font-body, "Manrope", sans-serif)',
              }}
            />
          </div>
        </div>

        {/* New matches row */}
        <div style={{ padding: '16px 24px 12px', borderBottom: '1px solid #faeae5', background: '#fff' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#5d4038', letterSpacing: 1, marginBottom: 10 }}>
            LƯỢT TƯƠNG HỢP MỚI
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {newMatches.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                <Avatar name={m.name} color={m.color} size={46} />
                <span style={{ fontSize: 11, color: '#1c1b1b', fontWeight: 600 }}>{m.name}</span>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                border: '2px dashed #ad2c00', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ad2c00', fontSize: 20,
              }}>+</div>
              <span style={{ fontSize: 11, color: '#ad2c00', fontWeight: 600 }}>Tin thêm</span>
            </div>
          </div>
        </div>

        {/* Conversation list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(conv => (
            <div
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 24px', cursor: 'pointer',
                background: activeId === conv.id ? '#fff5f2' : '#fff',
                borderBottom: '1px solid #faeae5',
                borderLeft: activeId === conv.id ? '3px solid #ad2c00' : '3px solid transparent',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Avatar name={conv.name} color={conv.color} size={46} />
                {conv.unread > 0 && (
                  <div style={{
                    position: 'absolute', top: -2, right: -2,
                    background: '#ad2c00', color: '#fff', borderRadius: '50%',
                    width: 18, height: 18, fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{conv.unread}</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#1c1b1b',
                    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)' }}>
                    {conv.name}
                  </span>
                  <span style={{ fontSize: 11, color: '#5d4038' }}>{conv.time}</span>
                </div>
                <div style={{ fontSize: 12, color: '#5d4038', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 5 }}>
                  {conv.lastMsg}
                </div>
                <span style={{
                  display: 'inline-block', background: '#fff0ed',
                  border: '1px solid #ad2c00', color: '#ad2c00',
                  borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
                }}>
                  MATCHINGDISH: {conv.matchDish}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat window (bottom of center panel) */}
        {activeId && (
          <div style={{
            height: 320, borderTop: '1px solid #e7bdb2',
            display: 'flex', flexDirection: 'column', background: '#fcf9f8',
          }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chatMsgs.map(msg => (
                <div key={msg.id} style={{
                  display: 'flex',
                  flexDirection: msg.from === 'me' ? 'row-reverse' : 'row',
                  gap: 8, alignItems: 'flex-end',
                }}>
                  {msg.from === 'other' && activeConv && (
                    <Avatar name={activeConv.name} color={activeConv.color} size={28} />
                  )}
                  <div style={{ maxWidth: '68%' }}>
                    <div style={{
                      background: msg.from === 'me' ? '#ad2c00' : '#fff',
                      color: msg.from === 'me' ? '#fff' : '#1c1b1b',
                      borderRadius: msg.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      padding: '9px 14px', fontSize: 13, lineHeight: 1.5,
                      border: msg.from === 'me' ? 'none' : '1px solid #e7bdb2',
                    }}>{msg.text}</div>
                    <div style={{ fontSize: 10, color: '#5d4038', marginTop: 3, textAlign: msg.from === 'me' ? 'right' : 'left' }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              padding: '10px 16px', borderTop: '1px solid #e7bdb2',
              background: '#fff', display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhắn tin..."
                style={{
                  flex: 1, border: '1.5px solid #e7bdb2', borderRadius: 24,
                  padding: '9px 16px', fontSize: 13, outline: 'none',
                  background: '#fcf9f8', color: '#1c1b1b',
                  fontFamily: 'var(--font-body, "Manrope", sans-serif)',
                }}
              />
              <button onClick={handleSend} style={{
                background: '#ad2c00', border: 'none', borderRadius: '50%',
                width: 36, height: 36, cursor: 'pointer', color: '#fff',
                fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>➤</button>
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT PANEL (320px) ── */}
      <div style={{
        width: 320, flexShrink: 0,
        background: '#fff', display: 'flex', flexDirection: 'column',
        overflowY: 'auto', padding: '28px 24px',
      }}>
        {activeConv ? (
          <>
            {/* Profile header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24, gap: 10 }}>
              <Avatar name={selectedUser.name} color={selectedUser.color} size={72} />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 20, fontWeight: 800, color: '#1c1b1b',
                  fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                }}>{selectedUser.name}, {selectedUser.age}</div>
                <div style={{ fontSize: 12, color: '#5d4038', marginTop: 4 }}>📍 {selectedUser.location}</div>
              </div>
            </div>

            {/* Radar chart */}
            <div style={{
              background: '#fcf9f8', border: '1px solid #e7bdb2',
              borderRadius: 16, padding: '20px 16px', marginBottom: 20,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#5d4038',
                letterSpacing: 1, textAlign: 'center', marginBottom: 12,
              }}>VỊ GIÁC TƯƠNG HỢP</div>
              <TasteRadar match={selectedUser.match} />
            </div>

            {/* Shared dishes */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#5d4038',
                letterSpacing: 1, marginBottom: 12,
              }}>BẢNG CHUYÊN VỊ CHUNG</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {sharedDishes.map(dish => (
                  <span key={dish} style={{
                    background: '#fff0ed', border: '1px solid #ad2c00',
                    color: '#ad2c00', borderRadius: 20,
                    padding: '4px 12px', fontSize: 11, fontWeight: 700,
                  }}>{dish}</span>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <button style={{
              width: '100%', background: '#ad2c00', color: '#fff',
              border: 'none', borderRadius: 12, padding: '14px 0',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              letterSpacing: 0.5, marginTop: 'auto',
            }}>
              Hẹn gặp {selectedUser.name}
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#5d4038', textAlign: 'center', gap: 12 }}>
            <span style={{ fontSize: 40 }}>💬</span>
            <div style={{ fontSize: 14 }}>Chọn một cuộc trò chuyện để bắt đầu</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
