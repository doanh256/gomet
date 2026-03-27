import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    key: 'spicy',
    title: 'Vị Cay',
    subtitle: 'Mức độ yêu thích của bạn?',
    emoji: '🌶️',
    type: 'rating',
    options: [
      { id: 1, label: '1', desc: 'Không cay' },
      { id: 2, label: '2', desc: 'Ít cay' },
      { id: 3, label: '3', desc: 'Vừa phải' },
      { id: 4, label: '4', desc: 'Cay nhiều' },
      { id: 5, label: '5', desc: 'Siêu cay' },
    ],
  },
  {
    key: 'flavor',
    title: 'Hương Vị',
    subtitle: 'Bạn thích vị nào nhất?',
    emoji: '😋',
    type: 'choice',
    multi: true,
    options: [
      { id: 'sweet', label: 'Ngọt', emoji: '🍯' },
      { id: 'salty', label: 'Mặn', emoji: '🧂' },
      { id: 'sour', label: 'Chua', emoji: '🍋' },
      { id: 'savory', label: 'Đậm đà', emoji: '🍜' },
      { id: 'bitter', label: 'Đắng', emoji: '☕' },
      { id: 'fresh', label: 'Thanh mát', emoji: '🥗' },
    ],
  },
  {
    key: 'cuisine',
    title: 'Ẩm Thực',
    subtitle: 'Bạn yêu thích ẩm thực nào?',
    emoji: '🍽️',
    type: 'choice',
    multi: true,
    options: [
      { id: 'vn', label: 'Việt Nam', emoji: '🇻🇳' },
      { id: 'jp', label: 'Nhật Bản', emoji: '🇯🇵' },
      { id: 'kr', label: 'Hàn Quốc', emoji: '🇰🇷' },
      { id: 'th', label: 'Thái Lan', emoji: '🇹🇭' },
      { id: 'it', label: 'Ý', emoji: '🇮🇹' },
      { id: 'cn', label: 'Trung Hoa', emoji: '🇨🇳' },
    ],
  },
  {
    key: 'diet',
    title: 'Chế Độ Ăn',
    subtitle: 'Bạn có yêu cầu đặc biệt không?',
    emoji: '🥦',
    type: 'choice',
    multi: true,
    options: [
      { id: 'none', label: 'Không có', emoji: '✅' },
      { id: 'veg', label: 'Chay', emoji: '🌿' },
      { id: 'vegan', label: 'Thuần chay', emoji: '🥑' },
      { id: 'halal', label: 'Halal', emoji: '☪️' },
      { id: 'glutenfree', label: 'Không gluten', emoji: '🌾' },
      { id: 'dairyfree', label: 'Không sữa', emoji: '🥛' },
    ],
  },
  {
    key: 'budget',
    title: 'Ngân Sách',
    subtitle: 'Chi phí mỗi bữa ăn của bạn?',
    emoji: '💰',
    type: 'choice',
    multi: false,
    options: [
      { id: 'low', label: 'Tiết kiệm', desc: 'Dưới 100K', emoji: '🪙' },
      { id: 'mid', label: 'Trung bình', desc: '100K – 300K', emoji: '💵' },
      { id: 'high', label: 'Thoải mái', desc: '300K – 500K', emoji: '💳' },
      { id: 'premium', label: 'Không giới hạn', desc: 'Trên 500K', emoji: '💎' },
    ],
  },
];

const FOOD_EMOJIS = ['🌶️', '😋', '🍽️', '🥦', '💰'];

const TasteQuizPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const question = QUESTIONS[currentStep];
  const isLast = currentStep === QUESTIONS.length - 1;
  const progress = (currentStep + 1) / QUESTIONS.length;

  const getSelected = () => selectedAnswers[question.key];

  const toggleAnswer = (id) => {
    const key = question.key;
    if (question.type === 'rating') {
      setSelectedAnswers({ ...selectedAnswers, [key]: id });
    } else if (question.multi) {
      const current = selectedAnswers[key] || [];
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      setSelectedAnswers({ ...selectedAnswers, [key]: next });
    } else {
      setSelectedAnswers({ ...selectedAnswers, [key]: id });
    }
  };

  const isOptionSelected = (id) => {
    const sel = getSelected();
    if (!sel) return false;
    if (Array.isArray(sel)) return sel.includes(id);
    return sel === id;
  };

  const canProceed = () => {
    const sel = getSelected();
    if (!sel) return false;
    if (Array.isArray(sel)) return sel.length > 0;
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (isLast) {
      navigate('/app/profile');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    else navigate(-1);
  };

  const handleSkip = () => {
    if (isLast) {
      navigate('/app/profile');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderRating = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 4px',
    }}>
      {question.options.map((opt) => {
        const sel = isOptionSelected(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggleAnswer(opt.id)}
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: sel ? '#ad2c00' : '#f6f3f2',
              color: sel ? '#ffffff' : '#5d4038',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 0,
              boxShadow: sel ? '0 8px 20px rgba(173,44,0,0.25)' : 'none',
              transform: sel ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.18s ease',
              flexShrink: 0,
            }}
          >
            <span style={{ lineHeight: 1 }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );

  const renderRatingLabels = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 6px 0',
    }}>
      {question.options.map((opt) => (
        <span key={opt.id} style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 10,
          color: '#5d4038',
          textAlign: 'center',
          width: 52,
          lineHeight: 1.2,
        }}>
          {opt.desc}
        </span>
      ))}
    </div>
  );

  const renderChoiceGrid = () => {
    const cols = question.options.length <= 4 ? 2 : 3;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 10,
      }}>
        {question.options.map((opt) => {
          const sel = isOptionSelected(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggleAnswer(opt.id)}
              style={{
                backgroundColor: sel ? '#ffdbd1' : '#f6f3f2',
                border: sel ? '2px solid #ad2c00' : '2px solid transparent',
                borderRadius: 16,
                padding: '14px 8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.18s ease',
                transform: sel ? 'scale(0.97)' : 'scale(1)',
              }}
            >
              {opt.emoji && (
                <span style={{ fontSize: 26, lineHeight: 1 }}>{opt.emoji}</span>
              )}
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: sel ? '#ad2c00' : '#1c1b1b',
                lineHeight: 1.2,
                textAlign: 'center',
              }}>
                {opt.label}
              </span>
              {opt.desc && (
                <span style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10,
                  color: sel ? '#ad2c00' : '#5d4038',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}>
                  {opt.desc}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fcf9f8',
      color: '#1c1b1b',
      fontFamily: "'Manrope', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      <div style={{
        position: 'fixed',
        top: -96,
        right: -96,
        width: 256,
        height: 256,
        background: 'rgba(173,44,0,0.05)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: -128,
        width: 320,
        height: 320,
        background: 'rgba(0,93,170,0.03)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 32px 140px',
        maxWidth: 448,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1,
      }}>
        <header style={{ marginBottom: 48 }}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 32,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#1c1b1b',
            marginBottom: 10,
            margin: '0 0 10px 0',
          }}>
            Khám phá{' '}
            <span style={{ color: '#ad2c00' }}>Khẩu vị</span>{' '}
            của Bạn
          </h1>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 17,
            lineHeight: 1.6,
            color: '#5d4038',
            opacity: 0.85,
            margin: 0,
          }}>
            Chọn những hương vị khiến bạn xao xuyến.
          </p>
        </header>

        <div style={{
          display: 'flex',
          gap: 6,
          marginBottom: 40,
          height: 6,
        }}>
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: 9999,
                backgroundColor: i <= currentStep ? '#ad2c00' : '#e5e2e1',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>

        <div style={{ position: 'relative', flexGrow: 1 }}>
          <div style={{
            position: 'absolute',
            top: 16,
            right: -8,
            left: -8,
            height: '100%',
            backgroundColor: '#ebe7e7',
            borderRadius: 16,
            zIndex: 0,
            opacity: 0.6,
            transform: 'scale(0.96)',
            transformOrigin: 'bottom',
          }} />
          <div style={{
            position: 'absolute',
            top: 32,
            right: -16,
            left: -16,
            height: '100%',
            backgroundColor: '#f0edec',
            borderRadius: 16,
            zIndex: -1,
            opacity: 0.3,
            transform: 'scale(0.92)',
            transformOrigin: 'bottom',
          }} />

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
            position: 'relative',
            zIndex: 1,
          }}>
            <div style={{
              aspectRatio: '4/3',
              borderRadius: 12,
              overflow: 'hidden',
              marginBottom: 24,
              backgroundColor: '#f0edec',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 12,
            }}>
              <span style={{ fontSize: 72, lineHeight: 1 }}>
                {FOOD_EMOJIS[currentStep]}
              </span>
              <div style={{
                display: 'flex',
                gap: 8,
                opacity: 0.4,
              }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#ad2c00',
                  }} />
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: '#1c1b1b',
                marginBottom: 6,
                margin: '0 0 6px 0',
              }}>
                {question.title}
              </h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 11,
                color: '#5d4038',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                {question.subtitle}
              </p>
            </div>

            {question.type === 'rating' ? (
              <>
                {renderRating()}
                {renderRatingLabels()}
              </>
            ) : (
              renderChoiceGrid()
            )}

            {question.multi && (
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 11,
                color: '#5d4038',
                textAlign: 'center',
                marginTop: 14,
                marginBottom: 0,
                opacity: 0.7,
              }}>
                Có thể chọn nhiều
              </p>
            )}
          </div>
        </div>
      </main>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '48px 32px 40px',
        background: 'linear-gradient(to top, #fcf9f8 60%, transparent)',
        zIndex: 10,
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: 448,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}>
            <button
              onClick={handleBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#5d4038',
                fontFamily: "'Manrope', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '8px 0',
                opacity: currentStep === 0 ? 0.35 : 1,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
              Quay lại
            </button>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: '#5d4038',
              letterSpacing: '0.08em',
            }}>
              {currentStep + 1} / {QUESTIONS.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              width: '100%',
              padding: '20px 0',
              backgroundColor: canProceed() ? '#ad2c00' : '#ebe7e7',
              color: canProceed() ? '#ffffff' : '#5d4038',
              border: 'none',
              borderRadius: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              cursor: canProceed() ? 'pointer' : 'default',
              boxShadow: canProceed() ? '0 12px 24px rgba(173,44,0,0.2)' : 'none',
              transition: 'all 0.2s ease',
              letterSpacing: '-0.01em',
            }}
          >
            {isLast ? 'Hoàn thành' : 'Tiếp theo'}
          </button>

          <button
            onClick={handleSkip}
            style={{
              width: '100%',
              padding: '16px 0',
              background: 'none',
              border: 'none',
              color: '#1c1b1b',
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              opacity: 0.5,
              transition: 'opacity 0.2s ease',
            }}
          >
            Bỏ qua bước này
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasteQuizPage;
