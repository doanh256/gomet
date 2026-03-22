import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockReports = [
  {
    id: 1,
    reporter: { name: 'Nguyen Van Tung', initial: 'T' },
    reported: { name: 'Pham Duc Manh', initial: 'M' },
    reason: 'Gui tin nhan quay roi lien tuc, ngon tu thieu ton trong',
    category: 'Quay roi',
    time: '2 gio truoc',
    status: 'pending',
  },
  {
    id: 2,
    reporter: { name: 'Le Hoang Mai', initial: 'M' },
    reported: { name: 'Tran Van Binh', initial: 'B' },
    reason: 'Su dung hinh anh cua nguoi khac, nghi ngo tai khoan gia mao',
    category: 'Gia mao',
    time: '5 gio truoc',
    status: 'pending',
  },
  {
    id: 3,
    reporter: { name: 'Tran Bao Ngoc', initial: 'N' },
    reported: { name: 'Vo Minh Tuan', initial: 'T' },
    reason: 'Dang noi dung khong phu hop trong phan gioi thieu',
    category: 'Noi dung khong phu hop',
    time: '1 ngay truoc',
    status: 'resolved',
  },
  {
    id: 4,
    reporter: { name: 'Dang Thi Huong', initial: 'H' },
    reported: { name: 'Ly Quoc Bao', initial: 'B' },
    reason: 'Gui lien ket spam lien tuc qua tin nhan',
    category: 'Spam',
    time: '1 ngay truoc',
    status: 'pending',
  },
  {
    id: 5,
    reporter: { name: 'Bui Van Khanh', initial: 'K' },
    reported: { name: 'Ho Ngoc Ha', initial: 'H' },
    reason: 'Nhan tin de doa va quay roi sau khi bi tu choi',
    category: 'Quay roi',
    time: '2 ngay truoc',
    status: 'rejected',
  },
  {
    id: 6,
    reporter: { name: 'Truong My Linh', initial: 'L' },
    reported: { name: 'Nguyen Thanh Son', initial: 'S' },
    reason: 'Profile co thong tin gia, tuoi va nghe nghiep khong dung',
    category: 'Gia mao',
    time: '3 ngay truoc',
    status: 'resolved',
  },
];

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState(mockReports);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Tat ca' },
    { key: 'pending', label: 'Cho xu ly' },
    { key: 'resolved', label: 'Da giai quyet' },
    { key: 'rejected', label: 'Tu choi' },
  ];

  const filteredReports = activeFilter === 'all'
    ? reports
    : reports.filter((r) => r.status === activeFilter);

  const totalReports = reports.length;
  const pendingCount = reports.filter((r) => r.status === 'pending').length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;

  const statCards = [
    { label: 'Tong bao cao', value: totalReports, icon: 'flag', color: 'var(--primary)' },
    { label: 'Cho xu ly', value: pendingCount, icon: 'pending', color: '#eeb633' },
    { label: 'Da giai quyet', value: resolvedCount, icon: 'check_circle', color: '#1dda95' },
  ];

  const statusConfig = {
    pending: { label: 'Cho xu ly', bg: '#fff4e5', color: '#eeb633' },
    resolved: { label: 'Da giai quyet', bg: '#e2f8ec', color: '#1dda95' },
    rejected: { label: 'Tu choi', bg: 'var(--surface-container-high)', color: 'var(--on-surface-variant)' },
  };

  const categoryColors = {
    'Quay roi': { bg: '#ffdad6', color: 'var(--error)' },
    'Gia mao': { bg: '#fff4e5', color: '#eeb633' },
    'Noi dung khong phu hop': { bg: '#e8def8', color: '#6366f1' },
    'Spam': { bg: 'var(--surface-container-high)', color: 'var(--on-surface-variant)' },
  };

  const handleResolve = (id) => {
    setReports(reports.map((r) => r.id === id ? { ...r, status: 'resolved' } : r));
  };

  const handleReject = (id) => {
    setReports(reports.map((r) => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--on-surface)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--error)' }}>flag</span>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-headline)' }}>
          Trung tam bao cao
        </h1>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: activeFilter === f.key ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
              background: activeFilter === f.key ? 'var(--primary-fixed)' : 'var(--surface-container-lowest)',
              color: activeFilter === f.key ? 'var(--primary)' : 'var(--on-surface-variant)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {statCards.map((s, i) => (
          <div key={i} style={{
            background: 'var(--surface-container-lowest)',
            borderRadius: 'var(--radius)',
            padding: '20px 24px',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '28px',
              color: s.color,
              background: 'var(--primary-fixed)',
              borderRadius: '12px',
              padding: '12px',
            }}>{s.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-headline)' }}>{s.value}</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--on-surface-variant)' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Report List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReports.map((report) => {
          const st = statusConfig[report.status];
          const cat = categoryColors[report.category] || categoryColors['Spam'];

          return (
            <div key={report.id} style={{
              background: 'var(--surface-container-lowest)',
              borderRadius: 'var(--radius)',
              padding: '24px',
              boxShadow: 'var(--card-shadow)',
            }}>
              {/* Top Row: Reporter + Status + Time */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}>
                    {report.reporter.initial}
                  </div>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{report.reporter.name}</span>
                    <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}> da bao cao</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{report.time}</span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: st.bg,
                    color: st.color,
                  }}>
                    {st.label}
                  </span>
                </div>
              </div>

              {/* Reported User */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
                padding: '12px 16px',
                background: 'var(--surface-container-low)',
                borderRadius: '12px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--tertiary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '13px',
                  flexShrink: 0,
                }}>
                  {report.reported.initial}
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>Nguoi bi bao cao: </span>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{report.reported.name}</span>
                </div>
              </div>

              {/* Reason */}
              <p style={{
                margin: '0 0 14px 0',
                fontSize: '14px',
                fontStyle: 'italic',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.5,
              }}>
                "{report.reason}"
              </p>

              {/* Category + Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: cat.bg,
                  color: cat.color,
                }}>
                  {report.category}
                </span>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {report.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleResolve(report.id)}
                        style={{
                          padding: '8px 20px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'var(--primary)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        Giai quyet
                      </button>
                      <button
                        onClick={() => handleReject(report.id)}
                        style={{
                          padding: '8px 20px',
                          borderRadius: '8px',
                          border: '1px solid var(--outline-variant)',
                          background: 'transparent',
                          color: 'var(--on-surface-variant)',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        Tu choi
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {}}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'underline',
                    }}
                  >
                    Xem chi tiet
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredReports.length === 0 && (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            color: 'var(--on-surface-variant)',
            background: 'var(--surface-container-lowest)',
            borderRadius: 'var(--radius)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '12px', opacity: 0.4 }}>inbox</span>
            Khong co bao cao nao trong muc nay
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
