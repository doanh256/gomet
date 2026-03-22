import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const scanLineKeyframes = `
@keyframes scanLine {
  0% { top: 0; }
  100% { top: 100%; }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes checkBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
`;

const CheckInPage = () => {
  const navigate = useNavigate();
  const [manualCode, setManualCode] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    if (manualCode.trim()) {
      setCheckedIn(true);
    }
  };

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: 'var(--inverse-surface)',
      color: 'var(--inverse-on-surface)',
      fontFamily: 'var(--font-body)',
      padding: '0 0 60px',
      overflowY: 'auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '24px 20px 16px',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--inverse-on-surface)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 700,
      color: 'var(--inverse-on-surface)',
    },
    headerIcon: {
      fontSize: '28px',
      color: 'var(--primary-container)',
    },
    scannerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 20px',
      animation: 'fadeIn 0.5s ease',
    },
    scannerBox: {
      width: '280px',
      height: '280px',
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.05)',
    },
    corner: (top, left, right, bottom) => ({
      position: 'absolute',
      width: '40px',
      height: '40px',
      ...(top !== null && { top }),
      ...(left !== null && { left }),
      ...(right !== null && { right }),
      ...(bottom !== null && { bottom }),
      borderColor: 'var(--primary-container)',
      borderStyle: 'solid',
      borderWidth: 0,
      ...(top !== null && left !== null && { borderTopWidth: '3px', borderLeftWidth: '3px', borderTopLeftRadius: '12px' }),
      ...(top !== null && right !== null && { borderTopWidth: '3px', borderRightWidth: '3px', borderTopRightRadius: '12px' }),
      ...(bottom !== null && left !== null && { borderBottomWidth: '3px', borderLeftWidth: '3px', borderBottomLeftRadius: '12px' }),
      ...(bottom !== null && right !== null && { borderBottomWidth: '3px', borderRightWidth: '3px', borderBottomRightRadius: '12px' }),
    }),
    scanLine: {
      position: 'absolute',
      left: '10%',
      width: '80%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, var(--primary-container), transparent)',
      animation: 'scanLine 2.5s linear infinite',
      boxShadow: '0 0 12px var(--primary-container)',
    },
    scanInstruction: {
      marginTop: '20px',
      fontSize: '14px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.7,
      textAlign: 'center',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '24px 20px',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(255,255,255,0.15)',
    },
    dividerText: {
      fontSize: '13px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.6,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    manualSection: {
      padding: '0 20px',
      display: 'flex',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'rgba(255,255,255,0.08)',
      color: 'var(--inverse-on-surface)',
      fontSize: '15px',
      fontFamily: 'var(--font-body)',
      outline: 'none',
    },
    confirmBtn: {
      padding: '14px 24px',
      borderRadius: 'var(--radius)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontSize: '15px',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
    },
    successContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 20px 32px',
      animation: 'fadeIn 0.6s ease',
    },
    checkCircle: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: '#2e7d32',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'checkBounce 0.5s ease',
      marginBottom: '20px',
    },
    checkIcon: {
      fontSize: '52px',
      color: '#fff',
    },
    successTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '24px',
      fontWeight: 700,
      color: 'var(--inverse-on-surface)',
      marginBottom: '8px',
    },
    successDetail: {
      fontSize: '14px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.7,
      marginBottom: '4px',
    },
    eventCard: {
      margin: '24px 20px 0',
      padding: '20px',
      borderRadius: 'var(--radius)',
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    eventCardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--primary-container)',
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    eventRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
    },
    eventRowIcon: {
      fontSize: '18px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.6,
    },
    eventRowText: {
      fontSize: '14px',
      color: 'var(--inverse-on-surface)',
      opacity: 0.85,
    },
    viewDetailLink: {
      marginTop: '8px',
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--primary-container)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'var(--font-body)',
    },
  };

  return (
    <div style={s.page}>
      <style>{scanLineKeyframes}</style>

      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="material-symbols-outlined" style={s.headerIcon}>qr_code_scanner</span>
        <h1 style={s.headerTitle}>Check-in su kien</h1>
      </div>

      {!checkedIn ? (
        <>
          <div style={s.scannerContainer}>
            <div style={s.scannerBox}>
              <div style={s.corner(0, 0, null, null)} />
              <div style={s.corner(0, null, 0, null)} />
              <div style={s.corner(null, 0, null, 0)} />
              <div style={s.corner(null, null, 0, 0)} />
              <div style={s.scanLine} />
            </div>
            <p style={s.scanInstruction}>Quet ma QR de check-in</p>
          </div>

          <div style={s.divider}>
            <div style={s.dividerLine} />
            <span style={s.dividerText}>Hoac nhap ma</span>
            <div style={s.dividerLine} />
          </div>

          <div style={s.manualSection}>
            <input
              style={s.input}
              placeholder="Nhap ma check-in..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
            <button style={s.confirmBtn} onClick={handleCheckIn}>
              Xac nhan
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={s.successContainer}>
            <div style={s.checkCircle}>
              <span className="material-symbols-outlined" style={s.checkIcon}>check</span>
            </div>
            <h2 style={s.successTitle}>Check-in thanh cong!</h2>
            <p style={s.successDetail}>DineDate: Dinner & Drinks</p>
            <p style={s.successDetail}>Thoi gian: 19:32 - 22/03/2026</p>
            <p style={s.successDetail}>Ban: A5 - Tang 2</p>
          </div>

          <div style={s.eventCard}>
            <div style={s.eventCardTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>info</span>
              Thong tin su kien
            </div>
            <div style={s.eventRow}>
              <span className="material-symbols-outlined" style={s.eventRowIcon}>event</span>
              <span style={s.eventRowText}>DineDate: Dinner & Drinks</span>
            </div>
            <div style={s.eventRow}>
              <span className="material-symbols-outlined" style={s.eventRowIcon}>location_on</span>
              <span style={s.eventRowText}>Lau Tang 5, 72 Nguyen Hue, Q1</span>
            </div>
            <div style={s.eventRow}>
              <span className="material-symbols-outlined" style={s.eventRowIcon}>schedule</span>
              <span style={s.eventRowText}>19:00 - 22:00, 22/03/2026</span>
            </div>
            <button style={s.viewDetailLink} onClick={() => navigate('/events/1')}>
              Xem chi tiet →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckInPage;
