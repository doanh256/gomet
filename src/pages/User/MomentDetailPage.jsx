import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mdKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const comments = [
  { name: 'Tuan Anh', avatar: 'https://i.pravatar.cc/40?img=12', text: 'Trông ngon quá! Phải thử ngay', time: '2h' },
  { name: 'Mai Linh', avatar: 'https://i.pravatar.cc/40?img=5', text: 'Mình cũng mới ăn ở đây tuần trước, tuyệt vời lắm', time: '4h' },
  { name: 'Duc Minh', avatar: 'https://i.pravatar.cc/40?img=15', text: 'Rating bao nhiêu sao vậy bạn?', time: '5h' },
];

const relatedMoments = [
  { img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=150&h=150&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=150&h=150&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=150&h=150&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&h=150&fit=crop' },
  { img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&h=150&fit=crop' },
];

const MomentDetailPage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#FDF9F3', color: '#393834', paddingBottom: 80 }}>
      <style>{mdKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#393834' }}>arrow_back</span>
        </button>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Moment</h1>
      </div>

      {/* Full Width Photo */}
      <div style={{ width: '100%', aspectRatio: '4/5', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=750&fit=crop" alt="moment"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* User Info */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="https://i.pravatar.cc/48?img=32" alt="user" style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #6C63FF' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Minh Tran</span>
            <div style={{
              background: 'linear-gradient(135deg, #FFD700, #E8900C)', borderRadius: 8,
              padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 3
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 12, color: '#fff' }}>toll</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>2.4k</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#888' }}>12 giờ trước</div>
        </div>
        <button style={{
          padding: '6px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', color: '#fff',
          fontSize: 13, fontWeight: 700
        }}>Theo dõi</button>
      </div>

      {/* Dish Tag */}
      <div style={{ padding: '0 16px', marginBottom: 12 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(232,144,12,0.1)', borderRadius: 12, padding: '8px 14px'
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#E8900C' }}>restaurant</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#E8900C' }}>Bún Chả Đắc Kim</div>
            <div style={{ fontSize: 11, color: '#888' }}>Bún Chả 34 - Hàng Than, Ba Đình</div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#666460' }}>
          Bún chả ngon nhất Hà Nội đây rồi! Thịt nướng than hoa, nước chấm vừa ngọt vừa chua. Nem rán giòn tan. 10/10 sẽ quay lại!
        </p>
      </div>

      {/* Action Bar */}
      <div style={{
        padding: '12px 16px', display: 'flex', gap: 20, borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: 16
      }}>
        <button onClick={() => setLiked(!liked)} style={{
          background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: liked ? '#FF6B9D' : '#888' }}>
            {liked ? 'favorite' : 'favorite_border'}
          </span>
          <span style={{ fontSize: 13, color: '#888', fontWeight: 600 }}>{liked ? 248 : 247}</span>
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#888' }}>chat_bubble_outline</span>
          <span style={{ fontSize: 13, color: '#888', fontWeight: 600 }}>34</span>
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#888' }}>share</span>
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginLeft: 'auto' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#888' }}>bookmark_border</span>
        </button>
      </div>

      {/* Comments */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700 }}>Bình luận</h3>
        {comments.map((c, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, marginBottom: 16,
            animation: `fadeInUp 0.4s ease ${i * 0.08}s both`
          }}>
            <img src={c.avatar} alt={c.name} style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{c.name}</span>
                <span style={{ fontSize: 11, color: '#555' }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 13, color: '#666460', marginTop: 2, lineHeight: 1.4 }}>{c.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Related Moments */}
      <div style={{ padding: '0 16px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700 }}>Moments Liên Quan</h3>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
          {relatedMoments.map((m, i) => (
            <div key={i} style={{ flexShrink: 0 }}>
              <img src={m.img} alt="related" style={{ width: 110, height: 110, borderRadius: 14, objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MomentDetailPage;
