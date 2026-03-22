import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VenueAnalytics = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState('7 ngay');
  const [hoveredBar, setHoveredBar] = useState(null);

  const periods = ['7 ngay', '30 ngay', '3 thang', '1 nam'];

  const stats = [
    { label: 'Tong luot xem', value: '12,450', icon: 'visibility', change: '+12%' },
    { label: 'Ty le dat cho', value: '68%', icon: 'event_available', change: '+5%' },
    { label: 'Danh gia TB', value: '4.7', icon: 'star', change: '+0.2' },
    { label: 'Khach quay lai', value: '42%', icon: 'replay', change: '+8%' },
  ];

  const weeklyViews = [
    { day: 'T2', value: 1420 },
    { day: 'T3', value: 1680 },
    { day: 'T4', value: 1550 },
    { day: 'T5', value: 1890 },
    { day: 'T6', value: 2340 },
    { day: 'T7', value: 2850 },
    { day: 'CN', value: 2720 },
  ];
  const maxView = Math.max(...weeklyViews.map(d => d.value));

  const peakHours = {
    rows: ['Sang', 'Trua', 'Toi'],
    cols: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    data: [
      [0.2, 0.15, 0.25, 0.2, 0.3, 0.5, 0.45],
      [0.5, 0.55, 0.5, 0.6, 0.7, 0.85, 0.8],
      [0.7, 0.75, 0.65, 0.8, 0.95, 1.0, 0.9],
    ],
  };

  const sources = [
    { label: 'GOMET App', percent: 65, color: 'var(--primary)' },
    { label: 'Tim kiem', percent: 20, color: 'var(--tertiary)' },
    { label: 'Gioi thieu', percent: 15, color: 'var(--outline)' },
  ];

  const ratingTrend = [
    { month: 'Thang 12', rating: 4.5, trend: 'up' },
    { month: 'Thang 1', rating: 4.6, trend: 'up' },
    { month: 'Thang 2', rating: 4.7, trend: 'up' },
    { month: 'Thang 3', rating: 4.7, trend: 'same' },
  ];

  const getHeatColor = (intensity) => {
    if (intensity >= 0.8) return 'var(--primary)';
    if (intensity >= 0.6) return 'var(--primary-container)';
    if (intensity >= 0.4) return 'var(--tertiary-container)';
    if (intensity >= 0.2) return 'var(--surface-container-high)';
    return 'var(--surface-container)';
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
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 16,
      marginBottom: 32,
    },
    statCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
    },
    statIcon: {
      fontSize: 28,
      color: 'var(--primary)',
      background: 'var(--primary-fixed)',
      borderRadius: 'var(--radius)',
      padding: 8,
    },
    statValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
    },
    statLabel: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginTop: 2,
    },
    statChange: {
      fontSize: 12,
      color: '#2e7d32',
      fontWeight: 600,
      marginTop: 2,
    },
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
      gap: 12,
      height: 200,
      padding: '0 8px',
    },
    barWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      position: 'relative',
    },
    bar: (heightPct, isHovered) => ({
      width: '100%',
      maxWidth: 48,
      height: `${heightPct}%`,
      background: isHovered ? 'var(--primary)' : 'var(--primary-gradient)',
      borderRadius: '8px 8px 4px 4px',
      transition: 'all 0.3s',
      cursor: 'pointer',
      opacity: isHovered ? 1 : 0.85,
      position: 'relative',
    }),
    barLabel: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      fontWeight: 500,
    },
    barTooltip: {
      position: 'absolute',
      top: -28,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--inverse-surface)',
      color: 'var(--inverse-on-surface)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    },
    heatGrid: {
      display: 'grid',
      gridTemplateColumns: '60px repeat(7, 1fr)',
      gap: 4,
    },
    heatLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
    },
    heatCell: (intensity) => ({
      height: 40,
      borderRadius: 8,
      background: getHeatColor(intensity),
      transition: 'all 0.2s',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 600,
      color: intensity >= 0.6 ? 'var(--on-primary)' : 'var(--on-surface-variant)',
    }),
    heatColHeader: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
      textAlign: 'center',
    },
    sourceBar: {
      marginBottom: 16,
    },
    sourceLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6,
      fontSize: 14,
      fontWeight: 500,
    },
    sourceTrack: {
      height: 12,
      background: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    sourceFill: (percent, color) => ({
      height: '100%',
      width: `${percent}%`,
      background: color,
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.6s ease',
    }),
    trendRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 12,
    },
    trendCard: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      textAlign: 'center',
    },
    trendMonth: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 8,
    },
    trendRating: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--primary)',
    },
    trendArrow: (trend) => ({
      fontSize: 20,
      color: trend === 'up' ? '#2e7d32' : trend === 'down' ? 'var(--error)' : 'var(--on-surface-variant)',
      verticalAlign: 'middle',
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
        <span className="material-symbols-outlined" style={s.headerIcon}>analytics</span>
        <h1 style={s.title}>Phan tich hieu suat</h1>
      </div>
      <p style={s.subtitle}>Theo doi va phan tich hieu suat dia diem cua ban</p>

      <div style={s.chipRow}>
        {periods.map(p => (
          <button key={p} style={s.chip(activePeriod === p)} onClick={() => setActivePeriod(p)}>
            {p}
          </button>
        ))}
      </div>

      <div style={s.statsRow}>
        {stats.map((st, i) => (
          <div key={i} style={s.statCard}>
            <span className="material-symbols-outlined" style={s.statIcon}>{st.icon}</span>
            <div>
              <div style={s.statValue}>{st.value}</div>
              <div style={s.statLabel}>{st.label}</div>
              <div style={s.statChange}>{st.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>bar_chart</span>
          Bieu do luot xem
        </div>
        <div style={s.chartContainer}>
          {weeklyViews.map((d, i) => (
            <div key={i} style={s.barWrapper}>
              <div
                style={s.bar((d.value / maxView) * 100, hoveredBar === i)}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {hoveredBar === i && (
                  <div style={s.barTooltip}>{d.value.toLocaleString()}</div>
                )}
              </div>
              <span style={s.barLabel}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>schedule</span>
          Gio cao diem
        </div>
        <div style={s.heatGrid}>
          <div />
          {peakHours.cols.map(c => (
            <div key={c} style={s.heatColHeader}>{c}</div>
          ))}
          {peakHours.rows.map((row, ri) => (
            <React.Fragment key={row}>
              <div style={s.heatLabel}>{row}</div>
              {peakHours.data[ri].map((val, ci) => (
                <div key={ci} style={s.heatCell(val)}>
                  {Math.round(val * 100)}%
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>pie_chart</span>
          Nguon khach
        </div>
        {sources.map((src, i) => (
          <div key={i} style={s.sourceBar}>
            <div style={s.sourceLabel}>
              <span>{src.label}</span>
              <span style={{ fontWeight: 700 }}>{src.percent}%</span>
            </div>
            <div style={s.sourceTrack}>
              <div style={s.sourceFill(src.percent, src.color)} />
            </div>
          </div>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>trending_up</span>
          Danh gia theo thoi gian
        </div>
        <div style={s.trendRow}>
          {ratingTrend.map((t, i) => (
            <div key={i} style={s.trendCard}>
              <div style={s.trendMonth}>{t.month}</div>
              <div style={s.trendRating}>{t.rating}</div>
              <span className="material-symbols-outlined" style={s.trendArrow(t.trend)}>
                {t.trend === 'up' ? 'arrow_upward' : t.trend === 'down' ? 'arrow_downward' : 'remove'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueAnalytics;
