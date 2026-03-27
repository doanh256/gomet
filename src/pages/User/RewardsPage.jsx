import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = {
  background: '#fcf9f8',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainer: '#f0edec',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryFixed: '#ffdbd1',
  outlineVariant: '#e7bdb2',
};

const fontHeadline = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Manrope', sans-serif";

const CATEGORIES = ['Tất cả', 'Ẩm thực', 'Trải nghiệm', 'Thẻ quà tặng'];

const REWARDS = [
  {
    id: 1,
    category: 'Ẩm thực',
    title: 'Bữa tối 5 món tại Le Gourmet',
    description: 'Trải nghiệm ẩm thực Pháp tinh tế',
    points: 1200,
    badge: '-20% Bill',
  },
  {
    id: 2,
    category: 'Ẩm thực',
    title: 'Thẻ Cà Phê Đặc Sản',
    description: 'Áp dụng cho mọi loại đồ uống size L',
    points: 450,
    badge: 'Mua 1 Tặng 1',
  },
  {
    id: 3,
    category: 'Trải nghiệm',
    title: 'Gói spa thư giãn',
    description: 'Massage toàn thân 90 phút tại spa đối tác',
    points: 3000,
    badge: 'Nổi bật',
  },
  {
    id: 4,
    category: 'Thẻ quà tặng',
    title: 'Voucher ẩm thực 200k',
    description: 'Sử dụng tại các nhà hàng đối tác GoMet',
    points: 2000,
    badge: 'Phổ biến',
  },
  {
    id: 5,
    category: 'Ẩm thực',
    title: 'Combo sushi cao cấp',
    description: 'Set sushi thượng hạng cho 2 người',
    points: 800,
    badge: null,
  },
  {
    id: 6,
    category: 'Thẻ quà tặng',
    title: 'Thẻ quà 500k đa năng',
    description: 'Dùng tại hơn 50 đối tác GoMet',
    points: 4500,
    badge: 'VIP',
  },
];

const RewardIcon = ({ points }) => {
  if (points >= 3000) return (
    <span className="material-symbols-outlined" style={{ fontSize: 36, color: colors.primary, fontVariationSettings: "'FILL' 0, 'wght' 300" }}>workspace_premium</span>
  );
  if (points >= 1000) return (
    <span className="material-symbols-outlined" style={{ fontSize: 36, color: colors.primary, fontVariationSettings: "'FILL' 0, 'wght' 300" }}>restaurant</span>
  );
  return (
    <span className="material-symbols-outlined" style={{ fontSize: 36, color: colors.primary, fontVariationSettings: "'FILL' 0, 'wght' 300" }}>local_cafe</span>
  );
};

export default function RewardsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [confirmReward, setConfirmReward] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [userPoints, setUserPoints] = useState(2450);

  const nextTierPoints = 3250;
  const progress = Math.min(100, Math.round((userPoints / nextTierPoints) * 100));

  const filtered = activeCategory === 'Tất cả'
    ? REWARDS
    : REWARDS.filter(r => r.category === activeCategory);

  const handleRedeem = (reward) => {
    if (userPoints >= reward.points) {
      setConfirmReward(reward);
    }
  };

  const handleConfirm = () => {
    setUserPoints(prev => prev - confirmReward.points);
    setConfirmed(confirmReward);
    setConfirmReward(null);
  };

  const handleCloseSuccess = () => {
    setConfirmed(null);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: colors.background,
      fontFamily: fontBody,
      color: colors.onSurface,
      paddingBottom: 120,
    }}>
      <header style={{
        background: colors.background,
        position: 'sticky',
        top: 0,
        zIndex: 40,
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${colors.outlineVariant}44`,
      }}>
        <span style={{
          fontSize: 24,
          fontWeight: 900,
          color: colors.onSurface,
          fontFamily: fontHeadline,
          letterSpacing: '-0.03em',
        }}>GoMet</span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: colors.surfaceContainerHigh,
          padding: '8px 16px',
          borderRadius: 9999,
        }}>
          <span className="material-symbols-outlined" style={{
            color: colors.primary,
            fontSize: 20,
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
          }}>stars</span>
          <span style={{
            fontFamily: fontHeadline,
            fontWeight: 700,
            color: colors.primary,
            fontSize: 14,
          }}>{userPoints.toLocaleString('vi-VN')} VÀNG</span>
        </div>
      </header>

      <main style={{ padding: '16px 24px 0', maxWidth: 448, margin: '0 auto' }}>
        <section style={{ marginBottom: 40 }}>
          <div style={{
            background: colors.primary,
            borderRadius: 16,
            padding: 32,
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${colors.primary}33`,
          }}>
            <div style={{
              position: 'absolute',
              right: -40,
              top: -40,
              width: 160,
              height: 160,
              background: 'rgba(255,255,255,0.10)',
              borderRadius: '9999px',
              filter: 'blur(24px)',
              pointerEvents: 'none',
            }} />
            <p style={{
              fontFamily: fontBody,
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              opacity: 0.8,
              margin: '0 0 8px',
            }}>Số dư điểm của bạn</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 24 }}>
              <span style={{
                fontFamily: fontHeadline,
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>{userPoints.toLocaleString('vi-VN')}</span>
              <span style={{
                fontFamily: fontHeadline,
                fontSize: 20,
                fontWeight: 700,
                opacity: 0.9,
              }}>VÀNG</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                flex: 1,
                height: 4,
                background: 'rgba(255,255,255,0.20)',
                borderRadius: 9999,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#ffffff',
                  borderRadius: 9999,
                  transition: 'width 0.6s ease',
                }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {progress}% đến Thẻ Vàng
              </span>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h3 style={{
            fontFamily: fontHeadline,
            fontSize: 20,
            fontWeight: 700,
            margin: '0 0 16px',
            color: colors.onSurface,
          }}>Khám phá ưu đãi</h3>
          <div style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 8,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: '12px 24px',
                  borderRadius: 9999,
                  border: 'none',
                  background: activeCategory === cat ? colors.primary : colors.surfaceContainerLow,
                  color: activeCategory === cat ? '#ffffff' : colors.onSurface,
                  fontFamily: fontBody,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 24,
          }}>
            <h3 style={{
              fontFamily: fontHeadline,
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
              color: colors.onSurface,
            }}>Nổi bật tuần này</h3>
            <span style={{
              fontFamily: fontBody,
              fontWeight: 700,
              fontSize: 14,
              color: colors.primary,
              cursor: 'pointer',
            }}>Xem tất cả</span>
          </div>

          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 16px',
              color: colors.onSurfaceVariant,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.4, display: 'block', marginBottom: 12 }}>redeem</span>
              <p style={{ margin: 0, fontSize: 15 }}>Không có ưu đãi trong danh mục này</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {filtered.map(reward => {
                const canRedeem = userPoints >= reward.points;
                return (
                  <article key={reward.id} style={{
                    background: colors.surfaceContainerLowest,
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(28,27,27,0.06)',
                  }}>
                    <div style={{
                      height: 160,
                      background: colors.surfaceContainer,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        width: 80,
                        height: 80,
                        background: colors.primaryFixed,
                        borderRadius: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <RewardIcon points={reward.points} />
                      </div>
                      {reward.badge && (
                        <div style={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          background: 'rgba(255,255,255,0.92)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 12px',
                          borderRadius: 9999,
                          fontSize: 12,
                          fontWeight: 700,
                          color: colors.primary,
                          fontFamily: fontBody,
                        }}>{reward.badge}</div>
                      )}
                    </div>
                    <div style={{ padding: 24 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 16,
                      }}>
                        <div style={{ flex: 1, marginRight: 16 }}>
                          <h4 style={{
                            fontFamily: fontHeadline,
                            fontSize: 17,
                            fontWeight: 700,
                            margin: '0 0 4px',
                            color: colors.onSurface,
                            lineHeight: 1.3,
                          }}>{reward.title}</h4>
                          <p style={{
                            fontFamily: fontBody,
                            fontSize: 13,
                            color: colors.onSurfaceVariant,
                            margin: 0,
                            lineHeight: 1.5,
                          }}>{reward.description}</p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <span style={{
                            display: 'block',
                            fontFamily: fontHeadline,
                            fontWeight: 800,
                            fontSize: 18,
                            color: colors.primary,
                            lineHeight: 1,
                          }}>{reward.points.toLocaleString('vi-VN')}</span>
                          <span style={{
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: colors.onSurfaceVariant,
                            opacity: 0.6,
                          }}>VÀNG Points</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRedeem(reward)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: canRedeem ? colors.primary : colors.surfaceContainerHigh,
                          color: canRedeem ? '#ffffff' : colors.onSurfaceVariant,
                          border: 'none',
                          borderRadius: 12,
                          fontFamily: fontBody,
                          fontWeight: 700,
                          fontSize: 15,
                          cursor: canRedeem ? 'pointer' : 'default',
                          boxShadow: canRedeem ? `0 4px 16px ${colors.primary}22` : 'none',
                          transition: 'transform 0.15s',
                        }}
                      >
                        {canRedeem ? 'Đổi Thưởng Ngay' : `Cần thêm ${(reward.points - userPoints).toLocaleString('vi-VN')} điểm`}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 40,
        }}>
          <div style={{
            background: colors.surfaceContainerHigh,
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: 24 }}>history</span>
            <p style={{ fontFamily: fontHeadline, fontWeight: 700, fontSize: 14, margin: 0, color: colors.onSurface }}>Lịch sử đổi</p>
            <p style={{ fontSize: 12, color: colors.onSurfaceVariant, margin: 0, lineHeight: 1.4 }}>Xem lại các phần quà đã nhận</p>
          </div>
          <div style={{
            background: colors.surfaceContainerHigh,
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: 24 }}>help</span>
            <p style={{ fontFamily: fontHeadline, fontWeight: 700, fontSize: 14, margin: 0, color: colors.onSurface }}>Trợ giúp</p>
            <p style={{ fontSize: 12, color: colors.onSurfaceVariant, margin: 0, lineHeight: 1.4 }}>Cách tích thêm điểm VÀNG</p>
          </div>
        </section>
      </main>

      {confirmReward && (
        <div
          onClick={() => setConfirmReward(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(28,27,27,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: colors.surfaceContainerLowest,
              borderRadius: '24px 24px 0 0',
              padding: '8px 24px 48px',
              width: '100%',
              maxWidth: 480,
            }}
          >
            <div style={{
              width: 40,
              height: 4,
              background: colors.outlineVariant,
              borderRadius: 9999,
              margin: '12px auto 24px',
            }} />
            <div style={{
              width: 64,
              height: 64,
              background: colors.primaryFixed,
              borderRadius: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32, color: colors.primary }}>redeem</span>
            </div>
            <h3 style={{
              fontFamily: fontHeadline,
              fontSize: 20,
              fontWeight: 700,
              textAlign: 'center',
              margin: '0 0 8px',
              color: colors.onSurface,
            }}>Xác nhận đổi thưởng</h3>
            <p style={{
              fontFamily: fontBody,
              fontSize: 14,
              color: colors.onSurfaceVariant,
              textAlign: 'center',
              margin: '0 0 24px',
              lineHeight: 1.5,
            }}>{confirmReward.title}</p>
            <div style={{
              background: colors.surfaceContainerLow,
              borderRadius: 12,
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 12, color: colors.onSurfaceVariant, fontFamily: fontBody }}>Số điểm cần dùng</p>
                <span style={{ fontFamily: fontHeadline, fontWeight: 800, fontSize: 22, color: colors.primary }}>
                  {confirmReward.points.toLocaleString('vi-VN')} VÀNG
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 2px', fontSize: 12, color: colors.onSurfaceVariant, fontFamily: fontBody }}>Số dư sau đổi</p>
                <span style={{ fontFamily: fontHeadline, fontWeight: 700, fontSize: 18, color: colors.onSurface }}>
                  {(userPoints - confirmReward.points).toLocaleString('vi-VN')} VÀNG
                </span>
              </div>
            </div>
            <button
              onClick={handleConfirm}
              style={{
                width: '100%',
                padding: '18px',
                background: colors.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: 14,
                fontFamily: fontBody,
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: `0 4px 16px ${colors.primary}33`,
                marginBottom: 12,
              }}
            >
              Đổi thưởng
            </button>
            <button
              onClick={() => setConfirmReward(null)}
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                color: colors.onSurface,
                border: 'none',
                borderRadius: 14,
                fontFamily: fontBody,
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Huỷ
            </button>
          </div>
        </div>
      )}

      {confirmed && (
        <div
          onClick={handleCloseSuccess}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(28,27,27,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: colors.surfaceContainerLowest,
              borderRadius: 24,
              padding: '40px 28px',
              width: '100%',
              maxWidth: 360,
              textAlign: 'center',
            }}
          >
            <div style={{
              width: 72,
              height: 72,
              background: colors.primaryFixed,
              borderRadius: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: 36,
                color: colors.primary,
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}>check_circle</span>
            </div>
            <h3 style={{
              fontFamily: fontHeadline,
              fontSize: 22,
              fontWeight: 700,
              margin: '0 0 8px',
              color: colors.onSurface,
            }}>Đổi thưởng thành công!</h3>
            <p style={{
              fontFamily: fontBody,
              fontSize: 14,
              color: colors.onSurfaceVariant,
              margin: '0 0 8px',
              lineHeight: 1.5,
            }}>{confirmed.title}</p>
            <p style={{
              fontFamily: fontBody,
              fontSize: 13,
              color: colors.onSurfaceVariant,
              margin: '0 0 28px',
            }}>Voucher đã được gửi vào mục Ưu đãi của bạn.</p>
            <button
              onClick={handleCloseSuccess}
              style={{
                width: '100%',
                padding: '16px',
                background: colors.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: 12,
                fontFamily: fontBody,
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Tuyệt vời!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
