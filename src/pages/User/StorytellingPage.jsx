import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stories = [
  { id: 1, category: 'Tình yêu', title: 'Khi trái tim lên tiếng', excerpt: 'Một câu chuyện tình bất ngờ từ ứng dụng hẹn hò, khi hai tâm hồn đồng điệu gặp nhau...', author: 'Mai Anh', date: '15/03/2026', hearts: 234 },
  { id: 2, category: 'Phiêu lưu', title: 'Chuyến đi Đà Lạt của đôi', excerpt: 'Chúng tôi gặp nhau trên GOMET và quyết định cùng khám phá thành phố sương mù...', author: 'Quang Huy', date: '12/03/2026', hearts: 189 },
  { id: 3, category: 'Ẩm thực', title: 'Bún bò và tình yêu', excerpt: 'Buổi hẹn đầu tiên tại quán bún bò góc phố nhỏ, nơi bắt đầu của một chuyện tình đẹp...', author: 'Thủy Linh', date: '10/03/2026', hearts: 156 },
  { id: 4, category: 'Kỷ niệm', title: 'Một năm bên nhau', excerpt: 'Nhìn lại hành trình một năm từ lần match đầu tiên đến những kỷ niệm không quên...', author: 'Đức Minh', date: '08/03/2026', hearts: 312 },
];

const trendingTags = ['#CaPheHenHo', '#LanDauGap', '#AmThucTinhYeu', '#PhieuLuuCungBan', '#GOMETLove', '#HenHoSaigon'];

const categoryColors = {
  'Tình yêu': { bg: 'rgba(255, 87, 26, 0.15)', color: '#FFB59E' },
  'Phiêu lưu': { bg: 'rgba(255, 213, 79, 0.15)', color: '#FFD54F' },
  'Ẩm thực': { bg: 'rgba(17, 117, 0, 0.15)', color: '#117500' },
  'Kỷ niệm': { bg: '#353535', color: '#FDF9F3' },
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
      backgroundColor: '#131313',
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
    featuredCard: {
      borderRadius: '1.5rem',
      overflow: 'hidden',
      marginBottom: 28,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      backgroundColor: '#1C1B1B',
    },
    featuredImage: {
      width: '100%',
      height: 350,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      display: 'flex',
      alignItems: 'flex-end',
      position: 'relative',
    },
    featuredBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      background: '#FF571A',
      color: '#3A0B00',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1,
      padding: '5px 12px',
      borderRadius: 9999,
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
      color: '#FDF9F3',
      marginBottom: 8,
    },
    featuredMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'rgba(253,249,243,0.85)',
      fontSize: 13,
    },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'rgba(255, 87, 26, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarIcon: {
      fontSize: 16,
      color: '#FFB59E',
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
      color: '#FDF9F3',
      marginBottom: 14,
    },
    storyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 14,
      marginBottom: 28,
    },
    storyCard: {
      borderRadius: '1.5rem',
      overflow: 'hidden',
      backgroundColor: '#1C1B1B',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    storyImage: {
      width: '100%',
      height: 200,
      background: '#2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyImageIcon: {
      fontSize: 36,
      color: '#353535',
    },
    storyBody: {
      padding: '10px 12px 12px',
    },
    categoryChip: (cat) => ({
      display: 'inline-block',
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 8px',
      borderRadius: 9999,
      backgroundColor: (categoryColors[cat] || categoryColors['Kỷ niệm']).bg,
      color: (categoryColors[cat] || categoryColors['Kỷ niệm']).color,
      marginBottom: 6,
    }),
    storyTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    storyExcerpt: {
      fontSize: 12,
      color: '#E6BEB2',
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
      color: '#E6BEB2',
    },
    heartBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 11,
      color: '#E6BEB2',
    },
    heartIcon: (liked) => ({
      fontSize: 16,
      color: liked ? '#FFB59E' : '#E6BEB2',
    }),
    ctaSection: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: '28px 20px',
      textAlign: 'center',
      marginBottom: 28,
    },
    ctaIcon: {
      fontSize: 44,
      color: '#FFB59E',
      marginBottom: 10,
    },
    ctaTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    ctaDesc: {
      fontSize: 13,
      color: '#E6BEB2',
      marginBottom: 16,
    },
    ctaBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: 9999,
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
      borderRadius: 9999,
      backgroundColor: 'rgba(255, 87, 26, 0.15)',
      color: '#FFB59E',
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>auto_stories</span>
        <h1 style={s.heading}>Tạp chí cảm hứng</h1>
        <p style={s.subtitle}>Những câu chuyện tình yêu từ cộng đồng GOMET</p>
      </div>

      {/* Featured story */}
      <div style={s.featuredCard}>
        <div style={s.featuredImage}>
          <div style={s.featuredBadge}>CÂU CHUYỆN NỔI BẬT</div>
          <div style={s.featuredOverlay}>
            <div style={s.featuredTitle}>Từ một buổi cà phê đến hạnh phúc</div>
            <div style={s.featuredMeta}>
              <div style={s.avatar}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.avatarIcon}>person</span>
              </div>
              <span>Hoang Yen</span>
              <div style={s.readTime}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>
                5 phút đọc
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story grid */}
      <h2 style={s.sectionTitle}>Câu chuyện mới nhất</h2>
      <div style={s.storyGrid}>
        {stories.map(st => (
          <div key={st.id} style={s.storyCard}>
            <div style={s.storyImage}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.storyImageIcon}>image</span>
            </div>
            <div style={s.storyBody}>
              <span style={s.categoryChip(st.category)}>{st.category}</span>
              <div style={s.storyTitle}>{st.title}</div>
              <div style={s.storyExcerpt}>{st.excerpt}</div>
              <div style={s.storyFooter}>
                <span>{st.author} · {st.date}</span>
                <button style={s.heartBtn} onClick={() => toggleHeart(st.id)}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={s.heartIcon(!!likedStories[st.id])}>
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
        <span aria-hidden="true" className="material-symbols-outlined" style={s.ctaIcon}>edit_note</span>
        <div style={s.ctaTitle}>Viết câu chuyện của bạn</div>
        <p style={s.ctaDesc}>Chia sẻ trải nghiệm hẹn hò của bạn với cộng đồng</p>
        <button style={s.ctaBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>draw</span>
          Bắt đầu viết
        </button>
      </div>

      {/* Trending tags */}
      <h2 style={s.sectionTitle}>Chủ đề thịnh hành</h2>
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
