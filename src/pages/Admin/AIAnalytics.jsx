import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AIAnalytics = () => {
  const navigate = useNavigate();
  const [appliedInsights, setAppliedInsights] = useState([]);

  const trends = [
    { label: 'Tang truong', value: '+23%', sub: 'thang nay', icon: 'trending_up', color: '#117500' },
    { label: 'Ty le giu chan', value: '78%', sub: 'nguoi dung quay lai', icon: 'loyalty', color: '#FFB59E' },
    { label: 'Thoi gian su dung TB', value: '45 phut', sub: 'moi ngay', icon: 'timer', color: '#FFD54F' },
  ];

  const sentiments = [
    { label: 'Tich cuc', pct: 72, color: '#117500' },
    { label: 'Trung lap', pct: 18, color: '#FFD54F' },
    { label: 'Tieu cuc', pct: 10, color: '#FF571A' },
  ];

  const churnUsers = [
    { name: 'Tran Minh Duc', risk: 89 },
    { name: 'Le Thi Hong', risk: 76 },
    { name: 'Nguyen Bao Ngoc', risk: 68 },
    { name: 'Pham Quoc Anh', risk: 55 },
    { name: 'Vo Thanh Hien', risk: 42 },
  ];

  const hotEvents = [
    'Lop nau an Italian - Du kien 120 nguoi tham gia',
    'Wine tasting cuoi tuan - Xu huong tang 45%',
    'Yoga & Coffee morning - Pho bien voi nu 25-30',
  ];

  const peakHours = [
    { hour: '7-9h', level: 30 }, { hour: '9-11h', level: 20 }, { hour: '11-13h', level: 45 }, { hour: '13-15h', level: 35 },
    { hour: '15-17h', level: 40 }, { hour: '17-19h', level: 70 }, { hour: '19-21h', level: 95 }, { hour: '21-23h', level: 80 },
  ];

  const insights = [
    { id: 1, text: 'Tang 20% match bang cach goi y nguoi dung co so thich tuong tu trong ban kinh 5km.' },
    { id: 2, text: 'Gui thong bao nhac nho vao luc 19h-20h de tang ty le tuong tac 35%.' },
    { id: 3, text: 'Tao su kien "Thu 5 vui ve" de giam ty le roi bo nhom 25-30 tuoi.' },
    { id: 4, text: 'Uu tien hien thi ho so co anh xac minh de tang do tin cay 28%.' },
  ];

  const handleApply = (id) => { setAppliedInsights((prev) => [...prev, id]); };

  const s = {
    page: { padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-body)', color: '#FDF9F3' },
    header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
    headerIcon: { fontSize: '32px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    title: { fontFamily: 'var(--font-headline)', fontSize: '28px', fontWeight: 700, color: '#FDF9F3' },
    section: { marginBottom: '32px' },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 600, color: '#FDF9F3', marginBottom: '16px' },
    trendGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
    trendCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' },
    trendIconWrap: (color) => ({ width: '48px', height: '48px', borderRadius: '1.5rem', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }),
    trendIcon: (color) => ({ fontSize: '24px', color }),
    trendValue: { fontFamily: 'var(--font-headline)', fontSize: '24px', fontWeight: 700, color: '#FDF9F3' },
    trendSub: { fontSize: '13px', color: '#E6BEB2', marginTop: '2px' },
    sentimentRow: { display: 'flex', flexDirection: 'column', gap: '12px', background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px' },
    sentimentItem: { display: 'flex', alignItems: 'center', gap: '12px' },
    sentimentLabel: { width: '80px', fontSize: '14px', fontWeight: 500, color: '#FDF9F3' },
    sentimentBarBg: { flex: 1, height: '24px', borderRadius: '9999px', background: '#2A2A2A', overflow: 'hidden' },
    sentimentBar: (pct, color) => ({ width: `${pct}%`, height: '100%', borderRadius: '9999px', background: color, transition: 'width 0.6s ease' }),
    sentimentPct: { width: '40px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: '#FDF9F3' },
    predGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' },
    predCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px' },
    predHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' },
    predIcon: { fontSize: '20px', color: '#FFB59E' },
    predTitle: { fontFamily: 'var(--font-headline)', fontSize: '15px', fontWeight: 600, color: '#FDF9F3' },
    churnRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' },
    churnName: { fontSize: '14px', color: '#FDF9F3' },
    churnRisk: (risk) => ({ fontSize: '13px', fontWeight: 600, color: risk >= 70 ? '#FF571A' : risk >= 50 ? '#FFD54F' : '#117500' }),
    eventItem: { fontSize: '14px', color: '#E6BEB2', padding: '6px 0' },
    heatRow: { display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px', paddingTop: '8px' },
    heatCol: (level) => ({ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }),
    heatBar: (level) => ({ width: '100%', height: `${level}%`, borderRadius: '4px 4px 0 0', background: level >= 80 ? '#FFB59E' : level >= 50 ? '#FF571A' : '#2A2A2A', minHeight: '4px' }),
    heatLabel: { fontSize: '10px', color: '#E6BEB2' },
    insightGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' },
    insightCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
    insightIcon: { fontSize: '24px', color: '#FFD54F' },
    insightText: { fontSize: '14px', color: '#E6BEB2', lineHeight: 1.5, flex: 1 },
    applyBtn: (applied) => ({ alignSelf: 'flex-start', padding: '8px 20px', borderRadius: '9999px', border: 'none', background: applied ? '#2A2A2A' : 'linear-gradient(135deg, #FFB59E, #FF571A)', color: applied ? '#E6BEB2' : '#3A0B00', fontSize: '13px', fontWeight: 600, cursor: applied ? 'default' : 'pointer', fontFamily: 'var(--font-body)' }),
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>auto_awesome</span>
        <h1 style={s.title}>Phan tich AI</h1>
      </div>
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Xu huong nguoi dung</h2>
        <div style={s.trendGrid}>
          {trends.map((t, i) => (<div key={i} style={s.trendCard}><div style={s.trendIconWrap(t.color)}><span aria-hidden="true" className="material-symbols-outlined" style={s.trendIcon(t.color)}>{t.icon}</span></div><div><div style={{ fontSize: '13px', color: '#E6BEB2' }}>{t.label}</div><div style={s.trendValue}>{t.value}</div><div style={s.trendSub}>{t.sub}</div></div></div>))}
        </div>
      </div>
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Phan tich cam xuc</h2>
        <div style={s.sentimentRow}>
          {sentiments.map((st, i) => (<div key={i} style={s.sentimentItem}><div style={s.sentimentLabel}>{st.label}</div><div style={s.sentimentBarBg}><div style={s.sentimentBar(st.pct, st.color)} /></div><div style={s.sentimentPct}>{st.pct}%</div></div>))}
        </div>
      </div>
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Du doan</h2>
        <div style={s.predGrid}>
          <div style={s.predCard}><div style={s.predHeader}><span aria-hidden="true" className="material-symbols-outlined" style={s.predIcon}>smart_toy</span><div style={s.predTitle}>Nguoi dung co nguy co roi bo</div></div>{churnUsers.map((u, i) => (<div key={i} style={s.churnRow}><span style={s.churnName}>{u.name}</span><span style={s.churnRisk(u.risk)}>{u.risk}% nguy co</span></div>))}</div>
          <div style={s.predCard}><div style={s.predHeader}><span aria-hidden="true" className="material-symbols-outlined" style={s.predIcon}>smart_toy</span><div style={s.predTitle}>Su kien hot tuan toi</div></div>{hotEvents.map((ev, i) => (<div key={i} style={s.eventItem}>{ev}</div>))}</div>
          <div style={s.predCard}><div style={s.predHeader}><span aria-hidden="true" className="material-symbols-outlined" style={s.predIcon}>smart_toy</span><div style={s.predTitle}>Gio cao diem du kien</div></div><div style={s.heatRow}>{peakHours.map((h, i) => (<div key={i} style={s.heatCol(h.level)}><div style={s.heatBar(h.level)} /><span style={s.heatLabel}>{h.hour}</span></div>))}</div></div>
        </div>
      </div>
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Goi y tu AI</h2>
        <div style={s.insightGrid}>
          {insights.map((ins) => (<div key={ins.id} style={s.insightCard}><span aria-hidden="true" className="material-symbols-outlined" style={s.insightIcon}>lightbulb</span><div style={s.insightText}>{ins.text}</div><button style={s.applyBtn(appliedInsights.includes(ins.id))} onClick={() => handleApply(ins.id)} disabled={appliedInsights.includes(ins.id)}>{appliedInsights.includes(ins.id) ? 'Da ap dung' : 'Ap dung'}</button></div>))}
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
