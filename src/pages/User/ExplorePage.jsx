import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const T = {
  bg: '#fcf9f8',
  surface: '#ffffff',
  surfaceContainer: '#f0edec',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryFixed: '#ffdbd1',
  outlineVariant: '#e7bdb2',
  onPrimary: '#ffffff',
  headline: "'Plus Jakarta Sans', sans-serif",
  body: "'Manrope', sans-serif",
};

const categories = [
  { id: 'all', label: 'Tất cả', icon: 'restaurant_menu' },
  { id: 'vn', label: 'Việt Nam', icon: 'flag', emoji: '🇻🇳' },
  { id: 'jp', label: 'Nhật Bản', icon: 'flag', emoji: '🇯🇵' },
  { id: 'kr', label: 'Hàn Quốc', icon: 'flag', emoji: '🇰🇷' },
  { id: 'it', label: 'Ý', icon: 'flag', emoji: '🇮🇹' },
  { id: 'th', label: 'Thái Lan', icon: 'flag', emoji: '🇹🇭' },
  { id: 'fr', label: 'Pháp', icon: 'flag', emoji: '🇫🇷' },
];

const editorialCards = [
  {
    id: 1,
    category: 'vn',
    tag: 'Mẹo thưởng thức',
    title: 'Ăn Phở đúng điệu: Giấm tỏi hay Chanh?',
    desc: 'Sự tranh cãi không hồi kết về việc giữ trọn vẹn hương vị nước dùng truyền thống.',
    gradient: 'linear-gradient(135deg, #c8785a 0%, #8b3a1a 100%)',
    readTime: '5 phút đọc',
  },
  {
    id: 2,
    category: 'vn',
    tag: 'Câu chuyện đầu bếp',
    title: 'Người giữ lửa cho những nồi nước dùng 24 tiếng',
    desc: '"Nước dùng là linh hồn, nó không chỉ là xương hầm, nó là ký ức của cả một gia đình qua ba thế hệ."',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #a07040 100%)',
    readTime: '8 phút đọc',
    featured: true,
    author: { name: 'Nghệ nhân Hùng', venue: 'Phở Thìn Lò Đúc' },
  },
  {
    id: 3,
    category: 'vn',
    tag: 'Ẩm thực hiện đại',
    title: 'Fusion: Khi món Việt "gặp gỡ" Fine Dining',
    desc: 'Cách các đầu bếp trẻ nâng tầm nguyên liệu Việt trên bản đồ thế giới.',
    gradient: 'linear-gradient(135deg, #6a9b7a 0%, #3a6a4a 100%)',
    readTime: '6 phút đọc',
  },
  {
    id: 4,
    category: 'jp',
    tag: 'Văn hóa ẩm thực',
    title: 'Ramen Hokkaido và bí quyết nước dùng miso đậm đà',
    desc: 'Hành trình khám phá những tô ramen ấm lòng trong tiết trời lạnh giá Hokkaido.',
    gradient: 'linear-gradient(135deg, #7a8fac 0%, #3a5070 100%)',
    readTime: '7 phút đọc',
  },
  {
    id: 5,
    category: 'kr',
    tag: 'Xu hướng',
    title: 'Korean BBQ: Nghệ thuật nướng thịt giữa lòng Seoul',
    desc: 'Khám phá văn hóa ăn nhậu đặc sắc của người Hàn Quốc qua từng que thịt nướng.',
    gradient: 'linear-gradient(135deg, #c87878 0%, #8b3838 100%)',
    readTime: '5 phút đọc',
  },
  {
    id: 6,
    category: 'it',
    tag: 'Cổ điển',
    title: 'Carbonara chính thống: Không kem, không hành tây',
    desc: 'Bí mật đằng sau sợi pasta óng ả và sốt trứng chuẩn vị La Mã cổ đại.',
    gradient: 'linear-gradient(135deg, #b09060 0%, #7a6030 100%)',
    readTime: '4 phút đọc',
  },
];

const collections = [
  {
    id: 1,
    category: 'vn',
    title: 'Cà phê trứng: Những góc nhỏ thời gian',
    badge: '5 Địa điểm',
    gradient: 'linear-gradient(160deg, #8b6040 0%, #4a2810 60%, #1a0800 100%)',
    wide: true,
  },
  {
    id: 2,
    category: 'vn',
    title: 'Chợ đêm & Ăn vặt',
    gradient: 'linear-gradient(160deg, #c87040 0%, #8b3010 60%, #3a1000 100%)',
    wide: false,
  },
  {
    id: 3,
    category: 'jp',
    title: 'Izakaya: Nhậu kiểu Nhật',
    gradient: 'linear-gradient(160deg, #607090 0%, #304050 60%, #101820 100%)',
    wide: false,
  },
  {
    id: 4,
    category: 'kr',
    title: 'Street Food Seoul',
    gradient: 'linear-gradient(160deg, #c06060 0%, #803030 60%, #2a1010 100%)',
    wide: false,
  },
  {
    id: 5,
    category: 'it',
    title: 'Nhà hàng đạt sao Michelin',
    gradient: 'linear-gradient(160deg, #907040 0%, #604820 60%, #201800 100%)',
    wide: false,
  },
];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCards = activeCategory === 'all'
    ? editorialCards
    : editorialCards.filter((c) => c.category === activeCategory);

  const filteredCollections = activeCategory === 'all'
    ? collections
    : collections.filter((c) => c.category === activeCategory);

  return (
    <div style={{ minHeight: '100dvh', background: T.bg, fontFamily: T.body, color: T.onSurface, overflowX: 'hidden' }}>

      <div style={{ background: T.bg, position: 'sticky', top: 0, zIndex: 40, borderBottom: `1px solid ${T.outlineVariant}40` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '0 32px', maxWidth: '1280px', margin: '0 auto', height: '48px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: 'Khám phá', active: false },
            { label: 'Sự kiện', active: false },
            { label: 'Scanner', active: false },
            { label: 'Cẩm nang', active: true },
          ].map((item) => (
            <span
              key={item.label}
              style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', fontFamily: T.body, color: item.active ? T.primary : T.onSurface, opacity: item.active ? 1 : 0.5, cursor: 'pointer', transition: 'opacity 0.15s', whiteSpace: 'nowrap', flexShrink: 0, borderBottom: item.active ? `2px solid ${T.primary}` : '2px solid transparent', paddingBottom: '4px' }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 120px' }}>

        <section style={{ marginTop: '32px', marginBottom: '72px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', alignItems: 'center' }}>
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '28px', order: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ background: T.primary, color: T.onPrimary, padding: '6px 16px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: T.body }}>Văn hóa ẩm thực</span>
              <span style={{ color: T.onSurfaceVariant, fontSize: '11px', fontWeight: 500, letterSpacing: '0.04em' }}>12 Tháng 10, 2023</span>
            </div>
            <h1 style={{ fontFamily: T.headline, fontWeight: 700, fontSize: 'clamp(32px, 4vw, 64px)', lineHeight: 1.05, color: T.onSurface, letterSpacing: '-0.02em', margin: 0 }}>
              Tinh hoa Phở Hà Nội — Hành trình xuyên thế kỷ
            </h1>
            <p style={{ color: T.onSurfaceVariant, fontFamily: T.body, fontSize: '17px', lineHeight: 1.7, maxWidth: '440px', margin: 0 }}>
              Từ gánh hàng rong ven đường phố cổ đến biểu tượng văn hóa toàn cầu, Phở là sự kết tinh của thời gian và tâm huyết người đầu bếp.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '8px' }}>
              <button
                style={{ background: T.primary, color: T.onPrimary, borderRadius: '9999px', padding: '16px 32px', fontWeight: 700, fontSize: '15px', letterSpacing: '0.03em', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(173,44,0,0.18)', transition: 'transform 0.15s, background 0.15s' }}
                onClick={() => navigate('/app/dish/pho-ha-noi')}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Đọc tiếp
              </button>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['share', 'bookmark'].map((icon) => (
                  <button key={icon} style={{ width: '48px', height: '48px', borderRadius: '50%', border: `1px solid ${T.outlineVariant}`, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.onSurface, transition: 'background 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = T.surfaceContainerLow; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ gridColumn: 'span 7', order: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: `${T.primary}10`, borderRadius: '16px', transform: 'rotate(-2deg)', transition: 'transform 0.5s' }} />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '420px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(28,27,27,0.15)' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #c87050 0%, #8b3a18 40%, #4a1a08 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '80px', display: 'block' }}>ramen_dining</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', marginTop: '8px', display: 'block' }}>Phở Hà Nội</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '40px' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  border: isActive ? 'none' : `1px solid ${T.outlineVariant}`,
                  background: isActive ? T.primary : T.surface,
                  color: isActive ? T.onPrimary : T.onSurface,
                  fontFamily: T.body,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow: isActive ? '0 4px 14px rgba(173,44,0,0.2)' : 'none',
                }}
              >
                {cat.emoji ? (
                  <span style={{ fontSize: '14px' }}>{cat.emoji}</span>
                ) : (
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{cat.icon}</span>
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {filteredCards.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '80px' }}>
            {filteredCards.map((card) => (
              <article
                key={card.id}
                style={{ background: card.featured ? T.surfaceContainerLow : T.surface, borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', cursor: 'pointer', transition: 'box-shadow 0.3s, transform 0.3s', border: card.featured ? `1px solid ${T.outlineVariant}` : 'none', boxShadow: card.featured ? 'none' : '0 2px 12px rgba(28,27,27,0.05)', gridColumn: card.featured ? 'auto' : 'auto' }}
                onClick={() => navigate('/app/editorial/' + card.id)}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 40px rgba(28,27,27,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = card.featured ? 'none' : '0 2px 12px rgba(28,27,27,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {!card.featured ? (
                  <div style={{ overflow: 'hidden', borderRadius: '12px', height: '180px', flexShrink: 0 }}>
                    <div style={{ width: '100%', height: '100%', background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.5s' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'rgba(255,255,255,0.3)' }}>restaurant</span>
                    </div>
                  </div>
                ) : null}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: card.featured ? 'none' : 1 }}>
                  <span style={{ color: T.primary, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', fontFamily: T.body }}>{card.tag}</span>
                  <h3 style={{ fontFamily: T.headline, fontWeight: 700, fontSize: card.featured ? '26px' : '20px', color: T.onSurface, lineHeight: 1.2, margin: 0 }}>{card.title}</h3>
                  <p style={{ color: T.onSurfaceVariant, fontSize: '14px', lineHeight: 1.65, margin: 0, fontStyle: card.featured ? 'italic' : 'normal' }}>{card.desc}</p>
                </div>
                {card.author && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4a574 0%, #8b6030 100%)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: T.headline, fontWeight: 700, fontSize: '14px', color: T.onSurface }}>{card.author.name}</div>
                      <div style={{ color: T.onSurfaceVariant, fontSize: '12px', fontWeight: 500 }}>{card.author.venue}</div>
                    </div>
                  </div>
                )}
                {card.featured && (
                  <div style={{ overflow: 'hidden', borderRadius: '12px', height: '140px', flexShrink: 0, marginTop: '4px' }}>
                    <div style={{ width: '100%', height: '100%', background: card.gradient }}>
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'rgba(255,255,255,0.3)' }}>restaurant</span>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: T.onSurface, fontWeight: 700, fontSize: '13px', letterSpacing: '-0.01em' }}>
                    Khám phá ngay
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', transition: 'transform 0.2s' }}>arrow_forward</span>
                  </div>
                  <span style={{ color: T.onSurfaceVariant, fontSize: '11px', fontWeight: 500 }}>{card.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredCards.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: T.onSurfaceVariant }}>
            <span className="material-symbols-outlined" style={{ fontSize: '56px', color: T.outlineVariant, display: 'block', marginBottom: '16px' }}>menu_book</span>
            <p style={{ fontWeight: 700, fontSize: '16px', fontFamily: T.headline, color: T.onSurface, margin: '0 0 6px 0' }}>Chưa có nội dung</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Danh mục này đang được cập nhật.</p>
          </div>
        )}

        {filteredCollections.length > 0 && (
          <section style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h2 style={{ fontFamily: T.headline, fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', color: T.onSurface, letterSpacing: '-0.02em', margin: 0 }}>Bộ sưu tập tuần này</h2>
                <p style={{ color: T.onSurfaceVariant, fontSize: '15px', margin: 0 }}>Những địa điểm được biên tập viên lựa chọn</p>
              </div>
              <button
                style={{ color: T.primary, fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', borderBottom: `2px solid ${T.primaryFixed}`, paddingBottom: '4px', cursor: 'pointer', transition: 'border-color 0.15s', fontFamily: T.body }}
                onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = T.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = T.primaryFixed; }}
              >
                Xem tất cả
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {filteredCollections.map((col, idx) => {
                const isWide = col.wide && idx === 0;
                return (
                  <div
                    key={col.id}
                    onClick={() => navigate('/app/collection/' + col.id)}
                    style={{ gridColumn: isWide ? 'span 2' : 'span 1', position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '360px', cursor: 'pointer', transition: 'transform 0.3s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: col.gradient, transition: 'transform 1s' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,27,27,0.9) 0%, rgba(28,27,27,0.15) 50%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
                      {col.badge && (
                        <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#ffffff', padding: '4px 12px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '12px', fontFamily: T.body }}>{col.badge}</span>
                      )}
                      <h4 style={{ fontFamily: T.headline, fontWeight: 700, fontSize: isWide ? '22px' : '18px', color: '#ffffff', lineHeight: 1.25, margin: 0 }}>{col.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>

      <button
        style={{ position: 'fixed', bottom: '112px', right: '32px', background: T.primary, color: T.onPrimary, width: '56px', height: '56px', borderRadius: '50%', boxShadow: '0 8px 24px rgba(173,44,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', zIndex: 40, transition: 'transform 0.15s' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      >
        <span className="material-symbols-outlined">edit</span>
      </button>

    </div>
  );
}
