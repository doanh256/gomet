import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const bookingKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
`;

const tasteMatch = [
  { label: 'Vi giong nhau', value: 92, color: '#FF571A' },
  { label: 'Do cay', value: 85, color: '#E91E63' },
  { label: 'Phong cach', value: 88, color: '#FFD54F' },
  { label: 'Ngan sach', value: 95, color: '#117500' },
];

const paymentMethods = [
  { id: 'gomet', icon: 'account_balance_wallet', label: 'Vi GOMET', desc: 'So du: 1.200.000d' },
  { id: 'momo', icon: 'account_balance', label: 'MoMo', desc: 'Lien ket tai khoan' },
  { id: 'card', icon: 'credit_card', label: 'Credit Card', desc: 'Visa/Mastercard' },
];

const SecretTableBookingPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('gomet');
  const [confirmed, setConfirmed] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const s = {
    page: {
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      padding: '40px 24px 100px', maxWidth: 600, margin: '0 auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: '#FDF9F3',
    },
    backBtn: {
      background: 'none', border: 'none', cursor: 'pointer', color: '#E6BEB2',
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, marginBottom: 28, padding: 0,
    },
    heading: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 24, fontWeight: 800, color: '#FDF9F3', marginBottom: 24,
    },
    eventCard: {
      padding: '20px', borderRadius: '1.5rem',
      background: 'linear-gradient(135deg, rgba(255,87,26,0.12), rgba(255,181,158,0.06))',
      border: '1px solid rgba(255,87,26,0.15)', marginBottom: 28,
    },
    eventName: {
      fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800,
      color: '#FFD54F', marginBottom: 4,
    },
    eventRestaurant: { fontSize: 14, color: '#FDF9F3', marginBottom: 12 },
    detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
    detailItem: {
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 12px', borderRadius: '0.75rem',
      backgroundColor: 'rgba(255,255,255,0.04)',
    },
    detailIcon: { fontSize: 18, color: '#FFB59E' },
    detailText: { fontSize: 13, color: '#E6BEB2' },
    detailValue: { fontSize: 13, fontWeight: 700, color: '#FDF9F3' },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
      color: '#FFD54F', marginBottom: 14, letterSpacing: '0.04em',
      display: 'flex', alignItems: 'center', gap: 8,
    },
    sectionIcon: { fontSize: 20 },
    synergyCard: {
      padding: '20px', borderRadius: '1.5rem', backgroundColor: '#1C1B1B',
      marginBottom: 28,
    },
    matchGrid: { display: 'flex', flexDirection: 'column', gap: 12 },
    matchItem: {
      display: 'flex', alignItems: 'center', gap: 12,
    },
    matchLabel: { fontSize: 13, color: '#E6BEB2', width: 100 },
    matchBarBg: {
      flex: 1, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.06)',
      overflow: 'hidden',
    },
    matchBarFill: (pct, color) => ({
      height: '100%', borderRadius: 4, width: `${pct}%`, backgroundColor: color,
      transition: 'width 0.5s ease',
    }),
    matchValue: {
      fontFamily: 'var(--font-headline)', fontSize: 13, fontWeight: 800,
      color: '#FF571A', width: 40, textAlign: 'right',
    },
    paymentList: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 },
    paymentItem: (selected) => ({
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px', borderRadius: '1rem',
      backgroundColor: selected ? 'rgba(255,87,26,0.12)' : '#1C1B1B',
      border: selected ? '2px solid #FF571A' : '2px solid transparent',
      cursor: 'pointer',
    }),
    paymentIcon: (selected) => ({
      fontSize: 24, color: selected ? '#FF571A' : '#E6BEB2',
    }),
    paymentInfo: { flex: 1 },
    paymentLabel: { fontSize: 14, fontWeight: 700, color: '#FDF9F3' },
    paymentDesc: { fontSize: 12, color: '#E6BEB2' },
    paymentRadio: (selected) => ({
      width: 20, height: 20, borderRadius: '50%',
      border: `2px solid ${selected ? '#FF571A' : '#666'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }),
    paymentRadioDot: {
      width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF571A',
    },
    priceRow: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px', borderRadius: '1rem', backgroundColor: '#1C1B1B',
      marginBottom: 16,
    },
    priceLabel: { fontSize: 14, color: '#E6BEB2' },
    priceValue: {
      fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 800, color: '#FFD54F',
    },
    termsRow: {
      display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24,
    },
    checkbox: (checked) => ({
      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
      border: `2px solid ${checked ? '#FF571A' : '#666'}`,
      backgroundColor: checked ? '#FF571A' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', marginTop: 2,
    }),
    checkIcon: { fontSize: 16, color: '#FDF9F3' },
    termsText: { fontSize: 12, color: '#E6BEB2', lineHeight: 1.6 },
    confirmBtn: (enabled) => ({
      width: '100%', padding: '16px', borderRadius: '9999px', border: 'none',
      background: enabled
        ? 'linear-gradient(135deg, #FFD54F, #F57C00)'
        : 'rgba(255,255,255,0.1)',
      color: enabled ? '#1a1a1a' : '#666',
      fontSize: 16, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: enabled ? 'pointer' : 'not-allowed',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }),
    confirmedSection: {
      textAlign: 'center', animation: 'fadeInUp 0.5s ease-out',
    },
    qrPlaceholder: {
      width: 180, height: 180, margin: '0 auto 20px',
      borderRadius: '1rem', backgroundColor: '#FDF9F3',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    qrIcon: { fontSize: 80, color: '#131313' },
    confirmedText: {
      fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800,
      color: '#117500', marginBottom: 8,
    },
    confirmedDesc: { fontSize: 14, color: '#E6BEB2', marginBottom: 24 },
    doneBtn: {
      width: '100%', padding: '16px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3', fontSize: 16, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
    },
  };

  if (confirmed) {
    return (
      <div style={s.page}>
        <style>{bookingKeyframes}</style>
        <div style={s.confirmedSection}>
          <div style={s.qrPlaceholder}>
            <span className="material-symbols-outlined" style={s.qrIcon}>qr_code_2</span>
          </div>
          <div style={s.confirmedText}>Dat cho thanh cong!</div>
          <div style={s.confirmedDesc}>
            Trinh ma QR nay tai quay le tan. Hen gap ban tai The Midnight Pho!
          </div>
          <button style={s.doneBtn} onClick={() => navigate('/app/home')}>
            Ve trang chu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <style>{bookingKeyframes}</style>

      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.heading}>Xac nhan dat cho</div>

      {/* Event Details */}
      <div style={s.eventCard}>
        <div style={s.eventName}>The Midnight Pho</div>
        <div style={s.eventRestaurant}>Pho Thin Secret Kitchen</div>
        <div style={s.detailGrid}>
          <div style={s.detailItem}>
            <span className="material-symbols-outlined" style={s.detailIcon}>calendar_today</span>
            <div>
              <div style={s.detailText}>Ngay</div>
              <div style={s.detailValue}>28/03/2026</div>
            </div>
          </div>
          <div style={s.detailItem}>
            <span className="material-symbols-outlined" style={s.detailIcon}>schedule</span>
            <div>
              <div style={s.detailText}>Gio</div>
              <div style={s.detailValue}>20:00</div>
            </div>
          </div>
          <div style={s.detailItem}>
            <span className="material-symbols-outlined" style={s.detailIcon}>payments</span>
            <div>
              <div style={s.detailText}>Gia</div>
              <div style={s.detailValue}>500.000 VND</div>
            </div>
          </div>
          <div style={s.detailItem}>
            <span className="material-symbols-outlined" style={s.detailIcon}>event_seat</span>
            <div>
              <div style={s.detailText}>Cho ngoi</div>
              <div style={s.detailValue}>3 con lai</div>
            </div>
          </div>
        </div>
      </div>

      {/* Synergy Profile */}
      <div style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>psychology</span>
        Synergy Profile
      </div>
      <div style={s.synergyCard}>
        <div style={s.matchGrid}>
          {tasteMatch.map(m => (
            <div key={m.label} style={s.matchItem}>
              <div style={s.matchLabel}>{m.label}</div>
              <div style={s.matchBarBg}>
                <div style={s.matchBarFill(m.value, m.color)} />
              </div>
              <div style={s.matchValue}>{m.value}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>payment</span>
        Phuong thuc thanh toan
      </div>
      <div style={s.paymentList}>
        {paymentMethods.map(pm => (
          <div
            key={pm.id}
            style={s.paymentItem(selectedPayment === pm.id)}
            onClick={() => setSelectedPayment(pm.id)}
          >
            <span className="material-symbols-outlined" style={s.paymentIcon(selectedPayment === pm.id)}>
              {pm.icon}
            </span>
            <div style={s.paymentInfo}>
              <div style={s.paymentLabel}>{pm.label}</div>
              <div style={s.paymentDesc}>{pm.desc}</div>
            </div>
            <div style={s.paymentRadio(selectedPayment === pm.id)}>
              {selectedPayment === pm.id && <div style={s.paymentRadioDot} />}
            </div>
          </div>
        ))}
      </div>

      {/* Price */}
      <div style={s.priceRow}>
        <div style={s.priceLabel}>Tong thanh toan</div>
        <div style={s.priceValue}>500.000 VND</div>
      </div>

      {/* Terms */}
      <div style={s.termsRow}>
        <div style={s.checkbox(agreedTerms)} onClick={() => setAgreedTerms(!agreedTerms)}>
          {agreedTerms && <span className="material-symbols-outlined" style={s.checkIcon}>check</span>}
        </div>
        <div style={s.termsText}>
          Toi dong y voi dieu khoan su dung va chinh sach huy. Huy truoc 24h duoc hoan 80%.
          Huy trong vong 24h truoc su kien se khong duoc hoan tien.
        </div>
      </div>

      {/* Confirm */}
      <button
        style={s.confirmBtn(agreedTerms)}
        onClick={() => agreedTerms && setConfirmed(true)}
        disabled={!agreedTerms}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
        Xac nhan dat cho
      </button>
    </div>
  );
};

export default SecretTableBookingPage;
