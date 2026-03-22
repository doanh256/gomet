import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const moods = [
  { emoji: '\u{1F60A}', label: 'Vui ve' },
  { emoji: '\u{1F60D}', label: 'Dang yeu' },
  { emoji: '\u{1F929}', label: 'Phau khich' },
  { emoji: '\u{1F60C}', label: 'Binh yen' },
  { emoji: '\u{1F970}', label: 'Hanh phuc' },
  { emoji: '\u{1F60E}', label: 'Tu tin' },
  { emoji: '\u{1F914}', label: 'Suy tu' },
  { emoji: '\u{1F634}', label: 'Met moi' },
  { emoji: '\u{1F97A}', label: 'Co don' },
];

const activities = [
  { icon: 'coffee', label: 'Ca phe' },
  { icon: 'movie', label: 'Xem phim' },
  { icon: 'restaurant', label: 'An uong' },
  { icon: 'sports_soccer', label: 'The thao' },
  { icon: 'directions_walk', label: 'Dao pho' },
  { icon: 'menu_book', label: 'Doc sach' },
];

const MoodStatusPage = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 560,
      margin: '0 auto',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--on-surface)',
      textAlign: 'center',
      marginBottom: 32,
    },
    moodGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      marginBottom: 36,
    },
    moodCard: (isSelected) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '20px 12px',
      backgroundColor: isSelected ? 'var(--primary-fixed)' : 'var(--surface-container-lowest)',
      border: isSelected ? '2px solid var(--primary)' : '2px solid transparent',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: isSelected ? 'var(--editorial-shadow)' : 'var(--card-shadow)',
    }),
    moodEmoji: {
      fontSize: 36,
      lineHeight: 1,
    },
    moodLabel: (isSelected) => ({
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: isSelected ? 600 : 500,
      color: isSelected ? 'var(--primary)' : 'var(--on-surface-variant)',
    }),
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    chipsScroll: {
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      paddingBottom: 8,
      marginBottom: 36,
      scrollbarWidth: 'none',
    },
    chip: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '10px 18px',
      backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-container-high)',
      color: isSelected ? 'var(--on-primary)' : 'var(--on-surface)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      transition: 'all 0.2s ease',
    }),
    submitBtn: {
      width: '100%',
      padding: '16px 0',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: 'var(--editorial-shadow)',
      marginBottom: 24,
    },
    preview: {
      textAlign: 'center',
      padding: '20px 24px',
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
    },
    previewLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginBottom: 8,
    },
    previewContent: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
  };

  const selectedMoodData = selectedMood !== null ? moods[selectedMood] : null;
  const selectedActivityData = selectedActivity !== null ? activities[selectedActivity] : null;

  return (
    <div style={s.page}>
      <h1 style={s.heading}>Hom nay ban cam thay the nao?</h1>

      <div style={s.moodGrid}>
        {moods.map((mood, i) => (
          <div
            key={i}
            style={s.moodCard(selectedMood === i)}
            onClick={() => setSelectedMood(i)}
          >
            <span style={s.moodEmoji}>{mood.emoji}</span>
            <span style={s.moodLabel(selectedMood === i)}>{mood.label}</span>
          </div>
        ))}
      </div>

      <div style={s.sectionTitle}>Hoat dong ban muon lam</div>
      <div style={s.chipsScroll}>
        {activities.map((act, i) => (
          <button
            key={i}
            style={s.chip(selectedActivity === i)}
            onClick={() => setSelectedActivity(selectedActivity === i ? null : i)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{act.icon}</span>
            {act.label}
          </button>
        ))}
      </div>

      <button
        style={{
          ...s.submitBtn,
          opacity: selectedMood !== null ? 1 : 0.5,
          pointerEvents: selectedMood !== null ? 'auto' : 'none',
        }}
        onClick={() => navigate(-1)}
      >
        Cap nhat trang thai
      </button>

      {(selectedMoodData || selectedActivityData) && (
        <div style={s.preview}>
          <div style={s.previewLabel}>Nguoi khac se thay:</div>
          <div style={s.previewContent}>
            {selectedMoodData ? `${selectedMoodData.emoji} ${selectedMoodData.label}` : ''}
            {selectedMoodData && selectedActivityData ? ' - ' : ''}
            {selectedActivityData ? selectedActivityData.label : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodStatusPage;
