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
  onPrimary: '#ffffff',
};

const slides = [
  {
    icon: 'badge',
    badge: 'Visa Món Ăn',
    gradientFrom: '#ffdbd1',
    gradientTo: '#ffb5a0',
    title: 'Hộ chiếu ẩm thực của bạn.',
    description: 'Ghi lại mọi trải nghiệm vị giác. Mỗi món ăn bạn thưởng thức sẽ mở khóa những đặc quyền riêng biệt trong hệ sinh thái GoMet.',
    accentIcon: 'restaurant',
  },
  {
    icon: 'workspace_premium',
    badge: 'Điểm VÀNG',
    gradientFrom: '#ffb5a0',
    gradientTo: '#ad2c00',
    title: 'Đặc quyền tinh hoa.',
    description: 'Tích lũy Điểm VÀNG từ mỗi hóa đơn để đổi lấy những trải nghiệm ẩm thực độc quyền và ưu đãi giới hạn tại các đối tác cao cấp.',
    accentIcon: 'star',
  },
  {
    icon: 'favorite',
    badge: 'Taste Twin',
    gradientFrom: '#ffdbd1',
    gradientTo: '#ad2c00',
    title: 'Tìm kiếm tri kỷ vị giác.',
    description: 'Thuật toán Match Taste Twin kết nối bạn với những người có cùng sở thích ăn uống. Đừng để bữa ngon trôi qua một mình.',
    accentIcon: 'group',
  },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const slide = slides[step];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/app/taste-quiz');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Manrope', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'fixed',
        top: '-10%',
        right: '-10%',
        width: '50%',
        paddingBottom: '50%',
        background: 'rgba(173,44,0,0.05)',
        filter: 'blur(120px)',
        borderRadius: '9999px',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-5%',
        left: '-10%',
        width: '60%',
        paddingBottom: '60%',
        background: 'rgba(255,120,82,0.06)',
        filter: 'blur(100px)',
        borderRadius: '9999px',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <main style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '48px 32px',
        boxSizing: 'border-box',
        maxWidth: '480px',
        margin: '0 auto',
        width: '100%',
      }}>
        <header style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <span style={{
            fontSize: '24px',
            fontWeight: 900,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: '-0.03em',
            color: colors.onSurface,
          }}>GoMet</span>
          <button
            onClick={() => navigate('/app/taste-quiz')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              color: colors.onSurfaceVariant,
              opacity: 0.6,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Bỏ qua
          </button>
        </header>

        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '100%',
            aspectRatio: '4/5',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '48px',
            backgroundColor: colors.surfaceContainerLow,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(160deg, ${slide.gradientFrom} 0%, ${slide.gradientTo} 100%)`,
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(28,27,27,0.5) 0%, transparent 60%)',
            }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              zIndex: 1,
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255,255,255,0.4)',
              }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '52px',
                    color: '#ffffff',
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  {slide.icon}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '36px',
                    color: 'rgba(255,255,255,0.5)',
                    fontVariationSettings: "'FILL' 0",
                  }}
                >
                  {slide.accentIcon}
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '36px',
                    color: 'rgba(255,255,255,0.7)',
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  dining
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '36px',
                    color: 'rgba(255,255,255,0.5)',
                    fontVariationSettings: "'FILL' 0",
                  }}
                >
                  local_dining
                </span>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              padding: '16px',
              backgroundColor: 'rgba(252,249,248,0.92)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              border: `1px solid rgba(231,189,178,0.2)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '22px',
                    color: colors.primary,
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  {slide.icon}
                </span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '17px',
                  color: colors.primary,
                }}>
                  {slide.badge}
                </span>
              </div>
            </div>
          </div>

          <h2 style={{
            fontSize: '2.25rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            textAlign: 'left',
            width: '100%',
            color: colors.onSurface,
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            {slide.title}
          </h2>
          <p style={{
            fontSize: '17px',
            color: colors.onSurfaceVariant,
            lineHeight: 1.65,
            marginBottom: '32px',
            opacity: 0.85,
            width: '100%',
            margin: '0 0 32px',
          }}>
            {slide.description}
          </p>
        </div>

        <footer style={{ width: '100%', paddingTop: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '40px',
          }}>
            {slides.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === step ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: i === step ? colors.primary : colors.outlineVariant,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              width: '100%',
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              padding: '20px',
              borderRadius: '12px',
              border: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '17px',
              cursor: 'pointer',
              boxShadow: '0 12px 24px rgba(173,44,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {step < slides.length - 1 ? 'Tiếp theo' : 'Bắt đầu hành trình ẩm thực'}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '20px' }}
            >
              arrow_forward
            </span>
          </button>

          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: colors.onSurfaceVariant,
            marginTop: '24px',
            opacity: 0.6,
            fontWeight: 500,
          }}>
            Bạn đã có tài khoản?{' '}
            <span style={{
              color: colors.primary,
              fontWeight: 700,
              cursor: 'pointer',
            }}>
              Đăng nhập
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default OnboardingPage;
