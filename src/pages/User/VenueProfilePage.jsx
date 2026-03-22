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
    'Nha hang phong cach hien dai ket hop am thuc Au - Viet, khong gian am cung thich hop cho nhung buoi hen ho lang man. Menu duoc thiet ke boi dau bep tu Paris voi nguyen lieu dia phuong tuoi ngon. Khong gian ngoai troi voi tam nhin thanh pho tuyet dep.',
  menu: [
    { id: 1, name: 'Bo Wagyu Sot Truffle', price: '680.000', image: null },
    { id: 2, name: 'Risotto Nam Rung', price: '320.000', image: null },
    { id: 3, name: 'Banh Creme Brulee Matcha', price: '180.000', image: null },
  ],
  reviews: [
    { id: 1, name: 'Linh Chi', rating: 5, text: 'Khong gian rat dep, do an ngon, nhan vien nhiet tinh. Se quay lai!' },
    { id: 2, name: 'Minh Duc', rating: 4, text: 'Mon Wagyu tuyet voi, gia hop ly cho chat luong nhu vay. Nen dat truoc.' },
    { id: 3, name: 'Thao Nhi', rating: 5, text: 'Buoi hen ho hoan hao! Anh sang dep, nhac nhe nhang, mon trang mieng sieu ngon.' },
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
          style={{ fontSize: 16, color: i <= Math.round(rating) ? '#f59e0b' : 'var(--outline-variant)' }}
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
      background: 'var(--surface)',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      paddingBottom: 100,
    },
    hero: {
      position: 'relative',
      height: 350,
      background: 'linear-gradient(135deg, var(--tertiary-container), var(--primary-container))',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 24,
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)',
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
      borderRadius: 'var(--radius-full)',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: 'none',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    venueName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#fff',
      marginBottom: 6,
    },
    ratingRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    ratingText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 700,
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(8px)',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 600,
      marginLeft: 8,
    },
    quickInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '16px 20px',
      borderBottom: '1px solid var(--outline-variant)',
      flexWrap: 'wrap',
    },
    chip: {
      background: 'var(--primary-fixed)',
      color: 'var(--on-primary-container)',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 13,
      fontWeight: 600,
    },
    priceChip: {
      background: 'var(--surface-container-high)',
      color: 'var(--on-surface)',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 13,
      fontWeight: 600,
    },
    locationChip: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--on-surface-variant)',
      fontSize: 13,
    },
    body: {
      padding: '24px 20px',
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 14,
    },
    description: {
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--on-surface-variant)',
    },
    menuGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    menuCard: {
      display: 'flex',
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    },
    menuImage: {
      width: 100,
      height: 100,
      background: 'linear-gradient(135deg, var(--primary-container), var(--tertiary-container))',
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
      fontFamily: 'var(--font-headline)',
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    menuPrice: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--primary)',
    },
    reviewCard: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
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
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--on-primary)',
      fontSize: 16,
      fontWeight: 700,
      flexShrink: 0,
    },
    reviewName: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    reviewText: {
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--on-surface-variant)',
      fontStyle: 'italic',
    },
    locationSection: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      padding: 16,
    },
    addressText: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      fontSize: 14,
      color: 'var(--on-surface)',
      marginBottom: 12,
    },
    mapsBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'transparent',
      color: 'var(--primary)',
      border: '1.5px solid var(--primary)',
      borderRadius: 'var(--radius-full)',
      padding: '10px 20px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
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
      background: 'var(--surface-container-low)',
      borderRadius: 12,
    },
    hoursDay: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    hoursTime: {
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    ctaBar: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px 20px',
      background: 'var(--surface-container-lowest)',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      zIndex: 10,
    },
    ctaBtn: {
      width: '100%',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '16px 24px',
      fontSize: 16,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        <div style={styles.heroContent}>
          <div style={styles.venueName}>{venue.name}</div>
          <div style={styles.ratingRow}>
            <span style={styles.ratingText}>{venue.rating}</span>
            {renderStars(venue.rating)}
            {venue.verified && (
              <span style={styles.verifiedBadge}>
                <span className="material-symbols-outlined filled" style={{ fontSize: 14 }}>verified</span>
                Da xac minh
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
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
          Quan 1, TP.HCM
        </span>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* About */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Gioi thieu</div>
          <p style={styles.description}>{venue.description}</p>
        </div>

        {/* Menu */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Menu noi bat</div>
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
          <div style={styles.sectionTitle}>Danh gia</div>
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
          <div style={styles.sectionTitle}>Vi tri</div>
          <div style={styles.locationSection}>
            <div style={styles.addressText}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--primary)', marginTop: 2 }}>location_on</span>
              {venue.location}
            </div>
            <button style={styles.mapsBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>map</span>
              Mo trong Maps
            </button>
          </div>
        </div>

        {/* Hours */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Gio mo cua</div>
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
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>restaurant</span>
          Dat cho ngay
        </button>
      </div>
    </div>
  );
};

export default VenueProfilePage;
