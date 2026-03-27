import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dish = {
  id: 'pho-bo',
  name: 'Phở Bò Tái Lăn',
  subtitle: 'Biểu tượng văn hóa ẩm thực Việt Nam trong từng sợi bánh phở trắng ngần.',
  story: 'Phở bò không chỉ là một món ăn, mà là cả một bầu trời ký ức của người Hà Nội. Ra đời từ đầu thế kỷ 20, món ăn là sự giao thoa tinh tế giữa sợi bánh phở mềm mại và nước dùng thanh ngọt được ninh từ xương ống bò trong suốt 12 giờ. Mỗi bát phở là một tác phẩm nghệ thuật của hương vị và tâm hồn người nấu.',
  ingredients: [
    'Thăn bò tươi',
    'Xương ống bò',
    'Quế, Hồi, Gừng',
    'Bánh phở tươi',
  ],
  vangPoints: 50,
  rating: 4,
  restaurants: [
    {
      name: 'Phở Gia Truyền Bát Đàn',
      address: '49 Bát Đàn, Hoàn Kiếm, Hà Nội',
    },
    {
      name: 'Phở Lý Quốc Sư',
      address: '10 Lý Quốc Sư, Hoàn Kiếm, Hà Nội',
    },
    {
      name: 'Phở Tàu Bay',
      address: '433 Lý Thường Kiệt, Tân Bình, TP.HCM',
    },
  ],
};

const colors = {
  background: '#fcf9f8',
  surfaceLowest: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  outlineVariant: '#e7bdb2',
  primaryFixed: '#ffdbd1',
  onSecondaryFixedVariant: '#872101',
};

const fontHeadline = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Manrope', sans-serif";

const DishDetailPage = () => {
  const navigate = useNavigate();

  const [storyOpen, setStoryOpen] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [placesOpen, setPlacesOpen] = useState(true);

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: colors.background,
        fontFamily: fontBody,
        color: colors.onSurface,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'rgba(252,249,248,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate(-1)}
            aria-label="Quay lại"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1
            style={{
              fontFamily: fontHeadline,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '-0.02em',
              color: colors.onSurface,
              margin: 0,
            }}
          >
            Dish Details
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            aria-label="Chia sẻ"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            <span className="material-symbols-outlined">share</span>
          </button>
          <button
            aria-label="Thêm tùy chọn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </nav>

      <main style={{ paddingTop: 64, paddingBottom: 128 }}>
        <section
          style={{
            position: 'relative',
            height: 397,
            width: '100%',
            overflow: 'hidden',
            background:
              'linear-gradient(160deg, #ff6b35 0%, #ad2c00 40%, #7a1e00 70%, #3d0f00 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 60% 40%, rgba(255,180,100,0.35) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontSize: 120,
              lineHeight: 1,
              filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.35))',
              position: 'relative',
              zIndex: 1,
            }}
          >
            🍜
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, #fcf9f8 0%, transparent 50%)',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />
        </section>

        <section
          style={{
            padding: '0 32px',
            marginTop: -48,
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: colors.surfaceLowest,
              padding: 32,
              borderRadius: 16,
              boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  backgroundColor: colors.primaryFixed,
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 14,
                    color: colors.onSecondaryFixedVariant,
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  workspace_premium
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: colors.onSecondaryFixedVariant,
                    fontFamily: fontBody,
                  }}
                >
                  Visa Món Ăn
                </span>
              </div>

              <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 16,
                      color: colors.primary,
                      fontVariationSettings:
                        star <= dish.rating ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>

            <h2
              style={{
                fontFamily: fontHeadline,
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: colors.onSurface,
                margin: '0 0 8px',
                lineHeight: 1.1,
              }}
            >
              {dish.name}
            </h2>

            <p
              style={{
                fontFamily: fontBody,
                fontSize: 14,
                fontWeight: 500,
                color: colors.onSurfaceVariant,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {dish.subtitle}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 16,
                padding: '6px 14px',
                borderRadius: 9999,
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}`,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 16,
                  color: colors.primary,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                stars
              </span>
              <span
                style={{
                  fontFamily: fontBody,
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.primary,
                }}
              >
                +{dish.vangPoints} điểm VÀNG khi check-in
              </span>
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 40,
            padding: '0 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <AccordionSection
            open={storyOpen}
            onToggle={() => setStoryOpen(!storyOpen)}
            icon="auto_stories"
            title="Câu chuyện"
          >
            <p
              style={{
                fontSize: 14,
                fontFamily: fontBody,
                color: colors.onSurfaceVariant,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {dish.story}
            </p>
          </AccordionSection>

          <AccordionSection
            open={ingredientsOpen}
            onToggle={() => setIngredientsOpen(!ingredientsOpen)}
            icon="soup_kitchen"
            title="Thành phần"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              {dish.ingredients.map((ing) => (
                <div
                  key={ing}
                  style={{
                    backgroundColor: colors.background,
                    padding: '12px 14px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18, color: '#a83918' }}
                  >
                    check_circle
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: fontBody,
                      color: colors.onSurface,
                    }}
                  >
                    {ing}
                  </span>
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            open={placesOpen}
            onToggle={() => setPlacesOpen(!placesOpen)}
            icon="near_me"
            title="Địa điểm gợi ý"
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 160,
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: 16,
                border: `1px solid ${colors.outlineVariant}`,
                background:
                  'linear-gradient(135deg, #e8f4f8 0%, #d4e8f0 50%, #c8dfe8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: `rgba(173,44,0,0.06)`,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gridTemplateRows: 'repeat(4, 1fr)',
                  gap: 1,
                  width: '100%',
                  height: '100%',
                  opacity: 0.25,
                }}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor:
                        i % 3 === 0
                          ? '#c8dfe8'
                          : i % 5 === 0
                          ? '#a8c8d8'
                          : '#ddeef5',
                    }}
                  />
                ))}
              </div>
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  fontSize: 40,
                  color: colors.primary,
                  fontVariationSettings: "'FILL' 1",
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              >
                location_on
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {dish.restaurants.map((r) => (
                <button
                  key={r.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    backgroundColor: colors.background,
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      backgroundColor: colors.surfaceContainer,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                    }}
                  >
                    🍜
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: fontBody,
                        fontWeight: 700,
                        fontSize: 14,
                        color: colors.onSurface,
                        marginBottom: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: colors.onSurfaceVariant,
                        fontFamily: fontBody,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {r.address}
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 20, color: colors.primary, flexShrink: 0 }}
                  >
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </AccordionSection>
        </section>
      </main>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 24px 24px',
          background:
            'linear-gradient(to top, #fcf9f8 60%, rgba(252,249,248,0.95) 80%, transparent 100%)',
          zIndex: 40,
        }}
      >
        <button
          onClick={() => navigate('/app/booking')}
          style={{
            width: '100%',
            height: 64,
            backgroundColor: colors.primary,
            color: '#ffffff',
            border: 'none',
            borderRadius: 9999,
            fontFamily: fontHeadline,
            fontWeight: 800,
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 12px 24px rgba(173,44,0,0.3)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: 22 }}
          >
            add_circle
          </span>
          Đặt chỗ
          <span
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            +{dish.vangPoints} VÀNG
          </span>
        </button>
      </div>
    </div>
  );
};

const AccordionSection = ({ open, onToggle, icon, title, children }) => (
  <div
    style={{
      borderRadius: 16,
      backgroundColor: open ? colors.surfaceLowest : colors.surfaceContainerLow,
      transition: 'background-color 0.3s',
      overflow: 'hidden',
    }}
  >
    <button
      onClick={onToggle}
      aria-expanded={open}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        listStyle: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'rgba(173,44,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 20, color: colors.primary }}
          >
            {icon}
          </span>
        </div>
        <span
          style={{
            fontFamily: fontHeadline,
            fontWeight: 700,
            fontSize: 17,
            color: colors.onSurface,
          }}
        >
          {title}
        </span>
      </div>
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: 22,
          color: '#926f66',
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s',
        }}
      >
        expand_more
      </span>
    </button>
    {open && (
      <div style={{ padding: '0 24px 28px' }}>{children}</div>
    )}
  </div>
);

export default DishDetailPage;
