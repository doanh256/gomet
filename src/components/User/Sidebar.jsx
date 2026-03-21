import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, Compass, MessageCircle, Settings, User, Calendar, Wallet, Bell, Heart } from 'lucide-react';
import { useAppContext } from '../../AppContext';

const ExploreCard = ({ title, bgUrl, colorClass }) => (
  <div className="explore-card">
    <img src={bgUrl} alt={title} className="explore-bg" />
    <div className={`explore-overlay ${colorClass}`}></div>
    <span>{title}</span>
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => {
    if (path === '/app') return (location.pathname === '/app' || location.pathname === '/app/') ? 'brand' : '';
    return location.pathname.startsWith(path) ? 'brand' : '';
  };
  const { currentUser, conversations, fetchConversations, matches, fetchMatches } = useAppContext();

  useEffect(() => {
    if (currentUser) {
      fetchConversations();
      fetchMatches();
    }
  }, [currentUser, fetchConversations, fetchMatches]);

  const getAvatarUrl = (user) => {
    if (!user) return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2';
    return user.avatar || user.images?.[0]?.url || user.images?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2';
  };

  return (
    <div className="sidebar" style={{ zIndex: 100 }}>
      {/* Header */}
      <div className="sidebar-header">
        <Link to="/app" className="user-profile" style={{ textDecoration: 'none', minWidth: '0' }}>
          <div className="avatar-wrapper">
            <img src={getAvatarUrl(currentUser)} alt="Avatar" className="avatar-img" />
          </div>
          <span style={{ color: 'white', fontSize: '18px', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Gomet</span>
        </Link>
        <div className="header-actions" style={{ gap: '4px' }}>
          <Link to="/app/home" className={`header-icon ${isActive('/app/home')}`} aria-label="Trang chủ">
            <Home size={20} />
          </Link>
          <Link to="/app" className={`header-icon ${isActive('/app') && location.pathname === '/app' ? 'brand' : ''}`} aria-label="Quẹt Kèo">
            <Zap size={20} />
          </Link>
          <Link to="/app/dates" className={`header-icon ${isActive('/app/dates')}`} aria-label="Tìm Hẹn">
            <Calendar size={20} />
          </Link>
          <Link to="/app/explore" className={`header-icon ${isActive('/app/explore')}`}>
            <Compass size={20} />
          </Link>
          <Link to="/app/chat" className={`header-icon ${isActive('/app/chat')}`} aria-label="Chat" style={{ position: 'relative' }}>
            <MessageCircle size={20} />
            {conversations.length > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                background: 'linear-gradient(260deg, #fd5068, #fec142)',
                color: 'white', fontSize: '9px', fontWeight: 800,
                minWidth: '14px', height: '14px', borderRadius: '7px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px'
              }}>
                {conversations.length > 9 ? '9+' : conversations.length}
              </span>
            )}
          </Link>
          <Link to="/app/matches" className={`header-icon ${isActive('/app/matches')}`} aria-label="Matches">
            <Heart size={20} />
          </Link>
          <Link to="/app/notifications" className={`header-icon ${isActive('/app/notifications')}`} aria-label="Thông báo">
            <Bell size={20} />
          </Link>
          <Link to="/app/profile" className={`header-icon ${isActive('/app/profile')}`}>
            <User size={20} />
          </Link>
          <Link to="/app/wallet" className={`header-icon ${isActive('/app/wallet')}`} aria-label="Ví tiền">
            <Wallet size={20} />
          </Link>
          <Link to="/app/settings" className={`header-icon ${isActive('/app/settings')}`}>
            <Settings size={20} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="sidebar-content">
        {location.pathname === '/app/chat' ? (
          <>
            <h2 className="section-title">Tin nhắn ({conversations.length})</h2>
            <p className="section-subtitle">Các cuộc trò chuyện của bạn</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {conversations.map(conv => (
                <Link to={`/app/chat?cid=${conv.id}`} key={conv.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'white', borderRadius: '12px', textDecoration: 'none', color: '#111418', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'pointer' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={getAvatarUrl(conv.otherUser)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={conv.otherUser?.name} onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg,#fd5068,#ff7854)'; }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.otherUser?.name || 'Unknown'}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#656e7b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {conv.lastMessage?.text || 'Nhấn để mở đoạn chat'}
                    </p>
                  </div>
                </Link>
              ))}
              {conversations.length === 0 && (
                <p style={{ textAlign: 'center', color: '#656e7b', fontSize: '14px', padding: '20px' }}>
                  Chưa có cuộc trò chuyện nào. Match để bắt đầu chat!
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="section-title">Hẹn hò chung mục đích</h2>
            <p className="section-subtitle">Tìm kiếm những người có chung mục đích hẹn hò</p>

            <div className="explore-grid">
              <Link to="/app/dates/tim_yeu" style={{ textDecoration: 'none' }}>
                <ExploreCard
                  title="Tìm Yêu"
                  bgUrl="https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?w=800&auto=format&fit=crop&q=60"
                  colorClass=""
                />
              </Link>
              <Link to="/app/dates/tim_ban" style={{ textDecoration: 'none' }}>
                <ExploreCard
                  title="Tìm Bạn"
                  bgUrl="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60"
                  colorClass=""
                />
              </Link>
              <Link to="/app/dates/tra_phi" style={{ textDecoration: 'none' }}>
                <ExploreCard
                  title="Trả Phí"
                  bgUrl="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60"
                  colorClass="red"
                />
              </Link>
              <Link to="/app/my-dates" style={{ textDecoration: 'none' }}>
                <ExploreCard
                  title="Buổi Hẹn Của Tôi"
                  bgUrl="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=60"
                  colorClass=""
                />
              </Link>
            </div>

            <h2 className="section-title">Chia sẻ sở thích chung</h2>
            <p className="section-subtitle">Tìm kiếm những người có sở thích giống bạn</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
