import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DealSplitPage = () => {
  const navigate = useNavigate();
  const [myPaid, setMyPaid] = useState(false);
  const deal = { name: 'Date Night: Bữa tối tại The Rustic Table', originalPrice: '500.000', splitPrice: '250.000', currency: 'VND' };
  const participants = [{ name: 'Bạn', avatar: '', amount: '250.000', status: myPaid ? 'paid' : 'pending' }, { name: 'Minh Anh', avatar: '', amount: '250.000', status: 'paid' }];
  const paidCount = participants.filter(p => p.status === 'paid').length;
  const breakdown = [{ label: 'Bữa ăn (2 người)', amount: '380.000' }, { label: 'Đồ uống', amount: '80.000' }, { label: 'Tip (10%)', amount: '40.000' }];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313', fontFamily: 'var(--font-body)' }}>
      <div style={{ backgroundColor: '#1C1B1B', padding: '16px 20px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#E6BEB2', display: 'flex' }}><span aria-hidden="true" className="material-symbols-outlined">arrow_back</span></button>
        <div style={{ flex: 1, textAlign: 'center' }}><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: '#FDF9F3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#FFB59E' }}>handshake</span>Mở phiên deal</h1></div>
        <div style={{ width: 24 }} />
      </div>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '20px 16px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#FF571A', color: '#3A0B00', borderRadius: '1.5rem', padding: '10px 16px', marginBottom: 16, fontSize: 14, fontWeight: 600 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>timer</span>Còn 2h để thanh toán</div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 18px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#3A0B00', fontSize: 28 }}>receipt_long</span></div>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, color: '#FDF9F3', marginBottom: 12 }}>{deal.name}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}><div><p style={{ fontSize: 12, color: '#E6BEB2', marginBottom: 2 }}>Tổng giá</p><p style={{ fontSize: 18, fontWeight: 700, color: '#E6BEB2', textDecoration: 'line-through' }}>{deal.originalPrice} {deal.currency}</p></div><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#FFB59E' }}>arrow_forward</span><div><p style={{ fontSize: 12, color: '#E6BEB2', marginBottom: 2 }}>Mỗi người</p><p style={{ fontSize: 22, fontWeight: 800, color: '#FFB59E', fontFamily: 'var(--font-headline)' }}>{deal.splitPrice} <span style={{ fontSize: 13, fontWeight: 600 }}>{deal.currency}/người</span></p></div></div>
        </div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 18px', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#FDF9F3' }}>Thành viên</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{participants.map((p, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#2A2A2A', borderRadius: '1.5rem' }}><div style={{ width: 40, height: 40, borderRadius: '9999px', background: '#353535', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#E6BEB2' }}>person</span></div><div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, color: '#FDF9F3' }}>{p.name}</p><p style={{ fontSize: 13, color: '#E6BEB2' }}>{p.amount} {deal.currency}</p></div><span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: '9999px', fontSize: 12, fontWeight: 600, background: p.status === 'paid' ? '#11750030' : '#FF571A30', color: p.status === 'paid' ? '#117500' : '#FF571A' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>{p.status === 'paid' ? 'check_circle' : 'pending'}</span>{p.status === 'paid' ? 'Đã đóng' : 'Chờ thanh toán'}</span></div>))}</div>
        </div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 18px', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#FDF9F3' }}>Chi tiết deal</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{breakdown.map((item, i) => (<div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < breakdown.length - 1 ? 10 : 0, borderBottom: i < breakdown.length - 1 ? '1px solid #2A2A2A' : 'none' }}><span style={{ fontSize: 14, color: '#E6BEB2' }}>{item.label}</span><span style={{ fontSize: 14, fontWeight: 600, color: '#FDF9F3' }}>{item.amount} {deal.currency}</span></div>))}<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '2px solid #FDF9F3' }}><span style={{ fontSize: 15, fontWeight: 700, color: '#FDF9F3' }}>Tổng cộng</span><span style={{ fontSize: 16, fontWeight: 800, color: '#FFB59E', fontFamily: 'var(--font-headline)' }}>{deal.originalPrice} {deal.currency}</span></div></div>
        </div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '18px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}><span style={{ fontSize: 14, fontWeight: 600, color: '#FDF9F3' }}>Tiến độ thanh toán</span><span style={{ fontSize: 13, fontWeight: 600, color: '#FFB59E' }}>{paidCount}/2 đã thanh toán</span></div>
          <div style={{ width: '100%', height: 10, background: '#2A2A2A', borderRadius: '9999px', overflow: 'hidden' }}><div style={{ width: `${(paidCount / 2) * 100}%`, height: '100%', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', borderRadius: '9999px', transition: 'width 0.5s ease' }} /></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#2A2A2A', borderRadius: '1.5rem', padding: '14px 16px', marginBottom: 24 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E', flexShrink: 0, marginTop: 1 }}>lock</span><p style={{ fontSize: 13, color: '#E6BEB2', lineHeight: 1.5 }}>Tiền được giữ an toàn cho đến khi buổi hẹn hoàn thành</p></div>
        {!myPaid && (<button onClick={() => setMyPaid(true)} style={{ width: '100%', padding: '15px 0', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '1.5rem', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-headline)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>payments</span>Thanh toán phần của bạn - {deal.splitPrice} {deal.currency}</button>)}
        {myPaid && (<div style={{ textAlign: 'center', padding: '20px', background: '#11750020', borderRadius: '1.5rem' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 40, color: '#117500' }}>task_alt</span><p style={{ fontSize: 15, fontWeight: 700, color: '#117500', marginTop: 8 }}>Bạn đã thanh toán thành công!</p></div>)}
      </div>
    </div>
  );
};

export default DealSplitPage;
