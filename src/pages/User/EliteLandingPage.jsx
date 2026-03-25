import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const eliteKeyframes = `
@keyframes goldShimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-12px) rotate(-3deg); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes cardGlow {
  0%, 100% { box-shadow: 0 20px 60px rgba(255,213,79,0.15); }
  50% { box-shadow: 0 20px 80px rgba(255,213,79,0.3); }
}
`;

const benefits = [
  { icon: 'credit_card', title: 'Titanium Card', desc: 'Thẻ vật lý cao cấp với thiết kế riêng, khắc tên bạn' },
  { icon: 'table_restaurant', title: 'Head Table Access', desc: 'Ưu tiên đặt chỗ tại các sự kiện Secret Tables' },
  { icon: 'bolt', title: 'Priority Booking', desc: 'Đặt nhà hàng ưu tiên trước 48h so với thành viên thường' },
  { icon: 'support_agent', title: 'Concierge 24/7', desc: 'Đội ngũ tư vấn ẩm thực cá nhân phục vụ mọi lúc' },
  { icon: 'redeem', title: 'Quà tặng hàng tháng', desc: 'Voucher và quà tặng từ các thương hiệu đối tác' },
  { icon: 'workspace_premium', title: 'Huy hiệu Kim Cương', desc: 'Huy hiệu xác thực cấp cao nhất trên hồ sơ' },
];

const tiers = [
  { name: 'Đồng', price: 'Miễn phí', features: [true, false, false, false, false, true] },
  { name: 'Vàng', price: '499.000/tháng', features: [true, true, false, true, false, true] },
  { name: 'Kim Cương', price: '1.999.000/tháng', features: [true, true, true, true, true, true] },
];

const featureLabels = [
  'Khám phá ẩm thực', 'Secret Tables', 'Priority Booking',
  'Concierge 24/7', 'Quà tặng hàng tháng', 'Huy hiệu xác thực',
];

const testimonials = [
  { name: 'Thanh Tùng', title: 'Thành viên Kim Cương', text: 'Dịch vụ concierge đã giúp tôi tìm được những nhà hàng ấn tượng nhất Sài Gòn.' },
  { name: 'Ngọc Anh', title: 'Thành viên Kim Cương', text: 'Thẻ Titanium Card là điểm nhấn khi tôi đặt chỗ tại bất kỳ nhà hàng nào.' },
  { name: 'Minh Đức', title: 'Thành viên Kim Cương', text: 'Sự kiện Secret Tables là trải nghiệm ẩm thực đẳng cấp nhất tôi từng có.' },
];

const EliteLandingPage = () => {
  const navigate = useNavigate();
  const [showCompare, setShowCompare] = useState(false);

  const s = {
    page: {
      flex: 1, backgroundColor: '#0A0A0A', overflowY: 'auto',
      fontFamily: 'var(--font-body, "Inter", sans-serif)', color: '#FDF9F3',
    },
    hero: {
      padding: '48px 24px 56px', textAlign: 'center', position: 'relative',
      overflow: 'hidden',
    },
    heroOrb1: {
      position: 'absolute', top: -80, right: -60, width: 280, height: 280,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,213,79,0.12), transparent 70%)',
      pointerEvents: 'none',
    },
    heroOrb2: {
      position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,87,26,0.08), transparent 70%)',
      pointerEvents: 'none',
    },
    backBtn: {
      position: 'absolute', top: 20, left: 16, width: 40, height: 40,
      borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none',
      color: '#FDF9F3', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 2,
    },
    heroLabel: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 16px', borderRadius: '9999px',
      background: 'rgba(255,213,79,0.12)', color: '#FFD54F',
      fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', marginBottom: 20,
    },
    heroHeading: {
      fontFamily: 'var(--font-headline, "Plus Jakarta Sans")',
      fontSize: 36, fontWeight: 800, fontStyle: 'italic',
      lineHeight: 1.15, marginBottom: 12, position: 'relative', zIndex: 1,
    },
    heroGold: {
      background: 'linear-gradient(90deg, #FFD54F, #F57C00, #FFD54F)',
      backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      animation: 'goldShimmer 3s linear infinite',
    },
    heroSub: { fontSize: 14, color: '#E6BEB2', lineHeight: 1.6, maxWidth: 340, margin: '0 auto', zIndex: 1, position: 'relative' },
    cardSection: {
      display: 'flex', justifyContent: 'center', padding: '0 24px 48px',
    },
    physicalCard: {
      width: 300, height: 190, borderRadius: '1rem', position: 'relative',
      background: 'linear-gradient(135deg, #FFD54F, #F57C00, #FFD54F)',
      backgroundSize: '200% 200%', animation: 'goldShimmer 4s linear infinite, float 4s ease-in-out infinite, cardGlow 3s ease-in-out infinite',
      padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      overflow: 'hidden',
    },
    cardShine: {
      position: 'absolute', top: -50, right: -50, width: 200, height: 200,
      borderRadius: '50%', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none',
    },
    cardLogo: {
      fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 800,
      color: '#1a1a1a', letterSpacing: '0.08em', zIndex: 1,
    },
    cardTier: { fontSize: 10, fontWeight: 700, color: 'rgba(26,26,26,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' },
    cardName: {
      fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
      color: '#1a1a1a', zIndex: 1,
    },
    cardNumber: { fontSize: 12, color: 'rgba(26,26,26,0.5)', fontFamily: 'monospace', zIndex: 1 },
    body: { padding: '0 24px 100px', maxWidth: 600, margin: '0 auto' },
    sectionTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800,
      color: '#FDF9F3', marginBottom: 20, textAlign: 'center',
    },
    sectionTitleGold: { color: '#FFD54F' },
    benefitsGrid: {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40,
    },
    benefitCard: {
      padding: '20px 16px', borderRadius: '1.5rem', backgroundColor: '#1C1B1B',
      textAlign: 'center',
    },
    benefitIcon: { fontSize: 32, color: '#FFD54F', marginBottom: 10, display: 'block' },
    benefitTitle: {
      fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 700,
      color: '#FDF9F3', marginBottom: 4,
    },
    benefitDesc: { fontSize: 12, color: '#E6BEB2', lineHeight: 1.5 },
    compareToggle: {
      width: '100%', padding: '14px', borderRadius: '1rem', marginBottom: 16,
      border: '1px solid rgba(255,213,79,0.3)', background: 'transparent',
      color: '#FFD54F', fontSize: 14, fontWeight: 700,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    table: {
      width: '100%', borderCollapse: 'collapse', marginBottom: 40,
      borderRadius: '1rem', overflow: 'hidden',
    },
    th: (isDiamond) => ({
      padding: '12px 8px', fontSize: 12, fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      color: isDiamond ? '#FFD54F' : '#E6BEB2',
      backgroundColor: '#1C1B1B',
      textAlign: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }),
    td: {
      padding: '10px 8px', fontSize: 12, color: '#E6BEB2',
      backgroundColor: '#131313', textAlign: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
    },
    tdFeature: {
      padding: '10px 8px', fontSize: 12, color: '#FDF9F3',
      backgroundColor: '#131313', textAlign: 'left',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
    },
    checkMark: { fontSize: 18, color: '#117500' },
    crossMark: { fontSize: 18, color: '#666' },
    pricing: {
      textAlign: 'center', marginBottom: 32, padding: '32px 24px',
      borderRadius: '1.5rem',
      background: 'linear-gradient(135deg, rgba(255,213,79,0.08), rgba(255,213,79,0.02))',
    },
    priceValue: {
      fontFamily: 'var(--font-headline)', fontSize: 36, fontWeight: 800,
      color: '#FFD54F', marginBottom: 4,
    },
    priceUnit: { fontSize: 14, color: '#E6BEB2', marginBottom: 20 },
    ascendBtn: {
      width: '100%', padding: '18px', borderRadius: '9999px', border: 'none',
      background: 'linear-gradient(135deg, #FFD54F, #F57C00)',
      color: '#1a1a1a', fontSize: 18, fontWeight: 800,
      fontFamily: 'var(--font-headline)', cursor: 'pointer',
      letterSpacing: '0.02em',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    },
    testimonials: { marginBottom: 40 },
    testimonialCard: {
      padding: '20px', borderRadius: '1rem', backgroundColor: '#1C1B1B',
      marginBottom: 12,
    },
    testimonialHeader: {
      display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
    },
    testimonialAvatar: {
      width: 40, height: 40, borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFD54F, #F57C00)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    testimonialAvatarText: { fontSize: 16, fontWeight: 700, color: '#1a1a1a' },
    testimonialName: { fontSize: 14, fontWeight: 700, color: '#FDF9F3' },
    testimonialTitle: { fontSize: 11, color: '#FFD54F' },
    testimonialText: { fontSize: 13, color: '#E6BEB2', lineHeight: 1.6, fontStyle: 'italic' },
  };

  return (
    <div style={s.page}>
      <style>{eliteKeyframes}</style>

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroOrb1} />
        <div style={s.heroOrb2} />
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
        <div style={s.heroLabel}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>diamond</span>
          DIAMOND LEVEL
        </div>
        <div style={s.heroHeading}>
          <span style={s.heroGold}>Culinary Transcendence</span>
        </div>
        <div style={s.heroSub}>
          Nâng tầm trải nghiệm ẩm thực của bạn lên đẳng cấp cao nhất với GOMET Diamond.
        </div>
      </div>

      {/* Physical Card */}
      <div style={s.cardSection}>
        <div style={s.physicalCard}>
          <div style={s.cardShine} />
          <div>
            <div style={s.cardLogo}>GOMET</div>
            <div style={s.cardTier}>DIAMOND MEMBER</div>
          </div>
          <div>
            <div style={s.cardName}>MINH ANH NGUYEN</div>
            <div style={s.cardNumber}>**** **** **** 8426</div>
          </div>
        </div>
      </div>

      <div style={s.body}>
        {/* Benefits */}
        <div style={{ ...s.sectionTitle, ...s.sectionTitleGold }}>
          Đặc quyền cấp Kim Cương
        </div>
        <div style={s.benefitsGrid}>
          {benefits.map(b => (
            <div key={b.title} style={s.benefitCard}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.benefitIcon}>{b.icon}</span>
              <div style={s.benefitTitle}>{b.title}</div>
              <div style={s.benefitDesc}>{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <button style={s.compareToggle} onClick={() => setShowCompare(!showCompare)}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {showCompare ? 'expand_less' : 'compare'}
          </span>
          {showCompare ? 'Ẩn bảng so sánh' : 'So sánh các gói'}
        </button>

        {showCompare && (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th(false)}>Tính năng</th>
                {tiers.map(t => (
                  <th key={t.name} style={s.th(t.name === 'Kim Cương')}>{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureLabels.map((label, i) => (
                <tr key={label}>
                  <td style={s.tdFeature}>{label}</td>
                  {tiers.map(t => (
                    <td key={t.name} style={s.td}>
                      <span aria-hidden="true" className="material-symbols-outlined"
                        style={t.features[i] ? s.checkMark : s.crossMark}>
                        {t.features[i] ? 'check_circle' : 'cancel'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={s.tdFeature}>Giá</td>
                {tiers.map(t => (
                  <td key={t.name} style={{ ...s.td, fontWeight: 700, color: t.name === 'Kim Cương' ? '#FFD54F' : '#E6BEB2' }}>
                    {t.price}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}

        {/* Pricing */}
        <div style={s.pricing}>
          <div style={s.priceValue}>1.999.000</div>
          <div style={s.priceUnit}>VND / tháng</div>
          <button style={s.ascendBtn}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22 }}>diamond</span>
            Nâng lên Kim Cương
          </button>
        </div>

        {/* Testimonials */}
        <div style={s.sectionTitle}>Thành viên chia sẻ</div>
        <div style={s.testimonials}>
          {testimonials.map((t, i) => (
            <div key={i} style={s.testimonialCard}>
              <div style={s.testimonialHeader}>
                <div style={s.testimonialAvatar}>
                  <div style={s.testimonialAvatarText}>{t.name.charAt(0)}</div>
                </div>
                <div>
                  <div style={s.testimonialName}>{t.name}</div>
                  <div style={s.testimonialTitle}>{t.title}</div>
                </div>
              </div>
              <div style={s.testimonialText}>"{t.text}"</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EliteLandingPage;
