import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const sanitize = (str) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e, role) => {
    e.preventDefault();
    const cleanEmail = role === 'admin' ? 'admin1@gomet.vn' : sanitize(email);
    const cleanPassword = password.trim();
    if (!cleanEmail || !cleanPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const user = await login(cleanEmail, cleanPassword);
      navigate(user.role === 'admin' ? '/admin' : '/app');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
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
      <div className="login-left-panel" style={{
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

        {/* Brand text */}
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
            Kết nối qua ẩm thực
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
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email */}
            <div>
              <label htmlFor="login-email" style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={iconStyle}>mail</span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputBase}
                  autoComplete="email"
                  onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" style={labelStyle}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={iconStyle}>lock</span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ ...inputBase, paddingRight: '48px' }}
                  autoComplete="current-password"
                  onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(255,181,158,0.5)'; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', cursor: 'pointer', padding: 0,
                    display: 'flex',
                  }}
                >
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', color: '#E6BEB2' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginTop: '-8px' }}>
              <button
                type="button"
                onClick={() => setError('Tính năng đang phát triển. Vui lòng liên hệ hỗ trợ.')}
                style={{
                  fontSize: '13px', color: '#FFB59E', fontWeight: 600,
                  cursor: 'pointer', background: 'none', border: 'none',
                  padding: 0, fontFamily: "'Inter', sans-serif",
                }}
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Login button */}
            <button
              onClick={e => handleLogin(e, 'user')}
              disabled={isLoading}
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
              {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </button>

            {/* Divider */}
            <div style={{
              position: 'relative', textAlign: 'center', margin: '4px 0',
            }}>
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                height: '1px', backgroundColor: '#2A2A2A',
              }} />
              <span style={{
                backgroundColor: '#1C1B1B', padding: '0 16px',
                fontSize: '13px', color: '#E6BEB2', position: 'relative',
                fontWeight: 500,
              }}>
                hoặc
              </span>
            </div>

            {/* Admin button */}
            <button
              onClick={e => handleLogin(e, 'admin')}
              style={{
                width: '100%', height: '56px', backgroundColor: '#2A2A2A',
                color: '#FDF9F3', border: 'none', borderRadius: '1.5rem',
                fontSize: '15px', fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer', transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#353535'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2A2A2A'; }}
            >
              Tiếp tục với Admin
            </button>

            {/* Register link */}
            <div style={{
              textAlign: 'center', marginTop: '12px',
              fontSize: '14px', color: '#E6BEB2',
            }}>
              Chưa có tài khoản?{' '}
              <span
                onClick={() => navigate('/register')}
                style={{ color: '#FFB59E', fontWeight: 700, cursor: 'pointer' }}
              >
                Đăng ký ngay
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile: hide left panel */}
      <style>{`
        @media (max-width: 900px) {
          .login-left-panel { display: none !important; }
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

export default Login;
