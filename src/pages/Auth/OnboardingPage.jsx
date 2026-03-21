import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Camera, Check, MapPin, User as UserIcon } from 'lucide-react';
import { api } from '../../api/client';
import { useAppContext } from '../../AppContext';

const INTERESTS = [
  'Công nghệ', 'Nấu ăn', 'Coffee', 'Du lịch', 'Thể thao', 'Âm nhạc',
  'Phim ảnh', 'Đọc sách', 'Gaming', 'Nhiếp ảnh', 'Yoga', 'Thú cưng',
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

  const totalSteps = 4;

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
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const canNext = () => {
    if (step === 1) return gender && age && location;
    if (step === 2) return true;
    if (step === 3) return true;
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

  const pillBtn = (label, onClick, primary = true, disabled = false) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: primary ? 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)' : 'white',
        color: primary ? 'white' : '#505965',
        border: primary ? 'none' : '2px solid #e5e7eb',
        padding: '12px 32px',
        borderRadius: '30px',
        fontWeight: 600,
        fontSize: '15px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: primary ? '0 4px 16px rgba(253,80,104,0.3)' : 'none',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa', display: 'flex', flexDirection: 'column' }}>
      {/* Progress bar */}
      <div style={{ height: '4px', backgroundColor: '#e8e8e8' }}>
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #fd5068, #ff7854)',
            borderRadius: '0 4px 4px 0',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div style={{ flex: 1, padding: '32px 24px', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Step indicator */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#505965', marginBottom: '8px' }}>
          Bước {step}/{totalSteps}
        </p>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111418', textAlign: 'center', marginBottom: '8px' }}>
              Thông tin cơ bản
            </h1>
            <p style={{ textAlign: 'center', color: '#505965', fontSize: '14px', marginBottom: '32px' }}>
              Giúp mọi người hiểu hơn về bạn
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#111418', marginBottom: '8px', display: 'block' }}>
                  Giới tính
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Nam', 'Nữ', 'Khác'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '12px',
                        border: gender === g ? '2px solid #fd5068' : '2px solid #e8e8e8',
                        backgroundColor: gender === g ? '#fef0f2' : 'white',
                        color: gender === g ? '#fd5068' : '#505965',
                        fontWeight: 600,
                        fontSize: '15px',
                        cursor: 'pointer',
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#111418', marginBottom: '8px', display: 'block' }}>
                  Tuổi
                </label>
                <input
                  type="number"
                  min="18"
                  max="99"
                  placeholder="VD: 25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '2px solid #e8e8e8',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#111418', marginBottom: '8px', display: 'block' }}>
                  Vị trí
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} color="#505965" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="VD: Hà Nội"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 40px',
                      borderRadius: '12px',
                      border: '2px solid #e8e8e8',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Avatar Upload */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111418', textAlign: 'center', marginBottom: '8px' }}>
              Ảnh đại diện
            </h1>
            <p style={{ textAlign: 'center', color: '#505965', fontSize: '14px', marginBottom: '32px' }}>
              Chọn ảnh đẹp nhất của bạn
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                margin: '0 auto',
                border: dragOver ? '3px dashed #fd5068' : '3px dashed #d0d0d0',
                backgroundColor: dragOver ? '#fef0f2' : '#f8f8fa',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <Camera size={40} color="#ccc" />
                  <p style={{ fontSize: '13px', color: '#999', marginTop: '8px', textAlign: 'center', padding: '0 16px' }}>
                    Kéo thả hoặc nhấn để chọn ảnh
                  </p>
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

            {avatarPreview && (
              <p
                onClick={() => { setAvatarFile(null); setAvatarPreview(''); }}
                style={{ textAlign: 'center', color: '#fd5068', fontSize: '14px', marginTop: '16px', cursor: 'pointer', fontWeight: 600 }}
              >
                Xóa ảnh
              </p>
            )}
          </div>
        )}

        {/* Step 3: Bio + Interests */}
        {step === 3 && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111418', textAlign: 'center', marginBottom: '8px' }}>
              Giới thiệu bản thân
            </h1>
            <p style={{ textAlign: 'center', color: '#505965', fontSize: '14px', marginBottom: '32px' }}>
              Chia sẻ thêm về mình nhé
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#111418', marginBottom: '8px', display: 'block' }}>
                Bio
              </label>
              <textarea
                placeholder="Viết vài dòng về bản thân bạn..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '2px solid #e8e8e8',
                  fontSize: '15px',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
              <p style={{ fontSize: '12px', color: '#999', textAlign: 'right', marginTop: '4px' }}>
                {bio.length}/300
              </p>
            </div>

            <div>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#111418', marginBottom: '12px', display: 'block' }}>
                Sở thích
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {INTERESTS.map((interest) => {
                  const selected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: selected ? '2px solid #fd5068' : '2px solid #e8e8e8',
                        backgroundColor: selected ? '#fef0f2' : 'white',
                        color: selected ? '#fd5068' : '#505965',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {selected && <Check size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111418', marginBottom: '8px' }}>
              Hoàn tất!
            </h1>
            <p style={{ color: '#505965', fontSize: '15px', marginBottom: '40px', lineHeight: '1.6' }}>
              Hồ sơ của bạn đã sẵn sàng.<br />
              Bắt đầu khám phá và tìm kiếm cạ cứng ngay thôi!
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: step === 1 ? 'flex-end' : 'space-between', marginTop: '40px', gap: '12px' }}>
          {step > 1 && step < 4 && (
            pillBtn(
              <><ArrowLeft size={16} /> Quay lại</>,
              prevStep,
              false
            )
          )}
          {step < 4 && (
            pillBtn(
              <>Tiếp theo <ArrowRight size={16} /></>,
              nextStep,
              true,
              !canNext()
            )
          )}
          {step === 4 && (
            pillBtn(
              saving ? 'Đang lưu...' : 'Bắt đầu ngay!',
              handleComplete,
              true,
              saving
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
