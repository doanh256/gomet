import React, { useState } from 'react';
import { X, Zap, Radio, Users, MapPin, CheckCircle } from 'lucide-react';

const BROADCAST_PLANS = [
  {
    id: 'single',
    icon: '📡',
    name: 'Phát 1 Kèo',
    price: '9.000đ',
    desc: 'Broadcast đúng 1 kèo của bạn đến toàn bộ user bán kính 5km trong 3 giờ.',
    highlight: false,
  },
  {
    id: 'weekly',
    icon: '🔥',
    name: 'Gói Tuần Sôi Động',
    price: '39.000đ / 7 ngày',
    desc: 'Broadcast không giới hạn kèo trong 7 ngày. Kèo của bạn được ưu tiên top-feed.',
    highlight: true,
    badge: 'Phổ biến nhất'
  },
  {
    id: 'vip',
    icon: '⭐',
    name: 'VIP Cạ Cứng',
    price: '99.000đ / tháng',
    desc: 'Broadcast mọi lúc + Huy hiệu VIP trên profile + Xem ai đã xem kèo của bạn.',
    highlight: false,
  }
];

const PremiumModal = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState('weekly');

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 99999, display: 'flex',
      justifyContent: 'center', alignItems: 'center',
      padding: '20px', animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: '#13111C', borderRadius: '28px', width: '100%',
        maxWidth: '460px', overflow: 'hidden', position: 'relative',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6)', animation: 'slideUp 0.3s ease-out'
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.08)', border: 'none',
          color: 'white', padding: '8px', borderRadius: '50%',
          cursor: 'pointer', zIndex: 10, display: 'flex'
        }}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ padding: '32px 28px 20px', background: 'linear-gradient(135deg, #1f1140 0%, #13111C 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ background: 'linear-gradient(135deg, #FF6B6B, #fec142)', borderRadius: '12px', padding: '8px', display: 'flex' }}>
              <Radio size={20} color="white" />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', margin: 0 }}>Loa Phát Thanh Gomet 📡</h2>
          </div>
          <p style={{ color: '#A09FB1', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
            Broadcast kèo của bạn tới tất cả người rảnh trong bán kính <strong style={{ color: '#FF6B6B' }}>5km</strong> ngay lập tức. Đừng để kèo bị ế!
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
            {[
              { icon: <Users size={14} />, label: '~340 người rảnh tối nay' },
              { icon: <MapPin size={14} />, label: 'Bán kính 5km quanh bạn' },
              { icon: <Zap size={14} />, label: 'Hiển thị ngay lập tức' }
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#A09FB1', fontSize: '11px', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', padding: '4px 10px' }}>
                {stat.icon} {stat.label}
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {BROADCAST_PLANS.map(plan => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              style={{
                border: selected === plan.id
                  ? '2px solid #FF6B6B'
                  : '2px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                background: selected === plan.id ? 'rgba(255,107,107,0.08)' : 'rgba(255,255,255,0.04)',
                transition: 'all 0.2s',
                position: 'relative',
                display: 'flex', alignItems: 'flex-start', gap: '14px'
              }}
            >
              {plan.badge && (
                <div style={{ position: 'absolute', top: '-10px', right: '16px', background: 'linear-gradient(260deg, #FF6B6B 0%, #fec142 100%)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '20px' }}>
                  {plan.badge}
                </div>
              )}
              <span style={{ fontSize: '28px', flexShrink: 0, marginTop: '2px' }}>{plan.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>{plan.name}</span>
                  <span style={{ color: '#fec142', fontWeight: 800, fontSize: '15px' }}>{plan.price}</span>
                </div>
                <p style={{ color: '#A09FB1', fontSize: '12px', margin: '4px 0 0 0', lineHeight: 1.5 }}>{plan.desc}</p>
              </div>
              {selected === plan.id && (
                <CheckCircle size={20} color="#FF6B6B" style={{ flexShrink: 0, marginTop: '2px' }} />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ padding: '0 28px 28px' }}>
          <button
            style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(260deg, #FF6B6B 0%, #fec142 100%)',
              color: 'white', border: 'none', borderRadius: '30px',
              fontSize: '16px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
            onClick={() => alert('Tính năng Thanh Toán đang phát triển — Coming Soon!')}
          >
            <Radio size={18} /> Broadcast Kèo Ngay!
          </button>
          <p style={{ textAlign: 'center', color: '#A09FB1', fontSize: '12px', margin: '12px 0 0 0' }}>
            Thanh toán an toàn qua MoMo, Zalopay, VNPAY
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PremiumModal;
