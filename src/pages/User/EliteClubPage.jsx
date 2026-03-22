import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EliteClubPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const benefits = [
    { icon: 'lock', title: 'Su kien rieng tu', desc: 'Chi danh cho Elite', detail: 'Tham gia cac su kien doc quyen voi so luong gioi han, khong gian sang trong.' },
    { icon: 'bolt', title: 'Uu tien ghep doi', desc: 'Top 1% hien thi', detail: 'Ho so cua ban se duoc uu tien hien thi tren tat ca nguoi dung.' },
    { icon: 'support_agent', title: 'Concierge 24/7', desc: 'Ho tro ca nhan', detail: 'Doi ngu ho tro rieng san sang tu van va giup do ban bat ky luc nao.' },
    { icon: 'redeem', title: 'Qua tang dac biet', desc: 'Moi thang', detail: 'Nhan qua tang sang trong tu cac thuong hieu doi tac moi thang.' },
  ];

  const members = [
    { id: 1, name: 'Thanh Tung', initial: 'T', since: 2024, quote: 'Elite giup toi gap duoc nguoi phu hop nhat chi trong 2 tuan.' },
    { id: 2, name: 'Ngoc Anh', initial: 'N', since: 2024, quote: 'Cac su kien rieng tu la trai nghiem tuyet voi, rat khac biet.' },
    { id: 3, name: 'Minh Duc', initial: 'M', since: 2025, quote: 'Dich vu concierge la dieu toi khong ngo, cuc ky chuyen nghiep.' },
  ];

  const features = [
    'Su kien doc quyen moi thang',
    'Ho so hien thi uu tien #1',
    'Concierge ca nhan 24/7',
    'Qua tang thuong hieu hang thang',
    'Huy badge Elite xac thuc',
    'Xem ai da thich ban',
    'Bo loc nang cao khong gioi han',
    'Uu dai doi tac nha hang & cafe',
  ];

  const s = {
    page: {
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
    },
    hero: {
      background: 'var(--inverse-surface)',
      color: 'var(--inverse-on-surface)',
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
      background: 'radial-gradient(circle, rgba(174,47,52,0.25), transparent 70%)',
      pointerEvents: 'none',
    },
    heroOrb2: {
      position: 'absolute',
      bottom: -40,
      left: -30,
      width: 160,
      height: 160,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,107,107,0.15), transparent 70%)',
      pointerEvents: 'none',
    },
    backBtn: {
      position: 'absolute',
      top: 16,
      left: 16,
      background: 'rgba(255,255,255,0.1)',
      border: 'none',
      color: 'var(--inverse-on-surface)',
      borderRadius: 'var(--radius-full)',
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
      color: '#d4a853',
      marginBottom: 12,
    },
    heroTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 800,
      background: 'linear-gradient(135deg, #d4a853, #f0d78c)',
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
      background: 'var(--surface)',
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
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 16,
      boxShadow: 'var(--card-shadow)',
      textAlign: 'center',
    },
    benefitIcon: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius)',
      background: 'var(--primary-fixed)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      color: 'var(--primary)',
    },
    benefitTitle: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 4,
    },
    benefitBadge: {
      display: 'inline-block',
      background: 'var(--primary-gradient)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 'var(--radius-full)',
      marginBottom: 6,
    },
    benefitDetail: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
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
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: 16,
      boxShadow: 'var(--card-shadow)',
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
      background: 'linear-gradient(135deg, #d4a853, #f0d78c)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 700,
      fontSize: 16,
    },
    memberName: {
      fontWeight: 700,
      fontSize: 14,
    },
    memberBadge: {
      fontSize: 11,
      color: '#d4a853',
      fontWeight: 600,
    },
    memberQuote: {
      fontSize: 13,
      fontStyle: 'italic',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
    },
    pricingCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: 28,
      boxShadow: 'var(--editorial-shadow)',
      textAlign: 'center',
    },
    toggleRow: {
      display: 'flex',
      background: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      padding: 3,
      marginBottom: 20,
    },
    toggleBtn: (active) => ({
      flex: 1,
      padding: '8px 0',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: active ? 'var(--surface-container-lowest)' : 'transparent',
      fontWeight: active ? 700 : 400,
      fontSize: 13,
      color: active ? 'var(--on-surface)' : 'var(--on-surface-variant)',
      cursor: 'pointer',
      boxShadow: active ? 'var(--card-shadow)' : 'none',
    }),
    priceMain: {
      fontFamily: 'var(--font-headline)',
      fontSize: 32,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    pricePer: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 4,
    },
    saveBadge: {
      display: 'inline-block',
      background: 'var(--error-container)',
      color: 'var(--error)',
      fontSize: 12,
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: 'var(--radius-full)',
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
      color: 'var(--on-surface)',
    },
    featureCheck: {
      fontSize: 18,
      color: 'var(--primary)',
    },
    ctaBtn: {
      width: '100%',
      padding: '14px 0',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'linear-gradient(135deg, #d4a853, #f0d78c)',
      color: '#3a2a0a',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(212,168,83,0.3)',
    },
    testimonialCard: {
      background: 'var(--inverse-surface)',
      color: 'var(--inverse-on-surface)',
      borderRadius: 'var(--radius-lg)',
      padding: 28,
      position: 'relative',
    },
    quoteIcon: {
      fontSize: 40,
      color: '#d4a853',
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
      background: 'linear-gradient(135deg, #d4a853, #f0d78c)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3a2a0a',
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
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="material-symbols-outlined" style={s.diamondIcon}>diamond</span>
        <h1 style={s.heroTitle}>GOMET Elite Club</h1>
        <p style={s.heroSub}>Danh cho nhung nguoi tinh hoa</p>
      </div>

      <div style={s.body}>
        {/* Benefits */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Dac quyen thanh vien</h2>
          <div style={s.benefitGrid}>
            {benefits.map((b, i) => (
              <div key={i} style={s.benefitCard}>
                <div style={s.benefitIcon}>
                  <span className="material-symbols-outlined">{b.icon}</span>
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
          <h2 style={s.sectionTitle}>Thanh vien noi bat</h2>
          <div style={s.memberCards}>
            {members.map(m => (
              <div key={m.id} style={s.memberCard}>
                <div style={s.memberTop}>
                  <div style={s.memberAvatar}>{m.initial}</div>
                  <div>
                    <div style={s.memberName}>{m.name}</div>
                    <div style={s.memberBadge}>Elite tu {m.since}</div>
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
              <button style={s.toggleBtn(billingCycle === 'monthly')} onClick={() => setBillingCycle('monthly')}>Hang thang</button>
              <button style={s.toggleBtn(billingCycle === 'yearly')} onClick={() => setBillingCycle('yearly')}>Hang nam</button>
            </div>
            <div style={s.priceMain}>
              {billingCycle === 'monthly' ? '1.999.000' : '15.990.000'} <span style={{ fontSize: 16, fontWeight: 400 }}>VND</span>
            </div>
            <div style={s.pricePer}>{billingCycle === 'monthly' ? '/thang' : '/nam'}</div>
            {billingCycle === 'yearly' && <div style={s.saveBadge}>Tiet kiem 33%</div>}
            <div style={s.featureList}>
              {features.map((f, i) => (
                <div key={i} style={s.featureItem}>
                  <span className="material-symbols-outlined" style={s.featureCheck}>check_circle</span>
                  {f}
                </div>
              ))}
            </div>
            <button style={s.ctaBtn}>Tham gia Elite ngay</button>
          </div>
        </div>

        {/* Testimonial */}
        <div style={{ ...s.section, paddingBottom: 32 }}>
          <h2 style={s.sectionTitle}>Cau chuyen thanh cong</h2>
          <div style={s.testimonialCard}>
            <span className="material-symbols-outlined" style={s.quoteIcon}>format_quote</span>
            <div style={s.quoteText}>
              Tu khi tham gia Elite, toi da gap duoc rat nhieu nguoi thu vi tai cac su kien rieng.
              Dich vu concierge giup toi len ke hoach hen hoan hao, va chi sau 3 thang toi da tim duoc
              nguoi ban doi ly tuong. GOMET Elite thuc su thay doi cuoc song cua toi.
            </div>
            <div style={s.quoteAuthor}>
              <div style={s.quoteAvatar}>H</div>
              <div>
                <div style={s.quoteName}>Ha Phuong</div>
                <div style={s.quoteRole}>Thanh vien Elite tu 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliteClubPage;
