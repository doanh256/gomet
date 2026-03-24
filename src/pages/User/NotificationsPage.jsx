import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Heart, MessageCircle, CalendarCheck, Check } from 'lucide-react';

const demoNotifications = [
  {
    id: 1,
    type: 'match',
    icon: <Heart size={20} color="#3A0B00" />,
    iconBg: 'linear-gradient(135deg, #FFB59E, #FF571A)',
    text: 'Bạn có match mới!',
    detail: 'Hãy bắt đầu trò chuyện ngay',
    time: '5 phút trước',
    read: false,
  },
  {
    id: 2,
    type: 'like',
    icon: <Heart size={20} color="#3A0B00" />,
    iconBg: 'linear-gradient(135deg, #FFB59E, #FF571A)',
    text: 'Hoài An đã thích bạn',
    detail: 'Quẹt phải để match ngay!',
    time: '15 phút trước',
    read: false,
  },
  {
    id: 3,
    type: 'message',
    icon: <MessageCircle size={20} color="#FDF9F3" />,
    iconBg: '#2A2A2A',
    text: 'Minh Anh gửi tin nhắn mới',
    detail: '"Chào bạn! Rảnh cuối tuần không?"',
    time: '1 giờ trước',
    read: false,
  },
  {
    id: 4,
    type: 'date',
    icon: <CalendarCheck size={20} color="#FDF9F3" />,
    iconBg: '#353535',
    text: 'Kỳ Duyên đã ứng tuyển kèo của bạn',
    detail: 'Kèo: Cà phê chiều Chủ nhật',
    time: '3 giờ trước',
    read: true,
  },
  {
    id: 5,
    type: 'match',
    icon: <Heart size={20} color="#3A0B00" />,
    iconBg: 'linear-gradient(135deg, #FFB59E, #FF571A)',
    text: 'Thanh Hằng đã match với bạn',
    detail: 'Gửi lời chào đầu tiên đi!',
    time: '1 ngày trước',
    read: true,
  },
  {
    id: 6,
    type: 'date',
    icon: <CalendarCheck size={20} color="#FDF9F3" />,
    iconBg: '#353535',
    text: 'Kèo "Xem phim tối thứ 7" sắp diễn ra',
    detail: 'Còn 2 ngày nữa',
    time: '1 ngày trước',
    read: true,
  },
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(demoNotifications);

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
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#FDF9F3' }}>Thông báo</h1>
          <div style={{ width: '24px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
          <Bell size={56} color="#353535" />
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
          <ArrowLeft size={24} />
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
            <Check size={20} />
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
              {n.icon}
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
