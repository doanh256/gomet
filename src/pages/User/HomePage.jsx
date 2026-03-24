import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    api.get('/date-posts?status=open&limit=12').then(data => {
      if (data?.posts) setPosts(data.posts);
    }).catch(console.error);

    api.get('/users/profiles?limit=10').then(data => {
      if (data?.profiles) setProfiles(data.profiles);
    }).catch(console.error);

    api.get('/venues?limit=10').then(data => {
      if (data?.venues) setVenues(data.venues);
      else if (Array.isArray(data)) setVenues(data);
    }).catch(console.error);

    api.get('/events?limit=6').then(data => {
      if (data?.events) setEvents(data.events);
      else if (Array.isArray(data)) setEvents(data);
    }).catch(console.error);
  }, []);

  const getAvatarUrl = (user) => {
    if (!user) return '';
    return user.avatar || user.images?.[0]?.url || user.images?.[0] || '';
  };

  const getPostImage = (post) => {
    return post.image || post.images?.[0]?.url || post.images?.[0] || '';
  };

  const userName = currentUser?.name || currentUser?.displayName || 'Chef';

  // Fallback data
  const fallbackProfiles = [
    { id: 'f1', name: 'Elena R.', tag: 'Sushi Lover', match: 94, avatar: '' },
    { id: 'f2', name: 'Marco T.', tag: 'Coffee Snob', match: 88, avatar: '' },
    { id: 'f3', name: 'Sophie W.', tag: 'Wine Expert', match: 82, avatar: '' },
  ];

  const fallbackChallenges = [
    { id: 'c1', icon: 'explore_nearby', title: 'Try a new Northern dish', desc: 'Explore the robust flavors of the highlands. Earn extra for Thang Co.', vp: '+250 VP', color: '#b83500' },
    { id: 'c2', icon: 'add_a_photo', title: 'Share your Bun Cha', desc: 'Snap a high-quality photo of your next Bun Cha at a verified spot.', vp: '+150 VP', color: '#815f00' },
    { id: 'c3', icon: 'groups', title: 'Host a Table', desc: 'Invite 3 matches to a collaborative dinner at a Vang certified kitchen.', vp: '+500 VP', color: '#117500' },
  ];

  const fallbackMatches = [
    { id: 'm1', name: 'Sarah K.', role: 'Molecular Specialist', match: 94, avatar: '' },
    { id: 'm2', name: 'Marcus Chen', role: 'Street Food Archivist', match: 88, avatar: '' },
    { id: 'm3', name: 'Linh Nguyen', role: 'Pastry Enthusiast', match: 82, avatar: '' },
  ];

  const displayProfiles = profiles.length > 0 ? profiles.map((p, i) => ({
    ...p,
    tag: p.bio?.slice(0, 20) || 'Foodie',
    match: Math.floor(Math.random() * 20) + 75,
  })) : fallbackProfiles;

  const displayMatches = profiles.length > 0 ? profiles.slice(0, 3).map((p, i) => ({
    id: p.id,
    name: p.name || 'User',
    role: p.bio?.slice(0, 25) || 'Food Lover',
    match: [94, 88, 82][i] || 80,
    avatar: getAvatarUrl(p),
  })) : fallbackMatches;

  const scrollbarHide = `
    .gomet-noscroll::-webkit-scrollbar { display: none; }
    .gomet-noscroll { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  // ════════════════════════════════════════════
  //  MOBILE LAYOUT
  // ════════════════════════════════════════════
  if (isMobile) {
    return (
      <div style={{ background: '#FDF9F3', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: '100px' }}>
        <style>{scrollbarHide}</style>
        <div style={{ padding: '0 24px' }}>

          {/* Welcome */}
          <section style={{ paddingTop: '16px', marginBottom: '32px' }}>
            <p style={{ fontSize: '14px', fontWeight: 500, color: '#666460', letterSpacing: '0.02em', margin: '0 0 4px' }}>Welcome back, {userName}</p>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#393834', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>Explore</h2>
          </section>

          {/* Challenge of the Day */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              position: 'relative', overflow: 'hidden', borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, #b83500, #ff784d)', padding: '2px',
              boxShadow: '0 16px 40px rgba(184,53,0,0.15)',
            }}>
              <div style={{ background: '#ffffff', borderRadius: 'calc(1.5rem - 2px)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', padding: '4px 12px',
                      borderRadius: '9999px', background: '#fcc43e', color: '#584000',
                      fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', marginRight: '4px', fontVariationSettings: "'FILL' 1" }}>star</span>
                      Challenge of the Day
                    </span>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#393834', margin: '12px 0 0', letterSpacing: '-0.01em' }}>
                      Rate your favorite Pho
                    </h3>
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: '#FDF9F2', padding: '8px 16px', borderRadius: '1rem',
                  }}>
                    <span style={{ color: '#b83500', fontWeight: 900, fontSize: '20px' }}>+10</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#666460', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Vang</span>
                  </div>
                </div>
                <p style={{ color: '#666460', fontSize: '14px', margin: '12px 0 16px', lineHeight: 1.6, paddingRight: '16px' }}>
                  Share your authentic Pho experience from this morning to boost your local ranking.
                </p>
                <button style={{
                  width: '100%', background: '#b83500', color: '#ffffff', border: 'none',
                  padding: '16px', borderRadius: '1rem', fontWeight: 700, fontSize: '16px',
                  cursor: 'pointer', boxShadow: '0 8px 20px rgba(184,53,0,0.2)',
                }}>
                  Complete Task
                </button>
              </div>
            </div>
          </section>

          {/* Nearby Foodies */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#393834', margin: 0, letterSpacing: '-0.01em' }}>Nearby Foodies</h4>
              <span style={{ color: '#b83500', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/app/explore')}>View All</span>
            </div>
            <div className="gomet-noscroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto', margin: '0 -24px', padding: '8px 24px' }}>
              {displayProfiles.map((p, idx) => {
                const av = getAvatarUrl(p);
                return (
                  <div key={p.id || idx} style={{
                    flexShrink: 0, width: '160px', background: '#FDF9F2', padding: '16px',
                    borderRadius: '1.5rem', cursor: 'pointer',
                  }} onClick={() => navigate('/app/swipe')}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                      {av ? (
                        <img src={av} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem', display: 'block' }} />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', borderRadius: '1rem',
                          background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontSize: '36px', fontWeight: 800,
                        }}>{p.name?.charAt(0) || '?'}</div>
                      )}
                      <div style={{
                        position: 'absolute', top: '-8px', right: '-8px',
                        background: '#117500', color: '#ffffff', padding: '4px 8px',
                        borderRadius: '9999px', fontSize: '10px', fontWeight: 900,
                      }}>{p.match}%</div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '12px' }}>
                      <p style={{ fontWeight: 700, fontSize: '14px', color: '#393834', margin: '0 0 2px' }}>{p.name}</p>
                      <p style={{ fontSize: '10px', color: '#666460', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>{p.tag}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Regional Badge Tracker */}
          <section style={{
            background: '#ebe8e0', padding: '20px', borderRadius: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', background: '#ffffff', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#815f00', fontVariationSettings: "'FILL' 1" }}>map</span>
              </div>
              <div>
                <h5 style={{ fontWeight: 700, fontSize: '14px', color: '#393834', margin: '0 0 2px' }}>Regional Badge Tracker</h5>
                <p style={{ fontSize: '12px', color: '#666460', margin: 0, fontWeight: 600 }}>
                  <span style={{ color: '#b83500' }}>7/8 provinces</span> mastered
                </p>
              </div>
            </div>
            <span style={{
              background: '#ffffff', padding: '8px 16px', borderRadius: '9999px',
              fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#393834',
              letterSpacing: '0.1em', cursor: 'pointer',
            }}>View Map</span>
          </section>

          {/* Moments Feed */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#393834', margin: 0, letterSpacing: '-0.01em' }}>Moments</h4>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ color: '#b83500', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '2px solid #b83500', paddingBottom: '4px' }}>Recent</span>
                <span style={{ color: '#666460', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: '4px' }}>Trending</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {(posts.length > 0 ? posts.slice(0, 4) : [
                { id: 'p1', title: 'The steam on this ramen is unreal...', author: { name: '@alex_eats' }, likes: '1.2k', comments: 48 },
                { id: 'p2', title: 'Decadence in every bite. Chocolate lava cake is everything!', author: { name: '@elena_foodie' }, likes: '892', comments: 22 },
              ]).map((post, idx) => {
                const imgUrl = getPostImage(post);
                return (
                  <div key={post.id || idx} style={{
                    position: 'relative', aspectRatio: '4/5', width: '100%',
                    borderRadius: '1.5rem', overflow: 'hidden',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                  }}>
                    {imgUrl ? (
                      <img src={imgUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#ff784d, #b83500' : '#fcc43e, #815f00'})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'rgba(255,255,255,0.3)' }}>restaurant</span>
                      </div>
                    )}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: '24px', left: '24px', right: '24px',
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                    }}>
                      <div style={{ maxWidth: '70%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FFB59E, #FF571A)', border: '1px solid white',
                          }} />
                          <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>{post.author?.name || '@gomet_user'}</span>
                        </div>
                        <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>{post.title}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>favorite</span>
                          <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>{post.likes || Math.floor(Math.random() * 500) + 100}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '24px' }}>chat_bubble</span>
                          <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>{post.comments || Math.floor(Math.random() * 50) + 5}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════
  //  DESKTOP LAYOUT
  // ════════════════════════════════════════════
  return (
    <div style={{ background: '#FDF9F3', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{scrollbarHide}</style>
      <div style={{ padding: '0 32px 48px', maxWidth: '1600px' }}>

        {/* Welcome Header + Vang Cards */}
        <header style={{ marginBottom: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#393834', letterSpacing: '-0.03em', margin: '0 0 8px', lineHeight: 1.1 }}>
                Welcome back, Chef {userName}
              </h1>
              <p style={{ fontSize: '16px', color: '#666460', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
                Your culinary intuition is peaking. There are new hotspots that perfectly match your taste profile.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {/* Tier card */}
              <div style={{
                background: 'rgba(252,196,62,0.15)', padding: '24px', borderRadius: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '16px',
              }}>
                <div style={{ background: '#fcc43e', padding: '12px', borderRadius: '1rem' }}>
                  <span className="material-symbols-outlined" style={{ color: '#584000', fontWeight: 700, fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
                <div>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#815f00', margin: '0 0 4px' }}>Current Tier</p>
                  <p style={{ fontSize: '20px', fontWeight: 900, color: '#393834', margin: 0 }}>Vang Gold</p>
                </div>
              </div>
              {/* Points card */}
              <div style={{
                background: 'rgba(255,120,77,0.1)', padding: '24px', borderRadius: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '16px',
              }}>
                <div style={{ background: '#ff784d', padding: '12px', borderRadius: '1rem' }}>
                  <span className="material-symbols-outlined" style={{ color: '#460f00', fontWeight: 700, fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                </div>
                <div>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#b83500', margin: '0 0 4px' }}>Total Points</p>
                  <p style={{ fontSize: '20px', fontWeight: 900, color: '#393834', margin: 0 }}>1,250 VP</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Grid: Left 8 + Right 4 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }}>

          {/* ─── Left Column ─── */}
          <div>

            {/* Culinary Hotspots Map */}
            <section style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#393834', margin: 0, letterSpacing: '-0.01em' }}>Your Culinary Hotspots</h2>
                <button style={{ background: 'none', border: 'none', color: '#b83500', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => navigate('/app/venues')}>
                  Explore full map <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </button>
              </div>
              <div style={{
                position: 'relative', height: '480px', borderRadius: '1.5rem', overflow: 'hidden',
                background: '#f1ede6', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}>
                {/* Map background */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, #f1ede6 0%, #e6e2da 50%, #f7f3ec 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '120px', color: '#bcb9b3', opacity: 0.3 }}>map</span>
                </div>

                {/* Map pins */}
                <div style={{ position: 'absolute', top: '33%', left: '25%' }}>
                  <div style={{
                    background: '#b83500', color: '#fff', padding: '8px', borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(184,53,0,0.3)', cursor: 'pointer',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '25%', right: '33%' }}>
                  <div style={{
                    background: '#117500', color: '#fff', padding: '8px', borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(17,117,0,0.3)', cursor: 'pointer',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>local_bar</span>
                  </div>
                </div>

                {/* Bottom venue cards overlay */}
                <div className="gomet-noscroll" style={{
                  position: 'absolute', bottom: '24px', left: '24px', right: '24px',
                  display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px',
                }}>
                  {(venues.length > 0 ? venues.slice(0, 3) : [
                    { id: 'v1', name: 'Bun Cha Dac Kim', address: 'Hoan Kiem', category: 'Traditional' },
                    { id: 'v2', name: 'El Gaucho Argentinian', address: 'Tay Ho', category: 'Steakhouse' },
                  ]).map((v, idx) => (
                    <div key={v.id || idx} style={{
                      flexShrink: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)', padding: '16px', borderRadius: '1rem',
                      display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px', cursor: 'pointer',
                    }} onClick={() => navigate('/app/venues')}>
                      {v.image ? (
                        <img src={v.image} alt={v.name} style={{ width: '56px', height: '56px', borderRadius: '0.75rem', objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '56px', height: '56px', borderRadius: '0.75rem', flexShrink: 0,
                          background: `linear-gradient(135deg, ${idx === 0 ? '#FFB59E, #FF571A' : '#fcc43e, #815f00'})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span className="material-symbols-outlined" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px' }}>restaurant</span>
                        </div>
                      )}
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '14px', color: '#393834', margin: '0 0 2px' }}>{v.name}</p>
                        <p style={{ fontSize: '12px', color: '#666460', margin: '0 0 4px' }}>{v.address || v.location || ''} {v.category ? `\u2022 ${v.category}` : ''}</p>
                        <span style={{
                          display: 'inline-block', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700,
                          background: idx === 0 ? '#2ff801' : '#fcc43e',
                          color: idx === 0 ? '#0b5800' : '#584000',
                        }}>{idx === 0 ? 'Tried' : '850 VP Bonus'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Vang Point Challenges */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#393834', margin: '0 0 24px', letterSpacing: '-0.01em' }}>Vang Point Challenges</h2>
              <div className="gomet-noscroll" style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px' }}>
                {fallbackChallenges.map((ch) => (
                  <div key={ch.id} style={{
                    flexShrink: 0, width: '320px', background: '#FDF9F2', borderRadius: '1.5rem',
                    padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
                  }}>
                    <div style={{
                      position: 'absolute', top: '-16px', right: '-16px',
                      width: '96px', height: '96px', borderRadius: '50%',
                      background: `${ch.color}08`,
                    }} />
                    <span className="material-symbols-outlined" style={{ color: ch.color, fontSize: '28px', display: 'block', marginBottom: '16px' }}>{ch.icon}</span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#393834', margin: '0 0 8px' }}>{ch.title}</h3>
                    <p style={{ fontSize: '14px', color: '#666460', margin: '0 0 24px', lineHeight: 1.5 }}>{ch.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: ch.color, fontWeight: 900, fontSize: '16px' }}>{ch.vp}</span>
                      <button style={{
                        padding: '8px 20px', background: '#393834', color: '#FDF9F3', border: 'none',
                        borderRadius: '9999px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.1em', cursor: 'pointer',
                      }}>Accept</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ─── Right Sidebar ─── */}
          <aside>
            <section style={{
              background: '#f7f3ec', borderRadius: '1.5rem', padding: '32px',
              position: 'sticky', top: '112px',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#393834', margin: '0 0 32px', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Recent Matches
                <span style={{ width: '8px', height: '8px', background: '#b83500', borderRadius: '50%', display: 'inline-block' }} />
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {displayMatches.map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ position: 'relative' }}>
                        {m.avatar ? (
                          <img src={m.avatar} alt={m.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{
                            width: '56px', height: '56px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 800, fontSize: '20px',
                          }}>{m.name.charAt(0)}</div>
                        )}
                        <div style={{
                          position: 'absolute', bottom: '-4px', right: '-4px',
                          background: '#117500', width: '22px', height: '22px', borderRadius: '50%',
                          border: '2px solid #f7f3ec', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: '8px', color: '#fff', fontWeight: 700 }}>{m.match}%</span>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: '15px', color: '#393834', margin: '0 0 2px' }}>{m.name}</h4>
                        <p style={{ fontSize: '12px', color: '#666460', fontStyle: 'italic', margin: 0 }}>{m.role}</p>
                      </div>
                    </div>
                    <button style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      border: '1px solid rgba(130,128,123,0.2)', background: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }} onClick={() => navigate('/app/chat')}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#393834' }}>chat_bubble</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Pro Tip */}
              <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid rgba(130,128,123,0.1)' }}>
                <div style={{ background: '#ffffff', padding: '24px', borderRadius: '1rem' }}>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#666460', margin: '0 0 12px' }}>Pro Tip</p>
                  <p style={{ fontSize: '14px', color: '#393834', lineHeight: 1.6, margin: 0 }}>
                    Chefs who interact with 3+ matches weekly earn Vang Points 40% faster.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Moments Feed Grid */}
        <section style={{ marginTop: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#393834', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Moments Feed</h2>
              <p style={{ fontSize: '15px', color: '#666460', margin: 0 }}>Top-rated food stories from your circle.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(130,128,123,0.1)',
                background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <span className="material-symbols-outlined" style={{ color: '#393834' }}>filter_list</span>
              </button>
              <button style={{
                padding: '0 24px', height: '48px', background: '#393834', color: '#FDF9F3',
                border: 'none', borderRadius: '9999px', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              }} onClick={() => navigate('/app/dates/all')}>View All</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {(posts.length > 0 ? posts.slice(0, 4) : [
              { id: 'd1', title: 'Secret technique for the perfect glazed donut.', author: { name: 'Chef Julian' } },
              { id: 'd2', title: 'Sunday Mezze party in the heart of Hanoi.', author: { name: 'Elena R.' } },
              { id: 'd3', title: 'Finding authentic Neapolitan crust in Tay Ho.', author: { name: 'Tuan A.' } },
              { id: 'd4', title: 'The ramen spot nobody is talking about yet.', author: { name: 'Sophie W.' } },
            ]).map((post, idx) => {
              const imgUrl = getPostImage(post);
              const gradients = [
                'linear-gradient(135deg, #b83500, #ff784d)',
                'linear-gradient(135deg, #815f00, #fcc43e)',
                'linear-gradient(135deg, #117500, #2ff801)',
                'linear-gradient(135deg, #ff784d, #b83500)',
              ];
              return (
                <div key={post.id || idx} style={{
                  position: 'relative', aspectRatio: '3/4', borderRadius: '1.5rem',
                  overflow: 'hidden', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  transition: 'transform 0.3s ease',
                }} onClick={() => navigate('/app/dates/all')}>
                  {imgUrl ? (
                    <img src={imgUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%', background: gradients[idx % 4],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'rgba(255,255,255,0.2)' }}>restaurant</span>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                    opacity: 0.7,
                  }} />
                  {/* Play button */}
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                    padding: '6px', borderRadius: '50%',
                  }}>
                    <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FFB59E, #FF571A)', border: '1px solid white', flexShrink: 0,
                      }} />
                      <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700, margin: 0 }}>{post.author?.name || 'GOMET'}</p>
                    </div>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', lineHeight: 1.3, margin: 0 }}>{post.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
