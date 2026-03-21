import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Search } from 'lucide-react';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import PremiumModal from '../../components/User/PremiumModal';
import ProfileDetailModal from '../../components/User/ProfileDetailModal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAppContext();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [standoutProfiles, setStandoutProfiles] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch standout profiles
    api.get('/users/profiles?limit=4').then(data => {
      if (data?.profiles) setStandoutProfiles(data.profiles);
    }).catch(console.error);

    // Fetch hot date posts
    api.get('/date-posts?status=open&limit=6').then(data => {
      if (data?.posts) setHotPosts(data.posts);
    }).catch(console.error);
  }, []);

  const getAvatarUrl = (user) => {
    if (!user) return '';
    return user.avatar || user.images?.[0]?.url || user.images?.[0] || '';
  };

  return (
    <div className="standouts-container">
      <div className="standouts-header">
        <div>
          <h1><Sparkles className="text-pink" /> Chào {currentUser?.name}, đây là Top Picks cho bạn</h1>
          <p>Danh sách tuyển chọn những hồ sơ nổi bật nhất hôm nay dựa trên sở thích và độ tương thích của bạn.</p>
        </div>
        <button className="standouts-filter-btn" onClick={() => navigate('/app/explore')}>
          <Search size={18} /> Khám Phá Thêm
        </button>
      </div>

      <div className="standouts-grid">
        {standoutProfiles.map((profile) => (
          <div
            key={profile.id}
            className="standout-card"
            onClick={() => setSelectedProfile(profile)}
          >
            <img src={getAvatarUrl(profile)} alt={profile.name} className="standout-img" />
            <div className="standout-overlay">
              <div className="standout-info">
                <div className="standout-name">
                  {profile.name} <span className="standout-age">{profile.age}</span>
                </div>
                {profile.location && (
                  <div className="profile-details" style={{ marginBottom: '8px' }}>
                    <MapPin size={14} /> {profile.location}
                  </div>
                )}
                <div className="standout-bio">{profile.bio}</div>

                <div className="standout-actions">
                  <button
                    className="standout-btn secondary"
                    onClick={(e) => { e.stopPropagation(); setSelectedProfile(profile); }}
                  >
                    Xem Hồ Sơ
                  </button>
                  <button
                    className="standout-btn primary"
                    onClick={(e) => { e.stopPropagation(); setIsPremiumModalOpen(true); }}
                  >
                    Say Hi
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hot Date Posts Section */}
      {hotPosts.length > 0 && (
        <>
          <div className="standouts-header" style={{ marginTop: '32px' }}>
            <div>
              <h2>Kèo Đang Hot Quanh Đây</h2>
              <p>Tham gia ngay các hoạt động thú vị từ những người bạn mới.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', margin: '0 -16px', padding: '0 16px', scrollbarWidth: 'none' }}>
            {hotPosts.map(post => (
              <div
                key={post.id}
                onClick={() => navigate(`/app/dates/${post.category}`)}
                style={{
                  minWidth: '260px', backgroundColor: 'white', borderRadius: '20px', padding: '16px',
                  border: '1px solid #e1e4e8', cursor: 'pointer', flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    fontSize: '28px', backgroundColor: '#f5f7f9',
                    width: '48px', height: '48px', borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {post.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: '#111418', lineHeight: 1.4 }}>
                      {post.title}
                    </div>
                    {post.price && (
                      <div style={{ fontSize: '13px', color: '#fd5068', fontWeight: 600, marginTop: '4px' }}>
                        {post.price.toLocaleString('vi-VN')}d
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #f0f2f5', paddingTop: '12px' }}>
                  <img src={getAvatarUrl(post.author)} alt={post.author?.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#111418' }}>{post.author?.name}, {post.author?.age}</div>
                    <div style={{ fontSize: '12px', color: '#656e7b' }}>{post.place || post.author?.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
