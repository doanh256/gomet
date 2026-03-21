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
    if (!cleanEmail || !cleanPassword) { setError('Vui lòng nhập đầy đủ thông tin'); return; }
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

  const inputStyle = {
    width: '100%', padding: '14px 16px 14px 48px', backgroundColor: 'var(--surface-container-highest)',
    border: '2px solid transparent', borderRadius: 'var(--radius)', fontSize: '15px',
    outline: 'none', transition: 'border-color 0.2s', fontFamily: 'var(--font-body)',
    boxSizing: 'border-box', color: 'var(--on-surface)',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', background: 'linear-gradient(135deg, var(--inverse-surface) 0%, #2a1a1b 100%)', color: 'white', padding: '48px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,47,52,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '400px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 800, fontFamily: 'var(--font-headline)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '16px' }}>
            Gomet<span style={{ color: 'var(--primary-container)' }}>.</span>
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--inverse-on-surface)', opacity: 0.8 }}>
            Nơi những cuộc gặp gỡ trở thành kỷ niệm. Kết nối chân thực, hẹn hò có mục đích.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, backgroundColor: 'var(--surface-container-lowest)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', position: 'relative' }}>
        <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '32px', left: '32px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span> Quay lại
        </button>

        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--on-surface)', fontFamily: 'var(--font-headline)', letterSpacing: '-0.02em', marginBottom: '8px' }}>Chào mừng trở lại</h2>
          <p style={{ fontSize: '15px', color: 'var(--on-surface-variant)', marginBottom: '32px' }}>Đăng nhập để tiếp tục hành trình của bạn</p>

          {error && <div style={{ backgroundColor: 'var(--error-container)', color: 'var(--error)', fontSize: '14px', padding: '12px 16px', borderRadius: 'var(--radius)', marginBottom: '16px', fontWeight: 500 }}>{error}</div>}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', color: 'var(--on-surface-variant)' }}>mail</span>
                <input type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'} onBlur={e => e.target.style.borderColor = 'transparent'} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', color: 'var(--on-surface-variant)' }}>lock</span>
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'} onBlur={e => e.target.style.borderColor = 'transparent'} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span onClick={() => navigate('/forgot-password')} style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Quên mật khẩu?</span>
            </div>

            <button onClick={e => handleLogin(e, 'user')} disabled={isLoading} style={{
              width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: 'white',
              border: 'none', borderRadius: 'var(--radius-full)', fontSize: '16px', fontWeight: 700,
              fontFamily: 'var(--font-headline)', cursor: 'pointer', boxShadow: '0 8px 24px rgba(174,47,52,0.3)',
              opacity: isLoading ? 0.7 : 1, transition: 'all 0.2s',
            }}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--surface-container-high)' }} />
              <span style={{ backgroundColor: 'var(--surface-container-lowest)', padding: '0 16px', fontSize: '13px', color: 'var(--on-surface-variant)', position: 'relative' }}>hoặc</span>
            </div>

            <button onClick={e => handleLogin(e, 'admin')} style={{
              width: '100%', padding: '14px', backgroundColor: 'var(--surface-container-high)',
              color: 'var(--on-surface)', border: 'none', borderRadius: 'var(--radius-full)',
              fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-headline)', cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}>
              Tiếp tục với Admin
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--on-surface-variant)' }}>
              Bạn chưa có tài khoản? <span onClick={() => navigate('/register')} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Đăng ký ngay</span>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 900px) {
          .login-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;
