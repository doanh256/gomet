import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Users } from 'lucide-react';
import './landing.css'; 

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navbar Header (Trong suốt) */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <Sparkles className="text-pink" size={28} />
          <h2>Gomet</h2>
        </div>
        <div className="landing-nav-links">
          <span onClick={() => navigate('/faq')} style={{cursor:'pointer'}}>Sản phẩm</span>
          <span onClick={() => navigate('/faq')} style={{cursor:'pointer'}}>Tìm hiểu</span>
          <span onClick={() => navigate('/safety')} style={{cursor:'pointer'}}>An toàn</span>
          <span onClick={() => navigate('/register')} style={{cursor:'pointer'}}>Tải ứng dụng</span>
        </div>
        <div className="landing-actions">
          <Link to="/login" className="btn-login-outline">Đăng Nhập</Link>
          <button className="btn-primary" onClick={() => navigate('/register')}>Tạo Tài Khoản</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Đừng chỉ quẹt,<br/>Hãy chốt kèo đi chơi!</h1>
          <p className="hero-subtitle">Mạng xã hội tìm bạn đồng hành (Activity Buddy) số 1. Dễ dàng tìm cạ cứng ăn uống, xem phim, chơi thể thao quanh bạn ngay hôm nay trên Gomet.</p>
          
          {/* Social Proof */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, background: 'linear-gradient(260deg, #fd5068, #fec142)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2.400+</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Kèo tuần này</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, background: 'linear-gradient(260deg, #fd5068, #fec142)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>850+</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Match thành công</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, background: 'linear-gradient(260deg, #fd5068, #fec142)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4.8⭐</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Đánh giá user</div>
            </div>
          </div>

          <button className="btn-primary btn-large-cta" onClick={() => navigate('/register')}>
            Tìm Kèo Ngay
          </button>
          <p style={{ marginTop: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Miễn phí • Không cần thẻ tín dụng</p>
        </div>
      </header>

      {/* Features Section */}
      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon bg-pink">
            <Heart size={32} color="white" />
          </div>
          <h3>Đăng Kèo Dễ Dàng</h3>
          <p>Chỉ với một nút chạm, đăng ngay ý định Đi Cafe, Tập Gym hay Xem Phim của bạn để mọi người cùng thấy.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon bg-blue">
            <Users size={32} color="white" />
          </div>
          <h3>Tìm Đúng Cạ Cứng</h3>
          <p>Thuật toán ưu tiên hiển thị những người cùng chung sở thích và độ rảnh rỗi dựa trên Kèo của bạn ở khoảng cách gần nhất.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon bg-green">
            <ShieldCheck size={32} color="white" />
          </div>
          <h3>Gặp Mặt An Toàn</h3>
          <p>Hệ thống xác minh hoạt động nhóm giúp Gomet trở thành nền tảng giao lưu cộng đồng lành mạnh tuyệt đối.</p>
        </div>
      </section>

      {/* Footer Mẫu */}
      <footer className="landing-footer">
        <div className="footer-links">
          <div className="footer-col">
            <h4>Pháp lý</h4>
            <Link to="/privacy" style={{color:'inherit',textDecoration:'none'}}>Quyền riêng tư</Link>
            <Link to="/terms" style={{color:'inherit',textDecoration:'none'}}>Điều khoản</Link>
            <Link to="/privacy" style={{color:'inherit',textDecoration:'none'}}>Chính sách Cookie</Link>
          </div>
          <div className="footer-col">
            <h4>Trợ giúp & Hỗ trợ</h4>
            <Link to="/faq" style={{color:'inherit',textDecoration:'none'}}>Câu hỏi thường gặp</Link>
            <Link to="/safety" style={{color:'inherit',textDecoration:'none'}}>Trung tâm An toàn</Link>
          </div>
          <div className="footer-col">
            <h4>Mạng xã hội</h4>
            <span>Instagram</span>
            <span>TikTok</span>
            <span>Facebook</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Gomet. Tác phầm Demo cho Advanced Agentic Coding.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
