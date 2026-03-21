import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DesktopSidebar, MobileTopBar, MobileBottomNav } from '../components/User/BottomTabBar';
import CreateActivityModal from '../components/User/CreateActivityModal';
import TutorialOverlay from '../components/TutorialOverlay';

const UserLayout = () => {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      <DesktopSidebar />
      <MobileTopBar />

      <div className="main-content-area" style={{ paddingTop: '72px', paddingBottom: '88px' }}>
        <Outlet />
      </div>

      <MobileBottomNav />

      {/* FAB */}
      <div
        onClick={() => setIsActivityModalOpen(true)}
        className="fab-button"
        style={{
          position: 'fixed', bottom: '100px', right: '20px',
          width: '56px', height: '56px', borderRadius: 'var(--radius-full)',
          background: 'var(--primary-gradient)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', boxShadow: '0 8px 24px rgba(174,47,52,0.3)',
          cursor: 'pointer', zIndex: 40, transition: 'transform 0.2s',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
      </div>

      <CreateActivityModal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} />
      <TutorialOverlay />
    </div>
  );
};

export default UserLayout;
