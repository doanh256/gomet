import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { useAppContext } from '../../AppContext';

const INTERESTS = [
  'Ca phe', 'Du lich', 'Am nhac', 'The thao', 'Nau an', 'Doc sach',
  'Phim anh', 'Cong nghe', 'Nghe thuat', 'Thu cung', 'Yoga', 'Gaming',
];

const GENDERS = [
  { value: 'Nam', icon: 'person', label: 'Nam' },
  { value: 'Nu', icon: 'person_2', label: 'Nu' },
  { value: 'Khac', icon: 'diversity_1', label: 'Khac' },
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

  // Show confetti on step 4
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setShowConfetti(true), 200);
      return () => clearTimeout(timer);
    }
    setShowConfetti(false);
  }, [step]);

  // Inject keyframes
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

  // Confetti elements
  const confettiColors = ['var(--primary)', 'var(--primary-container)', 'var(--tertiary)', 'var(--tertiary-container)', '#FFD700', '#4CAF50'];
  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 3}s`,
    color: confettiColors[i % confettiColors.length],
    size: 6 + Math.random() * 8,
  }));

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)',
      position: 'relative',
      overflow: 'hidden',
    },
    progressTrack: {
      height: '4px',
      backgroundColor: 'var(--surface-container-high)',
      position: 'relative',
    },
    progressFill: {
      height: '100%',
      width: `${progressPercent}%`,
      background: 'var(--primary-gradient)',
      borderRadius: '0 4px 4px 0',
      transition: 'width 0.4s cubic-bezier(.4,0,.2,1)',
    },
    content: {
      flex: 1,
      padding: '32px 24px',
      maxWidth: '480px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    },
    stepLabel: {
      textAlign: 'center',
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      marginBottom: '4px',
      fontWeight: 600,
    },
    stepDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '24px',
    },
    dot: (active, completed) => ({
      width: active ? '24px' : '8px',
      height: '8px',
      borderRadius: 'var(--radius-full)',
      background: active ? 'var(--primary-gradient)' : completed ? 'var(--primary)' : 'var(--surface-container-highest)',
      transition: 'all 0.3s ease',
    }),
    heading: {
      fontSize: '26px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      textAlign: 'center',
      marginBottom: '8px',
      fontFamily: 'var(--font-headline)',
    },
    subtitle: {
      textAlign: 'center',
      color: 'var(--on-surface-variant)',
      fontSize: '14px',
      marginBottom: '32px',
    },
    label: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: '10px',
      display: 'block',
    },
    genderGrid: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
    },
    genderCard: (selected) => ({
      flex: 1,
      padding: '20px 12px',
      borderRadius: 'var(--radius)',
      border: `2px solid ${selected ? 'var(--primary)' : 'var(--outline-variant)'}`,
      backgroundColor: selected ? 'var(--primary-fixed)' : 'var(--surface-container-lowest)',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }),
    genderIcon: (selected) => ({
      fontSize: '32px',
      color: selected ? 'var(--primary)' : 'var(--on-surface-variant)',
    }),
    genderLabel: (selected) => ({
      fontSize: '14px',
      fontWeight: 600,
      color: selected ? 'var(--primary)' : 'var(--on-surface)',
    }),
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      border: '2px solid var(--outline-variant)',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      backgroundColor: 'var(--surface-container-lowest)',
      color: 'var(--on-surface)',
      transition: 'border-color 0.2s',
    },
    inputWithIcon: {
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: 'var(--on-surface-variant)',
    },
    // Step 2 - Avatar
    uploadArea: (dragActive) => ({
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      margin: '0 auto 24px',
      border: `3px dashed ${dragActive ? 'var(--primary)' : 'var(--outline-variant)'}`,
      backgroundColor: dragActive ? 'var(--primary-fixed)' : 'var(--surface-container-low)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      overflow: 'hidden',
      transition: 'all 0.2s',
    }),
    uploadIcon: {
      fontSize: '48px',
      color: 'var(--outline-variant)',
      marginBottom: '4px',
    },
    uploadText: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      textAlign: 'center',
      padding: '0 16px',
    },
    avatarImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    uploadBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      margin: '0 auto',
      padding: '10px 24px',
      borderRadius: 'var(--radius-full)',
      border: '2px solid var(--outline-variant)',
      backgroundColor: 'var(--surface-container-lowest)',
      color: 'var(--on-surface)',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
    },
    // Step 3 - Bio
    textarea: {
      width: '100%',
      minHeight: '120px',
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      border: '2px solid var(--outline-variant)',
      fontSize: '15px',
      resize: 'vertical',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      backgroundColor: 'var(--surface-container-lowest)',
      color: 'var(--on-surface)',
      lineHeight: 1.6,
    },
    charCount: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      textAlign: 'right',
      marginTop: '4px',
    },
    interestGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '12px',
    },
    interestChip: (selected) => ({
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      border: `2px solid ${selected ? 'var(--primary)' : 'var(--outline-variant)'}`,
      backgroundColor: selected ? 'var(--primary-fixed)' : 'var(--surface-container-lowest)',
      color: selected ? 'var(--primary)' : 'var(--on-surface-variant)',
      fontWeight: 600,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.15s',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }),
    // Step 4 - Success
    successContainer: {
      textAlign: 'center',
      paddingTop: '40px',
      animation: 'fadeSlideUp 0.5s ease forwards',
    },
    checkCircle: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      animation: 'checkPop 0.6s cubic-bezier(.4,0,.2,1) forwards',
      boxShadow: '0 8px 32px rgba(174,47,52,0.3)',
    },
    successHeading: {
      fontSize: '28px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-headline)',
      marginBottom: '8px',
    },
    successSubtext: {
      color: 'var(--on-surface-variant)',
      fontSize: '15px',
      lineHeight: 1.6,
      marginBottom: '40px',
    },
    // Navigation
    navRow: (isFirst) => ({
      display: 'flex',
      justifyContent: isFirst ? 'flex-end' : 'space-between',
      alignItems: 'center',
      marginTop: '40px',
      gap: '12px',
    }),
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--on-surface-variant)',
      fontSize: '15px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '12px 8px',
    },
    nextBtn: (disabled) => ({
      background: disabled ? 'var(--surface-container-highest)' : 'var(--primary-gradient)',
      color: disabled ? 'var(--on-surface-variant)' : 'var(--on-primary)',
      border: 'none',
      padding: '14px 32px',
      borderRadius: 'var(--radius-full)',
      fontWeight: 700,
      fontSize: '15px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: disabled ? 'none' : '0 4px 16px rgba(174,47,52,0.25)',
      transition: 'all 0.2s',
    }),
    skipLink: {
      background: 'none',
      border: 'none',
      color: 'var(--on-surface-variant)',
      fontSize: '13px',
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      padding: '8px 0',
    },
    confettiPiece: (piece) => ({
      position: 'fixed',
      top: '-20px',
      left: piece.left,
      width: `${piece.size}px`,
      height: `${piece.size}px`,
      borderRadius: piece.id % 2 === 0 ? '50%' : '2px',
      backgroundColor: piece.color,
      animation: `confettiFall ${piece.duration} ${piece.delay} ease-in forwards`,
      pointerEvents: 'none',
      zIndex: 10,
    }),
  };

  return (
    <div style={s.page}>
      {/* Confetti */}
      {showConfetti && confettiPieces.map(piece => (
        <div key={piece.id} style={s.confettiPiece(piece)} />
      ))}

      {/* Progress bar */}
      <div style={s.progressTrack}>
        <div style={s.progressFill} />
      </div>

      <div style={s.content}>
        {/* Step indicator dots */}
        <p style={s.stepLabel}>Buoc {step}/{totalSteps}</p>
        <div style={s.stepDots}>
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={s.dot(n === step, n < step)} />
          ))}
        </div>

        {/* ====== Step 1: Gender & Age ====== */}
        {step === 1 && (
          <div>
            <h1 style={s.heading}>Gioi tinh & Tuoi</h1>
            <p style={s.subtitle}>Giup moi nguoi hieu hon ve ban</p>

            <label style={s.label}>Gioi tinh</label>
            <div style={s.genderGrid}>
              {GENDERS.map(g => (
                <div
                  key={g.value}
                  style={s.genderCard(gender === g.value)}
                  onClick={() => setGender(g.value)}
                >
                  <span className="material-symbols-outlined" style={s.genderIcon(gender === g.value)}>
                    {g.icon}
                  </span>
                  <span style={s.genderLabel(gender === g.value)}>{g.label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={s.label}>Tuoi</label>
              <input
                type="number"
                min="18"
                max="99"
                placeholder="VD: 25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={s.input}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--outline-variant)'; }}
              />
            </div>

            <div>
              <label style={s.label}>Vi tri</label>
              <div style={s.inputWithIcon}>
                <span className="material-symbols-outlined" style={s.inputIcon}>location_on</span>
                <input
                  type="text"
                  placeholder="VD: Ha Noi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ ...s.input, paddingLeft: '42px' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--outline-variant)'; }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ====== Step 2: Avatar Upload ====== */}
        {step === 2 && (
          <div>
            <h1 style={s.heading}>Anh dai dien</h1>
            <p style={s.subtitle}>Chon anh dep nhat cua ban</p>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              style={s.uploadArea(dragOver)}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" style={s.avatarImg} />
              ) : (
                <>
                  <span className="material-symbols-outlined" style={s.uploadIcon}>photo_camera</span>
                  <span style={s.uploadText}>Keo tha hoac nhan de chon</span>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            {!avatarPreview ? (
              <button
                style={s.uploadBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>cloud_upload</span>
                Tai anh len
              </button>
            ) : (
              <button
                style={{ ...s.uploadBtn, color: 'var(--error)', borderColor: 'var(--error)' }}
                onClick={() => { setAvatarFile(null); setAvatarPreview(''); }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                Xoa anh
              </button>
            )}
          </div>
        )}

        {/* ====== Step 3: Bio & Interests ====== */}
        {step === 3 && (
          <div>
            <h1 style={s.heading}>Gioi thieu ban than</h1>
            <p style={s.subtitle}>Chia se them ve minh nhe</p>

            <div style={{ marginBottom: '28px' }}>
              <label style={s.label}>Bio</label>
              <textarea
                placeholder="Viet vai dong ve ban than ban..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                style={s.textarea}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--outline-variant)'; }}
              />
              <p style={{
                ...s.charCount,
                color: bio.length >= 280 ? 'var(--error)' : 'var(--on-surface-variant)',
              }}>
                {bio.length}/300
              </p>
            </div>

            <div>
              <label style={s.label}>So thich</label>
              <div style={s.interestGrid}>
                {INTERESTS.map(interest => {
                  const selected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      style={s.interestChip(selected)}
                    >
                      {selected && (
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
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
          <div style={s.successContainer}>
            <div style={s.checkCircle}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--on-primary)' }}>check</span>
            </div>
            <h1 style={s.successHeading}>Chao mung den voi GOMET!</h1>
            <p style={s.successSubtext}>
              Ho so cua ban da san sang.<br />
              Hay bat dau kham pha va tim kiem nguoi phu hop!
            </p>
          </div>
        )}

        {/* ====== Navigation ====== */}
        <div style={s.navRow(step === 1)}>
          {/* Back button (steps 2-3) */}
          {step > 1 && step < 4 && (
            <button style={s.backBtn} onClick={prevStep}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              Quay lai
            </button>
          )}

          {/* Right side group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
            {/* Skip link (steps 2-3) */}
            {(step === 2 || step === 3) && (
              <button style={s.skipLink} onClick={nextStep}>
                Bo qua
              </button>
            )}

            {/* Continue button (steps 1-3) */}
            {step < 4 && (
              <button
                style={s.nextBtn(!canNext())}
                onClick={nextStep}
                disabled={!canNext()}
              >
                Tiep tuc
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </button>
            )}

            {/* Final button (step 4) */}
            {step === 4 && (
              <button
                style={s.nextBtn(saving)}
                onClick={handleComplete}
                disabled={saving}
              >
                {saving ? 'Dang luu...' : 'Bat dau kham pha'}
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {saving ? 'hourglass_empty' : 'explore'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
