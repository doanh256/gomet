import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'Nguyễn Minh Anh', email: 'minhanh@gmail.com', joinDate: '15/01/2026', status: 'active', verified: true },
  { id: 2, name: 'Trần Đức Huy', email: 'duchuy92@gmail.com', joinDate: '20/01/2026', status: 'active', verified: true },
  { id: 3, name: 'Lê Thị Bích Ngọc', email: 'bichngoc@yahoo.com', joinDate: '03/02/2026', status: 'locked', verified: false },
  { id: 4, name: 'Phạm Hoàng Long', email: 'hoanglong@gmail.com', joinDate: '10/02/2026', status: 'active', verified: true },
  { id: 5, name: 'Võ Thành Tâm', email: 'thanhtam@outlook.com', joinDate: '18/02/2026', status: 'unverified', verified: false },
  { id: 6, name: 'Đặng Thị Hương', email: 'huongdang@gmail.com', joinDate: '25/02/2026', status: 'active', verified: true },
  { id: 7, name: 'Bùi Văn Khánh', email: 'khanh.bui@gmail.com', joinDate: '01/03/2026', status: 'active', verified: true },
  { id: 8, name: 'Hồ Ngọc Hà', email: 'haho@yahoo.com', joinDate: '05/03/2026', status: 'locked', verified: false },
  { id: 9, name: 'Lý Quốc Bảo', email: 'quocbao@outlook.com', joinDate: '12/03/2026', status: 'unverified', verified: false },
  { id: 10, name: 'Trương Mỹ Linh', email: 'mylinh.t@gmail.com', joinDate: '18/03/2026', status: 'active', verified: true },
];

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'active', label: 'Hoạt động' },
    { key: 'locked', label: 'Bị khóa' },
    { key: 'unverified', label: 'Chưa xác minh' },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || user.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalUsers = users.length;
  const activeToday = users.filter((u) => u.status === 'active').length;
  const verifiedCount = users.filter((u) => u.verified).length;
  const reportedCount = users.filter((u) => u.status === 'locked').length;

  const miniStats = [
    { label: 'Tổng người dùng', value: totalUsers, icon: 'group' },
    { label: 'Hoạt động hôm nay', value: activeToday, icon: 'person' },
    { label: 'Đã xác minh', value: verifiedCount, icon: 'verified' },
    { label: 'Bị báo cáo', value: reportedCount, icon: 'report' },
  ];

  const statusConfig = {
    active: { label: 'Hoạt động', bg: 'rgba(17,117,0,0.15)', color: '#117500' },
    locked: { label: 'Bị khóa', bg: 'rgba(255,87,26,0.15)', color: '#FF571A' },
    unverified: { label: 'Chờ duyệt', bg: 'rgba(255,213,79,0.15)', color: '#FFD54F' },
  };

  const handleBlock = (id) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === 'locked' ? 'active' : 'locked' } : u));
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const totalPages = 5;

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: '#FDF9F3' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '32px', color: '#FFB59E' }}>manage_accounts</span>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-headline)' }}>Quản lý người dùng</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1C1B1B', borderRadius: '1.5rem', padding: '12px 20px', marginBottom: '20px' }}>
        <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '22px', color: '#E6BEB2' }}>search</span>
        <input type="text" placeholder="Tìm kiếm theo tên hoặc email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: '15px', fontFamily: 'var(--font-body)', background: 'transparent', color: '#FDF9F3' }} />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{ padding: '8px 20px', borderRadius: '9999px', border: 'none', background: activeFilter === f.key ? '#FFB59E' : '#1C1B1B', color: activeFilter === f.key ? '#3A0B00' : '#E6BEB2', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}>{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {miniStats.map((s, i) => (
          <div key={i} style={{ background: '#1C1B1B', borderRadius: '1.5rem', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '24px', color: '#FFB59E', background: '#2A2A2A', borderRadius: '10px', padding: '10px' }}>{s.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-headline)', color: '#FDF9F3' }}>{s.value}</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#E6BEB2' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1fr 1fr 1.2fr', padding: '14px 24px', background: '#2A2A2A', fontSize: '13px', fontWeight: 600, color: '#E6BEB2' }}>
          <span>Người dùng</span><span>Email</span><span>Ngày tham gia</span><span>Trạng thái</span><span>Xác minh</span><span style={{ textAlign: 'center' }}>Hành động</span>
        </div>
        {filteredUsers.map((user) => {
          const st = statusConfig[user.status] || statusConfig.active;
          return (
            <div key={user.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1fr 1fr 1.2fr', padding: '14px 24px', alignItems: 'center', transition: 'background 0.15s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2A2A2A'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A0B00', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{user.name.charAt(0)}</div>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{user.name}</span>
              </div>
              <span style={{ fontSize: '14px', color: '#E6BEB2' }}>{user.email}</span>
              <span style={{ fontSize: '13px', color: '#E6BEB2' }}>{user.joinDate}</span>
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, background: st.bg, color: st.color, width: 'fit-content' }}>{st.label}</span>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: user.verified ? '#117500' : '#353535' }}>{user.verified ? 'verified' : 'cancel'}</span>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button onClick={() => {}} title="Xem" style={{ background: 'none', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px', color: '#FFB59E' }}>visibility</span>
                </button>
                <button onClick={() => handleBlock(user.id)} title="Khoa" style={{ background: 'none', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px', color: user.status === 'locked' ? '#FF571A' : '#E6BEB2' }}>block</span>
                </button>
                <button onClick={() => handleDelete(user.id)} title="Xoa" style={{ background: 'none', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px', color: '#FF571A' }}>delete_outline</span>
                </button>
              </div>
            </div>
          );
        })}
        {filteredUsers.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#E6BEB2' }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '8px', opacity: 0.4 }}>search_off</span>
            Không tìm thấy người dùng nào
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', fontSize: '14px', color: '#E6BEB2' }}>
          <span>Trang {currentPage}/{totalPages}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#2A2A2A', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1, fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#FDF9F3' }}>Trước</button>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#2A2A2A', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1, fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#FDF9F3' }}>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
