import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastNotification';
import { useAppContext } from '../../AppContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { logout, currentUser } = useAppContext();
  const [distance, setDistance] = useState(25);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(35);
  const [showInRange, setShowInRange] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const cancelBtnRef = useRef(null);
  useEffect(() => {
    if (showDeleteConfirm) cancelBtnRef.current?.focus();
  }, [showDeleteConfirm]);

  const handleLogout = () => {
    logout();
    addToast('Đã đăng xuất thành công!', 'info');
    navigate('/login');
  };

  // Toggle component
  const Toggle = ({ checked, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '52px', height: '28px',
        borderRadius: '9999px',
        backgroundColor: checked ? '#FF571A' : '#353535',
        position: 'relative', cursor: 'pointer',
        transition: 'background-color 0.25s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '22px', height: '22px', borderRadius: '50%',
        backgroundColor: '#FDF9F3',
        position: 'absolute', top: '3px',
        left: checked ? '27px' : '3px',
        transition: 'left 0.25s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      }} />
    </div>
  );

  const sectionHeader = {
    fontSize: '11px', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.15em',
    color: '#E6BEB2', marginBottom: '12px', marginTop: '8px',
    fontFamily: "'Inter', sans-serif",
    display: 'flex', alignItems: 'center', gap: '8px',
  };

  const card = {
    backgroundColor: '#1C1B1B', borderRadius: '1.5rem',
    padding: '0', overflow: 'hidden',
    boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
  };

  const row = {
    padding: '18px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: '15px', fontFamily: "'Inter', sans-serif",
    color: '#FDF9F3',
  };

  const divider = {
    height: '1px', backgroundColor: '#2A2A2A', margin: '0 24px',
  };

  return (
    <div style={{
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      padding: '40px 32px 80px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <h1 style={{
        fontSize: '28px', fontWeight: 800, marginBottom: '32px',
        color: '#FDF9F3', fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        Cài đặt
      </h1>

      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* ── Discovery ── */}
        <div style={sectionHeader}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FFB59E' }}>explore</span>
          KHÁM PHÁ
        </div>

        <div style={card}>
          {/* Distance */}
          <div style={{ ...row, flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Khoảng cách</span>
              <span style={{ fontWeight: 700, color: '#FFB59E' }}>Lên tới {distance}km</span>
            </div>
            <input
              type="range" min="1" max="100" value={distance}
              onChange={e => setDistance(+e.target.value)}
              aria-label={`Khoảng cách tối đa ${distance}km`}
              style={{ width: '100%', accentColor: '#FF571A' }}
            />
          </div>

          <div style={divider} />

          {/* Show in range toggle */}
          <div style={row}>
            <span style={{ fontSize: '14px', color: '#E6BEB2' }}>Chỉ hiển thị người trong phạm vi</span>
            <Toggle checked={showInRange} onChange={setShowInRange} />
          </div>
        </div>

        {/* Age range */}
        <div style={card}>
          <div style={{ ...row, flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Độ tuổi</span>
              <span style={{ fontWeight: 700, color: '#FFB59E' }}>{ageMin} - {ageMax}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#E6BEB2' }}>{ageMin}</span>
              <input
                type="range" min="18" max="60" value={ageMax}
                onChange={e => setAgeMax(Math.max(+e.target.value, ageMin))}
                aria-label={`Độ tuổi tối đa ${ageMax}`}
                style={{ flex: 1, accentColor: '#FF571A' }}
              />
              <span style={{ fontSize: '13px', color: '#E6BEB2' }}>{ageMax}</span>
            </div>
          </div>
        </div>

        {/* ── Account ── */}
        <div style={sectionHeader}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FFB59E' }}>shield</span>
          TÀI KHOẢN
        </div>

        <div style={card}>
          <div style={row}>
            <span style={{ fontWeight: 500 }}>Email</span>
            <span style={{ color: '#E6BEB2', fontSize: '14px' }}>{currentUser?.email}</span>
          </div>
          <div style={divider} />
          <div
            onClick={() => navigate('/app/wallet')}
            style={{ ...row, cursor: 'pointer' }}
          >
            <span style={{ fontWeight: 500 }}>Ví Gomet</span>
            <span style={{ color: '#FFB59E', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              {(currentUser?.walletBalance || 0).toLocaleString('vi-VN')}đ
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
            </span>
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={card}>
          <div
            onClick={handleLogout}
            style={{
              ...row, cursor: 'pointer', color: '#FF6B6B',
              fontWeight: 600, gap: '10px', justifyContent: 'flex-start',
            }}
          >
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
            Đăng xuất
          </div>
          <div style={divider} />
          <div
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              ...row, cursor: 'pointer', color: '#FF4444',
              fontWeight: 600, gap: '10px', justifyContent: 'flex-start',
            }}
          >
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete_forever</span>
            Xóa tài khoản
          </div>
        </div>

        {/* ── Legal ── */}
        <div style={sectionHeader}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FFB59E' }}>gavel</span>
          PHÁP LÝ
        </div>

        <div style={card}>
          {[
            { label: 'Điều khoản sử dụng', path: '/terms' },
            { label: 'Chính sách quyền riêng tư', path: '/privacy' },
            { label: 'Câu hỏi thường gặp', path: '/faq' },
            { label: 'Trung tâm an toàn', path: '/safety' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => navigate(item.path)}
                style={{ ...row, cursor: 'pointer', color: '#E6BEB2', fontSize: '14px' }}
              >
                <span>{item.label}</span>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '18px', color: '#353535' }}>chevron_right</span>
              </div>
              {i < 3 && <div style={divider} />}
            </React.Fragment>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#353535', marginTop: '8px' }}>
          Gomet v1.0.0
        </p>
      </div>

      {/* ── Delete Account Modal ── */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            style={{
              backgroundColor: '#1C1B1B', borderRadius: '1.5rem',
              padding: '32px', maxWidth: '400px', width: '90%',
              textAlign: 'center',
              boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
            }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: 'rgba(255,68,68,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '28px', color: '#FF4444' }}>warning</span>
            </div>
            <h3 id="delete-dialog-title" style={{
              fontSize: '20px', fontWeight: 800, marginBottom: '12px',
              color: '#FDF9F3', fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Xóa tài khoản?
            </h3>
            <p style={{ color: '#E6BEB2', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
              Hành động này không thể hoàn tác. Tất cả dữ liệu, matches và tin nhắn sẽ bị xóa vĩnh viễn.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                ref={cancelBtnRef}
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1, padding: '14px', borderRadius: '9999px',
                  backgroundColor: '#2A2A2A', border: 'none',
                  color: '#FDF9F3', fontWeight: 700, fontSize: '15px',
                  cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                }}
              >
                Hủy
              </button>
              <button
                onClick={() => { addToast('Tính năng đang phát triển', 'info'); setShowDeleteConfirm(false); }}
                style={{
                  flex: 1, padding: '14px', borderRadius: '9999px',
                  backgroundColor: '#FF4444', border: 'none',
                  color: '#FDF9F3', fontWeight: 700, fontSize: '15px',
                  cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        input[type="range"] {
          -webkit-appearance: none; appearance: none;
          height: 4px; background: #2A2A2A; border-radius: 4px; outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 20px; height: 20px; border-radius: 50%;
          background: linear-gradient(135deg, #FFB59E, #FF571A);
          cursor: pointer; box-shadow: 0 2px 8px rgba(255,87,26,0.4);
        }
      `}</style>
    </div>
  );
};
export default SettingsPage;
