import React from 'react';
import { useNavigate } from 'react-router-dom';

const gsKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes drawRadar {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
`;

const members = [
  { name: 'Minh', avatar: 'https://i.pravatar.cc/60?img=11', color: '#6C63FF' },
  { name: 'Linh', avatar: 'https://i.pravatar.cc/60?img=5', color: '#FF6B9D' },
  { name: 'Tuan', avatar: 'https://i.pravatar.cc/60?img=12', color: '#00C9A7' },
  { name: 'Hoa', avatar: 'https://i.pravatar.cc/60?img=9', color: '#FFD700' },
];

const axes = ['Cay', 'Ngot', 'Man', 'Chua', 'Dang', 'Umami'];

const tasteBars = [
  { name: 'Minh', scores: { cay: 85, nuoc: 70, street: 90, fine: 40 }, color: '#6C63FF' },
  { name: 'Linh', scores: { cay: 50, nuoc: 90, street: 60, fine: 80 }, color: '#FF6B9D' },
  { name: 'Tuan', scores: { cay: 75, nuoc: 65, street: 85, fine: 55 }, color: '#00C9A7' },
  { name: 'Hoa', scores: { cay: 60, nuoc: 80, street: 70, fine: 75 }, color: '#FFD700' },
];

const GroupSynergyPage = () => {
  const navigate = useNavigate();

  const radarSize = 240;
  const cx = radarSize / 2;
  const cy = radarSize / 2;
  const r = 90;

  const getPoint = (idx, val) => {
    const angle = (Math.PI * 2 * idx) / 6 - Math.PI / 2;
    const dist = (val / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const groupValues = [80, 65, 75, 70, 45, 85];
  const groupPath = groupValues.map((v, i) => {
    const p = getPoint(i, v);
    return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
  }).join(' ') + ' Z';

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#fff', paddingBottom: 32 }}>
      <style>{gsKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#fff' }}>arrow_back</span>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Group Synergy</h1>
        </div>
      </div>

      {/* Squad */}
      <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginRight: 8 }}>Biet doi Am Thuc</div>
        <div style={{ display: 'flex' }}>
          {members.map((m, i) => (
            <img key={i} src={m.avatar} alt={m.name} style={{
              width: 36, height: 36, borderRadius: '50%', border: `2px solid ${m.color}`,
              marginLeft: i > 0 ? -10 : 0, position: 'relative', zIndex: members.length - i
            }} />
          ))}
        </div>
      </div>

      {/* Radar Chart */}
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <div style={{ animation: 'drawRadar 0.8s ease both' }}>
          <svg width={radarSize} height={radarSize} viewBox={`0 0 ${radarSize} ${radarSize}`}>
            {[20, 40, 60, 80, 100].map(level => {
              const pts = Array.from({ length: 6 }, (_, i) => {
                const p = getPoint(i, level);
                return `${p.x},${p.y}`;
              }).join(' ');
              return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
            })}
            {axes.map((_, i) => {
              const p = getPoint(i, 100);
              return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />;
            })}
            <polygon points={groupPath.replace(/[MLZ]/g, (m) => m === 'Z' ? '' : '').split(/[ML]/).filter(Boolean).join(' ')}
              fill="none" stroke="none" />
            <path d={groupPath} fill="rgba(108,99,255,0.2)" stroke="#6C63FF" strokeWidth="2" />
            {groupValues.map((v, i) => {
              const p = getPoint(i, v);
              return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6C63FF" />;
            })}
            {axes.map((label, i) => {
              const p = getPoint(i, 115);
              return <text key={i} x={p.x} y={p.y} fill="#888" fontSize="11" textAnchor="middle" dominantBaseline="middle">{label}</text>;
            })}
          </svg>
        </div>
      </div>

      {/* Synergy Score */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 36, fontWeight: 900, background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>92%</span>
        <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Group Synergy</div>
      </div>

      {/* Member Taste Bars */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#fff' }}>So Sanh Vi Giac</h3>
        {['Cay', 'Mon nuoc', 'Street food', 'Fine dining'].map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{cat}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {tasteBars.map((m, mi) => {
                const score = Object.values(m.scores)[ci];
                return (
                  <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, width: 36, color: '#999' }}>{m.name}</span>
                    <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                      <div style={{ width: `${score}%`, height: '100%', background: m.color, borderRadius: 3, transition: 'width 0.8s ease' }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#999', width: 28 }}>{score}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AI Venue Suggestion */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,201,167,0.15))',
          borderRadius: 20, padding: 20, border: '1px solid rgba(108,99,255,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#6C63FF' }}>smart_toy</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>AI Goi Y Dia Diem</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Nha Hang Secret Garden</div>
          <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>158 Pasteur, Q.1 - Phu hop 95% nhom cua ban</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Viet fusion', 'San vuon', 'Nhom 4-6'].map((t, i) => (
              <span key={i} style={{ background: 'rgba(108,99,255,0.2)', color: '#A5A0FF', borderRadius: 14, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 16px' }}>
        <button style={{
          width: '100%', padding: '16px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', color: '#fff',
          fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>calendar_month</span>
          Len Lich Nhom
        </button>
      </div>
    </div>
  );
};

export default GroupSynergyPage;
