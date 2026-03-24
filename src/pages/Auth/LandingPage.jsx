import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#131313', color: '#FDF9F3',
      fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden',
    }}>
      {/* ── Language selector top-right ── */}
      <div style={{
        position: 'absolute', top: '24px', right: '24px', zIndex: 20,
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '8px 16px', borderRadius: '9999px',
        backgroundColor: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', cursor: 'pointer',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#E6BEB2' }}>language</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#E6BEB2', letterSpacing: '0.05em' }}>VN</span>
      </div>

      {/* ── Decorative blurred circles ── */}
      <div style={{
        position: 'absolute', top: '-120px', left: '-120px', width: '400px', height: '400px',
        borderRadius: '50%', background: 'rgba(255,181,158,0.1)',
        filter: 'blur(120px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-150px', right: '-100px', width: '500px', height: '500px',
        borderRadius: '50%', background: 'rgba(255,87,26,0.08)',
        filter: 'blur(120px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '20%', width: '250px', height: '250px',
        borderRadius: '50%', background: 'rgba(255,181,158,0.06)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      {/* ── Hero Section ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 120px', textAlign: 'center',
      }}>
        {/* Gradient overlay behind hero */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: -1,
          background: 'linear-gradient(135deg, rgba(184,53,0,0.2), rgba(255,120,77,0.2))',
          pointerEvents: 'none',
        }} />

        {/* Brand */}
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(64px, 12vw, 112px)', fontWeight: 900,
          fontStyle: 'italic', color: '#FFFFFF',
          letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '24px',
        }}>
          GOMET
        </h1>

        {/* Tagline */}
        <div style={{
          fontSize: '14px', fontWeight: 700, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: '#FFB59E', marginBottom: '24px',
          fontFamily: "'Inter', sans-serif",
        }}>
          DI DE GAP &middot; AN DE YEU
        </div>

        {/* Description */}
        <p style={{
          fontSize: '17px', lineHeight: 1.8, color: '#E6BEB2',
          maxWidth: '520px', marginBottom: '48px', opacity: 0.85,
        }}>
          Kham pha nhung trai nghiem am thuc doc dao, kham pha
          nhung dia diem an tuong va ket noi voi nhung nguoi
          cung dam me. GOMET -- noi bat dau cua moi cau chuyen.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '18px 40px', borderRadius: '16px', border: 'none',
              backgroundColor: '#FFFFFF', color: '#FF571A',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '16px', fontWeight: 700, cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            DANG NHAP
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '18px 40px', borderRadius: '16px', border: 'none',
              backgroundColor: '#FF571A', color: '#FFFFFF',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '16px', fontWeight: 700, cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            THAM GIA NGAY
          </button>
        </div>
      </div>

      {/* ── Bottom text ── */}
      <div style={{
        position: 'absolute', bottom: '32px', left: 0, right: 0,
        textAlign: 'center', zIndex: 10,
      }}>
        <span style={{
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: '#E6BEB2', opacity: 0.4,
          fontFamily: "'Inter', sans-serif",
        }}>
          Kinetic Culinary Experience
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
