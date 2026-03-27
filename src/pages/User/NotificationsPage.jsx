import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  background: '#fcf9f8',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryFixed: '#ffdbd1',
  outlineVariant: '#e7bdb2',
};

const notificationGroups = [
  {
    label: 'Hôm nay',
    items: [
      {
        id: 1,
        type: 'match',
        icon: 'favorite',
        iconColor: '#ad2c00',
        iconBg: '#ffdbd1',
        category: 'Ghép đôi mới',
        categoryColor: '#ad2c00',
        title: 'Chúc mừng! Bạn có một ghép đôi mới với Minh Châu.',
        time: '2 giờ trước',
        read: false,
        actions: [{ label: 'Xem ghép đôi', icon: 'visibility', primary: true }],
      },
      {
        id: 2,
        type: 'event',
        icon: 'calendar_month',
        iconColor: '#0075d5',
        iconBg: '#d4e3ff',
        category: 'Nhắc nhở sự kiện',
        categoryColor: '#0075d5',
        title: 'Flash Meet "Phở Bò Hà Nội" diễn ra vào tối nay lúc 19:00.',
        time: '5 giờ trước',
        read: false,
        actions: [
          { label: 'Xem chi tiết', icon: 'info', primary: true },
          { label: 'Từ chối', icon: 'close', primary: false },
        ],
      },
      {
        id: 3,
        type: 'vang',
        icon: 'workspace_premium',
        iconColor: '#ad2c00',
        iconBg: '#ffdbd1',
        category: 'Thành tích mới',
        categoryColor: '#ad2c00',
        title: 'Chúc mừng! Bạn đã nhận được Visa Phở Bò hạng Vàng.',
        time: '5 giờ trước',
        read: false,
        actions: [{ label: 'Xem chi tiết', icon: 'toll', primary: true }],
      },
    ],
  },
  {
    label: 'Hôm qua',
    items: [
      {
        id: 4,
        type: 'message',
        icon: 'chat_bubble',
        iconColor: '#5d4038',
        iconBg: '#ebe7e7',
        category: 'Tin nhắn',
        categoryColor: '#5d4038',
        title: 'Lê Minh đã gửi lời mời Flash Meet: Món Thái tối nay.',
        time: 'Hôm qua, 18:42',
        read: true,
        actions: [
          { label: 'Xem chi tiết', icon: 'visibility', primary: true },
          { label: 'Từ chối', icon: 'close', primary: false },
        ],
      },
      {
        id: 5,
        type: 'upgrade',
        icon: 'military_tech',
        iconColor: '#5d4038',
        iconBg: '#e5e2e1',
        category: 'Nâng cấp Visa',
        categoryColor: '#5d4038',
        title: 'Visa Bánh Mì của bạn đã được nâng cấp lên hạng Bạc.',
        time: 'Hôm qua, 09:15',
        read: true,
        actions: [{ label: 'Xem chi tiết', icon: 'info', primary: true }],
      },
    ],
  },
  {
    label: 'Tuần này',
    items: [
      {
        id: 6,
        type: 'community',
        icon: 'favorite',
        iconColor: '#a83918',
        iconBg: '#ffdbd1',
        category: 'Cộng đồng',
        categoryColor: '#a83918',
        title: '5 người vừa thích bài đăng Date Post của bạn.',
        time: '3 ngày trước',
        read: true,
        actions: [{ label: 'Xem chi tiết', icon: 'visibility', primary: true }],
      },
      {
        id: 7,
        type: 'system',
        icon: 'info',
        iconColor: '#5d4038',
        iconBg: '#f0edec',
        category: 'Hệ thống',
        categoryColor: '#5d4038',
        title: 'Hồ sơ của bạn đã được xác minh thành công. Khám phá thêm tính năng!',
        time: '5 ngày trước',
        read: true,
        actions: [],
      },
    ],
  },
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(notificationGroups);

  const markAsRead = (id) => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        items: g.items.map((n) => (n.id === id ? { ...n, read: true } : n)),
      }))
    );
  };

  const markAllRead = () => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        items: g.items.map((n) => ({ ...n, read: true })),
      }))
    );
  };

  const unreadCount = groups.reduce(
    (acc, g) => acc + g.items.filter((n) => !n.read).length,
    0
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.background,
        fontFamily: "'Manrope', sans-serif",
        color: COLORS.onSurface,
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: COLORS.background,
          borderBottom: `1px solid ${COLORS.outlineVariant}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.onSurface,
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.surfaceContainerLow)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
          </button>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: COLORS.onSurface,
              margin: 0,
            }}
          >
            Thông báo
            {unreadCount > 0 && (
              <span
                style={{
                  marginLeft: '10px',
                  backgroundColor: COLORS.primary,
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  verticalAlign: 'middle',
                }}
              >
                {unreadCount}
              </span>
            )}
          </h1>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '9999px',
              border: `1px solid ${COLORS.outlineVariant}`,
              backgroundColor: 'transparent',
              color: COLORS.primary,
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.surfaceContainerLow)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>done_all</span>
            Đánh dấu đã đọc tất cả
          </button>
        )}
      </header>

      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        <p
          style={{
            color: COLORS.onSurfaceVariant,
            fontSize: '16px',
            marginBottom: '40px',
            marginTop: 0,
          }}
        >
          Cập nhật hoạt động ẩm thực và Visa của bạn
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {groups.map((group) => (
            <section key={group.label}>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: COLORS.onSurfaceVariant,
                  margin: '0 0 16px 0',
                }}
              >
                {group.label}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.items.map((n) => (
                  <NotificationCard
                    key={n.id}
                    notification={n}
                    onRead={() => markAsRead(n.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

const NotificationCard = ({ notification: n, onRead }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onRead}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: n.read
          ? hovered ? COLORS.surfaceContainerLow : COLORS.surfaceContainerLowest
          : hovered ? '#f5ded9' : COLORS.primaryFixed,
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        cursor: 'pointer',
        transition: 'background-color 0.15s, transform 0.1s',
        transform: hovered ? 'scale(0.99)' : 'scale(1)',
        border: n.read ? `1px solid ${COLORS.outlineVariant}` : `1px solid ${COLORS.primaryFixed}`,
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '9999px',
          backgroundColor: n.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: '26px',
            color: n.iconColor,
            fontVariationSettings: "'FILL' 1",
          }}
        >
          {n.icon}
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: n.categoryColor,
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {n.category}
          </span>
          <span
            style={{
              fontSize: '12px',
              color: COLORS.onSurfaceVariant,
              opacity: 0.7,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {n.time}
          </span>
        </div>

        <p
          style={{
            fontSize: '16px',
            fontWeight: n.read ? 500 : 600,
            color: COLORS.onSurface,
            margin: '0 0 16px 0',
            lineHeight: 1.5,
          }}
        >
          {n.title}
        </p>

        {n.actions.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {n.actions.map((action) => (
              <ActionButton key={action.label} action={action} />
            ))}
          </div>
        )}
      </div>

      {!n.read && (
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '9999px',
            backgroundColor: COLORS.primary,
            flexShrink: 0,
            marginTop: '4px',
          }}
        />
      )}
    </div>
  );
};

const ActionButton = ({ action }) => {
  const [hovered, setHovered] = useState(false);

  const primaryStyle = {
    padding: '8px 20px',
    borderRadius: '9999px',
    border: 'none',
    backgroundColor: hovered ? '#8f2300' : COLORS.primary,
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'Manrope', sans-serif",
    transition: 'background-color 0.15s',
  };

  const secondaryStyle = {
    padding: '8px 20px',
    borderRadius: '9999px',
    border: `1px solid ${COLORS.outlineVariant}`,
    backgroundColor: hovered ? COLORS.surfaceContainerLow : 'transparent',
    color: COLORS.onSurface,
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'Manrope', sans-serif",
    transition: 'background-color 0.15s',
  };

  return (
    <button
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={action.primary ? primaryStyle : secondaryStyle}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
        {action.icon}
      </span>
      {action.label}
    </button>
  );
};

export default NotificationsPage;
