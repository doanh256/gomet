import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dishes = [
  { id: 1, name: 'Phở Bò Tái Lăn', price: 65000, cal: 480, rating: 4.8, color: '#FF571A' },
  { id: 2, name: 'Bún Chả Hà Nội', price: 55000, cal: 520, rating: 4.6, color: '#FFB59E' },
  { id: 3, name: 'Cơm Tấm Sườn Bì', price: 50000, cal: 610, rating: 4.7, color: '#E6BEB2' },
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
    page: { flex: 1, backgroundColor: '#131313', overflowY: 'auto', padding: '40px 24px 80px', maxWidth: 600, margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: 28 },
    headerIcon: { fontSize: 48, color: '#FFB59E', marginBottom: 8 },
    heading: { fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800, color: '#FDF9F3', marginBottom: 6 },
    subtitle: { fontFamily: 'var(--font-body)', fontSize: 14, color: '#E6BEB2' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#FFB59E', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 20 },
    viewfinder: { width: '100%', height: 350, backgroundColor: '#1C1B1B', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32, position: 'relative', overflow: 'hidden' },
    crosshair: { fontSize: 64, color: '#FDF9F3', opacity: 0.7 },
    viewfinderText: { fontFamily: 'var(--font-body)', fontSize: 14, color: '#FDF9F3', opacity: 0.6 },
    cornerTL: { position: 'absolute', top: 20, left: 20, width: 30, height: 30, borderTop: '3px solid #FF571A', borderLeft: '3px solid #FF571A', borderRadius: '4px 0 0 0' },
    cornerTR: { position: 'absolute', top: 20, right: 20, width: 30, height: 30, borderTop: '3px solid #FF571A', borderRight: '3px solid #FF571A', borderRadius: '0 4px 0 0' },
    cornerBL: { position: 'absolute', bottom: 20, left: 20, width: 30, height: 30, borderBottom: '3px solid #FF571A', borderLeft: '3px solid #FF571A', borderRadius: '0 0 0 4px' },
    cornerBR: { position: 'absolute', bottom: 20, right: 20, width: 30, height: 30, borderBottom: '3px solid #FF571A', borderRight: '3px solid #FF571A', borderRadius: '0 0 4px 0' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 700, color: '#FDF9F3', marginBottom: 16 },
    dishGrid: { display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8, marginBottom: 28 },
    dishCard: { minWidth: 200, backgroundColor: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden', flexShrink: 0 },
    dishImage: (color, isHovered) => ({ width: '100%', height: 180, background: `linear-gradient(135deg, ${color}, ${color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.4s ease', transform: isHovered ? 'rotateY(12deg) scale(1.03)' : 'rotateY(0deg) scale(1)' }),
    dishImageIcon: { fontSize: 56, color: 'rgba(255,255,255,0.5)' },
    dishBody: { padding: 14 },
    dishName: { fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, color: '#FDF9F3', marginBottom: 6 },
    dishMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    dishPrice: { fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: '#FFB59E' },
    dishCal: { display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-body)', fontSize: 12, color: '#E6BEB2' },
    calIcon: { fontSize: 14, color: '#FFD54F' },
    stars: { display: 'flex', gap: 2, marginBottom: 10 },
    starIcon: (filled) => ({ fontSize: 16, color: filled ? '#FFD54F' : '#353535' }),
    btnRow: { display: 'flex', gap: 8 },
    btn3D: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 0', borderRadius: '9999px', border: 'none', backgroundColor: '#2A2A2A', color: '#E6BEB2', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
    btnOrder: { flex: 1, padding: '8px 0', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
    nutritionCard: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 18, marginBottom: 28, cursor: 'pointer' },
    nutritionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    nutritionTitle: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, color: '#FDF9F3' },
    nutritionIcon: { fontSize: 22, color: '#FFD54F' },
    expandIcon: { fontSize: 22, color: '#E6BEB2', transition: 'transform 0.3s' },
    nutritionBody: { marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 },
    barRow: { display: 'flex', flexDirection: 'column', gap: 4 },
    barLabel: { display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 13, color: '#E6BEB2' },
    barTrack: { height: 8, backgroundColor: '#353535', borderRadius: 4, overflow: 'hidden' },
    barFill: (pct) => ({ height: '100%', width: `${pct}%`, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', borderRadius: 4, transition: 'width 0.5s ease' }),
    shareCard: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
    shareIcon: { fontSize: 40, color: '#FFB59E' },
    shareText: { fontFamily: 'var(--font-body)', fontSize: 14, color: '#E6BEB2', textAlign: 'center' },
    shareBtn: { padding: '10px 28px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`material-symbols-outlined${i < full ? ' filled' : ''}`} style={s.starIcon(i < full)}>star</span>
    ));
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>Quay lại</button>
      <div style={s.header}><span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>view_in_ar</span><h1 style={s.heading}>Thực đơn tương tác</h1><p style={s.subtitle}>Trải nghiệm món ăn bằng AR</p></div>
      <div style={s.viewfinder}><div style={s.cornerTL} /><div style={s.cornerTR} /><div style={s.cornerBL} /><div style={s.cornerBR} /><span aria-hidden="true" className="material-symbols-outlined" style={s.crosshair}>center_focus_strong</span><p style={s.viewfinderText}>Hướng camera vào menu</p></div>
      <h2 style={s.sectionTitle}>Món ăn nổi bật</h2>
      <div style={s.dishGrid}>
        {dishes.map((dish) => (
          <div key={dish.id} style={s.dishCard}>
            <div style={s.dishImage(dish.color, hoveredDish === dish.id)} onMouseEnter={() => setHoveredDish(dish.id)} onMouseLeave={() => setHoveredDish(null)}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.dishImageIcon}>restaurant</span>
            </div>
            <div style={s.dishBody}>
              <div style={s.dishName}>{dish.name}</div>
              <div style={s.dishMeta}><span style={s.dishPrice}>{dish.price.toLocaleString()}đ</span><span style={s.dishCal}><span aria-hidden="true" className="material-symbols-outlined" style={s.calIcon}>local_fire_department</span>{dish.cal} kcal</span></div>
              <div style={s.stars}>{renderStars(dish.rating)}</div>
              <div style={s.btnRow}><button style={s.btn3D}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>view_in_ar</span>Xem 3D</button><button style={s.btnOrder}>Đặt món</button></div>
            </div>
          </div>
        ))}
      </div>
      <div style={s.nutritionCard} onClick={() => setNutritionOpen(!nutritionOpen)}>
        <div style={s.nutritionHeader}><div style={s.nutritionTitle}><span aria-hidden="true" className="material-symbols-outlined" style={s.nutritionIcon}>monitoring</span>Thông tin dinh dưỡng</div><span aria-hidden="true" className="material-symbols-outlined" style={{ ...s.expandIcon, transform: nutritionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span></div>
        {nutritionOpen && (<div style={s.nutritionBody}>{Object.values(nutritionData).map((n) => (<div key={n.label} style={s.barRow}><div style={s.barLabel}><span>{n.label}</span><span>{n.value}{n.unit}</span></div><div style={s.barTrack}><div style={s.barFill((n.value / n.max) * 100)} /></div></div>))}</div>)}
      </div>
      <h2 style={{ ...s.sectionTitle, marginBottom: 12 }}>Chia sẻ trải nghiệm</h2>
      <div style={s.shareCard}><span aria-hidden="true" className="material-symbols-outlined" style={s.shareIcon}>photo_camera</span><p style={s.shareText}>Chụp & chia sẻ trên GOMET</p><button style={s.shareBtn}>Chụp ảnh</button></div>
    </div>
  );
};

export default ARMenuPage;
