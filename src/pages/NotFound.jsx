import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

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

  const [btnHover, setBtnHover] = React.useState(false);
  const [backBtnHover, setBackBtnHover] = React.useState(false);

  return (
    <div style={{
      minHeight: '100dvh',
      background: colors.background,
      fontFamily: fontBody,
      color: colors.onSurface,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 32px',
        height: 80,
        background: colors.background,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 24,
            fontWeight: 900,
            color: colors.onSurface,
            fontFamily: fontHeadline,
            letterSpacing: '-0.03em',
          }}>GoMet</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span className="material-symbols-outlined" style={{ color: colors.onSurface, opacity: 0.6 }}>notifications</span>
          <span className="material-symbols-outlined" style={{ color: colors.onSurface, opacity: 0.6 }}>account_circle</span>
        </div>
      </header>

      <main style={{
        flex: 1,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 40px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 384,
          marginBottom: 48,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            width: 256,
            height: 256,
            background: colors.surfaceContainerLow,
            borderRadius: '9999px',
            zIndex: 0,
            filter: 'blur(48px)',
            opacity: 0.6,
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 288,
              height: 288,
              borderRadius: 16,
              background: colors.surfaceContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(28,27,27,0.10)',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: 80,
                  color: colors.onSurfaceVariant,
                  opacity: 0.35,
                  fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48",
                }}>dinner_dining</span>
                <div style={{
                  width: 120,
                  height: 2,
                  background: colors.outlineVariant,
                  borderRadius: 2,
                }} />
                <span className="material-symbols-outlined" style={{
                  fontSize: 32,
                  color: colors.onSurfaceVariant,
                  opacity: 0.25,
                  fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
                }}>close</span>
              </div>
            </div>
            <div style={{
              position: 'absolute',
              bottom: -24,
              right: -16,
              background: colors.surfaceContainerLowest,
              padding: 16,
              borderRadius: 16,
              boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
              border: `1px solid ${colors.outlineVariant}22`,
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: 36,
                color: colors.primary,
                display: 'block',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}>restaurant</span>
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          maxWidth: 320,
          marginBottom: 0,
        }}>
          <h1 style={{
            fontFamily: fontHeadline,
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: colors.onSurface,
            margin: '0 0 8px',
            lineHeight: 1,
          }}>404</h1>
          <h2 style={{
            fontFamily: fontHeadline,
            fontSize: 20,
            fontWeight: 700,
            color: `${colors.onSurface}CC`,
            margin: '0 0 16px',
            lineHeight: 1.3,
          }}>Món này không có trong thực đơn</h2>
          <p style={{
            fontFamily: fontBody,
            fontSize: 14,
            color: colors.onSurfaceVariant,
            lineHeight: 1.6,
            margin: 0,
            padding: '0 16px',
          }}>
            Có vẻ như món ăn bạn đang tìm kiếm đã được phục vụ cho một bàn khác hoặc không còn trong thực đơn hôm nay.
          </p>
        </div>

        <div style={{
          marginTop: 48,
          width: '100%',
          maxWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <button
            onClick={() => navigate('/app')}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '20px 32px',
              background: btnHover ? '#d83900' : colors.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: 16,
              fontFamily: fontBody,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: `0 8px 24px ${colors.primary}33`,
              transition: 'background 0.2s, transform 0.15s',
              transform: btnHover ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>home</span>
            Về trang chủ
          </button>

          <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setBackBtnHover(true)}
            onMouseLeave={() => setBackBtnHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '16px 32px',
              background: backBtnHover ? colors.surfaceContainerLow : 'transparent',
              color: colors.onSurface,
              border: `1px solid ${colors.outlineVariant}4D`,
              borderRadius: 16,
              fontFamily: fontBody,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
            Quay lại
          </button>
        </div>

        <div style={{
          marginTop: 'auto',
          paddingTop: 64,
          opacity: 0.07,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: fontHeadline,
            fontWeight: 900,
            fontSize: 60,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: colors.onSurface,
          }}>GOMET</span>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
