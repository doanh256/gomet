import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const sanitize = (str) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

import { useAppContext } from '../../AppContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    if (!cleanName || !cleanEmail || !password) {
      setError('Vui lòng nhập đầy đủ thông tin để đăng ký');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await register(cleanName, cleanEmail, password);
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase = {
    width: '100%', height: '56px', backgroundColor: '#2A2A2A',
    border: 'none', borderRadius: '1rem', fontSize: '15px',
    outline: 'none', fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box', color: '#FDF9F3', paddingLeft: '48px',
    paddingRight: '16px', transition: 'box-shadow 0.2s',
  };

  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.15em',
    color: '#E6BEB2', marginBottom: '10px',
    fontFamily: "'Inter', sans-serif",
  };

  const iconStyle = {
    position: 'absolute', left: '16px', top: '50%',
    transform: 'translateY(-50%)', fontSize: '20px', color: '#E6BEB2',
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', backgroundColor: '#131313',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* ══ LEFT PANEL (desktop only) ══ */}
      <div className="register-left-panel" style={{
        flex: 1, position: 'relative',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden', backgroundColor: '#131313',
      }}>
        {/* Blurred primary circle */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '360px', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,87,26,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '72px', fontWeight: 900, fontStyle: 'italic',
            color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: '16px',
          }}>
            GOMET
          </h1>
          <p style={{
            fontSize: '16px', color: '#E6BEB2', opacity: 0.7, lineHeight: 1.6,
            maxWidth: '320px',
          }}>
            Nơi những cuộc gặp gỡ trở thành kỷ niệm.
            Kết nối chân thực, trải nghiệm có mục đích.
          </p>
        </div>
      </div>

      {/* ══ RIGHT PANEL (form) ══ */}
      <div style={{
        flex: 1, backgroundColor: '#1C1B1B',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '0 80px',
        position: 'relative', minHeight: '100vh',
      }}>
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute', top: '32px', left: '32px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#E6BEB2', display: 'flex', alignItems: 'center',
            gap: '4px', fontSize: '14px', fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          Quay lại
        </button>

        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          {/* Logo + subtitle */}
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '40px', fontWeight: 900, fontStyle: 'italic',
            color: '#FFB59E', letterSpacing: '-0.04em', marginBottom: '4px',
          }}>
            GOMET
          </div>
          <p style={{
            fontSize: '14px', color: '#E6BEB2', marginBottom: '40px',
            fontWeight: 500, opacity: 0.7,
          }}>
            Tạo tài khoản mới
          </p>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(255,87,26,0.15)', color: '#FFB59E',
              fontSize: '14px', padding: '14px 18px', borderRadius: '1rem',
              marginBottom: '20px', fontWeight: 500,
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} style={{
            display: 'flex', flexDirection: 'column', gap: '24px',
          }}>
            {/* Name */}
            <div>
              <label htmlFor="reg-name" style={labelStyle}>Họ tên</label>
              <div style={{ position: 'relative' }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={iconStyle}>person</span>
                <input
                  id="reg-name"
                  type="text" placeholder="Tên của bạn"
                  value={name} onChange={e => setName(e.target.value)}
                  style={inputBase}
                  autoComplete="name"
                  onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={iconStyle}>mail</span>
                <input
                  id="reg-email"
                  type="email" placeholder="email@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={inputBase}
                  autoComplete="email"
                  onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" style={labelStyle}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={iconStyle}>lock</span>
                <input
                  id="reg-password"
                  type="password" placeholder="Ít nhất 6 ký tự"
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={inputBase}
                  autoComplete="new-password"
                  onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Register button */}
            <button
              type="submit" disabled={isLoading}
              style={{
                width: '100%', height: '64px', border: 'none',
                borderRadius: '1.5rem', fontSize: '17px', fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: isLoading ? 'not-allowed' : 'pointer',
                background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                color: '#3A0B00',
                boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
                opacity: isLoading ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isLoading) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {isLoading ? 'Đang đăng ký...' : 'Tạo Tài Khoản'}
            </button>

            {/* Login link */}
            <div style={{
              textAlign: 'center', marginTop: '12px',
              fontSize: '14px', color: '#E6BEB2',
            }}>
              Đã có tài khoản?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: '#FFB59E', fontWeight: 700, cursor: 'pointer' }}
              >
                Đăng nhập
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile: hide left panel */}
      <style>{`
        @media (max-width: 900px) {
          .register-left-panel { display: none !important; }
          div[style*="padding: 0 80px"] {
            padding: 0 24px !important;
          }
        }
        input::placeholder {
          color: #E6BEB2;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
};
export default Register;
