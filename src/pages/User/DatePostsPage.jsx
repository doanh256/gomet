import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Clock, MapPin, DollarSign, Users, Heart, UserPlus, CreditCard } from 'lucide-react';
import { api } from '../../api/client';
import { useAppContext } from '../../AppContext';
import { useToast } from '../../components/ToastNotification';

const CATEGORIES = {
  tim_yeu: { label: 'Tìm Yêu', icon: <Heart size={18} />, color: '#fd5068', desc: 'Tìm chân ái cuộc đời, không quan tâm tiền bạc' },
  tim_ban: { label: 'Tìm Bạn', icon: <UserPlus size={18} />, color: '#4ecdc4', desc: 'Ăn uống, chụp hình, đi chơi nhóm' },
  tra_phi: { label: 'Trả Phí', icon: <CreditCard size={18} />, color: '#fec142', desc: 'Cuộc hẹn đặc thù, có chi phí kèm theo' },
};

const DatePostsPage = () => {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState(paramCategory || 'tim_yeu');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [applying, setApplying] = useState(null);
  const [applyMessage, setApplyMessage] = useState('');

  useEffect(() => {
    if (paramCategory && CATEGORIES[paramCategory]) {
      setActiveTab(paramCategory);
    }
  }, [paramCategory]);

  useEffect(() => {
    setLoading(true);
    api.get(`/date-posts?category=${activeTab}`).then(data => {
      if (data?.posts) setPosts(data.posts);
    }).catch(console.error).finally(() => setLoading(false));
  }, [activeTab]);

  const handleApply = async (postId) => {
    try {
      await api.post(`/date-posts/${postId}/apply`, { message: applyMessage });
      addToast('Ứng tuyển thành công!', 'success');
      setApplying(null);
      setApplyMessage('');
      // Refresh posts
      const data = await api.get(`/date-posts?category=${activeTab}`);
      if (data?.posts) setPosts(data.posts);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      await api.post('/date-posts', { ...formData, category: activeTab });
      addToast('Đăng kèo thành công!', 'success');
      setShowCreateModal(false);
      const data = await api.get(`/date-posts?category=${activeTab}`);
      if (data?.posts) setPosts(data.posts);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="main-area" style={{ padding: '24px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111418', margin: 0 }}>Tìm Hẹn</h1>
          <p style={{ color: '#505965', fontSize: '14px', margin: '4px 0 0' }}>Tìm người đi chơi, hẹn hò hoặc kèo đặc biệt</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)',
            color: 'white', border: 'none', borderRadius: '30px', padding: '12px 24px',
            fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 16px rgba(253, 80, 104, 0.3)',
          }}
        >
          <Plus size={18} /> Đăng Kèo
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); navigate(`/app/dates/${key}`, { replace: true }); }}
            style={{
              padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px',
              background: activeTab === key ? cat.color : '#f0f2f5',
              color: activeTab === key ? 'white' : '#505965',
              transition: 'all 0.2s',
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Category Description */}
      <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', marginBottom: '24px', border: '1px solid #e1e4e8' }}>
        <p style={{ margin: 0, color: '#505965', fontSize: '14px' }}>{CATEGORIES[activeTab]?.desc}</p>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#505965' }}>Đang tải...</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📭</div>
          <h3 style={{ color: '#111418', fontWeight: 700 }}>Chưa có kèo nào</h3>
          <p style={{ color: '#505965' }}>Hãy là người đầu tiên đăng kèo!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {posts.map(post => (
            <div key={post.id} style={{
              background: 'white', borderRadius: '20px', padding: '20px',
              border: '1px solid #e1e4e8', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s',
            }}>
              {/* Post header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '32px', background: '#f5f7f9', width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {post.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#111418' }}>{post.title}</h3>
                  {post.description && <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#656e7b' }}>{post.description}</p>}
                </div>
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {post.time && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#505965' }}>
                    <Clock size={14} /> {post.time}
                  </div>
                )}
                {post.place && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#505965' }}>
                    <MapPin size={14} /> {post.place}
                  </div>
                )}
                {post.price && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#fd5068', fontWeight: 700 }}>
                    <DollarSign size={14} /> {post.price.toLocaleString('vi-VN')}d
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#505965' }}>
                  <Users size={14} /> {post._count?.applications || 0} người ứng tuyển
                </div>
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #f0f2f5', paddingTop: '14px', marginBottom: '14px' }}>
                <img
                  src={post.author?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
                  alt={post.author?.name}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#111418' }}>{post.author?.name}, {post.author?.age}</div>
                  <div style={{ fontSize: '12px', color: '#656e7b' }}>{post.author?.location}</div>
                </div>
              </div>

              {/* Action */}
              {post.authorId === currentUser?.id ? (
                <button
                  onClick={() => navigate('/app/my-dates')}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e1e4e8', background: '#f8f9fa', color: '#505965', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
                >
                  Quản lý kèo này
                </button>
              ) : applying === post.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    value={applyMessage}
                    onChange={e => setApplyMessage(e.target.value)}
                    placeholder="Lời nhắn cho người đăng (tùy chọn)..."
                    style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '14px', outline: 'none' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setApplying(null); setApplyMessage(''); }} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid #e1e4e8', background: 'white', color: '#505965', fontWeight: 600, cursor: 'pointer' }}>Hủy</button>
                    <button onClick={() => handleApply(post.id)} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: 'none', background: CATEGORIES[activeTab]?.color || '#fd5068', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Gửi</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setApplying(post.id)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '12px', border: 'none',
                    background: CATEGORIES[activeTab]?.color || '#fd5068', color: 'white',
                    fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                >
                  Ứng Tuyển
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Post Modal */}
      {showCreateModal && <CreatePostModal category={activeTab} onClose={() => setShowCreateModal(false)} onSubmit={handleCreatePost} />}
    </div>
  );
};

// Simple Create Post Modal
const CreatePostModal = ({ category, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({
      title, description, icon: icon || 'coffee', time, place,
      price: category === 'tra_phi' ? parseInt(price) || 0 : undefined,
    });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '480px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 800, color: '#111418' }}>Đăng Kèo Mới</h2>
        <p style={{ margin: '0 0 24px', color: '#505965', fontSize: '14px' }}>
          {CATEGORIES[category]?.label} - {CATEGORIES[category]?.desc}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '6px' }}>Tiêu đề kèo *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="VD: Tìm người đi xem phim tối nay" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '6px' }}>Mô tả</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Mô tả chi tiết hơn..." rows={3} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '15px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '6px' }}>Icon (emoji)</label>
            <input value={icon} onChange={e => setIcon(e.target.value)} placeholder="VD: coffee, heart, star" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '6px' }}>Thời gian</label>
              <input value={time} onChange={e => setTime(e.target.value)} placeholder="VD: Tối nay 20:00" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '6px' }}>Địa điểm</label>
              <input value={place} onChange={e => setPlace(e.target.value)} placeholder="VD: Cafe 123, Q1" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          {category === 'tra_phi' && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '6px' }}>Chi phí (VND) *</label>
              <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="VD: 200000" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '14px', borderRadius: '30px', border: '1px solid #e1e4e8', background: 'white', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Hủy</button>
            <button type="submit" style={{ flex: 1, padding: '14px', borderRadius: '30px', border: 'none', background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)', color: 'white', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Đăng Kèo</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatePostsPage;
