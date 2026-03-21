import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { useToast } from '../../components/ToastNotification';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { key: 'all', label: 'Tat Ca', icon: 'grid_view' },
  { key: 'pending', label: 'Cho Duyet', icon: 'hourglass_top' },
  { key: 'confirmed', label: 'Da Xac Nhan', icon: 'check_circle' },
  { key: 'past', label: 'Da Qua', icon: 'history' },
];

const STATUS_MAP = {
  open: { bg: '#e8f5e9', color: '#2e7d32', text: 'Dang mo' },
  filled: { bg: '#fff3e0', color: '#e65100', text: 'Da du' },
  completed: { bg: '#e3f2fd', color: '#1565c0', text: 'Hoan thanh' },
  cancelled: { bg: 'var(--error-container)', color: 'var(--error)', text: 'Da huy' },
  pending: { bg: '#fff8e1', color: '#f57f17', text: 'Cho duyet' },
  accepted: { bg: '#e8f5e9', color: '#2e7d32', text: 'Duoc chon' },
  rejected: { bg: 'var(--error-container)', color: 'var(--error)', text: 'Bi tu choi' },
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
      addToast('Da chap nhan! Chat da duoc mo.', 'success');
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
      addToast('Da tu choi', 'info');
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
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
      }}>
        {s.text}
      </span>
    );
  };

  const renderPriceBadge = (post) => {
    if (post.category === 'tra_phi' && post.price) {
      return (
        <span style={{
          background: '#e3f2fd',
          color: '#1565c0',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
        }}>
          {post.price.toLocaleString('vi-VN')}d - Tra Phi
        </span>
      );
    }
    return (
      <span style={{
        background: 'var(--surface-container-high)',
        color: 'var(--on-surface-variant)',
        padding: '4px 14px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
      }}>
        Keo Thuong
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
        backgroundColor: 'var(--surface)',
      }}>
        <div style={{ textAlign: 'center', color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.4, display: 'block', marginBottom: '12px' }}>hourglass_empty</span>
          Dang tai...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      backgroundColor: 'var(--surface)',
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
            fontFamily: 'var(--font-headline)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--on-surface)',
            margin: '0 0 4px',
          }}>
            Buoi Hen{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Cua Toi</span>
          </h1>
          <p style={{
            color: 'var(--on-surface-variant)',
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            margin: '0 0 28px',
          }}>
            Quan ly cac keo da dang va ung tuyen cua ban
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
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-body)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: isActive ? 'var(--primary)' : 'var(--surface-container-high)',
                    color: isActive ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{tab.icon}</span>
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
              backgroundColor: 'var(--surface-container-lowest)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--card-shadow)',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--on-surface-variant)',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}>
                Ti Le Match
              </div>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: 'var(--primary)',
                fontFamily: 'var(--font-headline)',
              }}>
                {matchRate}%
              </div>
            </div>
            <div style={{
              backgroundColor: 'var(--surface-container-lowest)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--card-shadow)',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--on-surface-variant)',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}>
                Tong So Keo
              </div>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: 'var(--on-surface)',
                fontFamily: 'var(--font-headline)',
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
              backgroundColor: 'var(--surface-container-low)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--outline)', display: 'block', marginBottom: '12px' }}>event_busy</span>
              <h3 style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 700,
                color: 'var(--on-surface)',
                margin: '0 0 8px',
              }}>Chua co keo nao</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
                Ban chua dang hoac ung tuyen keo nao trong muc nay
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredPosts.map(post => (
                <div key={post.id} style={{
                  backgroundColor: 'var(--surface-container-lowest)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  boxShadow: 'var(--card-shadow)',
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
                        fontFamily: 'var(--font-headline)',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--on-surface)',
                        margin: '0 0 6px',
                      }}>
                        {post.title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '0.8125rem',
                        color: 'var(--on-surface-variant)',
                        fontFamily: 'var(--font-body)',
                        flexWrap: 'wrap',
                      }}>
                        {post.time && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                            {post.time}
                          </span>
                        )}
                        {post.place && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
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
                        color: 'var(--on-surface-variant)',
                        fontFamily: 'var(--font-body)',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}>
                        Nguoi ung tuyen ({post.applications.length})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {post.applications.map(app => (
                          <div key={app.id} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px',
                            padding: '16px',
                            backgroundColor: 'var(--surface-container-low)',
                            borderRadius: 'var(--radius)',
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
                                  fontFamily: 'var(--font-headline)',
                                  fontWeight: 700,
                                  fontSize: '1rem',
                                  color: 'var(--on-surface)',
                                  margin: 0,
                                }}>
                                  {app.applicant?.name}{app.applicant?.age ? `, ${app.applicant.age}` : ''}
                                </h4>
                                {renderStatusBadge(app.status)}
                              </div>

                              <div style={{
                                fontSize: '0.8125rem',
                                color: 'var(--on-surface-variant)',
                                fontFamily: 'var(--font-body)',
                                marginBottom: '6px',
                              }}>
                                Ung tuyen: {post.title}
                              </div>

                              {app.message && (
                                <p style={{
                                  fontStyle: 'italic',
                                  color: 'var(--on-surface-variant)',
                                  fontSize: '0.875rem',
                                  fontFamily: 'var(--font-body)',
                                  margin: '0 0 10px',
                                  lineHeight: 1.5,
                                }}>
                                  "{app.message}"
                                </p>
                              )}

                              {/* Interest tags */}
                              {app.applicant?.interests && app.applicant.interests.length > 0 && (
                                <div style={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: '6px',
                                  marginBottom: '12px',
                                }}>
                                  {app.applicant.interests.slice(0, 4).map((tag, i) => (
                                    <span key={i} style={{
                                      backgroundColor: 'var(--surface-container-high)',
                                      color: 'var(--on-surface-variant)',
                                      padding: '3px 10px',
                                      borderRadius: 'var(--radius-full)',
                                      fontSize: '0.6875rem',
                                      fontWeight: 500,
                                      fontFamily: 'var(--font-body)',
                                    }}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Action buttons */}
                              {app.status === 'pending' ? (
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  <button
                                    onClick={() => handleAccept(app.id)}
                                    style={{
                                      padding: '8px 20px',
                                      borderRadius: 'var(--radius-full)',
                                      border: 'none',
                                      background: 'var(--primary-gradient)',
                                      color: 'var(--on-primary)',
                                      fontWeight: 700,
                                      fontSize: '0.8125rem',
                                      fontFamily: 'var(--font-body)',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                  >
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat</span>
                                    Chap Nhan & Chat
                                  </button>
                                  <button
                                    onClick={() => navigate(`/app/profile/${app.applicant?.id}`)}
                                    style={{
                                      padding: '8px 20px',
                                      borderRadius: 'var(--radius-full)',
                                      border: 'none',
                                      background: 'var(--surface-container-high)',
                                      color: 'var(--on-surface)',
                                      fontWeight: 600,
                                      fontSize: '0.8125rem',
                                      fontFamily: 'var(--font-body)',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                  >
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>person</span>
                                    Xem Trang Ca
                                  </button>
                                  <button
                                    onClick={() => handleReject(app.id)}
                                    style={{
                                      padding: '8px 20px',
                                      borderRadius: 'var(--radius-full)',
                                      border: 'none',
                                      background: 'transparent',
                                      color: 'var(--error)',
                                      fontWeight: 600,
                                      fontSize: '0.8125rem',
                                      fontFamily: 'var(--font-body)',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                  >
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                                    Tu Choi
                                  </button>
                                </div>
                              ) : app.status === 'accepted' ? (
                                <button
                                  onClick={() => navigate('/app/chat')}
                                  style={{
                                    padding: '8px 20px',
                                    borderRadius: 'var(--radius-full)',
                                    border: 'none',
                                    background: 'var(--primary-gradient)',
                                    color: 'var(--on-primary)',
                                    fontWeight: 700,
                                    fontSize: '0.8125rem',
                                    fontFamily: 'var(--font-body)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                  }}
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat</span>
                                  Mo Chat
                                </button>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p style={{
                      color: 'var(--on-surface-variant)',
                      fontSize: '0.875rem',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}>
                      Chua co ai ung tuyen
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
                fontFamily: 'var(--font-headline)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--on-surface)',
                margin: '0 0 16px',
              }}>
                Don Ung Tuyen Cua Toi
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myApplications.map(app => (
                  <div key={app.id} style={{
                    backgroundColor: 'var(--surface-container-lowest)',
                    borderRadius: 'var(--radius)',
                    padding: '16px 20px',
                    boxShadow: 'var(--card-shadow)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-headline)',
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: 'var(--on-surface)',
                        margin: '0 0 4px',
                      }}>
                        {app.post?.title}
                      </h4>
                      <div style={{
                        fontSize: '0.8125rem',
                        color: 'var(--on-surface-variant)',
                        fontFamily: 'var(--font-body)',
                      }}>
                        Nguoi dang: {app.post?.author?.name}
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
            background: 'var(--primary-gradient)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            color: 'var(--on-primary)',
            boxShadow: '0 8px 32px rgba(174, 47, 52, 0.2)',
          }}>
            <div style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-body)',
              marginBottom: '16px',
              opacity: 0.85,
            }}>
              Buoi Hen Ke Tiep
            </div>
            {nextDate ? (
              <>
                <h3 style={{
                  fontFamily: 'var(--font-headline)',
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
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
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
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                    {nextDate.place}
                  </div>
                )}
              </>
            ) : (
              <div style={{
                fontSize: '0.9375rem',
                opacity: 0.85,
                fontFamily: 'var(--font-body)',
              }}>
                Chua co buoi hen nao sap toi.
                <br />Dang keo de bat dau!
              </div>
            )}
          </div>

          {/* Past Dates Preview */}
          {myPosts.filter(p => p.status === 'completed').length > 0 && (
            <div style={{
              backgroundColor: 'var(--surface-container-lowest)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--card-shadow)',
            }}>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-body)',
                color: 'var(--on-surface-variant)',
                marginBottom: '16px',
              }}>
                Buoi Hen Da Qua
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
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--surface-container-high)',
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
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--outline)' }}>person</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: 'var(--on-surface)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {post.title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--on-surface-variant)',
                      }}>
                        {post.place || 'Hoan thanh'}
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
