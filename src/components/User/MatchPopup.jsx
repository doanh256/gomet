import React, { useRef, useEffect, useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MatchPopup = ({ user, onClose }) => {
  const navigate = useNavigate();
  const hasNavigatedRef = useRef(false);
  const canvasRef = useRef(null);

  // Confetti Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#fd5068', '#ff7854', '#fec142', '#FF6B6B', '#ffffff', '#667eea'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1) * 14 - 2,
        size: Math.random() * 8 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.vy += 0.25;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.008;
        if (p.opacity <= 0) return;
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (alive) frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!user) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.88)', zIndex: 9999, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
    }} role="dialog" aria-modal="true" aria-label="Match thành công">
      {/* Confetti Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }} />

      <div style={{
        textAlign: 'center', color: 'white', position: 'relative', zIndex: 2,
        animation: 'matchPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {/* Sparkle decorations */}
        <Sparkles size={28} color="#fec142" style={{ position: 'absolute', top: '-30px', left: '20%', animation: 'sparkle 1.5s infinite' }} />
        <Sparkles size={20} color="#FF6B6B" style={{ position: 'absolute', top: '-20px', right: '15%', animation: 'sparkle 1.5s infinite 0.5s' }} />

        <h1 style={{
          fontSize: '52px', fontWeight: 900, fontStyle: 'italic', marginBottom: '4px',
          background: 'linear-gradient(260deg, #fd5068, #fec142)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontFamily: "'Inter', 'Segoe UI', sans-serif", letterSpacing: '3px',
          filter: 'drop-shadow(0 4px 12px rgba(253, 80, 104, 0.5))'
        }}>
          🎉 IT'S A MATCH!
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.85, fontWeight: 500 }}>
          Bạn và <strong>{user.name}</strong> đã thích nhau
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '44px' }}>
          {/* Your avatar */}
          <div style={{
            width: '128px', height: '128px', borderRadius: '50%', border: '4px solid white',
            overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
            animation: 'slideInLeft 0.6s ease-out'
          }}>
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60" alt="You"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg, #fd5068, #ff7854)'; }} />
          </div>
          {/* Heart icon between */}
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(260deg, #fd5068, #fec142)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(253, 80, 104, 0.5)',
            animation: 'pulse 1s infinite'
          }}>
            <span style={{ fontSize: '24px' }}>❤️</span>
          </div>
          {/* Match avatar */}
          <div style={{
            width: '128px', height: '128px', borderRadius: '50%', border: '4px solid #fd5068',
            overflow: 'hidden', boxShadow: '0 12px 28px rgba(253, 80, 104, 0.4)',
            animation: 'slideInRight 0.6s ease-out'
          }}>
            <img src={user.images?.[0] || user.img} alt={user.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg, #FF6B6B, #fec142)'; }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={() => {
              if (hasNavigatedRef.current) return;
              hasNavigatedRef.current = true;
              onClose();
              navigate(`/app/chat?uid=${user.id}`);
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 52px',
              borderRadius: '30px', background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)',
              color: 'white', border: 'none', fontSize: '18px', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 6px 24px rgba(253, 80, 104, 0.45)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <MessageCircle size={22} /> Nhắn tin ngay
          </button>
          <button 
            onClick={onClose}
            style={{
              padding: '14px 48px', borderRadius: '30px', backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.8)', border: '2px solid rgba(255,255,255,0.3)',
              fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            Tiếp tục quẹt
          </button>
        </div>
      </div>
      
      <style>
        {`
          @keyframes matchPop { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes slideInLeft { 0% { transform: translateX(-60px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
          @keyframes slideInRight { 0% { transform: translateX(60px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
          @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
          @keyframes sparkle { 0%,100% { opacity: 0.3; transform: rotate(0deg) scale(0.8); } 50% { opacity: 1; transform: rotate(180deg) scale(1.2); } }
        `}
      </style>
    </div>
  );
};
export default MatchPopup;
