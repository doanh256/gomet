import React, { useState, useEffect, useRef, useCallback } from 'react';
import MatchPopup from '../../components/User/MatchPopup';
import { useAppContext } from '../../AppContext';
import { useToast } from '../../components/ToastNotification';
import ProfileDetailModal from '../../components/User/ProfileDetailModal';

const SwipePage = () => {
  const { profiles, swipe, fetchProfiles, currentUser } = useAppContext();
  const { addToast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('entering');
  const [matchUser, setMatchUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastSwipeRef = useRef(0);
  const swipeTimeoutRef = useRef(null);
  const dragStartRef = useRef(0);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const currentProfile = profiles[currentIndex];

  const getImages = (profile) => {
    if (!profile) return [];
    if (profile.images && profile.images.length > 0) {
      return profile.images.map(img => typeof img === 'string' ? img : img.url);
    }
    if (profile.avatar) return [profile.avatar];
    return [];
  };

  const handleSwipe = useCallback(async (direction) => {
    if (currentIndex >= profiles.length) return;
    const now = Date.now();
    if (now - lastSwipeRef.current < 400) return;
    lastSwipeRef.current = now;

    const action = direction === 'right' ? 'like' : 'dislike';
    setSwipeFeedback(direction === 'right' ? 'like' : 'nope');
    setAnimationClass(direction === 'right' ? 'exit-right' : 'exit-left');

    const result = await swipe(currentProfile.id, action);
    if (result?.matched && result?.matchUser) {
      setMatchUser(result.matchUser);
    }

    if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    swipeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setCurrentImageIndex(0);
      setAnimationClass('entering');
      setImgLoaded(false);
      setSwipeFeedback(null);
      setDragX(0);
    }, 350);
  }, [currentIndex, profiles.length, swipe, currentProfile]);

  const handleSuperLike = useCallback(async () => {
    if (!currentProfile) return;
    setSwipeFeedback('like');
    setAnimationClass('exit-right');
    const result = await swipe(currentProfile.id, 'superlike');
    if (result?.matched && result?.matchUser) {
      setMatchUser(result.matchUser);
    }
    if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    swipeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setCurrentImageIndex(0);
      setAnimationClass('entering');
      setImgLoaded(false);
      setSwipeFeedback(null);
      setDragX(0);
    }, 350);
  }, [currentProfile, swipe]);

  // Touch/mouse drag
  const handlePointerDown = (e) => {
    dragStartRef.current = e.clientX;
    setIsDragging(true);
  };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartRef.current;
    setDragX(diff);
    if (diff > 50) setSwipeFeedback('like');
    else if (diff < -50) setSwipeFeedback('nope');
    else setSwipeFeedback(null);
  };
  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX > 100) handleSwipe('right');
    else if (dragX < -100) handleSwipe('left');
    else { setDragX(0); setSwipeFeedback(null); }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentProfile) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      switch (e.key) {
        case 'ArrowLeft': handleSwipe('left'); break;
        case 'ArrowRight': handleSwipe('right'); break;
        case ' ':
          e.preventDefault();
          if (getImages(currentProfile).length > 1) {
            setCurrentImageIndex(prev => prev < getImages(currentProfile).length - 1 ? prev + 1 : 0);
          }
          break;
        case 'ArrowUp': e.preventDefault(); setIsDetailOpen(true); break;
        case 'ArrowDown': e.preventDefault(); setIsDetailOpen(false); break;
        case 'Enter': e.preventDefault(); handleSuperLike(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    };
  }, [currentIndex, currentImageIndex, currentProfile, handleSwipe, handleSuperLike]);

  useEffect(() => {
    document.title = currentProfile
      ? `GOMET: ${currentProfile.name} (${currentProfile.age})`
      : 'GOMET - Tim nguoi phu hop';
  }, [currentProfile]);

  const images = currentProfile ? getImages(currentProfile) : [];
  const currentImg = images[currentImageIndex] || currentProfile?.avatar;

  const cardTransform = isDragging
    ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`
    : animationClass === 'exit-right'
      ? 'translateX(120%) rotate(15deg)'
      : animationClass === 'exit-left'
        ? 'translateX(-120%) rotate(-15deg)'
        : 'translateX(0) rotate(0)';

  const cardOpacity = animationClass === 'exit-right' || animationClass === 'exit-left' ? 0 : 1;

  // Taste profile data
  const tasteProfile = currentProfile?.tasteProfile || {
    spice: 3,
    style: 'Street food',
    region: 'Nam Bo',
  };

  const matchScore = currentProfile?.matchScore || (() => {
    const userInterests = Array.isArray(currentUser?.interests)
      ? currentUser.interests
      : (typeof currentUser?.interests === 'string' ? (() => { try { return JSON.parse(currentUser.interests); } catch { return []; } })() : []);
    const profileInterests = Array.isArray(currentProfile?.interests) ? currentProfile.interests : [];
    if (!userInterests.length || !profileInterests.length) return 85;
    const shared = userInterests.filter(i => profileInterests.includes(i));
    const all = [...new Set([...userInterests, ...profileInterests])];
    return Math.round((shared.length / Math.max(all.length, 1)) * 40 + 60);
  })();

  // Icebreaker
  const icebreakers = [
    'Ban thich an pho hay bun bo hon?',
    'Quan ca phe nao la so mot cua ban?',
    'Mon an comfort food cua ban la gi?',
    'Ban co thich nau an khong?',
  ];
  const icebreaker = currentProfile?.icebreaker || icebreakers[currentIndex % icebreakers.length];

  // Next profiles preview
  const nextProfiles = profiles.slice(currentIndex + 1, currentIndex + 4);

  // Vang tier
  const tierLabels = ['Silver', 'Gold', 'Platinum', 'Diamond'];
  const tier = currentProfile?.tier || tierLabels[currentIndex % tierLabels.length];

  const s = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 16px 24px',
      maxWidth: '440px',
      margin: '0 auto',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
      fontFamily: 'var(--font-body)',
    },
    header: {
      width: '100%',
      marginBottom: '12px',
      textAlign: 'center',
    },
    headerLabel: {
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '2px',
      color: 'var(--primary)',
      textTransform: 'uppercase',
      marginBottom: '2px',
      fontFamily: 'var(--font-headline)',
    },
    headerTitle: {
      fontSize: '22px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-headline)',
      margin: 0,
    },

    // Main card
    cardWrapper: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4.5',
      maxHeight: '580px',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      cursor: 'grab',
      userSelect: 'none',
      transform: cardTransform,
      opacity: cardOpacity,
      transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s ease',
      touchAction: 'pan-y',
    },
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '65%',
      background: 'linear-gradient(to top, #131313 0%, rgba(19,19,19,0.7) 40%, transparent 100%)',
      pointerEvents: 'none',
    },
    gradientOverlayTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '30%',
      background: 'linear-gradient(to bottom, rgba(19,19,19,0.4) 0%, transparent 100%)',
      pointerEvents: 'none',
    },

    // Match score badge
    matchBadge: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5,
      boxShadow: '0 0 20px rgba(255,87,26,0.5)',
    },
    matchBadgeText: {
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 800,
      color: '#fff',
    },

    // Card info overlay
    cardInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '20px',
      zIndex: 3,
    },
    nameRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '6px',
    },
    name: {
      fontSize: '28px',
      fontWeight: 800,
      color: '#fff',
      fontFamily: 'var(--font-headline)',
    },
    age: {
      fontSize: '24px',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.9)',
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: 'var(--primary)',
      color: '#fff',
      fontSize: '14px',
    },
    tierBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '11px',
      fontWeight: 700,
      color: '#FFD54F',
      background: 'rgba(255,213,79,0.15)',
      padding: '4px 10px',
      borderRadius: '9999px',
      marginLeft: '4px',
    },

    // Taste profile glass card
    tasteCard: {
      background: 'rgba(42,42,42,0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '14px 16px',
      marginTop: '10px',
    },
    tasteRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '6px',
    },
    tasteLabel: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.6)',
      width: '80px',
      flexShrink: 0,
    },
    tasteValue: {
      fontSize: '13px',
      fontWeight: 600,
      color: '#fff',
    },

    // Icebreaker
    icebreakerBox: {
      background: 'rgba(255,181,158,0.1)',
      borderRadius: '12px',
      padding: '12px 16px',
      marginTop: '10px',
    },
    icebreakerLabel: {
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '1px',
      color: 'var(--primary)',
      textTransform: 'uppercase',
      marginBottom: '4px',
    },
    icebreakerText: {
      fontSize: '13px',
      fontStyle: 'italic',
      color: 'rgba(255,255,255,0.85)',
      lineHeight: 1.5,
    },

    // Image indicators
    imageIndicators: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      right: '80px',
      display: 'flex',
      gap: '4px',
      zIndex: 6,
    },

    // Feedback overlay
    feedbackOverlay: (type) => ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-15deg)',
      fontSize: '48px',
      fontWeight: 900,
      fontFamily: 'var(--font-headline)',
      letterSpacing: '4px',
      padding: '8px 24px',
      borderRadius: '12px',
      color: type === 'like' ? '#4CAF50' : '#FF5252',
      opacity: type ? 1 : 0,
      transition: 'opacity 0.15s',
      pointerEvents: 'none',
      zIndex: 7,
      textShadow: '0 2px 12px rgba(0,0,0,0.5)',
    }),

    // Action buttons
    actionsRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '20px',
    },

    // Waiting preview
    waitingRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '20px',
    },
    waitingLabel: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginBottom: '8px',
      textAlign: 'center',
      marginTop: '16px',
    },
    waitingThumb: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
      opacity: 0.4,
      background: 'var(--surface-container-high)',
    },
    waitingThumbFallback: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      opacity: 0.4,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
    },

    // Empty / Loading
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center',
      padding: '24px',
    },
    emptyIcon: {
      fontSize: '64px',
      color: 'var(--primary-container)',
      marginBottom: '16px',
    },
    emptyTitle: {
      fontSize: '22px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-headline)',
      marginBottom: '8px',
    },
    emptySubtext: {
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.6,
      maxWidth: '280px',
      marginBottom: '24px',
    },
    refreshBtn: {
      padding: '12px 32px',
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(255,87,26,0.3)',
    },
    loadingSpinner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
    },
    spinner: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '3px solid var(--surface-container-high)',
      borderTop: '3px solid var(--primary)',
      animation: 'spin 0.8s linear infinite',
    },
    navZone: (side) => ({
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '40%',
      [side]: 0,
      zIndex: 2,
      cursor: 'pointer',
    }),
  };

  // Keyframes
  useEffect(() => {
    const styleId = 'swipe-keyframes';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
      document.head.appendChild(styleEl);
    }
  }, []);

  const renderActionBtn = (size, bg, shadow, icon, iconSize, iconColor, onClick, label) => (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: 'none',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: shadow || 'none',
        transition: 'transform 0.15s, box-shadow 0.15s',
        outline: 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: `${iconSize}px`, color: iconColor }}>{icon}</span>
    </button>
  );

  return (
    <div style={s.container}>
      {matchUser && <MatchPopup user={matchUser} onClose={() => setMatchUser(null)} />}

      {/* Header */}
      <div style={s.header}>
        <p style={s.headerLabel}>GOMET MEET</p>
        <h1 style={s.headerTitle}>Tim nguoi phu hop</h1>
      </div>

      {/* Main Card */}
      {!profiles.length && !currentProfile ? (
        <div style={s.loadingSpinner}>
          <div style={s.spinner} />
        </div>
      ) : currentProfile ? (
        <>
          <div
            style={s.cardWrapper}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Image indicators */}
            {images.length > 1 && (
              <div style={s.imageIndicators}>
                {images.map((_, idx) => (
                  <div key={idx} style={{
                    flex: 1, height: '3px', borderRadius: '2px',
                    background: idx === currentImageIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                    transition: 'background 0.2s',
                  }} />
                ))}
              </div>
            )}

            {/* Loading shimmer */}
            {!imgLoaded && (
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(110deg, var(--surface-container-high) 30%, var(--surface-container-low) 50%, var(--surface-container-high) 70%)',
                zIndex: 1,
              }} />
            )}

            {/* Photo */}
            {currentImg ? (
              <img
                src={currentImg}
                alt={currentProfile.name}
                style={{ ...s.cardImage, opacity: imgLoaded ? 1 : 0 }}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => { setImgLoaded(true); e.target.style.display = 'none'; }}
                draggable={false}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, #FFB59E 0%, #FF571A 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '80px', color: 'rgba(255,255,255,0.2)' }}>person</span>
              </div>
            )}

            {/* Gradient overlays */}
            <div style={s.gradientOverlayTop} />
            <div style={s.gradientOverlay} />

            {/* Match score badge */}
            <div style={s.matchBadge}>
              <span style={s.matchBadgeText}>{matchScore}%</span>
            </div>

            {/* Tap zones */}
            {images.length > 1 && (
              <>
                <div style={s.navZone('left')} onClick={(e) => {
                  e.stopPropagation();
                  if (currentImageIndex > 0) setCurrentImageIndex(prev => prev - 1);
                }} />
                <div style={s.navZone('right')} onClick={(e) => {
                  e.stopPropagation();
                  if (currentImageIndex < images.length - 1) setCurrentImageIndex(prev => prev + 1);
                }} />
              </>
            )}

            {/* Swipe feedback */}
            {swipeFeedback && (
              <div style={s.feedbackOverlay(swipeFeedback)}>
                {swipeFeedback === 'like' ? 'LIKE' : 'NOPE'}
              </div>
            )}

            {/* Card info */}
            <div style={s.cardInfo}>
              <div style={s.nameRow}>
                <span style={s.name}>{currentProfile.name}</span>
                <span style={s.age}>{currentProfile.age}</span>
                {currentProfile.verified && (
                  <span style={s.verifiedBadge}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                  </span>
                )}
                <span style={s.tierBadge}>
                  <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>toll</span>
                  {tier}
                </span>
              </div>

              {/* Taste profile glass card */}
              <div style={s.tasteCard}>
                <div style={s.tasteRow}>
                  <span style={s.tasteLabel}>Do cay:</span>
                  <span style={s.tasteValue}>{'🌶️'.repeat(tasteProfile.spice || 2)}</span>
                </div>
                <div style={s.tasteRow}>
                  <span style={s.tasteLabel}>Phong cach:</span>
                  <span style={s.tasteValue}>{tasteProfile.style || 'Street food'}</span>
                </div>
                <div style={{ ...s.tasteRow, marginBottom: 0 }}>
                  <span style={s.tasteLabel}>Vung mien:</span>
                  <span style={s.tasteValue}>{tasteProfile.region || 'Nam Bo'}</span>
                </div>
              </div>

              {/* Culinary Spark icebreaker */}
              <div style={s.icebreakerBox}>
                <p style={s.icebreakerLabel}>Culinary Spark</p>
                <p style={s.icebreakerText}>"{icebreaker}"</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={s.actionsRow}>
            {renderActionBtn(56, 'var(--surface-variant)', '0px 8px 24px rgba(0,0,0,0.15)', 'close', 28, 'var(--on-surface-variant)', () => handleSwipe('left'), 'Bo qua')}
            {renderActionBtn(48, 'var(--surface-container-high)', '0px 8px 24px rgba(0,0,0,0.15)', 'star', 22, '#FFD54F', handleSuperLike, 'Super Like')}
            {renderActionBtn(64, 'linear-gradient(135deg, #FFB59E, #FF571A)', '0 0 20px rgba(255,87,26,0.4)', 'favorite', 32, '#fff', () => handleSwipe('right'), 'Thich')}
          </div>

          {/* Dang cho preview thumbnails */}
          {nextProfiles.length > 0 && (
            <>
              <p style={s.waitingLabel}>Dang cho</p>
              <div style={s.waitingRow}>
                {nextProfiles.map((p, idx) => {
                  const av = getImages(p)[0] || p.avatar;
                  return av ? (
                    <img key={idx} src={av} alt="" style={s.waitingThumb} onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div key={idx} style={s.waitingThumbFallback}>{p.name?.charAt(0) || '?'}</div>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <div style={s.emptyState}>
          <span className="material-symbols-outlined" style={s.emptyIcon}>sentiment_satisfied</span>
          <h3 style={s.emptyTitle}>Het roi!</h3>
          <p style={s.emptySubtext}>Ban da xem het cac goi y. Quay lai sau de gap nguoi moi nhe!</p>
          <button
            style={s.refreshBtn}
            onClick={() => {
              setCurrentIndex(0);
              setCurrentImageIndex(0);
              setAnimationClass('entering');
              setImgLoaded(false);
              fetchProfiles();
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>refresh</span>
              Tai lai
            </span>
          </button>
        </div>
      )}

      <ProfileDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        profile={currentProfile}
      />
    </div>
  );
};

export default SwipePage;
