import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const featuredMemory = {
  id: 'featured',
  partner: { name: 'Minh Anh', avatar: 'MA' },
  restaurant: 'La Maison 1888',
  date: '15/03/2026',
  dishes: ['Wagyu Tartare', 'Lobster Thermidor', 'Chocolate Soufle'],
  vangEarned: 250,
  milestone: '10th Shared Meal',
  note: 'A magical evening celebrating our love for French-Vietnamese fusion. The Wagyu was incredible.',
  gradient: 'linear-gradient(135deg, #FFB59E 0%, #FF571A 100%)',
};

const timelineMemories = [
  {
    id: 1, partner: { name: 'Minh Anh', avatar: 'MA' },
    restaurant: 'The Coffee House - Nguyen Hue', date: '08/03/2026',
    dishes: ['Ca Phe Sua Da', 'Banh Flan'], vangEarned: 50,
    note: 'Afternoon coffee date, laughing over iced coffee and flan.',
  },
  {
    id: 2, partner: { name: 'Thu Trang', avatar: 'TT' },
    restaurant: 'Pizza 4Ps - Hai Ba Trung', date: '22/02/2026',
    dishes: ['Burrata Pizza', 'Tiramisu'], vangEarned: 80,
    note: 'First time trying burrata together - love at first bite!',
  },
  {
    id: 3, partner: { name: 'Hoang Nam', avatar: 'HN' },
    restaurant: 'Bun Bo Ba Tuyet', date: '14/02/2026',
    dishes: ['Bun Bo Hue', 'Che'], vangEarned: 40,
    note: 'Valentine bun bo session. The spice brought happy tears.',
  },
  {
    id: 4, partner: { name: 'Mai Phuong', avatar: 'MP' },
    restaurant: 'Com Tam Ba Ghien', date: '01/02/2026',
    dishes: ['Com Tam Suon Bi Cha'], vangEarned: 35,
    note: 'Late night com tam run after a long day. Comfort food at its best.',
  },
];

const MemoriesPage = () => {
  const navigate = useNavigate();
  const [showTimeline, setShowTimeline] = useState(true);

  return (
    <div style={{
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      fontFamily: "'Inter', sans-serif", minHeight: '100vh',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px 100px' }}>
        {/* Back */}
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', color: '#FFB59E', cursor: 'pointer',
          padding: 0, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Back</span>
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 48, color: '#FFB59E', marginBottom: 8, display: 'block' }}>auto_awesome</span>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800,
            color: '#FDF9F3', margin: '0 0 8px',
          }}>Shared Meal Memory</h1>
          <p style={{ fontSize: 14, color: '#E6BEB2', margin: 0 }}>
            Every dish tells a story, every meal builds a bond
          </p>
        </div>

        {/* Featured Memory Card */}
        <div style={{
          backgroundColor: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden',
          marginBottom: 28,
        }}>
          {/* Large dish photo area with gradient */}
          <div style={{
            height: 220, background: featuredMemory.gradient, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 80, color: 'rgba(255,255,255,0.15)' }}>restaurant</span>
            {/* Bottom gradient overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
              background: 'linear-gradient(180deg, transparent, rgba(28,27,27,1))',
            }} />
            {/* Milestone badge */}
            <div style={{
              position: 'absolute', top: 16, right: 16, padding: '8px 16px',
              borderRadius: 9999, background: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16, color: '#FFD54F' }}>emoji_events</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#FFD54F' }}>{featuredMemory.milestone}</span>
            </div>
            {/* Partner info overlay */}
            <div style={{
              position: 'absolute', bottom: 16, left: 20, display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 9999,
                background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#fff',
              }}>
                {featuredMemory.partner.avatar}
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700,
                  color: '#FDF9F3', margin: 0,
                }}>with {featuredMemory.partner.name}</h3>
              </div>
            </div>
          </div>

          {/* Memory details */}
          <div style={{ padding: '20px 24px' }}>
            {/* Restaurant & Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#E6BEB2' }}>location_on</span>
              <span style={{ fontSize: 14, color: '#FDF9F3', fontWeight: 600 }}>{featuredMemory.restaurant}</span>
              <span style={{ fontSize: 13, color: '#E6BEB2' }}>&middot; {featuredMemory.date}</span>
            </div>

            {/* Dishes ordered */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: '#E6BEB2', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Dishes Ordered
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {featuredMemory.dishes.map(dish => (
                  <span key={dish} style={{
                    padding: '6px 14px', borderRadius: 9999,
                    backgroundColor: 'rgba(255,87,26,0.15)', color: '#FFB59E',
                    fontSize: 13, fontWeight: 600,
                  }}>{dish}</span>
                ))}
              </div>
            </div>

            {/* Note */}
            <p style={{
              fontSize: 14, color: '#E6BEB2', fontStyle: 'italic',
              lineHeight: 1.7, margin: '0 0 16px',
            }}>
              "{featuredMemory.note}"
            </p>

            {/* Vang earned */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderRadius: '1rem',
              backgroundColor: 'rgba(255,213,79,0.1)', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFD54F' }}>toll</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#FFD54F' }}>
                  +{featuredMemory.vangEarned} Vang earned
                </span>
              </div>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#E6BEB2' }}>chevron_right</span>
            </div>

            {/* Share button */}
            <button style={{
              width: '100%', padding: '14px', borderRadius: 9999, border: 'none',
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
              Share to Journey
            </button>
          </div>
        </div>

        {/* Timeline of past meals */}
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700,
          color: '#FDF9F3', margin: '0 0 20px',
        }}>Past Shared Meals</h2>

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 8, top: 0, bottom: 0, width: 2,
            backgroundColor: '#2A2A2A',
          }} />

          {timelineMemories.map((memory, idx) => (
            <div key={memory.id} style={{ position: 'relative', marginBottom: 20 }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -28, top: 6, width: 18, height: 18,
                borderRadius: 9999, background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 4px #131313',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: 9999, backgroundColor: '#FDF9F3' }} />
              </div>

              <div style={{
                backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 9999,
                    background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#fff',
                    flexShrink: 0,
                  }}>
                    {memory.partner.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700,
                      color: '#FDF9F3', margin: '0 0 2px',
                    }}>with {memory.partner.name}</h4>
                    <p style={{ fontSize: 12, color: '#E6BEB2', margin: 0 }}>
                      {memory.restaurant} &middot; {memory.date}
                    </p>
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: '#FFD54F',
                    backgroundColor: 'rgba(255,213,79,0.1)', padding: '4px 10px', borderRadius: 9999,
                  }}>+{memory.vangEarned}</span>
                </div>

                <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  {memory.dishes.map(dish => (
                    <span key={dish} style={{
                      padding: '4px 12px', borderRadius: 9999,
                      backgroundColor: '#2A2A2A', color: '#E6BEB2',
                      fontSize: 12, fontWeight: 600,
                    }}>{dish}</span>
                  ))}
                </div>

                <p style={{
                  fontSize: 13, color: '#E6BEB2', fontStyle: 'italic', lineHeight: 1.6, margin: 0,
                }}>
                  "{memory.note}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;
