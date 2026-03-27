import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const visaCards = [
  {
    name: 'Phở Bò',
    status: 'approved',
    statusText: 'Đã duyệt',
    vang: 450,
    bg: '#f0edec',
  },
  {
    name: 'Sushi Omakase',
    status: 'pending',
    statusText: 'Chờ duyệt',
    vang: 1200,
    bg: '#f0edec',
  },
  {
    name: 'Kimchi',
    status: 'approved',
    statusText: 'Đã duyệt',
    vang: 150,
    bg: '#f0edec',
  },
];

const HomePage = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('home');

  const badgeStyle = (status) => {
    if (status === 'approved') return { background: '#e7f5ed', color: '#1e5d3c' };
    return { background: '#ebe7e7', color: '#5d4038' };
  };

  const navItems = [
    { key: 'home', icon: 'home', path: '/app' },
    { key: 'map', icon: 'map', path: '/app/explore' },
    { key: 'explore', icon: 'explore', path: '/app/swipe' },
    { key: 'profile', icon: 'person', path: '/app/profile' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fcf9f8',
        fontFamily: "'Manrope', sans-serif",
        color: '#1c1b1b',
        paddingTop: '80px',
        paddingBottom: '120px',
      }}
    >
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: '#fcf9f8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 32px',
          height: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className="material-symbols-outlined"
            style={{ color: '#ad2c00', fontSize: '24px' }}
          >
            restaurant
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              fontSize: '24px',
              color: '#ad2c00',
              letterSpacing: '-0.5px',
              textTransform: 'uppercase',
            }}
          >
            GoMet
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            className="material-symbols-outlined"
            style={{ color: '#1c1b1b', fontSize: '24px', cursor: 'pointer' }}
          >
            notifications
          </span>
        </div>
      </header>

      <section style={{ padding: '40px 32px 24px', overflow: 'hidden' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '3.5rem',
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#1c1b1b',
              marginBottom: '32px',
              margin: '0 0 32px 0',
            }}
          >
            Đi Để Gặp <br />
            <span style={{ color: '#ad2c00', fontStyle: 'italic' }}>·</span> Ăn Để Yêu
          </h1>

          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '32px',
              background: 'linear-gradient(160deg, #ffdbd1 0%, #ffb5a0 40%, #ff7852 70%, #ad2c00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(252,249,248,0.8) 0%, transparent 60%)',
              }}
            />
            <span style={{ fontSize: '80px', position: 'relative', zIndex: 1 }}>🍜</span>
          </div>

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '18px',
              color: '#5d4038',
              maxWidth: '80%',
              lineHeight: 1.7,
              margin: '0 0 16px 0',
            }}
          >
            Visa là tấm vé thông hành đưa bạn đến những tâm hồn đồng điệu thông qua bàn tiệc văn hóa.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '64px' }}>
        <div
          style={{
            padding: '0 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '24px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '24px',
                fontWeight: 700,
                color: '#1c1b1b',
                margin: '0 0 4px 0',
              }}
            >
              Visa Món Ăn
            </h2>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                color: '#5d4038',
                margin: 0,
              }}
            >
              Hộ chiếu vị giác của riêng bạn
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            padding: '4px 32px 8px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {visaCards.map((card) => (
            <div
              key={card.name}
              style={{ flexShrink: 0, width: '280px', scrollSnapAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/app/dish')}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 10px 40px rgba(28,27,27,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 10,
                  }}
                >
                  <span
                    style={{
                      ...badgeStyle(card.status),
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'inline-block',
                    }}
                  >
                    {card.statusText}
                  </span>
                </div>

                <div
                  style={{
                    aspectRatio: '1/1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    background: '#f0edec',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '64px' }}>
                    {card.name === 'Phở Bò' ? '🍜' : card.name === 'Sushi Omakase' ? '🍣' : '🥬'}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1c1b1b',
                    margin: '0 0 4px 0',
                  }}
                >
                  {card.name}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: '#ad2c00',
                        fontSize: '16px',
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      stars
                    </span>
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#1c1b1b',
                      }}
                    >
                      {card.vang.toLocaleString('vi-VN')} VÀNG
                    </span>
                  </div>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: '#5d4038', fontSize: '20px' }}
                  >
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 32px', marginBottom: '64px' }}>
        <div
          style={{
            background: '#f0edec',
            padding: '32px',
            borderRadius: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', marginLeft: '0' }}>
              {['A', 'B', 'C'].map((initial, i) => (
                <div
                  key={initial}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid #ffffff',
                    background: i === 0
                      ? 'linear-gradient(135deg, #ad2c00, #ff7852)'
                      : i === 1
                      ? 'linear-gradient(135deg, #5d4038, #ad2c00)'
                      : 'linear-gradient(135deg, #ff7852, #ffdbd1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '14px',
                    marginLeft: i > 0 ? '-12px' : '0',
                    zIndex: 3 - i,
                    position: 'relative',
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#1c1b1b',
              }}
            >
              +2.4k Bạn bè
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#1c1b1b',
              margin: '0 0 16px 0',
            }}
          >
            Kết Nối Hương Vị
          </h2>

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '15px',
              color: '#5d4038',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Hệ thống Visa không chỉ là bảng thành tích, mà là hệ sinh thái nơi bạn tìm thấy những người bạn có cùng "gu" ẩm thực. Mỗi món ăn là một câu chuyện để bắt đầu cuộc trò chuyện.
          </p>

          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <div style={{ flex: 1, height: '2px', background: '#ad2c00', borderRadius: '9999px' }} />
            <div style={{ flex: 1, height: '2px', background: 'rgba(231,189,178,0.3)', borderRadius: '9999px' }} />
            <div style={{ flex: 1, height: '2px', background: 'rgba(231,189,178,0.3)', borderRadius: '9999px' }} />
          </div>
        </div>
      </section>

      <section style={{ padding: '0 32px', marginBottom: '48px' }}>
        <button
          onClick={() => navigate('/app/profile')}
          style={{
            width: '100%',
            background: '#ad2c00',
            color: '#ffffff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '16px',
            padding: '24px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(173,44,0,0.2)',
          }}
        >
          Kích hoạt Hộ chiếu Ẩm thực
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}
          >
            bolt
          </span>
        </button>

        <p
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '12px',
            color: '#5d4038',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            opacity: 0.6,
          }}
        >
          Gia nhập cộng đồng GoMet ngay hôm nay
        </p>
      </section>

      <nav
        style={{
          position: 'fixed',
          bottom: '24px',
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '9999px',
            width: '90%',
            maxWidth: '448px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '12px',
            boxShadow: '0 10px 40px rgba(28,27,27,0.06)',
          }}
        >
          {navItems.map((item) => {
            const isActive = item.key === activeNav;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveNav(item.key);
                  navigate(item.path);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? '#ad2c00' : 'transparent',
                  color: isActive ? '#ffffff' : '#1c1b1b',
                  boxShadow: isActive ? '0 4px 16px rgba(173,44,0,0.2)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                  {item.icon}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
