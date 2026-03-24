import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const tasteDimensions = [
    { icon: 'local_fire_department', title: 'Do Chiu Cay', subtitle: 'Spice Tolerance', desc: 'Do nhay cam voi cac loai ot va gia vi cay nong tu khap Viet Nam.' },
    { icon: 'public', title: 'Vung Mien', subtitle: 'Regional Focus', desc: 'Kham pha am thuc dac trung cua 8 vung mien tu Tay Bac den Dong bang song Cuu Long.' },
    { icon: 'texture', title: 'Ket Cau', subtitle: 'Texture Preference', desc: 'Tu gion rum den mem min -- phan tich so thich ket cau mon an cua ban.' },
    { icon: 'opacity', title: 'Do Umami', subtitle: 'Umami Depth', desc: 'Kham pha do sau cua vi umami trong khau vi cua ban qua tung mon an.' },
    { icon: 'thermostat', title: 'Nhiet Do', subtitle: 'Temperature Pref', desc: 'Mon nong hay mon lanh? Phan tich xu huong nhiet do mon an ban yeu thich.' },
    { icon: 'eco', title: 'Thanh Phan', subtitle: 'Ingredient Affinity', desc: 'Nguyen lieu nao lam ban say me? He thong theo doi va goi y thong minh.' },
  ];

  const communityCards = [
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAB1DZU13HzbegFZpF5pzwNut-MoFPdBaFDoPkq2ZFTWeb8fLRwNdZhxYeB7g1v78HClmpPQXnUN9NpKWDaXTr2BvUXwuAk-eUgoGxdwYgS01sja8SRP3n30TtNjuG2_7aZozAp2Q2UlfM-2Bv8lAnwfWtCR-FyL5PNVQFZoyPibNOtBl4hj65zLKQqjmqrIRZwrjW81ptj9VqMJBeGP2xfjvXs5iG4wutVMWKzGBt0DdBzDXPvjINoeVWBjcRJeuAxgGTNydhdCE',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChJ0bbHW-Ya11G2I8RJSa564x8vE3L_X9d7C9hLk3xVEjZTgt2siMK8K4CTxaFDvJaqtOKsAcUlIX6A5ANGqPiu9Al5flRgDyNKbBJEpNl-HsM-92ne-9Q9opcnLev6u1iMZZ7OOyEUwyKUsVPSlGQ7eFE_-fS6sgdkB60F4A6bK7pfC-Gm_73S63TMkW9r-QHlCdjh4iNttzoehh9A_4EbY2AOoWFM6TgrRbgsD34JHXrAqc4ZaZHUz1LXjG1NWXFwP8n0ENZYng',
      name: 'Marcus Chen',
      event: 'Su Kien Chef\'s Table',
      quote: 'Buoi gap mat tren san thuong Sai Gon that tuyet voi. Gap ba nhiep anh gia am thuc va kham pha mot quan banh mi an tuong.',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCah4O4PEU2JoecG72K4TrcI1nHwywiyrrCjvTKMtTJPKTwW5tJpcWZeAYC69ZNVSvQ_ylph_M4lvEhgUewstHuf-qI32BdiACBMEtCDiWXkjydcXDtZL4cex5_h_Cye1juWHOfXxllYDku0GvTIpJGn1RC6BTPCecQXKvQyiOWbbgcxXSLjegBW7SmCoRfa5479ZEdBAgSz02AwkgUMwORr78bRFvUoU__Bf9schG-khWtDK-nTxjmJ6OKIILJ9BP9d7SqAjyqh7o',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5rB1flkHEhk2SK5klq_WS3m6gQFN6FlewshkwrKVs0wVPc3hX-_yntdlv-rj2L1PMCgnHpoEWP1kDQnmynuLCgTkzEb0RQShs5leLxwpsXRqknM9NJxXfOMdZ3__zr-ds6ypBH7HHa0nnxbzXGI_JafQEeVJJgGSF2A5r8U9JgoQSyhmIAyiDjzY8A0WJw8xsuDQd6IBpr_CEo3KgWHMQbDozGzvX2r_qqdPJr1-9ZVdzGJg4FCOXETMHfCcBLqG8Ghu_DOVRym4',
      name: 'Eliza Thorne',
      event: 'Kham Pha Da Lat',
      quote: 'Cuoi cung dat hang Connoisseur! Diem Vang mo khoa buoi an farm-to-table doc quyen tren cao nguyen. Xung dang tung buoc chan.',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOzOouEgrK9iEq569gppoJ7FQQeChfTPQylhDbMJ89NWtCHtN22rb3OckzQIzIgML-oZf6cVoYJzvWPOUcMuUtzPl3rYijKXITsl9328noY728Koshn5659ujhGRREuHtVj9SUsVEys67fcyItzPBJ2j5T_1cZFL7VYCyo2QMlTLH5vjOw3MZ7guwgz75fs1PsGqodNfTup16-UtrQKPEiXJc5ZPvjAY_p-x0Y7Ptn_5CcWayZcOm7-qcjFpA_yksMvbaSy5zqoUM',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUq9aQsY6EGFTaqugWZeifRSdb6MwJjTcCt0KMNRtriYZ9RSl9sS7epzD39CRpkSXOuh4ITBr2w7t8Dksav3tornbDkVBkE0-mzScjKougCKxf3huOcJrE-U5b1_lXOlXKkEQUfZbihP93FZ3hvf--NWcDxuNwiRICQbYIMpmlCcz8fRI6456C5pOyfl6qaVkeH0b3JUiglvLVstO4BVKdpooPO2zPc4Nm82QjGpUNNH6KnwK2CgFtzebLtcL6B2StjmyZdw5S_o',
      name: 'Julian Voss',
      event: 'Hotspot Hunter',
      quote: 'Lap ban do vi cay-umami cua mien Trung Viet Nam la du an 6 thang cua toi. Cong cu cong dong GOMET khong gi sanh bang.',
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
            <a href="#regions" style={{ color: '#FF4D00', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid #FF4D00', paddingBottom: 4, fontSize: 14 }}>Kham Pha Vung Mien</a>
            <a href="#taste" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Taste Matches</a>
            <a href="#community" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Thu Thach</a>
            <a href="#cta" style={{ color: '#393834', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Cong Dong</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navigate('/login')} style={{
              background: 'none', border: 'none', color: '#393834', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Dang Nhap</button>
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwL5VSBVKnlwsXrFTqmEqcccLMK7L2Ln4hO0y0p_BV-9n1YrSkUJBSkcPFZ2V24idTvGQL9KWUX45E5GEb6EeaGSNAyPFUtwd8WLStMiAsp4fMTrMviYFPIIbgSXL4D5pjDypwlF7IWv6Wfg9vX9LKqcpeNFsekZmXArX3ofJFHJE0Lsc7brkDuKA1HdF8M_qSEcAkB7oJMeNTJsnS4g3_9tmbn-mhkKmZDt97xYi8OBNE35SGYzsE6bXDlm8BHHygWf2-AoYpwME"
              alt="Chef in kitchen"
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
            }}>The Kinetic Connoisseur</span>
            <h1 style={{
              fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 800, letterSpacing: '-0.04em',
              color: '#393834', lineHeight: 0.9, marginBottom: 32, marginTop: 0,
            }}>
              Kham Pha <br />
              <span style={{ color: '#b83500', fontStyle: 'italic' }}>Huong Vi</span> Khoa Hoc.
            </h1>
            <p style={{
              fontSize: 20, color: '#666460', maxWidth: 560, marginBottom: 40, lineHeight: 1.7,
            }}>
              GOMET ket hop bao chi am thuc cao cap voi khoa hoc ghep noi vi giac. Kham pha vung mien, tich diem Vang va lam chu nghe thuat cua mieng an hoan hao.
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
                Bat Dau Hanh Trinh
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'none', border: 'none', color: '#393834', fontWeight: 700,
                fontSize: 16, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <span className="material-symbols-outlined" style={{ color: '#b83500', fontSize: 24 }}>play_circle</span>
                <span>Tim Hieu Them</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===== WORLD OF REGIONS (Micro-Meals) ===== */}
        <section id="regions" style={{ padding: '128px 48px', backgroundColor: '#FDF9F3' }}>
          <div style={{ maxWidth: 1920, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
              <div style={{ maxWidth: 640 }}>
                <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16, marginTop: 0 }}>The Gioi Micro-Meals</h2>
                <p style={{ fontSize: 18, color: '#666460', lineHeight: 1.7, margin: 0 }}>
                  Hanh trinh duoc tuyen chon qua 8 vung am thuc dac trung cua Viet Nam, tu cao nguyen hung vi den nhip song Mekong.
                </p>
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
                color: '#b83500', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <span>Kham Pha Ban Do</span>
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
                  }}>Cao Nguyen Phia Bac</span>
                  <h3 style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', margin: '0 0 8px' }}>Gia Vi An Giau Cua Sapa</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400, margin: 0, fontSize: 16 }}>
                    Kham pha huong vi khoi va dat cua am thuc nui truyen thong cua cac dan toc vung cao.
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
                    <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>Duyen Hai Mien Trung</h3>
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
                    <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Dong Bang Song Cuu Long</h3>
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
                Khau Vi Cua Ban, <br />Duoc Luong Hoa.
              </h2>
              <p style={{ fontSize: 18, color: '#666460', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                Thuat toan cua chung toi phan tich 42 chi so huong vi de du doan mon an yeu thich tiep theo cua ban trong mang luoi GOMET.
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
              <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 0, marginBottom: 16 }}>Ky Niem Chung</h2>
              <p style={{ fontSize: 18, color: '#666460', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                Bep la cong dong. Tham gia cung hang ngan nguoi sieu am thuc chia se dia diem moi nhat va nhung dot pha am thuc.
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwtNfeNa7LC9JPKzXrVar3B9jrLpKBc523Vyx4mfVVIJaSjxUNO3HSIHgvlb6IpKQggo4r3l-aoN53FbuZhf6didaTffKzVs2HlNaFXaV80B5ErtTlNi7zONwbmJBEj-IzeN-jmCnZtaGw4Yp_9F6rbyB6-eP4ARvYvRokAv2gud0lLHk_5oZ_sBJg5q1AhSpUfITvlMm3DYQxHxAHkpgfvqEPcc7_FCD_i5sqy_Ap8GpvTllXLnB0klL1zRGrADcohrDP3Mkg_zk"
              alt="Abstract food preparation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }}
            />
          </div>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: '#fffbff',
              letterSpacing: '-0.04em', marginBottom: 32, marginTop: 0, lineHeight: 1,
            }}>
              San Sang Tham Gia Kitchen?
            </h2>
            <p style={{ fontSize: 22, color: 'rgba(255,251,255,0.7)', marginBottom: 48 }}>
              Tro thanh Kinetic Connoisseur ngay hom nay va bat dau hanh trinh qua nhung huong vi song dong nhat the gioi.
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
                Bat Dau Hanh Trinh Am Thuc
              </button>
              <button onClick={() => navigate('/login')} style={{
                backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)', color: '#fffbff',
                border: '1px solid rgba(255,255,255,0.2)', padding: '24px 48px',
                borderRadius: 8, fontSize: 20, fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'background-color 0.2s',
              }}>
                Kham Pha Voi Tu Cach Khach
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
