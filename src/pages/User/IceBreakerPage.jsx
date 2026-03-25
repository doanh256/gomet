import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const suggestions = [
  { text: 'Ey, mình thấy bạn cũng thích cà phê sữa đá. Bạn hay uống ở đâu nhất?', category: 'Ẩm thực', categoryColor: '#2A2A2A' },
  { text: 'Nếu được chọn một nơi để đi ngay bây giờ, bạn sẽ chọn đâu?', category: 'Phiêu lưu', categoryColor: 'rgba(255,181,158,0.15)' },
  { text: 'Mình vừa xem một video hài hước, muốn nghe không? 😄', category: 'Hài hước', categoryColor: 'rgba(255,213,79,0.15)' },
  { text: 'Mình thấy bạn từng tham gia sự kiện ẩm thực rồi, cảm nhận của bạn thế nào?', category: 'Tự nhiên', categoryColor: '#353535' },
  { text: 'Bạn tin vào tình yêu từ cái nhìn đầu tiên không?', category: 'Sâu sắc', categoryColor: 'rgba(255,87,26,0.15)' },
];

const tips = [
  'Hỏi về sở thích chung',
  'Chia sẻ một câu chuyện ngắn',
  'Tránh câu hỏi có/không',
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
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 720,
      margin: '0 auto',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#E6BEB2',
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
      color: '#FFB59E',
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
      marginBottom: 28,
    },
    partnerCard: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '14px 18px',
      marginBottom: 28,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    partnerAvatar: {
      width: 48,
      height: 48,
      borderRadius: '9999px',
      objectFit: 'cover',
    },
    partnerName: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 16,
      color: '#FDF9F3',
    },
    partnerStatus: {
      fontSize: 13,
      color: '#E6BEB2',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    sectionIcon: {
      fontSize: 20,
      color: '#FFB59E',
    },
    suggestionCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '16px',
      marginBottom: 12,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    suggestionTop: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 12,
    },
    lightbulbIcon: {
      fontSize: 22,
      color: '#FFD54F',
      flexShrink: 0,
      marginTop: 2,
    },
    suggestionText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontStyle: 'italic',
      color: '#FDF9F3',
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
      borderRadius: '9999px',
      backgroundColor: bg,
      color: '#E6BEB2',
    }),
    sendBtn: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
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
      background: '#2A2A2A',
      color: '#E6BEB2',
      border: 'none',
      borderRadius: '9999px',
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
      color: '#FDF9F3',
      backgroundColor: '#1C1B1B',
      border: 'none',
      borderRadius: '1.5rem',
      padding: '14px 16px',
      resize: 'vertical',
      minHeight: 80,
      outline: 'none',
    },
    sendCustomBtn: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: '9999px',
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
      color: '#E6BEB2',
    },
    tipText: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
    },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        Quay lại
      </button>

      <div style={s.headerRow}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>ac_unit</span>
        <h1 style={s.heading}>Ice Breakers</h1>
      </div>
      <p style={s.subtitle}>Gợi ý câu mở đầu hoàn hảo</p>

      {/* Partner mini card */}
      <div style={s.partnerCard}>
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
          alt="Partner"
          style={s.partnerAvatar}
        />
        <div>
          <div style={s.partnerName}>Minh Anh</div>
          <div style={s.partnerStatus}>Đang chờ bạn nhắn tin...</div>
        </div>
      </div>

      {/* AI Suggestions */}
      <h2 style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>auto_awesome</span>
        Gợi ý từ AI
      </h2>
      {suggestions.map((item, i) => (
        <div key={i} style={s.suggestionCard}>
          <div style={s.suggestionTop}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.lightbulbIcon}>tips_and_updates</span>
            <div style={s.suggestionText}>{item.text}</div>
          </div>
          <div style={s.suggestionBottom}>
            <span style={s.categoryChip(item.categoryColor)}>{item.category}</span>
            {sentIdx === i ? (
              <span style={s.sentBtn}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
                Đã gửi
              </span>
            ) : (
              <button style={s.sendBtn} onClick={() => handleSend(i)}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                Gửi ngay
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Custom message */}
      <div style={s.customSection}>
        <h2 style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>edit</span>
          Tự viết
        </h2>
        <div style={s.textareaWrap}>
          <textarea
            style={s.textarea}
            placeholder="Viết câu chào của bạn..."
            value={customMsg}
            onChange={(e) => setCustomMsg(e.target.value)}
          />
          <button style={s.sendCustomBtn}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#3A0B00' }}>send</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <h2 style={s.sectionTitle}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.sectionIcon}>lightbulb</span>
        Mẹo nhỏ
      </h2>
      <div style={s.tipsSection}>
        {tips.map((tip, i) => (
          <div key={i} style={s.tipItem}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.tipIcon}>info</span>
            <span style={s.tipText}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IceBreakerPage;
