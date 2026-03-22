import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const boostActions = [
  { icon: 'person_add', label: 'Moi ban be', reward: '+5 bac', desc: 'Chia se link gioi thieu' },
  { icon: 'share', label: 'Chia se tren MXH', reward: '+3 bac', desc: 'Dang len Facebook, Instagram' },
  { icon: 'task_alt', label: 'Hoan thanh ho so', reward: '+10 bac', desc: 'Cap nhat thong tin ca nhan' },
];

const faqs = [
  {
    q: 'Waitlist hoat dong nhu the nao?',
    a: 'Ban se duoc xep theo thu tu dang ky. Vi tri cua ban co the tang len khi ban hoan thanh cac nhiem vu tang thu hang.',
  },
  {
    q: 'Lam sao de tang thu hang nhanh hon?',
    a: 'Moi ban be, chia se tren mang xa hoi va hoan thanh ho so se giup ban leo len vi tri cao hon trong danh sach cho.',
  },
  {
    q: 'Khi nao toi se duoc truy cap?',
    a: 'Thoi gian du kien phu thuoc vao vi tri cua ban. Chung toi se gui thong bao khi den luot ban.',
  },
];

const WaitlistPage = () => {
  const navigate = useNavigate();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const position = 247;
  const total = 1248;
  const progress = ((total - position) / total) * 100;

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--on-surface)',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 24,
    },
    hero: {
      textAlign: 'center',
      marginBottom: 28,
    },
    heroIcon: {
      fontSize: 52,
      color: 'var(--primary)',
      marginBottom: 12,
    },
    heroTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    heroSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    posCard: {
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 24px',
      textAlign: 'center',
      color: 'var(--on-primary)',
      marginBottom: 24,
    },
    posLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      opacity: 0.85,
      marginBottom: 8,
    },
    posNumber: {
      fontFamily: 'var(--font-headline)',
      fontSize: 48,
      fontWeight: 800,
      lineHeight: 1,
      marginBottom: 6,
    },
    posSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      opacity: 0.8,
    },
    progressBar: {
      width: '100%',
      height: 8,
      backgroundColor: 'rgba(255,255,255,0.25)',
      borderRadius: 'var(--radius-full)',
      marginTop: 18,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: 'var(--on-primary)',
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.6s ease',
    },
    estimateRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 32,
      padding: '12px 20px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-full)',
      boxShadow: 'var(--card-shadow)',
      width: 'fit-content',
      margin: '0 auto 32px',
    },
    estimateIcon: {
      fontSize: 20,
      color: 'var(--primary)',
    },
    estimateLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    estimateValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    boostCard: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      marginBottom: 10,
      boxShadow: 'var(--card-shadow)',
      cursor: 'pointer',
      border: 'none',
      width: '100%',
      textAlign: 'left',
    },
    boostIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius)',
      background: 'var(--primary-fixed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    boostIcon: {
      fontSize: 24,
      color: 'var(--primary)',
    },
    boostInfo: {
      flex: 1,
    },
    boostLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: 2,
    },
    boostDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    boostReward: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: '#2e7d32',
      backgroundColor: '#e8f5e9',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      flexShrink: 0,
    },
    notifSection: {
      marginTop: 32,
      marginBottom: 32,
    },
    notifRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid var(--outline-variant)',
    },
    notifLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    notifIcon: {
      fontSize: 22,
      color: 'var(--on-surface-variant)',
    },
    notifLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface)',
    },
    toggle: {
      width: 48,
      height: 26,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background 0.2s',
      flexShrink: 0,
    },
    toggleOn: {
      backgroundColor: 'var(--primary)',
    },
    toggleOff: {
      backgroundColor: 'var(--outline-variant)',
    },
    toggleDot: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: '#fff',
      position: 'absolute',
      top: 3,
      transition: 'left 0.2s',
    },
    faqSection: {
      marginBottom: 24,
    },
    faqItem: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      marginBottom: 8,
      overflow: 'hidden',
    },
    faqHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 18px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      width: '100%',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
      textAlign: 'left',
    },
    faqChevron: {
      fontSize: 20,
      color: 'var(--on-surface-variant)',
      transition: 'transform 0.2s',
    },
    faqBody: {
      padding: '0 18px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      lineHeight: 1.6,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <div style={s.hero}>
        <span className="material-symbols-outlined" style={s.heroIcon}>hourglass_top</span>
        <h1 style={s.heroTitle}>Ban da dang ky thanh cong!</h1>
        <p style={s.heroSub}>Chung toi se thong bao khi den luot ban</p>
      </div>

      <div style={s.posCard}>
        <div style={s.posLabel}>Vi tri cua ban</div>
        <div style={s.posNumber}>#{position}</div>
        <div style={s.posSub}>trong {total.toLocaleString('vi-VN')} nguoi</div>
        <div style={s.progressBar}>
          <div style={s.progressFill} />
        </div>
      </div>

      <div style={s.estimateRow}>
        <span className="material-symbols-outlined" style={s.estimateIcon}>schedule</span>
        <span style={s.estimateLabel}>Du kien:</span>
        <span style={s.estimateValue}>Khoang 2-3 ngay</span>
      </div>

      <div style={s.sectionTitle}>Tang thu hang</div>
      {boostActions.map((a, i) => (
        <button style={s.boostCard} key={i}>
          <div style={s.boostIconWrap}>
            <span className="material-symbols-outlined" style={s.boostIcon}>{a.icon}</span>
          </div>
          <div style={s.boostInfo}>
            <div style={s.boostLabel}>{a.label}</div>
            <div style={s.boostDesc}>{a.desc}</div>
          </div>
          <span style={s.boostReward}>{a.reward}</span>
        </button>
      ))}

      <div style={s.notifSection}>
        <div style={s.sectionTitle}>Thong bao cho toi</div>
        <div style={s.notifRow}>
          <div style={s.notifLeft}>
            <span className="material-symbols-outlined" style={s.notifIcon}>email</span>
            <span style={s.notifLabel}>Email</span>
          </div>
          <button
            style={{ ...s.toggle, ...(emailNotif ? s.toggleOn : s.toggleOff) }}
            onClick={() => setEmailNotif(!emailNotif)}
          >
            <div style={{ ...s.toggleDot, left: emailNotif ? 25 : 3 }} />
          </button>
        </div>
        <div style={s.notifRow}>
          <div style={s.notifLeft}>
            <span className="material-symbols-outlined" style={s.notifIcon}>notifications</span>
            <span style={s.notifLabel}>Push notification</span>
          </div>
          <button
            style={{ ...s.toggle, ...(pushNotif ? s.toggleOn : s.toggleOff) }}
            onClick={() => setPushNotif(!pushNotif)}
          >
            <div style={{ ...s.toggleDot, left: pushNotif ? 25 : 3 }} />
          </button>
        </div>
      </div>

      <div style={s.faqSection}>
        <div style={s.sectionTitle}>Cau hoi thuong gap</div>
        {faqs.map((f, i) => (
          <div style={s.faqItem} key={i}>
            <button style={s.faqHeader} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <span>{f.q}</span>
              <span
                className="material-symbols-outlined"
                style={{ ...s.faqChevron, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                expand_more
              </span>
            </button>
            {openFaq === i && <div style={s.faqBody}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitlistPage;
