import React, { useState, useEffect } from 'react';
import { Users, Heart, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import { api } from '../../api/client';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', flex: 1, minWidth: '200px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: `${color}20`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={28} />
    </div>
    <div>
      <p style={{ margin: 0, color: '#505965', fontSize: '15px', fontWeight: 500 }}>{title}</p>
      <h2 style={{ margin: '4px 0 0 0', fontSize: '28px', fontWeight: 700, color: '#111418' }}>{value}</h2>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/recent-signups'),
        ]);
        setStats(statsData);
        setRecentUsers(usersData.users || []);
      } catch (err) {
        console.error('Admin fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#505965' }}>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#111418' }}>Tổng quan hệ thống</h1>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <StatCard title="Người dùng" value={stats?.users?.toLocaleString() || '0'} icon={Users} color="#fd5068" />
        <StatCard title="Matches" value={stats?.matches?.toLocaleString() || '0'} icon={Heart} color="#1dda95" />
        <StatCard title="Kèo hẹn" value={stats?.datePosts?.toLocaleString() || '0'} icon={Calendar} color="#eeb633" />
        <StatCard title="Tin nhắn" value={stats?.messages?.toLocaleString() || '0'} icon={MessageCircle} color="#6366f1" />
        <StatCard title="Nạp tiền" value={`${((stats?.revenue || 0) / 1000).toFixed(0)}k`} icon={TrendingUp} color="#a450ff" />
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', maxHeight: '500px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 20px 0' }}>Tài khoản mới đăng ký</h3>
          {recentUsers.map(user => (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f0f2f5', flexShrink: 0 }}>
                {user.avatar && <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '15px' }}>{user.name}</p>
                <p style={{ margin: 0, color: '#505965', fontSize: '13px' }}>{user.email}</p>
              </div>
              <span style={{ fontSize: '12px', color: '#999' }}>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
