import React from 'react';
import { useNavigate } from 'react-router-dom';

const rules = [
  { num: 1, icon: 'verified_user', title: 'Trung thuc', desc: 'Luon su dung thong tin that ve ban than. Ho so gia mao se bi go bo va tai khoan co the bi khoa vinh vien.' },
  { num: 2, icon: 'favorite', title: 'Ton trong', desc: 'Doi xu voi moi nguoi bang su ton trong va lich su. Moi nguoi deu xung dang duoc doi xu tot dep.' },
  { num: 3, icon: 'shield', title: 'An toan', desc: 'Khong chia se thong tin ca nhan qua som nhu dia chi, so tai khoan. Hen ho o noi cong cong cho den khi cam thay an tam.' },
  { num: 4, icon: 'block', title: 'Khong quay roi', desc: 'Moi hinh thuc quay roi deu bi cam. Bao gom tin nhan khong mong muon, ngon ngu tho tuc, de doa hoac theo doi.' },
  { num: 5, icon: 'photo_camera', title: 'Anh that', desc: 'Chi su dung anh cua chinh ban. Anh phai ro mat, khong chinh sua qua muc va khong chua noi dung khong phu hop.' },
];

const violations = [
  { icon: 'warning', color: '#f59e0b', bg: '#fef3c7', title: 'Canh cao', desc: 'Vi pham lan dau se nhan duoc canh cao va nhac nho tu he thong.' },
  { icon: 'lock', color: 'var(--error)', bg: 'var(--error-container)', title: 'Tam khoa', desc: 'Vi pham nghiem trong hoac lap lai se bi tam khoa 7-30 ngay.' },
  { icon: 'block', color: 'var(--on-surface)', bg: 'var(--surface-container-highest)', title: 'Khoa vinh vien', desc: 'Cac hanh vi nghiem trong nhu lua dao, quay roi tinh duc se bi khoa vinh vien.' },
];

const CommunityRulesPage = () => {
  const navigate = useNavigate();

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
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 16,
    },
    rulesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      marginBottom: 36,
    },
    ruleCard: {
      display: 'flex',
      gap: 14,
      padding: '18px 16px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
      border: '1px solid var(--outline-variant)',
    },
    ruleNum: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 800,
      flexShrink: 0,
    },
    ruleContent: {
      flex: 1,
    },
    ruleHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 6,
    },
    ruleIcon: {
      fontSize: 22,
      color: 'var(--primary)',
    },
    ruleTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    ruleDesc: {
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--on-surface-variant)',
    },
    violationsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 36,
    },
    violationCard: (bg) => ({
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      padding: '16px',
      borderRadius: 'var(--radius)',
      backgroundColor: bg,
    }),
    violationIconWrap: (color) => ({
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    violationIcon: (color) => ({
      fontSize: 24,
      color: color,
    }),
    violationContent: {
      flex: 1,
    },
    violationTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    violationDesc: {
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--on-surface-variant)',
    },
    reportCta: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--outline-variant)',
      padding: '28px 20px',
      textAlign: 'center',
      marginBottom: 24,
    },
    reportIcon: {
      fontSize: 44,
      color: 'var(--primary)',
      marginBottom: 10,
    },
    reportTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    reportDesc: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 16,
    },
    reportBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
    },
    footer: {
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      paddingTop: 8,
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>gavel</span>
        <h1 style={s.heading}>Quy tac cong dong</h1>
        <p style={s.subtitle}>Xay dung mot cong dong an toan va ton trong</p>
      </div>

      {/* Core rules */}
      <h2 style={s.sectionTitle}>Nguyen tac cot loi</h2>
      <div style={s.rulesList}>
        {rules.map(r => (
          <div key={r.num} style={s.ruleCard}>
            <div style={s.ruleNum}>{r.num}</div>
            <div style={s.ruleContent}>
              <div style={s.ruleHeader}>
                <span className="material-symbols-outlined" style={s.ruleIcon}>{r.icon}</span>
                <span style={s.ruleTitle}>{r.title}</span>
              </div>
              <p style={s.ruleDesc}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Violations */}
      <h2 style={s.sectionTitle}>Vi pham se bi</h2>
      <div style={s.violationsList}>
        {violations.map((v, i) => (
          <div key={i} style={s.violationCard(v.bg)}>
            <div style={s.violationIconWrap(v.color)}>
              <span className="material-symbols-outlined" style={s.violationIcon(v.color)}>{v.icon}</span>
            </div>
            <div style={s.violationContent}>
              <div style={s.violationTitle}>{v.title}</div>
              <p style={s.violationDesc}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Report CTA */}
      <div style={s.reportCta}>
        <span className="material-symbols-outlined" style={s.reportIcon}>flag</span>
        <div style={s.reportTitle}>Bao cao vi pham</div>
        <p style={s.reportDesc}>Neu ban gap van de, hay bao cao ngay de chung toi xu ly</p>
        <button style={s.reportBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>flag</span>
          Bao cao ngay
        </button>
      </div>

      {/* Footer */}
      <div style={s.footer}>Cap nhat lan cuoi: Thang 3, 2026</div>
    </div>
  );
};

export default CommunityRulesPage;
