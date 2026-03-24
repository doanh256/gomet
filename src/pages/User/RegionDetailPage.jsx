import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const signatureDishes = [
  { id: 1, name: 'Thit trau gac bep', tried: true, vang: 30, color: '#FF571A' },
  { id: 2, name: 'Xoi ngu sac', tried: true, vang: 25, color: '#FFD54F' },
  { id: 3, name: 'Rau cai meo xao', tried: true, vang: 20, color: '#117500' },
  { id: 4, name: 'Cha com', tried: false, vang: 25, color: '#FFB59E' },
  { id: 5, name: 'Pa pinh top', tried: false, vang: 35, color: '#E91E63' },
  { id: 6, name: 'Nau nhoi com', tried: false, vang: 30, color: '#2196F3' },
  { id: 7, name: 'Canh bon', tried: false, vang: 20, color: '#795548' },
  { id: 8, name: 'Thang co', tried: false, vang: 40, color: '#FF5722' },
];

const localStories = [
  { id: 1, name: 'Lan Anh', text: 'Tay Bac la vung dat cua nhung mon an moc mac nhung day dam da. Thit trau gac bep an voi xoi ngu sac la su ket hop tuyet voi!', date: '22/03' },
  { id: 2, name: 'Van Hieu', text: 'Toi da den Sa Pa va thu mon pa pinh top. Huong vi ca nuong trong la chuoi that dac biet, khong noi nao co duoc.', date: '19/03' },
  { id: 3, name: 'Thu Trang', text: 'Moi lan len Tay Bac toi deu phai an thang co. Mon nay can phai thu it nhat mot lan trong doi!', date: '15/03' },
];

const localRestaurants = [
  { id: 1, name: 'Nha hang Fansipan', addr: 'Sa Pa, Lao Cai', rating: 4.7 },
  { id: 2, name: 'Quan Tay Bac', addr: 'Mu Cang Chai', rating: 4.5 },
  { id: 3, name: 'Lang Nuong Da', addr: 'Mai Chau, Hoa Binh', rating: 4.6 },
];

const RegionDetailPage = () => {
  const navigate = useNavigate();
  const triedCount = signatureDishes.filter(d => d.tried).length;
  const total = signatureDishes.length;
  const progress = Math.round((triedCount / total) * 100);

  const s = {
    page: {
      flex: 1, backgroundColor: 'var(--surface, #FDF9F3)', overflowY: 'auto',
      maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: 'var(--on-surface, #2A2A2A)',
    },
    hero: {
      width: '100%', height: 260, position: 'relative',
      background: 'linear-gradient(135deg, #8BC34A 0%, #4CAF50 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 8,
    },
    heroIcon: { fontSize: 64, color: 'rgba(255,255,255,0.3)' },
    heroTitle: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 36, fontWeight: 800, color: '#FDF9F3', zIndex: 1,
    },
    heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', zIndex: 1 },
    heroOverlay: {
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
      background: 'linear-gradient(transparent, var(--surface, #FDF9F3))',
    },
    backBtnFloat: {
      position: 'absolute', top: 20, left: 16, width: 40, height: 40,
      borderRadius: '50%', background: 'rgba(0,0,0,0.3)', border: 'none',
      color: '#FDF9F3', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 2,
    },
    body: { padding: '0 24px 100px', marginTop: -16, position: 'relative', zIndex: 1 },
    progressCard: {
      padding: '20px', borderRadius: '1.5rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
      marginBottom: 28, textAlign: 'center',
    },
    progressLabel: {
      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 12,
    },
    progressBarBg: {
      height: 12, borderRadius: 6, backgroundColor: 'var(--surface-container, #F0EBE3)',
      overflow: 'hidden', marginBottom: 8,
    },
    progressBarFill: {
      height: '100%', borderRadius: 6,
      background: 'linear-gradient(90deg, #8BC34A, #4CAF50)',
      transition: 'width 0.5s ease',
    },
    progressText: { fontSize: 13, color: 'var(--on-surface-variant)', fontWeight: 600 },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700,
      color: 'var(--on-surface)', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 22, color: '#FF571A' },
    dishList: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 },
    dishItem: (tried) => ({
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', borderRadius: '1rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
      opacity: tried ? 1 : 0.7,
    }),
    dishIconWrap: (color, tried) => ({
      width: 44, height: 44, borderRadius: '50%',
      backgroundColor: tried ? `${color}20` : 'var(--surface-container, #F0EBE3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }),
    dishIconEl: (color, tried) => ({
      fontSize: 22, color: tried ? color : '#999',
    }),
    dishInfo: { flex: 1 },
    dishName: { fontSize: 14, fontWeight: 700, color: 'var(--on-surface)' },
    dishVang: { fontSize: 11, color: '#FFD54F', fontWeight: 600 },
    dishCheck: (tried) => ({
      fontSize: 22, color: tried ? '#117500' : '#ccc',
    }),
    chefCta: {
      width: '100%', padding: '16px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3', fontSize: 16, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      marginBottom: 32,
    },
    storyCard: {
      padding: '16px', borderRadius: '1rem',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
      marginBottom: 10,
    },
    storyHeader: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
    },
    storyName: { fontSize: 14, fontWeight: 700, color: 'var(--on-surface)' },
    storyDate: { fontSize: 11, color: 'var(--on-surface-variant)' },
    storyText: { fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.6 },
    mapSection: {
      marginBottom: 28, borderRadius: '1.5rem', overflow: 'hidden',
      backgroundColor: 'var(--surface-container-low, #F5F0E8)',
    },
    mapPlaceholder: {
      height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #8BC34A20, #4CAF5020)',
    },
    mapIcon: { fontSize: 48, color: '#8BC34A' },
    restList: { padding: '12px 16px' },
    restItem: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0', borderBottom: '1px solid var(--surface-container, #F0EBE3)',
    },
    restName: { fontSize: 14, fontWeight: 600, color: 'var(--on-surface)' },
    restAddr: { fontSize: 11, color: 'var(--on-surface-variant)' },
    restRating: {
      display: 'flex', alignItems: 'center', gap: 2,
      fontSize: 13, fontWeight: 700, color: '#FF571A',
    },
  };

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <button style={s.backBtnFloat} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="material-symbols-outlined" style={s.heroIcon}>landscape</span>
        <div style={s.heroTitle}>Tay Bac</div>
        <div style={s.heroSub}>Vung dat am thuc nguyen so</div>
        <div style={s.heroOverlay} />
      </div>

      <div style={s.body}>
        {/* Badge Progress */}
        <div style={s.progressCard}>
          <div style={s.progressLabel}>Tien trinh huy hieu vung mien</div>
          <div style={s.progressBarBg}>
            <div style={{ ...s.progressBarFill, width: `${progress}%` }} />
          </div>
          <div style={s.progressText}>{triedCount}/{total} mon da thu - {progress}%</div>
        </div>

        {/* Tribal Hearts - Signature Dishes */}
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>local_dining</span>
          Tribal Hearts
        </div>
        <div style={s.dishList}>
          {signatureDishes.map(d => (
            <div key={d.id} style={s.dishItem(d.tried)}>
              <div style={s.dishIconWrap(d.color, d.tried)}>
                <span className="material-symbols-outlined" style={s.dishIconEl(d.color, d.tried)}>
                  restaurant
                </span>
              </div>
              <div style={s.dishInfo}>
                <div style={s.dishName}>{d.name}</div>
                <div style={s.dishVang}>+{d.vang} Vang</div>
              </div>
              <span className="material-symbols-outlined" style={s.dishCheck(d.tried)}>
                {d.tried ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
          ))}
        </div>

        {/* Book a Chef's Table */}
        <button style={s.chefCta}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>table_restaurant</span>
          Dat Chef's Table
        </button>

        {/* Local Stories */}
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>auto_stories</span>
          Cau chuyen dia phuong
        </div>
        {localStories.map(story => (
          <div key={story.id} style={s.storyCard}>
            <div style={s.storyHeader}>
              <div style={s.storyName}>{story.name}</div>
              <div style={s.storyDate}>{story.date}</div>
            </div>
            <div style={s.storyText}>{story.text}</div>
          </div>
        ))}

        {/* Map Section */}
        <div style={{ ...s.sectionTitle, marginTop: 28 }}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>map</span>
          Nha hang trong vung
        </div>
        <div style={s.mapSection}>
          <div style={s.mapPlaceholder}>
            <span className="material-symbols-outlined" style={s.mapIcon}>map</span>
          </div>
          <div style={s.restList}>
            {localRestaurants.map(r => (
              <div key={r.id} style={s.restItem}>
                <div>
                  <div style={s.restName}>{r.name}</div>
                  <div style={s.restAddr}>{r.addr}</div>
                </div>
                <div style={s.restRating}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>star</span>
                  {r.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionDetailPage;
