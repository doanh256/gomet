import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const confettiColors = ['#ae2f34', '#ff6b6b', '#894e45', '#cf8a7f', '#ffdad8', '#ff9a9e', '#e6c84d', '#6dd5ed', '#ff758c', '#f7971e'];

const confettiKeyframes = `
@keyframes confettiFall0 { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
@keyframes confettiFall1 { 0% { transform: translateY(-10px) rotate(45deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(600deg); opacity: 0; } }
@keyframes confettiFall2 { 0% { transform: translateY(-30px) rotate(90deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(900deg); opacity: 0; } }
@keyframes pulseHeart { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
@keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
`;

const MatchSuccessPage = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const matchData = {
    user1: { name: 'Ban', avatar: '' },
    user2: { name: 'Minh Anh', avatar: '' },
    percentage: 92,
    sharedInterests: ['Ca phe', 'Du lich', 'Am nhac'],
  };

  const avatarStyle = (index) => ({
    width: 80,
    height: 80,
    borderRadius: 'var(--radius-full)',
    background: index === 0 ? 'var(--surface-container-high)' : 'var(--surface-container-highest)',
    border: '3px solid transparent',
    backgroundClip: 'padding-box',
    outline: '3px solid var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(49, 48, 45, 0.92)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      fontFamily: 'var(--font-body)',
    }}>
      <style>{confettiKeyframes}</style>

      {/* Confetti particles */}
      {confettiColors.map((color, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: -20,
          left: `${8 + i * 9}%`,
          width: i % 2 === 0 ? 10 : 8,
          height: i % 2 === 0 ? 10 : 8,
          borderRadius: i % 3 === 0 ? '50%' : '2px',
          backgroundColor: color,
          animation: `confettiFall${i % 3} ${2.5 + (i * 0.3)}s ease-in ${i * 0.2}s infinite`,
          zIndex: 1,
        }} />
      ))}

      {/* Content card */}
      <div style={{
        background: 'var(--surface-container-lowest)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px 32px',
        maxWidth: 380,
        width: '90%',
        textAlign: 'center',
        boxShadow: 'var(--editorial-shadow)',
        animation: 'fadeInUp 0.6s ease-out',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Avatars with heart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 24,
        }}>
          <div style={avatarStyle(0)}>
            {matchData.user1.avatar
              ? <img src={matchData.user1.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--on-surface-variant)' }}>person</span>
            }
          </div>

          <span className="material-symbols-outlined filled" style={{
            fontSize: 32,
            color: 'var(--primary)',
            animation: 'pulseHeart 1.2s ease-in-out infinite',
          }}>favorite</span>

          <div style={avatarStyle(1)}>
            {matchData.user2.avatar
              ? <img src={matchData.user2.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--on-surface-variant)' }}>person</span>
            }
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'var(--font-headline)',
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--on-surface)',
          marginBottom: 8,
        }}>
          Chuc mung! Cac ban da ghep doi! 🎉
        </h1>

        {/* Match percentage badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--primary-fixed)',
          color: 'var(--on-primary-container)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 16px',
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 24,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>monitoring</span>
          {matchData.percentage}% tuong thich
        </div>

        {/* Shared interests */}
        <div style={{ marginBottom: 28 }}>
          <p style={{
            fontSize: 13,
            color: 'var(--on-surface-variant)',
            marginBottom: 10,
            fontWeight: 500,
          }}>So thich chung</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {matchData.sharedInterests.map((interest, i) => (
              <span key={i} style={{
                background: 'var(--tertiary-container)',
                color: 'var(--on-primary)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: 500,
              }}>{interest}</span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <button
          onClick={() => navigate(`/chat/${matchId || 'new'}`)}
          style={{
            width: '100%',
            padding: '14px 0',
            background: 'var(--primary-gradient)',
            color: 'var(--on-primary)',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'var(--font-headline)',
            cursor: 'pointer',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
          Gui tin nhan
        </button>

        <button
          onClick={() => navigate('/swipe')}
          style={{
            width: '100%',
            padding: '14px 0',
            background: 'transparent',
            color: 'var(--primary)',
            border: '2px solid var(--primary)',
            borderRadius: 'var(--radius)',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'var(--font-headline)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>explore</span>
          Tiep tuc kham pha
        </button>
      </div>
    </div>
  );
};

export default MatchSuccessPage;
