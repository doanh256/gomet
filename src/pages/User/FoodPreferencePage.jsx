import React from 'react';
import { useNavigate } from 'react-router-dom';

const T = {
  bg: '#fcf9f8',
  surfaceLowest: '#ffffff',
  surface: '#fcf9f8',
  surfaceLow: '#f6f3f2',
  surfaceContainer: '#f0edec',
  surfaceHigh: '#ebe7e7',
  surfaceHighest: '#e5e2e1',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryContainer: '#d83900',
  primaryFixed: '#ffdbd1',
  primaryFixedDim: '#ffb5a0',
  outlineVariant: '#e7bdb2',
  outline: '#926f66',
  secondary: '#a83918',
  secondaryFixed: '#ffdbd1',
  tertiaryFixed: '#d4e3ff',
  tertiary: '#005daa',
  white: '#ffffff',
};

const features = [
  {
    icon: 'restaurant_menu',
    iconBg: T.secondaryFixed,
    iconColor: T.primary,
    title: 'Hành trình Visa',
    desc: 'Sưu tầm các địa điểm ẩm thực biểu tượng.',
  },
  {
    icon: 'group',
    iconBg: T.tertiaryFixed,
    iconColor: T.tertiary,
    title: 'Taste Twin',
    desc: 'Kết nối với những người cùng gu vị giác.',
  },
  {
    icon: 'explore',
    iconBg: T.primaryFixed,
    iconColor: T.primary,
    title: 'Khám phá Món ăn',
    desc: 'Gợi ý nhà hàng & món theo khẩu vị cá nhân.',
  },
];

const FoodPreferencePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: T.bg, fontFamily: "'Manrope', sans-serif", color: T.onSurface }}>
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
        padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            pointerEvents: 'auto', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            color: T.onSurfaceVariant, fontFamily: "'Manrope', sans-serif",
            fontSize: 14, fontWeight: 600,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
          Quay lại
        </button>
        <div style={{
          pointerEvents: 'auto',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: '-0.04em',
          color: T.primary,
        }}>
          GoMet
        </div>
        <button style={{
          pointerEvents: 'auto',
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          border: 'none',
          borderRadius: 9999,
          padding: '8px 22px',
          fontSize: 13,
          fontWeight: 600,
          color: T.onSurface,
          cursor: 'pointer',
          fontFamily: "'Manrope', sans-serif",
        }}>
          Hỗ trợ
        </button>
      </div>

      <div style={{
        position: 'fixed', top: 80, right: 80,
        width: 256, height: 256,
        backgroundColor: `${T.primary}0D`,
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: 80, left: 80,
        width: 384, height: 384,
        backgroundColor: `${T.tertiary}0D`,
        borderRadius: '50%',
        filter: 'blur(120px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '100px 32px 60px',
      }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: T.primary,
              }}>
                Bước 1 trên 3
              </span>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: T.onSurface,
              }}>
                Khởi tạo hồ sơ
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 48, height: 6, borderRadius: 9999, backgroundColor: T.primary }} />
              <div style={{ width: 48, height: 6, borderRadius: 9999, backgroundColor: T.surfaceHighest }} />
              <div style={{ width: 48, height: 6, borderRadius: 9999, backgroundColor: T.surfaceHighest }} />
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 52,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: T.onSurface,
              margin: '0 0 20px',
            }}>
              Chào mừng trải nghiệm{' '}
              <span style={{ color: T.primary }}>khẩu vị</span>
            </h1>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 17,
              lineHeight: 1.7,
              color: T.onSurfaceVariant,
              margin: 0,
            }}>
              Bắt đầu hành trình sưu tầm Visa Món ăn và tìm kiếm Taste Twin của bạn. Trắc nghiệm khẩu vị giúp chúng tôi hiểu phong cách ẩm thực riêng biệt của bạn.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 24px',
                  backgroundColor: T.surfaceLowest,
                  borderRadius: 16,
                  border: `1px solid ${T.outlineVariant}40`,
                  boxShadow: '0 1px 4px rgba(28,27,27,0.06)',
                  gap: 16,
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  backgroundColor: f.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 24,
                      color: f.iconColor,
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    {f.icon}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: T.onSurface,
                    marginBottom: 3,
                  }}>
                    {f.title}
                  </div>
                  <div style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13,
                    color: T.onSurfaceVariant,
                    lineHeight: 1.5,
                  }}>
                    {f.desc}
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: T.outlineVariant }}>
                  arrow_forward
                </span>
              </div>
            ))}
          </div>

          <div style={{ padding: '8px 0 0' }}>
            <button
              onClick={() => navigate('/app/taste-quiz')}
              style={{
                width: '100%',
                backgroundColor: T.primary,
                color: T.white,
                border: 'none',
                borderRadius: 16,
                padding: '20px 32px',
                fontSize: 17,
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
                boxShadow: `0 20px 40px ${T.primary}1A`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transition: 'opacity 0.2s, transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Bắt đầu khám phá
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>quiz</span>
            </button>
            <p style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 13,
              color: T.onSurfaceVariant,
              fontFamily: "'Manrope', sans-serif",
            }}>
              Mất khoảng 2 phút để hoàn thành trắc nghiệm.
            </p>
          </div>

          <div style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: `1px solid ${T.outlineVariant}50`,
            display: 'flex',
            gap: 32,
          }}>
            {['Điều khoản', 'Quyền riêng tư', 'Ngôn ngữ: Tiếng Việt'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: `${T.onSurfaceVariant}66`,
                  textDecoration: 'none',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPreferencePage;
