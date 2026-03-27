import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_EVENT = {
  id: 1,
  title: 'Đêm nhạc Acoustic & Wine Tasting',
  date: 'Thứ 7, 28 Tháng 3, 2026',
  time: '19:00 — 28/03/2026',
  location: 'The Myst Rooftop, Quận 1, TP.HCM',
  price: '350.000 VND',
  attendees: 24,
  maxAttendees: 40,
  category: 'Premium Experience',
  description:
    'Một buổi tối lãng mạn với âm nhạc acoustic sống động và thưởng thức các loại rượu vang hàng đầu. Đây là cơ hội tuyệt vời để gặp gỡ những người cùng sở thích trong không gian ấm cúng và sang trọng. Chương trình bao gồm 3 ly rượu vang, đồ ăn nhẹ và biểu diễn nhạc sống.',
  organizer: 'GoMet Events',
  organizerDescription:
    'GoMet Events chuyên tổ chức các sự kiện gặp gỡ và kết nối cộng đồng tại TP.HCM. Chúng tôi tin rằng những kết nối thực sự bắt đầu từ những trải nghiệm chia sẻ.',
  attendeesList: [
    { id: 1, name: 'Minh Thu', initials: 'MT', color: '#ffdbd1' },
    { id: 2, name: 'Hoang Nam', initials: 'HN', color: '#e7bdb2' },
    { id: 3, name: 'Thuy Linh', initials: 'TL', color: '#ffdbd1' },
    { id: 4, name: 'Duc Anh', initials: 'DA', color: '#e7bdb2' },
    { id: 5, name: 'Ha My', initials: 'HM', color: '#ffdbd1' },
    { id: 6, name: 'Quang Huy', initials: 'QH', color: '#e7bdb2' },
  ],
  similarEvents: [
    { id: 2, title: 'Speed Dating tại Saigon', date: 'CN, 30 Tháng 3', emoji: '💘' },
    { id: 3, title: 'Board Game & Coffee Meet', date: 'Thứ 5, 3 Tháng 4', emoji: '🎲' },
  ],
};

const avatarGradients = [
  'linear-gradient(135deg, #ffdbd1, #ad2c00)',
  'linear-gradient(135deg, #e7bdb2, #5d4038)',
  'linear-gradient(135deg, #ffdbd1, #d83900)',
  'linear-gradient(135deg, #ffb5a0, #872000)',
  'linear-gradient(135deg, #ffdbd1, #ad2c00)',
  'linear-gradient(135deg, #e7bdb2, #5d4038)',
];

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [bookmarked, setBookmarked] = useState(false);
  const event = MOCK_EVENT;

  return (
    <div style={{ minHeight: '100vh', background: '#fcf9f8', color: '#1c1b1b', fontFamily: "'Manrope', sans-serif", overflowX: 'hidden' }}>

      <header style={{ background: '#fcf9f8', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #e7bdb2' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', maxWidth: 1280, margin: '0 auto' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#1c1b1b', fontFamily: "'Manrope', sans-serif", fontSize: 14, fontWeight: 600 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#ad2c00' }}>arrow_back</span>
            <span style={{ color: '#5d4038' }}>Quay lại</span>
          </button>
          <div style={{ color: '#ad2c00', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: '-0.05em' }}>GoMet</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => {}}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ad2c00' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>share</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ad2c00' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 120px' }}>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start', marginBottom: 64 }}>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '1rem',
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: 'linear-gradient(135deg, #ffdbd1 0%, #ad2c00 50%, #5d4038 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
            }}>
              <span style={{ fontSize: 80 }}>🎶</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{
                background: 'rgba(173,44,0,0.1)',
                color: '#ad2c00',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                {event.category}
              </span>
              <span style={{ color: 'rgba(93,64,56,0.6)', fontSize: 13, fontWeight: 500 }}>
                {event.attendees}/{event.maxAttendees} người
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: '#1c1b1b',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: 28,
            }}>
              {event.title}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem',
                  background: '#f0edec',
                  color: '#ad2c00',
                  flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>calendar_today</span>
                </div>
                <div>
                  <p style={{ color: '#5d4038', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>Thời gian</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#1c1b1b' }}>{event.time}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem',
                  background: '#f0edec',
                  color: '#ad2c00',
                  flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>location_on</span>
                </div>
                <div>
                  <p style={{ color: '#5d4038', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>Địa điểm</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#1c1b1b', textDecoration: 'underline', textDecorationColor: 'rgba(173,44,0,0.3)', textUnderlineOffset: 4 }}>{event.location}</p>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              background: '#f6f3f2',
              borderRadius: '1rem',
              border: '1px solid rgba(231,189,178,0.15)',
              marginBottom: 24,
            }}>
              <div>
                <p style={{ color: '#5d4038', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 4 }}>Giá vé</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: '#ad2c00' }}>{event.price}</p>
              </div>
              <button
                onClick={() => navigate('/app/booking')}
                style={{
                  background: '#ad2c00',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(173,44,0,0.25)',
                }}
              >
                Đăng ký tham gia
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {event.attendeesList.slice(0, 4).map((a, i) => (
                <div
                  key={a.id}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '9999px',
                    background: avatarGradients[i % avatarGradients.length],
                    border: '2px solid #ffffff',
                    marginLeft: i === 0 ? 0 : -10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  {a.initials}
                </div>
              ))}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '9999px',
                  background: '#ebe7e7',
                  border: '2px solid #ffffff',
                  marginLeft: -10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#5d4038',
                  flexShrink: 0,
                }}
              >
                +{event.attendees - 4}
              </div>
              <span style={{ marginLeft: 10, fontSize: 13, fontWeight: 600, color: '#5d4038' }}>
                {event.attendees} người đã đăng ký
              </span>
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 64 }}>
          <div style={{
            gridColumn: 'span 2',
            background: '#ffffff',
            padding: 40,
            borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 14, color: '#1c1b1b' }}>Mô tả sự kiện</h2>
            <p style={{ color: '#5d4038', lineHeight: 1.75, maxWidth: 640, marginBottom: 28, fontSize: 15 }}>{event.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { icon: 'music_note', label: 'Live Music' },
                { icon: 'wine_bar', label: 'Wine Included' },
                { icon: 'restaurant_menu', label: 'Light Snacks' },
                { icon: 'people', label: 'Social Mixer' },
              ].map((item) => (
                <div key={item.icon} style={{ padding: '12px 16px', background: '#fcf9f8', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="material-symbols-outlined" style={{ color: '#ad2c00', fontSize: 20 }}>{item.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#1c1b1b' }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.04, pointerEvents: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 200, fontVariationSettings: "'FILL' 1" }}>music_note</span>
            </div>
          </div>

          <div style={{
            background: '#ad2c00',
            color: '#ffffff',
            padding: 40,
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <span className="material-symbols-outlined" style={{ fontSize: 36, marginBottom: 20, display: 'block' }}>groups</span>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 12, lineHeight: 1.3 }}>Người tham gia</h3>
              <p style={{ opacity: 0.8, fontSize: 13, lineHeight: 1.6 }}>Cộng đồng những người yêu âm nhạc acoustic và rượu vang. Gặp gỡ, kết nối và tạo ra những kỷ niệm đáng nhớ.</p>
            </div>
            <div style={{ paddingTop: 28 }}>
              <div style={{ display: 'flex', marginBottom: 12 }}>
                {event.attendeesList.slice(0, 4).map((a, i) => (
                  <div
                    key={a.id}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '9999px',
                      background: 'rgba(255,219,209,0.3)',
                      border: '2px solid #ad2c00',
                      marginLeft: i === 0 ? 0 : -12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {a.initials}
                  </div>
                ))}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '9999px',
                  background: 'rgba(255,219,209,0.15)',
                  border: '2px solid #ad2c00',
                  marginLeft: -12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#ffffff',
                }}>
                  +{event.attendees - 4}
                </div>
              </div>
              <p style={{ fontSize: 13, opacity: 0.9, fontWeight: 500 }}>{event.attendees} người đã xác nhận tham gia</p>
            </div>
          </div>
        </section>

        <section style={{ background: '#f0edec', borderRadius: '1rem', padding: 48, marginBottom: 64, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 16, letterSpacing: '-0.02em', color: '#1c1b1b' }}>Về ban tổ chức</h2>
              <p style={{ color: '#5d4038', lineHeight: 1.75, marginBottom: 24, fontSize: 15 }}>{event.organizerDescription}</p>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#ad2c00', fontWeight: 700, fontFamily: "'Manrope', sans-serif", fontSize: 14 }}>
                <span>Xem thêm sự kiện</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
              </button>
            </div>
            <div style={{
              background: '#ffffff',
              borderRadius: '0.75rem',
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, #ffdbd1, #ad2c00)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#ffffff' }}>corporate_fare</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#1c1b1b', marginBottom: 4 }}>{event.organizer}</p>
                <p style={{ fontSize: 12, color: '#5d4038', fontWeight: 500 }}>Verified Organizer</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 20, color: '#1c1b1b' }}>Sự kiện tương tự</h2>
          <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
            {event.similarEvents.map((se, i) => (
              <div
                key={se.id}
                onClick={() => navigate(`/app/events/${se.id}`)}
                style={{
                  minWidth: 240,
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: '0 20px 40px rgba(28,27,27,0.06)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  border: '1px solid #e7bdb2',
                }}
              >
                <div style={{
                  height: 130,
                  background: i % 2 === 0 ? 'linear-gradient(135deg, #ffdbd1, #ad2c00)' : 'linear-gradient(135deg, #e7bdb2, #5d4038)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                }}>
                  {se.emoji}
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: '#1c1b1b', marginBottom: 6 }}>{se.title}</p>
                  <p style={{ fontSize: 12, color: '#5d4038', fontWeight: 500 }}>{se.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 24,
        pointerEvents: 'none',
        zIndex: 50,
      }}>
        <nav style={{
          borderRadius: '9999px',
          padding: '10px 20px',
          width: '90%',
          maxWidth: 440,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(28,27,27,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          border: '1px solid rgba(231,189,178,0.3)',
        }}>
          <button
            onClick={() => navigate('/app/home')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#1c1b1b', padding: '8px 14px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>restaurant</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>Discover</span>
          </button>
          <button
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ad2c00', border: 'none', cursor: 'pointer', color: '#ffffff', borderRadius: '9999px', padding: '8px 14px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>Events</span>
          </button>
          <button
            onClick={() => navigate('/app/scanner')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#1c1b1b', padding: '8px 14px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>qr_code_2</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>Scanner</span>
          </button>
          <button
            onClick={() => navigate('/app/editorial')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#1c1b1b', padding: '8px 14px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>menu_book</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>Editorial</span>
          </button>
        </nav>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 51,
        pointerEvents: 'auto',
      }}>
        <button
          onClick={() => navigate('/app/booking')}
          style={{
            background: '#ad2c00',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '16px 40px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(173,44,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            whiteSpace: 'nowrap',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>event_available</span>
          Đăng ký tham gia
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
