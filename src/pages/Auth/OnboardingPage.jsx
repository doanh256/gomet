import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { useAppContext } from '../../AppContext';

const INTERESTS = [
  'Cà phê', 'Du lịch', 'Âm nhạc', 'Thể thao', 'Nấu ăn', 'Đọc sách',
  'Phim ảnh', 'Công nghệ', 'Nghệ thuật', 'Thú cưng', 'Yoga', 'Gaming',
];

const GENDERS = [
  { value: 'Nam', icon: 'person', label: 'Nam' },
  { value: 'Nữ', icon: 'person_2', label: 'Nữ' },
  { value: 'Khác', icon: 'diversity_1', label: 'Khác' },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAppContext();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setShowConfetti(true), 200);
      return () => clearTimeout(timer);
    }
    setShowConfetti(false);
  }, [step]);

  useEffect(() => {
    const styleId = 'onboarding-keyframes';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setAvatarPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const canNext = () => {
    if (step === 1) return gender && age && location;
    return true;
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      const data = {
        gender,
        age: parseInt(age, 10),
        location,
        bio,
        interests,
      };
      await api.put('/users/me', data);

      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        await api.upload('/users/me/avatar', formData);
      }

      await updateProfile(data);
      navigate('/app');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    if (step === totalSteps) handleComplete();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressPercent = (step / totalSteps) * 100;

  const confettiColors = ['#FFB59E', '#FF571A', '#FFD54F', '#117500', '#E6BEB2', '#FDF9F3'];
  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 3}s`,
    color: confettiColors[i % confettiColors.length],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#000000',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Confetti */}
      {showConfetti && confettiPieces.map(piece => (
        <div key={piece.id} style={{
          position: 'fixed', top: '-20px', left: piece.left,
          width: `${piece.size}px`, height: `${piece.size}px`,
          borderRadius: piece.id % 2 === 0 ? '50%' : '2px',
          backgroundColor: piece.color,
          animation: `confettiFall ${piece.duration} ${piece.delay} ease-in forwards`,
          pointerEvents: 'none', zIndex: 10,
        }} />
      ))}

      {/* Progress bar */}
      <div style={{ height: '4px', backgroundColor: '#1C1B1B', position: 'relative' }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
          borderRadius: '0 4px 4px 0',
          transition: 'width 0.4s cubic-bezier(.4,0,.2,1)',
        }} />
      </div>

      <div style={{
        flex: 1, padding: '32px 24px',
        maxWidth: '480px', margin: '0 auto',
        width: '100%', boxSizing: 'border-box',
      }}>
        {/* Step indicator */}
        <p style={{
          textAlign: 'center', fontSize: '13px', color: '#E6BEB2',
          marginBottom: '4px', fontWeight: 600,
        }}>
          Bước {step}/{totalSteps}
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px',
        }}>
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{
              width: n === step ? '24px' : '8px', height: '8px',
              borderRadius: '9999px',
              background: n === step
                ? 'linear-gradient(135deg, #FFB59E, #FF571A)'
                : n < step ? '#FFB59E' : '#353535',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* ====== Step 1: Gender & Age ====== */}
        {step === 1 && (
          <div>
            <h1 style={{
              fontSize: '2.25rem', fontWeight: 900, fontStyle: 'italic',
              color: '#FDF9F3', textAlign: 'center', marginBottom: '8px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Giới tính & <span style={{ color: '#FFB59E' }}>Tuổi</span>
            </h1>
            <p style={{
              textAlign: 'center', color: '#E6BEB2', fontSize: '14px', marginBottom: '32px',
            }}>
              Giúp mọi người hiểu hơn về bạn
            </p>

            <label style={{
              fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.15em', color: '#E6BEB2', marginBottom: '12px',
              display: 'block', fontFamily: "'Inter', sans-serif",
            }}>Giới tính</label>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              {GENDERS.map(g => {
                const selected = gender === g.value;
                return (
                  <div
                    key={g.value}
                    onClick={() => setGender(g.value)}
                    style={{
                      flex: 1, padding: '20px 12px',
                      borderRadius: '1.5rem',
                      backgroundColor: selected ? 'rgba(255,87,26,0.15)' : '#2A2A2A',
                      boxShadow: selected ? '0 0 0 2px #FFB59E' : 'none',
                      cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.2s ease',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: '8px',
                    }}
                  >
                    <span aria-hidden="true" className="material-symbols-outlined" style={{
                      fontSize: '32px', color: selected ? '#FFB59E' : '#E6BEB2',
                    }}>{g.icon}</span>
                    <span style={{
                      fontSize: '14px', fontWeight: 600,
                      color: selected ? '#FFB59E' : '#FDF9F3',
                    }}>{g.label}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.15em', color: '#E6BEB2', marginBottom: '10px',
                display: 'block',
              }}>Tuổi</label>
              <input
                type="number" min="18" max="99" placeholder="VD: 25"
                value={age} onChange={(e) => setAge(e.target.value)}
                style={{
                  width: '100%', height: '56px', padding: '0 16px',
                  borderRadius: '1rem', border: 'none',
                  fontSize: '16px', outline: 'none', boxSizing: 'border-box',
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: '#2A2A2A', color: '#FDF9F3',
                }}
                onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                onBlur={e => { e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label style={{
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.15em', color: '#E6BEB2', marginBottom: '10px',
                display: 'block',
              }}>Vị trí</label>
              <div style={{ position: 'relative' }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)', fontSize: '20px', color: '#E6BEB2',
                }}>location_on</span>
                <input
                  type="text" placeholder="VD: Hà Nội, TP.HCM..."
                  value={location} onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%', height: '56px', paddingLeft: '42px', paddingRight: '16px',
                    borderRadius: '1rem', border: 'none',
                    fontSize: '16px', outline: 'none', boxSizing: 'border-box',
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: '#2A2A2A', color: '#FDF9F3',
                  }}
                  onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ====== Step 2: Avatar Upload ====== */}
        {step === 2 && (
          <div>
            <h1 style={{
              fontSize: '2.25rem', fontWeight: 900, fontStyle: 'italic',
              color: '#FDF9F3', textAlign: 'center', marginBottom: '8px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Ảnh <span style={{ color: '#FFB59E' }}>đại diện</span>
            </h1>
            <p style={{
              textAlign: 'center', color: '#E6BEB2', fontSize: '14px', marginBottom: '32px',
            }}>
              Chọn ảnh đẹp nhất của bạn
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              style={{
                width: '200px', height: '200px', borderRadius: '50%',
                margin: '0 auto 24px',
                border: `3px dashed ${dragOver ? '#FFB59E' : '#353535'}`,
                backgroundColor: dragOver ? 'rgba(255,87,26,0.1)' : '#1C1B1B',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                }} />
              ) : (
                <>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{
                    fontSize: '48px', color: '#353535', marginBottom: '4px',
                  }}>photo_camera</span>
                  <span style={{
                    fontSize: '12px', color: '#E6BEB2', textAlign: 'center', padding: '0 16px',
                  }}>Kéo thả hoặc nhấn để chọn</span>
                </>
              )}
            </div>

            <input
              ref={fileInputRef} type="file" accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            {!avatarPreview ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', margin: '0 auto', padding: '10px 24px',
                  borderRadius: '9999px', border: 'none',
                  backgroundColor: '#2A2A2A', color: '#FDF9F3',
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>cloud_upload</span>
                Tải ảnh lên
              </button>
            ) : (
              <button
                onClick={() => { setAvatarFile(null); setAvatarPreview(''); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', margin: '0 auto', padding: '10px 24px',
                  borderRadius: '9999px', border: 'none',
                  backgroundColor: 'rgba(255,68,68,0.15)', color: '#FF6B6B',
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                Xóa ảnh
              </button>
            )}
          </div>
        )}

        {/* ====== Step 3: Bio & Interests ====== */}
        {step === 3 && (
          <div>
            <h1 style={{
              fontSize: '2.25rem', fontWeight: 900, fontStyle: 'italic',
              color: '#FDF9F3', textAlign: 'center', marginBottom: '8px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Giới thiệu <span style={{ color: '#FFB59E' }}>bản thân</span>
            </h1>
            <p style={{
              textAlign: 'center', color: '#E6BEB2', fontSize: '14px', marginBottom: '32px',
            }}>
              Chia sẻ thêm về mình nhé
            </p>

            <div style={{ marginBottom: '28px' }}>
              <label style={{
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.15em', color: '#E6BEB2', marginBottom: '10px',
                display: 'block',
              }}>Bio</label>
              <textarea
                placeholder="Viết vài dòng về bản thân bạn..."
                value={bio} onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                style={{
                  width: '100%', minHeight: '120px', padding: '14px 16px',
                  borderRadius: '1rem', border: 'none',
                  fontSize: '15px', resize: 'vertical', outline: 'none',
                  boxSizing: 'border-box', fontFamily: "'Inter', sans-serif",
                  backgroundColor: '#2A2A2A', color: '#FDF9F3', lineHeight: 1.6,
                }}
                onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                onBlur={e => { e.target.style.boxShadow = 'none'; }}
              />
              <p style={{
                fontSize: '12px', textAlign: 'right', marginTop: '4px',
                color: bio.length >= 280 ? '#FF4444' : '#E6BEB2',
              }}>
                {bio.length}/300
              </p>
            </div>

            <div>
              <label style={{
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.15em', color: '#E6BEB2', marginBottom: '12px',
                display: 'block',
              }}>Sở thích</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {INTERESTS.map(interest => {
                  const selected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      style={{
                        padding: '8px 16px', borderRadius: '9999px',
                        border: 'none',
                        backgroundColor: selected ? '#FF571A' : '#353535',
                        color: selected ? '#3A0B00' : '#E6BEB2',
                        fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                        transition: 'all 0.15s',
                        display: 'flex', alignItems: 'center', gap: '4px',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {selected && (
                        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                      )}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ====== Step 4: Success ====== */}
        {step === 4 && (
          <div style={{
            textAlign: 'center', paddingTop: '40px',
            animation: 'fadeSlideUp 0.5s ease forwards',
          }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'checkPop 0.6s cubic-bezier(.4,0,.2,1) forwards',
              boxShadow: '0 8px 32px rgba(255,87,26,0.3)',
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '48px', color: '#3A0B00' }}>check</span>
            </div>
            <h1 style={{
              fontSize: '28px', fontWeight: 900, fontStyle: 'italic',
              color: '#FDF9F3', fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: '8px',
            }}>
              Chào mừng đến với <span style={{ color: '#FFB59E' }}>GOMET!</span>
            </h1>
            <p style={{
              color: '#E6BEB2', fontSize: '15px', lineHeight: 1.6, marginBottom: '40px',
            }}>
              Hồ sơ của bạn đã sẵn sàng.<br />
              Hãy bắt đầu khám phá và tìm kiếm người phù hợp!
            </p>
          </div>
        )}

        {/* ====== Navigation ====== */}
        <div style={{
          display: 'flex',
          justifyContent: step === 1 ? 'flex-end' : 'space-between',
          alignItems: 'center', marginTop: '40px', gap: '12px',
        }}>
          {step > 1 && step < 4 && (
            <button onClick={prevStep} style={{
              background: 'none', border: 'none', color: '#E6BEB2',
              fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px', padding: '12px 8px',
              fontFamily: "'Inter', sans-serif",
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              Quay lại
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
            {(step === 2 || step === 3) && (
              <button onClick={nextStep} style={{
                background: 'none', border: 'none', color: '#E6BEB2',
                fontSize: '13px', cursor: 'pointer', textDecoration: 'underline',
                textUnderlineOffset: '3px', padding: '8px 0',
                fontFamily: "'Inter', sans-serif",
              }}>
                Bỏ qua
              </button>
            )}

            {step < 4 && (
              <button
                onClick={nextStep} disabled={!canNext()}
                style={{
                  background: !canNext() ? '#353535' : 'linear-gradient(135deg, #FFB59E, #FF571A)',
                  color: !canNext() ? '#E6BEB2' : '#3A0B00',
                  border: 'none', padding: '14px 32px',
                  borderRadius: '9999px', fontWeight: 700, fontSize: '15px',
                  cursor: !canNext() ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: !canNext() ? 'none' : '0px 20px 40px rgba(0,0,0,0.4)',
                  transition: 'all 0.2s',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Tiếp tục
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </button>
            )}

            {step === 4 && (
              <button
                onClick={handleComplete} disabled={saving}
                style={{
                  background: saving ? '#353535' : 'linear-gradient(135deg, #FFB59E, #FF571A)',
                  color: saving ? '#E6BEB2' : '#3A0B00',
                  border: 'none', padding: '14px 32px',
                  borderRadius: '9999px', fontWeight: 700, fontSize: '15px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: saving ? 'none' : '0px 20px 40px rgba(0,0,0,0.4)',
                  transition: 'all 0.2s',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {saving ? 'Đang lưu...' : 'Bắt đầu khám phá'}
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {saving ? 'hourglass_empty' : 'explore'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder {
          color: #E6BEB2;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
};

export default OnboardingPage;
