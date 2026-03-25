import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stdKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const filters = ['Toi nay', 'Tuan nay', 'Thang nay'];

const events = [
  { title: 'Dem Truffle & Champagne', date: '28 Thang 3', price: '2.500.000', chemistry: 94, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', slots: 3 },
  { title: 'Omakase Midnight', date: '30 Thang 3', price: '3.200.000', chemistry: 88, img: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=300&fit=crop', slots: 2 },
  { title: 'Wine & Dine Under Stars', date: '1 Thang 4', price: '1.800.000', chemistry: 91, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop', slots: 5 },
  { title: 'Chef\'s Table: Mekong', date: '3 Thang 4', price: '2.800.000', chemistry: 86, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', slots: 1 },
  { title: 'Saigon Jazz Supper', date: '5 Thang 4', price: '2.100.000', chemistry: 92, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', slots: 4 },
  { title: 'Blind Tasting Night', date: '8 Thang 4', price: '1.900.000', chemistry: 89, img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop', slots: 6 },
];

const upcoming = [
  { title: 'Dem Wagyu A5', date: '26 Thang 3', time: '19:30' },
  { title: 'Cocktail Pairing', date: '27 Thang 3', time: '20:00' },
];

const SecretTableDesktopPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#fff' }}>
      <style>{stdKeyframes}</style>

      {/* Hero */}
      <div style={{
        padding: '40px 32px 32px', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0D0D1A 0%, #1a1040 50%, #0D0D1A 100%)'
      }}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ position: 'absolute', top: 20, right: 40, fontSize: 120, opacity: 0.04, color: '#FFD700' }}>diamond</span>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginBottom: 16 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#fff' }}>arrow_back</span>
        </button>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, marginBottom: 8 }}>The Nocturnal Experience</h1>
        <p style={{ margin: 0, fontSize: 15, color: '#888', maxWidth: 500 }}>
          Nhung bua toi bi mat chi danh cho thanh vien duoc moi. Kham pha the gioi am thuc dem.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: 24, padding: '0 32px 32px' }}>
        {/* Left: Events Grid */}
        <div style={{ flex: 1 }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {filters.map((f, i) => (
              <button key={i} onClick={() => setActiveFilter(i)} style={{
                padding: '8px 20px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: activeFilter === i ? 'linear-gradient(135deg, #6C63FF, #8B5CF6)' : 'rgba(255,255,255,0.06)',
                color: activeFilter === i ? '#fff' : '#888', fontSize: 13, fontWeight: 600
              }}>{f}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {events.map((ev, i) => (
              <div key={i} style={{
                borderRadius: 20, overflow: 'hidden', position: 'relative',
                background: '#141428', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                animation: `fadeInUp 0.5s ease ${i * 0.08}s both`, cursor: 'pointer'
              }}>
                <div style={{ position: 'relative', height: 160 }}>
                  <img src={ev.img} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)' }} />
                  <div style={{
                    position: 'absolute', top: 10, right: 10, background: 'rgba(108,99,255,0.9)',
                    borderRadius: 10, padding: '3px 8px', fontSize: 11, fontWeight: 700
                  }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 12, verticalAlign: 'middle', marginRight: 2 }}>favorite</span>
                    {ev.chemistry}%
                  </div>
                  <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{ev.title}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: '#888' }}>{ev.date}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#FFD700' }}>{ev.price}d</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#666' }}>{ev.slots} cho trong</span>
                    <button style={{
                      background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', border: 'none',
                      borderRadius: 10, padding: '6px 16px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer'
                    }}>Dat cho</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 20,
            border: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 20
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 6, color: '#FFD700' }}>event</span>
              Ban Da Dat
            </h3>
            {upcoming.length === 0 ? (
              <div style={{ fontSize: 13, color: '#666', textAlign: 'center', padding: 20 }}>Chua co dat cho nao</div>
            ) : (
              upcoming.map((u, i) => (
                <div key={i} style={{
                  background: 'rgba(108,99,255,0.1)', borderRadius: 14, padding: 14, marginBottom: 10,
                  border: '1px solid rgba(108,99,255,0.15)'
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{u.title}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{u.date} - {u.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretTableDesktopPage;
