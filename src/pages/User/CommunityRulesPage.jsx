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
  { icon: 'warning', color: '#FFD54F', bg: 'rgba(255, 213, 79, 0.12)', title: 'Canh cao', desc: 'Vi pham lan dau se nhan duoc canh cao va nhac nho tu he thong.' },
  { icon: 'lock', color: '#FF571A', bg: 'rgba(255, 87, 26, 0.12)', title: 'Tam khoa', desc: 'Vi pham nghiem trong hoac lap lai se bi tam khoa 7-30 ngay.' },
  { icon: 'block', color: '#FDF9F3', bg: '#353535', title: 'Khoa vinh vien', desc: 'Cac hanh vi nghiem trong nhu lua dao, quay roi tinh duc se bi khoa vinh vien.' },
];

const CommunityRulesPage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
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
      color: '#FFB59E',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
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
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    ruleNum: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
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
      color: '#FFB59E',
    },
    ruleTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    ruleDesc: {
      fontSize: 13,
      lineHeight: 1.6,
      color: '#E6BEB2',
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
      borderRadius: '1.5rem',
      backgroundColor: bg,
    }),
    violationIconWrap: (color) => ({
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.08)',
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
      color: '#FDF9F3',
      marginBottom: 4,
    },
    violationDesc: {
      fontSize: 13,
      lineHeight: 1.5,
      color: '#E6BEB2',
    },
    reportCta: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '28px 20px',
      textAlign: 'center',
      marginBottom: 24,
    },
    reportIcon: {
      fontSize: 44,
      color: '#FFB59E',
      marginBottom: 10,
    },
    reportTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    reportDesc: {
      fontSize: 13,
      color: '#E6BEB2',
      marginBottom: 16,
    },
    reportBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: 9999,
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
    },
    footer: {
      textAlign: 'center',
      fontSize: 12,
      color: '#E6BEB2',
      paddingTop: 8,
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>gavel</span>
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
                <span aria-hidden="true" className="material-symbols-outlined" style={s.ruleIcon}>{r.icon}</span>
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
              <span aria-hidden="true" className="material-symbols-outlined" style={s.violationIcon(v.color)}>{v.icon}</span>
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
        <span aria-hidden="true" className="material-symbols-outlined" style={s.reportIcon}>flag</span>
        <div style={s.reportTitle}>Bao cao vi pham</div>
        <p style={s.reportDesc}>Neu ban gap van de, hay bao cao ngay de chung toi xu ly</p>
        <button style={s.reportBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>flag</span>
          Bao cao ngay
        </button>
      </div>

      {/* Footer */}
      <div style={s.footer}>Cap nhat lan cuoi: Thang 3, 2026</div>
    </div>
  );
};

export default CommunityRulesPage;
