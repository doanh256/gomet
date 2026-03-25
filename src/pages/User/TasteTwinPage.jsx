import React from 'react';
import { useNavigate } from 'react-router-dom';

const ttKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.4); opacity: 0; }
}
`;

const secondaryMatches = [
  { name: 'Hana T.', match: 89, city: 'Tokyo', avatar: 'https://i.pravatar.cc/80?img=5' },
  { name: 'Pierre L.', match: 86, city: 'Paris', avatar: 'https://i.pravatar.cc/80?img=12' },
  { name: 'Sakura M.', match: 83, city: 'Osaka', avatar: 'https://i.pravatar.cc/80?img=9' },
  { name: 'Marco R.', match: 81, city: 'Milan', avatar: 'https://i.pravatar.cc/80?img=15' },
  { name: 'Linh D.', match: 79, city: 'Đà Nẵng', avatar: 'https://i.pravatar.cc/80?img=25' },
  { name: 'Soo-Jin K.', match: 77, city: 'Seoul', avatar: 'https://i.pravatar.cc/80?img=20' },
];

const nearbyBites = [
  { name: 'Pho 2000', dist: '0.3km', rating: 4.5 },
  { name: 'Bánh Mì 362', dist: '0.5km', rating: 4.8 },
  { name: 'Bún Bò Huế Đông Ba', dist: '0.8km', rating: 4.6 },
];

const mapDots = [
  { top: '28%', left: '72%' }, { top: '35%', left: '15%' }, { top: '30%', left: '48%' },
  { top: '55%', left: '25%' }, { top: '45%', left: '78%' }, { top: '60%', left: '52%' },
  { top: '22%', left: '55%' }, { top: '50%', left: '40%' },
];

const TasteTwinPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#FDF9F3', color: '#1A1A2E', paddingBottom: 32 }}>
      <style>{ttKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#1A1A2E' }}>arrow_back</span>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Kết Nối Toàn Cầu</h1>
        </div>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#6C63FF' }}>public</span>
      </div>

      {/* World Map Placeholder */}
      <div style={{ padding: '20px 16px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #E8EAF6, #C5CAE9)', borderRadius: 20, height: 200,
          position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(108,99,255,0.15)'
        }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 80, color: 'rgba(108,99,255,0.15)' }}>public</span>
          </div>
          {mapDots.map((dot, i) => (
            <div key={i} style={{ position: 'absolute', top: dot.top, left: dot.left }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#6C63FF', position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid #6C63FF',
                  animation: `pulse 2s ease ${i * 0.3}s infinite`
                }} />
              </div>
            </div>
          ))}
          <div style={{ position: 'absolute', bottom: 12, left: 16, fontSize: 12, color: '#5C6BC0', fontWeight: 600 }}>
            8 kết nối vị giác trên thế giới
          </div>
        </div>
      </div>

      {/* Primary Taste Twin */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#1A1A2E' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#6C63FF' }}>favorite</span>
          Taste Twin Của Bạn
        </h2>
        <div style={{
          background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 4px 24px rgba(108,99,255,0.12)',
          border: '2px solid #6C63FF', animation: 'fadeInUp 0.5s ease both'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="https://i.pravatar.cc/80?img=32" alt="twin" style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid #6C63FF' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Yuki Tanaka</div>
              <div style={{ fontSize: 13, color: '#888' }}>Tokyo, Nhật Bản</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', borderRadius: 12, padding: '6px 14px',
              color: '#fff', fontSize: 18, fontWeight: 800
            }}>96%</div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Phở', 'Ramen', 'Bánh Mì', 'Sushi', 'Bún Chả'].map((d, i) => (
              <span key={i} style={{
                background: '#F0EDFF', color: '#6C63FF', borderRadius: 20, padding: '4px 12px',
                fontSize: 12, fontWeight: 600
              }}>{d}</span>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: '#666', lineHeight: 1.5 }}>
            Cùng yêu thích món nước dùng đậm đà và bánh mì giòn. Cả hai đều thích khám phá ẩm thực đường phố.
          </div>
        </div>
      </div>

      {/* Secondary Connections */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#1A1A2E' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#6C63FF' }}>group</span>
          Kết Nối Khác
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {secondaryMatches.map((m, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: 14, textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              animation: `fadeInUp 0.5s ease ${i * 0.08}s both`
            }}>
              <img src={m.avatar} alt={m.name} style={{ width: 48, height: 48, borderRadius: '50%', marginBottom: 8 }} />
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{m.name}</div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>{m.city}</div>
              <div style={{
                background: '#F0EDFF', borderRadius: 10, padding: '3px 10px', display: 'inline-block',
                fontSize: 13, fontWeight: 800, color: '#6C63FF'
              }}>{m.match}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Bites Nearby */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#1A1A2E' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#E8900C' }}>near_me</span>
          Ăn Nhanh Gần Đây
        </h2>
        {nearbyBites.map((b, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{b.dist}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16, color: '#F5C542' }}>star</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{b.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasteTwinPage;
