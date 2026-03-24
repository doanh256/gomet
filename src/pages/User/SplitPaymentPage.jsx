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
      backgroundColor: '#131313',
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
      color: '#FDF9F3',
      display: 'flex',
      alignItems: 'center',
    },
    headerIcon: {
      fontSize: 28,
      color: '#FFB59E',
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    totalCard: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      borderRadius: '1.5rem',
      padding: 24,
      textAlign: 'center',
      marginBottom: 24,
      color: '#3A0B00',
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
      color: '#FDF9F3',
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
      borderRadius: '1.5rem',
      background: '#1C1B1B',
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
      borderRadius: '1.5rem',
      background: 'rgba(255, 87, 26, 0.15)',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    },
    splitIcon: {
      fontSize: 26,
      color: '#E6BEB2',
    },
    splitIconActive: {
      fontSize: 26,
      color: '#FFB59E',
    },
    splitLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: '#E6BEB2',
    },
    splitLabelActive: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: '#FFB59E',
    },
    participantCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 16,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 9999,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
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
      color: '#FDF9F3',
      marginBottom: 2,
    },
    participantAmount: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
    },
    statusBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 10px',
      borderRadius: 9999,
      fontSize: 12,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
    },
    statusPaid: {
      backgroundColor: 'rgba(17, 117, 0, 0.15)',
      color: '#117500',
    },
    statusPending: {
      backgroundColor: 'rgba(255, 213, 79, 0.15)',
      color: '#FFD54F',
    },
    summaryCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 20,
      marginTop: 24,
      marginBottom: 24,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTop: '1px solid rgba(255,255,255,0.06)',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    primaryBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: 9999,
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
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      marginBottom: 10,
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s',
    },
    payOptionActive: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      backgroundColor: 'rgba(255, 87, 26, 0.15)',
      borderRadius: '1.5rem',
      marginBottom: 10,
      cursor: 'pointer',
      border: 'none',
    },
    payIcon: {
      fontSize: 24,
      color: '#E6BEB2',
    },
    payIconActive: {
      fontSize: 24,
      color: '#FFB59E',
    },
    payInfo: {
      flex: 1,
    },
    payLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    paySub: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '2px solid #353535',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    radioActive: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '2px solid #FFB59E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: '#FFB59E',
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
