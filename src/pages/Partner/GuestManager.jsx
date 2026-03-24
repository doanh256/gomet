import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestManager = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const stats = [{ label: 'Tong VIP', value: '128', icon: 'stars' }, { label: 'Check-in hom nay', value: '12', icon: 'login' }, { label: 'Chi tieu TB', value: '2.5M VND', icon: 'payments' }];
  const guests = [
    { id: 1, name: 'Nguyen Minh Tuan', phone: '****1234', visits: 15, spent: '12.5M', tier: 'Platinum', lastVisit: '20/03/2026' },
    { id: 2, name: 'Tran Thu Hang', phone: '****5678', visits: 12, spent: '9.8M', tier: 'Gold', lastVisit: '19/03/2026' },
    { id: 3, name: 'Le Quang Huy', phone: '****9012', visits: 10, spent: '8.2M', tier: 'Gold', lastVisit: '18/03/2026' },
    { id: 4, name: 'Pham Ngoc Anh', phone: '****3456', visits: 8, spent: '6.5M', tier: 'Silver', lastVisit: '17/03/2026' },
    { id: 5, name: 'Vo Thanh Dat', phone: '****7890', visits: 20, spent: '18.3M', tier: 'Platinum', lastVisit: '20/03/2026' },
    { id: 6, name: 'Hoang Mai Linh', phone: '****2345', visits: 6, spent: '4.8M', tier: 'Silver', lastVisit: '15/03/2026' },
    { id: 7, name: 'Dang Duc Manh', phone: '****6789', visits: 14, spent: '11.2M', tier: 'Gold', lastVisit: '19/03/2026' },
    { id: 8, name: 'Bui Thuy Tien', phone: '****0123', visits: 5, spent: '3.9M', tier: 'Silver', lastVisit: '14/03/2026' },
  ];
  const tiers = [
    { name: 'Platinum', count: 15, color: 'linear-gradient(135deg, #FFB59E, #FF571A)', benefits: 'Giam 20%, Uu tien dat cho, Qua sinh nhat' },
    { name: 'Gold', count: 45, color: '#FFD54F', benefits: 'Giam 15%, Do uong mien phi, Uu dai su kien' },
    { name: 'Silver', count: 68, color: '#E6BEB2', benefits: 'Giam 10%, Tich diem x2' },
  ];
  const getTierStyle = (tier) => {
    if (tier === 'Platinum') return { background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00' };
    if (tier === 'Gold') return { background: '#FFD54F', color: '#3A0B00' };
    return { background: '#E6BEB2', color: '#3A0B00' };
  };
  const getInitial = (name) => name.split(' ').pop()[0];
  const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.phone.includes(searchQuery));

  return (
    <div style={{ minHeight: '100vh', background: '#131313', fontFamily: 'var(--font-body)', color: '#FDF9F3', padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#FFB59E', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16, padding: 0 }} onClick={() => navigate('/partner')}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>Quay lai</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}><span className="material-symbols-outlined" style={{ fontSize: 32, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>stars</span><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800 }}>Quan ly khach VIP</h1></div>
      <p style={{ color: '#E6BEB2', fontSize: 14, marginBottom: 24 }}>Quan ly danh sach khach hang than thiet</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#1C1B1B', borderRadius: '9999px', padding: '10px 20px' }}><span className="material-symbols-outlined" style={{ fontSize: 20, color: '#E6BEB2' }}>search</span><input style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14, fontFamily: 'var(--font-body)', color: '#FDF9F3', flex: 1 }} placeholder="Tim khach hang..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
        <button style={{ background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '9999px', padding: '12px 24px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>person_add</span>Them khach VIP</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>{stats.map((st, i) => (<div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px', display: 'flex', alignItems: 'center', gap: 12 }}><span className="material-symbols-outlined" style={{ fontSize: 28, color: '#FFB59E', background: '#2A2A2A', borderRadius: '1.5rem', padding: 8 }}>{st.icon}</span><div><div style={{ fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 800 }}>{st.value}</div><div style={{ fontSize: 13, color: '#E6BEB2' }}>{st.label}</div></div></div>))}</div>
      <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden', marginBottom: 28 }}>
        {filteredGuests.map((g, i) => (
          <div key={g.id} style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', gap: 16, flexWrap: 'wrap', transition: 'background 0.15s', background: i % 2 === 0 ? 'transparent' : '#2A2A2A' }}>
            <div style={{ width: 40, height: 40, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 16, flexShrink: 0, ...getTierStyle(g.tier) }}>{getInitial(g.name)}</div>
            <div style={{ flex: 1, minWidth: 140 }}><div style={{ fontWeight: 600, fontSize: 15 }}>{g.name}</div><div style={{ fontSize: 13, color: '#E6BEB2' }}>{g.phone}</div></div>
            <span style={{ background: '#2A2A2A', borderRadius: '9999px', padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#FDF9F3', whiteSpace: 'nowrap' }}>{g.visits} lan</span>
            <span style={{ fontWeight: 700, fontSize: 14, minWidth: 60, textAlign: 'right' }}>{g.spent}</span>
            <span style={{ padding: '4px 14px', borderRadius: '9999px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', ...getTierStyle(g.tier) }}>{g.tier}</span>
            <span style={{ fontSize: 13, color: '#E6BEB2', minWidth: 80 }}>{g.lastVisit}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button style={{ background: '#FFB59E', color: '#3A0B00', border: 'none', borderRadius: '9999px', padding: '6px 14px', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Gui uu dai</button>
              <button style={{ background: 'none', border: 'none', color: '#FFB59E', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)', padding: 0 }}>Xem</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span className="material-symbols-outlined" style={{ color: '#FFB59E' }}>military_tech</span>Phan loai khach</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{ borderRadius: '1.5rem', padding: '24px', color: '#3A0B00', background: t.color }}>
              <div style={{ fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800, marginBottom: 8 }}><span className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6 }}>{t.name === 'Platinum' ? 'diamond' : t.name === 'Gold' ? 'workspace_premium' : 'shield'}</span>{t.name}</div>
              <div style={{ fontSize: 32, fontFamily: 'var(--font-headline)', fontWeight: 800, marginBottom: 8 }}>{t.count}</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>thanh vien</div>
              <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.5 }}>{t.benefits}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestManager;
