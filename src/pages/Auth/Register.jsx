import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';

// Sanitize input: loại bỏ HTML tags trước khi sử dụng (Basic XSS Protection)
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
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ flex: 1, margin: 0, fontSize: '24px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>Tạo tài khoản mới</h2>
        <div style={{ width: '24px' }}></div>
      </div>
      <p style={{ textAlign: 'center', color: '#505965', marginBottom: '32px', fontSize: '14px' }}>Khám phá hoạt động và tìm kiếm cạ cứng</p>
      
      {error && (
        <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#e03c3c', marginBottom: '8px' }}>{error}</div>
      )}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input 
          type="text" 
          placeholder="Tên của bạn" 
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: '14px', borderRadius: '8px', border: '2px solid #e8e8e8', fontSize: '16px', outline: 'none' }} 
        />
        <input 
          type="email" 
          placeholder="Email của bạn" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '14px', borderRadius: '8px', border: '2px solid #e8e8e8', fontSize: '16px', outline: 'none' }} 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '14px', borderRadius: '8px', border: '2px solid #e8e8e8', fontSize: '16px', outline: 'none' }} 
        />
        
        <button type="submit" style={{ 
          background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)',
          color: 'white',
          border: 'none',
          padding: '14px',
          borderRadius: '30px',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '16px',
          marginTop: '8px',
          display: 'block',
          width: '100%',
          boxShadow: '0 4px 16px rgba(253, 80, 104, 0.3)',
          cursor: 'pointer'
        }}>
          {isLoading ? 'Đang đăng ký...' : 'Tìm Cạ Cứng Ngay →'}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#505965' }}>
          Đã có tài khoản? <Link to="/login" style={{ color: '#fd5068', fontWeight: 600 }}>Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
