import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const topThree = [
  { rank: 1, name: 'Minh Anh', points: 8420, avatar: 'MA' },
  { rank: 2, name: 'Hoang Nam', points: 7150, avatar: 'HN' },
  { rank: 3, name: 'Thu Trang', points: 6830, avatar: 'TT' },
];

const rankings = [
  { rank: 4, name: 'Duc Huy', points: 6200, avatar: 'DH', trend: 'up' },
  { rank: 5, name: 'Ngoc Lan', points: 5980, avatar: 'NL', trend: 'up' },
  { rank: 6, name: 'Quang Minh', points: 5740, avatar: 'QM', trend: 'down' },
  { rank: 7, name: 'Phuong Linh', points: 5510, avatar: 'PL', trend: 'flat' },
  { rank: 8, name: 'Thanh Son', points: 5320, avatar: 'TS', trend: 'up' },
  { rank: 9, name: 'Ha My', points: 5100, avatar: 'HM', trend: 'down' },
  { rank: 10, name: 'Tuan Kiet', points: 4880, avatar: 'TK', trend: 'flat' },
  { rank: 11, name: 'Bao Ngoc', points: 4650, avatar: 'BN', trend: 'up' },
  { rank: 12, name: 'Anh Tuan', points: 4430, avatar: 'AT', trend: 'down' },
  { rank: 13, name: 'Kim Ngan', points: 4200, avatar: 'KN', trend: 'up' },
  { rank: 14, name: 'Van Dat', points: 3980, avatar: 'VD', trend: 'flat' },
  { rank: 15, name: 'Thuy Linh', points: 3760, avatar: 'TL', trend: 'up' },
  { rank: 16, name: 'Hong Phuc', points: 3540, avatar: 'HP', trend: 'down' },
  { rank: 17, name: 'Duy Khang', points: 3320, avatar: 'DK', trend: 'flat' },
  { rank: 18, name: 'Mai Huong', points: 3100, avatar: 'MH', trend: 'up' },
  { rank: 19, name: 'Xuan Truong', points: 2880, avatar: 'XT', trend: 'down' },
  { rank: 20, name: 'Yen Nhi', points: 2650, avatar: 'YN', trend: 'up' },
];

const filters = ['Tuan nay', 'Thang nay', 'Tat ca'];

const rankColors = { 1: '#FFD54F', 2: '#9ca3af', 3: '#FF571A' };

const trendConfig = {
  up: { icon: 'trending_up', color: '#117500' },
  down: { icon: 'trending_down', color: '#FF571A' },
  flat: { icon: 'trending_flat', color: '#9ca3af' },
};

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#FDF9F3',
      overflowY: 'auto',
      padding: '40px 24px 100px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 24,
    },
    headerIcon: {
      fontSize: 48,
      color: '#b83500',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#393834',
    },
    chips: {
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
      marginBottom: 28,
    },
    chip: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      padding: '8px 18px',
      borderRadius: '9999px',
      border: 'none',
      backgroundColor: '#EBE8E0',
      color: '#666460',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    chipActive: {
      backgroundColor: '#b83500',
      color: '#fff',
    },
    podium: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 16,
      marginBottom: 32,
      padding: '0 8px',
    },
    podiumItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    },
    avatarWrap: {
      position: 'relative',
    },
    avatar: {
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      color: '#fff',
    },
    rankBadge: {
      position: 'absolute',
      bottom: -6,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 22,
      height: 22,
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 11,
      fontWeight: 800,
      color: '#fff',
      border: 'none',
    },
    podiumName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: '#393834',
      textAlign: 'center',
    },
    podiumPts: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#666460',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginBottom: 24,
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      backgroundColor: '#ffffff',
      borderRadius: '1.5rem',
      padding: '12px 16px',
      transition: 'background 0.15s',
      cursor: 'default',
    },
    rowRank: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#666460',
      width: 24,
      textAlign: 'center',
      flexShrink: 0,
    },
    rowAvatar: {
      width: 40,
      height: 40,
      borderRadius: '9999px',
      backgroundColor: '#F7F3EC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: '#666460',
      flexShrink: 0,
    },
    rowName: {
      flex: 1,
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: '#393834',
    },
    rowPts: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#666460',
      marginRight: 8,
    },
    sticky: {
      position: 'fixed',
      bottom: 70,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: 552,
      backgroundColor: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.1)',
      zIndex: 10,
    },
    stickyRank: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 800,
      color: '#b83500',
    },
    stickyAvatar: {
      width: 44,
      height: 44,
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FF571A, #b83500)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: '#3A0B00',
      flexShrink: 0,
    },
    stickyInfo: {
      flex: 1,
    },
    stickyName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: '#393834',
    },
    stickyTrend: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#117500',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginTop: 2,
    },
    stickyPts: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: '#b83500',
    },
  };

  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>leaderboard</span>
        <h1 style={s.heading}>Bang xep hang</h1>
      </div>

      <div style={s.chips}>
        {filters.map((f, i) => (
          <button
            key={f}
            style={{...s.chip, ...(activeFilter === i ? s.chipActive : {})}}
            onClick={() => setActiveFilter(i)}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={s.podium}>
        {podiumOrder.map(p => {
          const isFirst = p.rank === 1;
          const size = isFirst ? 80 : 60;
          const fontSize = isFirst ? 20 : 16;
          return (
            <div key={p.rank} style={{...s.podiumItem, marginBottom: isFirst ? 16 : 0}}>
              <div style={s.avatarWrap}>
                <div style={{
                  ...s.avatar,
                  width: size,
                  height: size,
                  fontSize,
                  backgroundColor: rankColors[p.rank],
                  boxShadow: isFirst ? '0 8px 24px rgba(255,213,79,0.3)' : 'none',
                }}>
                  {p.avatar}
                </div>
                <div style={{...s.rankBadge, backgroundColor: rankColors[p.rank]}}>
                  {p.rank}
                </div>
              </div>
              <div style={s.podiumName}>{p.name}</div>
              <div style={s.podiumPts}>{p.points.toLocaleString()} pts</div>
            </div>
          );
        })}
      </div>

      <div style={s.list}>
        {rankings.map(r => {
          const t = trendConfig[r.trend];
          return (
            <div key={r.rank} style={s.row}>
              <div style={s.rowRank}>{r.rank}</div>
              <div style={s.rowAvatar}>{r.avatar}</div>
              <div style={s.rowName}>{r.name}</div>
              <div style={s.rowPts}>{r.points.toLocaleString()}</div>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: t.color }}>{t.icon}</span>
            </div>
          );
        })}
      </div>

      <div style={s.sticky}>
        <div style={s.stickyRank}>#42</div>
        <div style={s.stickyAvatar}>BD</div>
        <div style={s.stickyInfo}>
          <div style={s.stickyName}>Ban (Doanh)</div>
          <div style={s.stickyTrend}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#117500' }}>trending_up</span>
            Tang 5 bac so voi tuan truoc
          </div>
        </div>
        <div style={s.stickyPts}>1,250</div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
