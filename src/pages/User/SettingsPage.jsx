import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = {
  background: '#fcf9f8',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryFixed: '#ffdbd1',
  outlineVariant: '#e7bdb2',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
};

const Toggle = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    role="switch"
    aria-checked={checked}
    tabIndex={0}
    onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onChange(!checked)}
    style={{
      width: '44px',
      height: '24px',
      borderRadius: '12px',
      backgroundColor: checked ? '#117500' : '#ccc',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background-color 0.25s ease',
      flexShrink: 0,
      outline: 'none',
    }}
  >
    <div style={{
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      position: 'absolute',
      top: '3px',
      left: checked ? '23px' : '3px',
      transition: 'left 0.25s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
    }} />
  </div>
);

const SectionHeader = ({ icon, label }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: colors.onSurfaceVariant,
    fontFamily: "'Manrope', sans-serif",
    padding: '0 4px',
    marginBottom: '4px',
    marginTop: '8px',
  }}>
    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: colors.primary }}>{icon}</span>
    {label}
  </div>
);

const Card = ({ children }) => (
  <div style={{
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(28,27,27,0.06)',
  }}>
    {children}
  </div>
);

const Divider = () => (
  <div style={{ height: '1px', backgroundColor: colors.outlineVariant, margin: '0 20px' }} />
);

const SettingsRow = ({ icon, label, sublabel, action, onClick, chevron }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      cursor: onClick ? 'pointer' : 'default',
      gap: '12px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
      {icon && (
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          backgroundColor: colors.surfaceContainerHigh,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: colors.primary }}>{icon}</span>
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: '15px',
          fontWeight: 600,
          color: colors.onSurface,
          fontFamily: "'Manrope', sans-serif",
        }}>{label}</div>
        {sublabel && (
          <div style={{
            fontSize: '13px',
            color: colors.onSurfaceVariant,
            fontFamily: "'Manrope', sans-serif",
            marginTop: '2px',
          }}>{sublabel}</div>
        )}
      </div>
    </div>
    {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    {chevron && (
      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: colors.onSurfaceVariant, opacity: 0.5, flexShrink: 0 }}>chevron_right</span>
    )}
  </div>
);

const SettingsPage = () => {
  const navigate = useNavigate();

  const [toggles, setToggles] = useState({
    show_profile: true,
    show_location: false,
    show_activity: true,
    notifications_match: true,
    notifications_event: true,
    notifications_promo: false,
  });

  const setToggle = key => val => setToggles(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{
      flex: 1,
      backgroundColor: colors.background,
      overflowY: 'auto',
      minHeight: '100vh',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 20px 80px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <button
            onClick={() => navigate(-1)}
            aria-label="Quay lại"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: colors.surfaceContainerLow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: colors.onSurface }}>arrow_back</span>
          </button>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: colors.onSurface,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            margin: 0,
          }}>
            Cài đặt
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <SectionHeader icon="lock" label="Cài đặt quyền riêng tư" />
          <Card>
            <SettingsRow
              icon="person"
              label="Hiển thị hồ sơ"
              sublabel="Cho phép người khác tìm thấy bạn"
              action={<Toggle checked={toggles.show_profile} onChange={setToggle('show_profile')} />}
            />
            <Divider />
            <SettingsRow
              icon="location_on"
              label="Hiển thị vị trí"
              sublabel="Chia sẻ vị trí của bạn trên Radar"
              action={<Toggle checked={toggles.show_location} onChange={setToggle('show_location')} />}
            />
            <Divider />
            <SettingsRow
              icon="visibility"
              label="Hiển thị hoạt động"
              sublabel="Cho phép thấy trạng thái hoạt động"
              action={<Toggle checked={toggles.show_activity} onChange={setToggle('show_activity')} />}
            />
          </Card>

          <SectionHeader icon="notifications" label="Thông báo" />
          <Card>
            <SettingsRow
              icon="favorite"
              label="Lượt Match & Tin nhắn"
              sublabel="Thông báo khi có match hoặc tin mới"
              action={<Toggle checked={toggles.notifications_match} onChange={setToggle('notifications_match')} />}
            />
            <Divider />
            <SettingsRow
              icon="event"
              label="Sự kiện ẩm thực"
              sublabel="Nhận thông báo về sự kiện gần bạn"
              action={<Toggle checked={toggles.notifications_event} onChange={setToggle('notifications_event')} />}
            />
            <Divider />
            <SettingsRow
              icon="mail"
              label="Tin tức & Ưu đãi"
              sublabel="Email khuyến mãi và tin tức GoMet"
              action={<Toggle checked={toggles.notifications_promo} onChange={setToggle('notifications_promo')} />}
            />
          </Card>

          <SectionHeader icon="manage_accounts" label="Tài khoản" />
          <Card>
            <SettingsRow
              icon="key"
              label="Đổi mật khẩu"
              sublabel="Cập nhật mật khẩu bảo mật tài khoản"
              onClick={() => {}}
              chevron
            />
            <Divider />
            <SettingsRow
              icon="vibration"
              label="Xác thực 2 yếu tố"
              sublabel="Bảo mật bằng mã SMS hoặc ứng dụng"
              action={
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  borderRadius: '9999px',
                  fontFamily: "'Manrope', sans-serif",
                }}>Đã bật</span>
              }
              onClick={() => {}}
              chevron
            />
            <Divider />
            <SettingsRow
              icon="account_circle"
              label="Thông tin cá nhân"
              sublabel="Chỉnh sửa tên, ảnh đại diện, giới thiệu"
              onClick={() => navigate('/app/profile')}
              chevron
            />
          </Card>

          <SectionHeader icon="help_outline" label="Hỗ trợ" />
          <Card>
            <SettingsRow
              icon="quiz"
              label="Câu hỏi thường gặp"
              sublabel="Tìm câu trả lời cho thắc mắc của bạn"
              onClick={() => {}}
              chevron
            />
            <Divider />
            <SettingsRow
              icon="shield"
              label="Trung tâm an toàn"
              sublabel="Chính sách và hướng dẫn bảo mật"
              onClick={() => {}}
              chevron
            />
            <Divider />
            <SettingsRow
              icon="gavel"
              label="Điều khoản & Chính sách"
              sublabel="Điều khoản sử dụng và quyền riêng tư"
              onClick={() => {}}
              chevron
            />
          </Card>

          <div style={{ marginTop: '8px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: `2px solid ${colors.primary}`,
                backgroundColor: 'transparent',
                color: colors.primary,
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: "'Manrope', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = colors.primaryFixed; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
              Đăng xuất
            </button>
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '12px',
            color: colors.onSurfaceVariant,
            opacity: 0.5,
            fontFamily: "'Manrope', sans-serif",
            marginTop: '4px',
          }}>
            GoMet v1.0.0
          </p>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
