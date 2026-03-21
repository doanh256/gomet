import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const UserGuard = ({ children }) => {
  const { currentUser, isLoggedIn, loading } = useAppContext();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f7f7f7' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💫</div>
          <p style={{ color: '#505965', fontSize: '16px' }}>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserGuard;
