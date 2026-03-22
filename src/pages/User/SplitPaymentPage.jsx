import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const splitMethods = [
  { id: 'equal', label: 'Chia deu', icon: 'vertical_split' },
  { id: 'byItem', label: 'Chia theo mon', icon: 'list_alt' },
  { id: 'custom', label: 'Tu nhap', icon: 'edit' },
];

const participants = [
  { id: 1, name: 'Ban (Minh Anh)', avatar: 'MA', amount: 425000, status: 'paid' },
  { id: 2, name: 'Thanh Tung', avatar: 'TT', amount: 425000, status: 'pending' },
];

const paymentMethods = [
  { id: 'gomet', label: 'Vi GOMET', icon: 'account_balance_wallet', sub: 'So du: 1.200.000 VND' },
  { id: 'momo', label: 'MoMo', icon: 'phone_android', sub: '***456' },
  { id: 'bank', label: 'The ngan hang', icon: 'credit_card', sub: 'Vietcombank ***789' },
];

const formatVND = (n) => n.toLocaleString('vi-VN') + ' VND';

const SplitPaymentPage = () => {
  const navigate = useNavigate();
  const [splitMethod, setSplitMethod] = useState('equal');
  const [payMethod, setPayMethod] = useState('gomet');

  const subtotal = 425000;
  const serviceFee = Math.round(subtotal * 0.05);
  const totalPerPerson = subtotal + serviceFee;

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 28,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--on-surface)',
      display: 'flex',
      alignItems: 'center',
    },
    headerIcon: {
      fontSize: 28,
      color: 'var(--primary)',
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    totalCard: {
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      textAlign: 'center',
      marginBottom: 24,
      color: 'var(--on-primary)',
    },
    totalLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      opacity: 0.85,
      marginBottom: 4,
    },
    totalAmount: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 800,
      marginBottom: 6,
    },
    totalVenue: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      opacity: 0.8,
    },
    sectionLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 12,
    },
    splitRow: {
      display: 'flex',
      gap: 10,
      marginBottom: 24,
    },
    splitCard: {
      flex: 1,
      padding: '14px 8px',
      borderRadius: 'var(--radius)',
      border: '2px solid var(--outline-variant)',
      background: 'var(--surface-container-lowest)',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      transition: 'all 0.2s',
    },
    splitCardActive: {
      flex: 1,
      padding: '14px 8px',
      borderRadius: 'var(--radius)',
      border: '2px solid var(--primary)',
      background: 'var(--primary-fixed)',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    },
    splitIcon: {
      fontSize: 26,
      color: 'var(--on-surface-variant)',
    },
    splitIconActive: {
      fontSize: 26,
      color: 'var(--primary)',
    },
    splitLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
    },
    splitLabelActive: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--primary)',
    },
    participantCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 16,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: 'var(--card-shadow)',
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      flexShrink: 0,
    },
    participantInfo: {
      flex: 1,
    },
    participantName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: 2,
    },
    participantAmount: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    statusBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
    },
    statusPaid: {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
    },
    statusPending: {
      backgroundColor: '#fff8e1',
      color: '#f57f17',
    },
    summaryCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 20,
      marginTop: 24,
      marginBottom: 24,
      boxShadow: 'var(--card-shadow)',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTop: '1px solid var(--outline-variant)',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    primaryBtn: {
      width: '100%',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '16px 24px',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 28,
    },
    payOption: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      marginBottom: 10,
      cursor: 'pointer',
      border: '2px solid var(--outline-variant)',
      transition: 'all 0.2s',
    },
    payOptionActive: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      backgroundColor: 'var(--primary-fixed)',
      borderRadius: 'var(--radius)',
      marginBottom: 10,
      cursor: 'pointer',
      border: '2px solid var(--primary)',
    },
    payIcon: {
      fontSize: 24,
      color: 'var(--on-surface-variant)',
    },
    payIconActive: {
      fontSize: 24,
      color: 'var(--primary)',
    },
    payInfo: {
      flex: 1,
    },
    payLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    paySub: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '2px solid var(--outline-variant)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    radioActive: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '2px solid var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: 'var(--primary)',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="material-symbols-outlined" style={s.headerIcon}>receipt_long</span>
        <h1 style={s.headerTitle}>Chia hoa don</h1>
      </div>

      <div style={s.totalCard}>
        <div style={s.totalLabel}>Tong hoa don</div>
        <div style={s.totalAmount}>850.000 VND</div>
        <div style={s.totalVenue}>The Loft Saigon</div>
      </div>

      <div style={s.sectionLabel}>Phuong thuc chia</div>
      <div style={s.splitRow}>
        {splitMethods.map((m) => {
          const active = splitMethod === m.id;
          return (
            <div
              key={m.id}
              style={active ? s.splitCardActive : s.splitCard}
              onClick={() => setSplitMethod(m.id)}
            >
              <span className="material-symbols-outlined" style={active ? s.splitIconActive : s.splitIcon}>
                {m.icon}
              </span>
              <span style={active ? s.splitLabelActive : s.splitLabel}>{m.label}</span>
            </div>
          );
        })}
      </div>

      <div style={s.sectionLabel}>Thanh vien ({participants.length})</div>
      {participants.map((p) => (
        <div style={s.participantCard} key={p.id}>
          <div style={s.avatar}>{p.avatar}</div>
          <div style={s.participantInfo}>
            <div style={s.participantName}>{p.name}</div>
            <div style={s.participantAmount}>{formatVND(p.amount)}</div>
          </div>
          <div style={{ ...s.statusBadge, ...(p.status === 'paid' ? s.statusPaid : s.statusPending) }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {p.status === 'paid' ? 'check_circle' : 'schedule'}
            </span>
            {p.status === 'paid' ? 'Da tra' : 'Cho'}
          </div>
        </div>
      ))}

      <div style={s.summaryCard}>
        <div style={s.sectionLabel}>Chi tiet thanh toan</div>
        <div style={s.summaryRow}>
          <span>Phan cua ban</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <div style={s.summaryRow}>
          <span>Phi dich vu (5%)</span>
          <span>{formatVND(serviceFee)}</span>
        </div>
        <div style={s.summaryTotal}>
          <span>Tong cong</span>
          <span>{formatVND(totalPerPerson)}</span>
        </div>
      </div>

      <button style={s.primaryBtn}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>payments</span>
        Thanh toan {formatVND(totalPerPerson)}
      </button>

      <div style={s.sectionLabel}>Phuong thuc thanh toan</div>
      {paymentMethods.map((pm) => {
        const active = payMethod === pm.id;
        return (
          <div
            key={pm.id}
            style={active ? s.payOptionActive : s.payOption}
            onClick={() => setPayMethod(pm.id)}
          >
            <span className="material-symbols-outlined" style={active ? s.payIconActive : s.payIcon}>
              {pm.icon}
            </span>
            <div style={s.payInfo}>
              <div style={s.payLabel}>{pm.label}</div>
              <div style={s.paySub}>{pm.sub}</div>
            </div>
            <div style={active ? s.radioActive : s.radio}>
              {active && <div style={s.radioDot} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SplitPaymentPage;
