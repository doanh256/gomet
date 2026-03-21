import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastNotification';
import { useAppContext } from '../../AppContext';
import { LogOut, Trash2, Shield, MapPin, Users, ChevronRight } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { logout, currentUser } = useAppContext();
  const [distance, setDistance] = useState(25);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(35);
  const [showInRange, setShowInRange] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    addToast('Đã đăng xuất thành công!', 'info');
    navigate('/login');
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#f0f2f5', overflowY: 'auto', padding: '32px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px' }}>Cài đặt</h1>

      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Discovery Settings */}
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#111418', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={20} color="#fd5068" /> Discovery
        </h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Khoảng cách</span>
            <span style={{ fontWeight: 600, color: '#fd5068' }}>Lên tới {distance}km</span>
          </div>
          <input type="range" min="1" max="100" value={distance} onChange={e => setDistance(+e.target.value)} style={{ width: '100%', accentColor: '#fd5068' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '14px', color: '#505965' }}>Chỉ hiển thị người trong phạm vi</span>
            <input type="checkbox" checked={showInRange} onChange={e => setShowInRange(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#fd5068' }} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Độ tuổi</span>
            <span style={{ fontWeight: 600, color: '#fd5068' }}>{ageMin} - {ageMax}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#505965' }}>{ageMin}</span>
            <input type="range" min="18" max="60" value={ageMax} onChange={e => setAgeMax(Math.max(+e.target.value, ageMin))} style={{ flex: 1, accentColor: '#fd5068' }} />
            <span style={{ fontSize: '13px', color: '#505965' }}>{ageMax}</span>
          </div>
        </div>

        {/* Account Security */}
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0 0 0', color: '#111418', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={20} color="#fd5068" /> Tài khoản
        </h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>Email</span>
            <span style={{ color: '#505965', fontSize: '14px' }}>{currentUser?.email}</span>
          </div>
          <div onClick={() => navigate('/app/wallet')} style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ fontWeight: 500 }}>Ví Gomet</span>
            <span style={{ color: '#fd5068', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              {(currentUser?.walletBalance || 0).toLocaleString('vi-VN')}đ <ChevronRight size={16} />
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div
            onClick={handleLogout}
            style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', fontSize: '15px', fontWeight: 500, color: '#ff6b6b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <LogOut size={18} /> Đăng xuất
          </div>
          <div
            onClick={() => setShowDeleteConfirm(true)}
            style={{ padding: '16px 24px', fontSize: '15px', fontWeight: 500, color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Trash2 size={18} /> Xóa tài khoản
          </div>
        </div>

        {/* Legal Links */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          {[
            { label: 'Điều khoản sử dụng', path: '/terms' },
            { label: 'Chính sách quyền riêng tư', path: '/privacy' },
            { label: 'Câu hỏi thường gặp', path: '/faq' },
            { label: 'Trung tâm an toàn', path: '/safety' },
          ].map((item, i) => (
            <div key={i} onClick={() => navigate(item.path)} style={{ padding: '14px 24px', borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none', fontSize: '14px', color: '#505965', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{item.label}</span>
              <ChevronRight size={16} color="#ccc" />
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#aaa', marginTop: '8px' }}>Gomet v1.0.0</p>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Xóa tài khoản?</h3>
            <p style={{ color: '#505965', fontSize: '14px', marginBottom: '24px' }}>Hành động này không thể hoàn tác. Tất cả dữ liệu, matches và tin nhắn sẽ bị xóa vĩnh viễn.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, padding: '12px', borderRadius: '30px', border: '2px solid #e5e7eb', backgroundColor: 'white', fontWeight: 600, cursor: 'pointer' }}>Hủy</button>
              <button onClick={() => { addToast('Tính năng đang phát triển', 'info'); setShowDeleteConfirm(false); }} style={{ flex: 1, padding: '12px', borderRadius: '30px', border: 'none', backgroundColor: '#dc2626', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SettingsPage;
