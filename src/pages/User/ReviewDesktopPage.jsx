import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rdKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const vibeTags = ['Lang man', 'Soi dong', 'Than mat', 'Sang trong', 'Vui nhon', 'Yen tinh', 'Gia dinh', 'Hen ho'];

const ReviewDesktopPage = () => {
  const navigate = useNavigate();
  const [heatRating, setHeatRating] = useState(3);
  const [selectedVibes, setSelectedVibes] = useState([0, 3]);
  const [review, setReview] = useState('');

  const toggleVibe = (i) => {
    setSelectedVibes(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FDF9F3', color: '#393834' }}>
      <style>{rdKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#393834' }}>arrow_back</span>
        </button>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Danh Gia Trai Nghiem</h1>
        <div style={{
          marginLeft: 'auto', background: 'linear-gradient(135deg, #FFD700, #E8900C)', borderRadius: 12,
          padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>toll</span>
          <span style={{ fontSize: 13, fontWeight: 800 }}>+50 Vàng</span>
        </div>
      </div>

      {/* Two Column */}
      <div style={{ display: 'flex', gap: 32, padding: '32px', maxWidth: 1100, margin: '0 auto' }}>
        {/* Left: Dish Photo */}
        <div style={{ width: 400, flexShrink: 0, animation: 'fadeInUp 0.5s ease both' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 20 }}>
            <img src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=500&fit=crop" alt="dish"
              style={{ width: '100%', height: 400, objectFit: 'cover' }} />
          </div>
          <div style={{
            background: '#ffffff', borderRadius: 20, padding: 20,
            border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 800 }}>Pho Bo Ha Noi</h3>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>Pho Thin - 13 Lo Duc</div>
            <div style={{ fontSize: 13, color: '#666' }}>Quan Hai Ba Trung, Ha Noi</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#F5C542' }}>star</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>4.8</span>
              <span style={{ fontSize: 12, color: '#666' }}>(1.247 danh gia)</span>
            </div>
          </div>
        </div>

        {/* Right: Review Form */}
        <div style={{ flex: 1, animation: 'fadeInUp 0.5s ease 0.1s both' }}>
          {/* Heat Rating */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#FF6B35' }}>local_fire_department</span>
              Do Cay
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4, 5].map(level => (
                <button key={level} onClick={() => setHeatRating(level)} style={{
                  width: 48, height: 48, borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: level <= heatRating ? `rgba(255,107,53,${0.2 + level * 0.16})` : '#EBE8E0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{
                    fontSize: 24, color: level <= heatRating ? '#FF6B35' : '#555'
                  }}>local_fire_department</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Check */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#6C63FF' }}>mood</span>
              Vibe Check
            </h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {vibeTags.map((v, i) => (
                <button key={i} onClick={() => toggleVibe(i)} style={{
                  padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: selectedVibes.includes(i) ? 'linear-gradient(135deg, #6C63FF, #8B5CF6)' : '#EBE8E0',
                  color: selectedVibes.includes(i) ? '#fff' : '#666460', fontSize: 13, fontWeight: 600
                }}>{v}</button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#00C9A7' }}>photo_camera</span>
              Anh Cua Ban
            </h3>
            <div style={{
              border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 16, padding: 32,
              textAlign: 'center', cursor: 'pointer', background: '#F7F3EC'
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 36, color: '#555', marginBottom: 8, display: 'block' }}>add_photo_alternate</span>
              <div style={{ fontSize: 13, color: '#666' }}>Keo tha hoac nhan de tai anh len</div>
            </div>
          </div>

          {/* Text Review */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 6, color: '#FFD700' }}>edit_note</span>
              Nhan Xet
            </h3>
            <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Chia se trai nghiem cua ban..."
              style={{
                width: '100%', minHeight: 120, borderRadius: 16, border: '1px solid rgba(0,0,0,0.1)',
                background: '#ffffff', color: '#393834', padding: 16, fontSize: 14,
                resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6
              }} />
          </div>

          {/* Publish CTA */}
          <button style={{
            width: '100%', padding: '16px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', color: '#fff',
            fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>publish</span>
            Dang Danh Gia
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDesktopPage;
