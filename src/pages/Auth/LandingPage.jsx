import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: 'science', title: 'Flavor Physics', desc: 'Our AI analyzes your palate across 6 taste dimensions to find your perfect culinary match.' },
  { icon: 'restaurant', title: 'Micro-Meals', desc: 'Curated tasting experiences designed for two. Each dish tells a story, every bite builds connection.' },
  { icon: 'psychology', title: 'Palate Quantified', desc: 'Track your taste journey with real-time analytics. Watch your flavor profile evolve over time.' },
  { icon: 'groups', title: 'Squad Synergy', desc: 'Dine with your crew. AI-powered group recommendations that satisfy everyone at the table.' },
];

const testimonials = [
  { name: 'Minh Anh', location: 'Saigon', quote: 'GOMET helped me discover I love umami more than I thought. My dates have been incredible!', avatar: 'MA' },
  { name: 'Duc Huy', location: 'Hanoi', quote: 'The squad dining feature is genius. No more arguing about where to eat!', avatar: 'DH' },
  { name: 'Thu Trang', location: 'Da Nang', quote: 'I have earned Gold tier and tried 200+ dishes. This app changed how I experience food.', avatar: 'TT' },
];

const stats = [
  { value: '50K+', label: 'Flavor Profiles' },
  { value: '1M+', label: 'Dishes Matched' },
  { value: '92%', label: 'Match Satisfaction' },
  { value: '200+', label: 'Partner Venues' },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#131313', color: '#FDF9F3',
      fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blurred circles */}
      <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,181,158,0.1)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-150px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,87,26,0.08)', filter: 'blur(120px)', pointerEvents: 'none' }} />

      {/* Language selector */}
      <div style={{
        position: 'absolute', top: '24px', right: '24px', zIndex: 20,
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '8px 16px', borderRadius: '9999px',
        backgroundColor: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', cursor: 'pointer',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#E6BEB2' }}>language</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#E6BEB2', letterSpacing: '0.05em' }}>VN</span>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 120px', textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'linear-gradient(135deg, rgba(184,53,0,0.2), rgba(255,120,77,0.2))', pointerEvents: 'none' }} />

        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(64px, 12vw, 112px)', fontWeight: 900,
          fontStyle: 'italic', color: '#FFFFFF',
          letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '24px',
        }}>
          GOMET
        </h1>

        <div style={{
          fontSize: '14px', fontWeight: 700, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: '#FFB59E', marginBottom: '24px',
        }}>
          DI DE GAP &middot; AN DE YEU
        </div>

        {/* Desktop hero subtitle */}
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800,
          color: '#FDF9F3', marginBottom: '16px', lineHeight: 1.2,
          display: 'none',
        }}
          className="desktop-hero-title"
        >
          Discover Flavor Physics
        </h2>

        <p style={{
          fontSize: '17px', lineHeight: 1.8, color: '#E6BEB2',
          maxWidth: '520px', marginBottom: '48px', opacity: 0.85,
        }}>
          Kham pha nhung trai nghiem am thuc doc dao, kham pha
          nhung dia diem an tuong va ket noi voi nhung nguoi
          cung dam me. GOMET -- noi bat dau cua moi cau chuyen.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '18px 40px', borderRadius: '1.5rem', border: 'none',
            backgroundColor: '#FFFFFF', color: '#FF571A',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            transition: 'transform 0.2s', boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            DANG NHAP
          </button>
          <button onClick={() => navigate('/register')} style={{
            padding: '18px 40px', borderRadius: '1.5rem', border: 'none',
            backgroundColor: '#FF571A', color: '#FFFFFF',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            transition: 'transform 0.2s', boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            THAM GIA NGAY
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#E6BEB2', opacity: 0.4, animation: 'bounce 2s infinite' }}>expand_more</span>
        </div>
      </div>

      {/* ===== STATS BAR ===== */}
      <div style={{
        padding: '60px 24px', backgroundColor: '#1C1B1B',
      }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto', display: 'flex',
          justifyContent: 'space-around', flexWrap: 'wrap', gap: '32px',
        }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 900, color: '#FF571A', margin: '0 0 4px',
              }}>{stat.value}</p>
              <p style={{ fontSize: '14px', color: '#E6BEB2', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DISCOVER FLAVOR PHYSICS ===== */}
      <div style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB59E', marginBottom: '12px' }}>
            How It Works
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 900, color: '#FDF9F3', margin: '0 0 16px',
          }}>
            Discover Flavor Physics
          </h2>
          <p style={{ fontSize: '17px', color: '#E6BEB2', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            We quantify taste, analyze compatibility, and create perfect culinary experiences.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: '32px 24px',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '1rem',
                background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#3A0B00' }}>{f.icon}</span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 700,
                color: '#FDF9F3', margin: '0 0 8px',
              }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#E6BEB2', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== WORLD OF MICRO-MEALS ===== */}
      <div style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #131313, #1C1B1B)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '64px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB59E', marginBottom: '12px' }}>
              Experience
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 900, color: '#FDF9F3', margin: '0 0 20px',
            }}>
              World of Micro-Meals
            </h2>
            <p style={{ fontSize: '16px', color: '#E6BEB2', lineHeight: 1.8, margin: '0 0 32px' }}>
              Each micro-meal is a carefully crafted tasting experience. Share 3-5 perfectly portioned dishes with your match, designed to spark conversation and connection through flavor.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Curated Pairings', 'Tasting Portions', 'Conversation Starters', 'Vang Points'].map(tag => (
                <span key={tag} style={{
                  padding: '8px 18px', borderRadius: '9999px',
                  backgroundColor: 'rgba(255,87,26,0.1)', color: '#FFB59E',
                  fontSize: '13px', fontWeight: 600,
                }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 280, height: 380, borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ fontSize: 100, opacity: 0.2 }}>🍽️</span>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px',
                background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))',
              }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 700, color: '#FDF9F3', margin: '0 0 4px' }}>Tonight's Menu</p>
                <p style={{ fontSize: '13px', color: 'rgba(253,249,243,0.7)', margin: 0 }}>5 courses &middot; 2 hours &middot; +120 Vang</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== YOUR PALATE QUANTIFIED ===== */}
      <div style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB59E', marginBottom: '12px' }}>
            Analytics
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 900, color: '#FDF9F3', margin: '0 0 16px',
          }}>
            Your Palate Quantified
          </h2>
          <p style={{ fontSize: '16px', color: '#E6BEB2', maxWidth: '550px', margin: '0 auto', lineHeight: 1.7 }}>
            Six taste dimensions. Infinite combinations. Track how your flavor profile evolves with every meal.
          </p>
        </div>

        {/* Taste dimensions visual */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px', maxWidth: 700, margin: '0 auto',
        }}>
          {[
            { label: 'Spicy', value: 75, color: '#FF571A' },
            { label: 'Umami', value: 60, color: '#FFB59E' },
            { label: 'Sour', value: 45, color: '#FFD54F' },
            { label: 'Sweet', value: 80, color: '#4CAF50' },
            { label: 'Bitter', value: 30, color: '#E6BEB2' },
            { label: 'Salty', value: 55, color: '#FF571A' },
          ].map(taste => (
            <div key={taste.label} style={{
              backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: '24px 20px',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', fontWeight: 900, color: taste.color, margin: '0 0 4px' }}>{taste.value}%</p>
              <p style={{ fontSize: '13px', color: '#E6BEB2', margin: 0 }}>{taste.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SUCCESS STORIES ===== */}
      <div style={{ padding: '100px 24px', backgroundColor: '#1C1B1B' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB59E', marginBottom: '12px' }}>
              Stories
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 900, color: '#FDF9F3', margin: 0,
            }}>
              Success Stories
            </h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                backgroundColor: '#131313', borderRadius: '1.5rem', padding: '28px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#3A0B00',
                  }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#FDF9F3', margin: '0 0 2px' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#E6BEB2', margin: 0 }}>{t.location}</p>
                  </div>
                </div>
                <p style={{ fontSize: '15px', color: '#E6BEB2', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <div style={{
        padding: '120px 24px', textAlign: 'center',
        background: 'linear-gradient(180deg, #131313, rgba(184,53,0,0.15))',
      }}>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 900, color: '#FDF9F3', margin: '0 0 16px',
        }}>
          Start Your Culinary Journey
        </h2>
        <p style={{ fontSize: '17px', color: '#E6BEB2', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Join thousands of food lovers discovering deeper connections through shared culinary experiences.
        </p>
        <button onClick={() => navigate('/register')} style={{
          padding: '20px 48px', borderRadius: '1.5rem', border: 'none',
          background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
          color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '18px', fontWeight: 800, cursor: 'pointer',
          boxShadow: '0 20px 60px rgba(255,87,26,0.3)',
          transition: 'transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          THAM GIA NGAY
        </button>
      </div>

      {/* Bottom text */}
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <span style={{
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: '#E6BEB2', opacity: 0.4,
        }}>
          Kinetic Culinary Experience
        </span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
