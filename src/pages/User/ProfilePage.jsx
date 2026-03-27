import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastNotification';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';

const COLORS = {
  background: '#fcf9f8',
  surfaceLowest: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  secondary: '#a83918',
  outlineVariant: '#e7bdb2',
  primaryFixed: '#ffdbd1',
  primaryFixedDim: '#ffb5a0',
};

const FONT_HEADLINE = "'Plus Jakarta Sans', sans-serif";
const FONT_BODY = "'Manrope', sans-serif";

const TASTE_AXES = [
  { key: 'cay', label: 'Cay', value: 75 },
  { key: 'ngot', label: 'Ngọt', value: 60 },
  { key: 'chua', label: 'Chua', value: 45 },
  { key: 'man', label: 'Mặn', value: 80 },
  { key: 'dang', label: 'Đắng', value: 30 },
];

const BADGES = [
  { icon: 'local_fire_department', label: 'Ăn Cay', active: true, filled: true },
  { icon: 'ramen_dining', label: 'Phở King', active: true, filled: true },
  { icon: 'bakery_dining', label: 'Bánh Mì', active: true, filled: false },
  { icon: 'nightlife', label: 'Bar Hopper', active: false, filled: false },
  { icon: 'coffee', label: 'Caffeine', active: true, filled: true },
];

const MOMENTS = [
  {
    id: 1,
    time: '2 giờ trước • Pizza 4P\'s Bến Thành',
    caption: 'Pizza Burrata vẫn là chân ái! Sự kết hợp giữa đế bánh mỏng giòn và phô mai béo ngậy chưa bao giờ làm mình thất vọng.',
    likes: 245,
    comments: 18,
    aspectRatio: '1/1',
    icon: 'local_pizza',
  },
  {
    id: 2,
    time: 'Hôm qua • Workshop Cà phê Thủ công',
    caption: 'Học cách pha V60 sáng nay. Một trải nghiệm đầy tinh tế về hương vị trái cây và độ chua thanh thoát.',
    likes: 112,
    comments: 5,
    aspectRatio: '4/3',
    icon: 'coffee',
  },
];

const INTEREST_OPTIONS = ['Công nghệ', 'Nấu ăn', 'Cà phê', 'Du lịch', 'Thể thao', 'Âm nhạc', 'Phim ảnh', 'Đọc sách', 'Gaming', 'Nhiếp ảnh', 'Yoga', 'Thú cưng', 'Ăn uống', 'Thời trang', 'Nghệ thuật'];

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
  const [walletBalance, setWalletBalance] = useState(currentUser?.walletBalance || 0);

  useEffect(() => {
    api.get('/wallet').then(data => {
      if (data) setWalletBalance(data.balance);
    }).catch(() => {});
  }, []);

  const getInitials = () => {
    const n = currentUser?.name || '';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return n.charAt(0).toUpperCase() || '?';
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await api.upload('/upload/avatar', file, 'avatar');
      const data = await api.get('/auth/me');
      if (data?.user) await updateProfile({ avatar: data.user.avatar });
      addToast('Đã cập nhật ảnh đại diện!', 'success');
    } catch {
      addToast('Tải lên thất bại', 'error');
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
      await updateProfile({ name, age: Number(age), gender, location, bio, interests: JSON.stringify(interests) });
      setEditing(false);
      addToast('Đã lưu hồ sơ!', 'success');
    } catch (err) {
      addToast(err.message || 'Lưu thất bại', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) return;
    try {
      await api.delete('/auth/account');
      if (logout) logout();
      navigate('/login');
    } catch {
      addToast('Xóa tài khoản thất bại', 'error');
    }
  };

  const vangPoints = walletBalance || 12450;
  const discoveryProgress = 78;
  const discoveryTotal = 100;

  const getPentagonPoint = (index, total, radius, cx, cy, offsetAngle = -Math.PI / 2) => {
    const angle = (Math.PI * 2 * index) / total + offsetAngle;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };

  const radarSize = 220;
  const radarCx = radarSize / 2;
  const radarCy = radarSize / 2;
  const radarMax = 80;
  const radarLevels = [0.33, 0.66, 1.0];

  const gridPolygon = (level) =>
    TASTE_AXES.map((_, i) => {
      const p = getPentagonPoint(i, TASTE_AXES.length, radarMax * level, radarCx, radarCy);
      return `${p.x},${p.y}`;
    }).join(' ');

  const dataPolygon = TASTE_AXES.map((a, i) => {
    const p = getPentagonPoint(i, TASTE_AXES.length, radarMax * (a.value / 100), radarCx, radarCy);
    return `${p.x},${p.y}`;
  }).join(' ');

  const navItems = [
    { label: 'Khám phá', icon: 'home', path: '/app' },
    { label: 'Trò chuyện', icon: 'chat', path: '/app/chat' },
    { label: 'Visa', icon: 'travel_explore', path: '/app/profile', active: true },
    { label: 'Cá nhân', icon: 'person', path: '/app/settings' },
  ];

  const globalStyles = `
    .passport-no-scroll::-webkit-scrollbar { display: none; }
    .passport-no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  if (editing) {
    return (
      <div style={{ backgroundColor: COLORS.background, minHeight: '100vh', fontFamily: FONT_BODY }}>
        <style>{globalStyles}</style>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px 120px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <button
              onClick={() => setEditing(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: COLORS.onSurface }}>arrow_back</span>
            </button>
            <h1 style={{ fontFamily: FONT_HEADLINE, fontSize: '22px', fontWeight: 800, color: COLORS.onSurface, margin: 0 }}>Chỉnh sửa hồ sơ</h1>
          </div>

          <div style={{ backgroundColor: COLORS.surfaceLowest, borderRadius: '1.5rem', padding: '24px', marginBottom: '16px', boxShadow: '0 4px 16px rgba(28,27,27,0.06)' }}>
            <h2 style={{ fontFamily: FONT_HEADLINE, fontSize: '16px', fontWeight: 700, color: COLORS.onSurface, margin: '0 0 16px' }}>Thông tin cơ bản</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: COLORS.onSurfaceVariant, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tên</label>
                <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '1rem', border: 'none', backgroundColor: COLORS.surfaceContainerLow, fontSize: '15px', fontFamily: FONT_BODY, color: COLORS.onSurface, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: COLORS.onSurfaceVariant, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tuổi</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} min={18} max={99} style={{ width: '100%', padding: '12px 14px', borderRadius: '1rem', border: 'none', backgroundColor: COLORS.surfaceContainerLow, fontSize: '15px', fontFamily: FONT_BODY, color: COLORS.onSurface, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: COLORS.onSurfaceVariant, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Giới tính</label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '1rem', border: 'none', backgroundColor: COLORS.surfaceContainerLow, fontSize: '15px', fontFamily: FONT_BODY, color: COLORS.onSurface, outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">Chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: COLORS.onSurfaceVariant, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vị trí</label>
                <input value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '1rem', border: 'none', backgroundColor: COLORS.surfaceContainerLow, fontSize: '15px', fontFamily: FONT_BODY, color: COLORS.onSurface, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: COLORS.surfaceLowest, borderRadius: '1.5rem', padding: '24px', marginBottom: '16px', boxShadow: '0 4px 16px rgba(28,27,27,0.06)' }}>
            <h2 style={{ fontFamily: FONT_HEADLINE, fontSize: '16px', fontWeight: 700, color: COLORS.onSurface, margin: '0 0 12px' }}>Giới thiệu bản thân</h2>
            <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={300} placeholder="Viết vài dòng về bản thân bạn..." style={{ width: '100%', minHeight: '100px', padding: '14px', borderRadius: '1rem', border: 'none', backgroundColor: COLORS.surfaceContainerLow, fontSize: '15px', fontFamily: FONT_BODY, color: COLORS.onSurface, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
            <p style={{ textAlign: 'right', fontSize: '12px', color: COLORS.onSurfaceVariant, marginTop: '4px' }}>{bio.length}/300</p>
          </div>

          <div style={{ backgroundColor: COLORS.surfaceLowest, borderRadius: '1.5rem', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(28,27,27,0.06)' }}>
            <h2 style={{ fontFamily: FONT_HEADLINE, fontSize: '16px', fontWeight: 700, color: COLORS.onSurface, margin: '0 0 12px' }}>
              Sở thích <span style={{ fontSize: '13px', fontWeight: 400, color: COLORS.onSurfaceVariant }}>({interests.length}/8)</span>
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {INTEREST_OPTIONS.map(interest => {
                const selected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: selected ? COLORS.primary : COLORS.surfaceContainerLow, color: selected ? '#ffffff' : COLORS.onSurface, fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: FONT_BODY }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{selected ? 'close' : 'add'}</span>
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setEditing(false)} style={{ flex: 1, padding: '14px', borderRadius: '9999px', border: 'none', backgroundColor: COLORS.surfaceContainerHigh, fontWeight: 600, fontSize: '15px', color: COLORS.onSurface, cursor: 'pointer', fontFamily: FONT_BODY }}>Hủy</button>
            <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '14px', borderRadius: '9999px', border: 'none', background: `linear-gradient(135deg, ${COLORS.primaryFixedDim}, ${COLORS.primary})`, color: '#ffffff', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: saving ? 0.7 : 1, fontFamily: FONT_HEADLINE }}>
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: COLORS.background, minHeight: '100vh', fontFamily: FONT_BODY, paddingBottom: '120px' }}>
      <style>{globalStyles}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: COLORS.background, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', maxWidth: '480px', margin: '0 auto' }}>
        <span style={{ fontFamily: FONT_HEADLINE, fontWeight: 800, fontSize: '24px', color: COLORS.primary, letterSpacing: '-0.02em' }}>GoMet</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.primary, display: 'flex', alignItems: 'center', padding: '4px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
        </button>
      </header>

      <main style={{ paddingTop: '88px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '480px', margin: '0 auto' }}>

        <section style={{ backgroundColor: COLORS.surfaceLowest, borderRadius: '1rem', padding: '24px', marginBottom: '32px', boxShadow: '0 20px 40px rgba(28,27,27,0.04)', position: 'relative', overflow: 'hidden', border: `1px solid ${COLORS.outlineVariant}22` }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', opacity: 0.05, pointerEvents: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '96px', color: COLORS.onSurface }}>restaurant_menu</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', padding: '3px', background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', backgroundColor: COLORS.surfaceLowest, border: `4px solid ${COLORS.surfaceLowest}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `linear-gradient(135deg, ${COLORS.primaryFixed}, ${COLORS.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontFamily: FONT_HEADLINE, fontSize: '32px', fontWeight: 800 }}>
                    {getInitials()}
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: COLORS.primary, color: '#ffffff', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '-0.03em', fontFamily: FONT_HEADLINE }}>
                Gold Member
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ fontFamily: FONT_HEADLINE, fontSize: '24px', fontWeight: 800, color: COLORS.onSurface, margin: 0, letterSpacing: '-0.02em' }}>
                {currentUser?.name || 'Alex Nguyen'}
              </h1>
              <p style={{ fontSize: '14px', fontWeight: 500, color: COLORS.onSurfaceVariant, margin: 0 }}>
                @{(currentUser?.name || 'alex').toLowerCase().replace(/\s+/g, '.')}.culinary.vn
              </p>
            </div>

            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '8px' }}>
              <div style={{ backgroundColor: COLORS.surfaceContainerLow, padding: '16px', borderRadius: '1rem', textAlign: 'left' }}>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: COLORS.onSurfaceVariant, fontWeight: 700, margin: '0 0 4px' }}>VANG Points</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: COLORS.primary, fontFamily: FONT_HEADLINE }}>{vangPoints.toLocaleString('vi-VN')}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: COLORS.primary, fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
              </div>
              <div style={{ backgroundColor: COLORS.surfaceContainerLow, padding: '16px', borderRadius: '1rem', textAlign: 'left' }}>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: COLORS.onSurfaceVariant, fontWeight: 700, margin: '0 0 4px' }}>Thứ hạng</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: COLORS.onSurface, fontFamily: FONT_HEADLINE }}>#42</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: COLORS.primary }}>Quận 1</span>
                </div>
              </div>
            </div>
          </div>

          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
        </section>

        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px', padding: '0 4px' }}>
            <h3 style={{ fontFamily: FONT_HEADLINE, fontWeight: 700, fontSize: '18px', color: COLORS.onSurface, margin: 0 }}>Hành trình Khám phá</h3>
            <span style={{ fontSize: '12px', fontWeight: 700, color: COLORS.onSurfaceVariant }}>{discoveryProgress}/{discoveryTotal} Điểm đến</span>
          </div>
          <div style={{ backgroundColor: COLORS.surfaceContainerHigh, height: '16px', borderRadius: '9999px', overflow: 'hidden', padding: '2px' }}>
            <div style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`, height: '100%', borderRadius: '9999px', width: `${(discoveryProgress / discoveryTotal) * 100}%`, position: 'relative' }}>
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '0 9999px 9999px 0' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 4px 0' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: COLORS.onSurfaceVariant, margin: 0 }}>Giai đoạn: Sành sỏi</p>
            <p style={{ fontSize: '12px', fontWeight: 600, color: COLORS.primary, margin: 0 }}>Tiếp theo: Bậc thầy</p>
          </div>
        </section>

        <section style={{ backgroundColor: COLORS.surfaceContainerLow, borderRadius: '1rem', padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontFamily: FONT_HEADLINE, fontWeight: 700, fontSize: '18px', color: COLORS.onSurface, margin: '0 0 24px', width: '100%', textAlign: 'left' }}>Biểu đồ Khẩu vị</h3>

          <div style={{ position: 'relative', width: `${radarSize}px`, height: `${radarSize}px` }}>
            <svg width={radarSize} height={radarSize} viewBox={`0 0 ${radarSize} ${radarSize}`}>
              {radarLevels.map((level, li) => (
                <polygon
                  key={li}
                  points={gridPolygon(level)}
                  fill="rgba(255,255,255,0.5)"
                  stroke={COLORS.outlineVariant}
                  strokeWidth={1}
                  opacity={0.4 + li * 0.2}
                />
              ))}
              {TASTE_AXES.map((_, i) => {
                const outer = getPentagonPoint(i, TASTE_AXES.length, radarMax, radarCx, radarCy);
                return <line key={i} x1={radarCx} y1={radarCy} x2={outer.x} y2={outer.y} stroke={COLORS.outlineVariant} strokeWidth={1} opacity={0.4} />;
              })}
              <polygon
                points={dataPolygon}
                fill="rgba(173,44,0,0.2)"
                stroke={COLORS.primary}
                strokeWidth={2}
              />
              {TASTE_AXES.map((a, i) => {
                const p = getPentagonPoint(i, TASTE_AXES.length, radarMax * (a.value / 100), radarCx, radarCy);
                return <circle key={i} cx={p.x} cy={p.y} r={4} fill={COLORS.primary} stroke="#ffffff" strokeWidth={2} />;
              })}
              {TASTE_AXES.map((a, i) => {
                const p = getPentagonPoint(i, TASTE_AXES.length, radarMax + 22, radarCx, radarCy);
                return (
                  <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill={COLORS.onSurfaceVariant} fontSize={11} fontFamily={FONT_BODY} fontWeight={700} textTransform="uppercase">
                    {a.label}
                  </text>
                );
              })}
            </svg>
          </div>

          <p style={{ marginTop: '24px', fontSize: '14px', textAlign: 'center', fontWeight: 500, color: COLORS.onSurfaceVariant, fontStyle: 'italic' }}>
            "Bạn là người yêu thích sự bùng nổ của gia vị Cay &amp; Mặn."
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
            <h3 style={{ fontFamily: FONT_HEADLINE, fontWeight: 700, fontSize: '18px', color: COLORS.onSurface, margin: 0 }}>Bộ sưu tập Huy hiệu</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.primary, fontSize: '14px', fontWeight: 700, fontFamily: FONT_BODY }}>Xem tất cả</button>
          </div>
          <div className="passport-no-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', paddingLeft: '4px', paddingRight: '4px' }}>
            {BADGES.map((badge, idx) => (
              <div key={idx} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: badge.active ? 1 : 0.5 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: COLORS.surfaceContainerHigh, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px ${badge.active ? 'solid' : 'dashed'} ${badge.active ? COLORS.primary : COLORS.outlineVariant}` }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px', color: badge.active ? COLORS.primary : '#926f66', fontVariationSettings: badge.filled ? "'FILL' 1" : "'FILL' 0" }}>{badge.icon}</span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, textAlign: 'center', color: COLORS.onSurface, maxWidth: '64px' }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h3 style={{ fontFamily: FONT_HEADLINE, fontWeight: 700, fontSize: '18px', color: COLORS.onSurface, margin: '0 0 24px', padding: '0 4px' }}>Khoảnh khắc &amp; Bài đăng</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {MOMENTS.map(moment => (
              <article key={moment.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${COLORS.primaryFixed}, ${COLORS.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontFamily: FONT_HEADLINE, fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>
                    {getInitials()}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: COLORS.onSurface, margin: 0 }}>{currentUser?.name || 'Alex Nguyen'}</p>
                    <p style={{ fontSize: '10px', color: COLORS.onSurfaceVariant, fontWeight: 500, margin: 0 }}>{moment.time}</p>
                  </div>
                </div>
                <div style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '12px', backgroundColor: COLORS.surfaceContainerHigh, aspectRatio: moment.aspectRatio, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', color: COLORS.outlineVariant, fontVariationSettings: "'FILL' 1" }}>{moment.icon}</span>
                </div>
                <p style={{ fontSize: '14px', color: COLORS.onSurfaceVariant, lineHeight: '1.6', margin: '0 0 12px' }}>{moment.caption}</p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: COLORS.primary, padding: 0, fontFamily: FONT_BODY }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    {moment.likes}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: COLORS.onSurfaceVariant, padding: 0, fontFamily: FONT_BODY }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat_bubble</span>
                    {moment.comments}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={() => setEditing(true)}
            style={{ width: '100%', padding: '16px', borderRadius: '9999px', border: 'none', background: `linear-gradient(135deg, ${COLORS.primaryFixedDim}, ${COLORS.primary})`, color: '#ffffff', fontFamily: FONT_HEADLINE, fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: `0 4px 16px rgba(173,44,0,0.3)` }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
            Chỉnh sửa hồ sơ
          </button>
          <button
            onClick={handleLogout}
            style={{ width: '100%', padding: '14px', borderRadius: '9999px', border: 'none', backgroundColor: COLORS.surfaceContainerHigh, color: COLORS.onSurfaceVariant, fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: FONT_BODY }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
            Đăng xuất
          </button>
          <button
            onClick={handleDeleteAccount}
            style={{ width: '100%', padding: '12px', borderRadius: '9999px', border: 'none', background: 'transparent', color: '#ba1a1a', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: FONT_BODY }}
          >
            Xóa tài khoản
          </button>
        </div>

      </main>

      <nav style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '432px', borderRadius: '9999px', zIndex: 50, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 20px 40px rgba(28,27,27,0.08)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px' }}>
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', border: 'none', cursor: 'pointer', padding: item.active ? '0' : '8px', borderRadius: '9999px', transition: 'all 0.2s ease', background: item.active ? COLORS.primary : 'transparent', color: item.active ? '#ffffff' : COLORS.onSurface, width: item.active ? '48px' : 'auto', height: item.active ? '48px' : 'auto', minWidth: item.active ? '48px' : '56px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
            {!item.active && <span style={{ fontFamily: FONT_HEADLINE, fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfilePage;
