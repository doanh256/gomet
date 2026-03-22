import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Tat ca', 'Hoa', 'Socola', 'Thu bong', 'Voucher'];

const gifts = [
  { id: 1, name: 'Bo hoa hong', desc: 'Hong nhung tuoi that dep', price: 150, cat: 'Hoa', emoji: '\uD83C\uDF39' },
  { id: 2, name: 'Hop socola Godiva', desc: 'Socola cao cap Bi', price: 200, cat: 'Socola', emoji: '\uD83C\uDF6B' },
  { id: 3, name: 'Gau bong tim', desc: 'Gau bong mem mai dang yeu', price: 120, cat: 'Thu bong', emoji: '\uD83E\uDDF8' },
  { id: 4, name: 'Voucher Spa', desc: 'Thu gian cho 2 nguoi', price: 300, cat: 'Voucher', emoji: '\uD83D\uDC86' },
  { id: 5, name: 'Hoa huong duong', desc: 'Tuoi sang nhu nang mai', price: 100, cat: 'Hoa', emoji: '\uD83C\uDF3B' },
  { id: 6, name: 'Socola handmade', desc: 'Lam thu cong tu cacao', price: 180, cat: 'Socola', emoji: '\uD83C\uDF75' },
  { id: 7, name: 'Thu bong tho', desc: 'Tho bong dang yeu co no', price: 90, cat: 'Thu bong', emoji: '\uD83D\uDC30' },
  { id: 8, name: 'Voucher Dinner', desc: 'Bua toi lang man cho doi', price: 350, cat: 'Voucher', emoji: '\uD83C\uDF7D\uFE0F' },
];

const popularGifts = [
  { id: 20, name: 'Trai tim pha le', price: 250, emoji: '\uD83D\uDC8E' },
  { id: 21, name: 'Nen thom', price: 80, emoji: '\uD83D\uDD6F\uFE0F' },
  { id: 22, name: 'Thiep viet tay', price: 50, emoji: '\u2709\uFE0F' },
  { id: 23, name: 'Hoa lavender', price: 130, emoji: '\uD83D\uDC9C' },
  { id: 24, name: 'Banh macaron', price: 160, emoji: '\uD83C\uDF70' },
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
      backgroundColor: 'var(--surface)',
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
      color: 'var(--primary)',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
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
      borderRadius: 'var(--radius-full)',
      border: '1.5px solid var(--outline-variant)',
      backgroundColor: 'transparent',
      color: 'var(--on-surface-variant)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    },
    catChipActive: {
      backgroundColor: 'var(--primary)',
      color: 'var(--on-primary)',
      borderColor: 'var(--primary)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 12,
      marginBottom: 28,
    },
    giftCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    },
    giftImage: {
      height: 180,
      background: 'linear-gradient(135deg, var(--primary-fixed), var(--surface-container-high))',
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
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    giftDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
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
      color: 'var(--primary)',
    },
    sendBtn: {
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--on-primary)',
      background: 'var(--primary-gradient)',
      border: 'none',
      padding: '7px 14px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
    },
    featured: {
      backgroundColor: 'var(--primary-fixed)',
      borderRadius: 'var(--radius-lg)',
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
      color: 'var(--primary)',
      backgroundColor: 'var(--surface-container-lowest)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      display: 'inline-block',
      marginBottom: 8,
    },
    featuredName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--on-primary-container)',
      marginBottom: 4,
    },
    featuredDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-primary-container)',
      opacity: 0.8,
      marginBottom: 10,
    },
    featuredPrice: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 800,
      color: 'var(--primary)',
    },
    balanceCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 28,
      boxShadow: 'var(--card-shadow)',
    },
    walletIcon: {
      fontSize: 32,
      color: 'var(--primary)',
    },
    balanceInfo: {
      flex: 1,
    },
    balanceLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
    },
    balanceValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    topUpLink: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--primary)',
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
      color: 'var(--on-surface)',
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
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: 'var(--radius)',
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
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    popularPrice: {
      fontFamily: 'var(--font-headline)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--primary)',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>redeem</span>
        <h1 style={s.heading}>Qua tang tinh te</h1>
        <p style={s.subtitle}>Gui yeu thuong den nguoi dac biet</p>
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
          <div style={s.featuredBadge}>Dac biet</div>
          <div style={s.featuredName}>Set qua Valentine</div>
          <div style={s.featuredDesc}>Hoa hong, socola va thiep viet tay - combo hoan hao cho ngay le tinh nhan</div>
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
                <button style={s.sendBtn}>Gui tang</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={s.balanceCard}>
        <span className="material-symbols-outlined filled" style={s.walletIcon}>account_balance_wallet</span>
        <div style={s.balanceInfo}>
          <div style={s.balanceLabel}>So du cua ban</div>
          <div style={s.balanceValue}>2,450 xu</div>
        </div>
        <span style={s.topUpLink} onClick={() => navigate('/wallet')}>Nap them</span>
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Qua tang pho bien</h2>
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
