import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const conversations = [
  { id: 1, name: 'Hoàng Nam', lastMsg: 'Mình đi ăn Phở Thìn nhé?', time: '10:45 SA', matchDish: 'Phở bò', unread: 2, color: '#ad2c00', online: true },
  { id: 2, name: 'Linh Chi', lastMsg: 'Đã gửi một ảnh', time: 'Thứ 3', matchDish: 'Pizza', unread: 0, color: '#6b3fa0', online: false },
  { id: 3, name: 'Đức Duy', lastMsg: 'Hẹn gặp bạn sau nha!', time: 'Thứ 2', matchDish: 'Sushi', unread: 1, color: '#1565c0', online: false },
];

const newMatches = [
  { id: 1, name: 'Minh Anh', color: '#2e7d32' },
  { id: 2, name: 'Thu Thủy', color: '#c62828' },
];

const chatMessages = [
  { id: 1, from: 'other', text: 'Chào bạn! Mình thấy bạn cũng thích món Phở bò Thìn. Cuối tuần này bạn có rảnh không?', time: '10:45 SA' },
  { id: 2, from: 'me', text: 'Chào Nam! Mình rảnh nè. Phở Thìn Lò Đúc đúng không bạn? Mình cực thích ở đó luôn!', time: '10:47 SA' },
  { id: 3, from: 'shared_card', time: '10:48 SA' },
  { id: 4, from: 'me', text: 'Mình đi lúc 10h sáng chủ nhật nhé?', time: '10:49 SA' },
];

const Avatar = ({ name = '', color = '#ad2c00', size = 44 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: size * 0.38,
    flexShrink: 0,
    letterSpacing: 0.5,
  }}>
    {name.charAt(0).toUpperCase()}
  </div>
);

const SharedDishCard = () => (
  <div style={{
    alignSelf: 'center',
    width: '100%',
    maxWidth: 280,
    background: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(173,44,0,0.08)',
    border: '1px solid rgba(173,44,0,0.1)',
  }}>
    <div style={{
      position: 'relative',
      height: 140,
      background: 'linear-gradient(135deg, #ad2c00 0%, #d84000 40%, #ff7852 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span className="material-symbols-outlined" style={{
        fontSize: 64,
        color: 'rgba(255,255,255,0.7)',
        fontVariationSettings: "'FILL' 1",
      }}>ramen_dining</span>
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        background: '#ad2c00',
        color: '#ffffff',
        padding: '3px 10px',
        borderRadius: 9999,
        fontSize: 9,
        fontWeight: 700,
        fontFamily: "'Manrope', sans-serif",
        letterSpacing: 1,
        textTransform: 'uppercase',
      }}>Visa Món Ăn</div>
    </div>
    <div style={{ padding: '16px 20px 20px', textAlign: 'center' }}>
      <h5 style={{
        margin: '0 0 4px',
        fontSize: 17,
        fontWeight: 700,
        color: '#1c1b1b',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>Phở Bò Tái Lăn</h5>
      <p style={{
        margin: '0 0 16px',
        fontSize: 12,
        color: '#5d4038',
        fontFamily: "'Manrope', sans-serif",
      }}>Món ăn chung của hai bạn</p>
      <button style={{
        width: '100%',
        padding: '11px 0',
        background: '#f0edec',
        color: '#ad2c00',
        border: 'none',
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "'Manrope', sans-serif",
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        cursor: 'pointer',
      }}>Xem chi tiết</button>
    </div>
  </div>
);

const ChatWindow = ({ conv, onBack, messages, setMessages }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text: inputText, time: 'Vừa xong' }]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#fcf9f8',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fcf9f8',
        borderBottom: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              marginLeft: -8,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1c1b1b',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name={conv.name} color={conv.color} size={40} />
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: 15,
                color: '#1c1b1b',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1.2,
              }}>{conv.name}</div>
              <div style={{
                fontSize: 10,
                color: '#ad2c00',
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 2,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ad2c00', display: 'inline-block' }} />
                Đang hoạt động
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: '#f6f3f2',
            color: '#1c1b1b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>call</span>
          </button>
          <button style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: '#f6f3f2',
            color: '#1c1b1b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>videocam</span>
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        <div style={{ alignSelf: 'center' }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(93,64,56,0.5)',
            textTransform: 'uppercase',
            letterSpacing: 3,
            fontFamily: "'Manrope', sans-serif",
          }}>Hôm nay, 10:45 SA</span>
        </div>

        {messages.map(msg => {
          if (msg.from === 'shared_card') {
            return <SharedDishCard key={msg.id} />;
          }
          if (msg.from === 'other') {
            return (
              <div key={msg.id} style={{ display: 'flex', gap: 10, maxWidth: '85%', alignItems: 'flex-end' }}>
                <Avatar name={conv.name} color={conv.color} size={32} />
                <div style={{
                  background: '#f6f3f2',
                  color: '#1c1b1b',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '12px 16px',
                  fontSize: 14,
                  lineHeight: 1.55,
                  fontFamily: "'Manrope', sans-serif",
                }}>{msg.text}</div>
              </div>
            );
          }
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, maxWidth: '85%', alignSelf: 'flex-end' }}>
              <div style={{
                background: '#ad2c00',
                color: '#ffffff',
                borderRadius: '16px 16px 4px 16px',
                padding: '12px 16px',
                fontSize: 14,
                lineHeight: 1.55,
                fontFamily: "'Manrope', sans-serif",
                boxShadow: '0 2px 12px rgba(173,44,0,0.2)',
              }}>{msg.text}</div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '16px 24px 24px',
        background: '#fcf9f8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#ad2c00',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 30 }}>add_circle</span>
          </button>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhắn tin..."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: '#ebe7e7',
                border: 'none',
                borderRadius: 9999,
                padding: '14px 52px 14px 20px',
                fontSize: 14,
                color: '#1c1b1b',
                outline: 'none',
                fontFamily: "'Manrope', sans-serif",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ad2c00',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState(chatMessages);

  const activeConv = conversations.find(c => c.id === selectedChat);

  const filtered = conversations.filter(c =>
    !searchText.trim() || c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (selectedChat && activeConv) {
    return (
      <ChatWindow
        conv={activeConv}
        onBack={() => setSelectedChat(null)}
        messages={messages}
        setMessages={setMessages}
      />
    );
  }

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      minHeight: '100dvh',
      background: '#fcf9f8',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Manrope', sans-serif",
      color: '#1c1b1b',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: 96 }}>
        <header style={{
          paddingTop: 40,
          paddingLeft: 32,
          paddingRight: 32,
          paddingBottom: 24,
          background: '#fcf9f8',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 32,
          }}>
            <h1 style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 800,
              color: '#1c1b1b',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: -0.5,
              lineHeight: 1.1,
            }}>Tin nhắn</h1>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#f0edec',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Avatar name="T" color="#ad2c00" size={48} />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#5d4038',
              fontSize: 22,
            }}>search</span>
            <input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Tìm kiếm bạn bè hoặc món ăn..."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: '#ebe7e7',
                border: 'none',
                borderRadius: 16,
                padding: '16px 16px 16px 48px',
                fontSize: 14,
                color: '#1c1b1b',
                outline: 'none',
                fontFamily: "'Manrope', sans-serif",
              }}
            />
          </div>
        </header>

        <div style={{ paddingLeft: 32, paddingRight: 32, marginBottom: 40 }}>
          <h3 style={{
            margin: '0 0 16px',
            fontSize: 12,
            fontWeight: 700,
            color: '#5d4038',
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontFamily: "'Manrope', sans-serif",
          }}>Lượt tương hợp mới</h3>
          <div style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            {newMatches.map(m => (
              <div key={m.id} style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  padding: 3,
                  border: '2px solid #ad2c00',
                  boxSizing: 'border-box',
                }}>
                  <Avatar name={m.name} color={m.color} size={54} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1c1b1b' }}>{m.name}</span>
              </div>
            ))}
            <div style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              color: '#ad2c00',
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#ffdbd1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>add</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Tìm thêm</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, paddingLeft: 16, paddingRight: 16 }}>
          {filtered.map(conv => (
            <div
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 16,
                marginBottom: 8,
                borderRadius: 16,
                background: '#ffffff',
                cursor: 'pointer',
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Avatar name={conv.name} color={conv.color} size={56} />
                {conv.online && (
                  <div style={{
                    position: 'absolute',
                    bottom: 1,
                    right: 1,
                    width: 14,
                    height: 14,
                    background: '#22c55e',
                    border: '2px solid #ffffff',
                    borderRadius: '50%',
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                  <span style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: '#1c1b1b',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>{conv.name}</span>
                  <span style={{
                    fontSize: 10,
                    color: '#5d4038',
                    fontWeight: 500,
                  }}>{conv.time}</span>
                </div>
                <p style={{
                  margin: '0 0 8px',
                  fontSize: 13,
                  color: '#5d4038',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: conv.unread > 0 ? 600 : 400,
                }}>{conv.lastMsg}</p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 9999,
                  background: conv.id === 1 ? 'rgba(255,120,82,0.1)' : '#ebe7e7',
                  border: conv.id === 1 ? '1px solid rgba(255,120,82,0.2)' : '1px solid rgba(231,189,178,0.3)',
                }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: 14,
                    color: conv.id === 1 ? '#ad2c00' : '#5d4038',
                    fontVariationSettings: "'FILL' 1",
                  }}>restaurant_menu</span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: conv.id === 1 ? '#ad2c00' : '#5d4038',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}>Matching Dish: {conv.matchDish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <nav style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 400,
        zIndex: 50,
      }}>
        <div style={{
          background: 'rgba(252,249,248,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 9999,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 20px 40px -15px rgba(173,44,0,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <button
            onClick={() => navigate('/app')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: 24 }}>explore</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#5d4038', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: "'Manrope', sans-serif" }}>Khám phá</span>
          </button>

          <button
            onClick={() => navigate('/app/chat')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 0,
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute',
              top: -2,
              right: -4,
              width: 8,
              height: 8,
              background: '#ad2c00',
              borderRadius: '50%',
            }} />
            <span className="material-symbols-outlined" style={{ color: '#ad2c00', fontSize: 24, fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#ad2c00', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: "'Manrope', sans-serif" }}>Trò chuyện</span>
          </button>

          <button
            onClick={() => navigate('/app')}
            style={{
              width: 56,
              height: 56,
              background: '#ad2c00',
              color: '#ffffff',
              border: '4px solid #fcf9f8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: -40,
              boxShadow: '0 8px 24px rgba(173,44,0,0.3)',
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 26, fontVariationSettings: "'FILL' 1" }}>restaurant</span>
          </button>

          <button
            onClick={() => navigate('/app/favorites')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: 24 }}>favorite</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#5d4038', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: "'Manrope', sans-serif" }}>Yêu thích</span>
          </button>

          <button
            onClick={() => navigate('/app/profile')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: 24 }}>person_2</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#5d4038', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: "'Manrope', sans-serif" }}>Cá nhân</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ChatPage;
