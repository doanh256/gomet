import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pulseKeyframes = `
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const RefundStatusPage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const steps = [
    { label: 'Yêu cầu đã gửi', icon: 'check_circle', color: '#117500', status: 'completed', detail: '20/03/2026 - 14:30' },
    { label: 'Đang xem xét', icon: 'hourglass_top', color: '#FFD54F', status: 'current', detail: '1-3 ngày làm việc' },
    { label: 'Phê duyệt', icon: 'radio_button_unchecked', color: '#E6BEB2', status: 'pending', detail: '' },
    { label: 'Hoàn tiền', icon: 'radio_button_unchecked', color: '#E6BEB2', status: 'pending', detail: 'Về ví GOMET trong 24h' },
  ];

  const faqs = [
    { q: 'Mất bao lâu để nhận được tiền hoàn?', a: 'Sau khi yêu cầu được phê duyệt, tiền sẽ được hoàn về ví GOMET trong vòng 24 giờ. Nếu bạn chọn hoàn về tài khoản ngân hàng, thời gian có thể mất 3-5 ngày làm việc.' },
    { q: 'Tôi có thể hủy yêu cầu hoàn tiền không?', a: 'Bạn có thể hủy yêu cầu hoàn tiền khi trạng thái còn là "Đang xem xét". Sau khi đã phê duyệt, yêu cầu không thể hủy.' },
  ];

  const s = {
    page: { minHeight: '100vh', backgroundColor: '#131313', fontFamily: 'var(--font-body)', padding: '0 0 40px', overflowY: 'auto' },
    header: { display: 'flex', alignItems: 'center', gap: '12px', padding: '24px 20px 20px' },
    backBtn: { background: 'none', border: 'none', color: '#FDF9F3', cursor: 'pointer', display: 'flex', alignItems: 'center' },
    headerIcon: { fontSize: '28px', color: '#FFB59E' },
    headerTitle: { fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 700, color: '#FDF9F3' },
    refundCard: { margin: '0 20px 24px', padding: '20px', borderRadius: '1.5rem', backgroundColor: '#1C1B1B', textAlign: 'center' },
    refundAmount: { fontFamily: 'var(--font-headline)', fontSize: '32px', fontWeight: 800, color: '#FFB59E', marginBottom: '6px' },
    refundReason: { fontSize: '14px', color: '#E6BEB2', marginBottom: '4px' },
    refundDate: { fontSize: '13px', color: '#E6BEB2', opacity: 0.7 },
    timeline: { margin: '0 20px 28px', padding: '20px', borderRadius: '1.5rem', backgroundColor: '#1C1B1B' },
    timelineStep: { display: 'flex', gap: '14px', position: 'relative', paddingBottom: '24px' },
    timelineStepLast: { paddingBottom: 0 },
    timelineLine: { position: 'absolute', left: '13px', top: '30px', width: '2px', bottom: 0, backgroundColor: '#2A2A2A' },
    stepIcon: (color, isCurrent) => ({ fontSize: '28px', color, flexShrink: 0, ...(isCurrent ? { animation: 'pulse 1.5s ease-in-out infinite' } : {}) }),
    stepContent: { flex: 1 },
    stepLabel: (isActive) => ({ fontSize: '15px', fontWeight: isActive ? 600 : 400, color: isActive ? '#FDF9F3' : '#E6BEB2' }),
    stepDetail: { fontSize: '13px', color: '#E6BEB2', marginTop: '2px' },
    card: { margin: '0 20px 20px', padding: '20px', borderRadius: '1.5rem', backgroundColor: '#1C1B1B' },
    cardTitle: { fontFamily: 'var(--font-headline)', fontSize: '15px', fontWeight: 700, color: '#FDF9F3', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
    cardTitleIcon: { fontSize: '20px', color: '#FFB59E' },
    detailRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0' },
    detailRowLast: {},
    detailLabel: { fontSize: '14px', color: '#E6BEB2' },
    detailValue: { fontSize: '14px', fontWeight: 600, color: '#FDF9F3' },
    supportCard: { margin: '0 20px 20px', padding: '20px', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', gap: '14px' },
    supportIcon: { fontSize: '36px', color: '#3A0B00' },
    supportText: { flex: 1 },
    supportTitle: { fontSize: '15px', fontWeight: 600, color: '#3A0B00' },
    supportSub: { fontSize: '13px', color: '#3A0B00', opacity: 0.85 },
    supportBtn: { padding: '10px 20px', borderRadius: '9999px', border: 'none', backgroundColor: 'rgba(58,11,0,0.25)', color: '#3A0B00', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' },
    faqItem: { padding: '14px 0' },
    faqItemLast: {},
    faqQ: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: 0, fontFamily: 'var(--font-body)' },
    faqQText: { fontSize: '14px', fontWeight: 600, color: '#FDF9F3' },
    faqIcon: { fontSize: '20px', color: '#E6BEB2', transition: 'transform 0.2s' },
    faqA: { fontSize: '14px', color: '#E6BEB2', lineHeight: 1.6, marginTop: '8px' },
  };

  return (
    <div style={s.page}>
      <style>{pulseKeyframes}</style>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>account_balance_wallet</span>
        <h1 style={s.headerTitle}>Trạng thái hoàn tiền</h1>
      </div>

      <div style={s.refundCard}>
        <div style={s.refundAmount}>150.000 VND</div>
        <div style={s.refundReason}>Buổi hẹn bị hủy</div>
        <div style={s.refundDate}>Yêu cầu: 20/03/2026</div>
      </div>

      <div style={s.timeline}>
        {steps.map((step, i) => (
          <div key={i} style={{ ...s.timelineStep, ...(i === steps.length - 1 ? s.timelineStepLast : {}) }}>
            {i < steps.length - 1 && <div style={s.timelineLine} />}
            <span aria-hidden="true" className="material-symbols-outlined" style={s.stepIcon(step.color, step.status === 'current')}>{step.icon}</span>
            <div style={s.stepContent}>
              <div style={s.stepLabel(step.status !== 'pending')}>{step.label}</div>
              {step.detail && <div style={s.stepDetail}>{step.detail}</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={s.cardTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.cardTitleIcon}>receipt_long</span>
          Chi tiết giao dịch
        </div>
        {[
          { label: 'Mã giao dịch', value: 'TXN-20260320-0847' },
          { label: 'Số tiền gốc', value: '150.000 VND' },
          { label: 'Hoàn tiền', value: '150.000 VND' },
          { label: 'Phương thức', value: 'Ví GOMET' },
        ].map((item, i, arr) => (
          <div key={i} style={{ ...s.detailRow, ...(i === arr.length - 1 ? s.detailRowLast : {}) }}>
            <span style={s.detailLabel}>{item.label}</span>
            <span style={s.detailValue}>{item.value}</span>
          </div>
        ))}
      </div>

      <div style={s.supportCard}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.supportIcon}>support_agent</span>
        <div style={s.supportText}>
          <div style={s.supportTitle}>Cần trợ giúp?</div>
          <div style={s.supportSub}>Liên hệ hỗ trợ 24/7</div>
        </div>
        <button style={s.supportBtn} onClick={() => navigate('/app/help')}>Liên hệ</button>
      </div>

      <div style={s.card}>
        <div style={s.cardTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.cardTitleIcon}>help</span>
          Câu hỏi thường gặp
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ ...s.faqItem, ...(i === faqs.length - 1 ? s.faqItemLast : {}) }}>
            <button style={s.faqQ} onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
              <span style={s.faqQText}>{faq.q}</span>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ ...s.faqIcon, transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
            </button>
            {expandedFaq === i && <div style={s.faqA}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefundStatusPage;
