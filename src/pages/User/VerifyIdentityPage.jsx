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
      background: 'var(--surface)',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 20px',
      borderBottom: '1px solid var(--outline-variant)',
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-container-high)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'var(--on-surface)',
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      flex: 1,
    },
    stepLabel: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      fontWeight: 600,
    },
    progressBar: {
      height: 4,
      background: 'var(--surface-container-high)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'var(--primary-gradient)',
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
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      textAlign: 'center',
      marginBottom: 12,
      color: 'var(--on-surface)',
    },
    stepDescription: {
      fontSize: 15,
      color: 'var(--on-surface-variant)',
      textAlign: 'center',
      lineHeight: 1.6,
      marginBottom: 32,
      maxWidth: 320,
    },
    cameraCircle: {
      width: 200,
      height: 200,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-container-low)',
      border: '3px dashed var(--outline-variant)',
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
      color: 'var(--on-surface-variant)',
    },
    cameraText: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      fontWeight: 500,
    },
    previewImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'var(--radius-full)',
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
      borderRadius: 'var(--radius)',
      background: 'var(--surface-container-low)',
      border: '2px dashed var(--outline-variant)',
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
      color: 'var(--on-surface-variant)',
    },
    uploadLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
    },
    uploadedIndicator: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    successCircle: {
      width: 120,
      height: 120,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      animation: 'pulse 2s infinite',
    },
    successIcon: {
      fontSize: 56,
      color: 'var(--on-primary)',
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--primary-fixed)',
      color: 'var(--on-primary-container)',
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 20,
    },
    successHeading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      textAlign: 'center',
      color: 'var(--on-surface)',
      marginBottom: 8,
    },
    successSub: {
      fontSize: 14,
      color: 'var(--on-surface-variant)',
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
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '16px 24px',
      fontSize: 16,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    backNavBtn: {
      background: 'var(--surface-container-high)',
      color: 'var(--on-surface)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '16px 20px',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
    },
    privacyNote: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 16,
      fontSize: 12,
      color: 'var(--on-surface-variant)',
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
      color: 'var(--on-surface-variant)',
    },
    instructionIcon: {
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-fixed)',
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
            background: 'var(--primary-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--radius-full)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--on-primary)' }}>person</span>
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
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--primary)' }}>{item.icon}</span>
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
                background: 'var(--surface-container-high)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--primary)' }}>badge</span>
              </div>
              <div style={styles.uploadedIndicator}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-primary)' }}>check</span>
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
                background: 'var(--surface-container-high)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--primary)' }}>badge</span>
              </div>
              <div style={styles.uploadedIndicator}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-primary)' }}>check</span>
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
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--primary)' }}>{item.icon}</span>
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
