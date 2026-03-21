import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, AlertTriangle, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 24px',
      color: isActive ? 'white' : '#a0aabc',
      backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
      textDecoration: 'none',
      borderLeft: isActive ? '4px solid #fd5068' : '4px solid transparent',
      transition: 'all 0.2s',
      fontWeight: isActive ? 600 : 400
    };
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#f0f2f5' }}>
      {/* Admin Sidebar */}
      <div className="sidebar" style={{ backgroundColor: '#111418', color: 'white', minWidth: '260px', width: '260px' }}>
        <div style={{ padding: '24px 16px', fontSize: '24px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)', borderRadius: '8px' }}></div>
          Admin Panel
        </div>
        <div style={{ flex: 1, padding: '16px 0', display: 'flex', flexDirection: 'column' }}>
          <Link to="/admin" style={getLinkStyle('/admin')}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/users" style={getLinkStyle('/admin/users')}>
            <Users size={20} /> Quản lý Người dùng
          </Link>
          <Link to="/admin/reports" style={getLinkStyle('/admin/reports')}>
            <AlertTriangle size={20} /> Quản lý Báo cáo
          </Link>
        </div>
        <div style={{ padding: '16px' }}>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ff4b4b', textDecoration: 'none', padding: '12px 16px' }}>
            <LogOut size={20} /> Đăng xuất
          </Link>
        </div>
      </div>
      
      {/* Admin Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: '72px', backgroundColor: 'white', display: 'flex', alignItems: 'center', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111418' }}>Quản trị hệ thống</h2>
          <div style={{ flex: 1 }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Admin User</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fd5068', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
