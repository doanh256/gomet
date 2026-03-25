import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const steps = [
    { icon: 'restaurant_menu', title: 'Tạo Hồ Sơ Ẩm Thực', desc: 'Cho chúng tôi biết bạn thích ăn gì, uống gì, và phong cách hẹn hò của bạn.' },
    { icon: 'favorite', title: 'Ghép Đôi Theo Khẩu Vị', desc: 'AI phân tích 42 chỉ số để tìm người phù hợp nhất. Cùng gu ăn = cùng nhịp sống.' },
    { icon: 'local_dining', title: 'Hẹn Hò Tại Nhà Hàng', desc: 'Gặp nhau tại quán yêu thích. GOMET gợi ý địa điểm hoàn hảo cho buổi hẹn đầu tiên.' },
  ];

  const stats = [
    { value: '50,000+', label: 'Thành viên' },
    { value: '1,200+', label: 'Cặp đôi thành công' },
    { value: '30+', label: 'Địa điểm đối tác' },
    { value: '92%', label: 'Hài lòng' },
  ];

  const featuredDates = [
    {
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=350&fit=crop',
      title: 'Dinner Date Lãng Mạn',
      desc: 'Bữa tối ánh nến với người ấy tại nhà hàng sang trọng. Để GOMET chọn nơi hoàn hảo cho bạn.',
    },
    {
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=350&fit=crop',
      title: 'Brunch Date Cuối Tuần',
      desc: 'Sáng cuối tuần thong thả bên ly cà phê và bánh ngọt. Khởi đầu ngày mới cùng người hợp gu.',
    },
    {
      img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=350&fit=crop',
      title: 'Street Food Adventure',
      desc: 'Cùng nhau khám phá ẩm thực đường phố. Từ hẻm nhỏ Sài Gòn đến phố cổ Hà Nội.',
    },
  ];

  const matchCriteria = [
    { icon: 'local_fire_department', title: 'Độ Cay', desc: 'Mức độ chịu cay tương đồng', color: '#FF4D00' },
    { icon: 'public', title: 'Vùng Miền', desc: 'Ẩm thực vùng miền yêu thích', color: '#2E7D32' },
    { icon: 'restaurant', title: 'Phong Cách', desc: 'Fine dining hay street food', color: '#1565C0' },
    { icon: 'payments', title: 'Budget', desc: 'Ngân sách phù hợp cho buổi hẹn', color: '#6A1B9A' },
    { icon: 'schedule', title: 'Thời Gian', desc: 'Lịch trình ăn uống hàng ngày', color: '#E65100' },
    { icon: 'interests', title: 'Sở Thích', desc: 'Đồ uống, tráng miệng, healthy', color: '#00838F' },
  ];

  const testimonials = [
    {
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      name: 'Minh Anh',
      age: 26,
      quote: 'Gặp anh ấy qua buổi group date lẩu Thái. Ai ngờ cùng ghiền phở và cà phê sữa đá. Bây giờ mỗi sáng đều cùng nhau ăn phở rồi đi làm.',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      name: 'Hoàng Nam',
      age: 29,
      quote: 'Cùng cô ấy khám phá hết quán ăn Sài Gòn. Từ hẻm nhỏ đến nhà hàng, đâu cũng vui vì có người đồng hành cùng gu.',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      name: 'Thanh Hà',
      age: 24,
      quote: 'Từ bữa phở đầu tiên đến đám cưới. GOMET không chỉ ghép đôi theo khẩu vị mà còn ghép đôi trái tim.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDF9F3', color: '#393834', fontFamily: "'Inter', sans-serif" }}>

      {/* ===== NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'rgba(253,249,243,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 1px 0 rgba(57,56,52,0.06)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          height: 72, padding: '0 48px', maxWidth: 1280, margin: '0 auto',
        }}>
          <div style={{
            fontSize: 26, fontWeight: 900, fontStyle: 'italic', color: '#b83500',
            letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: 'pointer',
          }}>GOMET</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[
              { label: 'Ẩm Thực', href: '#how' },
              { label: 'Ghép Đôi', href: '#taste-match' },
              { label: 'Câu Chuyện', href: '#stories' },
              { label: 'Tham Gia', href: '#cta' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{link.label}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate('/login')} style={{
              background: 'none', border: 'none', color: '#393834', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Đăng Nhập</button>
            <button onClick={() => navigate('/register')} style={{
              backgroundColor: '#b83500', color: '#ffffff', padding: '10px 24px', borderRadius: 8,
              border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Bắt Đầu Miễn Phí</button>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 72 }}>

        {/* ===== HERO ===== */}
        <section style={{
          position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center',
          overflow: 'hidden', padding: '80px 48px',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1400&h=900&fit=crop"
              alt="Bàn ăn lãng mạn tại nhà hàng"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, #FDF9F3 35%, rgba(253,249,243,0.85) 55%, rgba(253,249,243,0.3) 80%, transparent 100%)',
            }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 640 }}>
            <p style={{
              color: '#b83500', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              fontSize: 14, marginBottom: 16, marginTop: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Đi Để Gặp &middot; Ăn Để Yêu</p>

            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em',
              color: '#393834', lineHeight: 1.05, marginBottom: 24, marginTop: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Tìm Người Hẹn Hò<br />Qua <span style={{ color: '#b83500' }}>Ẩm Thực</span>
            </h1>

            <p style={{
              fontSize: 18, color: '#666460', maxWidth: 520, marginBottom: 40, lineHeight: 1.7,
            }}>
              GOMET ghép đôi bạn với người có cùng khẩu vị. Từ phở sáng đến dinner date — mỗi bữa ăn là một cơ hội gặp gỡ.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <button onClick={() => navigate('/register')} style={{
                backgroundColor: '#b83500', color: '#ffffff', padding: '16px 36px', borderRadius: 8,
                border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 16px 40px rgba(184,53,0,0.2)',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >Tìm Người Hẹn Hò</button>

              <a href="#how" style={{
                color: '#b83500', fontWeight: 700, fontSize: 15, textDecoration: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span>Khám Phá</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how" style={{ padding: '100px 48px', backgroundColor: '#FDF9F3' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{
                fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 0, marginBottom: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Cách GOMET Hoạt Động</h2>
              <p style={{ fontSize: 17, color: '#666460', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                Ba bước đơn giản để tìm người hẹn hò qua ẩm thực
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {steps.map((step, i) => (
                <div key={i} style={{
                  backgroundColor: '#ffffff', borderRadius: 16, padding: 36, textAlign: 'center',
                  boxShadow: '0px 16px 40px rgba(0,0,0,0.06)',
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    backgroundColor: 'rgba(184,53,0,0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                  }}>
                    <span className="material-symbols-outlined" style={{ color: '#b83500', fontSize: 28 }}>{step.icon}</span>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 9999, backgroundColor: '#b83500',
                    color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>{i + 1}</div>
                  <h3 style={{
                    fontSize: 18, fontWeight: 700, margin: '0 0 10px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: '#666460', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section style={{ padding: '48px', backgroundColor: '#393834' }}>
          <div style={{
            maxWidth: 1080, margin: '0 auto',
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 32,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 32, fontWeight: 800, color: '#FF4D00',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FEATURED DATES ===== */}
        <section style={{ padding: '100px 48px', backgroundColor: '#FDF9F3' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{
                fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 0, marginBottom: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Buổi Hẹn Được Yêu Thích</h2>
              <p style={{ fontSize: 17, color: '#666460', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                Những trải nghiệm hẹn hò ẩm thực phổ biến nhất trên GOMET
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {featuredDates.map((date, i) => (
                <div key={i} style={{
                  backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0px 16px 40px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ height: 220, overflow: 'hidden' }}>
                    <img src={date.img} alt={date.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 28 }}>
                    <h3 style={{
                      fontSize: 18, fontWeight: 700, margin: '0 0 10px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>{date.title}</h3>
                    <p style={{ fontSize: 14, color: '#666460', lineHeight: 1.7, margin: '0 0 20px' }}>{date.desc}</p>
                    <button onClick={() => navigate('/register')} style={{
                      backgroundColor: 'rgba(184,53,0,0.08)', color: '#b83500',
                      padding: '10px 20px', borderRadius: 8, border: 'none',
                      fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span>Tìm Người Đi Cùng</span>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TASTE MATCH ===== */}
        <section id="taste-match" style={{ padding: '100px 48px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{
                fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 0, marginBottom: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Ghép Đôi Thông Minh Theo Khẩu Vị</h2>
              <p style={{ fontSize: 17, color: '#666460', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                AI phân tích 6 chiều khẩu vị để tìm người tương thích hoàn hảo cho bạn
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {matchCriteria.map((item, i) => (
                <div key={i} style={{
                  backgroundColor: '#FDF9F3', borderRadius: 16, padding: 28,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(57,56,52,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 9999,
                    backgroundColor: `${item.color}14`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}>
                    <span className="material-symbols-outlined" style={{ color: item.color, fontSize: 24 }}>{item.icon}</span>
                  </div>
                  <h4 style={{
                    fontSize: 16, fontWeight: 700, margin: '0 0 6px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: '#666460', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMMUNITY STORIES ===== */}
        <section id="stories" style={{ padding: '100px 48px', backgroundColor: '#FDF9F3' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{
                fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 0, marginBottom: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Câu Chuyện Tình Yêu Từ Bữa Ăn</h2>
              <p style={{ fontSize: 17, color: '#666460', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                Hàng ngàn cặp đôi đã tìm thấy nhau qua GOMET
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{
                  backgroundColor: '#ffffff', borderRadius: 16, padding: 32,
                  boxShadow: '0px 16px 40px rgba(0,0,0,0.06)',
                }}>
                  <div style={{
                    fontSize: 40, color: '#b83500', fontFamily: 'Georgia, serif',
                    lineHeight: 1, marginBottom: 16, opacity: 0.3,
                  }}>&ldquo;</div>
                  <p style={{
                    fontSize: 15, lineHeight: 1.8, color: '#393834', margin: '0 0 24px',
                    fontStyle: 'italic',
                  }}>{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 9999, overflow: 'hidden',
                      backgroundColor: '#f0ece4',
                    }}>
                      <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 700, fontSize: 14,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: '#999' }}>{t.age} tuổi</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section id="cta" style={{
          padding: '120px 48px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1529543544282-ea57407bc2f7?w=1200&h=600&fit=crop"
              alt="Nền hẹn hò"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(30,28,25,0.75)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#ffffff',
              letterSpacing: '-0.03em', marginBottom: 20, marginTop: 0, lineHeight: 1.1,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Sẵn Sàng Cho Buổi Hẹn Đầu Tiên?</h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 40, lineHeight: 1.7 }}>
              Tìm người hẹn hò cùng gu ẩm thực ngay hôm nay. Đi để gặp, ăn để yêu.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
              <button onClick={() => navigate('/register')} style={{
                backgroundColor: '#b83500', color: '#ffffff', padding: '16px 40px', borderRadius: 8,
                border: 'none', fontSize: 17, fontWeight: 800, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 16px 40px rgba(184,53,0,0.35)',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Tham Gia GOMET Miễn Phí</button>
              <button onClick={() => navigate('/login')} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)',
                fontWeight: 600, fontSize: 15, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textDecoration: 'underline', textUnderlineOffset: 4,
              }}>Đăng Nhập</button>
            </div>
          </div>
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer style={{ backgroundColor: '#FDF9F3', padding: '48px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            fontSize: 22, fontWeight: 900, fontStyle: 'italic', color: '#b83500',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>GOMET</div>
          <p style={{ fontSize: 13, color: '#999', margin: 0 }}>Đi để gặp &middot; Ăn để yêu</p>
          <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
            {['Về chúng tôi', 'Điều khoản', 'Quyền riêng tư', 'An toàn', 'Liên hệ'].map(link => (
              <a key={link} href="#" style={{
                color: '#666460', fontSize: 13, fontWeight: 500, textDecoration: 'none',
              }}>{link}</a>
            ))}
          </div>
          <p style={{
            color: 'rgba(57,56,52,0.4)', fontSize: 11, marginTop: 24, margin: '24px 0 0',
          }}>&copy; 2024 GOMET. Đi để gặp, Ăn để yêu.</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
