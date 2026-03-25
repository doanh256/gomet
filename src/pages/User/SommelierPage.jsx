import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SommelierPage = () => {
  const navigate = useNavigate();
  const [sweetness, setSweetness] = useState(50);
  const [intensity, setIntensity] = useState(50);
  const [temperature, setTemperature] = useState(50);
  const [occasion, setOccasion] = useState('Hẹn hò đầu tiên');

  const occasions = ['Hẹn hò đầu tiên', 'Kỷ niệm', 'Nhóm bạn bè', 'Thưởng thức riêng'];

  const recommendations = [
    { id: 1, name: 'Chateau Dalat Reserve', origin: 'Đà Lạt, Việt Nam', price: '350.000 - 500.000 VND', match: 94, notes: 'Vị nho chín mềm, hương vani nhẹ nhàng, hậu vị trái cây nhiệt đới.', emoji: '🍷' },
    { id: 2, name: 'Sake Junmai Daiginjo', origin: 'Niigata, Nhật Bản', price: '600.000 - 900.000 VND', match: 87, notes: 'Trong suốt, tinh tế, hương hoa nhẹ, vị ngọt tự nhiên từ gạo.', emoji: '🍶' },
    { id: 3, name: 'Espresso Martini', origin: 'Cocktail', price: '150.000 - 250.000 VND', match: 82, notes: 'Đắng nhẹ của cà phê, ngọt của liqueur, năng lượng cho buổi tối.', emoji: '🍸' },
  ];

  const s = {
    page: { minHeight: '100vh', background: '#131313', fontFamily: 'var(--font-body)', color: '#FDF9F3' },
    header: { padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 },
    backBtn: { background: '#1C1B1B', border: 'none', color: '#FDF9F3', borderRadius: '9999px', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    hero: { padding: '20px 20px 32px', textAlign: 'center' },
    heroIcon: { fontSize: 48, color: '#FFB59E', marginBottom: 8 },
    heroTitle: { fontFamily: 'var(--font-headline)', fontSize: 26, fontWeight: 800, color: '#FDF9F3', marginBottom: 8 },
    heroSub: { fontSize: 14, color: '#E6BEB2', maxWidth: 360, margin: '0 auto', lineHeight: 1.5 },
    section: { padding: '0 20px 24px' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: 17, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 },
    sliderGroup: { background: '#1C1B1B', borderRadius: '1.5rem', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 },
    sliderRow: { display: 'flex', flexDirection: 'column', gap: 8 },
    sliderLabels: { display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#E6BEB2', fontWeight: 500 },
    sliderTrack: { position: 'relative', height: 6, borderRadius: 3, background: '#353535', cursor: 'pointer' },
    sliderFill: (val) => ({ position: 'absolute', top: 0, left: 0, height: '100%', width: `${val}%`, borderRadius: 3, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', transition: 'width 0.15s' }),
    sliderThumb: (val) => ({ position: 'absolute', top: '50%', left: `${val}%`, transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: '50%', background: '#FFB59E', border: '3px solid #131313' }),
    sliderInput: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', margin: 0 },
    chipRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
    chip: (active) => ({ padding: '8px 16px', borderRadius: '9999px', border: 'none', background: active ? '#FF571A' : '#1C1B1B', color: active ? '#3A0B00' : '#FDF9F3', fontSize: 13, fontWeight: active ? 600 : 400, cursor: 'pointer' }),
    recCards: { display: 'flex', flexDirection: 'column', gap: 16 },
    recCard: { background: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden' },
    recImage: { height: 120, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 },
    recBody: { padding: 16 },
    recTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    recName: { fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700 },
    matchBadge: (pct) => ({ background: pct >= 90 ? '#FFB59E' : pct >= 80 ? '#FFD54F' : '#E6BEB2', color: '#3A0B00', padding: '3px 10px', borderRadius: '9999px', fontSize: 12, fontWeight: 700 }),
    recOrigin: { fontSize: 12, color: '#E6BEB2', marginBottom: 2 },
    recPrice: { fontSize: 13, fontWeight: 600, color: '#FFB59E', marginBottom: 8 },
    recNotes: { fontSize: 13, fontStyle: 'italic', color: '#E6BEB2', lineHeight: 1.5, marginBottom: 12 },
    orderBtn: { background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', padding: '8px 20px', borderRadius: '9999px', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
    paletteCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: 20, display: 'flex', alignItems: 'center', gap: 16 },
    paletteAvatars: { display: 'flex' },
    paletteAvatar: (idx) => ({ width: 40, height: 40, borderRadius: '50%', background: idx === 0 ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: idx === 0 ? '#3A0B00' : '#FDF9F3', fontWeight: 700, fontSize: 14, marginLeft: idx > 0 ? -10 : 0, border: '2px solid #1C1B1B' }),
    paletteBody: { flex: 1 },
    paletteTitle: { fontWeight: 700, fontSize: 14, marginBottom: 4 },
    paletteSub: { fontSize: 12, color: '#E6BEB2' },
    compareBtn: { background: '#353535', border: 'none', padding: '8px 16px', borderRadius: '9999px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#FDF9F3' },
    funCard: { background: '#2A2A2A', borderRadius: '1.5rem', padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start' },
    funIcon: { fontSize: 28, color: '#FFB59E' },
    funTitle: { fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#FDF9F3' },
    funText: { fontSize: 13, lineHeight: 1.5, color: '#E6BEB2' },
  };

  const Slider = ({ label1, label2, value, onChange }) => (
    <div style={s.sliderRow}>
      <div style={s.sliderLabels}><span>{label1}</span><span>{label2}</span></div>
      <div style={s.sliderTrack}>
        <div style={s.sliderFill(value)} />
        <div style={s.sliderThumb(value)} />
        <input type="range" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))} style={s.sliderInput} />
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
      <div style={s.hero}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.heroIcon}>wine_bar</span>
        <h1 style={s.heroTitle}>Sommelier thông minh</h1>
        <p style={s.heroSub}>Để AI chọn đồ uống hoàn hảo cho buổi hẹn của bạn</p>
      </div>
      <div style={s.section}>
        <div style={s.sectionTitle}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>tune</span> Khẩu vị của bạn</div>
        <div style={s.sliderGroup}>
          <Slider label1="Ngọt" label2="Khô" value={sweetness} onChange={setSweetness} />
          <Slider label1="Nhẹ" label2="Đậm" value={intensity} onChange={setIntensity} />
          <Slider label1="Lạnh" label2="Nóng" value={temperature} onChange={setTemperature} />
        </div>
      </div>
      <div style={s.section}>
        <div style={s.sectionTitle}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>celebration</span> Dịp sử dụng</div>
        <div style={s.chipRow}>
          {occasions.map(o => (<button key={o} style={s.chip(occasion === o)} onClick={() => setOccasion(o)}>{o}</button>))}
        </div>
      </div>
      <div style={s.section}>
        <div style={s.sectionTitle}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>auto_awesome</span> AI gợi ý</div>
        <div style={s.recCards}>
          {recommendations.map(rec => (
            <div key={rec.id} style={s.recCard}>
              <div style={s.recImage}>{rec.emoji}</div>
              <div style={s.recBody}>
                <div style={s.recTop}>
                  <div><div style={s.recName}>{rec.name}</div><div style={s.recOrigin}>{rec.origin}</div></div>
                  <span style={s.matchBadge(rec.match)}>Tương thích {rec.match}%</span>
                </div>
                <div style={s.recPrice}>{rec.price}</div>
                <div style={s.recNotes}>{rec.notes}</div>
                <button style={s.orderBtn}>Đặt ngay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={s.section}>
        <div style={s.paletteCard}>
          <div style={s.paletteAvatars}><div style={s.paletteAvatar(0)}>B</div><div style={s.paletteAvatar(1)}>?</div></div>
          <div style={s.paletteBody}><div style={s.paletteTitle}>Chia sẻ khẩu vị với đối phương</div><div style={s.paletteSub}>Xem bạn và người ấy hợp nhau bao nhiêu</div></div>
          <button style={s.compareBtn}>So sánh 78%</button>
        </div>
      </div>
      <div style={{ ...s.section, paddingBottom: 32 }}>
        <div style={s.funCard}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.funIcon}>auto_awesome</span>
          <div><div style={s.funTitle}>Bạn có biết?</div><div style={s.funText}>Rượu vang đỏ ở nhiệt độ phòng (16-18°C) sẽ toả hương thơm tốt nhất. Nhưng khi ở Việt Nam, hãy làm lạnh nhẹ 15 phút trước khi thưởng thức!</div></div>
        </div>
      </div>
    </div>
  );
};

export default SommelierPage;
