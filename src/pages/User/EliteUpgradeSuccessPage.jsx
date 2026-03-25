import React from 'react';
import { useNavigate } from 'react-router-dom';

const eusKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes cardShine {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes confettiFall {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(-2deg); }
}
`;

const benefits = [
  { icon: 'table_restaurant', title: 'Head Table', desc: 'Ưu tiên chỗ ngồi tại mọi sự kiện Secret Tables', color: '#6C63FF' },
  { icon: 'bolt', title: 'Priority Booking', desc: 'Đặt nhà hàng trước 48h so với thành viên thường', color: '#FF6B9D' },
  { icon: 'support_agent', title: 'Concierge 24/7', desc: 'Đội ngũ tư vấn ẩm thực cá nhân mọi lúc', color: '#00C9A7' },
  { icon: 'redeem', title: 'Quà Tặng Tháng', desc: 'Voucher và quà từ thương hiệu đối tác hàng tháng', color: '#FFD700' },
];

const confettiColors = ['#6C63FF', '#FF6B9D', '#FFD700', '#00C9A7', '#E8900C', '#8B5CF6'];

const EliteUpgradeSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#FDF9F3', color: '#1A1A2E', paddingBottom: 32, position: 'relative', overflow: 'hidden' }}>
      <style>{eusKeyframes}</style>

      {/* Confetti */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{
          position: 'fixed', top: -10, zIndex: 10, pointerEvents: 'none',
          left: `${(i / 24) * 100 + Math.random() * 4}%`,
          width: 8, height: 8, borderRadius: i % 2 === 0 ? '50%' : 2,
          background: confettiColors[i % confettiColors.length],
          animation: `confettiFall ${2 + Math.random() * 3}s ease ${Math.random() * 2}s infinite`
        }} />
      ))}

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#1A1A2E' }}>arrow_back</span>
        </button>
      </div>

      {/* Success Message */}
      <div style={{ textAlign: 'center', padding: '24px 24px 0', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          boxShadow: '0 8px 32px rgba(108,99,255,0.3)'
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 32, color: '#fff' }}>diamond</span>
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 900, color: '#1A1A2E' }}>
          Chào mừng đến Diamond Circle!
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: '#888', maxWidth: 340, marginLeft: 'auto', marginRight: 'auto' }}>
          Bạn đã chính thức trở thành thành viên cao cấp nhất của GOMET
        </p>
      </div>

      {/* Titanium Card */}
      <div style={{ padding: '28px 24px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 320, height: 200, borderRadius: 20, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #2d2d3f 0%, #4a4a5a 30%, #2d2d3f 50%, #5a5a6a 70%, #2d2d3f 100%)',
          backgroundSize: '200% 100%', animation: 'cardShine 4s ease infinite, float 3s ease infinite',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 40px rgba(108,99,255,0.1)',
          padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 2, color: '#fff' }}>GOMET</div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: '#aaa', marginTop: 2 }}>DIAMOND</div>
            </div>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 28, color: '#FFD700' }}>diamond</span>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#888', letterSpacing: 2, marginBottom: 4 }}>MEMBER</div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 3, color: '#fff' }}>MINH TRAN</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 9, color: '#888', letterSpacing: 1 }}>SINCE 2026</div>
            </div>
            <div style={{ fontSize: 11, color: '#FFD700', fontWeight: 700 }}>TITANIUM</div>
          </div>
          {/* Holographic Effect */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }} />
        </div>
      </div>

      {/* Benefits Grid */}
      <div style={{ padding: '0 16px', marginBottom: 24, position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, textAlign: 'center' }}>Đặc Quyền Của Bạn</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 18, padding: 18,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              animation: `fadeInUp 0.5s ease ${i * 0.1}s both`
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: `${b.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: b.color }}>{b.icon}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#1A1A2E' }}>{b.title}</div>
              <div style={{ fontSize: 12, color: '#888', lineHeight: 1.4 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 16px', position: 'relative', zIndex: 1 }}>
        <button onClick={() => navigate('/app/elite')} style={{
          width: '100%', padding: '16px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', color: '#fff',
          fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 8px 32px rgba(108,99,255,0.3)'
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>auto_awesome</span>
          Khám Phá Đặc Quyền
        </button>
      </div>
    </div>
  );
};

export default EliteUpgradeSuccessPage;
