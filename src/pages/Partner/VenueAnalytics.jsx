import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VenueAnalytics = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState('7 ngay');
  const [hoveredBar, setHoveredBar] = useState(null);
  const periods = ['7 ngay', '30 ngay', '3 thang', '1 nam'];
  const stats = [{ label: 'Tong luot xem', value: '12,450', icon: 'visibility', change: '+12%' }, { label: 'Ty le dat cho', value: '68%', icon: 'event_available', change: '+5%' }, { label: 'Danh gia TB', value: '4.7', icon: 'star', change: '+0.2' }, { label: 'Khach quay lai', value: '42%', icon: 'replay', change: '+8%' }];
  const weeklyViews = [{ day: 'T2', value: 1420 }, { day: 'T3', value: 1680 }, { day: 'T4', value: 1550 }, { day: 'T5', value: 1890 }, { day: 'T6', value: 2340 }, { day: 'T7', value: 2850 }, { day: 'CN', value: 2720 }];
  const maxView = Math.max(...weeklyViews.map(d => d.value));
  const peakHours = { rows: ['Sang', 'Trua', 'Toi'], cols: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], data: [[0.2, 0.15, 0.25, 0.2, 0.3, 0.5, 0.45], [0.5, 0.55, 0.5, 0.6, 0.7, 0.85, 0.8], [0.7, 0.75, 0.65, 0.8, 0.95, 1.0, 0.9]] };
  const sources = [{ label: 'GOMET App', percent: 65, color: '#FFB59E' }, { label: 'Tim kiem', percent: 20, color: '#FFD54F' }, { label: 'Gioi thieu', percent: 15, color: '#E6BEB2' }];
  const ratingTrend = [{ month: 'Thang 12', rating: 4.5, trend: 'up' }, { month: 'Thang 1', rating: 4.6, trend: 'up' }, { month: 'Thang 2', rating: 4.7, trend: 'up' }, { month: 'Thang 3', rating: 4.7, trend: 'same' }];
  const getHeatColor = (intensity) => { if (intensity >= 0.8) return '#FFB59E'; if (intensity >= 0.6) return '#FF571A'; if (intensity >= 0.4) return '#5a3028'; if (intensity >= 0.2) return '#2A2A2A'; return '#1C1B1B'; };

  const s = {
    page: { minHeight: '100vh', background: '#131313', fontFamily: 'var(--font-body)', color: '#FDF9F3', padding: '24px', maxWidth: 1200, margin: '0 auto' },
    chip: (active) => ({ padding: '8px 20px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)', background: active ? '#FFB59E' : '#2A2A2A', color: active ? '#3A0B00' : '#FDF9F3', transition: 'all 0.2s' }),
    statCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px', display: 'flex', alignItems: 'flex-start', gap: 12 },
    section: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px', marginBottom: 24 },
    sectionTitle: { fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 },
    bar: (heightPct, isHovered) => ({ width: '100%', maxWidth: 48, height: `${heightPct}%`, background: isHovered ? '#FFB59E' : 'linear-gradient(135deg, #FFB59E, #FF571A)', borderRadius: '8px 8px 4px 4px', transition: 'all 0.3s', cursor: 'pointer', opacity: isHovered ? 1 : 0.85, position: 'relative' }),
    barTooltip: { position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', background: '#353535', color: '#FDF9F3', padding: '4px 10px', borderRadius: '9999px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' },
    heatCell: (intensity) => ({ height: 40, borderRadius: 8, background: getHeatColor(intensity), transition: 'all 0.2s', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: intensity >= 0.6 ? '#3A0B00' : '#E6BEB2' }),
    trendCard: { background: '#2A2A2A', borderRadius: '1.5rem', padding: '16px', textAlign: 'center' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#FFB59E', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16, padding: 0 },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate('/partner')}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>Quay lai</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}><span className="material-symbols-outlined" style={{ fontSize: 32, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>analytics</span><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800 }}>Phan tich hieu suat</h1></div>
      <p style={{ color: '#E6BEB2', fontSize: 14, marginBottom: 24 }}>Theo doi va phan tich hieu suat dia diem cua ban</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>{periods.map(p => (<button key={p} style={s.chip(activePeriod === p)} onClick={() => setActivePeriod(p)}>{p}</button>))}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>{stats.map((st, i) => (<div key={i} style={s.statCard}><span className="material-symbols-outlined" style={{ fontSize: 28, color: '#FFB59E', background: '#2A2A2A', borderRadius: '1.5rem', padding: 8 }}>{st.icon}</span><div><div style={{ fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800 }}>{st.value}</div><div style={{ fontSize: 13, color: '#E6BEB2', marginTop: 2 }}>{st.label}</div><div style={{ fontSize: 12, color: '#117500', fontWeight: 600, marginTop: 2 }}>{st.change}</div></div></div>))}</div>
      <div style={s.section}><div style={s.sectionTitle}><span className="material-symbols-outlined" style={{ color: '#FFB59E' }}>bar_chart</span>Bieu do luot xem</div><div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, padding: '0 8px' }}>{weeklyViews.map((d, i) => (<div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}><div style={s.bar((d.value / maxView) * 100, hoveredBar === i)} onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>{hoveredBar === i && (<div style={s.barTooltip}>{d.value.toLocaleString()}</div>)}</div><span style={{ fontSize: 12, color: '#E6BEB2', fontWeight: 500 }}>{d.day}</span></div>))}</div></div>
      <div style={s.section}><div style={s.sectionTitle}><span className="material-symbols-outlined" style={{ color: '#FFB59E' }}>schedule</span>Gio cao diem</div><div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', gap: 4 }}><div />{peakHours.cols.map(c => (<div key={c} style={{ fontSize: 12, fontWeight: 600, color: '#E6BEB2', textAlign: 'center' }}>{c}</div>))}{peakHours.rows.map((row, ri) => (<React.Fragment key={row}><div style={{ fontSize: 12, fontWeight: 600, color: '#E6BEB2', display: 'flex', alignItems: 'center' }}>{row}</div>{peakHours.data[ri].map((val, ci) => (<div key={ci} style={s.heatCell(val)}>{Math.round(val * 100)}%</div>))}</React.Fragment>))}</div></div>
      <div style={s.section}><div style={s.sectionTitle}><span className="material-symbols-outlined" style={{ color: '#FFB59E' }}>pie_chart</span>Nguon khach</div>{sources.map((src, i) => (<div key={i} style={{ marginBottom: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, fontWeight: 500 }}><span>{src.label}</span><span style={{ fontWeight: 700 }}>{src.percent}%</span></div><div style={{ height: 12, background: '#2A2A2A', borderRadius: '9999px', overflow: 'hidden' }}><div style={{ height: '100%', width: `${src.percent}%`, background: src.color, borderRadius: '9999px', transition: 'width 0.6s ease' }} /></div></div>))}</div>
      <div style={s.section}><div style={s.sectionTitle}><span className="material-symbols-outlined" style={{ color: '#FFB59E' }}>trending_up</span>Danh gia theo thoi gian</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>{ratingTrend.map((t, i) => (<div key={i} style={s.trendCard}><div style={{ fontSize: 13, color: '#E6BEB2', marginBottom: 8 }}>{t.month}</div><div style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800, color: '#FFB59E' }}>{t.rating}</div><span className="material-symbols-outlined" style={{ fontSize: 20, color: t.trend === 'up' ? '#117500' : t.trend === 'down' ? '#FF571A' : '#E6BEB2', verticalAlign: 'middle' }}>{t.trend === 'up' ? 'arrow_upward' : t.trend === 'down' ? 'arrow_downward' : 'remove'}</span></div>))}</div></div>
    </div>
  );
};

export default VenueAnalytics;
