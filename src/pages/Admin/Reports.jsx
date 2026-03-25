import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockReports = [
  { id: 1, reporter: { name: 'Nguyen Van Tung', initial: 'T' }, reported: { name: 'Pham Duc Manh', initial: 'M' }, reason: 'Gửi tin nhắn quấy rối liên tục, ngôn từ thiếu tôn trọng', category: 'Quấy rối', time: '2 giờ trước', status: 'pending' },
  { id: 2, reporter: { name: 'Le Hoang Mai', initial: 'M' }, reported: { name: 'Tran Van Binh', initial: 'B' }, reason: 'Sử dụng hình ảnh của người khác, nghi ngờ tài khoản giả mạo', category: 'Giả mạo', time: '5 giờ trước', status: 'pending' },
  { id: 3, reporter: { name: 'Tran Bao Ngoc', initial: 'N' }, reported: { name: 'Vo Minh Tuan', initial: 'T' }, reason: 'Đăng nội dung không phù hợp trong phần giới thiệu', category: 'Nội dung không phù hợp', time: '1 ngày trước', status: 'resolved' },
  { id: 4, reporter: { name: 'Dang Thi Huong', initial: 'H' }, reported: { name: 'Ly Quoc Bao', initial: 'B' }, reason: 'Gửi liên kết spam liên tục qua tin nhắn', category: 'Spam', time: '1 ngày trước', status: 'pending' },
  { id: 5, reporter: { name: 'Bui Van Khanh', initial: 'K' }, reported: { name: 'Ho Ngoc Ha', initial: 'H' }, reason: 'Nhắn tin đe dọa và quấy rối sau khi bị từ chối', category: 'Quấy rối', time: '2 ngày trước', status: 'rejected' },
  { id: 6, reporter: { name: 'Truong My Linh', initial: 'L' }, reported: { name: 'Nguyen Thanh Son', initial: 'S' }, reason: 'Profile có thông tin giả, tuổi và nghề nghiệp không đúng', category: 'Giả mạo', time: '3 ngày trước', status: 'resolved' },
];

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState(mockReports);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'pending', label: 'Chờ xử lý' },
    { key: 'resolved', label: 'Đã giải quyết' },
    { key: 'rejected', label: 'Từ chối' },
  ];

  const filteredReports = activeFilter === 'all' ? reports : reports.filter((r) => r.status === activeFilter);

  const totalReports = reports.length;
  const pendingCount = reports.filter((r) => r.status === 'pending').length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;

  const statCards = [
    { label: 'Tổng báo cáo', value: totalReports, icon: 'flag', color: '#FFB59E' },
    { label: 'Chờ xử lý', value: pendingCount, icon: 'pending', color: '#FFD54F' },
    { label: 'Đã giải quyết', value: resolvedCount, icon: 'check_circle', color: '#117500' },
  ];

  const statusConfig = {
    pending: { label: 'Chờ xử lý', bg: 'rgba(255,213,79,0.15)', color: '#FFD54F' },
    resolved: { label: 'Đã giải quyết', bg: 'rgba(17,117,0,0.15)', color: '#117500' },
    rejected: { label: 'Từ chối', bg: '#2A2A2A', color: '#E6BEB2' },
  };

  const categoryColors = {
    'Quấy rối': { bg: 'rgba(255,87,26,0.15)', color: '#FF571A' },
    'Giả mạo': { bg: 'rgba(255,213,79,0.15)', color: '#FFD54F' },
    'Nội dung không phù hợp': { bg: 'rgba(230,190,178,0.15)', color: '#E6BEB2' },
    'Spam': { bg: '#2A2A2A', color: '#E6BEB2' },
  };

  const handleResolve = (id) => { setReports(reports.map((r) => r.id === id ? { ...r, status: 'resolved' } : r)); };
  const handleReject = (id) => { setReports(reports.map((r) => r.id === id ? { ...r, status: 'rejected' } : r)); };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: '#FDF9F3' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '32px', color: '#FF571A' }}>flag</span>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-headline)' }}>Trung tâm báo cáo</h1>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{ padding: '8px 20px', borderRadius: '9999px', border: 'none', background: activeFilter === f.key ? '#FFB59E' : '#1C1B1B', color: activeFilter === f.key ? '#3A0B00' : '#E6BEB2', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}>{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {statCards.map((s, i) => (
          <div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '28px', color: s.color, background: '#2A2A2A', borderRadius: '12px', padding: '12px' }}>{s.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-headline)', color: '#FDF9F3' }}>{s.value}</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#E6BEB2' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReports.map((report) => {
          const st = statusConfig[report.status];
          const cat = categoryColors[report.category] || categoryColors['Spam'];
          return (
            <div key={report.id} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A0B00', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{report.reporter.initial}</div>
                  <div><span style={{ fontWeight: 600, fontSize: '14px' }}>{report.reporter.name}</span><span style={{ color: '#E6BEB2', fontSize: '14px' }}> đã báo cáo</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#E6BEB2' }}>{report.time}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '9999px', background: st.bg, color: st.color }}>{st.label}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', padding: '12px 16px', background: '#2A2A2A', borderRadius: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '9999px', background: '#353535', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FDF9F3', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{report.reported.initial}</div>
                <div><span style={{ fontSize: '12px', color: '#E6BEB2' }}>Người bị báo cáo: </span><span style={{ fontWeight: 600, fontSize: '14px' }}>{report.reported.name}</span></div>
              </div>
              <p style={{ margin: '0 0 14px 0', fontSize: '14px', fontStyle: 'italic', color: '#E6BEB2', lineHeight: 1.5 }}>"{report.reason}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 14px', borderRadius: '9999px', background: cat.bg, color: cat.color }}>{report.category}</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {report.status === 'pending' && (
                    <>
                      <button onClick={() => handleResolve(report.id)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: '#FFB59E', color: '#3A0B00', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Giải quyết</button>
                      <button onClick={() => handleReject(report.id)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: '#2A2A2A', color: '#E6BEB2', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Từ chối</button>
                    </>
                  )}
                  <button onClick={() => {}} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#FFB59E', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)', textDecoration: 'underline' }}>Xem chi tiết</button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredReports.length === 0 && (
          <div style={{ padding: '60px', textAlign: 'center', color: '#E6BEB2', background: '#1C1B1B', borderRadius: '1.5rem' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '12px', opacity: 0.4 }}>inbox</span>
            Không có báo cáo nào trong mục này
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
