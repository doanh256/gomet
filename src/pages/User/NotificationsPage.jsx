import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

const demoNotifications = [
  {
    id: 1,
    type: 'match',
    icon: 'favorite',
    iconBg: 'linear-gradient(135deg, #FFB59E, #FF571A)',
    text: 'Bạn có match mới!',
    detail: 'Hãy bắt đầu trò chuyện ngay',
    time: '5 phút trước',
    read: false,
    action: 'view_match',
  },
  {
    id: 2,
    type: 'vang',
    icon: 'toll',
    iconBg: 'linear-gradient(135deg, #FFD54F, #F57C00)',
    text: 'Bạn nhận được +50 Vàng!',
    detail: 'Thưởng tuần cho hoạt động ẩm thực',
    time: '15 phút trước',
    read: false,
    action: 'claim_vang',
  },
  {
    id: 3,
    type: 'message',
    icon: 'chat_bubble',
    iconBg: '#2A2A2A',
    text: 'Minh Anh gửi tin nhắn mới',
    detail: '"Chào bạn! Rảnh cuối tuần không?"',
    time: '1 giờ trước',
    read: false,
    action: null,
  },
  {
    id: 4,
    type: 'date',
    icon: 'event_available',
    iconBg: '#353535',
    text: 'Kỳ Duyên đã ứng tuyển kèo của bạn',
    detail: 'Kèo: Cà phê chiều Chủ nhật',
    time: '3 giờ trước',
    read: true,
    action: 'accept_invite',
  },
  {
    id: 5,
    type: 'vang',
    icon: 'toll',
    iconBg: 'linear-gradient(135deg, #FFD54F, #F57C00)',
    text: '+30 Vàng từ Phở Bò Hà Nội',
    detail: 'Đánh dấu đã thử thành công',
    time: '1 ngày trước',
    read: true,
    action: 'claim_vang',
  },
  {
    id: 6,
    type: 'match',
    icon: 'favorite',
    iconBg: 'linear-gradient(135deg, #FFB59E, #FF571A)',
    text: 'Thanh Hằng đã match với bạn',
    detail: 'Gửi lời chào đầu tiên đi!',
    time: '1 ngày trước',
    read: true,
    action: 'view_match',
  },
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(demoNotifications);

  const handleClaimVang = async (id) => {
    try {
      await api.post('/algorithms/vang/earn', { action: 'weekly_reward', amount: 50 });
    } catch (e) { /* ok */ }
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, claimed: true, read: true } : n));
  };

  const handleAcceptInvite = async (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, accepted: true, read: true } : n));
    navigate('/app/my-dates');
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (notifications.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#131313' }}>
        <div style={{
          background: 'rgba(57,57,57,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#E6BEB2', display: 'flex', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
          <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#FDF9F3' }}>Thông báo</h1>
          <div style={{ width: '24px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 56, color: '#353535' }}>notifications</span>
          <p style={{ fontSize: '16px', color: '#E6BEB2', marginTop: '16px' }}>Chưa có thông báo nào</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313' }}>
      {/* Header */}
      <div style={{
        background: 'rgba(57,57,57,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#E6BEB2', display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#FDF9F3' }}>
          Thông báo
          {unreadCount > 0 && (
            <span style={{ marginLeft: '8px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', verticalAlign: 'middle' }}>
              {unreadCount}
            </span>
          )}
        </h1>
        {unreadCount > 0 ? (
          <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#FFB59E', fontSize: '13px', fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>done_all</span>
          </button>
        ) : (
          <div style={{ width: '24px' }} />
        )}
      </div>

      {/* Notification list */}
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            style={{
              display: 'flex',
              gap: '14px',
              padding: '16px 24px',
              backgroundColor: n.read ? 'transparent' : 'rgba(255,181,158,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: n.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: n.iconBg.includes('gradient') ? '#3A0B00' : '#FDF9F3' }}>{n.icon}</span>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '14px', fontWeight: n.read ? 500 : 700, color: '#FDF9F3', margin: '0 0 2px 0' }}>
                {n.text}
              </p>
              <p style={{ fontSize: '13px', color: '#E6BEB2', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {n.detail}
              </p>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{n.time}</p>
              {/* Action buttons */}
              {n.action === 'claim_vang' && !n.claimed && (
                <button onClick={(e) => { e.stopPropagation(); handleClaimVang(n.id); }} style={{ marginTop: 8, padding: '6px 16px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFD54F, #F57C00)', color: '#3A0B00', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>toll</span>
                  Nhận Vàng
                </button>
              )}
              {n.action === 'claim_vang' && n.claimed && (
                <span style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, color: '#117500', fontSize: 12, fontWeight: 700 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
                  Đã nhận!
                </span>
              )}
              {n.action === 'view_match' && (
                <button onClick={(e) => { e.stopPropagation(); navigate('/app/matches'); }} style={{ marginTop: 8, padding: '6px 16px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#FDF9F3', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>visibility</span>
                  Xem ghép đôi
                </button>
              )}
              {n.action === 'accept_invite' && !n.accepted && (
                <button onClick={(e) => { e.stopPropagation(); handleAcceptInvite(n.id); }} style={{ marginTop: 8, padding: '6px 16px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
                  Chấp nhận lời mời
                </button>
              )}
              {n.action === 'accept_invite' && n.accepted && (
                <span style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, color: '#117500', fontSize: 12, fontWeight: 700 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
                  Đã chấp nhận!
                </span>
              )}
            </div>

            {/* Unread dot */}
            {!n.read && (
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFB59E', flexShrink: 0, marginTop: '6px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
