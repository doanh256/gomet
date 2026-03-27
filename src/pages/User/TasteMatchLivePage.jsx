import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TasteMatchLivePage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('match');

  const navItems = [
    { key: 'explore', icon: 'restaurant_menu', label: 'Khám phá', path: '/app/explore' },
    { key: 'match', icon: 'favorite', label: 'So khớp', path: '/app/taste-match' },
    { key: 'group', icon: 'group', label: 'Hẹn nhóm', path: '/app/group' },
    { key: 'plan', icon: 'calendar_today', label: 'Kế hoạch', path: '/app/plan' },
  ];

  const sharedDishes = ['Phở Bò Tái Lăn', 'Bún Chả Hà Nội', 'Cà Phê Trứng'];

  const reasons = [
    { text: 'Cả hai đều cực kỳ yêu thích ', highlight: 'vị chua thanh', suffix: ' từ dấm bỗng tự nhiên.' },
    { text: 'Gu thưởng thức không gian quán ', highlight: 'vỉa hè ấm cúng', suffix: ' giống nhau 100%.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fcf9f8', fontFamily: "'Manrope', sans-serif", color: '#1c1b1b', paddingBottom: '120px' }}>
      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#fcf9f8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', background: '#f0edec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: '22px' }}>person</span>
          </div>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '24px', color: '#ad2c00', letterSpacing: '-1px' }}>GoMet</span>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/app/notifications')}>
          <span className="material-symbols-outlined" style={{ color: '#1c1b1b', fontSize: '24px' }}>notifications</span>
        </button>
      </header>

      <main style={{ paddingTop: '96px', paddingBottom: '128px', padding: '96px 24px 128px', maxWidth: '448px', margin: '0 auto' }}>
        {/* Title */}
        <section style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', color: '#1c1b1b', margin: '0 0 8px 0' }}>
            So khớp Khẩu vị
          </h1>
          <p style={{ color: '#5d4038', fontWeight: 500, margin: 0 }}>Khám phá sự tương đồng trong vị giác của bạn</p>
        </section>

        {/* Match Display */}
        <section style={{ position: 'relative', marginBottom: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
            {/* User 1 */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: '4px solid #ffffff', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', background: 'linear-gradient(135deg, #ffdbd1, #ff7852)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '40px' }}>👩</span>
              </div>
            </div>

            {/* Match % bubble */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: '#ad2c00', color: '#ffffff', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(173,44,0,0.35)', border: '4px solid #fcf9f8' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1 }}>Match</span>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 800, lineHeight: 1.1 }}>92%</span>
            </div>

            {/* User 2 */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: '4px solid #ffffff', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', background: 'linear-gradient(135deg, #d4e3ff, #005daa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '40px' }}>👨</span>
              </div>
            </div>
          </div>
        </section>

        {/* Radar Chart */}
        <section style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', marginBottom: '40px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', opacity: 0.05 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '96px' }}>restaurant</span>
          </div>
          <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5d4038', marginBottom: '32px', textAlign: 'center' }}>
            Biểu đồ Vị giác
          </p>
          <div style={{ position: 'relative', width: '192px', height: '192px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <polygon points="100,10 190,75 155,180 45,180 10,75" fill="rgba(235,231,231,0.3)" stroke="rgba(235,231,231,0.5)" strokeWidth="1" />
              <polygon points="100,30 170,82 143,165 57,165 30,82" fill="rgba(235,231,231,0.5)" stroke="rgba(235,231,231,0.6)" strokeWidth="1" />
              <polygon points="100,50 150,90 132,150 68,150 50,90" fill="rgba(235,231,231,0.7)" stroke="rgba(235,231,231,0.8)" strokeWidth="1" />
              <polygon points="100,20 175,78 148,170 62,165 25,82" fill="rgba(173,44,0,0.25)" stroke="#ad2c00" strokeWidth="2" />
            </svg>
            <span style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chua</span>
            <span style={{ position: 'absolute', top: '30%', right: '-40px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cay</span>
            <span style={{ position: 'absolute', bottom: '-8px', right: '-4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mặn</span>
            <span style={{ position: 'absolute', bottom: '-8px', left: '-4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ngọt</span>
            <span style={{ position: 'absolute', top: '30%', left: '-48px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Đắng</span>
          </div>
        </section>

        {/* Shared info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          <div style={{ background: '#f6f3f2', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ color: '#ad2c00', fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', margin: 0 }}>Món ăn kết nối</h3>
            </div>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
              {sharedDishes.map((dish) => (
                <div key={dish} style={{ flexShrink: 0, background: '#ffffff', padding: '8px 16px', borderRadius: '9999px', border: '1px solid rgba(231,189,178,0.2)', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {dish}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#f6f3f2', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ color: '#ad2c00', fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', margin: 0 }}>Lý do nên hẹn hò</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reasons.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span className="material-symbols-outlined" style={{ color: '#a83918', fontSize: '16px', marginTop: '2px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <p style={{ fontSize: '14px', color: '#5d4038', margin: 0, lineHeight: 1.6 }}>
                    {r.text}<strong style={{ color: '#1c1b1b' }}>{r.highlight}</strong>{r.suffix}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/app/flash-meet')}
          style={{ width: '100%', background: 'linear-gradient(180deg, #ad2c00 0%, #d83900 100%)', color: '#ffffff', padding: '20px', borderRadius: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(173,44,0,0.25)', marginBottom: '32px' }}
        >
          Hẹn hò ngay
        </button>
      </main>

      {/* Bottom Nav */}
      <nav style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '448px', zIndex: 50, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '9999px', boxShadow: '0 10px 40px rgba(28,27,27,0.06)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '64px', padding: '0 24px' }}>
        {navItems.map((item) => {
          const isActive = item.key === activeNav;
          return (
            <button
              key={item.key}
              onClick={() => { setActiveNav(item.key); navigate(item.path); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: isActive ? '#ad2c00' : '#a8a29e', transform: isActive ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.3s ease' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TasteMatchLivePage;
