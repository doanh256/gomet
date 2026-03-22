import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const suggestions = [
  { text: 'Ey, minh thay ban cung thich ca phe sua da. Ban hay uong o dau nhat?', category: 'Am thuc', categoryColor: 'var(--tertiary-container)' },
  { text: 'Neu duoc chon mot noi de di ngay bay gio, ban se chon dau?', category: 'Phieu luu', categoryColor: 'var(--primary-fixed)' },
  { text: 'Minh vua xem mot video hai huoc, muon nghe khong? 😄', category: 'Hai huoc', categoryColor: '#fff3cd' },
  { text: 'Minh thay ban tung tham gia su kien am thuc roi, cam nhan cua ban the nao?', category: 'Tu nhien', categoryColor: 'var(--surface-container-high)' },
  { text: 'Ban tin vao tinh yeu tu cai nhin dau tien khong?', category: 'Sau sac', categoryColor: 'var(--error-container)' },
];

const tips = [
  'Hoi ve so thich chung',
  'Chia se mot cau chuyen ngan',
  'Tranh cau hoi co/khong',
];

const IceBreakerPage = () => {
  const navigate = useNavigate();
  const { partnerId } = useParams();
  const [customMsg, setCustomMsg] = useState('');
  const [sentIdx, setSentIdx] = useState(null);

  const handleSend = (idx) => {
    setSentIdx(idx);
    setTimeout(() => setSentIdx(null), 2000);
  };

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 720,
      margin: '0 auto',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      marginBottom: 24,
      padding: 0,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6,
    },
    headerIcon: {
      fontSize: 28,
      color: 'var(--primary)',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
      marginBottom: 28,
    },
    partnerCard: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '14px 18px',
      marginBottom: 28,
      boxShadow: 'var(--card-shadow)',
    },
    partnerAvatar: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-full)',
      objectFit: 'cover',
    },
    partnerName: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--on-surface)',
    },
    partnerStatus: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    sectionIcon: {
      fontSize: 20,
      color: 'var(--primary)',
    },
    suggestionCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      marginBottom: 12,
      boxShadow: 'var(--card-shadow)',
    },
    suggestionTop: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 12,
    },
    lightbulbIcon: {
      fontSize: 22,
      color: 'var(--tertiary)',
      flexShrink: 0,
      marginTop: 2,
    },
    suggestionText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontStyle: 'italic',
      color: 'var(--on-surface)',
      lineHeight: 1.5,
      flex: 1,
    },
    suggestionBottom: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryChip: (bg) => ({
      display: 'inline-block',
      fontSize: 11,
      fontWeight: 600,
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: bg,
      color: 'var(--on-surface)',
    }),
    sendBtn: {
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '7px 16px',
      fontSize: 13,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    sentBtn: {
      background: 'var(--surface-container-high)',
      color: 'var(--on-surface-variant)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '7px 16px',
      fontSize: 13,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'default',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    customSection: {
      marginTop: 32,
      marginBottom: 32,
    },
    textareaWrap: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-end',
    },
    textarea: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface)',
      backgroundColor: 'var(--surface-container-lowest)',
      border: '1px solid var(--outline-variant)',
      borderRadius: 'var(--radius)',
      padding: '14px 16px',
      resize: 'vertical',
      minHeight: 80,
      outline: 'none',
    },
    sendCustomBtn: {
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
    },
    tipsSection: {
      marginTop: 12,
    },
    tipItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 0',
    },
    tipIcon: {
      fontSize: 18,
      color: 'var(--on-surface-variant)',
    },
    tipText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lai
      </button>

      <div style={s.headerRow}>
        <span className="material-symbols-outlined" style={s.headerIcon}>ac_unit</span>
        <h1 style={s.heading}>Ice Breakers</h1>
      </div>
      <p style={s.subtitle}>Goi y cau mo dau hoan hao</p>

      {/* Partner mini card */}
      <div style={s.partnerCard}>
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
          alt="Partner"
          style={s.partnerAvatar}
        />
        <div>
          <div style={s.partnerName}>Minh Anh</div>
          <div style={s.partnerStatus}>Dang cho ban nhan tin...</div>
        </div>
      </div>

      {/* AI Suggestions */}
      <h2 style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>auto_awesome</span>
        Goi y tu AI
      </h2>
      {suggestions.map((item, i) => (
        <div key={i} style={s.suggestionCard}>
          <div style={s.suggestionTop}>
            <span className="material-symbols-outlined" style={s.lightbulbIcon}>tips_and_updates</span>
            <div style={s.suggestionText}>{item.text}</div>
          </div>
          <div style={s.suggestionBottom}>
            <span style={s.categoryChip(item.categoryColor)}>{item.category}</span>
            {sentIdx === i ? (
              <span style={s.sentBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
                Da gui
              </span>
            ) : (
              <button style={s.sendBtn} onClick={() => handleSend(i)}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                Gui ngay
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Custom message */}
      <div style={s.customSection}>
        <h2 style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={s.sectionIcon}>edit</span>
          Tu viet
        </h2>
        <div style={s.textareaWrap}>
          <textarea
            style={s.textarea}
            placeholder="Viet cau chao cua ban..."
            value={customMsg}
            onChange={(e) => setCustomMsg(e.target.value)}
          />
          <button style={s.sendCustomBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--on-primary)' }}>send</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <h2 style={s.sectionTitle}>
        <span className="material-symbols-outlined" style={s.sectionIcon}>lightbulb</span>
        Meo nho
      </h2>
      <div style={s.tipsSection}>
        {tips.map((tip, i) => (
          <div key={i} style={s.tipItem}>
            <span className="material-symbols-outlined" style={s.tipIcon}>info</span>
            <span style={s.tipText}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IceBreakerPage;
