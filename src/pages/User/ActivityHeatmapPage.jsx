import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const heatmapKeyframes = `
@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.4); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const ActivityHeatmapPage = () => {
  const navigate = useNavigate();
  const [selectedCell, setSelectedCell] = useState(null);

  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const timeSlots = ['Sang', 'Trua', 'Chieu', 'Toi'];

  // 0=low, 1=medium, 2=high, 3=very high
  const heatData = [
    [0, 0, 1, 0, 1, 2, 1],
    [1, 0, 0, 1, 0, 1, 0],
    [1, 2, 1, 2, 3, 2, 1],
    [2, 3, 2, 3, 3, 3, 2],
  ];

  const intensityColors = [
    'var(--surface-container)',
    'var(--primary-fixed)',
    'var(--primary)',
    'var(--primary-container)',
  ];

  const intensityTextColors = [
    'var(--on-surface-variant)',
    'var(--on-primary-container)',
    'var(--on-primary)',
    'var(--on-primary-container)',
  ];

  const legendLabels = ['It', 'Trung binh', 'Nhieu', 'Rat nhieu'];

  const activities = [
    { icon: 'favorite', text: 'Ai do da thich ban', time: '5 phut truoc', color: 'var(--primary)' },
    { icon: 'message', text: 'Tin nhan moi tu Minh Anh', time: '12 phut truoc', color: '#1976d2' },
    { icon: 'event', text: 'Su kien DineDate sap dien ra', time: '30 phut truoc', color: '#f9a825' },
    { icon: 'bolt', text: 'Flash Meet gan ban', time: '1 gio truoc', color: '#ff6b6b' },
    { icon: 'visibility', text: 'Ho so duoc xem 24 lan', time: '2 gio truoc', color: '#7c4dff' },
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
    liveCounter: {
      margin: '0 20px 20px',
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    pulseDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#2e7d32',
      animation: 'pulseDot 1.5s ease-in-out infinite',
      flexShrink: 0,
    },
    liveText: {
      fontSize: '15px',
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    liveCount: {
      color: 'var(--primary)',
      fontFamily: 'var(--font-headline)',
      fontWeight: 800,
    },
    heatmapCard: {
      margin: '0 20px 20px',
      padding: '20px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
    },
    heatmapGrid: {
      display: 'grid',
      gridTemplateColumns: '48px repeat(7, 1fr)',
      gap: '4px',
    },
    dayHeader: {
      fontSize: '12px',
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
      textAlign: 'center',
      padding: '4px 0 8px',
    },
    timeLabel: {
      fontSize: '12px',
      fontWeight: 500,
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '8px',
    },
    cell: (intensity, isSelected) => ({
      borderRadius: '6px',
      backgroundColor: intensityColors[intensity],
      aspectRatio: '1',
      cursor: 'pointer',
      transition: 'transform 0.15s, box-shadow 0.15s',
      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
      boxShadow: isSelected ? '0 0 0 2px var(--primary)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '36px',
    }),
    legend: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '16px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    legendColor: (i) => ({
      width: '14px',
      height: '14px',
      borderRadius: '4px',
      backgroundColor: intensityColors[i],
    }),
    legendLabel: {
      fontSize: '11px',
      color: 'var(--on-surface-variant)',
    },
    peakCard: {
      margin: '0 20px 20px',
      padding: '18px',
      borderRadius: 'var(--radius)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
    },
    peakTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      marginBottom: '6px',
    },
    peakText: {
      fontSize: '14px',
      opacity: 0.9,
      lineHeight: 1.5,
    },
    peakHighlight: {
      fontWeight: 700,
      fontSize: '16px',
      display: 'inline-block',
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: '2px 10px',
      borderRadius: '8px',
      marginTop: '4px',
    },
    activitySection: {
      margin: '0 20px 20px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    sectionIcon: {
      fontSize: '20px',
      color: 'var(--primary)',
    },
    activityItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      marginBottom: '8px',
      boxShadow: 'var(--card-shadow)',
    },
    activityIcon: (color) => ({
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      backgroundColor: color + '18',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    activityIconInner: (color) => ({
      fontSize: '20px',
      color: color,
    }),
    activityText: {
      flex: 1,
      fontSize: '14px',
      color: 'var(--on-surface)',
    },
    activityTime: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      flexShrink: 0,
    },
    tipCard: {
      margin: '0 20px',
      padding: '16px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--primary-fixed)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    tipIcon: {
      fontSize: '22px',
      color: 'var(--primary)',
      flexShrink: 0,
    },
    tipText: {
      fontSize: '14px',
      color: 'var(--on-primary-container)',
      lineHeight: 1.5,
    },
  };

  return (
    <div style={s.page}>
      <style>{heatmapKeyframes}</style>

      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="material-symbols-outlined" style={s.headerIcon}>local_fire_department</span>
        <h1 style={s.headerTitle}>Ban nhiet hoat dong</h1>
      </div>

      {/* Live Counter */}
      <div style={s.liveCounter}>
        <div style={s.pulseDot} />
        <span style={s.liveText}>
          <span style={s.liveCount}>1,248</span> nguoi dang hoat dong
        </span>
      </div>

      {/* Heatmap */}
      <div style={s.heatmapCard}>
        <div style={s.heatmapGrid}>
          {/* Header row */}
          <div />
          {days.map((d) => (
            <div key={d} style={s.dayHeader}>{d}</div>
          ))}

          {/* Data rows */}
          {timeSlots.map((slot, ri) => (
            <React.Fragment key={slot}>
              <div style={s.timeLabel}>{slot}</div>
              {days.map((d, ci) => {
                const intensity = heatData[ri][ci];
                const cellKey = `${ri}-${ci}`;
                return (
                  <div
                    key={cellKey}
                    style={s.cell(intensity, selectedCell === cellKey)}
                    onClick={() => setSelectedCell(selectedCell === cellKey ? null : cellKey)}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div style={s.legend}>
          {legendLabels.map((label, i) => (
            <div key={i} style={s.legendItem}>
              <div style={s.legendColor(i)} />
              <span style={s.legendLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Peak Time */}
      <div style={s.peakCard}>
        <div style={s.peakTitle}>Gio vang cua ban</div>
        <div style={s.peakText}>
          Ban nhan duoc nhieu tuong tac nhat vao
        </div>
        <span style={s.peakHighlight}>Thu 6 - Toi (19:00 - 22:00)</span>
      </div>

      {/* Recent Activity */}
      <div style={s.activitySection}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>history</span>
          Hoat dong gan day
        </div>
        {activities.map((a, i) => (
          <div key={i} style={s.activityItem}>
            <div style={s.activityIcon(a.color)}>
              <span className="material-symbols-outlined" style={s.activityIconInner(a.color)}>{a.icon}</span>
            </div>
            <span style={s.activityText}>{a.text}</span>
            <span style={s.activityTime}>{a.time}</span>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div style={s.tipCard}>
        <span className="material-symbols-outlined" style={s.tipIcon}>tips_and_updates</span>
        <span style={s.tipText}>
          Hay hoat dong vao <strong>Thu 6 buoi toi</strong> de tang co hoi ghep doi!
        </span>
      </div>
    </div>
  );
};

export default ActivityHeatmapPage;
