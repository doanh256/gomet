import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, Star, Zap, RotateCcw, ChevronLeft, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import MatchPopup from '../../components/User/MatchPopup';

const ActionButton = ({ icon: Icon, colorClass, size, customStyle, onClick, ariaLabel }) => (
  <button aria-label={ariaLabel || colorClass} className={`action-btn ${size} ${colorClass}`} style={{...customStyle, zIndex: 50}} onClick={onClick}>
    <Icon size={size === 'btn-large' ? 32 : 24} strokeWidth={size === 'btn-large' ? 2 : 2.5} />
  </button>
);

import { useAppContext } from '../../AppContext';
import { useToast } from '../../components/ToastNotification';
import ProfileDetailModal from '../../components/User/ProfileDetailModal';

const SwipePage = () => {
  const { profiles, swipe, fetchProfiles } = useAppContext();
  const { addToast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('card-entering');
  const [matchUser, setMatchUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const lastSwipeRef = useRef(0);
  const swipeTimeoutRef = useRef(null);

  // Fetch profiles on mount
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const currentProfile = profiles[currentIndex];

  // Helper to get images array from profile
  const getImages = (profile) => {
    if (!profile) return [];
    if (profile.images && profile.images.length > 0) {
      return profile.images.map(img => typeof img === 'string' ? img : img.url);
    }
    if (profile.avatar) return [profile.avatar];
    return [];
  };

  const handleSwipe = async (direction) => {
    if (currentIndex >= profiles.length) return;
    const now = Date.now();
    if (now - lastSwipeRef.current < 300) return;
    lastSwipeRef.current = now;

    const action = direction === 'right' ? 'like' : 'dislike';

    setAnimationClass(direction === 'right' ? 'swipe-right' : 'swipe-left');

    // Call API
    const result = await swipe(currentProfile.id, action);
    if (result?.matched && result?.matchUser) {
      setMatchUser(result.matchUser);
    }

    if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    swipeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setCurrentImageIndex(0);
      setAnimationClass('');
    }, 300);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setCurrentImageIndex(0);
    }
  };

  const handleSuperLike = async () => {
    if (currentProfile) {
      setAnimationClass('swipe-right');
      const result = await swipe(currentProfile.id, 'superlike');
      if (result?.matched && result?.matchUser) {
        setMatchUser(result.matchUser);
      }
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
      swipeTimeoutRef.current = setTimeout(() => {
        setAnimationClass('card-entering');
        setImgLoaded(false);
        setCurrentIndex(prev => prev + 1);
        setCurrentImageIndex(0);
      }, 300);
    }
  };

  const handleBoost = () => {
    addToast('Đã kích hoạt tính năng Tăng Tốc (Boost) làm nổi bật!', 'info');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentProfile) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      
      switch(e.key) {
        case 'ArrowLeft':
          handleSwipe('left');
          break;
        case 'ArrowRight':
          handleSwipe('right');
          break;
        case ' ':
          e.preventDefault();
          if (getImages(currentProfile).length > 0 && currentImageIndex < getImages(currentProfile).length - 1) {
            setCurrentImageIndex(prev => prev + 1);
          } else {
            setCurrentImageIndex(0);
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
      // Cleanup swipe timeout on unmount (Memory leak fix)
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    };

  }, [currentIndex, currentImageIndex, currentProfile]);

  useEffect(() => {
    if (currentProfile) {
      document.title = `Kèo: ${currentProfile.name} (${currentProfile.age})`;
    } else {
      document.title = 'Kèo: Hết lượt hiển thị';
    }
  }, [currentProfile]);

  return (
    <div className="main-area">
      {matchUser && <MatchPopup user={matchUser} onClose={() => setMatchUser(null)} />}
      
      {/* Top Nav */}
      <div className="main-top-nav">
        <X size={28} className="close-btn" cursor="pointer" />
        <div className="nav-title">Mối quan hệ không ràng buộc</div>
        <div style={{ width: 28 }}></div> {/* Spacer for centering */}
      </div>

      <div className="matching-container">
        {/* Tinder Card */}
        {currentProfile ? (
          <div className={`tinder-card ${animationClass}`} style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}>
            {/* Shimmer loading placeholder */}
            {!imgLoaded && (
              <div className="shimmer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
            )}
            <img 
              src={getImages(currentProfile)[currentImageIndex] || currentProfile.avatar} 
              alt={currentProfile.name} 
              className="card-image"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => { setImgLoaded(true); e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #1f1140 0%, #fd5068 100%)'; }}
            />
            <div className="card-overlay"></div>

            {/* Stories Indicators */}
            {getImages(currentProfile).length > 1 && (
              <div className="story-indicators">
                {getImages(currentProfile).map((img, idx) => (
                  <div key={idx} className={`story-dot ${idx === currentImageIndex ? 'active' : ''}`}></div>
                ))}
              </div>
            )}

            {/* First-time hint: Tap to see more photos */}
            {currentIndex === 0 && currentImageIndex === 0 && getImages(currentProfile).length > 1 && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.6)', borderRadius: '16px', padding: '12px 20px',
                color: 'white', fontSize: '14px', fontWeight: 600, pointerEvents: 'none',
                animation: 'fadeOut 3s ease-out forwards', zIndex: 5, whiteSpace: 'nowrap'
              }}>
                👆 Chạm 2 bên để xem thêm ảnh
              </div>
            )}

            <div 
              className="card-nav left" 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (currentImageIndex > 0) setCurrentImageIndex(prev => prev - 1); 
              }}
              style={{ display: currentImageIndex > 0 ? 'flex' : 'none' }}
            >
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '50%', padding: '4px' }}>
                <ChevronLeft size={28} />
              </div>
            </div>
            <div 
              className="card-nav right" 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (getImages(currentProfile).length > 0 && currentImageIndex < getImages(currentProfile).length - 1) setCurrentImageIndex(prev => prev + 1); 
              }}
              style={{ display: (getImages(currentProfile).length > 0 && currentImageIndex < getImages(currentProfile).length - 1) ? 'flex' : 'none' }}
            >
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '50%', padding: '4px' }}>
                <ChevronRight size={28} />
              </div>
            </div>

            <div className="card-info" style={{ padding: '24px' }}>
              {/* Vùng Lên Kèo / Activity Intent + Time/Place */}
              {currentProfile.activityIntent && (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '16px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '28px', lineHeight: 1 }}>{currentProfile.activityIcon}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        {currentProfile.activityIntent}
                      </h4>
                      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {currentProfile.activityTime && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>
                            <span>🕐</span><span>{currentProfile.activityTime}</span>
                          </div>
                        )}
                        {currentProfile.activityPlace && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
                            <span>📍</span><span>{currentProfile.activityPlace}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Thông tin Cá nhân thu nhỏ */}
              <div className="profile-name-row" style={{ alignItems: 'center' }}>
                <span className="profile-name" style={{ fontSize: '22px' }}>{currentProfile.name}</span>
                <span className="profile-age" style={{ fontSize: '20px' }}>{currentProfile.age}</span>
                {currentProfile.verified && (
                  <div className="verified-badge">
                    <CheckCircle2 size={16} fill="#fff" stroke="#1a73e8" />
                  </div>
                )}
                <div className="info-btn" onClick={() => setIsDetailOpen(true)} style={{ marginLeft: 'auto' }}>
                  <Info size={16} color="white" />
                </div>
              </div>
              
              <div className="profile-details" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍 Sống tại {currentProfile.location || 'Hà Nội'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: '72px', marginBottom: '8px' }}>🏖️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
              Bạn đã xem hết mọi Kèo gần đây! 🎉
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-light)', lineHeight: 1.6, maxWidth: '300px' }}>
              Nghỉ ngơi chút nhé — Kèo mới đang trên đường đến.
              Mở rộng phạm vi để gặp thêm người!
            </p>
            <button 
              onClick={() => { setCurrentIndex(0); setCurrentImageIndex(0); setAnimationClass('card-entering'); setImgLoaded(false); fetchProfiles(); }}
              style={{
                marginTop: '8px', padding: '12px 32px', borderRadius: '30px',
                background: 'var(--app-gradient)', color: 'white', border: 'none',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(253, 80, 104, 0.3)'
              }}
            >
              🔄 Xem lại từ đầu
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <ActionButton ariaLabel="Undo" onClick={handleUndo} icon={RotateCcw} colorClass="btn-rewind" size="btn-small" />
          <ActionButton ariaLabel="Reject" onClick={() => handleSwipe('left')} icon={X} colorClass="btn-reject" size="btn-large" />
          <ActionButton ariaLabel="Super Like" onClick={handleSuperLike} icon={Star} colorClass="btn-superlike" size="btn-small" customStyle={{ color: '#21c4dc', fill: 'none' }} />
          <ActionButton ariaLabel="Like" onClick={() => handleSwipe('right')} icon={Heart} colorClass="btn-like" size="btn-large" customStyle={{ color: '#1dda95', fill: 'none' }} />
          <ActionButton ariaLabel="Boost" onClick={handleBoost} icon={Zap} colorClass="btn-boost" size="btn-small" customStyle={{ color: '#a450ff', fill: '#a450ff' }} />
        </div>

        {/* Desktop Footer Shortcuts */}
        <div className="desktop-footer">
          <div className="shortcut-item">
            <span className="key-badge">Ẩn</span>
          </div>
          <div className="shortcut-item" onClick={() => handleSwipe('left')} style={{ cursor: 'pointer' }}>
            <span className="key-badge">←</span> Không
          </div>
          <div className="shortcut-item" onClick={() => handleSwipe('right')} style={{ cursor: 'pointer' }}>
            <span className="key-badge">→</span> Thích
          </div>
          <div className="shortcut-item" onClick={() => setIsDetailOpen(true)} style={{ cursor: 'pointer' }}>
            <span className="key-badge">↑</span> Mở hồ sơ
          </div>
          <div className="shortcut-item" onClick={() => setIsDetailOpen(false)} style={{ cursor: 'pointer' }}>
            <span className="key-badge">↓</span> Đóng hồ sơ
          </div>
          <div className="shortcut-item" onClick={currentProfile ? handleSuperLike : null} style={{ cursor: currentProfile ? 'pointer' : 'default' }}>
            <span className="key-badge">↵</span> Siêu Thích
          </div>
          <div className="shortcut-item" onClick={() => {
            if (currentProfile && getImages(currentProfile).length > 0 && currentImageIndex < getImages(currentProfile).length - 1) {
              setCurrentImageIndex(prev => prev + 1);
            } else {
              setCurrentImageIndex(0);
            }
          }} style={{ cursor: 'pointer' }}>
            <span className="key-badge">Space</span> Ảnh tiếp theo
          </div>
        </div>
      </div>

      <ProfileDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        profile={currentProfile} 
      />
    </div>
  );
};

export default SwipePage;
