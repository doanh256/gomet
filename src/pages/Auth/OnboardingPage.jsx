import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const bg = '#131313';
const primary = '#E6BEB2';
const primaryAccent = '#FFB59E';
const textPrimary = '#FDF9F3';
const textMuted = 'rgba(230,190,178,0.55)';

const slides = [
  {
    icon: 'badge',
    badge: 'Visa Món Ăn',
    emoji: '🛂',
    gradientFrom: '#3d1a10',
    gradientTo: '#5c2a18',
    title: 'Hộ chiếu ẩm thực của bạn.',
    description: 'Ghi lại mọi trải nghiệm vị giác. Mỗi món ăn bạn thưởng thức sẽ mở khóa những đặc quyền riêng biệt trong hệ sinh thái GoMet.',
  },
  {
    icon: 'workspace_premium',
    badge: 'Điểm VÀNG',
    emoji: '⭐',
    gradientFrom: '#2d1f05',
    gradientTo: '#4a3308',
    title: 'Đặc quyền tinh hoa.',
    description: 'Tích lũy Điểm VÀNG từ mỗi hóa đơn để đổi lấy những trải nghiệm ẩm thực độc quyền và ưu đãi giới hạn tại các đối tác cao cấp.',
  },
  {
    icon: 'favorite',
    badge: 'Taste Twin',
    emoji: '💞',
    gradientFrom: '#2d0f18',
    gradientTo: '#4a1a28',
    title: 'Tìm kiếm tri kỷ vị giác.',
    description: 'Thuật toán Match Taste Twin kết nối bạn với những người có cùng sở thích ăn uống. Đừng để bữa ngon trôi qua một mình.',
  },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const slide = slides[step];

  const handleNext = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else navigate('/app/taste-quiz');
  };

  return (
    <div style={{
      height: '100vh',
      height: '100dvh',
      backgroundColor: bg,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Manrope', sans-serif",
      color: textPrimary,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Glows */}
      <div style={{ position: 'fixed', top: '5%', right: '-10%', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,87,26,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '-10%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,181,158,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

      <main style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex', flexDirection: 'column',
        maxWidth: '440px', margin: '0 auto', width: '100%',
        padding: '20px 24px 24px', boxSizing: 'border-box',
        overflow: 'hidden',
      }}>

        {/* Header — fixed height ~40px */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, marginBottom: '16px' }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 900, fontStyle: 'italic', color: primaryAccent, letterSpacing: '-0.04em' }}>GOMET</span>
          <button onClick={() => navigate('/app/taste-quiz')} style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: 600, color: textMuted, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>
            Bỏ qua
          </button>
        </div>

        {/* Illustration Card — flex-shrink: 0, fixed proportional height */}
        <div style={{
          flexShrink: 0,
          borderRadius: '20px',
          background: `linear-gradient(145deg, ${slide.gradientFrom} 0%, ${slide.gradientTo} 100%)`,
          border: '1px solid rgba(230,190,178,0.08)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          marginBottom: '20px',
          height: '36vh', maxHeight: '240px', minHeight: '160px',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '52px', lineHeight: 1 }}>{slide.emoji}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'rgba(255,181,158,0.12)', border: '1px solid rgba(255,181,158,0.25)', borderRadius: '999px', padding: '6px 14px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: primaryAccent, fontVariationSettings: "'FILL' 1" }}>{slide.icon}</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '14px', color: primaryAccent }}>{slide.badge}</span>
          </div>
          <div style={{ display: 'flex', gap: '14px', opacity: 0.35 }}>
            {['restaurant', 'dining', 'local_bar'].map(ic => (
              <span key={ic} className="material-symbols-outlined" style={{ fontSize: '20px', color: primary }}>{ic}</span>
            ))}
          </div>
        </div>

        {/* Text — flex grows to fill remaining space */}
        <div style={{ flex: 1, minHeight: 0, marginBottom: '16px' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 5vw, 28px)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 10px', color: textPrimary }}>
            {slide.title}
          </h2>
          <p style={{ fontSize: '14px', color: textMuted, lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
            {slide.description}
          </p>
        </div>

        {/* Footer — fixed height */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setStep(i)} style={{ width: i === step ? '28px' : '8px', height: '8px', borderRadius: '999px', backgroundColor: i === step ? primaryAccent : 'rgba(230,190,178,0.2)', transition: 'all 0.3s ease', cursor: 'pointer' }} />
            ))}
          </div>
          <button
            onClick={handleNext}
            style={{ width: '100%', background: 'linear-gradient(135deg, #c43a00 0%, #ff6b35 100%)', color: '#fff', padding: '16px', borderRadius: '14px', border: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(196,58,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.15s' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {step < slides.length - 1 ? 'Tiếp theo' : 'Bắt đầu hành trình'}
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
          <p style={{ textAlign: 'center', fontSize: '13px', color: textMuted, marginTop: '12px', fontWeight: 500 }}>
            Đã có tài khoản?{' '}
            <span style={{ color: primaryAccent, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/login')}>Đăng nhập</span>
          </p>
        </div>

      </main>
    </div>
  );
};

export default OnboardingPage;
