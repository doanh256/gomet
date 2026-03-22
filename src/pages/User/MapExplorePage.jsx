import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapExplorePage = () => {
  const navigate = useNavigate();
  const [radius, setRadius] = useState(5);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Tat ca', icon: 'apps' },
    { id: 'restaurant', label: 'Nha hang', icon: 'restaurant' },
    { id: 'cafe', label: 'Cafe', icon: 'coffee' },
    { id: 'bar', label: 'Bar', icon: 'local_bar' },
    { id: 'event', label: 'Su kien', icon: 'celebration' },
  ];

  const venues = [
    { name: 'The Rustic Table', category: 'Nha hang', distance: '1.2 km', rating: 4.8, address: '12 Nguyen Hue, Q1' },
    { name: 'Cafe Terrace', category: 'Cafe', distance: '1.5 km', rating: 4.6, address: '45 Le Loi, Q1' },
    { name: 'Skyline Lounge', category: 'Bar', distance: '2.1 km', rating: 4.7, address: '88 Hai Ba Trung, Q3' },
    { name: 'Pho Garden', category: 'Nha hang', distance: '2.8 km', rating: 4.5, address: '23 Tran Hung Dao, Q5' },
    { name: 'Brew & Beans', category: 'Cafe', distance: '3.2 km', rating: 4.4, address: '67 Nguyen Thi Minh Khai, Q3' },
    { name: 'The Hideaway', category: 'Bar', distance: '4.0 km', rating: 4.9, address: '5 Dong Khoi, Q1' },
  ];

  const nearbyEvents = [
    { name: 'Jazz Night Dating', date: '28/03 - 19:00', venue: 'Skyline Lounge', spots: 8 },
    { name: 'Workshop Nau An Cho Cap Doi', date: '30/03 - 10:00', venue: 'Pho Garden', spots: 5 },
    { name: 'Speed Dating Thu 7', date: '05/04 - 18:00', venue: 'The Rustic Table', spots: 15 },
  ];

  const categoryColors = {
    'Nha hang': { bg: 'var(--primary-fixed)', color: 'var(--on-primary-container)' },
    'Cafe': { bg: 'var(--tertiary-container)', color: 'var(--on-primary)' },
    'Bar': { bg: 'var(--error-container)', color: 'var(--error)' },
    'Su kien': { bg: 'var(--primary-container)', color: 'var(--on-primary)' },
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--surface-container-lowest)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--outline-variant)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--on-surface-variant)', display: 'flex',
        }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: 'var(--on-surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--primary)' }}>explore</span>
            Kham pha quanh day
          </h1>
        </div>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 16px 100px' }}>
        {/* Map placeholder */}
        <div style={{
          width: '100%',
          height: 400,
          backgroundColor: 'var(--surface-container-high)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '16px 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 56, color: 'var(--on-surface-variant)', opacity: 0.5 }}>place</span>
          <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginTop: 8 }}>Ban do dang tai...</p>
          {/* Fake map grid lines */}
          {[...Array(5)].map((_, i) => (
            <div key={`h${i}`} style={{
              position: 'absolute', top: `${20 + i * 20}%`, left: 0, right: 0,
              height: 1, background: 'var(--outline-variant)', opacity: 0.3,
            }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={`v${i}`} style={{
              position: 'absolute', left: `${20 + i * 20}%`, top: 0, bottom: 0,
              width: 1, background: 'var(--outline-variant)', opacity: 0.3,
            }} />
          ))}
        </div>

        {/* Radius slider */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '16px 18px',
          marginBottom: 16,
          boxShadow: 'var(--card-shadow)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)' }}>Ban kinh</span>
            <span style={{
              background: 'var(--primary-fixed)', color: 'var(--on-primary-container)',
              borderRadius: 'var(--radius-full)', padding: '4px 12px',
              fontSize: 13, fontWeight: 700,
            }}>{radius} km</span>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--on-surface-variant)', marginTop: 4 }}>
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          marginBottom: 20,
          scrollbarWidth: 'none',
        }}>
          {filters.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 'var(--radius-full)',
                  border: active ? 'none' : '1.5px solid var(--outline-variant)',
                  background: active ? 'var(--primary-gradient)' : 'var(--surface-container-lowest)',
                  color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{f.icon}</span>
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--on-surface)' }}>
          Ket qua gan ban
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {venues.map((v, i) => {
            const cat = categoryColors[v.category] || categoryColors['Su kien'];
            return (
              <div key={i} style={{
                background: 'var(--surface-container-lowest)',
                borderRadius: 'var(--radius)',
                padding: '16px',
                boxShadow: 'var(--card-shadow)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--on-surface)', marginBottom: 6 }}>{v.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        background: cat.bg, color: cat.color,
                        borderRadius: 'var(--radius-full)', padding: '3px 10px',
                        fontSize: 11, fontWeight: 600,
                      }}>{v.category}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, color: 'var(--on-surface-variant)' }}>
                        <span className="material-symbols-outlined filled" style={{ fontSize: 16, color: '#e6c84d' }}>star</span>
                        {v.rating}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    background: 'var(--primary-fixed)', color: 'var(--on-primary-container)',
                    borderRadius: 'var(--radius-full)', padding: '4px 10px',
                    fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
                  }}>{v.distance}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 12 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                  {v.address}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
                    flex: 1, padding: '9px 0', borderRadius: 'var(--radius)',
                    border: '1.5px solid var(--primary)', background: 'transparent',
                    color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    fontFamily: 'var(--font-body)',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>directions</span>
                    Chi duong
                  </button>
                  <button onClick={() => navigate(`/venue/${i + 1}`)} style={{
                    flex: 1, padding: '9px 0', borderRadius: 'var(--radius)',
                    border: 'none', background: 'var(--primary-gradient)',
                    color: 'var(--on-primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    fontFamily: 'var(--font-body)',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>visibility</span>
                    Xem
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nearby events */}
        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--on-surface)' }}>
          Su kien gan day
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {nearbyEvents.map((ev, i) => (
            <div key={i} style={{
              background: 'var(--surface-container-lowest)',
              borderRadius: 'var(--radius)',
              padding: '16px',
              boxShadow: 'var(--card-shadow)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--radius)',
                background: 'var(--primary-gradient)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--on-primary)', fontSize: 24 }}>celebration</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--on-surface)', marginBottom: 4 }}>{ev.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>
                  {ev.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
                  {ev.venue}
                </div>
              </div>
              <span style={{
                background: 'var(--tertiary-container)', color: 'var(--on-primary)',
                borderRadius: 'var(--radius-full)', padding: '4px 10px',
                fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
              }}>{ev.spots} cho</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapExplorePage;
