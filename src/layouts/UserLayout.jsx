import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Plus } from 'lucide-react';
import BottomTabBar from '../components/User/BottomTabBar';
import CreateActivityModal from '../components/User/CreateActivityModal';
import TutorialOverlay from '../components/TutorialOverlay';

const UserLayout = () => {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#fff' }}>
      {/* Main content - takes all space above tab bar */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', paddingBottom: '64px' }}>
        <Outlet />
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar />

      {/* Floating Action Button - Create Kèo */}
      <div
        onClick={() => setIsActivityModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff7854 0%, #fd5068 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 6px 20px rgba(253,80,104,0.4)',
          cursor: 'pointer',
          zIndex: 999,
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Plus size={28} strokeWidth={2.5} />
      </div>

      <CreateActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />
      <TutorialOverlay />
    </div>
  );
};

export default UserLayout;
