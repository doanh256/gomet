import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatePlannerPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const venues = [
    {
      id: 'v1',
      name: 'The Artisan Table',
      tag: 'Khai vị & Khởi đầu',
      desc: 'Bắt đầu buổi tối với hương vị truyền thống tinh tế. Không gian ấm cúng, lý tưởng để phá tan sự ngại ngùng ban đầu.',
      icon: 'local_dining',
      gradient: 'linear-gradient(135deg, #ffdbd1 0%, #ffb5a0 100%)',
      iconColor: '#ad2c00',
      rating: '4.8',
      distance: '1.2km từ vị trí của bạn',
    },
    {
      id: 'v2',
      name: 'Aura Dining',
      tag: 'Món chính & Trò chuyện',
      desc: 'Điểm nhấn của đêm tiệc. Bữa tối sang trọng với những lát bít tết hảo hạng và rượu vang đỏ dưới ánh nến lung linh.',
      icon: 'restaurant',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      iconColor: '#ad2c00',
      rating: '4.9',
      distance: '15 phút di chuyển từ điểm trước',
    },
    {
      id: 'v3',
      name: 'Sky Bar',
      tag: 'Tráng miệng & Ngắm cảnh',
      desc: 'Kết thúc hoàn hảo tại tầng thượng. Thưởng thức cocktail thủ công và ngắm nhìn toàn cảnh thành phố về đêm.',
      icon: 'nightlife',
      gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      iconColor: '#005daa',
      rating: '4.7',
      distance: '10 phút di chuyển từ điểm trước',
    },
  ];

  const timeOptions = [
    { id: 'morning', label: 'Buổi sáng', sub: '8:00 – 11:00', icon: 'wb_sunny' },
    { id: 'afternoon', label: 'Buổi chiều', sub: '13:00 – 17:00', icon: 'routine' },
    { id: 'evening', label: 'Buổi tối', sub: '18:00 – 22:00', icon: 'nightlight' },
  ];

  const activities = [
    { id: 'a1', label: 'Ăn uống', icon: 'restaurant_menu' },
    { id: 'a2', label: 'Cà phê', icon: 'local_cafe' },
    { id: 'a3', label: 'Xem phim', icon: 'movie' },
    { id: 'a4', label: 'Dạo bộ', icon: 'directions_walk' },
    { id: 'a5', label: 'Triển lãm', icon: 'palette' },
    { id: 'a6', label: 'Âm nhạc', icon: 'music_note' },
  ];

  const steps = [
    { num: 1, label: 'Người ấy' },
    { num: 2, label: 'Địa điểm' },
    { num: 3, label: 'Thời gian' },
    { num: 4, label: 'Hoạt động' },
  ];

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#fcf9f8',
      fontFamily: "'Manrope', sans-serif",
      color: '#1c1b1b',
    },
    header: {
      background: '#fcf9f8',
      borderBottom: '1px solid #e7bdb2',
      padding: '0 24px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      position: 'sticky',
      top: 0,
      zIndex: 50,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      border: 'none',
      background: '#f0edec',
      color: '#1c1b1b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
    },
    headerTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 16,
      color: '#1c1b1b',
    },
    main: {
      maxWidth: 680,
      margin: '0 auto',
      padding: '32px 24px 80px',
    },
    heroLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: '#ad2c00',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 12,
    },
    heroTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      fontSize: 32,
      lineHeight: 1.2,
      color: '#1c1b1b',
      marginBottom: 10,
    },
    heroSub: {
      fontSize: 15,
      color: '#5d4038',
      lineHeight: 1.6,
      marginBottom: 32,
    },
    stepIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      marginBottom: 36,
    },
    stepItem: (active, done) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      flex: 1,
    }),
    stepCircle: (active, done) => ({
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: done ? '#ad2c00' : active ? '#ad2c00' : '#f0edec',
      color: done || active ? '#ffffff' : '#5d4038',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      transition: 'all 0.25s',
      position: 'relative',
      zIndex: 1,
    }),
    stepText: (active, done) => ({
      fontSize: 11,
      fontWeight: active || done ? 700 : 500,
      color: active || done ? '#ad2c00' : '#5d4038',
      letterSpacing: '0.02em',
    }),
    stepConnector: (done) => ({
      flex: 1,
      height: 2,
      background: done ? '#ad2c00' : '#e7bdb2',
      marginBottom: 18,
      transition: 'background 0.25s',
    }),
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 17,
      color: '#1c1b1b',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    sectionIcon: {
      fontSize: 20,
      color: '#ad2c00',
    },
    personInput: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '1rem',
      border: '1.5px solid #e7bdb2',
      background: '#ffffff',
      fontSize: 14,
      color: '#1c1b1b',
      fontFamily: "'Manrope', sans-serif",
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s',
    },
    personHint: {
      fontSize: 12,
      color: '#5d4038',
      marginTop: 8,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    venueTimeline: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    timelineLine: {
      position: 'absolute',
      left: 19,
      top: 24,
      bottom: 24,
      width: 2,
      background: '#e7bdb2',
      zIndex: 0,
    },
    venueRow: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      position: 'relative',
      zIndex: 1,
    },
    venueDot: (active) => ({
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: active ? '#ad2c00' : '#ffffff',
      border: active ? 'none' : '2px solid #e7bdb2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: active ? '0 4px 12px rgba(173,44,0,0.25)' : '0 2px 8px rgba(28,27,27,0.06)',
      transition: 'all 0.2s',
      cursor: 'pointer',
    }),
    venueDotIcon: (active) => ({
      fontSize: 18,
      color: active ? '#ffffff' : '#5d4038',
    }),
    venueCard: (active) => ({
      flex: 1,
      background: '#ffffff',
      border: active ? '2px solid #ad2c00' : '1.5px solid #e7bdb2',
      borderRadius: '1rem',
      padding: '16px 18px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: active
        ? '0 8px 24px rgba(173,44,0,0.12)'
        : '0 2px 8px rgba(28,27,27,0.04)',
    }),
    venueCardTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    venueTag: {
      fontSize: 10,
      fontWeight: 700,
      color: '#ad2c00',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    venueName: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 16,
      color: '#1c1b1b',
    },
    venueThumb: (gradient) => ({
      width: 56,
      height: 56,
      borderRadius: '0.75rem',
      background: gradient,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    venueDesc: {
      fontSize: 13,
      color: '#5d4038',
      lineHeight: 1.55,
      marginBottom: 10,
    },
    venueFooter: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    venueStat: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 12,
      fontWeight: 600,
      color: '#1c1b1b',
    },
    venueStatIcon: {
      fontSize: 14,
      color: '#5d4038',
    },
    timePicker: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    timeChip: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 18px',
      borderRadius: '1rem',
      border: active ? '2px solid #ad2c00' : '1.5px solid #e7bdb2',
      background: active ? '#ffdbd1' : '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: active ? '0 4px 14px rgba(173,44,0,0.1)' : 'none',
    }),
    timeChipIcon: (active) => ({
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: active ? '#ad2c00' : '#f0edec',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    timeChipIconSpan: (active) => ({
      fontSize: 20,
      color: active ? '#ffffff' : '#5d4038',
    }),
    timeChipLabel: (active) => ({
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 14,
      color: active ? '#ad2c00' : '#1c1b1b',
    }),
    timeChipSub: {
      fontSize: 12,
      color: '#5d4038',
      marginTop: 1,
    },
    timeChipCheck: (active) => ({
      marginLeft: 'auto',
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: active ? '#ad2c00' : 'transparent',
      border: active ? 'none' : '2px solid #e7bdb2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    }),
    activityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10,
    },
    activityChip: (active) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '14px 10px',
      borderRadius: '1rem',
      border: active ? '2px solid #ad2c00' : '1.5px solid #e7bdb2',
      background: active ? '#ffdbd1' : '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    activityChipIcon: (active) => ({
      fontSize: 24,
      color: active ? '#ad2c00' : '#5d4038',
    }),
    activityChipLabel: (active) => ({
      fontSize: 12,
      fontWeight: 600,
      color: active ? '#ad2c00' : '#1c1b1b',
      textAlign: 'center',
    }),
    navRow: {
      display: 'flex',
      gap: 12,
      marginTop: 36,
    },
    btnBack: {
      flex: 1,
      padding: '14px 0',
      borderRadius: '9999px',
      border: '1.5px solid #e7bdb2',
      background: '#ffffff',
      color: '#1c1b1b',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    btnNext: {
      flex: 2,
      padding: '14px 0',
      borderRadius: '9999px',
      border: 'none',
      background: '#ad2c00',
      color: '#ffffff',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      boxShadow: '0 4px 16px rgba(173,44,0,0.25)',
    },
    summaryCard: {
      background: '#ffffff',
      border: '1.5px solid #e7bdb2',
      borderRadius: '1.25rem',
      padding: '24px 22px',
      marginBottom: 24,
      boxShadow: '0 4px 20px rgba(28,27,27,0.06)',
    },
    summaryTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 17,
      color: '#1c1b1b',
      marginBottom: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    summaryRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      padding: '10px 0',
      borderBottom: '1px solid #f0edec',
    },
    summaryRowLast: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      padding: '10px 0',
    },
    summaryLabel: {
      fontSize: 12,
      color: '#5d4038',
      width: 90,
      flexShrink: 0,
      paddingTop: 1,
    },
    summaryValue: {
      fontSize: 13,
      fontWeight: 600,
      color: '#1c1b1b',
      flex: 1,
    },
    ctaCard: {
      background: '#ad2c00',
      borderRadius: '1.25rem',
      padding: '28px 24px',
      marginTop: 8,
      boxShadow: '0 12px 32px rgba(173,44,0,0.22)',
    },
    ctaTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 20,
      color: '#ffffff',
      marginBottom: 8,
    },
    ctaSub: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.8)',
      lineHeight: 1.5,
      marginBottom: 22,
    },
    ctaBtn: {
      width: '100%',
      padding: '16px 0',
      borderRadius: '9999px',
      border: 'none',
      background: '#ffffff',
      color: '#ad2c00',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 12,
      boxSizing: 'border-box',
    },
    ctaBtnSecondary: {
      width: '100%',
      padding: '14px 0',
      borderRadius: '9999px',
      border: '1.5px solid rgba(255,255,255,0.3)',
      background: 'transparent',
      color: '#ffffff',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxSizing: 'border-box',
    },
    ctaNote: {
      textAlign: 'center',
      fontSize: 10,
      color: 'rgba(255,255,255,0.55)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginTop: 14,
    },
    profileRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      marginTop: 20,
    },
    avatarA: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ffdbd1, #ffb5a0)',
      border: '3px solid #ad2c00',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    avatarB: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #d4e3ff, #a5c8ff)',
      border: '3px solid #ad2c00',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -14,
      zIndex: 1,
    },
    profileInfo: {
      marginLeft: 14,
    },
    profileName: {
      fontSize: 12,
      fontWeight: 700,
      color: '#ffffff',
    },
    profileStatus: {
      fontSize: 10,
      color: 'rgba(255,255,255,0.6)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  };

  const getVenueById = (id) => venues.find(v => v.id === id);
  const getTimeById = (id) => timeOptions.find(t => t.id === id);
  const getActivityById = (id) => activities.find(a => a.id === id);

  const renderStepIndicator = () => (
    <div style={styles.stepIndicator}>
      {steps.map((step, idx) => {
        const active = currentStep === step.num;
        const done = currentStep > step.num;
        return (
          <React.Fragment key={step.num}>
            <div style={styles.stepItem(active, done)}>
              <div style={styles.stepCircle(active, done)}>
                {done ? (
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
                ) : (
                  step.num
                )}
              </div>
              <span style={styles.stepText(active, done)}>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div style={styles.stepConnector(done)} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span className="material-symbols-outlined" style={styles.sectionIcon}>person_search</span>
        Bạn muốn hẹn hò với ai?
      </div>
      <input
        type="text"
        placeholder="Nhập tên người ấy..."
        value={selectedPerson}
        onChange={e => setSelectedPerson(e.target.value)}
        style={styles.personInput}
      />
      <div style={styles.personHint}>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#ad2c00' }}>info</span>
        GoMet sẽ gợi ý lộ trình dựa trên sở thích chung của hai bạn
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span className="material-symbols-outlined" style={styles.sectionIcon}>location_on</span>
        Chọn địa điểm
      </div>
      <div style={styles.venueTimeline}>
        <div style={styles.timelineLine} />
        {venues.map(v => {
          const active = selectedVenue === v.id;
          return (
            <div key={v.id} style={styles.venueRow} onClick={() => setSelectedVenue(v.id)}>
              <div style={styles.venueDot(active)}>
                <span className="material-symbols-outlined" style={styles.venueDotIcon(active)}>{v.icon}</span>
              </div>
              <div style={styles.venueCard(active)}>
                <div style={styles.venueCardTop}>
                  <div>
                    <div style={styles.venueTag}>{v.tag}</div>
                    <div style={styles.venueName}>{v.name}</div>
                  </div>
                  <div style={styles.venueThumb(v.gradient)}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24, color: v.iconColor }}>{v.icon}</span>
                  </div>
                </div>
                <div style={styles.venueDesc}>{v.desc}</div>
                <div style={styles.venueFooter}>
                  <span style={styles.venueStat}>
                    <span className="material-symbols-outlined" style={styles.venueStatIcon}>star</span>
                    {v.rating}
                  </span>
                  <span style={styles.venueStat}>
                    <span className="material-symbols-outlined" style={styles.venueStatIcon}>place</span>
                    {v.distance}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span className="material-symbols-outlined" style={styles.sectionIcon}>schedule</span>
        Chọn thời gian
      </div>
      <div style={styles.timePicker}>
        {timeOptions.map(t => {
          const active = selectedTime === t.id;
          return (
            <div key={t.id} style={styles.timeChip(active)} onClick={() => setSelectedTime(t.id)}>
              <div style={styles.timeChipIcon(active)}>
                <span className="material-symbols-outlined" style={styles.timeChipIconSpan(active)}>{t.icon}</span>
              </div>
              <div>
                <div style={styles.timeChipLabel(active)}>{t.label}</div>
                <div style={styles.timeChipSub}>{t.sub}</div>
              </div>
              <div style={styles.timeChipCheck(active)}>
                {active && (
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#ffffff' }}>check</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span className="material-symbols-outlined" style={styles.sectionIcon}>interests</span>
        Thêm hoạt động
      </div>
      <div style={styles.activityGrid}>
        {activities.map(a => {
          const active = selectedActivity === a.id;
          return (
            <div key={a.id} style={styles.activityChip(active)} onClick={() => setSelectedActivity(a.id)}>
              <span className="material-symbols-outlined" style={styles.activityChipIcon(active)}>{a.icon}</span>
              <span style={styles.activityChipLabel(active)}>{a.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ ...styles.summaryCard, marginTop: 28 }}>
        <div style={styles.summaryTitle}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#ad2c00' }}>summarize</span>
          Lộ trình hẹn hò của bạn
        </div>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Người ấy</span>
          <span style={styles.summaryValue}>{selectedPerson || '—'}</span>
        </div>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Địa điểm</span>
          <span style={styles.summaryValue}>{selectedVenue ? getVenueById(selectedVenue)?.name : '—'}</span>
        </div>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Thời gian</span>
          <span style={styles.summaryValue}>{selectedTime ? getTimeById(selectedTime)?.label : '—'}</span>
        </div>
        <div style={styles.summaryRowLast}>
          <span style={styles.summaryLabel}>Hoạt động</span>
          <span style={styles.summaryValue}>{selectedActivity ? getActivityById(selectedActivity)?.label : '—'}</span>
        </div>
      </div>

      <div style={styles.ctaCard}>
        <div style={styles.ctaTitle}>Hoàn tất kế hoạch?</div>
        <div style={styles.ctaSub}>
          Chúng tôi sẽ tự động đặt chỗ tại địa điểm bạn chọn và kết nối với trợ lý GoMet.
        </div>
        <button style={styles.ctaBtn} onClick={() => navigate('/app/chat')}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
          Xác nhận kế hoạch
        </button>
        <button style={styles.ctaBtnSecondary} onClick={() => setCurrentStep(1)}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
          Tùy chỉnh lại
        </button>
        <div style={styles.ctaNote}>Hủy miễn phí trước 2 tiếng</div>

        <div style={styles.profileRow}>
          <div style={styles.avatarA}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#ad2c00' }}>person</span>
          </div>
          <div style={styles.avatarB}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#005daa' }}>person</span>
          </div>
          <div style={styles.profileInfo}>
            <div style={styles.profileName}>Bạn & {selectedPerson || 'Người ấy'}</div>
            <div style={styles.profileStatus}>
              {selectedTime ? getTimeById(selectedTime)?.label : 'Sẵn sàng hẹn hò'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const canAdvance = () => {
    if (currentStep === 1) return selectedPerson.trim().length > 0;
    if (currentStep === 2) return selectedVenue !== null;
    if (currentStep === 3) return selectedTime !== null;
    return true;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        </button>
        <span style={styles.headerTitle}>Lên kế hoạch hẹn hò</span>
      </div>

      <div style={styles.main}>
        <div style={styles.heroLabel}>
          <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>favorite</span>
          Hành trình đang được tạo
        </div>
        <h1 style={styles.heroTitle}>
          Lộ trình Hẹn hò<br />
          <span style={{ color: '#d83900' }}>hoàn hảo cho bạn</span>
        </h1>
        <p style={styles.heroSub}>
          Chúng tôi sẽ tuyển chọn địa điểm phù hợp dựa trên sở thích của hai bạn. Chỉ vài bước để có một buổi hẹn đáng nhớ.
        </p>

        {renderStepIndicator()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        {currentStep < 4 && (
          <div style={styles.navRow}>
            {currentStep > 1 && (
              <button style={styles.btnBack} onClick={() => setCurrentStep(currentStep - 1)}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                Quay lại
              </button>
            )}
            <button
              style={{
                ...styles.btnNext,
                opacity: canAdvance() ? 1 : 0.45,
                cursor: canAdvance() ? 'pointer' : 'not-allowed',
              }}
              onClick={() => canAdvance() && setCurrentStep(currentStep + 1)}
            >
              Tiếp theo
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePlannerPage;
