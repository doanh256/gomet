import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const tasteDimensions = [
    { icon: 'favorite', title: 'Ghép Đôi Khẩu Vị', subtitle: 'Taste Matching', desc: 'Tìm người hẹn hò có cùng sở thích ăn uống — từ street food đến fine dining.' },
    { icon: 'local_fire_department', title: 'Độ Chịu Cay', subtitle: 'Spice Chemistry', desc: 'Bạn thích cay mấy? Ghép đôi với người có cùng "nhiệt huyết" ẩm thực.' },
    { icon: 'public', title: 'Vùng Miền', subtitle: 'Regional Match', desc: 'Cùng quê hay cùng gu? Kết nối qua ẩm thực 8 vùng miền Việt Nam.' },
    { icon: 'restaurant', title: 'Phong Cách Date', subtitle: 'Date Style', desc: 'Cà phê sáng hay dinner date? Tìm người hợp phong cách hẹn hò của bạn.' },
    { icon: 'groups', title: 'Group Date', subtitle: 'Social Dining', desc: 'Hẹn hò nhóm, double date, hay ăn uống cùng bạn bè mới quen.' },
    { icon: 'auto_awesome', title: 'Chemistry Score', subtitle: 'AI Compatibility', desc: 'AI phân tích độ tương thích qua 42 chỉ số khẩu vị để tìm người phù hợp nhất.' },
  ];

  const communityCards = [
    {
      img: 'https://images.unsplash.com/photo-1529543544282-ea57407bc2f7?w=600&h=400&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      name: 'Minh Anh',
      event: 'Date Cà Phê Sài Gòn',
      quote: 'Lần đầu hẹn hò qua GOMET, hai đứa cùng ghiền phở và cà phê sữa đá. Bây giờ mỗi sáng đều cùng nhau ăn phở rồi đi làm.',
    },
    {
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      name: 'Hoàng Nam',
      event: 'Khám Phá Ẩm Thực Đà Lạt',
      quote: 'Nhờ GOMET mà tìm được bạn gái cùng đam mê ẩm thực vùng miền. Chúng mình đã cùng nhau khám phá hết 8 vùng Việt Nam!',
    },
    {
      img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      name: 'Thanh Hà',
      event: 'Group Date Lẩu Thái',
      quote: 'Đi group date lẩu Thái, quen được nhóm bạn mới siêu vui. Giờ cuối tuần nào cũng hẹn nhau thử quán mới trên GOMET.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDF9F3', color: '#393834', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ===== TOP NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'rgba(253,249,243,0.7)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 16px 40px rgba(57,56,52,0.06)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          height: 80, padding: '0 48px', maxWidth: 1920, margin: '0 auto',
        }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#b83500', letterSpacing: '-0.05em' }}>GOMET</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#regions" style={{ color: '#FF4D00', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid #FF4D00', paddingBottom: 4, fontSize: 14 }}>Ẩm Thực</a>
            <a href="#taste" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Ghép Đôi</a>
            <a href="#community" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Câu Chuyện</a>
            <a href="#cta" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Tham Gia</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navigate('/login')} style={{
              background: 'none', border: 'none', color: '#393834', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Đăng Nhập</button>
            <button onClick={() => navigate('/register')} style={{
              backgroundColor: '#b83500', color: '#ffffff', padding: '10px 24px', borderRadius: 8,
              border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'background-color 0.2s',
            }}>Tham Gia Kitchen</button>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 80 }}>
        {/* ===== HERO SECTION ===== */}
        <section style={{
          position: 'relative', height: 921, display: 'flex', alignItems: 'center',
          overflow: 'hidden', padding: '0 48px',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&h=800&fit=crop"
              alt="Couple dining together"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, #fffbff 30%, rgba(255,251,255,0.4) 55%, transparent 80%)',
            }} />
          </div>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 800 }}>
            <span style={{
              color: '#b83500', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              fontSize: 14, marginBottom: 16, display: 'block',
            }}>Đi Để Gặp · Ăn Để Yêu</span>
            <h1 style={{
              fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 800, letterSpacing: '-0.04em',
              color: '#393834', lineHeight: 0.9, marginBottom: 32, marginTop: 0,
            }}>
              Hẹn Hò Qua <br />
              <span style={{ color: '#b83500', fontStyle: 'italic' }}>Ẩm Thực</span> Việt Nam.
            </h1>
            <p style={{
              fontSize: 20, color: '#666460', maxWidth: 560, marginBottom: 40, lineHeight: 1.7,
            }}>
              GOMET là nền tảng hẹn hò độc đáo — nơi bạn tìm người đồng hành qua những bữa ăn. Ghép đôi theo khẩu vị, hẹn hò tại nhà hàng yêu thích, và tạo nên những kỷ niệm đáng nhớ cùng nhau.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <button onClick={() => navigate('/register')} style={{
                backgroundColor: '#b83500', color: '#ffffff', padding: '20px 40px', borderRadius: 8,
                border: 'none', fontSize: 18, fontWeight: 800, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 20px 40px rgba(184,53,0,0.2)',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Tìm Người Hẹn Hò
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'none', border: 'none', color: '#393834', fontWeight: 700,
                fontSize: 16, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <span className="material-symbols-outlined" style={{ color: '#b83500', fontSize: 24 }}>play_circle</span>
                <span>Tìm Hiểu Thêm</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===== WORLD OF REGIONS (Micro-Meals) ===== */}
        <section id="regions" style={{ padding: '128px 48px', backgroundColor: '#FDF9F3' }}>
          <div style={{ maxWidth: 1920, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
              <div style={{ maxWidth: 640 }}>
                <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16, marginTop: 0 }}>Hẹn Hò Theo Vùng Miền</h2>
                <p style={{ fontSize: 18, color: '#666460', lineHeight: 1.7, margin: 0 }}>
                  Ghép đôi theo khẩu vị — tìm người hợp gu ăn uống qua 8 vùng ẩm thực Việt Nam. Cùng nhau khám phá từ phở Hà Nội đến hủ tiếu Sài Gòn.
                </p>
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
                color: '#b83500', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <span>Khám Phá Bản Đồ</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 32, height: 800 }}>
              {/* Large Feature */}
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=500&fit=crop"
                  alt="Vietnamese feast"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: 48,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                }}>
                  <span style={{
                    backgroundColor: '#815f00', color: '#ffffff', padding: '4px 12px', borderRadius: 4,
                    fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block',
                  }}>Cao Nguyên Phía Bắc</span>
                  <h3 style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', margin: '0 0 8px' }}>Gia Vị Ẩn Giấu Của Sapa</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400, margin: 0, fontSize: 16 }}>
                    Khám phá hương vị khói và đất của ẩm thực núi truyền thống của các dân tộc vùng cao.
                  </p>
                </div>
              </div>
              {/* Right Column */}
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 32 }}>
                <div style={{
                  backgroundColor: '#ffffff', borderRadius: 16, padding: 32,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div>
                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#b83500', marginBottom: 16, display: 'block' }}>water_drop</span>
                    <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>Duyên Hải Miền Trung</h3>
                    <p style={{ color: '#666460', margin: 0, fontSize: 15 }}>Nghe thuat uop muoi va vi cay nong cua di san cung dinh Hue.</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&h=300&fit=crop"
                    alt="Spring rolls"
                    style={{ width: '100%', height: 128, objectFit: 'cover', borderRadius: 8, marginTop: 16 }}
                  />
                </div>
                <div style={{
                  backgroundColor: '#393834', color: '#fffbff', borderRadius: 16, padding: 32,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Đồng Bằng Sông Cửu Long</h3>
                    <p style={{ color: 'rgba(255,251,255,0.7)', margin: 0, fontSize: 15 }}>
                      'Vua Lua' cua dat nuoc. Huong vi len men ngot ngao va su tru phu nhiet doi.
                    </p>
                  </div>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute', bottom: -16, right: -16, fontSize: 192, opacity: 0.1, color: '#fffbff',
                  }}>eco</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== YOUR PALATE, QUANTIFIED ===== */}
        <section id="taste" style={{ padding: '128px 48px', backgroundColor: '#fffbff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 0, marginBottom: 16 }}>
                Ghép Đôi Theo <br />Khẩu Vị.
              </h2>
              <p style={{ fontSize: 18, color: '#666460', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                Thuật toán ghép đôi phân tích 42 chỉ số khẩu vị để tìm người hẹn hò hoàn hảo cho bạn. Cùng sở thích ăn uống = cùng nhịp sống.
              </p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
            }}>
              {tasteDimensions.map((item, i) => (
                <div key={i} style={{
                  backgroundColor: '#f7f3ec', borderRadius: 16, padding: 32,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(57,56,52,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    backgroundColor: 'rgba(184,53,0,0.1)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                  }}>
                    <span className="material-symbols-outlined" style={{ color: '#b83500', fontSize: 24 }}>{item.icon}</span>
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: '#82807b', margin: '0 0 12px', fontWeight: 600 }}>{item.subtitle}</p>
                  <p style={{ fontSize: 14, color: '#666460', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SHARED MEMORIES ===== */}
        <section id="community" style={{ padding: '128px 48px', backgroundColor: '#f7f3ec', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1920, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 0, marginBottom: 16 }}>Câu Chuyện Hẹn Hò</h2>
              <p style={{ fontSize: 18, color: '#666460', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                Hàng ngàn cặp đôi đã gặp nhau qua GOMET. Từ bữa cà phê đầu tiên đến những chuyến phiêu lưu ẩm thực cùng nhau.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 32, overflowX: 'auto', paddingBottom: 48 }}>
              {communityCards.map((card, i) => (
                <div key={i} style={{
                  minWidth: 400, backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <div style={{ height: 256, overflow: 'hidden' }}>
                    <img src={card.img} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', border: '2px solid #b83500',
                        overflow: 'hidden',
                      }}>
                        <img src={card.avatar} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{card.name}</div>
                        <div style={{ fontSize: 12, opacity: 0.6 }}>{card.event}</div>
                      </div>
                    </div>
                    <p style={{ fontStyle: 'italic', fontSize: 15, lineHeight: 1.7, color: '#393834', margin: '0 0 16px' }}>
                      "{card.quote}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#b83500', fontWeight: 700, fontSize: 14, gap: 4 }}>
                      <span>Doc Cau Chuyen</span>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section id="cta" style={{
          padding: '160px 48px', position: 'relative', overflow: 'hidden',
          backgroundColor: '#393834',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop"
              alt="Abstract food preparation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }}
            />
          </div>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: '#fffbff',
              letterSpacing: '-0.04em', marginBottom: 32, marginTop: 0, lineHeight: 1,
            }}>
              Sẵn Sàng Hẹn Hò?
            </h2>
            <p style={{ fontSize: 22, color: 'rgba(255,251,255,0.7)', marginBottom: 48 }}>
              Tìm người hẹn hò cùng gu ẩm thực ngay hôm nay. Đi để gặp, ăn để yêu — cùng GOMET.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
              <button onClick={() => navigate('/register')} style={{
                backgroundColor: '#b83500', color: '#ffffff', padding: '24px 48px', borderRadius: 8,
                border: 'none', fontSize: 20, fontWeight: 800, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 20px 50px rgba(184,53,0,0.4)',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Tìm Người Hẹn Hò Ngay
              </button>
              <button onClick={() => navigate('/login')} style={{
                backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)', color: '#fffbff',
                border: '1px solid rgba(255,255,255,0.2)', padding: '24px 48px',
                borderRadius: 8, fontSize: 20, fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'background-color 0.2s',
              }}>
                Xem Trước Không Cần Đăng Ký
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer style={{
        backgroundColor: '#FDF9F3', padding: '48px 48px', borderTop: '1px solid rgba(57,56,52,0.05)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#b83500' }}>GOMET</div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Chinh Sach', 'Dieu Khoan', 'Tieu Chuan', 'Lien He'].map(link => (
              <a key={link} href="#" style={{
                color: 'rgba(57,56,52,0.6)', fontSize: 12, fontWeight: 500, textDecoration: 'none',
              }}>{link}</a>
            ))}
          </div>
          <p style={{
            color: 'rgba(57,56,52,0.4)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.2em', marginTop: 32,
          }}>
            &copy; 2024 GOMET Editorial. The Kinetic Connoisseur.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
