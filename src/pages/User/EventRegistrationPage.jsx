import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventRegistrationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', guests: 1, notes: '', ticketType: 'standard', paymentMethod: 'gomet', agreedTerms: false });
  const event = { name: 'Date Night: Dem Nhac Jazz & Wine', date: 'Thu 7, 28/03/2026 - 19:00', venue: 'The Muse Rooftop, Q1, TP.HCM', price: '150.000 VND', spotsLeft: 12 };
  const tickets = [{ id: 'standard', name: 'Tieu chuan', price: '150.000 VND', benefits: ['Vao cua', '1 do uong', 'Ghe ngoi chung'] }, { id: 'vip', name: 'VIP', price: '350.000 VND', benefits: ['Vao cua uu tien', '2 do uong cao cap', 'Ban rieng', 'Qua tang dac biet'] }];
  const paymentMethods = [{ id: 'gomet', label: 'Vi GOMET', icon: 'account_balance_wallet' }, { id: 'momo', label: 'MoMo', icon: 'phone_android' }, { id: 'bank', label: 'The ngan hang', icon: 'credit_card' }];
  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const isValid = form.name && form.email && form.phone && form.agreedTerms;
  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '1.5rem', border: 'none', fontSize: 14, fontFamily: 'var(--font-body)', color: '#FDF9F3', background: '#2A2A2A', outline: 'none', transition: 'border-color 0.2s' };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#E6BEB2', marginBottom: 6, display: 'block' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313', fontFamily: 'var(--font-body)' }}>
      <div style={{ backgroundColor: '#1C1B1B', padding: '16px 20px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#E6BEB2', display: 'flex' }}><span aria-hidden="true" className="material-symbols-outlined">arrow_back</span></button>
        <div style={{ flex: 1, textAlign: 'center' }}><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: '#FDF9F3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#FFB59E' }}>how_to_reg</span>Dang ky su kien</h1></div>
        <div style={{ width: 24 }} />
      </div>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '20px 16px 100px' }}>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '18px', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, color: '#FDF9F3', marginBottom: 10 }}>{event.name}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{[{ icon: 'event', text: event.date }, { icon: 'location_on', text: event.venue }, { icon: 'payments', text: `Tu ${event.price}` }].map((item, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E6BEB2' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#FFB59E' }}>{item.icon}</span>{item.text}</div>))}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FF571A', color: '#3A0B00', borderRadius: '9999px', padding: '4px 12px', fontSize: 12, fontWeight: 600, marginTop: 10 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>group</span>Con {event.spotsLeft} cho trong</div>
        </div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 18px', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#FDF9F3' }}>Thong tin dang ky</h3>
          {[{ label: 'Ho va ten', field: 'name', type: 'text', placeholder: 'Nhap ho ten cua ban' }, { label: 'Email', field: 'email', type: 'email', placeholder: 'email@example.com' }, { label: 'So dien thoai', field: 'phone', type: 'tel', placeholder: '0901 234 567' }].map((input) => (<div key={input.field} style={{ marginBottom: 14 }}><label style={labelStyle}>{input.label}</label><input type={input.type} value={form[input.field]} onChange={(e) => handleChange(input.field, e.target.value)} placeholder={input.placeholder} style={inputStyle} /></div>))}
          <div style={{ marginBottom: 14 }}><label style={labelStyle}>So nguoi</label><input type="number" min={1} max={10} value={form.guests} onChange={(e) => handleChange('guests', parseInt(e.target.value) || 1)} style={{ ...inputStyle, width: 100 }} /></div>
          <div><label style={labelStyle}>Ghi chu dac biet</label><textarea value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} placeholder="Di ung thuc pham, yeu cau dac biet..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
        </div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 18px', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#FDF9F3' }}>Chon goi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{tickets.map((ticket) => { const selected = form.ticketType === ticket.id; return (<div key={ticket.id} onClick={() => handleChange('ticketType', ticket.id)} style={{ padding: '16px', borderRadius: '1.5rem', border: 'none', background: selected ? '#FF571A' : '#2A2A2A', cursor: 'pointer', transition: 'all 0.2s' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><span style={{ fontWeight: 700, fontSize: 15, color: selected ? '#3A0B00' : '#FDF9F3' }}>{ticket.name}</span><span style={{ fontWeight: 700, fontSize: 15, color: selected ? '#3A0B00' : '#FFB59E' }}>{ticket.price}</span></div><div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{ticket.benefits.map((b, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: selected ? '#3A0B00' : '#E6BEB2' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16, color: selected ? '#3A0B00' : '#117500' }}>check_circle</span>{b}</div>))}</div></div>); })}</div>
        </div>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 18px', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#FDF9F3' }}>Phuong thuc thanh toan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{paymentMethods.map((pm) => (<label key={pm.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: '1.5rem', border: 'none', background: form.paymentMethod === pm.id ? '#FF571A' : '#2A2A2A', cursor: 'pointer', transition: 'all 0.2s' }}><input type="radio" name="payment" checked={form.paymentMethod === pm.id} onChange={() => handleChange('paymentMethod', pm.id)} style={{ accentColor: '#FFB59E' }} /><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: form.paymentMethod === pm.id ? '#3A0B00' : '#FFB59E' }}>{pm.icon}</span><span style={{ fontSize: 14, fontWeight: 500, color: form.paymentMethod === pm.id ? '#3A0B00' : '#FDF9F3' }}>{pm.label}</span></label>))}</div>
        </div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24, padding: '0 4px', cursor: 'pointer' }}><input type="checkbox" checked={form.agreedTerms} onChange={(e) => handleChange('agreedTerms', e.target.checked)} style={{ accentColor: '#FFB59E', marginTop: 2, width: 18, height: 18 }} /><span style={{ fontSize: 13, color: '#E6BEB2', lineHeight: 1.5 }}>Toi dong y voi dieu khoan su kien va chinh sach huy cua GOMET</span></label>
        <button disabled={!isValid} onClick={() => navigate('/booking-confirm')} style={{ width: '100%', padding: '15px 0', background: isValid ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#2A2A2A', color: isValid ? '#3A0B00' : '#E6BEB2', border: 'none', borderRadius: '1.5rem', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-headline)', cursor: isValid ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: isValid ? 1 : 0.6, transition: 'all 0.2s' }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>how_to_reg</span>Xac nhan dang ky</button>
      </div>
    </div>
  );
};

export default EventRegistrationPage;
