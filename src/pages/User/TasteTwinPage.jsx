import React from 'react';
import { useNavigate } from 'react-router-dom';

const avatarColors = [
  ['#ffdbd1', '#ad2c00'],
  ['#d4e3ff', '#005daa'],
  ['#ffdbd1', '#872000'],
  ['#ebe7e7', '#5d4038'],
  ['#ffdbd1', '#a83918'],
  ['#d4e3ff', '#004785'],
];

const tasteTwin = {
  name: 'Mia Patel',
  age: 24,
  initials: 'MP',
  match: 88,
  bio: '"Tìm kiếm một nửa yêu thích #VisaSushi & #VisaPhoBo"',
  sharedVisas: ['#VisaPhoBo', '#VisaSushi', '#VisaBanhMi'],
};

const visaCollection = [
  { tag: '#VisaSalad', label: 'Chưa Mở', status: 'locked', color: '#5d4038' },
  { tag: '#VisaPhoBo', label: 'Đã Sưu Tập', status: 'collected', color: '#ad2c00' },
  { tag: '#VisaSushi', label: '80% Hoàn Thành', status: 'progress', color: '#5d4038' },
];

const visaFoodGradients = [
  'linear-gradient(135deg, #f0edec, #e7bdb2)',
  'linear-gradient(135deg, #ffdbd1, #ad2c00)',
  'linear-gradient(135deg, #ebe7e7, #926f66)',
];

const TasteTwinPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fcf9f8',
      color: '#1c1b1b',
      fontFamily: "'Manrope', sans-serif",
      paddingBottom: 120,
    }}>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: '#fcf9f8',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        maxWidth: 448,
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#f0edec',
            border: '2px solid rgba(173,44,0,0.1)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #ffdbd1, #ad2c00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              BN
            </div>
          </div>
          <span style={{
            fontSize: 22,
            fontWeight: 900,
            color: '#ad2c00',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: '-0.5px',
          }}>GoMet</span>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#ad2c00',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>notifications</span>
        </button>
      </header>

      <main style={{
        paddingTop: 88,
        paddingLeft: 24,
        paddingRight: 24,
        maxWidth: 448,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{
            background: '#ffffff',
            padding: 24,
            borderRadius: 16,
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid rgba(229,226,225,0.2)',
          }}>
            <p style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#5d4038',
              margin: '0 0 8px 0',
            }}>VANG Points</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 30,
                fontWeight: 900,
                color: '#ad2c00',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1,
              }}>2,450</span>
              <span className="material-symbols-outlined" style={{
                color: '#ad2c00',
                fontSize: 16,
                fontVariationSettings: "'FILL' 1",
              }}>stars</span>
            </div>
          </div>
          <div style={{
            background: '#ffffff',
            padding: 24,
            borderRadius: 16,
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid rgba(229,226,225,0.2)',
          }}>
            <p style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#5d4038',
              margin: '0 0 8px 0',
            }}>Visa Collection</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 30,
                fontWeight: 900,
                color: '#1c1b1b',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1,
              }}>12/20</span>
            </div>
            <div style={{
              width: '100%',
              background: '#f0edec',
              height: 6,
              borderRadius: 9999,
              marginTop: 12,
              overflow: 'hidden',
            }}>
              <div style={{
                background: '#ad2c00',
                height: '100%',
                width: '60%',
                borderRadius: 9999,
              }} />
            </div>
          </div>
        </section>

        <section style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            background: '#ad2c00',
            padding: '6px 16px',
            borderRadius: 9999,
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            boxShadow: '0 10px 25px rgba(173,44,0,0.3)',
            whiteSpace: 'nowrap',
          }}>
            Taste Twin Của Bạn
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(173,44,0,0.08)',
            border: '1px solid rgba(173,44,0,0.05)',
          }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', width: '100%' }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #ffdbd1 0%, #ffb5a0 40%, #ad2c00 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: 96,
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  userSelect: 'none',
                }}>MP</span>
              </div>

              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(12px)',
                padding: '12px 16px',
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              }}>
                <span style={{
                  color: '#ad2c00',
                  fontWeight: 900,
                  fontSize: 20,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1,
                }}>{tasteTwin.match}%</span>
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: '#5d4038',
                  marginTop: 4,
                }}>Palate Match</span>
              </div>

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 32,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                color: '#ffffff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h2 style={{
                    margin: 0,
                    fontSize: 28,
                    fontWeight: 800,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>{tasteTwin.name}, {tasteTwin.age}</h2>
                  <span className="material-symbols-outlined" style={{
                    color: '#60a5fa',
                    fontSize: 22,
                    fontVariationSettings: "'FILL' 1",
                  }}>verified</span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 500,
                  opacity: 0.9,
                  fontFamily: "'Manrope', sans-serif",
                }}>{tasteTwin.bio}</p>
              </div>
            </div>

            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <p style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#5d4038',
                  margin: '0 0 16px 0',
                }}>Visa Món Ăn Chung</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {tasteTwin.sharedVisas.map((visa, i) => (
                    <span key={i} style={{
                      padding: '8px 16px',
                      background: 'rgba(173,44,0,0.05)',
                      border: '1px solid rgba(173,44,0,0.1)',
                      borderRadius: 9999,
                      color: '#ad2c00',
                      fontSize: 12,
                      fontWeight: 700,
                    }}>{visa}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <button style={{
                  flex: 1,
                  height: 56,
                  background: '#ebe7e7',
                  border: 'none',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}>
                  <span className="material-symbols-outlined" style={{ color: '#1c1b1b', fontSize: 22 }}>close</span>
                </button>
                <button
                  onClick={() => navigate('/app/chat')}
                  style={{
                    flex: 3,
                    height: 56,
                    background: '#ad2c00',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    fontFamily: "'Manrope', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(173,44,0,0.3)',
                    transition: 'opacity 0.15s',
                  }}
                >
                  <span className="material-symbols-outlined" style={{
                    fontSize: 20,
                    fontVariationSettings: "'FILL' 1",
                  }}>favorite</span>
                  Kết nối
                </button>
              </div>
            </div>
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h3 style={{
                margin: '0 0 4px 0',
                fontSize: 22,
                fontWeight: 900,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: '-0.5px',
                color: '#1c1b1b',
              }}>Visa Collection</h3>
              <p style={{
                margin: 0,
                fontSize: 12,
                color: '#5d4038',
                fontWeight: 500,
              }}>Khám phá hương vị thế giới</p>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#ad2c00',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}>Tất cả</button>
          </div>

          <div style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            paddingBottom: 16,
            marginLeft: -24,
            marginRight: -24,
            paddingLeft: 24,
            paddingRight: 24,
          }}>
            {visaCollection.map((visa, i) => (
              <div key={i} style={{
                minWidth: 140,
                background: '#ffffff',
                padding: 12,
                borderRadius: 16,
                border: visa.status === 'collected'
                  ? '2px solid rgba(173,44,0,0.2)'
                  : '1px solid rgba(229,226,225,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: visa.status === 'collected'
                  ? '0 10px 30px rgba(173,44,0,0.05)'
                  : 'none',
              }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 12,
                  position: 'relative',
                  background: visaFoodGradients[i],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: visa.status === 'locked' ? 'grayscale(1)' : 'none',
                  opacity: visa.status === 'locked' ? 0.6 : 1,
                }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: 40,
                    color: visa.status === 'collected' ? '#ffffff' : 'rgba(93,64,56,0.4)',
                  }}>
                    {visa.status === 'collected' ? 'restaurant' : visa.status === 'progress' ? 'ramen_dining' : 'eco'}
                  </span>
                  {visa.status === 'collected' && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(173,44,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span className="material-symbols-outlined" style={{
                        color: '#ffffff',
                        fontSize: 28,
                        fontVariationSettings: "'FILL' 1",
                      }}>check_circle</span>
                    </div>
                  )}
                  {visa.status === 'progress' && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span className="material-symbols-outlined" style={{
                        color: '#ffffff',
                        fontSize: 22,
                      }}>lock</span>
                    </div>
                  )}
                </div>
                <p style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: visa.status === 'collected' ? '#ad2c00' : '#5d4038',
                  textAlign: 'center',
                  margin: '0 0 4px 0',
                }}>{visa.tag}</p>
                <span style={{
                  fontSize: 9,
                  fontWeight: visa.status === 'collected' ? 700 : 500,
                  color: visa.status === 'collected' ? '#ad2c00' : 'rgba(93,64,56,0.6)',
                  textTransform: 'uppercase',
                }}>{visa.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 448,
        borderRadius: 9999,
        zIndex: 50,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 8,
        }}>
          <button
            onClick={() => navigate('/app/home')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ad2c00',
              color: '#ffffff',
              border: 'none',
              borderRadius: 9999,
              width: 48,
              height: 48,
              cursor: 'pointer',
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: 22,
              fontVariationSettings: "'FILL' 1",
            }}>home</span>
          </button>
          <button
            onClick={() => navigate('/app/map')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              borderRadius: 9999,
              width: 48,
              height: 48,
              cursor: 'pointer',
              color: '#1c1b1b',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>map</span>
          </button>
          <button
            onClick={() => navigate('/app/explore')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              borderRadius: 9999,
              width: 48,
              height: 48,
              cursor: 'pointer',
              color: '#1c1b1b',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>explore</span>
          </button>
          <button
            onClick={() => navigate('/app/profile')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              borderRadius: 9999,
              width: 48,
              height: 48,
              cursor: 'pointer',
              color: '#1c1b1b',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>person</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default TasteTwinPage;
