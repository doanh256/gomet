import React from 'react';
import { useNavigate } from 'react-router-dom';

const rules = [
  { num: 1, icon: 'verified_user', title: 'Trung thực', desc: 'Luôn sử dụng thông tin thật về bản thân. Hồ sơ giả mạo sẽ bị gỡ bỏ và tài khoản có thể bị khóa vĩnh viễn.' },
  { num: 2, icon: 'favorite', title: 'Tôn trọng', desc: 'Đối xử với mọi người bằng sự tôn trọng và lịch sự. Mọi người đều xứng đáng được đối xử tốt đẹp.' },
  { num: 3, icon: 'shield', title: 'An toàn', desc: 'Không chia sẻ thông tin cá nhân quá sớm như địa chỉ, số tài khoản. Hẹn hò ở nơi công cộng cho đến khi cảm thấy an tâm.' },
  { num: 4, icon: 'block', title: 'Không quấy rối', desc: 'Mọi hình thức quấy rối đều bị cấm. Bao gồm tin nhắn không mong muốn, ngôn ngữ thô tục, đe dọa hoặc theo dõi.' },
  { num: 5, icon: 'photo_camera', title: 'Ảnh thật', desc: 'Chỉ sử dụng ảnh của chính bạn. Ảnh phải rõ mặt, không chỉnh sửa quá mức và không chứa nội dung không phù hợp.' },
];

const violations = [
  { icon: 'warning', color: '#FFD54F', bg: 'rgba(255, 213, 79, 0.12)', title: 'Cảnh cáo', desc: 'Vi phạm lần đầu sẽ nhận được cảnh cáo và nhắc nhở từ hệ thống.' },
  { icon: 'lock', color: '#FF571A', bg: 'rgba(255, 87, 26, 0.12)', title: 'Tạm khóa', desc: 'Vi phạm nghiêm trọng hoặc lặp lại sẽ bị tạm khóa 7-30 ngày.' },
  { icon: 'block', color: '#FDF9F3', bg: '#353535', title: 'Khóa vĩnh viễn', desc: 'Các hành vi nghiêm trọng như lừa đảo, quấy rối tình dục sẽ bị khóa vĩnh viễn.' },
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
        <h1 style={s.heading}>Quy tắc cộng đồng</h1>
        <p style={s.subtitle}>Xây dựng một cộng đồng an toàn và tôn trọng</p>
      </div>

      {/* Core rules */}
      <h2 style={s.sectionTitle}>Nguyên tắc cốt lõi</h2>
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
      <h2 style={s.sectionTitle}>Vi phạm sẽ bị</h2>
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
        <div style={s.reportTitle}>Báo cáo vi phạm</div>
        <p style={s.reportDesc}>Nếu bạn gặp vấn đề, hãy báo cáo ngay để chúng tôi xử lý</p>
        <button style={s.reportBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>flag</span>
          Báo cáo ngay
        </button>
      </div>

      {/* Footer */}
      <div style={s.footer}>Cập nhật lần cuối: Tháng 3, 2026</div>
    </div>
  );
};

export default CommunityRulesPage;
