import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const palateKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes growBar {
  from { height: 0; }
  to { height: var(--bar-h); }
}
`;

const stats = [
  { icon: 'restaurant', label: 'Mon da thu', value: '247' },
  { icon: 'public', label: 'Am thuc moi', value: '12' },
  { icon: 'toll', label: 'Vàng kiếm được', value: '8.430' },
  { icon: 'explore', label: 'Vung kham pha', value: '9' },
];

const monthlyData = [
  { month: 'T1', value: 12 }, { month: 'T2', value: 18 }, { month: 'T3', value: 24 },
  { month: 'T4', value: 15 }, { month: 'T5', value: 30 }, { month: 'T6', value: 22 },
  { month: 'T7', value: 35 }, { month: 'T8', value: 28 }, { month: 'T9', value: 40 },
  { month: 'T10', value: 32 }, { month: 'T11', value: 38 }, { month: 'T12', value: 45 },
];

const topDishes = [
  { name: 'Phở Bò Hà Nội', restaurant: 'Phở Thìn', tries: 18, img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=80&h=80&fit=crop' },
  { name: 'Bún Chả Đắc Kim', restaurant: 'Bún Chả 34', tries: 14, img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=80&h=80&fit=crop' },
  { name: 'Bánh Mì Sài Gòn', restaurant: 'Bánh Mì Huỳnh Hoa', tries: 12, img: 'https://images.unsplash.com/photo-1600454021915-de753e6b5dfe?w=80&h=80&fit=crop' },
  { name: 'Cơm Tấm Sườn Bì', restaurant: 'Cơm Tấm Bà Ghiền', tries: 11, img: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=80&h=80&fit=crop' },
  { name: 'Cao Lầu Hội An', restaurant: 'Cao Lầu Thanh', tries: 9, img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=80&h=80&fit=crop' },
];

const maxMonthly = Math.max(...monthlyData.map(d => d.value));

const PalateEvolutionPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#FDF9F3', color: '#1A1A2E', paddingBottom: 32 }}>
      <style>{palateKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#1A1A2E' }}>arrow_back</span>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1A1A2E' }}>Hanh trinh Vi giac cua Minh</h1>
          <p style={{ margin: 0, fontSize: 13, color: '#888', fontWeight: 500 }}>Nam 2026</p>
        </div>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#E8900C' }}>auto_awesome</span>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, padding: '20px 16px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 16, padding: '16px 14px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            animation: `fadeInUp 0.5s ease ${i * 0.1}s both`
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 28, color: '#E8900C' }}>{s.icon}</span>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 8, color: '#1A1A2E' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Taste Journey Chart */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#1A1A2E' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#E8900C' }}>show_chart</span>
          Hanh Trinh Vi Giac
        </h2>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '20px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 140 }}>
            {monthlyData.map((d, i) => {
              const h = (d.value / maxMonthly) * 120;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#1A1A2E' }}>{d.value}</span>
                  <div style={{
                    width: '100%', maxWidth: 24, height: h, borderRadius: 6,
                    background: `linear-gradient(180deg, #E8900C, #F5C542)`,
                    '--bar-h': h + 'px', animation: `growBar 0.8s ease ${i * 0.05}s both`
                  }} />
                  <span style={{ fontSize: 9, color: '#999' }}>{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top 5 Dishes */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#1A1A2E' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#E8900C' }}>emoji_events</span>
          Top 5 Mon An
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {topDishes.map((d, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, padding: 12, display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              animation: `fadeInUp 0.5s ease ${i * 0.08}s both`
            }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: i < 3 ? '#fff' : '#999', flexShrink: 0 }}>{i + 1}</div>
              <img src={d.img} alt={d.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>{d.name}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{d.restaurant}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#E8900C' }}>{d.tries} lan</div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Explored Region */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{
          background: 'linear-gradient(135deg, #E8900C 0%, #F5C542 100%)', borderRadius: 20, padding: 24,
          color: '#fff', position: 'relative', overflow: 'hidden'
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ position: 'absolute', top: -10, right: -10, fontSize: 100, opacity: 0.15 }}>map</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22 }}>location_on</span>
            <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>Vùng Khám Phá Nhiều Nhất</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Quan 1, TP.HCM</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>78 món ăn tại 23 nhà hàng</div>
          <div style={{
            marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '6px 14px'
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>military_tech</span>
            <span style={{ fontSize: 12, fontWeight: 700 }}>Nhà Thám Hiểm Quận 1</span>
          </div>
        </div>
      </div>

      {/* World Food Map CTA */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div
          onClick={() => navigate('/app/world-food-map')}
          style={{
            background: 'linear-gradient(135deg, #0D0D1A, #1a1040)',
            borderRadius: 20, padding: 20, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 16,
            border: '1px solid rgba(232,144,12,0.3)',
          }}
        >
          <span style={{ fontSize: 40 }}>🌍</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#FDF9F3', marginBottom: 4 }}>
              Bản đồ Ẩm thực Thế giới
            </div>
            <div style={{ fontSize: 12, color: '#E6BEB2' }}>
              Sưu tầm món từ 18+ quốc gia · Trở thành chuyên gia
            </div>
          </div>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#E8900C' }}>arrow_forward</span>
        </div>
      </div>

      {/* Share CTA */}
      <div style={{ padding: '0 16px' }}>
        <button style={{
          width: '100%', padding: '16px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #E8900C, #F5C542)', color: '#fff',
          fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'var(--font-body)',
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
          Chia sẻ báo cáo
        </button>
      </div>
    </div>
  );
};

export default PalateEvolutionPage;
