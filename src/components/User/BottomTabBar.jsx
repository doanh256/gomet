import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Heart, Calendar, MessageCircle, User } from 'lucide-react';

const tabs = [
  { path: '/app', icon: Flame, label: 'Khám phá', exact: true },
  { path: '/app/dates', icon: Calendar, label: 'Tìm Hẹn' },
  { path: '/app/matches', icon: Heart, label: 'Matches' },
  { path: '/app/chat', icon: MessageCircle, label: 'Chat' },
  { path: '/app/profile', icon: User, label: 'Hồ sơ' },
];

const BottomTabBar = () => {
  const location = useLocation();

  const isActive = (tab) => {
    if (tab.exact) return location.pathname === '/app' || location.pathname === '/app/';
    return location.pathname.startsWith(tab.path);
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      backgroundColor: 'white',
      borderTop: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 1000,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.04)',
    }}>
      {tabs.map(tab => {
        const active = isActive(tab);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              textDecoration: 'none',
              padding: '8px 0',
              minWidth: '56px',
              position: 'relative',
            }}
          >
            <div style={{
              width: '40px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              backgroundColor: active ? '#fef0f2' : 'transparent',
              transition: 'background-color 0.2s',
            }}>
              <Icon
                size={22}
                color={active ? '#fd5068' : '#999'}
                fill={active ? '#fd5068' : 'none'}
                strokeWidth={active ? 2.5 : 1.8}
              />
            </div>
            <span style={{
              fontSize: '10px',
              fontWeight: active ? 700 : 500,
              color: active ? '#fd5068' : '#999',
              letterSpacing: '0.01em',
            }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTabBar;
