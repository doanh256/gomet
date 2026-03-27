import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

/* ─── Mock data ─────────────────────────────────────────────────────────── */
const visaCards = [
  { name: 'Phở Bò',        status: 'approved', statusText: 'Đã duyệt',         vang: 450, emoji: '🍜', bg: 'linear-gradient(160deg,#3a1a00,#8b3a00)' },
  { name: 'Sushi Omakase', status: 'pending',  statusText: 'Chờ duyệt',         vang: 800, emoji: '🍣', bg: 'linear-gradient(160deg,#001a1a,#003333)' },
  { name: 'Bánh Mì',       status: 'active',   statusText: 'Đang thực hiện',    vang: 300, emoji: '🥖', bg: 'linear-gradient(160deg,#2a1500,#6b3300)' },
];

const matches = [
  { name: 'Mia Patel',  match: 88, dish: 'Phở Bò',  initial: 'M' },
  { name: 'Linh Chi',   match: 76, dish: 'Sushi',    initial: 'L' },
  { name: 'Nam Phong',  match: 82, dish: 'Ramen',    initial: 'N' },
  { name: 'Thu Hà',     match: 71, dish: 'Bánh Mì',  initial: 'T' },
];

const visaSystems = [
  { name: 'Việt Nam', emoji: '🇻🇳', count: 8,  total: 20, bg: 'linear-gradient(135deg,#d83900,#ad2c00)' },
  { name: 'Á Đông',   emoji: '🥢',  count: 3,  total: 15, bg: 'linear-gradient(135deg,#005daa,#003f75)' },
  { name: 'Châu Âu',  emoji: '🍕',  count: 2,  total: 15, bg: 'linear-gradient(135deg,#5d4037,#3e2723)' },
  { name: 'Toàn Cầu', emoji: '🌍',  count: 1,  total: 50, bg: 'linear-gradient(135deg,#2e7d32,#1b5e20)' },
];

/* ─── Badge colours ─────────────────────────────────────────────────────── */
const badgeStyle = (status) => {
  if (status === 'approved') return { background: '#e7f5ed', color: '#1e5d3c' };
  if (status === 'active')   return { background: '#fff3e0', color: '#e65100' };
  return { background: '#f0edec', color: '#5d4038' };
};

/* ─── Component ─────────────────────────────────────────────────────────── */
const HomePage = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const userName = currentUser?.name || currentUser?.displayName || 'Chef';

  /* ─── shared token values ─────────────────────────────────────────────── */
  const C = {
    bg:       '#fcf9f8',
    primary:  '#ad2c00',
    surface:  '#ffffff',
    surfLow:  '#f6f3f2',
    surfMid:  '#f0edec',
    onSurf:   '#1c1b1b',
    onVar:    '#5d4038',
    outline:  '#e7bdb2',
    gold:     '#c97d10',
  };

  /* ====================================================================== */
  /*  MOBILE LAYOUT                                                          */
  /* ====================================================================== */
  if (isMobile) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'var(--font-body, Manrope, sans-serif)', color: C.onSurf }}>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section style={{ padding: '40px 20px 0' }}>
          <h1 style={{
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: '0 0 24px',
            color: C.onSurf,
          }}>
            Đi Để Gặp
            <br />
            <span style={{ color: C.primary, fontStyle: 'italic' }}>·</span>
            {' '}Ăn Để Yêu
          </h1>

          {/* Food photo placeholder */}
          <div style={{
            width: '100%',
            aspectRatio: '4/5',
            borderRadius: '24px',
            background: 'linear-gradient(160deg,#3a1a00 0%,#8b3a00 50%,#c97d10 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '20px',
          }}>
            {/* dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', borderRadius: '24px' }} />
            <span style={{ fontSize: '96px', position: 'relative', zIndex: 1 }}>👨‍🍳</span>
            <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', position: 'relative', zIndex: 1, marginTop: '8px', letterSpacing: '2px' }}>GoMet</span>
          </div>

          <p style={{ fontSize: '15px', lineHeight: 1.7, color: C.onVar, margin: '0 0 40px' }}>
            Visa là tấm vé thông hành đưa bạn đến những tâm hồn đồng điệu thông qua bàn tiệc văn hóa.
          </p>
        </section>

        {/* ── Visa Món Ăn ───────────────────────────────────────────────── */}
        <section style={{ padding: '0 0 40px' }}>
          <div style={{ padding: '0 20px 16px' }}>
            <h2 style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '22px', fontWeight: 700, margin: '0 0 4px', color: C.onSurf }}>
              Visa Món Ăn
            </h2>
            <p style={{ fontSize: '13px', color: C.onVar, margin: 0 }}>Hộ chiếu vị giác của riêng bạn</p>
          </div>

          {/* Horizontal scroll */}
          <div style={{
            display: 'flex',
            gap: '14px',
            overflowX: 'auto',
            padding: '4px 20px 8px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            {visaCards.map((card) => (
              <div
                key={card.name}
                style={{
                  minWidth: '180px',
                  borderRadius: '20px',
                  background: card.bg,
                  padding: '20px 16px',
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '40px' }}>{card.emoji}</span>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 600,
                  alignSelf: 'flex-start',
                  ...badgeStyle(card.status),
                }}>
                  {card.statusText}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontWeight: 700, fontSize: '16px', color: '#fff' }}>{card.name}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                    <span style={{ color: C.gold, fontWeight: 700 }}>{card.vang}</span> VÀNG
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Kết Nối Hương Vị ──────────────────────────────────────────── */}
        <section style={{ padding: '0 20px 60px' }}>
          <h2 style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '22px', fontWeight: 700, margin: '0 0 4px', color: C.onSurf }}>
            Kết Nối Hương Vị
          </h2>
          <p style={{ fontSize: '13px', color: C.onVar, margin: '0 0 20px' }}>
            Những người cùng gu ẩm thực đang chờ bạn
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {matches.map((m) => (
              <div
                key={m.name}
                style={{
                  background: C.surface,
                  borderRadius: '16px',
                  padding: '14px 12px',
                  border: `1px solid ${C.outline}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#ad2c00,#c97d10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '18px',
                  fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                }}>
                  {m.initial}
                </div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: C.onSurf }}>{m.name}</div>
                <div style={{ fontSize: '12px', color: C.primary, fontWeight: 700 }}>{m.match}% phù hợp</div>
                <span style={{
                  display: 'inline-block',
                  background: C.surfMid,
                  color: C.onVar,
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  alignSelf: 'flex-start',
                }}>
                  {m.dish}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/app/matches')}
            style={{
              width: '100%',
              padding: '14px',
              border: `1.5px solid ${C.primary}`,
              borderRadius: '12px',
              background: 'transparent',
              color: C.primary,
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body, Manrope, sans-serif)',
            }}
          >
            Xem thêm
          </button>
        </section>
      </div>
    );
  }

  /* ====================================================================== */
  /*  DESKTOP LAYOUT                                                         */
  /* ====================================================================== */
  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'var(--font-body, Manrope, sans-serif)', color: C.onSurf }}>

      {/* ── Hero (full-width) ────────────────────────────────────────────── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '72px 48px 64px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.05,
            margin: '0 0 24px',
            color: C.onSurf,
          }}>
            Đi Để Gặp{' '}
            <span style={{ color: C.primary, fontStyle: 'italic' }}>·</span>
            <br />
            Ăn Để Yêu
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.7, color: C.onVar, maxWidth: '440px', margin: '0 0 40px' }}>
            Visa là tấm vé thông hành đưa bạn đến những tâm hồn đồng điệu thông qua bàn tiệc văn hóa.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/app/vang-dashboard')}
              style={{
                padding: '16px 36px',
                background: C.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body, Manrope, sans-serif)',
              }}
            >
              Khám phá Visa
            </button>
            <button
              onClick={() => navigate('/app/matches')}
              style={{
                padding: '16px 36px',
                background: 'transparent',
                color: C.primary,
                border: `1.5px solid ${C.primary}`,
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body, Manrope, sans-serif)',
              }}
            >
              Tìm ghép đôi
            </button>
          </div>
        </div>

        {/* Right — editorial portrait placeholder */}
        <div style={{
          aspectRatio: '4/5',
          borderRadius: '32px',
          background: 'linear-gradient(160deg,#3a1a00 0%,#8b3a00 50%,#c97d10 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxHeight: '560px',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', borderRadius: '32px' }} />
          <span style={{ fontSize: '120px', position: 'relative', zIndex: 1 }}>👨‍🍳</span>
          <span style={{ fontSize: '22px', color: 'rgba(255,255,255,0.6)', position: 'relative', zIndex: 1, marginTop: '12px', letterSpacing: '3px', fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontWeight: 700 }}>GoMet</span>
        </div>
      </section>

      {/* ── Hệ thống Visa Ẩm thực ───────────────────────────────────────── */}
      <section style={{ background: C.surfLow, padding: '72px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '36px', fontWeight: 800, margin: '0 0 8px', color: C.onSurf }}>
              Hệ thống Visa Ẩm thực
            </h2>
            <p style={{ fontSize: '16px', color: C.onVar, margin: 0 }}>
              Biến mỗi bữa ăn thành một chuyến phiêu lưu
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {visaSystems.map((vs) => (
              <div
                key={vs.name}
                style={{
                  borderRadius: '20px',
                  background: vs.bg,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/app/vang-dashboard')}
              >
                <span style={{ fontSize: '40px' }}>{vs.emoji}</span>
                <div style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '20px', fontWeight: 700, color: '#fff' }}>{vs.name}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{vs.count} / {vs.total} visa</div>
                {/* Progress bar */}
                <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.round((vs.count / vs.total) * 100)}%`,
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.85)',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hơn cả một ứng dụng hẹn hò ─────────────────────────────────── */}
      <section style={{ padding: '72px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '36px', fontWeight: 800, margin: '0 0 8px', color: C.onSurf }}>
              Hơn cả một ứng dụng hẹn hò
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {/* Feature 1 */}
            <div style={{ background: C.surface, borderRadius: '20px', padding: '36px 28px', border: `1px solid ${C.outline}` }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍜</div>
              <h3 style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '20px', fontWeight: 700, margin: '0 0 12px', color: C.onSurf }}>Visa Ẩm Thực</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: C.onVar, margin: 0 }}>
                Thu thập visa từ mỗi món ăn bạn trải nghiệm. Xây dựng hộ chiếu ẩm thực độc đáo của riêng mình và khám phá những hương vị mới mỗi ngày.
              </p>
            </div>
            {/* Feature 2 */}
            <div style={{ background: C.surface, borderRadius: '20px', padding: '36px 28px', border: `1px solid ${C.outline}` }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💞</div>
              <h3 style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '20px', fontWeight: 700, margin: '0 0 12px', color: C.onSurf }}>Ghép Đôi Thông Minh</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: C.onVar, margin: 0 }}>
                Thuật toán ghép đôi dựa trên gu ẩm thực chung. Tìm người bạn đồng hành hoàn hảo qua những bàn tiệc đáng nhớ.
              </p>
            </div>
            {/* Feature 3 */}
            <div style={{ background: C.surface, borderRadius: '20px', padding: '36px 28px', border: `1px solid ${C.outline}` }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📍</div>
              <h3 style={{ fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)', fontSize: '20px', fontWeight: 700, margin: '0 0 12px', color: C.onSurf }}>Khám Phá Địa Điểm</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: C.onVar, margin: 0 }}>
                Khám phá nhà hàng, quán ăn được cộng đồng GoMet yêu thích. Đặt bàn và tạo nên những kỷ niệm ẩm thực không thể quên.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section style={{
        background: '#1a0d00',
        padding: '80px 48px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
          fontSize: '36px',
          fontWeight: 800,
          color: '#fff',
          margin: '0 0 16px',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Sẵn sàng thu hoạch những Visa Ẩm thực đầu tiên?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', margin: '0 0 40px' }}>
          Hàng nghìn hương vị đang chờ bạn khám phá.
        </p>
        <button
          onClick={() => navigate('/app/vang-dashboard')}
          style={{
            padding: '18px 48px',
            background: C.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '18px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body, Manrope, sans-serif)',
          }}
        >
          Khám phá Ngay
        </button>
      </section>
    </div>
  );
};

export default HomePage;
