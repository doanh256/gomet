import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Tất cả', 'Hoa', 'Socola', 'Thú bông', 'Voucher'];

const gifts = [
  { id: 1, name: 'Bó hoa hồng', desc: 'Hồng nhung tươi thật đẹp', price: 150, cat: 'Hoa', emoji: '\uD83C\uDF39' },
  { id: 2, name: 'Hộp socola Godiva', desc: 'Socola cao cấp Bỉ', price: 200, cat: 'Socola', emoji: '\uD83C\uDF6B' },
  { id: 3, name: 'Gấu bông tim', desc: 'Gấu bông mềm mại đáng yêu', price: 120, cat: 'Thú bông', emoji: '\uD83E\uDDF8' },
  { id: 4, name: 'Voucher Spa', desc: 'Thư giãn cho 2 người', price: 300, cat: 'Voucher', emoji: '\uD83D\uDC86' },
  { id: 5, name: 'Hoa hướng dương', desc: 'Tươi sáng như nắng mai', price: 100, cat: 'Hoa', emoji: '\uD83C\uDF3B' },
  { id: 6, name: 'Socola handmade', desc: 'Làm thủ công từ cacao', price: 180, cat: 'Socola', emoji: '\uD83C\uDF75' },
  { id: 7, name: 'Thú bông thỏ', desc: 'Thỏ bông đáng yêu có nơ', price: 90, cat: 'Thú bông', emoji: '\uD83D\uDC30' },
  { id: 8, name: 'Voucher Dinner', desc: 'Bữa tối lãng mạn cho đôi', price: 350, cat: 'Voucher', emoji: '\uD83C\uDF7D\uFE0F' },
];

const popularGifts = [
  { id: 20, name: 'Trái tim pha lê', price: 250, emoji: '\uD83D\uDC8E' },
  { id: 21, name: 'Nến thơm', price: 80, emoji: '\uD83D\uDD6F\uFE0F' },
  { id: 22, name: 'Thiệp viết tay', price: 50, emoji: '\u2709\uFE0F' },
  { id: 23, name: 'Hoa lavender', price: 130, emoji: '\uD83D\uDC9C' },
  { id: 24, name: 'Bánh macaron', price: 160, emoji: '\uD83C\uDF70' },
];

const GiftShopPage = () => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState(0);

  const filtered = activeCat === 0
    ? gifts
    : gifts.filter(g => g.cat === categories[activeCat]);

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
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    catScroll: {
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      marginBottom: 24,
      paddingBottom: 4,
    },
    catChip: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      padding: '8px 18px',
      borderRadius: '9999px',
      border: 'none',
      backgroundColor: '#2A2A2A',
      color: '#E6BEB2',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    },
    catChipActive: {
      backgroundColor: '#FFB59E',
      color: '#3A0B00',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 12,
      marginBottom: 28,
    },
    giftCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    giftImage: {
      height: 180,
      background: 'linear-gradient(135deg, #2A2A2A, #353535)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 56,
    },
    giftBody: {
      padding: '14px',
    },
    giftName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    giftDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
      marginBottom: 10,
      lineHeight: 1.4,
    },
    giftBottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    giftPrice: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#FFB59E',
    },
    sendBtn: {
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 700,
      color: '#3A0B00',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      border: 'none',
      padding: '7px 14px',
      borderRadius: '9999px',
      cursor: 'pointer',
    },
    featured: {
      backgroundColor: 'rgba(255,181,158,0.15)',
      borderRadius: '1.5rem',
      padding: '24px 20px',
      marginBottom: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    },
    featuredEmoji: {
      fontSize: 64,
      flexShrink: 0,
    },
    featuredInfo: {
      flex: 1,
    },
    featuredBadge: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      color: '#FFB59E',
      backgroundColor: '#2A2A2A',
      padding: '4px 10px',
      borderRadius: '9999px',
      display: 'inline-block',
      marginBottom: 8,
    },
    featuredName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    featuredDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
      opacity: 0.8,
      marginBottom: 10,
    },
    featuredPrice: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 800,
      color: '#FFB59E',
    },
    balanceCard: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 28,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    walletIcon: {
      fontSize: 32,
      color: '#FFB59E',
    },
    balanceInfo: {
      flex: 1,
    },
    balanceLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
    },
    balanceValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: '#FDF9F3',
    },
    topUpLink: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: '#FFB59E',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 14,
    },
    popularScroll: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 8,
    },
    popularCard: {
      flex: '0 0 auto',
      width: 120,
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '14px 10px',
      textAlign: 'center',
    },
    popularEmoji: {
      fontSize: 36,
      marginBottom: 8,
    },
    popularName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 600,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    popularPrice: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: '#FFB59E',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>redeem</span>
        <h1 style={s.heading}>Quà tặng tinh tế</h1>
        <p style={s.subtitle}>Gửi yêu thương đến người đặc biệt</p>
      </div>

      <div style={s.catScroll}>
        {categories.map((c, i) => (
          <button
            key={c}
            style={{...s.catChip, ...(activeCat === i ? s.catChipActive : {})}}
            onClick={() => setActiveCat(i)}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={s.featured}>
        <div style={s.featuredEmoji}>{'\uD83D\uDC9D'}</div>
        <div style={s.featuredInfo}>
          <div style={s.featuredBadge}>Đặc biệt</div>
          <div style={s.featuredName}>Set quà Valentine</div>
          <div style={s.featuredDesc}>Hoa hồng, socola và thiệp viết tay - combo hoàn hảo cho ngày lễ tình nhân</div>
          <div style={s.featuredPrice}>450 xu</div>
        </div>
      </div>

      <div style={s.grid}>
        {filtered.map(g => (
          <div key={g.id} style={s.giftCard}>
            <div style={s.giftImage}>{g.emoji}</div>
            <div style={s.giftBody}>
              <div style={s.giftName}>{g.name}</div>
              <div style={s.giftDesc}>{g.desc}</div>
              <div style={s.giftBottom}>
                <div style={s.giftPrice}>{g.price} xu</div>
                <button style={s.sendBtn}>Gửi tặng</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={s.balanceCard}>
        <span className="material-symbols-outlined filled" style={s.walletIcon}>account_balance_wallet</span>
        <div style={s.balanceInfo}>
          <div style={s.balanceLabel}>Số dư của bạn</div>
          <div style={s.balanceValue}>2.450 xu</div>
        </div>
        <span style={s.topUpLink} onClick={() => navigate('/app/wallet')}>Nạp thêm</span>
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Quà tặng phổ biến</h2>
        <div style={s.popularScroll}>
          {popularGifts.map(g => (
            <div key={g.id} style={s.popularCard}>
              <div style={s.popularEmoji}>{g.emoji}</div>
              <div style={s.popularName}>{g.name}</div>
              <div style={s.popularPrice}>{g.price} xu</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftShopPage;
