import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const bookingData = {
  venue: 'The Loft Saigon',
  address: '26 Lý Tự Trọng, Q.1, TP.HCM',
  date: 'Thứ 7, 28/03/2026',
  time: '19:00',
  partySize: 2,
  bookingId: '#GOM-2024-0842',
};

const notices = [
  { icon: 'schedule', text: 'Đến trước 15 phút để đảm bảo chỗ ngồi' },
  { icon: 'cancel', text: 'Huỷ miễn phí trước 2 giờ so với giờ đặt' },
  { icon: 'checkroom', text: 'Dress code: Smart casual' },
];

const cancelPolicies = [
  'Huỷ trước 2 giờ: Miễn phí hoàn toàn',
  'Huỷ trước 1 giờ: Phí 50% giá trị đặt chỗ',
  'Huỷ dưới 1 giờ hoặc không đến: Mất toàn bộ tiền cọc',
  'Thay đổi thời gian: Miễn phí 1 lần, liên hệ trước 3 giờ',
];

const BookingConfirmPage = () => {
  const navigate = useNavigate();
  const [showCancel, setShowCancel] = useState(false);

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 32,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#FDF9F3',
      display: 'flex',
      alignItems: 'center',
    },
    headerTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 700,
      color: '#FDF9F3',
    },
    headerIcon: {
      fontSize: 28,
      color: '#FFB59E',
    },
    successSection: {
      textAlign: 'center',
      marginBottom: 32,
    },
    checkCircle: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      background: 'rgba(17, 117, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
    },
    checkIcon: {
      fontSize: 56,
      color: '#117500',
    },
    successText: {
      fontFamily: 'var(--font-headline)',
      fontSize: 24,
      fontWeight: 800,
      color: '#117500',
      marginBottom: 4,
    },
    successSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    card: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      padding: 24,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      marginBottom: 24,
    },
    detailRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    detailRowLast: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 0',
    },
    detailIcon: {
      fontSize: 22,
      color: '#FFB59E',
      flexShrink: 0,
    },
    detailLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
      marginBottom: 2,
    },
    detailValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    qrSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 16,
      paddingTop: 16,
      borderTop: '1px dashed rgba(255,255,255,0.08)',
    },
    qrBox: {
      width: 150,
      height: 150,
      borderRadius: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2A2A2A',
      marginBottom: 8,
    },
    qrIcon: {
      fontSize: 64,
      color: '#E6BEB2',
    },
    qrLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
    },
    noticeTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    noticeTitleIcon: {
      fontSize: 20,
      color: '#FFD54F',
    },
    noticeItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 14,
    },
    noticeIcon: {
      fontSize: 20,
      color: '#FFB59E',
      flexShrink: 0,
      marginTop: 1,
    },
    noticeText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
      lineHeight: 1.5,
    },
    actions: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 24,
    },
    primaryBtn: {
      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
      color: '#3A0B00',
      border: 'none',
      borderRadius: 9999,
      padding: '14px 24px',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    outlineBtn: {
      background: 'rgba(57,57,57,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: '#FFB59E',
      border: 'none',
      borderRadius: 9999,
      padding: '12px 24px',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    textLink: {
      background: 'none',
      border: 'none',
      color: '#FFB59E',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'underline',
      textAlign: 'center',
      padding: 8,
    },
    collapsible: {
      backgroundColor: '#1C1B1B',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      marginBottom: 24,
    },
    collapsibleHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      width: '100%',
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 600,
      color: '#FDF9F3',
    },
    chevron: {
      fontSize: 22,
      color: '#E6BEB2',
      transition: 'transform 0.2s',
    },
    collapsibleBody: {
      padding: '0 20px 16px',
    },
    policyItem: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: '#E6BEB2',
      lineHeight: 1.6,
      paddingLeft: 16,
      position: 'relative',
      marginBottom: 6,
    },
    policyBullet: {
      position: 'absolute',
      left: 0,
      top: 0,
      color: '#FFB59E',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
        </button>
        <span aria-hidden="true" className="material-symbols-outlined" style={s.headerIcon}>check_circle</span>
        <h1 style={s.headerTitle}>Xác nhận đặt chỗ</h1>
      </div>

      <div style={s.successSection}>
        <div style={s.checkCircle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.checkIcon}>check_circle</span>
        </div>
        <div style={s.successText}>Đã xác nhận!</div>
        <div style={s.successSub}>Đặt chỗ của bạn đã được xác nhận thành công</div>
      </div>

      <div style={s.card}>
        <div style={s.detailRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.detailIcon}>location_on</span>
          <div>
            <div style={s.detailLabel}>Địa điểm</div>
            <div style={s.detailValue}>{bookingData.venue}</div>
            <div style={{ ...s.detailLabel, marginTop: 2 }}>{bookingData.address}</div>
          </div>
        </div>
        <div style={s.detailRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.detailIcon}>calendar_today</span>
          <div>
            <div style={s.detailLabel}>Ngày</div>
            <div style={s.detailValue}>{bookingData.date}</div>
          </div>
        </div>
        <div style={s.detailRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.detailIcon}>schedule</span>
          <div>
            <div style={s.detailLabel}>Giờ</div>
            <div style={s.detailValue}>{bookingData.time}</div>
          </div>
        </div>
        <div style={s.detailRow}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.detailIcon}>group</span>
          <div>
            <div style={s.detailLabel}>Số người</div>
            <div style={s.detailValue}>{bookingData.partySize} người</div>
          </div>
        </div>
        <div style={s.detailRowLast}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.detailIcon}>confirmation_number</span>
          <div>
            <div style={s.detailLabel}>Mã đặt chỗ</div>
            <div style={s.detailValue}>{bookingData.bookingId}</div>
          </div>
        </div>
        <div style={s.qrSection}>
          <div style={s.qrBox}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.qrIcon}>qr_code_2</span>
          </div>
          <div style={s.qrLabel}>Xuất trình mã QR khi đến nhà hàng</div>
        </div>
      </div>

      <div style={s.card}>
        <div style={s.noticeTitle}>
          <span aria-hidden="true" className="material-symbols-outlined" style={s.noticeTitleIcon}>info</span>
          Lưu ý quan trọng
        </div>
        {notices.map((n, i) => (
          <div style={s.noticeItem} key={i}>
            <span aria-hidden="true" className="material-symbols-outlined" style={s.noticeIcon}>{n.icon}</span>
            <span style={s.noticeText}>{n.text}</span>
          </div>
        ))}
      </div>

      <div style={s.actions}>
        <button style={s.primaryBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>calendar_add_on</span>
          Thêm vào lịch
        </button>
        <button style={s.outlineBtn}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
          Chia sẻ
        </button>
        <button style={s.textLink}>Chỉnh sửa đặt chỗ</button>
      </div>

      <div style={s.collapsible}>
        <button style={s.collapsibleHeader} onClick={() => setShowCancel(!showCancel)}>
          <span>Chính sách huỷ</span>
          <span
            aria-hidden="true" className="material-symbols-outlined"
            style={{ ...s.chevron, transform: showCancel ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            expand_more
          </span>
        </button>
        {showCancel && (
          <div style={s.collapsibleBody}>
            {cancelPolicies.map((p, i) => (
              <div style={s.policyItem} key={i}>
                <span style={s.policyBullet}>•</span>
                {p}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmPage;
