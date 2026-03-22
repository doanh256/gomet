import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const foodItems = [
  'Pho', 'Bun cha', 'Com tam', 'Sushi', 'Pizza', 'Pasta',
  'Salad', 'BBQ', 'Dimsum', 'Lau', 'Banh mi', 'Dessert',
];

const dietOptions = [
  'Khong kieng cu', 'An chay', 'Khong gluten', 'Halal', 'Keto',
];

const priceOptions = [
  { symbol: '$', label: 'Binh dan', range: '<100k' },
  { symbol: '$$', label: 'Trung cap', range: '100-300k' },
  { symbol: '$$$', label: 'Cao cap', range: '300k+' },
];

const allergyItems = [
  'Hai san', 'Dau phong', 'Sua', 'Trung', 'Khong co',
];

const experienceOptions = [
  { icon: 'local_cafe', label: 'Am cung' },
  { icon: 'dinner_dining', label: 'Sang trong' },
  { icon: 'celebration', label: 'Vui nhon' },
];

const FoodPreferencePage = () => {
  const navigate = useNavigate();
  const [selectedFoods, setSelectedFoods] = useState(['Pho', 'Sushi', 'Lau']);
  const [selectedDiet, setSelectedDiet] = useState('Khong kieng cu');
  const [selectedPrice, setSelectedPrice] = useState('$$');
  const [selectedAllergies, setSelectedAllergies] = useState(['Khong co']);
  const [selectedExperiences, setSelectedExperiences] = useState(['Am cung']);

  const toggleFood = (item) => {
    setSelectedFoods(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const toggleAllergy = (item) => {
    if (item === 'Khong co') {
      setSelectedAllergies(['Khong co']);
    } else {
      setSelectedAllergies(prev => {
        const without = prev.filter(a => a !== 'Khong co');
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
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
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
      borderRadius: 'var(--radius)',
      fontSize: 13,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: '1.5px solid var(--outline-variant)',
      backgroundColor: 'var(--surface-container-lowest)',
      color: 'var(--on-surface)',
    },
    chipActive: {
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: '1.5px solid transparent',
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
      borderRadius: 'var(--radius-full)',
      fontSize: 13,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      cursor: 'pointer',
      border: '1.5px solid var(--outline-variant)',
      backgroundColor: 'var(--surface-container-lowest)',
      color: 'var(--on-surface)',
    },
    dietActive: {
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: '1.5px solid transparent',
    },
    priceRow: {
      display: 'flex',
      gap: 12,
    },
    priceCard: {
      flex: 1,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px 12px',
      textAlign: 'center',
      cursor: 'pointer',
      border: '2px solid var(--outline-variant)',
      boxShadow: 'var(--card-shadow)',
    },
    priceCardActive: {
      border: '2px solid var(--primary)',
      backgroundColor: 'var(--primary-fixed)',
    },
    priceSymbol: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--primary)',
      marginBottom: 6,
    },
    priceLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    priceRange: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
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
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px 12px',
      textAlign: 'center',
      cursor: 'pointer',
      border: '2px solid var(--outline-variant)',
      boxShadow: 'var(--card-shadow)',
    },
    expCardActive: {
      border: '2px solid var(--primary)',
      backgroundColor: 'var(--primary-fixed)',
    },
    expIcon: {
      fontSize: 32,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    expLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    saveBtn: {
      width: '100%',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '18px 24px',
      fontSize: 18,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      boxShadow: 'var(--editorial-shadow)',
      marginTop: 32,
      marginBottom: 16,
    },
    progressSection: {
      textAlign: 'center',
    },
    progressLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 10,
    },
    progressTrack: {
      height: 10,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.4s ease',
    },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>restaurant</span>
        <h1 style={s.heading}>Ho so am thuc</h1>
        <div style={s.subtitle}>Cho chung toi biet khau vi cua ban</div>
      </div>

      {/* Favorite Foods */}
      <div style={s.sectionTitle}>Mon yeu thich</div>
      <div style={s.chipsGrid}>
        {foodItems.map(item => {
          const active = selectedFoods.includes(item);
          return (
            <div
              key={item}
              style={{ ...s.chip, ...(active ? s.chipActive : {}) }}
              onClick={() => toggleFood(item)}
            >
              {active && <span className="material-symbols-outlined" style={s.chipCheck}>check</span>}
              {item}
            </div>
          );
        })}
      </div>

      {/* Diet */}
      <div style={s.sectionTitle}>Che do an</div>
      <div style={s.dietRow}>
        {dietOptions.map(item => {
          const active = selectedDiet === item;
          return (
            <div
              key={item}
              style={{ ...s.dietChip, ...(active ? s.dietActive : {}) }}
              onClick={() => setSelectedDiet(item)}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Price Preference */}
      <div style={s.sectionTitle}>Muc gia uu thich</div>
      <div style={s.priceRow}>
        {priceOptions.map(opt => {
          const active = selectedPrice === opt.symbol;
          return (
            <div
              key={opt.symbol}
              style={{ ...s.priceCard, ...(active ? s.priceCardActive : {}) }}
              onClick={() => setSelectedPrice(opt.symbol)}
            >
              <div style={s.priceSymbol}>{opt.symbol}</div>
              <div style={s.priceLabel}>{opt.label}</div>
              <div style={s.priceRange}>{opt.range}</div>
            </div>
          );
        })}
      </div>

      {/* Allergies */}
      <div style={s.sectionTitle}>Di ung thuc pham</div>
      <div style={s.allergyRow}>
        {allergyItems.map(item => {
          const active = selectedAllergies.includes(item);
          return (
            <div
              key={item}
              style={{ ...s.dietChip, ...(active ? s.dietActive : {}) }}
              onClick={() => toggleAllergy(item)}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Experience Preference */}
      <div style={s.sectionTitle}>Trai nghiem mong muon</div>
      <div style={s.expRow}>
        {experienceOptions.map(opt => {
          const active = selectedExperiences.includes(opt.label);
          return (
            <div
              key={opt.label}
              style={{ ...s.expCard, ...(active ? s.expCardActive : {}) }}
              onClick={() => toggleExperience(opt.label)}
            >
              <span className="material-symbols-outlined" style={s.expIcon}>{opt.icon}</span>
              <div style={s.expLabel}>{opt.label}</div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <button style={s.saveBtn}>Luu thay doi</button>

      {/* Progress */}
      <div style={s.progressSection}>
        <div style={s.progressLabel}>Ho so am thuc cua ban: {progress}% hoan thanh</div>
        <div style={s.progressTrack}>
          <div style={{ ...s.progressFill, width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default FoodPreferencePage;
