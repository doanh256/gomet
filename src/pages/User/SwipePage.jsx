import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const T = {
  bg: '#fcf9f8',
  surface: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  outlineVariant: '#e7bdb2',
  onPrimary: '#ffffff',
  headline: "'Plus Jakarta Sans', sans-serif",
  body: "'Manrope', sans-serif",
};

const profiles = [
  {
    id: 1,
    name: 'Mia Patel',
    age: 24,
    match: 88,
    bio: '"Tìm kiếm một nửa yêu thích #VisaSushi & #VisaPhoBo"',
    sharedFoods: ['#VisaPhoBo', '#VisaSushi', '#VisaBanhMi'],
    vangPoints: 2450,
    visaCount: '12/20',
    visaProgress: 60,
    tasteProfile: { chua: 85, cay: 60, man: 70, ngot: 45, dang: 30 },
    gradient: 'linear-gradient(160deg, #ffdbd1 0%, #ffb5a0 40%, #ff7852 70%, #ad2c00 100%)',
    emoji: '👩',
  },
  {
    id: 2,
    name: 'Thanh Hà',
    age: 26,
    match: 82,
    bio: '"Foodie chính hiệu, mê khám phá ẩm thực đường phố"',
    sharedFoods: ['#VisaBunBo', '#VisaBanhXeo', '#VisaTreSua'],
    vangPoints: 1820,
    visaCount: '9/20',
    visaProgress: 45,
    tasteProfile: { chua: 65, cay: 88, man: 75, ngot: 55, dang: 40 },
    gradient: 'linear-gradient(160deg, #d4e3ff 0%, #a5c8ff 40%, #4d8fd4 70%, #005daa 100%)',
    emoji: '👨',
  },
  {
    id: 3,
    name: 'Ngọc Linh',
    age: 28,
    match: 79,
    bio: '"Yêu ẩm thực truyền thống, thích những buổi sáng bình yên"',
    sharedFoods: ['#VisaComTam', '#VisaCheBaMau', '#VisaBanhMi'],
    vangPoints: 3100,
    visaCount: '15/20',
    visaProgress: 75,
    tasteProfile: { chua: 55, cay: 40, man: 80, ngot: 70, dang: 25 },
    gradient: 'linear-gradient(160deg, #e8d4f8 0%, #c8a0e8 40%, #a070c8 70%, #7040a0 100%)',
    emoji: '🧑',
  },
];

const visaItems = [
  { id: 1, name: '#VisaSalad', status: 'locked', emoji: '🥗' },
  { id: 2, name: '#VisaPhoBo', status: 'collected', emoji: '🍜' },
  { id: 3, name: '#VisaSushi', status: 'progress', emoji: '🍣', pct: 80 },
];

export default function SwipePage() {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const available = profiles.filter((p) => !dismissed.includes(p.id));
  const profile = available.length > 0 ? available[currentIdx % available.length] : null;

  const handleConnect = () => navigate('/app/chat');
  const handleSkip = () => {
    if (!profile) return;
    setDismissed([...dismissed, profile.id]);
    setCurrentIdx(0);
  };

  if (!profile) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: T.onSurfaceVariant, padding: '48px 24px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: T.outlineVariant, marginBottom: '16px', display: 'block' }}>favorite</span>
        <p style={{ fontWeight: 700, fontSize: '18px', fontFamily: T.headline, color: T.onSurface, margin: '0 0 8px 0' }}>Bạn đã xem hết rồi!</p>
        <p style={{ fontSize: '14px', margin: 0 }}>Quay lại sau để khám phá thêm.</p>
      </div>
    );
  }

  return (
    <div style={{ background: T.bg, fontFamily: T.body, color: T.onSurface, paddingBottom: '16px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px 20px 0' }}>

        {/* Bento Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: T.surface, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(28,27,27,0.04)', border: `1px solid ${T.outlineVariant}20` }}>
            <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.onSurfaceVariant, margin: '0 0 8px' }}>VÀNG Points</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontFamily: T.headline, fontWeight: 900, fontSize: '28px', color: T.primary, lineHeight: 1 }}>
                {profile.vangPoints.toLocaleString('vi-VN')}
              </span>
              <span className="material-symbols-outlined" style={{ color: T.primary, fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
          </div>
          <div style={{ background: T.surface, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(28,27,27,0.04)', border: `1px solid ${T.outlineVariant}20` }}>
            <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.onSurfaceVariant, margin: '0 0 8px' }}>Visa Collection</p>
            <p style={{ fontFamily: T.headline, fontWeight: 900, fontSize: '28px', color: T.onSurface, margin: '0 0 10px', lineHeight: 1 }}>{profile.visaCount}</p>
            <div style={{ height: '6px', borderRadius: '999px', background: T.surfaceContainerHigh, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${profile.visaProgress}%`, background: T.primary, borderRadius: '999px' }} />
            </div>
          </div>
        </div>

        {/* Taste Twin Card */}
        <div style={{ background: T.surface, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(173,44,0,0.08)', border: `1px solid rgba(173,44,0,0.05)`, marginBottom: '24px' }}>
          {/* Profile Image Area */}
          <div style={{ position: 'relative', aspectRatio: '4/5', background: profile.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,27,27,0.75) 0%, rgba(28,27,27,0.15) 50%, transparent 100%)' }} />
            <span style={{ fontSize: '96px', position: 'relative', zIndex: 1 }}>{profile.emoji}</span>

            {/* Match Badge */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
              <span style={{ fontFamily: T.headline, fontWeight: 900, fontSize: '22px', color: T.primary, lineHeight: 1 }}>{profile.match}%</span>
              <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.onSurfaceVariant, marginTop: '2px' }}>Palate Match</span>
            </div>

            {/* Identity Overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontFamily: T.headline, fontWeight: 800, fontSize: '26px', margin: 0 }}>{profile.name}, {profile.age}</h2>
                <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 500, margin: 0, opacity: 0.85 }}>{profile.bio}</p>
            </div>
          </div>

          {/* Card Content */}
          <div style={{ padding: '24px' }}>
            {/* Visa tags */}
            <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.onSurfaceVariant, margin: '0 0 12px' }}>Visa Món Ăn Chung</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {profile.sharedFoods.map((tag) => (
                <span key={tag} style={{ padding: '8px 16px', background: `${T.primary}0D`, border: `1px solid ${T.primary}1A`, borderRadius: '999px', color: T.primary, fontSize: '13px', fontWeight: 700 }}>{tag}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSkip}
                style={{ flex: '0 0 56px', height: '56px', background: T.surfaceContainerHigh, border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = T.surfaceContainerHigh}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: T.onSurface }}>close</span>
              </button>
              <button
                onClick={handleConnect}
                style={{ flex: 1, height: '56px', background: T.primary, border: 'none', borderRadius: '14px', cursor: 'pointer', color: '#fff', fontFamily: T.headline, fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(173,44,0,0.3)', transition: 'transform 0.15s' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>favorite</span>
                Gửi Lời Mời Ăn
              </button>
            </div>
          </div>
        </div>

        {/* Visa Collection Preview */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontFamily: T.headline, fontWeight: 900, fontSize: '20px', margin: '0 0 2px', letterSpacing: '-0.03em' }}>Visa Collection</h3>
              <p style={{ fontSize: '12px', color: T.onSurfaceVariant, margin: 0, fontWeight: 500 }}>Khám phá hương vị thế giới</p>
            </div>
            <button onClick={() => navigate('/app/badges')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.primary }}>Tất cả</button>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {visaItems.map((item) => (
              <div key={item.id} style={{ flexShrink: 0, width: '128px', background: T.surface, borderRadius: '16px', padding: '12px', border: item.status === 'collected' ? `2px solid ${T.primary}33` : `1px solid ${T.outlineVariant}4D`, boxShadow: item.status === 'collected' ? `0 8px 24px rgba(173,44,0,0.08)` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', marginBottom: '10px', background: T.surfaceContainer, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', filter: item.status === 'locked' ? 'grayscale(1)' : 'none', opacity: item.status === 'locked' ? 0.5 : 1 }}>
                  <span style={{ fontSize: '40px' }}>{item.emoji}</span>
                  {item.status === 'collected' && (
                    <div style={{ position: 'absolute', inset: 0, background: `${T.primary}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  )}
                  {item.status === 'locked' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '24px' }}>lock</span>
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: item.status === 'collected' ? T.primary : T.onSurfaceVariant, textAlign: 'center', margin: '0 0 2px' }}>{item.name}</p>
                <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', color: item.status === 'collected' ? T.primary : T.onSurfaceVariant, opacity: item.status === 'locked' ? 0.6 : 1 }}>
                  {item.status === 'collected' ? 'Đã Sưu Tập' : item.status === 'progress' ? `${item.pct}% Hoàn Thành` : 'Chưa Mở'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
