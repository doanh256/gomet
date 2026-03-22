import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dailyQuests = [
  { id: 1, icon: 'message', color: '#ae2f34', title: 'Gui 3 tin nhan', desc: 'Ket noi voi nhung nguoi ban moi', progress: 2, total: 3, reward: 50, done: false },
  { id: 2, icon: 'favorite', color: '#ff6b6b', title: 'Thich 5 ho so', desc: 'Kham pha va the hien su quan tam', progress: 5, total: 5, reward: 50, done: true },
  { id: 3, icon: 'restaurant', color: '#894e45', title: 'Dat 1 buoi hen', desc: 'Len lich hen ho tai nha hang', progress: 0, total: 1, reward: 50, done: false },
];

const specialQuests = [
  { id: 10, icon: 'local_fire_department', title: 'Chuoi 14 ngay hoat dong', desc: 'Dang nhap va tuong tac moi ngay trong 14 ngay lien tiep de nhan thuong dac biet', reward: 500, deadline: '3 ngay con lai' },
  { id: 11, icon: 'diversity_3', title: 'Gioi thieu 3 ban be', desc: 'Moi ban be tham gia GOMET va cung trai nghiem hen ho tuyet voi', reward: 500, deadline: '5 ngay con lai' },
];

const claimedRewards = [
  { icon: 'monetization_on', name: '100 xu', date: '20/03' },
  { icon: 'star', name: 'Huy hieu Vang', date: '18/03' },
  { icon: 'card_giftcard', name: 'Voucher 50k', date: '15/03' },
  { icon: 'workspace_premium', name: 'Khung anh VIP', date: '12/03' },
  { icon: 'redeem', name: '200 xu', date: '10/03' },
];

const QuestsPage = () => {
  const navigate = useNavigate();
  const [level] = useState(5);
  const [points] = useState(1250);
  const [streak] = useState(7);

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
    statsRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 32,
    },
    statCard: {
      flex: 1,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '16px 12px',
      textAlign: 'center',
      boxShadow: 'var(--card-shadow)',
    },
    statIcon: {
      fontSize: 28,
      color: 'var(--primary)',
      marginBottom: 4,
    },
    statValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    statLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginTop: 2,
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 14,
    },
    questCard: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      marginBottom: 10,
      boxShadow: 'var(--card-shadow)',
    },
    questCardDone: {
      opacity: 0.6,
    },
    questIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    questIcon: {
      fontSize: 24,
      color: '#fff',
    },
    questCenter: {
      flex: 1,
      minWidth: 0,
    },
    questTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 2,
    },
    questDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginBottom: 8,
    },
    progressBar: {
      height: 6,
      backgroundColor: 'var(--outline-variant)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      transition: 'width 0.3s',
    },
    progressText: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
      marginTop: 4,
    },
    rewardBadge: {
      backgroundColor: 'var(--primary-fixed)',
      color: 'var(--on-primary-container)',
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 700,
      padding: '6px 10px',
      borderRadius: 'var(--radius-full)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    doneBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--tertiary)',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      flexShrink: 0,
    },
    specialCard: {
      backgroundColor: 'var(--inverse-surface)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px 20px',
      marginBottom: 12,
    },
    specialTop: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10,
    },
    specialIcon: {
      fontSize: 32,
      color: 'var(--primary-container)',
    },
    specialTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--inverse-on-surface)',
    },
    specialDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--inverse-on-surface)',
      opacity: 0.8,
      lineHeight: 1.5,
      marginBottom: 12,
    },
    specialBottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    specialReward: {
      background: 'var(--primary-gradient)',
      color: '#fff',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
    },
    specialDeadline: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--inverse-on-surface)',
      opacity: 0.6,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    rewardsScroll: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 8,
    },
    rewardItem: {
      flex: '0 0 auto',
      width: 100,
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
      padding: '14px 10px',
      textAlign: 'center',
    },
    rewardItemIcon: {
      fontSize: 28,
      color: 'var(--tertiary)',
      marginBottom: 6,
    },
    rewardItemName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: 2,
    },
    rewardItemDate: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>emoji_events</span>
        <h1 style={s.heading}>Trung tam thu thach</h1>
        <p style={s.subtitle}>Hoan thanh nhiem vu, nhan thuong lon!</p>
      </div>

      <div style={s.statsRow}>
        <div style={s.statCard}>
          <span className="material-symbols-outlined filled" style={s.statIcon}>star</span>
          <div style={s.statValue}>{level}</div>
          <div style={s.statLabel}>Cap do</div>
        </div>
        <div style={s.statCard}>
          <span className="material-symbols-outlined filled" style={s.statIcon}>toll</span>
          <div style={s.statValue}>{points.toLocaleString()}</div>
          <div style={s.statLabel}>Diem tich luy</div>
        </div>
        <div style={s.statCard}>
          <span className="material-symbols-outlined filled" style={{...s.statIcon, color: 'var(--error)'}}>local_fire_department</span>
          <div style={s.statValue}>{streak}</div>
          <div style={s.statLabel}>Chuoi ngay</div>
        </div>
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Nhiem vu hang ngay</h2>
        {dailyQuests.map(q => (
          <div key={q.id} style={{...s.questCard, ...(q.done ? s.questCardDone : {})}}>
            <div style={{...s.questIconWrap, backgroundColor: q.color}}>
              <span className="material-symbols-outlined filled" style={s.questIcon}>{q.icon}</span>
            </div>
            <div style={s.questCenter}>
              <div style={s.questTitle}>{q.title}</div>
              <div style={s.questDesc}>{q.desc}</div>
              <div style={s.progressBar}>
                <div style={{...s.progressFill, width: `${(q.progress / q.total) * 100}%`}} />
              </div>
              <div style={s.progressText}>{q.progress}/{q.total}</div>
            </div>
            {q.done ? (
              <div style={s.doneBadge}>
                <span className="material-symbols-outlined filled" style={{ fontSize: 20 }}>check_circle</span>
                Xong
              </div>
            ) : (
              <div style={s.rewardBadge}>+{q.reward} xu</div>
            )}
          </div>
        ))}
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Thu thach dac biet</h2>
        {specialQuests.map(q => (
          <div key={q.id} style={s.specialCard}>
            <div style={s.specialTop}>
              <span className="material-symbols-outlined filled" style={s.specialIcon}>{q.icon}</span>
              <div style={s.specialTitle}>{q.title}</div>
            </div>
            <div style={s.specialDesc}>{q.desc}</div>
            <div style={s.specialBottom}>
              <div style={s.specialReward}>+{q.reward} xu</div>
              <div style={s.specialDeadline}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
                {q.deadline}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Phan thuong da nhan</h2>
        <div style={s.rewardsScroll}>
          {claimedRewards.map((r, i) => (
            <div key={i} style={s.rewardItem}>
              <span className="material-symbols-outlined filled" style={s.rewardItemIcon}>{r.icon}</span>
              <div style={s.rewardItemName}>{r.name}</div>
              <div style={s.rewardItemDate}>{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
