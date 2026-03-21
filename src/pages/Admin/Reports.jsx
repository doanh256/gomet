import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Search, AlertTriangle, XCircle } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([
    { id: 1, reportedUser: 'Phạm D', reason: 'Tài khoản giả mạo', reporter: 'Nguyễn Văn A', date: '14/03/2024', status: 'Pending' },
    { id: 2, reportedUser: 'Lê Hoàng C', reason: 'Ngôn từ đả kích', reporter: 'Trần Thị B', date: '13/03/2024', status: 'Pending' },
    { id: 3, reportedUser: 'Trần Thị B', reason: 'Spam tin nhắn', reporter: 'Hương Thảo', date: '10/03/2024', status: 'Resolved' },
  ]);

  const handleResolve = (id, action) => {
    setReports(reports.map(r => {
      if (r.id === id) {
        alert(`Đã ${action === 'ban' ? 'Khóa tài khoản' : 'Bỏ qua báo cáo'} thành công!`);
        return { ...r, status: 'Resolved' };
      }
      return r;
    }));
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#111418' }}>Xử lý Báo cáo (Reports)</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {reports.map((report) => (
          <div key={report.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                backgroundColor: report.status === 'Pending' ? '#fff4e5' : '#e2f8ec', 
                color: report.status === 'Pending' ? '#eeb633' : '#1dda95',
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                {report.status === 'Pending' ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
              </div>
              
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>Tố cáo người dùng: {report.reportedUser}</h3>
                <p style={{ margin: '0 0 8px 0', color: '#fd5068', fontWeight: 500 }}>Lý do: {report.reason}</p>
                <p style={{ margin: 0, color: '#505965', fontSize: '14px' }}>Người báo cáo: {report.reporter} • {report.date}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              {report.status === 'Pending' ? (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                   <button onClick={() => handleResolve(report.id, 'dismiss')} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #e8e8e8', backgroundColor: 'white', color: '#505965', cursor: 'pointer', fontSize: '13px' }}>Bỏ qua</button>
                   <button onClick={() => handleResolve(report.id, 'ban')} style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#fd5068', color: 'white', cursor: 'pointer', fontSize: '13px' }}>Khóa TK</button>
                </div>
              ) : (
                <span style={{ color: '#1dda95', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={18} /> Đã xử lý</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reports;
