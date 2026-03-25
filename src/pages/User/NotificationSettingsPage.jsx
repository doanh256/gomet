import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationSettingsPage = () => {
  const navigate = useNavigate();

  const [pushSettings, setPushSettings] = useState({
    match: true,
    message: true,
    event: true,
    promo: false,
    community: false,
    flash: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    weekly: true,
    news: false,
    promo: false,
    security: true,
  });

  const [quietHours, setQuietHours] = useState(false);
  const [dayOff, setDayOff] = useState(false);
  const [saved, setSaved] = useState(false);

  const togglePush = (key) => setPushSettings((p) => ({ ...p, [key]: !p[key] }));
  const toggleEmail = (key) => setEmailSettings((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const pushRows = [
    { key: 'match', icon: 'favorite', label: 'Match moi' },
    { key: 'message', icon: 'message', label: 'Tin nhan' },
    { key: 'event', icon: 'event', label: 'Su kien' },
    { key: 'promo', icon: 'local_offer', label: 'Khuyen mai' },
    { key: 'community', icon: 'group', label: 'Cong dong' },
    { key: 'flash', icon: 'bolt', label: 'Flash Meet' },
  ];

  const emailRows = [
    { key: 'weekly', icon: 'mail', label: 'Tom tat hang tuan' },
    { key: 'news', icon: 'campaign', label: 'Tin tuc & cap nhat' },
    { key: 'promo', icon: 'redeem', label: 'Khuyen mai' },
    { key: 'security', icon: 'security', label: 'Bao mat' },
  ];

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#131313',
      fontFamily: 'var(--font-body)',
      padding: '0 0 40px',
      overflowY: 'auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '24px 20px 20px',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: '#FDF9F3',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    headerIcon: {
      fontSize: '28px',
      color: '#FFB59E',
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 700,
      color: '#FDF9F3',
    },
    section: {
      margin: '0 20px 24px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    sectionIcon: {
      fontSize: '20px',
      color: '#FFB59E',
    },
    card: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      overflow: 'hidden',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 16px',
    },
    rowLast: {},
    rowIcon: {
      fontSize: '22px',
      color: '#E6BEB2',
      marginRight: '12px',
    },
    rowLabel: {
      flex: 1,
      fontSize: '15px',
      color: '#FDF9F3',
    },
    toggle: (active) => ({
      width: '48px',
      height: '28px',
      borderRadius: '14px',
      backgroundColor: active ? '#FFB59E' : '#2A2A2A',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      border: 'none',
      padding: 0,
      flexShrink: 0,
    }),
    toggleKnob: (active) => ({
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: active ? '#3A0B00' : '#E6BEB2',
      position: 'absolute',
      top: '3px',
      left: active ? '23px' : '3px',
      transition: 'left 0.2s ease, background-color 0.2s ease',
    }),
    quietRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
    },
    quietLabel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    quietTime: {
      fontSize: '12px',
      color: '#E6BEB2',
    },
    saveBtn: {
      margin: '32px 20px 0',
      width: 'calc(100% - 40px)',
      padding: '16px',
      borderRadius: '9999px',
      border: 'none',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      fontSize: '16px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      letterSpacing: '0.3px',
    },
    savedMsg: {
      textAlign: 'center',
      marginTop: '12px',
      fontSize: '14px',
      color: '#117500',
      fontWeight: 600,
    },
  };

  const Toggle = ({ active, onToggle }) => (
    <button style={s.toggle(active)} onClick={onToggle}>
      <div style={s.toggleKnob(active)} />
    </button>
  );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>notifications</span>
        <h1 style={s.headerTitle}>Cai dat thong bao</h1>
      </div>

      {/* Push Notifications */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>smartphone</span>
          Thong bao day
        </div>
        <div style={s.card}>
          {pushRows.map((r, i) => (
            <div key={r.key} style={{ ...s.row, ...(i === pushRows.length - 1 ? s.rowLast : {}) }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.rowIcon}>{r.icon}</span>
              <span style={s.rowLabel}>{r.label}</span>
              <Toggle active={pushSettings[r.key]} onToggle={() => togglePush(r.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Email Notifications */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>email</span>
          Thong bao email
        </div>
        <div style={s.card}>
          {emailRows.map((r, i) => (
            <div key={r.key} style={{ ...s.row, ...(i === emailRows.length - 1 ? s.rowLast : {}) }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.rowIcon}>{r.icon}</span>
              <span style={s.rowLabel}>{r.label}</span>
              <Toggle active={emailSettings[r.key]} onToggle={() => toggleEmail(r.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Do Not Disturb */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>do_not_disturb_on</span>
          Khong lam phien
        </div>
        <div style={s.card}>
          <div style={s.quietRow}>
            <div style={s.quietLabel}>
              <span style={s.rowLabel}>Gio im lang</span>
              {quietHours && <span style={s.quietTime}>22:00 - 07:00</span>}
            </div>
            <Toggle active={quietHours} onToggle={() => setQuietHours(!quietHours)} />
          </div>
          <div style={s.quietRow}>
            <span style={s.rowLabel}>Ngay nghi</span>
            <Toggle active={dayOff} onToggle={() => setDayOff(!dayOff)} />
          </div>
        </div>
      </div>

      <button style={s.saveBtn} onClick={handleSave}>
        Luu cai dat
      </button>
      {saved && <p style={s.savedMsg}>Da luu thanh cong!</p>}
    </div>
  );
};

export default NotificationSettingsPage;
