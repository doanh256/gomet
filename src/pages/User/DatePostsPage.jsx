import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { useAppContext } from '../../AppContext';
import { useToast } from '../../components/ToastNotification';

const CATEGORIES = {
  all: { label: 'Tất Cả', icon: 'grid_view', color: 'var(--primary)', desc: 'Tất cả các lời mời hẹn hò' },
  tim_yeu: { label: 'Tìm Yêu', icon: 'favorite', color: 'var(--primary)', desc: 'Tìm chân ái cuộc đời' },
  tim_ban: { label: 'Tìm Bạn', icon: 'group', color: 'var(--secondary)', desc: 'Ăn uống, chụp hình, đi chơi nhóm' },
  tra_phi: { label: 'Trả Phí', icon: 'paid', color: 'var(--tertiary)', desc: 'Cuộc hẹn đặc thù, có chi phí kèm theo' },
};

const CATEGORY_BADGE = {
  tim_yeu: { bg: 'var(--primary)', label: 'Tìm Yêu' },
  tim_ban: { bg: 'var(--secondary)', label: 'Tìm Bạn' },
  tra_phi: { bg: 'var(--tertiary)', label: 'Trả Phí' },
};

const DatePostsPage = () => {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState(paramCategory || 'all');
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
    const query = activeTab === 'all' ? '' : `?category=${activeTab}`;
    api.get(`/date-posts${query}`).then(data => {
      if (data?.posts) setPosts(data.posts);
    }).catch(console.error).finally(() => setLoading(false));
  }, [activeTab]);

  const handleApply = async (postId) => {
    try {
      await api.post(`/date-posts/${postId}/apply`, { message: applyMessage });
      addToast('Ung tuyen thanh cong!', 'success');
      setApplying(null);
      setApplyMessage('');
      const query = activeTab === 'all' ? '' : `?category=${activeTab}`;
      const data = await api.get(`/date-posts${query}`);
      if (data?.posts) setPosts(data.posts);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      await api.post('/date-posts', { ...formData, category: activeTab === 'all' ? 'tim_yeu' : activeTab });
      addToast('Dang keo thanh cong!', 'success');
      setShowCreateModal(false);
      const query = activeTab === 'all' ? '' : `?category=${activeTab}`;
      const data = await api.get(`/date-posts${query}`);
      if (data?.posts) setPosts(data.posts);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const formatPrice = (price) => {
    if (!price) return '';
    return price.toLocaleString('vi-VN') + 'd';
  };

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      backgroundColor: 'var(--surface)',
      minHeight: '100vh',
    }}>
      {/* Hero Section */}
      <div style={{
        padding: '48px 32px 32px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-headline)',
          fontSize: '3rem',
          fontWeight: 800,
          color: 'var(--on-surface)',
          margin: 0,
          lineHeight: 1.1,
        }}>
          Tim mot{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Buoi Hen</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.125rem',
          color: 'var(--on-surface-variant)',
          margin: '12px 0 0',
          maxWidth: '540px',
          lineHeight: 1.6,
        }}>
          Duyet cac loi moi duoc tuyen chon hoac dang yeu cau hen ho cua rieng ban.
        </p>
      </div>

      {/* Filter Chips */}
      <div style={{
        padding: '0 32px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  if (key !== 'all') navigate(`/app/dates/${key}`, { replace: true });
                  else navigate('/app/dates', { replace: true });
                }}
                style={{
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isActive ? 'var(--primary)' : 'var(--surface-container-high)',
                  color: isActive ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts Grid */}
      <div style={{
        padding: '0 32px 120px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            color: 'var(--on-surface-variant)',
            fontFamily: 'var(--font-body)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '12px', display: 'block', opacity: 0.4 }}>hourglass_empty</span>
            Dang tai...
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: 'var(--surface-container-low)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--outline)', marginBottom: '16px', display: 'block' }}>mail</span>
            <h3 style={{
              fontFamily: 'var(--font-headline)',
              color: 'var(--on-surface)',
              fontWeight: 700,
              fontSize: '1.25rem',
              margin: '0 0 8px',
            }}>Chua co keo nao</h3>
            <p style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
              Hay la nguoi dau tien dang keo!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {posts.map(post => {
              const catBadge = CATEGORY_BADGE[post.category] || CATEGORY_BADGE.tim_yeu;
              return (
                <div key={post.id} style={{
                  backgroundColor: 'var(--surface-container-lowest)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--card-shadow)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}>
                  {/* Image Section */}
                  <div style={{
                    position: 'relative',
                    height: '320px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--surface-container-high)',
                  }}>
                    <img
                      src={post.image || post.author?.avatar || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600'}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />

                    {/* Category Badge - top left */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: catBadge.bg,
                      color: 'var(--on-primary)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.02em',
                    }}>
                      {catBadge.label}
                    </div>

                    {/* Price Badge - top right (for tra_phi) */}
                    {post.category === 'tra_phi' && post.price && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: 'var(--surface-container-lowest)',
                        color: 'var(--tertiary)',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.875rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-headline)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      }}>
                        {formatPrice(post.price)}
                      </div>
                    )}

                    {/* Gradient overlay at bottom of image */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '120px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    }} />

                    {/* Author info on image */}
                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <img
                        src={post.author?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
                        alt={post.author?.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-full)',
                          objectFit: 'cover',
                          border: '2px solid white',
                        }}
                      />
                      <div>
                        <div style={{
                          color: 'white',
                          fontFamily: 'var(--font-headline)',
                          fontWeight: 700,
                          fontSize: '0.9375rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}>
                          {post.author?.name}{post.author?.age ? `, ${post.author.age}` : ''}
                          {post.author?.verified && (
                            <span className="material-symbols-outlined filled" style={{ fontSize: '16px', color: '#4fc3f7' }}>verified</span>
                          )}
                        </div>
                        {post.author?.location && (
                          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8125rem' }}>
                            {post.author.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-headline)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--on-surface)',
                      margin: '0 0 8px',
                    }}>
                      {post.title}
                    </h3>

                    {post.description && (
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--on-surface-variant)',
                        fontStyle: 'italic',
                        margin: '0 0 14px',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        "{post.description}"
                      </p>
                    )}

                    {/* Details row */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '14px',
                      fontSize: '0.8125rem',
                      color: 'var(--on-surface-variant)',
                      fontFamily: 'var(--font-body)',
                    }}>
                      {post.time && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                          {post.time}
                        </div>
                      )}
                      {post.place && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                          {post.place}
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>group</span>
                        {post._count?.applications || 0} ung tuyen
                      </div>
                    </div>

                    {/* Interest tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '16px',
                      }}>
                        {post.tags.map((tag, i) => (
                          <span key={i} style={{
                            backgroundColor: 'var(--surface-container-high)',
                            color: 'var(--on-surface-variant)',
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            fontFamily: 'var(--font-body)',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action */}
                    {post.authorId === currentUser?.id ? (
                      <button
                        onClick={() => navigate('/app/my-dates')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          background: 'var(--surface-container-high)',
                          color: 'var(--on-surface-variant)',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          fontFamily: 'var(--font-body)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>settings</span>
                        Quan ly keo nay
                      </button>
                    ) : applying === post.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                          value={applyMessage}
                          onChange={e => setApplyMessage(e.target.value)}
                          placeholder="Loi nhan cho nguoi dang (tuy chon)..."
                          style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius)',
                            border: 'none',
                            backgroundColor: 'var(--surface-container-low)',
                            fontSize: '0.875rem',
                            fontFamily: 'var(--font-body)',
                            outline: 'none',
                            color: 'var(--on-surface)',
                          }}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => { setApplying(null); setApplyMessage(''); }}
                            style={{
                              flex: 1,
                              padding: '12px',
                              borderRadius: 'var(--radius-full)',
                              border: 'none',
                              background: 'var(--surface-container-high)',
                              color: 'var(--on-surface-variant)',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                            }}
                          >
                            Huy
                          </button>
                          <button
                            onClick={() => handleApply(post.id)}
                            style={{
                              flex: 1,
                              padding: '12px',
                              borderRadius: 'var(--radius-full)',
                              border: 'none',
                              background: 'var(--primary-gradient)',
                              color: 'var(--on-primary)',
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                            }}
                          >
                            Gui
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setApplying(post.id)}
                          style={{
                            flex: 1,
                            padding: '12px 20px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: 'var(--primary-gradient)',
                            color: 'var(--on-primary)',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            fontFamily: 'var(--font-body)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 16px rgba(174, 47, 52, 0.2)',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                          Ung Tuyen
                        </button>
                        {post.isGroup && (
                          <button
                            onClick={() => navigate(`/app/dates/${post.id}/group`)}
                            style={{
                              padding: '12px 20px',
                              borderRadius: 'var(--radius-full)',
                              border: 'none',
                              background: 'var(--surface-container-high)',
                              color: 'var(--on-surface)',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>groups</span>
                            Tham Gia
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FAB - New Date Request */}
      <button
        onClick={() => setShowCreateModal(true)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '60px',
          height: '60px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--primary-gradient)',
          color: 'var(--on-primary)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(174, 47, 52, 0.3)',
          zIndex: 100,
          transition: 'transform 0.2s ease',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
      </button>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal
          category={activeTab === 'all' ? 'tim_yeu' : activeTab}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
};

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

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 'var(--radius)',
    border: 'none',
    backgroundColor: 'var(--surface-container-low)',
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    color: 'var(--on-surface)',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--on-surface)',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--editorial-shadow)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{
          fontFamily: 'var(--font-headline)',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--on-surface)',
          margin: '0 0 6px',
        }}>
          Dang Keo Moi
        </h2>
        <p style={{
          margin: '0 0 28px',
          color: 'var(--on-surface-variant)',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-body)',
        }}>
          {CATEGORIES[category]?.label || 'Tim Yeu'} - {CATEGORIES[category]?.desc || ''}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle}>Tieu de keo *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="VD: Tim nguoi di xem phim toi nay" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Mo ta</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Mo ta chi tiet hon..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          <div>
            <label style={labelStyle}>Icon (emoji)</label>
            <input value={icon} onChange={e => setIcon(e.target.value)} placeholder="VD: coffee, heart, star" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Thoi gian</label>
              <input value={time} onChange={e => setTime(e.target.value)} placeholder="VD: Toi nay 20:00" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Dia diem</label>
              <input value={place} onChange={e => setPlace(e.target.value)} placeholder="VD: Cafe 123, Q1" style={inputStyle} />
            </div>
          </div>
          {category === 'tra_phi' && (
            <div>
              <label style={labelStyle}>Chi phi (VND) *</label>
              <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="VD: 200000" style={inputStyle} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: 'var(--surface-container-high)',
                color: 'var(--on-surface-variant)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
              }}
            >
              Huy
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: 'var(--primary-gradient)',
                color: 'var(--on-primary)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(174, 47, 52, 0.2)',
              }}
            >
              Dang Keo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CATEGORIES_FOR_MODAL = CATEGORIES;

export default DatePostsPage;
