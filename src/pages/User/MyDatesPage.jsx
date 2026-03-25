import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { useToast } from '../../components/ToastNotification';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { key: 'all', label: 'Tất Cả', icon: 'grid_view' },
  { key: 'pending', label: 'Chờ Duyệt', icon: 'hourglass_top' },
  { key: 'confirmed', label: 'Đã Xác Nhận', icon: 'check_circle' },
  { key: 'past', label: 'Đã Qua', icon: 'history' },
];

const STATUS_MAP = {
  open: { bg: 'rgba(255,181,158,0.1)', color: '#FFB59E', text: 'Đang mở' },
  filled: { bg: 'rgba(255,213,79,0.15)', color: '#FFD54F', text: 'Đã đủ' },
  completed: { bg: 'rgba(17,117,0,0.15)', color: '#117500', text: 'Hoàn thành' },
  cancelled: { bg: 'rgba(255,87,26,0.15)', color: '#FF571A', text: 'Đã huỷ' },
  pending: { bg: 'rgba(255,213,79,0.15)', color: '#FFD54F', text: 'Chờ duyệt' },
  accepted: { bg: 'rgba(17,117,0,0.15)', color: '#117500', text: 'Được chọn' },
  rejected: { bg: 'rgba(255,87,26,0.15)', color: '#FF571A', text: 'Bị từ chối' },
};

const MyDatesPage = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsData, appsData] = await Promise.all([
        api.get('/date-posts/my-posts'),
        api.get('/date-applications/my-applications'),
      ]);
      if (postsData?.posts) setMyPosts(postsData.posts);
      if (appsData?.applications) setMyApplications(appsData.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (applicationId) => {
    try {
      const result = await api.put(`/date-applications/${applicationId}/accept`);
      addToast('Đã chấp nhận! Chat đã được mở.', 'success');
      if (result?.conversationId) {
        navigate(`/app/chat?cid=${result.conversationId}`);
      }
      loadData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await api.put(`/date-applications/${applicationId}/reject`);
      addToast('Đã từ chối', 'info');
      loadData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const renderStatusBadge = (status) => {
    const s = STATUS_MAP[status] || STATUS_MAP.open;
    return (
      <span style={{
        background: s.bg,
        color: s.color,
        padding: '4px 14px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'Inter, var(--font-body)',
      }}>
        {s.text}
      </span>
    );
  };

  const renderPriceBadge = (post) => {
    if (post.category === 'tra_phi' && post.price) {
      return (
        <span style={{
          background: 'rgba(255,213,79,0.15)',
          color: '#FFD54F',
          padding: '4px 14px',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          fontFamily: 'Inter, var(--font-body)',
        }}>
          {post.price.toLocaleString('vi-VN')}đ - Trả Phí
        </span>
      );
    }
    return (
      <span style={{
        background: '#353535',
        color: '#E6BEB2',
        padding: '4px 14px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'Inter, var(--font-body)',
      }}>
        Kèo Thường
      </span>
    );
  };

  // Filter posts based on active tab
  const getFilteredPosts = () => {
    if (activeTab === 'all') return myPosts;
    if (activeTab === 'pending') return myPosts.filter(p => p.status === 'open' && p.applications?.some(a => a.status === 'pending'));
    if (activeTab === 'confirmed') return myPosts.filter(p => p.status === 'filled' || p.applications?.some(a => a.status === 'accepted'));
    if (activeTab === 'past') return myPosts.filter(p => p.status === 'completed' || p.status === 'cancelled');
    return myPosts;
  };

  // Find next upcoming date
  const nextDate = myPosts.find(p => p.status === 'filled' || p.applications?.some(a => a.status === 'accepted'));

  // Stats
  const totalDates = myPosts.length;
  const acceptedApps = myApplications.filter(a => a.status === 'accepted').length;
  const totalApps = myApplications.length;
  const matchRate = totalApps > 0 ? Math.round((acceptedApps / totalApps) * 100) : 0;

  const filteredPosts = getFilteredPosts();

  if (loading) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#131313',
      }}>
        <div style={{ textAlign: 'center', color: '#E6BEB2' }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.4, display: 'block', marginBottom: '12px' }}>hourglass_empty</span>
          Đang tải...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      backgroundColor: '#131313',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px',
        display: 'flex',
        gap: '32px',
      }}>
        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <h1 style={{
            fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#FDF9F3',
            margin: '0 0 4px',
          }}>
            Buổi Hẹn{' '}
            <span style={{ fontStyle: 'italic', color: '#FFB59E' }}>Của Tôi</span>
          </h1>
          <p style={{
            color: '#E6BEB2',
            fontSize: '1rem',
            fontFamily: 'Inter, var(--font-body)',
            margin: '0 0 28px',
          }}>
            Quản lý các kèo đã đăng và ứng tuyển của bạn
          </p>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    fontFamily: 'Inter, var(--font-body)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: isActive ? '#FF571A' : '#353535',
                    color: isActive ? '#3A0B00' : '#E6BEB2',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Overview Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '28px',
          }}>
            <div style={{
              backgroundColor: '#1C1B1B',
              borderRadius: '1.5rem',
              padding: '24px',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#E6BEB2',
                fontFamily: 'Inter, var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}>
                Tỉ Lệ Match
              </div>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: '#FFB59E',
                fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
              }}>
                {matchRate}%
              </div>
            </div>
            <div style={{
              backgroundColor: '#1C1B1B',
              borderRadius: '1.5rem',
              padding: '24px',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#E6BEB2',
                fontFamily: 'Inter, var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}>
                Tổng Số Kèo
              </div>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: '#FDF9F3',
                fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
              }}>
                {totalDates}
              </div>
            </div>
          </div>

          {/* Posts / Applications */}
          {filteredPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#1C1B1B',
              borderRadius: '1.5rem',
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '56px', color: '#353535', display: 'block', marginBottom: '12px' }}>event_busy</span>
              <h3 style={{
                fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
                fontWeight: 700,
                color: '#FDF9F3',
                margin: '0 0 8px',
              }}>Chưa có kèo nào</h3>
              <p style={{ color: '#E6BEB2', fontFamily: 'Inter, var(--font-body)' }}>
                Bạn chưa đăng hoặc ứng tuyển kèo nào trong mục này
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredPosts.map(post => (
                <div key={post.id} style={{
                  backgroundColor: '#1C1B1B',
                  borderRadius: '1.5rem',
                  padding: '24px',
                }}>
                  {/* Post header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    <div>
                      <h3 style={{
                        fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: '#FDF9F3',
                        margin: '0 0 6px',
                      }}>
                        {post.title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '0.8125rem',
                        color: '#E6BEB2',
                        fontFamily: 'Inter, var(--font-body)',
                        flexWrap: 'wrap',
                      }}>
                        {post.time && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                            {post.time}
                          </span>
                        )}
                        {post.place && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                            {post.place}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {renderPriceBadge(post)}
                      {renderStatusBadge(post.status)}
                    </div>
                  </div>

                  {/* Applications */}
                  {post.applications && post.applications.length > 0 ? (
                    <div>
                      <div style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#E6BEB2',
                        fontFamily: 'Inter, var(--font-body)',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}>
                        Người ứng tuyển ({post.applications.length})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {post.applications.map(app => (
                          <div key={app.id} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px',
                            padding: '16px',
                            backgroundColor: '#20201F',
                            borderRadius: '1.5rem',
                          }}>
                            {/* Applicant photo */}
                            <img
                              src={app.applicant?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
                              alt={app.applicant?.name}
                              style={{
                                width: '96px',
                                height: '96px',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                flexShrink: 0,
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '4px',
                              }}>
                                <h4 style={{
                                  fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
                                  fontWeight: 700,
                                  fontSize: '1rem',
                                  color: '#FDF9F3',
                                  margin: 0,
                                }}>
                                  {app.applicant?.name}{app.applicant?.age ? `, ${app.applicant.age}` : ''}
                                </h4>
                                {renderStatusBadge(app.status)}
                              </div>

                              <div style={{
                                fontSize: '0.8125rem',
                                color: '#E6BEB2',
                                fontFamily: 'Inter, var(--font-body)',
                                marginBottom: '6px',
                              }}>
                                Ứng tuyển: {post.title}
                              </div>

                              {app.message && (
                                <p style={{
                                  fontStyle: 'italic',
                                  color: '#E6BEB2',
                                  fontSize: '0.875rem',
                                  fontFamily: 'Inter, var(--font-body)',
                                  margin: '0 0 10px',
                                  lineHeight: 1.5,
                                }}>
                                  "{app.message}"
                                </p>
                              )}

                              {/* Interest tags */}
                              {(() => {
                                const tags = Array.isArray(app.applicant?.interests) ? app.applicant.interests : (typeof app.applicant?.interests === 'string' ? (() => { try { return JSON.parse(app.applicant.interests); } catch { return []; } })() : []);
                                return tags.length > 0 ? (
                                <div style={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: '6px',
                                  marginBottom: '12px',
                                }}>
                                  {tags.slice(0, 4).map((tag, i) => (
                                    <span key={i} style={{
                                      backgroundColor: '#353535',
                                      color: '#E6BEB2',
                                      padding: '3px 10px',
                                      borderRadius: '9999px',
                                      fontSize: '0.6875rem',
                                      fontWeight: 500,
                                      fontFamily: 'Inter, var(--font-body)',
                                    }}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                ) : null;
                              })()}

                              {/* Action buttons */}
                              {app.status === 'pending' ? (
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  <button
                                    onClick={() => handleAccept(app.id)}
                                    style={{
                                      padding: '8px 20px',
                                      borderRadius: '9999px',
                                      border: 'none',
                                      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                                      color: '#3A0B00',
                                      fontWeight: 700,
                                      fontSize: '0.8125rem',
                                      fontFamily: 'Inter, var(--font-body)',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                  >
                                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat</span>
                                    Chấp Nhận & Chat
                                  </button>
                                  <button
                                    onClick={() => navigate(`/app/profile/${app.applicant?.id}`)}
                                    style={{
                                      padding: '8px 20px',
                                      borderRadius: '9999px',
                                      border: 'none',
                                      background: '#353535',
                                      color: '#FDF9F3',
                                      fontWeight: 600,
                                      fontSize: '0.8125rem',
                                      fontFamily: 'Inter, var(--font-body)',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                  >
                                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>person</span>
                                    Xem Trang Cá
                                  </button>
                                  <button
                                    onClick={() => handleReject(app.id)}
                                    style={{
                                      padding: '8px 20px',
                                      borderRadius: '9999px',
                                      border: 'none',
                                      background: '#353535',
                                      color: '#FF571A',
                                      fontWeight: 600,
                                      fontSize: '0.8125rem',
                                      fontFamily: 'Inter, var(--font-body)',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                  >
                                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                                    Từ Chối
                                  </button>
                                </div>
                              ) : app.status === 'accepted' ? (
                                <button
                                  onClick={() => navigate('/app/chat')}
                                  style={{
                                    padding: '8px 20px',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                                    color: '#3A0B00',
                                    fontWeight: 700,
                                    fontSize: '0.8125rem',
                                    fontFamily: 'Inter, var(--font-body)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                  }}
                                >
                                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat</span>
                                  Mở Chat
                                </button>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p style={{
                      color: '#E6BEB2',
                      fontSize: '0.875rem',
                      margin: 0,
                      fontFamily: 'Inter, var(--font-body)',
                    }}>
                      Chưa có ai ứng tuyển
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* My Applications Section */}
          {myApplications.length > 0 && activeTab === 'all' && (
            <div style={{ marginTop: '32px' }}>
              <h2 style={{
                fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#FDF9F3',
                margin: '0 0 16px',
              }}>
                Đơn Ứng Tuyển Của Tôi
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myApplications.map(app => (
                  <div key={app.id} style={{
                    backgroundColor: '#1C1B1B',
                    borderRadius: '1.5rem',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <h4 style={{
                        fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: '#FDF9F3',
                        margin: '0 0 4px',
                      }}>
                        {app.post?.title}
                      </h4>
                      <div style={{
                        fontSize: '0.8125rem',
                        color: '#E6BEB2',
                        fontFamily: 'Inter, var(--font-body)',
                      }}>
                        Người đăng: {app.post?.author?.name}
                        {app.post?.time ? ` | ${app.post.time}` : ''}
                        {app.post?.place ? ` | ${app.post.place}` : ''}
                      </div>
                    </div>
                    {renderStatusBadge(app.status)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Desktop */}
        <div style={{
          width: '320px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* Next Date Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
            borderRadius: '1.5rem',
            padding: '28px',
            color: '#3A0B00',
            boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'Inter, var(--font-body)',
              marginBottom: '16px',
              opacity: 0.85,
            }}>
              BUỔI HẸN KẾ TIẾP
            </div>
            {nextDate ? (
              <>
                <h3 style={{
                  fontFamily: 'Plus Jakarta Sans, var(--font-headline)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 0 12px',
                }}>
                  {nextDate.title}
                </h3>
                {nextDate.time && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.875rem',
                    marginBottom: '8px',
                    opacity: 0.9,
                  }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                    {nextDate.time}
                  </div>
                )}
                {nextDate.place && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.875rem',
                    opacity: 0.9,
                  }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                    {nextDate.place}
                  </div>
                )}
              </>
            ) : (
              <div style={{
                fontSize: '0.9375rem',
                opacity: 0.85,
                fontFamily: 'Inter, var(--font-body)',
              }}>
                Chưa có buổi hẹn nào sắp tới.
                <br />Đăng kèo để bắt đầu!
              </div>
            )}
          </div>

          {/* Past Dates Preview */}
          {myPosts.filter(p => p.status === 'completed').length > 0 && (
            <div style={{
              backgroundColor: '#1C1B1B',
              borderRadius: '1.5rem',
              padding: '24px',
            }}>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, var(--font-body)',
                color: '#E6BEB2',
                marginBottom: '16px',
              }}>
                BUỔI HẸN ĐÃ QUA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myPosts.filter(p => p.status === 'completed').slice(0, 4).map(post => (
                  <div key={post.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '9999px',
                      backgroundColor: '#2A2A2A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}>
                      {post.applications?.[0]?.applicant?.avatar ? (
                        <img
                          src={post.applications[0].applicant.avatar}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#353535' }}>person</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'Inter, var(--font-body)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#FDF9F3',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {post.title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#E6BEB2',
                      }}>
                        {post.place || 'Hoàn thành'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDatesPage;
