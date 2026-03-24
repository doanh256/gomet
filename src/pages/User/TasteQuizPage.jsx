import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cuisines = [
  { id: 'vn', name: 'Viet Nam', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop' },
  { id: 'jp', name: 'Nhat Ban', img: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&h=300&fit=crop' },
  { id: 'kr', name: 'Han Quoc', img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop' },
  { id: 'th', name: 'Thai Lan', img: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop' },
  { id: 'it', name: 'Y', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
  { id: 'fr', name: 'Phap', img: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=400&h=300&fit=crop' },
  { id: 'in', name: 'An Do', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop' },
  { id: 'mx', name: 'Mexico', img: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400&h=300&fit=crop' },
  { id: 'cn', name: 'Trung Hoa', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop' },
  { id: 'us', name: 'My', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop' },
];

const spiceLevels = [
  { id: 0, label: 'Khong cay', emoji: '🫑', desc: 'Khong chiu duoc cay' },
  { id: 1, label: 'It cay', emoji: '🌶️', desc: 'Cay nhe thoi' },
  { id: 2, label: 'Vua', emoji: '🌶️🌶️', desc: 'Cay vua phai' },
  { id: 3, label: 'Cay', emoji: '🌶️🌶️🌶️', desc: 'Thich cay' },
  { id: 4, label: 'Sieu cay', emoji: '🌶️🌶️🌶️🌶️🌶️', desc: 'Cang cay cang thich' },
];

const diningStyles = [
  { id: 'street', label: 'Street food', icon: 'storefront', desc: 'An via he, quan binh dan' },
  { id: 'fine', label: 'Fine dining', icon: 'restaurant', desc: 'Nha hang sang trong' },
  { id: 'family', label: 'Gia dinh', icon: 'family_restroom', desc: 'Am cung, phan nhieu' },
  { id: 'buffet', label: 'Buffet', icon: 'brunch_dining', desc: 'An tha ga, da dang' },
];

const budgetOptions = [
  { id: 'low', label: 'Tiet kiem', icon: 'savings', desc: 'Duoi 100K/nguoi' },
  { id: 'mid', label: 'Trung binh', icon: 'account_balance_wallet', desc: '100K - 300K/nguoi' },
  { id: 'high', label: 'Thoai mai', icon: 'diamond', desc: '300K - 500K/nguoi' },
  { id: 'premium', label: 'Khong gioi han', icon: 'workspace_premium', desc: 'Tren 500K/nguoi' },
];

const diningTimes = [
  { id: 'breakfast', label: 'An sang', icon: 'egg_alt', desc: '6:00 - 9:00' },
  { id: 'lunch', label: 'An trua', icon: 'lunch_dining', desc: '11:00 - 13:00' },
  { id: 'dinner', label: 'An toi', icon: 'dinner_dining', desc: '18:00 - 21:00' },
  { id: 'late', label: 'An khuya', icon: 'nightlife', desc: '21:00+' },
];

const drinkOptions = [
  { id: 'coffee', label: 'Ca phe', icon: 'coffee', desc: 'Khong the thieu' },
  { id: 'tea', label: 'Tra', icon: 'emoji_food_beverage', desc: 'Tra dao, tra sua...' },
  { id: 'beer', label: 'Bia/Ruou', icon: 'sports_bar', desc: 'Lai rai cuoi tuan' },
  { id: 'juice', label: 'Nuoc ep', icon: 'local_bar', desc: 'Healthy lifestyle' },
  { id: 'boba', label: 'Tra sua', icon: 'bubble_chart', desc: 'Tran chau fan' },
];

const allergyOptions = [
  { id: 'none', label: 'Khong co', icon: 'check_circle' },
  { id: 'seafood', label: 'Hai san', icon: 'set_meal' },
  { id: 'nuts', label: 'Hat/Dau phong', icon: 'energy_savings_leaf' },
  { id: 'dairy', label: 'Sua', icon: 'water_drop' },
  { id: 'gluten', label: 'Gluten', icon: 'bakery_dining' },
  { id: 'egg', label: 'Trung', icon: 'egg' },
];

const cookingSkills = [
  { id: 'none', label: 'Khong nau', icon: 'no_meals', desc: 'Chi an ngoai' },
  { id: 'basic', label: 'Co ban', icon: 'skillet', desc: 'Nau duoc vai mon' },
  { id: 'good', label: 'Kha', icon: 'soup_kitchen', desc: 'Nau ngon lam' },
  { id: 'chef', label: 'Master Chef', icon: 'menu_book', desc: 'Dau bep tai ba' },
];

const photoPrefs = [
  { id: 'always', label: 'Luon chup', icon: 'photo_camera', desc: 'Chup truoc, an sau' },
  { id: 'sometimes', label: 'Thinh thoang', icon: 'camera_alt', desc: 'Mon dep thi chup' },
  { id: 'never', label: 'Khong bao gio', icon: 'no_photography', desc: 'An la chinh' },
];

const regionPrefs = [
  { id: 'north', label: 'Mien Bac', icon: 'landscape', desc: 'Tinh te, dam da' },
  { id: 'central', label: 'Mien Trung', icon: 'tsunami', desc: 'Cay nong, dam vi' },
  { id: 'south', label: 'Mien Nam', icon: 'wb_sunny', desc: 'Ngot ngao, phong phu' },
  { id: 'all', label: 'Tat ca', icon: 'public', desc: 'Thich het!' },
];

const steps = [
  { key: 'cuisine', title: 'Dinh nghia', highlight: 'khau vi', titleEnd: 'cua ban.', sub: 'Chon am thuc yeu thich', note: 'Chon it nhat 3', multi: true },
  { key: 'spice', title: 'Do cay', highlight: 'ly tuong', titleEnd: 'cua ban?', sub: 'Chon muc do cay ban thich', multi: false },
  { key: 'style', title: 'Phong cach', highlight: 'an uong', titleEnd: 'cua ban?', sub: 'Ban thich an o dau nhat?', multi: true },
  { key: 'budget', title: 'Ngan sach', highlight: 'am thuc', titleEnd: 'cua ban?', sub: 'Chi phi moi bua an', multi: false },
  { key: 'time', title: 'Thoi diem', highlight: 'yeu thich', titleEnd: 'nhat?', sub: 'Ban thuong an luc nao?', multi: true },
  { key: 'drinks', title: 'Thuc uong', highlight: 'khong the thieu', titleEnd: '?', sub: 'Chon thuc uong ban thich', multi: true },
  { key: 'allergy', title: 'Di ung', highlight: 'thuc pham', titleEnd: '?', sub: 'Chon neu ban bi di ung', multi: true },
  { key: 'cooking', title: 'Ky nang', highlight: 'nau an', titleEnd: 'cua ban?', sub: 'Ban nau an gioi co nao?', multi: false },
  { key: 'photo', title: 'Chup anh', highlight: 'do an', titleEnd: '?', sub: 'Ban co thich food photography?', multi: false },
  { key: 'region', title: 'Vung mien', highlight: 'am thuc', titleEnd: 'yeu thich?', sub: 'Ban thich am thuc vung nao?', multi: false },
];

const stepData = {
  cuisine: cuisines,
  spice: spiceLevels,
  style: diningStyles,
  budget: budgetOptions,
  time: diningTimes,
  drinks: drinkOptions,
  allergy: allergyOptions,
  cooking: cookingSkills,
  photo: photoPrefs,
  region: regionPrefs,
};

const TasteQuizPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [complete, setComplete] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const current = steps[step];
  const items = stepData[current?.key] || [];
  const selected = selections[current?.key] || (current?.multi ? [] : null);

  const toggleSelection = (id) => {
    if (!current) return;
    if (current.multi) {
      const arr = selections[current.key] || [];
      const next = arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];
      setSelections({ ...selections, [current.key]: next });
    } else {
      setSelections({ ...selections, [current.key]: id });
    }
  };

  const isSelected = (id) => {
    if (current?.multi) return (selections[current.key] || []).includes(id);
    return selections[current.key] === id;
  };

  const canProceed = () => {
    if (!current) return false;
    if (current.multi) {
      if (current.key === 'cuisine') return (selections.cuisine || []).length >= 3;
      return (selections[current.key] || []).length > 0;
    }
    return selections[current.key] != null;
  };

  const next = () => {
    if (step < 9) setStep(step + 1);
    else {
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        color: ['#FFB59E', '#FF571A', '#FFD54F', '#FF4D00'][Math.floor(Math.random() * 4)],
      }));
      setConfetti(particles);
      setComplete(true);
    }
  };

  const back = () => { if (step > 0) setStep(step - 1); };
  const skip = () => { if (step < 9) setStep(step + 1); else { setComplete(true); } };

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    },
    progressWrap: {
      padding: '16px 24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    progressTrack: {
      flex: 1,
      height: 3,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.4s ease',
      width: `${((step + 1) / 10) * 100}%`,
    },
    stepLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--on-surface-variant)',
      letterSpacing: '0.08em',
      whiteSpace: 'nowrap',
    },
    content: {
      flex: 1,
      padding: '32px 24px 120px',
      maxWidth: 720,
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    },
    sub: {
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--primary)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 'clamp(32px, 6vw, 48px)',
      fontWeight: 900,
      fontStyle: 'italic',
      color: 'var(--on-surface)',
      lineHeight: 1.1,
      marginBottom: 8,
    },
    highlight: {
      color: 'var(--primary)',
    },
    note: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 28,
    },
    cuisineGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 12,
    },
    cuisineCard: (sel) => ({
      position: 'relative',
      height: 180,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: sel ? '0 0 0 3px #b83500' : 'none',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      transform: sel ? 'scale(0.97)' : 'scale(1)',
    }),
    cuisineImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    cuisineOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '40px 14px 14px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    cuisineName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: '#fff',
    },
    checkCircle: (sel) => ({
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: sel ? 'var(--primary-container)' : 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    optionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: 12,
    },
    optionCard: (sel) => ({
      backgroundColor: sel ? 'var(--surface-container-highest)' : 'var(--surface-container-low)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 16px',
      cursor: 'pointer',
      textAlign: 'center',
      boxShadow: sel ? '0 0 0 2px var(--primary-container)' : 'none',
      transition: 'all 0.2s ease',
    }),
    optionIcon: {
      fontSize: 32,
      color: 'var(--primary)',
      marginBottom: 8,
      display: 'block',
    },
    optionEmoji: {
      fontSize: 28,
      marginBottom: 8,
      display: 'block',
    },
    optionLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    optionDesc: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    nav: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px 24px',
      backgroundColor: 'rgba(0,0,0,0.9)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      zIndex: 50,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '10px 0',
      opacity: step === 0 ? 0.3 : 1,
      pointerEvents: step === 0 ? 'none' : 'auto',
    },
    nextBtn: (enabled) => ({
      background: enabled ? 'var(--primary-gradient)' : 'var(--surface-container-high)',
      border: 'none',
      color: enabled ? 'var(--on-primary)' : 'var(--on-surface-variant)',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      cursor: enabled ? 'pointer' : 'default',
      padding: '12px 32px',
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      opacity: enabled ? 1 : 0.5,
    }),
    skipLink: {
      background: 'none',
      border: 'none',
      color: 'var(--on-surface-variant)',
      fontSize: 13,
      cursor: 'pointer',
      textDecoration: 'underline',
      fontFamily: 'var(--font-body)',
      padding: '10px 0',
    },
    successPage: {
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 32,
      position: 'relative',
      overflow: 'hidden',
    },
    successIcon: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
    },
    successHeading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 900,
      fontStyle: 'italic',
      color: 'var(--on-surface)',
      marginBottom: 12,
      lineHeight: 1.2,
    },
    successSub: {
      fontSize: 15,
      color: 'var(--on-surface-variant)',
      marginBottom: 40,
      maxWidth: 300,
    },
    startBtn: {
      background: 'var(--primary-gradient)',
      border: 'none',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      padding: '14px 40px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    confettiPiece: (p) => ({
      position: 'absolute',
      top: -20,
      left: `${p.x}%`,
      width: 8,
      height: 8,
      backgroundColor: p.color,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      animation: `confetti-fall 3s ${p.delay}s ease-out forwards`,
      opacity: 0,
    }),
  };

  if (complete) {
    return (
      <div style={s.successPage}>
        <style>{`
          @keyframes confetti-fall {
            0% { opacity: 1; transform: translateY(0) rotate(0deg); }
            100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
          }
        `}</style>
        {confetti.map(p => <div key={p.id} style={s.confettiPiece(p)} />)}
        <div style={s.successIcon}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--on-primary)' }}>check</span>
        </div>
        <div style={s.successHeading}>Ho so khau vi<br />da <span style={s.highlight}>hoan thanh!</span></div>
        <div style={s.successSub}>Chung toi se goi y nhung trai nghiem am thuc phu hop nhat cho ban.</div>
        <button style={s.startBtn} onClick={() => navigate('/app')}>
          Bat dau kham pha
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
        </button>
      </div>
    );
  }

  const renderCuisineGrid = () => (
    <div style={s.cuisineGrid}>
      {cuisines.map(c => (
        <div key={c.id} style={s.cuisineCard(isSelected(c.id))} onClick={() => toggleSelection(c.id)}>
          <img src={c.img} alt={c.name} style={s.cuisineImg} />
          <div style={s.cuisineOverlay}>
            <span style={s.cuisineName}>{c.name}</span>
            <div style={s.checkCircle(isSelected(c.id))}>
              {isSelected(c.id) && <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>check</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSpiceLevels = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {spiceLevels.map(lv => (
        <div key={lv.id} style={{
          ...s.optionCard(isSelected(lv.id)),
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 20px',
        }} onClick={() => toggleSelection(lv.id)}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>{lv.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={s.optionLabel}>{lv.label}</div>
            <div style={s.optionDesc}>{lv.desc}</div>
          </div>
          <div style={s.checkCircle(isSelected(lv.id))}>
            {isSelected(lv.id) && <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>check</span>}
          </div>
        </div>
      ))}
    </div>
  );

  const renderOptionGrid = (items) => (
    <div style={s.optionGrid}>
      {items.map(item => (
        <div key={item.id} style={s.optionCard(isSelected(item.id))} onClick={() => toggleSelection(item.id)}>
          {item.icon && <span className="material-symbols-outlined" style={s.optionIcon}>{item.icon}</span>}
          {item.emoji && <span style={s.optionEmoji}>{item.emoji}</span>}
          <div style={s.optionLabel}>{item.label}</div>
          {item.desc && <div style={s.optionDesc}>{item.desc}</div>}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (current.key === 'cuisine') return renderCuisineGrid();
    if (current.key === 'spice') return renderSpiceLevels();
    return renderOptionGrid(items);
  };

  return (
    <div style={s.page}>
      <div style={s.progressWrap}>
        <div style={s.progressTrack}><div style={s.progressFill} /></div>
        <span style={s.stepLabel}>Buoc {String(step + 1).padStart(2, '0')}/10</span>
      </div>

      <div style={s.content}>
        <div style={s.sub}>{current.sub}</div>
        <h1 style={s.heading}>
          {current.title} <span style={s.highlight}>{current.highlight}</span> {current.titleEnd}
        </h1>
        {current.note && <div style={s.note}>{current.note}</div>}
        {renderContent()}
      </div>

      <div style={s.nav}>
        <button style={s.backBtn} onClick={back}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          Quay lai
        </button>
        <button style={s.skipLink} onClick={skip}>Bo qua</button>
        <button style={s.nextBtn(canProceed())} onClick={canProceed() ? next : undefined}>
          {step === 9 ? 'Hoan thanh' : 'Tiep theo'}
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {step === 9 ? 'check' : 'arrow_forward'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TasteQuizPage;
