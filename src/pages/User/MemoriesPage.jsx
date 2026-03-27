import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isDesktop;
};

const mobileMemories = [
  { id: 1, name: 'Linh Anh', dish: 'Salad Cá Hồi Áp Chảo', time: 'Hôm qua, 19:30', location: 'The Green Leaf Cafe, Quận 1', type: 'normal', foodEmoji: '🥗' },
  { id: 2, name: 'Minh Khang', dish: 'Pizza Pepperoni & Craft Beer', time: '15 Tháng 5, 12:15', location: "Pizza 4P's, Bến Thành", type: 'flash', foodEmoji: '🍕', badge: 'Flash' },
  { id: 3, name: 'Bạn Giấu Mặt', dish: 'Trà Đào & Bánh Ngọt', time: '12 Tháng 5, 15:00', location: "S'mores Rooftop, Quận 3", type: 'anonymous', foodEmoji: '🧁', badge: 'Ẩn danh' },
];

const desktopMemories = [
  { id: 1, name: 'Ăn Ramen cùng Minh Anh', dish: 'Ramen Tonkotsu', time: '19:30, 15 Th04, 2024', location: 'Morico - Lê Lợi', type: 'Flash Meet', icon: 'restaurant_menu', foodEmoji: '🍜' },
  { id: 2, name: 'Blind Soup Date bí ẩn', dish: 'Soup Bí Đỏ', time: '12:00, 12 Th04, 2024', location: 'Secret Garden Pub', type: 'Blind Soup', icon: 'soup_kitchen', foodEmoji: '🥣' },
  { id: 3, name: 'Pizza tối cùng Hoàng Nam', dish: 'Pizza Margerita', time: '20:00, 08 Th04, 2024', location: "Pizza 4P's Bến Thành", type: 'Flash Meet', icon: 'restaurant_menu', foodEmoji: '🍕' },
];

const topDishes = [
  { name: 'Ramen', count: 12, percent: 85 },
  { name: 'Pizza', count: 8, percent: 60 },
  { name: 'Salad', count: 5, percent: 45 },
];

const MemoriesPage = () => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'flash', label: 'Flash Meet' },
    { key: 'blind', label: 'Blind Soup Date' },
    { key: 'dish', label: 'Theo món ăn' },
  ];

  /* ─── DESKTOP LAYOUT ─── */
  if (isDesktop) {
    return (
      <div style={{ minHeight: '100vh', background: '#fcf9f8', fontFamily: "'Manrope', sans-serif", color: '#1c1b1b' }}>
        {/* Top Nav */}
        <nav style={{ background: '#fcf9f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: '72px', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #f6f3f2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '22px', color: '#ad2c00', fontStyle: 'italic', letterSpacing: '-0.5px' }}>GoMet</span>
            <div style={{ display: 'flex', gap: '32px' }}>
              {[{ label: 'Discover', path: '/app/explore' }, { label: 'History', path: '/app/memories', active: true }, { label: 'Chat', path: '/app/chat' }, { label: 'Profile', path: '/app/profile' }].map(link => (
                <a key={link.label} href="#" onClick={e => { e.preventDefault(); navigate(link.path); }} style={{ fontFamily: "'Manrope', sans-serif", fontWeight: link.active ? 700 : 600, color: link.active ? '#ad2c00' : '#1c1b1b', opacity: link.active ? 1 : 0.6, textDecoration: 'none', fontSize: '15px' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['calendar_month', 'filter_list'].map(ic => (
              <button key={ic} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}>
                <span className="material-symbols-outlined" style={{ color: '#1c1b1b', fontSize: '22px' }}>{ic}</span>
              </button>
            ))}
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ebe7e7', border: '2px solid #ad2c00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '8px' }} onClick={() => navigate('/app/profile')}>
              <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: '20px' }}>person</span>
            </div>
          </div>
        </nav>

        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 32px' }}>
          {/* Title */}
          <div style={{ marginBottom: '48px' }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '48px', letterSpacing: '-2px', margin: '0 0 8px 0' }}>Lịch sử Gặp mặt</h1>
            <p style={{ color: '#5d4038', fontSize: '18px', margin: 0 }}>Lưu giữ những hương vị và kỷ niệm đẹp qua từng lần gặp gỡ.</p>
          </div>

          {/* Stats bento */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            {[
              { icon: 'restaurant', val: '24', label: 'Tổng buổi Flash Meet', bg: '#ad2c00', color: '#ffffff' },
              { icon: 'coffee', val: '12', label: 'Blind Soup Date', bg: '#f6f3f2', color: '#1c1b1b' },
              { icon: 'group', val: '32', label: 'Bạn mới kết nối', bg: '#ebe7e7', color: '#1c1b1b' },
            ].map(stat => (
              <div key={stat.label} style={{ background: stat.bg, padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: stat.color === '#ffffff' ? '#ffffff' : '#ad2c00', fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '40px', fontWeight: 700, color: stat.color, marginBottom: '4px' }}>{stat.val}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: stat.color, opacity: stat.color === '#ffffff' ? 0.8 : 0.7 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main 2-col layout */}
          <div style={{ display: 'flex', gap: '48px' }}>
            {/* Left: Timeline */}
            <div style={{ flex: 1 }}>
              {/* Filters */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
                {filters.map(f => (
                  <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{ padding: '10px 24px', borderRadius: '9999px', background: activeFilter === f.key ? '#ad2c00' : '#ffffff', color: activeFilter === f.key ? '#ffffff' : '#1c1b1b', fontWeight: 700, fontSize: '14px', border: activeFilter === f.key ? 'none' : '1px solid rgba(231,189,178,0.3)', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '22px', top: '4px', bottom: '4px', width: '2px', background: '#ebe7e7' }} />
                {desktopMemories.map((mem, idx) => (
                  <div key={mem.id} style={{ position: 'relative', paddingLeft: '64px' }}>
                    <div style={{ position: 'absolute', left: '0', top: '4px', width: '46px', height: '46px', borderRadius: '50%', background: '#ffffff', border: '4px solid #fcf9f8', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'transform 0.2s' }}>
                      <span className="material-symbols-outlined" style={{ color: '#ad2c00', fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{mem.icon}</span>
                    </div>
                    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', display: 'flex', gap: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', transition: 'box-shadow 0.3s' }}>
                      <div style={{ width: '160px', height: '110px', borderRadius: '14px', overflow: 'hidden', background: 'linear-gradient(135deg, #ffdbd1, #ff7852)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '64px' }}>
                        {mem.foodEmoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '20px', margin: 0 }}>{mem.name}</h3>
                          <span style={{ padding: '4px 12px', background: mem.type === 'Blind Soup' ? '#d4e3ff' : 'rgba(255,120,82,0.12)', color: mem.type === 'Blind Soup' ? '#004785' : '#a83918', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{mem.type}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '24px', color: '#5d4038', fontSize: '14px', marginBottom: '16px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>{mem.time}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>{mem.location}
                          </span>
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#f6f3f2', borderRadius: '10px', border: '1px solid rgba(231,189,178,0.1)' }}>
                          <span className="material-symbols-outlined" style={{ color: '#ad2c00', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>badge</span>
                          <span style={{ fontSize: '14px', fontWeight: 700 }}>Visa: {mem.dish}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside style={{ width: '320px', flexShrink: 0 }}>
              <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Top dishes */}
                <div style={{ background: '#f6f3f2', padding: '28px', borderRadius: '20px' }}>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '20px', margin: '0 0 24px 0' }}>Món ăn kết nối nhiều nhất</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {topDishes.map(d => (
                      <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '22px' }}>
                          {d.name === 'Ramen' ? '🍜' : d.name === 'Pizza' ? '🍕' : '🥗'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{d.name}</div>
                          <div style={{ width: '100%', height: '6px', background: '#e5e2e1', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${d.percent}%`, background: '#ad2c00', borderRadius: '9999px' }} />
                          </div>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '12px', color: '#ad2c00', whiteSpace: 'nowrap' }}>{d.count} lần</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Activity chart */}
                <div style={{ background: 'rgba(235,231,231,0.3)', border: '1px solid rgba(231,189,178,0.1)', padding: '28px', borderRadius: '20px' }}>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', margin: '0 0 16px 0' }}>Hoạt động Tháng 4</h2>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '80px', gap: '8px', marginBottom: '16px', padding: '0 8px' }}>
                    {[40, 65, 90, 55, 30].map((h, i) => (
                      <div key={i} style={{ flex: 1, borderRadius: '4px 4px 0 0', background: `rgba(173,44,0,${0.1 + (h / 100) * 0.5})`, height: `${h}%` }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', color: '#5d4038', fontStyle: 'italic', margin: 0 }}>Bạn đã có nhiều hơn 4 buổi hẹn so với tháng trước. Tuyệt vời!</p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  /* ─── MOBILE LAYOUT ─── */
  const filtered = activeFilter === 'all' ? mobileMemories : mobileMemories.filter(m => m.type === activeFilter || (activeFilter === 'flash' && m.type === 'flash') || (activeFilter === 'anonymous' && m.type === 'anonymous'));

  const mobileFilters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'flash', label: 'Flash Meet' },
    { key: 'anonymous', label: 'Giấu mặt' },
  ];

  const navItems = [
    { key: 'explore', icon: 'restaurant', label: 'Khám phá', path: '/app/explore' },
    { key: 'history', icon: 'history', path: '/app/memories' },
    { key: 'chat', icon: 'chat_bubble', label: 'Tin nhắn', path: '/app/chat' },
    { key: 'profile', icon: 'person', label: 'Cá nhân', path: '/app/profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fcf9f8', fontFamily: "'Manrope', sans-serif", color: '#1c1b1b', paddingBottom: '120px' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#fcf9f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/app/home')}>
            <span className="material-symbols-outlined" style={{ color: '#ad2c00', fontSize: '24px' }}>menu</span>
          </button>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '26px', color: '#ad2c00', margin: 0, letterSpacing: '-0.5px' }}>GoMet</h1>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ebe7e7', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate('/app/profile')}>
          <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: '22px' }}>person</span>
        </div>
      </header>

      <main style={{ paddingTop: '112px', paddingBottom: '128px', padding: '112px 24px 128px', maxWidth: '448px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '38px', letterSpacing: '-1.5px', color: '#1c1b1b', margin: '0 0 4px 0' }}>Lịch sử</h2>
          <p style={{ color: '#5d4038', fontWeight: 500, margin: 0 }}>Lưu giữ những hương vị và kết nối.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '36px', scrollbarWidth: 'none' }}>
          {mobileFilters.map(f => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{ padding: '10px 22px', borderRadius: '9999px', background: activeFilter === f.key ? '#ad2c00' : '#ffffff', color: activeFilter === f.key ? '#ffffff' : '#1c1b1b', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap', border: activeFilter === f.key ? 'none' : '1px solid rgba(231,189,178,0.3)', cursor: 'pointer', boxShadow: activeFilter === f.key ? '0 4px 16px rgba(173,44,0,0.2)' : 'none', transition: 'all 0.2s ease' }}>
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '22px', top: '16px', bottom: '16px', width: '2px', background: 'rgba(231,189,178,0.2)' }} />
          {filtered.map((memory, idx) => (
            <div key={memory.id} style={{ position: 'relative', paddingLeft: '56px' }}>
              <div style={{ position: 'absolute', left: '17px', top: '24px', width: '10px', height: '10px', borderRadius: '50%', background: idx === 0 ? '#ad2c00' : '#e7bdb2', boxShadow: idx === 0 ? '0 0 0 4px rgba(173,44,0,0.1)' : 'none', zIndex: 10 }} />
              <div style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fcf9f8', background: memory.type === 'anonymous' ? '#ebe7e7' : 'linear-gradient(135deg, #ffdbd1, #ff7852)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {memory.type === 'anonymous' ? <span className="material-symbols-outlined" style={{ color: '#926f66', fontSize: '28px' }}>person_off</span> : <span style={{ fontSize: '26px' }}>{memory.type === 'normal' ? '👩' : '👨'}</span>}
                      </div>
                      <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '28px', height: '28px', borderRadius: '50%', background: '#ffffff', border: '2px solid #fcf9f8', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{memory.foodEmoji}</div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', margin: 0 }}>{memory.name}</h3>
                        {memory.badge && <span style={{ padding: '2px 8px', borderRadius: '9999px', background: memory.type === 'flash' ? '#ffdbd1' : '#004785', color: memory.type === 'flash' ? '#3b0900' : '#ffffff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>{memory.badge}</span>}
                      </div>
                      <p style={{ color: '#ad2c00', fontWeight: 700, fontSize: '14px', margin: '0 0 4px 0' }}>{memory.dish}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5d4038', fontSize: '12px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_today</span>{memory.time}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '8px 12px', background: '#f6f3f2', borderRadius: '8px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: '16px' }}>location_on</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#5d4038', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{memory.location}</span>
                  </div>
                  {memory.type === 'anonymous' ? (
                    <button style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#ebe7e7', color: '#1c1b1b', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restaurant_menu</span>Xem lại món này
                    </button>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <button style={{ padding: '12px', borderRadius: '8px', background: '#ebe7e7', color: '#1c1b1b', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restaurant_menu</span>Xem lại món
                      </button>
                      <button onClick={() => navigate('/app/chat')} style={{ padding: '12px', borderRadius: '8px', background: '#d83900', color: '#ffffff', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>Nhắn tin
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '448px', zIndex: 50, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '9999px', boxShadow: '0 20px 40px rgba(28,27,27,0.06)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '80px', padding: '0 16px' }}>
        {navItems.map(item => {
          const isActive = item.key === 'history';
          return (
            <button key={item.key} onClick={() => navigate(item.path)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: isActive ? '#ad2c00' : 'transparent', color: isActive ? '#ffffff' : '#a8a29e', borderRadius: '50%', width: '48px', height: '48px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
              {item.label && !isActive && <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MemoriesPage;
