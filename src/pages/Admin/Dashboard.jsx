import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackStats = { users: 12543, matchesToday: 328, activeEvents: 15, revenueMonth: 48500000 };

  const fallbackRecentUsers = [
    { id: 1, name: 'Nguyen Minh Anh', email: 'minhanh@gmail.com', joinDate: '20/03/2026', status: 'active' },
    { id: 2, name: 'Tran Duc Huy', email: 'duchuy92@gmail.com', joinDate: '19/03/2026', status: 'active' },
    { id: 3, name: 'Le Thi Bich Ngoc', email: 'bichngoc@yahoo.com', joinDate: '19/03/2026', status: 'pending' },
    { id: 4, name: 'Pham Hoang Long', email: 'hoanglong@gmail.com', joinDate: '18/03/2026', status: 'active' },
    { id: 5, name: 'Vo Thanh Tam', email: 'thanhtam@outlook.com', joinDate: '18/03/2026', status: 'pending' },
  ];

  const fallbackReports = [
    { id: 1, reporter: 'Nguyen Van Tung', reason: 'Nội dung không phù hợp', status: 'pending' },
    { id: 2, reporter: 'Le Hoang Mai', reason: 'Quấy rối người dùng khác', status: 'pending' },
    { id: 3, reporter: 'Tran Bao Ngoc', reason: 'Tài khoản giả mạo', status: 'resolved' },
  ];

  const activityData = [65, 42, 78, 55, 90, 72, 85];
  const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error('Admin fetch error:', err);
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayStats = stats || fallbackStats;
  const recentUsers = fallbackRecentUsers;
  const reports = fallbackReports;

  const today = new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const statCards = [
    { label: 'Người dùng', value: (displayStats.users || 0).toLocaleString(), icon: 'group', trend: '+12%', up: true },
    { label: 'Match hôm nay', value: (displayStats.matchesToday || 0).toLocaleString(), icon: 'favorite', trend: '+8%', up: true },
    { label: 'Sự kiện đang mở', value: (displayStats.activeEvents || 0).toLocaleString(), icon: 'event', trend: '+3', up: true },
    { label: 'Doanh thu tháng', value: `${((displayStats.revenueMonth || 0) / 1000000).toFixed(1)}M`, icon: 'payments', trend: '+15%', up: true },
  ];

  const quickActions = [
    { label: 'Duyệt sự kiện', icon: 'event_available', color: '#FFD54F' },
    { label: 'Quản lý người dùng', icon: 'manage_accounts', color: '#FFB59E' },
    { label: 'Xem báo cáo', icon: 'assessment', color: '#E6BEB2' },
    { label: 'Cài đặt hệ thống', icon: 'settings', color: '#E6BEB2' },
  ];

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#E6BEB2', fontFamily: 'var(--font-body)' }}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px', display: 'block', opacity: 0.5 }}>hourglass_empty</span>
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: '#FDF9F3' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '32px', color: '#FFB59E' }}>dashboard</span>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-headline)', color: '#FDF9F3' }}>Tổng quan quản trị</h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#E6BEB2' }}>{today}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {statCards.map((card, i) => (
          <div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '28px', color: '#FFB59E', background: '#2A2A2A', borderRadius: '1.5rem', padding: '10px' }}>{card.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: card.up ? '#117500' : '#FF571A', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>{card.up ? 'trending_up' : 'trending_down'}</span>
                {card.trend}
              </span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-headline)', color: '#FDF9F3' }}>{card.value}</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#E6BEB2' }}>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px', color: '#FDF9F3' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FFB59E' }}>bar_chart</span>
            Biểu đồ hoạt động
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '180px', paddingBottom: '28px', position: 'relative' }}>
            {activityData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#E6BEB2' }}>{val}</span>
                <div style={{ width: '100%', height: `${(val / 100) * 150}px`, background: i === 4 ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#2A2A2A', borderRadius: '6px 6px 0 0', transition: 'height 0.3s ease', minHeight: '8px' }} />
                <span style={{ fontSize: '12px', color: '#E6BEB2', position: 'absolute', bottom: '0' }}>{dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px', color: '#FDF9F3' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FFB59E' }}>person_add</span>
            Người dùng mới
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {recentUsers.map((user) => (
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A0B00', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{user.name.charAt(0)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#FDF9F3' }}>{user.name}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#E6BEB2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                </div>
                <span style={{ fontSize: '12px', color: '#E6BEB2', flexShrink: 0 }}>{user.joinDate}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px', background: user.status === 'active' ? 'rgba(17,117,0,0.15)' : 'rgba(255,213,79,0.15)', color: user.status === 'active' ? '#117500' : '#FFD54F', flexShrink: 0 }}>
                  {user.status === 'active' ? 'Hoạt động' : 'Chờ duyệt'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px', color: '#FDF9F3' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FF571A' }}>flag</span>
            Báo cáo gần đây
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reports.map((report) => (
              <div key={report.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '1.5rem', background: '#2A2A2A' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: report.status === 'pending' ? '#FFD54F' : '#117500' }}>flag</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#FDF9F3' }}>{report.reporter}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#E6BEB2' }}>{report.reason}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px', background: report.status === 'pending' ? 'rgba(255,213,79,0.15)' : 'rgba(17,117,0,0.15)', color: report.status === 'pending' ? '#FFD54F' : '#117500' }}>
                    {report.status === 'pending' ? 'Chờ xử lý' : 'Đã giải quyết'}
                  </span>
                  <button style={{ background: 'none', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#FFB59E' }}>Xem</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px', color: '#FDF9F3' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FFB59E' }}>bolt</span>
            Hành động nhanh
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {quickActions.map((action, i) => (
              <button key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px 16px', borderRadius: '1.5rem', border: 'none', background: '#2A2A2A', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#353535'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#2A2A2A'; }}
              >
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '32px', color: action.color }}>{action.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#FDF9F3' }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
