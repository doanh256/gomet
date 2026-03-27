import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('vang');

  const colors = {
    background: '#fcf9f8',
    surfaceLowest: '#ffffff',
    surfaceContainer: '#f0edec',
    surfaceLow: '#f6f3f2',
    surfaceHigh: '#ebe7e7',
    onSurface: '#1c1b1b',
    onSurfaceVariant: '#5d4038',
    primary: '#ad2c00',
    primaryFixed: '#ffdbd1',
    outlineVariant: '#e7bdb2',
  };

  const plans = [
    {
      id: 'basic',
      name: 'Cơ bản',
      subtitle: 'Miễn phí',
      price: null,
      priceLabel: 'Miễn phí',
      icon: 'workspace_premium',
      color: colors.onSurfaceVariant,
      benefits: [
        'Khám phá nhà hàng gần bạn',
        'Đặt bàn thông thường',
        'Lịch sử check-in',
        'Đánh giá & nhận xét',
      ],
      badge: null,
    },
    {
      id: 'vang',
      name: 'Visa Vàng',
      subtitle: '99.000đ / tháng',
      price: '99k',
      priceLabel: '99.000đ/tháng',
      icon: 'star',
      color: '#b8860b',
      benefits: [
        'Tất cả tính năng Cơ bản',
        'Ưu tiên đặt bàn giờ cao điểm',
        'Giảm 10% tại quán đối tác',
        'Xem menu bí mật',
        'Hỗ trợ ưu tiên',
      ],
      badge: 'Phổ biến',
    },
    {
      id: 'bachkim',
      name: 'Visa Bạch Kim',
      subtitle: '199.000đ / tháng',
      price: '199k',
      priceLabel: '199.000đ/tháng',
      icon: 'diamond',
      color: '#5d4037',
      benefits: [
        'Tất cả tính năng Visa Vàng',
        'Không cần xếp hàng — mọi quán',
        'Giảm 25% tại tất cả đối tác',
        'Quà tặng voucher hàng tháng',
        'Sự kiện độc quyền thành viên',
        'Trợ lý cá nhân 24/7',
      ],
      badge: 'Cao cấp nhất',
    },
  ];

  const privileges = [
    {
      icon: 'confirmation_number',
      title: 'Ưu tiên bàn',
      desc: 'Không cần xếp hàng tại các quán nổi tiếng trong giờ cao điểm.',
    },
    {
      icon: 'restaurant_menu',
      title: 'Menu bí mật',
      desc: 'Trải nghiệm những topping "Off-menu" chỉ dành riêng cho thành viên cao cấp.',
    },
    {
      icon: 'redeem',
      title: 'Quà tặng tháng',
      desc: 'Nhận voucher giảm giá hàng tháng cho các quán đối tác.',
    },
    {
      icon: 'event',
      title: 'Sự kiện độc quyền',
      desc: 'Tham gia các buổi tiệc & sự kiện ẩm thực chỉ dành cho thành viên.',
    },
  ];

  const missions = [
    { done: true, label: 'Hoàn thành hồ sơ cá nhân', sub: null },
    { done: true, label: 'Đặt bàn lần đầu thành công', sub: null },
    { done: false, label: 'Check-in tại 3 quán trong tháng', sub: 'Hoàn thành 1/3 quán', step: '2' },
    { done: false, label: 'Viết 1 đánh giá chi tiết', sub: 'Tối thiểu 50 từ kèm hình ảnh', step: null, icon: 'edit_note' },
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.background,
        color: colors.onSurface,
        fontFamily: "'Manrope', sans-serif",
        paddingBottom: '100px',
      }}
    >
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          boxShadow: '0 1px 0 ' + colors.outlineVariant + '40',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.primary,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '22px',
              color: colors.primary,
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Nâng cấp Visa
          </h1>
        </div>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '9999px',
            background: colors.primaryFixed,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: colors.primary, fontSize: '20px' }}
          >
            person
          </span>
        </div>
      </header>

      <main
        style={{
          paddingTop: '88px',
          paddingBottom: '32px',
          paddingLeft: '24px',
          paddingRight: '24px',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <section style={{ marginBottom: '32px' }}>
          <div
            style={{
              background: colors.surfaceLowest,
              borderRadius: '20px',
              padding: '32px 24px',
              boxShadow: '0 4px 20px rgba(28,27,27,0.06)',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '160px',
                height: '160px',
                background: colors.primary + '0d',
                borderRadius: '9999px',
                filter: 'blur(40px)',
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="160"
                height="160"
                style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke={colors.surfaceHigh}
                  strokeWidth="8"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke={colors.primary}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="440"
                  strokeDashoffset="110"
                />
              </svg>
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '40px',
                    color: colors.primary,
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  workspace_premium
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: '18px',
                    color: colors.onSurface,
                    lineHeight: 1.1,
                  }}
                >
                  Visa Vàng
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: colors.onSurfaceVariant,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Hạng hiện tại
                </span>
              </div>
            </div>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                color: colors.onSurface,
                margin: '0 0 6px',
              }}
            >
              Thành viên Visa Vàng
            </h2>
            <p
              style={{
                fontSize: '13px',
                color: colors.onSurfaceVariant,
                marginBottom: '16px',
                lineHeight: 1.5,
              }}
            >
              Bạn đã hoàn thành 75% chặng đường đến{' '}
              <span style={{ color: colors.primary, fontWeight: 700 }}>Bạch Kim</span>
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: colors.primary + '0f',
                padding: '8px 16px',
                borderRadius: '9999px',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '16px',
                  color: colors.primary,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                bolt
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: colors.primary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                Tiến cấp nhanh
              </span>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '16px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '20px',
                color: colors.onSurface,
                margin: 0,
              }}
            >
              Chọn gói của bạn
            </h3>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: colors.primary,
              }}
            >
              {plans.find(p => p.id === selectedPlan)?.name}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {plans.map(plan => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    background: isSelected ? colors.primaryFixed : colors.surfaceLowest,
                    border: isSelected
                      ? `2px solid ${colors.primary}`
                      : `1px solid ${colors.outlineVariant}40`,
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  {plan.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '16px',
                        background: colors.primary,
                        color: '#ffffff',
                        borderRadius: '9999px',
                        padding: '3px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: isSelected ? colors.primary + '20' : colors.surfaceLow,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: '22px',
                            color: isSelected ? colors.primary : plan.color,
                            fontVariationSettings: "'FILL' 1",
                          }}
                        >
                          {plan.icon}
                        </span>
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: '16px',
                            color: colors.onSurface,
                            lineHeight: 1.2,
                          }}
                        >
                          {plan.name}
                        </div>
                        <div
                          style={{
                            fontSize: '13px',
                            color: isSelected ? colors.primary : colors.onSurfaceVariant,
                            fontWeight: 600,
                            marginTop: '2px',
                          }}
                        >
                          {plan.priceLabel}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '9999px',
                        border: isSelected ? `6px solid ${colors.primary}` : `2px solid ${colors.outlineVariant}`,
                        background: isSelected ? colors.primary : 'transparent',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                    />
                  </div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {plan.benefits.map((benefit, bi) => (
                      <li
                        key={bi}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '13px',
                          color: colors.onSurface,
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: '16px',
                            color: isSelected ? colors.primary : colors.onSurfaceVariant,
                            flexShrink: 0,
                            fontVariationSettings: "'FILL' 1",
                          }}
                        >
                          check_circle
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '16px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '20px',
                color: colors.onSurface,
                margin: 0,
              }}
            >
              Nhiệm vụ nâng cấp
            </h3>
            <span style={{ fontSize: '13px', fontWeight: 700, color: colors.primary }}>
              2/4 Hoàn tất
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {missions.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: m.done ? colors.surfaceLow : colors.surfaceLowest,
                  border: m.done ? 'none' : `1px solid ${colors.outlineVariant}30`,
                  borderRadius: '14px',
                  boxShadow: m.done ? 'none' : '0 1px 4px rgba(28,27,27,0.04)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9999px',
                    background: m.done ? colors.primary : 'transparent',
                    border: m.done ? 'none' : `2px solid ${colors.outlineVariant}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {m.done ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#ffffff', fontSize: '18px' }}
                    >
                      check
                    </span>
                  ) : m.icon ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ color: colors.primary, fontSize: '18px' }}
                    >
                      {m.icon}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: colors.primary,
                      }}
                    >
                      {m.step}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: '14px',
                      color: m.done ? colors.onSurface : colors.onSurface,
                      opacity: m.done ? 0.45 : 1,
                      textDecoration: m.done ? 'line-through' : 'none',
                    }}
                  >
                    {m.label}
                  </p>
                  {m.sub && (
                    <p
                      style={{
                        margin: '2px 0 0',
                        fontSize: '12px',
                        color: colors.onSurfaceVariant,
                      }}
                    >
                      {m.sub}
                    </p>
                  )}
                </div>
                {!m.done && (
                  <span
                    className="material-symbols-outlined"
                    style={{ color: colors.onSurfaceVariant, fontSize: '20px' }}
                  >
                    chevron_right
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: '32px',
            marginRight: '-24px',
            overflow: 'hidden',
          }}
        >
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              color: colors.onSurface,
              marginBottom: '16px',
              marginRight: '0',
            }}
          >
            Đặc quyền cao cấp
          </h3>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px',
              paddingRight: '24px',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {privileges.map((p, i) => (
              <div
                key={i}
                style={{
                  minWidth: '220px',
                  background: colors.surfaceLowest,
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 12px rgba(28,27,27,0.06)',
                  border: `1px solid ${colors.outlineVariant}20`,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: colors.primary + '15',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: colors.primary,
                      fontSize: '22px',
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    {p.icon}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '15px',
                    color: colors.onSurface,
                    margin: '0 0 8px',
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    fontSize: '12px',
                    color: colors.onSurfaceVariant,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigate('/app/payment')}
            style={{
              width: '100%',
              background: colors.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              padding: '18px 24px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: `0 8px 24px ${colors.primary}33`,
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.92';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Nâng cấp ngay
            <span className="material-symbols-outlined">rocket_launch</span>
          </button>
          <p
            style={{
              textAlign: 'center',
              marginTop: '12px',
              fontSize: '12px',
              color: colors.onSurfaceVariant,
              fontWeight: 500,
            }}
          >
            {selectedPlanData?.price
              ? `${selectedPlanData.name} — ${selectedPlanData.priceLabel}`
              : 'Gói Cơ bản — Miễn phí'}
          </p>
        </div>
      </main>
    </div>
  );
};

export default PremiumPage;
