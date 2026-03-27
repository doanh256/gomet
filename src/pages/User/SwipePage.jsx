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
  primaryFixed: '#ffdbd1',
  outlineVariant: '#e7bdb2',
  onPrimary: '#ffffff',
  headline: "'Plus Jakarta Sans', sans-serif",
  body: "'Manrope', sans-serif",
};

const profiles = [
  {
    id: 1,
    name: 'Minh Anh',
    age: 26,
    match: 92,
    bio: 'Mê đồ chua, ghiền phở vỉa hè',
    sharedFoods: ['Phở Bò Tái Lăn', 'Bún Chả Hà Nội', 'Cà Phê Trứng'],
    reasons: [
      { text: 'Cả hai đều cực kỳ yêu thích vị chua thanh từ dấm bỗng tự nhiên.', bold: 'vị chua thanh' },
      { text: 'Gu thưởng thức không gian quán vỉa hè ấm cúng giống nhau 100%.', bold: 'vỉa hè ấm cúng' },
    ],
    tasteProfile: { chua: 85, cay: 60, man: 70, ngot: 45, dang: 30 },
    gradientB: 'linear-gradient(135deg, #a0b4c8 0%, #6080a0 100%)',
  },
  {
    id: 2,
    name: 'Thanh Hà',
    age: 24,
    match: 87,
    bio: 'Foodie chính hiệu, thích khám phá ẩm thực',
    sharedFoods: ['Bún Bò Huế', 'Bánh Xèo', 'Trà Sữa Trân Châu'],
    reasons: [
      { text: 'Cùng đam mê khám phá những địa điểm ăn uống mới lạ và độc đáo.', bold: 'địa điểm mới lạ' },
      { text: 'Đều thích vị cay nồng đặc trưng của ẩm thực miền Trung Việt Nam.', bold: 'vị cay nồng' },
    ],
    tasteProfile: { chua: 65, cay: 88, man: 75, ngot: 55, dang: 40 },
    gradientB: 'linear-gradient(135deg, #b8c8a0 0%, #809060 100%)',
  },
  {
    id: 3,
    name: 'Ngọc Linh',
    age: 28,
    match: 79,
    bio: 'Yêu ẩm thực truyền thống, hay nấu ăn tại nhà',
    sharedFoods: ['Cơm Tấm Sườn', 'Chè Ba Màu', 'Bánh Mì Pate'],
    reasons: [
      { text: 'Cả hai trân trọng những giá trị ẩm thực truyền thống và gia đình.', bold: 'ẩm thực truyền thống' },
      { text: 'Đều thích không gian ăn uống yên tĩnh, ấm cúng.', bold: 'yên tĩnh, ấm cúng' },
    ],
    tasteProfile: { chua: 55, cay: 40, man: 80, ngot: 70, dang: 25 },
    gradientB: 'linear-gradient(135deg, #c8b0d8 0%, #9070b8 100%)',
  },
];

function RadarChart({ tasteProfile }) {
  const { chua, cay, man, ngot, dang } = tasteProfile;
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 58;
  const angles = [0, 72, 144, 216, 288];
  const values = [chua, cay, man, ngot, dang];
  const labels = ['Chua', 'Cay', 'Mặn', 'Ngọt', 'Đắng'];

  const pt = (angle, scale) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + r * scale * Math.cos(rad), y: cy + r * scale * Math.sin(rad) };
  };

  const gridPoly = (scale) =>
    angles.map((a) => { const p = pt(a, scale); return `${p.x},${p.y}`; }).join(' ');

  const valuePoly = angles.map((a, i) => {
    const p = pt(a, values[i] / 100);
    return `${p.x},${p.y}`;
  }).join(' ');

  const labelOffsets = [
    { dx: 0, dy: -10 },
    { dx: 14, dy: 4 },
    { dx: 8, dy: 12 },
    { dx: -8, dy: 12 },
    { dx: -18, dy: 4 },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto' }}>
      {[0.33, 0.66, 1.0].map((scale, i) => (
        <polygon key={i} points={gridPoly(scale)} fill="none" stroke={T.outlineVariant} strokeWidth="1" opacity={0.4 + i * 0.2} />
      ))}
      {angles.map((a, i) => {
        const rad = (a - 90) * (Math.PI / 180);
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(rad)} y2={cy + r * Math.sin(rad)} stroke={T.outlineVariant} strokeWidth="1" opacity="0.35" />;
      })}
      <polygon points={valuePoly} fill={T.primary} fillOpacity="0.28" stroke={T.primary} strokeWidth="2" />
      {angles.map((a, i) => {
        const p = pt(a, values[i] / 100);
        return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={T.primary} />;
      })}
      {angles.map((a, i) => {
        const rad = (a - 90) * (Math.PI / 180);
        const lx = cx + (r + 16) * Math.cos(rad) + labelOffsets[i].dx;
        const ly = cy + (r + 16) * Math.sin(rad) + labelOffsets[i].dy;
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" fontSize="8" fontWeight="700" fill={T.onSurface} fontFamily={T.body} letterSpacing="0.04em">
            {labels[i]}
          </text>
        );
      })}
    </svg>
  );
}

export default function SwipePage() {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const available = profiles.filter((p) => !dismissed.includes(p.id));
  const profile = available.length > 0 ? available[currentIdx % available.length] : null;

  const handleConnect = () => navigate('/app/chat');

  const handleSkip = () => {
    if (!profile) return;
    const newDismissed = [...dismissed, profile.id];
    setDismissed(newDismissed);
    setCurrentIdx(0);
  };

  return (
    <div style={{ minHeight: '100dvh', background: T.bg, fontFamily: T.body, color: T.onSurface, paddingBottom: '100px' }}>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8b4a8 0%, #c06040 100%)', flexShrink: 0 }} />
          <span style={{ fontSize: '24px', fontWeight: 800, fontFamily: T.headline, color: T.primary, letterSpacing: '-0.05em' }}>GoMet</span>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.onSurface, display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main style={{ paddingTop: '96px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '480px', margin: '0 auto' }}>

        <section style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, fontFamily: T.headline, letterSpacing: '-0.03em', color: T.onSurface, margin: '0 0 8px 0' }}>So khớp Khẩu vị</h1>
          <p style={{ color: T.onSurfaceVariant, fontWeight: 500, fontSize: '15px', margin: 0 }}>Khám phá sự tương đồng trong vị giác của bạn</p>
        </section>

        {!profile ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: T.onSurfaceVariant }}>
            <span className="material-symbols-outlined" style={{ fontSize: '64px', color: T.outlineVariant, display: 'block', marginBottom: '16px' }}>favorite</span>
            <p style={{ fontWeight: 700, fontSize: '18px', fontFamily: T.headline, color: T.onSurface, margin: '0 0 8px 0' }}>Bạn đã xem hết rồi!</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Quay lại sau để khám phá thêm người dùng mới.</p>
          </div>
        ) : (
          <>
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: `4px solid ${T.surface}`, overflow: 'hidden', boxShadow: '0 8px 24px rgba(28,27,27,0.12)', zIndex: 10, flexShrink: 0 }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e8a598 0%, #c07060 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '38px' }}>person</span>
                  </div>
                </div>
                <div style={{ background: T.primary, color: T.onPrimary, width: '64px', height: '64px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(173,44,0,0.35)', border: `4px solid ${T.bg}`, zIndex: 20, flexShrink: 0, margin: '0 -10px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1 }}>Match</span>
                  <span style={{ fontSize: '17px', fontWeight: 800, fontFamily: T.headline, lineHeight: 1.1 }}>{profile.match}%</span>
                </div>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: `4px solid ${T.surface}`, overflow: 'hidden', boxShadow: '0 8px 24px rgba(28,27,27,0.12)', zIndex: 10, flexShrink: 0 }}>
                  <div style={{ width: '100%', height: '100%', background: profile.gradientB, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '38px' }}>person</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontFamily: T.headline, fontSize: '18px', color: T.onSurface }}>{profile.name}, {profile.age}</div>
                <div style={{ fontSize: '13px', color: T.onSurfaceVariant, marginTop: '2px' }}>{profile.bio}</div>
              </div>
            </section>

            <section style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

              <div style={{ background: T.surface, borderRadius: '16px', padding: '24px 24px 20px', boxShadow: '0 2px 12px rgba(28,27,27,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '12px', opacity: 0.05, pointerEvents: 'none' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>restaurant</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.onSurfaceVariant, textAlign: 'center', marginBottom: '8px' }}>Biểu đồ Vị giác</div>
                <RadarChart tasteProfile={profile.tasteProfile} />
              </div>

              <div style={{ background: T.surfaceContainerLow, borderRadius: '16px', padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span className="material-symbols-outlined" style={{ color: T.primary, fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: T.headline, color: T.onSurface, margin: 0 }}>Món ăn kết nối</h3>
                </div>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {profile.sharedFoods.map((food, i) => (
                    <span key={i} style={{ flexShrink: 0, background: T.surface, border: `1px solid ${T.outlineVariant}`, borderRadius: '9999px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: T.onSurface, whiteSpace: 'nowrap' }}>{food}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: T.surfaceContainerLow, borderRadius: '16px', padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span className="material-symbols-outlined" style={{ color: T.primary, fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: T.headline, color: T.onSurface, margin: 0 }}>Lý do nên hẹn hò</h3>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {profile.reasons.map((reason, i) => {
                    const parts = reason.text.split(reason.bold);
                    return (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span className="material-symbols-outlined" style={{ color: T.primary, fontSize: '16px', marginTop: '2px', flexShrink: 0 }}>check_circle</span>
                        <p style={{ fontSize: '14px', color: T.onSurfaceVariant, lineHeight: '1.6', margin: 0 }}>
                          {parts[0]}<strong style={{ color: T.onSurface }}>{reason.bold}</strong>{parts[1]}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </section>

            <button
              style={{ width: '100%', background: `linear-gradient(180deg, ${T.primary} 0%, #d83900 100%)`, color: T.onPrimary, border: 'none', borderRadius: '14px', padding: '18px', fontSize: '17px', fontWeight: 700, fontFamily: T.headline, cursor: 'pointer', boxShadow: '0 8px 24px rgba(173,44,0,0.25)', marginBottom: '12px', letterSpacing: '0.01em', transition: 'transform 0.15s' }}
              onClick={handleConnect}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Kết nối
            </button>

            <button
              style={{ width: '100%', background: T.surfaceContainerLow, color: T.onSurfaceVariant, border: `1px solid ${T.outlineVariant}`, borderRadius: '14px', padding: '16px', fontSize: '15px', fontWeight: 600, fontFamily: T.body, cursor: 'pointer', marginBottom: '32px', transition: 'background 0.15s' }}
              onClick={handleSkip}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.surfaceContainerHigh; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = T.surfaceContainerLow; }}
            >
              Bỏ qua
            </button>
          </>
        )}
      </main>

      <nav style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '440px', borderRadius: '9999px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 10px 40px rgba(28,27,27,0.08)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '64px', padding: '0 24px', zIndex: 50 }}>
        {[
          { icon: 'restaurant_menu', label: 'Khám phá', path: '/app/explore', active: false },
          { icon: 'favorite', label: 'So khớp', path: null, active: true, filled: true },
          { icon: 'group', label: 'Hẹn nhóm', path: '/app/groups', active: false },
          { icon: 'calendar_today', label: 'Kế hoạch', path: '/app/plan', active: false },
        ].map((item) => (
          <button
            key={item.label}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: item.active ? T.primary : '#9e9e9e', gap: '2px', cursor: 'pointer', background: 'none', border: 'none', padding: 0, transform: item.active ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s' }}
            onClick={() => item.path && navigate(item.path)}
          >
            <span className="material-symbols-outlined" style={item.filled ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
            <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: T.body }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
