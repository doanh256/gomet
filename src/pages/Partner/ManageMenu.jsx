import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageMenu = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [{ key: 'all', label: 'Tat ca' }, { key: 'main', label: 'Mon chinh' }, { key: 'drink', label: 'Do uong' }, { key: 'dessert', label: 'Trang mieng' }, { key: 'special', label: 'Dac biet' }];
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Bo Wagyu nuong da nong', desc: 'Bo Wagyu A5 nuong tren da nui lua, kem sot truffle', price: '450.000', category: 'special', emoji: '\uD83E\uDD69', available: true },
    { id: 2, name: 'Pasta Carbonara truffle', desc: 'My Y sot kem truffle den, bacon gion, pho mai Pecorino', price: '185.000', category: 'main', emoji: '\uD83C\uDF5D', available: true },
    { id: 3, name: 'Cocktail Velvet Sunset', desc: 'Gin, cam tuoi, syrup hoa hong, soda y, la bac ha', price: '125.000', category: 'drink', emoji: '\uD83C\uDF79', available: true },
    { id: 4, name: 'Tiramisu truyen thong', desc: 'Banh Tiramisu theo cong thuc Y, ca phe espresso, mascarpone', price: '95.000', category: 'dessert', emoji: '\uD83C\uDF70', available: true },
    { id: 5, name: 'Ca hoi Na Uy sot chanh day', desc: 'Ca hoi tuoi nuong, sot chanh day, rau cu theo mua', price: '285.000', category: 'main', emoji: '\uD83E\uDD62', available: false },
    { id: 6, name: 'Matcha Latte dac biet', desc: 'Matcha Uji Nhat Ban, sua tuoi, kem whip, bot matcha', price: '85.000', category: 'drink', emoji: '\uD83C\uDF75', available: true },
    { id: 7, name: 'Lava Cake socola Bi', desc: 'Banh socola nong chay, kem vanilla Madagascar, dau tay', price: '115.000', category: 'dessert', emoji: '\uD83C\uDF6B', available: true },
    { id: 8, name: 'Set han quoc cho 2 nguoi', desc: 'Bo nuong, hai san, banchan, com tron, canh kimchi', price: '650.000', category: 'special', emoji: '\uD83C\uDF72', available: true },
  ]);
  const trendingItems = [{ name: 'Bo Wagyu nuong da nong', percent: 92 }, { name: 'Cocktail Velvet Sunset', percent: 78 }, { name: 'Tiramisu truyen thong', percent: 65 }];
  const filtered = activeCategory === 'all' ? menuItems : menuItems.filter(item => item.category === activeCategory);
  const toggleAvailability = (id) => { setMenuItems(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item)); };
  const gradients = ['linear-gradient(135deg, #FF571A, #FFB59E)', 'linear-gradient(135deg, #5a3028, #FFB59E)', 'linear-gradient(135deg, #353535, #5a3028)', 'linear-gradient(135deg, #FFB59E, #FF571A)'];

  const st = {
    page: { minHeight: '100vh', background: '#131313', fontFamily: 'var(--font-body)', color: '#FDF9F3', padding: '24px', maxWidth: 1200, margin: '0 auto' },
    categoryChip: (active) => ({ padding: '8px 20px', borderRadius: '9999px', border: 'none', background: active ? '#FFB59E' : '#1C1B1B', color: active ? '#3A0B00' : '#E6BEB2', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }),
    menuCard: { background: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s' },
    toggleTrack: (active) => ({ width: 44, height: 24, borderRadius: 12, background: active ? '#117500' : '#353535', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }),
    toggleThumb: (active) => ({ width: 18, height: 18, borderRadius: '50%', background: '#FDF9F3', position: 'absolute', top: 3, left: active ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }),
    toggleLabel: (active) => ({ fontSize: 12, fontWeight: 500, color: active ? '#117500' : '#E6BEB2' }),
    iconBtn: (variant) => ({ width: 34, height: 34, borderRadius: '9999px', border: 'none', background: variant === 'delete' ? 'rgba(255,87,26,0.15)' : '#2A2A2A', color: variant === 'delete' ? '#FF571A' : '#E6BEB2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }),
  };

  return (
    <div style={st.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span className="material-symbols-outlined" style={{ fontSize: 32, color: '#FFB59E' }}>restaurant_menu</span><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 700 }}>Quan ly thuc don</h1></div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>Them mon moi</button>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 28, overflowX: 'auto' }}>{categories.map((c) => (<button key={c.key} style={st.categoryChip(activeCategory === c.key)} onClick={() => setActiveCategory(c.key)}>{c.label}</button>))}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 36 }}>
        {filtered.map((item, idx) => (
          <div key={item.id} style={st.menuCard} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ height: 150, background: gradients[idx % gradients.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, userSelect: 'none' }}>{item.emoji}</div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 4, color: '#FDF9F3' }}>{item.name}</div>
              <div style={{ fontSize: 13, color: '#E6BEB2', lineHeight: 1.4, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</div>
              <div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: '#FFB59E', marginBottom: 12 }}>{item.price} VND</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={st.toggleTrack(item.available)} onClick={() => toggleAvailability(item.id)}><div style={st.toggleThumb(item.available)} /></div>
                  <span style={st.toggleLabel(item.available)}>{item.available ? 'Con hang' : 'Het hang'}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={st.iconBtn('edit')}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span></button>
                  <button style={st.iconBtn('delete')}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete_outline</span></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}><span className="material-symbols-outlined" style={{ fontSize: 22, color: '#FFB59E' }}>trending_up</span><h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 600 }}>Xu huong - Mon duoc goi nhieu nhat</h2></div>
        {trendingItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: '#FFB59E', minWidth: 24 }}>#{i + 1}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: '#FDF9F3' }}>{item.name}</div><div style={{ height: 10, borderRadius: 5, background: '#2A2A2A', overflow: 'hidden' }}><div style={{ height: '100%', width: `${item.percent}%`, borderRadius: 5, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', transition: 'width 0.5s ease' }} /></div></div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#FFB59E', minWidth: 40, textAlign: 'right' }}>{item.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMenu;
