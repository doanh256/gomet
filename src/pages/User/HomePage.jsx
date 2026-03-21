import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import PremiumModal from '../../components/User/PremiumModal';
import ProfileDetailModal from '../../components/User/ProfileDetailModal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAppContext();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const navigate = useNavigate();
  const trendingScrollRef = useRef(null);

  useEffect(() => {
    api.get('/date-posts?status=open&limit=8').then(data => {
      if (data?.posts) setTrendingPosts(data.posts);
    }).catch(console.error);

    api.get('/users/profiles?limit=6').then(data => {
      if (data?.profiles) setRecommendedUsers(data.profiles);
    }).catch(console.error);
  }, []);

  const getAvatarUrl = (user) => {
    if (!user) return '';
    return user.avatar || user.images?.[0]?.url || user.images?.[0] || '';
  };

  const getPostImage = (post) => {
    return post.image || post.images?.[0]?.url || post.images?.[0] || '';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Sap toi';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'short' });
    } catch {
      return dateStr;
    }
  };

  const curatedSpaces = [
    { id: 1, name: 'The Coffee House', location: 'Quan 1, TP.HCM', icon: 'local_cafe' },
    { id: 2, name: 'Maison Marou', location: 'Quan 3, TP.HCM', icon: 'cake' },
    { id: 3, name: "L'Usine", location: 'Quan 1, TP.HCM', icon: 'restaurant' },
    { id: 4, name: 'The Workshop', location: 'Quan 1, TP.HCM', icon: 'coffee' },
    { id: 5, name: 'Okkio Caffe', location: 'Quan 3, TP.HCM', icon: 'brunch_dining' },
    { id: 6, name: 'Shin Coffee', location: 'Quan 1, TP.HCM', icon: 'emoji_food_beverage' },
  ];

  const pulseStories = [
    { id: 1, user: 'Linh', text: 'Vua tim duoc mot quan ca phe tuyet voi o Quan 3!', time: '2 gio truoc' },
    { id: 2, user: 'Minh', text: 'Ai muon di xem phim toi nay khong?', time: '4 gio truoc' },
    { id: 3, user: 'Trang', text: 'Date dau tien thanh cong nho GOMET!', time: '6 gio truoc' },
  ];

  // --- Styles ---
  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      minHeight: '100vh',
    },
    inner: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px 80px',
    },
    desktopLayout: {
      display: 'flex',
      gap: '40px',
      alignItems: 'flex-start',
    },
    mainCol: {
      flex: 1,
      minWidth: 0,
    },
    sidebarCol: {
      width: '320px',
      flexShrink: 0,
      position: 'sticky',
      top: '24px',
    },

    // --- Hero Header ---
    heroSection: {
      padding: '56px 0 40px',
    },
    heroLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 600,
      color: 'var(--primary)',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginBottom: '12px',
    },
    heroHeading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 'clamp(32px, 5vw, 56px)',
      fontWeight: 800,
      color: 'var(--on-surface)',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      margin: 0,
    },
    heroHeadingAccent: {
      color: 'var(--primary)',
    },
    heroSub: {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      color: 'var(--on-surface-variant)',
      marginTop: '16px',
      lineHeight: 1.6,
      maxWidth: '520px',
    },

    // --- Section Headers ---
    sectionHeader: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: '24px',
      marginTop: '48px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: 0,
      letterSpacing: '-0.01em',
    },
    sectionLink: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--primary)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },

    // --- Trending Tonight Horizontal Scroll ---
    trendingScroll: {
      display: 'flex',
      gap: '20px',
      overflowX: 'auto',
      paddingBottom: '12px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch',
    },
    trendingCard: {
      minWidth: '320px',
      maxWidth: '380px',
      height: '450px',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
      cursor: 'pointer',
      scrollSnapAlign: 'start',
      backgroundColor: 'var(--surface-container-high)',
    },
    trendingImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    trendingImgPlaceholder: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    trendingGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60%',
      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
      pointerEvents: 'none',
    },
    trendingContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px',
      zIndex: 2,
    },
    trendingCategory: {
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 600,
      color: 'var(--primary-container)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '8px',
    },
    trendingTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 700,
      color: '#ffffff',
      lineHeight: 1.3,
      margin: '0 0 12px 0',
    },
    trendingMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'rgba(255,255,255,0.8)',
      marginBottom: '16px',
    },
    trendingFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    avatarStack: {
      display: 'flex',
      alignItems: 'center',
    },
    avatarStackItem: (i) => ({
      width: '30px',
      height: '30px',
      borderRadius: 'var(--radius-full)',
      border: '2px solid rgba(255,255,255,0.9)',
      marginLeft: i > 0 ? '-10px' : '0',
      backgroundColor: ['var(--primary)', 'var(--tertiary)', 'var(--primary-container)'][i % 3],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      color: 'white',
      fontWeight: 600,
      overflow: 'hidden',
    }),
    avatarStackCount: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      color: 'rgba(255,255,255,0.7)',
      marginLeft: '8px',
    },
    getInvitesBtn: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      fontWeight: 600,
      color: '#ffffff',
      backgroundColor: 'var(--primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '8px 18px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.15s ease',
    },

    // --- Curated Spaces Grid ---
    spacesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
    },
    spaceCard: {
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    spaceImgWrap: {
      width: '100%',
      height: '140px',
      background: 'linear-gradient(135deg, var(--surface-container-high) 0%, var(--outline-variant) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    spaceInfo: {
      padding: '14px 16px',
    },
    spaceName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: 0,
    },
    spaceLocation: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginTop: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '3px',
    },
    spaceActions: {
      display: 'flex',
      gap: '8px',
      padding: '0 16px 14px',
    },
    spaceActionBtn: {
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 600,
      color: 'var(--primary)',
      backgroundColor: 'transparent',
      border: '1px solid var(--outline-variant)',
      borderRadius: 'var(--radius-full)',
      padding: '5px 12px',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    },

    // --- Who's Looking to Go Feed ---
    feedList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    },
    feedItem: {
      display: 'flex',
      gap: '16px',
      padding: '20px 0',
      borderBottom: '1px solid var(--surface-container-high)',
    },
    feedAvatar: {
      width: '52px',
      height: '52px',
      borderRadius: 'var(--radius-full)',
      objectFit: 'cover',
      flexShrink: 0,
      backgroundColor: 'var(--surface-container-high)',
    },
    feedAvatarFallback: {
      width: '52px',
      height: '52px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 700,
      flexShrink: 0,
    },
    feedBody: {
      flex: 1,
      minWidth: 0,
    },
    feedNameRow: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '8px',
      marginBottom: '6px',
    },
    feedName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    feedAge: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
    },
    feedBio: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
      fontStyle: 'italic',
      lineHeight: 1.5,
      marginBottom: '10px',
    },
    feedTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '12px',
    },
    feedTag: {
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 500,
      color: 'var(--tertiary)',
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-full)',
      padding: '4px 10px',
      border: '1px solid var(--outline-variant)',
    },
    feedActions: {
      display: 'flex',
      gap: '8px',
    },
    feedBtnOutline: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      backgroundColor: 'transparent',
      border: '1.5px solid var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      padding: '7px 16px',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    },
    feedBtnFilled: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      fontWeight: 600,
      color: '#ffffff',
      backgroundColor: 'var(--primary)',
      border: '1.5px solid var(--primary)',
      borderRadius: 'var(--radius-full)',
      padding: '7px 16px',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    },

    // --- Pulse Sidebar ---
    pulseCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
      marginBottom: '24px',
    },
    pulseTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: '0 0 20px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    pulseItem: {
      display: 'flex',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid var(--surface-container-high)',
    },
    pulseDot: {
      width: '36px',
      height: '36px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 700,
      flexShrink: 0,
    },
    pulseText: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--on-surface)',
      lineHeight: 1.5,
    },
    pulseTime: {
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      color: 'var(--on-surface-variant)',
      marginTop: '2px',
    },

    // --- Premium Upsell ---
    premiumCard: {
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
      borderRadius: 'var(--radius-lg)',
      padding: '32px 28px',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      marginTop: '48px',
      transition: 'transform 0.2s ease',
    },
    premiumBg: {
      position: 'absolute',
      top: '-30px',
      right: '-30px',
      width: '120px',
      height: '120px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    premiumLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '8px',
    },
    premiumTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 800,
      margin: '0 0 8px 0',
      letterSpacing: '-0.02em',
    },
    premiumDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.85)',
      lineHeight: 1.5,
      marginBottom: '20px',
      maxWidth: '400px',
    },
    premiumBtn: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 700,
      color: 'var(--primary)',
      backgroundColor: '#ffffff',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '10px 24px',
      cursor: 'pointer',
      transition: 'transform 0.15s ease',
    },

    // --- Empty State ---
    emptyState: {
      textAlign: 'center',
      padding: '48px 20px',
      color: 'var(--on-surface-variant)',
    },
    emptyIcon: {
      fontSize: '48px',
      color: 'var(--outline-variant)',
      marginBottom: '12px',
    },
  };

  // Hide scrollbar via inline style tag
  const scrollbarCSS = `
    .gomet-no-scrollbar::-webkit-scrollbar { display: none; }
    @media (max-width: 960px) {
      .gomet-sidebar-col { display: none !important; }
    }
  `;

  return (
    <div style={s.page}>
      <style>{scrollbarCSS}</style>
      <div style={s.inner}>

        {/* ========== HERO HEADER ========== */}
        <div style={s.heroSection}>
          <div style={s.heroLabel}>Curated Experience</div>
          <h1 style={s.heroHeading}>
            GOMET Hub{' '}
            <span style={s.heroHeadingAccent}>&mdash;</span>{' '}
            <span style={s.heroHeadingAccent}>Go & Meet</span>
          </h1>
          <p style={s.heroSub}>
            Xin chao{currentUser?.name ? `, ${currentUser.name}` : ''}. Kham pha nhung trai nghiem duoc tuyen chon rieng cho ban.
          </p>
        </div>

        <div style={s.desktopLayout}>
          {/* ========== MAIN COLUMN ========== */}
          <div style={s.mainCol}>

            {/* ===== TRENDING TONIGHT ===== */}
            <div>
              <div style={s.sectionHeader}>
                <h2 style={s.sectionTitle}>
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', verticalAlign: 'middle', marginRight: '8px', color: 'var(--primary)' }}>local_fire_department</span>
                  Trending Tonight
                </h2>
                <button style={s.sectionLink} onClick={() => navigate('/app/dates/all')}>
                  Xem tat ca
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </button>
              </div>

              {trendingPosts.length === 0 ? (
                <div style={s.emptyState}>
                  <span className="material-symbols-outlined" style={s.emptyIcon}>celebration</span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>Chua co su kien nao toi nay. Hay quay lai sau!</p>
                </div>
              ) : (
                <div
                  ref={trendingScrollRef}
                  className="gomet-no-scrollbar"
                  style={s.trendingScroll}
                >
                  {trendingPosts.map((post, idx) => {
                    const imgUrl = getPostImage(post);
                    return (
                      <div
                        key={post.id || idx}
                        style={s.trendingCard}
                        onClick={() => navigate(`/app/dates/${post.category || 'all'}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = 'var(--editorial-shadow)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={post.title}
                            style={s.trendingImg}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={s.trendingImgPlaceholder}>
                            <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'rgba(255,255,255,0.25)' }}>nightlife</span>
                          </div>
                        )}

                        {/* Gradient Overlay */}
                        <div style={s.trendingGradient} />

                        {/* Content */}
                        <div style={s.trendingContent}>
                          <div style={s.trendingCategory}>
                            {post.category || 'Su kien'}
                          </div>
                          <h3 style={s.trendingTitle}>{post.title}</h3>
                          <div style={s.trendingMeta}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
                            {formatDate(post.dateTime || post.date)}
                            <span style={{ margin: '0 4px', opacity: 0.5 }}>|</span>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                            {post.place || post.author?.location || 'TP.HCM'}
                          </div>
                          <div style={s.trendingFooter}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={s.avatarStack}>
                                {[0, 1, 2].map((i) => (
                                  <div key={i} style={s.avatarStackItem(i)}>
                                    {post.author?.name?.charAt(0) || '?'}
                                  </div>
                                ))}
                              </div>
                              <span style={s.avatarStackCount}>+{Math.floor(Math.random() * 12) + 3}</span>
                            </div>
                            <button
                              style={s.getInvitesBtn}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/app/dates/${post.category || 'all'}`);
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                            >
                              Get Invites
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ===== CURATED SPACES ===== */}
            <div>
              <div style={s.sectionHeader}>
                <h2 style={s.sectionTitle}>
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', verticalAlign: 'middle', marginRight: '8px', color: 'var(--tertiary)' }}>explore</span>
                  Curated Spaces
                </h2>
              </div>
              <div style={s.spacesGrid}>
                {curatedSpaces.map((space) => (
                  <div
                    key={space.id}
                    style={s.spaceCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = 'var(--editorial-shadow)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                    }}
                  >
                    <div style={s.spaceImgWrap}>
                      <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--on-surface-variant)', opacity: 0.4 }}>
                        {space.icon}
                      </span>
                    </div>
                    <div style={s.spaceInfo}>
                      <p style={s.spaceName}>{space.name}</p>
                      <p style={s.spaceLocation}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                        {space.location}
                      </p>
                    </div>
                    <div style={s.spaceActions}>
                      <button
                        style={s.spaceActionBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--primary)';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.borderColor = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--primary)';
                          e.currentTarget.style.borderColor = 'var(--outline-variant)';
                        }}
                      >
                        Kham pha
                      </button>
                      <button
                        style={{ ...s.spaceActionBtn, border: 'none', color: 'var(--on-surface-variant)' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle' }}>bookmark_border</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== WHO'S LOOKING TO GO? ===== */}
            <div>
              <div style={s.sectionHeader}>
                <h2 style={s.sectionTitle}>
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', verticalAlign: 'middle', marginRight: '8px', color: 'var(--primary-container)' }}>group</span>
                  Who's Looking to Go?
                </h2>
                <button style={s.sectionLink} onClick={() => navigate('/app/explore')}>
                  Xem them
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </button>
              </div>

              {recommendedUsers.length === 0 ? (
                <div style={s.emptyState}>
                  <span className="material-symbols-outlined" style={s.emptyIcon}>person_search</span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>Dang tim kiem nhung nguoi phu hop...</p>
                </div>
              ) : (
                <div style={s.feedList}>
                  {recommendedUsers.map((profile, idx) => {
                    const avatar = getAvatarUrl(profile);
                    const interests = profile.interests || profile.tags || [];
                    const bio = profile.bio || profile.description || 'Dang tim ai do de di cafe cuoi tuan nay!';
                    return (
                      <div key={profile.id || idx} style={{
                        ...s.feedItem,
                        borderBottom: idx === recommendedUsers.length - 1 ? 'none' : s.feedItem.borderBottom,
                      }}>
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={profile.name}
                            style={s.feedAvatar}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={s.feedAvatarFallback}>
                            {profile.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <div style={s.feedBody}>
                          <div style={s.feedNameRow}>
                            <span style={s.feedName}>{profile.name}</span>
                            {profile.age && <span style={s.feedAge}>{profile.age} tuoi</span>}
                          </div>
                          <p style={s.feedBio}>"{bio}"</p>
                          {interests.length > 0 && (
                            <div style={s.feedTags}>
                              {(Array.isArray(interests) ? interests : [interests]).slice(0, 4).map((tag, ti) => (
                                <span key={ti} style={s.feedTag}>{tag}</span>
                              ))}
                            </div>
                          )}
                          <div style={s.feedActions}>
                            <button
                              style={s.feedBtnOutline}
                              onClick={() => setSelectedProfile(profile)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--on-surface)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--surface-container-high)';
                              }}
                            >
                              View Profile
                            </button>
                            <button
                              style={s.feedBtnFilled}
                              onClick={() => setSelectedProfile(profile)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--tertiary)';
                                e.currentTarget.style.borderColor = 'var(--tertiary)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                                e.currentTarget.style.borderColor = 'var(--primary)';
                              }}
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ===== GOMET PREMIUM UPSELL ===== */}
            <div
              style={s.premiumCard}
              onClick={() => setIsPremiumModalOpen(true)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <div style={s.premiumBg} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={s.premiumLabel}>Nang cap trai nghiem</div>
                <h3 style={s.premiumTitle}>GOMET Premium</h3>
                <p style={s.premiumDesc}>
                  Mo khoa tat ca tinh nang — xem ai da thich ban, uu tien hien thi, va gui loi moi khong gioi han.
                </p>
                <button
                  style={s.premiumBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPremiumModalOpen(true);
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '6px' }}>diamond</span>
                  Tim hieu them
                </button>
              </div>
            </div>

          </div>

          {/* ========== PULSE SIDEBAR (Desktop) ========== */}
          <div style={s.sidebarCol} className="gomet-sidebar-col">

            {/* Pulse Card */}
            <div style={s.pulseCard}>
              <h3 style={s.pulseTitle}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>sensors</span>
                Pulse
              </h3>
              {pulseStories.map((story, idx) => (
                <div key={story.id} style={{
                  ...s.pulseItem,
                  borderBottom: idx === pulseStories.length - 1 ? 'none' : s.pulseItem.borderBottom,
                }}>
                  <div style={s.pulseDot}>{story.user.charAt(0)}</div>
                  <div>
                    <p style={s.pulseText}>
                      <strong>{story.user}</strong>: {story.text}
                    </p>
                    <p style={s.pulseTime}>{story.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div style={{
              ...s.pulseCard,
              background: 'var(--surface-container-low)',
            }}>
              <h3 style={{ ...s.pulseTitle, marginBottom: '16px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--tertiary)' }}>insights</span>
                Thong ke nhanh
              </h3>
              {[
                { label: 'Su kien toi nay', value: trendingPosts.length, icon: 'event' },
                { label: 'Nguoi dang tim', value: recommendedUsers.length, icon: 'people' },
                { label: 'Dia diem hot', value: curatedSpaces.length, icon: 'place' },
              ].map((stat, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: idx < 2 ? '1px solid var(--surface-container-high)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>{stat.icon}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--on-surface-variant)' }}>{stat.label}</span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--on-surface)',
                  }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODALS ========== */}
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
