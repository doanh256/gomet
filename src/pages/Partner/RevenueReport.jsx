import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RevenueReport = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState('Thang nay');

  const periods = ['Thang nay', 'Thang truoc', 'Quy nay'];

  const summary = [
    { label: 'Tong doanh thu', value: '45.2M VND', icon: 'account_balance', change: '+18%', changeColor: '#2e7d32', changeIcon: 'trending_up' },
    { label: 'So giao dich', value: '234', icon: 'receipt_long', change: '+12%', changeColor: '#2e7d32', changeIcon: 'trending_up' },
    { label: 'Gia tri TB', value: '193k VND', icon: 'analytics', change: '+5%', changeColor: '#2e7d32', changeIcon: 'trending_up' },
  ];

  const dailyRevenue = [
    { day: '08', value: 2.8 }, { day: '09', value: 3.5 }, { day: '10', value: 2.1 },
    { day: '11', value: 4.2 }, { day: '12', value: 3.8 }, { day: '13', value: 5.1 },
    { day: '14', value: 4.5 }, { day: '15', value: 3.0 }, { day: '16', value: 3.9 },
    { day: '17', value: 2.5 }, { day: '18', value: 4.8 }, { day: '19', value: 5.5 },
    { day: '20', value: 6.2 }, { day: '21', value: 5.8 },
  ];
  const maxRevenue = Math.max(...dailyRevenue.map(d => d.value));

  const transactions = [
    { id: 1, date: '22/03', desc: 'Dat cho - Nguyen Van A', amount: '+850k', type: 'Dat cho', positive: true },
    { id: 2, date: '22/03', desc: 'Su kien sinh nhat - Tran B', amount: '+2.5M', type: 'Su kien', positive: true },
    { id: 3, date: '21/03', desc: 'Hoan tien - Le Van C', amount: '-50k', type: 'Hoan tien', positive: false },
    { id: 4, date: '21/03', desc: 'Dat cho - Pham Thi D', amount: '+650k', type: 'Dat cho', positive: true },
    { id: 5, date: '20/03', desc: 'Khuyen mai - Vo E', amount: '+420k', type: 'Khuyen mai', positive: true },
    { id: 6, date: '20/03', desc: 'Dat cho - Hoang F', amount: '+780k', type: 'Dat cho', positive: true },
    { id: 7, date: '19/03', desc: 'Su kien hop mat - Dang G', amount: '+3.2M', type: 'Su kien', positive: true },
    { id: 8, date: '19/03', desc: 'Hoan tien - Bui H', amount: '-120k', type: 'Hoan tien', positive: false },
    { id: 9, date: '18/03', desc: 'Dat cho - Ngo I', amount: '+550k', type: 'Dat cho', positive: true },
    { id: 10, date: '18/03', desc: 'Khuyen mai - Mai K', amount: '+380k', type: 'Khuyen mai', positive: true },
  ];

  const distribution = [
    { label: 'Dat cho', percent: 60, color: 'var(--primary)' },
    { label: 'Su kien', percent: 25, color: 'var(--tertiary)' },
    { label: 'Khuyen mai', percent: 15, color: 'var(--outline)' },
  ];

  const getTypeChipStyle = (type) => {
    if (type === 'Dat cho') return { background: 'var(--primary-fixed)', color: 'var(--on-primary-container)' };
    if (type === 'Su kien') return { background: 'var(--tertiary-container)', color: '#fff' };
    if (type === 'Khuyen mai') return { background: '#e8f5e9', color: '#2e7d32' };
    return { background: 'var(--error-container)', color: 'var(--error)' };
  };

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
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
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
    chipRow: {
      display: 'flex',
      gap: 8,
      marginBottom: 24,
      flexWrap: 'wrap',
    },
    chip: (active) => ({
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
    summaryRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16,
      marginBottom: 32,
    },
    summaryCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
    },
    summaryIcon: {
      fontSize: 28,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    summaryValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      marginBottom: 4,
    },
    summaryLabel: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 8,
    },
    summaryChange: (color) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 13,
      fontWeight: 600,
      color: color,
    }),
    section: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      marginBottom: 24,
      boxShadow: 'var(--card-shadow)',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    chartContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8,
      height: 180,
      padding: '0 4px',
    },
    barWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    },
    bar: (heightPct, isEven) => ({
      width: '100%',
      maxWidth: 40,
      height: `${heightPct}%`,
      background: isEven ? 'var(--primary)' : 'var(--primary-container)',
      borderRadius: '6px 6px 3px 3px',
      transition: 'height 0.4s ease',
    }),
    barLabel: {
      fontSize: 11,
      color: 'var(--on-surface-variant)',
      fontWeight: 500,
    },
    txList: {
      display: 'flex',
      flexDirection: 'column',
    },
    txRow: (isOdd) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '14px 0',
      gap: 16,
      borderBottom: '1px solid var(--outline-variant)',
      background: isOdd ? 'transparent' : 'transparent',
      flexWrap: 'wrap',
    }),
    txDate: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      minWidth: 50,
      fontWeight: 500,
    },
    txDesc: {
      flex: 1,
      fontSize: 14,
      fontWeight: 500,
      minWidth: 160,
    },
    txAmount: (positive) => ({
      fontSize: 15,
      fontWeight: 700,
      color: positive ? '#2e7d32' : 'var(--error)',
      minWidth: 80,
      textAlign: 'right',
    }),
    txType: (type) => ({
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      ...getTypeChipStyle(type),
    }),
    exportRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 24,
    },
    exportBtn: {
      background: 'var(--surface-container-high)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--on-surface)',
    },
    distBar: {
      marginBottom: 16,
    },
    distLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6,
      fontSize: 14,
      fontWeight: 500,
    },
    distTrack: {
      height: 14,
      background: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    distFill: (percent, color) => ({
      height: '100%',
      width: `${percent}%`,
      background: color,
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.6s ease',
    }),
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

      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>account_balance</span>
        <h1 style={s.title}>Bao cao doanh thu</h1>
      </div>
      <p style={s.subtitle}>Theo doi doanh thu va giao dich cua dia diem</p>

      <div style={s.chipRow}>
        {periods.map(p => (
          <button key={p} style={s.chip(activePeriod === p)} onClick={() => setActivePeriod(p)}>
            {p}
          </button>
        ))}
      </div>

      <div style={s.summaryRow}>
        {summary.map((st, i) => (
          <div key={i} style={s.summaryCard}>
            <span className="material-symbols-outlined" style={s.summaryIcon}>{st.icon}</span>
            <div style={s.summaryValue}>{st.value}</div>
            <div style={s.summaryLabel}>{st.label}</div>
            <div style={s.summaryChange(st.changeColor)}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{st.changeIcon}</span>
              {st.change}
            </div>
          </div>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>bar_chart</span>
          Doanh thu theo ngay
        </div>
        <div style={s.chartContainer}>
          {dailyRevenue.map((d, i) => (
            <div key={i} style={s.barWrapper}>
              <div style={s.bar((d.value / maxRevenue) * 100, i % 2 === 0)} />
              <span style={s.barLabel}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>list_alt</span>
          Chi tiet giao dich
        </div>
        <div style={s.txList}>
          {transactions.map((tx, i) => (
            <div key={tx.id} style={s.txRow(i % 2 !== 0)}>
              <span style={s.txDate}>{tx.date}</span>
              <span style={s.txDesc}>{tx.desc}</span>
              <span style={s.txAmount(tx.positive)}>{tx.amount}</span>
              <span style={s.txType(tx.type)}>{tx.type}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.exportRow}>
        <button style={s.exportBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>picture_as_pdf</span>
          Xuat PDF
        </button>
        <button style={s.exportBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>table_chart</span>
          Xuat Excel
        </button>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>donut_large</span>
          Phan bo doanh thu
        </div>
        {distribution.map((d, i) => (
          <div key={i} style={s.distBar}>
            <div style={s.distLabel}>
              <span>{d.label}</span>
              <span style={{ fontWeight: 700 }}>{d.percent}%</span>
            </div>
            <div style={s.distTrack}>
              <div style={s.distFill(d.percent, d.color)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueReport;
