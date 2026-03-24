import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const trendingTags = ['#PhoHaNoi', '#BanhMiSaiGon', '#CaPheViet', '#StreetFood', '#BunBoHue', '#ComTam'];

const moments = [
  {
    id: 1,
    user: 'Linh Chi',
    avatar: '👩',
    tier: 'Vang',
    caption: 'Pho bo truyen thong Ha Noi, nuoc dung ninh xuong 12 tieng thom nuc mui...',
    dish: 'Pho Bo',
    restaurant: 'Pho Thin Lo Duc',
    likes: 1243,
    comments: 89,
    time: '2 gio truoc',
    gradient: 'linear-gradient(135deg, #FFB59E, #FF571A)',
    emoji: '🍜',
  },
  {
    id: 2,
    user: 'Duc Minh',
    avatar: '👨',
    tier: 'Vang',
    caption: 'Banh mi Sai Gon gion rum, nhan dac biet voi pa-te va thit nguoi...',
    dish: 'Banh Mi',
    restaurant: 'Banh Mi Huynh Hoa',
    likes: 987,
    comments: 56,
    time: '4 gio truoc',
    gradient: 'linear-gradient(135deg, #FFD54F, #FF8F00)',
    emoji: '🥖',
  },
  {
    id: 3,
    user: 'Thu Ha',
    avatar: '👩',
    tier: 'Vang',
    caption: 'Ca phe trung Ha Noi, beo ngay thom nong, ngoi ngam pho co chieu dong...',
    dish: 'Ca Phe Trung',
    restaurant: 'Cafe Giang',
    likes: 2105,
    comments: 134,
    time: '5 gio truoc',
    gradient: 'linear-gradient(135deg, #8D6E63, #4E342E)',
    emoji: '☕',
  },
  {
    id: 4,
    user: 'Hoang Nam',
    avatar: '👨',
    tier: 'Vang',
    caption: 'Bun bo Hue cay nong dam da, thit bo mem, gia vi hue dac trung...',
    dish: 'Bun Bo Hue',
    restaurant: 'Bun Bo Ba Tuyet',
    likes: 756,
    comments: 42,
    time: '7 gio truoc',
    gradient: 'linear-gradient(135deg, #EF5350, #B71C1C)',
    emoji: '🌶️',
  },
  {
    id: 5,
    user: 'Mai Phuong',
    avatar: '👩',
    tier: 'Vang',
    caption: 'Com tam suon bi cha Sai Gon, hat com tam deo vua, suon nuong thom lung...',
    dish: 'Com Tam',
    restaurant: 'Com Tam Ba Ghien',
    likes: 1567,
    comments: 98,
    time: '9 gio truoc',
    gradient: 'linear-gradient(135deg, #FFA726, #E65100)',
    emoji: '🍚',
  },
];

const MomentsPage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});

  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSave = (id) => setSaved(prev => ({ ...prev, [id]: !prev[id] }));

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    topRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    headerIcon: {
      fontSize: 32,
      color: 'var(--primary)',
    },
    createBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '10px 20px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
    },
    trendingScroll: {
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      marginBottom: 28,
      paddingBottom: 4,
    },
    trendingChip: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      color: 'var(--primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      flexShrink: 0,
      cursor: 'pointer',
    },
    momentCard: {
      marginBottom: 24,
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--surface-container-low)',
      overflow: 'hidden',
    },
    videoArea: (gradient) => ({
      width: '100%',
      aspectRatio: '4/5',
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }),
    playIcon: {
      fontSize: 64,
      color: 'rgba(255,255,255,0.8)',
    },
    glassOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '12px 16px',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--glass-blur))',
      WebkitBackdropFilter: 'blur(var(--glass-blur))',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    overlayAvatar: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      flexShrink: 0,
    },
    overlayName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#fff',
    },
    tierBadge: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--vang-gold)',
      color: '#3A0B00',
      fontFamily: 'var(--font-body)',
      fontSize: 10,
      fontWeight: 700,
      marginLeft: 6,
    },
    interactionBar: {
      position: 'absolute',
      right: 12,
      bottom: 70,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
    },
    interactionItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    },
    interactionIcon: (active) => ({
      fontSize: 28,
      color: active ? '#FF571A' : '#fff',
      cursor: 'pointer',
      textShadow: '0 2px 8px rgba(0,0,0,0.5)',
    }),
    interactionCount: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: '#fff',
      fontWeight: 600,
      textShadow: '0 1px 4px rgba(0,0,0,0.5)',
    },
    cardBody: {
      padding: '14px 16px',
    },
    caption: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      fontStyle: 'italic',
      lineHeight: 1.5,
      marginBottom: 10,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    xemThem: {
      color: 'var(--primary)',
      fontWeight: 600,
      fontStyle: 'normal',
      cursor: 'pointer',
    },
    dishTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--primary)',
      marginBottom: 6,
    },
    dishRestaurant: {
      color: 'var(--on-surface-variant)',
      fontWeight: 400,
    },
    timeText: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      opacity: 0.7,
      marginTop: 6,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--on-surface)',
      cursor: 'pointer',
      padding: 0,
      marginBottom: 16,
    },
    emojiPlaceholder: {
      fontSize: 80,
      position: 'absolute',
      opacity: 0.3,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
      </button>

      <div style={s.topRow}>
        <div style={s.headerLeft}>
          <span className="material-symbols-outlined" style={s.headerIcon}>play_circle</span>
          <div style={s.heading}>Moments</div>
        </div>
        <button style={s.createBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>videocam</span>
          Chia se
        </button>
      </div>

      {/* Trending */}
      <div style={s.trendingScroll}>
        {trendingTags.map(tag => (
          <div key={tag} style={s.trendingChip}>{tag}</div>
        ))}
      </div>

      {/* Feed */}
      {moments.map(m => (
        <div key={m.id} style={s.momentCard}>
          <div style={s.videoArea(m.gradient)}>
            <span style={s.emojiPlaceholder}>{m.emoji}</span>
            <span className="material-symbols-outlined" style={s.playIcon}>play_arrow</span>

            {/* Interaction bar */}
            <div style={s.interactionBar}>
              <div style={s.interactionItem} onClick={() => toggleLike(m.id)}>
                <span className="material-symbols-outlined" style={s.interactionIcon(liked[m.id])}>
                  {liked[m.id] ? 'favorite' : 'favorite_border'}
                </span>
                <span style={s.interactionCount}>{liked[m.id] ? m.likes + 1 : m.likes}</span>
              </div>
              <div style={s.interactionItem}>
                <span className="material-symbols-outlined" style={s.interactionIcon(false)}>chat_bubble</span>
                <span style={s.interactionCount}>{m.comments}</span>
              </div>
              <div style={s.interactionItem}>
                <span className="material-symbols-outlined" style={s.interactionIcon(false)}>share</span>
              </div>
              <div style={s.interactionItem} onClick={() => toggleSave(m.id)}>
                <span className="material-symbols-outlined" style={s.interactionIcon(saved[m.id])}>
                  {saved[m.id] ? 'bookmark' : 'bookmark_border'}
                </span>
              </div>
            </div>

            {/* Glass overlay */}
            <div style={s.glassOverlay}>
              <div style={s.overlayAvatar}>{m.avatar}</div>
              <div>
                <span style={s.overlayName}>{m.user}</span>
                <span style={s.tierBadge}>{m.tier}</span>
              </div>
            </div>
          </div>

          <div style={s.cardBody}>
            <div style={s.caption}>
              {m.caption} <span style={s.xemThem}>...xem them</span>
            </div>
            <div style={s.dishTag}>
              {m.emoji} {m.dish} <span style={s.dishRestaurant}>• {m.restaurant}</span>
            </div>
            <div style={s.timeText}>{m.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MomentsPage;
