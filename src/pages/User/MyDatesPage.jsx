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
  primaryContainer: '#d83900',
  outlineVariant: '#e7bdb2',
  outline: '#926f66',
  secondary: '#a83918',
  secondaryFixed: '#ffdbd1',
  onSecondaryFixed: '#3b0900',
};

const AVATAR_GRADIENTS = [
  ['#ffdbd1', '#ad2c00'],
  ['#d4e3ff', '#005daa'],
  ['#ffdbd1', '#a83918'],
  ['#ebe7e7', '#5d4038'],
  ['#ffdbd1', '#872000'],
];

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function getAvatarGradient(name) {
  if (!name) return AVATAR_GRADIENTS[0];
  const idx = name.charCodeAt(0) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
}

const SAMPLE_DATES = [
  {
    id: 1,
    partnerName: 'Linh Anh',
    partnerAge: 24,
    food: 'Salad Cá Hồi Áp Chảo',
    venue: 'The Green Leaf Cafe, Quận 1',
    dateTime: 'Hôm qua, 19:30',
    type: 'normal',
    status: 'completed',
  },
  {
    id: 2,
    partnerName: 'Minh Khang',
    partnerAge: 27,
    food: 'Pizza Pepperoni & Craft Beer',
    venue: "Pizza 4P's, Bến Thành",
    dateTime: '15 Tháng 5, 12:15',
    type: 'flash',
    status: 'completed',
  },
  {
    id: 3,
    partnerName: 'Bạn Giấu Mặt',
    partnerAge: null,
    food: 'Trà Đào & Bánh Ngọt',
    venue: "S'mores Rooftop, Quận 3",
    dateTime: '12 Tháng 5, 15:00',
    type: 'anonymous',
    status: 'completed',
  },
  {
    id: 4,
    partnerName: 'Thu Hà',
    partnerAge: 25,
    food: 'Bún Bò Huế',
    venue: 'Quán Huế Xưa, Quận 5',
    dateTime: '28 Tháng 3, 12:00',
    type: 'normal',
    status: 'upcoming',
  },
];

const FILTER_CHIPS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'flash', label: 'Flash Meet' },
  { key: 'anonymous', label: 'Giấu mặt' },
];

const TABS = [
  { key: 'upcoming', label: 'Sắp tới' },
  { key: 'past', label: 'Đã qua' },
];

const STATUS_MAP = {
  upcoming: { bg: '#ffdbd1', color: '#ad2c00', text: 'Sắp tới' },
  completed: { bg: '#f0edec', color: '#5d4038', text: 'Đã qua' },
  cancelled: { bg: '#ffdad6', color: '#ba1a1a', text: 'Đã huỷ' },
};

const MyDatesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('past');

  const dates = SAMPLE_DATES;

  const tabFiltered = dates.filter(d => {
    if (activeTab === 'upcoming') return d.status === 'upcoming';
    return d.status === 'completed' || d.status === 'cancelled';
  });

  const filtered = tabFiltered.filter(d => {
    if (activeFilter === 'all') return true;
    return d.type === activeFilter;
  });

  const totalDates = dates.length;
  const upcoming = dates.filter(d => d.status === 'upcoming').length;
  const completed = dates.filter(d => d.status === 'completed').length;

  const navItems = [
    { icon: 'restaurant', label: 'Khám phá', path: '/app/discover' },
    { icon: 'history', label: '', path: '/app/my-dates', active: true },
    { icon: 'chat_bubble', label: 'Tin nhắn', path: '/app/chat' },
    { icon: 'person', label: 'Cá nhân', path: '/app/profile' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.background,
      fontFamily: "'Manrope', sans-serif",
      color: COLORS.onSurface,
      position: 'relative',
    }}>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: COLORS.background,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            className="material-symbols-outlined"
            style={{ color: COLORS.primary, cursor: 'pointer', fontSize: '24px' }}
          >menu</span>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.875rem',
            color: COLORS.primary,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>GoMet</h1>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '9999px',
          backgroundColor: COLORS.surfaceContainerHigh,
          border: `1px solid ${COLORS.outlineVariant}33`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ color: COLORS.onSurfaceVariant, fontSize: '22px' }}>person</span>
        </div>
      </header>

      <main style={{
        paddingTop: '112px',
        paddingBottom: '128px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '448px',
        margin: '0 auto',
      }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '2.25rem',
            letterSpacing: '-0.03em',
            color: COLORS.onSurface,
            margin: '0 0 4px',
          }}>Lịch sử</h2>
          <p style={{
            color: COLORS.onSurfaceVariant,
            fontWeight: 500,
            margin: 0,
            fontSize: '0.9375rem',
          }}>Lưu giữ những hương vị và kết nối.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px',
          marginBottom: '28px',
        }}>
          {[
            { label: 'Tổng hẹn', value: totalDates, icon: 'favorite' },
            { label: 'Sắp tới', value: upcoming, icon: 'event' },
            { label: 'Hoàn thành', value: completed, icon: 'check_circle' },
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: COLORS.surfaceContainerLowest,
              borderRadius: '1rem',
              padding: '16px 12px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(28,27,27,0.04)',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '20px',
                color: COLORS.primary,
                display: 'block',
                marginBottom: '6px',
              }}>{stat.icon}</span>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '1.5rem',
                color: COLORS.onSurface,
                lineHeight: 1,
                marginBottom: '4px',
              }}>{stat.value}</div>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: COLORS.onSurfaceVariant,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          backgroundColor: COLORS.surfaceContainerHigh,
          borderRadius: '9999px',
          padding: '4px',
          marginBottom: '20px',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                backgroundColor: activeTab === tab.key ? COLORS.primary : 'transparent',
                color: activeTab === tab.key ? '#ffffff' : COLORS.onSurfaceVariant,
                transition: 'all 0.2s ease',
              }}
            >{tab.label}</button>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          marginBottom: '32px',
          paddingBottom: '8px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          {FILTER_CHIPS.map(chip => {
            const isActive = activeFilter === chip.key;
            return (
              <button
                key={chip.key}
                onClick={() => setActiveFilter(chip.key)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: isActive ? 'none' : `1px solid ${COLORS.outlineVariant}4d`,
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  backgroundColor: isActive ? COLORS.primary : COLORS.surfaceContainerLowest,
                  color: isActive ? '#ffffff' : COLORS.onSurface,
                  boxShadow: isActive ? '0 4px 12px rgba(173,44,0,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >{chip.label}</button>
            );
          })}
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '16px',
            bottom: '16px',
            width: '2px',
            backgroundColor: `${COLORS.outlineVariant}33`,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: COLORS.surfaceContainerLowest,
                borderRadius: '1rem',
                boxShadow: '0 4px 20px rgba(28,27,27,0.04)',
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: '48px',
                  color: COLORS.outlineVariant,
                  display: 'block',
                  marginBottom: '12px',
                }}>event_busy</span>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.0625rem',
                  color: COLORS.onSurface,
                  margin: '0 0 8px',
                }}>Chưa có buổi hẹn nào</p>
                <p style={{
                  color: COLORS.onSurfaceVariant,
                  fontSize: '0.875rem',
                  margin: 0,
                }}>Tạo hẹn mới để bắt đầu nhé!</p>
              </div>
            ) : (
              filtered.map((date, idx) => {
                const grad = getAvatarGradient(date.partnerName);
                const initials = getInitials(date.partnerName);
                const statusInfo = STATUS_MAP[date.status] || STATUS_MAP.completed;
                const isAnon = date.type === 'anonymous';
                const isFlash = date.type === 'flash';

                return (
                  <div key={date.id} style={{ position: 'relative', paddingLeft: '56px' }}>
                    <div style={{
                      position: 'absolute',
                      left: '20px',
                      top: '24px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '9999px',
                      backgroundColor: idx === 0 ? COLORS.primary : COLORS.outlineVariant,
                      boxShadow: idx === 0 ? `0 0 0 4px ${COLORS.primary}1a` : 'none',
                      zIndex: 1,
                    }} />

                    <div style={{
                      backgroundColor: COLORS.surfaceContainerLowest,
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    }}>
                      <div style={{ padding: '20px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '16px',
                        }}>
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                              <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '9999px',
                                overflow: 'hidden',
                                border: `2px solid ${COLORS.background}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: isAnon
                                  ? COLORS.surfaceContainerHigh
                                  : `linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
                                flexShrink: 0,
                              }}>
                                {isAnon ? (
                                  <span className="material-symbols-outlined" style={{
                                    fontSize: '28px',
                                    color: COLORS.outline,
                                  }}>person_off</span>
                                ) : (
                                  <span style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.125rem',
                                    color: '#ffffff',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                  }}>{initials}</span>
                                )}
                              </div>
                              <div style={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                width: '28px',
                                height: '28px',
                                borderRadius: '9999px',
                                backgroundColor: COLORS.surfaceContainerHigh,
                                border: `2px solid ${COLORS.surfaceContainerLowest}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                              }}>
                                <span className="material-symbols-outlined" style={{
                                  fontSize: '14px',
                                  color: COLORS.primary,
                                }}>restaurant</span>
                              </div>
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                <h3 style={{
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                  fontWeight: 700,
                                  fontSize: '1.0625rem',
                                  color: COLORS.onSurface,
                                  margin: 0,
                                  lineHeight: 1.3,
                                }}>{date.partnerName}{date.partnerAge ? `, ${date.partnerAge}` : ''}</h3>
                                {isFlash && (
                                  <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    backgroundColor: COLORS.secondaryFixed,
                                    color: COLORS.onSecondaryFixed,
                                    fontSize: '0.625rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                  }}>Flash</span>
                                )}
                                {isAnon && (
                                  <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    backgroundColor: '#004785',
                                    color: '#ffffff',
                                    fontSize: '0.625rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                  }}>Ẩn danh</span>
                                )}
                              </div>
                              <p style={{
                                color: COLORS.primary,
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                margin: '0 0 4px',
                              }}>{date.food}</p>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: COLORS.onSurfaceVariant,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                              }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_today</span>
                                {date.dateTime}
                              </div>
                            </div>
                          </div>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color,
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            flexShrink: 0,
                            marginLeft: '8px',
                          }}>{statusInfo.text}</span>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '16px',
                          padding: '8px 12px',
                          backgroundColor: COLORS.surfaceContainerLow,
                          borderRadius: '0.5rem',
                        }}>
                          <span className="material-symbols-outlined" style={{
                            fontSize: '16px',
                            color: COLORS.onSurfaceVariant,
                          }}>location_on</span>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: COLORS.onSurfaceVariant,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>{date.venue}</span>
                        </div>

                        {date.status === 'upcoming' ? (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                              onClick={() => navigate('/app/flash-meet')}
                              style={{
                                padding: '12px',
                                borderRadius: '0.75rem',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: COLORS.surfaceContainerHigh,
                                color: COLORS.onSurface,
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                              }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>event_repeat</span>
                              Đặt lại
                            </button>
                            <button
                              onClick={() => navigate('/app/chat')}
                              style={{
                                padding: '12px',
                                borderRadius: '0.75rem',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: COLORS.primaryContainer,
                                color: '#ffffff',
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                              }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
                              Nhắn tin
                            </button>
                          </div>
                        ) : isAnon ? (
                          <button style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: COLORS.surfaceContainerHigh,
                            color: COLORS.onSurface,
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                          }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restaurant_menu</span>
                            Xem lại món này
                          </button>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button style={{
                              padding: '12px',
                              borderRadius: '0.75rem',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: COLORS.surfaceContainerHigh,
                              color: COLORS.onSurface,
                              fontFamily: "'Manrope', sans-serif",
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                            }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restaurant_menu</span>
                              Xem lại món
                            </button>
                            <button
                              onClick={() => navigate('/app/chat')}
                              style={{
                                padding: '12px',
                                borderRadius: '0.75rem',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: COLORS.primaryContainer,
                                color: '#ffffff',
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                              }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
                              Nhắn tin
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <button
        onClick={() => navigate('/app/flash-meet')}
        style={{
          position: 'fixed',
          bottom: '108px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '1rem',
          backgroundColor: COLORS.primary,
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(173,44,0,0.35)',
          zIndex: 40,
        }}
        title="Tạo hẹn mới"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>add</span>
      </button>

      <nav style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '448px',
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '9999px',
        boxShadow: '0 20px 40px rgba(28,27,27,0.08)',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '72px',
      }}>
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: item.active ? '9999px' : '0',
              backgroundColor: item.active ? COLORS.primary : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: item.active ? '#ffffff' : '#a8a29e',
              padding: 0,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '24px',
                fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0",
              }}
            >{item.icon}</span>
            {item.label && (
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.5625rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: '2px',
              }}>{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MyDatesPage;
