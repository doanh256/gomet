import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DealSplitPage = () => {
  const navigate = useNavigate();
  const [myPaid, setMyPaid] = useState(false);

  const deal = {
    name: 'Date Night: Bua toi tai The Rustic Table',
    originalPrice: '500.000',
    splitPrice: '250.000',
    currency: 'VND',
  };

  const participants = [
    { name: 'Ban', avatar: '', amount: '250.000', status: myPaid ? 'paid' : 'pending' },
    { name: 'Minh Anh', avatar: '', amount: '250.000', status: 'paid' },
  ];

  const paidCount = participants.filter(p => p.status === 'paid').length;

  const breakdown = [
    { label: 'Bua an (2 nguoi)', amount: '380.000' },
    { label: 'Do uong', amount: '80.000' },
    { label: 'Tip (10%)', amount: '40.000' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--surface-container-lowest)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--outline-variant)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          color: 'var(--on-surface-variant)', display: 'flex',
        }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 700, color: 'var(--on-surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--primary)' }}>handshake</span>
            Mo phien deal
          </h1>
        </div>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '20px 16px 100px' }}>
        {/* Timer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: 'var(--error-container)', color: 'var(--error)',
          borderRadius: 'var(--radius)', padding: '10px 16px',
          marginBottom: 16, fontSize: 14, fontWeight: 600,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>timer</span>
          Con 2h de thanh toan
        </div>

        {/* Deal card */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '20px 18px',
          marginBottom: 16,
          boxShadow: 'var(--card-shadow)',
          textAlign: 'center',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-full)',
            background: 'var(--primary-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--on-primary)', fontSize: 28 }}>receipt_long</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700,
            color: 'var(--on-surface)', marginBottom: 12,
          }}>
            {deal.name}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 2 }}>Tong gia</p>
              <p style={{
                fontSize: 18, fontWeight: 700, color: 'var(--on-surface-variant)',
                textDecoration: 'line-through',
              }}>{deal.originalPrice} {deal.currency}</p>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>arrow_forward</span>
            <div>
              <p style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 2 }}>Moi nguoi</p>
              <p style={{
                fontSize: 22, fontWeight: 800, color: 'var(--primary)',
                fontFamily: 'var(--font-headline)',
              }}>{deal.splitPrice} <span style={{ fontSize: 13, fontWeight: 600 }}>{deal.currency}/nguoi</span></p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '20px 18px',
          marginBottom: 16,
          boxShadow: 'var(--card-shadow)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--on-surface)' }}>
            Thanh vien
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {participants.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                background: 'var(--surface-container-low)',
                borderRadius: 'var(--radius)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-full)',
                  background: 'var(--surface-container-high)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--on-surface-variant)' }}>person</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)' }}>{p.name}</p>
                  <p style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>{p.amount} {deal.currency}</p>
                </div>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '5px 12px', borderRadius: 'var(--radius-full)',
                  fontSize: 12, fontWeight: 600,
                  background: p.status === 'paid' ? 'rgba(76, 175, 80, 0.12)' : 'var(--error-container)',
                  color: p.status === 'paid' ? '#2e7d32' : 'var(--error)',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                    {p.status === 'paid' ? 'check_circle' : 'pending'}
                  </span>
                  {p.status === 'paid' ? 'Da dong' : 'Cho thanh toan'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deal breakdown */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '20px 18px',
          marginBottom: 16,
          boxShadow: 'var(--card-shadow)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--on-surface)' }}>
            Chi tiet deal
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {breakdown.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: i < breakdown.length - 1 ? 10 : 0,
                borderBottom: i < breakdown.length - 1 ? '1px solid var(--outline-variant)' : 'none',
              }}>
                <span style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)' }}>{item.amount} {deal.currency}</span>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 10,
              borderTop: '2px solid var(--on-surface)',
            }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--on-surface)' }}>Tong cong</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-headline)' }}>
                {deal.originalPrice} {deal.currency}
              </span>
            </div>
          </div>
        </div>

        {/* Payment progress */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '18px',
          marginBottom: 16,
          boxShadow: 'var(--card-shadow)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)' }}>Tien do thanh toan</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{paidCount}/2 da thanh toan</span>
          </div>
          <div style={{
            width: '100%', height: 10,
            background: 'var(--surface-container-high)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${(paidCount / 2) * 100}%`,
              height: '100%',
              background: 'var(--primary-gradient)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* Escrow note */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: 'var(--primary-fixed)',
          borderRadius: 'var(--radius)',
          padding: '14px 16px',
          marginBottom: 24,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--primary)', flexShrink: 0, marginTop: 1 }}>lock</span>
          <p style={{ fontSize: 13, color: 'var(--on-primary-container)', lineHeight: 1.5 }}>
            Tien duoc giu an toan cho den khi buoi hen hoan thanh
          </p>
        </div>

        {/* Pay button */}
        {!myPaid && (
          <button
            onClick={() => setMyPaid(true)}
            style={{
              width: '100%', padding: '15px 0',
              background: 'var(--primary-gradient)', color: 'var(--on-primary)',
              border: 'none', borderRadius: 'var(--radius)',
              fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-headline)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>payments</span>
            Thanh toan phan cua ban - {deal.splitPrice} {deal.currency}
          </button>
        )}

        {myPaid && (
          <div style={{
            textAlign: 'center', padding: '20px',
            background: 'rgba(76, 175, 80, 0.08)',
            borderRadius: 'var(--radius)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#2e7d32' }}>task_alt</span>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#2e7d32', marginTop: 8 }}>
              Ban da thanh toan thanh cong!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealSplitPage;
