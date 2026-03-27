import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #ffdbd1, #ad2c00)',
  'linear-gradient(135deg, #e7bdb2, #5d4038)',
  'linear-gradient(135deg, #ffdbd1, #a83918)',
  'linear-gradient(135deg, #f0edec, #ad2c00)',
  'linear-gradient(135deg, #ebe7e7, #5d4038)',
  'linear-gradient(135deg, #ffdbd1, #872000)',
];

const mockMatches = [
  {
    id: '1',
    name: 'Mia Patel',
    age: 24,
    compatibility: 88,
    rank: 'GOLD',
    location: 'TP. Hồ Chí Minh',
    sharedDishes: ['#VisaPhoBo', '#VisaSushi', '#VisaBanhMi'],
    initials: 'MP',
    gradientIdx: 0,
    status: 'new',
    bio: 'Tìm kiếm một nửa yêu #VisaSushi & #VisaPhoBo',
  },
  {
    id: '2',
    name: 'Linh Trần',
    age: 26,
    compatibility: 82,
    rank: 'SILVER',
    location: 'Hà Nội',
    sharedDishes: ['#VisaBanhMi', '#VisaLau'],
    initials: 'LT',
    gradientIdx: 1,
    status: 'messaged',
    bio: 'Foodie chính hiệu tại phố cổ',
  },
  {
    id: '3',
    name: 'Hải Nam',
    age: 29,
    compatibility: 76,
    rank: null,
    location: 'Đà Nẵng',
    sharedDishes: ['#VisaBunBo', '#VisaMiQuang'],
    initials: 'HN',
    gradientIdx: 2,
    status: 'visited',
    bio: 'Chuyên gia ẩm thực miền Trung',
  },
  {
    id: '4',
    name: 'Thu Hà',
    age: 23,
    compatibility: 91,
    rank: 'DIAMOND',
    location: 'TP. Hồ Chí Minh',
    sharedDishes: ['#VisaHaiSan', '#VisaLau', '#VisaSushi'],
    initials: 'TH',
    gradientIdx: 3,
    status: 'new',
    bio: 'Yêu hải sản và fine dining',
  },
  {
    id: '5',
    name: 'Minh Khoa',
    age: 27,
    compatibility: 79,
    rank: null,
    location: 'Hà Nội',
    sharedDishes: ['#VisaPhoBo', '#VisaCaPhe'],
    initials: 'MK',
    gradientIdx: 4,
    status: 'messaged',
    bio: 'Nghiện cà phê và phở sáng',
  },
  {
    id: '6',
    name: 'Bảo Châu',
    age: 25,
    compatibility: 85,
    rank: 'GOLD',
    location: 'Cần Thơ',
    sharedDishes: ['#VisaBanhMi', '#VisaComTam'],
    initials: 'BC',
    gradientIdx: 5,
    status: 'visited',
    bio: 'Ẩm thực miền Tây là số 1',
  },
];

const TABS = [
  { key: 'new', label: 'Mới' },
  { key: 'messaged', label: 'Đã nhắn' },
  { key: 'visited', label: 'Đã ghé thăm' },
];

const RANK_COLORS = {
  DIAMOND: { bg: '#e7bdb2', text: '#3b0900', label: 'DIAMOND' },
  GOLD: { bg: '#ffdbd1', text: '#ad2c00', label: 'GOLD' },
  SILVER: { bg: '#f0edec', text: '#5d4038', label: 'SILVER' },
};

const MatchesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filtered = mockMatches.filter((m) => {
    const matchesTab = activeTab === 'new' ? true : m.status === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sharedDishes.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const tabNew = mockMatches.filter((m) => m.status === 'new').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fcf9f8',
        fontFamily: "'Manrope', sans-serif",
        color: '#1c1b1b',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: '#f6f3f2',
          borderBottom: '1px solid #e7bdb2',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 480,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            height: 60,
            gap: 12,
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: '50%',
              color: '#5d4038',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 22, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              arrow_back
            </span>
          </button>
          <h1
            style={{
              flex: 1,
              margin: 0,
              fontSize: 18,
              fontWeight: 800,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#1c1b1b',
              letterSpacing: '-0.3px',
            }}
          >
            Taste Twins
          </h1>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#ad2c00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {tabNew}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 100px' }}>
        <div
          style={{
            position: 'relative',
            marginBottom: 20,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 18,
              color: '#5d4038',
              fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              pointerEvents: 'none',
            }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc món ăn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: 9999,
              border: '1.5px solid #e7bdb2',
              backgroundColor: '#ffffff',
              fontSize: 14,
              fontFamily: "'Manrope', sans-serif",
              color: '#1c1b1b',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 24,
            backgroundColor: '#f0edec',
            borderRadius: 9999,
            padding: 4,
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "'Manrope', sans-serif",
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#ad2c00' : '#5d4038',
                  boxShadow: isActive ? '0 2px 8px rgba(28,27,27,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffdbd1, #ad2c00)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 32,
                  color: '#ffffff',
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                favorite
              </span>
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1c1b1b',
                marginBottom: 8,
                margin: '0 0 8px 0',
              }}
            >
              Không tìm thấy Taste Twin
            </h2>
            <p
              style={{
                fontSize: 14,
                color: '#5d4038',
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Hãy quẹt thêm để khám phá người có khẩu vị tương đồng!
            </p>
            <button
              onClick={() => navigate('/app/swipe')}
              style={{
                backgroundColor: '#ad2c00',
                color: '#ffffff',
                border: 'none',
                padding: '12px 32px',
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              Khám phá ngay
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((match) => {
              const isHovered = hoveredCard === match.id;
              const rank = match.rank ? RANK_COLORS[match.rank] : null;
              return (
                <div
                  key={match.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    border: '1px solid #e7bdb2',
                    overflow: 'hidden',
                    boxShadow: isHovered
                      ? '0 12px 32px rgba(173,44,0,0.12)'
                      : '0 4px 16px rgba(28,27,27,0.05)',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredCard(match.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ display: 'flex', gap: 0 }}>
                    <div
                      style={{
                        width: 100,
                        minHeight: 130,
                        background: AVATAR_GRADIENTS[match.gradientIdx],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: '#ffffff',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          letterSpacing: '-1px',
                        }}
                      >
                        {match.initials}
                      </span>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 10,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'rgba(255,255,255,0.92)',
                          borderRadius: 9999,
                          padding: '3px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 3,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: 12,
                            color: '#ad2c00',
                            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                          }}
                        >
                          favorite
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: '#ad2c00',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          {match.compatibility}%
                        </span>
                      </div>
                    </div>

                    <div style={{ flex: 1, padding: '14px 16px 14px 14px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 2,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span
                            style={{
                              fontSize: 16,
                              fontWeight: 800,
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              color: '#1c1b1b',
                            }}
                          >
                            {match.name}
                          </span>
                          {match.age && (
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#5d4038',
                              }}
                            >
                              {match.age}
                            </span>
                          )}
                        </div>
                        {rank && (
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 800,
                              backgroundColor: rank.bg,
                              color: rank.text,
                              padding: '3px 8px',
                              borderRadius: 9999,
                              letterSpacing: '0.05em',
                            }}
                          >
                            {rank.label}
                          </span>
                        )}
                      </div>

                      {match.location && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            marginBottom: 8,
                          }}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: 12,
                              color: '#5d4038',
                              fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                            }}
                          >
                            location_on
                          </span>
                          <span style={{ fontSize: 12, color: '#5d4038', fontWeight: 500 }}>
                            {match.location}
                          </span>
                        </div>
                      )}

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 5,
                          marginBottom: 12,
                        }}
                      >
                        {match.sharedDishes.slice(0, 3).map((dish) => (
                          <span
                            key={dish}
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: '#ad2c00',
                              backgroundColor: 'rgba(173,44,0,0.06)',
                              border: '1px solid rgba(173,44,0,0.15)',
                              borderRadius: 9999,
                              padding: '2px 8px',
                            }}
                          >
                            {dish}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => navigate('/app/chat')}
                          style={{
                            flex: 2,
                            padding: '8px 0',
                            borderRadius: 9999,
                            border: 'none',
                            backgroundColor: '#ad2c00',
                            color: '#ffffff',
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                          }}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: 14,
                              fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                            }}
                          >
                            chat
                          </span>
                          Nhắn tin
                        </button>
                        <button
                          onClick={() => navigate(`/app/profile/${match.id}`)}
                          style={{
                            flex: 1,
                            padding: '8px 0',
                            borderRadius: 9999,
                            border: '1.5px solid #e7bdb2',
                            backgroundColor: 'transparent',
                            color: '#5d4038',
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            cursor: 'pointer',
                          }}
                        >
                          Hồ sơ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          style={{
            marginTop: 32,
            backgroundColor: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e7bdb2',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffdbd1, #ad2c00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 22,
                color: '#ffffff',
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              explore
            </span>
          </div>
          <div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1c1b1b',
                margin: '0 0 4px',
              }}
            >
              Tìm thêm Taste Twins
            </p>
            <p style={{ fontSize: 12, color: '#5d4038', margin: 0 }}>
              Khám phá những người có khẩu vị tương đồng với bạn
            </p>
          </div>
          <button
            onClick={() => navigate('/app/swipe')}
            style={{
              padding: '10px 28px',
              borderRadius: 9999,
              border: 'none',
              backgroundColor: '#ad2c00',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
            }}
          >
            Khám phá ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
