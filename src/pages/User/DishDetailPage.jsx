import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dish = {
  id: 'pho-bo',
  name: 'Visa Phở Bò',
  subtitle: 'Biểu tượng văn hóa ẩm thực Việt Nam trong lòng tô bánh phở truyền thống',
  rank: 'MASTER',
  country: 'VIỆT NAM',
  story: 'Phở bò là di sản ẩm thực quý giá của Việt Nam, ra đời từ đầu thế kỷ 20 tại vùng đồng bằng Bắc Bộ. Hương thơm đặc trưng từ gừng nướng, hành tây và những loại gia vị như quế, hồi, thảo quả quyện cùng nước dùng ninh nhừ từ xương bò tạo nên linh hồn của món ăn. Mỗi tô phở là một hành trình khám phá văn hóa, nơi truyền thống và hiện đại giao thoa, trở thành đại sứ ẩm thực của Việt Nam trên toàn thế giới.',
  ingredients: ['Thịt bò', 'Bánh phở', 'Hành', 'Gừng', 'Quế', 'Hồi', 'Ngò gai', 'Chanh'],
  nutrition: { kcal: 450, protein: 28, carbs: 52, fat: 12 },
  vangReward: 850,
  timesEaten: 12,
  firstDate: '05/03/2024',
  restaurants: [
    { name: 'Phở Gia Truyền', rating: 4.9, type: 'Hà Nội' },
    { name: 'Phở Lý Quốc Sư', rating: 4.8, type: 'Hà Nội' },
    { name: 'Phở Tàu Bay', rating: 4.7, type: 'TP.HCM' },
  ],
};

const DishDetailPage = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 1024;

  const [storyOpen, setStoryOpen] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [placesOpen, setPlacesOpen] = useState(false);
  const [certified, setCertified] = useState(false);

  /* ─── shared tokens ─── */
  const color = {
    bg: '#fcf9f8',
    primary: '#ad2c00',
    white: '#ffffff',
    surfaceLow: '#f6f3f2',
    surface: '#f0edec',
    onSurface: '#1c1b1b',
    onSurfaceVariant: '#5d4038',
    outlineVariant: '#e7bdb2',
  };

  /* ─── accordion helper ─── */
  const Accordion = ({ open, onToggle, title, children }) => (
    <div style={{
      borderRadius: 16,
      backgroundColor: color.white,
      border: `1px solid ${color.outlineVariant}`,
      marginBottom: 12,
      overflow: 'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          fontSize: 15,
          fontWeight: 700,
          color: color.onSurface,
        }}
        aria-expanded={open}
      >
        {title}
        <span style={{
          fontSize: 20,
          color: color.primary,
          transition: 'transform 0.2s',
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 20px' }}>
          {children}
        </div>
      )}
    </div>
  );

  /* ─── MOBILE LAYOUT ─── */
  if (isMobile) {
    return (
      <div style={{
        minHeight: '100dvh',
        backgroundColor: color.bg,
        fontFamily: 'var(--font-body, "Manrope", sans-serif)',
        color: color.onSurface,
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Top bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: color.white,
          borderBottom: `1px solid ${color.outlineVariant}`,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <button
            onClick={() => navigate(-1)}
            aria-label="Quay lại"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: color.surfaceLow,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: color.onSurface,
            }}
          >←</button>
          <span style={{
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontWeight: 800, fontSize: 15, color: color.onSurface,
          }}>Dish Details</span>
          <button
            aria-label="Chia sẻ"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: color.surfaceLow,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: color.onSurface,
            }}
          >⤴</button>
        </div>

        {/* Character hero */}
        <div style={{
          background: 'linear-gradient(160deg, #1a0d00, #3a1500)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px 32px',
          gap: 12,
        }}>
          <div style={{ fontSize: 80, lineHeight: 1 }}>🧑‍🍳</div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 16px',
            borderRadius: 9999,
            background: 'linear-gradient(135deg, #c8a84b, #f0d060)',
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontWeight: 800,
            fontSize: 12,
            color: '#1a0d00',
            letterSpacing: '0.08em',
          }}>
            ★ RANK {dish.rank} ★★★
          </div>
        </div>

        {/* Title section */}
        <div style={{ padding: '24px 20px 12px', backgroundColor: color.white }}>
          <h1 style={{
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontSize: 26,
            fontWeight: 800,
            fontStyle: 'italic',
            color: color.onSurface,
            margin: '0 0 8px',
          }}>{dish.name}</h1>
          <p style={{
            fontSize: 13,
            color: color.onSurfaceVariant,
            lineHeight: 1.6,
            margin: 0,
          }}>{dish.subtitle}</p>
        </div>

        {/* Accordion sections */}
        <div style={{ padding: '16px 16px 24px', flex: 1 }}>

          {/* Câu chuyện */}
          <Accordion
            open={storyOpen}
            onToggle={() => setStoryOpen(!storyOpen)}
            title="📖 Câu chuyện"
          >
            <p style={{
              fontSize: 14,
              color: color.onSurfaceVariant,
              lineHeight: 1.7,
              margin: 0,
            }}>{dish.story}</p>
          </Accordion>

          {/* Thành phần */}
          <Accordion
            open={ingredientsOpen}
            onToggle={() => setIngredientsOpen(!ingredientsOpen)}
            title="🥘 Thành phần"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dish.ingredients.map(ing => (
                <span key={ing} style={{
                  padding: '6px 14px',
                  borderRadius: 9999,
                  backgroundColor: color.surfaceLow,
                  border: `1px solid ${color.outlineVariant}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: color.onSurface,
                }}>{ing}</span>
              ))}
            </div>
            <div style={{
              marginTop: 16,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${color.primary}, #7a1e00)`,
              padding: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              textAlign: 'center',
            }}>
              {[
                { label: 'kcal', value: dish.nutrition.kcal },
                { label: 'Đạm', value: `${dish.nutrition.protein}g` },
                { label: 'Carbs', value: `${dish.nutrition.carbs}g` },
                { label: 'Béo', value: `${dish.nutrition.fat}g` },
              ].map(n => (
                <div key={n.label}>
                  <div style={{
                    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#fff',
                  }}>{n.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{n.label}</div>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Địa điểm gợi ý */}
          <Accordion
            open={placesOpen}
            onToggle={() => setPlacesOpen(!placesOpen)}
            title="📍 Địa điểm gợi ý"
          >
            {/* Map placeholder */}
            <div style={{
              height: 100,
              borderRadius: 12,
              backgroundColor: '#2d2d2d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              fontWeight: 600,
            }}>🗺 Bản đồ khu vực</div>
            {dish.restaurants.map(r => (
              <div key={r.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 12,
                backgroundColor: color.surfaceLow,
                marginBottom: 8,
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: color.onSurface }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: color.onSurfaceVariant, marginTop: 2 }}>{r.type}</div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  color: color.primary,
                }}>⭐ {r.rating}</div>
              </div>
            ))}
          </Accordion>
        </div>

        {/* Bottom nav */}
        <div style={{
          display: 'flex',
          borderTop: `1px solid ${color.outlineVariant}`,
          backgroundColor: color.white,
          position: 'sticky',
          bottom: 0,
        }}>
          {[
            { icon: '🧭', label: 'DISCOVER' },
            { icon: '📚', label: 'COLLECTIONS' },
            { icon: '👤', label: 'PROFILE' },
          ].map((tab, i) => (
            <button key={tab.label} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '12px 8px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              fontSize: 10,
              fontWeight: 700,
              color: i === 0 ? color.primary : color.onSurfaceVariant,
              letterSpacing: '0.04em',
              borderTop: i === 0 ? `2px solid ${color.primary}` : '2px solid transparent',
            }}>
              <span style={{ fontSize: 20 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ─── DESKTOP LAYOUT ─── */
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: color.bg,
      fontFamily: 'var(--font-body, "Manrope", sans-serif)',
      color: color.onSurface,
    }}>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: 64,
        backgroundColor: color.white,
        borderBottom: `1px solid ${color.outlineVariant}`,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: color.onSurfaceVariant,
          }}
        >← Quay lại</button>
        <span style={{
          fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          fontWeight: 900,
          fontSize: 20,
          color: color.primary,
          letterSpacing: '-0.02em',
        }}>DishPassport</span>
        <button
          aria-label="Chia sẻ"
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: color.surfaceLow,
            border: `1px solid ${color.outlineVariant}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}
        >⤴</button>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #1a0d00, #3a1500)',
        padding: '60px 48px',
        display: 'flex',
        alignItems: 'center',
        gap: 48,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', right: 80, top: '50%',
          transform: 'translateY(-50%)',
          width: 300, height: 300,
          borderRadius: '50%',
          border: '1px solid rgba(200,168,75,0.15)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 120, top: '50%',
          transform: 'translateY(-50%)',
          width: 220, height: 220,
          borderRadius: '50%',
          border: '1px solid rgba(200,168,75,0.1)',
          pointerEvents: 'none',
        }} />

        {/* Gold circular emblem */}
        <div style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c8a84b, #f0d060, #c8a84b)',
          border: '6px solid rgba(200,168,75,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 40px rgba(200,168,75,0.3)',
          gap: 4,
        }}>
          <span style={{ fontSize: 40, lineHeight: 1 }}>🏛️</span>
          <div style={{
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontWeight: 900,
            fontSize: 9,
            color: '#1a0d00',
            letterSpacing: '0.12em',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>KỲ THI THỰC<br />
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>
              SIGNATURE DISH · VIỆT NAM
            </span>
          </div>
        </div>

        {/* Hero text */}
        <div>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 9999,
            background: 'rgba(200,168,75,0.2)',
            border: '1px solid rgba(200,168,75,0.4)',
            fontSize: 11,
            fontWeight: 700,
            color: '#f0d060',
            letterSpacing: '0.1em',
            marginBottom: 16,
          }}>★ RANK {dish.rank} · {dish.country}</div>
          <h1 style={{
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontSize: 48,
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#fff',
            margin: '0 0 12px',
            lineHeight: 1.1,
          }}>{dish.name}</h1>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 520,
            lineHeight: 1.6,
            margin: 0,
          }}>{dish.subtitle}</p>
        </div>
      </div>

      {/* Two-column body */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 48px',
        display: 'flex',
        gap: 32,
        alignItems: 'flex-start',
      }}>

        {/* Left column */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Câu chuyện văn hóa */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{
              fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              fontSize: 16,
              fontWeight: 800,
              color: color.onSurface,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}><span style={{ color: color.primary }}>📖</span> Câu chuyện văn hóa</h2>
            <Accordion
              open={storyOpen}
              onToggle={() => setStoryOpen(!storyOpen)}
              title="Khám phá lịch sử & nguồn gốc"
            >
              <p style={{
                fontSize: 14,
                color: color.onSurfaceVariant,
                lineHeight: 1.8,
                margin: 0,
              }}>{dish.story}</p>
            </Accordion>
          </div>

          {/* Hồ sơ ẩm thực */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{
              fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              fontSize: 16,
              fontWeight: 800,
              color: color.onSurface,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}><span style={{ color: color.primary }}>🥘</span> Hồ sơ ẩm thực</h2>

            {/* Ingredient tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {dish.ingredients.map(ing => (
                <span key={ing} style={{
                  padding: '6px 16px',
                  borderRadius: 9999,
                  backgroundColor: color.white,
                  border: `1px solid ${color.outlineVariant}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: color.onSurface,
                }}>{ing}</span>
              ))}
            </div>

            {/* Nutrition card */}
            <div style={{
              borderRadius: 16,
              background: `linear-gradient(135deg, ${color.primary}, #7a1e00)`,
              padding: '20px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              textAlign: 'center',
            }}>
              {[
                { label: 'kcal', value: dish.nutrition.kcal },
                { label: 'Đạm', value: `${dish.nutrition.protein}g` },
                { label: 'Carbs', value: `${dish.nutrition.carbs}g` },
                { label: 'Béo', value: `${dish.nutrition.fat}g` },
              ].map(n => (
                <div key={n.label}>
                  <div style={{
                    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 1,
                  }}>{n.value}</div>
                  <div style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.65)',
                    marginTop: 4,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}>{n.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bản đồ Trải nghiệm */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
              fontSize: 16,
              fontWeight: 800,
              color: color.onSurface,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}><span style={{ color: color.primary }}>📍</span> Bản đồ Trải nghiệm</h2>

            {/* Map placeholder */}
            <div style={{
              height: 140,
              borderRadius: 16,
              backgroundColor: '#2d2d2d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              color: 'rgba(255,255,255,0.35)',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}>🗺 Bản đồ khu vực · Hà Nội & TP.HCM</div>

            {/* Restaurant mini cards */}
            <div style={{ display: 'flex', gap: 12 }}>
              {dish.restaurants.map(r => (
                <div key={r.name} style={{
                  flex: 1,
                  padding: '14px 16px',
                  borderRadius: 14,
                  backgroundColor: color.white,
                  border: `1px solid ${color.outlineVariant}`,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                    fontWeight: 700,
                    fontSize: 13,
                    color: color.onSurface,
                    marginBottom: 4,
                  }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: color.onSurfaceVariant, marginBottom: 8 }}>{r.type}</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: color.primary,
                  }}>⭐ {r.rating}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 320, flexShrink: 0 }}>
          <div style={{
            borderRadius: 20,
            backgroundColor: color.white,
            border: `1px solid ${color.outlineVariant}`,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(173,44,0,0.07)',
          }}>
            {/* Card header */}
            <div style={{
              padding: '20px 24px 16px',
              borderBottom: `1px solid ${color.outlineVariant}`,
            }}>
              <div style={{
                fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                fontWeight: 800,
                fontSize: 15,
                color: color.onSurface,
                marginBottom: 16,
              }}>Thống kê Visa</div>

              {/* User row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${color.primary}, #7a1e00)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}>👩</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                    fontWeight: 700,
                    fontSize: 14,
                    color: color.onSurface,
                  }}>Hằng Thị</div>
                  <div style={{
                    fontSize: 12,
                    color: color.onSurfaceVariant,
                    marginTop: 1,
                  }}>Rank {dish.rank} Explorer</div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Điểm tích lũy', value: `+${dish.vangReward}`, icon: '🏅' },
                  { label: 'Thành tích', value: dish.timesEaten, icon: '✅' },
                  { label: 'Lần đầu', value: dish.firstDate, icon: '📅' },
                ].map(stat => (
                  <div key={stat.label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 12,
                    backgroundColor: color.surfaceLow,
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 13,
                      color: color.onSurfaceVariant,
                      fontWeight: 500,
                    }}>
                      <span>{stat.icon}</span>
                      {stat.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                      fontWeight: 800,
                      fontSize: 14,
                      color: color.primary,
                    }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 16 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: color.onSurfaceVariant,
                  marginBottom: 6,
                  fontWeight: 600,
                }}>
                  <span>Tiến độ tích lũy</span>
                  <span style={{ color: color.primary }}>850 / 1000</span>
                </div>
                <div style={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: color.surface,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: '85%',
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${color.primary}, #e84c00)`,
                  }} />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ padding: '20px 24px' }}>
              <button
                onClick={() => setCertified(!certified)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 9999,
                  border: 'none',
                  background: certified
                    ? 'linear-gradient(135deg, #117500, #2d9600)'
                    : `linear-gradient(135deg, ${color.primary}, #7a1e00)`,
                  color: '#fff',
                  fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  letterSpacing: '0.02em',
                  boxShadow: certified
                    ? '0 4px 16px rgba(17,117,0,0.3)'
                    : `0 4px 16px rgba(173,44,0,0.3)`,
                  transition: 'all 0.2s ease',
                }}
              >
                {certified ? '✅ Đã ký chứng nhận' : '🖊 Ký chứng nhận Visa'}
              </button>
              <p style={{
                fontSize: 11,
                color: color.onSurfaceVariant,
                textAlign: 'center',
                marginTop: 10,
                lineHeight: 1.5,
              }}>Xác nhận bạn đã trải nghiệm món ăn này và nhận điểm thưởng.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailPage;
