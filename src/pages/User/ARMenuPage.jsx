import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dishes = [
  { id: 1, name: 'Pho Bo Tai Lan', price: 65000, cal: 480, rating: 4.8, color: '#ff6b6b' },
  { id: 2, name: 'Bun Cha Ha Noi', price: 55000, cal: 520, rating: 4.6, color: '#ae2f34' },
  { id: 3, name: 'Com Tam Suon Bi', price: 50000, cal: 610, rating: 4.7, color: '#894e45' },
];

const nutritionData = {
  calories: { label: 'Calories', value: 480, max: 800, unit: 'kcal' },
  protein: { label: 'Protein', value: 25, max: 60, unit: 'g' },
  carbs: { label: 'Carbs', value: 60, max: 100, unit: 'g' },
  fat: { label: 'Fat', value: 15, max: 50, unit: 'g' },
};

const ARMenuPage = () => {
  const navigate = useNavigate();
  const [hoveredDish, setHoveredDish] = useState(null);
  const [nutritionOpen, setNutritionOpen] = useState(false);

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 28,
    },
    headerIcon: {
      fontSize: 48,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      color: 'var(--primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: 20,
    },
    viewfinder: {
      width: '100%',
      height: 350,
      backgroundColor: 'var(--inverse-surface)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 32,
      position: 'relative',
      overflow: 'hidden',
    },
    crosshair: {
      fontSize: 64,
      color: 'var(--inverse-on-surface)',
      opacity: 0.7,
    },
    viewfinderText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--inverse-on-surface)',
      opacity: 0.6,
    },
    cornerTL: {
      position: 'absolute', top: 20, left: 20,
      width: 30, height: 30,
      borderTop: '3px solid var(--primary-container)',
      borderLeft: '3px solid var(--primary-container)',
      borderRadius: '4px 0 0 0',
    },
    cornerTR: {
      position: 'absolute', top: 20, right: 20,
      width: 30, height: 30,
      borderTop: '3px solid var(--primary-container)',
      borderRight: '3px solid var(--primary-container)',
      borderRadius: '0 4px 0 0',
    },
    cornerBL: {
      position: 'absolute', bottom: 20, left: 20,
      width: 30, height: 30,
      borderBottom: '3px solid var(--primary-container)',
      borderLeft: '3px solid var(--primary-container)',
      borderRadius: '0 0 0 4px',
    },
    cornerBR: {
      position: 'absolute', bottom: 20, right: 20,
      width: 30, height: 30,
      borderBottom: '3px solid var(--primary-container)',
      borderRight: '3px solid var(--primary-container)',
      borderRadius: '0 0 4px 0',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    dishGrid: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      paddingBottom: 8,
      marginBottom: 28,
    },
    dishCard: {
      minWidth: 200,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden',
      flexShrink: 0,
    },
    dishImage: (color, isHovered) => ({
      width: '100%',
      height: 180,
      background: `linear-gradient(135deg, ${color}, ${color}88)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.4s ease',
      transform: isHovered ? 'rotateY(12deg) scale(1.03)' : 'rotateY(0deg) scale(1)',
    }),
    dishImageIcon: {
      fontSize: 56,
      color: 'rgba(255,255,255,0.5)',
    },
    dishBody: {
      padding: 14,
    },
    dishName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    dishMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    dishPrice: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--primary)',
    },
    dishCal: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    calIcon: {
      fontSize: 14,
      color: 'var(--tertiary)',
    },
    stars: {
      display: 'flex',
      gap: 2,
      marginBottom: 10,
    },
    starIcon: (filled) => ({
      fontSize: 16,
      color: filled ? '#f5a623' : 'var(--outline-variant)',
    }),
    btnRow: {
      display: 'flex',
      gap: 8,
    },
    btn3D: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      padding: '8px 0',
      borderRadius: 'var(--radius-full)',
      border: '1.5px solid var(--outline-variant)',
      backgroundColor: 'transparent',
      color: 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    btnOrder: {
      flex: 1,
      padding: '8px 0',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    nutritionCard: {
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      padding: 18,
      marginBottom: 28,
      cursor: 'pointer',
    },
    nutritionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nutritionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    nutritionIcon: {
      fontSize: 22,
      color: 'var(--tertiary)',
    },
    expandIcon: {
      fontSize: 22,
      color: 'var(--on-surface-variant)',
      transition: 'transform 0.3s',
    },
    nutritionBody: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    },
    barRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
    barLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    barTrack: {
      height: 8,
      backgroundColor: 'var(--surface-container-highest)',
      borderRadius: 4,
      overflow: 'hidden',
    },
    barFill: (pct) => ({
      height: '100%',
      width: `${pct}%`,
      background: 'var(--primary-gradient)',
      borderRadius: 4,
      transition: 'width 0.5s ease',
    }),
    shareCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      boxShadow: 'var(--card-shadow)',
    },
    shareIcon: {
      fontSize: 40,
      color: 'var(--primary)',
    },
    shareText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      textAlign: 'center',
    },
    shareBtn: {
      padding: '10px 28px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    },
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`material-symbols-outlined${i < full ? ' filled' : ''}`} style={s.starIcon(i < full)}>star</span>
    ));
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>view_in_ar</span>
        <h1 style={s.heading}>Thuc don tuong tac</h1>
        <p style={s.subtitle}>Trai nghiem mon an bang AR</p>
      </div>

      <div style={s.viewfinder}>
        <div style={s.cornerTL} />
        <div style={s.cornerTR} />
        <div style={s.cornerBL} />
        <div style={s.cornerBR} />
        <span className="material-symbols-outlined" style={s.crosshair}>center_focus_strong</span>
        <p style={s.viewfinderText}>Huong camera vao menu</p>
      </div>

      <h2 style={s.sectionTitle}>Mon an noi bat</h2>
      <div style={s.dishGrid}>
        {dishes.map((dish) => (
          <div key={dish.id} style={s.dishCard}>
            <div
              style={s.dishImage(dish.color, hoveredDish === dish.id)}
              onMouseEnter={() => setHoveredDish(dish.id)}
              onMouseLeave={() => setHoveredDish(null)}
            >
              <span className="material-symbols-outlined" style={s.dishImageIcon}>restaurant</span>
            </div>
            <div style={s.dishBody}>
              <div style={s.dishName}>{dish.name}</div>
              <div style={s.dishMeta}>
                <span style={s.dishPrice}>{dish.price.toLocaleString()}d</span>
                <span style={s.dishCal}>
                  <span className="material-symbols-outlined" style={s.calIcon}>local_fire_department</span>
                  {dish.cal} kcal
                </span>
              </div>
              <div style={s.stars}>{renderStars(dish.rating)}</div>
              <div style={s.btnRow}>
                <button style={s.btn3D}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>view_in_ar</span>
                  Xem 3D
                </button>
                <button style={s.btnOrder}>Dat mon</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={s.nutritionCard}
        onClick={() => setNutritionOpen(!nutritionOpen)}
      >
        <div style={s.nutritionHeader}>
          <div style={s.nutritionTitle}>
            <span className="material-symbols-outlined" style={s.nutritionIcon}>monitoring</span>
            Thong tin dinh duong
          </div>
          <span
            className="material-symbols-outlined"
            style={{ ...s.expandIcon, transform: nutritionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            expand_more
          </span>
        </div>
        {nutritionOpen && (
          <div style={s.nutritionBody}>
            {Object.values(nutritionData).map((n) => (
              <div key={n.label} style={s.barRow}>
                <div style={s.barLabel}>
                  <span>{n.label}</span>
                  <span>{n.value}{n.unit}</span>
                </div>
                <div style={s.barTrack}>
                  <div style={s.barFill((n.value / n.max) * 100)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 style={{ ...s.sectionTitle, marginBottom: 12 }}>Chia se trai nghiem</h2>
      <div style={s.shareCard}>
        <span className="material-symbols-outlined" style={s.shareIcon}>photo_camera</span>
        <p style={s.shareText}>Chup & chia se tren GOMET</p>
        <button style={s.shareBtn}>Chup anh</button>
      </div>
    </div>
  );
};

export default ARMenuPage;
