import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const b2bKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const categories = ['Khai vi', 'Mon chinh', 'Trang mieng', 'Nuoc uong'];

const menuItems = {
  0: [
    { name: 'Nem Ran', price: '45.000', sold: 128, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=120&h=120&fit=crop', soldOut: false },
    { name: 'Goi Cuon Tom', price: '55.000', sold: 96, img: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=120&h=120&fit=crop', soldOut: false },
    { name: 'Cha Gio Re', price: '40.000', sold: 74, img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=120&h=120&fit=crop', soldOut: true },
  ],
  1: [
    { name: 'Pho Bo Dac Biet', price: '85.000', sold: 312, img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=120&h=120&fit=crop', soldOut: false },
    { name: 'Bun Cha Ha Noi', price: '75.000', sold: 245, img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=120&h=120&fit=crop', soldOut: false },
    { name: 'Com Tam Suon Bi', price: '70.000', sold: 189, img: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=120&h=120&fit=crop', soldOut: false },
  ],
  2: [
    { name: 'Che Ba Mau', price: '35.000', sold: 67, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=120&h=120&fit=crop', soldOut: false },
    { name: 'Banh Flan', price: '30.000', sold: 54, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=120&h=120&fit=crop', soldOut: false },
  ],
  3: [
    { name: 'Ca Phe Sua Da', price: '35.000', sold: 410, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=120&h=120&fit=crop', soldOut: false },
    { name: 'Tra Da', price: '10.000', sold: 380, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=120&h=120&fit=crop', soldOut: false },
  ],
};

const B2BMenuMobilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const items = menuItems[activeTab] || [];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#fff', paddingBottom: 80 }}>
      <style>{b2bKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#fff' }}>arrow_back</span>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 6, color: '#E8900C' }}>restaurant_menu</span>
            Quan Ly Menu
          </h1>
        </div>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#888' }}>more_vert</span>
      </div>

      {/* Category Tabs */}
      <div style={{ padding: '20px 16px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {categories.map((c, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            padding: '8px 20px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            background: activeTab === i ? 'linear-gradient(135deg, #E8900C, #F5C542)' : 'rgba(255,255,255,0.06)',
            color: activeTab === i ? '#fff' : '#888', fontSize: 13, fontWeight: 600
          }}>{c}</button>
        ))}
      </div>

      {/* Dish Cards */}
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 18, padding: 14,
            display: 'flex', gap: 14, border: '1px solid rgba(255,255,255,0.06)',
            animation: `fadeInUp 0.4s ease ${i * 0.08}s both`,
            opacity: item.soldOut ? 0.5 : 1
          }}>
            <img src={item.img} alt={item.name} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#E8900C' }}>{item.price}d</div>
                </div>
                {/* Sold Out Toggle */}
                <div onClick={() => {}} style={{
                  width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                  background: item.soldOut ? '#FF3B5C' : '#00C9A7', padding: 2, position: 'relative'
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 2, left: item.soldOut ? 22 : 2, transition: 'left 0.2s ease'
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <div style={{ fontSize: 12, color: '#888' }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>trending_up</span>
                  {item.sold} da ban
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
                    width: 32, height: 32, borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16, color: '#6C63FF' }}>edit</span>
                  </button>
                  <button style={{
                    width: 32, height: 32, borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: 'rgba(255,59,92,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16, color: '#FF3B5C' }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 10 }}>
        <button style={{
          width: 56, height: 56, borderRadius: 18, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #E8900C, #F5C542)', boxShadow: '0 6px 24px rgba(232,144,12,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 28, color: '#fff' }}>add</span>
        </button>
      </div>
    </div>
  );
};

export default B2BMenuMobilePage;
