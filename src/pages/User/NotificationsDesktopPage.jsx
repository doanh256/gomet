import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ndKeyframes = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

const tabs = ['Tất cả', 'Matches', 'Vàng', 'Sự kiện'];

const notifications = [
  { type: 'match', icon: 'favorite', color: '#FF6B9D', title: 'Bạn có match mới!', desc: 'Linh Phạm - 94% tương thích vị giác', time: '2 phút trước', unread: true },
  { type: 'vang', icon: 'toll', color: '#FFD700', title: '+50 Vàng đã nhận', desc: 'Thưởng từ đánh giá Phở Thìn', time: '15 phút trước', unread: true },
  { type: 'event', icon: 'event', color: '#6C63FF', title: 'Sự kiện sắp diễn ra', desc: 'Đêm Truffle & Champagne - 28 Tháng 3', time: '1 giờ trước', unread: true },
  { type: 'message', icon: 'chat', color: '#00C9A7', title: 'Tin nhắn mới từ Tuấn', desc: 'Hey, tối nay ăn ở đâu?', time: '2 giờ trước', unread: false },
  { type: 'system', icon: 'info', color: '#42A5F5', title: 'Cập nhật hệ thống', desc: 'Phiên bản mới với tính năng Taste Twin', time: '3 giờ trước', unread: false },
  { type: 'match', icon: 'favorite', color: '#FF6B9D', title: 'Hoa đã thích bạn!', desc: 'Xem hồ sơ và gửi lời chào', time: '5 giờ trước', unread: false },
  { type: 'vang', icon: 'toll', color: '#FFD700', title: '+100 Vàng đã nhận', desc: 'Hoàn thành nhiệm vụ "Khám Phá Quận 1"', time: '6 giờ trước', unread: false },
  { type: 'event', icon: 'event', color: '#6C63FF', title: 'Đặt chỗ thành công', desc: 'Omakase Midnight - 30 Tháng 3, 20:00', time: '1 ngày trước', unread: false },
  { type: 'message', icon: 'chat', color: '#00C9A7', title: 'Nhóm "Biệt đội Ẩm Thực"', desc: 'Minh: Thứ 7 này đi ăn không?', time: '1 ngày trước', unread: false },
  { type: 'system', icon: 'info', color: '#42A5F5', title: 'Báo cáo hàng tháng', desc: 'Xem báo cáo Palate Evolution tháng 3', time: '2 ngày trước', unread: false },
];

const NotificationsDesktopPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState(0);

  const typeMap = ['', 'match', 'vang', 'event'];
  const filtered = activeTab === 0 ? notifications : notifications.filter(n => n.type === typeMap[activeTab]);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#fff' }}>
      <style>{ndKeyframes}</style>

      {/* Header */}
      <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#fff' }}>arrow_back</span>
          </button>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Thông Báo</h1>
          <span style={{
            background: '#FF3B5C', borderRadius: 10, padding: '2px 8px', fontSize: 11, fontWeight: 700
          }}>3 mới</span>
        </div>
        <button style={{
          background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, padding: '8px 16px',
          color: '#888', fontSize: 13, fontWeight: 600, cursor: 'pointer'
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }}>done_all</span>
          Đọc tất cả
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ padding: '16px 32px 0', display: 'flex', gap: 8 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            padding: '8px 20px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: activeTab === i ? 'linear-gradient(135deg, #6C63FF, #8B5CF6)' : 'rgba(255,255,255,0.06)',
            color: activeTab === i ? '#fff' : '#888', fontSize: 13, fontWeight: 600
          }}>{t}</button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', padding: '20px 32px', gap: 24, minHeight: 'calc(100vh - 140px)' }}>
        {/* Left: Notifications List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filtered.map((n, i) => (
            <div key={i} onClick={() => setSelected(i)} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 14,
              background: selected === i ? 'rgba(108,99,255,0.1)' : n.unread ? 'rgba(255,255,255,0.03)' : 'transparent',
              cursor: 'pointer', border: selected === i ? '1px solid rgba(108,99,255,0.2)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', background: `${n.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: n.color }}>{n.icon}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: n.unread ? 700 : 500, color: n.unread ? '#fff' : '#aaa' }}>{n.title}</span>
                  {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6C63FF', flexShrink: 0 }} />}
                </div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.desc}</div>
              </div>
              <span style={{ fontSize: 11, color: '#555', flexShrink: 0, marginTop: 2 }}>{n.time}</span>
            </div>
          ))}
        </div>

        {/* Right: Detail Preview */}
        <div style={{ width: 360, flexShrink: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 24,
            border: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 20,
            animation: 'fadeIn 0.3s ease'
          }}>
            {filtered[selected] && (
              <>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: `${filtered[selected].color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 28, color: filtered[selected].color }}>{filtered[selected].icon}</span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700 }}>{filtered[selected].title}</h3>
                <p style={{ margin: '0 0 12px', fontSize: 14, color: '#aaa', lineHeight: 1.6 }}>{filtered[selected].desc}</p>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 20 }}>{filtered[selected].time}</div>
                <button style={{
                  width: '100%', padding: '12px 0', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', color: '#fff',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer'
                }}>Xem chi tiết</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDesktopPage;
