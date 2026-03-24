import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/date-posts?status=open&limit=12').then(data => {
      if (data?.posts) setPosts(data.posts);
    }).catch(console.error);

    api.get('/users/profiles?limit=10').then(data => {
      if (data?.profiles) setProfiles(data.profiles);
    }).catch(console.error);

    api.get('/venues?limit=10').then(data => {
      if (data?.venues) setVenues(data.venues);
      else if (Array.isArray(data)) setVenues(data);
    }).catch(console.error);

    api.get('/events?limit=6').then(data => {
      if (data?.events) setEvents(data.events);
      else if (Array.isArray(data)) setEvents(data);
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
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
    } catch { return dateStr; }
  };

  // --- Styles ---
  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
    },
    inner: {
      maxWidth: '480px',
      margin: '0 auto',
      padding: '0 16px 100px',
    },

    // Welcome header
    welcomeSection: {
      padding: '48px 0 8px',
    },
    welcomeText: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      margin: 0,
      lineHeight: 1.2,
    },
    welcomeAccent: {
      color: 'var(--primary)',
    },

    // Vang Gold tier card
    vangCard: {
      marginTop: '16px',
      background: 'linear-gradient(135deg, #FFD54F 0%, #FFC107 100%)',
      borderRadius: '1.5rem',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
    },
    vangLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    vangIconWrap: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      background: 'rgba(0,0,0,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    vangLabel: {
      fontSize: '12px',
      fontWeight: 600,
      color: 'rgba(0,0,0,0.6)',
      margin: 0,
    },
    vangPoints: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 800,
      color: '#3A0B00',
      margin: '2px 0 0',
    },
    vangTier: {
      fontFamily: 'var(--font-headline)',
      fontSize: '13px',
      fontWeight: 700,
      color: '#3A0B00',
      background: 'rgba(0,0,0,0.1)',
      padding: '6px 16px',
      borderRadius: '9999px',
    },

    // Challenge card
    challengeOuter: {
      marginTop: '24px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '1.5rem',
      padding: '2px',
    },
    challengeInner: {
      background: 'var(--surface-container-low)',
      borderRadius: 'calc(1.5rem - 2px)',
      padding: '20px',
    },
    challengeHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
    },
    challengeTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: 0,
    },
    challengeReward: {
      fontSize: '12px',
      fontWeight: 700,
      color: '#FFD54F',
      background: 'rgba(255,213,79,0.15)',
      padding: '4px 12px',
      borderRadius: '9999px',
    },
    challengeName: {
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
      margin: '0 0 12px',
      lineHeight: 1.5,
    },
    progressBarOuter: {
      width: '100%',
      height: '6px',
      borderRadius: '3px',
      background: 'var(--surface-container-high)',
    },
    progressBarInner: {
      height: '6px',
      borderRadius: '3px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      width: '65%',
      transition: 'width 0.5s ease',
    },
    progressText: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginTop: '6px',
      textAlign: 'right',
    },

    // Section header
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '36px',
      marginBottom: '16px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: 0,
    },
    sectionLink: {
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

    // Horizontal scroll
    hScroll: {
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      paddingBottom: '8px',
      scrollSnapType: 'x mandatory',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },

    // Venue cards (Kham Pha Quanh Day)
    venueCard: {
      width: '200px',
      height: '200px',
      flexShrink: 0,
      borderRadius: '1.5rem',
      overflow: 'hidden',
      position: 'relative',
      scrollSnapAlign: 'start',
      cursor: 'pointer',
    },
    venueImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    venueImgPlaceholder: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #FFB59E 0%, #FF571A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    venueOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      background: 'linear-gradient(to top, rgba(19,19,19,0.9) 0%, transparent 100%)',
    },
    venueGlass: {
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '12px',
      padding: '10px 12px',
    },
    venueName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '13px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: 0,
    },
    venueMeta: {
      fontSize: '11px',
      color: 'var(--on-surface-variant)',
      marginTop: '2px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },

    // Profile suggestion cards (Goi Y Cho Ban)
    profileCard: {
      width: '140px',
      flexShrink: 0,
      scrollSnapAlign: 'start',
      cursor: 'pointer',
      textAlign: 'center',
    },
    profileAvatarWrap: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      margin: '0 auto 10px',
      overflow: 'hidden',
      background: 'var(--surface-container-high)',
    },
    profileAvatar: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    profileAvatarFallback: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
    },
    profileName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: '0 0 4px',
    },
    matchBadge: {
      display: 'inline-block',
      fontSize: '11px',
      fontWeight: 700,
      color: '#3A0B00',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      padding: '3px 10px',
      borderRadius: '9999px',
    },
    profileTier: {
      fontSize: '11px',
      color: '#FFD54F',
      marginTop: '4px',
      fontWeight: 600,
    },

    // Moments grid
    momentsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
    },
    momentCard: {
      aspectRatio: '3/4',
      borderRadius: '1rem',
      overflow: 'hidden',
      position: 'relative',
      cursor: 'pointer',
      background: 'var(--surface-container-high)',
    },
    momentImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    momentPlaceholder: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, var(--surface-container-high), var(--surface-container-highest))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    momentOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '8px',
      background: 'linear-gradient(to top, rgba(19,19,19,0.85) 0%, transparent 100%)',
    },
    momentUser: {
      fontSize: '10px',
      fontWeight: 600,
      color: '#fff',
    },
    momentHearts: {
      fontSize: '10px',
      color: 'rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      gap: '3px',
      marginTop: '2px',
    },

    // Event cards
    eventCard: {
      width: '260px',
      flexShrink: 0,
      borderRadius: '1.5rem',
      overflow: 'hidden',
      background: 'var(--surface-container-low)',
      boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
      scrollSnapAlign: 'start',
      cursor: 'pointer',
    },
    eventImgWrap: {
      width: '100%',
      height: '140px',
      position: 'relative',
      background: 'linear-gradient(135deg, var(--primary-container), var(--tertiary-container))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    eventDateBadge: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      background: 'var(--primary-container)',
      color: '#fff',
      borderRadius: '12px',
      padding: '6px 12px',
      fontFamily: 'var(--font-headline)',
      fontSize: '12px',
      fontWeight: 700,
    },
    eventInfo: {
      padding: '16px',
    },
    eventTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: '0 0 6px',
      lineHeight: 1.3,
    },
    eventVenue: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      marginBottom: '8px',
    },
    eventPrice: {
      fontSize: '13px',
      fontWeight: 700,
      color: 'var(--primary)',
    },
  };

  const scrollbarCSS = `
    .gomet-hscroll::-webkit-scrollbar { display: none; }
  `;

  return (
    <div style={s.page}>
      <style>{scrollbarCSS}</style>
      <div style={s.inner}>

        {/* ===== WELCOME HEADER ===== */}
        <div style={s.welcomeSection}>
          <h1 style={s.welcomeText}>
            Xin chao,{' '}
            <span style={s.welcomeAccent}>{currentUser?.name || 'ban'}</span>
          </h1>
        </div>

        {/* ===== VANG GOLD TIER CARD ===== */}
        <div style={s.vangCard}>
          <div style={s.vangLeft}>
            <div style={s.vangIconWrap}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#3A0B00' }}>toll</span>
            </div>
            <div>
              <p style={s.vangLabel}>Diem Vang</p>
              <p style={s.vangPoints}>12,450</p>
            </div>
          </div>
          <span style={s.vangTier}>Gold Tier</span>
        </div>

        {/* ===== THU THACH HOM NAY ===== */}
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Thu Thach Hom Nay</h2>
        </div>
        <div style={s.challengeOuter}>
          <div style={s.challengeInner}>
            <div style={s.challengeHeader}>
              <h3 style={s.challengeTitle}>Kham pha quan moi</h3>
              <span style={s.challengeReward}>+50 Vang</span>
            </div>
            <p style={s.challengeName}>Check-in tai mot quan an ban chua tung den va chia se trai nghiem.</p>
            <div style={s.progressBarOuter}>
              <div style={s.progressBarInner} />
            </div>
            <p style={s.progressText}>2/3 hoan thanh</p>
          </div>
        </div>

        {/* ===== KHAM PHA QUANH DAY ===== */}
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Kham Pha Quanh Day</h2>
          <button style={s.sectionLink} onClick={() => navigate('/app/venues')}>
            Xem tat ca
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </button>
        </div>
        <div className="gomet-hscroll" style={s.hScroll}>
          {(venues.length > 0 ? venues : [
            { id: 1, name: 'The Coffee House', address: 'Quan 1', rating: 4.5, distance: '0.3km' },
            { id: 2, name: 'Maison Marou', address: 'Quan 3', rating: 4.8, distance: '1.2km' },
            { id: 3, name: "L'Usine", address: 'Quan 1', rating: 4.6, distance: '0.8km' },
            { id: 4, name: 'Shin Coffee', address: 'Quan 1', rating: 4.4, distance: '0.5km' },
          ]).map((venue, idx) => (
            <div key={venue.id || idx} style={s.venueCard}>
              {venue.image ? (
                <img src={venue.image} alt={venue.name} style={s.venueImg} onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div style={s.venueImgPlaceholder}>
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'rgba(255,255,255,0.3)' }}>restaurant</span>
                </div>
              )}
              <div style={s.venueOverlay}>
                <div style={s.venueGlass}>
                  <p style={s.venueName}>{venue.name}</p>
                  <div style={s.venueMeta}>
                    <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>location_on</span>
                    {venue.distance || venue.address || ''}
                    {venue.rating && (
                      <>
                        <span style={{ margin: '0 2px', opacity: 0.5 }}>|</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#FFD54F' }}>star</span>
                        {venue.rating}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== GOI Y CHO BAN ===== */}
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Goi Y Cho Ban</h2>
          <button style={s.sectionLink} onClick={() => navigate('/app/explore')}>
            Xem them
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </button>
        </div>
        <div className="gomet-hscroll" style={s.hScroll}>
          {(profiles.length > 0 ? profiles : []).map((profile, idx) => {
            const avatar = getAvatarUrl(profile);
            const matchPercent = Math.floor(Math.random() * 20) + 75;
            return (
              <div key={profile.id || idx} style={s.profileCard} onClick={() => navigate('/app/swipe')}>
                <div style={s.profileAvatarWrap}>
                  {avatar ? (
                    <img src={avatar} alt={profile.name} style={s.profileAvatar} onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div style={s.profileAvatarFallback}>{profile.name?.charAt(0) || '?'}</div>
                  )}
                </div>
                <p style={s.profileName}>{profile.name || 'Nguoi dung'}</p>
                <span style={s.matchBadge}>{matchPercent}% phu hop</span>
                <p style={s.profileTier}>
                  <span className="material-symbols-outlined" style={{ fontSize: '12px', verticalAlign: 'middle', marginRight: '2px' }}>toll</span>
                  Gold
                </p>
              </div>
            );
          })}
          {profiles.length === 0 && (
            <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', padding: '20px 0' }}>Dang tai goi y...</p>
          )}
        </div>

        {/* ===== MOMENTS FEED ===== */}
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Moments</h2>
          <button style={s.sectionLink} onClick={() => navigate('/app/dates/all')}>
            Xem tat ca
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </button>
        </div>
        <div style={s.momentsGrid}>
          {(posts.length > 0 ? posts.slice(0, 8) : []).map((post, idx) => {
            const imgUrl = getPostImage(post);
            return (
              <div key={post.id || idx} style={s.momentCard} onClick={() => navigate(`/app/dates/${post.category || 'all'}`)}>
                {imgUrl ? (
                  <img src={imgUrl} alt={post.title} style={s.momentImg} onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div style={s.momentPlaceholder}>
                    <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--on-surface-variant)', opacity: 0.3 }}>image</span>
                  </div>
                )}
                <div style={s.momentOverlay}>
                  <p style={s.momentUser}>{post.author?.name || 'GOMET'}</p>
                  <div style={s.momentHearts}>
                    <span className="material-symbols-outlined" style={{ fontSize: '10px' }}>favorite</span>
                    {post.likes || Math.floor(Math.random() * 50) + 5}
                  </div>
                </div>
              </div>
            );
          })}
          {posts.length === 0 && [1,2,3,4].map(i => (
            <div key={i} style={s.momentCard}>
              <div style={s.momentPlaceholder}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--on-surface-variant)', opacity: 0.3 }}>image</span>
              </div>
            </div>
          ))}
        </div>

        {/* ===== SU KIEN SAP TOI ===== */}
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Su Kien Sap Toi</h2>
          <button style={s.sectionLink} onClick={() => navigate('/app/events')}>
            Xem tat ca
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </button>
        </div>
        <div className="gomet-hscroll" style={s.hScroll}>
          {(events.length > 0 ? events : [
            { id: 1, title: 'Coffee Tasting Night', venue: 'The Workshop', date: '2026-04-01', price: '150,000d' },
            { id: 2, title: 'Street Food Tour Q1', venue: 'Ben Thanh Area', date: '2026-04-05', price: 'Mien phi' },
            { id: 3, title: 'Cooking Class: Pho', venue: 'Saigon Cooking Center', date: '2026-04-10', price: '350,000d' },
          ]).map((event, idx) => (
            <div key={event.id || idx} style={s.eventCard}>
              <div style={s.eventImgWrap}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'rgba(255,255,255,0.3)' }}>celebration</span>
                <div style={s.eventDateBadge}>
                  {formatDate(event.date || event.dateTime) || 'Sap toi'}
                </div>
              </div>
              <div style={s.eventInfo}>
                <h3 style={s.eventTitle}>{event.title || event.name}</h3>
                <div style={s.eventVenue}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                  {event.venue || event.location || 'TP.HCM'}
                </div>
                <span style={s.eventPrice}>{event.price || 'Mien phi'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
