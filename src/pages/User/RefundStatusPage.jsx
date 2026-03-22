import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pulseKeyframes = `
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const RefundStatusPage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const steps = [
    {
      label: 'Yeu cau da gui',
      icon: 'check_circle',
      color: '#2e7d32',
      status: 'completed',
      detail: '20/03/2026 - 14:30',
    },
    {
      label: 'Dang xem xet',
      icon: 'hourglass_top',
      color: '#f9a825',
      status: 'current',
      detail: '1-3 ngay lam viec',
    },
    {
      label: 'Phe duyet',
      icon: 'radio_button_unchecked',
      color: 'var(--on-surface-variant)',
      status: 'pending',
      detail: '',
    },
    {
      label: 'Hoan tien',
      icon: 'radio_button_unchecked',
      color: 'var(--on-surface-variant)',
      status: 'pending',
      detail: 'Ve vi GOMET trong 24h',
    },
  ];

  const faqs = [
    {
      q: 'Mat bao lau de nhan duoc tien hoan?',
      a: 'Sau khi yeu cau duoc phe duyet, tien se duoc hoan ve vi GOMET trong vong 24 gio. Neu ban chon hoan ve tai khoan ngan hang, thoi gian co the mat 3-5 ngay lam viec.',
    },
    {
      q: 'Toi co the huy yeu cau hoan tien khong?',
      a: 'Ban co the huy yeu cau hoan tien khi trang thai con la "Dang xem xet". Sau khi da phe duyet, yeu cau khong the huy.',
    },
  ];

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
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
      color: 'var(--on-surface)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    headerIcon: {
      fontSize: '28px',
      color: 'var(--primary)',
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    refundCard: {
      margin: '0 20px 24px',
      padding: '20px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
      textAlign: 'center',
    },
    refundAmount: {
      fontFamily: 'var(--font-headline)',
      fontSize: '32px',
      fontWeight: 800,
      color: 'var(--primary)',
      marginBottom: '6px',
    },
    refundReason: {
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
      marginBottom: '4px',
    },
    refundDate: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      opacity: 0.7,
    },
    timeline: {
      margin: '0 20px 28px',
      padding: '20px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
    },
    timelineStep: {
      display: 'flex',
      gap: '14px',
      position: 'relative',
      paddingBottom: '24px',
    },
    timelineStepLast: {
      paddingBottom: 0,
    },
    timelineLine: {
      position: 'absolute',
      left: '13px',
      top: '30px',
      width: '2px',
      bottom: 0,
      backgroundColor: 'var(--outline-variant)',
    },
    stepIcon: (color, isCurrent) => ({
      fontSize: '28px',
      color,
      flexShrink: 0,
      ...(isCurrent ? { animation: 'pulse 1.5s ease-in-out infinite' } : {}),
    }),
    stepContent: {
      flex: 1,
    },
    stepLabel: (isActive) => ({
      fontSize: '15px',
      fontWeight: isActive ? 600 : 400,
      color: isActive ? 'var(--on-surface)' : 'var(--on-surface-variant)',
    }),
    stepDetail: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      marginTop: '2px',
    },
    card: {
      margin: '0 20px 20px',
      padding: '20px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
    },
    cardTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    cardTitleIcon: {
      fontSize: '20px',
      color: 'var(--primary)',
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid var(--outline-variant)',
    },
    detailRowLast: {
      borderBottom: 'none',
    },
    detailLabel: {
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
    },
    detailValue: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    supportCard: {
      margin: '0 20px 20px',
      padding: '20px',
      borderRadius: 'var(--radius)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    },
    supportIcon: {
      fontSize: '36px',
      color: 'var(--on-primary)',
    },
    supportText: {
      flex: 1,
    },
    supportTitle: {
      fontSize: '15px',
      fontWeight: 600,
      color: 'var(--on-primary)',
    },
    supportSub: {
      fontSize: '13px',
      color: 'var(--on-primary)',
      opacity: 0.85,
    },
    supportBtn: {
      padding: '10px 20px',
      borderRadius: 'var(--radius-full)',
      border: '2px solid var(--on-primary)',
      backgroundColor: 'transparent',
      color: 'var(--on-primary)',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
    },
    faqItem: {
      borderBottom: '1px solid var(--outline-variant)',
      padding: '14px 0',
    },
    faqItemLast: {
      borderBottom: 'none',
    },
    faqQ: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      padding: 0,
      fontFamily: 'var(--font-body)',
    },
    faqQText: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    faqIcon: {
      fontSize: '20px',
      color: 'var(--on-surface-variant)',
      transition: 'transform 0.2s',
    },
    faqA: {
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.6,
      marginTop: '8px',
    },
  };

  return (
    <div style={s.page}>
      <style>{pulseKeyframes}</style>

      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="material-symbols-outlined" style={s.headerIcon}>account_balance_wallet</span>
        <h1 style={s.headerTitle}>Trang thai hoan tien</h1>
      </div>

      {/* Refund Amount Card */}
      <div style={s.refundCard}>
        <div style={s.refundAmount}>150.000 VND</div>
        <div style={s.refundReason}>Buoi hen bi huy</div>
        <div style={s.refundDate}>Yeu cau: 20/03/2026</div>
      </div>

      {/* Status Timeline */}
      <div style={s.timeline}>
        {steps.map((step, i) => (
          <div key={i} style={{ ...s.timelineStep, ...(i === steps.length - 1 ? s.timelineStepLast : {}) }}>
            {i < steps.length - 1 && <div style={s.timelineLine} />}
            <span
              className="material-symbols-outlined"
              style={s.stepIcon(step.color, step.status === 'current')}
            >
              {step.icon}
            </span>
            <div style={s.stepContent}>
              <div style={s.stepLabel(step.status !== 'pending')}>{step.label}</div>
              {step.detail && <div style={s.stepDetail}>{step.detail}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Details */}
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span className="material-symbols-outlined" style={s.cardTitleIcon}>receipt_long</span>
          Chi tiet giao dich
        </div>
        {[
          { label: 'Ma giao dich', value: 'TXN-20260320-0847' },
          { label: 'So tien goc', value: '150.000 VND' },
          { label: 'Hoan tien', value: '150.000 VND' },
          { label: 'Phuong thuc', value: 'Vi GOMET' },
        ].map((item, i, arr) => (
          <div key={i} style={{ ...s.detailRow, ...(i === arr.length - 1 ? s.detailRowLast : {}) }}>
            <span style={s.detailLabel}>{item.label}</span>
            <span style={s.detailValue}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Support */}
      <div style={s.supportCard}>
        <span className="material-symbols-outlined" style={s.supportIcon}>support_agent</span>
        <div style={s.supportText}>
          <div style={s.supportTitle}>Can tro giup?</div>
          <div style={s.supportSub}>Lien he ho tro 24/7</div>
        </div>
        <button style={s.supportBtn} onClick={() => navigate('/help')}>
          Lien he
        </button>
      </div>

      {/* FAQ */}
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span className="material-symbols-outlined" style={s.cardTitleIcon}>help</span>
          Cau hoi thuong gap
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ ...s.faqItem, ...(i === faqs.length - 1 ? s.faqItemLast : {}) }}>
            <button style={s.faqQ} onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
              <span style={s.faqQText}>{faq.q}</span>
              <span
                className="material-symbols-outlined"
                style={{ ...s.faqIcon, transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === i && <div style={s.faqA}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefundStatusPage;
