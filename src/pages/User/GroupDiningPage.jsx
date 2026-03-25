import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const squadMembers = [
  { id: 1, name: 'Linh Chi', avatar: '👩', compatibility: 95, taste: 'Spicy lover' },
  { id: 2, name: 'Đức Minh', avatar: '👨', compatibility: 88, taste: 'Umami seeker' },
  { id: 3, name: 'Thu Hà', avatar: '👩', compatibility: 92, taste: 'Sweet tooth' },
  { id: 4, name: 'Hoàng Nam', avatar: '👨', compatibility: 85, taste: 'Sour fan' },
  { id: 5, name: 'Mai Phương', avatar: '👩', compatibility: 91, taste: 'All-rounder' },
];

const aiVenueRec = {
  name: 'Bangkok House',
  type: 'Thai Cuisine',
  match: 94,
  reason: 'Perfect match for the squad! High spice tolerance across all members with excellent group seating.',
  price: '$$',
  rating: 4.8,
};

// SVG Radar chart component
const SynergyRadar = ({ synergy = 92 }) => {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const axes = ['Spicy', 'Sweet', 'Sour', 'Umami', 'Salty', 'Bitter'];
  const values = [0.9, 0.7, 0.8, 0.95, 0.6, 0.5];
  const levels = [0.25, 0.5, 0.75, 1.0];
  const maxR = 90;

  const getPoint = (index, radius) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };

  const polygonPath = (radiusFn) => {
    return axes.map((_, i) => {
      const p = getPoint(i, radiusFn(i));
      return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
    }).join(' ') + ' Z';
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid levels */}
      {levels.map((level, li) => (
        <polygon key={li}
          points={axes.map((_, i) => { const p = getPoint(i, maxR * level); return `${p.x},${p.y}`; }).join(' ')}
          fill="none" stroke="#2A2A2A" strokeWidth={1} strokeDasharray={li < 3 ? '4,4' : 'none'}
        />
      ))}
      {/* Axis lines */}
      {axes.map((_, i) => {
        const p = getPoint(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#2A2A2A" strokeWidth={1} />;
      })}
      {/* Data polygon */}
      <path d={polygonPath((i) => maxR * values[i])} fill="rgba(255,87,26,0.2)" stroke="#FF571A" strokeWidth={2} />
      {/* Data points */}
      {axes.map((_, i) => {
        const p = getPoint(i, maxR * values[i]);
        return <circle key={i} cx={p.x} cy={p.y} r={4} fill="#FF571A" />;
      })}
      {/* Labels */}
      {axes.map((label, i) => {
        const p = getPoint(i, maxR + 22);
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fill="#E6BEB2" fontSize={11} fontFamily="Inter, sans-serif" fontWeight={600}>
            {label}
          </text>
        );
      })}
      {/* Center synergy */}
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#FDF9F3" fontSize={28} fontWeight={800}
        fontFamily="Plus Jakarta Sans, sans-serif">{synergy}%</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#E6BEB2" fontSize={11}
        fontFamily="Inter, sans-serif">Synergy</text>
    </svg>
  );
};

const GroupDiningPage = () => {
  const navigate = useNavigate();
  const [joinedGroups, setJoinedGroups] = useState([]);
  const toggleJoin = (id) => { setJoinedGroups((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]); };

  return (
    <div style={{
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      fontFamily: "'Inter', sans-serif", padding: '40px 24px 100px',
      maxWidth: 600, margin: '0 auto',
    }}>
      {/* Back */}
      <button onClick={() => navigate(-1)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'none', border: 'none', color: '#FFB59E',
        fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
        cursor: 'pointer', marginBottom: 24, padding: 0,
      }}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Back
      </button>

      {/* Squad header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px',
          borderRadius: 9999, background: 'rgba(255,87,26,0.15)', marginBottom: 16,
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#FF571A' }}>local_fire_department</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#FF571A' }}>Active Squad</span>
        </div>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800,
          color: '#FDF9F3', margin: '0 0 8px',
        }}>The Spice Seekers</h1>
        <p style={{ fontSize: 14, color: '#E6BEB2', margin: 0 }}>5 members &middot; Est. Jan 2026</p>

        {/* Member avatars row */}
        <div style={{
          display: 'flex', justifyContent: 'center', marginTop: 20, gap: 0,
        }}>
          {squadMembers.map((m, i) => (
            <div key={m.id} style={{
              width: 44, height: 44, borderRadius: 9999, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 22,
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              marginLeft: i === 0 ? 0 : -10, position: 'relative', zIndex: 5 - i,
              boxShadow: '0 0 0 3px #131313',
            }}>
              {m.avatar}
            </div>
          ))}
        </div>
      </div>

      {/* Group Synergy Radar */}
      <div style={{
        backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 24,
        marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700,
          color: '#FDF9F3', margin: '0 0 16px', width: '100%',
        }}>Group Synergy</h2>
        <SynergyRadar synergy={92} />
        <p style={{ fontSize: 13, color: '#E6BEB2', marginTop: 12, textAlign: 'center' }}>
          Your squad has exceptional taste alignment across most dimensions
        </p>
      </div>

      {/* AI Venue Recommendation */}
      <div style={{
        backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 24, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFD54F' }}>auto_awesome</span>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700,
            color: '#FDF9F3', margin: 0,
          }}>AI Recommendation</h2>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(255,181,158,0.1), rgba(255,87,26,0.1))',
          borderRadius: '1rem', padding: 20, marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800,
                color: '#FDF9F3', margin: '0 0 4px',
              }}>{aiVenueRec.name}</h3>
              <p style={{ fontSize: 13, color: '#E6BEB2', margin: 0 }}>
                {aiVenueRec.type} &middot; {aiVenueRec.price} &middot; {aiVenueRec.rating} ★
              </p>
            </div>
            <div style={{
              padding: '8px 16px', borderRadius: 9999,
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800,
              color: '#3A0B00',
            }}>
              {aiVenueRec.match}%
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#E6BEB2', lineHeight: 1.6, margin: 0 }}>
            {aiVenueRec.reason}
          </p>
        </div>

        <button style={{
          width: '100%', padding: '16px', borderRadius: 9999, border: 'none',
          background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
          color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 16, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>calendar_today</span>
          Propose a Group Date
        </button>
      </div>

      {/* Member List */}
      <div style={{
        backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 24,
      }}>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700,
          color: '#FDF9F3', margin: '0 0 20px',
        }}>Squad Members</h2>

        {squadMembers.map(member => (
          <div key={member.id} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 9999, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 24,
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              flexShrink: 0,
            }}>
              {member.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700,
                color: '#FDF9F3', margin: '0 0 2px',
              }}>{member.name}</h4>
              <p style={{ fontSize: 12, color: '#E6BEB2', margin: 0 }}>{member.taste}</p>
            </div>
            <div style={{
              padding: '6px 14px', borderRadius: 9999,
              backgroundColor: 'rgba(255,87,26,0.15)', color: '#FFB59E',
              fontSize: 13, fontWeight: 700,
            }}>
              {member.compatibility}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDiningPage;
