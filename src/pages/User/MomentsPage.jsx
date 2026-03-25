import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const moments = [
  {
    id: 1, user: 'Linh Chi', avatar: '👩', caption: 'Pho bo truyen thong Ha Noi, nuoc dung ninh xuong 12 tieng thom nuc mui...',
    dish: 'Pho Bo', restaurant: 'Pho Thin Lo Duc', likes: 1243, comments: 89, shares: 34,
    gradient: 'linear-gradient(135deg, #FFB59E 0%, #FF571A 100%)', emoji: '🍜', tried: false,
  },
  {
    id: 2, user: 'Duc Minh', avatar: '👨', caption: 'Banh mi Sai Gon gion rum, nhan dac biet voi pa-te va thit nguoi...',
    dish: 'Banh Mi', restaurant: 'Banh Mi Huynh Hoa', likes: 987, comments: 56, shares: 22,
    gradient: 'linear-gradient(135deg, #FFD54F 0%, #FF8F00 100%)', emoji: '🥖', tried: false,
  },
  {
    id: 3, user: 'Thu Ha', avatar: '👩', caption: 'Ca phe trung Ha Noi, beo ngay thom nong, ngoi ngam pho co chieu dong...',
    dish: 'Ca Phe Trung', restaurant: 'Cafe Giang', likes: 2105, comments: 134, shares: 67,
    gradient: 'linear-gradient(135deg, #8D6E63 0%, #4E342E 100%)', emoji: '☕', tried: true,
  },
  {
    id: 4, user: 'Hoang Nam', avatar: '👨', caption: 'Bun bo Hue cay nong dam da, thit bo mem, gia vi hue dac trung...',
    dish: 'Bun Bo Hue', restaurant: 'Bun Bo Ba Tuyet', likes: 756, comments: 42, shares: 15,
    gradient: 'linear-gradient(135deg, #EF5350 0%, #B71C1C 100%)', emoji: '🌶️', tried: false,
  },
  {
    id: 5, user: 'Mai Phuong', avatar: '👩', caption: 'Com tam suon bi cha Sai Gon, hat com tam deo vua, suon nuong thom lung...',
    dish: 'Com Tam', restaurant: 'Com Tam Ba Ghien', likes: 1567, comments: 98, shares: 45,
    gradient: 'linear-gradient(135deg, #FFA726 0%, #E65100 100%)', emoji: '🍚', tried: false,
  },
];

const MomentsPage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});
  const [tried, setTried] = useState(() => {
    const init = {};
    moments.forEach(m => { if (m.tried) init[m.id] = true; });
    return init;
  });
  const feedRef = useRef(null);

  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleTried = (id) => setTried(prev => ({ ...prev, [id]: !prev[id] }));

  const formatCount = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;

  return (
    <div style={{
      flex: 1, backgroundColor: '#131313', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative', fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'linear-gradient(180deg, rgba(19,19,19,0.9) 0%, transparent 100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#FDF9F3', cursor: 'pointer', padding: 0 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800,
            color: '#FDF9F3', margin: 0,
          }}>Moments</h1>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 20px', borderRadius: 9999,
          background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
          color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
        }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>videocam</span>
          Create
        </button>
      </div>

      {/* Full-screen vertical feed */}
      <div ref={feedRef} style={{
        flex: 1, overflowY: 'auto', scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}>
        {moments.map(m => (
          <div key={m.id} style={{
            height: '100vh', minHeight: '100vh', scrollSnapAlign: 'start',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Background gradient + food visual */}
            <div style={{
              position: 'absolute', inset: 0, background: m.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 160, opacity: 0.15, userSelect: 'none' }}>{m.emoji}</span>
            </div>

            {/* Bottom gradient overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(19,19,19,0.95) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Right side interaction bar */}
            <div style={{
              position: 'absolute', right: 16, bottom: 160, display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 24, zIndex: 10,
            }}>
              {/* Like */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                onClick={() => toggleLike(m.id)}>
                <div style={{
                  width: 48, height: 48, borderRadius: 9999,
                  background: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{
                    fontSize: 26, color: liked[m.id] ? '#FF571A' : '#FDF9F3',
                  }}>
                    {liked[m.id] ? 'favorite' : 'favorite_border'}
                  </span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FDF9F3' }}>
                  {formatCount(liked[m.id] ? m.likes + 1 : m.likes)}
                </span>
              </div>

              {/* Comment */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 9999,
                  background: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 26, color: '#FDF9F3' }}>chat_bubble</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FDF9F3' }}>{m.comments}</span>
              </div>

              {/* Share */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 9999,
                  background: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 26, color: '#FDF9F3' }}>share</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FDF9F3' }}>{m.shares}</span>
              </div>

              {/* Bookmark */}
              <div style={{
                width: 48, height: 48, borderRadius: 9999,
                background: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 26, color: '#FDF9F3' }}>bookmark_border</span>
              </div>
            </div>

            {/* Bottom content area */}
            <div style={{
              position: 'absolute', bottom: 80, left: 0, right: 80, padding: '0 20px',
              zIndex: 10,
            }}>
              {/* User info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 9999,
                  background: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {m.avatar}
                </div>
                <div>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15,
                    fontWeight: 700, color: '#FDF9F3',
                  }}>{m.user}</span>
                  <span style={{
                    marginLeft: 8, padding: '2px 10px', borderRadius: 9999,
                    background: 'rgba(255,213,79,0.2)', color: '#FFD54F',
                    fontSize: 11, fontWeight: 700,
                  }}>Vàng</span>
                </div>
              </div>

              {/* Caption */}
              <p style={{
                fontSize: 14, color: '#FDF9F3', lineHeight: 1.6, margin: '0 0 12px',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', opacity: 0.9,
              }}>
                {m.caption}
              </p>

              {/* Dish tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 9999,
                background: 'rgba(57,57,57,0.6)', backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)', marginBottom: 12,
              }}>
                <span style={{ fontSize: 18 }}>{m.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#FDF9F3' }}>{m.dish}</span>
                <span style={{ fontSize: 12, color: '#E6BEB2' }}>at {m.restaurant}</span>
              </div>

              {/* Mark as Tried button */}
              <div style={{ marginTop: 8 }}>
                <button onClick={() => toggleTried(m.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 9999, border: 'none',
                  background: tried[m.id] ? 'rgba(17,117,0,0.3)' : 'rgba(17,117,0,0.8)',
                  color: '#FDF9F3', fontSize: 14, fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    {tried[m.id] ? 'check_circle' : 'add_circle'}
                  </span>
                  {tried[m.id] ? 'Tried!' : 'Mark as Tried'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MomentsPage;
