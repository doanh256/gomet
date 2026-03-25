import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const liveKeyframes = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes pulseLive {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.15); }
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.7); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes ripple {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
}
`;

const sharedTastes = ['Pho', 'Bun Cha', 'Banh Xeo', 'Ca Phe Sua Da', 'Goi Cuon'];

const TasteMatchLivePage = () => {
  const navigate = useNavigate();
  const [matchFound, setMatchFound] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <style>{liveKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#fff' }}>arrow_back</span>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 6, color: '#FFD700' }}>bolt</span>
            Tim Taste Twin
          </h1>
        </div>
        <div style={{
          background: '#FF3B5C', borderRadius: 20, padding: '4px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
          animation: 'pulseLive 1.5s ease infinite'
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>LIVE</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        {!matchFound ? (
          <>
            {/* Scanning Animation */}
            <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 32 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '2px solid rgba(108,99,255,0.3)',
                  animation: `ripple 2s ease ${i * 0.6}s infinite`
                }} />
              ))}
              <div style={{
                position: 'absolute', inset: 20, borderRadius: '50%',
                border: '3px solid transparent', borderTopColor: '#6C63FF',
                animation: 'spin 1.2s linear infinite'
              }} />
              <div style={{
                position: 'absolute', inset: 40, borderRadius: '50%',
                border: '3px solid transparent', borderTopColor: '#FFD700',
                animation: 'spin 1.8s linear infinite reverse'
              }} />
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 40, color: '#6C63FF' }}>person_search</span>
              </div>
            </div>

            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Dang tim...</div>
            <div style={{ fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 40 }}>
              Dang ket noi ban voi nguoi co vi giac tuong tu
            </div>

            <button
              onClick={() => setMatchFound(true)}
              style={{
                background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', border: 'none', borderRadius: 16,
                padding: '14px 40px', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer'
              }}
            >
              Mo phong tim thay
            </button>
          </>
        ) : (
          <div style={{ animation: 'fadeInScale 0.6s ease both', textAlign: 'center', width: '100%' }}>
            <div style={{ marginBottom: 20 }}>
              <img src="https://i.pravatar.cc/120?img=47" alt="match" style={{
                width: 100, height: 100, borderRadius: '50%', border: '4px solid #6C63FF',
                boxShadow: '0 0 40px rgba(108,99,255,0.4)'
              }} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Linh Pham</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Quan 3, TP.HCM</div>

            <div style={{
              background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', borderRadius: 16,
              padding: '8px 24px', display: 'inline-block', marginBottom: 20
            }}>
              <span style={{ fontSize: 28, fontWeight: 900 }}>94%</span>
              <span style={{ fontSize: 13, marginLeft: 6, opacity: 0.9 }}>tuong thich</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>Vi giac chung</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {sharedTastes.map((t, i) => (
                  <span key={i} style={{
                    background: 'rgba(108,99,255,0.15)', color: '#A5A0FF', borderRadius: 20,
                    padding: '5px 14px', fontSize: 12, fontWeight: 600
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, padding: '0 16px' }}>
              <button style={{
                flex: 1, padding: '14px 0', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)',
                background: 'transparent', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer'
              }}>Tim tiep</button>
              <button style={{
                flex: 1, padding: '14px 0', borderRadius: 14, border: 'none',
                background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: 'pointer'
              }}>Gui loi chao</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasteMatchLivePage;
