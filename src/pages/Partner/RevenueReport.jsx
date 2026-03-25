import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RevenueReport = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState('Tháng này');
  const periods = ['Tháng này', 'Tháng trước', 'Quý này'];
  const summary = [
    { label: 'Tổng doanh thu', value: '45.2M VND', icon: 'account_balance', change: '+18%', changeColor: '#117500', changeIcon: 'trending_up' },
    { label: 'Số giao dịch', value: '234', icon: 'receipt_long', change: '+12%', changeColor: '#117500', changeIcon: 'trending_up' },
    { label: 'Giá trị TB', value: '193k VND', icon: 'analytics', change: '+5%', changeColor: '#117500', changeIcon: 'trending_up' },
  ];
  const dailyRevenue = [{ day: '08', value: 2.8 }, { day: '09', value: 3.5 }, { day: '10', value: 2.1 }, { day: '11', value: 4.2 }, { day: '12', value: 3.8 }, { day: '13', value: 5.1 }, { day: '14', value: 4.5 }, { day: '15', value: 3.0 }, { day: '16', value: 3.9 }, { day: '17', value: 2.5 }, { day: '18', value: 4.8 }, { day: '19', value: 5.5 }, { day: '20', value: 6.2 }, { day: '21', value: 5.8 }];
  const maxRevenue = Math.max(...dailyRevenue.map(d => d.value));
  const transactions = [
    { id: 1, date: '22/03', desc: 'Đặt chỗ - Nguyễn Văn A', amount: '+850k', type: 'Đặt chỗ', positive: true },
    { id: 2, date: '22/03', desc: 'Sự kiện sinh nhật - Trần B', amount: '+2.5M', type: 'Sự kiện', positive: true },
    { id: 3, date: '21/03', desc: 'Hoàn tiền - Lê Văn C', amount: '-50k', type: 'Hoàn tiền', positive: false },
    { id: 4, date: '21/03', desc: 'Đặt chỗ - Phạm Thị D', amount: '+650k', type: 'Đặt chỗ', positive: true },
    { id: 5, date: '20/03', desc: 'Khuyến mãi - Võ E', amount: '+420k', type: 'Khuyến mãi', positive: true },
    { id: 6, date: '20/03', desc: 'Đặt chỗ - Hoàng F', amount: '+780k', type: 'Đặt chỗ', positive: true },
    { id: 7, date: '19/03', desc: 'Sự kiện họp mặt - Đặng G', amount: '+3.2M', type: 'Sự kiện', positive: true },
    { id: 8, date: '19/03', desc: 'Hoàn tiền - Bùi H', amount: '-120k', type: 'Hoàn tiền', positive: false },
    { id: 9, date: '18/03', desc: 'Đặt chỗ - Ngô I', amount: '+550k', type: 'Đặt chỗ', positive: true },
    { id: 10, date: '18/03', desc: 'Khuyến mãi - Mai K', amount: '+380k', type: 'Khuyến mãi', positive: true },
  ];
  const distribution = [{ label: 'Đặt chỗ', percent: 60, color: '#FFB59E' }, { label: 'Sự kiện', percent: 25, color: '#FFD54F' }, { label: 'Khuyến mãi', percent: 15, color: '#E6BEB2' }];
  const getTypeChipStyle = (type) => {
    if (type === 'Đặt chỗ') return { background: 'rgba(255,181,158,0.15)', color: '#FFB59E' };
    if (type === 'Sự kiện') return { background: 'rgba(255,213,79,0.15)', color: '#FFD54F' };
    if (type === 'Khuyến mãi') return { background: 'rgba(17,117,0,0.15)', color: '#117500' };
    return { background: 'rgba(255,87,26,0.15)', color: '#FF571A' };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#131313', fontFamily: 'var(--font-body)', color: '#FDF9F3', padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#FFB59E', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16, padding: 0 }} onClick={() => navigate('/partner')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>Quay lại</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 32, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>account_balance</span><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800 }}>Báo cáo doanh thu</h1></div>
      <p style={{ color: '#E6BEB2', fontSize: 14, marginBottom: 24 }}>Theo dõi doanh thu và giao dịch của địa điểm</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>{periods.map(p => (<button key={p} style={{ padding: '8px 20px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)', background: activePeriod === p ? '#FFB59E' : '#2A2A2A', color: activePeriod === p ? '#3A0B00' : '#FDF9F3', transition: 'all 0.2s' }} onClick={() => setActivePeriod(p)}>{p}</button>))}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        {summary.map((st, i) => (<div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 28, color: '#FFB59E', marginBottom: 8 }}>{st.icon}</span><div style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{st.value}</div><div style={{ fontSize: 13, color: '#E6BEB2', marginBottom: 8 }}>{st.label}</div><div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: st.changeColor }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>{st.changeIcon}</span>{st.change}</div></div>))}
      </div>
      <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px', marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#FFB59E' }}>bar_chart</span>Doanh thu theo ngày</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, padding: '0 4px' }}>{dailyRevenue.map((d, i) => (<div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><div style={{ width: '100%', maxWidth: 40, height: `${(d.value / maxRevenue) * 100}%`, background: i % 2 === 0 ? '#FFB59E' : '#FF571A', borderRadius: '6px 6px 3px 3px', transition: 'height 0.4s ease' }} /><span style={{ fontSize: 11, color: '#E6BEB2', fontWeight: 500 }}>{d.day}</span></div>))}</div>
      </div>
      <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px', marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#FFB59E' }}>list_alt</span>Chi tiết giao dịch</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {transactions.map((tx, i) => (<div key={tx.id} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', gap: 16, flexWrap: 'wrap' }}><span style={{ fontSize: 13, color: '#E6BEB2', minWidth: 50, fontWeight: 500 }}>{tx.date}</span><span style={{ flex: 1, fontSize: 14, fontWeight: 500, minWidth: 160 }}>{tx.desc}</span><span style={{ fontSize: 15, fontWeight: 700, color: tx.positive ? '#117500' : '#FF571A', minWidth: 80, textAlign: 'right' }}>{tx.amount}</span><span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', ...getTypeChipStyle(tx.type) }}>{tx.type}</span></div>))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button style={{ background: '#2A2A2A', border: 'none', borderRadius: '9999px', padding: '12px 24px', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#FDF9F3' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>picture_as_pdf</span>Xuất PDF</button>
        <button style={{ background: '#2A2A2A', border: 'none', borderRadius: '9999px', padding: '12px 24px', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#FDF9F3' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>table_chart</span>Xuất Excel</button>
      </div>
      <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#FFB59E' }}>donut_large</span>Phân bổ doanh thu</div>
        {distribution.map((d, i) => (<div key={i} style={{ marginBottom: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, fontWeight: 500 }}><span>{d.label}</span><span style={{ fontWeight: 700 }}>{d.percent}%</span></div><div style={{ height: 14, background: '#2A2A2A', borderRadius: '9999px', overflow: 'hidden' }}><div style={{ height: '100%', width: `${d.percent}%`, background: d.color, borderRadius: '9999px', transition: 'width 0.6s ease' }} /></div></div>))}
      </div>
    </div>
  );
};

export default RevenueReport;
