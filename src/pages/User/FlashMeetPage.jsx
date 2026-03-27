import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Data ────────────────────────────────────────────────────────────────────

const ongoingEvents = [
  {
    id: 1,
    name: 'Saigon Soul Kitchen',
    time: '19:50',
    location: 'Quận 1',
    distance: '0.8km',
    spots: 'Còn 2 chỗ',
    spotsColor: '#2e7d32',
    avatars: ['L', 'M'],
    gradient: 'linear-gradient(160deg, #1a0800 0%, #5a1e00 100%)',
    emoji: '🍜',
  },
  {
    id: 2,
    name: 'Izakaya Ten',
    time: '20:15',
    location: 'Little Tokyo',
    distance: '2.4km',
    spots: 'Chỗ cuối cùng',
    spotsColor: '#c62828',
    avatars: ['T'],
    gradient: 'linear-gradient(160deg, #001a2e 0%, #003a5a 100%)',
    emoji: '🍱',
  },
];

const groups = [
  {
    id: 1,
    name: 'Chuyến săn súp Chủ nhật',
    places: 4,
    visa: 5,
    members: 6,
    maxMembers: 10,
    emoji: '🍲',
  },
  {
    id: 2,
    name: 'Yum Cha Garden',
    places: 1,
    visa: 2,
    members: 3,
    maxMembers: 4,
    emoji: '🫖',
  },
];

const foodTypeTags = [
  'Món nước & lẩu',
  'Ẩm thực đường phố',
  'Ẩm thực Cao cấp',
  'Tráng miệng',
];

// ─── Component ───────────────────────────────────────────────────────────────

const FlashMeetPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState('flash-meet');
  const [showBanner, setShowBanner] = useState(true);
  const [distanceKm, setDistanceKm] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['Món nước & lẩu']);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return isMobile ? (
    <MobileLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      showBanner={showBanner}
      setShowBanner={setShowBanner}
      navigate={navigate}
    />
  ) : (
    <DesktopLayout
      distanceKm={distanceKm}
      setDistanceKm={setDistanceKm}
      selectedTags={selectedTags}
      toggleTag={toggleTag}
      navigate={navigate}
    />
  );
};

// ─── Desktop Layout ───────────────────────────────────────────────────────────

const DesktopLayout = ({ distanceKm, setDistanceKm, selectedTags, toggleTag, navigate }) => {
  return (
    <div style={ds.root}>
      <style>{globalStyles}</style>

      {/* Main content area */}
      <main style={ds.main}>

        {/* Hero heading */}
        <section style={ds.heroSection}>
          <h1 style={ds.heroTitle}>Flash Meet</h1>
          <p style={ds.heroSubtitle}>
            Trải nghiệm ẩm thực ngẫu hứng cùng những người chung sở thích.
            Hoàn thành bộ sưu tập Visa Món ăn của bạn ngay hôm nay.
          </p>
        </section>

        {/* Stats bar */}
        <div style={ds.statsBar}>
          <div style={ds.statItem}>
            <span className="material-symbols-outlined" aria-hidden="true" style={ds.statIcon}>collections_bookmark</span>
            <span style={ds.statLabel}>24/50 Visa Món nước đã thu thập</span>
          </div>
          <div style={ds.statDivider} />
          <div style={ds.statItem}>
            <span className="material-symbols-outlined" aria-hidden="true" style={ds.statIcon}>event_available</span>
            <span style={ds.statLabel}>3 buổi hẹn trong khu vực của bạn hôm nay</span>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={ds.columns}>

          {/* Left column */}
          <div style={ds.leftCol}>

            {/* Blind Soup Date card */}
            <div style={ds.blindSoupCard}>
              <div style={ds.blindSoupBadge}>FLASH MEET ĐỘC QUYỀN</div>
              <h2 style={ds.blindSoupTitle}>Blind Soup Date</h2>
              <p style={ds.blindSoupDesc}>
                Ghép đôi ngẫu nhiên với người lạ cùng sở thích ẩm thực.
                Địa điểm chỉ được tiết lộ sau khi khớp thành công.
              </p>
              <div style={ds.blindSoupMeta}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 16, opacity: 0.8 }}>timer</span>
                <span style={{ fontSize: 13, opacity: 0.85 }}>Bắt đầu lúc 20:00 hôm nay</span>
              </div>
              <button style={ds.blindSoupBtn} onClick={() => navigate("/app/blind-soup-date")}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18 }}>shuffle</span>
                Tham gia Ghép đôi
              </button>
            </div>

            {/* Advanced filter card */}
            <div style={ds.filterCard}>
              <h3 style={ds.filterTitle}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 20, color: 'var(--primary)' }}>tune</span>
                Bộ lọc nâng cao
              </h3>

              <div style={ds.filterSection}>
                <div style={ds.filterLabel}>
                  Khoảng cách
                  <span style={ds.filterValue}>{distanceKm} km</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  style={ds.rangeSlider}
                  aria-label="Khoảng cách tối đa"
                />
                <div style={ds.rangeLabels}>
                  <span>1 km</span>
                  <span>20 km</span>
                </div>
              </div>

              <div style={ds.filterSection}>
                <div style={ds.filterLabel}>Loại món ăn</div>
                <div style={ds.tagsList}>
                  {foodTypeTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      style={{
                        ...ds.tag,
                        ...(selectedTags.includes(tag) ? ds.tagActive : {}),
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button style={ds.applyBtn} onClick={() => {}}>Áp dụng bộ lọc</button>
            </div>
          </div>

          {/* Right column */}
          <div style={ds.rightCol}>

            {/* Đang diễn ra section */}
            <div style={ds.sectionHeader}>
              <h2 style={ds.sectionTitle}>Đang diễn ra</h2>
              <button style={ds.seeAllBtn} onClick={() => navigate("/app/group-dining")}>Xem tất cả</button>
            </div>

            <div style={ds.ongoingGrid}>
              {ongoingEvents.map((ev) => (
                <div key={ev.id} style={ds.eventCard}>
                  {/* Food photo area */}
                  <div style={{ ...ds.eventPhoto, background: ev.gradient }}>
                    <span style={ds.eventEmoji}>{ev.emoji}</span>
                    <div style={ds.eventTimeBadge}>{ev.time}</div>
                  </div>
                  {/* Card body */}
                  <div style={ds.eventBody}>
                    <div style={ds.eventName}>{ev.name}</div>
                    <div style={ds.eventLocation}>
                      <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>location_on</span>
                      <span style={ds.eventLocationText}>{ev.location}, {ev.distance}</span>
                    </div>
                    <div style={ds.eventFooter}>
                      <div style={ds.avatarRow}>
                        {ev.avatars.map((a, i) => (
                          <div key={i} style={{ ...ds.miniAvatar, marginLeft: i === 0 ? 0 : -6 }}>{a}</div>
                        ))}
                        <span style={{ ...ds.spotsLabel, color: ev.spotsColor }}>{ev.spots}</span>
                      </div>
                      <button style={ds.joinEventBtn} onClick={() => navigate("/app/event/" + ev.id)}>Tham gia</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ăn theo nhóm section */}
            <div style={{ ...ds.sectionHeader, marginTop: 32 }}>
              <h2 style={ds.sectionTitle}>Ăn theo nhóm</h2>
              <button style={ds.createGroupBtn} onClick={() => navigate("/app/group-dining")}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 16 }}>add</span>
                Tạo nhóm
              </button>
            </div>

            <div style={ds.groupsList}>
              {groups.map((g) => (
                <div key={g.id} style={ds.groupCard}>
                  <div style={ds.groupEmoji}>{g.emoji}</div>
                  <div style={ds.groupInfo}>
                    <div style={ds.groupName}>{g.name}</div>
                    <div style={ds.groupMeta}>
                      <span>{g.places} địa điểm</span>
                      <span style={ds.dot}>·</span>
                      <span>{g.visa} visa</span>
                      <span style={ds.dot}>·</span>
                      <span>{g.members}/{g.maxMembers} thành viên</span>
                    </div>
                    <div style={ds.groupProgress}>
                      <div style={{ ...ds.groupProgressBar, width: `${(g.members / g.maxMembers) * 100}%` }} />
                    </div>
                  </div>
                  <button style={ds.joinGroupBtn} onClick={() => navigate("/app/group-chat/" + g.id)}>Tham gia</button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// ─── Mobile Layout ────────────────────────────────────────────────────────────

const MobileLayout = ({ activeTab, setActiveTab, showBanner, setShowBanner, navigate }) => {
  return (
    <div style={ms.root}>
      <style>{globalStyles}</style>

      {/* Tab bar */}
      <div style={ms.tabBar}>
        {[
          { key: 'flash-meet', label: 'Flash Meet' },
          { key: 'blind-soup', label: 'Blind Soup Date' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...ms.tab,
              ...(activeTab === tab.key ? ms.tabActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={ms.content}>

        {/* Blind Soup Date banner */}
        {showBanner && (
          <div style={ms.banner}>
            <div style={ms.bannerLeft}>
              <div style={ms.bannerBadge}>FLASH MEET</div>
              <div style={ms.bannerTitle}>Blind Soup Date</div>
              <div style={ms.bannerDesc}>Ghép đôi ngẫu nhiên cùng bạn mới</div>
            </div>
            <button
              style={ms.bannerClose}
              onClick={() => setShowBanner(false)}
              aria-label="Đóng thông báo"
            >
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 20 }}>close</span>
            </button>
          </div>
        )}

        {/* Đang diễn ra gần đây */}
        <div style={ms.sectionHeader}>
          <h2 style={ms.sectionTitle}>Đang diễn ra gần đây</h2>
          <button style={ms.seeAllBtn} onClick={() => navigate("/app/group-dining")}>Xem tất cả</button>
        </div>

        {/* Food cards */}
        <div style={ms.cardsList}>

          {/* Card 1 — Pho / Miso */}
          <div style={ms.foodCard}>
            <div style={{ ...ms.foodPhoto, background: 'linear-gradient(160deg, #1a0800 0%, #5a1e00 100%)' }}>
              <span style={ms.foodEmoji}>🍜</span>
              <div style={ms.urgentBadge}>ĐẶT BÀN NGAY 5 PHÚT</div>
            </div>
            <div style={ms.cardBody}>
              <div style={ms.cardName}>Đêm Miso Cay nóng</div>
              <div style={ms.cardLocation}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>location_on</span>
                <span style={ms.cardLocationText}>Quận 1 · 0.8 km</span>
              </div>
              <div style={ms.cardFooter}>
                <div style={ms.avatarRow}>
                  {['L', 'M'].map((a, i) => (
                    <div key={i} style={{ ...ms.miniAvatar, marginLeft: i === 0 ? 0 : -6 }}>{a}</div>
                  ))}
                  <span style={ms.spotsLabel}>+2 đang tham gia</span>
                </div>
                <button style={ms.joinBtn} onClick={() => navigate("/app/flash-meet")}>Tham gia ngay</button>
              </div>
            </div>
          </div>

          {/* Card 2 — Pasta */}
          <div style={ms.foodCard}>
            <div style={{ ...ms.foodPhoto, background: 'linear-gradient(160deg, #1a0a00 0%, #4a2000 100%)' }}>
              <span style={ms.foodEmoji}>🍝</span>
            </div>
            <div style={ms.cardBody}>
              <div style={ms.cardName}>Bữa trưa đậm chất Ý</div>
              <div style={ms.cardLocation}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>location_on</span>
                <span style={ms.cardLocationText}>Quận 3 · 1.5 km</span>
              </div>
              <div style={ms.cardFooter}>
                <div style={ms.avatarRow}>
                  {['A', 'B', 'C'].map((a, i) => (
                    <div key={i} style={{ ...ms.miniAvatar, marginLeft: i === 0 ? 0 : -6 }}>{a}</div>
                  ))}
                  <span style={ms.spotsLabel}>Còn 3 chỗ</span>
                </div>
                <button style={ms.joinBtn} onClick={() => navigate("/app/flash-meet")}>Tham gia ngay</button>
              </div>
            </div>
          </div>

        </div>

        {/* Ăn theo nhóm */}
        <div style={{ ...ms.sectionHeader, marginTop: 8 }}>
          <h2 style={ms.sectionTitle}>Ăn theo nhóm</h2>
          <button style={ms.createGroupBtn} onClick={() => navigate("/app/group-dining")}>
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 16 }}>add</span>
            Tạo nhóm
          </button>
        </div>

        <div style={ms.groupsList}>
          {groups.map((g) => (
            <div key={g.id} style={ms.groupCard}>
              <div style={ms.groupEmoji}>{g.emoji}</div>
              <div style={ms.groupInfo}>
                <div style={ms.groupName}>{g.name}</div>
                <div style={ms.groupMeta}>
                  {g.places} địa điểm · {g.visa} visa · {g.members}/{g.maxMembers}
                </div>
                <div style={ms.groupProgress}>
                  <div style={{ ...ms.groupProgressBar, width: `${(g.members / g.maxMembers) * 100}%` }} />
                </div>
              </div>
              <button style={ms.joinGroupBtn} onClick={() => navigate("/app/group-chat/" + g.id)}>Tham gia</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// ─── Global Styles ─────────────────────────────────────────────────────────────

const globalStyles = `
  @keyframes gomet-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
  input[type=range].gomet-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: var(--outline-variant, #e7bdb2);
    outline: none;
    cursor: pointer;
  }
  input[type=range].gomet-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary, #ad2c00);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(173,44,0,0.35);
  }
`;

// ─── Desktop Styles ────────────────────────────────────────────────────────────

const ds = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#fcf9f8',
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    color: '#1c1b1b',
  },
  main: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '40px 48px 80px',
  },
  heroSection: {
    marginBottom: 32,
  },
  heroTitle: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 56,
    fontWeight: 800,
    color: '#1c1b1b',
    lineHeight: 1.1,
    marginBottom: 16,
    margin: '0 0 16px 0',
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 17,
    color: '#5d4038',
    lineHeight: 1.6,
    maxWidth: 600,
    margin: 0,
  },
  statsBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    backgroundColor: 'white',
    border: '1px solid #e7bdb2',
    borderRadius: 16,
    padding: '16px 24px',
    marginBottom: 36,
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  statIcon: {
    fontSize: 20,
    color: 'var(--primary, #ad2c00)',
  },
  statLabel: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 14,
    fontWeight: 600,
    color: '#1c1b1b',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e7bdb2',
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '360px 1fr',
    gap: 32,
    alignItems: 'start',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  blindSoupCard: {
    backgroundColor: '#6b1a0a',
    borderRadius: 20,
    padding: 28,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  blindSoupBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 9999,
    padding: '4px 12px',
    fontSize: 11,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  blindSoupTitle: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 28,
    fontWeight: 800,
    margin: '0 0 12px 0',
    lineHeight: 1.2,
  },
  blindSoupDesc: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 14,
    lineHeight: 1.6,
    opacity: 0.9,
    marginBottom: 16,
  },
  blindSoupMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
    color: 'rgba(255,255,255,0.85)',
  },
  blindSoupBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'white',
    color: '#6b1a0a',
    border: 'none',
    borderRadius: 9999,
    padding: '14px 20px',
    fontSize: 15,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
  },
  filterCard: {
    backgroundColor: 'white',
    border: '1px solid #e7bdb2',
    borderRadius: 20,
    padding: 24,
  },
  filterTitle: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 16,
    fontWeight: 700,
    color: '#1c1b1b',
    margin: '0 0 20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 13,
    fontWeight: 600,
    color: '#5d4038',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterValue: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontWeight: 700,
    color: 'var(--primary, #ad2c00)',
  },
  rangeSlider: {
    width: '100%',
    cursor: 'pointer',
  },
  rangeLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    color: '#5d4038',
    marginTop: 4,
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
  },
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    padding: '7px 14px',
    borderRadius: 9999,
    border: '1px solid #e7bdb2',
    backgroundColor: '#f6f3f2',
    color: '#5d4038',
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  tagActive: {
    backgroundColor: 'var(--primary, #ad2c00)',
    borderColor: 'var(--primary, #ad2c00)',
    color: 'white',
    fontWeight: 600,
  },
  applyBtn: {
    width: '100%',
    backgroundColor: 'var(--primary, #ad2c00)',
    color: 'white',
    border: 'none',
    borderRadius: 9999,
    padding: '12px 20px',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
    marginTop: 4,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 20,
    fontWeight: 700,
    color: '#1c1b1b',
    margin: 0,
  },
  seeAllBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary, #ad2c00)',
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '4px 0',
  },
  ongoingGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    border: '1px solid #e7bdb2',
    borderRadius: 20,
    overflow: 'hidden',
  },
  eventPhoto: {
    height: 160,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventEmoji: {
    fontSize: 56,
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
  },
  eventTimeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    color: 'white',
    borderRadius: 8,
    padding: '4px 10px',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    backdropFilter: 'blur(4px)',
  },
  eventBody: {
    padding: '14px 16px 16px',
  },
  eventName: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 16,
    fontWeight: 700,
    color: '#1c1b1b',
    marginBottom: 6,
  },
  eventLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  eventLocationText: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 13,
    color: '#5d4038',
  },
  eventFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  miniAvatar: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    backgroundColor: '#f0edec',
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#5d4038',
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
  },
  spotsLabel: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    marginLeft: 4,
  },
  joinEventBtn: {
    backgroundColor: 'var(--primary, #ad2c00)',
    color: 'white',
    border: 'none',
    borderRadius: 9999,
    padding: '7px 16px',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
  },
  createGroupBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'var(--primary, #ad2c00)',
    color: 'white',
    border: 'none',
    borderRadius: 9999,
    padding: '8px 16px',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
  },
  groupsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  groupCard: {
    backgroundColor: 'white',
    border: '1px solid #e7bdb2',
    borderRadius: 16,
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  groupEmoji: {
    fontSize: 32,
    flexShrink: 0,
  },
  groupInfo: {
    flex: 1,
    minWidth: 0,
  },
  groupName: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 15,
    fontWeight: 700,
    color: '#1c1b1b',
    marginBottom: 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  groupMeta: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 13,
    color: '#5d4038',
    marginBottom: 8,
  },
  dot: {
    margin: '0 4px',
    opacity: 0.5,
  },
  groupProgress: {
    height: 4,
    backgroundColor: '#f0edec',
    borderRadius: 2,
    overflow: 'hidden',
  },
  groupProgressBar: {
    height: '100%',
    backgroundColor: 'var(--primary, #ad2c00)',
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  joinGroupBtn: {
    flexShrink: 0,
    backgroundColor: 'transparent',
    color: 'var(--primary, #ad2c00)',
    border: '1.5px solid var(--primary, #ad2c00)',
    borderRadius: 9999,
    padding: '7px 18px',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
  },
};

// ─── Mobile Styles ─────────────────────────────────────────────────────────────

const ms = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#fcf9f8',
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    color: '#1c1b1b',
    display: 'flex',
    flexDirection: 'column',
  },
  tabBar: {
    display: 'flex',
    backgroundColor: 'white',
    borderBottom: '1px solid #e7bdb2',
    padding: '0 20px',
  },
  tab: {
    flex: 1,
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '14px 8px',
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 14,
    fontWeight: 500,
    color: '#5d4038',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'color 0.15s, border-color 0.15s',
  },
  tabActive: {
    color: 'var(--primary, #ad2c00)',
    fontWeight: 700,
    borderBottomColor: 'var(--primary, #ad2c00)',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 16px 80px',
  },
  banner: {
    backgroundColor: '#6b1a0a',
    borderRadius: 16,
    padding: '18px 20px',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    color: 'white',
  },
  bannerLeft: {
    flex: 1,
  },
  bannerBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 9999,
    padding: '2px 10px',
    fontSize: 10,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  bannerTitle: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 4,
  },
  bannerDesc: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 14,
    opacity: 0.9,
  },
  bannerClose: {
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    borderRadius: '50%',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: -2,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 17,
    fontWeight: 700,
    color: '#1c1b1b',
    margin: 0,
  },
  seeAllBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary, #ad2c00)',
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '4px 0',
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    marginBottom: 24,
  },
  foodCard: {
    backgroundColor: 'white',
    border: '1px solid #e7bdb2',
    borderRadius: 20,
    overflow: 'hidden',
  },
  foodPhoto: {
    height: 180,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodEmoji: {
    fontSize: 72,
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
  },
  urgentBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'var(--primary, #ad2c00)',
    color: 'white',
    borderRadius: 8,
    padding: '5px 12px',
    fontSize: 11,
    fontWeight: 800,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    letterSpacing: 0.5,
  },
  cardBody: {
    padding: '14px 16px 16px',
  },
  cardName: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 17,
    fontWeight: 700,
    color: '#1c1b1b',
    marginBottom: 6,
  },
  cardLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  cardLocationText: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 13,
    color: '#5d4038',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  miniAvatar: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    backgroundColor: '#f0edec',
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#5d4038',
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
  },
  spotsLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#5d4038',
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    marginLeft: 4,
  },
  joinBtn: {
    backgroundColor: 'var(--primary, #ad2c00)',
    color: 'white',
    border: 'none',
    borderRadius: 9999,
    padding: '9px 20px',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
  },
  createGroupBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'var(--primary, #ad2c00)',
    color: 'white',
    border: 'none',
    borderRadius: 9999,
    padding: '7px 14px',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
  },
  groupsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  groupCard: {
    backgroundColor: 'white',
    border: '1px solid #e7bdb2',
    borderRadius: 16,
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  groupEmoji: {
    fontSize: 28,
    flexShrink: 0,
  },
  groupInfo: {
    flex: 1,
    minWidth: 0,
  },
  groupName: {
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    fontSize: 14,
    fontWeight: 700,
    color: '#1c1b1b',
    marginBottom: 3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  groupMeta: {
    fontFamily: 'var(--font-body, Manrope, sans-serif)',
    fontSize: 12,
    color: '#5d4038',
    marginBottom: 7,
  },
  groupProgress: {
    height: 4,
    backgroundColor: '#f0edec',
    borderRadius: 2,
    overflow: 'hidden',
  },
  groupProgressBar: {
    height: '100%',
    backgroundColor: 'var(--primary, #ad2c00)',
    borderRadius: 2,
  },
  joinGroupBtn: {
    flexShrink: 0,
    backgroundColor: 'transparent',
    color: 'var(--primary, #ad2c00)',
    border: '1.5px solid var(--primary, #ad2c00)',
    borderRadius: 9999,
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
    cursor: 'pointer',
  },
};

export default FlashMeetPage;
