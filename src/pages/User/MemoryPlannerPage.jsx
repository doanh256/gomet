import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const upcomingDates = [
  { id: 1, label: 'Kỷ niệm 1 năm', daysLeft: 15, icon: 'celebration', color: '#FFB59E' },
  { id: 2, label: 'Sinh nhật đối phương', daysLeft: 32, icon: 'cake', color: '#FFD54F' },
];
const planIdeas = [
  { id: 1, title: 'Bữa tối bất ngờ', icon: 'dinner_dining', desc: 'Đặt bàn tại nhà hàng yêu thích của đối phương và tạo bất ngờ lãng mạn.', btn: 'Lên kế hoạch' },
  { id: 2, title: 'Album kỷ niệm', icon: 'photo_library', desc: 'Tổng hợp những khoảnh khắc đẹp nhất của hai bạn thành album ảnh.', btn: 'Tạo album' },
  { id: 3, title: 'Quà tặng đặc biệt', icon: 'redeem', desc: 'Chọn quà tặng ý nghĩa từ cửa hàng GOMET hoặc tự tạo quà riêng.', btn: 'Chọn quà' },
  { id: 4, title: 'Thư viết tay', icon: 'edit_note', desc: 'Viết những lời yêu thương chân thành gửi đến người đặc biệt của bạn.', btn: 'Viết thư' },
];
const pastMemories = [
  { id: 1, date: '14/02/2026', title: 'Valentine đầu tiên', note: 'Bữa tối tại La Maison. Một buổi tối tuyệt vời!' },
  { id: 2, date: '25/12/2025', title: 'Giáng sinh bên nhau', note: 'Đổi quà và uống cacao nóng tại công viên.' },
  { id: 3, date: '15/09/2025', title: 'Ngày hẹn đầu tiên', note: 'Gặp nhau tại quán cafe và nói chuyện suốt 4 tiếng.' },
];

const MemoryPlannerPage = () => {
  const navigate = useNavigate();
  const [expandedMemory, setExpandedMemory] = useState(null);

  const s = {
    page: { flex: 1, backgroundColor: '#131313', overflowY: 'auto', padding: '40px 24px 80px', maxWidth: 600, margin: '0 auto' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#FFB59E', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 20 },
    header: { textAlign: 'center', marginBottom: 28 },
    headerIcon: { fontSize: 48, color: '#FFB59E', marginBottom: 8 },
    heading: { fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800, color: '#FDF9F3', marginBottom: 6 },
    subtitle: { fontFamily: 'var(--font-body)', fontSize: 14, color: '#E6BEB2' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 700, color: '#FDF9F3', marginBottom: 16 },
    countdownRow: { display: 'flex', gap: 12, marginBottom: 28 },
    countdownCard: (color) => ({ flex: 1, backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 18, borderLeft: `4px solid ${color}` }),
    countdownIcon: (color) => ({ fontSize: 28, color: color, marginBottom: 8 }),
    countdownLabel: { fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, color: '#FDF9F3', marginBottom: 4 },
    countdownDays: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#E6BEB2' },
    countdownNumber: { fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800, color: '#FFB59E' },
    ideaGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 },
    ideaCard: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 18, display: 'flex', flexDirection: 'column', gap: 8 },
    ideaIcon: { fontSize: 32, color: '#FFB59E' },
    ideaTitle: { fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, color: '#FDF9F3' },
    ideaDesc: { fontFamily: 'var(--font-body)', fontSize: 12, color: '#E6BEB2', lineHeight: 1.5, flex: 1 },
    ideaBtn: { alignSelf: 'flex-start', padding: '8px 16px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
    timelineSection: { marginBottom: 28 },
    memoryItem: { display: 'flex', gap: 14, marginBottom: 20, position: 'relative' },
    memoryLine: { width: 2, backgroundColor: '#353535', position: 'absolute', left: 11, top: 28, bottom: -12 },
    memoryDot: { width: 24, height: 24, borderRadius: '50%', backgroundColor: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 },
    memoryDotInner: { width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFB59E' },
    memoryContent: { flex: 1 },
    memoryDate: { fontFamily: 'var(--font-body)', fontSize: 12, color: '#E6BEB2', marginBottom: 4 },
    memoryTitle: { fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, color: '#FDF9F3', marginBottom: 6 },
    memoryPhoto: { width: '100%', height: 120, backgroundColor: '#2A2A2A', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    memoryPhotoIcon: { fontSize: 32, color: '#353535' },
    memoryNote: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#E6BEB2', lineHeight: 1.5 },
    addBtn: { width: '100%', padding: '14px 0', borderRadius: '9999px', border: '2px dashed #353535', backgroundColor: 'transparent', color: '#FFB59E', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
    addIcon: { fontSize: 22, color: '#FFB59E' },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>Quay lại</button>
      <div style={s.header}><span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>cake</span><h1 style={s.heading}>Lên kế hoạch kỷ niệm</h1><p style={s.subtitle}>Tạo những khoảnh khắc đáng nhớ</p></div>
      <h2 style={s.sectionTitle}>Ngày đặc biệt sắp tới</h2>
      <div style={s.countdownRow}>{upcomingDates.map((d) => (<div key={d.id} style={s.countdownCard(d.color)}><span aria-hidden="true" className="material-symbols-outlined" style={s.countdownIcon(d.color)}>{d.icon}</span><div style={s.countdownLabel}>{d.label}</div><div style={s.countdownDays}><span style={s.countdownNumber}>{d.daysLeft}</span> ngày nữa</div></div>))}</div>
      <h2 style={s.sectionTitle}>Gợi ý kế hoạch</h2>
      <div style={s.ideaGrid}>{planIdeas.map((idea) => (<div key={idea.id} style={s.ideaCard}><span aria-hidden="true" className="material-symbols-outlined" style={s.ideaIcon}>{idea.icon}</span><div style={s.ideaTitle}>{idea.title}</div><div style={s.ideaDesc}>{idea.desc}</div><button style={s.ideaBtn}>{idea.btn}</button></div>))}</div>
      <h2 style={s.sectionTitle}>Lịch sử kỷ niệm</h2>
      <div style={s.timelineSection}>{pastMemories.map((mem, i) => (<div key={mem.id} style={s.memoryItem}>{i < pastMemories.length - 1 && <div style={s.memoryLine} />}<div style={s.memoryDot}><div style={s.memoryDotInner} /></div><div style={s.memoryContent}><div style={s.memoryDate}>{mem.date}</div><div style={s.memoryTitle}>{mem.title}</div><div style={s.memoryPhoto}><span aria-hidden="true" className="material-symbols-outlined" style={s.memoryPhotoIcon}>image</span></div><div style={s.memoryNote}>{mem.note}</div></div></div>))}</div>
      <button style={s.addBtn}><span aria-hidden="true" className="material-symbols-outlined" style={s.addIcon}>add_circle</span>Thêm ngày đặc biệt</button>
    </div>
  );
};

export default MemoryPlannerPage;
