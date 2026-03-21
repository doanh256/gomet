import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Heart, MessageCircle, CalendarCheck, Check } from 'lucide-react';

const demoNotifications = [
  {
    id: 1,
    type: 'match',
    icon: <Heart size={20} color="white" />,
    iconBg: 'linear-gradient(135deg, #fd5068, #ff7854)',
    text: 'Bạn có match mới!',
    detail: 'Hãy bắt đầu trò chuyện ngay',
    time: '5 phút trước',
    read: false,
  },
  {
    id: 2,
    type: 'like',
    icon: <Heart size={20} color="white" />,
    iconBg: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
    text: 'Hoài An đã thích bạn',
    detail: 'Quẹt phải để match ngay!',
    time: '15 phút trước',
    read: false,
  },
  {
    id: 3,
    type: 'message',
    icon: <MessageCircle size={20} color="white" />,
    iconBg: '#4A90D9',
    text: 'Minh Anh gửi tin nhắn mới',
    detail: '"Chào bạn! Rảnh cuối tuần không?"',
    time: '1 giờ trước',
    read: false,
  },
  {
    id: 4,
    type: 'date',
    icon: <CalendarCheck size={20} color="white" />,
    iconBg: '#7C4DFF',
    text: 'Kỳ Duyên đã ứng tuyển kèo của bạn',
    detail: 'Kèo: Cà phê chiều Chủ nhật',
    time: '3 giờ trước',
    read: true,
  },
  {
    id: 5,
    type: 'match',
    icon: <Heart size={20} color="white" />,
    iconBg: 'linear-gradient(135deg, #fd5068, #ff7854)',
    text: 'Thanh Hằng đã match với bạn',
    detail: 'Gửi lời chào đầu tiên đi!',
    time: '1 ngày trước',
    read: true,
  },
  {
    id: 6,
    type: 'date',
    icon: <CalendarCheck size={20} color="white" />,
    iconBg: '#7C4DFF',
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
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa' }}>
        <div style={{ backgroundColor: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>Thông báo</h1>
          <div style={{ width: '24px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
          <Bell size={56} color="#d0d0d0" />
          <p style={{ fontSize: '16px', color: '#999', marginTop: '16px' }}>Chưa có thông báo nào</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>
          Thông báo
          {unreadCount > 0 && (
            <span style={{ marginLeft: '8px', backgroundColor: '#fd5068', color: 'white', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', verticalAlign: 'middle' }}>
              {unreadCount}
            </span>
          )}
        </h1>
        {unreadCount > 0 ? (
          <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fd5068', fontSize: '13px', fontWeight: 600 }}>
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
              backgroundColor: n.read ? 'white' : '#fff8f8',
              borderBottom: '1px solid #f0f0f0',
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
              <p style={{ fontSize: '14px', fontWeight: n.read ? 500 : 700, color: '#111418', margin: '0 0 2px 0' }}>
                {n.text}
              </p>
              <p style={{ fontSize: '13px', color: '#505965', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {n.detail}
              </p>
              <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{n.time}</p>
            </div>

            {/* Unread dot */}
            {!n.read && (
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fd5068', flexShrink: 0, marginTop: '6px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
