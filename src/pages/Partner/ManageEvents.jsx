import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageEvents = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const colors = {
    background: '#fcf9f8',
    surfaceLowest: '#ffffff',
    surface: '#fcf9f8',
    surfaceContainerLow: '#f6f3f2',
    surfaceContainer: '#f0edec',
    surfaceContainerHigh: '#ebe7e7',
    onSurface: '#1c1b1b',
    onSurfaceVariant: '#5d4038',
    primary: '#ad2c00',
    primaryFixed: '#ffdbd1',
    primaryFixedDim: '#ffb5a0',
    outlineVariant: '#e7bdb2',
    outline: '#926f66',
    error: '#ba1a1a',
    tertiary: '#005daa',
    onPrimary: '#ffffff',
  };

  const fonts = {
    headline: "'Plus Jakarta Sans', sans-serif",
    body: "'Manrope', sans-serif",
  };

  const events = [
    {
      id: 1,
      name: 'Festival Ẩm Thực Mùa Hè',
      date: '15 Th08, 2026',
      time: '17:00 - 22:00',
      venue: 'Velvet Bistro - Khu vườn',
      attendees: 120,
      maxAttendees: 150,
      status: 'upcoming',
      revenue: '45.000.000',
      gradient: 'linear-gradient(135deg, #ff7852 0%, #ad2c00 100%)',
      icon: 'celebration',
    },
    {
      id: 2,
      name: 'Speed Dating - Singles Mixer',
      date: '22/03/2026',
      time: '18:00 - 21:00',
      venue: 'Velvet Bistro - Khu vườn',
      attendees: 36,
      maxAttendees: 36,
      status: 'ongoing',
      revenue: '5.400.000',
      gradient: 'linear-gradient(135deg, #5d4038 0%, #ad2c00 60%, #ff7852 100%)',
      icon: 'favorite',
    },
    {
      id: 3,
      name: 'Blind Soup Date',
      date: '22 Th08, 2026',
      time: '19:00 - 22:00',
      venue: 'Maison de L\'Art - Q.1',
      attendees: 12,
      maxAttendees: 24,
      status: 'upcoming',
      revenue: '12.500.000',
      gradient: 'linear-gradient(135deg, #005daa 0%, #0075d5 100%)',
      icon: 'restaurant',
    },
    {
      id: 4,
      name: 'Jazz & Cocktails Evening',
      date: '15/03/2026',
      time: '20:00 - 23:00',
      venue: 'Velvet Bistro - Sân thượng',
      attendees: 45,
      maxAttendees: 50,
      status: 'ended',
      revenue: '8.100.000',
      gradient: 'linear-gradient(135deg, #3b0900 0%, #5d4038 100%)',
      icon: 'music_note',
    },
  ];

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'upcoming', label: 'Sắp diễn ra' },
    { key: 'ongoing', label: 'Đang diễn ra' },
    { key: 'ended', label: 'Đã kết thúc' },
  ];

  const statusConfig = {
    upcoming: { label: 'Sắp diễn ra', bg: colors.primaryFixed, color: '#872000', dot: false },
    ongoing: { label: 'Đang diễn ra', bg: '#e6f4ea', color: '#1e6e3e', dot: true },
    ended: { label: 'Đã kết thúc', bg: colors.surfaceContainerHigh, color: colors.onSurfaceVariant, dot: false },
  };

  const filtered = activeFilter === 'all' ? events : events.filter(e => e.status === activeFilter);

  const totalEvents = events.length;
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);
  const totalRevenue = events.reduce((sum, e) => sum + parseFloat(e.revenue.replace(/\./g, '')), 0);

  const pulseKeyframes = `
    @keyframes pulseDot {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.4); }
      100% { opacity: 1; transform: scale(1); }
    }
  `;

  return (
    <div style={{ minHeight: '100vh', background: colors.background, fontFamily: fonts.body, color: colors.onSurface }}>
      <style>{pulseKeyframes}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 64px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <button
            onClick={() => navigate('/partner')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40, borderRadius: '9999px', border: 'none',
              background: colors.surfaceContainerHigh, color: colors.onSurfaceVariant,
              cursor: 'pointer', transition: 'background 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = colors.outlineVariant}
            onMouseLeave={e => e.currentTarget.style.background = colors.surfaceContainerHigh}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: fonts.headline, fontSize: 36, fontWeight: 800,
              letterSpacing: '-0.02em', margin: 0, color: colors.onSurface, lineHeight: 1.1,
            }}>
              Quản lý sự kiện
            </h1>
            <p style={{ margin: '4px 0 0', color: colors.onSurfaceVariant, fontSize: 15, fontWeight: 500 }}>
              Thiết kế và điều phối các trải nghiệm ẩm thực tinh hoa của bạn.
            </p>
          </div>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: '9999px', border: 'none',
              background: colors.primary, color: colors.onPrimary,
              fontFamily: fonts.body, fontSize: 14, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
              boxShadow: '0 4px 24px rgba(173,44,0,0.2)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d83900'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Tạo sự kiện mới
          </button>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32,
        }}>
          {[
            { icon: 'event', label: 'Tổng sự kiện', value: totalEvents, suffix: 'sự kiện', color: colors.primary },
            { icon: 'group', label: 'Tổng người tham dự', value: totalAttendees, suffix: 'người', color: colors.tertiary },
            { icon: 'payments', label: 'Tổng doanh thu', value: '₫' + (totalRevenue / 1000).toFixed(0) + 'k', suffix: '', color: '#1e6e3e' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: colors.surfaceLowest, borderRadius: '1rem',
              padding: '24px', border: `1px solid ${colors.outlineVariant}`,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '9999px',
                background: colors.primaryFixed, display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: stat.color }}>{stat.icon}</span>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: fonts.headline, fontSize: 26, fontWeight: 800, color: colors.onSurface, lineHeight: 1 }}>
                  {stat.value}
                  {stat.suffix && <span style={{ fontSize: 13, fontWeight: 500, color: colors.onSurfaceVariant, marginLeft: 4 }}>{stat.suffix}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: '8px 20px', borderRadius: '9999px', border: 'none',
                background: activeFilter === f.key ? colors.primary : colors.surfaceContainerHigh,
                color: activeFilter === f.key ? colors.onPrimary : colors.onSurfaceVariant,
                fontFamily: fonts.body, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (activeFilter !== f.key) e.currentTarget.style.background = colors.outlineVariant;
              }}
              onMouseLeave={e => {
                if (activeFilter !== f.key) e.currentTarget.style.background = colors.surfaceContainerHigh;
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: colors.onSurfaceVariant }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: colors.outlineVariant, display: 'block', marginBottom: 16 }}>event_busy</span>
            <div style={{ fontFamily: fonts.headline, fontSize: 20, fontWeight: 700, marginBottom: 8, color: colors.onSurface }}>Không có sự kiện nào</div>
            <div style={{ fontSize: 14 }}>Không tìm thấy sự kiện trong mục này.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((event, idx) => {
              const pct = Math.round((event.attendees / event.maxAttendees) * 100);
              const sc = statusConfig[event.status];
              const isHovered = hoveredCard === event.id;
              return (
                <div
                  key={event.id}
                  style={{
                    background: colors.surfaceLowest, borderRadius: '1.25rem',
                    overflow: 'hidden', display: 'flex',
                    border: isHovered ? `1px solid ${colors.outlineVariant}` : `1px solid transparent`,
                    boxShadow: isHovered ? '0 8px 32px rgba(28,27,27,0.10)' : '0 1px 4px rgba(28,27,27,0.04)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={() => setHoveredCard(event.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{
                    width: 180, minHeight: 180, background: event.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, position: 'relative',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 52, color: 'rgba(255,255,255,0.4)' }}>{event.icon}</span>
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: '9999px',
                      fontSize: 11, fontWeight: 700,
                      background: sc.bg, color: sc.color,
                      letterSpacing: '0.03em',
                    }}>
                      {sc.dot && (
                        <span style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: '#1e6e3e',
                          animation: 'pulseDot 1.5s infinite',
                          display: 'inline-block', flexShrink: 0,
                        }} />
                      )}
                      {sc.label}
                    </div>
                  </div>

                  <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <h3 style={{
                        fontFamily: fonts.headline, fontSize: 20, fontWeight: 700,
                        margin: '0 0 8px', color: colors.onSurface,
                      }}>
                        {event.name}
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: colors.onSurfaceVariant }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 15, color: colors.outlineVariant }}>calendar_today</span>
                          {event.date} | {event.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: colors.onSurfaceVariant }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 15, color: colors.outlineVariant }}>location_on</span>
                          {event.venue}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.onSurfaceVariant }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: colors.outlineVariant }}>group</span>
                          {event.attendees}/{event.maxAttendees} khách
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: pct >= 90 ? colors.primary : colors.onSurfaceVariant }}>
                          {pct}%
                        </span>
                      </div>
                      <div style={{ width: '100%', height: 6, borderRadius: '9999px', background: colors.surfaceContainer, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '9999px',
                          width: `${pct}%`,
                          background: event.status === 'ended' ? colors.outlineVariant : event.status === 'ongoing' ? '#1e6e3e' : colors.primary,
                          transition: 'width 0.3s',
                        }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: fonts.headline, fontSize: 18, fontWeight: 800, color: colors.primary }}>
                          ₫{event.revenue}
                          <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 500, color: colors.onSurfaceVariant, marginLeft: 6 }}>doanh thu</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {[
                          { key: `edit-${event.id}`, icon: 'edit', label: 'Chỉnh sửa', variant: 'default' },
                          { key: `view-${event.id}`, icon: 'visibility', label: 'Xem chi tiết', variant: 'default' },
                          ...(event.status !== 'ended' ? [{ key: `cancel-${event.id}`, icon: 'cancel', label: 'Hủy', variant: 'error' }] : []),
                        ].map(btn => (
                          <button
                            key={btn.key}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 5,
                              padding: '7px 14px', borderRadius: '9999px', border: 'none',
                              background: btn.variant === 'error'
                                ? (hoveredBtn === btn.key ? '#ffdad6' : 'rgba(186,26,26,0.08)')
                                : (hoveredBtn === btn.key ? colors.surfaceContainerHigh : colors.surfaceContainerLow),
                              color: btn.variant === 'error' ? colors.error : colors.onSurface,
                              fontFamily: fonts.body, fontSize: 12, fontWeight: 600,
                              cursor: 'pointer', transition: 'background 0.15s',
                            }}
                            onMouseEnter={() => setHoveredBtn(btn.key)}
                            onMouseLeave={() => setHoveredBtn(null)}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{btn.icon}</span>
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        style={{
          position: 'fixed', bottom: 32, right: 32,
          width: 56, height: 56, borderRadius: '9999px',
          border: 'none', background: colors.primary, color: colors.onPrimary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.15s',
          boxShadow: '0 8px 32px rgba(173,44,0,0.28)',
          zIndex: 50,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.background = '#d83900'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = colors.primary; }}
        title="Tạo sự kiện mới"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>add</span>
      </button>
    </div>
  );
};

export default ManageEvents;
