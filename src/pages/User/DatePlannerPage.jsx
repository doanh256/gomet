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
    { id: 'coffee', label: 'Cà phê', icon: 'local_cafe' },
    { id: 'dinner', label: 'Ăn tối', icon: 'restaurant' },
    { id: 'activity', label: 'Hoạt động', icon: 'sports_tennis' },
    { id: 'adventure', label: 'Phiêu lưu', icon: 'hiking' },
  ];

  const timeSlots = [
    { id: 'morning', label: 'Sáng', icon: 'wb_sunny', time: '8:00 - 11:00' },
    { id: 'noon', label: 'Trưa', icon: 'wb_twilight', time: '11:00 - 14:00' },
    { id: 'afternoon', label: 'Chiều', icon: 'routine', time: '14:00 - 18:00' },
    { id: 'evening', label: 'Tối', icon: 'nightlight', time: '18:00 - 22:00' },
  ];

  const venuesByType = {
    coffee: [
      { id: 'v1', name: 'The Coffee House', address: 'Quận 1, TP.HCM', rating: 4.5 },
      { id: 'v2', name: 'Maison Marou', address: 'Quận 3, TP.HCM', rating: 4.7 },
      { id: 'v3', name: 'The Workshop', address: 'Quận 1, TP.HCM', rating: 4.6 },
    ],
    dinner: [
      { id: 'v4', name: 'Pizza 4P\'s', address: 'Quận 2, TP.HCM', rating: 4.8 },
      { id: 'v5', name: 'Noir Dining', address: 'Quận 1, TP.HCM', rating: 4.9 },
      { id: 'v6', name: 'Cúc Gạch Quán', address: 'Quận 1, TP.HCM', rating: 4.6 },
    ],
    activity: [
      { id: 'v7', name: 'Pottery Workshop', address: 'Quận 3, TP.HCM', rating: 4.5 },
      { id: 'v8', name: 'Cooking Class', address: 'Quận 1, TP.HCM', rating: 4.7 },
      { id: 'v9', name: 'Art Jamming Studio', address: 'Quận 7, TP.HCM', rating: 4.4 },
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
      { title: 'Chọn chỗ ngồi thoải mái', text: 'Nên chọn quán có góc yên tĩnh để trò chuyện, tránh chỗ quá ồn ào.' },
      { title: 'Đến sớm 5 phút', text: 'Thể hiện sự chu đáo bằng cách đến trước và chọn bàn tốt nhất cho cả hai.' },
    ],
    dinner: [
      { title: 'Đặt bàn trước', text: 'Nên đặt trước ít nhất 1 ngày, nhất là vào cuối tuần để đảm bảo có chỗ tốt.' },
      { title: 'Tìm hiểu menu', text: 'Xem trước menu để có thể gợi ý món cho đối phương một cách tự tin.' },
    ],
    activity: [
      { title: 'Mặc thoải mái', text: 'Chọn trang phục thoải mái phù hợp với hoạt động, nhưng vẫn lịch sự.' },
      { title: 'Chuẩn bị tinh thần', text: 'Hoạt động nhóm giúp phá băng tự nhiên, hãy vui vẻ và cố gắng hết mình!' },
    ],
    adventure: [
      { title: 'Kiểm tra thời tiết', text: 'Xem dự báo thời tiết trước 1 ngày để chuẩn bị tốt nhất cho chuyến đi.' },
      { title: 'Mang đồ dự phòng', text: 'Nước uống, kem chống nắng và mũ là những thứ không thể thiếu.' },
    ],
  };

  const currentVenues = venuesByType[dateType] || venuesByType.coffee;
  const currentTips = tips[dateType] || tips.coffee;

  const getSelectedVenueName = () => {
    if (venue === 'custom') return customVenue || 'Tự chọn';
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
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <div style={s.hero}>
        <div style={s.heroRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.heroIcon}>event_note</span>
          <h1 style={s.heroTitle}>Lên kế hoạch hẹn hò</h1>
        </div>
        <p style={s.heroSub}>Tạo buổi hẹn hoàn hảo chỉ trong vài bước</p>
      </div>

      {/* Progress */}
      <div style={s.progressBar}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={s.progressSegment(step === n, step > n)} />
        ))}
      </div>
      <div style={s.stepLabel}>
        <span>Loại hẹn</span><span>Thời gian</span><span>Địa điểm</span><span>Chi tiết</span>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>
            <span style={s.stepNum}>1</span>
            Chọn loại hẹn
          </div>
          <div style={s.typeGrid}>
            {dateTypes.map(t => (
              <div key={t.id} style={s.typeCard(dateType === t.id)} onClick={() => setDateType(t.id)}>
                <span aria-hidden="true" className="material-symbols-outlined" style={s.typeIcon(dateType === t.id)}>{t.icon}</span>
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
            Chọn ngày giờ
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
                <span aria-hidden="true" className="material-symbols-outlined" style={s.timeChipIcon(timeSlot === ts.id)}>{ts.icon}</span>
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
            Chọn địa điểm
          </div>
          <div style={s.venueCards}>
            {currentVenues.map(v => (
              <div key={v.id} style={s.venueCard(venue === v.id)} onClick={() => setVenue(v.id)}>
                <div style={s.venueIcon}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>place</span>
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
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>edit_location</span>
              </div>
              <div>
                <div style={s.venueName}>Tự chọn địa điểm</div>
                <div style={s.venueAddr}>Nhập địa điểm của bạn</div>
              </div>
            </div>
            {venue === 'custom' && (
              <input
                style={s.customInput}
                placeholder="Nhập tên địa điểm..."
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
            Chi tiết thêm
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ngân sách dự kiến</div>
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
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ghi chú đặc biệt</div>
            <textarea
              style={s.textarea}
              placeholder="Ví dụ: Người ấy thích hoa hồng, hoặc bị dị ứng hải sản..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div style={s.toggleRow}>
            <div style={s.toggleLabel}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E' }}>notifications_active</span>
              Thêm nhắc nhở
            </div>
            <button style={s.toggleSwitch(reminder)} onClick={() => setReminder(!reminder)}>
              <div style={s.toggleKnob(reminder)} />
            </button>
          </div>

          {/* Summary */}
          <div style={{ ...s.summaryCard, marginTop: 20 }}>
            <div style={s.summaryTitle}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E' }}>summarize</span>
              Tổng kết kế hoạch
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Loại hẹn</span>
              <span style={s.summaryValue}>{dateTypes.find(t => t.id === dateType)?.label || '—'}</span>
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Ngày</span>
              <span style={s.summaryValue}>{dateDate || '—'}</span>
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Khung giờ</span>
              <span style={s.summaryValue}>{timeSlots.find(t => t.id === timeSlot)?.label || '—'}</span>
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Địa điểm</span>
              <span style={s.summaryValue}>{getSelectedVenueName()}</span>
            </div>
            <div style={{ ...s.summaryRow, borderBottom: 'none' }}>
              <span style={s.summaryLabel}>Ngân sách</span>
              <span style={s.summaryValue}>{budgetLabels[budget]}</span>
            </div>
            <button style={s.ctaBtn}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
              Gửi lời mời
            </button>
          </div>
        </div>
      )}

      {/* Nav Buttons */}
      <div style={s.navBtns}>
        {step > 1 && (
          <button style={s.navBtn(false)} onClick={() => setStep(step - 1)}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            Quay lại
          </button>
        )}
        {step < 4 && (
          <button
            style={s.navBtn(true)}
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && !dateType}
          >
            Tiếp theo
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>
        )}
      </div>

      {/* Tips */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#FFB59E' }}>tips_and_updates</span>
          Mẹo hay
        </div>
        <div style={s.tipCards}>
          {currentTips.map((tip, i) => (
            <div key={i} style={s.tipCard}>
              <span aria-hidden="true" className="material-symbols-outlined" style={s.tipIcon}>lightbulb</span>
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
