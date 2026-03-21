import React, { useState, useEffect } from 'react';
import { Check, X, Clock, Calendar, ChevronRight } from 'lucide-react';
import { api } from '../../api/client';
import { useToast } from '../../components/ToastNotification';
import { useNavigate } from 'react-router-dom';

const MyDatesPage = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
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

  const statusBadge = (status) => {
    const styles = {
      open: { bg: '#e8f5e9', color: '#2e7d32', text: 'Đang mở' },
      filled: { bg: '#fff3e0', color: '#e65100', text: 'Đã đủ' },
      completed: { bg: '#e3f2fd', color: '#1565c0', text: 'Hoàn thành' },
      cancelled: { bg: '#fce4ec', color: '#c62828', text: 'Đã hủy' },
      pending: { bg: '#fff8e1', color: '#f57f17', text: 'Chờ duyệt' },
      accepted: { bg: '#e8f5e9', color: '#2e7d32', text: 'Được chọn' },
      rejected: { bg: '#fce4ec', color: '#c62828', text: 'Bị từ chối' },
    };
    const s = styles[status] || styles.open;
    return (
      <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
        {s.text}
      </span>
    );
  };

  if (loading) {
    return <div className="main-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Đang tải...</p></div>;
  }

  return (
    <div className="main-area" style={{ padding: '24px', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111418', margin: '0 0 8px' }}>Buổi Hẹn Của Tôi</h1>
      <p style={{ color: '#505965', fontSize: '14px', margin: '0 0 24px' }}>Quản lý các kèo đã đăng và ứng tuyển</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => setActiveTab('posts')} style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', background: activeTab === 'posts' ? '#fd5068' : '#f0f2f5', color: activeTab === 'posts' ? 'white' : '#505965' }}>
          <Calendar size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Kèo Tôi Đăng ({myPosts.length})
        </button>
        <button onClick={() => setActiveTab('applications')} style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', background: activeTab === 'applications' ? '#4ecdc4' : '#f0f2f5', color: activeTab === 'applications' ? 'white' : '#505965' }}>
          <ChevronRight size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Tôi Ứng Tuyển ({myApplications.length})
        </button>
      </div>

      {activeTab === 'posts' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {myPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#505965' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <p>Bạn chưa đăng kèo nào</p>
            </div>
          ) : myPosts.map(post => (
            <div key={post.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e1e4e8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{post.icon} {post.title}</h3>
                {statusBadge(post.status)}
              </div>
              <div style={{ fontSize: '13px', color: '#656e7b', marginBottom: '16px' }}>
                {post.time && <span><Clock size={12} /> {post.time} </span>}
                {post.place && <span> | {post.place}</span>}
                {post.price && <span> | {post.price.toLocaleString('vi-VN')}d</span>}
              </div>

              {/* Applications */}
              {post.applications && post.applications.length > 0 ? (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 12px', color: '#111418' }}>Người ứng tuyển ({post.applications.length})</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {post.applications.map(app => (
                      <div key={app.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '12px' }}>
                        <img src={app.applicant?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} alt={app.applicant?.name} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{app.applicant?.name}, {app.applicant?.age}</div>
                          {app.message && <div style={{ fontSize: '13px', color: '#656e7b' }}>"{app.message}"</div>}
                        </div>
                        {app.status === 'pending' ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleAccept(app.id)} style={{ background: '#4ecdc4', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={18} /></button>
                            <button onClick={() => handleReject(app.id)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} /></button>
                          </div>
                        ) : statusBadge(app.status)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p style={{ color: '#656e7b', fontSize: '13px', margin: 0 }}>Chưa có ai ứng tuyển</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {myApplications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#505965' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p>Bạn chưa ứng tuyển kèo nào</p>
            </div>
          ) : myApplications.map(app => (
            <div key={app.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e1e4e8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{app.post?.icon} {app.post?.title}</h3>
                {statusBadge(app.status)}
              </div>
              <div style={{ fontSize: '13px', color: '#656e7b' }}>
                Người đăng: {app.post?.author?.name}
                {app.post?.time && <span> | {app.post.time}</span>}
                {app.post?.place && <span> | {app.post.place}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDatesPage;
