import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const timelineSteps = [
  { label: 'Dat coc', time: '15/03/2026 - 10:00', status: 'completed', icon: 'check_circle', color: '#2e7d32' },
  { label: 'Xac nhan hen', time: '16/03/2026 - 14:30', status: 'completed', icon: 'check_circle', color: '#2e7d32' },
  { label: 'Buoi hen dien ra', time: '20/03/2026 - 18:00', status: 'current', icon: 'radio_button_checked', color: 'var(--primary)' },
  { label: 'Giai ngan', time: 'Dang cho', status: 'pending', icon: 'radio_button_unchecked', color: 'var(--on-surface-variant)' },
];

const faqItems = [
  {
    q: 'Escrow la gi?',
    a: 'Escrow la dich vu giu tien trung gian. GOMET se giu tien dat coc cua ban cho den khi buoi hen hoan thanh.',
  },
  {
    q: 'Khi nao tien duoc giai ngan?',
    a: 'Tien se duoc giai ngan sau khi ca hai ben xac nhan buoi hen da dien ra thanh cong.',
  },
  {
    q: 'Lam sao de yeu cau hoan tien?',
    a: 'Ban co the yeu cau hoan tien trong vong 24h sau thoi gian hen neu buoi hen khong dien ra. GOMET se xem xet va xu ly trong 3-5 ngay lam viec.',
  },
];

const EscrowPaymentPage = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const txId = transactionId || 'ESC-20260320-0042';
  const escrowStatus = 'holding'; // 'holding' | 'released'

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 720,
      margin: '0 auto',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      marginBottom: 24,
      padding: 0,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 32,
    },
    headerIcon: {
      fontSize: 28,
      color: 'var(--primary)',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    statusCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      marginBottom: 24,
      boxShadow: 'var(--card-shadow)',
      textAlign: 'center',
    },
    statusBadge: (type) => ({
      display: 'inline-block',
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      backgroundColor: type === 'holding' ? '#fff3cd' : '#d4edda',
      color: type === 'holding' ? '#856404' : '#155724',
      marginBottom: 12,
    }),
    txIdText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    amountSection: {
      textAlign: 'center',
      marginBottom: 32,
    },
    amountValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 36,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    amountLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      marginTop: 4,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 20,
    },
    timeline: {
      position: 'relative',
      paddingLeft: 28,
      marginBottom: 32,
    },
    timelineLine: {
      position: 'absolute',
      left: 11,
      top: 4,
      bottom: 4,
      width: 2,
      backgroundColor: 'var(--outline-variant)',
    },
    timelineItem: {
      position: 'relative',
      paddingBottom: 28,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
    },
    timelineItemLast: {
      position: 'relative',
      paddingBottom: 0,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
    },
    timelineDot: (color) => ({
      position: 'absolute',
      left: -28,
      top: 0,
      fontSize: 22,
      color: color,
      backgroundColor: 'var(--surface)',
      zIndex: 1,
      display: 'flex',
    }),
    timelineLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    timelineTime: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginTop: 2,
    },
    infoCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      marginBottom: 28,
      boxShadow: 'var(--card-shadow)',
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '10px 0',
      borderBottom: '1px solid var(--outline-variant)',
    },
    infoRowLast: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '10px 0',
    },
    infoIcon: {
      fontSize: 20,
      color: 'var(--on-surface-variant)',
    },
    infoLabel: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    infoValue: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    partnerRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0',
      borderBottom: '1px solid var(--outline-variant)',
    },
    partnerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      objectFit: 'cover',
    },
    partnerName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    actions: {
      display: 'flex',
      gap: 12,
      marginBottom: 32,
    },
    btnPrimary: {
      flex: 1,
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '14px 20px',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    btnOutline: {
      flex: 1,
      background: 'transparent',
      color: 'var(--error)',
      border: '2px solid var(--error)',
      borderRadius: 'var(--radius-full)',
      padding: '14px 20px',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    faqSection: {
      marginBottom: 20,
    },
    faqHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12,
    },
    faqItem: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      marginBottom: 8,
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    },
    faqQuestion: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 18px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
      background: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
    },
    faqExpandIcon: (expanded) => ({
      fontSize: 20,
      color: 'var(--on-surface-variant)',
      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s',
    }),
    faqAnswer: {
      padding: '0 18px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      lineHeight: 1.6,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.headerRow}>
        <span className="material-symbols-outlined" style={s.headerIcon}>lock</span>
        <h1 style={s.heading}>Chi tiet giao dich</h1>
      </div>

      {/* Status card */}
      <div style={s.statusCard}>
        <div style={s.statusBadge(escrowStatus)}>
          {escrowStatus === 'holding' ? 'DANG GIU' : 'DA GIAI NGAN'}
        </div>
        <div style={s.txIdText}>Ma giao dich: {txId}</div>
      </div>

      {/* Amount */}
      <div style={s.amountSection}>
        <div style={s.amountValue}>150.000 VND</div>
        <div style={s.amountLabel}>Escrow boi GOMET</div>
      </div>

      {/* Timeline */}
      <h2 style={s.sectionTitle}>Tien trinh</h2>
      <div style={s.timeline}>
        <div style={s.timelineLine} />
        {timelineSteps.map((step, i) => (
          <div key={i} style={i === timelineSteps.length - 1 ? s.timelineItemLast : s.timelineItem}>
            <div style={s.timelineDot(step.color)}>
              <span className="material-symbols-outlined filled" style={{ fontSize: 22 }}>{step.icon}</span>
            </div>
            <div>
              <div style={s.timelineLabel}>{step.label}</div>
              <div style={s.timelineTime}>{step.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Date info card */}
      <h2 style={s.sectionTitle}>Thong tin buoi hen</h2>
      <div style={s.infoCard}>
        <div style={s.partnerRow}>
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
            alt="Partner"
            style={s.partnerAvatar}
          />
          <span style={s.partnerName}>Minh Anh</span>
        </div>
        <div style={s.infoRow}>
          <span className="material-symbols-outlined" style={s.infoIcon}>calendar_today</span>
          <span style={s.infoLabel}>Ngay hen</span>
          <span style={s.infoValue}>20/03/2026</span>
        </div>
        <div style={s.infoRow}>
          <span className="material-symbols-outlined" style={s.infoIcon}>schedule</span>
          <span style={s.infoLabel}>Thoi gian</span>
          <span style={s.infoValue}>18:00</span>
        </div>
        <div style={s.infoRow}>
          <span className="material-symbols-outlined" style={s.infoIcon}>location_on</span>
          <span style={s.infoLabel}>Dia diem</span>
          <span style={s.infoValue}>The Lissome Cafe</span>
        </div>
        <div style={s.infoRowLast}>
          <span className="material-symbols-outlined" style={s.infoIcon}>payments</span>
          <span style={s.infoLabel}>So tien</span>
          <span style={s.infoValue}>150.000 VND</span>
        </div>
      </div>

      {/* Actions */}
      <div style={s.actions}>
        <button style={s.btnPrimary}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
          Xac nhan hoan thanh
        </button>
        <button style={s.btnOutline}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>undo</span>
          Yeu cau hoan tien
        </button>
      </div>

      {/* FAQ */}
      <div style={s.faqSection}>
        <div style={s.faqHeader}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>policy</span>
          <h2 style={s.sectionTitle}>Chinh sach escrow</h2>
        </div>
        {faqItems.map((item, i) => (
          <div key={i} style={s.faqItem}>
            <button
              style={s.faqQuestion}
              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
            >
              {item.q}
              <span
                className="material-symbols-outlined"
                style={s.faqExpandIcon(expandedFaq === i)}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === i && (
              <div style={s.faqAnswer}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscrowPaymentPage;
