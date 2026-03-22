import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const memories = [
  {
    id: 1,
    month: 'T3',
    day: '15',
    partner: { name: 'Minh Anh', avatar: 'MA' },
    venue: 'The Coffee House - Nguyen Hue',
    date: '15/03/2026',
    note: 'Buoi hen dau tien tuyet voi, cuoi suot buoi!',
    hearts: 24,
  },
  {
    id: 2,
    month: 'T3',
    day: '08',
    partner: { name: 'Thu Trang', avatar: 'TT' },
    venue: 'Pizza 4P - Hai Ba Trung',
    date: '08/03/2026',
    note: 'Cung nhau thuong thuc pizza va noi chuyen ve so thich.',
    hearts: 18,
  },
  {
    id: 3,
    month: 'T2',
    day: '22',
    partner: { name: 'Hoang Nam', avatar: 'HN' },
    venue: 'Landmark 81 SkyView',
    date: '22/02/2026',
    note: 'Ngam hoang hon tren tang thuong, khong khi lang man.',
    hearts: 31,
  },
];

const gradientPlaceholders = [
  'linear-gradient(135deg, #ff6b6b33, #ae2f3422)',
  'linear-gradient(135deg, #894e4522, #cf8a7f33)',
  'linear-gradient(135deg, #ae2f3422, #ff6b6b11)',
  'linear-gradient(135deg, #cf8a7f22, #894e4533)',
];

const MemoriesPage = () => {
  const navigate = useNavigate();
  const [showEmpty] = useState(false);

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 100px',
      maxWidth: 600,
      margin: '0 auto',
      position: 'relative',
    },
    header: {
      textAlign: 'center',
      marginBottom: 32,
    },
    headerIcon: {
      fontSize: 48,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    timeline: {
      position: 'relative',
      paddingLeft: 48,
    },
    timelineLine: {
      position: 'absolute',
      left: 20,
      top: 0,
      bottom: 0,
      width: 2,
      backgroundColor: 'var(--outline-variant)',
    },
    memoryItem: {
      position: 'relative',
      marginBottom: 28,
    },
    dateCircle: {
      position: 'absolute',
      left: -48,
      top: 0,
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    dateMonth: {
      fontFamily: 'var(--font-body)',
      fontSize: 9,
      fontWeight: 600,
      color: 'var(--on-primary)',
      lineHeight: 1,
    },
    dateDay: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 800,
      color: 'var(--on-primary)',
      lineHeight: 1,
    },
    memoryCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14,
    },
    partnerAvatar: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#fff',
      flexShrink: 0,
    },
    cardHeaderInfo: {
      flex: 1,
    },
    partnerName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    venue: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginTop: 2,
    },
    dateText: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
    },
    photoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      marginBottom: 14,
    },
    photoPlaceholder: {
      height: 120,
      borderRadius: 'var(--radius)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoIcon: {
      fontSize: 28,
      color: 'var(--outline-variant)',
    },
    note: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontStyle: 'italic',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.6,
      marginBottom: 12,
      paddingLeft: 12,
      borderLeft: '3px solid var(--outline-variant)',
    },
    heartRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
    heartIcon: {
      fontSize: 18,
      color: 'var(--primary)',
    },
    heartCount: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    fab: {
      position: 'fixed',
      bottom: 90,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(174,47,52,0.3)',
      cursor: 'pointer',
      zIndex: 10,
    },
    fabIcon: {
      fontSize: 28,
      color: '#fff',
    },
    empty: {
      textAlign: 'center',
      padding: '60px 20px',
    },
    emptyIcon: {
      fontSize: 64,
      color: 'var(--outline-variant)',
      marginBottom: 16,
    },
    emptyTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 8,
    },
    emptyDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      marginBottom: 20,
    },
    emptyBtn: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-primary)',
      background: 'var(--primary-gradient)',
      border: 'none',
      padding: '12px 28px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
    },
  };

  if (showEmpty) {
    return (
      <div style={s.page}>
        <div style={s.header}>
          <span className="material-symbols-outlined" style={s.headerIcon}>auto_awesome</span>
          <h1 style={s.heading}>Hanh trinh ky niem</h1>
          <p style={s.subtitle}>Luu giu nhung khoang khac dep nhat</p>
        </div>
        <div style={s.empty}>
          <span className="material-symbols-outlined" style={s.emptyIcon}>photo_album</span>
          <div style={s.emptyTitle}>Chua co ky niem nao</div>
          <div style={s.emptyDesc}>Hay bat dau hanh trinh hen ho cua ban!</div>
          <button style={s.emptyBtn} onClick={() => navigate('/explore')}>Kham pha ngay</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>auto_awesome</span>
        <h1 style={s.heading}>Hanh trinh ky niem</h1>
        <p style={s.subtitle}>Luu giu nhung khoang khac dep nhat</p>
      </div>

      <div style={s.timeline}>
        <div style={s.timelineLine} />
        {memories.map(m => (
          <div key={m.id} style={s.memoryItem}>
            <div style={s.dateCircle}>
              <div style={s.dateMonth}>{m.month}</div>
              <div style={s.dateDay}>{m.day}</div>
            </div>
            <div style={s.memoryCard}>
              <div style={s.cardHeader}>
                <div style={s.partnerAvatar}>{m.partner.avatar}</div>
                <div style={s.cardHeaderInfo}>
                  <div style={s.partnerName}>{m.partner.name}</div>
                  <div style={s.venue}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>location_on</span>
                    {m.venue}
                  </div>
                </div>
                <div style={s.dateText}>{m.date}</div>
              </div>
              <div style={s.photoGrid}>
                {gradientPlaceholders.map((bg, i) => (
                  <div key={i} style={{...s.photoPlaceholder, background: bg}}>
                    <span className="material-symbols-outlined" style={s.photoIcon}>image</span>
                  </div>
                ))}
              </div>
              <div style={s.note}>{m.note}</div>
              <div style={s.heartRow}>
                <span className="material-symbols-outlined filled" style={s.heartIcon}>favorite</span>
                <span style={s.heartCount}>{m.hearts}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button style={s.fab}>
        <span className="material-symbols-outlined" style={s.fabIcon}>add</span>
      </button>
    </div>
  );
};

export default MemoriesPage;
