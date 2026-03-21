import React from 'react';
import { useAppContext } from '../AppContext';
import { Users, User, ShieldAlert } from 'lucide-react';

const RoleSwitcher = () => {
  const { currentUser, switchRole, MOCK_USERS } = useAppContext();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '12px',
      borderRadius: '12px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ff7854', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ShieldAlert size={14} /> Test Suite
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        {MOCK_USERS.filter(u => u.role).map(user => (
          <button
            key={user.id}
            onClick={() => switchRole(user.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: currentUser.id === user.id ? '#fd5068' : 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <User size={14} />
            {user.name} ({user.role === 'user-a' ? 'A' : 'B'})
          </button>
        ))}
        
        {/* Nút Admin ảo (Không ảnh hưởng state User hiện tại) */}
        <button
          onClick={() => alert("Góc nhìn Admin đang được xây dựng (Xem Repots.jsx)")}
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: '#a450ff',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Users size={14} /> Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
