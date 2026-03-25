import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAppContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const userName = currentUser?.name || currentUser?.displayName || 'Người dùng';
  const userAvatar = currentUser?.avatar || currentUser?.photoURL || null;
  const avatarLetter = userName.charAt(0).toUpperCase();

  const sidebarNav = [
    { label: 'Trang chủ', icon: 'home', path: '/app' },
    { label: 'Khám phá', icon: 'explore', path: '/app/map-explore' },
    { label: 'Ẩm thực', icon: 'restaurant', path: '/app/explore' },
    { label: 'Ví Vàng', icon: 'toll', path: '/app/wallet' },
    { label: 'Cài đặt', icon: 'settings', path: '/app/settings' },
  ];

  const mobileNav = [
    { label: 'GO', icon: 'home', path: '/app' },
    { label: 'QUIZ', icon: 'quiz', path: '/app/food-preferences' },
    { label: 'MEET', icon: 'groups', path: '/app/dates' },
    { label: 'CHAT', icon: 'chat', path: '/app/chat' },
    { label: 'ME', icon: 'person', path: '/app/profile' },
  ];

  const isActive = (path) => {
    if (path === '/app') return location.pathname === '/app' || location.pathname === '/app/';
    return location.pathname.startsWith(path);
  };

  // ── Shared avatar renderer ──
  const renderAvatar = (size, fontSize) => (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: userAvatar ? `url(${userAvatar}) center/cover no-repeat` : 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800, fontSize: fontSize, flexShrink: 0,
    }}>
      {!userAvatar && avatarLetter}
    </div>
  );

  // ══════════════════════════════════════
  //  DESKTOP SIDEBAR
  // ══════════════════════════════════════
  const renderSidebar = () => (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: '288px',
      backgroundColor: '#1C1B1B', display: 'flex', flexDirection: 'column',
      zIndex: 60, padding: '32px 20px 24px',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px',
        fontWeight: 900, fontStyle: 'italic', color: '#FF4D00',
        letterSpacing: '-0.04em', marginBottom: '32px', paddingLeft: '8px',
      }}>
        GOMET
      </div>

      {/* Profile card */}
      <div style={{
        backgroundColor: '#20201F', borderRadius: '1.5rem', padding: '20px 16px',
        display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px',
      }}>
        {renderAvatar(48, '18px')}
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: '15px', color: '#FDF9F3', whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{userName}</div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            marginTop: '4px', padding: '2px 10px', borderRadius: '9999px',
            backgroundColor: 'rgba(255,181,158,0.15)', fontSize: '11px',
            fontWeight: 700, color: '#FFB59E', fontFamily: "'Inter', sans-serif",
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '13px' }}>stars</span>
            Vàng
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {sidebarNav.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-current={active ? 'page' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px', borderRadius: '1rem', cursor: 'pointer',
                backgroundColor: active ? '#FF571A' : 'transparent',
                color: active ? '#FFFFFF' : '#E6BEB2',
                transition: 'all 0.2s ease', border: 'none', width: '100%',
                fontFamily: 'inherit',
                boxShadow: active ? '0px 8px 24px rgba(255,87,26,0.35)' : 'none',
              }}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: '14px',
                fontWeight: active ? 700 : 500,
              }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* New Challenge button */}
      <button
        onClick={() => navigate('/app/quests')}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          width: '100%', padding: '16px 0', borderRadius: '9999px', border: 'none',
          background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
          color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>bolt</span>
        Thử thách mới
      </button>
    </aside>
  );

  // ══════════════════════════════════════
  //  DESKTOP TOP BAR
  // ══════════════════════════════════════
  const renderDesktopTopBar = () => (
    <header style={{
      position: 'fixed', top: 0, left: '288px', right: 0, height: '72px',
      backgroundColor: 'rgba(19,19,19,0.6)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', zIndex: 50,
    }}>
      {/* Search */}
      <div style={{
        flex: 1, maxWidth: '480px', height: '44px',
        backgroundColor: '#2A2A2A', borderRadius: '9999px',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: '10px',
      }}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#E6BEB2' }}>search</span>
        <input
          type="text" placeholder="Tìm kiếm..."
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: '#FDF9F3', fontSize: '14px', fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          aria-label="Thông báo"
          onClick={() => navigate('/app/notifications')}
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            backgroundColor: '#2A2A2A', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            position: 'relative', border: 'none',
          }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '22px', color: '#E6BEB2' }}>notifications</span>
          <div style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: '#FF571A',
          }} />
        </button>
        <button aria-label="Hồ sơ cá nhân" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }} onClick={() => navigate('/app/profile')}>
          {renderAvatar(40, '15px')}
        </button>
      </div>
    </header>
  );

  // ══════════════════════════════════════
  //  MOBILE TOP HEADER
  // ══════════════════════════════════════
  const renderMobileTopBar = () => (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
      backgroundColor: 'rgba(19,19,19,0.6)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', zIndex: 50,
    }}>
      {/* Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={sidebarOpen}
        style={{
          width: '40px', height: '40px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backgroundColor: '#2A2A2A',
          border: 'none',
        }}
      >
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '24px', color: '#FDF9F3' }}>menu</span>
      </button>

      {/* Brand */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px',
        fontWeight: 900, fontStyle: 'italic', color: '#FF4D00',
        letterSpacing: '-0.04em',
      }}>
        GOMET
      </div>

      {/* Avatar with online dot */}
      <button aria-label="Hồ sơ cá nhân" style={{ position: 'relative', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }} onClick={() => navigate('/app/profile')}>
        {renderAvatar(36, '14px')}
        <div style={{
          position: 'absolute', bottom: '0px', right: '0px',
          width: '10px', height: '10px', borderRadius: '50%',
          backgroundColor: '#4CAF50', border: '2px solid #131313',
        }} />
      </button>
    </header>
  );

  // ══════════════════════════════════════
  //  MOBILE BOTTOM NAV
  // ══════════════════════════════════════
  const renderMobileBottomNav = () => (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px',
      backgroundColor: '#1C1B1B',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 8px', zIndex: 50,
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
              justifyContent: 'center', gap: '2px', padding: '8px 14px',
              borderRadius: active ? '1rem' : '0',
              background: active ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : 'transparent',
              color: active ? '#3A0B00' : '#E6BEB2',
              transform: active ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.25s ease',
              cursor: 'pointer', border: 'none',
              boxShadow: active ? '0px 8px 20px rgba(255,87,26,0.3)' : 'none',
            }}
          >
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{
              fontSize: '10px', fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.06em',
            }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  // ══════════════════════════════════════
  //  MOBILE SIDEBAR OVERLAY
  // ══════════════════════════════════════
  const renderMobileSidebarOverlay = () => {
    if (!sidebarOpen) return null;
    return (
      <>
        {/* Backdrop */}
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 70,
          }}
        />
        {/* Sidebar drawer */}
        <aside style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: '288px',
          backgroundColor: '#1C1B1B', zIndex: 80,
          display: 'flex', flexDirection: 'column', padding: '32px 20px 24px',
          animation: 'slideInLeft 0.25s ease',
        }}>
          {/* Close */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '24px', paddingLeft: '8px',
          }}>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px',
              fontWeight: 900, fontStyle: 'italic', color: '#FF4D00',
              letterSpacing: '-0.04em',
            }}>GOMET</div>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Đóng menu"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: '#2A2A2A', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                border: 'none',
              }}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FDF9F3' }}>close</span>
            </button>
          </div>

          {/* Profile */}
          <div style={{
            backgroundColor: '#20201F', borderRadius: '1.5rem', padding: '20px 16px',
            display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px',
          }}>
            {renderAvatar(48, '18px')}
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                fontSize: '15px', color: '#FDF9F3',
              }}>{userName}</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                marginTop: '4px', padding: '2px 10px', borderRadius: '9999px',
                backgroundColor: 'rgba(255,181,158,0.15)', fontSize: '11px',
                fontWeight: 700, color: '#FFB59E', fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '13px' }}>stars</span>
                Vàng
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {sidebarNav.map((item) => {
              const active = isActive(item.path);
              return (
                <div
                  key={item.path}
                  onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 16px', borderRadius: '1rem', cursor: 'pointer',
                    backgroundColor: active ? '#FF571A' : 'transparent',
                    color: active ? '#FFFFFF' : '#E6BEB2',
                    boxShadow: active ? '0px 8px 24px rgba(255,87,26,0.35)' : 'none',
                  }}
                >
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '14px',
                    fontWeight: active ? 700 : 500,
                  }}>{item.label}</span>
                </div>
              );
            })}
          </nav>

          {/* Challenge button */}
          <button
            onClick={() => { navigate('/app/quests'); setSidebarOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '16px 0', borderRadius: '9999px', border: 'none',
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>bolt</span>
            Thử thách mới
          </button>
        </aside>
      </>
    );
  };

  // ══════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313', color: '#FDF9F3' }}>
      {/* Skip to main content — visible only on keyboard focus */}
      <a href="#main-content" style={{
        position: 'absolute', top: '-40px', left: '8px', zIndex: 9999,
        background: '#FF571A', color: '#fff', padding: '8px 16px',
        borderRadius: '4px', fontSize: '14px', fontWeight: 700,
        textDecoration: 'none', transition: 'top 0.2s',
      }}
        onFocus={e => { e.currentTarget.style.top = '8px'; }}
        onBlur={e => { e.currentTarget.style.top = '-40px'; }}
      >
        Bỏ qua điều hướng
      </a>

      {!isMobile && renderSidebar()}
      {!isMobile && renderDesktopTopBar()}

      {isMobile && renderMobileTopBar()}
      {isMobile && renderMobileSidebarOverlay()}

      {/* Main content */}
      <main id="main-content" style={{
        marginLeft: isMobile ? 0 : '288px',
        paddingTop: isMobile ? '64px' : '72px',
        paddingBottom: isMobile ? '96px' : '24px',
        minHeight: '100vh',
      }}>
        <Outlet />
      </main>

      {isMobile && renderMobileBottomNav()}

      {/* Keyframe for mobile sidebar */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        input::placeholder {
          color: #E6BEB2;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default UserLayout;
