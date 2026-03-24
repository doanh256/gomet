import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DateInvitePage = () => {
  const navigate = useNavigate();
  const [dateType, setDateType] = useState('coffee');
  const [form, setForm] = useState({ date: '', time: '', venue: '', message: '' });
  const dateTypes = [{ id: 'coffee', label: 'Ca phe', icon: 'coffee' }, { id: 'dinner', label: 'An toi', icon: 'restaurant' }, { id: 'activity', label: 'Hoat dong', icon: 'hiking' }, { id: 'special', label: 'Dac biet', icon: 'auto_awesome' }];
  const recipient = { name: 'Minh Anh', avatar: '' };
  const incomingInvites = [
    { sender: { name: 'Duc Huy', avatar: '' }, type: 'An toi', date: '29/03/2026', time: '19:30', venue: 'The Rustic Table, Q1', message: 'Minh muon moi ban di an toi cuoi tuan nay, hy vong ban ranh nhe!', expiresIn: '24h' },
    { sender: { name: 'Thu Trang', avatar: '' }, type: 'Ca phe', date: '27/03/2026', time: '10:00', venue: 'Cafe Terrace, Q1', message: 'Cuoi tuan nay di uong ca phe noi chuyen nhe, minh biet mot quan rat dep!', expiresIn: '18h' },
  ];
  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '1.5rem', border: 'none', fontSize: 14, fontFamily: 'var(--font-body)', color: '#FDF9F3', background: '#2A2A2A', outline: 'none' };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#E6BEB2', marginBottom: 6, display: 'block' };
  const typeColors = { 'Ca phe': { bg: '#FFD54F30', color: '#FFD54F' }, 'An toi': { bg: '#FFB59E30', color: '#FFB59E' }, 'Hoat dong': { bg: '#FF571A30', color: '#FF571A' }, 'Dac biet': { bg: '#11750030', color: '#117500' } };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313', fontFamily: 'var(--font-body)' }}>
      <div style={{ backgroundColor: '#1C1B1B', padding: '16px 20px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#E6BEB2', display: 'flex' }}><span className="material-symbols-outlined">arrow_back</span></button>
        <div style={{ flex: 1, textAlign: 'center' }}><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: '#FDF9F3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span className="material-symbols-outlined" style={{ fontSize: 22, color: '#FFB59E' }}>mail</span>Loi moi hen do</h1></div>
        <div style={{ width: 24 }} />
      </div>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '20px 16px 100px' }}>
        <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 18px', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#FDF9F3' }}>Gui loi moi</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#2A2A2A', borderRadius: '1.5rem', marginBottom: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: '9999px', background: '#353535', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="material-symbols-outlined" style={{ fontSize: 24, color: '#E6BEB2' }}>person</span></div>
            <div><p style={{ fontSize: 14, fontWeight: 700, color: '#FDF9F3' }}>{recipient.name}</p><p style={{ fontSize: 12, color: '#E6BEB2' }}>Gui loi moi den...</p></div>
          </div>
          <label style={labelStyle}>Loai hen</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>{dateTypes.map((dt) => { const active = dateType === dt.id; return (<button key={dt.id} onClick={() => setDateType(dt.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: '9999px', border: 'none', background: active ? 'linear-gradient(135deg, #FFB59E, #FF571A)' : '#2A2A2A', color: active ? '#3A0B00' : '#E6BEB2', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>{dt.icon}</span>{dt.label}</button>); })}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}><div><label style={labelStyle}>Ngay</label><input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} style={inputStyle} /></div><div><label style={labelStyle}>Gio</label><input type="time" value={form.time} onChange={(e) => handleChange('time', e.target.value)} style={inputStyle} /></div></div>
          <div style={{ marginBottom: 14 }}><label style={labelStyle}>Dia diem</label><input type="text" value={form.venue} onChange={(e) => handleChange('venue', e.target.value)} placeholder="Chon nha hang, cafe..." style={inputStyle} /></div>
          <div style={{ marginBottom: 18 }}><label style={labelStyle}>Loi nhan</label><textarea value={form.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="Viet loi moi cua ban..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
          <button style={{ width: '100%', padding: '14px 0', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '1.5rem', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-headline)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>Gui loi moi</button>
        </div>
        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#FDF9F3' }}>Loi moi da nhan</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {incomingInvites.map((invite, i) => { const tc = typeColors[invite.type] || typeColors['Dac biet']; return (<div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}><div style={{ width: 44, height: 44, borderRadius: '9999px', background: '#353535', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="material-symbols-outlined" style={{ fontSize: 24, color: '#E6BEB2' }}>person</span></div><div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 700, color: '#FDF9F3' }}>{invite.sender.name}</p><span style={{ background: tc.bg, color: tc.color, borderRadius: '9999px', padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{invite.type}</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#FF571A', fontWeight: 600 }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>timer</span>Het han trong {invite.expiresIn}</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#E6BEB2' }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>event</span>{invite.date} - {invite.time}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#E6BEB2' }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>{invite.venue}</div></div>
            <p style={{ fontSize: 13, fontStyle: 'italic', color: '#E6BEB2', background: '#2A2A2A', borderRadius: '1.5rem', padding: '10px 12px', marginBottom: 14, lineHeight: 1.5 }}>"{invite.message}"</p>
            <div style={{ display: 'flex', gap: 10 }}><button style={{ flex: 1, padding: '11px 0', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '1.5rem', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'var(--font-body)' }}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>Chap nhan</button><button style={{ flex: 1, padding: '11px 0', background: '#2A2A2A', color: '#E6BEB2', border: 'none', borderRadius: '1.5rem', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'var(--font-body)' }}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>cancel</span>Tu choi</button></div>
          </div>); })}
        </div>
      </div>
    </div>
  );
};

export default DateInvitePage;
