import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const profiles = [
  { id: 1, name: 'Linh', age: 24, location: 'Quận 1, HCM', interests: ['Cà phê', 'Du lịch'] },
  { id: 2, name: 'Minh', age: 27, location: 'Quận 3, HCM', interests: ['Âm nhạc', 'Nấu ăn'] },
  { id: 3, name: 'Thảo', age: 23, location: 'Thủ Đức, HCM', interests: ['Yoga', 'Đọc sách'] },
  { id: 4, name: 'Huy', age: 26, location: 'Quận 7, HCM', interests: ['Thể thao', 'Phim'] },
  { id: 5, name: 'Ngọc', age: 25, location: 'Bình Thạnh, HCM', interests: ['Nhiếp ảnh', 'Ẩm thực'] },
  { id: 6, name: 'Đức', age: 28, location: 'Quận 2, HCM', interests: ['Gym', 'Công nghệ'] },
];

const filters = ['Gần bạn', 'Mới tham gia', 'Hoạt động'];

const SpotlightPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 24,
    },
    headerIcon: {
      fontSize: 48,
      color: '#FFB59E',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    featuredCard: {
      position: 'relative',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      marginBottom: 24,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    featuredImage: {
      width: '100%',
      height: 400,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'flex-end',
    },
    featuredOverlay: {
      width: '100%',
      padding: '80px 20px 20px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
    },
    featuredBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 9999,
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 600,
      color: '#FDF9F3',
      marginBottom: 8,
    },
    featuredName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: '#FDF9F3',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4,
    },
    verifiedIcon: {
      fontSize: 20,
      color: '#FFB59E',
    },
    featuredBio: {
      fontSize: 14,
      color: 'rgba(253,249,243,0.85)',
      marginBottom: 12,
    },
    viewProfileBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: 9999,
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
    },
    filterBar: {
      display: 'flex',
      gap: 8,
      marginBottom: 20,
      overflowX: 'auto',
    },
    filterChip: (active) => ({
      padding: '8px 18px',
      borderRadius: 9999,
      border: 'none',
      background: active ? '#FF571A' : '#2A2A2A',
      color: active ? '#3A0B00' : '#E6BEB2',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    }),
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 14,
      marginBottom: 24,
    },
    card: {
      borderRadius: '1.5rem',
      overflow: 'hidden',
      backgroundColor: '#1C1B1B',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    cardImage: {
      width: '100%',
      aspectRatio: '3/4',
      background: '#2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    cardImageIcon: {
      fontSize: 40,
      color: '#353535',
    },
    likeBtn: (isLiked) => ({
      position: 'absolute',
      top: 8,
      right: 8,
      width: 34,
      height: 34,
      borderRadius: '50%',
      border: 'none',
      background: isLiked ? '#FF571A' : 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: isLiked ? '#3A0B00' : '#FFB59E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }),
    cardBody: {
      padding: '10px 12px 12px',
    },
    cardName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 2,
    },
    cardLocation: {
      fontSize: 12,
      color: '#E6BEB2',
      marginBottom: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 3,
    },
    locationIcon: {
      fontSize: 14,
      color: '#E6BEB2',
    },
    chipsRow: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap',
    },
    chip: {
      fontSize: 11,
      padding: '3px 8px',
      borderRadius: 9999,
      backgroundColor: 'rgba(255, 87, 26, 0.15)',
      color: '#FFB59E',
      fontWeight: 500,
    },
    premiumCard: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '1.5rem',
      padding: '24px 20px',
      textAlign: 'center',
      color: '#3A0B00',
    },
    premiumIcon: {
      fontSize: 40,
      marginBottom: 8,
    },
    premiumTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 6,
    },
    premiumDesc: {
      fontSize: 13,
      opacity: 0.9,
      marginBottom: 14,
    },
    premiumBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: '#3A0B00',
      color: '#FFB59E',
      border: 'none',
      borderRadius: 9999,
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>person_search</span>
        <h1 style={s.heading}>Khám phá gương mặt</h1>
        <p style={s.subtitle}>Những người nổi bật hôm nay</p>
      </div>

      {/* Spotlight của ngày */}
      <h2 style={s.sectionTitle}>Spotlight của ngày</h2>
      <div style={s.featuredCard}>
        <div style={s.featuredImage}>
          <div style={s.featuredOverlay}>
            <div style={s.featuredBadge}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>star</span>
              98% tương thích
            </div>
            <div style={s.featuredName}>
              Thanh Huyền, 25
              <span aria-hidden="true" className="material-symbols-outlined" style={s.verifiedIcon}>verified</span>
            </div>
            <p style={s.featuredBio}>Yêu thích cà phê sáng và những chuyến đi bất ngờ. Tìm một người đồng hành chân thành.</p>
            <button style={s.viewProfileBtn} onClick={() => navigate('/profile')}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>person</span>
              Xem hồ sơ
            </button>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={s.filterBar}>
        {filters.map((f, i) => (
          <button key={i} style={s.filterChip(i === activeFilter)} onClick={() => setActiveFilter(i)}>
            {f}
          </button>
        ))}
      </div>

      {/* Đang được chú ý grid */}
      <h2 style={s.sectionTitle}>Đang được chú ý</h2>
      <div style={s.grid}>
        {profiles.map(p => (
          <div key={p.id} style={s.card}>
            <div style={s.cardImage}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.cardImageIcon}>person</span>
              <button style={s.likeBtn(!!liked[p.id])} onClick={() => toggleLike(p.id)}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {liked[p.id] ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>
            <div style={s.cardBody}>
              <div style={s.cardName}>{p.name}, {p.age}</div>
              <div style={s.cardLocation}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.locationIcon}>location_on</span>
                {p.location}
              </div>
              <div style={s.chipsRow}>
                {p.interests.map((t, i) => (
                  <span key={i} style={s.chip}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium upsell */}
      <div style={s.premiumCard}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.premiumIcon}>diamond</span>
        <div style={s.premiumTitle}>Nâng cấp để xem thêm</div>
        <p style={s.premiumDesc}>Mở khóa tất cả gương mặt nổi bật và tính năng độc quyền với GOMET Premium</p>
        <button style={s.premiumBtn} onClick={() => navigate('/premium')}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>workspace_premium</span>
          Nâng cấp ngay
        </button>
      </div>
    </div>
  );
};

export default SpotlightPage;
