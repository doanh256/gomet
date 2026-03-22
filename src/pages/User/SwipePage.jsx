import React, { useState, useEffect, useRef, useCallback } from 'react';
import MatchPopup from '../../components/User/MatchPopup';
import { useAppContext } from '../../AppContext';
import { useToast } from '../../components/ToastNotification';
import ProfileDetailModal from '../../components/User/ProfileDetailModal';

const SwipePage = () => {
  const { profiles, swipe, fetchProfiles } = useAppContext();
  const { addToast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('entering');
  const [matchUser, setMatchUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState(null); // 'like' | 'nope' | null
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
    if (dragX > 100) {
      handleSwipe('right');
    } else if (dragX < -100) {
      handleSwipe('left');
    } else {
      setDragX(0);
      setSwipeFeedback(null);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentProfile) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      switch (e.key) {
        case 'ArrowLeft':
          handleSwipe('left');
          break;
        case 'ArrowRight':
          handleSwipe('right');
          break;
        case ' ':
          e.preventDefault();
          if (getImages(currentProfile).length > 1) {
            setCurrentImageIndex(prev => prev < getImages(currentProfile).length - 1 ? prev + 1 : 0);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setIsDetailOpen(true);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setIsDetailOpen(false);
          break;
        case 'Enter':
          e.preventDefault();
          handleSuperLike();
          break;
        default:
          break;
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
      ? `Smart Matches: ${currentProfile.name} (${currentProfile.age})`
      : 'Smart Matches';
  }, [currentProfile]);

  const images = currentProfile ? getImages(currentProfile) : [];
  const currentImg = images[currentImageIndex] || currentProfile?.avatar;

  // Card transform during drag
  const cardTransform = isDragging
    ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`
    : animationClass === 'exit-right'
      ? 'translateX(120%) rotate(15deg)'
      : animationClass === 'exit-left'
        ? 'translateX(-120%) rotate(-15deg)'
        : animationClass === 'entering'
          ? 'translateX(0) rotate(0)'
          : 'none';

  const cardOpacity = animationClass === 'exit-right' || animationClass === 'exit-left' ? 0 : 1;

  // Styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 16px',
      maxWidth: '440px',
      margin: '0 auto',
      width: '100%',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
    },
    header: {
      width: '100%',
      marginBottom: '20px',
      textAlign: 'center',
    },
    headerLabel: {
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '2px',
      color: 'var(--primary)',
      textTransform: 'uppercase',
      marginBottom: '4px',
      fontFamily: 'var(--font-headline)',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-headline)',
      margin: 0,
    },
    cardWrapper: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      maxHeight: '600px',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--editorial-shadow)',
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
      height: '55%',
      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
      pointerEvents: 'none',
    },
    cardInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px',
      zIndex: 3,
    },
    nameRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px',
    },
    name: {
      fontSize: '26px',
      fontWeight: 800,
      color: '#fff',
      fontFamily: 'var(--font-headline)',
    },
    age: {
      fontSize: '22px',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.9)',
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      background: '#1a73e8',
      color: '#fff',
      fontSize: '14px',
    },
    location: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '13px',
      color: 'rgba(255,255,255,0.8)',
      marginBottom: '8px',
    },
    bio: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.85)',
      lineHeight: 1.5,
      marginBottom: '10px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    interestChips: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
    },
    chip: {
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(8px)',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 600,
    },
    imageIndicators: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      right: '12px',
      display: 'flex',
      gap: '4px',
      zIndex: 4,
    },
    indicator: (active) => ({
      flex: 1,
      height: '3px',
      borderRadius: '2px',
      background: active ? '#fff' : 'rgba(255,255,255,0.4)',
      transition: 'background 0.2s',
    }),
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
      border: `4px solid ${type === 'like' ? '#4CAF50' : 'var(--error)'}`,
      color: type === 'like' ? '#4CAF50' : 'var(--error)',
      opacity: type ? 1 : 0,
      transition: 'opacity 0.15s',
      pointerEvents: 'none',
      zIndex: 5,
      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }),
    actionsRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '24px',
    },
    actionBtn: (size, bg, shadow) => ({
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
    }),
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
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(174,47,52,0.25)',
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
      border: '3px solid var(--surface-container-high)',
      borderTop: '3px solid var(--primary)',
      borderRadius: '50%',
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
    infoBtn: {
      position: 'absolute',
      bottom: '24px',
      right: '24px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
      color: '#fff',
      zIndex: 4,
    },
  };

  // Inject keyframes for spinner
  useEffect(() => {
    const styleId = 'swipe-keyframes';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        @keyframes spin { to { transform: rotate(360deg); } }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  return (
    <div style={styles.container}>
      {matchUser && <MatchPopup user={matchUser} onClose={() => setMatchUser(null)} />}

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.headerLabel}>SMART MATCHES</p>
        <h1 style={styles.headerTitle}>Tim nguoi phu hop</h1>
      </div>

      {/* Main Card */}
      {!profiles.length && !currentProfile ? (
        <div style={styles.loadingSpinner}>
          <div style={styles.spinner} />
        </div>
      ) : currentProfile ? (
        <>
          <div
            style={styles.cardWrapper}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Image indicators */}
            {images.length > 1 && (
              <div style={styles.imageIndicators}>
                {images.map((_, idx) => (
                  <div key={idx} style={styles.indicator(idx === currentImageIndex)} />
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

            <img
              src={currentImg}
              alt={currentProfile.name}
              style={{ ...styles.cardImage, opacity: imgLoaded ? 1 : 0 }}
              onLoad={() => setImgLoaded(true)}
              onError={(e) => {
                setImgLoaded(true);
                e.target.style.display = 'none';
              }}
              draggable={false}
            />

            {/* Gradient overlay */}
            <div style={styles.gradientOverlay} />

            {/* Tap zones for image navigation */}
            {images.length > 1 && (
              <>
                <div
                  style={styles.navZone('left')}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentImageIndex > 0) setCurrentImageIndex(prev => prev - 1);
                  }}
                />
                <div
                  style={styles.navZone('right')}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentImageIndex < images.length - 1) setCurrentImageIndex(prev => prev + 1);
                  }}
                />
              </>
            )}

            {/* Swipe feedback overlay */}
            {swipeFeedback && (
              <div style={styles.feedbackOverlay(swipeFeedback)}>
                {swipeFeedback === 'like' ? 'LIKE' : 'NOPE'}
              </div>
            )}

            {/* Card info */}
            <div style={styles.cardInfo}>
              <div style={styles.nameRow}>
                <span style={styles.name}>{currentProfile.name}</span>
                <span style={styles.age}>{currentProfile.age}</span>
                {currentProfile.verified && (
                  <span style={styles.verifiedBadge}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                  </span>
                )}
              </div>

              <div style={styles.location}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                <span>{currentProfile.location || 'Ha Noi'}</span>
              </div>

              {currentProfile.bio && (
                <div style={styles.bio}>{currentProfile.bio}</div>
              )}

              {(() => {
                const tags = Array.isArray(currentProfile.interests) ? currentProfile.interests : (typeof currentProfile.interests === 'string' ? (() => { try { return JSON.parse(currentProfile.interests); } catch { return []; } })() : []);
                return tags.length > 0 ? (
                  <div style={styles.interestChips}>
                    {tags.slice(0, 5).map((tag, i) => (
                      <span key={i} style={styles.chip}>{tag}</span>
                    ))}
                  </div>
                ) : null;
              })()}
            </div>

            {/* Info button */}
            <button
              style={styles.infoBtn}
              onClick={(e) => { e.stopPropagation(); setIsDetailOpen(true); }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>info</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionsRow}>
            {/* Pass */}
            <button
              style={styles.actionBtn(56, 'var(--surface-container-high)', 'var(--card-shadow)')}
              onClick={() => handleSwipe('left')}
              aria-label="Pass"
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--on-surface-variant)' }}>close</span>
            </button>

            {/* Super Like */}
            <button
              style={styles.actionBtn(48, 'var(--tertiary-container)', 'var(--card-shadow)')}
              onClick={handleSuperLike}
              aria-label="Super Like"
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#fff' }}>star</span>
            </button>

            {/* Like */}
            <button
              style={{
                ...styles.actionBtn(64, 'var(--primary-gradient)', '0 6px 20px rgba(174,47,52,0.35)'),
              }}
              onClick={() => handleSwipe('right')}
              aria-label="Like"
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span className="material-symbols-outlined filled" style={{ fontSize: '32px', color: 'var(--on-primary)' }}>favorite</span>
            </button>
          </div>
        </>
      ) : (
        /* Empty state */
        <div style={styles.emptyState}>
          <span className="material-symbols-outlined" style={styles.emptyIcon}>sentiment_satisfied</span>
          <h3 style={styles.emptyTitle}>Het roi!</h3>
          <p style={styles.emptySubtext}>
            Ban da xem het cac goi y. Quay lai sau de gap nguoi moi nhe!
          </p>
          <button
            style={styles.refreshBtn}
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
