import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── DATA ─────────────────────────────────────────────────────────── */
const cuisines = {
  asia: {
    label: 'Châu Á', icon: '🌏',
    countries: [
      {
        id: 'japan', name: 'Nhật Bản', flag: '🇯🇵', color: '#FF4757',
        dishes: [
          { id: 'ramen', name: 'Ramen', tried: true },
          { id: 'sushi', name: 'Sushi', tried: true },
          { id: 'tempura', name: 'Tempura', tried: false },
          { id: 'takoyaki', name: 'Takoyaki', tried: false },
          { id: 'gyoza', name: 'Gyoza', tried: true },
          { id: 'wagyu', name: 'Wagyu', tried: false },
        ],
      },
      {
        id: 'korea', name: 'Hàn Quốc', flag: '🇰🇷', color: '#3742FA',
        dishes: [
          { id: 'bibimbap', name: 'Bibimbap', tried: true },
          { id: 'kbbq', name: 'Korean BBQ', tried: true },
          { id: 'tteokbokki', name: 'Tteokbokki', tried: false },
          { id: 'bulgogi', name: 'Bulgogi', tried: false },
          { id: 'kimchi-jjigae', name: 'Kimchi Jjigae', tried: false },
        ],
      },
      {
        id: 'thailand', name: 'Thái Lan', flag: '🇹🇭', color: '#2ED573',
        dishes: [
          { id: 'pad-thai', name: 'Pad Thai', tried: true },
          { id: 'tom-yum', name: 'Tom Yum', tried: true },
          { id: 'som-tum', name: 'Som Tum', tried: true },
          { id: 'massaman', name: 'Massaman Curry', tried: false },
          { id: 'mango-rice', name: 'Mango Sticky Rice', tried: true },
        ],
      },
      {
        id: 'india', name: 'Ấn Độ', flag: '🇮🇳', color: '#FF6348',
        dishes: [
          { id: 'biryani', name: 'Biryani', tried: false },
          { id: 'butter-chicken', name: 'Butter Chicken', tried: true },
          { id: 'samosa', name: 'Samosa', tried: false },
          { id: 'naan', name: 'Naan', tried: true },
          { id: 'tikka-masala', name: 'Tikka Masala', tried: false },
        ],
      },
      {
        id: 'china', name: 'Trung Quốc', flag: '🇨🇳', color: '#FF4757',
        dishes: [
          { id: 'dim-sum', name: 'Dim Sum', tried: true },
          { id: 'peking-duck', name: 'Vịt quay Bắc Kinh', tried: false },
          { id: 'hotpot', name: 'Lẩu Tứ Xuyên', tried: true },
          { id: 'xlb', name: 'Xiaolongbao', tried: false },
          { id: 'kungpao', name: 'Kung Pao Chicken', tried: false },
        ],
      },
      {
        id: 'vietnam', name: 'Việt Nam', flag: '🇻🇳', color: '#E8900C',
        dishes: [
          { id: 'pho', name: 'Phở', tried: true },
          { id: 'banh-mi', name: 'Bánh mì', tried: true },
          { id: 'goi-cuon', name: 'Gỏi cuốn', tried: true },
          { id: 'bun-bo', name: 'Bún bò Huế', tried: true },
          { id: 'com-tam', name: 'Cơm tấm', tried: true },
          { id: 'cao-lau', name: 'Cao lầu', tried: true },
        ],
      },
    ],
  },
  europe: {
    label: 'Châu Âu', icon: '🌍',
    countries: [
      {
        id: 'italy', name: 'Ý', flag: '🇮🇹', color: '#1E90FF',
        dishes: [
          { id: 'pizza', name: 'Pizza Napoletana', tried: true },
          { id: 'carbonara', name: 'Pasta Carbonara', tried: true },
          { id: 'tiramisu', name: 'Tiramisu', tried: true },
          { id: 'risotto', name: 'Risotto', tried: false },
          { id: 'gelato', name: 'Gelato', tried: true },
          { id: 'ossobuco', name: 'Osso Buco', tried: false },
        ],
      },
      {
        id: 'france', name: 'Pháp', flag: '🇫🇷', color: '#5352ED',
        dishes: [
          { id: 'croissant', name: 'Croissant', tried: true },
          { id: 'crepe', name: 'Crêpe', tried: true },
          { id: 'bouillabaisse', name: 'Bouillabaisse', tried: false },
          { id: 'souffle', name: 'Soufflé', tried: false },
          { id: 'macaron', name: 'Macaron', tried: true },
        ],
      },
      {
        id: 'spain', name: 'Tây Ban Nha', flag: '🇪🇸', color: '#FF6348',
        dishes: [
          { id: 'paella', name: 'Paella', tried: false },
          { id: 'tapas', name: 'Tapas', tried: true },
          { id: 'gazpacho', name: 'Gazpacho', tried: false },
          { id: 'jamon', name: 'Jamón Ibérico', tried: false },
          { id: 'churros', name: 'Churros', tried: true },
        ],
      },
      {
        id: 'turkey', name: 'Thổ Nhĩ Kỳ', flag: '🇹🇷', color: '#FF4757',
        dishes: [
          { id: 'kebab', name: 'Kebab', tried: true },
          { id: 'baklava-tr', name: 'Baklava', tried: true },
          { id: 'borek', name: 'Börek', tried: false },
          { id: 'turkish-delight', name: 'Turkish Delight', tried: false },
          { id: 'lahmacun', name: 'Lahmacun', tried: false },
        ],
      },
      {
        id: 'greece', name: 'Hy Lạp', flag: '🇬🇷', color: '#0097E6',
        dishes: [
          { id: 'moussaka', name: 'Moussaka', tried: false },
          { id: 'souvlaki', name: 'Souvlaki', tried: true },
          { id: 'spanakopita', name: 'Spanakopita', tried: false },
          { id: 'gyros', name: 'Gyros', tried: true },
          { id: 'baklava-gr', name: 'Baklava', tried: false },
        ],
      },
    ],
  },
  americas: {
    label: 'Châu Mỹ', icon: '🌎',
    countries: [
      {
        id: 'usa', name: 'Mỹ', flag: '🇺🇸', color: '#3742FA',
        dishes: [
          { id: 'burger', name: 'Smash Burger', tried: true },
          { id: 'bbq-ribs', name: 'BBQ Ribs', tried: false },
          { id: 'lobster-roll', name: 'Lobster Roll', tried: false },
          { id: 'mac-cheese', name: 'Mac & Cheese', tried: true },
          { id: 'clam-chowder', name: 'Clam Chowder', tried: false },
        ],
      },
      {
        id: 'mexico', name: 'Mexico', flag: '🇲🇽', color: '#2ED573',
        dishes: [
          { id: 'tacos', name: 'Tacos al Pastor', tried: true },
          { id: 'guacamole', name: 'Guacamole', tried: true },
          { id: 'enchiladas', name: 'Enchiladas', tried: false },
          { id: 'tamales', name: 'Tamales', tried: false },
          { id: 'mole', name: 'Mole Negro', tried: false },
        ],
      },
      {
        id: 'peru', name: 'Peru', flag: '🇵🇪', color: '#FF4757',
        dishes: [
          { id: 'ceviche', name: 'Ceviche', tried: false },
          { id: 'lomo-saltado', name: 'Lomo Saltado', tried: false },
          { id: 'anticuchos', name: 'Anticuchos', tried: false },
          { id: 'causa', name: 'Causa Rellena', tried: false },
          { id: 'pisco-sour', name: 'Pisco Sour', tried: false },
        ],
      },
      {
        id: 'brazil', name: 'Brazil', flag: '🇧🇷', color: '#2ED573',
        dishes: [
          { id: 'churrasco', name: 'Churrasco', tried: true },
          { id: 'feijoada', name: 'Feijoada', tried: false },
          { id: 'coxinha', name: 'Coxinha', tried: false },
          { id: 'acai', name: 'Açaí Bowl', tried: true },
          { id: 'brigadeiro', name: 'Brigadeiro', tried: false },
        ],
      },
    ],
  },
  middleeast: {
    label: 'Trung Đông', icon: '🌙',
    countries: [
      {
        id: 'lebanon', name: 'Lebanon', flag: '🇱🇧', color: '#FF6348',
        dishes: [
          { id: 'hummus', name: 'Hummus', tried: true },
          { id: 'falafel', name: 'Falafel', tried: true },
          { id: 'shawarma', name: 'Shawarma', tried: true },
          { id: 'tabbouleh', name: 'Tabbouleh', tried: false },
          { id: 'kibbeh', name: 'Kibbeh', tried: false },
        ],
      },
      {
        id: 'morocco', name: 'Maroc', flag: '🇲🇦', color: '#FF4757',
        dishes: [
          { id: 'tagine', name: 'Tagine', tried: false },
          { id: 'couscous', name: 'Couscous', tried: true },
          { id: 'pastilla', name: 'Pastilla', tried: false },
          { id: 'harira', name: 'Harira', tried: false },
          { id: 'mint-tea', name: 'Trà bạc hà Maroc', tried: true },
        ],
      },
    ],
  },
  africa: {
    label: 'Châu Phi', icon: '🌍',
    countries: [
      {
        id: 'ethiopia', name: 'Ethiopia', flag: '🇪🇹', color: '#2ED573',
        dishes: [
          { id: 'injera', name: 'Injera', tried: false },
          { id: 'doro-wat', name: 'Doro Wat', tried: false },
          { id: 'tibs', name: 'Tibs', tried: false },
          { id: 'kitfo', name: 'Kitfo', tried: false },
          { id: 'shiro', name: 'Shiro', tried: false },
        ],
      },
      {
        id: 'southafrica', name: 'Nam Phi', flag: '🇿🇦', color: '#FF6348',
        dishes: [
          { id: 'braai', name: 'Braai', tried: false },
          { id: 'bobotie', name: 'Bobotie', tried: false },
          { id: 'biltong', name: 'Biltong', tried: false },
          { id: 'bunny-chow', name: 'Bunny Chow', tried: false },
          { id: 'malva', name: 'Malva Pudding', tried: false },
        ],
      },
    ],
  },
};

const CONTINENTS = Object.keys(cuisines);

/* ─── COMPONENT ─────────────────────────────────────────────────────── */
const WorldFoodMapPage = () => {
  const navigate = useNavigate();
  const [activeContinent, setActiveContinent] = useState('asia');
  const [triedMap, setTriedMap] = useState(() => {
    // pre-seed from data
    const m = {};
    for (const cont of Object.values(cuisines)) {
      for (const c of cont.countries) {
        for (const d of c.dishes) {
          m[d.id] = d.tried;
        }
      }
    }
    return m;
  });
  const [expandedCountry, setExpandedCountry] = useState(null);

  const toggleDish = (id) =>
    setTriedMap((prev) => ({ ...prev, [id]: !prev[id] }));

  // global stats
  const allDishes = Object.values(cuisines)
    .flatMap((c) => c.countries)
    .flatMap((c) => c.dishes);
  const totalTried = allDishes.filter((d) => triedMap[d.id]).length;
  const totalDishes = allDishes.length;
  const countriesWithTried = new Set(
    Object.values(cuisines)
      .flatMap((c) => c.countries)
      .filter((c) => c.dishes.some((d) => triedMap[d.id]))
      .map((c) => c.id)
  ).size;
  const totalCountries = Object.values(cuisines).flatMap((c) => c.countries).length;
  const pct = Math.round((totalTried / totalDishes) * 100);

  const contData = cuisines[activeContinent];

  // rank label
  const rankLabel =
    pct >= 70 ? 'Chuyên gia Ẩm thực Thế giới 🏆' :
    pct >= 40 ? 'Người Khám phá Ẩm thực 🌟' :
    pct >= 20 ? 'Tín đồ Ẩm thực 🍴' :
    'Người mới bắt đầu 🌱';

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#FDF9F3', fontFamily: 'var(--font-body)', paddingBottom: 60 }}>

      {/* HEADER */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* decorative globe bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(232,144,12,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(108,99,255,0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* globe SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,181,158,0.15)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,181,158,0.1)" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,181,158,0.08)" strokeWidth="1" />
            {/* latitude lines */}
            {[-40, -20, 0, 20, 40].map((y, i) => (
              <ellipse key={i} cx="100" cy={100 + y} rx={Math.sqrt(80 * 80 - y * y)} ry="12"
                fill="none" stroke="rgba(255,181,158,0.08)" strokeWidth="1" />
            ))}
            {/* continent blobs */}
            <ellipse cx="115" cy="75" rx="28" ry="18" fill="rgba(232,144,12,0.25)" />
            <ellipse cx="78" cy="70" rx="16" ry="22" fill="rgba(78,205,196,0.2)" />
            <ellipse cx="85" cy="105" rx="14" ry="10" fill="rgba(232,144,12,0.18)" />
            <ellipse cx="65" cy="95" rx="8" ry="14" fill="rgba(108,99,255,0.2)" />
            <ellipse cx="140" cy="90" rx="10" ry="8" fill="rgba(46,213,115,0.2)" />
            {/* visited country dots */}
            {[
              [115, 68, '#E8900C'], [125, 72, '#E8900C'], [108, 78, '#E8900C'],
              [100, 68, '#E8900C'], [90, 65, '#6C63FF'], [75, 72, '#FF571A'],
              [70, 80, '#2ED573'], [138, 88, '#3742FA'], [62, 98, '#FF6348'],
            ].map(([cx, cy, fill], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill={fill} opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.4;0.9" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* progress ring */}
            <circle cx="100" cy="100" r="80" fill="none"
              stroke="url(#globeGrad)" strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 80 * pct / 100} ${2 * Math.PI * 80 * (1 - pct / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)" />
            <defs>
              <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8900C" />
                <stop offset="100%" stopColor="#FFB59E" />
              </linearGradient>
            </defs>
            {/* center text */}
            <text x="100" y="96" textAnchor="middle" fill="#FDF9F3" fontSize="22" fontWeight="800">{pct}%</text>
            <text x="100" y="112" textAnchor="middle" fill="#E6BEB2" fontSize="9">thế giới</text>
          </svg>
        </div>

        <div style={{ padding: '8px 24px 0', textAlign: 'center' }}>
          <button onClick={() => navigate(-1)} style={{
            position: 'absolute', top: 20, left: 16,
            background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '9999px',
            padding: '8px 14px', color: '#E6BEB2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          </button>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-headline)' }}>
            Bản đồ Ẩm thực Thế giới
          </h1>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: '#E6BEB2' }}>{rankLabel}</p>
        </div>

        {/* stats bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, padding: '0 24px 24px' }}>
          {[
            { label: 'Quốc gia', value: `${countriesWithTried}/${totalCountries}`, icon: 'flag' },
            { label: 'Món đã thử', value: `${totalTried}/${totalDishes}`, icon: 'restaurant' },
            { label: 'Hoàn thành', value: `${pct}%`, icon: 'emoji_events' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center', padding: '12px 8px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#FFB59E', fontFamily: 'var(--font-headline)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#E6BEB2', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTINENT TABS */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {CONTINENTS.map((key) => {
          const active = activeContinent === key;
          const c = cuisines[key];
          return (
            <button key={key} onClick={() => { setActiveContinent(key); setExpandedCountry(null); }} style={{
              display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0,
              padding: '8px 16px', borderRadius: '9999px', border: 'none', cursor: 'pointer',
              background: active ? 'linear-gradient(135deg, #E8900C, #FFB59E)' : '#1C1B1B',
              color: active ? '#3A0B00' : '#E6BEB2', fontSize: 13, fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}>
              <span>{c.icon}</span>{c.label}
            </button>
          );
        })}
      </div>

      {/* COUNTRY CARDS */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {contData.countries.map((country) => {
          const triedCount = country.dishes.filter((d) => triedMap[d.id]).length;
          const total = country.dishes.length;
          const mastered = triedCount === total;
          const open = expandedCountry === country.id;

          return (
            <div key={country.id} style={{
              background: '#1C1B1B', borderRadius: '1.5rem', overflow: 'hidden',
              border: mastered ? '1.5px solid #E8900C' : '1.5px solid transparent',
              transition: 'border-color 0.2s',
            }}>
              {/* header row */}
              <button onClick={() => setExpandedCountry(open ? null : country.id)} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              }}>
                <span style={{ fontSize: 32 }}>{country.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#FDF9F3', fontFamily: 'var(--font-headline)' }}>
                      {country.name}
                    </span>
                    {mastered && (
                      <span style={{
                        background: 'linear-gradient(135deg, #E8900C, #FFB59E)',
                        color: '#3A0B00', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: '9999px',
                      }}>MASTER ✓</span>
                    )}
                  </div>
                  {/* progress bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#2A2A2A', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: mastered ? 'linear-gradient(90deg, #E8900C, #FFB59E)' : country.color,
                        width: `${(triedCount / total) * 100}%`,
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: 12, color: '#E6BEB2', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {triedCount}/{total} món
                    </span>
                  </div>
                </div>
                <span aria-hidden="true" className="material-symbols-outlined" style={{
                  fontSize: 20, color: '#666', transition: 'transform 0.2s',
                  transform: open ? 'rotate(180deg)' : 'rotate(0)',
                }}>expand_more</span>
              </button>

              {/* dish list */}
              {open && (
                <div style={{ padding: '0 18px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {country.dishes.map((dish) => {
                      const tried = triedMap[dish.id];
                      return (
                        <button key={dish.id} onClick={() => toggleDish(dish.id)} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          background: tried ? 'rgba(232,144,12,0.12)' : 'rgba(255,255,255,0.04)',
                          border: tried ? '1px solid rgba(232,144,12,0.3)' : '1px solid transparent',
                          borderRadius: '1rem', padding: '12px 14px', cursor: 'pointer', textAlign: 'left', width: '100%',
                        }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: tried ? 'linear-gradient(135deg, #E8900C, #FFB59E)' : '#2A2A2A',
                          }}>
                            {tried
                              ? <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14, color: '#3A0B00' }}>check</span>
                              : <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#444', display: 'block' }} />
                            }
                          </div>
                          <span style={{ fontSize: 14, fontWeight: tried ? 600 : 400, color: tried ? '#FDF9F3' : '#E6BEB2' }}>
                            {dish.name}
                          </span>
                          {tried && (
                            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#E8900C', fontWeight: 600 }}>Đã thử ✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* suggest CTA */}
                  <button onClick={() => navigate('/app/search-results')} style={{
                    width: '100%', marginTop: 14, padding: '10px 16px', borderRadius: '1rem',
                    background: 'rgba(255,181,158,0.08)', border: '1px dashed rgba(255,181,158,0.3)',
                    color: '#FFB59E', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    fontFamily: 'var(--font-body)',
                  }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>near_me</span>
                    Tìm nhà hàng {country.name} gần bạn
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* GLOBAL LEADERBOARD TEASER */}
      <div style={{ margin: '24px 16px 0', background: '#1C1B1B', borderRadius: '1.5rem', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#FFD700' }}>emoji_events</span>
          <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-headline)' }}>Bảng xếp hạng Thực khách</span>
        </div>
        {[
          { name: 'Nguyễn Thảo Vy', tried: 89, flag: '🥇' },
          { name: 'Trần Minh Đức', tried: 74, flag: '🥈' },
          { name: 'Lê Hà My', tried: 61, flag: '🥉' },
          { name: 'Bạn', tried: totalTried, flag: '👤', isMe: true },
        ].map((u, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
            borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            background: u.isMe ? 'rgba(232,144,12,0.08)' : 'none',
            borderRadius: u.isMe ? 8 : 0, padding: u.isMe ? '8px 10px' : '8px 0',
          }}>
            <span style={{ fontSize: 18 }}>{u.flag}</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: u.isMe ? 700 : 400, color: u.isMe ? '#FFB59E' : '#FDF9F3' }}>
              {u.name}
            </span>
            <span style={{ fontSize: 13, color: '#E6BEB2' }}>{u.tried} món</span>
          </div>
        ))}
        <button onClick={() => navigate('/app/leaderboard')} style={{
          width: '100%', marginTop: 14, padding: '10px 0', borderRadius: '1rem',
          background: 'linear-gradient(135deg, #E8900C, #FFB59E)', border: 'none',
          color: '#3A0B00', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}>
          Xem bảng xếp hạng đầy đủ
        </button>
      </div>

      {/* TASTE TWIN CTA */}
      <div style={{ margin: '16px 16px 0', background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(232,144,12,0.15))', borderRadius: '1.5rem', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 36 }}>🍽️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Tìm bạn cùng sở thích</div>
          <div style={{ fontSize: 12, color: '#E6BEB2', lineHeight: 1.5 }}>
            Kết nối với người có bộ sưu tập ẩm thực giống bạn
          </div>
        </div>
        <button onClick={() => navigate('/app/taste-twin')} style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '9999px', padding: '8px 16px', color: '#FDF9F3', fontSize: 12,
          fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)',
        }}>
          Khám phá
        </button>
      </div>
    </div>
  );
};

export default WorldFoodMapPage;
