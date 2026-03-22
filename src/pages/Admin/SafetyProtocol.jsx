import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SafetyProtocol = () => {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState({
    toxicLang: true,
    suspiciousIP: true,
    twoFactor: false,
  });

  const stats = [
    { label: 'Bao cao cho xu ly', value: 23, icon: 'flag', color: 'var(--error)' },
    { label: 'Tai khoan bi khoa', value: 8, icon: 'block', color: 'var(--on-surface)' },
    { label: 'Xac minh cho duyet', value: 45, icon: 'verified_user', color: '#f9a825' },
    { label: 'Vi pham hom nay', value: 3, icon: 'warning', color: 'var(--error)' },
  ];

  const alerts = [
    { id: 1, title: 'Phat hien tai khoan spam hang loat', desc: '12 tai khoan moi co hanh vi gui tin nhan giong nhau trong 1 gio qua. Can xem xet va xu ly ngay.' },
    { id: 2, title: 'Noi dung khong phu hop duoc bao cao nhieu', desc: 'Bai dang #4521 bi 8 nguoi dung bao cao trong 30 phut. Noi dung co the vi pham chinh sach cong dong.' },
  ];

  const watchlist = [
    { id: 1, name: 'Nguyen Van Tung', avatar: 'T', reason: 'Quay roi nguoi dung', severity: 'Cao', days: 5 },
    { id: 2, name: 'Le Hoang Mai', avatar: 'M', reason: 'Ngon ngu doc hai', severity: 'Trung binh', days: 3 },
    { id: 3, name: 'Tran Bao Ngoc', avatar: 'N', reason: 'Tai khoan gia mao', severity: 'Cao', days: 7 },
    { id: 4, name: 'Pham Duc Thinh', avatar: 'T', reason: 'Spam tin nhan', severity: 'Thap', days: 2 },
    { id: 5, name: 'Vo Thanh Tam', avatar: 'T', reason: 'Noi dung khong phu hop', severity: 'Trung binh', days: 4 },
  ];

  const steps = [
    { label: 'Tiep nhan', icon: 'inbox' },
    { label: 'Xem xet', icon: 'search' },
    { label: 'Quyet dinh', icon: 'gavel' },
    { label: 'Thong bao', icon: 'notifications' },
  ];

  const severityColor = (sev) => {
    if (sev === 'Cao') return { bg: '#fde8e8', text: 'var(--error)' };
    if (sev === 'Trung binh') return { bg: '#fff8e1', text: '#f9a825' };
    return { bg: 'var(--surface-container-high)', text: 'var(--on-surface-variant)' };
  };

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const s = {
    page: {
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '32px',
    },
    headerIcon: {
      fontSize: '32px',
      color: 'var(--primary)',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    section: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: '16px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '32px',
    },
    statCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    statIconWrap: (color) => ({
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius)',
      background: `${color}14`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    statIcon: (color) => ({
      fontSize: '24px',
      color,
    }),
    statValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    statLabel: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
    },
    alertCard: {
      background: 'var(--error-container)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      marginBottom: '12px',
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
    },
    alertIcon: {
      fontSize: '24px',
      color: 'var(--error)',
      marginTop: '2px',
    },
    alertTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: '6px',
    },
    alertDesc: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
      marginBottom: '12px',
    },
    alertBtn: {
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--error)',
      color: 'var(--on-primary)',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
    },
    table: {
      width: '100%',
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden',
    },
    tableRow: (isHeader) => ({
      display: 'grid',
      gridTemplateColumns: '44px 1fr 1fr 100px 80px 180px',
      alignItems: 'center',
      padding: '12px 20px',
      gap: '12px',
      borderBottom: '1px solid var(--outline-variant)',
      background: isHeader ? 'var(--surface-container-high)' : 'transparent',
      fontSize: isHeader ? '12px' : '14px',
      fontWeight: isHeader ? 600 : 400,
      color: isHeader ? 'var(--on-surface-variant)' : 'var(--on-surface)',
    }),
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 600,
    },
    sevChip: (sev) => {
      const c = severityColor(sev);
      return {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 'var(--radius-full)',
        background: c.bg,
        color: c.text,
        fontSize: '12px',
        fontWeight: 600,
      };
    },
    actionBtns: {
      display: 'flex',
      gap: '8px',
    },
    detailBtn: {
      padding: '6px 12px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--outline-variant)',
      background: 'transparent',
      color: 'var(--on-surface)',
      fontSize: '12px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
    },
    lockBtn: {
      padding: '6px 12px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--error)',
      color: 'var(--on-primary)',
      fontSize: '12px',
      cursor: 'pointer',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
    },
    flowWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: '0',
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    flowStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    },
    flowCircle: {
      width: '56px',
      height: '56px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flowIcon: {
      fontSize: '24px',
      color: 'var(--on-primary)',
    },
    flowLabel: {
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    flowArrow: {
      fontSize: '24px',
      color: 'var(--outline-variant)',
      margin: '0 16px',
      marginBottom: '24px',
    },
    toggleRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      borderBottom: '1px solid var(--outline-variant)',
    },
    toggleLabel: {
      fontSize: '14px',
      color: 'var(--on-surface)',
    },
    toggleTrack: (on) => ({
      width: '48px',
      height: '28px',
      borderRadius: '14px',
      background: on ? 'var(--primary)' : 'var(--outline-variant)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }),
    toggleThumb: (on) => ({
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      background: 'var(--on-primary)',
      position: 'absolute',
      top: '3px',
      left: on ? '23px' : '3px',
      transition: 'left 0.2s',
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    }),
    settingsCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>shield</span>
        <h1 style={s.title}>Giao thuc an toan</h1>
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        {stats.map((st, i) => (
          <div key={i} style={s.statCard}>
            <div style={s.statIconWrap(st.color)}>
              <span className="material-symbols-outlined" style={s.statIcon(st.color)}>{st.icon}</span>
            </div>
            <div>
              <div style={s.statValue}>{st.value}</div>
              <div style={s.statLabel}>{st.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Canh bao khan cap */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Canh bao khan cap</h2>
        {alerts.map((a) => (
          <div key={a.id} style={s.alertCard}>
            <span className="material-symbols-outlined" style={s.alertIcon}>warning</span>
            <div>
              <div style={s.alertTitle}>{a.title}</div>
              <div style={s.alertDesc}>{a.desc}</div>
              <button style={s.alertBtn}>Xu ly ngay</button>
            </div>
          </div>
        ))}
      </div>

      {/* Danh sach theo doi */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Danh sach theo doi</h2>
        <div style={s.table}>
          <div style={s.tableRow(true)}>
            <div></div>
            <div>Ten</div>
            <div>Ly do</div>
            <div>Muc do</div>
            <div>Ngay</div>
            <div>Hanh dong</div>
          </div>
          {watchlist.map((u) => (
            <div key={u.id} style={s.tableRow(false)}>
              <div style={s.avatar}>{u.avatar}</div>
              <div style={{ fontWeight: 500 }}>{u.name}</div>
              <div style={{ color: 'var(--on-surface-variant)', fontSize: '13px' }}>{u.reason}</div>
              <div><span style={s.sevChip(u.severity)}>{u.severity}</span></div>
              <div style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>{u.days} ngay</div>
              <div style={s.actionBtns}>
                <button style={s.detailBtn}>Xem chi tiet</button>
                <button style={s.lockBtn}>Gio khoa</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quy trinh xu ly */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Quy trinh xu ly</h2>
        <div style={s.flowWrap}>
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div style={s.flowStep}>
                <div style={s.flowCircle}>
                  <span className="material-symbols-outlined" style={s.flowIcon}>{step.icon}</span>
                </div>
                <div style={s.flowLabel}>{step.label}</div>
              </div>
              {i < steps.length - 1 && (
                <span className="material-symbols-outlined" style={s.flowArrow}>arrow_forward</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Thiet lap */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Thiet lap</h2>
        <div style={s.settingsCard}>
          <div style={s.toggleRow}>
            <div style={s.toggleLabel}>Tu dong phat hien ngon ngu doc hai</div>
            <div style={s.toggleTrack(toggles.toxicLang)} onClick={() => handleToggle('toxicLang')}>
              <div style={s.toggleThumb(toggles.toxicLang)} />
            </div>
          </div>
          <div style={s.toggleRow}>
            <div style={s.toggleLabel}>Chan IP dang ngo</div>
            <div style={s.toggleTrack(toggles.suspiciousIP)} onClick={() => handleToggle('suspiciousIP')}>
              <div style={s.toggleThumb(toggles.suspiciousIP)} />
            </div>
          </div>
          <div style={{ ...s.toggleRow, borderBottom: 'none' }}>
            <div style={s.toggleLabel}>Yeu cau xac minh 2 buoc</div>
            <div style={s.toggleTrack(toggles.twoFactor)} onClick={() => handleToggle('twoFactor')}>
              <div style={s.toggleThumb(toggles.twoFactor)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyProtocol;
