import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = {
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
  outline: '#926f66',
  onPrimary: '#ffffff',
};

const members = [
  { id: 1, initials: 'LT', name: 'Lan Trinh', taste: 'Chuyên gia Ẩm thực', rating: 4.9, color: '#ad2c00' },
  { id: 2, initials: 'MH', name: 'Minh Hoàng', taste: 'Wine Lover', rating: 4.8, color: '#872000' },
  { id: 3, initials: 'TN', name: 'Thu Ngân', taste: 'Đồ Âu yêu thích', rating: 4.7, color: '#5d4038' },
  { id: 4, initials: 'Me', name: 'Bạn', taste: 'Khách mời', rating: null, color: '#ad2c00' },
];

const waitlist = [
  { id: 1, initials: 'MT', name: 'Minh Thư', badge: 'Chuyên gia Ẩm thực', rating: 4.9 },
  { id: 2, initials: 'TA', name: 'Tuấn Anh', badge: 'Wine Lover', rating: 4.7 },
];

const activityFeed = [
  {
    id: 1,
    user: 'Lan Trinh',
    initials: 'LT',
    action: 'đã đặt bàn tại',
    place: 'The Log Restaurant',
    time: '2 giờ trước',
    icon: 'restaurant',
  },
  {
    id: 2,
    user: 'Minh Hoàng',
    initials: 'MH',
    action: 'chia sẻ đánh giá về',
    place: 'Set Menu Visa Degustation',
    time: '5 giờ trước',
    icon: 'rate_review',
  },
  {
    id: 3,
    user: 'Thu Ngân',
    initials: 'TN',
    action: 'gợi ý món tại',
    place: 'Dạ tiệc Aura Gastronomy',
    time: '1 ngày trước',
    icon: 'recommend',
  },
];

const GroupDiningPage = () => {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      fontFamily: "'Manrope', sans-serif",
      color: colors.onSurface,
      paddingBottom: '140px',
    }}>
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(252,249,248,0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        boxSizing: 'border-box',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '9999px',
            backgroundColor: colors.surfaceContainerLow,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <span className="material-symbols-outlined" style={{ color: colors.onSurface, fontSize: '22px' }}>arrow_back</span>
        </button>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '17px',
          letterSpacing: '-0.01em',
          color: colors.onSurface,
          margin: 0,
        }}>
          Chi tiết nhóm
        </h1>
        <button style={{
          width: '40px',
          height: '40px',
          borderRadius: '9999px',
          backgroundColor: colors.surfaceContainerLow,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <span className="material-symbols-outlined" style={{ color: colors.onSurface, fontSize: '22px' }}>more_horiz</span>
        </button>
      </header>

      <main style={{
        paddingTop: '96px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '480px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <section style={{ marginBottom: '40px' }}>
          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '24px',
            position: 'relative',
            background: `linear-gradient(160deg, ${colors.primaryFixed} 0%, ${colors.primary} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)',
            }} />
            <div style={{
              display: 'flex',
              gap: '32px',
              opacity: 0.3,
              zIndex: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>restaurant</span>
              <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#ffffff', fontVariationSettings: "'FILL' 0" }}>wine_bar</span>
              <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>dinner_dining</span>
            </div>
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: 'rgba(173,44,0,0.9)',
                backdropFilter: 'blur(8px)',
                color: colors.onPrimary,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '4px 12px',
                borderRadius: '9999px',
                marginBottom: '12px',
              }}>
                Sắp diễn ra
              </span>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '28px',
                color: '#ffffff',
                lineHeight: 1.2,
                margin: 0,
              }}>
                Dạ tiệc Aura Gastronomy
              </h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '40px',
          }}>
            <div style={{
              backgroundColor: colors.surfaceContainerLow,
              padding: '20px',
              borderRadius: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              <p style={{ fontSize: '10px', fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Thời gian</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: colors.onSurface, margin: 0, fontSize: '15px' }}>19:30 Thứ 6</p>
            </div>
            <div style={{
              backgroundColor: colors.surfaceContainerLow,
              padding: '20px',
              borderRadius: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <p style={{ fontSize: '10px', fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Địa điểm</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: colors.onSurface, margin: 0, fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>The Log</p>
            </div>
            <div style={{
              gridColumn: '1 / -1',
              backgroundColor: colors.surfaceContainerLowest,
              boxShadow: '0 1px 4px rgba(28,27,27,0.06)',
              padding: '20px',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Thực đơn</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: colors.primary, margin: 0, fontSize: '15px' }}>Set Menu Visa Degustation</p>
              </div>
              <span className="material-symbols-outlined" style={{ color: colors.outlineVariant, fontSize: '22px' }}>restaurant_menu</span>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.02em',
              color: colors.onSurface,
              margin: 0,
            }}>
              Hòa hợp Khẩu vị
            </h3>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: colors.primary,
              backgroundColor: 'rgba(173,44,0,0.1)',
              padding: '4px 12px',
              borderRadius: '9999px',
            }}>
              94% Match
            </span>
          </div>

          <div style={{
            backgroundColor: colors.surfaceContainerLow,
            padding: '32px',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{ position: 'relative', width: '192px', height: '192px', marginBottom: '24px' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                border: `1px solid rgba(146,111,102,0.2)`,
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                opacity: 0.3,
              }} />
              <div style={{
                position: 'absolute',
                inset: '16px',
                border: `1px solid rgba(146,111,102,0.2)`,
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                opacity: 0.5,
              }} />
              <div style={{
                position: 'absolute',
                inset: '32px',
                border: `1px solid rgba(146,111,102,0.2)`,
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                opacity: 0.7,
              }} />
              <div style={{
                position: 'absolute',
                inset: '8px',
                backgroundColor: 'rgba(173,44,0,0.18)',
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                backdropFilter: 'blur(4px)',
                border: `2px solid rgba(173,44,0,0.4)`,
              }} />
              <span style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: colors.onSurfaceVariant,
              }}>Cay</span>
              <span style={{
                position: 'absolute',
                top: '25%',
                right: '-32px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: colors.onSurfaceVariant,
              }}>Ngọt</span>
              <span style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: colors.onSurfaceVariant,
              }}>Chua</span>
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: colors.onSurfaceVariant,
              }}>Mặn</span>
              <span style={{
                position: 'absolute',
                top: '25%',
                left: '-24px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: colors.onSurfaceVariant,
              }}>Đắng</span>
            </div>
            <p style={{
              fontSize: '14px',
              textAlign: 'center',
              color: colors.onSurfaceVariant,
              lineHeight: 1.65,
              margin: 0,
            }}>
              Nhóm này có sự tương đồng cao về khẩu vị{' '}
              <span style={{ color: colors.onSurface, fontWeight: 700 }}>đồ Âu</span>
              {' '}và{' '}
              <span style={{ color: colors.onSurface, fontWeight: 700 }}>rượu vang đỏ</span>.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.02em',
              color: colors.onSurface,
              margin: 0,
            }}>
              Thành viên ({members.length})
            </h3>
            <span style={{
              fontSize: '12px',
              color: colors.onSurfaceVariant,
              fontWeight: 500,
            }}>
              Còn trống 2 chỗ
            </span>
          </div>

          <div style={{
            display: 'flex',
            marginBottom: '24px',
          }}>
            {members.map((m, i) => (
              <div
                key={m.id}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '9999px',
                  backgroundColor: m.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  border: `4px solid ${colors.background}`,
                  marginLeft: i === 0 ? '0' : '-12px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  zIndex: members.length - i,
                }}
              >
                {m.initials}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {members.map(m => (
              <div
                key={m.id}
                style={{
                  backgroundColor: colors.surfaceContainerLowest,
                  boxShadow: '0 1px 4px rgba(28,27,27,0.06)',
                  padding: '16px',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '9999px',
                  backgroundColor: m.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  flexShrink: 0,
                }}>
                  {m.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '15px',
                    color: colors.onSurface,
                    margin: '0 0 2px',
                  }}>
                    {m.name}
                  </p>
                  <p style={{ fontSize: '12px', color: colors.onSurfaceVariant, margin: 0 }}>
                    {m.taste}
                  </p>
                </div>
                {m.rating && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: colors.onSurfaceVariant,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1", color: '#f5a623' }}>star</span>
                    {m.rating}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.02em',
              color: colors.onSurface,
              margin: 0,
            }}>
              Danh sách chờ (12)
            </h3>
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              color: colors.primary,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}>
              Xem tất cả
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {waitlist.map(w => (
              <div
                key={w.id}
                style={{
                  backgroundColor: colors.surfaceContainerLowest,
                  boxShadow: '0 1px 4px rgba(28,27,27,0.06)',
                  padding: '16px',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '9999px',
                    backgroundColor: colors.primaryFixed,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.primary,
                    fontWeight: 700,
                    fontSize: '14px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    flexShrink: 0,
                  }}>
                    {w.initials}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      color: colors.onSurface,
                      margin: '0 0 4px',
                    }}>
                      {w.name}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: colors.onSurfaceVariant,
                      fontWeight: 500,
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1", color: '#f5a623' }}>star</span>
                      {w.rating} · {w.badge}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    backgroundColor: colors.surfaceContainerLow,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: colors.onSurfaceVariant,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                  </button>
                  <button style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(173,44,0,0.1)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: colors.primary,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>check</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '20px',
            letterSpacing: '-0.02em',
            color: colors.onSurface,
            margin: '0 0 24px',
          }}>
            Hoạt động nhóm
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activityFeed.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: colors.surfaceContainerLowest,
                  boxShadow: '0 1px 4px rgba(28,27,27,0.06)',
                  padding: '16px',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '9999px',
                  backgroundColor: colors.primaryFixed,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.primary,
                  fontWeight: 700,
                  fontSize: '13px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  flexShrink: 0,
                }}>
                  {item.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '14px',
                    color: colors.onSurface,
                    margin: '0 0 4px',
                    lineHeight: 1.4,
                  }}>
                    <span style={{ fontWeight: 700 }}>{item.user}</span>
                    {' '}{item.action}{' '}
                    <span style={{ color: colors.primary, fontWeight: 600 }}>{item.place}</span>
                  </p>
                  <p style={{ fontSize: '12px', color: colors.onSurfaceVariant, margin: 0 }}>{item.time}</p>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: colors.outlineVariant, fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '24px',
        backgroundColor: 'rgba(252,249,248,0.85)',
        backdropFilter: 'blur(20px)',
        zIndex: 50,
        boxSizing: 'border-box',
      }}>
        <button
          onClick={() => { setJoined(true); navigate('/app/chat'); }}
          style={{
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: joined ? colors.surfaceContainerHigh : colors.primary,
            color: joined ? colors.onSurfaceVariant : colors.onPrimary,
            padding: '18px',
            borderRadius: '12px',
            border: 'none',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '17px',
            cursor: 'pointer',
            boxShadow: joined ? 'none' : '0 12px 24px rgba(173,44,0,0.3)',
            transition: 'all 0.2s',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1" }}
          >
            {joined ? 'check_circle' : 'person_add'}
          </span>
          {joined ? 'Đã tham gia' : 'Tham gia nhóm'}
        </button>
      </div>
    </div>
  );
};

export default GroupDiningPage;
