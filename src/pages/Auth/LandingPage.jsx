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
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAB1DZU13HzbegFZpF5pzwNut-MoFPdBaFDoPkq2ZFTWeb8fLRwNdZhxYeB7g1v78HClmpPQXnUN9NpKWDaXTr2BvUXwuAk-eUgoGxdwYgS01sja8SRP3n30TtNjuG2_7aZozAp2Q2UlfM-2Bv8lAnwfWtCR-FyL5PNVQFZoyPibNOtBl4hj65zLKQqjmqrIRZwrjW81ptj9VqMJBeGP2xfjvXs5iG4wutVMWKzGBt0DdBzDXPvjINoeVWBjcRJeuAxgGTNydhdCE',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChJ0bbHW-Ya11G2I8RJSa564x8vE3L_X9d7C9hLk3xVEjZTgt2siMK8K4CTxaFDvJaqtOKsAcUlIX6A5ANGqPiu9Al5flRgDyNKbBJEpNl-HsM-92ne-9Q9opcnLev6u1iMZZ7OOyEUwyKUsVPSlGQ7eFE_-fS6sgdkB60F4A6bK7pfC-Gm_73S63TMkW9r-QHlCdjh4iNttzoehh9A_4EbY2AOoWFM6TgrRbgsD34JHXrAqc4ZaZHUz1LXjG1NWXFwP8n0ENZYng',
      name: 'Marcus Chen',
      event: 'Sự Kiện Chef\'s Table',
      quote: 'Buổi gặp mặt trên sân thượng Sài Gòn thật tuyệt vời. Gặp ba nhiếp ảnh gia ẩm thực và khám phá một quán bánh mì ấn tượng.',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCah4O4PEU2JoecG72K4TrcI1nHwywiyrrCjvTKMtTJPKTwW5tJpcWZeAYC69ZNVSvQ_ylph_M4lvEhgUewstHuf-qI32BdiACBMEtCDiWXkjydcXDtZL4cex5_h_Cye1juWHOfXxllYDku0GvTIpJGn1RC6BTPCecQXKvQyiOWbbgcxXSLjegBW7SmCoRfa5479ZEdBAgSz02AwkgUMwORr78bRFvUoU__Bf9schG-khWtDK-nTxjmJ6OKIILJ9BP9d7SqAjyqh7o',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5rB1flkHEhk2SK5klq_WS3m6gQFN6FlewshkwrKVs0wVPc3hX-_yntdlv-rj2L1PMCgnHpoEWP1kDQnmynuLCgTkzEb0RQShs5leLxwpsXRqknM9NJxXfOMdZ3__zr-ds6ypBH7HHa0nnxbzXGI_JafQEeVJJgGSF2A5r8U9JgoQSyhmIAyiDjzY8A0WJw8xsuDQd6IBpr_CEo3KgWHMQbDozGzvX2r_qqdPJr1-9ZVdzGJg4FCOXETMHfCcBLqG8Ghu_DOVRym4',
      name: 'Eliza Thorne',
      event: 'Khám Phá Đà Lạt',
      quote: 'Cuối cùng đạt hạng Connoisseur! Điểm Vàng mở khóa buổi ăn farm-to-table độc quyền trên cao nguyên. Xứng đáng từng bước chân.',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOzOouEgrK9iEq569gppoJ7FQQeChfTPQylhDbMJ89NWtCHtN22rb3OckzQIzIgML-oZf6cVoYJzvWPOUcMuUtzPl3rYijKXITsl9328noY728Koshn5659ujhGRREuHtVj9SUsVEys67fcyItzPBJ2j5T_1cZFL7VYCyo2QMlTLH5vjOw3MZ7guwgz75fs1PsGqodNfTup16-UtrQKPEiXJc5ZPvjAY_p-x0Y7Ptn_5CcWayZcOm7-qcjFpA_yksMvbaSy5zqoUM',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUq9aQsY6EGFTaqugWZeifRSdb6MwJjTcCt0KMNRtriYZ9RSl9sS7epzD39CRpkSXOuh4ITBr2w7t8Dksav3tornbDkVBkE0-mzScjKougCKxf3huOcJrE-U5b1_lXOlXKkEQUfZbihP93FZ3hvf--NWcDxuNwiRICQbYIMpmlCcz8fRI6456C5pOyfl6qaVkeH0b3JUiglvLVstO4BVKdpooPO2zPc4Nm82QjGpUNNH6KnwK2CgFtzebLtcL6B2StjmyZdw5S_o',
      name: 'Julian Voss',
      event: 'Hotspot Hunter',
      quote: 'Lập bản đồ vị cay-umami của miền Trung Việt Nam là dự án 6 tháng của tôi. Công cụ cộng đồng GOMET không gì sánh bằng.',
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
            <a href="#regions" style={{ color: '#FF4D00', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid #FF4D00', paddingBottom: 4, fontSize: 14 }}>Khám Phá Vùng Miền</a>
            <a href="#taste" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Taste Matches</a>
            <a href="#community" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Thử Thách</a>
            <a href="#cta" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Cộng Đồng</a>
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
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop"
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgqcSQ3i6DxJVKPyc2RFs6ICJCx-lLOiwMxH2ozS1aUlQyn7W0bH79h8kt9eHyCugUDn6mjO61mXWXTd3Y22dOmR6KEtvwqSpkMIw_9yjYGlpKxoJ4eOgcplhMr4yV1hzYDpn6pN3e0eFeIQoA7VMKNxG8e-r86RLK71ZSHPGWlADqv_Orw58IIn6-qilAtCosoS6pDxtPs-xdj4uzT5SkP2bFm0alKVox7JlkP8K9bZIQVgaD8Kxrh1Wo_eBFuMk5lI9ptFmUVA0"
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
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbgdFWhEG_qpqctmdm6eluBSqfg2E5UPukmiC6dHMLA6Pwjv2J9FFdJAzLLnLmdknAga8VQJlMD9dnBxLjmOBBwWSERKmDNMvkWE7G-E2lmOZSCpcDMfjw0aoY6y0mCSMwp4xBxkeB5_ZOl09YeTo_yDOfskT-VM1YVzLLp2AU70mu_lZhJ-nYgMMUo8be33w88yRGkYJy_2K19DVim6ZI-nu7TrPFQX-IcGUy8zQ1K4y9Q0HN4o3hS6U0ckfS4AvftsdFDAEbWIE"
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
              src="https://images.unsplash.com/photo-1529543544282-ea57407bc2f7?w=1200&h=600&fit=crop"
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
