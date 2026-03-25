import React from 'react';
import { useNavigate } from 'react-router-dom';

const rmmKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const quickActions = [
  { icon: 'restaurant_menu', label: 'Cập Nhật Menu', color: '#6C63FF' },
  { icon: 'calendar_month', label: 'Xem Đặt Bàn', color: '#E8900C' },
  { icon: 'group', label: 'Lịch Nhân Viên', color: '#00C9A7' },
];

const recentOrders = [
  { id: '#2847', items: 'Phở Bò x2, Nem Rán x1', total: '185.000', time: '12:34', status: 'Đang làm' },
  { id: '#2846', items: 'Bún Chả x1, Chả Giò x2', total: '165.000', time: '12:28', status: 'Hoàn thành' },
  { id: '#2845', items: 'Cơm Tấm x3', total: '210.000', time: '12:15', status: 'Hoàn thành' },
  { id: '#2844', items: 'Bánh Cuốn x2, Cà Phê x2', total: '120.000', time: '12:01', status: 'Hoàn thành' },
];

const tables = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, occupied: i < 12 }));

const RestaurantManagerMobilePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#FDF9F3', color: '#1A1A2E', paddingBottom: 32 }}>
      <style>{rmmKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#1A1A2E' }}>arrow_back</span>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Nhịp Hôm Nay</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#888' }}>Nhà hàng Phở Thìn</p>
        </div>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#E8900C' }}>storefront</span>
      </div>

      {/* Revenue Card */}
      <div style={{ padding: '20px 16px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #E8900C, #F5C542)', borderRadius: 20, padding: 24,
          color: '#fff', animation: 'fadeInUp 0.5s ease both'
        }}>
          <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 4 }}>Doanh thu hôm nay</div>
          <div style={{ fontSize: 32, fontWeight: 900 }}>4.280.000</div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>VND</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>+18% so với hôm qua</span>
          </div>
        </div>
      </div>

      {/* Floor Status */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#6C63FF' }}>table_restaurant</span>
            Trạng Thái Sàn
          </h2>
          <span style={{ fontSize: 13, color: '#888', fontWeight: 600 }}>12/20 bàn</span>
        </div>
        <div style={{
          background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8
        }}>
          {tables.map(t => (
            <div key={t.id} style={{
              aspectRatio: '1', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: t.occupied ? 'rgba(108,99,255,0.15)' : 'rgba(0,0,0,0.03)',
              border: `1.5px solid ${t.occupied ? '#6C63FF' : '#eee'}`,
              fontSize: 12, fontWeight: 700, color: t.occupied ? '#6C63FF' : '#ccc'
            }}>{t.id}</div>
          ))}
        </div>
      </div>

      {/* Vang Milestone */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', gap: 14
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,215,0,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#FFD700' }}>toll</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Vàng Milestone</div>
            <div style={{ fontSize: 12, color: '#888' }}>234 món đã xác thực tháng này</div>
          </div>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#ccc' }}>chevron_right</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {quickActions.map((a, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer',
              animation: `fadeInUp 0.4s ease ${i * 0.1}s both`
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: `${a.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px'
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: a.color }}>{a.icon}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A2E' }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#E8900C' }}>receipt_long</span>
          Đơn Gần Đây
        </h2>
        {recentOrders.map((o, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 8,
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            animation: `fadeInUp 0.4s ease ${i * 0.06}s both`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{o.id}</span>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10,
                background: o.status === 'Đang làm' ? 'rgba(232,144,12,0.15)' : 'rgba(0,201,167,0.15)',
                color: o.status === 'Đang làm' ? '#E8900C' : '#00C9A7'
              }}>{o.status}</span>
            </div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{o.items}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#aaa' }}>{o.time}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#E8900C' }}>{o.total}đ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantManagerMobilePage;
