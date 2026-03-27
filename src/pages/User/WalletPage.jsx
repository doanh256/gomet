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

const missions = [
  { icon: 'restaurant', title: 'Check-in tại quán ăn', desc: 'Nhận ngay 200 VÀNG khi chụp ảnh món ăn.', progress: 2, total: 3, reward: 200 },
  { icon: 'rate_review', title: 'Đánh giá 5 sao', desc: 'Chia sẻ cảm nhận về đơn hàng gần nhất.', progress: 0, total: 1, reward: 50 },
];

const rewards = [
  { id: 1, name: "Voucher giảm 20% tại Fine Dining GOME", cost: 2500, tag: 'Hot Deal', emoji: '🍽️' },
  { id: 2, name: 'Voucher 10%', cost: 500, desc: 'Áp dụng cho mọi đơn hàng từ 500k.', icon: 'confirmation_number' },
  { id: 3, name: 'Thẻ Visa Platinum', cost: 10000, desc: 'Nâng hạng thẻ Visa liên kết, miễn phí phí thường niên 1 năm.', icon: 'credit_card' },
  { id: 4, name: 'Món ăn Miễn Phí', cost: 1200, desc: 'Tặng ngay 01 Pizza cỡ lớn tại Pizza 4P\'s cho thành viên Gold.', emoji: '🍕', originalCost: 2000 },
];

const historyItems = [
  { icon: 'restaurant', title: 'Ăn uống tại GOME', time: 'Hôm nay, 12:45 PM', amount: +250 },
  { icon: 'location_on', title: 'Check-in Highlands', time: 'Hôm qua, 09:12 AM', amount: +50 },
  { icon: 'rate_review', title: 'Review Món Gà Cay', time: '12 Th08, 2023', amount: +120 },
  { icon: 'restaurant', title: 'Ăn uống tại Haidilao', time: '10 Th08, 2023', amount: +480 },
  { icon: 'sell', title: 'Đã dùng Voucher -20%', time: '05 Th08, 2023', amount: -1500 },
];

const WalletPage = () => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  /* ─── DESKTOP LAYOUT ─── */
  if (isDesktop) {
    return (
      <div style={{ minHeight: '100vh', background: '#fcf9f8', fontFamily: "'Manrope', sans-serif", color: '#1c1b1b' }}>
        {/* Header */}
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#fcf9f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: '72px', borderBottom: '1px solid #f6f3f2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '22px', color: '#1c1b1b', letterSpacing: '-1px' }}>VÀNG Points</span>
            <nav style={{ display: 'flex', gap: '24px' }}>
              {['Wallet', 'Missions', 'Rewards'].map((t, i) => (
                <a key={t} href="#" onClick={(e) => { e.preventDefault(); if (i === 1) navigate('/app/quests'); }} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#ad2c00' : '#1c1b1b', opacity: i === 0 ? 1 : 0.6, textDecoration: 'none', fontSize: '15px', transition: 'opacity 0.2s' }}>
                  {t}
                </a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['notifications', 'account_circle'].map(ic => (
              <button key={ic} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px' }} onClick={() => ic === 'account_circle' && navigate('/app/profile')}>
                <span className="material-symbols-outlined" style={{ color: '#1c1b1b', fontSize: '24px' }}>{ic}</span>
              </button>
            ))}
          </div>
        </header>

        <main style={{ paddingTop: '96px', paddingBottom: '48px', padding: '96px 32px 48px', maxWidth: '1280px', margin: '0 auto' }}>
          {/* Hero Banner */}
          <section style={{ marginBottom: '48px' }}>
            <div style={{ position: 'relative', overflow: 'hidden', background: '#d83900', borderRadius: '24px', padding: '48px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px', boxShadow: '0 40px 80px rgba(173,44,0,0.15)' }}>
              <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '320px', height: '320px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.8 }}>Số dư hiện tại</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', margin: '8px 0 24px' }}>
                  <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '72px', fontWeight: 900, letterSpacing: '-3px', margin: 0, lineHeight: 1 }}>12.850</h1>
                  <span style={{ fontSize: '24px', fontWeight: 700, opacity: 0.9 }}>VÀNG</span>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button onClick={() => navigate('/app/wallet')} style={{ background: '#ffffff', color: '#ad2c00', padding: '12px 32px', borderRadius: '9999px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>Nạp thêm điểm</button>
                  <button onClick={() => navigate('/app/profile')} style={{ background: 'rgba(173,44,0,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 32px', borderRadius: '9999px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>Chi tiết hạng thẻ</button>
                </div>
              </div>
              <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[{ label: 'Đã kiếm', val: '+4.2k' }, { label: 'Sắp hết hạn', val: '350' }].map(stat => (
                  <div key={stat.label} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7, marginBottom: '4px' }}>{stat.label}</span>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', fontWeight: 900 }}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 12-col Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px' }}>
            {/* Left: Rewards */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', margin: 0 }}>
                  Đổi thưởng <span style={{ color: '#ad2c00' }}>đặc quyền</span>
                </h2>
                <a href="#" style={{ color: '#ad2c00', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>Xem tất cả</a>
              </div>
              {/* Featured banner */}
              <div style={{ position: 'relative', overflow: 'hidden', background: '#f0edec', borderRadius: '20px', height: '280px', marginBottom: '24px', display: 'flex', alignItems: 'flex-end', padding: '32px' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #ffdbd1 0%, #ff7852 50%, #ad2c00 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '120px' }}>🍽️</span>
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                  <div>
                    <span style={{ display: 'inline-block', background: '#ad2c00', padding: '4px 12px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '12px' }}>Hot Deal</span>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>Voucher giảm 20%<br />tại Fine Dining GOME</h3>
                  </div>
                  <button style={{ background: '#ffffff', color: '#1c1b1b', padding: '12px 24px', borderRadius: '9999px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>2.500 Điểm</button>
                </div>
              </div>
              {/* 2-col small cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {[
                  { icon: 'confirmation_number', iconBg: '#ffdbd1', title: 'Voucher 10%', desc: 'Áp dụng cho mọi đơn hàng từ 500k trên toàn hệ thống.', cost: '500 VÀNG' },
                  { icon: 'credit_card', iconBg: '#d4e3ff', title: 'Thẻ Visa Platinum', desc: 'Nâng hạng thẻ Visa liên kết, miễn phí phí thường niên 1 năm.', cost: '10.000 VÀNG' },
                ].map(card => (
                  <div key={card.title} style={{ background: '#ffffff', border: '1px solid rgba(231,189,178,0.1)', padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ width: '48px', height: '48px', background: card.iconBg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                        <span className="material-symbols-outlined" style={{ color: '#ad2c00' }}>{card.icon}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '20px', margin: '0 0 8px 0' }}>{card.title}</h3>
                      <p style={{ color: '#5d4038', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
                    </div>
                    <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 900, color: '#ad2c00' }}>{card.cost}</span>
                      <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f0edec', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Wide pizza card */}
              <div style={{ background: '#f6f3f2', padding: '4px', borderRadius: '20px' }}>
                <div style={{ background: '#ffffff', padding: '28px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '16px', background: 'linear-gradient(135deg, #ffdbd1, #ff7852)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '56px' }}>🍕</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '22px', margin: '0 0 4px 0' }}>Món ăn Miễn Phí</h3>
                    <p style={{ color: '#5d4038', fontSize: '14px', margin: '0 0 16px 0' }}>Tặng ngay 01 Pizza cỡ lớn tại Pizza 4P's cho thành viên Gold.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 900, color: '#ad2c00' }}>1.200 VÀNG</span>
                      <span style={{ fontSize: '14px', opacity: 0.4, textDecoration: 'line-through' }}>2.000 VÀNG</span>
                    </div>
                  </div>
                  <button style={{ background: '#1c1b1b', color: '#ffffff', padding: '12px 28px', borderRadius: '9999px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Đổi ngay</button>
                </div>
              </div>
            </div>

            {/* Right sidebar: History */}
            <aside>
              <div style={{ position: 'sticky', top: '96px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '24px', fontWeight: 900, margin: 0 }}>Lịch sử tích điểm</h2>
                  <span className="material-symbols-outlined" style={{ color: '#5d4038', opacity: 0.6 }}>history</span>
                </div>
                <div style={{ background: '#f6f3f2', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {historyItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ color: item.amount > 0 ? '#ad2c00' : '#5d4038', fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, fontSize: '14px', opacity: item.amount < 0 ? 0.6 : 1 }}>{item.title}</span>
                          <span style={{ fontWeight: 900, fontSize: '14px', color: item.amount > 0 ? '#ad2c00' : '#5d4038', opacity: item.amount < 0 ? 0.6 : 1 }}>
                            {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString('vi-VN')}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#5d4038', opacity: 0.6 }}>{item.time}</span>
                      </div>
                    </div>
                  ))}
                  <button style={{ marginTop: '8px', width: '100%', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(231,189,178,0.2)', padding: '16px', borderRadius: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                    Xem lịch sử chi tiết
                  </button>
                </div>
                {/* Help card */}
                <div style={{ marginTop: '24px', background: '#005daa', borderRadius: '20px', padding: '24px', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
                  <h3 style={{ fontWeight: 700, margin: '0 0 8px 0' }}>Bạn cần hỗ trợ?</h3>
                  <p style={{ fontSize: '14px', opacity: 0.8, margin: '0 0 16px 0' }}>Liên hệ đội ngũ hỗ trợ 24/7</p>
                  <button style={{ background: '#ffffff', color: '#005daa', padding: '10px 20px', borderRadius: '9999px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>Liên hệ ngay</button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  /* ─── MOBILE LAYOUT ─── */
  const tabs = [
    { key: 'wallet', icon: 'account_balance_wallet', label: 'Wallet', path: '/app/wallet' },
    { key: 'missions', icon: 'task_alt', label: 'Missions', path: '/app/quests' },
    { key: 'rewards', icon: 'confirmation_number', label: 'Rewards', path: '/app/wallet' },
    { key: 'profile', icon: 'person', label: 'Profile', path: '/app/profile' },
  ];
  const [activeTab, setActiveTab] = useState('wallet');

  const mobileRewards = [
    { id: 1, name: "Voucher Pizza 4P's 50k", cost: 5000, remaining: 12, emoji: '🍕' },
    { id: 2, name: 'Highland Coffee Voucher 20k', cost: 2500, remaining: 45, emoji: '☕' },
    { id: 3, name: 'Gà Rán KFC Set 2', cost: 3000, remaining: 8, emoji: '🍗' },
    { id: 4, name: 'Bánh Mì Phượng Voucher', cost: 800, remaining: 30, emoji: '🥖' },
  ];
  const mobileHistory = [
    { type: 'earn', title: 'Hoàn thành: Ăn sáng lành mạnh', time: 'Hôm nay, 08:30', amount: 100 },
    { type: 'spend', title: "Đổi thưởng: Pizza 4P's", time: 'Hôm qua, 19:15', amount: -5000 },
    { type: 'earn', title: 'Thưởng nhiệm vụ tuần', time: '22 Thg 10, 2023', amount: 500 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fcf9f8', fontFamily: "'Manrope', sans-serif", color: '#1c1b1b', paddingBottom: '120px' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#fcf9f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: '72px' }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '22px', color: '#1c1b1b', letterSpacing: '-1px' }}>VÀNG Points</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['notifications', 'account_circle'].map(ic => (
            <button key={ic} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>
              <span className="material-symbols-outlined" style={{ color: '#1c1b1b', fontSize: '24px' }}>{ic}</span>
            </button>
          ))}
        </div>
      </header>
      <main style={{ paddingTop: '96px', padding: '96px 24px 0', maxWidth: '448px', margin: '0 auto' }}>
        <section style={{ marginBottom: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5d4038', opacity: 0.6, marginBottom: '8px' }}>Số dư hiện tại</p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '60px', fontWeight: 800, letterSpacing: '-2px', color: '#1c1b1b', margin: 0 }}>12.450</h1>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '26px', fontWeight: 900, color: '#ad2c00' }}>VÀNG</span>
          </div>
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => navigate('/app/quests')} style={{ background: '#ad2c00', color: '#ffffff', padding: '16px 32px', borderRadius: '9999px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(173,44,0,0.25)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Đổi thưởng ngay <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>celebration</span>
            </button>
          </div>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, margin: 0 }}>Nhiệm vụ mới</h2>
              <span style={{ color: '#ad2c00', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }} onClick={() => navigate('/app/quests')}>Xem tất cả</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
              {missions.map((m, i) => (
                <div key={i} style={{ minWidth: '260px', background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(28,27,27,0.06)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,120,82,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#ad2c00' }}>{m.icon}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '16px', margin: '0 0 4px 0' }}>{m.title}</h3>
                  <p style={{ color: '#5d4038', fontSize: '13px', margin: '0 0 14px 0' }}>{m.desc}</p>
                  <div style={{ width: '100%', height: '5px', background: '#ebe7e7', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(m.progress / m.total) * 100}%`, background: '#ad2c00', borderRadius: '9999px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#5d4038', opacity: 0.6 }}>
                    <span>{m.progress === 0 ? 'Chưa bắt đầu' : `Tiến độ ${m.progress}/${m.total}`}</span>
                    <span>+{m.reward} VÀNG</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, margin: '0 0 20px 0' }}>Kho phần thưởng</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {mobileRewards.map(r => (
                <div key={r.id} style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(28,27,27,0.05)', cursor: 'pointer' }}>
                  <div style={{ aspectRatio: '4/5', background: 'linear-gradient(135deg, #f0edec, #ffdbd1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <span style={{ fontSize: '48px' }}>{r.emoji}</span>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '3px 7px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, color: '#ad2c00' }}>-{r.cost.toLocaleString('vi-VN')} VÀNG</div>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '12px', lineHeight: 1.3, margin: '0 0 3px 0' }}>{r.name}</h4>
                    <p style={{ fontSize: '10px', color: '#5d4038', opacity: 0.7, margin: 0 }}>Còn lại: {r.remaining}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section style={{ paddingBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, margin: '0 0 20px 0' }}>Lịch sử điểm</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mobileHistory.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(28,27,27,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: item.type === 'earn' ? '#dcfce7' : 'rgba(173,44,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ color: item.type === 'earn' ? '#15803d' : '#ad2c00', fontSize: '16px' }}>{item.type === 'earn' ? 'add_circle' : 'shopping_bag'}</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '13px', margin: '0 0 2px 0' }}>{item.title}</h4>
                      <p style={{ fontSize: '11px', color: '#5d4038', margin: 0 }}>{item.time}</p>
                    </div>
                  </div>
                  <span style={{ fontWeight: 900, fontSize: '14px', color: item.type === 'earn' ? '#15803d' : '#ad2c00' }}>
                    {item.amount > 0 ? '+' : ''}{Math.abs(item.amount).toLocaleString('vi-VN')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <nav style={{ position: 'fixed', bottom: '24px', left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
        <div style={{ width: '90%', maxWidth: '448px', background: 'rgba(252,249,248,0.9)', backdropFilter: 'blur(20px)', borderRadius: '9999px', boxShadow: '0 20px 40px rgba(28,27,27,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
          {tabs.map(tab => {
            const isActive = tab.key === activeTab;
            return (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); navigate(tab.path); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: isActive ? '#ffffff' : 'transparent', color: isActive ? '#ad2c00' : '#1c1b1b', borderRadius: '9999px', padding: isActive ? '8px 20px' : '8px 14px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{tab.icon}</span>
                {isActive && <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{tab.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default WalletPage;
