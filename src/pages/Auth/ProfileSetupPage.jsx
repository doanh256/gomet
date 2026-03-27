import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Location Data ────────────────────────────────────────────────────────────
const COUNTRIES = [
  { code: 'VN', name: 'Việt Nam', flag: '🇻🇳' },
  { code: 'OTHER', name: 'Quốc gia khác', flag: '🌏' },
];

// Danh sách 34 tỉnh thành Việt Nam (hiệu lực từ 01/07/2025 theo NQ 202/2025/QH15)
const VN_PROVINCES = [
  // 6 Thành phố trực thuộc Trung ương
  { id: 'hn',  name: 'Hà Nội',           type: 'city' },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', type: 'city' },
  { id: 'hp',  name: 'Hải Phòng',        type: 'city' },
  { id: 'hue', name: 'Huế',              type: 'city' },
  { id: 'dn',  name: 'Đà Nẵng',          type: 'city' },
  { id: 'ct',  name: 'Cần Thơ',          type: 'city' },
  // 28 Tỉnh (alphabetical)
  { id: 'ag',  name: 'An Giang',         type: 'province' }, // + Kiên Giang
  { id: 'bn',  name: 'Bắc Ninh',         type: 'province' }, // + Bắc Giang
  { id: 'cm',  name: 'Cà Mau',           type: 'province' }, // + Bạc Liêu
  { id: 'cb',  name: 'Cao Bằng',         type: 'province' },
  { id: 'dlk', name: 'Đắk Lắk',         type: 'province' }, // + Phú Yên
  { id: 'db',  name: 'Điện Biên',        type: 'province' },
  { id: 'dna', name: 'Đồng Nai',         type: 'province' }, // + Bình Phước
  { id: 'dt',  name: 'Đồng Tháp',        type: 'province' }, // + Tiền Giang
  { id: 'gl',  name: 'Gia Lai',          type: 'province' }, // + Bình Định
  { id: 'hti', name: 'Hà Tĩnh',          type: 'province' },
  { id: 'hy',  name: 'Hưng Yên',         type: 'province' }, // + Thái Bình
  { id: 'kh',  name: 'Khánh Hòa',        type: 'province' }, // + Ninh Thuận
  { id: 'lc',  name: 'Lai Châu',         type: 'province' },
  { id: 'ld',  name: 'Lâm Đồng',         type: 'province' }, // + Đắk Nông + Bình Thuận
  { id: 'ls',  name: 'Lạng Sơn',         type: 'province' },
  { id: 'lca', name: 'Lào Cai',          type: 'province' }, // + Yên Bái
  { id: 'na',  name: 'Nghệ An',          type: 'province' },
  { id: 'nb',  name: 'Ninh Bình',        type: 'province' }, // + Hà Nam + Nam Định
  { id: 'pt',  name: 'Phú Thọ',          type: 'province' }, // + Vĩnh Phúc + Hòa Bình
  { id: 'qng', name: 'Quảng Ngãi',       type: 'province' }, // + Kon Tum
  { id: 'qni', name: 'Quảng Ninh',       type: 'province' },
  { id: 'qt',  name: 'Quảng Trị',        type: 'province' }, // + Quảng Bình
  { id: 'sl',  name: 'Sơn La',           type: 'province' },
  { id: 'tn',  name: 'Tây Ninh',         type: 'province' }, // + Long An
  { id: 'tng', name: 'Thái Nguyên',      type: 'province' }, // + Bắc Kạn
  { id: 'th',  name: 'Thanh Hóa',        type: 'province' },
  { id: 'tq',  name: 'Tuyên Quang',      type: 'province' }, // + Hà Giang
  { id: 'vl',  name: 'Vĩnh Long',        type: 'province' }, // + Bến Tre + Trà Vinh
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const bg = '#131313';
const surface = '#1e1d1d';
const surfaceRaised = '#2a2929';
const primary = '#E6BEB2';
const primaryAccent = '#FFB59E';
const textPrimary = '#FDF9F3';
const textMuted = 'rgba(230,190,178,0.55)';
const border = 'rgba(230,190,178,0.12)';
const focusShadow = '0 0 0 2px rgba(255,181,158,0.45)';

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: primary,
  marginBottom: '12px',
  fontFamily: "'Manrope', sans-serif",
};

const inputBase = {
  width: '100%',
  height: '52px',
  backgroundColor: surfaceRaised,
  border: `1px solid ${border}`,
  borderRadius: '14px',
  fontSize: '15px',
  outline: 'none',
  fontFamily: "'Manrope', sans-serif",
  boxSizing: 'border-box',
  color: textPrimary,
  padding: '0 16px',
  transition: 'box-shadow 0.2s, border-color 0.2s',
  appearance: 'none',
  WebkitAppearance: 'none',
};

const selectBase = {
  ...inputBase,
  paddingRight: '40px',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23E6BEB2' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  cursor: 'pointer',
};

// ─── Component ────────────────────────────────────────────────────────────────
const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('VN');
  const [province, setProvince] = useState('');
  const [address, setAddress] = useState('');
  const [ageError, setAgeError] = useState('');

  const genders = [
    { id: 'male',   label: 'Nam',  icon: 'person' },
    { id: 'female', label: 'Nữ',   icon: 'person_2' },
    { id: 'other',  label: 'Khác', icon: 'supervised_user_circle' },
  ];

  const handleAgeChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setAge(val);
    if (val && (parseInt(val) < 13 || parseInt(val) > 100)) {
      setAgeError('Tuổi hợp lệ từ 13 đến 100');
    } else {
      setAgeError('');
    }
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setProvince('');
  };

  const canContinue = gender && age && !ageError && country && (country !== 'VN' || province);

  const handleContinue = () => {
    if (!canContinue) return;
    navigate('/onboarding');
  };

  const currentProvinces = country === 'VN' ? VN_PROVINCES : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, fontFamily: "'Manrope', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: '20%', right: '-5%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,87,26,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '-5%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,181,158,0.08) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '440px', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 900, fontStyle: 'italic', color: primaryAccent, letterSpacing: '-0.04em' }}>GOMET</span>
          <button onClick={() => navigate('/onboarding')} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, color: textMuted, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>
            Bỏ qua
          </button>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '32px', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.15 }}>
            <span style={{ color: textPrimary }}>Giới tính</span>
            {' & '}
            <span style={{ color: primaryAccent, fontStyle: 'italic' }}>Tuổi</span>
          </h1>
          <p style={{ color: textMuted, fontSize: '15px', margin: 0, fontWeight: 500 }}>Giúp mọi người hiểu hơn về bạn</p>
        </div>

        {/* ── Giới tính ── */}
        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>Giới tính</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {genders.map((g) => {
              const active = gender === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setGender(g.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '10px', padding: '20px 12px', borderRadius: '16px', cursor: 'pointer',
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '14px',
                    border: active ? `2px solid ${primaryAccent}` : `1px solid ${border}`,
                    backgroundColor: active ? 'rgba(255,181,158,0.1)' : surfaceRaised,
                    color: active ? primaryAccent : textMuted,
                    transition: 'all 0.2s',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0", color: active ? primaryAccent : textMuted }}>
                    {g.icon}
                  </span>
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tuổi ── */}
        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>Tuổi</label>
          <input
            type="text" inputMode="numeric" placeholder="VD: 25" maxLength={3}
            value={age} onChange={handleAgeChange}
            style={{ ...inputBase, borderColor: ageError ? '#FF6B6B' : border }}
            onFocus={e => { e.target.style.boxShadow = focusShadow; e.target.style.borderColor = primaryAccent; }}
            onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = ageError ? '#FF6B6B' : border; }}
          />
          {ageError && <p style={{ color: '#FF6B6B', fontSize: '12px', marginTop: '6px', fontWeight: 600 }}>{ageError}</p>}
        </div>

        {/* ── Vị trí ── */}
        <div style={{ marginBottom: '36px' }}>
          <label style={labelStyle}>Vị trí</label>

          {/* Quốc gia */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: textMuted, fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.04em' }}>Quốc gia</p>
            <div style={{ position: 'relative' }}>
              <select
                value={country} onChange={handleCountryChange}
                style={{ ...selectBase, backgroundColor: surfaceRaised }}
                onFocus={e => { e.target.style.boxShadow = focusShadow; e.target.style.borderColor = primaryAccent; }}
                onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = border; }}
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code} style={{ backgroundColor: surface }}>
                    {c.flag}  {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Thành phố / Tỉnh */}
          {country === 'VN' && (
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: textMuted, fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.04em' }}>Thành phố / Tỉnh</p>
              <div style={{ position: 'relative' }}>
                <select
                  value={province} onChange={e => setProvince(e.target.value)}
                  style={{ ...selectBase, backgroundColor: surfaceRaised, color: province ? textPrimary : textMuted }}
                  onFocus={e => { e.target.style.boxShadow = focusShadow; e.target.style.borderColor = primaryAccent; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = border; }}
                >
                  <option value="" style={{ backgroundColor: surface }} disabled>Chọn tỉnh / thành phố</option>
                  <optgroup label="— Thành phố trực thuộc TW (6) —" style={{ backgroundColor: surface, color: textMuted }}>
                    {currentProvinces.filter(p => p.type === 'city').map(p => (
                      <option key={p.id} value={p.id} style={{ backgroundColor: surface }}>{p.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="— Tỉnh (28) —" style={{ backgroundColor: surface, color: textMuted }}>
                    {currentProvinces.filter(p => p.type === 'province').map(p => (
                      <option key={p.id} value={p.id} style={{ backgroundColor: surface }}>{p.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          )}

          {/* Tỉnh/thành free text for other countries */}
          {country === 'OTHER' && (
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: textMuted, fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.04em' }}>Thành phố / Tỉnh</p>
              <input
                type="text" placeholder="VD: Bangkok, Paris..."
                style={{ ...inputBase }}
                onFocus={e => { e.target.style.boxShadow = focusShadow; e.target.style.borderColor = primaryAccent; }}
                onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = border; }}
              />
            </div>
          )}

          {/* Địa chỉ */}
          <div>
            <p style={{ fontSize: '12px', color: textMuted, fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.04em' }}>
              Địa chỉ <span style={{ color: textMuted, fontWeight: 400, fontSize: '11px' }}>(không bắt buộc)</span>
            </p>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: textMuted, pointerEvents: 'none' }}>
                location_on
              </span>
              <input
                type="text"
                placeholder="VD: 123 Lê Lợi, Quận 1..."
                value={address} onChange={e => setAddress(e.target.value)}
                style={{ ...inputBase, paddingLeft: '42px' }}
                onFocus={e => { e.target.style.boxShadow = focusShadow; e.target.style.borderColor = primaryAccent; }}
                onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = border; }}
              />
            </div>
          </div>
        </div>

        {/* ── Continue button ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            style={{
              backgroundColor: canContinue ? surfaceRaised : 'rgba(42,41,41,0.5)',
              color: canContinue ? textPrimary : textMuted,
              border: `1px solid ${canContinue ? 'rgba(230,190,178,0.25)' : border}`,
              borderRadius: '14px',
              padding: '16px 28px',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: canContinue ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
              opacity: canContinue ? 1 : 0.5,
            }}
            onMouseEnter={e => { if (canContinue) e.currentTarget.style.backgroundColor = 'rgba(255,181,158,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = canContinue ? surfaceRaised : 'rgba(42,41,41,0.5)'; }}
          >
            Tiếp tục
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </button>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: i === 0 ? '28px' : '8px', height: '8px', borderRadius: '9999px', backgroundColor: i === 0 ? primaryAccent : 'rgba(230,190,178,0.2)', transition: 'all 0.3s' }} />
          ))}
        </div>

      </div>

      <style>{`
        select option { background-color: #1e1d1d; color: #FDF9F3; }
        select::-ms-expand { display: none; }
        input::placeholder { color: rgba(230,190,178,0.35); }
      `}</style>
    </div>
  );
};

export default ProfileSetupPage;
