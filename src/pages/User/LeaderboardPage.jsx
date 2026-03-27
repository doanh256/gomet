import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  bg: '#fcf9f8',
  white: '#ffffff',
  surfaceLow: '#f6f3f2',
  surfaceContainer: '#f0edec',
  surfaceHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryFixed: '#ffdbd1',
  outlineVariant: '#e7bdb2',
};

const FONTS = {
  headline: "'Plus Jakarta Sans', sans-serif",
  body: "'Manrope', sans-serif",
};

const filterTabs = ['Tuần này', 'Tháng này', 'Tất cả'];

const allTimeTop3 = [
  { rank: 1, name: 'Minh Anh Lê', initials: 'MA', points: 12450, title: 'Bậc thầy Ẩm thực', avatarColor: '#ad2c00' },
  { rank: 2, name: 'Hoàng Nam', initials: 'HN', points: 10820, title: 'Người Sành Ăn', avatarColor: '#5d4038' },
  { rank: 3, name: 'Trâm Nguyễn', initials: 'TN', points: 9150, title: 'Người Khám Phá', avatarColor: '#926f66' },
];

const allTimeRankings = [
  { rank: 4, name: 'Đức Huy', initials: 'DH', points: 8600, trend: 'up' },
  { rank: 5, name: 'Ngọc Lan', initials: 'NL', points: 8020, trend: 'up' },
  { rank: 6, name: 'Quang Minh', initials: 'QM', points: 7740, trend: 'down' },
  { rank: 7, name: 'Phương Linh', initials: 'PL', points: 7310, trend: 'flat' },
  { rank: 8, name: 'Thành Sơn', initials: 'TS', points: 7020, trend: 'up' },
  { rank: 9, name: 'Hà My', initials: 'HM', points: 6800, trend: 'down' },
  { rank: 10, name: 'Tuấn Kiệt', initials: 'TK', points: 6580, trend: 'flat' },
  { rank: 11, name: 'Bảo Ngọc', initials: 'BN', points: 6350, trend: 'up' },
  { rank: 12, name: 'Anh Tuấn (Bạn)', initials: 'AT', points: 8450, trend: 'up', isCurrentUser: true },
  { rank: 13, name: 'Kim Ngân', initials: 'KN', points: 5900, trend: 'up' },
  { rank: 14, name: 'Văn Đạt', initials: 'VD', points: 5680, trend: 'flat' },
  { rank: 15, name: 'Thùy Linh', initials: 'TL', points: 5460, trend: 'up' },
];

const weeklyTop3 = [
  { rank: 1, name: 'Hoàng Nam', initials: 'HN', points: 2150, title: 'Người Sành Ăn', avatarColor: '#5d4038' },
  { rank: 2, name: 'Minh Anh Lê', initials: 'MA', points: 1980, title: 'Bậc thầy Ẩm thực', avatarColor: '#ad2c00' },
  { rank: 3, name: 'Đức Huy', initials: 'DH', points: 1720, title: 'Người Khám Phá', avatarColor: '#926f66' },
];

const weeklyRankings = [
  { rank: 4, name: 'Trâm Nguyễn', initials: 'TN', points: 1540, trend: 'down' },
  { rank: 5, name: 'Phương Linh', initials: 'PL', points: 1310, trend: 'up' },
  { rank: 6, name: 'Ngọc Lan', initials: 'NL', points: 1180, trend: 'down' },
  { rank: 7, name: 'Quang Minh', initials: 'QM', points: 1050, trend: 'flat' },
  { rank: 8, name: 'Bảo Ngọc', initials: 'BN', points: 980, trend: 'up' },
  { rank: 9, name: 'Hà My', initials: 'HM', points: 850, trend: 'flat' },
  { rank: 10, name: 'Thành Sơn', initials: 'TS', points: 720, trend: 'up' },
  { rank: 11, name: 'Kim Ngân', initials: 'KN', points: 610, trend: 'down' },
  { rank: 12, name: 'Anh Tuấn (Bạn)', initials: 'AT', points: 500, trend: 'up', isCurrentUser: true },
];

const monthlyTop3 = [
  { rank: 1, name: 'Minh Anh Lê', initials: 'MA', points: 4200, title: 'Bậc thầy Ẩm thực', avatarColor: '#ad2c00' },
  { rank: 2, name: 'Trâm Nguyễn', initials: 'TN', points: 3750, title: 'Người Khám Phá', avatarColor: '#926f66' },
  { rank: 3, name: 'Hoàng Nam', initials: 'HN', points: 3410, title: 'Người Sành Ăn', avatarColor: '#5d4038' },
];

const monthlyRankings = [
  { rank: 4, name: 'Ngọc Lan', initials: 'NL', points: 3100, trend: 'up' },
  { rank: 5, name: 'Đức Huy', initials: 'DH', points: 2890, trend: 'flat' },
  { rank: 6, name: 'Phương Linh', initials: 'PL', points: 2670, trend: 'up' },
  { rank: 7, name: 'Quang Minh', initials: 'QM', points: 2450, trend: 'down' },
  { rank: 8, name: 'Thành Sơn', initials: 'TS', points: 2230, trend: 'up' },
  { rank: 9, name: 'Hà My', initials: 'HM', points: 2010, trend: 'flat' },
  { rank: 10, name: 'Tuấn Kiệt', initials: 'TK', points: 1790, trend: 'down' },
  { rank: 11, name: 'Bảo Ngọc', initials: 'BN', points: 1570, trend: 'up' },
  { rank: 12, name: 'Anh Tuấn (Bạn)', initials: 'AT', points: 1350, trend: 'up', isCurrentUser: true },
];

const dataByFilter = [
  { top3: weeklyTop3, rankings: weeklyRankings, userRank: '#12', userPoints: 500, trend: 'Tăng 5 bậc tuần này' },
  { top3: monthlyTop3, rankings: monthlyRankings, userRank: '#12', userPoints: 1350, trend: 'Tăng 3 bậc tháng này' },
  { top3: allTimeTop3, rankings: allTimeRankings, userRank: '#12', userPoints: 8450, trend: 'Tăng 2 bậc tổng thể' },
];

const podiumColors = {
  1: { bg: '#FFD700', shadow: 'rgba(255,215,0,0.35)', text: '#3b0900' },
  2: { bg: '#B8C0CC', shadow: 'rgba(184,192,204,0.25)', text: '#1c1b1b' },
  3: { bg: '#cd7f32', shadow: 'rgba(205,127,50,0.25)', text: '#fff' },
};

const trendConfig = {
  up: { icon: 'trending_up', color: '#117500' },
  down: { icon: 'trending_down', color: '#ba1a1a' },
  flat: { icon: 'trending_flat', color: '#926f66' },
};

const avatarPalette = ['#ad2c00', '#5d4038', '#926f66', '#0075d5', '#005daa', '#a83918'];

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);

  const { top3, rankings, userRank, userPoints, trend } = dataByFilter[activeFilter];
  const podiumOrder = [top3[1], top3[0], top3[2]];

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', fontFamily: FONTS.headline }}>
      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 120 }}>

        <div style={{
          background: `linear-gradient(160deg, ${COLORS.primary} 0%, #7a1e00 100%)`,
          padding: '56px 24px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 160, height: 160,
            borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{
            position: 'absolute', bottom: -20, left: -20, width: 100, height: 100,
            borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#FFD700', fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
            <h1 style={{
              fontFamily: FONTS.headline, fontSize: 26, fontWeight: 800,
              color: '#ffffff', margin: '8px 0 4px', letterSpacing: '-0.5px',
            }}>
              Bảng Xếp Hạng
            </h1>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Culinary Quests — Mùa 2025
            </p>
          </div>

          <div style={{
            display: 'flex', gap: 8, marginTop: 20, position: 'relative', zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 4,
          }}>
            {filterTabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(i)}
                style={{
                  flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer',
                  borderRadius: 8, fontFamily: FONTS.headline, fontSize: 13, fontWeight: 700,
                  transition: 'all 0.2s',
                  backgroundColor: activeFilter === i ? '#ffffff' : 'transparent',
                  color: activeFilter === i ? COLORS.primary : 'rgba(255,255,255,0.8)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '28px 24px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            gap: 12, marginBottom: 32,
          }}>
            {podiumOrder.map((p, idx) => {
              const isFirst = p.rank === 1;
              const size = isFirst ? 72 : 56;
              const pc = podiumColors[p.rank];
              const podiumHeights = [64, 88, 48];
              return (
                <div key={p.rank} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  flex: isFirst ? '0 0 auto' : '0 0 auto',
                }}>
                  <div style={{ position: 'relative', marginBottom: 4 }}>
                    <div style={{
                      width: size, height: size, borderRadius: '50%',
                      backgroundColor: p.avatarColor || pc.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: FONTS.headline, fontWeight: 800,
                      fontSize: isFirst ? 22 : 16, color: '#ffffff',
                      boxShadow: `0 8px 20px ${pc.shadow}`,
                      border: `3px solid ${pc.bg}`,
                    }}>
                      {p.initials}
                    </div>
                    <div style={{
                      position: 'absolute', bottom: -6, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 22, height: 22, borderRadius: '50%',
                      backgroundColor: pc.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: FONTS.headline, fontSize: 10, fontWeight: 800,
                      color: p.rank === 3 ? '#ffffff' : '#3b0900',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}>
                      {p.rank}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: FONTS.headline, fontSize: isFirst ? 13 : 12,
                    fontWeight: 700, color: COLORS.onSurface, textAlign: 'center',
                    maxWidth: isFirst ? 100 : 80,
                  }}>
                    {p.name}
                  </div>
                  <div style={{
                    fontFamily: FONTS.body, fontSize: 11,
                    color: COLORS.primary, fontWeight: 700,
                  }}>
                    {p.points.toLocaleString()} pts
                  </div>
                  <div style={{
                    backgroundColor: pc.bg,
                    height: podiumHeights[idx],
                    width: isFirst ? 96 : 80,
                    borderRadius: '8px 8px 0 0',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    paddingTop: 8,
                  }}>
                    <span style={{
                      fontFamily: FONTS.headline, fontSize: isFirst ? 18 : 14,
                      fontWeight: 800, color: p.rank === 3 ? '#ffffff' : pc.text,
                    }}>
                      #{p.rank}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(28,27,27,0.06)',
            marginBottom: 24,
          }}>
            {rankings.map((r, i) => {
              const t = trendConfig[r.trend];
              const avatarBg = r.isCurrentUser
                ? COLORS.primary
                : avatarPalette[i % avatarPalette.length];
              return (
                <div
                  key={r.rank}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px',
                    borderBottom: i < rankings.length - 1 ? `1px solid ${COLORS.surfaceLow}` : 'none',
                    backgroundColor: r.isCurrentUser ? COLORS.primaryFixed : 'transparent',
                  }}
                >
                  <div style={{
                    width: 28, fontFamily: FONTS.headline, fontSize: 14, fontWeight: 700,
                    color: r.isCurrentUser ? COLORS.primary : COLORS.onSurfaceVariant,
                    textAlign: 'center', flexShrink: 0,
                  }}>
                    #{r.rank}
                  </div>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    backgroundColor: avatarBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONTS.headline, fontSize: 13, fontWeight: 700,
                    color: '#ffffff', flexShrink: 0,
                    border: r.isCurrentUser ? `2px solid ${COLORS.primary}` : 'none',
                  }}>
                    {r.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: FONTS.headline, fontSize: 14, fontWeight: 700,
                      color: r.isCurrentUser ? COLORS.primary : COLORS.onSurface,
                    }}>
                      {r.name}
                    </div>
                    {r.isCurrentUser && (
                      <div style={{
                        fontFamily: FONTS.body, fontSize: 10, fontWeight: 700,
                        color: COLORS.primary, textTransform: 'uppercase', letterSpacing: '0.5px',
                        marginTop: 1,
                      }}>
                        Vị trí của bạn
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontFamily: FONTS.headline, fontSize: 13, fontWeight: 700,
                    color: r.isCurrentUser ? COLORS.primary : COLORS.onSurface,
                    marginRight: 4,
                  }}>
                    {r.points.toLocaleString()}
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: t.color }}>
                    {t.icon}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 24,
            boxShadow: '0 4px 20px rgba(28,27,27,0.06)',
            border: `1px solid ${COLORS.outlineVariant}`,
          }}>
            <div style={{
              fontFamily: FONTS.body, fontSize: 10, fontWeight: 700,
              color: COLORS.onSurfaceVariant, textTransform: 'uppercase',
              letterSpacing: '0.8px', marginBottom: 12,
            }}>
              Thống kê của bạn
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${COLORS.outlineVariant}` }}>
                <div style={{ fontFamily: FONTS.headline, fontSize: 22, fontWeight: 800, color: COLORS.primary }}>
                  {userRank}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 10, color: COLORS.onSurfaceVariant, fontWeight: 600 }}>
                  Hạng hiện tại
                </div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${COLORS.outlineVariant}` }}>
                <div style={{ fontFamily: FONTS.headline, fontSize: 22, fontWeight: 800, color: COLORS.onSurface }}>
                  {userPoints.toLocaleString()}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 10, color: COLORS.onSurfaceVariant, fontWeight: 600 }}>
                  Tổng VÀNG Points
                </div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: FONTS.headline, fontSize: 22, fontWeight: 800, color: COLORS.onSurface }}>
                  14
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 10, color: COLORS.onSurfaceVariant, fontWeight: 600 }}>
                  Nhiệm vụ xong
                </div>
              </div>
            </div>
            <div style={{
              marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.surfaceHigh}`,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#117500' }}>trending_up</span>
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: '#117500', fontWeight: 600 }}>
                {trend}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/quests')}
            style={{
              width: '100%', padding: '16px 24px',
              backgroundColor: COLORS.primary, color: '#ffffff',
              border: 'none', borderRadius: 9999, cursor: 'pointer',
              fontFamily: FONTS.headline, fontSize: 15, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(173,44,0,0.3)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            Xem Culinary Quests
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
