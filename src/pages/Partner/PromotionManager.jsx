import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PromotionManager = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [discountType, setDiscountType] = useState('%');
  const [conditions, setConditions] = useState({ lanDau: false, nhom4: false, ngayThuong: false });
  const [promos] = useState([
    { id: 1, name: 'Giam gia mua xuan', discount: '-20%', startDate: '01/03/2026', endDate: '31/03/2026', used: 45, maxUses: 100, status: 'active' },
    { id: 2, name: 'Date night dac biet', discount: 'Mien phi do uong', startDate: '15/03/2026', endDate: '22/03/2026', used: 88, maxUses: 100, status: 'ending' },
  ]);
  const summary = { revenue: '8.5M VND', newCustomers: 67 };
  const discountTypes = [{ label: '%', value: '%' }, { label: 'VND', value: 'VND' }, { label: 'Free item', value: 'free' }];

  const s = {
    page: { minHeight: '100vh', background: '#131313', fontFamily: 'var(--font-body)', color: '#FDF9F3', padding: '24px', maxWidth: 1200, margin: '0 auto' },
    gradientBtn: { background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', border: 'none', borderRadius: '9999px', padding: '12px 24px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 },
    promoCard: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px', marginBottom: 16 },
    discountBadge: { background: 'linear-gradient(135deg, #FFB59E, #FF571A)', color: '#3A0B00', padding: '4px 14px', borderRadius: '9999px', fontSize: 14, fontWeight: 700 },
    progressTrack: { height: 8, background: '#2A2A2A', borderRadius: '9999px', overflow: 'hidden', marginBottom: 12 },
    progressFill: (pct) => ({ height: '100%', width: `${pct}%`, background: pct > 80 ? '#FFD54F' : 'linear-gradient(135deg, #FFB59E, #FF571A)', borderRadius: '9999px', transition: 'width 0.5s ease' }),
    statusChip: (status) => ({ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: '9999px', fontSize: 12, fontWeight: 700, background: status === 'active' ? 'rgba(17,117,0,0.15)' : 'rgba(255,213,79,0.15)', color: status === 'active' ? '#117500' : '#FFD54F' }),
    actionBtn: (variant) => ({ background: variant === 'delete' ? 'rgba(255,87,26,0.15)' : '#2A2A2A', color: variant === 'delete' ? '#FF571A' : '#FDF9F3', border: 'none', borderRadius: '9999px', padding: '8px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }),
    formSection: { background: '#1C1B1B', borderRadius: '1.5rem', padding: '28px', marginBottom: 24 },
    input: { padding: '12px 16px', borderRadius: '1.5rem', border: 'none', fontSize: 14, fontFamily: 'var(--font-body)', background: '#2A2A2A', color: '#FDF9F3', outline: 'none' },
    typeChip: (active) => ({ padding: '8px 20px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)', background: active ? '#FFB59E' : '#2A2A2A', color: active ? '#3A0B00' : '#FDF9F3', transition: 'all 0.2s' }),
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#FFB59E', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16, padding: 0 },
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate('/partner')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>Quay lai</button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 32, background: 'linear-gradient(135deg, #FFB59E, #FF571A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>local_offer</span><h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 28, fontWeight: 800 }}>Quan ly khuyen mai</h1></div>
        <button style={s.gradientBtn} onClick={() => setShowForm(!showForm)}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>Tao khuyen mai</button>
      </div>
      <p style={{ color: '#E6BEB2', fontSize: 14, marginBottom: 24 }}>Tao va quan ly cac chuong trinh khuyen mai</p>

      {showForm && (
        <div style={s.formSection}>
          <div style={{ fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#FFB59E' }}>edit_note</span>Tao khuyen mai moi</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><label style={{ fontSize: 13, fontWeight: 600, color: '#E6BEB2' }}>Ten khuyen mai</label><input style={s.input} placeholder="VD: Giam gia cuoi tuan" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><label style={{ fontSize: 13, fontWeight: 600, color: '#E6BEB2' }}>Gia tri giam</label><input style={s.input} placeholder="VD: 20" type="number" /></div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#E6BEB2', marginBottom: 8 }}>Loai giam gia</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>{discountTypes.map(dt => (<button key={dt.value} style={s.typeChip(discountType === dt.value)} onClick={() => setDiscountType(dt.value)}>{dt.label}</button>))}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><label style={{ fontSize: 13, fontWeight: 600, color: '#E6BEB2' }}>Ngay bat dau</label><input style={s.input} type="date" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><label style={{ fontSize: 13, fontWeight: 600, color: '#E6BEB2' }}>Ngay ket thuc</label><input style={s.input} type="date" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><label style={{ fontSize: 13, fontWeight: 600, color: '#E6BEB2' }}>So luong toi da</label><input style={s.input} placeholder="VD: 100" type="number" /></div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#E6BEB2', marginBottom: 8, marginTop: 8 }}>Ap dung cho</div>
          <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', color: '#FDF9F3' }}><input type="checkbox" style={{ width: 20, height: 20, accentColor: '#FFB59E', cursor: 'pointer' }} checked={conditions.lanDau} onChange={() => setConditions({ ...conditions, lanDau: !conditions.lanDau })} />Lan dau</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', color: '#FDF9F3' }}><input type="checkbox" style={{ width: 20, height: 20, accentColor: '#FFB59E', cursor: 'pointer' }} checked={conditions.nhom4} onChange={() => setConditions({ ...conditions, nhom4: !conditions.nhom4 })} />Nhom 4+</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', color: '#FDF9F3' }}><input type="checkbox" style={{ width: 20, height: 20, accentColor: '#FFB59E', cursor: 'pointer' }} checked={conditions.ngayThuong} onChange={() => setConditions({ ...conditions, ngayThuong: !conditions.ngayThuong })} />Ngay thuong</label>
          </div>
          <button style={s.gradientBtn}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>check</span>Tao khuyen mai</button>
        </div>
      )}

      {promos.map(promo => { const pct = (promo.used / promo.maxUses) * 100; return (
        <div key={promo.id} style={s.promoCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700 }}>{promo.name}</span><span style={s.discountBadge}>{promo.discount}</span></div>
            <div style={s.statusChip(promo.status)}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14 }}>{promo.status === 'active' ? 'check_circle' : 'warning'}</span>{promo.status === 'active' ? 'Dang chay' : 'Sap het'}</div>
          </div>
          <div style={{ fontSize: 13, color: '#E6BEB2', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>{promo.startDate} - {promo.endDate}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>group</span>{promo.used}/{promo.maxUses} da su dung</span>
          </div>
          <div style={s.progressTrack}><div style={s.progressFill(pct)} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <button style={s.actionBtn('edit')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>Sua</button>
            <button style={s.actionBtn('pause')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>pause</span>Tam dung</button>
            <button style={s.actionBtn('delete')}><span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>Xoa</button>
          </div>
        </div>
      ); })}

      <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#FFB59E' }}>insights</span>Hieu qua khuyen mai</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#2A2A2A', borderRadius: '1.5rem', padding: '20px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800, color: '#FFB59E' }}>{summary.revenue}</div><div style={{ fontSize: 13, color: '#E6BEB2', marginTop: 4 }}>Doanh thu tu khuyen mai</div></div>
          <div style={{ background: '#2A2A2A', borderRadius: '1.5rem', padding: '20px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-headline)', fontSize: 24, fontWeight: 800, color: '#FFB59E' }}>{summary.newCustomers}</div><div style={{ fontSize: 13, color: '#E6BEB2', marginTop: 4 }}>Khach hang moi</div></div>
        </div>
      </div>
    </div>
  );
};

export default PromotionManager;
