import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapExplorePage = () => {
  const navigate = useNavigate();
  const [radius, setRadius] = useState(5);
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = [{ id: 'all', label: 'Tất cả', icon: 'apps' }, { id: 'restaurant', label: 'Nhà hàng', icon: 'restaurant' }, { id: 'cafe', label: 'Cafe', icon: 'coffee' }, { id: 'bar', label: 'Bar', icon: 'local_bar' }, { id: 'event', label: 'Sự kiện', icon: 'celebration' }];
  const venues = [{ name: 'The Rustic Table', category: 'Nhà hàng', distance: '1.2 km', rating: 4.8, address: '12 Nguyễn Huệ, Q1' }, { name: 'Cafe Terrace', category: 'Cafe', distance: '1.5 km', rating: 4.6, address: '45 Lê Lợi, Q1' }, { name: 'Skyline Lounge', category: 'Bar', distance: '2.1 km', rating: 4.7, address: '88 Hai Bà Trưng, Q3' }, { name: 'Pho Garden', category: 'Nhà hàng', distance: '2.8 km', rating: 4.5, address: '23 Trần Hưng Đạo, Q5' }, { name: 'Brew & Beans', category: 'Cafe', distance: '3.2 km', rating: 4.4, address: '67 Nguyễn Thị Minh Khai, Q3' }, { name: 'The Hideaway', category: 'Bar', distance: '4.0 km', rating: 4.9, address: '5 Đồng Khởi, Q1' }];
  const nearbyEvents = [{ name: 'Jazz Night Dating', date: '28/03 - 19:00', venue: 'Skyline Lounge', spots: 8 }, { name: 'Workshop Nấu Ăn Cho Cặp Đôi', date: '30/03 - 10:00', venue: 'Pho Garden', spots: 5 }, { name: 'Speed Dating Thứ 7', date: '05/04 - 18:00', venue: 'The Rustic Table', spots: 15 }];
  const categoryColors = { 'Nhà hàng': { bg: '#FFB59E30', color: '#FFB59E' }, 'Cafe': { bg: '#FFD54F30', color: '#FFD54F' }, 'Bar': { bg: '#FF571A30', color: '#FF571A' }, 'Sự kiện': { bg: '#11750030', color: '#117500' } };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313', fontFamily: 'var(--font-body)' }}>
      <div style={{ backgroundColor: '#1C1B1B', padding: '16px 20px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#E6BEB2', display: 'flex' }}><span aria-hidden="true" className="material-symbols-outlined">arrow_back</span></button>
        <div style={{ flex: 1, textAlign: 'center' }}><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: '#FDF9F3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#FFB59E' }}>explore</span>Khám phá quanh đây</h1></div>
        <div style={{ width: 24 }} />
      </div>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 16px 100px' }}>
        <div style={{ width: '100%', height: 400, backgroundColor: '#2A2A2A', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '16px 0', position: 'relative', overflow: 'hidden' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 56, color: '#E6BEB2', opacity: 0.5 }}>place</span>
          <p style={{ fontSize: 14, color: '#E6BEB2', marginTop: 8 }}>Bản đồ đang tải...</p>
          {[...Array(5)].map((_, i) => (<div key={`h${i}`} style={{ position: 'absolute', top: `${20 + i * 20}%`, left: 0, right: 0, height: 1, background: '#353535', opacity: 0.3 }} />))}
          {[...Array(5)].map((_, i) => (<div key={`v${i}`} style={{ position: 'absolute', left: `${20 + i * 20}%`, top: 0, bottom: 0, width: 1, background: '#353535', opacity: 0.3 }} />))}
        </div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}><span style={{ fontSize: 14, fontWeight: 600, color: '#FDF9F3' }}>Bán kính</span><span style={{ background: '#FF571A30', color: '#FFB59E', borderRadius: '9999px', padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>{radius} km</span></div>
          <input type="range" min={1} max={50} value={radius} onChange={(e) => setRadius(Number(e.target.value))} aria-label={`Bán kính ${radius} km`} style={{ width: '100%', accentColor: '#FFB59E' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#E6BEB2', marginTop: 4 }}><span>1 km</span><span>50 km</span></div>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, scrollbarWidth: 'none' }}>
          {filters.map((f) => { const active = activeFilter === f.id; return (<button key={f.id} onClick={() => setActiveFilter(f.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: '9999px', border: 'none', background: active ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#1C1B1B', color: active ? '#3A0B00' : '#E6BEB2', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'var(--font-body)' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>{f.icon}</span>{f.label}</button>); })}
        </div>
        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#FDF9F3' }}>Kết quả gần bạn</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {venues.map((v, i) => { const cat = categoryColors[v.category] || categoryColors['Su kien']; return (<div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '16px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}><div><h3 style={{ fontSize: 15, fontWeight: 700, color: '#FDF9F3', marginBottom: 6 }}>{v.name}</h3><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ background: cat.bg, color: cat.color, borderRadius: '9999px', padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{v.category}</span><div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, color: '#E6BEB2' }}><span className="material-symbols-outlined filled" style={{ fontSize: 16, color: '#FFD54F' }}>star</span>{v.rating}</div></div></div><span style={{ background: '#FFB59E30', color: '#FFB59E', borderRadius: '9999px', padding: '4px 10px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{v.distance}</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#E6BEB2', marginBottom: 12 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>{v.address}</div><div style={{ display: 'flex', gap: 8 }}><button style={{ flex: 1, padding: '9px 0', borderRadius: '1.5rem', border: 'none', background: '#2A2A2A', color: '#FFB59E', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>directions</span>Chỉ đường</button><button onClick={() => navigate(`/app/venue/${i + 1}`)} style={{ flex: 1, padding: '9px 0', borderRadius: '1.5rem', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>visibility</span>Xem</button></div></div>); })}
        </div>
        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#FDF9F3' }}>Sự kiện gần đây</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {nearbyEvents.map((ev, i) => (<div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ width: 48, height: 48, borderRadius: '1.5rem', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#3A0B00', fontSize: 24 }}>celebration</span></div><div style={{ flex: 1 }}><h3 style={{ fontSize: 14, fontWeight: 700, color: '#FDF9F3', marginBottom: 4 }}>{ev.name}</h3><div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#E6BEB2' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>{ev.date}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#E6BEB2', marginTop: 2 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>{ev.venue}</div></div><span style={{ background: '#2A2A2A', color: '#FFB59E', borderRadius: '9999px', padding: '4px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{ev.spots} chỗ</span></div>))}
        </div>
      </div>
    </div>
  );
};

export default MapExplorePage;
