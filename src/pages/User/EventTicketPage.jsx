import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ticketData = {
  eventLabel: 'GOMET EVENT',
  eventName: 'Dem Nhac Acoustic & Wine Tasting',
  date: 'Thu 7, 28/03/2026',
  time: '19:00 - 22:00',
  venue: 'The Loft Saigon',
  address: '26 Ly Tu Trong, Q.1, TP.HCM',
  ticketId: 'GOM-TK-2026-0842',
  seat: 'Ban VIP 03',
  guestName: 'Nguyen Minh Anh',
  ticketType: 'VIP',
};

const EventTicketPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: 'var(--inverse-surface)',
      padding: '24px 20px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    topBar: {
      width: '100%',
      maxWidth: 420,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    backBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--inverse-on-surface)',
      display: 'flex',
      alignItems: 'center',
    },
    topTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--inverse-on-surface)',
    },
    placeholder: { width: 24 },
    ticket: {
      width: '100%',
      maxWidth: 420,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
    },
    ticketTop: {
      background: 'var(--primary-gradient)',
      padding: '20px 24px 16px',
      textAlign: 'center',
    },
    eventLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      color: 'var(--on-primary)',
      opacity: 0.8,
      marginBottom: 8,
    },
    eventName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--on-primary)',
      lineHeight: 1.3,
    },
    ticketBody: {
      padding: '24px 24px 20px',
      textAlign: 'center',
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 8,
    },
    infoIcon: {
      fontSize: 18,
      color: 'var(--primary)',
    },
    infoText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface)',
    },
    infoSub: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      marginBottom: 20,
    },
    qrBox: {
      width: 200,
      height: 200,
      border: '2px dashed var(--outline-variant)',
      borderRadius: 'var(--radius)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 12px',
      backgroundColor: 'var(--surface-container-low)',
    },
    qrIcon: {
      fontSize: 80,
      color: 'var(--on-surface-variant)',
    },
    scanLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
      marginBottom: 20,
    },
    divider: {
      borderTop: '2px dashed var(--outline-variant)',
      margin: '0 -24px',
      position: 'relative',
    },
    dividerNotch: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: 'var(--inverse-surface)',
      position: 'absolute',
      top: -12,
    },
    ticketDetails: {
      padding: '20px 24px 24px',
    },
    detailGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
    },
    detailItem: {
      textAlign: 'left',
    },
    detailLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--on-surface-variant)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    detailValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    typeBadge: {
      display: 'inline-block',
      padding: '3px 12px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-headline)',
      fontSize: 12,
      fontWeight: 700,
    },
    actions: {
      width: '100%',
      maxWidth: 420,
      display: 'flex',
      gap: 12,
      marginTop: 24,
    },
    actionBtn: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '14px 16px',
      borderRadius: 'var(--radius-full)',
      border: '2px solid var(--inverse-on-surface)',
      background: 'none',
      color: 'var(--inverse-on-surface)',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      cursor: 'pointer',
    },
    brightnessHint: {
      width: '100%',
      maxWidth: 420,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 20,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--inverse-on-surface)',
      opacity: 0.6,
    },
  };

  return (
    <div style={s.page}>
      <div style={s.topBar}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span style={s.topTitle}>Ve su kien</span>
        <div style={s.placeholder} />
      </div>

      <div style={s.ticket}>
        <div style={s.ticketTop}>
          <div style={s.eventLabel}>{ticketData.eventLabel}</div>
          <div style={s.eventName}>{ticketData.eventName}</div>
        </div>

        <div style={s.ticketBody}>
          <div style={s.infoRow}>
            <span className="material-symbols-outlined" style={s.infoIcon}>calendar_today</span>
            <span style={s.infoText}>{ticketData.date}</span>
          </div>
          <div style={s.infoRow}>
            <span className="material-symbols-outlined" style={s.infoIcon}>schedule</span>
            <span style={s.infoText}>{ticketData.time}</span>
          </div>
          <div style={s.infoRow}>
            <span className="material-symbols-outlined" style={s.infoIcon}>location_on</span>
            <span style={s.infoText}>{ticketData.venue}</span>
          </div>
          <div style={s.infoSub}>{ticketData.address}</div>

          <div style={s.qrBox}>
            <span className="material-symbols-outlined" style={s.qrIcon}>qr_code_2</span>
          </div>
          <div style={s.scanLabel}>Quet ma de check-in</div>
        </div>

        <div style={s.divider}>
          <div style={{ ...s.dividerNotch, left: -12 }} />
          <div style={{ ...s.dividerNotch, right: -12 }} />
        </div>

        <div style={s.ticketDetails}>
          <div style={s.detailGrid}>
            <div style={s.detailItem}>
              <div style={s.detailLabel}>Ma ve</div>
              <div style={s.detailValue}>{ticketData.ticketId}</div>
            </div>
            <div style={s.detailItem}>
              <div style={s.detailLabel}>Ban / Cho ngoi</div>
              <div style={s.detailValue}>{ticketData.seat}</div>
            </div>
            <div style={s.detailItem}>
              <div style={s.detailLabel}>Khach</div>
              <div style={s.detailValue}>{ticketData.guestName}</div>
            </div>
            <div style={s.detailItem}>
              <div style={s.detailLabel}>Loai ve</div>
              <div><span style={s.typeBadge}>{ticketData.ticketType}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div style={s.actions}>
        <button style={s.actionBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span>
          Luu ve
        </button>
        <button style={s.actionBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
          Chia se ve
        </button>
      </div>

      <div style={s.brightnessHint}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>brightness_high</span>
        Tang do sang man hinh de quet ma
      </div>
    </div>
  );
};

export default EventTicketPage;
