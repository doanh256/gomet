import React, { useState } from 'react';

const DEALS = [
  {
    id: 1,
    name: 'Phở Hùng',
    deal: 'Giảm 20%',
    category: 'Phở',
    rating: 4.8,
    distance: '0.3 km',
    address: '281 Điện Biên Phủ, Quận 3',
    icon: '🍜',
    lat: 10.776,
    lng: 106.692,
    color: '#e53935',
  },
  {
    id: 2,
    name: 'Pizza 4P\'s Lê Thánh Tôn',
    deal: 'Mua 2 tặng 1',
    category: 'Pizza',
    rating: 4.9,
    distance: '0.7 km',
    address: '8 Lê Thánh Tôn, Quận 1',
    icon: '🍕',
    lat: 10.771,
    lng: 106.698,
    color: '#1e88e5',
  },
  {
    id: 3,
    name: 'The Coffee House Nguyễn Huệ',
    deal: 'Giảm 30% thức uống',
    category: 'Cà phê',
    rating: 4.6,
    distance: '0.5 km',
    address: '66 Nguyễn Huệ, Quận 1',
    icon: '☕',
    lat: 10.773,
    lng: 106.701,
    color: '#43a047',
  },
  {
    id: 4,
    name: 'Bún Bò Huế Mệ Kéo',
    deal: 'Tặng 1 ly nước mía',
    category: 'Bún bò',
    rating: 4.7,
    distance: '1.2 km',
    address: '74 Trương Định, Quận 3',
    icon: '🍲',
    lat: 10.769,
    lng: 106.685,
    color: '#fb8c00',
  },
  {
    id: 5,
    name: 'La Gourmet Fine Dining',
    deal: 'Giảm 15% cho 2 người',
    category: 'Fine Dining',
    rating: 4.9,
    distance: '1.8 km',
    address: '41 Lý Tự Trọng, Quận 1',
    icon: '🍽️',
    lat: 10.778,
    lng: 106.695,
    color: '#8e24aa',
  },
  {
    id: 6,
    name: 'Cơm Tấm Kiều Giang',
    deal: 'Giảm 10k / phần',
    category: 'Cơm tấm',
    rating: 4.5,
    distance: '0.4 km',
    address: '106 Nguyễn Trãi, Quận 1',
    icon: '🍚',
    lat: 10.764,
    lng: 106.688,
    color: '#00897b',
  },
];

const MAP_PINS = [
  { x: '30%', y: '42%', deal: DEALS[0] },
  { x: '62%', y: '35%', deal: DEALS[1] },
  { x: '72%', y: '55%', deal: DEALS[2] },
  { x: '20%', y: '68%', deal: DEALS[3] },
  { x: '50%', y: '25%', deal: DEALS[4] },
  { x: '38%', y: '72%', deal: DEALS[5] },
];

export default function DealsMapPage() {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [listView, setListView] = useState(false);

  const filters = ['Tất cả', 'Phở', 'Pizza', 'Cà phê', 'Fine Dining', 'Cơm tấm'];

  const filteredDeals = activeFilter === 'Tất cả'
    ? DEALS
    : DEALS.filter(d => d.category === activeFilter);

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 56px)', overflow: 'hidden', background: '#1a2332' }}>
      {/* Simulated dark map background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #1a2332 0%, #1e2d42 40%, #243447 100%)',
      }}>
        {/* Grid lines to simulate map streets */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
          {/* Horizontal lines */}
          {[20, 35, 50, 65, 80].map(y => (
            <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#64b5f6" strokeWidth="1" />
          ))}
          {/* Vertical lines */}
          {[15, 30, 45, 60, 75, 90].map(x => (
            <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#64b5f6" strokeWidth="1" />
          ))}
          {/* Diagonal "highway" */}
          <line x1="0" y1="80%" x2="70%" y2="20%" stroke="#90caf9" strokeWidth="2.5" strokeDasharray="0" />
          <line x1="30%" y1="100%" x2="100%" y2="30%" stroke="#90caf9" strokeWidth="2" />
        </svg>

        {/* Map labels */}
        <div style={{ position: 'absolute', top: '12%', left: '15%', color: 'rgba(144,202,249,0.4)', fontSize: 11, fontWeight: 600 }}>
          Quận Bình Thạnh
        </div>
        <div style={{ position: 'absolute', top: '45%', left: '35%', color: 'rgba(144,202,249,0.5)', fontSize: 13, fontWeight: 700 }}>
          Quận 1
        </div>
        <div style={{ position: 'absolute', top: '60%', left: '10%', color: 'rgba(144,202,249,0.35)', fontSize: 11 }}>
          Quận 3
        </div>
        <div style={{ position: 'absolute', top: '30%', right: '10%', color: 'rgba(144,202,249,0.35)', fontSize: 11 }}>
          Quận 2
        </div>

        {/* Map pins */}
        {MAP_PINS.map((pin, i) => {
          const isFiltered = activeFilter !== 'Tất cả' && pin.deal.category !== activeFilter;
          if (isFiltered) return null;
          return (
            <div
              key={pin.deal.id}
              onClick={() => setSelectedDeal(selectedDeal?.id === pin.deal.id ? null : pin.deal)}
              style={{
                position: 'absolute',
                left: pin.x,
                top: pin.y,
                transform: 'translate(-50%, -100%)',
                cursor: 'pointer',
                zIndex: selectedDeal?.id === pin.deal.id ? 10 : 2,
                transition: 'transform 0.2s',
              }}
            >
              {/* Pin */}
              <div style={{
                background: pin.deal.color,
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                width: selectedDeal?.id === pin.deal.id ? 44 : 36,
                height: selectedDeal?.id === pin.deal.id ? 44 : 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                border: '2px solid rgba(255,255,255,0.6)',
                transition: 'all 0.2s',
              }}>
                <span style={{ transform: 'rotate(45deg)', fontSize: selectedDeal?.id === pin.deal.id ? 18 : 14 }}>
                  {pin.deal.icon}
                </span>
              </div>
              {/* Deal chip */}
              <div style={{
                position: 'absolute',
                top: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#FFD700',
                color: '#1a1a1a',
                borderRadius: 8,
                padding: '2px 6px',
                fontSize: 10,
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}>
                {pin.deal.deal}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top search bar */}
      <div style={{
        position: 'absolute', top: 12, left: 12, right: 12, zIndex: 20,
        display: 'flex', gap: 8,
      }}>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 12,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input
            placeholder="Tìm ưu đãi gần bạn..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: 14, background: 'transparent',
              fontFamily: 'Manrope, sans-serif', color: '#1a1a1a',
            }}
          />
        </div>
        <button
          onClick={() => setListView(!listView)}
          style={{
            background: listView ? '#ad2c00' : 'rgba(255,255,255,0.95)',
            color: listView ? '#fff' : '#1a1a1a',
            border: 'none', borderRadius: 12,
            width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 18,
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}
        >
          {listView ? '🗺️' : '📋'}
        </button>
      </div>

      {/* Filter chips */}
      <div style={{
        position: 'absolute', top: 72, left: 0, right: 0, zIndex: 20,
        overflowX: 'auto', padding: '0 12px',
        display: 'flex', gap: 8,
        scrollbarWidth: 'none',
      }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: 20,
              border: 'none',
              background: activeFilter === f ? '#ad2c00' : 'rgba(255,255,255,0.92)',
              color: activeFilter === f ? '#fff' : '#1a1a1a',
              fontWeight: 600, fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Selected deal popup */}
      {selectedDeal && !listView && (
        <div style={{
          position: 'absolute', bottom: 120, left: 16, right: 16, zIndex: 30,
          background: '#fff',
          borderRadius: 20,
          padding: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: selectedDeal.color + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, flexShrink: 0,
          }}>
            {selectedDeal.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedDeal.name}
              </h3>
            </div>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: '#757575' }}>{selectedDeal.address}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: '#fff3e0', color: '#ad2c00',
                borderRadius: 8, padding: '2px 8px', fontSize: 12, fontWeight: 700,
              }}>
                {selectedDeal.deal}
              </span>
              <span style={{ fontSize: 12, color: '#505965' }}>⭐ {selectedDeal.rating} · {selectedDeal.distance}</span>
            </div>
          </div>
          <button style={{
            background: '#ad2c00', color: '#fff',
            border: 'none', borderRadius: 12,
            padding: '8px 14px', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', flexShrink: 0,
          }}>
            Đặt bàn
          </button>
        </div>
      )}

      {/* List view overlay */}
      {listView && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, top: 110,
          background: '#f8f4f2',
          overflowY: 'auto',
          zIndex: 25,
          borderRadius: '20px 20px 0 0',
          paddingBottom: 80,
        }}>
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 40, height: 4, background: '#d4c9c4', borderRadius: 2, margin: '0 auto 12px' }} />
            </div>
            <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a1a1a' }}>
              Ưu đãi gần bạn
            </h2>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#757575' }}>
              {filteredDeals.length} nhà hàng đang có ưu đãi
            </p>
            {filteredDeals.map(deal => (
              <div key={deal.id} style={{
                background: '#fff',
                borderRadius: 16,
                padding: 14,
                marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                border: '1px solid #f0ebe8',
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: deal.color + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  {deal.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a1a1a' }}>
                    {deal.name}
                  </h4>
                  <p style={{ margin: '0 0 4px', fontSize: 11, color: '#9e9e9e' }}>{deal.address}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      background: '#fff3e0', color: '#ad2c00',
                      borderRadius: 6, padding: '2px 7px', fontSize: 11, fontWeight: 700,
                    }}>
                      {deal.deal}
                    </span>
                    <span style={{ fontSize: 11, color: '#757575' }}>⭐ {deal.rating} · {deal.distance}</span>
                  </div>
                </div>
                <button style={{
                  background: 'transparent', color: '#ad2c00',
                  border: '1.5px solid #ad2c00', borderRadius: 10,
                  padding: '6px 12px', fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', flexShrink: 0,
                }}>
                  Xem
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deals counter badge */}
      {!listView && (
        <div style={{
          position: 'absolute', bottom: 80, right: 16, zIndex: 20,
          background: '#ad2c00', color: '#fff',
          borderRadius: 20, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 4px 16px rgba(173,44,0,0.4)',
          cursor: 'pointer',
        }}
          onClick={() => setListView(true)}
        >
          <span style={{ fontSize: 14 }}>🎫</span>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{filteredDeals.length} ưu đãi</span>
        </div>
      )}
    </div>
  );
}
