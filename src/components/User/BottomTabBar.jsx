import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/app', icon: 'home', activeIcon: 'home', label: 'Home', exact: true },
  { path: '/app/dates', icon: 'restaurant', activeIcon: 'restaurant', label: 'Dates' },
  { path: '/app/matches', icon: 'favorite', activeIcon: 'favorite', label: 'Matches' },
  { path: '/app/chat', icon: 'event_available', activeIcon: 'event_available', label: 'Appts' },
  { path: '/app/profile', icon: 'person_2', activeIcon: 'person_2', label: 'Profile' },
];

const sidebarItems = [
  { path: '/app/home', icon: 'home', label: 'Home' },
  { path: '/app', icon: 'explore', label: 'Discover', exact: true },
  { path: '/app/dates', icon: 'favorite', label: 'Dates' },
  { path: '/app/my-dates', icon: 'calendar_today', label: 'Appointments' },
  { path: '/app/profile', icon: 'person', label: 'Profile' },
];

const isActivePath = (location, item) => {
  if (item.exact) return location.pathname === item.path || location.pathname === item.path + '/';
  return location.pathname.startsWith(item.path);
};

/* Desktop Sidebar */
export const DesktopSidebar = () => {
  const location = useLocation();

  return (
    <aside style={{
      display: 'none',
      width: '256px',
      minWidth: '256px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 40,
      backgroundColor: 'var(--surface-container-low)',
      padding: '24px',
      flexDirection: 'column',
      gap: '8px',
    }} className="desktop-sidebar">
      {/* Logo */}
      <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '22px', fontFamily: 'var(--font-headline)', marginBottom: '32px', letterSpacing: '-0.02em' }}>
        Gomet
      </div>

      {/* Nav Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {sidebarItems.map(item => {
          const active = isActivePath(location, item);
          return (
            <Link key={item.path} to={item.path} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: active ? 'rgba(174,47,52,0.1)' : 'transparent',
              color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
              textDecoration: 'none',
              fontFamily: 'var(--font-headline)',
              fontWeight: active ? 700 : 500,
              fontSize: '15px',
              transition: 'all 0.15s',
            }}>
              <span className={`material-symbols-outlined ${active ? 'filled' : ''}`} style={{ fontSize: '22px' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* CTA Button */}
      <Link to="/app/dates" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--primary-gradient)',
        color: 'white',
        fontWeight: 700,
        fontFamily: 'var(--font-headline)',
        textDecoration: 'none',
        boxShadow: '0 8px 24px rgba(174,47,52,0.3)',
        transition: 'transform 0.1s',
        fontSize: '15px',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
        New Date Request
      </Link>
    </aside>
  );
};

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
      {tabs.map(tab => {
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
            <span className={`material-symbols-outlined ${active ? 'filled' : ''}`} style={{ fontSize: '24px' }}>{active ? tab.activeIcon : tab.icon}</span>
            {!active && <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px', fontFamily: 'var(--font-body)' }}>{tab.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
