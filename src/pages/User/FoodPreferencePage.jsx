import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const foodItems = [
  'Phở', 'Bún chả', 'Cơm tấm', 'Sushi', 'Pizza', 'Pasta',
  'Salad', 'BBQ', 'Dimsum', 'Lẩu', 'Bánh mì', 'Dessert',
];

const dietOptions = [
  'Không kiêng cử', 'Ăn chay', 'Không gluten', 'Halal', 'Keto',
];

const priceOptions = [
  { symbol: '$', label: 'Bình dân', range: '<100k' },
  { symbol: '$$', label: 'Trung cấp', range: '100-300k' },
  { symbol: '$$$', label: 'Cao cấp', range: '300k+' },
];

const allergyItems = [
  'Hải sản', 'Đậu phộng', 'Sữa', 'Trứng', 'Không có',
];

const experienceOptions = [
  { icon: 'local_cafe', label: 'Ấm cúng' },
  { icon: 'dinner_dining', label: 'Sang trọng' },
  { icon: 'celebration', label: 'Vui nhộn' },
];

const FoodPreferencePage = () => {
  const navigate = useNavigate();
  const [selectedFoods, setSelectedFoods] = useState(['Phở', 'Sushi', 'Lẩu']);
  const [selectedDiet, setSelectedDiet] = useState('Không kiêng cử');
  const [selectedPrice, setSelectedPrice] = useState('$$');
  const [selectedAllergies, setSelectedAllergies] = useState(['Không có']);
  const [selectedExperiences, setSelectedExperiences] = useState(['Ấm cúng']);

  const toggleFood = (item) => {
    setSelectedFoods(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const toggleAllergy = (item) => {
    if (item === 'Không có') {
      setSelectedAllergies(['Không có']);
    } else {
      setSelectedAllergies(prev => {
        const without = prev.filter(a => a !== 'Không có');
        return without.includes(item) ? without.filter(a => a !== item) : [...without, item];
      });
    }
  };

  const toggleExperience = (item) => {
    setSelectedExperiences(prev =>
      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
    );
  };

  const totalSelected = selectedFoods.length + (selectedDiet ? 1 : 0) + (selectedPrice ? 1 : 0) + selectedAllergies.length + selectedExperiences.length;
  const progress = Math.min(Math.round((totalSelected / 15) * 100), 100);

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
      marginBottom: 28,
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
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
      marginTop: 28,
    },
    chipsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10,
    },
    chip: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '12px 8px',
      borderRadius: '1.5rem',
      fontSize: 13,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none',
      backgroundColor: '#1C1B1B',
      color: '#FDF9F3',
    },
    chipActive: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
    },
    chipCheck: {
      fontSize: 16,
    },
    dietRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
    },
    dietChip: {
      padding: '10px 18px',
      borderRadius: '9999px',
      fontSize: 13,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#1C1B1B',
      color: '#FDF9F3',
    },
    dietActive: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
    },
    priceRow: {
      display: 'flex',
      gap: 12,
    },
    priceCard: {
      flex: 1,
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '20px 12px',
      textAlign: 'center',
      cursor: 'pointer',
      border: 'none',
    },
    priceCardActive: {
      backgroundColor: '#FF571A',
    },
    priceSymbol: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: '#FFB59E',
      marginBottom: 6,
    },
    priceLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    priceRange: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
    },
    allergyRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
    },
    expRow: {
      display: 'flex',
      gap: 12,
    },
    expCard: {
      flex: 1,
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '20px 12px',
      textAlign: 'center',
      cursor: 'pointer',
      border: 'none',
    },
    expCardActive: {
      backgroundColor: '#FF571A',
    },
    expIcon: {
      fontSize: 32,
      color: '#FFB59E',
      marginBottom: 8,
    },
    expLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    saveBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      padding: '18px 24px',
      fontSize: 18,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      marginTop: 32,
      marginBottom: 16,
    },
    progressSection: {
      textAlign: 'center',
    },
    progressLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
      marginBottom: 10,
    },
    progressTrack: {
      height: 10,
      backgroundColor: '#2A2A2A',
      borderRadius: '9999px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '9999px',
      transition: 'width 0.4s ease',
    },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>restaurant</span>
        <h1 style={s.heading}>Hồ sơ ẩm thực</h1>
        <div style={s.subtitle}>Cho chúng tôi biết khẩu vị của bạn</div>
      </div>

      {/* Favorite Foods */}
      <div style={s.sectionTitle}>Món yêu thích</div>
      <div style={s.chipsGrid} role="group" aria-label="Món yêu thích">
        {foodItems.map(item => {
          const active = selectedFoods.includes(item);
          return (
            <div
              key={item}
              role="checkbox"
              aria-checked={active}
              tabIndex={0}
              style={{ ...s.chip, ...(active ? s.chipActive : {}) }}
              onClick={() => toggleFood(item)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleFood(item))}
            >
              {active && <span aria-hidden="true" className="material-symbols-outlined" style={s.chipCheck}>check</span>}
              {item}
            </div>
          );
        })}
      </div>

      {/* Diet */}
      <div style={s.sectionTitle}>Chế độ ăn</div>
      <div style={s.dietRow} role="radiogroup" aria-label="Chế độ ăn">
        {dietOptions.map(item => {
          const active = selectedDiet === item;
          return (
            <div
              key={item}
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              style={{ ...s.dietChip, ...(active ? s.dietActive : {}) }}
              onClick={() => setSelectedDiet(item)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelectedDiet(item))}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Price Preference */}
      <div style={s.sectionTitle}>Mức giá ưa thích</div>
      <div style={s.priceRow} role="radiogroup" aria-label="Mức giá ưa thích">
        {priceOptions.map(opt => {
          const active = selectedPrice === opt.symbol;
          return (
            <div
              key={opt.symbol}
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              style={{ ...s.priceCard, ...(active ? s.priceCardActive : {}) }}
              onClick={() => setSelectedPrice(opt.symbol)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelectedPrice(opt.symbol))}
            >
              <div style={s.priceSymbol}>{opt.symbol}</div>
              <div style={s.priceLabel}>{opt.label}</div>
              <div style={s.priceRange}>{opt.range}</div>
            </div>
          );
        })}
      </div>

      {/* Allergies */}
      <div style={s.sectionTitle}>Dị ứng thực phẩm</div>
      <div style={s.allergyRow} role="group" aria-label="Dị ứng thực phẩm">
        {allergyItems.map(item => {
          const active = selectedAllergies.includes(item);
          return (
            <div
              key={item}
              role="checkbox"
              aria-checked={active}
              tabIndex={0}
              style={{ ...s.dietChip, ...(active ? s.dietActive : {}) }}
              onClick={() => toggleAllergy(item)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleAllergy(item))}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Experience Preference */}
      <div style={s.sectionTitle}>Trải nghiệm mong muốn</div>
      <div style={s.expRow} role="group" aria-label="Trải nghiệm mong muốn">
        {experienceOptions.map(opt => {
          const active = selectedExperiences.includes(opt.label);
          return (
            <div
              key={opt.label}
              role="checkbox"
              aria-checked={active}
              tabIndex={0}
              style={{ ...s.expCard, ...(active ? s.expCardActive : {}) }}
              onClick={() => toggleExperience(opt.label)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleExperience(opt.label))}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={s.expIcon}>{opt.icon}</span>
              <div style={s.expLabel}>{opt.label}</div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <button style={s.saveBtn}>Lưu thay đổi</button>

      {/* Progress */}
      <div style={s.progressSection}>
        <div style={s.progressLabel}>Hồ sơ ẩm thực của bạn: {progress}% hoàn thành</div>
        <div style={s.progressTrack}>
          <div style={{ ...s.progressFill, width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default FoodPreferencePage;
