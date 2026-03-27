import React from 'react';
import { useNavigate } from 'react-router-dom';

const missions = [
  {
    id: 1,
    icon: 'restaurant',
    iconColor: '#ad2c00',
    iconBg: 'rgba(173,44,0,0.12)',
    title: 'Check-in tại quán ăn',
    desc: 'Nhận ngay 200 VÀNG khi chụp ảnh món ăn.',
    progress: 2,
    total: 3,
    reward: '+200 VÀNG',
    progressColor: '#ad2c00',
  },
  {
    id: 2,
    icon: 'rate_review',
    iconColor: '#005daa',
    iconBg: 'rgba(0,93,170,0.10)',
    title: 'Đánh giá 5 sao',
    desc: 'Chia sẻ cảm nhận về đơn hàng gần nhất.',
    progress: 0,
    total: 1,
    reward: '+50 VÀNG',
    progressColor: '#005daa',
  },
  {
    id: 3,
    icon: 'emoji_events',
    iconColor: '#ad2c00',
    iconBg: 'rgba(173,44,0,0.10)',
    title: 'Hoàn thành thử thách',
    desc: 'Tham gia thử thách ẩm thực cuối tuần.',
    progress: 1,
    total: 5,
    reward: '+500 VÀNG',
    progressColor: '#ad2c00',
  },
];

const rewardCards = [
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #ff7852 0%, #ad2c00 100%)',
    emoji: '🍕',
    title: 'Voucher Pizza 4P\'s 50k',
    remaining: 12,
    cost: '5.000',
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #a8d8ea 0%, #005daa 100%)',
    emoji: '☕',
    title: 'Highland Coffee Voucher 20k',
    remaining: 45,
    cost: '2.500',
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #ffd54f 0%, #f57c00 100%)',
    emoji: '🎁',
    title: 'Khung VIP 7 ngày',
    remaining: 20,
    cost: '1.500',
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #b2dfdb 0%, #00796b 100%)',
    emoji: '🎟️',
    title: 'Vé Secret Table',
    remaining: 5,
    cost: '5.000',
  },
];

const badges = [
  { id: 1, icon: 'workspace_premium', earned: true, fill: true },
  { id: 2, icon: 'local_fire_department', earned: false, fill: false },
  { id: 3, icon: 'star', earned: false, fill: false },
  { id: 4, icon: 'military_tech', earned: false, fill: false },
];

const history = [
  { id: 1, icon: 'add_circle', iconColor: '#166534', iconBg: '#dcfce7', label: 'Hoàn thành: Ăn sáng lành mạnh', date: 'Hôm nay, 08:30', points: '+100', earn: true },
  { id: 2, icon: 'shopping_bag', iconColor: '#ad2c00', iconBg: 'rgba(173,44,0,0.10)', label: 'Đổi thưởng: Pizza 4P\'s', date: 'Hôm qua, 19:15', points: '-5.000', earn: false },
  { id: 3, icon: 'add_circle', iconColor: '#166534', iconBg: '#dcfce7', label: 'Thưởng nhiệm vụ tuần', date: '22 Thg 10, 2023', points: '+500', earn: true },
  { id: 4, icon: 'rate_review', iconColor: '#166534', iconBg: '#dcfce7', label: 'Đánh giá Bún Chả', date: '23/03', points: '+15', earn: true },
  { id: 5, icon: 'groups', iconColor: '#166534', iconBg: '#dcfce7', label: 'Mời bạn bè', date: '20/03', points: '+100', earn: true },
];

const VangDashboardPage = () => {
  const navigate = useNavigate();

  const pageStyle = {
    backgroundColor: '#fcf9f8',
    minHeight: '100dvh',
    fontFamily: "'Manrope', sans-serif",
    color: '#1c1b1b',
    paddingBottom: 120,
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    backgroundColor: '#fcf9f8',
    maxWidth: 600,
    margin: '0 auto',
  };

  const headerWrapStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: '#fcf9f8',
  };

  const headerInnerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    maxWidth: 480,
    margin: '0 auto',
  };

  const titleStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 22,
    fontWeight: 900,
    color: '#1c1b1b',
    letterSpacing: '-0.04em',
  };

  const headerActionsStyle = {
    display: 'flex',
    gap: 16,
  };

  const iconBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#1c1b1b',
    opacity: 0.6,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const mainStyle = {
    paddingTop: 88,
    paddingLeft: 24,
    paddingRight: 24,
    maxWidth: 480,
    margin: '0 auto',
  };

  const heroStyle = {
    marginBottom: 48,
    textAlign: 'center',
  };

  const balanceLabelStyle = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#5d4038',
    opacity: 0.6,
    marginBottom: 8,
  };

  const balanceRowStyle = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 8,
  };

  const balanceNumberStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 64,
    fontWeight: 800,
    letterSpacing: '-0.04em',
    color: '#1c1b1b',
    lineHeight: 1,
  };

  const balanceUnitStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 900,
    fontSize: 24,
    color: '#ad2c00',
  };

  const redeemBtnStyle = {
    marginTop: 32,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ad2c00',
    color: '#ffffff',
    border: 'none',
    borderRadius: 9999,
    padding: '16px 32px',
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 700,
    fontSize: 17,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(173,44,0,0.28)',
  };

  const sectionSpacingStyle = {
    marginBottom: 40,
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  };

  const sectionTitleStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#1c1b1b',
  };

  const seeAllStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: '#ad2c00',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  const missionsScrollStyle = {
    display: 'flex',
    gap: 16,
    overflowX: 'auto',
    paddingBottom: 16,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const missionCardStyle = {
    minWidth: 280,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(28,27,27,0.06)',
    border: '1px solid rgba(231,189,178,0.15)',
    flexShrink: 0,
  };

  const missionIconWrapStyle = (bg) => ({
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  });

  const missionTitleStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 17,
    marginBottom: 4,
    color: '#1c1b1b',
  };

  const missionDescStyle = {
    color: '#5d4038',
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 1.5,
  };

  const progressTrackStyle = {
    width: '100%',
    backgroundColor: '#ebe7e7',
    height: 6,
    borderRadius: 9999,
    overflow: 'hidden',
  };

  const progressBarStyle = (pct, color) => ({
    backgroundColor: color,
    height: '100%',
    width: `${pct}%`,
    borderRadius: 9999,
  });

  const progressMetaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8,
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#5d4038',
    opacity: 0.6,
  };

  const rewardsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  };

  const rewardCardStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(28,27,27,0.06)',
  };

  const rewardImageStyle = (gradient) => ({
    aspectRatio: '4/5',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 48,
    position: 'relative',
  });

  const rewardCostBadgeStyle = {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(8px)',
    padding: '4px 8px',
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 900,
    color: '#ad2c00',
  };

  const rewardInfoStyle = {
    padding: 14,
  };

  const rewardTitleStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 1.3,
    marginBottom: 4,
    color: '#1c1b1b',
  };

  const rewardRemainingStyle = {
    fontSize: 10,
    color: '#5d4038',
    opacity: 0.7,
  };

  const badgesSectionStyle = {
    marginTop: 24,
    backgroundColor: '#f6f3f2',
    padding: 24,
    borderRadius: 16,
  };

  const badgesHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  };

  const badgesTitleStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: '#1c1b1b',
  };

  const badgesRowStyle = {
    display: 'flex',
    gap: 16,
  };

  const badgeCircleStyle = (earned) => ({
    width: 64,
    height: 64,
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(28,27,27,0.08)',
    border: earned ? '2px solid rgba(173,44,0,0.2)' : '2px solid transparent',
    opacity: earned ? 1 : 0.3,
    filter: earned ? 'none' : 'grayscale(1)',
  });

  const historyListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 40,
  };

  const historyItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 20px',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 1px 4px rgba(28,27,27,0.05)',
  };

  const historyLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  };

  const historyIconStyle = (bg) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });

  const historyLabelStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    color: '#1c1b1b',
    marginBottom: 2,
  };

  const historyDateStyle = {
    fontSize: 11,
    color: '#5d4038',
  };

  const historyPointsStyle = (earn) => ({
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 900,
    fontSize: 13,
    color: earn ? '#166534' : '#ad2c00',
  });

  const navWrapStyle = {
    position: 'fixed',
    bottom: 24,
    left: 0,
    right: 0,
    zIndex: 50,
    display: 'flex',
    justifyContent: 'center',
  };

  const navInnerStyle = {
    width: '90%',
    maxWidth: 420,
    backgroundColor: 'rgba(252,249,248,0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: 9999,
    boxShadow: '0 20px 40px rgba(28,27,27,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 8px',
  };

  const navItemStyle = (active) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 20px',
    borderRadius: 9999,
    backgroundColor: active ? '#ffffff' : 'transparent',
    color: active ? '#ad2c00' : '#1c1b1b',
    opacity: active ? 1 : 0.4,
    cursor: 'pointer',
    border: 'none',
    gap: 2,
    transition: 'all 0.2s',
  });

  const navLabelStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 9,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginTop: 2,
  };

  return (
    <div style={pageStyle}>
      <div style={headerWrapStyle}>
        <div style={headerInnerStyle}>
          <div style={titleStyle}>VÀNG Points</div>
          <div style={headerActionsStyle}>
            <button style={iconBtnStyle}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button style={iconBtnStyle}>
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </div>

      <main style={mainStyle}>
        <section style={heroStyle}>
          <p style={balanceLabelStyle}>Số dư hiện tại</p>
          <div style={balanceRowStyle}>
            <h1 style={balanceNumberStyle}>12.450</h1>
            <span style={balanceUnitStyle}>VÀNG</span>
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
            <button style={redeemBtnStyle} onClick={() => navigate('/app/rewards')}>
              Đổi thưởng ngay
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>celebration</span>
            </button>
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <section style={sectionSpacingStyle}>
            <div style={sectionHeaderStyle}>
              <h2 style={sectionTitleStyle}>Nhiệm vụ mới</h2>
              <button style={seeAllStyle} onClick={() => navigate('/app/quests')}>Xem tất cả</button>
            </div>
            <div style={missionsScrollStyle}>
              {missions.map(m => (
                <div key={m.id} style={missionCardStyle}>
                  <div style={missionIconWrapStyle(m.iconBg)}>
                    <span className="material-symbols-outlined" style={{ color: m.iconColor }}>{m.icon}</span>
                  </div>
                  <h3 style={missionTitleStyle}>{m.title}</h3>
                  <p style={missionDescStyle}>{m.desc}</p>
                  <div style={progressTrackStyle}>
                    <div style={progressBarStyle(m.total > 0 ? (m.progress / m.total) * 100 : 0, m.progressColor)} />
                  </div>
                  <div style={progressMetaStyle}>
                    <span>{m.progress === 0 ? 'Chưa bắt đầu' : `Tiến độ ${m.progress}/${m.total}`}</span>
                    <span>{m.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={sectionSpacingStyle}>
            <h2 style={{ ...sectionTitleStyle, marginBottom: 20 }}>Kho phần thưởng</h2>
            <div style={rewardsGridStyle}>
              {rewardCards.map(r => (
                <div key={r.id} style={rewardCardStyle}>
                  <div style={rewardImageStyle(r.gradient)}>
                    <span style={{ fontSize: 52, lineHeight: 1 }}>{r.emoji}</span>
                    <div style={rewardCostBadgeStyle}>-{r.cost} VÀNG</div>
                  </div>
                  <div style={rewardInfoStyle}>
                    <h4 style={rewardTitleStyle}>{r.title}</h4>
                    <p style={rewardRemainingStyle}>Còn lại: {r.remaining}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={badgesSectionStyle}>
              <div style={badgesHeaderStyle}>
                <h3 style={badgesTitleStyle}>Huy hiệu đặc biệt</h3>
                <span className="material-symbols-outlined" style={{ color: '#5d4038', fontSize: 22 }}>military_tech</span>
              </div>
              <div style={badgesRowStyle}>
                {badges.map(b => (
                  <div key={b.id} style={badgeCircleStyle(b.earned)}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 28,
                        color: b.earned ? '#ad2c00' : '#1c1b1b',
                        fontVariationSettings: b.fill ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                      }}
                    >{b.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 style={{ ...sectionTitleStyle, marginBottom: 20 }}>Lịch sử điểm</h2>
            <div style={historyListStyle}>
              {history.map(tx => (
                <div key={tx.id} style={historyItemStyle}>
                  <div style={historyLeftStyle}>
                    <div style={historyIconStyle(tx.iconBg)}>
                      <span className="material-symbols-outlined" style={{ color: tx.iconColor, fontSize: 18 }}>{tx.icon}</span>
                    </div>
                    <div>
                      <h4 style={historyLabelStyle}>{tx.label}</h4>
                      <p style={historyDateStyle}>{tx.date}</p>
                    </div>
                  </div>
                  <div style={historyPointsStyle(tx.earn)}>{tx.points}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <nav style={navWrapStyle}>
        <div style={navInnerStyle}>
          <button style={navItemStyle(false)} onClick={() => navigate('/app')}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>home</span>
            <span style={navLabelStyle}>Khám phá</span>
          </button>
          <button style={navItemStyle(true)} onClick={() => navigate('/app/wallet')}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>account_balance_wallet</span>
            <span style={navLabelStyle}>Ví VÀNG</span>
          </button>
          <button style={navItemStyle(false)} onClick={() => navigate('/app/quests')}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>task_alt</span>
            <span style={navLabelStyle}>Nhiệm vụ</span>
          </button>
          <button style={navItemStyle(false)} onClick={() => navigate('/app/profile')}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>person</span>
            <span style={navLabelStyle}>Cá nhân</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VangDashboardPage;
