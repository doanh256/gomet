import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrendingPage = () => {
  const navigate = useNavigate();
  const [likedFoods, setLikedFoods] = useState({});
  const trendingItems = [
    { rank: 1, title: 'Cafe rooftop Quan 1', engagement: 2340, trend: 'up', category: 'Dia diem' },
    { rank: 2, title: 'Su kien Single Night thu 7', engagement: 1890, trend: 'up', category: 'Su kien' },
    { rank: 3, title: 'Lau Thai mua mua', engagement: 1520, trend: 'flat', category: 'Mon an' },
    { rank: 4, title: 'Minh Anh - Foodie blogger', engagement: 1200, trend: 'up', category: 'Nguoi noi bat' },
    { rank: 5, title: 'Picnic Thao Cam Vien', engagement: 980, trend: 'down', category: 'Dia diem' },
  ];
  const venues = [{ name: 'The Workshop', visits: 456, emoji: '☕' }, { name: 'Pizza 4Ps', visits: 389, emoji: '🍕' }, { name: 'Runam Bistro', visits: 312, emoji: '🍷' }, { name: 'L\'Usine', visits: 278, emoji: '🥐' }];
  const foods = [{ name: 'Pho bo tai', orders: 1230, emoji: '🍜' }, { name: 'Banh mi thit', orders: 980, emoji: '🥖' }, { name: 'Bun cha Ha Noi', orders: 870, emoji: '🍲' }];
  const articles = [{ title: '10 dia diem hen ho lang man nhat Sai Gon', author: 'GOMET Editorial', readTime: '5 phut', likes: 342 }, { title: 'Bi quyet tao an tuong tot lan dau gap mat', author: 'Tran Minh', readTime: '3 phut', likes: 256 }];
  const hashtags = ['#HenHoSaiGon', '#CafeDate', '#FoodieDate', '#SingleLife', '#DineDateVN', '#WeekendDate', '#RooftopVibes', '#DateIdeas'];
  const trendIcon = (trend) => { if (trend === 'up') return { icon: 'trending_up', color: '#117500' }; if (trend === 'down') return { icon: 'trending_down', color: '#FF571A' }; return { icon: 'trending_flat', color: '#E6BEB2' }; };
  const categoryColor = { 'Dia diem': { bg: '#FFB59E30', color: '#FFB59E' }, 'Su kien': { bg: '#FFD54F30', color: '#FFD54F' }, 'Mon an': { bg: '#FF571A30', color: '#FF571A' }, 'Nguoi noi bat': { bg: '#11750030', color: '#117500' } };
  const toggleLike = (idx) => { setLikedFoods(prev => ({ ...prev, [idx]: !prev[idx] })); };

  const s = {
    page: { flex: 1, backgroundColor: '#131313', overflowY: 'auto', padding: '40px 32px 80px' },
    header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#FDF9F3', display: 'flex', alignItems: 'center' },
    pageTitle: { fontFamily: 'var(--font-headline)', fontSize: '28px', fontWeight: 800, color: '#FDF9F3' },
    trendIcon: { color: '#FFB59E', fontSize: '28px' },
    subtitle: { fontSize: '14px', color: '#E6BEB2', marginBottom: '32px', paddingLeft: '44px' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, color: '#FDF9F3', marginBottom: '16px' },
    trendingList: { marginBottom: '36px' },
    trendingItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', backgroundColor: '#1C1B1B', borderRadius: '1.5rem', marginBottom: '10px' },
    rank: { fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 800, color: '#FFB59E', width: '32px', textAlign: 'center' },
    trendingInfo: { flex: 1 },
    trendingTitle: { fontSize: '15px', fontWeight: 700, color: '#FDF9F3', fontFamily: 'var(--font-headline)' },
    engagementRow: { display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' },
    engagementText: { fontSize: '12px', color: '#E6BEB2' },
    categoryChip: (cat) => ({ padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 600, backgroundColor: categoryColor[cat]?.bg || '#2A2A2A', color: categoryColor[cat]?.color || '#E6BEB2' }),
    trendIndicator: (trend) => ({ color: trendIcon(trend).color, fontSize: '24px' }),
    venueScroll: { display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '36px' },
    venueCard: { minWidth: '160px', backgroundColor: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden', flexShrink: 0 },
    venueImage: { width: '100%', height: '100px', backgroundColor: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' },
    venueBody: { padding: '12px' },
    venueName: { fontSize: '14px', fontWeight: 700, color: '#FDF9F3', fontFamily: 'var(--font-headline)', marginBottom: '4px' },
    visitBadge: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#FF571A30', fontSize: '11px', fontWeight: 600, color: '#FFB59E' },
    foodRow: { display: 'flex', gap: '12px', marginBottom: '36px' },
    foodCard: { flex: 1, backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: '16px', textAlign: 'center' },
    foodEmoji: { fontSize: '40px', marginBottom: '8px' },
    foodName: { fontSize: '13px', fontWeight: 700, color: '#FDF9F3', fontFamily: 'var(--font-headline)', marginBottom: '4px' },
    foodOrders: { fontSize: '12px', color: '#E6BEB2', marginBottom: '8px' },
    heartBtn: (liked) => ({ background: 'none', border: 'none', cursor: 'pointer', color: liked ? '#FFB59E' : '#E6BEB2', fontSize: '24px', transition: 'color 0.2s' }),
    articleCard: { display: 'flex', gap: '14px', padding: '16px', backgroundColor: '#1C1B1B', borderRadius: '1.5rem', marginBottom: '12px' },
    articleImage: { width: '80px', height: '80px', borderRadius: '1.5rem', backgroundColor: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    articleImageIcon: { fontSize: '28px', color: '#E6BEB2', opacity: 0.4 },
    articleInfo: { flex: 1 },
    articleTitle: { fontSize: '14px', fontWeight: 700, color: '#FDF9F3', fontFamily: 'var(--font-headline)', marginBottom: '6px', lineHeight: '1.4' },
    articleAuthor: { fontSize: '12px', color: '#E6BEB2', marginBottom: '4px' },
    articleMeta: { display: 'flex', alignItems: 'center', gap: '12px' },
    articleMetaItem: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#E6BEB2' },
    hashtagScroll: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' },
    hashtagChip: { padding: '8px 16px', borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' },
  };

  return (
    <div style={s.page}>
      <div style={s.header}><button style={s.backBtn} onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button><h1 style={s.pageTitle}>Xu huong</h1><span className="material-symbols-outlined" style={s.trendIcon}>trending_up</span></div>
      <p style={s.subtitle}>Dang hot trong cong dong GOMET</p>
      <h2 style={s.sectionTitle}>Trending hom nay</h2>
      <div style={s.trendingList}>{trendingItems.map(item => { const ti = trendIcon(item.trend); return (<div key={item.rank} style={s.trendingItem}><span style={s.rank}>#{item.rank}</span><span className="material-symbols-outlined" style={s.trendIndicator(item.trend)}>{ti.icon}</span><div style={s.trendingInfo}><div style={s.trendingTitle}>{item.title}</div><div style={s.engagementRow}><span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#FF571A' }}>local_fire_department</span><span style={s.engagementText}>{item.engagement.toLocaleString()}</span></div></div><span style={s.categoryChip(item.category)}>{item.category}</span></div>); })}</div>
      <h2 style={s.sectionTitle}>Dia diem thinh hanh</h2>
      <div style={s.venueScroll}>{venues.map((v, i) => (<div key={i} style={s.venueCard}><div style={s.venueImage}>{v.emoji}</div><div style={s.venueBody}><div style={s.venueName}>{v.name}</div><span style={s.visitBadge}><span className="material-symbols-outlined" style={{ fontSize: '12px' }}>visibility</span>{v.visits} luot</span></div></div>))}</div>
      <h2 style={s.sectionTitle}>Mon an duoc yeu thich</h2>
      <div style={s.foodRow}>{foods.map((f, i) => (<div key={i} style={s.foodCard}><div style={s.foodEmoji}>{f.emoji}</div><div style={s.foodName}>{f.name}</div><div style={s.foodOrders}>{f.orders.toLocaleString()} luot dat</div><button style={s.heartBtn(likedFoods[i])} onClick={() => toggleLike(i)}><span className={`material-symbols-outlined ${likedFoods[i] ? 'filled' : ''}`}>favorite</span></button></div>))}</div>
      <h2 style={s.sectionTitle}>Bai viet noi bat</h2>
      {articles.map((a, i) => (<div key={i} style={s.articleCard}><div style={s.articleImage}><span className="material-symbols-outlined" style={s.articleImageIcon}>article</span></div><div style={s.articleInfo}><div style={s.articleTitle}>{a.title}</div><div style={s.articleAuthor}>{a.author}</div><div style={s.articleMeta}><span style={s.articleMetaItem}><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>{a.readTime}</span><span style={s.articleMetaItem}><span className="material-symbols-outlined filled" style={{ fontSize: '14px', color: '#FFB59E' }}>favorite</span>{a.likes}</span></div></div></div>))}
      <h2 style={{ ...s.sectionTitle, marginTop: '24px' }}>Hashtag thinh hanh</h2>
      <div style={s.hashtagScroll}>{hashtags.map((tag, i) => (<button key={i} style={s.hashtagChip}>{tag}</button>))}</div>
    </div>
  );
};

export default TrendingPage;
