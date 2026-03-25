import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AcademyPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const categories = ['Tất cả', 'Giao tiếp', 'Phong cách', 'Ẩm thực', 'Tâm lý'];
  const courses = [
    { id: 1, title: 'Ngôn ngữ cơ thể', instructor: 'Tran Minh', duration: '20 phút', lessons: 6, difficulty: 'Cơ bản', progress: 60, rating: 4.8, category: 'Giao tiếp' },
    { id: 2, title: 'Chọn trang phục hẹn hò', instructor: 'Le Hoa', duration: '15 phút', lessons: 5, difficulty: 'Cơ bản', progress: 100, rating: 4.9, category: 'Phong cách' },
    { id: 3, title: 'Ăn uống thanh lịch', instructor: 'Pham Duc', duration: '25 phút', lessons: 8, difficulty: 'Nâng cao', progress: 0, rating: 4.7, category: 'Ẩm thực' },
    { id: 4, title: 'Đọc vị cảm xúc', instructor: 'Nguyen Lan', duration: '18 phút', lessons: 7, difficulty: 'Nâng cao', progress: 30, rating: 4.6, category: 'Tâm lý' },
    { id: 5, title: 'Phá băng khi gặp mặt', instructor: 'Vo Thanh', duration: '12 phút', lessons: 4, difficulty: 'Cơ bản', progress: 0, rating: 4.5, category: 'Giao tiếp' },
    { id: 6, title: 'Chọn nhà hàng phù hợp', instructor: 'Hoang Yen', duration: '15 phút', lessons: 5, difficulty: 'Cơ bản', progress: 0, rating: 4.8, category: 'Ẩm thực' },
  ];
  const achievements = [{ emoji: '🎓', label: 'Học viên xuất sắc' }, { emoji: '📚', label: 'Độc giả chăm chỉ' }, { emoji: '💡', label: 'Người sáng tạo' }];
  const filtered = activeCategory === 'Tất cả' ? courses : courses.filter(c => c.category === activeCategory);

  const s = {
    page: { flex: 1, backgroundColor: '#131313', overflowY: 'auto', padding: '40px 32px 80px' },
    header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#FDF9F3', display: 'flex', alignItems: 'center' },
    pageTitle: { fontFamily: 'var(--font-headline)', fontSize: '28px', fontWeight: 800, color: '#FDF9F3' },
    schoolIcon: { color: '#FFB59E', fontSize: '28px' },
    subtitle: { fontSize: '14px', color: '#E6BEB2', marginBottom: '32px', paddingLeft: '44px' },
    featuredCard: { borderRadius: '1.5rem', overflow: 'hidden', backgroundColor: '#1C1B1B', marginBottom: '32px' },
    featuredImage: { width: '100%', height: '300px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    featuredImageText: { color: '#3A0B00', fontSize: '48px', opacity: 0.3 },
    featuredBody: { padding: '20px' },
    featuredTitle: { fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 700, color: '#FDF9F3', marginBottom: '12px' },
    featuredInstructor: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' },
    instructorAvatar: { width: '32px', height: '32px', borderRadius: '9999px', backgroundColor: '#FF571A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A0B00', fontSize: '14px', fontWeight: 700 },
    instructorName: { fontSize: '14px', color: '#E6BEB2', fontWeight: 500 },
    featuredMeta: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' },
    metaItem: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#E6BEB2' },
    progressBarWrap: { width: '100%', height: '6px', backgroundColor: '#353535', borderRadius: '9999px', marginBottom: '16px' },
    progressBarFill: (pct) => ({ width: `${pct}%`, height: '100%', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', borderRadius: '9999px', transition: 'width 0.5s ease' }),
    startBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '1.5rem', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-headline)', cursor: 'pointer' },
    chipsRow: { display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' },
    chip: (active) => ({ padding: '8px 18px', borderRadius: '9999px', backgroundColor: active ? '#FFB59E' : '#2A2A2A', color: active ? '#3A0B00' : '#E6BEB2', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s' }),
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, color: '#FDF9F3', marginBottom: '16px' },
    courseGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '36px' },
    courseCard: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden' },
    courseImage: { width: '100%', height: '120px', background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    courseImageIcon: { fontSize: '36px', color: '#E6BEB2', opacity: 0.4 },
    courseBody: { padding: '12px' },
    courseTitle: { fontFamily: 'var(--font-headline)', fontSize: '14px', fontWeight: 700, color: '#FDF9F3', marginBottom: '4px' },
    courseInstructor: { fontSize: '12px', color: '#E6BEB2', marginBottom: '8px' },
    courseMeta: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' },
    courseMetaChip: { fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#2A2A2A', color: '#E6BEB2' },
    difficultyChip: (adv) => ({ fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: adv ? '#FF571A30' : '#FFB59E30', color: adv ? '#FF571A' : '#FFB59E', fontWeight: 600 }),
    courseProgress: { width: '100%', height: '4px', backgroundColor: '#353535', borderRadius: '9999px', marginBottom: '6px' },
    completionBadge: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#117500', fontWeight: 600 },
    ratingRow: { display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' },
    ratingStar: { fontSize: '14px', color: '#FFD54F' },
    ratingText: { fontSize: '12px', color: '#E6BEB2', marginLeft: '4px' },
    achievementsRow: { display: 'flex', gap: '16px', justifyContent: 'center' },
    achievementBadge: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
    achievementCircle: { width: '72px', height: '72px', borderRadius: '9999px', backgroundColor: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' },
    achievementLabel: { fontSize: '12px', color: '#E6BEB2', fontWeight: 500, textAlign: 'center' },
  };

  return (
    <div style={s.page}>
      <div style={s.header}><button style={s.backBtn} onClick={() => navigate(-1)}><span aria-hidden="true" className="material-symbols-outlined">arrow_back</span></button><h1 style={s.pageTitle}>Học viện GOMET</h1><span className="material-symbols-outlined filled" style={s.schoolIcon}>school</span></div>
      <p style={s.subtitle}>Nâng cao kỹ năng hẹn hò</p>
      <div style={s.featuredCard}><div style={s.featuredImage}><span aria-hidden="true" className="material-symbols-outlined" style={s.featuredImageText}>auto_stories</span></div><div style={s.featuredBody}><div style={s.featuredTitle}>Nghệ thuật trò chuyện</div><div style={s.featuredInstructor}><div style={s.instructorAvatar}>TM</div><span style={s.instructorName}>Tran Minh</span></div><div style={s.featuredMeta}><span style={s.metaItem}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>menu_book</span>8 bài học</span><span style={s.metaItem}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>30 phút</span></div><div style={s.progressBarWrap}><div style={s.progressBarFill(40)} /></div><button style={s.startBtn}>Bắt đầu</button></div></div>
      <h2 style={s.sectionTitle}>Danh mục</h2>
      <div style={s.chipsRow}>{categories.map(cat => (<button key={cat} style={s.chip(activeCategory === cat)} onClick={() => setActiveCategory(cat)}>{cat}</button>))}</div>
      <div style={s.courseGrid}>{filtered.map(course => (<div key={course.id} style={s.courseCard}><div style={s.courseImage}><span aria-hidden="true" className="material-symbols-outlined" style={s.courseImageIcon}>play_circle</span></div><div style={s.courseBody}><div style={s.courseTitle}>{course.title}</div><div style={s.courseInstructor}>{course.instructor}</div><div style={s.courseMeta}><span style={s.courseMetaChip}>{course.duration}</span><span style={s.courseMetaChip}>{course.lessons} bài</span><span style={s.difficultyChip(course.difficulty === 'Nâng cao')}>{course.difficulty}</span></div>{course.progress > 0 && course.progress < 100 && (<div style={s.courseProgress}><div style={s.progressBarFill(course.progress)} /></div>)}{course.progress === 100 && (<div style={s.completionBadge}><span className="material-symbols-outlined filled" style={{ fontSize: '14px', color: '#117500' }}>check_circle</span>Hoàn thành</div>)}<div style={s.ratingRow}><span className="material-symbols-outlined filled" style={s.ratingStar}>star</span><span style={s.ratingText}>{course.rating}</span></div></div></div>))}</div>
      <h2 style={s.sectionTitle}>Thành tựu</h2>
      <div style={s.achievementsRow}>{achievements.map((a, i) => (<div key={i} style={s.achievementBadge}><div style={s.achievementCircle}>{a.emoji}</div><span style={s.achievementLabel}>{a.label}</span></div>))}</div>
    </div>
  );
};

export default AcademyPage;
