import React from 'react';
import { useNavigate } from 'react-router-dom';

const esKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
`;

const states = [
  {
    icon: 'heart_broken',
    iconColor: '#FF6B9D',
    bgColor: 'rgba(255,107,157,0.1)',
    title: 'Chưa có match nào',
    description: 'Hãy tiếp tục khám phá và tương tác để tìm người phù hợp với vị giác của bạn.',
    actionLabel: 'Bắt đầu khám phá',
    actionIcon: 'explore',
  },
  {
    icon: 'mail',
    iconColor: '#6C63FF',
    bgColor: 'rgba(108,99,255,0.1)',
    title: 'Hộp thư trống',
    description: 'Bạn chưa có tin nhắn nào. Gửi lời chào đến những người match để bắt đầu trò chuyện.',
    actionLabel: 'Xem matches',
    actionIcon: 'favorite',
  },
  {
    icon: 'wifi_off',
    iconColor: '#FF9800',
    bgColor: 'rgba(255,152,0,0.1)',
    title: 'Mất kết nối',
    description: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.',
    actionLabel: 'Thử lại',
    actionIcon: 'refresh',
  },
];

const EmptyStatesPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#fff', paddingBottom: 32 }}>
      <style>{esKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#fff' }}>arrow_back</span>
        </button>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Trạng Thái Trống</h1>
        <span style={{ fontSize: 12, color: '#888', background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '3px 10px', marginLeft: 8 }}>Demo</span>
      </div>

      {/* Empty States */}
      <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {states.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 32,
            border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center',
            animation: `fadeInUp 0.5s ease ${i * 0.15}s both`
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: s.bgColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', animation: 'float 3s ease infinite'
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 40, color: s.iconColor }}>{s.icon}</span>
            </div>

            <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 800, color: '#fff' }}>{s.title}</h3>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#888', lineHeight: 1.6, maxWidth: 320, marginLeft: 'auto', marginRight: 'auto' }}>
              {s.description}
            </p>

            <button style={{
              padding: '12px 28px', borderRadius: 14, border: 'none', cursor: 'pointer',
              background: `${s.iconColor}20`, color: s.iconColor,
              fontSize: 14, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>{s.actionIcon}</span>
              {s.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyStatesPage;
