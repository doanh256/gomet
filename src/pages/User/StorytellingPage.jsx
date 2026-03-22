import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stories = [
  { id: 1, category: 'Tinh yeu', title: 'Khi trai tim len tieng', excerpt: 'Mot cau chuyen tinh bat ngo tu ung dung hen ho, khi hai tam hon dong dieu gap nhau...', author: 'Mai Anh', date: '15/03/2026', hearts: 234 },
  { id: 2, category: 'Phieu luu', title: 'Chuyen di Da Lat cua doi', excerpt: 'Chung toi gap nhau tren GOMET va quyet dinh cung kham pha thanh pho suong mu...', author: 'Quang Huy', date: '12/03/2026', hearts: 189 },
  { id: 3, category: 'Am thuc', title: 'Bun bo va tinh yeu', excerpt: 'Buoi hen dau tien tai quan bun bo goc pho nho, noi bat dau cua mot chuyen tinh dep...', author: 'Thuy Linh', date: '10/03/2026', hearts: 156 },
  { id: 4, category: 'Ky niem', title: 'Mot nam ben nhau', excerpt: 'Nhin lai hanh trinh mot nam tu lan match dau tien den nhung ky niem khong quen...', author: 'Duc Minh', date: '08/03/2026', hearts: 312 },
];

const trendingTags = ['#CaPheHenHo', '#LanDauGap', '#AmThucTinhYeu', '#PhieuLuuCungBan', '#GOMETLove', '#HenHoSaigon'];

const categoryColors = {
  'Tinh yeu': { bg: 'var(--primary-fixed)', color: 'var(--on-primary-container)' },
  'Phieu luu': { bg: 'var(--tertiary-container)', color: '#fff' },
  'Am thuc': { bg: 'var(--error-container)', color: 'var(--error)' },
  'Ky niem': { bg: 'var(--surface-container-high)', color: 'var(--on-surface)' },
};

const StorytellingPage = () => {
  const navigate = useNavigate();
  const [likedStories, setLikedStories] = useState({});

  const toggleHeart = (id) => {
    setLikedStories(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
      marginBottom: 28,
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
    featuredCard: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 28,
      boxShadow: 'var(--editorial-shadow)',
      backgroundColor: 'var(--surface-container-lowest)',
    },
    featuredImage: {
      width: '100%',
      height: 350,
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%)',
      display: 'flex',
      alignItems: 'flex-end',
      position: 'relative',
    },
    featuredBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1,
      padding: '5px 12px',
      borderRadius: 'var(--radius-full)',
    },
    featuredOverlay: {
      width: '100%',
      padding: '60px 20px 20px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
    },
    featuredTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: '#fff',
      marginBottom: 8,
    },
    featuredMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'rgba(255,255,255,0.85)',
      fontSize: 13,
    },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--primary-fixed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarIcon: {
      fontSize: 16,
      color: 'var(--on-primary-container)',
    },
    readTime: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 14,
    },
    storyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 14,
      marginBottom: 28,
    },
    storyCard: {
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
    },
    storyImage: {
      width: '100%',
      height: 200,
      background: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyImageIcon: {
      fontSize: 36,
      color: 'var(--outline-variant)',
    },
    storyBody: {
      padding: '10px 12px 12px',
    },
    categoryChip: (cat) => ({
      display: 'inline-block',
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 8px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: (categoryColors[cat] || categoryColors['Ky niem']).bg,
      color: (categoryColors[cat] || categoryColors['Ky niem']).color,
      marginBottom: 6,
    }),
    storyTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    storyExcerpt: {
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      lineHeight: 1.4,
      marginBottom: 8,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    storyFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
    },
    heartBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
    },
    heartIcon: (liked) => ({
      fontSize: 16,
      color: liked ? 'var(--primary)' : 'var(--on-surface-variant)',
    }),
    ctaSection: {
      background: 'var(--surface-container-low)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 20px',
      textAlign: 'center',
      marginBottom: 28,
      border: '1px solid var(--outline-variant)',
    },
    ctaIcon: {
      fontSize: 44,
      color: 'var(--primary)',
      marginBottom: 10,
    },
    ctaTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    ctaDesc: {
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 16,
    },
    ctaBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      cursor: 'pointer',
    },
    tagsSection: {
      marginBottom: 12,
    },
    tagsScroll: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 4,
    },
    tag: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--primary-fixed)',
      color: 'var(--on-primary-container)',
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>auto_stories</span>
        <h1 style={s.heading}>Tap chi cam hung</h1>
        <p style={s.subtitle}>Nhung cau chuyen tinh yeu tu cong dong GOMET</p>
      </div>

      {/* Featured story */}
      <div style={s.featuredCard}>
        <div style={s.featuredImage}>
          <div style={s.featuredBadge}>CAU CHUYEN NOI BAT</div>
          <div style={s.featuredOverlay}>
            <div style={s.featuredTitle}>Tu mot buoi ca phe den hanh phuc</div>
            <div style={s.featuredMeta}>
              <div style={s.avatar}>
                <span className="material-symbols-outlined" style={s.avatarIcon}>person</span>
              </div>
              <span>Hoang Yen</span>
              <div style={s.readTime}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>
                5 phut doc
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story grid */}
      <h2 style={s.sectionTitle}>Cau chuyen moi nhat</h2>
      <div style={s.storyGrid}>
        {stories.map(st => (
          <div key={st.id} style={s.storyCard}>
            <div style={s.storyImage}>
              <span className="material-symbols-outlined" style={s.storyImageIcon}>image</span>
            </div>
            <div style={s.storyBody}>
              <span style={s.categoryChip(st.category)}>{st.category}</span>
              <div style={s.storyTitle}>{st.title}</div>
              <div style={s.storyExcerpt}>{st.excerpt}</div>
              <div style={s.storyFooter}>
                <span>{st.author} · {st.date}</span>
                <button style={s.heartBtn} onClick={() => toggleHeart(st.id)}>
                  <span className="material-symbols-outlined" style={s.heartIcon(!!likedStories[st.id])}>
                    {likedStories[st.id] ? 'favorite' : 'favorite_border'}
                  </span>
                  {st.hearts + (likedStories[st.id] ? 1 : 0)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={s.ctaSection}>
        <span className="material-symbols-outlined" style={s.ctaIcon}>edit_note</span>
        <div style={s.ctaTitle}>Viet cau chuyen cua ban</div>
        <p style={s.ctaDesc}>Chia se trai nghiem hen ho cua ban voi cong dong</p>
        <button style={s.ctaBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>draw</span>
          Bat dau viet
        </button>
      </div>

      {/* Trending tags */}
      <h2 style={s.sectionTitle}>Chu de thinh hanh</h2>
      <div style={s.tagsSection}>
        <div style={s.tagsScroll}>
          {trendingTags.map((tag, i) => (
            <span key={i} style={s.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorytellingPage;
