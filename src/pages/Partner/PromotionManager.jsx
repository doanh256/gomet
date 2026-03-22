import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PromotionManager = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [discountType, setDiscountType] = useState('%');
  const [conditions, setConditions] = useState({ lanDau: false, nhom4: false, ngayThuong: false });

  const [promos] = useState([
    {
      id: 1,
      name: 'Giam gia mua xuan',
      discount: '-20%',
      startDate: '01/03/2026',
      endDate: '31/03/2026',
      used: 45,
      maxUses: 100,
      status: 'active',
    },
    {
      id: 2,
      name: 'Date night dac biet',
      discount: 'Mien phi do uong',
      startDate: '15/03/2026',
      endDate: '22/03/2026',
      used: 88,
      maxUses: 100,
      status: 'ending',
    },
  ]);

  const summary = {
    revenue: '8.5M VND',
    newCustomers: 67,
  };

  const discountTypes = [
    { label: '%', value: '%' },
    { label: 'VND', value: 'VND' },
    { label: 'Free item', value: 'free' },
  ];

  const s = {
    page: {
      minHeight: '100vh',
      background: 'var(--surface)',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      padding: '24px',
      maxWidth: 1200,
      margin: '0 auto',
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      flexWrap: 'wrap',
      gap: 12,
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    headerIcon: {
      fontSize: 32,
      background: 'var(--primary-gradient)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
    },
    subtitle: {
      color: 'var(--on-surface-variant)',
      fontSize: 14,
      marginBottom: 24,
    },
    gradientBtn: {
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    promoCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      marginBottom: 16,
      boxShadow: 'var(--card-shadow)',
    },
    promoHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      flexWrap: 'wrap',
      gap: 8,
    },
    promoName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
    },
    discountBadge: {
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      padding: '4px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: 14,
      fontWeight: 700,
    },
    promoMeta: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    progressTrack: {
      height: 8,
      background: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      marginBottom: 12,
    },
    progressFill: (pct) => ({
      height: '100%',
      width: `${pct}%`,
      background: pct > 80 ? 'var(--tertiary)' : 'var(--primary-gradient)',
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.5s ease',
    }),
    statusChip: (status) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 700,
      background: status === 'active' ? '#e8f5e9' : '#fff8e1',
      color: status === 'active' ? '#2e7d32' : '#f57f17',
    }),
    promoActions: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 12,
      flexWrap: 'wrap',
    },
    actionBtn: (variant) => ({
      background: variant === 'edit' ? 'var(--surface-container-high)' : variant === 'delete' ? 'var(--error-container)' : 'var(--surface-container-high)',
      color: variant === 'delete' ? 'var(--error)' : 'var(--on-surface)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '8px 16px',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }),
    formSection: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px',
      marginBottom: 24,
      boxShadow: 'var(--editorial-shadow)',
      border: '2px solid var(--primary-fixed)',
    },
    formTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 16,
      marginBottom: 16,
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    },
    label: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
    },
    input: {
      padding: '12px 16px',
      borderRadius: 'var(--radius)',
      border: '1.5px solid var(--outline-variant)',
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      background: 'var(--surface-container-low)',
      color: 'var(--on-surface)',
      outline: 'none',
    },
    chipRow: {
      display: 'flex',
      gap: 8,
      marginBottom: 16,
    },
    typeChip: (active) => ({
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      background: active ? 'var(--primary)' : 'var(--surface-container-high)',
      color: active ? 'var(--on-primary)' : 'var(--on-surface)',
      transition: 'all 0.2s',
    }),
    checkboxRow: {
      display: 'flex',
      gap: 20,
      marginBottom: 20,
      flexWrap: 'wrap',
    },
    checkItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
      cursor: 'pointer',
    },
    checkbox: {
      width: 20,
      height: 20,
      accentColor: 'var(--primary)',
      cursor: 'pointer',
    },
    summarySection: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
    },
    summaryTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
    },
    summaryCard: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      textAlign: 'center',
    },
    summaryValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--primary)',
    },
    summaryLabel: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginTop: 4,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--primary)',
      fontWeight: 600,
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      marginBottom: 16,
      padding: 0,
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate('/partner')}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.headerRow}>
        <div style={s.headerLeft}>
          <span className="material-symbols-outlined" style={s.headerIcon}>local_offer</span>
          <h1 style={s.title}>Quan ly khuyen mai</h1>
        </div>
        <button style={s.gradientBtn} onClick={() => setShowForm(!showForm)}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
          Tao khuyen mai
        </button>
      </div>
      <p style={s.subtitle}>Tao va quan ly cac chuong trinh khuyen mai</p>

      {showForm && (
        <div style={s.formSection}>
          <div style={s.formTitle}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>edit_note</span>
            Tao khuyen mai moi
          </div>

          <div style={s.formGrid}>
            <div style={s.inputGroup}>
              <label style={s.label}>Ten khuyen mai</label>
              <input style={s.input} placeholder="VD: Giam gia cuoi tuan" />
            </div>
            <div style={s.inputGroup}>
              <label style={s.label}>Gia tri giam</label>
              <input style={s.input} placeholder="VD: 20" type="number" />
            </div>
          </div>

          <div style={s.inputGroup}>
            <label style={{ ...s.label, marginBottom: 8 }}>Loai giam gia</label>
          </div>
          <div style={s.chipRow}>
            {discountTypes.map(dt => (
              <button key={dt.value} style={s.typeChip(discountType === dt.value)} onClick={() => setDiscountType(dt.value)}>
                {dt.label}
              </button>
            ))}
          </div>

          <div style={s.formGrid}>
            <div style={s.inputGroup}>
              <label style={s.label}>Ngay bat dau</label>
              <input style={s.input} type="date" />
            </div>
            <div style={s.inputGroup}>
              <label style={s.label}>Ngay ket thuc</label>
              <input style={s.input} type="date" />
            </div>
            <div style={s.inputGroup}>
              <label style={s.label}>So luong toi da</label>
              <input style={s.input} placeholder="VD: 100" type="number" />
            </div>
          </div>

          <div style={s.inputGroup}>
            <label style={{ ...s.label, marginBottom: 8, marginTop: 8 }}>Ap dung cho</label>
          </div>
          <div style={s.checkboxRow}>
            <label style={s.checkItem}>
              <input type="checkbox" style={s.checkbox} checked={conditions.lanDau} onChange={() => setConditions({ ...conditions, lanDau: !conditions.lanDau })} />
              Lan dau
            </label>
            <label style={s.checkItem}>
              <input type="checkbox" style={s.checkbox} checked={conditions.nhom4} onChange={() => setConditions({ ...conditions, nhom4: !conditions.nhom4 })} />
              Nhom 4+
            </label>
            <label style={s.checkItem}>
              <input type="checkbox" style={s.checkbox} checked={conditions.ngayThuong} onChange={() => setConditions({ ...conditions, ngayThuong: !conditions.ngayThuong })} />
              Ngay thuong
            </label>
          </div>

          <button style={s.gradientBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check</span>
            Tao khuyen mai
          </button>
        </div>
      )}

      {promos.map(promo => {
        const pct = (promo.used / promo.maxUses) * 100;
        return (
          <div key={promo.id} style={s.promoCard}>
            <div style={s.promoHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={s.promoName}>{promo.name}</span>
                <span style={s.discountBadge}>{promo.discount}</span>
              </div>
              <div style={s.statusChip(promo.status)}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  {promo.status === 'active' ? 'check_circle' : 'warning'}
                </span>
                {promo.status === 'active' ? 'Dang chay' : 'Sap het'}
              </div>
            </div>

            <div style={s.promoMeta}>
              <span style={s.metaItem}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
                {promo.startDate} - {promo.endDate}
              </span>
              <span style={s.metaItem}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>group</span>
                {promo.used}/{promo.maxUses} da su dung
              </span>
            </div>

            <div style={s.progressTrack}>
              <div style={s.progressFill(pct)} />
            </div>

            <div style={s.promoActions}>
              <button style={s.actionBtn('edit')}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                Sua
              </button>
              <button style={s.actionBtn('pause')}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>pause</span>
                Tam dung
              </button>
              <button style={s.actionBtn('delete')}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                Xoa
              </button>
            </div>
          </div>
        );
      })}

      <div style={s.summarySection}>
        <div style={s.summaryTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>insights</span>
          Hieu qua khuyen mai
        </div>
        <div style={s.summaryGrid}>
          <div style={s.summaryCard}>
            <div style={s.summaryValue}>{summary.revenue}</div>
            <div style={s.summaryLabel}>Doanh thu tu khuyen mai</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryValue}>{summary.newCustomers}</div>
            <div style={s.summaryLabel}>Khach hang moi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionManager;
