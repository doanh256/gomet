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
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 560,
      margin: '0 auto',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 26,
      fontWeight: 800,
      color: '#FDF9F3',
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
      backgroundColor: isSelected ? 'rgba(255,181,158,0.15)' : '#1C1B1B',
      border: 'none',
      borderRadius: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: isSelected ? '0px 20px 40px rgba(0,0,0,0.4)' : 'none',
    }),
    moodEmoji: {
      fontSize: 36,
      lineHeight: 1,
    },
    moodLabel: (isSelected) => ({
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: isSelected ? 600 : 500,
      color: isSelected ? '#FFB59E' : '#E6BEB2',
    }),
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: '#FDF9F3',
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
      backgroundColor: isSelected ? '#FFB59E' : '#2A2A2A',
      color: isSelected ? '#3A0B00' : '#FDF9F3',
      border: 'none',
      borderRadius: '9999px',
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
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      marginBottom: 24,
    },
    preview: {
      textAlign: 'center',
      padding: '20px 24px',
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
    },
    previewLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
      marginBottom: 8,
    },
    previewContent: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
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
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>{act.icon}</span>
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
