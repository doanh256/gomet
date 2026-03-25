import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const restaurants = [
  { id: 1, name: 'Phở Thìn', address: '13 Lò Đúc, Hà Nội', rating: 4.8, price: '50.000đ' },
  { id: 2, name: 'Phở Gia Truyền', address: '49 Bát Đàn, Hà Nội', rating: 4.6, price: '45.000đ' },
  { id: 3, name: 'Phở 10 Lý Quốc Sư', address: '10 Lý Quốc Sư, Hà Nội', rating: 4.5, price: '55.000đ' },
];

const reviews = [
  { id: 1, name: 'Thành Tùng', rating: 5, text: 'Nước dùng đậm đà, bánh phở mềm. Tuyệt vời!', date: '20/03' },
  { id: 2, name: 'Ngọc Anh', rating: 4, text: 'Thịt bò tái chín rất ngon, phần lượng vừa đủ.', date: '18/03' },
  { id: 3, name: 'Minh Đức', rating: 5, text: 'Phở ngon nhất tôi từng ăn, sẽ quay lại!', date: '15/03' },
];

const nutritionInfo = [
  { label: 'Calo', value: '350 kcal' },
  { label: 'Protein', value: '25g' },
  { label: 'Carbs', value: '42g' },
  { label: 'Chất béo', value: '8g' },
  { label: 'Chất xơ', value: '2g' },
];

const relatedDishes = [
  { id: 1, name: 'Bún bò Huế', region: 'Trung Bộ', color: '#2196F3' },
  { id: 2, name: 'Hủ tiếu', region: 'Nam Bộ', color: '#00BCD4' },
  { id: 3, name: 'Bún riêu', region: 'Bắc Bộ', color: '#FF9800' },
  { id: 4, name: 'Mì Quảng', region: 'Trung Bộ', color: '#FF5722' },
];

const DishDetailPage = () => {
  const navigate = useNavigate();
  const [tried, setTried] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);

  const s = {
    page: {
      flex: 1, backgroundColor: '#FDF9F3', overflowY: 'auto',
      maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: '#393834',
    },
    hero: {
      width: '100%', height: 320, position: 'relative',
      background: 'linear-gradient(180deg, #FFB59E 0%, #FF571A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    heroIcon: { fontSize: 80, color: 'rgba(255,255,255,0.3)' },
    heroOverlay: {
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
      background: 'linear-gradient(transparent, #FDF9F3)',
    },
    backBtnFloat: {
      position: 'absolute', top: 20, left: 16, width: 40, height: 40,
      borderRadius: '50%', background: 'rgba(0,0,0,0.3)', border: 'none',
      color: '#FDF9F3', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 2,
    },
    body: { padding: '0 24px 100px', marginTop: -20, position: 'relative', zIndex: 1 },
    dishName: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 28, fontWeight: 800, color: '#393834', marginBottom: 8,
    },
    metaRow: {
      display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20,
    },
    metaItem: {
      display: 'flex', alignItems: 'center', gap: 4,
      fontSize: 13, color: '#666460',
    },
    metaIcon: { fontSize: 18 },
    vangBadge: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '6px 14px', borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FFD54F, #F57C00)',
      fontSize: 13, fontWeight: 700, color: '#1a1a1a',
    },
    tryBtn: (done) => ({
      width: '100%', padding: '16px', borderRadius: '9999px', border: 'none',
      background: done ? '#117500' : 'linear-gradient(135deg, #117500, #4CAF50)',
      color: '#FDF9F3', fontSize: 16, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      marginBottom: 32,
    }),
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: '#393834', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#FF571A' },
    restaurantCard: {
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', borderRadius: '1rem',
      backgroundColor: '#ffffff',
      marginBottom: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    restIcon: {
      width: 48, height: 48, borderRadius: '0.75rem',
      background: 'linear-gradient(135deg, #FF571A20, #FFB59E20)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    },
    restInfo: { flex: 1 },
    restName: { fontSize: 15, fontWeight: 700, color: '#393834', marginBottom: 2 },
    restAddr: { fontSize: 12, color: '#666460' },
    restRight: { textAlign: 'right' },
    restRating: {
      display: 'flex', alignItems: 'center', gap: 2,
      fontSize: 13, fontWeight: 700, color: '#FF571A',
    },
    restPrice: { fontSize: 12, color: '#666460', marginTop: 2 },
    reviewCard: {
      padding: '16px', borderRadius: '1rem',
      backgroundColor: '#ffffff',
      marginBottom: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    reviewHeader: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
    },
    reviewName: { fontSize: 14, fontWeight: 700, color: '#393834' },
    reviewDate: { fontSize: 11, color: '#666460' },
    reviewStars: { display: 'flex', gap: 2, marginBottom: 6 },
    starIcon: (filled) => ({ fontSize: 16, color: filled ? '#FFD54F' : '#ddd' }),
    reviewText: { fontSize: 13, color: '#666460', lineHeight: 1.5 },
    nutritionToggle: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px', borderRadius: '1rem',
      backgroundColor: '#ffffff',
      marginBottom: 10, border: 'none', width: '100%', cursor: 'pointer',
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700,
      color: '#393834', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    nutritionGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
      padding: '0 16px 16px', marginBottom: 20,
    },
    nutriItem: {
      textAlign: 'center', padding: '12px 8px', borderRadius: '0.75rem',
      backgroundColor: '#ffffff',
    },
    nutriValue: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 800,
      color: '#FF571A',
    },
    nutriLabel: { fontSize: 11, color: '#666460', marginTop: 2 },
    relatedScroll: {
      display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8,
    },
    relatedCard: (color) => ({
      minWidth: 140, padding: '20px 16px', borderRadius: '1rem',
      backgroundColor: `${color}15`, flexShrink: 0, cursor: 'pointer',
    }),
    relatedName: {
      fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 700,
      color: '#393834', marginBottom: 4,
    },
    relatedRegion: { fontSize: 11, color: '#666460' },
    mapSection: {
      padding: '24px', borderRadius: '1.5rem',
      background: 'linear-gradient(135deg, #FFB59E20, #FF571A10)',
      marginBottom: 28, textAlign: 'center',
    },
    mapIcon: { fontSize: 48, color: '#FF571A', marginBottom: 8, display: 'block' },
    mapLabel: { fontSize: 14, color: '#393834', fontWeight: 600 },
    mapRegion: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 800,
      color: '#FF571A', marginTop: 4,
    },
  };

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <button style={s.backBtnFloat} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.heroIcon}>ramen_dining</span>
        <div style={s.heroOverlay} />
      </div>

      <div style={s.body}>
        <div style={s.dishName}>Phở Bò Hà Nội</div>

        <div style={s.metaRow}>
          <div style={s.metaItem}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.metaIcon}>location_on</span>
            Đồng bằng sông Hồng
          </div>
          <div style={s.vangBadge}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>toll</span>
            +30 VÀNG
          </div>
        </div>

        {/* Mark as Tried */}
        <button style={s.tryBtn(tried)} onClick={() => setTried(!tried)}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>
            {tried ? 'check_circle' : 'add_circle'}
          </span>
          {tried ? 'Đã thử!' : 'Đánh dấu đã thử'}
        </button>

        {/* Vang Credibility Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderRadius: '1rem', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #FFD54F, #F57C00)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#3A0B00' }}>verified</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 700, color: '#393834', marginBottom: 2 }}>Độ tin cậy Vàng</div>
            <div style={{ fontSize: 12, color: '#666460' }}>Xác nhận bởi cộng đồng GOMET</div>
          </div>
          <div style={{ fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800, color: '#b83500' }}>+30</div>
        </div>

        {/* Flavor Profile */}
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>equalizer</span>
          Hương vị đặc trưng
        </div>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', padding: '20px', marginBottom: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {[
            { name: 'Ngọt', pct: 85 },
            { name: 'Mặn', pct: 42 },
            { name: 'Umami', pct: 78 },
            { name: 'Chua', pct: 35 },
          ].map(f => (
            <div key={f.name} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#393834' }}>{f.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#b83500' }}>{f.pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, backgroundColor: '#F0EBE3', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${f.pct}%`, borderRadius: 4, backgroundColor: '#b83500', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Restaurant Recommendations */}
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>storefront</span>
          Tìm ở đâu
        </div>
        {restaurants.map(r => (
          <div key={r.id} style={s.restaurantCard}>
            <div style={s.restIcon}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#FF571A' }}>restaurant</span>
            </div>
            <div style={s.restInfo}>
              <div style={s.restName}>{r.name}</div>
              <div style={s.restAddr}>{r.address}</div>
            </div>
            <div style={s.restRight}>
              <div style={s.restRating}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>star</span>
                {r.rating}
              </div>
              <div style={s.restPrice}>{r.price}</div>
            </div>
          </div>
        ))}

        {/* Critics Circle */}
        <div style={{ ...s.sectionTitle, marginTop: 28 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>forum</span>
          Nhận xét cộng đồng
        </div>
        {reviews.map(rv => (
          <div key={rv.id} style={s.reviewCard}>
            <div style={s.reviewHeader}>
              <div style={s.reviewName}>{rv.name}</div>
              <div style={s.reviewDate}>{rv.date}</div>
            </div>
            <div style={s.reviewStars}>
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} aria-hidden="true" className="material-symbols-outlined" style={s.starIcon(i <= rv.rating)}>star</span>
              ))}
            </div>
            <div style={s.reviewText}>{rv.text}</div>
          </div>
        ))}

        {/* Nutritional Info */}
        <div style={{ marginTop: 28, marginBottom: 12 }}>
          <button style={s.nutritionToggle} onClick={() => setNutritionOpen(!nutritionOpen)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FF571A' }}>nutrition</span>
              Thông tin dinh dưỡng
            </span>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {nutritionOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
        {nutritionOpen && (
          <div style={s.nutritionGrid}>
            {nutritionInfo.map(n => (
              <div key={n.label} style={s.nutriItem}>
                <div style={s.nutriValue}>{n.value}</div>
                <div style={s.nutriLabel}>{n.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Discovery Map */}
        <div style={{ ...s.sectionTitle, marginTop: 16 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>explore</span>
          Bản đồ khám phá
        </div>
        <div style={s.mapSection}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.mapIcon}>map</span>
          <div style={s.mapLabel}>Xuất xứ</div>
          <div style={s.mapRegion}>Đồng bằng sông Hồng</div>
        </div>

        {/* Related Dishes */}
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>apps</span>
          Món tương tự
        </div>
        <div style={s.relatedScroll}>
          {relatedDishes.map(d => (
            <div key={d.id} style={s.relatedCard(d.color)}>
              <div style={s.relatedName}>{d.name}</div>
              <div style={s.relatedRegion}>{d.region}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishDetailPage;
