import React, { useState } from 'react';

const REWARD_CATEGORIES = ['Tất cả', 'Ẩm thực', 'Đổi quyền Visa', 'Du lịch', 'Sức khỏe'];

const REWARDS = [
  {
    id: 1,
    category: 'Đổi quyền Visa',
    title: 'Nâng cấp Visa Signature Elite',
    description: 'Mở khóa đặc quyền nhà hàng 5 sao toàn cầu',
    points: 15000,
    featured: true,
    badge: 'Nổi bật',
    icon: '💎',
    tag: 'VIP',
  },
  {
    id: 2,
    category: 'Ẩm thực',
    title: 'Pizza 4P\'s — Voucher 200k',
    description: 'Sử dụng tại tất cả chi nhánh Pizza 4P\'s',
    points: 2000,
    featured: false,
    icon: '🍕',
    tag: 'Phổ biến',
  },
  {
    id: 3,
    category: 'Ẩm thực',
    title: 'The Coffee House — 5 ly cà phê',
    description: 'Đổi lấy 5 ly Signature Coffee bất kỳ',
    points: 500,
    featured: false,
    icon: '☕',
    tag: null,
  },
  {
    id: 4,
    category: 'Ẩm thực',
    title: 'La Gourmet — Set menu 5 món',
    description: 'Trải nghiệm fine dining đẳng cấp quốc tế',
    points: 1200,
    featured: false,
    icon: '🍽️',
    tag: 'Nổi bật tuần này',
  },
  {
    id: 5,
    category: 'Ẩm thực',
    title: 'Thả Cà Phê Đặc Sản — Trọn gói',
    description: 'Tận hưởng cà phê rang xay nguyên chất',
    points: 450,
    featured: false,
    icon: '🫖',
    tag: null,
  },
  {
    id: 6,
    category: 'Du lịch',
    title: 'Khách sạn 5 sao — 1 đêm',
    description: 'Nghỉ dưỡng tại các khách sạn đối tác GoMet',
    points: 8000,
    featured: false,
    icon: '🏨',
    tag: null,
  },
  {
    id: 7,
    category: 'Sức khỏe',
    title: 'Gói spa thư giãn',
    description: 'Massage toàn thân 90 phút tại spa đối tác',
    points: 3000,
    featured: false,
    icon: '💆',
    tag: null,
  },
];

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const userPoints = 2450;
  const nextTierPoints = 3000;
  const progress = Math.round((userPoints / nextTierPoints) * 100);

  const filtered = activeTab === 'Tất cả'
    ? REWARDS
    : REWARDS.filter(r => r.category === activeTab);

  const featured = filtered.find(r => r.featured);
  const rest = filtered.filter(r => !r.featured);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--md-sys-color-background, #fcf9f8)', paddingBottom: 80 }}>
      {/* Header balance card */}
      <div style={{
        background: 'linear-gradient(135deg, #ad2c00 0%, #d44500 100%)',
        padding: '24px 20px 32px',
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Đổi Thưởng
          </h1>
          <span style={{
            background: 'rgba(255,255,255,0.25)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}>
            🏅 {userPoints.toLocaleString()} VÀNG
          </span>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: '16px 20px',
          backdropFilter: 'blur(8px)',
        }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, opacity: 0.85, letterSpacing: 1, textTransform: 'uppercase' }}>
            Số dư điểm của bạn
          </p>
          <p style={{ margin: '0 0 12px', fontSize: 32, fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {userPoints.toLocaleString()} <span style={{ fontSize: 18, fontWeight: 600 }}>VÀNG</span>
          </p>

          {/* Progress bar */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.85, marginBottom: 6 }}>
              <span>Hạng Bạch Kim</span>
              <span>Thẻ Vàng</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: '#FFD700',
                borderRadius: 8,
                transition: 'width 0.6s ease',
              }} />
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 12, opacity: 0.85 }}>
              {progress}% đến Thẻ Vàng — cần thêm {(nextTierPoints - userPoints).toLocaleString()} điểm
            </p>
          </div>
        </div>
      </div>

      {/* Weekend promo banner */}
      <div style={{
        margin: '16px 16px 0',
        background: 'linear-gradient(90deg, #ff7043, #ff8a65)',
        borderRadius: 12,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: '#fff',
      }}>
        <span style={{ fontSize: 20 }}>⚡</span>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>Ưu đãi cuối tuần</p>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.9 }}>Giảm 20% điểm đổi thưởng — Hết hạn Chủ nhật</p>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{
        overflowX: 'auto',
        padding: '16px 16px 0',
        display: 'flex',
        gap: 8,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {REWARD_CATEGORIES.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: 20,
              border: activeTab === tab ? 'none' : '1.5px solid #e0d8d5',
              background: activeTab === tab ? '#ad2c00' : '#fff',
              color: activeTab === tab ? '#fff' : '#505965',
              fontWeight: activeTab === tab ? 700 : 500,
              fontSize: 14,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a1a1a' }}>
          Khám phá ưu đãi
        </h2>

        {/* Featured card */}
        {featured && (
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0,
              background: '#FFD700', color: '#1a1a1a',
              padding: '4px 12px', borderRadius: '0 20px 0 12px',
              fontSize: 12, fontWeight: 700,
            }}>
              {featured.badge}
            </div>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{featured.icon}</div>
            <span style={{
              background: 'rgba(255,215,0,0.2)', color: '#FFD700',
              padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700,
              letterSpacing: 1,
            }}>
              {featured.tag}
            </span>
            <h3 style={{ margin: '8px 0 4px', fontSize: 18, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {featured.title}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: 13, opacity: 0.8 }}>{featured.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#FFD700' }}>
                {featured.points.toLocaleString()} điểm
              </span>
              <button style={{
                background: '#FFD700', color: '#1a1a1a',
                border: 'none', borderRadius: 12,
                padding: '10px 20px', fontWeight: 700, fontSize: 14,
                cursor: 'pointer',
              }}>
                Đổi ngay
              </button>
            </div>
          </div>
        )}

        {/* Reward grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {rest.map(reward => (
            <div key={reward.id} style={{
              background: '#fff',
              borderRadius: 16,
              padding: 16,
              border: '1px solid #f0ebe8',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}>
              <div style={{ fontSize: 28 }}>{reward.icon}</div>
              {reward.tag && (
                <span style={{
                  background: '#fff3e0', color: '#ad2c00',
                  padding: '2px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                  alignSelf: 'flex-start',
                }}>
                  {reward.tag}
                </span>
              )}
              <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a1a1a', lineHeight: 1.3 }}>
                {reward.title}
              </h4>
              <p style={{ margin: 0, fontSize: 11, color: '#757575', lineHeight: 1.4 }}>
                {reward.description}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ad2c00' }}>
                  {reward.points.toLocaleString()} điểm
                </span>
                <button style={{
                  background: userPoints >= reward.points ? '#ad2c00' : '#e0e0e0',
                  color: userPoints >= reward.points ? '#fff' : '#9e9e9e',
                  border: 'none', borderRadius: 8,
                  padding: '6px 12px', fontSize: 11, fontWeight: 700,
                  cursor: userPoints >= reward.points ? 'pointer' : 'default',
                }}>
                  Đổi
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 16px', color: '#9e9e9e' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎁</div>
            <p style={{ margin: 0, fontSize: 15 }}>Không có ưu đãi trong danh mục này</p>
          </div>
        )}
      </div>
    </div>
  );
}
