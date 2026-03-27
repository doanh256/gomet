import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const bg = '#131313';
const surface = '#1e1d1d';
const surfaceRaised = '#2a2929';
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
    accentIcon: 'restaurant',
    title: 'Hộ chiếu ẩm thực của bạn.',
    description: 'Ghi lại mọi trải nghiệm vị giác. Mỗi món ăn bạn thưởng thức sẽ mở khóa những đặc quyền riêng biệt trong hệ sinh thái GoMet.',
  },
  {
    icon: 'workspace_premium',
    badge: 'Điểm VÀNG',
    emoji: '⭐',
    gradientFrom: '#2d1f05',
    gradientTo: '#4a3308',
    accentIcon: 'star',
    title: 'Đặc quyền tinh hoa.',
    description: 'Tích lũy Điểm VÀNG từ mỗi hóa đơn để đổi lấy những trải nghiệm ẩm thực độc quyền và ưu đãi giới hạn tại các đối tác cao cấp.',
  },
  {
    icon: 'favorite',
    badge: 'Taste Twin',
    emoji: '💞',
    gradientFrom: '#2d0f18',
    gradientTo: '#4a1a28',
    accentIcon: 'group',
    title: 'Tìm kiếm tri kỷ vị giác.',
    description: 'Thuật toán Match Taste Twin kết nối bạn với những người có cùng sở thích ăn uống. Đừng để bữa ngon trôi qua một mình.',
  },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const slide = slides[step];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/app/taste-quiz');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      backgroundColor: bg,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Manrope', sans-serif",
      color: textPrimary,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'fixed', top: '10%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,87,26,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '15%', left: '-10%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,181,158,0.07) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <main style={{
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '440px',
        margin: '0 auto',
        width: '100%',
        padding: '24px 24px 32px',
        boxSizing: 'border-box',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 900, fontStyle: 'italic', color: primaryAccent, letterSpacing: '-0.04em' }}>GOMET</span>
          <button
            onClick={() => navigate('/app/taste-quiz')}
            style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, color: textMuted, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}
          >
            Bỏ qua
          </button>
        </div>

        {/* Illustration Card */}
        <div style={{
          width: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '32px',
          background: `linear-gradient(145deg, ${slide.gradientFrom} 0%, ${slide.gradientTo} 100%)`,
          border: '1px solid rgba(230,190,178,0.08)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          position: 'relative',
          minHeight: '220px',
          justifyContent: 'center',
        }}>
          {/* Big emoji */}
          <div style={{ fontSize: '72px', lineHeight: 1 }}>{slide.emoji}</div>

          {/* Badge pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,181,158,0.12)',
            border: '1px solid rgba(255,181,158,0.25)',
            borderRadius: '999px',
            padding: '8px 18px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: primaryAccent, fontVariationSettings: "'FILL' 1" }}>{slide.icon}</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: primaryAccent }}>{slide.badge}</span>
          </div>

          {/* Accent icons */}
          <div style={{ display: 'flex', gap: '16px', opacity: 0.4 }}>
            {['restaurant', 'dining', 'local_bar'].map((ic) => (
              <span key={ic} className="material-symbols-outlined" style={{ fontSize: '22px', color: primary }}>{ic}</span>
            ))}
          </div>
        </div>

        {/* Text content */}
        <div style={{ flex: 1, marginBottom: '32px' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '28px',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            margin: '0 0 12px',
            color: textPrimary,
          }}>
            {slide.title}
          </h2>
          <p style={{
            fontSize: '15px',
            color: textMuted,
            lineHeight: 1.7,
            margin: 0,
            fontWeight: 500,
          }}>
            {slide.description}
          </p>
        </div>

        {/* Footer */}
        <div>
          {/* Step dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            {slides.map((_, i) => (
              <div key={i} style={{
                width: i === step ? '28px' : '8px',
                height: '8px',
                borderRadius: '999px',
                backgroundColor: i === step ? primaryAccent : 'rgba(230,190,178,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }} onClick={() => setStep(i)} />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, #c43a00 0%, #ff6b35 100%)`,
              color: '#fff',
              padding: '18px',
              borderRadius: '14px',
              border: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(196,58,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'transform 0.15s',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {step < slides.length - 1 ? 'Tiếp theo' : 'Bắt đầu hành trình'}
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: textMuted, marginTop: '16px', fontWeight: 500 }}>
            Đã có tài khoản?{' '}
            <span
              style={{ color: primaryAccent, fontWeight: 700, cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </span>
          </p>
        </div>

      </main>
    </div>
  );
};

export default OnboardingPage;
