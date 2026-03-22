import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SystemHealth = () => {
  const navigate = useNavigate();
  const [overallOk] = useState(true);

  const services = [
    { name: 'API Server', uptime: 99.9, status: 'green' },
    { name: 'Database', uptime: 99.8, status: 'green' },
    { name: 'Socket.io', uptime: 99.5, status: 'green' },
    { name: 'CDN', uptime: 100, status: 'green' },
    { name: 'Email', uptime: 98.2, status: 'amber' },
    { name: 'Payment Gateway', uptime: 99.7, status: 'green' },
  ];

  const metrics = [
    { label: 'CPU', value: 45, color: '#2e7d32' },
    { label: 'Memory', value: 62, color: '#f9a825' },
    { label: 'Disk', value: 38, color: 'var(--primary)' },
  ];

  const errors = [
    { time: '14:32:05', severity: 'Error', msg: 'Database connection timeout - retried successfully after 3 attempts' },
    { time: '13:15:22', severity: 'Warning', msg: 'Email service response time exceeded 2s threshold' },
    { time: '12:45:10', severity: 'Info', msg: 'Scheduled backup completed - 2.3GB processed' },
    { time: '11:30:44', severity: 'Warning', msg: 'Memory usage spike detected on worker-3 (78%)' },
    { time: '10:12:33', severity: 'Error', msg: 'Failed to process payment webhook - invalid signature' },
  ];

  const maintenance = {
    title: 'Bao tri he thong dinh ky',
    date: '30/03/2026',
    time: '02:00 - 04:00',
    desc: 'Nang cap database engine va toi uu hieu suat server. Du kien downtime 30 phut.',
  };

  const statusDot = (status) => {
    const colors = { green: '#2e7d32', amber: '#f9a825', red: 'var(--error)' };
    return colors[status] || colors.green;
  };

  const sevStyle = (sev) => {
    switch (sev) {
      case 'Error': return { bg: '#fde8e8', text: 'var(--error)' };
      case 'Warning': return { bg: '#fff8e1', text: '#f9a825' };
      case 'Info': return { bg: '#e3f2fd', text: '#1565c0' };
      default: return { bg: 'var(--surface-container-high)', text: 'var(--on-surface-variant)' };
    }
  };

  const circleSize = 100;
  const strokeWidth = 10;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const s = {
    page: {
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '32px',
    },
    headerIcon: {
      fontSize: '32px',
      color: 'var(--primary)',
    },
    title: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    section: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '18px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: '16px',
    },
    overallCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius-lg)',
      padding: '32px',
      boxShadow: 'var(--editorial-shadow)',
      marginBottom: '32px',
    },
    overallCircle: (ok) => ({
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: ok ? '#2e7d3222' : 'var(--error-container)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    overallIcon: (ok) => ({
      fontSize: '40px',
      color: ok ? '#2e7d32' : 'var(--error)',
    }),
    overallText: (ok) => ({
      fontFamily: 'var(--font-headline)',
      fontSize: '22px',
      fontWeight: 700,
      color: ok ? '#2e7d32' : 'var(--error)',
    }),
    overallSub: {
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
      marginTop: '4px',
    },
    serviceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
    },
    serviceCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    serviceDot: (status) => ({
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: statusDot(status),
      flexShrink: 0,
    }),
    serviceName: {
      fontSize: '14px',
      fontWeight: 500,
      color: 'var(--on-surface)',
    },
    serviceUptime: {
      marginLeft: 'auto',
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    metricGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
    },
    metricCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
    },
    metricLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    metricValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 700,
    },
    logCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden',
    },
    logRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      borderBottom: '1px solid var(--outline-variant)',
    },
    logTime: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      fontFamily: 'monospace',
      width: '80px',
      flexShrink: 0,
    },
    sevChip: (sev) => {
      const c = sevStyle(sev);
      return {
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        background: c.bg,
        color: c.text,
        fontSize: '11px',
        fontWeight: 600,
        width: '70px',
        textAlign: 'center',
        flexShrink: 0,
      };
    },
    logMsg: {
      fontSize: '13px',
      color: 'var(--on-surface)',
      lineHeight: 1.4,
    },
    maintCard: {
      background: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
    },
    maintIcon: {
      fontSize: '32px',
      color: 'var(--primary)',
    },
    maintTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '16px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      marginBottom: '8px',
    },
    maintDate: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
      color: 'var(--on-surface-variant)',
      marginBottom: '6px',
    },
    maintDesc: {
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      lineHeight: 1.5,
      marginBottom: '12px',
    },
    maintBadge: {
      display: 'inline-block',
      padding: '4px 14px',
      borderRadius: 'var(--radius-full)',
      background: '#e8f5e9',
      color: '#2e7d32',
      fontSize: '12px',
      fontWeight: 600,
    },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>monitor_heart</span>
        <h1 style={s.title}>Tinh trang he thong</h1>
      </div>

      {/* Overall status */}
      <div style={s.overallCard}>
        <div style={s.overallCircle(overallOk)}>
          <span className="material-symbols-outlined" style={s.overallIcon(overallOk)}>
            {overallOk ? 'check_circle' : 'error'}
          </span>
        </div>
        <div>
          <div style={s.overallText(overallOk)}>
            {overallOk ? 'HOAT DONG TOT' : 'CO VAN DE'}
          </div>
          <div style={s.overallSub}>
            Tat ca dich vu dang hoat dong binh thuong. Cap nhat luc 14:35 hom nay.
          </div>
        </div>
      </div>

      {/* Service status grid */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Trang thai dich vu</h2>
        <div style={s.serviceGrid}>
          {services.map((sv, i) => (
            <div key={i} style={s.serviceCard}>
              <div style={s.serviceDot(sv.status)} />
              <div style={s.serviceName}>{sv.name}</div>
              <div style={s.serviceUptime}>{sv.uptime}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hieu suat */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Hieu suat</h2>
        <div style={s.metricGrid}>
          {metrics.map((m, i) => {
            const offset = circumference - (m.value / 100) * circumference;
            return (
              <div key={i} style={s.metricCard}>
                <div style={{ position: 'relative', width: circleSize, height: circleSize }}>
                  <svg width={circleSize} height={circleSize} style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      r={radius}
                      fill="none"
                      stroke="var(--surface-container-high)"
                      strokeWidth={strokeWidth}
                    />
                    <circle
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      r={radius}
                      fill="none"
                      stroke={m.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                    />
                  </svg>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    ...s.metricValue,
                    color: m.color,
                  }}>
                    {m.value}%
                  </div>
                </div>
                <div style={s.metricLabel}>{m.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nhat ky loi gan day */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Nhat ky loi gan day</h2>
        <div style={s.logCard}>
          {errors.map((err, i) => (
            <div key={i} style={{
              ...s.logRow,
              borderBottom: i === errors.length - 1 ? 'none' : '1px solid var(--outline-variant)',
            }}>
              <div style={s.logTime}>{err.time}</div>
              <span style={s.sevChip(err.severity)}>{err.severity}</span>
              <div style={s.logMsg}>{err.msg}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bao tri */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Bao tri</h2>
        <div style={s.maintCard}>
          <span className="material-symbols-outlined" style={s.maintIcon}>calendar_month</span>
          <div>
            <div style={s.maintTitle}>{maintenance.title}</div>
            <div style={s.maintDate}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>event</span>
              {maintenance.date} | {maintenance.time}
            </div>
            <div style={s.maintDesc}>{maintenance.desc}</div>
            <span style={s.maintBadge}>Da len lich</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
