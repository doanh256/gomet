import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAppContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const userName = currentUser?.name || currentUser?.displayName || 'Người dùng';
  const userAvatar = currentUser?.avatar || currentUser?.photoURL || null;
  const avatarLetter = userName.charAt(0).toUpperCase();

  const desktopNav = [
    { label: 'Trang chủ', path: '/app' },
    { label: 'Bản đồ', path: '/app/explore' },
    { label: 'Ưu đãi', path: '/app/deals-map' },
    { label: 'Nhiệm vụ', path: '/app/karma' },
    { label: 'Đổi thưởng', path: '/app/rewards' },
  ];

  const mobileNav = [
    { label: 'Khám phá', icon: 'explore', path: '/app/explore' },
    { label: 'Chat', icon: 'chat_bubble', path: '/app/chat' },
    { label: 'Ghép đôi', icon: 'restaurant', path: '/app', center: true },
    { label: 'Yêu thích', icon: 'favorite', path: '/app/dates' },
    { label: 'Cá nhân', icon: 'person', path: '/app/profile' },
  ];

  const isActive = (path) => {
    if (path === '/app') return location.pathname === '/app' || location.pathname === '/app/';
    return location.pathname.startsWith(path);
  };

  const renderAvatar = (size, fontSize) => (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: userAvatar ? `url(${userAvatar}) center/cover no-repeat` : 'linear-gradient(135deg, #ff7852, #ad2c00)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#ffffff', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize,
    }}>
      {!userAvatar && avatarLetter}
    </div>
  );

  // ─── Desktop Top Nav ───────────────────────────────────────────────────────
  const renderDesktopNav = () => (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '72px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderBottom: '1px solid var(--outline-variant)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', zIndex: 50,
    }}>
      {/* Brand */}
      <button onClick={() => navigate('/app')} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        fontFamily: 'var(--font-headline)', fontSize: '22px',
        fontWeight: 900, color: 'var(--on-surface)', letterSpacing: '-0.04em',
      }}>
        GoMet
      </button>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {desktopNav.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-current={active ? 'page' : undefined}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 16px 6px',
                borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
                fontFamily: 'var(--font-headline)', fontWeight: active ? 700 : 500,
                fontSize: '15px',
                color: active ? 'var(--primary)' : 'var(--on-surface)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* VÀNG points chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          backgroundColor: 'var(--surface-container-low)',
          padding: '6px 14px', borderRadius: 'var(--radius-full)',
          border: '1px solid var(--outline-variant)',
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '15px', color: 'var(--vang-gold)',
            fontVariationSettings: "'FILL' 1",
          }}>stars</span>
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 700,
            fontSize: '13px', color: 'var(--on-surface)',
          }}>1.250 VÀNG</span>
        </div>

        {/* Notifications */}
        <button aria-label="Thông báo" onClick={() => navigate('/app/notifications')} style={{
          width: '40px', height: '40px', borderRadius: '50%',
          backgroundColor: 'var(--surface-container-low)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', border: 'none', position: 'relative',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface)' }}>notifications</span>
          <div style={{
            position: 'absolute', top: '9px', right: '9px',
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: 'var(--primary)', border: '2px solid var(--surface-container-lowest)',
          }} />
        </button>

        {/* Avatar */}
        <button aria-label="Hồ sơ" onClick={() => navigate('/app/profile')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}>
          {renderAvatar(38, '14px')}
        </button>
      </div>
    </header>
  );

  // ─── Mobile Top Bar ────────────────────────────────────────────────────────
  const renderMobileTopBar = () => (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderBottom: '1px solid var(--outline-variant)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', zIndex: 50,
    }}>
      {/* Brand */}
      <button onClick={() => navigate('/app')} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        fontFamily: 'var(--font-headline)', fontSize: '20px',
        fontWeight: 900, color: 'var(--on-surface)', letterSpacing: '-0.04em',
      }}>
        GoMet
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* VÀNG chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          backgroundColor: 'var(--surface-container-low)',
          padding: '4px 10px', borderRadius: 'var(--radius-full)',
          border: '1px solid var(--outline-variant)',
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '13px', color: 'var(--vang-gold)',
            fontVariationSettings: "'FILL' 1",
          }}>stars</span>
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 700,
            fontSize: '12px', color: 'var(--on-surface)',
          }}>1.250</span>
        </div>

        {/* Notifications */}
        <button aria-label="Thông báo" onClick={() => navigate('/app/notifications')} style={{
          width: '36px', height: '36px', borderRadius: '50%',
          backgroundColor: 'var(--surface-container-low)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', border: 'none', position: 'relative',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface)' }}>notifications</span>
          <div style={{
            position: 'absolute', top: '7px', right: '7px',
            width: '7px', height: '7px', borderRadius: '50%',
            backgroundColor: 'var(--primary)', border: '1.5px solid var(--surface-container-lowest)',
          }} />
        </button>

        {/* Avatar */}
        <button aria-label="Hồ sơ" onClick={() => navigate('/app/profile')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}>
          {renderAvatar(32, '12px')}
        </button>
      </div>
    </header>
  );

  // ─── Mobile Bottom Nav ─────────────────────────────────────────────────────
  const renderMobileBottomNav = () => (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: '72px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderTop: '1px solid var(--outline-variant)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 4px', zIndex: 50,
    }}>
      {mobileNav.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            aria-current={active ? 'page' : undefined}
            aria-label={item.label}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '3px', padding: item.center ? '0' : '6px 10px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
              minWidth: '56px', position: 'relative',
              marginTop: item.center ? '-16px' : '0',
            }}
          >
            {item.center ? (
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                backgroundColor: active ? 'var(--primary)' : 'var(--surface-container-high)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(173,44,0,0.2)',
                border: '3px solid var(--surface-container-lowest)',
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: '24px',
                  color: active ? '#ffffff' : 'var(--on-surface)',
                }}>{item.icon}</span>
              </div>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
            )}
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '10px',
              letterSpacing: '0.01em', marginTop: item.center ? '2px' : '0',
            }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--on-surface)' }}>
      <a href="#main-content" style={{
        position: 'absolute', top: '-40px', left: '8px', zIndex: 9999,
        background: 'var(--primary)', color: '#fff', padding: '8px 16px',
        borderRadius: '4px', fontSize: '14px', fontWeight: 700,
        textDecoration: 'none', transition: 'top 0.2s',
      }}
        onFocus={e => { e.currentTarget.style.top = '8px'; }}
        onBlur={e => { e.currentTarget.style.top = '-40px'; }}
      >
        Bỏ qua điều hướng
      </a>

      {isMobile ? renderMobileTopBar() : renderDesktopNav()}

      <main id="main-content" style={{
        paddingTop: isMobile ? '60px' : '72px',
        paddingBottom: isMobile ? '88px' : '32px',
        minHeight: '100vh',
      }}>
        <Outlet />
      </main>

      {isMobile && renderMobileBottomNav()}
    </div>
  );
};

export default UserLayout;
