import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quests');

  const colors = {
    background: '#fcf9f8',
    surfaceContainerLowest: '#ffffff',
    surfaceContainer: '#f0edec',
    surfaceContainerLow: '#f6f3f2',
    surfaceContainerHigh: '#ebe7e7',
    onSurface: '#1c1b1b',
    onSurfaceVariant: '#5d4038',
    primary: '#ad2c00',
    secondary: '#a83918',
    secondaryContainer: '#ff7852',
    outlineVariant: '#e7bdb2',
    primaryFixed: '#ffdbd1',
  };

  const fontHeadline = "'Plus Jakarta Sans', sans-serif";
  const fontBody = "'Manrope', sans-serif";

  const leaderboardUsers = [
    { rank: 1, initials: 'MA', name: 'Minh Anh Lê', title: 'Bậc thầy Ẩm thực', points: '12,450', isTop: true, avatarBg: '#ad2c00', avatarColor: '#fff' },
    { rank: 2, initials: 'HN', name: 'Hoàng Nam', title: 'Người Sành Ăn', points: '10,820', isTop: false, avatarBg: '#ffdbd1', avatarColor: '#ad2c00' },
    { rank: 3, initials: 'TN', name: 'Trâm Nguyễn', title: 'Người Khám Phá', points: '9,150', isTop: false, avatarBg: '#f0edec', avatarColor: '#5d4038' },
  ];

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100dvh', fontFamily: fontHeadline, color: colors.onSurface, WebkitFontSmoothing: 'antialiased' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, backgroundColor: colors.background }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 80, maxWidth: 896, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 28, color: colors.primary }}>restaurant_menu</span>
            <h1 style={{ fontFamily: fontHeadline, fontWeight: 800, color: colors.primary, letterSpacing: '-0.05em', fontSize: 24, margin: 0 }}>Culinary Quests</h1>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '9999px', backgroundColor: colors.surfaceContainerHigh, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid rgba(173,44,0,0.1)`, overflow: 'hidden' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: colors.onSurfaceVariant }}>person</span>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: 96, paddingBottom: 128, paddingLeft: 24, paddingRight: 24, maxWidth: 672, margin: '0 auto' }}>
        <div style={{ display: 'flex', padding: 6, backgroundColor: colors.surfaceContainerLow, borderRadius: '0.75rem', marginBottom: 40, position: 'sticky', top: 96, zIndex: 40, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <button
            onClick={() => setActiveTab('quests')}
            style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderRadius: '0.5rem', fontFamily: fontHeadline, fontWeight: 700, fontSize: 14, letterSpacing: '0.025em', border: 'none', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: activeTab === 'quests' ? colors.surfaceContainerLowest : 'transparent', color: activeTab === 'quests' ? colors.primary : colors.onSurfaceVariant, boxShadow: activeTab === 'quests' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}
          >
            Nhiệm vụ
          </button>
          <button
            onClick={() => setActiveTab('ranking')}
            style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderRadius: '0.5rem', fontFamily: fontHeadline, fontWeight: 700, fontSize: 14, letterSpacing: '0.025em', border: 'none', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: activeTab === 'ranking' ? colors.surfaceContainerLowest : 'transparent', color: activeTab === 'ranking' ? colors.primary : colors.onSurfaceVariant, boxShadow: activeTab === 'ranking' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}
          >
            Xếp hạng
          </button>
        </div>

        <section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            <div style={{ backgroundColor: colors.surfaceContainerLowest, padding: 16, borderRadius: '0.75rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: `1px solid rgba(231,189,178,0.05)` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, margin: '0 0 4px 0', fontFamily: fontBody }}>TỔNG VÀNG POINTS</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: colors.primary, margin: 0, fontFamily: fontHeadline }}>8,450</p>
            </div>
            <div style={{ backgroundColor: colors.surfaceContainerLowest, padding: 16, borderRadius: '0.75rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: `1px solid rgba(231,189,178,0.05)` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, margin: '0 0 4px 0', fontFamily: fontBody }}>HẠNG HIỆN TẠI</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: colors.onSurface, margin: 0, fontFamily: fontHeadline }}>#12</p>
            </div>
            <div style={{ backgroundColor: colors.surfaceContainerLowest, padding: 16, borderRadius: '0.75rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: `1px solid rgba(231,189,178,0.05)` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, margin: '0 0 4px 0', fontFamily: fontBody }}>NHIỆM VỤ XONG</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: colors.onSurface, margin: 0, fontFamily: fontHeadline }}>14</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 8px', marginBottom: 24 }}>
            <div>
              <span style={{ color: colors.primary, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8, fontFamily: fontBody }}>Hôm nay</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, fontFamily: fontHeadline }}>Thử thách mới</h2>
            </div>
            <span style={{ color: colors.onSurfaceVariant, fontWeight: 500, fontSize: 14, fontFamily: fontBody }}>3/5 hoàn thành</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ gridColumn: '1 / -1', position: 'relative', overflow: 'hidden', borderRadius: '1rem', backgroundColor: colors.surfaceContainerLowest, padding: 32 }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div style={{ padding: 12, backgroundColor: colors.primaryFixed, borderRadius: '9999px', color: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 24 }}>ramen_dining</span>
                  </div>
                  <span style={{ backgroundColor: 'rgba(168,57,24,0.1)', color: colors.secondary, fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: '9999px', fontFamily: fontBody }}>+500 PTS</span>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px 0', fontFamily: fontHeadline }}>Chuyên Gia Ramen</h3>
                <p style={{ color: colors.onSurfaceVariant, fontSize: 14, margin: '0 0 24px 0', lineHeight: 1.6, fontFamily: fontBody }}>Ghé thăm và đánh giá 3 quán mì Ramen bất kỳ trong tuần này.</p>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.025em', marginBottom: 8, fontFamily: fontHeadline }}>
                    <span>Tiến độ</span>
                    <span>66%</span>
                  </div>
                  <div style={{ width: '100%', height: 8, backgroundColor: colors.surfaceContainer, borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', backgroundColor: colors.primary, borderRadius: '9999px', width: '66.6%', transition: 'width 0.7s' }} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: -32, bottom: -32, opacity: 0.05 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 160 }}>restaurant</span>
              </div>
            </div>

            <div style={{ backgroundColor: colors.surfaceContainerLow, borderRadius: '1rem', padding: 24, border: `1px solid rgba(231,189,178,0.1)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '0.75rem', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>local_cafe</span>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 2px 0', fontFamily: fontHeadline }}>Sáng Tỉnh Táo</h4>
                  <span style={{ fontSize: 12, color: colors.onSurfaceVariant, fontFamily: fontBody }}>Thưởng thức Cà phê</span>
                </div>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: colors.surfaceContainer, borderRadius: '9999px', marginTop: 16 }}>
                <div style={{ height: '100%', backgroundColor: colors.secondaryContainer, borderRadius: '9999px', width: '100%' }} />
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: colors.primary, textTransform: 'uppercase', fontFamily: fontBody }}>Hoàn thành</span>
                <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: 18 }}>check_circle</span>
              </div>
            </div>

            <div style={{ backgroundColor: colors.surfaceContainerLow, borderRadius: '1rem', padding: 24, border: `1px solid rgba(231,189,178,0.1)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '0.75rem', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>bakery_dining</span>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 2px 0', fontFamily: fontHeadline }}>Vị Ngọt Ngào</h4>
                  <span style={{ fontSize: 12, color: colors.onSurfaceVariant, fontFamily: fontBody }}>Tiệm bánh thủ công</span>
                </div>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: colors.surfaceContainer, borderRadius: '9999px', marginTop: 16 }}>
                <div style={{ height: '100%', backgroundColor: 'rgba(173,44,0,0.2)', borderRadius: '9999px', width: '25%' }} />
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', fontFamily: fontBody }}>1/4 Địa điểm</span>
                <span className="material-symbols-outlined" style={{ color: colors.onSurfaceVariant, fontSize: 18 }}>hourglass_empty</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, fontFamily: fontHeadline }}>Xếp hạng tuần</h2>
            <button style={{ color: colors.primary, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontBody }}>
              Xem tất cả
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
          <div style={{ backgroundColor: colors.surfaceContainerLowest, borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {leaderboardUsers.map((user, index) => (
              <div
                key={user.rank}
                style={{ display: 'flex', alignItems: 'center', padding: 20, borderBottom: index < leaderboardUsers.length - 1 ? `1px solid ${colors.surfaceContainerLow}` : 'none' }}
              >
                <div style={{ width: 32, fontWeight: 700, fontStyle: 'italic', color: user.isTop ? colors.primary : colors.onSurfaceVariant, fontFamily: fontHeadline, fontSize: 14 }}>#{user.rank}</div>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '9999px', border: user.isTop ? `2px solid rgba(173,44,0,0.2)` : `1px solid ${colors.surfaceContainerHigh}`, padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '9999px', backgroundColor: user.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: user.avatarColor, fontWeight: 700, fontSize: 14, fontFamily: fontHeadline }}>
                      {user.initials}
                    </div>
                  </div>
                  {user.isTop && (
                    <div style={{ position: 'absolute', bottom: -4, right: -4, backgroundColor: colors.primary, color: '#ffffff', fontSize: 8, padding: '2px 4px', borderRadius: '9999px', border: '2px solid #ffffff', fontWeight: 700, fontFamily: fontBody }}>TOP</div>
                  )}
                </div>
                <div style={{ marginLeft: 16, flex: 1 }}>
                  <h4 style={{ fontWeight: 700, fontSize: 14, margin: '0 0 2px 0', fontFamily: fontHeadline }}>{user.name}</h4>
                  <span style={{ fontSize: 10, color: colors.onSurfaceVariant, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: fontBody }}>{user.title}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: user.isTop ? colors.primary : colors.onSurface, fontFamily: fontHeadline, fontSize: 15 }}>{user.points}</div>
                  <div style={{ fontSize: 10, color: colors.onSurfaceVariant, fontFamily: fontBody }}>Điểm tích lũy</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav style={{ position: 'fixed', bottom: 32, left: 0, width: '100%', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 24px' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: '9999px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '90%', paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24, boxShadow: '0 20px 40px rgba(28,27,27,0.06)', border: `1px solid rgba(235,231,231,0.2)` }}>
          <button
            onClick={() => navigate('/app')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.onSurface, width: 48, height: 48, background: 'none', border: 'none', cursor: 'pointer', borderRadius: '9999px' }}
          >
            <span className="material-symbols-outlined">explore</span>
          </button>
          <button
            onClick={() => navigate('/app/wallet')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.onSurface, width: 48, height: 48, background: 'none', border: 'none', cursor: 'pointer', borderRadius: '9999px' }}
          >
            <span className="material-symbols-outlined">toll</span>
          </button>
          <button
            onClick={() => navigate('/app/quests')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, color: '#ffffff', width: 48, height: 48, borderRadius: '9999px', border: 'none', cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </button>
          <button
            onClick={() => navigate('/app/profile')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.onSurface, width: 48, height: 48, background: 'none', border: 'none', cursor: 'pointer', borderRadius: '9999px' }}
          >
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default QuestsPage;
