import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Phone, Video, MoreVertical, Image, Smile } from 'lucide-react';
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
  const endRef = useRef(null);
  const lastSentRef = useRef(0);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const convIdFromUrl = searchParams.get('cid');

  useEffect(() => { fetchConversations(); }, [fetchConversations]);

  useEffect(() => {
    if (convIdFromUrl) setActiveConvId(convIdFromUrl);
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
    navigate(`/app/chat?cid=${conv.id}`, { replace: true });
  };

  // If no active conversation, show conversation list
  if (!activeConvId || !otherUser) {
    return (
      <div style={{ flex: 1, backgroundColor: 'white', overflowY: 'auto' }}>
        <div style={{ padding: '20px 20px 12px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#111418' }}>Chat</h1>
          <p style={{ fontSize: '14px', color: '#505965', margin: '4px 0 0' }}>{conversations.length} cuộc trò chuyện</p>
        </div>

        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#505965' }}>
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>💬</div>
            <h3 style={{ fontWeight: 700, color: '#111418', marginBottom: '8px' }}>Chưa có tin nhắn</h3>
            <p style={{ fontSize: '14px' }}>Match với ai đó để bắt đầu trò chuyện!</p>
          </div>
        ) : (
          <div>
            {conversations.map(conv => (
              <div key={conv.id} onClick={() => selectConv(conv)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', cursor: 'pointer', borderBottom: '1px solid #f5f5f5', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#fd5068,#ff7854)' }}>
                  {getAvatarUrl(conv.otherUser) && <img src={getAvatarUrl(conv.otherUser)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{conv.otherUser?.name || 'Unknown'}</h4>
                    <span style={{ fontSize: '12px', color: '#999', flexShrink: 0 }}>
                      {conv.lastMessage?.createdAt ? new Date(conv.lastMessage.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : ''}
                    </span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#656e7b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.lastMessage?.text || 'Nhấn để mở đoạn chat'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Active chat view
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white', overflow: 'hidden' }}>
      {/* Chat Header */}
      <div style={{ height: '60px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '12px', flexShrink: 0 }}>
        <button onClick={() => { setActiveConvId(null); setOtherUser(null); navigate('/app/chat', { replace: true }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', color: '#111418' }}>
          <ArrowLeft size={22} />
        </button>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#fd5068,#ff7854)' }}>
          {getAvatarUrl(otherUser) && <img src={getAvatarUrl(otherUser)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{otherUser.name}</h3>
          <span style={{ fontSize: '12px', color: '#1dda95', fontWeight: 500 }}>Online</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', color: '#fd5068' }}>
          <Phone size={20} cursor="pointer" />
          <Video size={20} cursor="pointer" />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, backgroundColor: '#fafafa', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {chatMessages.map(msg => {
          const isMine = msg.senderId === currentUser?.id;
          if (msg.isSystem) {
            return (
              <div key={msg.id} style={{ alignSelf: 'center', maxWidth: '85%', margin: '12px 0' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(253,80,104,0.08), rgba(254,193,66,0.08))', borderRadius: '16px', padding: '12px 16px', fontSize: '13px', color: '#505965', textAlign: 'center', lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} style={{ alignSelf: isMine ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
              <div style={{
                background: isMine ? 'linear-gradient(135deg, #fd5068 0%, #ff7854 100%)' : 'white',
                color: isMine ? 'white' : '#333',
                padding: '10px 14px',
                borderRadius: '20px',
                borderBottomLeftRadius: isMine ? '20px' : '6px',
                borderBottomRightRadius: isMine ? '6px' : '20px',
                boxShadow: isMine ? '0 2px 8px rgba(253,80,104,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
                fontSize: '15px', wordBreak: 'break-word', lineHeight: 1.4,
              }}>
                {msg.text}
              </div>
              <div style={{ fontSize: '11px', color: '#bbb', marginTop: '3px', textAlign: isMine ? 'right' : 'left', padding: '0 4px' }}>
                {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid #f0f0f0', backgroundColor: 'white', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f5f5f5', borderRadius: '24px', padding: '6px 6px 6px 16px' }}>
          <Smile size={22} color="#999" cursor="pointer" />
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            maxLength={500}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', padding: '8px 0' }}
          />
          <Image size={22} color="#999" cursor="pointer" />
          <button onClick={handleSend} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: inputText.trim() ? 'linear-gradient(135deg, #fd5068, #ff7854)' : '#e0e0e0',
            border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'default', transition: 'background 0.2s',
          }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
