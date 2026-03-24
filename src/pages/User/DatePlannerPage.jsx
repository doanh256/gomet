import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatePlannerPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dateType, setDateType] = useState(null);
  const [dateDate, setDateDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(null);
  const [venue, setVenue] = useState(null);
  const [customVenue, setCustomVenue] = useState('');
  const [budget, setBudget] = useState(1);
  const [notes, setNotes] = useState('');
  const [reminder, setReminder] = useState(true);

  const dateTypes = [
    { id: 'coffee', label: 'Ca phe', icon: 'local_cafe' },
    { id: 'dinner', label: 'An toi', icon: 'restaurant' },
    { id: 'activity', label: 'Hoat dong', icon: 'sports_tennis' },
    { id: 'adventure', label: 'Phieu luu', icon: 'hiking' },
  ];

  const timeSlots = [
    { id: 'morning', label: 'Sang', icon: 'wb_sunny', time: '8:00 - 11:00' },
    { id: 'noon', label: 'Trua', icon: 'wb_twilight', time: '11:00 - 14:00' },
    { id: 'afternoon', label: 'Chieu', icon: 'routine', time: '14:00 - 18:00' },
    { id: 'evening', label: 'Toi', icon: 'nightlight', time: '18:00 - 22:00' },
  ];

  const venuesByType = {
    coffee: [
      { id: 'v1', name: 'The Coffee House', address: 'Quan 1, TP.HCM', rating: 4.5 },
      { id: 'v2', name: 'Maison Marou', address: 'Quan 3, TP.HCM', rating: 4.7 },
      { id: 'v3', name: 'The Workshop', address: 'Quan 1, TP.HCM', rating: 4.6 },
    ],
    dinner: [
      { id: 'v4', name: 'Pizza 4P\'s', address: 'Quan 2, TP.HCM', rating: 4.8 },
      { id: 'v5', name: 'Noir Dining', address: 'Quan 1, TP.HCM', rating: 4.9 },
      { id: 'v6', name: 'Cuc Gach Quan', address: 'Quan 1, TP.HCM', rating: 4.6 },
    ],
    activity: [
      { id: 'v7', name: 'Pottery Workshop', address: 'Quan 3, TP.HCM', rating: 4.5 },
      { id: 'v8', name: 'Cooking Class', address: 'Quan 1, TP.HCM', rating: 4.7 },
      { id: 'v9', name: 'Art Jamming Studio', address: 'Quan 7, TP.HCM', rating: 4.4 },
    ],
    adventure: [
      { id: 'v10', name: 'Can Gio Mangrove', address: 'Can Gio, TP.HCM', rating: 4.3 },
      { id: 'v11', name: 'Cu Chi Tunnels', address: 'Cu Chi, TP.HCM', rating: 4.5 },
      { id: 'v12', name: 'Vung Tau Beach', address: 'Vung Tau', rating: 4.6 },
    ],
  };

  const budgetLabels = ['100k', '200k', '500k', '1M', '1M+'];

  const tips = {
    coffee: [
      { title: 'Chon cho ngoi thoai mai', text: 'Nen chon quan co goc yen tinh de tro chuyen, tranh cho qua on ao.' },
      { title: 'Den som 5 phut', text: 'The hien su chu dao bang cach den truoc va chon ban tot nhat cho ca hai.' },
    ],
    dinner: [
      { title: 'Dat ban truoc', text: 'Nen dat truoc it nhat 1 ngay, nhat la vao cuoi tuan de dam bao co cho tot.' },
      { title: 'Tim hieu menu', text: 'Xem truoc menu de co the goi y mon cho doi phuong mot cach tu tin.' },
    ],
    activity: [
      { title: 'Mac thoai mai', text: 'Chon trang phuc thoai mai phu hop voi hoat dong, nhung van lich su.' },
      { title: 'Chuan bi tinh than', text: 'Hoat dong nhom giup pha bang tu nhien, hay vui ve va co gang het minh!' },
    ],
    adventure: [
      { title: 'Kiem tra thoi tiet', text: 'Xem du bao thoi tiet truoc 1 ngay de chuan bi tot nhat cho chuyen di.' },
      { title: 'Mang do du phong', text: 'Nuoc uong, kem chong nang va mu la nhung thu khong the thieu.' },
    ],
  };

  const currentVenues = venuesByType[dateType] || venuesByType.coffee;
  const currentTips = tips[dateType] || tips.coffee;

  const getSelectedVenueName = () => {
    if (venue === 'custom') return customVenue || 'Tu chon';
    const found = currentVenues.find(v => v.id === venue);
    return found ? found.name : '—';
  };

  const s = {
    page: {
      minHeight: '100vh',
      background: '#131313',
      fontFamily: 'var(--font-body)',
      color: '#FDF9F3',
    },
    header: {
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    backBtn: {
      background: '#1C1B1B',
      border: 'none',
      color: '#FDF9F3',
      borderRadius: '9999px',
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    hero: {
      padding: '8px 20px 24px',
    },
    heroRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8,
    },
    heroIcon: {
      fontSize: 36,
      color: '#FFB59E',
    },
    heroTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 26,
      fontWeight: 800,
    },
    heroSub: {
      fontSize: 14,
      color: '#E6BEB2',
    },
    progressBar: {
      display: 'flex',
      gap: 6,
      padding: '0 20px 24px',
    },
    progressSegment: (active, done) => ({
      flex: 1,
      height: 4,
      borderRadius: 2,
      background: done ? '#FFB59E' : active ? '#FF571A' : '#353535',
      transition: 'background 0.3s',
    }),
    stepLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 20px 8px',
      fontSize: 12,
      color: '#E6BEB2',
    },
    section: {
      padding: '0 20px 24px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 17,
      fontWeight: 700,
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    stepNum: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#FFB59E',
      color: '#3A0B00',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
    },
    typeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 12,
    },
    typeCard: (active) => ({
      background: active ? '#FF571A' : '#1C1B1B',
      border: 'none',
      borderRadius: '1.5rem',
      padding: 20,
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    typeIcon: (active) => ({
      fontSize: 32,
      color: active ? '#3A0B00' : '#E6BEB2',
      marginBottom: 8,
    }),
    typeLabel: (active) => ({
      fontWeight: active ? 700 : 500,
      fontSize: 14,
      color: active ? '#3A0B00' : '#FDF9F3',
    }),
    dateInput: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '1.5rem',
      border: 'none',
      background: '#1C1B1B',
      fontSize: 14,
      color: '#FDF9F3',
      fontFamily: 'var(--font-body)',
      outline: 'none',
      marginBottom: 12,
    },
    timeChips: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 8,
    },
    timeChip: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 14px',
      borderRadius: '1.5rem',
      border: 'none',
      background: active ? '#FF571A' : '#1C1B1B',
      cursor: 'pointer',
      fontSize: 13,
      color: active ? '#3A0B00' : '#FDF9F3',
    }),
    timeChipIcon: (active) => ({
      fontSize: 20,
      color: active ? '#3A0B00' : '#E6BEB2',
    }),
    venueCards: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    venueCard: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: '1.5rem',
      border: 'none',
      background: active ? '#FF571A' : '#1C1B1B',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: active ? '#3A0B00' : '#FDF9F3',
    }),
    venueIcon: {
      width: 40,
      height: 40,
      borderRadius: '1.5rem',
      background: '#2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#E6BEB2',
    },
    venueName: {
      fontWeight: 600,
      fontSize: 14,
    },
    venueAddr: {
      fontSize: 12,
      color: '#E6BEB2',
    },
    venueRating: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      fontSize: 13,
      fontWeight: 600,
      color: '#FFD54F',
    },
    customInput: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '1.5rem',
      border: 'none',
      background: '#1C1B1B',
      fontSize: 13,
      color: '#FDF9F3',
      fontFamily: 'var(--font-body)',
      outline: 'none',
      marginTop: 8,
    },
    budgetRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    budgetTrack: {
      position: 'relative',
      height: 6,
      borderRadius: 3,
      background: '#353535',
      marginBottom: 6,
    },
    budgetFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: `${(budget / 4) * 100}%`,
      borderRadius: 3,
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
    },
    budgetSlider: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
      margin: 0,
    },
    budgetLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      color: '#E6BEB2',
    },
    textarea: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: '1.5rem',
      border: 'none',
      background: '#1C1B1B',
      fontSize: 13,
      color: '#FDF9F3',
      fontFamily: 'var(--font-body)',
      outline: 'none',
      resize: 'vertical',
      minHeight: 80,
      marginBottom: 12,
    },
    toggleRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0',
    },
    toggleLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
    },
    toggleSwitch: (on) => ({
      width: 44,
      height: 24,
      borderRadius: 12,
      background: on ? '#FFB59E' : '#353535',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s',
      border: 'none',
      padding: 0,
    }),
    toggleKnob: (on) => ({
      position: 'absolute',
      top: 2,
      left: on ? 22 : 2,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#131313',
      transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
    }),
    summaryCard: {
      background: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 24,
    },
    summaryTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    summaryRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 0',
      borderBottom: '1px solid #2A2A2A',
      fontSize: 13,
    },
    summaryLabel: {
      color: '#E6BEB2',
      width: 100,
      flexShrink: 0,
    },
    summaryValue: {
      fontWeight: 600,
    },
    ctaBtn: {
      width: '100%',
      padding: '14px 0',
      borderRadius: '9999px',
      border: 'none',
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      marginTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    navBtns: {
      display: 'flex',
      gap: 12,
      padding: '0 20px 16px',
    },
    navBtn: (primary) => ({
      flex: 1,
      padding: '12px 0',
      borderRadius: '9999px',
      border: 'none',
      background: primary ? '#FFB59E' : '#2A2A2A',
      color: primary ? '#3A0B00' : '#FDF9F3',
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    }),
    tipCards: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    tipCard: {
      background: '#2A2A2A',
      borderRadius: '1.5rem',
      padding: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
    },
    tipIcon: {
      fontSize: 22,
      color: '#FFB59E',
      flexShrink: 0,
    },
    tipTitle: {
      fontWeight: 700,
      fontSize: 13,
      marginBottom: 4,
      color: '#FDF9F3',
    },
    tipText: {
      fontSize: 12,
      lineHeight: 1.5,
      color: '#E6BEB2',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <div style={s.hero}>
        <div style={s.heroRow}>
          <span className="material-symbols-outlined" style={s.heroIcon}>event_note</span>
          <h1 style={s.heroTitle}>Len ke hoach hen do</h1>
        </div>
        <p style={s.heroSub}>Tao buoi hen hoan hao chi trong vai buoc</p>
      </div>

      {/* Progress */}
      <div style={s.progressBar}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={s.progressSegment(step === n, step > n)} />
        ))}
      </div>
      <div style={s.stepLabel}>
        <span>Loai hen</span><span>Thoi gian</span><span>Dia diem</span><span>Chi tiet</span>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>
            <span style={s.stepNum}>1</span>
            Chon loai hen
          </div>
          <div style={s.typeGrid}>
            {dateTypes.map(t => (
              <div key={t.id} style={s.typeCard(dateType === t.id)} onClick={() => setDateType(t.id)}>
                <span className="material-symbols-outlined" style={s.typeIcon(dateType === t.id)}>{t.icon}</span>
                <div style={s.typeLabel(dateType === t.id)}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>
            <span style={s.stepNum}>2</span>
            Chon ngay gio
          </div>
          <input
            type="date"
            value={dateDate}
            onChange={e => setDateDate(e.target.value)}
            style={s.dateInput}
          />
          <div style={s.timeChips}>
            {timeSlots.map(ts => (
              <div key={ts.id} style={s.timeChip(timeSlot === ts.id)} onClick={() => setTimeSlot(ts.id)}>
                <span className="material-symbols-outlined" style={s.timeChipIcon(timeSlot === ts.id)}>{ts.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{ts.label}</div>
                  <div style={{ fontSize: 11, color: '#E6BEB2' }}>{ts.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>
            <span style={s.stepNum}>3</span>
            Chon dia diem
          </div>
          <div style={s.venueCards}>
            {currentVenues.map(v => (
              <div key={v.id} style={s.venueCard(venue === v.id)} onClick={() => setVenue(v.id)}>
                <div style={s.venueIcon}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>place</span>
                </div>
                <div>
                  <div style={s.venueName}>{v.name}</div>
                  <div style={s.venueAddr}>{v.address}</div>
                </div>
                <div style={s.venueRating}>
                  <span className="material-symbols-outlined filled" style={{ fontSize: 16, color: '#FFD54F' }}>star</span>
                  {v.rating}
                </div>
              </div>
            ))}
            <div style={s.venueCard(venue === 'custom')} onClick={() => setVenue('custom')}>
              <div style={s.venueIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>edit_location</span>
              </div>
              <div>
                <div style={s.venueName}>Tu chon dia diem</div>
                <div style={s.venueAddr}>Nhap dia diem cua ban</div>
              </div>
            </div>
            {venue === 'custom' && (
              <input
                style={s.customInput}
                placeholder="Nhap ten dia diem..."
                value={customVenue}
                onChange={e => setCustomVenue(e.target.value)}
              />
            )}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>
            <span style={s.stepNum}>4</span>
            Chi tiet them
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ngan sach du kien</div>
            <div style={s.budgetTrack}>
              <div style={s.budgetFill} />
              <input
                type="range"
                min={0}
                max={4}
                step={1}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                style={s.budgetSlider}
              />
            </div>
            <div style={s.budgetLabels}>
              {budgetLabels.map((l, i) => <span key={i}>{l}</span>)}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ghi chu dac biet</div>
            <textarea
              style={s.textarea}
              placeholder="Vi du: Nguoi ay thich hoa hong, hoac bi di ung hai san..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div style={s.toggleRow}>
            <div style={s.toggleLabel}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E' }}>notifications_active</span>
              Them nhac nho
            </div>
            <button style={s.toggleSwitch(reminder)} onClick={() => setReminder(!reminder)}>
              <div style={s.toggleKnob(reminder)} />
            </button>
          </div>

          {/* Summary */}
          <div style={{ ...s.summaryCard, marginTop: 20 }}>
            <div style={s.summaryTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E' }}>summarize</span>
              Tong ket ke hoach
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Loai hen</span>
              <span style={s.summaryValue}>{dateTypes.find(t => t.id === dateType)?.label || '—'}</span>
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Ngay</span>
              <span style={s.summaryValue}>{dateDate || '—'}</span>
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Khung gio</span>
              <span style={s.summaryValue}>{timeSlots.find(t => t.id === timeSlot)?.label || '—'}</span>
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Dia diem</span>
              <span style={s.summaryValue}>{getSelectedVenueName()}</span>
            </div>
            <div style={{ ...s.summaryRow, borderBottom: 'none' }}>
              <span style={s.summaryLabel}>Ngan sach</span>
              <span style={s.summaryValue}>{budgetLabels[budget]}</span>
            </div>
            <button style={s.ctaBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
              Gui loi moi
            </button>
          </div>
        </div>
      )}

      {/* Nav Buttons */}
      <div style={s.navBtns}>
        {step > 1 && (
          <button style={s.navBtn(false)} onClick={() => setStep(step - 1)}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            Quay lai
          </button>
        )}
        {step < 4 && (
          <button
            style={s.navBtn(true)}
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && !dateType}
          >
            Tiep theo
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>
        )}
      </div>

      {/* Tips */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E' }}>tips_and_updates</span>
          Meo hay
        </div>
        <div style={s.tipCards}>
          {currentTips.map((tip, i) => (
            <div key={i} style={s.tipCard}>
              <span className="material-symbols-outlined" style={s.tipIcon}>lightbulb</span>
              <div>
                <div style={s.tipTitle}>{tip.title}</div>
                <div style={s.tipText}>{tip.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
};

export default DatePlannerPage;
