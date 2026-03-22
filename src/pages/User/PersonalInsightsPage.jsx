import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const overviewStats = [
  { icon: 'calendar_today', label: 'Buoi hen', value: '12' },
  { icon: 'favorite', label: 'Match', value: '45' },
  { icon: 'reply', label: 'Ty le phan hoi', value: '82%' },
  { icon: 'toll', label: 'Diem karma', value: '850' },
];

const weeklyData = [
  { day: 'T2', value: 60 },
  { day: 'T3', value: 85 },
  { day: 'T4', value: 40 },
  { day: 'T5', value: 95 },
  { day: 'T6', value: 70 },
  { day: 'T7', value: 100 },
  { day: 'CN', value: 55 },
];

const datingTraits = [
  { label: 'Am thuc', pct: 75, icon: 'restaurant' },
  { label: 'Nghe thuat', pct: 45, icon: 'palette' },
  { label: 'Phieu luu', pct: 60, icon: 'hiking' },
];

const bestMatches = [
  { icon: 'restaurant', label: 'Am thuc & nha hang', score: '92%' },
  { icon: 'music_note', label: 'Am nhac & giai tri', score: '87%' },
  { icon: 'local_cafe', label: 'Ca phe & tro chuyen', score: '81%' },
];

const improvementTips = [
  { text: 'Them anh hoat dong ngoai troi de tang 30% luot xem ho so.' },
  { text: 'Tra loi tin nhan trong 2 gio de tang diem karma.' },
  { text: 'Cap nhat so thich moi de GOMET goi y chinh xac hon.' },
];

const monthlyTrends = [
  { label: 'Buoi hen', current: 12, prev: 8, up: true },
  { label: 'Match moi', current: 45, prev: 52, up: false },
  { label: 'Tin nhan', current: 128, prev: 95, up: true },
];

const PersonalInsightsPage = () => {
  const navigate = useNavigate();
  const [activeTab] = useState('week');

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 28,
    },
    headerIcon: {
      fontSize: 48,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 6,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--on-surface)',
      marginBottom: 14,
      marginTop: 32,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 12,
      marginBottom: 8,
    },
    statCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px 16px',
      textAlign: 'center',
      boxShadow: 'var(--card-shadow)',
    },
    statIcon: {
      fontSize: 28,
      color: 'var(--primary)',
      marginBottom: 8,
    },
    statValue: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--on-surface)',
      marginBottom: 4,
    },
    statLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    chartContainer: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px 16px',
      boxShadow: 'var(--card-shadow)',
    },
    chartRow: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 140,
      gap: 8,
    },
    barCol: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    },
    barTrack: {
      width: '100%',
      height: 120,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 8,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
    },
    barFill: {
      width: '100%',
      background: 'var(--primary-gradient)',
      borderRadius: 8,
      transition: 'height 0.5s ease',
    },
    barLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--on-surface-variant)',
      fontWeight: 600,
    },
    traitCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '16px 18px',
      marginBottom: 10,
      boxShadow: 'var(--card-shadow)',
    },
    traitHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    traitLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    traitIcon: {
      fontSize: 22,
      color: 'var(--primary)',
    },
    traitLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    traitPct: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--primary)',
    },
    progressTrack: {
      height: 8,
      backgroundColor: 'var(--surface-container-high)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-full)',
      transition: 'width 0.6s ease',
    },
    matchCard: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '14px 18px',
      marginBottom: 10,
      boxShadow: 'var(--card-shadow)',
    },
    matchIcon: {
      fontSize: 24,
      color: 'var(--on-primary)',
      width: 44,
      height: 44,
      borderRadius: 'var(--radius)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    matchLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--on-surface)',
    },
    matchScore: {
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 800,
      color: 'var(--primary)',
      marginLeft: 'auto',
    },
    tipCard: {
      display: 'flex',
      gap: 12,
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '16px 18px',
      marginBottom: 10,
      boxShadow: 'var(--card-shadow)',
    },
    tipIcon: {
      fontSize: 22,
      color: 'var(--tertiary)',
      flexShrink: 0,
      marginTop: 2,
    },
    tipText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface)',
      lineHeight: 1.5,
    },
    trendCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '14px 18px',
      marginBottom: 10,
      boxShadow: 'var(--card-shadow)',
    },
    trendLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--on-surface-variant)',
    },
    trendValues: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    trendCurrent: {
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 800,
      color: 'var(--on-surface)',
    },
    trendPrev: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--on-surface-variant)',
    },
    trendArrow: {
      fontSize: 20,
    },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>insights</span>
        <h1 style={s.heading}>Thau hieu trai nghiem</h1>
      </div>

      {/* Overview Stats */}
      <div style={s.sectionTitle}>Tong quan</div>
      <div style={s.statsGrid}>
        {overviewStats.map((stat, i) => (
          <div key={i} style={s.statCard}>
            <span className="material-symbols-outlined" style={s.statIcon}>{stat.icon}</span>
            <div style={s.statValue}>{stat.value}</div>
            <div style={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <div style={s.sectionTitle}>Hoat dong hang tuan</div>
      <div style={s.chartContainer}>
        <div style={s.chartRow}>
          {weeklyData.map((d, i) => (
            <div key={i} style={s.barCol}>
              <div style={s.barTrack}>
                <div style={{ ...s.barFill, height: `${d.value}%` }} />
              </div>
              <div style={s.barLabel}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dating Traits */}
      <div style={s.sectionTitle}>Kieu hen ho cua ban</div>
      {datingTraits.map((trait, i) => (
        <div key={i} style={s.traitCard}>
          <div style={s.traitHeader}>
            <div style={s.traitLeft}>
              <span className="material-symbols-outlined" style={s.traitIcon}>{trait.icon}</span>
              <span style={s.traitLabel}>{trait.label}</span>
            </div>
            <span style={s.traitPct}>{trait.pct}%</span>
          </div>
          <div style={s.progressTrack}>
            <div style={{ ...s.progressFill, width: `${trait.pct}%` }} />
          </div>
        </div>
      ))}

      {/* Best Compatibility */}
      <div style={s.sectionTitle}>Tuong thich tot nhat</div>
      {bestMatches.map((m, i) => (
        <div key={i} style={s.matchCard}>
          <div style={s.matchIcon}>
            <span className="material-symbols-outlined">{m.icon}</span>
          </div>
          <span style={s.matchLabel}>{m.label}</span>
          <span style={s.matchScore}>{m.score}</span>
        </div>
      ))}

      {/* Improvement Tips */}
      <div style={s.sectionTitle}>Goi y cai thien</div>
      {improvementTips.map((tip, i) => (
        <div key={i} style={s.tipCard}>
          <span className="material-symbols-outlined" style={s.tipIcon}>lightbulb</span>
          <span style={s.tipText}>{tip.text}</span>
        </div>
      ))}

      {/* Monthly Trends */}
      <div style={s.sectionTitle}>Xu huong cua ban</div>
      <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
        Thang nay vs thang truoc
      </div>
      {monthlyTrends.map((t, i) => (
        <div key={i} style={s.trendCard}>
          <span style={s.trendLabel}>{t.label}</span>
          <div style={s.trendValues}>
            <span style={s.trendCurrent}>{t.current}</span>
            <span style={s.trendPrev}>/ {t.prev}</span>
            <span
              className="material-symbols-outlined"
              style={{
                ...s.trendArrow,
                color: t.up ? '#2e7d32' : 'var(--error)',
              }}
            >
              {t.up ? 'trending_up' : 'trending_down'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalInsightsPage;
