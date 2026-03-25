import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EliteClubPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const benefits = [
    { icon: 'lock', title: 'Sự kiện riêng tư', desc: 'Chỉ dành cho Elite', detail: 'Tham gia các sự kiện độc quyền với số lượng giới hạn, không gian sang trọng.' },
    { icon: 'bolt', title: 'Ưu tiên ghép đôi', desc: 'Top 1% hiển thị', detail: 'Hồ sơ của bạn sẽ được ưu tiên hiển thị trên tất cả người dùng.' },
    { icon: 'support_agent', title: 'Concierge 24/7', desc: 'Hỗ trợ cá nhân', detail: 'Đội ngũ hỗ trợ riêng sẵn sàng tư vấn và giúp đỡ bạn bất kỳ lúc nào.' },
    { icon: 'redeem', title: 'Quà tặng đặc biệt', desc: 'Mỗi tháng', detail: 'Nhận quà tặng sang trọng từ các thương hiệu đối tác mỗi tháng.' },
  ];

  const members = [
    { id: 1, name: 'Thanh Tùng', initial: 'T', since: 2024, quote: 'Elite giúp tôi gặp được người phù hợp nhất chỉ trong 2 tuần.' },
    { id: 2, name: 'Ngọc Anh', initial: 'N', since: 2024, quote: 'Các sự kiện riêng tư là trải nghiệm tuyệt vời, rất khác biệt.' },
    { id: 3, name: 'Minh Đức', initial: 'M', since: 2025, quote: 'Dịch vụ concierge là điều tôi không ngờ, cực kỳ chuyên nghiệp.' },
  ];

  const features = [
    'Sự kiện độc quyền mỗi tháng',
    'Hồ sơ hiển thị ưu tiên #1',
    'Concierge cá nhân 24/7',
    'Quà tặng thương hiệu hàng tháng',
    'Huy badge Elite xác thực',
    'Xem ai đã thích bạn',
    'Bộ lọc nâng cao không giới hạn',
    'Ưu đãi đối tác nhà hàng & cafe',
  ];

  const s = {
    page: {
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
      color: '#FDF9F3',
    },
    hero: {
      background: '#131313',
      color: '#FDF9F3',
      padding: '24px 20px 48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    heroOrb1: {
      position: 'absolute',
      top: -60,
      right: -40,
      width: 200,
      height: 200,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,87,26,0.25), transparent 70%)',
      pointerEvents: 'none',
    },
    heroOrb2: {
      position: 'absolute',
      bottom: -40,
      left: -30,
      width: 160,
      height: 160,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,181,158,0.15), transparent 70%)',
      pointerEvents: 'none',
    },
    backBtn: {
      position: 'absolute',
      top: 16,
      left: 16,
      background: 'rgba(255,255,255,0.1)',
      border: 'none',
      color: '#FDF9F3',
      borderRadius: '9999px',
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 1,
    },
    diamondIcon: {
      fontSize: 56,
      color: '#FFD54F',
      marginBottom: 12,
    },
    heroTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 800,
      background: 'linear-gradient(135deg, #FFD54F, #FFB59E)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: 8,
    },
    heroSub: {
      fontSize: 15,
      opacity: 0.7,
      letterSpacing: 0.5,
    },
    body: {
      background: '#131313',
      borderRadius: '24px 24px 0 0',
      marginTop: -24,
      position: 'relative',
      zIndex: 1,
    },
    section: {
      padding: '28px 20px 0',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 19,
      fontWeight: 700,
      marginBottom: 16,
    },
    benefitGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: 12,
    },
    benefitCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 16,
      textAlign: 'center',
    },
    benefitIcon: {
      width: 48,
      height: 48,
      borderRadius: '1.5rem',
      background: '#2A2A2A',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      color: '#FFB59E',
    },
    benefitTitle: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 4,
    },
    benefitBadge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      fontSize: 10,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: '9999px',
      marginBottom: 6,
    },
    benefitDetail: {
      fontSize: 12,
      color: '#E6BEB2',
      lineHeight: 1.4,
    },
    memberCards: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 4,
    },
    memberCard: {
      flex: '0 0 220px',
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 16,
    },
    memberTop: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
    },
    memberAvatar: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFD54F, #FFB59E)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3A0B00',
      fontWeight: 700,
      fontSize: 16,
    },
    memberName: {
      fontWeight: 700,
      fontSize: 14,
    },
    memberBadge: {
      fontSize: 11,
      color: '#FFD54F',
      fontWeight: 600,
    },
    memberQuote: {
      fontSize: 13,
      fontStyle: 'italic',
      color: '#E6BEB2',
      lineHeight: 1.5,
    },
    pricingCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 28,
      textAlign: 'center',
    },
    toggleRow: {
      display: 'flex',
      background: '#2A2A2A',
      borderRadius: '9999px',
      padding: 3,
      marginBottom: 20,
    },
    toggleBtn: (active) => ({
      flex: 1,
      padding: '8px 0',
      borderRadius: '9999px',
      border: 'none',
      background: active ? '#353535' : 'transparent',
      fontWeight: active ? 700 : 400,
      fontSize: 13,
      color: active ? '#FDF9F3' : '#E6BEB2',
      cursor: 'pointer',
    }),
    priceMain: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    pricePer: {
      fontSize: 13,
      color: '#E6BEB2',
      marginBottom: 4,
    },
    saveBadge: {
      display: 'inline-block',
      background: '#FF571A',
      color: '#3A0B00',
      fontSize: 12,
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: '9999px',
      marginBottom: 20,
    },
    featureList: {
      textAlign: 'left',
      marginBottom: 24,
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 0',
      fontSize: 13,
      color: '#FDF9F3',
    },
    featureCheck: {
      fontSize: 18,
      color: '#FFB59E',
    },
    ctaBtn: {
      width: '100%',
      padding: '14px 0',
      borderRadius: '9999px',
      border: 'none',
      background: 'linear-gradient(135deg, #FFD54F, #FFB59E)',
      color: '#3A0B00',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(255,181,158,0.3)',
    },
    testimonialCard: {
      background: '#1C1B1B',
      color: '#FDF9F3',
      borderRadius: '1.5rem',
      padding: 28,
      position: 'relative',
    },
    quoteIcon: {
      fontSize: 40,
      color: '#FFD54F',
      marginBottom: 12,
    },
    quoteText: {
      fontSize: 16,
      lineHeight: 1.7,
      fontStyle: 'italic',
      marginBottom: 16,
    },
    quoteAuthor: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    quoteAvatar: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFD54F, #FFB59E)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3A0B00',
      fontWeight: 700,
      fontSize: 14,
    },
    quoteName: {
      fontWeight: 700,
      fontSize: 14,
    },
    quoteRole: {
      fontSize: 12,
      opacity: 0.6,
    },
  };

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroOrb1} />
        <div style={s.heroOrb2} />
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.diamondIcon}>diamond</span>
        <h1 style={s.heroTitle}>GOMET Elite Club</h1>
        <p style={s.heroSub}>Dành cho những người tinh hoa</p>
      </div>

      <div style={s.body}>
        {/* Benefits */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Đặc quyền thành viên</h2>
          <div style={s.benefitGrid}>
            {benefits.map((b, i) => (
              <div key={i} style={s.benefitCard}>
                <div style={s.benefitIcon}>
                  <span aria-hidden="true" className="material-symbols-outlined">{b.icon}</span>
                </div>
                <div style={s.benefitTitle}>{b.title}</div>
                <div style={s.benefitBadge}>{b.desc}</div>
                <div style={s.benefitDetail}>{b.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Members */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Thành viên nổi bật</h2>
          <div style={s.memberCards}>
            {members.map(m => (
              <div key={m.id} style={s.memberCard}>
                <div style={s.memberTop}>
                  <div style={s.memberAvatar}>{m.initial}</div>
                  <div>
                    <div style={s.memberName}>{m.name}</div>
                    <div style={s.memberBadge}>Elite từ {m.since}</div>
                  </div>
                </div>
                <div style={s.memberQuote}>"{m.quote}"</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Tham gia Elite</h2>
          <div style={s.pricingCard}>
            <div style={s.toggleRow}>
              <button style={s.toggleBtn(billingCycle === 'monthly')} onClick={() => setBillingCycle('monthly')}>Hàng tháng</button>
              <button style={s.toggleBtn(billingCycle === 'yearly')} onClick={() => setBillingCycle('yearly')}>Hàng năm</button>
            </div>
            <div style={s.priceMain}>
              {billingCycle === 'monthly' ? '1.999.000' : '15.990.000'} <span style={{ fontSize: 16, fontWeight: 400 }}>VND</span>
            </div>
            <div style={s.pricePer}>{billingCycle === 'monthly' ? '/tháng' : '/năm'}</div>
            {billingCycle === 'yearly' && <div style={s.saveBadge}>Tiết kiệm 33%</div>}
            <div style={s.featureList}>
              {features.map((f, i) => (
                <div key={i} style={s.featureItem}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={s.featureCheck}>check_circle</span>
                  {f}
                </div>
              ))}
            </div>
            <button style={s.ctaBtn}>Tham gia Elite ngay</button>
          </div>
        </div>

        {/* Testimonial */}
        <div style={{ ...s.section, paddingBottom: 32 }}>
          <h2 style={s.sectionTitle}>Câu chuyện thành công</h2>
          <div style={s.testimonialCard}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.quoteIcon}>format_quote</span>
            <div style={s.quoteText}>
              Từ khi tham gia Elite, tôi đã gặp được rất nhiều người thú vị tại các sự kiện riêng.
              Dịch vụ concierge giúp tôi lên kế hoạch hẹn hoàn hảo, và chỉ sau 3 tháng tôi đã tìm được
              người bạn đời lý tưởng. GOMET Elite thực sự thay đổi cuộc sống của tôi.
            </div>
            <div style={s.quoteAuthor}>
              <div style={s.quoteAvatar}>H</div>
              <div>
                <div style={s.quoteName}>Hà Phương</div>
                <div style={s.quoteRole}>Thành viên Elite từ 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliteClubPage;
