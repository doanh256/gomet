import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const T = {
  bg: '#fcf9f8',
  surfaceLowest: '#ffffff',
  surfaceLow: '#f6f3f2',
  surfaceContainer: '#f0edec',
  surfaceHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryContainer: '#d83900',
  primaryFixed: '#ffdbd1',
  secondaryContainer: '#ff7852',
  outlineVariant: '#e7bdb2',
  outline: '#926f66',
  white: '#ffffff',
};

const tabs = ['Matches', 'Tin nhắn', 'Sự kiện', 'Đặt chỗ'];

const emptyStates = [
  {
    icon: 'favorite_border',
    title: 'Chưa có match nào',
    description: 'Hãy tiếp tục khám phá để tìm người có cùng gu ẩm thực với bạn. Taste Twin của bạn đang chờ đấy!',
    cta: 'Bắt đầu khám phá',
    ctaIcon: 'explore',
    route: '/app/discover',
    accentColor: T.primary,
    bgAccent: T.primaryFixed,
  },
  {
    icon: 'local_cafe',
    title: 'Yên tĩnh quá...',
    description: 'Chưa có tin nhắn nào. Bắt đầu trò chuyện với Taste Twin của bạn!',
    cta: 'Tìm bạn ăn',
    ctaIcon: 'group',
    route: '/app/matches',
    accentColor: T.primary,
    bgAccent: T.primaryFixed,
  },
  {
    icon: 'event_available',
    title: 'Không có sự kiện nào',
    description: 'Hiện chưa có sự kiện ẩm thực nào gần bạn. Thử mở rộng phạm vi tìm kiếm hoặc xem lại sau.',
    cta: 'Khám phá sự kiện',
    ctaIcon: 'search',
    route: '/app/events',
    accentColor: T.primary,
    bgAccent: T.primaryFixed,
  },
  {
    icon: 'receipt_long',
    title: 'Chưa có đặt chỗ',
    description: 'Bạn chưa có lịch đặt bàn nào. Hãy khám phá nhà hàng và đặt chỗ cho bữa ăn tiếp theo nhé!',
    cta: 'Tìm nhà hàng',
    ctaIcon: 'restaurant',
    route: '/app/discover',
    accentColor: T.primary,
    bgAccent: T.primaryFixed,
  },
];

const EmptyStatesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const current = emptyStates[activeTab];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: T.bg,
      fontFamily: "'Manrope', sans-serif",
      color: T.onSurface,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 32px', height: 80,
        backgroundColor: T.bg,
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: '-0.03em',
          color: T.onSurface,
        }}>
          GoMet
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: T.onSurface, opacity: 0.6 }}>
              notifications
            </span>
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: T.onSurface, opacity: 0.6 }}>
              account_circle
            </span>
          </button>
        </div>
      </header>

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 40px 140px',
        minHeight: '100vh',
      }}>
        <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{
            display: 'flex', gap: 6, marginBottom: 48,
            backgroundColor: T.surfaceContainer,
            borderRadius: 9999,
            padding: '4px',
          }}>
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  backgroundColor: activeTab === i ? T.surfaceLowest : 'transparent',
                  color: activeTab === i ? T.onSurface : T.onSurfaceVariant,
                  boxShadow: activeTab === i ? '0 1px 4px rgba(28,27,27,0.08)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', marginBottom: 48, width: 256, height: 256, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundColor: T.surfaceLow,
              borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              backgroundColor: T.surfaceLowest,
              borderRadius: '50%',
              transform: 'scale(0.75)',
              boxShadow: '0 4px 16px rgba(28,27,27,0.06)',
            }} />

            <div style={{
              position: 'absolute',
              top: 40, right: 40,
              width: 12, height: 12,
              backgroundColor: T.secondaryContainer,
              borderRadius: '50%',
              opacity: 0.4,
            }} />
            <div style={{
              position: 'absolute',
              bottom: 48, left: 32,
              width: 16, height: 16,
              border: `2px solid ${T.primaryContainer}`,
              borderRadius: '50%',
              opacity: 0.2,
            }} />

            <div style={{
              position: 'relative', zIndex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center',
            }}>
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 80,
                  color: current.accentColor,
                  opacity: 0.2,
                  marginBottom: 8,
                  fontVariationSettings: "'wght' 200",
                }}
              >
                {current.icon}
              </span>
              <div style={{
                width: 48, height: 4,
                backgroundColor: T.outlineVariant,
                opacity: 0.3,
                borderRadius: 9999,
              }} />
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: T.onSurface,
            margin: '0 0 16px',
          }}>
            {current.title}
          </h1>

          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 17,
            lineHeight: 1.65,
            color: T.onSurfaceVariant,
            opacity: 0.85,
            margin: '0 0 40px',
            padding: '0 16px',
          }}>
            {current.description}
          </p>

          <button
            onClick={() => navigate(current.route)}
            style={{
              width: '100%',
              padding: '20px 32px',
              background: `linear-gradient(180deg, ${T.primary} 0%, ${T.primaryContainer} 100%)`,
              color: T.white,
              border: 'none',
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(173,44,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'opacity 0.2s, transform 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>
              {current.ctaIcon}
            </span>
            {current.cta}
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              marginTop: 24,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: T.onSurfaceVariant,
              opacity: 0.6,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
          >
            Xem lịch sử hẹn
          </button>
        </div>
      </main>

      <div style={{
        position: 'fixed', top: '25%', right: -80,
        width: 256, height: 256,
        backgroundColor: T.surfaceContainer,
        borderRadius: '50%',
        filter: 'blur(48px)',
        zIndex: 0,
        opacity: 0.5,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '25%', left: -80,
        width: 320, height: 320,
        backgroundColor: T.surfaceLow,
        borderRadius: '50%',
        filter: 'blur(48px)',
        zIndex: 0,
        opacity: 0.3,
        pointerEvents: 'none',
      }} />

      <nav style={{
        position: 'fixed', bottom: 32, left: 0, width: '100%',
        zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 16px',
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          width: '90%', maxWidth: 448,
          borderRadius: 9999,
          boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '8px 16px',
        }}>
          {[
            { icon: 'restaurant', label: 'Discover', route: '/app/discover', active: false },
            { icon: 'event', label: 'Reservations', route: '/app/reservations', active: false },
            { icon: 'chat_bubble', label: 'Messages', route: '/app/messages', active: true },
            { icon: 'person', label: 'Profile', route: '/app/profile', active: false },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 12,
                borderRadius: 9999,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: item.active ? T.primary : 'transparent',
                color: item.active ? T.white : T.onSurface,
                opacity: item.active ? 1 : 0.4,
                transform: item.active ? 'scale(1.1)' : 'scale(1)',
                boxShadow: item.active ? '0 4px 16px rgba(173,44,0,0.25)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 24,
                  marginBottom: 2,
                  fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default EmptyStatesPage;
