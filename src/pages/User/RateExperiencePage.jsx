import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RateExperiencePage = () => {
  const navigate = useNavigate();
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({
    conversation: 0,
    punctuality: 0,
    meetAgain: 0,
  });
  const [comment, setComment] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleCategoryRating = (key, value) => {
    setCategoryRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    navigate(-1);
  };

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 560,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 32,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 8,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    partnerCard: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: 20,
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      marginBottom: 32,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--on-primary)',
      fontSize: 24,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      flexShrink: 0,
    },
    partnerName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    partnerDetail: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 12,
    },
    overallStars: {
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 8,
    },
    starIcon: {
      fontSize: 40,
      cursor: 'pointer',
      transition: 'transform 0.15s ease, color 0.15s ease',
    },
    starActive: {
      color: '#f5a623',
      fontVariationSettings: "'FILL' 1",
    },
    starInactive: {
      color: 'var(--outline-variant)',
    },
    ratingCount: {
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      marginBottom: 24,
    },
    categoryRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid var(--outline-variant)',
    },
    categoryLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--on-surface)',
    },
    categoryStars: {
      display: 'flex',
      gap: 4,
    },
    smallStar: {
      fontSize: 22,
      cursor: 'pointer',
      transition: 'color 0.15s ease',
    },
    textareaWrap: {
      position: 'relative',
    },
    textarea: {
      width: '100%',
      minHeight: 120,
      padding: 16,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface)',
      backgroundColor: 'var(--surface-container-lowest)',
      border: '1.5px solid var(--outline-variant)',
      borderRadius: 'var(--radius)',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.2s ease',
    },
    charCount: {
      textAlign: 'right',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: comment.length > 450 ? 'var(--error)' : 'var(--on-surface-variant)',
      marginTop: 6,
    },
    toggleRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      marginBottom: 32,
    },
    toggleLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--on-surface)',
    },
    toggleTrack: {
      width: 48,
      height: 26,
      borderRadius: 'var(--radius-full)',
      backgroundColor: anonymous ? 'var(--primary)' : 'var(--outline-variant)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    toggleThumb: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--on-primary)',
      position: 'absolute',
      top: 3,
      left: anonymous ? 25 : 3,
      transition: 'left 0.2s ease',
    },
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
      marginBottom: 16,
      boxShadow: 'var(--editorial-shadow)',
    },
    skipLink: {
      display: 'block',
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      padding: 8,
    },
  };

  const categories = [
    { key: 'conversation', label: 'Cuoc tro chuyen' },
    { key: 'punctuality', label: 'Su dung gio' },
    { key: 'meetAgain', label: 'Muon gap lai?' },
  ];

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.heading}>Danh gia trai nghiem</h1>
        <p style={s.subtitle}>Chia se cam nhan cua ban ve buoi hen</p>
      </div>

      <div style={s.partnerCard}>
        <div style={s.avatar}>M</div>
        <div>
          <div style={s.partnerName}>Minh Anh</div>
          <div style={s.partnerDetail}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
            The Coffee House - Nguyen Hue
          </div>
          <div style={{ ...s.partnerDetail, marginTop: 2 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
            20/03/2026
          </div>
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Danh gia tong the</div>
        <div style={s.overallStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="material-symbols-outlined"
              style={{
                ...s.starIcon,
                ...(star <= overallRating ? s.starActive : s.starInactive),
                transform: star <= overallRating ? 'scale(1.1)' : 'scale(1)',
              }}
              onClick={() => setOverallRating(star)}
            >
              {star <= overallRating ? 'star' : 'star_border'}
            </span>
          ))}
        </div>
        <div style={s.ratingCount}>
          {overallRating > 0 ? `${overallRating}/5 sao` : 'Cham de danh gia'}
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Danh gia chi tiet</div>
        {categories.map((cat) => (
          <div key={cat.key} style={s.categoryRow}>
            <span style={s.categoryLabel}>{cat.label}</span>
            <div style={s.categoryStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="material-symbols-outlined"
                  style={{
                    ...s.smallStar,
                    ...(star <= categoryRatings[cat.key] ? s.starActive : s.starInactive),
                  }}
                  onClick={() => handleCategoryRating(cat.key, star)}
                >
                  {star <= categoryRatings[cat.key] ? 'star' : 'star_border'}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Nhan xet</div>
        <div style={s.textareaWrap}>
          <textarea
            style={s.textarea}
            placeholder="Chia se cam nhan cua ban..."
            value={comment}
            onChange={(e) => {
              if (e.target.value.length <= 500) setComment(e.target.value);
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--outline-variant)')}
          />
        </div>
        <div style={s.charCount}>{comment.length}/500</div>
      </div>

      <div style={s.toggleRow}>
        <div style={s.toggleLabel}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>
            visibility_off
          </span>
          Gui an danh
        </div>
        <div style={s.toggleTrack} onClick={() => setAnonymous(!anonymous)}>
          <div style={s.toggleThumb} />
        </div>
      </div>

      <button style={s.submitBtn} onClick={handleSubmit}>
        Gui danh gia
      </button>
      <button style={s.skipLink} onClick={() => navigate(-1)}>
        Bo qua
      </button>
    </div>
  );
};

export default RateExperiencePage;
