import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryOptions = ['Khong hai long', 'Khong dung mo ta', 'Tinh phi sai', 'Khac'];
const recentTransactions = [
  { id: 'TX-2024-001', label: 'Bua toi tai Pasta House - 350.000d' },
  { id: 'TX-2024-002', label: 'Coffee date tai The Coffee - 120.000d' },
  { id: 'TX-2024-003', label: 'Lau Thai nhom - 580.000d' },
];
const existingDisputes = [
  { id: 'KN-001', date: '15/03/2026', transaction: 'Bua toi tai Pasta House', status: 'processing', statusLabel: 'Dang xu ly', step: 1, resolution: null },
  { id: 'KN-002', date: '10/03/2026', transaction: 'Coffee date tai The Coffee', status: 'resolved', statusLabel: 'Da giai quyet', step: 2, resolution: 'Hoan 50% gia tri don hang. Tien da duoc chuyen ve vi GOMET.' },
  { id: 'KN-003', date: '05/03/2026', transaction: 'Dat cho nha hang ABC', status: 'rejected', statusLabel: 'Tu choi', step: 2, resolution: 'Khieu nai khong du bang chung. Vui long lien he hotline de biet them.' },
];
const timelineSteps = ['Tiep nhan', 'Dang xem xet', 'Giai quyet'];

const DisputeResolutionPage = () => {
  const navigate = useNavigate();
  const [selectedTx, setSelectedTx] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);
  const [description, setDescription] = useState('');

  const s = {
    page: { flex: 1, backgroundColor: '#131313', overflowY: 'auto', padding: '40px 24px 80px', maxWidth: 600, margin: '0 auto' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#FFB59E', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 20 },
    header: { textAlign: 'center', marginBottom: 28 },
    headerIcon: { fontSize: 48, color: '#FFB59E', marginBottom: 8 },
    heading: { fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800, color: '#FDF9F3', marginBottom: 6 },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 700, color: '#FDF9F3', marginBottom: 16 },
    formCard: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 20, marginBottom: 28 },
    label: { fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#E6BEB2', marginBottom: 8, display: 'block' },
    select: { width: '100%', padding: '12px 14px', borderRadius: '1.5rem', border: 'none', backgroundColor: '#2A2A2A', color: '#FDF9F3', fontFamily: 'var(--font-body)', fontSize: 14, marginBottom: 18, outline: 'none' },
    chipRow: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
    chip: (active) => ({ padding: '8px 16px', borderRadius: '9999px', border: 'none', backgroundColor: active ? '#FF571A' : '#2A2A2A', color: active ? '#3A0B00' : '#E6BEB2', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }),
    textarea: { width: '100%', height: 120, padding: '12px 14px', borderRadius: '1.5rem', border: 'none', backgroundColor: '#2A2A2A', color: '#FDF9F3', fontFamily: 'var(--font-body)', fontSize: 14, resize: 'vertical', outline: 'none', marginBottom: 4 },
    charCount: { textAlign: 'right', fontFamily: 'var(--font-body)', fontSize: 12, color: '#E6BEB2', marginBottom: 18 },
    uploadArea: { border: '2px dashed #353535', borderRadius: '1.5rem', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 18 },
    uploadIcon: { fontSize: 36, color: '#E6BEB2' },
    uploadText: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#E6BEB2' },
    submitBtn: { width: '100%', padding: '14px 0', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700, cursor: 'pointer' },
    disputeCard: { backgroundColor: '#1C1B1B', borderRadius: '1.5rem', padding: 18, marginBottom: 14 },
    disputeTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    disputeId: { fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, color: '#FDF9F3' },
    disputeDate: { fontFamily: 'var(--font-body)', fontSize: 12, color: '#E6BEB2' },
    disputeTx: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#E6BEB2', marginBottom: 14 },
    timeline: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative' },
    timelineStep: (active, completed) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 1 }),
    dot: (active, completed) => ({ width: 14, height: 14, borderRadius: '50%', backgroundColor: completed ? '#FFB59E' : active ? '#FF571A' : '#353535', border: 'none' }),
    stepLabel: (active) => ({ fontFamily: 'var(--font-body)', fontSize: 11, color: active ? '#FFB59E' : '#E6BEB2', fontWeight: active ? 600 : 400 }),
    timelineLine: { position: 'absolute', top: 7, left: '15%', right: '15%', height: 2, backgroundColor: '#353535' },
    badge: (status) => {
      const colors = { processing: { bg: '#FF571A', color: '#3A0B00' }, resolved: { bg: '#117500', color: '#FDF9F3' }, rejected: { bg: '#2A2A2A', color: '#FFB59E' } };
      const c = colors[status] || colors.processing;
      return { display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: c.bg, color: c.color, fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, marginBottom: 10 };
    },
    resolution: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#E6BEB2', padding: '10px 12px', backgroundColor: '#2A2A2A', borderRadius: 8, marginBottom: 10 },
    detailLink: { background: 'none', border: 'none', color: '#FFB59E', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 },
    infoCard: { backgroundColor: '#2A2A2A', borderRadius: '1.5rem', padding: 18, display: 'flex', gap: 12, alignItems: 'flex-start' },
    infoIcon: { fontSize: 22, color: '#FFB59E', flexShrink: 0, marginTop: 2 },
    infoText: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#E6BEB2', lineHeight: 1.6 },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate(-1)}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>Quay lai</button>
      <div style={s.header}><span className="material-symbols-outlined" style={s.headerIcon}>gavel</span><h1 style={s.heading}>Giai quyet khieu nai</h1></div>
      <h2 style={s.sectionTitle}>Tao khieu nai moi</h2>
      <div style={s.formCard}>
        <label style={s.label}>Chon giao dich</label>
        <select style={s.select} value={selectedTx} onChange={(e) => setSelectedTx(e.target.value)}><option value="">-- Chon giao dich --</option>{recentTransactions.map((tx) => (<option key={tx.id} value={tx.id}>{tx.label}</option>))}</select>
        <label style={s.label}>Loai khieu nai</label>
        <div style={s.chipRow}>{categoryOptions.map((cat, i) => (<button key={i} style={s.chip(selectedCat === i)} onClick={() => setSelectedCat(i)}>{cat}</button>))}</div>
        <label style={s.label}>Mo ta chi tiet</label>
        <textarea style={s.textarea} placeholder="Mo ta van de cua ban..." value={description} onChange={(e) => setDescription(e.target.value.slice(0, 1000))} />
        <div style={s.charCount}>{description.length}/1000</div>
        <label style={s.label}>Tai bang chung</label>
        <div style={s.uploadArea}><span className="material-symbols-outlined" style={s.uploadIcon}>add_photo_alternate</span><span style={s.uploadText}>Nhan de tai anh hoac video</span></div>
        <button style={s.submitBtn}>Gui khieu nai</button>
      </div>
      <h2 style={s.sectionTitle}>Khieu nai cua ban</h2>
      {existingDisputes.map((d) => (
        <div key={d.id} style={s.disputeCard}>
          <div style={s.disputeTop}><span style={s.disputeId}>#{d.id}</span><span style={s.disputeDate}>{d.date}</span></div>
          <div style={s.disputeTx}>{d.transaction}</div>
          <div style={s.timeline}><div style={s.timelineLine} />{timelineSteps.map((step, i) => { const completed = i < d.step; const active = i === d.step; return (<div key={i} style={s.timelineStep(active, completed)}><div style={s.dot(active, completed)} /><span style={s.stepLabel(active || completed)}>{step}</span></div>); })}</div>
          <span style={s.badge(d.status)}>{d.statusLabel}</span>
          {d.resolution && <div style={s.resolution}>{d.resolution}</div>}
          <button style={s.detailLink}>Xem chi tiet</button>
        </div>
      ))}
      <div style={{ marginTop: 14 }}>
        <h2 style={{ ...s.sectionTitle, marginBottom: 12 }}>Chinh sach hoan tien</h2>
        <div style={s.infoCard}><span className="material-symbols-outlined" style={s.infoIcon}>info</span><div style={s.infoText}>GOMET cam ket xu ly khieu nai trong vong 48 gio. Hoan tien se duoc chuyen ve vi GOMET trong 3-5 ngay lam viec sau khi duoc phe duyet. Vui long cung cap day du bang chung de duoc xu ly nhanh nhat.</div></div>
      </div>
    </div>
  );
};

export default DisputeResolutionPage;
