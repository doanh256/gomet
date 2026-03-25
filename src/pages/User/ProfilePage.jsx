import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastNotification';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';

const INTEREST_OPTIONS = ['Cong nghe', 'Nau an', 'Coffee', 'Du lich', 'The thao', 'Am nhac', 'Phim anh', 'Doc sach', 'Gaming', 'Nhiep anh', 'Yoga', 'Thu cung', 'An uong', 'Thoi trang', 'Nghe thuat'];

const TASTE_AXES = [
  { key: 'cay', label: 'Cay', value: 75, color: '#FF571A' },
  { key: 'umami', label: 'Umami', value: 60, color: '#FFB59E' },
  { key: 'chua', label: 'Chua', value: 45, color: '#FFD54F' },
  { key: 'ngot', label: 'Ngot', value: 80, color: '#117500' },
  { key: 'dang', label: 'Dang', value: 30, color: '#E6BEB2' },
  { key: 'man', label: 'Man', value: 55, color: '#FF571A' },
];

const RECENT_DISHES = [
  { id: 1, name: 'Bun bo Hue', restaurant: 'Quan Hue Xua', points: '+10 Vang' },
  { id: 2, name: 'Pho bo', restaurant: 'Pho Thin', points: '+10 Vang' },
  { id: 3, name: 'Com tam', restaurant: 'Com Tam Ba Ghien', points: '+10 Vang' },
  { id: 4, name: 'Banh mi', restaurant: 'Banh Mi Huynh Hoa', points: '+10 Vang' },
  { id: 5, name: 'Bun cha', restaurant: 'Bun Cha Dac Kim', points: '+10 Vang' },
];

const ProfilePage = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout } = useAppContext();
  const fileRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [age, setAge] = useState(currentUser?.age || '');
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [interests, setInterests] = useState(() => {
    const raw = currentUser?.interests;
    if (!raw) return [];
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Wallet
  const [walletBalance, setWalletBalance] = useState(currentUser?.walletBalance || 0);
  const [walletLoading, setWalletLoading] = useState(true);

  useEffect(() => {
    api.get('/wallet').then(data => {
      if (data) setWalletBalance(data.balance);
    }).catch(console.error).finally(() => setWalletLoading(false));
  }, []);

  const getAvatarUrl = () => {
    if (!currentUser) return '';
    return currentUser.avatar || currentUser.images?.[0]?.url || currentUser.images?.[0] || '';
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await api.upload('/upload/avatar', file, 'avatar');
      const data = await api.get('/auth/me');
      if (data?.user) await updateProfile({ avatar: data.user.avatar });
      addToast('Da cap nhat anh dai dien!', 'success');
    } catch (err) {
      addToast('Upload that bai', 'error');
    } finally {
      setUploading(false);
    }
  };

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : prev.length < 8 ? [...prev, interest] : prev
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        name, age: Number(age), gender, location, bio,
        interests: JSON.stringify(interests),
      });
      setEditing(false);
      addToast('Da luu ho so!', 'success');
    } catch (err) {
      addToast(err.message || 'Luu that bai', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Ban co chac chan muon xoa tai khoan? Hanh dong nay khong the hoan tac.')) return;
    try {
      await api.delete('/auth/account');
      if (logout) logout();
      navigate('/login');
    } catch (err) {
      addToast('Xoa tai khoan that bai', 'error');
    }
  };

  // Points and tier
  const vangPoints = walletBalance || 12450;
  const dishCount = 84;
  const tierTarget = 15000;
  const tierProgress = Math.min((vangPoints / tierTarget) * 100, 100);
  const pointsToNext = tierTarget - vangPoints;

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#FDF9F3',
      overflowY: 'auto',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
    },
    inner: {
      maxWidth: '480px',
      margin: '0 auto',
      padding: '32px 16px 100px',
    },

    // Avatar hero
    heroSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '28px',
      position: 'relative',
    },
    avatarRingOuter: {
      width: '134px',
      height: '134px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFD54F, #FF571A)',
      padding: '3px',
      position: 'relative',
    },
    avatarRingInner: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      overflow: 'hidden',
      background: '#FDF9F3',
    },
    avatar: {
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      objectFit: 'cover',
      display: 'block',
    },
    avatarFallback: {
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'var(--font-headline)',
      fontSize: '48px',
      fontWeight: 800,
    },
    avatarGlow: {
      position: 'absolute',
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,87,26,0.25) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 0,
    },
    tierBadgeAbsolute: {
      position: 'absolute',
      bottom: '-4px',
      right: '-4px',
      background: 'linear-gradient(135deg, #FFD54F, #FFC107)',
      color: '#3A0B00',
      fontSize: '11px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      padding: '4px 12px',
      borderRadius: '9999px',
      boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
      zIndex: 2,
    },
    cameraBtn: {
      position: 'absolute',
      bottom: '0px',
      left: '-4px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      zIndex: 2,
    },
    nameText: {
      fontFamily: 'var(--font-headline)',
      fontSize: '24px',
      fontWeight: 800,
      color: '#393834',
      margin: '16px 0 4px',
      textAlign: 'center',
    },
    goldBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      fontWeight: 700,
      color: '#b83500',
      background: 'rgba(184,53,0,0.1)',
      padding: '4px 14px',
      borderRadius: '9999px',
      marginBottom: '4px',
    },
    locationText: {
      fontSize: '13px',
      color: '#666460',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      justifyContent: 'center',
    },

    // Stats grid (2 cols)
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '24px',
    },
    statCard: {
      background: '#ffffff',
      borderRadius: '1.5rem',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0px 4px 16px rgba(0,0,0,0.06)',
    },
    statValue: (color) => ({
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
      color: color,
      margin: '8px 0 4px',
    }),
    statLabel: {
      fontSize: '13px',
      color: '#666460',
      fontWeight: 600,
    },

    // Tier progress
    tierSection: {
      background: '#ffffff',
      borderRadius: '1.5rem',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0px 4px 16px rgba(0,0,0,0.06), 0 0 0 2px rgba(184,53,0,0.1)',
    },
    tierHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
    },
    tierTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 700,
      color: '#393834',
      margin: 0,
    },
    tierTarget: {
      fontSize: '12px',
      color: '#666460',
    },
    progressOuter: {
      width: '100%',
      height: '12px',
      borderRadius: '6px',
      background: '#F0EBE3',
      marginBottom: '8px',
      overflow: 'hidden',
    },
    progressInner: {
      height: '12px',
      borderRadius: '6px',
      background: 'linear-gradient(135deg, #FFD54F, #FF571A)',
      transition: 'width 0.6s ease',
      boxShadow: '0 2px 8px rgba(255,87,26,0.3)',
    },
    tierHint: {
      fontSize: '12px',
      color: '#666460',
      textAlign: 'right',
    },

    // Section
    section: {
      marginBottom: '24px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 700,
      color: '#393834',
      margin: '0 0 14px',
    },

    // Recent dishes horizontal scroll
    hScroll: {
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      paddingBottom: '8px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    dishCard: {
      width: '120px',
      flexShrink: 0,
      textAlign: 'center',
      cursor: 'pointer',
    },
    dishImg: {
      width: '100px',
      height: '100px',
      borderRadius: '1rem',
      background: 'linear-gradient(135deg, var(--surface-container-high), var(--surface-container-highest))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 8px',
    },
    dishName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '13px',
      fontWeight: 700,
      color: '#393834',
      margin: '0 0 2px',
    },
    dishRestaurant: {
      fontSize: '11px',
      color: '#666460',
      margin: '0 0 2px',
    },
    dishPoints: {
      fontSize: '11px',
      fontWeight: 700,
      color: '#b83500',
    },

    // Interest chips
    chipsWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    chip: {
      padding: '8px 18px',
      borderRadius: '9999px',
      background: '#F0EBE3',
      color: '#393834',
      fontSize: '13px',
      fontWeight: 600,
    },

    // Edit button
    editBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: '9999px',
      border: 'none',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(255,87,26,0.3)',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },

    // Logout / danger
    logoutBtn: {
      width: '100%',
      padding: '14px',
      borderRadius: '9999px',
      border: 'none',
      background: '#F0EBE3',
      color: '#666460',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
    },
    deleteBtn: {
      width: '100%',
      padding: '14px',
      borderRadius: '9999px',
      border: 'none',
      background: 'transparent',
      color: '#FF5252',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
    },

    // ========== EDIT MODE STYLES ==========
    editCard: {
      background: '#ffffff',
      borderRadius: '1.5rem',
      padding: '24px',
      boxShadow: '0px 4px 16px rgba(0,0,0,0.06)',
      marginBottom: '16px',
    },
    inputLabel: {
      display: 'block',
      fontSize: '13px',
      fontWeight: 600,
      marginBottom: '6px',
      color: '#666460',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '1rem',
      border: 'none',
      backgroundColor: '#F0EBE3',
      fontSize: '15px',
      fontFamily: 'var(--font-body)',
      color: '#393834',
      outline: 'none',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '14px 16px',
      borderRadius: '1rem',
      border: 'none',
      backgroundColor: '#F0EBE3',
      fontSize: '15px',
      fontFamily: 'var(--font-body)',
      color: '#393834',
      resize: 'vertical',
      outline: 'none',
      boxSizing: 'border-box',
    },
    editChip: (selected) => ({
      padding: '8px 18px',
      borderRadius: '9999px',
      backgroundColor: selected ? '#FF4D00' : '#F0EBE3',
      color: selected ? '#ffffff' : '#393834',
      fontSize: '13px',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
    }),
    cancelBtn: {
      flex: 1,
      padding: '14px',
      borderRadius: '9999px',
      border: 'none',
      backgroundColor: '#F0EBE3',
      fontWeight: 600,
      fontSize: '15px',
      color: '#393834',
      cursor: 'pointer',
    },
    saveBtn: (disabled) => ({
      flex: 1,
      padding: '14px',
      borderRadius: '9999px',
      border: 'none',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      fontWeight: 700,
      fontSize: '15px',
      cursor: 'pointer',
      opacity: disabled ? 0.7 : 1,
    }),
  };

  const scrollbarCSS = `
    .gomet-hscroll-profile::-webkit-scrollbar { display: none; }
  `;

  // ========== EDIT MODE ==========
  if (editing) {
    return (
      <div style={s.page}>
        <style>{scrollbarCSS}</style>
        <div style={s.inner}>
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--on-surface)' }}>arrow_back</span>
            </button>
            <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 800, color: 'var(--on-surface)', margin: 0 }}>Chinh sua ho so</h1>
          </div>

          {/* Basic Info */}
          <div style={s.editCard}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '16px' }}>Thong tin co ban</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={s.inputLabel}>Ten</label>
                <input value={name} onChange={e => setName(e.target.value)} style={s.input} />
              </div>
              <div>
                <label style={s.inputLabel}>Tuoi</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} min={18} max={99} style={s.input} />
              </div>
              <div>
                <label style={s.inputLabel}>Gioi tinh</label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={s.input}>
                  <option value="">Chon</option>
                  <option value="male">Nam</option>
                  <option value="female">Nu</option>
                  <option value="other">Khac</option>
                </select>
              </div>
              <div>
                <label style={s.inputLabel}>Vi tri</label>
                <input value={location} onChange={e => setLocation(e.target.value)} style={s.input} />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div style={s.editCard}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '12px' }}>Gioi thieu ban than</h2>
            <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={300} placeholder="Viet vai dong ve ban than ban..." style={s.textarea} />
            <p style={{ textAlign: 'right', fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>{bio.length}/300</p>
          </div>

          {/* Interests */}
          <div style={s.editCard}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '12px' }}>
              So thich <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--on-surface-variant)' }}>({interests.length}/8)</span>
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {INTEREST_OPTIONS.map(interest => {
                const selected = interests.includes(interest);
                return (
                  <button key={interest} onClick={() => toggleInterest(interest)} style={s.editChip(selected)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{selected ? 'close' : 'add'}</span>
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setEditing(false)} style={s.cancelBtn}>Huy</button>
            <button onClick={handleSave} disabled={saving} style={s.saveBtn(saving)}>
              {saving ? 'Dang luu...' : 'Luu thay doi'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== PROFILE VIEW ==========
  return (
    <div style={s.page}>
      <style>{scrollbarCSS}</style>
      <div style={s.inner}>

        {/* ===== AVATAR HERO ===== */}
        <div style={s.heroSection}>
          <div style={s.avatarGlow} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={s.avatarRingOuter}>
              <div style={s.avatarRingInner}>
                {getAvatarUrl() ? (
                  <img src={getAvatarUrl()} alt="Avatar" style={s.avatar} onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div style={s.avatarFallback}>{currentUser?.name?.charAt(0) || '?'}</div>
                )}
              </div>
            </div>
            <span style={s.tierBadgeAbsolute}>
              <span className="material-symbols-outlined" style={{ fontSize: '12px', verticalAlign: 'middle', marginRight: '2px' }}>toll</span>
              Gold
            </span>
            <button onClick={() => fileRef.current?.click()} disabled={uploading} style={s.cameraBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>photo_camera</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
          </div>

          <h1 style={s.nameText}>{currentUser?.name}{currentUser?.age ? `, ${currentUser.age}` : ''}</h1>
          <span style={s.goldBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>toll</span>
            Gold Tier
          </span>
          {currentUser?.location && (
            <p style={s.locationText}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
              {currentUser.location}
            </p>
          )}
        </div>

        {/* ===== STATS GRID ===== */}
        <div style={s.statsGrid}>
          <div style={s.statCard}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#b83500' }}>toll</span>
            <p style={s.statValue('#b83500')}>{vangPoints.toLocaleString('vi-VN')}</p>
            <p style={s.statLabel}>Diem Vang</p>
          </div>
          <div style={s.statCard}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#117500' }}>restaurant</span>
            <p style={s.statValue('#117500')}>{dishCount}</p>
            <p style={s.statLabel}>Mon Da Thu</p>
          </div>
        </div>

        {/* ===== TIER PROGRESS ===== */}
        <div style={s.tierSection}>
          <div style={s.tierHeader}>
            <h3 style={s.tierTitle}>Tien trinh len Diamond</h3>
            <span style={s.tierTarget}>{vangPoints.toLocaleString('vi-VN')} / {tierTarget.toLocaleString('vi-VN')}</span>
          </div>
          <div style={s.progressOuter}>
            <div style={{ ...s.progressInner, width: `${tierProgress}%` }} />
          </div>
          <p style={s.tierHint}>Con {pointsToNext > 0 ? pointsToNext.toLocaleString('vi-VN') : 0} diem nua</p>
        </div>

        {/* ===== TASTE RADAR - SVG SPIDER CHART ===== */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Taste Radar</h2>
          <div style={{ background: '#ffffff', borderRadius: '1.5rem', padding: '20px', boxShadow: '0px 4px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {(() => {
              const size = 280;
              const cx = size / 2;
              const cy = size / 2;
              const maxR = 100;
              const levels = [0.25, 0.5, 0.75, 1.0];
              const axes = TASTE_AXES;
              const getPoint = (index, radius) => {
                const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
                return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
              };
              return (
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                  {/* Radial guidelines as dotted circles */}
                  {levels.map((level, li) => (
                    <circle key={li} cx={cx} cy={cy} r={maxR * level}
                      fill="none" stroke="var(--outline-variant)" strokeWidth={1}
                      strokeDasharray={li < 3 ? '4,4' : 'none'} opacity={0.5} />
                  ))}
                  {/* Axis lines */}
                  {axes.map((_, i) => {
                    const p = getPoint(i, maxR);
                    return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--outline-variant)" strokeWidth={1} opacity={0.3} />;
                  })}
                  {/* Data polygon filled with primary/20, stroked with primary */}
                  <polygon
                    points={axes.map((a, i) => { const p = getPoint(i, maxR * a.value / 100); return `${p.x},${p.y}`; }).join(' ')}
                    fill="rgba(184,53,0,0.15)" stroke="#b83500" strokeWidth={2}
                  />
                  {/* Data points */}
                  {axes.map((a, i) => {
                    const p = getPoint(i, maxR * a.value / 100);
                    return <circle key={i} cx={p.x} cy={p.y} r={5} fill="#b83500" stroke="#ffffff" strokeWidth={2} />;
                  })}
                  {/* Labels */}
                  {axes.map((a, i) => {
                    const p = getPoint(i, maxR + 28);
                    return (
                      <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                        fill="#666460" fontSize={12} fontFamily="Inter, var(--font-body)" fontWeight={600}>
                        {a.label}
                      </text>
                    );
                  })}
                  {/* Value labels */}
                  {axes.map((a, i) => {
                    const p = getPoint(i, maxR * a.value / 100 + 16);
                    return (
                      <text key={`v${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                        fill="#b83500" fontSize={10} fontFamily="Inter, var(--font-body)" fontWeight={700}>
                        {a.value}%
                      </text>
                    );
                  })}
                </svg>
              );
            })()}
          </div>
        </div>

        {/* ===== RECENT CONQUESTS ===== */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Recent Conquests</h2>
          <div className="gomet-hscroll-profile" style={s.hScroll}>
            {RECENT_DISHES.map(dish => (
              <div key={dish.id} style={{ ...s.dishCard, width: '100px' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #F0EBE3, #E8E3DB)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px', overflow: 'hidden',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--primary)', opacity: 0.5 }}>lunch_dining</span>
                </div>
                <p style={s.dishName}>{dish.name}</p>
                <p style={s.dishRestaurant}>{dish.restaurant}</p>
                <span style={s.dishPoints}>{dish.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SO THICH ===== */}
        {interests.length > 0 && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>So Thich</h2>
            <div style={s.chipsWrap}>
              {interests.map((interest, i) => (
                <span key={i} style={s.chip}>{interest}</span>
              ))}
            </div>
          </div>
        )}

        {/* ===== CHINH SUA HO SO BUTTON ===== */}
        <button style={s.editBtn} onClick={() => setEditing(true)}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
          Chinh sua ho so
        </button>

        {/* ===== LOGOUT & DELETE ===== */}
        <button style={s.logoutBtn} onClick={handleLogout}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          Dang xuat
        </button>
        <button style={s.deleteBtn} onClick={handleDeleteAccount}>
          Xoa tai khoan
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;
