import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Toggle = ({ value, onChange }) => (
  <div
    onClick={() => onChange(!value)}
    style={{
      width: 48,
      height: 28,
      borderRadius: '9999px',
      backgroundColor: value ? '#FF571A' : '#353535',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s',
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        backgroundColor: value ? '#3A0B00' : '#1C1B1B',
        position: 'absolute',
        top: 3,
        left: value ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    />
  </div>
);

const AdvancedSettingsPage = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState('all');
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(45);
  const [distance, setDistance] = useState(10);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [hideActivity, setHideActivity] = useState(false);
  const [hideDistance, setHideDistance] = useState(false);
  const [anonView, setAnonView] = useState(false);
  const [msgAccess, setMsgAccess] = useState('all');

  const [notifMatch, setNotifMatch] = useState(true);
  const [notifMsg, setNotifMsg] = useState(true);
  const [notifLike, setNotifLike] = useState(true);
  const [notifEvent, setNotifEvent] = useState(false);
  const [notifPromo, setNotifPromo] = useState(false);

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 720,
      margin: '0 auto',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#E6BEB2',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 14,
      marginBottom: 24,
      padding: 0,
    },
    heading: {
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 32,
    },
    card: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '24px',
      marginBottom: 20,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20,
    },
    sectionIcon: {
      fontSize: 22,
      color: '#FFB59E',
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    rowLast: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
    },
    rowLabel: {
      fontSize: 14,
      color: '#FDF9F3',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    premiumBadge: {
      fontSize: 10,
      fontWeight: 700,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      padding: '2px 8px',
      borderRadius: '9999px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    chipGroup: {
      display: 'flex',
      gap: 8,
    },
    chip: (active) => ({
      padding: '8px 18px',
      borderRadius: '9999px',
      border: 'none',
      background: active ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#2A2A2A',
      color: active ? '#3A0B00' : '#FDF9F3',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
    }),
    numberInput: {
      width: 64,
      padding: '8px 10px',
      border: 'none',
      borderRadius: '12px',
      fontSize: 14,
      color: '#FDF9F3',
      backgroundColor: '#2A2A2A',
      textAlign: 'center',
      outline: 'none',
    },
    rangeRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    rangeSep: {
      fontSize: 14,
      color: '#E6BEB2',
    },
    sliderDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    slider: {
      flex: 1,
      accentColor: '#FFB59E',
    },
    sliderValue: {
      fontSize: 15,
      fontWeight: 700,
      color: '#FFB59E',
      minWidth: 50,
      textAlign: 'right',
    },
    saveBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      padding: '16px',
      fontWeight: 700,
      fontSize: 16,
      cursor: 'pointer',
      marginTop: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lại
      </button>

      <h1 style={s.heading}>Cài đặt nâng cao</h1>

      {/* Section 1 - Dating */}
      <div style={s.card}>
        <div style={s.sectionHeader}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>favorite</span>
          <span style={s.sectionTitle}>Cài đặt hẹn hò</span>
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Giới tính quan tâm</span>
          <div style={s.chipGroup}>
            <button style={s.chip(gender === 'male')} onClick={() => setGender('male')}>Nam</button>
            <button style={s.chip(gender === 'female')} onClick={() => setGender('female')}>Nữ</button>
            <button style={s.chip(gender === 'all')} onClick={() => setGender('all')}>Tất cả</button>
          </div>
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Độ tuổi</span>
          <div style={s.rangeRow}>
            <input
              type="number"
              style={s.numberInput}
              value={ageMin}
              min={18}
              max={99}
              onChange={(e) => setAgeMin(Number(e.target.value))}
            />
            <span style={s.rangeSep}>-</span>
            <input
              type="number"
              style={s.numberInput}
              value={ageMax}
              min={18}
              max={99}
              onChange={(e) => setAgeMax(Number(e.target.value))}
            />
          </div>
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Khoảng cách</span>
          <div style={s.sliderDisplay}>
            <input
              type="range"
              min={1}
              max={100}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              style={s.slider}
            />
            <span style={s.sliderValue}>{distance} km</span>
          </div>
        </div>

        <div style={s.rowLast}>
          <span style={s.rowLabel}>Chỉ hiển thị đã xác minh</span>
          <Toggle value={verifiedOnly} onChange={setVerifiedOnly} />
        </div>
      </div>

      {/* Section 2 - Privacy */}
      <div style={s.card}>
        <div style={s.sectionHeader}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>shield</span>
          <span style={s.sectionTitle}>Quyền riêng tư</span>
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Ẩn trạng thái hoạt động</span>
          <Toggle value={hideActivity} onChange={setHideActivity} />
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Ẩn khoảng cách</span>
          <Toggle value={hideDistance} onChange={setHideDistance} />
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>
            Chế độ ẩn danh khi xem
            <span style={s.premiumBadge}>Premium</span>
          </span>
          <Toggle value={anonView} onChange={setAnonView} />
        </div>

        <div style={s.rowLast}>
          <span style={s.rowLabel}>Ai có thể nhắn tin</span>
          <div style={s.chipGroup}>
            <button style={s.chip(msgAccess === 'all')} onClick={() => setMsgAccess('all')}>Tất cả</button>
            <button style={s.chip(msgAccess === 'match')} onClick={() => setMsgAccess('match')}>Chỉ match</button>
            <button style={s.chip(msgAccess === 'none')} onClick={() => setMsgAccess('none')}>Không ai</button>
          </div>
        </div>
      </div>

      {/* Section 3 - Notifications */}
      <div style={s.card}>
        <div style={s.sectionHeader}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>notifications</span>
          <span style={s.sectionTitle}>Thông báo</span>
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Match mới</span>
          <Toggle value={notifMatch} onChange={setNotifMatch} />
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Tin nhắn mới</span>
          <Toggle value={notifMsg} onChange={setNotifMsg} />
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Lượt thích</span>
          <Toggle value={notifLike} onChange={setNotifLike} />
        </div>

        <div style={s.row}>
          <span style={s.rowLabel}>Sự kiện gần bạn</span>
          <Toggle value={notifEvent} onChange={setNotifEvent} />
        </div>

        <div style={s.rowLast}>
          <span style={s.rowLabel}>Khuyến mãi</span>
          <Toggle value={notifPromo} onChange={setNotifPromo} />
        </div>
      </div>

      <button style={s.saveBtn}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>save</span>
        Lưu thay đổi
      </button>
    </div>
  );
};

export default AdvancedSettingsPage;
