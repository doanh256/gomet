import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackStats = {
    users: 12543,
    matchesToday: 328,
    activeEvents: 15,
    revenueMonth: 48500000,
  };

  const fallbackRecentUsers = [
    { id: 1, name: 'Nguyen Minh Anh', email: 'minhanh@gmail.com', joinDate: '20/03/2026', status: 'active' },
    { id: 2, name: 'Tran Duc Huy', email: 'duchuy92@gmail.com', joinDate: '19/03/2026', status: 'active' },
    { id: 3, name: 'Le Thi Bich Ngoc', email: 'bichngoc@yahoo.com', joinDate: '19/03/2026', status: 'pending' },
    { id: 4, name: 'Pham Hoang Long', email: 'hoanglong@gmail.com', joinDate: '18/03/2026', status: 'active' },
    { id: 5, name: 'Vo Thanh Tam', email: 'thanhtam@outlook.com', joinDate: '18/03/2026', status: 'pending' },
  ];

  const fallbackReports = [
    { id: 1, reporter: 'Nguyen Van Tung', reason: 'Noi dung khong phu hop', status: 'pending' },
    { id: 2, reporter: 'Le Hoang Mai', reason: 'Quay roi nguoi dung khac', status: 'pending' },
    { id: 3, reporter: 'Tran Bao Ngoc', reason: 'Tai khoan gia mao', status: 'resolved' },
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

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statCards = [
    { label: 'Nguoi dung', value: (displayStats.users || 0).toLocaleString(), icon: 'group', trend: '+12%', up: true },
    { label: 'Match hom nay', value: (displayStats.matchesToday || 0).toLocaleString(), icon: 'favorite', trend: '+8%', up: true },
    { label: 'Su kien dang mo', value: (displayStats.activeEvents || 0).toLocaleString(), icon: 'event', trend: '+3', up: true },
    { label: 'Doanh thu thang', value: `${((displayStats.revenueMonth || 0) / 1000000).toFixed(1)}M`, icon: 'payments', trend: '+15%', up: true },
  ];

  const quickActions = [
    { label: 'Duyet su kien', icon: 'event_available', color: 'var(--tertiary)' },
    { label: 'Quan ly nguoi dung', icon: 'manage_accounts', color: 'var(--primary)' },
    { label: 'Xem bao cao', icon: 'assessment', color: '#6366f1' },
    { label: 'Cai dat he thong', icon: 'settings', color: 'var(--on-surface-variant)' },
  ];

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px', display: 'block', opacity: 0.5 }}>hourglass_empty</span>
        Dang tai du lieu...
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--on-surface)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--primary)' }}>dashboard</span>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-headline)', color: 'var(--on-surface)' }}>
              Tong quan quan tri
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--on-surface-variant)' }}>{today}</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {statCards.map((card, i) => (
          <div key={i} style={{
            background: 'var(--surface-container-lowest)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '28px',
                color: 'var(--primary)',
                background: 'var(--primary-fixed)',
                borderRadius: 'var(--radius)',
                padding: '10px',
              }}>{card.icon}</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: card.up ? '#1dda95' : 'var(--error)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  {card.up ? 'trending_up' : 'trending_down'}
                </span>
                {card.trend}
              </span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-headline)', color: 'var(--on-surface)' }}>
                {card.value}
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--on-surface-variant)' }}>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Chart + Recent Users */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Bar Chart */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>bar_chart</span>
            Bieu do hoat dong
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '180px', paddingBottom: '28px', position: 'relative' }}>
            {activityData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--on-surface-variant)' }}>{val}</span>
                <div style={{
                  width: '100%',
                  height: `${(val / 100) * 150}px`,
                  background: i === 4 ? 'var(--primary-gradient)' : 'var(--primary-fixed)',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.3s ease',
                  minHeight: '8px',
                }} />
                <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)', position: 'absolute', bottom: '0' }}>
                  {dayLabels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>person_add</span>
            Nguoi dung moi
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {recentUsers.map((user) => (
              <div key={user.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                borderBottom: '1px solid var(--outline-variant)',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  flexShrink: 0,
                }}>
                  {user.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)', flexShrink: 0 }}>{user.joinDate}</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: user.status === 'active' ? '#e2f8ec' : '#fff4e5',
                  color: user.status === 'active' ? '#1dda95' : '#eeb633',
                  flexShrink: 0,
                }}>
                  {user.status === 'active' ? 'Hoat dong' : 'Cho duyet'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Reports */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--error)' }}>flag</span>
            Bao cao gan day
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reports.map((report) => (
              <div key={report.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '12px',
                background: 'var(--surface-container-low)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: '20px',
                    color: report.status === 'pending' ? '#eeb633' : '#1dda95',
                  }}>flag</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>{report.reporter}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--on-surface-variant)' }}>{report.reason}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: report.status === 'pending' ? '#fff4e5' : '#e2f8ec',
                    color: report.status === 'pending' ? '#eeb633' : '#1dda95',
                  }}>
                    {report.status === 'pending' ? 'Cho xu ly' : 'Da giai quyet'}
                  </span>
                  <button style={{
                    background: 'none',
                    border: '1px solid var(--outline-variant)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: 'var(--primary)',
                  }}>Xem</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-headline)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>bolt</span>
            Hanh dong nhanh
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {quickActions.map((action, i) => (
              <button key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '24px 16px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--outline-variant)',
                background: 'var(--surface-container-low)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-fixed)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-container-low)'; e.currentTarget.style.borderColor = 'var(--outline-variant)'; }}
              >
                <span className="material-symbols-outlined" style={{
                  fontSize: '32px',
                  color: action.color,
                }}>{action.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--on-surface)' }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
