import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const topics = [
  { icon: 'account_circle', title: 'Tai khoan' },
  { icon: 'favorite', title: 'Hen ho & Match' },
  { icon: 'payments', title: 'Thanh toan' },
  { icon: 'verified_user', title: 'Xac minh' },
  { icon: 'report', title: 'An toan' },
  { icon: 'event', title: 'Su kien' },
];

const faqs = [
  { q: 'Lam sao de xac minh tai khoan?', a: 'Ban co the xac minh tai khoan bang cach chup anh selfie va giay to tuy than. Vao Cai dat > Xac minh danh tinh de bat dau quy trinh.' },
  { q: 'Cach nap tien vao vi GOMET?', a: 'Vao muc Vi GOMET > Nap tien. Ban co the nap qua the ngan hang, MoMo, ZaloPay hoac chuyen khoan truc tiep.' },
  { q: 'Toi co the huy buoi hen khong?', a: 'Co, ban co the huy buoi hen truoc 2 gio. Vao Buoi hen cua toi > Chon buoi hen > Huy. Luu y huy nhieu lan co the anh huong den danh gia.' },
  { q: 'Lam sao bao cao nguoi dung?', a: 'Nhan vao ho so nguoi dung > Bieu tuong 3 cham > Bao cao. Chon ly do bao cao va cung cap chi tiet. Doi ngu se xem xet trong 24h.' },
  { q: 'GOMET Premium co gi dac biet?', a: 'Premium bao gom: Xem ai thich ban, Khong gioi han luot thich, Boost ho so moi ngay, Uu tien hien thi, va nhieu tinh nang doc quyen khac.' },
  { q: 'Cach lien he ho tro?', a: 'Ban co the lien he qua chat truc tiep trong ung dung, gui email hotro@gomet.vn, hoac goi 1900-xxxx tu 8h-22h hang ngay.' },
];

const HelpCenterPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (i) => {
    setOpenFaq(prev => prev === i ? null : i);
  };

  const filteredFaqs = search
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()))
    : faqs;

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
      marginBottom: 24,
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
    searchWrapper: {
      position: 'relative',
      marginBottom: 28,
    },
    searchIcon: {
      position: 'absolute',
      left: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 22,
      color: '#E6BEB2',
    },
    searchInput: {
      width: '100%',
      padding: '14px 16px 14px 48px',
      borderRadius: 9999,
      border: 'none',
      backgroundColor: '#1C1B1B',
      fontSize: 15,
      fontFamily: 'var(--font-body)',
      color: '#FDF9F3',
      outline: 'none',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
    },
    topicsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      marginBottom: 32,
    },
    topicCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '20px 12px',
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      cursor: 'pointer',
    },
    topicIcon: {
      fontSize: 32,
      color: '#FFB59E',
    },
    topicTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 600,
      color: '#FDF9F3',
      textAlign: 'center',
    },
    faqList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 32,
    },
    faqItem: {
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      overflow: 'hidden',
    },
    faqQuestion: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    faqArrow: (open) => ({
      fontSize: 20,
      color: '#E6BEB2',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
    }),
    faqAnswer: {
      padding: '0 16px 14px',
      fontSize: 13,
      lineHeight: 1.6,
      color: '#E6BEB2',
    },
    supportCard: {
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      padding: '24px 20px',
      textAlign: 'center',
    },
    supportTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    supportSubtitle: {
      fontSize: 13,
      color: '#E6BEB2',
      marginBottom: 20,
    },
    supportActions: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    supportBtn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: '16px 20px',
      borderRadius: '1.5rem',
      backgroundColor: '#2A2A2A',
      cursor: 'pointer',
      flex: 1,
      minWidth: 90,
    },
    supportBtnIcon: {
      fontSize: 28,
      color: '#FFB59E',
    },
    supportBtnLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: '#FDF9F3',
      fontFamily: 'var(--font-headline)',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>support_agent</span>
        <h1 style={s.heading}>Trung tam tro giup</h1>
      </div>

      {/* Search */}
      <div style={s.searchWrapper}>
        <span className="material-symbols-outlined" style={s.searchIcon}>search</span>
        <input
          style={s.searchInput}
          placeholder="Tim kiem cau hoi..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Topics */}
      <h2 style={s.sectionTitle}>Chu de pho bien</h2>
      <div style={s.topicsGrid}>
        {topics.map((t, i) => (
          <div key={i} style={s.topicCard}>
            <span className="material-symbols-outlined" style={s.topicIcon}>{t.icon}</span>
            <span style={s.topicTitle}>{t.title}</span>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <h2 style={s.sectionTitle}>Cau hoi thuong gap</h2>
      <div style={s.faqList}>
        {filteredFaqs.map((f, i) => (
          <div key={i} style={s.faqItem}>
            <button style={s.faqQuestion} onClick={() => toggleFaq(i)}>
              {f.q}
              <span className="material-symbols-outlined" style={s.faqArrow(openFaq === i)}>
                expand_more
              </span>
            </button>
            {openFaq === i && (
              <div style={s.faqAnswer}>{f.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* Support contact */}
      <div style={s.supportCard}>
        <div style={s.supportTitle}>Van can ho tro?</div>
        <p style={s.supportSubtitle}>Chon cach lien he phu hop voi ban</p>
        <div style={s.supportActions}>
          <div style={s.supportBtn}>
            <span className="material-symbols-outlined" style={s.supportBtnIcon}>chat</span>
            <span style={s.supportBtnLabel}>Lien he truc tiep</span>
          </div>
          <div style={s.supportBtn}>
            <span className="material-symbols-outlined" style={s.supportBtnIcon}>mail</span>
            <span style={s.supportBtnLabel}>Gui email</span>
          </div>
          <div style={s.supportBtn}>
            <span className="material-symbols-outlined" style={s.supportBtnIcon}>call</span>
            <span style={s.supportBtnLabel}>Goi dien</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
