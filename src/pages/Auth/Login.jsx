import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAppContext } from '../../AppContext';

// Sanitize: loại bỏ HTML tags trước khi sử dụng (Basic XSS Protection)
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
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/app');
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#13111C' }}>
      
      {/* Left Panel: Brand & Illustration (DinoDate style) */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #1f1140 0%, #13111C 100%)', color: 'white', padding: '40px' }}>
        
        {/* Connection Tree Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.6 }}>
          {/* Central User */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(260deg, #FF6B6B 0%, #FF8E8E 100%)', zIndex: 10, boxShadow: '0 0 30px rgba(255, 107, 107, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={32} color="white" />
          </div>
          
          {/* Nodes and Lines (Simulated SVG) */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="rgba(255,107,107,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="rgba(78,205,196,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="25%" y2="65%" stroke="rgba(255,107,107,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="65%" y2="75%" stroke="rgba(78,205,196,0.3)" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
          
          {/* Avatar Nodes */}
          <div style={avatarStyle('30%', '25%', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop')}></div>
          <div style={avatarStyle('70%', '30%', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop')}></div>
          <div style={avatarStyle('25%', '65%', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop')}></div>
          <div style={avatarStyle('65%', '75%', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop')}></div>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', maxWidth: '400px', marginTop: 'auto', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            Gomet<span style={{ color: '#FF6B6B' }}>.</span>
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#A09FB1', fontWeight: 500 }}>
            Nơi những cuộc gặp gỡ trở thành kỷ niệm. Kết nối với cạ cứng ngay hôm nay để chốt kèo đi chơi!
          </p>
        </div>
      </div>

      {/* Right Panel: Login Form (Dinedate style but Pill shape) */}
      <div style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: '40px', borderBottomLeftRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', position: 'relative', boxShadow: '-10px 0 30px rgba(0,0,0,0.2)', zIndex: 30 }}>
        
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111418', marginBottom: '8px' }}>Chào mừng trở lại! 👋</h2>
          <p style={{ fontSize: '15px', color: '#505965', marginBottom: '40px' }}>Đăng nhập để tiếp tục hành trình của bạn</p>

          {error && <div style={{ color: '#FF6B6B', fontSize: '14px', marginBottom: '16px', fontWeight: 500, backgroundColor: 'rgba(255, 107, 107, 0.1)', padding: '12px', borderRadius: '12px' }}>{error}</div>}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Input */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#111418', marginBottom: '8px', marginLeft: '16px' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#A09FB1" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '16px 20px 16px 52px', backgroundColor: '#F3F4F6', border: '2px solid transparent', borderRadius: '30px', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }} 
                  onFocus={(e) => e.target.style.borderColor = '#FF6B6B'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#111418', marginBottom: '8px', marginLeft: '16px' }}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} color="#A09FB1" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '16px 52px 16px 52px', backgroundColor: '#F3F4F6', border: '2px solid transparent', borderRadius: '30px', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }} 
                  onFocus={(e) => e.target.style.borderColor = '#FF6B6B'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={20} color="#A09FB1" /> : <Eye size={20} color="#A09FB1" />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '-8px' }}>
              <span style={{ fontSize: '13px', color: '#FF6B6B', fontWeight: 600, cursor: 'pointer' }}>Quên mật khẩu?</span>
            </div>

            {/* Login Button */}
            <button 
              onClick={(e) => handleLogin(e, 'user')}
              style={{ 
                width: '100%', padding: '16px', background: 'linear-gradient(260deg, #FF6B6B 0%, #FF8E8E 100%)', color: 'white', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginTop: '8px', boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)', transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <div style={{ position: 'relative', textAlign: 'center', margin: '16px 0' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #E5E7EB', zIndex: 1 }}></div>
              <span style={{ backgroundColor: 'white', padding: '0 16px', fontSize: '13px', color: '#A09FB1', position: 'relative', zIndex: 2 }}>hoặc</span>
            </div>

            {/* Admin Login Button */}
            <button 
              onClick={(e) => handleLogin(e, 'admin')}
              style={{ 
                width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#111418', border: '2px solid #E5E7EB', borderRadius: '30px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Tiếp tục với Admin
            </button>

            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#505965' }}>
              Bạn chưa có tài khoản? <span onClick={() => navigate('/register')} style={{ color: '#FF6B6B', fontWeight: 700, cursor: 'pointer' }}>Đăng ký ngay</span>
            </div>
          </form>
        </div>
        
        {/* Back button top left of the form panel */}
        <button 
          onClick={() => navigate('/')} 
          style={{ position: 'absolute', top: '40px', left: '40px', background: 'none', border: 'none', cursor: 'pointer', color: '#A09FB1', display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 600, padding: '8px 16px', borderRadius: '20px', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111418'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#A09FB1'; }}
        >
          ← Quay lại
        </button>
      </div>

      {/* Responsive Styles via Style Block */}
      <style>
        {`
          @media (max-width: 900px) {
            .login-container > div:first-child {
              display: none !important;
            }
            .login-container > div:last-child {
              border-radius: 0 !important;
              padding: 0 32px !important;
            }
          }
        `}
      </style>
      
      {/* Wrapper class for responsive */}
      <style>
        {`
          div[style*="height: 100vh"] {
            flex-direction: row;
          }
          @media (max-width: 900px) {
            div[style*="height: 100vh"] {
              flex-direction: column;
            }
            div[style*="height: 100vh"] > div:first-child {
              display: none !important;
            }
            div[style*="height: 100vh"] > div:last-child {
              border-radius: 0 !important;
              padding: 40px 24px !important;
            }
            div[style*="height: 100vh"] > div:last-child > button {
               top: 20px !important;
               left: 10px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const avatarStyle = (left, top, imgUrl) => ({
  position: 'absolute',
  left,
  top,
  transform: 'translate(-50%, -50%)',
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  border: '3px solid #13111C',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  backgroundImage: `url(${imgUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export default Login;
