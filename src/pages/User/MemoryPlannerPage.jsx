import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const upcomingDates = [
  { id: 1, label: 'Ky niem 1 nam', daysLeft: 15, icon: 'celebration', color: 'var(--primary)' },
  { id: 2, label: 'Sinh nhat doi phuong', daysLeft: 32, icon: 'cake', color: 'var(--tertiary)' },
];

const planIdeas = [
  { id: 1, title: 'Bua toi bat ngo', icon: 'dinner_dining', desc: 'Dat ban tai nha hang yeu thich cua doi phuong va tao bat ngo lang man.', btn: 'Len ke hoach' },
  { id: 2, title: 'Album ky niem', icon: 'photo_library', desc: 'Tong hop nhung khoanh khac dep nhat cua hai ban thanh album anh.', btn: 'Tao album' },
  { id: 3, title: 'Qua tang dac biet', icon: 'redeem', desc: 'Chon qua tang y nghia tu cua hang GOMET hoac tu tao qua rieng.', btn: 'Chon qua' },
  { id: 4, title: 'Thu viet tay', icon: 'edit_note', desc: 'Viet nhung loi yeu thuong chan thanh gui den nguoi dac biet cua ban.', btn: 'Viet thu' },
];

const pastMemories = [
  { id: 1, date: '14/02/2026', title: 'Valentine dau tien', note: 'Bua toi tai La Maison. Mot buoi toi tuyet voi!' },
  { id: 2, date: '25/12/2025', title: 'Giang sinh ben nhau', note: 'Doi qua va uong ca cao nong tai cong vien.' },
  { id: 3, date: '15/09/2025', title: 'Ngay hen dau tien', note: 'Gap nhau tai quan cafe va noi chuyen suot 4 tieng.' },
];

const MemoryPlannerPage = () => {
  const navigate = useNavigate();
  const [expandedMemory, setExpandedMemory] = useState(null);

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      color: 'var(--primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: 20,
    },
    header: {
      textAlign: 'center',
      marginBottom: 28,
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
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    countdownRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 28,
    },
    countdownCard: (color) => ({
      flex: 1,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 18,
      boxShadow: 'var(--card-shadow)',
      borderLeft: `4px solid ${color}`,
    }),
    countdownIcon: (color) => ({
      fontSize: 28,
      color: color,
      marginBottom: 8,
    }),
    countdownLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    countdownDays: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    countdownNumber: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--primary)',
    },
    ideaGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginBottom: 28,
    },
    ideaCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 18,
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    ideaIcon: {
      fontSize: 32,
      color: 'var(--primary)',
    },
    ideaTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    ideaDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
      flex: 1,
    },
    ideaBtn: {
      alignSelf: 'flex-start',
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    timelineSection: {
      marginBottom: 28,
    },
    memoryItem: {
      display: 'flex',
      gap: 14,
      marginBottom: 20,
      position: 'relative',
    },
    memoryLine: {
      width: 2,
      backgroundColor: 'var(--outline-variant)',
      position: 'absolute',
      left: 11,
      top: 28,
      bottom: -12,
    },
    memoryDot: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: 'var(--primary-fixed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      zIndex: 1,
    },
    memoryDotInner: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: 'var(--primary)',
    },
    memoryContent: {
      flex: 1,
    },
    memoryDate: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginBottom: 4,
    },
    memoryTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    memoryPhoto: {
      width: '100%',
      height: 120,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
    },
    memoryPhotoIcon: {
      fontSize: 32,
      color: 'var(--outline-variant)',
    },
    memoryNote: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
    },
    addBtn: {
      width: '100%',
      padding: '14px 0',
      borderRadius: 'var(--radius-full)',
      border: '2px dashed var(--outline-variant)',
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    addIcon: {
      fontSize: 22,
      color: 'var(--primary)',
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>cake</span>
        <h1 style={s.heading}>Len ke hoach ky niem</h1>
        <p style={s.subtitle}>Tao nhung khoang khac dang nho</p>
      </div>

      <h2 style={s.sectionTitle}>Ngay dac biet sap toi</h2>
      <div style={s.countdownRow}>
        {upcomingDates.map((d) => (
          <div key={d.id} style={s.countdownCard(d.color)}>
            <span className="material-symbols-outlined" style={s.countdownIcon(d.color)}>{d.icon}</span>
            <div style={s.countdownLabel}>{d.label}</div>
            <div style={s.countdownDays}>
              <span style={s.countdownNumber}>{d.daysLeft}</span> ngay nua
            </div>
          </div>
        ))}
      </div>

      <h2 style={s.sectionTitle}>Goi y ke hoach</h2>
      <div style={s.ideaGrid}>
        {planIdeas.map((idea) => (
          <div key={idea.id} style={s.ideaCard}>
            <span className="material-symbols-outlined" style={s.ideaIcon}>{idea.icon}</span>
            <div style={s.ideaTitle}>{idea.title}</div>
            <div style={s.ideaDesc}>{idea.desc}</div>
            <button style={s.ideaBtn}>{idea.btn}</button>
          </div>
        ))}
      </div>

      <h2 style={s.sectionTitle}>Lich su ky niem</h2>
      <div style={s.timelineSection}>
        {pastMemories.map((mem, i) => (
          <div key={mem.id} style={s.memoryItem}>
            {i < pastMemories.length - 1 && <div style={s.memoryLine} />}
            <div style={s.memoryDot}>
              <div style={s.memoryDotInner} />
            </div>
            <div style={s.memoryContent}>
              <div style={s.memoryDate}>{mem.date}</div>
              <div style={s.memoryTitle}>{mem.title}</div>
              <div style={s.memoryPhoto}>
                <span className="material-symbols-outlined" style={s.memoryPhotoIcon}>image</span>
              </div>
              <div style={s.memoryNote}>{mem.note}</div>
            </div>
          </div>
        ))}
      </div>

      <button style={s.addBtn}>
        <span className="material-symbols-outlined" style={s.addIcon}>add_circle</span>
        Them ngay dac biet
      </button>
    </div>
  );
};

export default MemoryPlannerPage;
