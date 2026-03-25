import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_VENUE = {
  id: 1,
  name: 'The Rustic Table',
  rating: 4.8,
  verified: true,
  cuisine: 'Au - Viet fusion',
  priceRange: '$$',
  location: '45 Le Loi, Quan 1, TP.HCM',
  description:
    'Nhà hàng phong cách hiện đại kết hợp ẩm thực Âu - Việt, không gian ấm cúng thích hợp cho những buổi hẹn hò lãng mạn. Menu được thiết kế bởi đầu bếp từ Paris với nguyên liệu địa phương tươi ngon. Không gian ngoài trời với tầm nhìn thành phố tuyệt đẹp.',
  menu: [
    { id: 1, name: 'Bo Wagyu Sot Truffle', price: '680.000', image: null },
    { id: 2, name: 'Risotto Nam Rung', price: '320.000', image: null },
    { id: 3, name: 'Banh Creme Brulee Matcha', price: '180.000', image: null },
  ],
  reviews: [
    { id: 1, name: 'Linh Chi', rating: 5, text: 'Không gian rất đẹp, đồ ăn ngon, nhân viên nhiệt tình. Sẽ quay lại!' },
    { id: 2, name: 'Minh Đức', rating: 4, text: 'Món Wagyu tuyệt vời, giá hợp lý cho chất lượng như vậy. Nên đặt trước.' },
    { id: 3, name: 'Thảo Nhi', rating: 5, text: 'Buổi hẹn hò hoàn hảo! Ánh sáng đẹp, nhạc nhẹ nhàng, món tráng miệng siêu ngon.' },
  ],
  hours: [
    { day: 'Thu 2 - Thu 5', time: '11:00 - 22:00' },
    { day: 'Thu 6', time: '11:00 - 23:00' },
    { day: 'Thu 7', time: '10:00 - 23:00' },
    { day: 'Chu Nhat', time: '10:00 - 22:00' },
  ],
};

const VenueProfilePage = () => {
  const navigate = useNavigate();
  const { venueId } = useParams();
  const venue = MOCK_VENUE;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`material-symbols-outlined ${i <= Math.round(rating) ? 'filled' : ''}`}
          style={{ fontSize: 16, color: i <= Math.round(rating) ? '#FFD54F' : '#353535' }}
        >
          star
        </span>
      );
    }
    return stars;
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#131313',
      color: '#FDF9F3',
      paddingBottom: 100,
    },
    hero: {
      position: 'relative',
      height: 350,
      background: 'linear-gradient(135deg, #2A2A2A, #FF571A)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 24,
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(19,19,19,0.85) 0%, transparent 60%)',
      zIndex: 1,
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
    },
    backBtn: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 3,
      width: 40,
      height: 40,
      borderRadius: '9999px',
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: 'none',
      color: '#FDF9F3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    venueName: {
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    ratingRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    ratingText: {
      color: '#FDF9F3',
      fontSize: 16,
      fontWeight: 700,
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: '#FDF9F3',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: 12,
      fontWeight: 600,
      marginLeft: 8,
    },
    quickInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '16px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      flexWrap: 'wrap',
    },
    chip: {
      background: 'rgba(255,181,158,0.15)',
      color: '#FFB59E',
      padding: '6px 14px',
      borderRadius: '9999px',
      fontSize: 13,
      fontWeight: 600,
    },
    priceChip: {
      background: '#2A2A2A',
      color: '#FDF9F3',
      padding: '6px 14px',
      borderRadius: '9999px',
      fontSize: 13,
      fontWeight: 600,
    },
    locationChip: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: '#E6BEB2',
      fontSize: 13,
    },
    body: {
      padding: '24px 20px',
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
    },
    description: {
      fontSize: 15,
      lineHeight: 1.7,
      color: '#E6BEB2',
    },
    menuGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    menuCard: {
      display: 'flex',
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    menuImage: {
      width: 100,
      height: 100,
      background: 'linear-gradient(135deg, #2A2A2A, #353535)',
      flexShrink: 0,
    },
    menuInfo: {
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
    },
    menuName: {
      fontSize: 15,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    menuPrice: {
      fontSize: 15,
      fontWeight: 700,
      color: '#FFB59E',
    },
    reviewCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 16,
      marginBottom: 12,
    },
    reviewHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10,
    },
    reviewAvatar: {
      width: 40,
      height: 40,
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3A0B00',
      fontSize: 16,
      fontWeight: 700,
      flexShrink: 0,
    },
    reviewName: {
      fontSize: 14,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    reviewText: {
      fontSize: 14,
      lineHeight: 1.6,
      color: '#E6BEB2',
      fontStyle: 'italic',
    },
    locationSection: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 16,
    },
    addressText: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      fontSize: 14,
      color: '#FDF9F3',
      marginBottom: 12,
    },
    mapsBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'transparent',
      color: '#FFB59E',
      border: '1.5px solid #FFB59E',
      borderRadius: '9999px',
      padding: '10px 20px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    },
    hoursGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    hoursRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 14px',
      background: '#1C1B1B',
      borderRadius: 12,
    },
    hoursDay: {
      fontSize: 14,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    hoursTime: {
      fontSize: 14,
      color: '#E6BEB2',
    },
    ctaBar: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px 20px',
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: 10,
    },
    ctaBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      padding: '16px 24px',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        <div style={styles.heroContent}>
          <div style={styles.venueName}>{venue.name}</div>
          <div style={styles.ratingRow}>
            <span style={styles.ratingText}>{venue.rating}</span>
            {renderStars(venue.rating)}
            {venue.verified && (
              <span style={styles.verifiedBadge}>
                <span className="material-symbols-outlined filled" style={{ fontSize: 14 }}>verified</span>
                Đã xác minh
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div style={styles.quickInfo}>
        <span style={styles.chip}>{venue.cuisine}</span>
        <span style={styles.priceChip}>{venue.priceRange}</span>
        <span style={styles.locationChip}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
          Quan 1, TP.HCM
        </span>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* About */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Giới thiệu</div>
          <p style={styles.description}>{venue.description}</p>
        </div>

        {/* Menu */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Menu nổi bật</div>
          <div style={styles.menuGrid}>
            {venue.menu.map((item) => (
              <div key={item.id} style={styles.menuCard}>
                <div style={styles.menuImage} />
                <div style={styles.menuInfo}>
                  <div style={styles.menuName}>{item.name}</div>
                  <div style={styles.menuPrice}>{item.price} VND</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Đánh giá</div>
          {venue.reviews.map((r) => (
            <div key={r.id} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <div style={styles.reviewAvatar}>{r.name.charAt(0)}</div>
                <div>
                  <div style={styles.reviewName}>{r.name}</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>{renderStars(r.rating)}</div>
                </div>
              </div>
              <p style={styles.reviewText}>"{r.text}"</p>
            </div>
          ))}
        </div>

        {/* Location */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Vị trí</div>
          <div style={styles.locationSection}>
            <div style={styles.addressText}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E', marginTop: 2 }}>location_on</span>
              {venue.location}
            </div>
            <button style={styles.mapsBtn}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>map</span>
              Mở trong Maps
            </button>
          </div>
        </div>

        {/* Hours */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Giờ mở cửa</div>
          <div style={styles.hoursGrid}>
            {venue.hours.map((h, i) => (
              <div key={i} style={styles.hoursRow}>
                <span style={styles.hoursDay}>{h.day}</span>
                <span style={styles.hoursTime}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div style={styles.ctaBar}>
        <button style={styles.ctaBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>restaurant</span>
          Đặt chỗ ngay
        </button>
      </div>
    </div>
  );
};

export default VenueProfilePage;
