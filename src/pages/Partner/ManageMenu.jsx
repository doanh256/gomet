import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageMenu = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'Tat ca' },
    { key: 'main', label: 'Mon chinh' },
    { key: 'drink', label: 'Do uong' },
    { key: 'dessert', label: 'Trang mieng' },
    { key: 'special', label: 'Dac biet' },
  ];

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Bo Wagyu nuong da nong', desc: 'Bo Wagyu A5 nuong tren da nui lua, kem sot truffle', price: '450.000', category: 'special', emoji: '\uD83E\uDD69', available: true },
    { id: 2, name: 'Pasta Carbonara truffle', desc: 'My Y sot kem truffle den, bacon gion, pho mai Pecorino', price: '185.000', category: 'main', emoji: '\uD83C\uDF5D', available: true },
    { id: 3, name: 'Cocktail Velvet Sunset', desc: 'Gin, cam tuoi, syrup hoa hong, soda y, la bac ha', price: '125.000', category: 'drink', emoji: '\uD83C\uDF79', available: true },
    { id: 4, name: 'Tiramisu truyen thong', desc: 'Banh Tiramisu theo cong thuc Y, ca phe espresso, mascarpone', price: '95.000', category: 'dessert', emoji: '\uD83C\uDF70', available: true },
    { id: 5, name: 'Ca hoi Na Uy sot chanh day', desc: 'Ca hoi tuoi nuong, sot chanh day, rau cu theo mua', price: '285.000', category: 'main', emoji: '\uD83E\uDD62', available: false },
    { id: 6, name: 'Matcha Latte dac biet', desc: 'Matcha Uji Nhat Ban, sua tuoi, kem whip, bot matcha', price: '85.000', category: 'drink', emoji: '\uD83C\uDF75', available: true },
    { id: 7, name: 'Lava Cake socola Bi', desc: 'Banh socola nong chay, kem vanilla Madagascar, dau tay', price: '115.000', category: 'dessert', emoji: '\uD83C\uDF6B', available: true },
    { id: 8, name: 'Set han quoc cho 2 nguoi', desc: 'Bo nuong, hai san, banchan, com tron, canh kimchi', price: '650.000', category: 'special', emoji: '\uD83C\uDF72', available: true },
  ]);

  const trendingItems = [
    { name: 'Bo Wagyu nuong da nong', percent: 92 },
    { name: 'Cocktail Velvet Sunset', percent: 78 },
    { name: 'Tiramisu truyen thong', percent: 65 },
  ];

  const filtered = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const toggleAvailability = (id) => {
    setMenuItems(prev =>
      prev.map(item => item.id === id ? { ...item, available: !item.available } : item)
    );
  };

  const gradients = [
    'linear-gradient(135deg, #ae2f34, #ff6b6b)',
    'linear-gradient(135deg, #894e45, #cf8a7f)',
    'linear-gradient(135deg, #5f5e5e, #8c706f)',
    'linear-gradient(135deg, #ff6b6b, #ae2f34)',
  ];

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'var(--surface)',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      padding: '24px',
      maxWidth: 1200,
      margin: '0 auto',
    },
    topRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    headerIcon: {
      fontSize: 32,
      color: 'var(--primary)',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 700,
    },
    addBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 24px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.15s',
    },
    categoryRow: {
      display: 'flex',
      gap: 10,
      marginBottom: 28,
      overflowX: 'auto',
    },
    categoryChip: (active) => ({
      padding: '8px 20px',
      borderRadius: 'var(--radius-full)',
      border: active ? 'none' : '1px solid var(--outline-variant)',
      background: active ? 'var(--primary)' : 'var(--surface-container-lowest)',
      color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.15s',
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 18,
      marginBottom: 36,
    },
    menuCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
      transition: 'box-shadow 0.2s, transform 0.2s',
    },
    menuImage: (gradient) => ({
      height: 150,
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 56,
      userSelect: 'none',
    }),
    menuBody: {
      padding: '16px 18px',
    },
    menuName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 4,
      color: 'var(--on-surface)',
    },
    menuDesc: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      lineHeight: 1.4,
      marginBottom: 10,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    menuPrice: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--primary)',
      marginBottom: 12,
    },
    menuFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    toggleWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    toggleTrack: (active) => ({
      width: 44,
      height: 24,
      borderRadius: 12,
      background: active ? '#2e7d32' : 'var(--outline-variant)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }),
    toggleThumb: (active) => ({
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'white',
      position: 'absolute',
      top: 3,
      left: active ? 23 : 3,
      transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }),
    toggleLabel: (active) => ({
      fontSize: 12,
      fontWeight: 500,
      color: active ? '#2e7d32' : 'var(--on-surface-variant)',
    }),
    iconBtnRow: {
      display: 'flex',
      gap: 6,
    },
    iconBtn: (variant) => ({
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: variant === 'delete' ? 'var(--error-container)' : 'var(--surface-container-high)',
      color: variant === 'delete' ? 'var(--error)' : 'var(--on-surface-variant)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.15s',
    }),
    iconBtnIcon: {
      fontSize: 18,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 16,
      color: 'var(--on-surface)',
    },
    trendingSection: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
    },
    trendingHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20,
    },
    trendingIcon: {
      fontSize: 22,
      color: 'var(--primary)',
    },
    trendingTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 600,
    },
    trendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14,
    },
    trendRank: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--primary)',
      minWidth: 24,
    },
    trendInfo: {
      flex: 1,
    },
    trendName: {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 6,
      color: 'var(--on-surface)',
    },
    trendBarBg: {
      height: 10,
      borderRadius: 5,
      background: 'var(--surface-container-high)',
      overflow: 'hidden',
    },
    trendBarFill: (percent) => ({
      height: '100%',
      width: `${percent}%`,
      borderRadius: 5,
      background: 'var(--primary-gradient)',
      transition: 'width 0.5s ease',
    }),
    trendPercent: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--primary)',
      minWidth: 40,
      textAlign: 'right',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.topRow}>
        <div style={styles.header}>
          <span className="material-symbols-outlined" style={styles.headerIcon}>restaurant_menu</span>
          <h1 style={styles.title}>Quan ly thuc don</h1>
        </div>
        <button
          style={styles.addBtn}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
          Them mon moi
        </button>
      </div>

      <div style={styles.categoryRow}>
        {categories.map((c) => (
          <button
            key={c.key}
            style={styles.categoryChip(activeCategory === c.key)}
            onClick={() => setActiveCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            style={styles.menuCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--editorial-shadow)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--card-shadow)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={styles.menuImage(gradients[idx % gradients.length])}>
              {item.emoji}
            </div>
            <div style={styles.menuBody}>
              <div style={styles.menuName}>{item.name}</div>
              <div style={styles.menuDesc}>{item.desc}</div>
              <div style={styles.menuPrice}>{item.price} VND</div>
              <div style={styles.menuFooter}>
                <div style={styles.toggleWrap}>
                  <div
                    style={styles.toggleTrack(item.available)}
                    onClick={() => toggleAvailability(item.id)}
                  >
                    <div style={styles.toggleThumb(item.available)} />
                  </div>
                  <span style={styles.toggleLabel(item.available)}>
                    {item.available ? 'Con hang' : 'Het hang'}
                  </span>
                </div>
                <div style={styles.iconBtnRow}>
                  <button style={styles.iconBtn('edit')}>
                    <span className="material-symbols-outlined" style={styles.iconBtnIcon}>edit</span>
                  </button>
                  <button style={styles.iconBtn('delete')}>
                    <span className="material-symbols-outlined" style={styles.iconBtnIcon}>delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Section */}
      <div style={styles.trendingSection}>
        <div style={styles.trendingHeader}>
          <span className="material-symbols-outlined" style={styles.trendingIcon}>trending_up</span>
          <h2 style={styles.trendingTitle}>Xu huong - Mon duoc goi nhieu nhat</h2>
        </div>
        {trendingItems.map((item, i) => (
          <div key={i} style={styles.trendItem}>
            <div style={styles.trendRank}>#{i + 1}</div>
            <div style={styles.trendInfo}>
              <div style={styles.trendName}>{item.name}</div>
              <div style={styles.trendBarBg}>
                <div style={styles.trendBarFill(item.percent)} />
              </div>
            </div>
            <div style={styles.trendPercent}>{item.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMenu;
