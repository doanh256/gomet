import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const AdminGuard = ({ children }) => {
  const { currentUser, isLoggedIn, loading } = useAppContext();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#13111C' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
          <p style={{ color: '#A09FB1', fontSize: '16px' }}>Đang xác thực...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || currentUser?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminGuard;
