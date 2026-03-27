import React, { useState, useEffect, useRef, useCallback } from 'react';
import MatchPopup from '../../components/User/MatchPopup';
import { useAppContext } from '../../AppContext';
import ProfileDetailModal from '../../components/User/ProfileDetailModal';

// ─── Mock data ────────────────────────────────────────────────────────────────
const CURRENT_USER = {
  name: 'Hằng Thị',
  title: 'Chuyên gia Khám phá',
  visaCount: 42,
  visaTotal: 100,
  vangPoints: 1250,
  visaCollection: 12,
  visaCollectionGoal: 20,
};

const MATCH_PROFILES = [
  {
    id: 'mia',
    name: 'Mia Patel',
    age: 24,
    location: 'Quận 1, TP. Hồ Chí Minh',
    match: 88,
    visaBadge: 'VISA PHỞ BÒ',
    visaStatus: 'ĐÃ DUYỆT',
    tags: ['#StreetFood', '#FineDining'],
    bio: 'Tìm kiếm một nửa yêu thích #VisaSushi & #VisaPhoBo',
    gradient: 'linear-gradient(160deg, #3a1a00 0%, #8b3a00 40%, #c0541a 70%, #4a1800 100%)',
    emoji: '🍜',
    tasteProfile: { cay: 70, ngot: 45, chua: 60, umami: 85, dang: 30 },
    icebreaker: 'Phở hay bún bò cho bữa sáng lý tưởng?',
  },
  {
    id: 'linh',
    name: 'Linh Chi',
    age: 22,
    location: 'Hoàn Kiếm, Hà Nội',
    match: 76,
    visaBadge: 'VISA SUSHI',
    visaStatus: 'ĐÃ DUYỆT',
    tags: ['#FineDining', '#Ramen'],
    bio: 'Đam mê ẩm thực Nhật Bản và các món fusion hiện đại',
    gradient: 'linear-gradient(160deg, #001a2a 0%, #00425a 40%, #00688a 70%, #001020 100%)',
    emoji: '🍣',
    tasteProfile: { cay: 30, ngot: 55, chua: 40, umami: 90, dang: 65 },
    icebreaker: 'Omakase hay à la carte theo bạn cái nào thú vị hơn?',
  },
  {
    id: 'nam',
    name: 'Nam Phong',
    age: 27,
    location: 'Bình Thạnh, TP. Hồ Chí Minh',
    match: 82,
    visaBadge: 'VISA BÚN BÒ',
    visaStatus: 'ĐÃ DUYỆT',
    tags: ['#StreetFood', '#SpicyFood'],
    bio: 'Không có bữa ăn nào tốt bằng bữa ăn cùng đúng người',
    gradient: 'linear-gradient(160deg, #2a0a0a 0%, #6b1a0a 40%, #a03a1a 70%, #3a0808 100%)',
    emoji: '🌶️',
    tasteProfile: { cay: 95, ngot: 30, chua: 70, umami: 60, dang: 40 },
    icebreaker: 'Bún bò Huế chuẩn vị hay biến tấu thêm topping?',
  },
  {
    id: 'thu',
    name: 'Thu Hà',
    age: 25,
    location: 'Đống Đa, Hà Nội',
    match: 71,
    visaBadge: 'VISA BÁNh MÌ',
    visaStatus: 'ĐÃ DUYỆT',
    tags: ['#Banh Mi', '#CafeHopping'],
    bio: 'Bánh mì & cà phê là ngôn ngữ tình yêu của mình',
    gradient: 'linear-gradient(160deg, #1a1500 0%, #4a3a00 40%, #8a6a00 70%, #2a2000 100%)',
    emoji: '🥖',
    tasteProfile: { cay: 50, ngot: 65, chua: 55, umami: 45, dang: 75 },
    icebreaker: 'Bánh mì pate hay bánh mì xíu mại theo bạn?',
  },
];

const VISA_COLLECTION = [
  { id: 1, name: 'Phở Bò', emoji: '🍜', gradient: 'linear-gradient(135deg, #8b3a00, #c0541a)', status: 'approved' },
  { id: 2, name: 'Sushi', emoji: '🍣', gradient: 'linear-gradient(135deg, #00425a, #00688a)', status: 'approved' },
  { id: 3, name: 'Bún Bò', emoji: '🌶️', gradient: 'linear-gradient(135deg, #6b1a0a, #a03a1a)', status: 'approved' },
  { id: 4, name: 'Bánh Mì', emoji: '🥖', gradient: 'linear-gradient(135deg, #4a3a00, #8a6a00)', status: 'pending' },
  { id: 5, name: 'Bún Chả', emoji: '🍖', gradient: 'linear-gradient(135deg, #1a3a1a, #2a6a2a)', status: 'approved' },
  { id: 6, name: 'Cơm Tấm', emoji: '🍚', gradient: 'linear-gradient(135deg, #3a1a3a, #6a2a6a)', status: 'pending' },
];

const MISSIONS = [
  { id: 1, label: 'Ghé thăm 3 quán phở', reward: 150, done: true },
  { id: 2, label: 'Match với người có VISA Sushi', reward: 200, done: false },
  { id: 3, label: 'Hoàn thành Khẩu vị Cay Lv.3', reward: 300, done: false },
  { id: 4, label: 'Chia sẻ bộ sưu tập Visa', reward: 100, done: true },
];

// ─── Mini components ───────────────────────────────────────────────────────────
const TasteBar = ({ label, value, color }) => (
  <div style={{ marginBottom: '8px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
      <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', textTransform: 'capitalize' }}>{label}</span>
      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--on-surface)', fontFamily: 'var(--font-body)' }}>{value}%</span>
    </div>
    <div style={{ height: '6px', borderRadius: '3px', background: 'var(--outline-variant)', overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${value}%`,
        borderRadius: '3px',
        background: color,
        transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
      }} />
    </div>
  </div>
);

// ─── SwipePage ────────────────────────────────────────────────────────────────
const SwipePage = () => {
  const { profiles: apiProfiles, swipe, fetchProfiles } = useAppContext();

  // Combine API profiles with mock profiles — mock profiles fill in when API is empty
  const profiles = (apiProfiles && apiProfiles.length > 0) ? apiProfiles : MATCH_PROFILES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('entering');
  const [matchUser, setMatchUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState(null); // 'like' | 'nope' | null
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const lastSwipeRef = useRef(0);
  const swipeTimeoutRef = useRef(null);
  const dragStartRef = useRef(0);

  useEffect(() => {
    fetchProfiles && fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Keyframes injection
  useEffect(() => {
    const id = 'taste-twin-keyframes';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = `
        @keyframes ttSpin { to { transform: rotate(360deg); } }
        @keyframes ttPulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes ttSlideUp { from { transform: translateY(12px); opacity:0; } to { transform: translateY(0); opacity:1; } }
        @keyframes ttFeedbackIn { from { transform: translate(-50%,-50%) rotate(-15deg) scale(0.7); opacity:0; } to { transform: translate(-50%,-50%) rotate(-15deg) scale(1); opacity:1; } }
      `;
      document.head.appendChild(el);
    }
  }, []);

  const currentProfile = profiles[currentIndex];

  // Normalise a profile — works for both API shape and mock shape
  const normalise = (p) => {
    if (!p) return null;
    return {
      id: p.id,
      name: p.name || 'Người dùng',
      age: p.age || '',
      location: p.location || p.city || '',
      match: p.match || p.matchScore || 80,
      visaBadge: p.visaBadge || 'VISA ẨM THỰC',
      visaStatus: p.visaStatus || 'ĐÃ DUYỆT',
      tags: p.tags || ['#StreetFood'],
      bio: p.bio || '',
      gradient: p.gradient || 'linear-gradient(160deg, #3a1a00 0%, #8b3a00 60%, #4a1800 100%)',
      emoji: p.emoji || '🍽️',
      tasteProfile: p.tasteProfile || { cay: 60, ngot: 50, chua: 55, umami: 70, dang: 40 },
      icebreaker: p.icebreaker || 'Món ăn yêu thích của bạn là gì?',
    };
  };

  const profile = normalise(currentProfile);

  const handleSwipe = useCallback(async (direction) => {
    if (currentIndex >= profiles.length) return;
    const now = Date.now();
    if (now - lastSwipeRef.current < 400) return;
    lastSwipeRef.current = now;

    const action = direction === 'right' ? 'like' : 'dislike';
    setSwipeFeedback(direction === 'right' ? 'like' : 'nope');
    setAnimationClass(direction === 'right' ? 'exit-right' : 'exit-left');

    if (swipe && currentProfile?.id) {
      const result = await swipe(currentProfile.id, action);
      if (result?.matched && result?.matchUser) {
        setMatchUser(result.matchUser);
      }
    }

    if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    swipeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setAnimationClass('entering');
      setSwipeFeedback(null);
      setDragX(0);
    }, 350);
  }, [currentIndex, profiles.length, swipe, currentProfile]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!profile) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowLeft') handleSwipe('left');
      else if (e.key === 'ArrowRight') handleSwipe('right');
      else if (e.key === 'ArrowUp') { e.preventDefault(); setIsDetailOpen(true); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    };
  }, [profile, handleSwipe]);

  useEffect(() => {
    document.title = profile ? `Taste Twin — ${profile.name}` : 'Taste Twin';
  }, [profile]);

  // ── Derived transform ──
  const cardTransform = isDragging
    ? `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`
    : animationClass === 'exit-right'
      ? 'translateX(120%) rotate(15deg)'
      : animationClass === 'exit-left'
        ? 'translateX(-120%) rotate(-15deg)'
        : 'translateX(0) rotate(0)';

  const cardOpacity = (animationClass === 'exit-right' || animationClass === 'exit-left') ? 0 : 1;

  // ── Next profiles peek ──
  const nextProfiles = profiles.slice(currentIndex + 1, currentIndex + 4).map(normalise);

  // ─── Render helpers ────────────────────────────────────────────────────────

  const renderPassportSection = () => (
    <div style={{
      background: 'var(--surface-container-lowest)',
      borderRadius: '16px',
      padding: '16px',
      border: '1px solid var(--outline-variant)',
      marginBottom: '16px',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: 'var(--primary)', textTransform: 'uppercase', margin: '0 0 2px', fontFamily: 'var(--font-headline)' }}>
            TRẠNG THÁI HỒ CHIẾU
          </p>
          <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--on-surface)', margin: 0, fontFamily: 'var(--font-headline)' }}>
            {CURRENT_USER.name}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)', margin: '2px 0 0', fontFamily: 'var(--font-body)' }}>
            {CURRENT_USER.title}
          </p>
        </div>
        {/* VÀNG badge */}
        <div style={{
          background: 'linear-gradient(135deg, #b8860b, #ffd700)',
          borderRadius: '12px',
          padding: '8px 12px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '16px', fontWeight: 800, color: '#3a2800', margin: 0, fontFamily: 'var(--font-headline)' }}>
            {CURRENT_USER.vangPoints.toLocaleString()}
          </p>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: '#3a2800', margin: 0, fontFamily: 'var(--font-headline)' }}>
            VÀNG
          </p>
        </div>
      </div>
      {/* Visa collection stat */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>Visa Collection</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--on-surface)', fontFamily: 'var(--font-headline)' }}>
          {CURRENT_USER.visaCollection}/{CURRENT_USER.visaCollectionGoal}
        </span>
      </div>
      {/* Progress bar */}
      <div style={{ height: '6px', borderRadius: '3px', background: 'var(--outline-variant)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${(CURRENT_USER.visaCollection / CURRENT_USER.visaCollectionGoal) * 100}%`,
          borderRadius: '3px',
          background: 'linear-gradient(90deg, var(--primary), #e05020)',
        }} />
      </div>
    </div>
  );

  const renderTasteEvolution = (tp) => {
    const bars = [
      { key: 'cay', label: 'Cay', color: '#e53935' },
      { key: 'ngot', label: 'Ngọt', color: '#f9a825' },
      { key: 'chua', label: 'Chua', color: '#43a047' },
      { key: 'umami', label: 'Umami', color: '#6d4c41' },
      { key: 'dang', label: 'Đắng', color: '#5e35b1' },
    ];
    return (
      <div style={{
        background: 'var(--surface-container-lowest)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid var(--outline-variant)',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: 'var(--on-surface)', textTransform: 'uppercase', margin: '0 0 12px', fontFamily: 'var(--font-headline)' }}>
          Tiến Hóa Khẩu Vị
        </p>
        {bars.map(b => <TasteBar key={b.key} label={b.label} value={tp?.[b.key] ?? 50} color={b.color} />)}
      </div>
    );
  };

  const renderMatchCard = () => {
    if (!profile) return null;
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          transform: cardTransform,
          opacity: cardOpacity,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s ease',
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Photo background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: profile.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '120px', opacity: 0.25, userSelect: 'none' }}>{profile.emoji}</span>
        </div>

        {/* Top gradient overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '35%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom gradient overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Match % badge — top right */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '9999px',
          padding: '5px 12px',
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-headline)' }}>
            {profile.match}% Palate Match
          </span>
        </div>

        {/* Visa badge — top left */}
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          background: 'rgba(22,101,52,0.9)',
          borderRadius: '9999px',
          padding: '5px 12px',
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#86efac', letterSpacing: '0.5px', fontFamily: 'var(--font-headline)' }}>
            {profile.visaBadge} — {profile.visaStatus}
          </span>
        </div>

        {/* Card info bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 16px', zIndex: 4 }}>
          {/* Name + location */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-headline)', lineHeight: 1 }}>
                {profile.name}
              </span>
              <span style={{ fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-headline)' }}>
                {profile.age}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>location_on</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>{profile.location}</span>
            </div>
          </div>

          {/* Action buttons inside card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '4px',
          }}>
            {/* Pass */}
            <button
              onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }}
              aria-label="Bỏ qua"
              style={{
                width: '56px', height: '56px', borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'transform 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(239,68,68,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; }}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '28px', color: '#fff' }}>close</span>
            </button>

            {/* Like */}
            <button
              onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }}
              aria-label="Thích"
              style={{
                width: '68px', height: '68px', borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, #ff6b6b, #ad2c00)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(173,44,0,0.55)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '34px', color: '#fff' }}>favorite</span>
            </button>
          </div>
        </div>

        {/* Swipe feedback overlay */}
        {swipeFeedback && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotate(-15deg)',
            fontSize: '42px', fontWeight: 900,
            fontFamily: 'var(--font-headline)',
            letterSpacing: '4px',
            padding: '8px 24px',
            borderRadius: '12px',
            color: swipeFeedback === 'like' ? '#22c55e' : '#ef4444',
            border: `3px solid ${swipeFeedback === 'like' ? '#22c55e' : '#ef4444'}`,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            animation: 'ttFeedbackIn 0.15s ease',
            pointerEvents: 'none',
            zIndex: 8,
          }}>
            {swipeFeedback === 'like' ? 'THÍCH' : 'BỎ'}
          </div>
        )}
      </div>
    );
  };

  const renderCommonTags = () => {
    if (!profile) return null;
    return (
      <div style={{
        background: 'var(--surface-container-lowest)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid var(--outline-variant)',
        marginTop: '16px',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: 'var(--on-surface)', textTransform: 'uppercase', margin: '0 0 10px', fontFamily: 'var(--font-headline)' }}>
          Sở thích chung
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {profile.tags.map(tag => (
            <span key={tag} style={{
              background: 'rgba(173,44,0,0.08)',
              color: 'var(--primary)',
              borderRadius: '9999px',
              padding: '5px 12px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              border: '1px solid rgba(173,44,0,0.2)',
            }}>{tag}</span>
          ))}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '6px', padding: '8px',
          background: 'rgba(173,44,0,0.06)', borderRadius: '10px',
        }}>
          <span style={{ fontSize: '18px' }}>💫</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-headline)' }}>
            {profile.match}% Palate Match
          </span>
        </div>
      </div>
    );
  };

  const renderVisaCollection = () => (
    <div style={{ marginTop: '16px' }}>
      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: 'var(--on-surface)', textTransform: 'uppercase', margin: '0 0 10px', fontFamily: 'var(--font-headline)' }}>
        Visa Collection Preview
      </p>
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '8px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {VISA_COLLECTION.map(visa => (
          <div key={visa.id} style={{
            flexShrink: 0,
            width: '80px',
            borderRadius: '14px',
            overflow: 'hidden',
            border: `2px solid ${visa.status === 'approved' ? 'rgba(22,101,52,0.4)' : 'var(--outline-variant)'}`,
            background: visa.gradient,
            aspectRatio: '2/3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            position: 'relative',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: '28px' }}>{visa.emoji}</span>
            <span style={{
              fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.9)',
              textAlign: 'center', padding: '0 4px', fontFamily: 'var(--font-headline)',
              textTransform: 'uppercase', letterSpacing: '0.3px',
            }}>{visa.name}</span>
            {visa.status === 'approved' && (
              <div style={{
                position: 'absolute', bottom: '5px', right: '5px',
                width: '14px', height: '14px', borderRadius: '50%',
                background: '#22c55e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '10px', color: '#fff' }}>check</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMissions = () => (
    <div style={{
      background: 'var(--surface-container-lowest)',
      borderRadius: '16px',
      padding: '16px',
      border: '1px solid var(--outline-variant)',
      marginBottom: '16px',
    }}>
      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: 'var(--on-surface)', textTransform: 'uppercase', margin: '0 0 12px', fontFamily: 'var(--font-headline)' }}>
        Sắn Điểm Vàng
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {MISSIONS.map(m => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px',
            background: m.done ? 'rgba(22,101,52,0.07)' : 'var(--surface-container)',
            borderRadius: '10px',
            border: `1px solid ${m.done ? 'rgba(22,101,52,0.2)' : 'transparent'}`,
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
              background: m.done ? '#22c55e' : 'var(--outline-variant)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {m.done && <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '12px', color: '#fff' }}>check</span>}
            </div>
            <span style={{
              flex: 1, fontSize: '12px',
              color: m.done ? 'var(--on-surface-variant)' : 'var(--on-surface)',
              fontFamily: 'var(--font-body)',
              textDecoration: m.done ? 'line-through' : 'none',
            }}>{m.label}</span>
            <span style={{
              fontSize: '11px', fontWeight: 700,
              color: '#b8860b',
              fontFamily: 'var(--font-headline)',
            }}>+{m.reward}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMenuSuggestion = () => (
    <div style={{
      background: 'linear-gradient(135deg, var(--primary), #7a1f00)',
      borderRadius: '16px',
      padding: '18px',
    }}>
      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', margin: '0 0 4px', fontFamily: 'var(--font-headline)' }}>
        Gợi ý Thực đơn
      </p>
      <p style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: '0 0 6px', fontFamily: 'var(--font-headline)' }}>
        Nhà hàng Ngon
      </p>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: '0 0 14px', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
        Phù hợp với khẩu vị của bạn và {profile?.name || 'người match'}. Thử ngay hôm nay!
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {['🍜 Phở bò', '🥗 Gỏi cuốn', '🍚 Cơm tấm'].map(item => (
          <span key={item} style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '9999px',
            padding: '4px 10px',
            fontSize: '11px',
            color: '#fff',
            fontFamily: 'var(--font-body)',
          }}>{item}</span>
        ))}
      </div>
      <button style={{
        width: '100%',
        padding: '11px',
        borderRadius: '9999px',
        background: '#fff',
        border: 'none',
        fontSize: '13px',
        fontWeight: 700,
        color: 'var(--primary)',
        cursor: 'pointer',
        fontFamily: 'var(--font-headline)',
        transition: 'opacity 0.15s',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        Đặt chỗ ngay
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '400px', textAlign: 'center', padding: '32px 24px',
    }}>
      <span style={{ fontSize: '72px', marginBottom: '16px' }}>🍽️</span>
      <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--on-surface)', fontFamily: 'var(--font-headline)', marginBottom: '8px' }}>
        Hết gợi ý rồi!
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', lineHeight: 1.6, maxWidth: '280px', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
        Bạn đã xem hết các gợi ý. Quay lại sau để gặp những Taste Twin mới nhé!
      </p>
      <button
        style={{
          padding: '12px 32px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, #ff6b6b, #ad2c00)',
          color: '#fff', border: 'none',
          fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(173,44,0,0.35)',
          fontFamily: 'var(--font-headline)',
        }}
        onClick={() => { setCurrentIndex(0); setAnimationClass('entering'); }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>refresh</span>
          Tải lại
        </span>
      </button>
    </div>
  );

  // ── Layout ──────────────────────────────────────────────────────────────────

  const centerContent = (
    <>
      {/* Page heading */}
      <div style={{ marginBottom: '18px', animation: 'ttSlideUp 0.4s ease' }}>
        <p style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
          color: 'var(--primary)', textTransform: 'uppercase',
          margin: '0 0 4px', fontFamily: 'var(--font-headline)',
        }}>TASTE TWIN</p>
        <h1 style={{
          fontSize: isDesktop ? '28px' : '24px', fontWeight: 800,
          color: 'var(--on-surface)', margin: '0 0 4px',
          fontFamily: 'var(--font-headline)', lineHeight: 1.2,
        }}>
          Taste Twin
        </h1>
        <p style={{
          fontSize: '13px', color: 'var(--on-surface-variant)',
          margin: 0, fontFamily: 'var(--font-body)', lineHeight: 1.5,
        }}>
          Tìm người cùng tần số ẩm thực qua hệ thống Visa Món ăn.
        </p>
      </div>

      {/* Match card */}
      {currentIndex < profiles.length ? renderMatchCard() : renderEmptyState()}

      {/* Below card content (only when there is a profile) */}
      {currentIndex < profiles.length && (
        <>
          {renderCommonTags()}
          {!isDesktop && renderVisaCollection()}

          {/* Bio */}
          {profile?.bio && (
            <div style={{
              marginTop: '16px',
              padding: '14px 16px',
              background: 'var(--surface-container-lowest)',
              borderRadius: '14px',
              border: '1px solid var(--outline-variant)',
            }}>
              <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Về {profile.name}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--on-surface)', margin: 0, fontFamily: 'var(--font-body)', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{profile.bio}"
              </p>
            </div>
          )}

          {/* Upcoming profiles peek */}
          {nextProfiles.length > 0 && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                Đang chờ
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {nextProfiles.map((p, idx) => (
                  <div key={idx} style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: p.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', opacity: 0.5,
                    border: '2px solid var(--outline-variant)',
                  }}>
                    {p.emoji}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );

  if (isDesktop) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--background)',
        fontFamily: 'var(--font-body)',
        padding: '24px',
      }}>
        {matchUser && <MatchPopup user={matchUser} onClose={() => setMatchUser(null)} />}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '3fr 6fr 3fr',
          gap: '20px',
          alignItems: 'start',
        }}>
          {/* Left sidebar */}
          <div>
            {renderPassportSection()}
            {profile && renderTasteEvolution(profile.tasteProfile)}
          </div>

          {/* Center */}
          <div>
            {centerContent}
            {currentIndex < profiles.length && renderVisaCollection()}
          </div>

          {/* Right sidebar */}
          <div>
            {renderMissions()}
            {renderMenuSuggestion()}
          </div>
        </div>

        <ProfileDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          profile={currentProfile}
        />
      </div>
    );
  }

  // ── Mobile layout ────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      fontFamily: 'var(--font-body)',
      padding: '16px 16px 32px',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      {matchUser && <MatchPopup user={matchUser} onClose={() => setMatchUser(null)} />}

      {/* Mobile passport header */}
      {renderPassportSection()}

      {centerContent}

      <ProfileDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        profile={currentProfile}
      />
    </div>
  );
};

export default SwipePage;
