import React, { useState } from 'react';
import { Search, Edit, Trash2, Ban } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'vana@gmail.com', status: 'Active', plan: 'Tinder Gold', date: '12/10/2023' },
    { id: 2, name: 'Trần Thị B', email: 'thib@gmail.com', status: 'Banned', plan: 'Free', date: '05/11/2023' },
    { id: 3, name: 'Lê Hoàng C', email: 'hoangc@gmail.com', status: 'Active', plan: 'Tinder Plus', date: '21/01/2024' },
    { id: 4, name: 'Phạm D', email: 'phamd@yahoo.com', status: 'Active', plan: 'Free', date: '02/02/2024' },
    { id: 5, name: 'Hương Thảo', email: 'thao@tinder.vn', status: 'Active', plan: 'Tinder Gold', date: '14/03/2024' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== id));
      alert('Đã xóa thành công!');
    }
  };

  const handleBan = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Banned' : 'Active';
        alert(`Đã đổi trạng thái tài khoản thành: ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#111418' }}>Quản lý Người dùng</h1>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '8px 16px', width: '300px' }}>
          <Search size={18} color="#a0aabc" />
          <input type="text" placeholder="Tìm kiếm tên, email..." style={{ border: 'none', outline: 'none', marginLeft: '12px', width: '100%', fontSize: '14px' }} />
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', color: '#505965', fontSize: '14px', borderBottom: '1px solid #e8e8e8' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>ID</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Tên người dùng</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Trạng thái</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Gói dịch vụ</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Ngày tham gia</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e8e8e8', fontSize: '15px' }}>
                <td style={{ padding: '16px 24px' }}>#{user.id}</td>
                <td style={{ padding: '16px 24px', fontWeight: 600 }}>{user.name}</td>
                <td style={{ padding: '16px 24px', color: '#505965' }}>{user.email}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '24px', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    backgroundColor: user.status === 'Active' ? '#e2f8ec' : '#fceded',
                    color: user.status === 'Active' ? '#1dda95' : '#fd5068'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ fontWeight: user.plan !== 'Free' ? 600 : 400, color: user.plan.includes('Gold') ? '#eeb633' : '#111418' }}>
                    {user.plan}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', color: '#505965' }}>{user.date}</td>
                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', color: '#a0aabc' }}>
                    <Edit size={18} cursor="pointer" onClick={() => alert('Chức năng sửa thông tin đang phát triển')} />
                    <Ban size={18} cursor="pointer" onClick={() => handleBan(user.id)} color={user.status === 'Banned' ? '#fd5068' : '#a0aabc'} />
                    <Trash2 size={18} cursor="pointer" onClick={() => handleDelete(user.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#505965', fontSize: '14px' }}>
          <span>Hiển thị 1 - 5 của 12,543 kết quả</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '8px 16px', border: '1px solid #e8e8e8', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}>Trước</button>
            <button style={{ padding: '8px 16px', border: '1px solid #e8e8e8', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserManagement;
