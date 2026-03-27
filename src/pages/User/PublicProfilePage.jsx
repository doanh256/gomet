import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tasteAxes = [
  { label: 'Cay', value: 85 },
  { label: 'Umami', value: 78 },
  { label: 'Chua', value: 52 },
  { label: 'Ngọt', value: 60 },
  { label: 'Đắng', value: 28 },
  { label: 'Mặn', value: 72 },
];

const sharedInterests = [
  { icon: 'ramen_dining', label: 'Phở Bò', shared: true },
  { icon: 'rice_bowl', label: 'Cơm Tấm', shared: true },
  { icon: 'local_dining', label: 'Bánh Mì', shared: true },
  { icon: 'soup_kitchen', label: 'Bún Bò', shared: false },
  { icon: 'set_meal', label: 'Sushi', shared: true },
  { icon: 'coffee', label: 'Cà Phê', shared: false },
  { icon: 'outdoor_grill', label: 'Lẩu', shared: true },
  { icon: 'lunch_dining', label: 'Hải Sản', shared: false },
  { icon: 'bakery_dining', label: 'Street Food', shared: true },
];

const featuredVisas = [
  { icon: 'workspace_premium', label: 'Visa Phở Bò', sublabel: '15/15 quán', progress: 100, rank: 'DIAMOND', rankColor: '#1c1b1b', rankText: '#fcf9f8', iconColor: '#ad2c00', bgColor: '#ffdbd1' },
  { icon: 'restaurant', label: 'Visa Bánh Mì', sublabel: '12/20 quán', progress: 60, rank: 'GOLD', rankColor: '#a83918', rankText: '#ffffff', iconColor: '#a83918', bgColor: '#ffdbd1' },
  { icon: 'set_meal', label: 'Visa Sushi', sublabel: '8/15 quán', progress: 53, rank: 'SILVER', rankColor: '#5d4038', rankText: '#ffffff', iconColor: '#5d4038', bgColor: '#f0edec' },
];

const communityStats = [
  { icon: 'local_fire_department', iconColor: '#ad2c00', bg: 'rgba(173,44,0,0.07)', text: 'Thử nhiều món Cay hơn 80% người dùng', highlight: 'Cay' },
  { icon: 'location_on', iconColor: '#005daa', bg: 'rgba(0,93,170,0.07)', text: 'Top 5% Foodie hoạt động tại TP.HCM', highlight: 'TP.HCM' },
  { icon: 'groups', iconColor: '#5d4038', bg: '#f0edec', text: 'Đã kết nối với 127 người bạn ẩm thực', highlight: null },
];

const MOMENT_COLORS = [
  'linear-gradient(135deg, #ffdbd1, #ad2c00)',
  'linear-gradient(135deg, #e7bdb2, #5d4038)',
  'linear-gradient(135deg, #ffdbd1, #a83918)',
  'linear-gradient(135deg, #f0edec, #926f66)',
  'linear-gradient(135deg, #ebe7e7, #5d4038)',
  'linear-gradient(135deg, #ffdbd1, #872000)',
];

const PublicProfilePage = () => {
  const navigate = useNavigate();
  const [connectPressed, setConnectPressed] = useState(false);
  const [invitePressed, setInvitePressed] = useState(false);

  const generateSpiderPath = (axes, maxRadius, cx, cy) => {
    const n = axes.length;
    const angleStep = (2 * Math.PI) / n;
    return axes
      .map((a, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const r = (a.value / 100) * maxRadius;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      })
      .join(' ');
  };

  const generateGridLines = (maxRadius, levels, cx, cy, n) => {
    const angleStep = (2 * Math.PI) / n;
    const lines = [];
    for (let l = 1; l <= levels; l++) {
      const r = (l / levels) * maxRadius;
      const pts = [];
      for (let i = 0; i < n; i++) {
        const angle = i * angleStep - Math.PI / 2;
        pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
      }
      lines.push(pts.join(' '));
    }
    return lines;
  };

  const n = tasteAxes.length;
  const angleStep = (2 * Math.PI) / n;
  const cx = 110;
  const cy = 110;
  const maxR = 80;
  const gridLines = generateGridLines(maxR, 4, cx, cy, n);
  const dataPath = generateSpiderPath(tasteAxes, maxR, cx, cy);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fcf9f8',
        fontFamily: "'Manrope', sans-serif",
        color: '#1c1b1b',
        paddingBottom: 80,
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: '#f6f3f2',
          borderBottom: '1px solid #e7bdb2',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            height: 60,
            gap: 12,
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: '50%',
              color: '#5d4038',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 22, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              arrow_back
            </span>
          </button>
          <h1
            style={{
              flex: 1,
              margin: 0,
              fontSize: 16,
              fontWeight: 800,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#1c1b1b',
              letterSpacing: '-0.2px',
            }}
          >
            Hồ sơ ẩm thực
          </h1>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: '#5d4038',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 22, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              more_vert
            </span>
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 16px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 24,
            border: '1px solid #e7bdb2',
            padding: '32px 24px 24px',
            marginTop: 20,
            marginBottom: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'rgba(173,44,0,0.04)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: 'rgba(173,44,0,0.08)',
              borderRadius: 9999,
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 12,
                color: '#ad2c00',
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              stars
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: '#ad2c00',
                letterSpacing: '0.08em',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              VÀNG ELITE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 18,
                  background: 'linear-gradient(135deg, #ffdbd1 0%, #ad2c00 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-2deg)',
                  boxShadow: '0 8px 20px rgba(173,44,0,0.2)',
                }}
              >
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: '#ffffff',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transform: 'rotate(2deg)',
                  }}
                >
                  MA
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: -6,
                  right: -6,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffdbd1, #ad2c00)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #ffffff',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 14,
                    color: '#ffffff',
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  diamond
                </span>
              </div>
            </div>

            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 800,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: '#1c1b1b',
                    letterSpacing: '-0.4px',
                  }}
                >
                  Minh Anh
                </h2>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 18,
                    color: '#005daa',
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  verified
                </span>
              </div>
              <p
                style={{
                  margin: '0 0 6px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#ad2c00',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Nhà Khám phá Vàng
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 13,
                    color: '#5d4038',
                    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  location_on
                </span>
                <span style={{ fontSize: 12, color: '#5d4038', fontWeight: 500 }}>TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              padding: '4px 0 0',
              borderTop: '1px solid #f0edec',
              display: 'flex',
              backgroundColor: 'transparent',
              borderRadius: 0,
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(173,44,0,0.05)',
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                color: '#5d4038',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 13,
                  color: '#ad2c00',
                  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                badge
              </span>
              Food Passport ID: #VN-8829
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: 16,
          }}
        >
          {[
            { icon: 'stars', value: '12,450', label: 'Điểm VÀNG', iconFill: 1 },
            { icon: 'restaurant_menu', value: '87', label: 'Món đã thử', iconFill: 0 },
            { icon: 'explore', value: '6', label: 'Vùng miền', iconFill: 0 },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                border: '1px solid #e7bdb2',
                padding: '16px 8px',
                textAlign: 'center',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 20,
                  color: '#ad2c00',
                  fontVariationSettings: `'FILL' ${stat.iconFill}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
                  display: 'block',
                  marginBottom: 4,
                }}
              >
                {stat.icon}
              </span>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: '#1c1b1b',
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: '#5d4038', fontWeight: 500, marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <button
            onClick={() => { setConnectPressed(true); navigate('/app/chat'); }}
            style={{
              flex: 3,
              padding: '14px 0',
              borderRadius: 9999,
              border: 'none',
              backgroundColor: '#ad2c00',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 8px 20px rgba(173,44,0,0.25)',
              opacity: connectPressed ? 0.85 : 1,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 18,
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              favorite
            </span>
            Kết nối
          </button>
          <button
            onClick={() => setInvitePressed(!invitePressed)}
            style={{
              flex: 2,
              padding: '14px 0',
              borderRadius: 9999,
              border: '1.5px solid #ad2c00',
              backgroundColor: invitePressed ? 'rgba(173,44,0,0.06)' : 'transparent',
              color: '#ad2c00',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 16,
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              {invitePressed ? 'check' : 'person_add'}
            </span>
            {invitePressed ? 'Đã gửi' : 'Gửi lời mời'}
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e7bdb2',
            padding: '20px 20px 24px',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 20,
                color: '#ad2c00',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              radar
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1c1b1b',
              }}
            >
              Taste Radar
            </h3>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg viewBox="0 0 220 220" width="220" height="220">
              {gridLines.map((pts, i) => (
                <polygon
                  key={i}
                  points={pts}
                  fill="none"
                  stroke="#e7bdb2"
                  strokeWidth="1"
                  opacity={0.6}
                />
              ))}
              {tasteAxes.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + maxR * Math.cos(angle)}
                    y2={cy + maxR * Math.sin(angle)}
                    stroke="#e7bdb2"
                    strokeWidth="1"
                    opacity={0.5}
                  />
                );
              })}
              <polygon
                points={dataPath}
                fill="rgba(173,44,0,0.12)"
                stroke="#ad2c00"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {tasteAxes.map((a, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const px = cx + (a.value / 100) * maxR * Math.cos(angle);
                const py = cy + (a.value / 100) * maxR * Math.sin(angle);
                return (
                  <circle
                    key={i}
                    cx={px}
                    cy={py}
                    r="3.5"
                    fill="#ad2c00"
                  />
                );
              })}
              {tasteAxes.map((a, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const lx = cx + (maxR + 18) * Math.cos(angle);
                const ly = cy + (maxR + 18) * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#5d4038"
                    fontFamily="'Manrope', sans-serif"
                  >
                    {a.label}
                  </text>
                );
              })}
            </svg>
          </div>

          <p
            style={{
              margin: '4px 0 0',
              fontSize: 12,
              color: '#5d4038',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Khẩu vị thiên về <strong style={{ color: '#ad2c00' }}>Cay</strong> và{' '}
            <strong style={{ color: '#ad2c00' }}>Umami</strong> — rất phù hợp với bạn!
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e7bdb2',
            padding: '20px 20px 22px',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 20,
                color: '#ad2c00',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              favorite_border
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1c1b1b',
              }}
            >
              Sở thích ẩm thực chung
            </h3>
          </div>
          <p style={{ fontSize: 12, color: '#5d4038', margin: '0 0 16px 0', fontWeight: 500 }}>
            6/9 món ăn trùng khớp với bạn
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sharedInterests.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '7px 12px',
                  borderRadius: 9999,
                  backgroundColor: item.shared ? 'rgba(173,44,0,0.06)' : '#f6f3f2',
                  border: item.shared ? '1.5px solid rgba(173,44,0,0.2)' : '1.5px solid #e7bdb2',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 14,
                    color: item.shared ? '#ad2c00' : '#5d4038',
                    fontVariationSettings: `'FILL' ${item.shared ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: item.shared ? '#ad2c00' : '#5d4038',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e7bdb2',
            padding: '20px 20px 22px',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 20,
                  color: '#ad2c00',
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                workspace_premium
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 800,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: '#1c1b1b',
                }}
              >
                Featured Visas
              </h3>
            </div>
            <span style={{ fontSize: 12, color: '#5d4038', fontWeight: 600 }}>42 Visa</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {featuredVisas.map((visa) => (
              <div
                key={visa.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  backgroundColor: '#f6f3f2',
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: visa.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 22,
                      color: visa.iconColor,
                      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {visa.icon}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: '#1c1b1b',
                      }}
                    >
                      {visa.label}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        backgroundColor: visa.rankColor,
                        color: visa.rankText,
                        padding: '2px 7px',
                        borderRadius: 9999,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {visa.rank}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        flex: 1,
                        height: 4,
                        backgroundColor: '#e7bdb2',
                        borderRadius: 9999,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${visa.progress}%`,
                          backgroundColor: '#ad2c00',
                          borderRadius: 9999,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 11, color: '#5d4038', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {visa.sublabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e7bdb2',
            padding: '20px 20px 22px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 20,
                color: '#ad2c00',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              bar_chart
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1c1b1b',
              }}
            >
              Thống kê cộng đồng
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {communityStats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  backgroundColor: stat.bg,
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 20,
                      color: stat.iconColor,
                      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {stat.icon}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#1c1b1b', fontWeight: 500, lineHeight: 1.4 }}>
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e7bdb2',
            padding: '20px 20px 22px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 20,
                color: '#ad2c00',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              photo_library
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1c1b1b',
              }}
            >
              Food Moments
            </h3>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
            }}
          >
            {MOMENT_COLORS.map((grad, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1',
                  borderRadius: 12,
                  background: grad,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.4)',
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  restaurant
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => { setConnectPressed(true); navigate('/app/chat'); }}
            style={{
              flex: 1,
              padding: '15px 0',
              borderRadius: 9999,
              border: 'none',
              backgroundColor: '#ad2c00',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 8px 20px rgba(173,44,0,0.25)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 18,
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              chat
            </span>
            Nhắn tin ngay
          </button>
          <button
            onClick={() => setInvitePressed(!invitePressed)}
            style={{
              flex: 1,
              padding: '15px 0',
              borderRadius: 9999,
              border: '1.5px solid #ad2c00',
              backgroundColor: invitePressed ? 'rgba(173,44,0,0.06)' : 'transparent',
              color: '#ad2c00',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 18,
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              {invitePressed ? 'check_circle' : 'person_add'}
            </span>
            {invitePressed ? 'Đã gửi lời mời' : 'Gửi lời mời'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
