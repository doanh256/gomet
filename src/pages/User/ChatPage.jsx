import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import { getSocket, connectSocket } from '../../api/socket';

const ChatPage = () => {
  const { currentUser, conversations, fetchConversations } = useAppContext();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isMobileChat, setIsMobileChat] = useState(false);
  const endRef = useRef(null);
  const lastSentRef = useRef(0);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const convIdFromUrl = searchParams.get('cid');

  useEffect(() => { fetchConversations(); }, [fetchConversations]);

  useEffect(() => {
    if (convIdFromUrl) {
      setActiveConvId(convIdFromUrl);
      setIsMobileChat(true);
    }
  }, [convIdFromUrl]);

  useEffect(() => {
    if (activeConvId && conversations.length > 0) {
      const conv = conversations.find(c => c.id === activeConvId);
      if (conv) setOtherUser(conv.otherUser);
    }
  }, [activeConvId, conversations]);

  useEffect(() => {
    if (!activeConvId) return;
    api.get(`/conversations/${activeConvId}/messages`).then(data => {
      if (data?.messages) setChatMessages(data.messages);
    }).catch(console.error);

    const socket = getSocket() || connectSocket();
    if (socket) {
      socket.emit('join_conversation', { conversationId: activeConvId });
      const handleNewMessage = ({ conversationId, message }) => {
        if (conversationId === activeConvId) setChatMessages(prev => [...prev, message]);
      };
      socket.on('new_message', handleNewMessage);
      return () => socket.off('new_message', handleNewMessage);
    }
  }, [activeConvId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim() || !activeConvId) return;
    const now = Date.now();
    if (now - lastSentRef.current < 500) return;
    lastSentRef.current = now;
    const socket = getSocket();
    if (socket) socket.emit('send_message', { conversationId: activeConvId, text: inputText });
    setInputText('');
  };

  const getAvatarUrl = (user) => user?.avatar || '';

  const selectConv = (conv) => {
    setActiveConvId(conv.id);
    setOtherUser(conv.otherUser);
    setIsMobileChat(true);
    navigate(`/app/chat?cid=${conv.id}`, { replace: true });
  };

  const goBackToList = () => {
    setActiveConvId(null);
    setOtherUser(null);
    setIsMobileChat(false);
    navigate('/app/chat', { replace: true });
  };

  // Find active conversation for proposal details
  const activeConv = conversations.find(c => c.id === activeConvId);
  const proposal = activeConv?.datePost || null;

  const filteredConversations = conversations.filter(c => {
    if (!searchText.trim()) return true;
    return c.otherUser?.name?.toLowerCase().includes(searchText.toLowerCase());
  });

  // ==================== CONVERSATION LIST PANEL ====================
  const ConversationListPanel = () => (
    <div style={{
      width: '320px',
      flexShrink: 0,
      backgroundColor: 'var(--surface-container-lowest)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '24px 20px 16px' }}>
        <h2 style={{
          fontFamily: 'var(--font-headline)',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--on-surface)',
          margin: '0 0 16px',
        }}>
          Tin Nhan
        </h2>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--surface-container-low)',
          borderRadius: 'var(--radius-full)',
          padding: '10px 16px',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--outline)' }}>search</span>
          <input
            type="text"
            placeholder="Tim kiem..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--on-surface)',
              flex: 1,
            }}
          />
        </div>
      </div>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filteredConversations.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--on-surface-variant)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.3, display: 'block', marginBottom: '8px' }}>chat_bubble</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>Chua co tin nhan</p>
          </div>
        ) : (
          filteredConversations.map(conv => {
            const isActive = conv.id === activeConvId;
            const unread = conv.unreadCount || 0;
            return (
              <div
                key={conv.id}
                onClick={() => selectConv(conv)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--surface-container-low)' : 'transparent',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Avatar */}
                <div style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: 'var(--surface-container-high)',
                }}>
                  {getAvatarUrl(conv.otherUser) ? (
                    <img src={getAvatarUrl(conv.otherUser)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: 'var(--primary-gradient)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--on-primary)', fontWeight: 700, fontSize: '1.125rem',
                      fontFamily: 'var(--font-headline)',
                    }}>
                      {(conv.otherUser?.name || '?')[0].toUpperCase()}
                    </div>
                  )}
                  {/* Online indicator */}
                  {conv.otherUser?.isOnline && (
                    <div style={{
                      position: 'absolute',
                      bottom: '1px',
                      right: '1px',
                      width: '12px',
                      height: '12px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: '#4caf50',
                      border: '2px solid var(--surface-container-lowest)',
                    }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{
                      margin: 0,
                      fontFamily: 'var(--font-headline)',
                      fontSize: '0.9375rem',
                      fontWeight: unread > 0 ? 700 : 600,
                      color: 'var(--on-surface)',
                    }}>
                      {conv.otherUser?.name || 'Unknown'}
                    </h4>
                    <span style={{
                      fontSize: '0.6875rem',
                      color: 'var(--on-surface-variant)',
                      flexShrink: 0,
                      fontFamily: 'var(--font-body)',
                    }}>
                      {conv.lastMessage?.createdAt
                        ? new Date(conv.lastMessage.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
                        : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <p style={{
                      margin: '2px 0 0',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-body)',
                      color: unread > 0 ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                      fontWeight: unread > 0 ? 600 : 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}>
                      {conv.lastMessage?.text || 'Nhan de mo doan chat'}
                    </p>
                    {unread > 0 && (
                      <span style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--on-primary)',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        minWidth: '20px',
                        height: '20px',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 6px',
                        flexShrink: 0,
                      }}>
                        {unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  // ==================== CHAT MESSAGES PANEL ====================
  const ChatPanel = () => (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--surface)',
      overflow: 'hidden',
      minWidth: 0,
    }}>
      {!activeConvId || !otherUser ? (
        // No conversation selected
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--on-surface-variant)',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '72px', opacity: 0.2, marginBottom: '16px' }}>forum</span>
          <h3 style={{
            fontFamily: 'var(--font-headline)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--on-surface)',
            margin: '0 0 8px',
          }}>
            Chon mot cuoc tro chuyen
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
            Chon nguoi ban muon nhan tin tu danh sach ben trai
          </p>
        </div>
      ) : (
        <>
          {/* Chat Header */}
          <div style={{
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--surface-container-lowest)',
            flexShrink: 0,
          }}>
            {/* Mobile back button */}
            <button
              onClick={goBackToList}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                color: 'var(--on-surface)',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
            </button>

            {/* Avatar */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              flexShrink: 0,
              backgroundColor: 'var(--surface-container-high)',
            }}>
              {getAvatarUrl(otherUser) ? (
                <img src={getAvatarUrl(otherUser)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'var(--primary-gradient)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--on-primary)', fontWeight: 700, fontFamily: 'var(--font-headline)',
                }}>
                  {(otherUser.name || '?')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{
                margin: 0,
                fontFamily: 'var(--font-headline)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--on-surface)',
              }}>
                {otherUser.name}
              </h3>
              <span style={{
                fontSize: '0.75rem',
                color: otherUser.isOnline ? '#4caf50' : 'var(--on-surface-variant)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}>
                {otherUser.isOnline ? 'Dang hoat dong' : 'Ngoai tuyen'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{
                width: '40px', height: '40px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: 'var(--surface-container-low)',
                color: 'var(--on-surface-variant)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>call</span>
              </button>
              <button style={{
                width: '40px', height: '40px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: 'var(--surface-container-low)',
                color: 'var(--on-surface-variant)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>videocam</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {chatMessages.map(msg => {
              const isMine = msg.senderId === currentUser?.id;

              if (msg.isSystem) {
                return (
                  <div key={msg.id} style={{
                    alignSelf: 'center',
                    maxWidth: '80%',
                    margin: '12px 0',
                  }}>
                    <div style={{
                      backgroundColor: 'var(--surface-container-low)',
                      borderRadius: 'var(--radius)',
                      padding: '10px 16px',
                      fontSize: '0.8125rem',
                      color: 'var(--on-surface-variant)',
                      fontFamily: 'var(--font-body)',
                      textAlign: 'center',
                      lineHeight: 1.5,
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} style={{
                  alignSelf: isMine ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                }}>
                  <div style={{
                    background: isMine ? 'var(--primary-gradient)' : 'var(--surface-container-lowest)',
                    color: isMine ? 'var(--on-primary)' : 'var(--on-surface)',
                    padding: '12px 16px',
                    borderRadius: '20px',
                    borderBottomLeftRadius: isMine ? '20px' : '6px',
                    borderBottomRightRadius: isMine ? '6px' : '20px',
                    boxShadow: isMine
                      ? '0 4px 12px rgba(174, 47, 52, 0.15)'
                      : 'var(--card-shadow)',
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-body)',
                    wordBreak: 'break-word',
                    lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    fontSize: '0.6875rem',
                    color: 'var(--on-surface-variant)',
                    marginTop: '4px',
                    textAlign: isMine ? 'right' : 'left',
                    padding: '0 4px',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Input Bar */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'var(--surface-container-lowest)',
            flexShrink: 0,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--surface-container-low)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 6px 6px 16px',
            }}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                color: 'var(--on-surface-variant)', display: 'flex',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>mood</span>
              </button>

              <input
                type="text"
                placeholder="Nhap tin nhan..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                maxLength={500}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--on-surface)',
                  padding: '8px 0',
                }}
              />

              <button style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                color: 'var(--on-surface-variant)', display: 'flex',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>image</span>
              </button>

              <button
                onClick={handleSend}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: inputText.trim() ? 'var(--primary-gradient)' : 'var(--surface-container-high)',
                  border: 'none',
                  color: inputText.trim() ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputText.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>send</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ==================== PROPOSAL DETAILS PANEL ====================
  const ProposalPanel = () => {
    if (!activeConvId || !otherUser || !proposal) return null;

    return (
      <div style={{
        width: '384px',
        flexShrink: 0,
        backgroundColor: 'var(--surface-container-lowest)',
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {/* Active Proposal Header */}
        <div>
          <div style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: 'var(--font-body)',
            color: 'var(--primary)',
            marginBottom: '12px',
          }}>
            De Xuat Hien Tai
          </div>
          <h3 style={{
            fontFamily: 'var(--font-headline)',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--on-surface)',
            margin: '0 0 6px',
          }}>
            {proposal.title}
          </h3>
          {proposal.description && (
            <p style={{
              fontStyle: 'italic',
              color: 'var(--on-surface-variant)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              "{proposal.description}"
            </p>
          )}
        </div>

        {/* Budget */}
        {proposal.price && (
          <div style={{
            backgroundColor: 'var(--surface-container-low)',
            borderRadius: 'var(--radius)',
            padding: '16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>account_balance_wallet</span>
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--on-surface-variant)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}>
                  Ngan Sach
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--on-surface)',
                  fontFamily: 'var(--font-headline)',
                }}>
                  {proposal.price.toLocaleString('vi-VN')}d
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Venue */}
        {proposal.place && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 0',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--tertiary)' }}>restaurant</span>
            <div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--on-surface-variant)',
                fontFamily: 'var(--font-body)',
              }}>
                Dia Diem
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'var(--on-surface)',
              }}>
                {proposal.place}
              </div>
            </div>
          </div>
        )}

        {/* Date/Time */}
        {proposal.time && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 0',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--tertiary)' }}>calendar_today</span>
            <div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--on-surface-variant)',
                fontFamily: 'var(--font-body)',
              }}>
                Thoi Gian
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'var(--on-surface)',
              }}>
                {proposal.time}
              </div>
            </div>
          </div>
        )}

        {/* Payment Status */}
        {proposal.category === 'tra_phi' && (
          <div style={{
            backgroundColor: '#e8f5e9',
            borderRadius: 'var(--radius)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#2e7d32' }}>verified</span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#2e7d32',
            }}>
              Thanh toan tam giu (Escrow)
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          <button style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: 'var(--primary-gradient)',
            color: 'var(--on-primary)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(174, 47, 52, 0.2)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>handshake</span>
            Xac Nhan Thoa Thuan
          </button>
          <button style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-full)',
            border: '2px solid var(--outline-variant)',
            background: 'transparent',
            color: 'var(--on-surface-variant)',
            fontWeight: 600,
            fontSize: '0.9375rem',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
            Tu Choi De Xuat
          </button>
        </div>

        {/* Safety Info */}
        <div style={{
          backgroundColor: 'var(--surface-container-low)',
          borderRadius: 'var(--radius)',
          padding: '16px',
          marginTop: '8px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--tertiary)' }}>shield</span>
            <span style={{
              fontFamily: 'var(--font-headline)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--on-surface)',
            }}>
              An Toan Hen Ho
            </span>
          </div>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: 'var(--on-surface-variant)',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.7,
          }}>
            <li>Luon gap o noi cong cong</li>
            <li>Bao ban be/nguoi than biet</li>
            <li>Tin vao truc giac cua ban</li>
            <li>Gomet bao ve thong tin ca nhan</li>
          </ul>
        </div>
      </div>
    );
  };

  // ==================== MOBILE VIEW ====================
  // On mobile: show either list or chat, not both
  const isMobileWidth = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobileWidth) {
    if (isMobileChat && activeConvId && otherUser) {
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ChatPanel />
        </div>
      );
    }
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          flex: 1,
          backgroundColor: 'var(--surface-container-lowest)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '24px 20px 16px' }}>
            <h2 style={{
              fontFamily: 'var(--font-headline)',
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--on-surface)',
              margin: '0 0 16px',
            }}>
              Tin Nhan
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--surface-container-low)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 16px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--outline)' }}>search</span>
              <input
                type="text"
                placeholder="Tim kiem..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{
                  border: 'none', background: 'transparent', outline: 'none',
                  fontSize: '0.875rem', fontFamily: 'var(--font-body)',
                  color: 'var(--on-surface)', flex: 1,
                }}
              />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--on-surface-variant)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '56px', opacity: 0.2, display: 'block', marginBottom: '12px' }}>chat_bubble</span>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '8px' }}>Chua co tin nhan</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>Match voi ai do de bat dau tro chuyen!</p>
              </div>
            ) : (
              filteredConversations.map(conv => {
                const unread = conv.unreadCount || 0;
                return (
                  <div
                    key={conv.id}
                    onClick={() => selectConv(conv)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px 20px', cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div style={{
                      position: 'relative', width: '52px', height: '52px',
                      borderRadius: 'var(--radius-full)', overflow: 'hidden', flexShrink: 0,
                      backgroundColor: 'var(--surface-container-high)',
                    }}>
                      {getAvatarUrl(conv.otherUser) ? (
                        <img src={getAvatarUrl(conv.otherUser)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', background: 'var(--primary-gradient)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--on-primary)', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-headline)',
                        }}>
                          {(conv.otherUser?.name || '?')[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '1rem', fontWeight: unread > 0 ? 700 : 600, color: 'var(--on-surface)' }}>
                          {conv.otherUser?.name || 'Unknown'}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', flexShrink: 0, fontFamily: 'var(--font-body)' }}>
                          {conv.lastMessage?.createdAt ? new Date(conv.lastMessage.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : ''}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <p style={{
                          margin: '2px 0 0', fontSize: '0.875rem', fontFamily: 'var(--font-body)',
                          color: unread > 0 ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                          fontWeight: unread > 0 ? 600 : 400,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                        }}>
                          {conv.lastMessage?.text || 'Nhan de mo doan chat'}
                        </p>
                        {unread > 0 && (
                          <span style={{
                            backgroundColor: 'var(--primary)', color: 'var(--on-primary)',
                            fontSize: '0.6875rem', fontWeight: 700,
                            minWidth: '20px', height: '20px', borderRadius: 'var(--radius-full)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '0 6px', flexShrink: 0,
                          }}>
                            {unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==================== DESKTOP 3-PANEL LAYOUT ====================
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: 'var(--surface)',
    }}>
      <ConversationListPanel />
      <ChatPanel />
      <ProposalPanel />
    </div>
  );
};

export default ChatPage;
