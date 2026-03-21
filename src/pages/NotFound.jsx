import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1f1140 0%, #13111C 100%)',
      color: 'white', textAlign: 'center', padding: '40px'
    }}>
      <div style={{
        background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)',
        borderRadius: '28px', padding: '56px 48px', maxWidth: '440px'
      }}>
        <SearchX size={64} color="#FF6B6B" style={{ marginBottom: '24px' }} />
        <h1 style={{ fontSize: '80px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1, color: '#FF6B6B' }}>404</h1>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px 0' }}>Trang không tồn tại!</h2>
        <p style={{ color: '#A09FB1', fontSize: '15px', marginBottom: '36px', lineHeight: 1.6 }}>
          Kèo anh chọn đã bay. Trang bạn đang tìm không có hoặc đã bị xóa.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(260deg, #FF6B6B, #fec142)',
            color: 'white', border: 'none', borderRadius: '30px',
            padding: '14px 32px', fontSize: '15px', fontWeight: 700,
            cursor: 'pointer', margin: '0 auto'
          }}
        >
          <Home size={18} /> Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFound;
