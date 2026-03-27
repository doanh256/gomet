import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const isMobile = window.innerWidth < 1024;

// Map dot markers: [leftPercent, topPercent, label, color, flag]
const mapMarkers = [
  { left: 72, top: 52, label: 'Việt Nam', color: '#ad2c00', flag: '🇻🇳', active: true },
  { left: 82, top: 35, label: 'Nhật Bản', color: '#c97d10', flag: '🇯🇵', active: false },
  { left: 53, top: 32, label: 'Ý', color: '#c97d10', flag: '🇮🇹', active: false },
  { left: 20, top: 48, label: 'Mexico', color: '#c97d10', flag: '🇲🇽', active: false },
  { left: 50, top: 28, label: 'Pháp', color: '#c97d10', flag: '🇫🇷', active: false },
];

const visaCards = [
  {
    id: 1,
    title: 'Phở Bò Hà Nội',
    region: 'LOCAL · VN',
    type: 'SIGNATURE VISA',
    flag: '🇻🇳',
    goldBorder: true,
    badge: null,
    color: '#c97d10',
    emoji: '🍜',
  },
  {
    id: 2,
    title: 'Sushi Omakase',
    region: 'INTERNATIONAL · JPN',
    type: 'TINH HOA',
    flag: '🇯🇵',
    goldBorder: false,
    badge: 'SƯU TẦM',
    badgeColor: '#ad2c00',
    color: '#ad2c00',
    emoji: '🍣',
  },
  {
    id: 3,
    title: 'Pad Thai',
    region: 'INTERNATIONAL · THA',
    type: 'PHỔ THÔNG',
    flag: '🇹🇭',
    goldBorder: false,
    badge: 'SƯU TẦM',
    badgeColor: '#5d4038',
    color: '#5d4038',
    emoji: '🍝',
  },
];

// ─── Desktop Layout ──────────────────────────────────────────────────────────

const DesktopLayout = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#fcf9f8',
      overflowY: 'auto',
      fontFamily: 'var(--font-body, Manrope, sans-serif)',
      minHeight: '100vh',
      padding: '40px 40px 80px',
    }}>
      {/* Page heading */}
      <h1 style={{
        fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
        fontSize: 40,
        fontWeight: 700,
        color: '#1c1b1b',
        margin: '0 0 8px',
        lineHeight: 1.2,
      }}>
        Bản đồ Ẩm thực &amp; Visa Tổng thể
      </h1>
      <p style={{
        fontSize: 16,
        color: '#5d4038',
        margin: '0 0 36px',
        maxWidth: 680,
        lineHeight: 1.6,
      }}>
        Hành trình khám phá hương vị từ những gánh hàng rong tại Việt Nam đến những nhà hàng cao cấp trên toàn thế giới.
      </p>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

        {/* ── Left column ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Filter tabs */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            backgroundColor: '#f0edec',
            borderRadius: 12,
            padding: 4,
            alignSelf: 'flex-start',
            width: 'fit-content',
          }}>
            {[
              { id: 'global', label: 'Toàn cầu' },
              { id: 'vietnam', label: 'Việt Nam (8 Vùng)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 10,
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? '#ad2c00' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : '#5d4038',
                  fontFamily: 'var(--font-body, Manrope, sans-serif)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* World map */}
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: 20,
            minHeight: 500,
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 20,
          }}>
            {/* Grid lines overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }} />

            {/* Equator line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: 'rgba(255,255,255,0.07)',
            }} />
            {/* Prime meridian line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: 'rgba(255,255,255,0.07)',
            }} />

            {/* Continent blobs (simplified SVG) */}
            <svg
              viewBox="0 0 1000 500"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
              preserveAspectRatio="xMidYMid slice"
            >
              {/* North America */}
              <ellipse cx="180" cy="200" rx="120" ry="100" fill="#4a4a4a" />
              {/* South America */}
              <ellipse cx="230" cy="360" rx="70" ry="90" fill="#4a4a4a" />
              {/* Europe */}
              <ellipse cx="500" cy="160" rx="70" ry="50" fill="#4a4a4a" />
              {/* Africa */}
              <ellipse cx="510" cy="310" rx="80" ry="110" fill="#4a4a4a" />
              {/* Asia */}
              <ellipse cx="720" cy="200" rx="180" ry="100" fill="#4a4a4a" />
              {/* Australia */}
              <ellipse cx="820" cy="380" rx="70" ry="50" fill="#4a4a4a" />
            </svg>

            {/* Map markers */}
            {mapMarkers.map((marker, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredMarker(idx)}
                onMouseLeave={() => setHoveredMarker(null)}
                style={{
                  position: 'absolute',
                  left: `${marker.left}%`,
                  top: `${marker.top}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: marker.active ? 2 : 1,
                }}
              >
                {/* Pulse ring for active marker */}
                {marker.active && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(173,44,0,0.25)',
                    animation: 'mapPulse 2s ease-in-out infinite',
                  }} />
                )}
                <div style={{
                  width: marker.active ? 16 : 11,
                  height: marker.active ? 16 : 11,
                  borderRadius: '50%',
                  backgroundColor: marker.color,
                  border: `2px solid ${marker.active ? '#fff' : 'rgba(255,255,255,0.5)'}`,
                  boxShadow: marker.active ? `0 0 0 3px rgba(173,44,0,0.35)` : 'none',
                  transition: 'transform 0.15s',
                  transform: hoveredMarker === idx ? 'scale(1.3)' : 'scale(1)',
                  position: 'relative',
                  zIndex: 1,
                }} />
                {(marker.active || hoveredMarker === idx) && (
                  <div style={{
                    marginTop: 5,
                    fontSize: 11,
                    fontWeight: 700,
                    color: marker.active ? '#fff' : 'rgba(255,255,255,0.85)',
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    padding: '2px 8px',
                    borderRadius: 6,
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(4px)',
                  }}>
                    {marker.flag} {marker.label}
                  </div>
                )}
              </div>
            ))}

            {/* Map label bottom-left */}
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 10,
              padding: '8px 14px',
              backdropFilter: 'blur(6px)',
            }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginRight: 4 }}>
                Đã khám phá:
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>5 / 195 Quốc gia</span>
            </div>
          </div>

          {/* Current location label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#ad2c00' }}>location_on</span>
            <span style={{ fontSize: 14, color: '#5d4038', fontWeight: 500 }}>
              Vị trí hiện tại: <strong style={{ color: '#1c1b1b' }}>Hà Nội, Việt Nam</strong> 🇻🇳
            </span>
          </div>

          {/* Two progress cards */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>

            {/* Card 1: Chinh phục Việt Nam */}
            <div style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: '20px 22px',
              border: '1px solid #e7bdb2',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#ad2c00',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 4,
                  }}>Chinh phục</div>
                  <div style={{
                    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#1c1b1b',
                  }}>Việt Nam</div>
                </div>
                <span style={{ fontSize: 22 }}>🇻🇳</span>
              </div>

              <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1c1b1b' }}>0<span style={{ fontSize: 14, color: '#5d4038' }}>/8</span></div>
                  <div style={{ fontSize: 11, color: '#5d4038' }}>Vùng miền</div>
                </div>
                <div style={{ width: 1, backgroundColor: '#e7bdb2' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1c1b1b' }}>0<span style={{ fontSize: 14, color: '#5d4038' }}>/100</span></div>
                  <div style={{ fontSize: 11, color: '#5d4038' }}>Quốc gia</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                height: 6,
                backgroundColor: '#f0edec',
                borderRadius: 3,
                overflow: 'hidden',
                marginBottom: 12,
              }}>
                <div style={{
                  height: '100%',
                  width: '0%',
                  backgroundColor: '#ad2c00',
                  borderRadius: 3,
                }} />
              </div>

              <div style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#5d4038',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                TIẾP THEO: MIỀN TRUNG · ĐÀ NẴNG
              </div>
            </div>

            {/* Card 2: Hành trình Thế giới */}
            <div style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: '20px 22px',
              border: '1px solid #e7bdb2',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#c97d10',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 4,
                  }}>Hành trình</div>
                  <div style={{
                    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#1c1b1b',
                  }}>Thế giới</div>
                </div>
                <span style={{ fontSize: 22 }}>🌏</span>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1c1b1b' }}>
                  2<span style={{ fontSize: 14, color: '#5d4038' }}>/195 Quốc gia</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                height: 6,
                backgroundColor: '#f0edec',
                borderRadius: 3,
                overflow: 'hidden',
                marginBottom: 12,
              }}>
                <div style={{
                  height: '100%',
                  width: '1%',
                  backgroundColor: '#c97d10',
                  borderRadius: 3,
                }} />
              </div>

              <div style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#5d4038',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                TIẾP THEO: DONCHAMMA
              </div>
            </div>
          </div>

          {/* Bộ sưu tập Visa */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <h2 style={{
                fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                fontSize: 22,
                fontWeight: 700,
                color: '#1c1b1b',
                margin: 0,
              }}>
                Bộ sưu tập Visa
              </h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  width: 36, height: 36, borderRadius: 10, border: '1px solid #e7bdb2',
                  backgroundColor: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#5d4038' }}>filter_list</span>
                </button>
                <button style={{
                  width: 36, height: 36, borderRadius: 10, border: '1px solid #e7bdb2',
                  backgroundColor: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#5d4038' }}>grid_view</span>
                </button>
              </div>
            </div>

            {/* Visa card grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {visaCards.map(card => (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: card.goldBorder ? `2px solid ${card.color}` : '1px solid #e7bdb2',
                    cursor: 'pointer',
                    transform: hoveredCard === card.id ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: hoveredCard === card.id ? '0 8px 24px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Card header / image area */}
                  <div style={{
                    height: 100,
                    backgroundColor: card.goldBorder ? '#fff8ef' : '#f6f3f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 48,
                    position: 'relative',
                  }}>
                    {card.emoji}
                    {card.badge && (
                      <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: card.badgeColor,
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}>
                        {card.badge}
                      </div>
                    )}
                    {card.goldBorder && (
                      <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#c97d10',
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}>
                        ★ SIGNATURE
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '14px 16px' }}>
                    <div style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: card.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 4,
                    }}>
                      {card.flag} {card.region}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#1c1b1b',
                      marginBottom: 4,
                    }}>
                      {card.title}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: '#5d4038',
                      fontWeight: 500,
                    }}>
                      {card.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right sidebar (320px) ── */}
        <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Vị giác Tiến hóa card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: '22px 22px',
            border: '1px solid #e7bdb2',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: '#fff8ef',
                border: '2px solid #c97d10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}>
                🏆
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1c1b1b',
                }}>Master Foodie</div>
                <div style={{
                  fontSize: 12,
                  color: '#c97d10',
                  fontWeight: 600,
                }}>Cấp độ 3</div>
              </div>
            </div>

            <div style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#5d4038',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 14,
            }}>
              Vị giác Tiến hóa
            </div>

            {[
              { label: 'Ẩm thực Việt', pct: 85, color: '#ad2c00' },
              { label: 'Ẩm thực Á Đông', pct: 42, color: '#c97d10' },
              { label: 'Ẩm thực Âu - Mỹ', pct: 15, color: '#5d4038' },
            ].map(bar => (
              <div key={bar.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: '#1c1b1b', fontWeight: 500 }}>{bar.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: bar.color }}>{bar.pct}%</span>
                </div>
                <div style={{
                  height: 8,
                  backgroundColor: '#f0edec',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${bar.pct}%`,
                    backgroundColor: bar.color,
                    borderRadius: 4,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Thành tựu mới notification */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: '14px 18px',
            border: '1px solid #e7bdb2',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#f0edec',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#ad2c00' }}>emoji_events</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1c1b1b' }}>Thành tựu mới</div>
              <div style={{ fontSize: 12, color: '#5d4038' }}>Mở khóa: Khách du lịch ẩm thực</div>
            </div>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#ad2c00' }}>check_circle</span>
          </div>

          {/* Gợi ý Visa mới card (red bg) */}
          <div style={{
            backgroundColor: '#ad2c00',
            borderRadius: 20,
            padding: '22px 22px',
          }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 10,
            }}>
              Gợi ý Visa mới
            </div>
            <p style={{
              fontSize: 14,
              color: '#fff',
              lineHeight: 1.6,
              margin: '0 0 18px',
            }}>
              Bạn đã thử <strong>"Bánh Mì Huỳnh Hoa"</strong> tại TPHCM chưa? Đây là mảnh ghép còn thiếu trong bộ sưu tập <em>Bánh Mì Sài Gòn</em> của bạn.
            </p>
            <button style={{
              backgroundColor: '#fff',
              color: '#ad2c00',
              border: 'none',
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Tìm hiểu ngay
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mapPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.6); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

// ─── Mobile Layout ───────────────────────────────────────────────────────────

const MobileLayout = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const mobileFoodCards = [
    { id: 1, title: 'Phở Bò Hà Nội', region: 'Hà Nội · VN', emoji: '🍜', color: '#ad2c00' },
    { id: 2, title: 'Bánh Mì...', region: 'TPHCM · VN', emoji: '🥖', color: '#c97d10' },
    { id: 3, title: 'Bún Bò Huế', region: 'Huế · VN', emoji: '🌶️', color: '#ad2c00' },
  ];

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#fcf9f8',
      overflowY: 'auto',
      fontFamily: 'var(--font-body, Manrope, sans-serif)',
      minHeight: '100vh',
      paddingBottom: 80,
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ad2c00',
        padding: '24px 20px 28px',
        color: '#fff',
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: 6,
        }}>
          Food Pokédex
        </div>
        <h1 style={{
          fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          fontSize: 26,
          fontWeight: 700,
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}>
          Bản đồ Ẩm thực &amp; Visa
        </h1>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>68%</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Việt Nam</div>
          </div>
          <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>24%</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Thế giới</div>
          </div>
        </div>
      </div>

      {/* Map filter tabs */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          display: 'flex',
          backgroundColor: '#f0edec',
          borderRadius: 12,
          padding: 4,
          marginBottom: 16,
        }}>
          {[
            { id: 'map', label: 'Bản đồ Ẩm thực' },
            { id: 'progress', label: 'Tiến độ' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: 10,
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#ad2c00' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#5d4038',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'var(--font-body, Manrope, sans-serif)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mini map area */}
        <div style={{
          backgroundColor: '#1a1a1a',
          borderRadius: 16,
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />
          {/* Vietnam silhouette hint */}
          <svg viewBox="0 0 1000 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} preserveAspectRatio="xMidYMid slice">
            <ellipse cx="720" cy="250" rx="180" ry="100" fill="#4a4a4a" />
          </svg>
          {/* Markers (simplified for mobile) */}
          {mapMarkers.map((marker, idx) => (
            <div key={idx} style={{
              position: 'absolute',
              left: `${marker.left}%`,
              top: `${marker.top}%`,
              transform: 'translate(-50%, -50%)',
            }}>
              <div style={{
                width: marker.active ? 12 : 8,
                height: marker.active ? 12 : 8,
                borderRadius: '50%',
                backgroundColor: marker.color,
                border: `2px solid ${marker.active ? '#fff' : 'rgba(255,255,255,0.4)'}`,
              }} />
            </div>
          ))}
          <button style={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ad2c00',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '9px 22px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>
            Khám phá Vùng miền
          </button>
        </div>
      </div>

      {/* Dấu ấn Việt Nam section */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontSize: 18,
            fontWeight: 700,
            color: '#1c1b1b',
            margin: 0,
          }}>
            Dấu ấn Việt Nam
          </h2>
          <button style={{
            fontSize: 13, fontWeight: 600, color: '#ad2c00',
            background: 'none', border: 'none', cursor: 'pointer',
          }}>
            Xem tất cả
          </button>
        </div>

        {/* Horizontal scroll food cards */}
        <div style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 8,
          marginBottom: 24,
          scrollbarWidth: 'none',
        }}>
          {mobileFoodCards.map(card => (
            <div key={card.id} style={{
              flexShrink: 0,
              width: 140,
              backgroundColor: '#fff',
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid #e7bdb2',
            }}>
              <div style={{
                height: 80,
                backgroundColor: '#f6f3f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
              }}>
                {card.emoji}
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{
                  fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#1c1b1b',
                  marginBottom: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 11, color: card.color, fontWeight: 600 }}>{card.region}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tinh hoa Thế giới */}
        <h2 style={{
          fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          fontSize: 18,
          fontWeight: 700,
          color: '#1c1b1b',
          margin: '0 0 14px',
        }}>
          Tinh hoa Thế giới
        </h2>

        <div style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid #e7bdb2',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px',
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            backgroundColor: '#f6f3f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            flexShrink: 0,
          }}>
            🍣
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#ad2c00', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
              🇯🇵 NHẬT BẢN
            </div>
            <div style={{
              fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              fontSize: 15,
              fontWeight: 700,
              color: '#1c1b1b',
              marginBottom: 2,
            }}>
              Sushi &amp; Sashimi
            </div>
            <div style={{ fontSize: 12, color: '#5d4038' }}>Tinh hoa biển cả Nhật Bản</div>
          </div>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#e7bdb2', flexShrink: 0 }}>chevron_right</span>
        </div>
      </div>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('global');

  if (isMobile) {
    return <MobileLayout activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  return <DesktopLayout activeTab={activeTab} setActiveTab={setActiveTab} />;
};

export default ExplorePage;
