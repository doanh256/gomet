import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyIdentityPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);

  const totalSteps = 3;
  const progress = step / totalSteps;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#000000',
      color: '#FDF9F3',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: '9999px',
      background: '#2A2A2A',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#FDF9F3',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 700,
      flex: 1,
      color: '#FDF9F3',
    },
    stepLabel: {
      fontSize: 13,
      color: '#E6BEB2',
      fontWeight: 600,
    },
    progressBar: {
      height: 4,
      background: '#2A2A2A',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '0 4px 4px 0',
      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      width: `${progress * 100}%`,
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 24px 24px',
    },
    stepTitle: {
      fontSize: 24,
      fontWeight: 800,
      textAlign: 'center',
      marginBottom: 12,
      color: '#FDF9F3',
    },
    stepDescription: {
      fontSize: 15,
      color: '#E6BEB2',
      textAlign: 'center',
      lineHeight: 1.6,
      marginBottom: 32,
      maxWidth: 320,
    },
    cameraCircle: {
      width: 200,
      height: 200,
      borderRadius: '9999px',
      background: '#2A2A2A',
      border: '3px dashed #353535',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 32,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    cameraIcon: {
      fontSize: 48,
      color: '#E6BEB2',
    },
    cameraText: {
      fontSize: 13,
      color: '#E6BEB2',
      fontWeight: 500,
    },
    previewImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '9999px',
    },
    uploadArea: {
      display: 'flex',
      gap: 16,
      marginBottom: 32,
      width: '100%',
      maxWidth: 360,
    },
    uploadCard: {
      flex: 1,
      aspectRatio: '3/2',
      borderRadius: '1.5rem',
      background: '#2A2A2A',
      border: '2px dashed #353535',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    uploadIcon: {
      fontSize: 32,
      color: '#E6BEB2',
    },
    uploadLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: '#E6BEB2',
    },
    uploadedIndicator: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 24,
      height: 24,
      borderRadius: '9999px',
      background: '#FFB59E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    successCircle: {
      width: 120,
      height: 120,
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      animation: 'pulse 2s infinite',
    },
    successIcon: {
      fontSize: 56,
      color: '#3A0B00',
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'rgba(255,181,158,0.15)',
      color: '#FFB59E',
      padding: '8px 20px',
      borderRadius: '9999px',
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 20,
    },
    successHeading: {
      fontSize: 22,
      fontWeight: 800,
      textAlign: 'center',
      color: '#FDF9F3',
      marginBottom: 8,
    },
    successSub: {
      fontSize: 14,
      color: '#E6BEB2',
      textAlign: 'center',
      marginBottom: 32,
    },
    footer: {
      padding: '16px 24px 24px',
    },
    navButtons: {
      display: 'flex',
      gap: 12,
    },
    nextBtn: {
      flex: 1,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
      padding: '16px 24px',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    backNavBtn: {
      background: '#2A2A2A',
      color: '#FDF9F3',
      border: 'none',
      borderRadius: '9999px',
      padding: '16px 20px',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    privacyNote: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 16,
      fontSize: 12,
      color: '#E6BEB2',
      textAlign: 'center',
    },
    instructionsList: {
      width: '100%',
      maxWidth: 320,
      marginBottom: 24,
    },
    instructionItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 0',
      fontSize: 14,
      color: '#E6BEB2',
    },
    instructionIcon: {
      width: 28,
      height: 28,
      borderRadius: '9999px',
      background: 'rgba(255,181,158,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
  };

  const renderStep1 = () => (
    <>
      <div style={styles.stepTitle}>Chup anh selfie</div>
      <p style={styles.stepDescription}>
        Chup mot tam anh ro mat de xac minh danh tinh cua ban. Vui long dam bao anh sang tot va nhin thang vao camera.
      </p>
      <div style={styles.cameraCircle}>
        {selfiePreview ? (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '9999px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#3A0B00' }}>person</span>
          </div>
        ) : (
          <>
            <span className="material-symbols-outlined" style={styles.cameraIcon}>photo_camera</span>
            <span style={styles.cameraText}>Nhan de chup</span>
          </>
        )}
      </div>
      <div style={styles.instructionsList}>
        {[
          { icon: 'light_mode', text: 'Dam bao du anh sang' },
          { icon: 'face', text: 'Nhin thang vao camera' },
          { icon: 'visibility_off', text: 'Khong doi kinh ram hoac khau trang' },
        ].map((item, i) => (
          <div key={i} style={styles.instructionItem}>
            <div style={styles.instructionIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#FFB59E' }}>{item.icon}</span>
            </div>
            {item.text}
          </div>
        ))}
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div style={styles.stepTitle}>Tai CMND/CCCD</div>
      <p style={styles.stepDescription}>
        Chup anh mat truoc va mat sau giay to tuy than cua ban. Vui long dam bao anh ro net va khong bi cat goc.
      </p>
      <div style={styles.uploadArea}>
        <div style={styles.uploadCard} onClick={() => setFrontId(true)}>
          {frontId ? (
            <>
              <div style={{
                width: '100%', height: '100%', position: 'absolute',
                background: '#353535',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#FFB59E' }}>badge</span>
              </div>
              <div style={styles.uploadedIndicator}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#3A0B00' }}>check</span>
              </div>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined" style={styles.uploadIcon}>add_a_photo</span>
              <span style={styles.uploadLabel}>Mat truoc</span>
            </>
          )}
        </div>
        <div style={styles.uploadCard} onClick={() => setBackId(true)}>
          {backId ? (
            <>
              <div style={{
                width: '100%', height: '100%', position: 'absolute',
                background: '#353535',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#FFB59E' }}>badge</span>
              </div>
              <div style={styles.uploadedIndicator}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#3A0B00' }}>check</span>
              </div>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined" style={styles.uploadIcon}>add_a_photo</span>
              <span style={styles.uploadLabel}>Mat sau</span>
            </>
          )}
        </div>
      </div>
      <div style={styles.instructionsList}>
        {[
          { icon: 'crop_free', text: 'Dat giay to nam trong khung hinh' },
          { icon: 'blur_on', text: 'Anh khong bi mo hoac choi sang' },
          { icon: 'content_cut', text: 'Khong cat goc giay to' },
        ].map((item, i) => (
          <div key={i} style={styles.instructionItem}>
            <div style={styles.instructionIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#FFB59E' }}>{item.icon}</span>
            </div>
            {item.text}
          </div>
        ))}
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div style={styles.successCircle}>
        <span className="material-symbols-outlined" style={styles.successIcon}>check</span>
      </div>
      <div style={styles.verifiedBadge}>
        <span className="material-symbols-outlined filled" style={{ fontSize: 18 }}>verified</span>
        Da xac minh
      </div>
      <div style={styles.successHeading}>Ho so cua ban da duoc xac minh!</div>
      <p style={styles.successSub}>
        Cam on ban da hoan tat xac minh danh tinh. Bay gio ban co the su dung day du tinh nang cua GOMET.
      </p>
    </>
  );

  const getActionButton = () => {
    if (step === 1) {
      return (
        <button
          style={styles.nextBtn}
          onClick={() => {
            setSelfiePreview(true);
            handleNext();
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>photo_camera</span>
          Chup ngay
        </button>
      );
    }
    if (step === 2) {
      return (
        <button
          style={{
            ...styles.nextBtn,
            opacity: frontId && backId ? 1 : 0.5,
          }}
          onClick={() => {
            setFrontId(true);
            setBackId(true);
            handleNext();
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>upload</span>
          Tai len
        </button>
      );
    }
    return (
      <button style={styles.nextBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
        Quay ve trang ca nhan
      </button>
    );
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={handleBack}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        </button>
        <span style={styles.headerTitle}>Xac minh danh tinh</span>
        <span style={styles.stepLabel}>Buoc {step}/{totalSteps}</span>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div style={styles.progressFill} />
      </div>

      {/* Content */}
      <div style={styles.content}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.navButtons}>
          {step < 3 && (
            <button style={styles.backNavBtn} onClick={handleBack}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            </button>
          )}
          {getActionButton()}
        </div>
        <div style={styles.privacyNote}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock</span>
          Thong tin cua ban duoc ma hoa va bao mat tuyet doi.
        </div>
      </div>
    </div>
  );
};

export default VerifyIdentityPage;
