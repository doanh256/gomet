import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const timelineSteps = [
  { label: 'Đặt cọc', time: '15/03/2026 - 10:00', status: 'completed', icon: 'check_circle', color: '#117500' },
  { label: 'Xác nhận hẹn', time: '16/03/2026 - 14:30', status: 'completed', icon: 'check_circle', color: '#117500' },
  { label: 'Buổi hẹn diễn ra', time: '20/03/2026 - 18:00', status: 'current', icon: 'radio_button_checked', color: '#FFB59E' },
  { label: 'Giải ngân', time: 'Đang chờ', status: 'pending', icon: 'radio_button_unchecked', color: '#E6BEB2' },
];

const faqItems = [
  {
    q: 'Escrow là gì?',
    a: 'Escrow là dịch vụ giữ tiền trung gian. GOMET sẽ giữ tiền đặt cọc của bạn cho đến khi buổi hẹn hoàn thành.',
  },
  {
    q: 'Khi nào tiền được giải ngân?',
    a: 'Tiền sẽ được giải ngân sau khi cả hai bên xác nhận buổi hẹn đã diễn ra thành công.',
  },
  {
    q: 'Làm sao để yêu cầu hoàn tiền?',
    a: 'Bạn có thể yêu cầu hoàn tiền trong vòng 24h sau thời gian hẹn nếu buổi hẹn không diễn ra. GOMET sẽ xem xét và xử lý trong 3-5 ngày làm việc.',
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
      color: '#FFB59E',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
    },
    statusCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '24px',
      marginBottom: 24,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      textAlign: 'center',
    },
    statusBadge: (type) => ({
      display: 'inline-block',
      padding: '8px 20px',
      borderRadius: '9999px',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      backgroundColor: type === 'holding' ? 'rgba(255,213,79,0.15)' : 'rgba(17,117,0,0.2)',
      color: type === 'holding' ? '#FFD54F' : '#117500',
      marginBottom: 12,
    }),
    txIdText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
    },
    amountSection: {
      textAlign: 'center',
      marginBottom: 32,
    },
    amountValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 36,
      fontWeight: 800,
      color: '#FDF9F3',
    },
    amountLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
      marginTop: 4,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 17,
      fontWeight: 700,
      color: '#FDF9F3',
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
      backgroundColor: '#353535',
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
      backgroundColor: '#131313',
      zIndex: 1,
      display: 'flex',
    }),
    timelineLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    timelineTime: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
      marginTop: 2,
    },
    infoCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '20px',
      marginBottom: 28,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '10px 0',
    },
    infoRowLast: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '10px 0',
    },
    infoIcon: {
      fontSize: 20,
      color: '#E6BEB2',
    },
    infoLabel: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
    },
    infoValue: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    partnerRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0',
    },
    partnerAvatar: {
      width: 40,
      height: 40,
      borderRadius: '9999px',
      objectFit: 'cover',
    },
    partnerName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    actions: {
      display: 'flex',
      gap: 12,
      marginBottom: 32,
    },
    btnPrimary: {
      flex: 1,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
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
      color: '#FF571A',
      border: 'none',
      borderRadius: '9999px',
      padding: '14px 20px',
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: 'rgba(255,87,26,0.1)',
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
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      marginBottom: 8,
      overflow: 'hidden',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
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
      color: '#FDF9F3',
      background: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
    },
    faqExpandIcon: (expanded) => ({
      fontSize: 20,
      color: '#E6BEB2',
      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s',
    }),
    faqAnswer: {
      padding: '0 18px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
      lineHeight: 1.6,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lại
      </button>

      <div style={s.headerRow}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>lock</span>
        <h1 style={s.heading}>Chi tiết giao dịch</h1>
      </div>

      {/* Status card */}
      <div style={s.statusCard}>
        <div style={s.statusBadge(escrowStatus)}>
          {escrowStatus === 'holding' ? 'ĐANG GIỮ' : 'ĐÃ GIẢI NGÂN'}
        </div>
        <div style={s.txIdText}>Mã giao dịch: {txId}</div>
      </div>

      {/* Amount */}
      <div style={s.amountSection}>
        <div style={s.amountValue}>150.000 VND</div>
        <div style={s.amountLabel}>Escrow bởi GOMET</div>
      </div>

      {/* Timeline */}
      <h2 style={s.sectionTitle}>Tiến trình</h2>
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
      <h2 style={s.sectionTitle}>Thông tin buổi hẹn</h2>
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
          <span aria-hidden="true" className="material-symbols-outlined" style={s.infoIcon}>calendar_today</span>
          <span style={s.infoLabel}>Ngày hẹn</span>
          <span style={s.infoValue}>20/03/2026</span>
        </div>
        <div style={s.infoRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.infoIcon}>schedule</span>
          <span style={s.infoLabel}>Thời gian</span>
          <span style={s.infoValue}>18:00</span>
        </div>
        <div style={s.infoRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.infoIcon}>location_on</span>
          <span style={s.infoLabel}>Địa điểm</span>
          <span style={s.infoValue}>The Lissome Cafe</span>
        </div>
        <div style={s.infoRowLast}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.infoIcon}>payments</span>
          <span style={s.infoLabel}>Số tiền</span>
          <span style={s.infoValue}>150.000 VND</span>
        </div>
      </div>

      {/* Actions */}
      <div style={s.actions}>
        <button style={s.btnPrimary}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
          Xác nhận hoàn thành
        </button>
        <button style={s.btnOutline}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>undo</span>
          Yêu cầu hoàn tiền
        </button>
      </div>

      {/* FAQ */}
      <div style={s.faqSection}>
        <div style={s.faqHeader}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#E6BEB2' }}>policy</span>
          <h2 style={s.sectionTitle}>Chính sách escrow</h2>
        </div>
        {faqItems.map((item, i) => (
          <div key={i} style={s.faqItem}>
            <button
              style={s.faqQuestion}
              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
            >
              {item.q}
              <span
                aria-hidden="true" className="material-symbols-outlined"
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
