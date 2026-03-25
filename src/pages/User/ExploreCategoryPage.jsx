import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { api } from '../../api/client';

const CATEGORY_META = {
  'nguoi-yeu': { title: 'Tìm Người Yêu', emoji: '\uD83D\uDC95', desc: 'Những người đang tìm kiếm mối quan hệ nghiêm túc' },
  'cafe': { title: 'Hẹn Hò Cafe Vỉa Hè', emoji: '\u2615', desc: 'Cùng nhâm nhi cafe và trò chuyện' },
  'chua-lanh': { title: 'Chữa Lành Tâm Hồn', emoji: '\uD83C\uDF3F', desc: 'Chia sẻ câu chuyện và hỗ trợ lẫn nhau' },
  'thu-cung': { title: 'Tín Đồ Yêu Mèo/Chó', emoji: '\uD83D\uDC3E', desc: 'Những người yêu thú cưng' },
  'netflix': { title: 'Netflix & Chill', emoji: '\uD83C\uDF7F', desc: 'Tìm bạn xem phim cùng' },
  'the-thao': { title: 'Tập Gym / Chạy Bộ', emoji: '\uD83D\uDCAA', desc: 'Tìm bạn tập luyện cùng' },
  'deadline': { title: 'Chạy Deadline Đêm', emoji: '\uD83D\uDCBB', desc: 'Làm việc cùng nhau cho bớt buồn' },
  'game': { title: 'Gánh Rank Cùng Nhau', emoji: '\uD83C\uDFAE', desc: 'Tìm đồng đội game online' },
};

const ExploreCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const meta = CATEGORY_META[id] || { title: id, emoji: '\uD83D\uDD0D', desc: '' };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await api.get('/users/profiles?limit=20');
        if (data?.profiles) setUsers(data.profiles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <div style={{ flex: 1, backgroundColor: '#131313', overflowY: 'auto' }}>
      <div style={{ padding: '24px 32px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00' }}>
        <button onClick={() => navigate('/app/explore')} style={{ background: 'rgba(58,11,0,0.2)', border: 'none', color: '#3A0B00', padding: '8px 16px', borderRadius: '9999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>
          <ArrowLeft size={16} /> Quay lại
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '40px' }}>{meta.emoji}</span>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>{meta.title}</h1>
            <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: '14px' }}>{meta.desc}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#E6BEB2' }}>Đang tải...</div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#E6BEB2' }}>
            <p style={{ fontSize: '48px', marginBottom: '12px' }}>\uD83D\uDE22</p>
            <p style={{ fontSize: '16px', fontWeight: 500 }}>Chưa có ai trong mục này</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {users.map(user => (
              <div key={user.id} style={{ backgroundColor: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '240px', position: 'relative', backgroundColor: '#2A2A2A' }}>
                  <img src={user.avatar || user.images?.[0]?.url || ''} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '16px 12px 12px' }}>
                    <h3 style={{ color: '#FDF9F3', margin: 0, fontSize: '16px', fontWeight: 700 }}>{user.name}, {user.age || '?'}</h3>
                    {user.location && <p style={{ color: 'rgba(253,249,243,0.8)', margin: '2px 0 0', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} /> {user.location}</p>}
                  </div>
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{ fontSize: '13px', color: '#E6BEB2', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.bio || 'Chưa có giới thiệu'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ExploreCategoryPage;
