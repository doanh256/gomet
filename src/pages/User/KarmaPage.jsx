import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const quests = [
  { id: 1, name: 'Chuyên Gia Ramen', desc: 'Tìm kiếm và review tô ramen ngon nhất', reward: 800, progress: 3, total: 5, hot: true, category: 'Ẩm Thực' },
  { id: 2, name: 'Sáng Tạo', desc: 'Tạo 5 công thức mới', reward: 300, progress: 2, total: 5 },
  { id: 3, name: 'Vị Ngọt Ngào', desc: 'Thử 10 món tráng miệng', reward: 500, progress: 7, total: 10 },
  { id: 4, name: 'Thử thách Sushi 7 ngày', desc: 'Khám phá tinh hoa ẩm thực Nhật Bản trong 7 ngày', reward: 400, progress: 4, total: 7 },
  { id: 5, name: 'Coffee Explorer', desc: 'Ghé thăm 3 quán cà phê độc đáo', reward: 200, progress: 1, total: 3 },
];

const leaderboard = [
  { rank: 1, name: 'Minh A...', title: 'MASTER CHEF', vang: 45200 },
  { rank: 2, name: 'Trần H...', title: 'FOOD CRITIC', vang: 42850 },
  { rank: 3, name: 'Lê Th...', title: 'GOURMET', vang: 39400 },
  { rank: 4, name: 'Nguyễn V...', title: 'FOOD LOVER', vang: 28100 },
  { rank: 5, name: 'Phạm Q...', title: 'EXPLORER', vang: 21750 },
];

const rankMedals = { 1: '🥇', 2: '🥈', 3: '🥉' };
const rankTitleColors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };

// ─── Shared sub-components ───────────────────────────────────────────────────

function VangBadge({ amount, size = 'md' }) {
  const fontSize = size === 'lg' ? 22 : size === 'sm' ? 12 : 15;
  const iconSize = size === 'lg' ? 22 : size === 'sm' ? 14 : 16;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize, color: '#FFD700' }}>
      <span className="material-symbols-outlined filled" style={{ fontSize: iconSize, color: '#FFD700' }}>star</span>
      {amount.toLocaleString('vi-VN')}
    </span>
  );
}

function ProgressBar({ progress, total }) {
  const pct = Math.min(100, Math.round((progress / total) * 100));
  return (
    <div style={{ position: 'relative', height: 8, borderRadius: 999, backgroundColor: '#e7bdb2', overflow: 'hidden', marginTop: 8 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, borderRadius: 999, backgroundColor: '#ad2c00', transition: 'width 0.6s ease' }} />
    </div>
  );
}

// ─── Mobile view ─────────────────────────────────────────────────────────────

function MobileView({ navigate }) {
  const [activeTab, setActiveTab] = useState('nhiem-vu');
  const hotQuest = quests.find(q => q.hot);
  const otherQuests = quests.filter(q => !q.hot);

  return (
    <div style={{ flex: 1, backgroundColor: '#fcf9f8', minHeight: '100vh', overflowY: 'auto', fontFamily: 'var(--font-body)' }}>
      {/* Mobile Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 12px', backgroundColor: '#fff', borderBottom: '1px solid #e7bdb2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#ad2c00', padding: 0 }}
            aria-label="Quay lại"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
          <span className="material-symbols-outlined filled" style={{ fontSize: 26, color: '#ad2c00' }}>local_fire_department</span>
          <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800, color: '#1c1b1b', margin: 0 }}>Culinary Quests</h1>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#f0edec', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid #ad2c00' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#5d4038' }}>person</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', backgroundColor: '#fff', borderBottom: '1px solid #f0edec' }}>
        {[
          { label: 'VÀNG', value: '8,450' },
          { label: 'Xếp hạng', value: '#12' },
          { label: 'Nhiệm vụ', value: '14' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 8px', borderRight: i < 2 ? '1px solid #f0edec' : 'none' }}>
            <span style={{ fontFamily: 'var(--font-headline)', fontSize: 17, fontWeight: 800, color: '#ad2c00' }}>{stat.value}</span>
            <span style={{ fontSize: 11, color: '#5d4038', marginTop: 2 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', margin: '16px 20px 0', backgroundColor: '#f0edec', borderRadius: 999, padding: 4, gap: 4 }}>
        {[{ key: 'nhiem-vu', label: 'Nhiệm vụ' }, { key: 'xep-hang', label: 'Xếp hạng' }].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1, padding: '9px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 14,
              backgroundColor: activeTab === tab.key ? '#fff' : 'transparent',
              color: activeTab === tab.key ? '#ad2c00' : '#5d4038',
              boxShadow: activeTab === tab.key ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: '16px 20px 80px' }}>
        {activeTab === 'nhiem-vu' ? (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#5d4038', marginBottom: 12, marginTop: 4 }}>ĐANG THỰC HIỆN</p>

            {/* Featured hot quest card */}
            {hotQuest && (
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: 20, padding: '20px 18px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', backgroundColor: '#ad2c0020', transform: 'translate(30px,-30px)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ backgroundColor: '#ad2c00', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: '3px 10px', borderRadius: 999, fontFamily: 'var(--font-headline)' }}>HOT QUEST</span>
                  <span style={{ fontSize: 12, color: '#e7bdb2' }}>PHẦN THƯỞNG: {hotQuest.reward}+</span>
                </div>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{hotQuest.name}</div>
                <div style={{ fontSize: 13, color: '#e7bdb2', marginBottom: 12 }}>{hotQuest.desc}</div>
                <ProgressBar progress={hotQuest.progress} total={hotQuest.total} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: '#e7bdb2' }}>{hotQuest.progress}/{hotQuest.total} hoàn thành</span>
                  <VangBadge amount={hotQuest.reward} size="sm" />
                </div>
                <button onClick={() => navigate('/app/rewards')} style={{ width: '100%', backgroundColor: '#ad2c00', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 0', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                  Nhận Thưởng
                </button>
              </div>
            )}

            {/* Other quest cards */}
            {otherQuests.map(quest => (
              <div key={quest.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '16px', marginBottom: 12, border: '1px solid #f0edec' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 15, color: '#1c1b1b' }}>{quest.name}</div>
                    <div style={{ fontSize: 12, color: '#5d4038', marginTop: 2 }}>{quest.desc}</div>
                  </div>
                  <VangBadge amount={quest.reward} size="sm" />
                </div>
                <ProgressBar progress={quest.progress} total={quest.total} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: '#5d4038' }}>{quest.progress}/{quest.total}</span>
                  <span style={{ fontSize: 11, color: '#ad2c00', fontWeight: 600 }}>{Math.round((quest.progress / quest.total) * 100)}%</span>
                </div>
              </div>
            ))}

            {/* Leaderboard preview */}
            <div style={{ marginTop: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#5d4038', marginBottom: 12 }}>TOP THẦN ĂN</p>
              {leaderboard.slice(0, 3).map(entry => (
                <div key={entry.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 12, padding: '10px 14px', marginBottom: 8, border: '1px solid #f0edec' }}>
                  <span style={{ fontSize: 22 }}>{rankMedals[entry.rank]}</span>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#f6f3f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#5d4038' }}>person</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1c1b1b', fontFamily: 'var(--font-headline)' }}>{entry.name}</div>
                    <div style={{ fontSize: 11, color: rankTitleColors[entry.rank] || '#5d4038', fontWeight: 600 }}>{entry.title}</div>
                  </div>
                  <VangBadge amount={entry.vang} size="sm" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4, marginTop: 4 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#5d4038', margin: 0 }}>TOP THẦN ĂN</p>
              <span style={{ fontSize: 12, color: '#5d4038' }}>Bảng xếp hạng tuần 42</span>
            </div>

            {/* Top 3 large cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12, marginBottom: 16 }}>
              {leaderboard.slice(0, 3).map(entry => (
                <div key={entry.rank} style={{ backgroundColor: '#fff', borderRadius: 20, padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 14, border: `2px solid ${entry.rank === 1 ? '#FFD700' : entry.rank === 2 ? '#C0C0C0' : '#CD7F32'}`, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                  <span style={{ fontSize: 32 }}>{rankMedals[entry.rank]}</span>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#f0edec', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${rankTitleColors[entry.rank]}` }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 26, color: '#5d4038' }}>person</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: 16, color: '#1c1b1b' }}>{entry.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: rankTitleColors[entry.rank], marginBottom: 4 }}>{entry.title}</div>
                    <VangBadge amount={entry.vang} size="md" />
                  </div>
                </div>
              ))}
            </div>

            {/* Rank 4-5 smaller items */}
            {leaderboard.slice(3).map(entry => (
              <div key={entry.rank} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, border: '1px solid #f0edec' }}>
                <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: 16, color: '#5d4038', width: 24, textAlign: 'center' }}>#{entry.rank}</span>
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#f6f3f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#5d4038' }}>person</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1c1b1b' }}>{entry.name}</div>
                  <div style={{ fontSize: 11, color: '#5d4038' }}>{entry.title}</div>
                </div>
                <VangBadge amount={entry.vang} size="sm" />
              </div>
            ))}

            {/* User position */}
            <div style={{ backgroundColor: '#ad2c00', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: 18, color: '#fff' }}>#14</span>
              <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff' }}>person</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', fontFamily: 'var(--font-headline)' }}>Huy Hoàng</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Vị trí của bạn</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: 15, color: '#FFD700' }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: 16, color: '#FFD700' }}>star</span>
                12,450
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Desktop view ─────────────────────────────────────────────────────────────

function DesktopView({ navigate }) {
  const hotQuest = quests.find(q => q.hot);
  const gridQuests = quests.filter(q => !q.hot);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fcf9f8', fontFamily: 'var(--font-body)' }}>
      {/* Left sidebar */}
      <aside style={{ width: 240, minWidth: 240, backgroundColor: '#fff', borderRight: '1px solid #e7bdb2', display: 'flex', flexDirection: 'column', padding: '28px 0 24px', position: 'sticky', top: 0, height: '100vh' }}>
        {/* Brand */}
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #f0edec' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: 28, color: '#ad2c00' }}>restaurant</span>
            <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: 15, color: '#1c1b1b', lineHeight: 1.2 }}>The Curated<br />Table</span>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '20px 12px' }}>
          {[
            { icon: 'explore', label: 'Discover', active: false, path: '/app/explore' },
            { icon: 'local_fire_department', label: 'Quests', active: true, path: '/app/karma' },
            { icon: 'leaderboard', label: 'Leaderboard', active: false, path: '/app/leaderboard' },
            { icon: 'kitchen', label: 'Kitchen', active: false, path: '/app/kitchen-cards' },
            { icon: 'person', label: 'Profile', active: false, path: '/app/profile' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12, border: 'none', cursor: 'pointer', backgroundColor: item.active ? '#fff0ed' : 'transparent', color: item.active ? '#ad2c00' : '#5d4038', fontFamily: 'var(--font-headline)', fontWeight: item.active ? 700 : 500, fontSize: 14, marginBottom: 4, textAlign: 'left', transition: 'background 0.15s' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Host a Dinner CTA */}
        <div style={{ padding: '0 16px' }}>
          <button onClick={() => navigate('/app/group-dining')} style={{ width: '100%', backgroundColor: '#ad2c00', color: '#fff', border: 'none', borderRadius: 14, padding: '13px 0', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Host a Dinner
          </button>
        </div>

        {/* Stats footer */}
        <div style={{ margin: '20px 12px 0', backgroundColor: '#f6f3f2', borderRadius: 14, padding: '14px 12px' }}>
          {[
            { label: 'TỔNG HÀNG PHỔ', value: '12.4k' },
            { label: 'HẠNG', value: 'Plati...' },
            { label: 'NHIỆM VỤ HOÀN', value: '24' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < 2 ? 8 : 0 }}>
              <span style={{ fontSize: 10, color: '#5d4038', fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#ad2c00', fontFamily: 'var(--font-headline)' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Center content */}
      <main style={{ flex: 1, padding: '36px 32px 60px', overflowY: 'auto', minWidth: 0 }}>
        {/* Page heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5d4038', display: 'flex', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
          </button>
          <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 30, fontWeight: 800, color: '#1c1b1b', margin: 0 }}>Quests &amp; Rewards</h1>
        </div>
        <p style={{ fontSize: 14, color: '#5d4038', marginBottom: 28, marginLeft: 34 }}>Hoàn thành các thử thách ẩm thực để nhận phần thưởng hấp dẫn.</p>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 16, color: '#1c1b1b' }}>Nhiệm vụ Đang thực hiện</span>
          <button onClick={() => navigate('/app/quests')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ad2c00', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-headline)' }}>Xem tất cả thử thách →</button>
        </div>

        {/* Featured dark quest card */}
        {hotQuest && (
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: 24, padding: '28px 28px 24px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', backgroundColor: '#ad2c0015' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -20, width: 160, height: 160, borderRadius: '50%', backgroundColor: '#ffffff08' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, position: 'relative' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ backgroundColor: '#ad2c00', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: 1.2, padding: '4px 12px', borderRadius: 999, fontFamily: 'var(--font-headline)' }}>HOT QUEST</span>
                  <span style={{ fontSize: 12, color: '#e7bdb2' }}>NO.AI</span>
                </div>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#e7bdb2', marginBottom: 6 }}>KEY THỰC THÔNG: 5</div>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>{hotQuest.name}</div>
                <div style={{ fontSize: 14, color: '#e7bdb2', marginBottom: 16 }}>Chinh phục 5 món miền Tây đặc sắc nhất trong hành trình khám phá ẩm thực</div>
                <ProgressBar progress={hotQuest.progress} total={hotQuest.total} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 20 }}>
                  <span style={{ fontSize: 13, color: '#e7bdb2' }}>Tiến độ: {hotQuest.progress}/{hotQuest.total}</span>
                  <VangBadge amount={hotQuest.reward} size="md" />
                </div>
                <button onClick={() => navigate('/app/mission/' + hotQuest.id)} style={{ backgroundColor: '#ad2c00', color: '#fff', border: 'none', borderRadius: 14, padding: '13px 28px', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                  Tiếp tục hành trình
                </button>
              </div>
              <div style={{ width: 120, height: 120, borderRadius: 20, backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: 56, color: '#ad2c00' }}>ramen_dining</span>
              </div>
            </div>
          </div>
        )}

        {/* 2-column grid for other quests */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {gridQuests.slice(0, 2).map(quest => (
            <div key={quest.id} style={{ backgroundColor: '#fff', borderRadius: 20, padding: '20px', border: '1px solid #f0edec', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff0ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined filled" style={{ fontSize: 24, color: '#ad2c00' }}>
                    {quest.id === 4 ? 'set_meal' : 'local_cafe'}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 15, color: '#1c1b1b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{quest.name}</div>
                  <div style={{ fontSize: 12, color: '#5d4038', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{quest.desc}</div>
                </div>
              </div>
              <ProgressBar progress={quest.progress} total={quest.total} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <span style={{ fontSize: 12, color: '#5d4038' }}>{quest.progress}/{quest.total}</span>
                <VangBadge amount={quest.reward} size="sm" />
              </div>
              <button onClick={() => navigate('/app/mission/' + quest.id)} style={{ width: '100%', marginTop: 14, backgroundColor: '#fff0ed', color: '#ad2c00', border: '1px solid #e7bdb2', borderRadius: 10, padding: '10px 0', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Tiếp tục
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Right sidebar — Leaderboard */}
      <aside style={{ width: 280, minWidth: 280, backgroundColor: '#fff', borderLeft: '1px solid #e7bdb2', padding: '36px 20px 60px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="material-symbols-outlined filled" style={{ fontSize: 22, color: '#ad2c00' }}>leaderboard</span>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 800, color: '#1c1b1b', margin: 0 }}>Top Thần Ăn</h2>
        </div>
        <p style={{ fontSize: 12, color: '#5d4038', marginBottom: 20 }}>Bảng xếp hạng tuần 42</p>

        {leaderboard.map(entry => (
          <div key={entry.rank} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 12, marginBottom: 8, backgroundColor: '#f6f3f2', border: '1px solid transparent' }}>
            <span style={{ fontSize: entry.rank <= 3 ? 22 : 14, minWidth: 28, textAlign: 'center', fontFamily: 'var(--font-headline)', fontWeight: 800, color: '#5d4038' }}>
              {entry.rank <= 3 ? rankMedals[entry.rank] : `#${entry.rank}`}
            </span>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#f0edec', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#5d4038' }}>person</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#1c1b1b', fontFamily: 'var(--font-headline)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.name}</div>
              {entry.title && <div style={{ fontSize: 10, fontWeight: 700, color: rankTitleColors[entry.rank] || '#5d4038', letterSpacing: 0.5 }}>{entry.title}</div>}
            </div>
            <VangBadge amount={entry.vang} size="sm" />
          </div>
        ))}

        {/* User position */}
        <div style={{ backgroundColor: '#ad2c00', borderRadius: 14, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: 15, color: '#fff', minWidth: 28 }}>#14</span>
          <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#fff' }}>person</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#fff', fontFamily: 'var(--font-headline)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Huy Hoàng</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>Vị trí của bạn</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: 13, color: '#FFD700' }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: 14, color: '#FFD700' }}>star</span>
            12,450
          </span>
        </div>
      </aside>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const KarmaPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return isMobile ? <MobileView navigate={navigate} /> : <DesktopView navigate={navigate} />;
};

export default KarmaPage;
