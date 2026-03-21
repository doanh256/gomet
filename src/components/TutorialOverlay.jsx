import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';

const TUTORIAL_KEY = 'gomet_has_seen_tutorial';

const STEPS = [
  {
    icon: '🎯',
    title: 'Chào mừng đến Gomet!',
    desc: 'Gomet là nơi bạn tìm Cạ Cứng theo từng Kèo — hoạt động cụ thể vào thời điểm cụ thể, không phải hẹn hò mơ hồ.',
  },
  {
    icon: '⚡',
    title: 'Quẹt Phải = Tham Gia Kèo',
    desc: 'Mỗi người đều có 1 Kèo ngẫu hứng hôm nay. Quẹt Phải nếu muốn tham gia, Trái để bỏ qua. Match = cùng đi!',
    tip: '💡 Dùng phím ← → trên máy tính để quẹt nhanh hơn'
  },
];

const TutorialOverlay = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeen = localStorage.getItem(TUTORIAL_KEY);
    if (!hasSeen) {
      setVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem(TUTORIAL_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  const current = STEPS[step];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1f1140 0%, #13111C 100%)',
        borderRadius: '28px', maxWidth: '420px', width: '100%',
        padding: '40px 32px', textAlign: 'center', position: 'relative',
        border: '1px solid rgba(255,107,107,0.2)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.3s ease-out'
      }}>
        {/* Nút X chỉ hiện ở bước cuối */}
        {step >= 1 && (
          <button onClick={handleClose} style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.08)', border: 'none', color: '#A09FB1',
            width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}><X size={16} /></button>
        )}

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '32px' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: i === step ? '24px' : '8px', height: '8px', borderRadius: '4px',
              background: i === step ? 'linear-gradient(90deg,#FF6B6B,#fec142)' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>

        <div style={{ fontSize: '64px', marginBottom: '20px', lineHeight: 1 }}>{current.icon}</div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>{current.title}</h2>
        <p style={{ color: '#A09FB1', fontSize: '15px', lineHeight: 1.6, margin: '0 0 16px 0' }}>{current.desc}</p>
        {current.tip && (
          <div style={{ background: 'rgba(255,193,66,0.1)', border: '1px solid rgba(255,193,66,0.25)', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#fec142', marginBottom: '8px' }}>
            {current.tip}
          </div>
        )}

        <button onClick={handleNext} style={{
          marginTop: '24px', width: '100%', padding: '16px',
          background: 'linear-gradient(260deg, #FF6B6B 0%, #fec142 100%)',
          color: 'white', border: 'none', borderRadius: '30px',
          fontSize: '16px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)'
        }}>
          {step < STEPS.length - 1 ? (
            <><ChevronRight size={18} /> Tiếp tục ({step + 1}/{STEPS.length})</>
          ) : (
            <>🚀 Bắt đầu Gomet!</>
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TutorialOverlay;
