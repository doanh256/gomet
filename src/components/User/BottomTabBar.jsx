import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { path: '/app', icon: 'explore', label: 'Discover', exact: true },
  { path: '/app/dates', icon: 'event', label: 'Events' },
  { path: '/app/explore', icon: 'restaurant', label: 'Venues' },
  { path: '/app/matches', icon: 'favorite', label: 'Matches' },
  { path: '/app/chat', icon: 'chat_bubble', label: 'Messages' },
];

const sidebarBottom = [
  { path: '/app/settings', icon: 'settings', label: 'Settings' },
  { path: '/faq', icon: 'help_outline', label: 'Support' },
];

const mobileTabs = [
  { path: '/app', icon: 'explore', label: 'Discover', exact: true },
  { path: '/app/dates', icon: 'event', label: 'Events' },
  { path: '/app/matches', icon: 'favorite', label: 'Matches' },
  { path: '/app/chat', icon: 'chat_bubble', label: 'Chat' },
  { path: '/app/profile', icon: 'person', label: 'Profile' },
];

const isActivePath = (location, item) => {
  if (item.exact) return location.pathname === item.path || location.pathname === item.path + '/';
  return location.pathname.startsWith(item.path);
};

/* Desktop Sidebar - GOMET Hub style */
export const DesktopSidebar = () => {
  const location = useLocation();

  return (
    <aside style={{
      display: 'none',
      width: '288px',
      minWidth: '288px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--surface-container-low)',
      padding: '32px 0',
      flexDirection: 'column',
      gap: '16px',
    }} className="desktop-sidebar">
      {/* Logo */}
      <div style={{
        padding: '0 32px',
        marginBottom: '32px',
      }}>
        <span style={{
          color: 'var(--primary)',
          fontWeight: 700,
          fontSize: '26px',
          fontFamily: 'var(--font-headline)',
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
        }}>
          GOMET
        </span>
      </div>

      {/* Main Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {sidebarItems.map(item => {
          const active = isActivePath(location, item);
          return (
            <Link key={item.path} to={item.path} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 24px',
              margin: '0 8px',
              borderRadius: 'var(--radius-full)',
              background: active ? 'var(--primary-gradient)' : 'transparent',
              color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              textDecoration: 'none',
              fontFamily: 'var(--font-headline)',
              fontWeight: 500,
              fontSize: '15px',
              transition: 'all 0.15s',
            }}>
              <span className={`material-symbols-outlined ${active ? 'filled' : ''}`} style={{ fontSize: '22px' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Host an Event CTA */}
      <div style={{ padding: '0 16px' }}>
        <Link to="/app/dates" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--primary)',
          color: 'var(--on-primary)',
          fontWeight: 700,
          fontFamily: 'var(--font-headline)',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(174,47,52,0.25)',
          fontSize: '15px',
          transition: 'opacity 0.2s',
        }}>
          Host an Event
        </Link>
      </div>

      {/* Bottom links */}
      <div style={{
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '1px solid rgba(224,191,189,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}>
        {sidebarBottom.map(item => {
          const active = isActivePath(location, item);
          return (
            <Link key={item.path} to={item.path} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '8px 24px',
              margin: '0 8px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--on-surface-variant)',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'all 0.15s',
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

/* Mobile Top Bar */
export const MobileTopBar = () => (
  <header className="mobile-top-bar" style={{
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    backgroundColor: 'rgba(253,249,243,0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 50,
    boxShadow: '0 24px 48px -12px rgba(174,47,52,0.08)',
  }}>
    <span style={{
      fontSize: '24px',
      fontWeight: 900,
      color: 'var(--primary)',
      fontStyle: 'italic',
      fontFamily: 'var(--font-headline)',
      letterSpacing: '-0.02em',
    }}>GOMET</span>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Link to="/app/notifications" style={{ color: 'var(--on-surface-variant)', display: 'flex' }}>
        <span aria-hidden="true" className="material-symbols-outlined">notifications</span>
      </Link>
      <Link to="/app/profile" style={{ color: 'var(--on-surface-variant)', display: 'flex' }}>
        <span aria-hidden="true" className="material-symbols-outlined">tune</span>
      </Link>
    </div>
  </header>
);

/* Mobile Bottom Nav */
export const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav style={{
      display: 'flex',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 16px 24px',
      backgroundColor: 'var(--surface-container-low)',
      backdropFilter: 'blur(12px)',
      zIndex: 50,
      borderRadius: '24px 24px 0 0',
      boxShadow: '0 -8px 24px rgba(174,47,52,0.05)',
    }} className="mobile-bottom-nav">
      {mobileTabs.map(tab => {
        const active = isActivePath(location, tab);
        return (
          <Link key={tab.path} to={tab.path} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: active ? '12px' : '8px',
            backgroundColor: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'var(--on-surface-variant)',
            borderRadius: active ? '16px' : '0',
            transform: active ? 'translateY(-4px)' : 'none',
            boxShadow: active ? '0 8px 16px rgba(174,47,52,0.3)' : 'none',
            textDecoration: 'none',
            transition: 'all 0.2s',
            minWidth: '48px',
          }}>
            <span className={`material-symbols-outlined ${active ? 'filled' : ''}`} style={{ fontSize: '24px' }}>{tab.icon}</span>
            {!active && <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px', fontFamily: 'var(--font-body)' }}>{tab.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
