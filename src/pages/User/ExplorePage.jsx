import React from 'react';
import { Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExplorePage = () => {
  const navigate = useNavigate();
  const categories = [
    { id: 'nguoi-yeu', title: "Tìm Người Yêu", img: "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?w=800&auto=format&fit=crop&q=60" },
    { id: 'cafe', title: "Hẹn Hò Cafe Vỉa Hè", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&auto=format&fit=crop&q=60" },
    { id: 'chua-lanh', title: "Chữa Lành Tâm Hồn", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop&q=60" },
    { id: 'thu-cung', title: "Tín Đồ Yêu Mèo/Chó", img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop&q=60" },
    { id: 'netflix', title: "Netflix & Chill", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=60" },
    { id: 'the-thao', title: "Tập Gym / Chạy Bộ", img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=60" },
    { id: 'deadline', title: "Chạy Deadline Đêm", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&auto=format&fit=crop&q=60" },
    { id: 'game', title: "Gánh Rank Cùng Nhau", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=60" }
  ];

  return (
    <div style={{ flex: 1, backgroundColor: 'white', overflowY: 'auto', padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <Compass size={28} color="#fd5068" />
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Khám phá</h1>
      </div>
      <p style={{ color: '#505965', marginBottom: '32px' }}>Tìm những người có chung sở thích với bạn ngay hôm nay.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.map((cat, idx) => (
          <div key={idx} onClick={() => navigate(`/app/explore/${cat.id}`)} style={{ height: '320px', borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <img src={cat.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={cat.title} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: 700 }}>{cat.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExplorePage;
