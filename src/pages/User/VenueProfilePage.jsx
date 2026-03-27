import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  background: '#fcf9f8',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryFixed: '#ffdbd1',
  primaryFixedDim: '#ffb5a0',
  outlineVariant: '#e7bdb2',
  onPrimary: '#ffffff',
};

const MOCK_VENUE = {
  id: 1,
  name: "L'Artiste Brasserie",
  rating: 4.9,
  reviewCount: '1.2k',
  verified: true,
  cuisine: 'Pháp & Ý hiện đại, Fusion Á-Âu',
  priceRange: '500.000đ - 2.500.000đ',
  location: '123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  phone: '(028) 3822 0000',
  hours: '10:00 - 23:00',
  hoursStatus: 'Đang mở',
  description:
    'Nhà hàng phong cách hiện đại kết hợp tinh hoa ẩm thực Pháp và Ý, không gian sang trọng ấm cúng thích hợp cho những buổi hẹn hò lãng mạn và gặp gỡ đặc biệt. Menu được thiết kế bởi đầu bếp Michelin với nguyên liệu địa phương tươi ngon thượng hạng.',
  amenities: ['Wifi Tốc độ cao', 'Phòng riêng', 'Thanh toán thẻ', 'Smoking Area', 'Đỗ xe miễn phí'],
  vanngPoints: 250,
  menu: [
    {
      id: 1,
      name: 'Wagyu A5 Rossini',
      price: '1.250k',
      description: 'Bò Wagyu thượng hạng, gan ngỗng Pháp, nấm Truffle đen và sốt vang đỏ đặc trưng.',
      tag: 'Menu Visa',
      gradient: 'linear-gradient(135deg, #c0392b, #922b21)',
    },
    {
      id: 2,
      name: 'Lobster Ravioli',
      price: '850k',
      description: 'Nhân tôm hùm xanh tươi rói, sốt kem nghệ tây và trứng cá tầm muối.',
      tag: 'Menu Visa',
      gradient: 'linear-gradient(135deg, #1a5276, #154360)',
    },
    {
      id: 3,
      name: 'Bò Wagyu Sốt Truffle',
      price: '680k',
      description: 'Thịt bò Wagyu hảo hạng áp chảo hoàn hảo, kết hợp sốt nấm Truffle đặc biệt.',
      tag: null,
      gradient: 'linear-gradient(135deg, #6e2f1a, #922b21)',
    },
    {
      id: 4,
      name: 'Risotto Nấm Rừng',
      price: '320k',
      description: 'Gạo Arborio Ý nấu cùng các loại nấm rừng quý hiếm và phô mai Parmesan.',
      tag: null,
      gradient: 'linear-gradient(135deg, #4a235a, #6c3483)',
    },
  ],
  events: [
    {
      id: 1,
      title: 'Tiệc tối lãng mạn & Kết nối',
      description: '"Mình muốn tìm người cùng đam mê Fine Dining và vang đỏ. Join mình nhé!"',
      waiting: 2,
      spots: 4,
    },
    {
      id: 2,
      title: 'Trao đổi văn hoá & Ẩm thực',
      description: '"Chủ đề tối nay: Rượu vang vùng Bordeaux. Không gian yên tĩnh phù hợp trò chuyện."',
      waiting: 3,
      spots: 4,
    },
  ],
  reviews: [
    {
      id: 1,
      name: 'Minh Thư',
      badge: 'Top Reviewer',
      time: '2 ngày trước',
      rating: 5,
      text: 'Không gian cực kỳ sang trọng và ấm cúng. Món Wagyu A5 thực sự tan trong miệng. Rất hài lòng với dịch vụ và cách bài trí món ăn. Chắc chắn sẽ quay lại.',
      avatarGradient: 'linear-gradient(135deg, #ad2c00, #ff7852)',
    },
    {
      id: 2,
      name: 'Hoàng Nam',
      badge: 'Thành viên Bạc',
      time: '1 tuần trước',
      rating: 4,
      text: 'Menu Visa rất chất lượng, ưu đãi tốt. Tuy nhiên cuối tuần hơi đông nên cần đặt bàn trước ít nhất 2 ngày.',
      avatarGradient: 'linear-gradient(135deg, #005daa, #0075d5)',
    },
    {
      id: 3,
      name: 'Thảo Nhi',
      badge: 'Thành viên Vàng',
      time: '3 tuần trước',
      rating: 5,
      text: 'Buổi hẹn hò hoàn hảo! Ánh sáng đẹp, nhạc nhẹ nhàng, món tráng miệng siêu ngon. Nhân viên rất chu đáo và nhiệt tình.',
      avatarGradient: 'linear-gradient(135deg, #a83918, #d4411a)',
    },
  ],
};

const TABS = ['Tổng quan', 'Menu', 'Sự kiện', 'Đánh giá'];

const VenueProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Tổng quan');
  const venue = MOCK_VENUE;

  const renderStars = (rating, size = 18) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined"
          style={{
            fontSize: size,
            color: i <= Math.round(rating) ? COLORS.primary : COLORS.outlineVariant,
            fontVariationSettings: i <= Math.round(rating) ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          star
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.background,
        color: COLORS.onSurface,
        fontFamily: "'Manrope', sans-serif",
        paddingBottom: 48,
      }}
    >
      {/* Top Nav */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: COLORS.background,
          borderBottom: `1px solid ${COLORS.outlineVariant}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          height: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: COLORS.onSurface,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Manrope', sans-serif",
              padding: '8px 0',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
            Quay lại
          </button>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.onSurface,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.5px',
            }}
          >
            GoMet
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            style={{
              padding: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: COLORS.onSurface,
              borderRadius: '50%',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>search</span>
          </button>
          <button
            style={{
              padding: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: COLORS.onSurface,
              borderRadius: '50%',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>notifications</span>
          </button>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ad2c00, #ff7852)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            U
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 0' }}>
        {/* Hero Gallery */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, height: 500 }}>
            {/* Main hero image */}
            <div
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #3d1a10 0%, #7a2d00 40%, #c0392b 100%)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 40,
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: COLORS.primary,
                    color: '#fff',
                    padding: '4px 14px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    marginBottom: 14,
                  }}
                >
                  PREMIUM PARTNER
                </span>
                <h1
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 42,
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.5px',
                    marginBottom: 12,
                    lineHeight: 1.1,
                  }}
                >
                  {venue.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'rgba(255,255,255,0.9)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 20, color: '#ff7852', fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span style={{ fontWeight: 700 }}>{venue.rating}</span>
                    <span style={{ fontSize: 13, opacity: 0.7 }}>({venue.reviewCount} Đánh giá)</span>
                  </div>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                    <span style={{ fontSize: 14 }}>Quận 1, TP. Hồ Chí Minh</span>
                  </div>
                  {venue.verified && (
                    <>
                      <span style={{ opacity: 0.4 }}>•</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 16, color: '#4fc3f7', fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        <span style={{ fontSize: 13 }}>Đã xác minh</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Side images */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  flex: 1,
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #1a4a6e 0%, #0d2d4a 100%)',
                  overflow: 'hidden',
                }}
              />
              <div
                style={{
                  flex: 1,
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #4a1a0d 0%, #7a3000 100%)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      color: COLORS.onSurface,
                      borderRadius: 999,
                      padding: '10px 20px',
                      fontWeight: 700,
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>grid_view</span>
                    Xem tất cả 24 ảnh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VÀNG Points Banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primaryFixed} 0%, #fff8e1 100%)`,
            border: `1.5px solid ${COLORS.outlineVariant}`,
            borderRadius: 20,
            padding: '16px 28px',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 28, color: '#c77700', fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 700, color: COLORS.onSurface, fontSize: 15 }}>
              Tích{' '}
              <strong style={{ color: COLORS.primary }}>+{venue.vanngPoints} điểm VÀNG</strong>{' '}
              khi đặt bàn tại đây
            </span>
            <span style={{ fontSize: 13, color: COLORS.onSurfaceVariant, marginLeft: 8 }}>
              • Ưu đãi 15% Menu Visa khi đặt qua GoMet
            </span>
          </div>
          <button
            onClick={() => navigate('/app/booking')}
            style={{
              background: COLORS.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            Đặt bàn ngay
          </button>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}>
          {/* Left Column */}
          <div>
            {/* Bento Info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                marginBottom: 40,
              }}
            >
              {[
                { icon: 'restaurant_menu', title: 'Ẩm thực', value: venue.cuisine },
                { icon: 'schedule', title: 'Giờ mở cửa', value: `${venue.hours} • ${venue.hoursStatus}` },
                { icon: 'payments', title: 'Mức giá', value: venue.priceRange },
              ].map((item) => (
                <div
                  key={item.icon}
                  style={{
                    background: COLORS.surfaceContainerLow,
                    borderRadius: 20,
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 28, color: COLORS.primary }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.onSurfaceVariant }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                borderBottom: `2px solid ${COLORS.outlineVariant}`,
                marginBottom: 40,
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '12px 24px',
                    fontSize: 15,
                    fontWeight: activeTab === tab ? 700 : 500,
                    color: activeTab === tab ? COLORS.primary : COLORS.onSurfaceVariant,
                    borderBottom: activeTab === tab ? `2px solid ${COLORS.primary}` : '2px solid transparent',
                    marginBottom: -2,
                    fontFamily: "'Manrope', sans-serif",
                    transition: 'color 0.15s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab: Tổng quan */}
            {activeTab === 'Tổng quan' && (
              <div>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 26,
                    fontWeight: 800,
                    marginBottom: 14,
                    letterSpacing: '-0.3px',
                  }}
                >
                  Giới thiệu
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: COLORS.onSurfaceVariant,
                    marginBottom: 32,
                  }}
                >
                  {venue.description}
                </p>

                {/* Flash Meet preview */}
                <div
                  style={{
                    background: `${COLORS.primary}0d`,
                    borderRadius: 24,
                    padding: 32,
                    border: `1px solid ${COLORS.primary}1a`,
                    marginBottom: 32,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 24, color: COLORS.primary, fontVariationSettings: "'FILL' 1" }}
                    >
                      bolt
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 20,
                        fontWeight: 800,
                      }}
                    >
                      Flash Meet đang diễn ra
                    </h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {venue.events.map((ev) => (
                      <div
                        key={ev.id}
                        style={{
                          background: COLORS.surfaceContainerLowest,
                          borderRadius: 16,
                          padding: 20,
                          border: `1px solid ${COLORS.outlineVariant}30`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 12,
                          }}
                        >
                          <div style={{ display: 'flex' }}>
                            {Array.from({ length: Math.min(ev.waiting, 3) }).map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  background: `linear-gradient(135deg, ${i % 2 === 0 ? '#ad2c00' : '#005daa'}, ${i % 2 === 0 ? '#ff7852' : '#0075d5'})`,
                                  border: '2px solid #fff',
                                  marginLeft: i > 0 ? -10 : 0,
                                }}
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary }}>
                            Đang chờ: {ev.waiting} người
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{ev.title}</div>
                        <p
                          style={{
                            fontSize: 12,
                            color: COLORS.onSurfaceVariant,
                            lineHeight: 1.5,
                            marginBottom: 14,
                          }}
                        >
                          {ev.description}
                        </p>
                        <button
                          style={{
                            width: '100%',
                            padding: '10px 0',
                            background: COLORS.primary,
                            color: '#fff',
                            border: 'none',
                            borderRadius: 999,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: 'pointer',
                            fontFamily: "'Manrope', sans-serif",
                          }}
                        >
                          Tham gia ngay
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Menu */}
            {activeTab === 'Menu' && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 26,
                        fontWeight: 800,
                        letterSpacing: '-0.3px',
                        marginBottom: 6,
                      }}
                    >
                      Thực đơn đặc sắc
                    </h2>
                    <p style={{ fontSize: 14, color: COLORS.onSurfaceVariant }}>
                      Trải nghiệm tinh hoa ẩm thực được tuyển chọn bởi đầu bếp Michelin.
                    </p>
                  </div>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: COLORS.primary,
                      fontWeight: 700,
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Xem Menu đầy đủ
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {venue.menu.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: COLORS.surfaceContainerLowest,
                        borderRadius: 20,
                        padding: 16,
                        display: 'flex',
                        gap: 16,
                        alignItems: 'center',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                        border: `1px solid ${COLORS.outlineVariant}30`,
                      }}
                    >
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 14,
                          background: item.gradient,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 36, color: 'rgba(255,255,255,0.4)' }}
                        >
                          restaurant
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 4,
                            gap: 8,
                          }}
                        >
                          <span style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</span>
                          <span style={{ fontWeight: 700, color: COLORS.primary, fontSize: 14, whiteSpace: 'nowrap' }}>
                            {item.price}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 12,
                            color: COLORS.onSurfaceVariant,
                            lineHeight: 1.5,
                            marginBottom: item.tag ? 8 : 0,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.description}
                        </p>
                        {item.tag && (
                          <span
                            style={{
                              display: 'inline-block',
                              background: COLORS.primaryFixed,
                              color: '#872101',
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              padding: '2px 8px',
                              borderRadius: 4,
                            }}
                          >
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Sự kiện */}
            {activeTab === 'Sự kiện' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 26, color: COLORS.primary, fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 26,
                      fontWeight: 800,
                      letterSpacing: '-0.3px',
                    }}
                  >
                    Flash Meet & Sự kiện
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {venue.events.map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        background: COLORS.surfaceContainerLowest,
                        borderRadius: 20,
                        padding: 24,
                        border: `1px solid ${COLORS.outlineVariant}30`,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          marginBottom: 16,
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          {Array.from({ length: Math.min(ev.waiting, 3) }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${i % 2 === 0 ? '#ad2c00' : '#005daa'}, ${i % 2 === 0 ? '#ff7852' : '#0075d5'})`,
                                border: '2px solid #fff',
                                marginLeft: i > 0 ? -12 : 0,
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.primary }}>
                          Đang chờ: {ev.waiting} người
                        </span>
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{ev.title}</h4>
                      <p
                        style={{
                          fontSize: 14,
                          color: COLORS.onSurfaceVariant,
                          lineHeight: 1.6,
                          marginBottom: 20,
                          fontStyle: 'italic',
                        }}
                      >
                        {ev.description}
                      </p>
                      <button
                        style={{
                          width: '100%',
                          padding: '14px 0',
                          background: COLORS.primary,
                          color: '#fff',
                          border: 'none',
                          borderRadius: 999,
                          fontWeight: 700,
                          fontSize: 15,
                          cursor: 'pointer',
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      >
                        Tham gia ngay
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Đánh giá */}
            {activeTab === 'Đánh giá' && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 28,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 26,
                      fontWeight: 800,
                      letterSpacing: '-0.3px',
                    }}
                  >
                    Đánh giá cộng đồng
                  </h2>
                  <button
                    style={{
                      background: COLORS.surfaceContainerHigh,
                      border: 'none',
                      borderRadius: 999,
                      padding: '10px 22px',
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: 'pointer',
                      fontFamily: "'Manrope', sans-serif",
                      color: COLORS.onSurface,
                    }}
                  >
                    Viết đánh giá
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {venue.reviews.map((r, index) => (
                    <div
                      key={r.id}
                      style={{
                        borderBottom:
                          index < venue.reviews.length - 1
                            ? `1px solid ${COLORS.outlineVariant}40`
                            : 'none',
                        paddingBottom: index < venue.reviews.length - 1 ? 28 : 0,
                        marginBottom: index < venue.reviews.length - 1 ? 28 : 0,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 12,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: '50%',
                              background: r.avatarGradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: 16,
                              flexShrink: 0,
                            }}
                          >
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                            <div style={{ fontSize: 12, color: COLORS.onSurfaceVariant }}>
                              {r.badge} • {r.time}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 2 }}>{renderStars(r.rating, 16)}</div>
                      </div>
                      <p
                        style={{
                          fontSize: 14,
                          color: COLORS.onSurfaceVariant,
                          lineHeight: 1.7,
                        }}
                      >
                        {r.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Location Card */}
            <div
              style={{
                background: COLORS.surfaceContainerLowest,
                borderRadius: 24,
                padding: 28,
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                border: `1px solid ${COLORS.outlineVariant}30`,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 20,
                }}
              >
                Vị trí & Liên hệ
              </h3>
              {/* Map placeholder */}
              <div
                style={{
                  width: '100%',
                  height: 160,
                  borderRadius: 16,
                  marginBottom: 20,
                  background: 'linear-gradient(135deg, #c8d8e4 0%, #a8c4d0 50%, #8eb8c4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 40, color: COLORS.primary, fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: 'location_on', text: venue.location },
                  { icon: 'call', text: venue.phone },
                  { icon: 'directions_car', text: 'Có chỗ đậu xe hơi miễn phí' },
                ].map((item) => (
                  <div key={item.icon} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 20, color: COLORS.primary, flexShrink: 0, marginTop: 1 }}
                    >
                      {item.icon}
                    </span>
                    <span style={{ fontSize: 13, color: COLORS.onSurface, lineHeight: 1.5 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <button
                style={{
                  width: '100%',
                  marginTop: 20,
                  padding: '12px 0',
                  background: 'none',
                  border: `1.5px solid ${COLORS.outlineVariant}`,
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  color: COLORS.onSurface,
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Xem đường đi
              </button>
            </div>

            {/* CTA Card */}
            <div
              style={{
                background: COLORS.primary,
                borderRadius: 24,
                padding: 32,
                color: '#fff',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  marginBottom: 12,
                }}
              >
                Trải nghiệm ngay
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.9, marginBottom: 24 }}>
                Đặt bàn qua GoMet để nhận ngay ưu đãi 15% cho Menu Visa và tích điểm VÀNG.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button
                  onClick={() => navigate('/app/booking')}
                  style={{
                    width: '100%',
                    padding: '14px 0',
                    background: '#fff',
                    color: COLORS.primary,
                    border: 'none',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    fontFamily: "'Manrope', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>restaurant</span>
                  Đặt bàn (Miễn phí)
                </button>
                <button
                  style={{
                    width: '100%',
                    padding: '14px 0',
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    fontFamily: "'Manrope', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>bolt</span>
                  Tạo Flash Meet
                </button>
              </div>
            </div>

            {/* Amenities */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {venue.amenities.map((a) => (
                <span
                  key={a}
                  style={{
                    background: COLORS.surfaceContainer,
                    color: COLORS.onSurfaceVariant,
                    borderRadius: 999,
                    padding: '7px 14px',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VenueProfilePage;
