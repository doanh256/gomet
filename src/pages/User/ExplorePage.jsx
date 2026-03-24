import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { id: 'global', label: 'Global', icon: 'public', active: false },
  { id: 'mediterranean', label: 'Mediterranean', icon: 'sailing', active: true },
  { id: 'asian-fusion', label: 'Asian Fusion', icon: 'ramen_dining', active: false },
  { id: 'nordic', label: 'Nordic', icon: 'ac_unit', active: false },
  { id: 'latin', label: 'Latin American', icon: 'local_fire_department', active: false },
];

const bentoItems = [
  { id: 1, title: 'Pho', subtitle: 'Soul of Hanoi', gradient: 'linear-gradient(135deg, #FFB59E, #FF571A)', emoji: '🍜', span: 2 },
  { id: 2, title: 'Banh Mi', subtitle: 'Street Legend', gradient: 'linear-gradient(135deg, #FFD54F, #FF8F00)', emoji: '🥖', span: 1 },
  { id: 3, title: 'Ca Phe', subtitle: 'Drip Culture', gradient: 'linear-gradient(135deg, #8D6E63, #4E342E)', emoji: '☕', span: 1 },
  { id: 4, title: 'Bun Bo Hue', subtitle: 'Spice Capital', gradient: 'linear-gradient(135deg, #EF5350, #B71C1C)', emoji: '🌶️', span: 1 },
  { id: 5, title: 'Com Tam', subtitle: 'Broken Rice', gradient: 'linear-gradient(135deg, #FFA726, #E65100)', emoji: '🍚', span: 1 },
];

const trendingItems = [
  { id: 1, title: 'The Rise of Fermented Foods in Saigon', author: 'Chef Nguyen', readTime: '5 min', tag: 'Trending' },
  { id: 2, title: 'Why Gen Z is Obsessed with Street Pho', author: 'Food & Culture', readTime: '3 min', tag: 'Hot' },
  { id: 3, title: 'Farm-to-Table: Vietnam Edition', author: 'Green Kitchen', readTime: '7 min', tag: 'New' },
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState('mediterranean');

  return (
    <div style={{
      flex: 1, backgroundColor: '#FDF9F3', overflowY: 'auto',
      fontFamily: "'Inter', sans-serif", minHeight: '100vh',
    }}>
      <div style={{ display: 'flex', maxWidth: 1400, margin: '0 auto' }}>
        {/* Left sidebar */}
        <div style={{
          width: 240, flexShrink: 0, padding: '40px 24px',
          position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
        }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700,
            color: '#666460', textTransform: 'uppercase', letterSpacing: '0.1em',
            margin: '0 0 24px',
          }}>Explore Regions</h2>

          {regions.map(region => (
            <button key={region.id} onClick={() => setActiveRegion(region.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', borderRadius: '1rem', border: 'none',
              backgroundColor: activeRegion === region.id ? 'rgba(255,87,26,0.1)' : 'transparent',
              color: activeRegion === region.id ? '#FF571A' : '#666460',
              fontFamily: "'Inter', sans-serif", fontSize: 14,
              fontWeight: activeRegion === region.id ? 700 : 500,
              cursor: 'pointer', marginBottom: 4, width: '100%', textAlign: 'left',
              transition: 'all 0.15s ease',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{region.icon}</span>
              {region.label}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* Chef Spotlight card */}
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '1.5rem', padding: 20,
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginTop: 24,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 9999, marginBottom: 12,
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 24 }}>👨‍🍳</span>
            </div>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700,
              color: '#393834', margin: '0 0 4px',
            }}>Chef Spotlight</h3>
            <p style={{ fontSize: 12, color: '#666460', margin: '0 0 12px', lineHeight: 1.5 }}>
              Chef Nguyen Van Toan: Reinventing Pho for the modern palate
            </p>
            <button style={{
              padding: '8px 16px', borderRadius: 9999, border: 'none',
              backgroundColor: 'rgba(255,87,26,0.1)', color: '#FF571A',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>Read Story</button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '40px 32px 100px', minWidth: 0 }}>
          {/* Hero - World Map */}
          <div style={{
            height: 360, borderRadius: '1.5rem', overflow: 'hidden',
            position: 'relative', marginBottom: 40,
            background: 'linear-gradient(135deg, #b83500 0%, #FF571A 50%, #FFB59E 100%)',
          }}>
            {/* Map pattern overlay */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(184,53,0,0.8) 100%)',
            }} />

            {/* Vietnam pin - animated */}
            <div style={{
              position: 'absolute', top: '35%', right: '30%',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 9999, backgroundColor: '#FFD54F',
                boxShadow: '0 0 0 4px rgba(255,213,79,0.3), 0 0 0 8px rgba(255,213,79,0.15)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{
                marginTop: 4, fontSize: 11, fontWeight: 700, color: '#FFD54F',
                backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: 4,
              }}>Vietnam</span>
            </div>

            <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 800,
                color: '#FDF9F3', margin: '0 0 8px',
              }}>
                Explore the Global Kitchen
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(253,249,243,0.8)', margin: 0, maxWidth: 500 }}>
                Discover culinary traditions from every corner of the world, right from your neighborhood.
              </p>
            </div>
          </div>

          {/* Vietnam's Heartbeat - Bento Grid */}
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800,
            color: '#393834', margin: '0 0 20px',
          }}>Vietnam's Heartbeat</h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16, marginBottom: 40,
          }}>
            {bentoItems.map(item => (
              <div key={item.id} style={{
                gridColumn: item.span === 2 ? 'span 2' : 'span 1',
                height: item.span === 2 ? 220 : 180,
                borderRadius: '1.5rem', overflow: 'hidden',
                background: item.gradient, position: 'relative',
                cursor: 'pointer', transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)', fontSize: 64, opacity: 0.2,
                  userSelect: 'none',
                }}>{item.emoji}</span>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: 20, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5))',
                }}>
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800,
                    color: '#FDF9F3', margin: '0 0 2px',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(253,249,243,0.7)', margin: 0 }}>{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trending Today */}
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800,
            color: '#393834', margin: '0 0 20px',
          }}>Trending Today</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {trendingItems.map(item => (
              <div key={item.id} style={{
                backgroundColor: '#ffffff', borderRadius: '1.5rem', padding: '20px 24px',
                display: 'flex', alignItems: 'center', gap: 20,
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                cursor: 'pointer', transition: 'transform 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '1rem', flexShrink: 0,
                  background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#FDF9F3' }}>article</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700,
                    color: '#393834', margin: '0 0 4px',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: '#666460', margin: 0 }}>
                    {item.author} &middot; {item.readTime}
                  </p>
                </div>
                <span style={{
                  padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 700,
                  backgroundColor: item.tag === 'Hot' ? 'rgba(255,87,26,0.1)' : item.tag === 'New' ? 'rgba(17,117,0,0.1)' : 'rgba(255,213,79,0.15)',
                  color: item.tag === 'Hot' ? '#FF571A' : item.tag === 'New' ? '#117500' : '#b83500',
                }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pulse animation for Vietnam pin */}
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(255,213,79,0.3), 0 0 0 8px rgba(255,213,79,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(255,213,79,0.2), 0 0 0 16px rgba(255,213,79,0.08); }
        }
      `}</style>
    </div>
  );
};

export default ExplorePage;
