import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { useToast } from '../../components/ToastNotification';
import { useAppContext } from '../../AppContext';

const TOPUP_AMOUNTS = [50000, 100000, 200000, 500000];

const WalletPage = () => {
  const { addToast } = useToast();
  const { currentUser } = useAppContext();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredChip, setHoveredChip] = useState(null);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const data = await api.get('/wallet');
      if (data) {
        setBalance(data.balance);
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async (amount) => {
    try {
      const data = await api.post('/wallet/topup', { amount });
      setBalance(data.balance);
      addToast(`Nap ${amount.toLocaleString('vi-VN')}d thanh cong!`, 'success');
      loadWallet();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const txIconMap = {
    topup: { icon: 'account_balance_wallet', color: '#FFD54F' },
    payment: { icon: 'receipt_long', color: '#FFB59E' },
    earning: { icon: 'stars', color: '#117500' },
    refund: { icon: 'replay', color: '#FF571A' },
  };

  const paymentMethods = [
    { icon: 'account_balance', label: 'MoMo' },
    { icon: 'qr_code_2', label: 'ZaloPay' },
    { icon: 'credit_card', label: 'Visa/MC' },
  ];

  if (loading) {
    return (
      <div style={{
        flex: 1, backgroundColor: '#131313', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif", color: '#E6BEB2',
      }}>
        <span className="material-symbols-outlined" style={{
          fontSize: '24px', marginRight: '8px',
          animation: 'spin 1s linear infinite',
        }}>progress_activity</span>
        Dang tai vi...
      </div>
    );
  }

  return (
    <div style={{
      flex: 1, backgroundColor: '#131313', overflowY: 'auto',
      padding: '40px 32px 80px', fontFamily: "'Inter', sans-serif",
    }}>
      <h1 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '28px', fontWeight: 800,
        color: '#FDF9F3', margin: '0 0 32px',
      }}>
        Vi Gomet
      </h1>

      {/* ── Balance Card ── */}
      <div style={{
        background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
        borderRadius: '1.5rem', padding: '36px',
        color: 'white', marginBottom: '32px',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Wallet watermark icon */}
        <span className="material-symbols-outlined" style={{
          position: 'absolute', top: '-20px', right: '-10px',
          fontSize: '160px', color: 'rgba(255,255,255,0.08)',
          transform: 'rotate(-15deg)', pointerEvents: 'none',
        }}>account_balance_wallet</span>

        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '160px', height: '160px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', right: '60px',
          width: '100px', height: '100px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
        }} />

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px',
          fontWeight: 600, opacity: 0.85, margin: 0,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>account_balance_wallet</span>
          So du hien tai
        </p>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '48px', fontWeight: 800, margin: '12px 0 4px',
          position: 'relative', letterSpacing: '-0.02em',
        }}>
          {balance.toLocaleString('vi-VN')}d
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px', opacity: 0.6, margin: 0,
        }}>
          {currentUser?.name} &middot; {currentUser?.email}
        </p>
      </div>

      {/* ── Payment Methods ── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
        {paymentMethods.map(pm => (
          <div key={pm.label} style={{
            padding: '10px 20px', borderRadius: '9999px',
            backgroundColor: '#1C1B1B', color: '#E6BEB2',
            fontSize: '13px', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: "'Inter', sans-serif",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#FFB59E' }}>{pm.icon}</span>
            {pm.label}
          </div>
        ))}
      </div>

      {/* ── Top Up Section ── */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '20px', fontWeight: 700,
          color: '#FDF9F3', margin: '0 0 16px',
        }}>
          Nap Credits
        </h2>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleTopup(100000)}
            style={{
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              border: 'none', color: '#3A0B00',
              padding: '14px 28px', borderRadius: '9999px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
            Nap Credits
          </button>
        </div>

        {/* Quick Top-up Chips */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
          {TOPUP_AMOUNTS.map(amount => (
            <button
              key={amount}
              onClick={() => handleTopup(amount)}
              onMouseEnter={() => setHoveredChip(amount)}
              onMouseLeave={() => setHoveredChip(null)}
              style={{
                padding: '12px 20px', borderRadius: '9999px',
                backgroundColor: hoveredChip === amount ? '#FF571A' : '#2A2A2A',
                color: hoveredChip === amount ? '#3A0B00' : '#FDF9F3',
                border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s ease',
              }}
            >
              {amount >= 1000 ? `${(amount / 1000).toLocaleString()}k` : amount.toLocaleString('vi-VN')}d
            </button>
          ))}
        </div>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px', color: '#E6BEB2', marginTop: '12px',
          opacity: 0.6,
        }}>
          * Day la vi demo. Phien ban chinh thuc se tich hop MoMo/ZaloPay.
        </p>
      </div>

      {/* ── Transaction History ── */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '20px', fontWeight: 700,
          color: '#FDF9F3', margin: '0 0 16px',
        }}>
          Lich Su Giao Dich
        </h2>

        <div style={{
          backgroundColor: '#1C1B1B', borderRadius: '1.5rem',
          padding: '8px 20px',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
        }}>
          {transactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#E6BEB2' }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '48px', color: '#353535', display: 'block', marginBottom: '12px',
              }}>receipt_long</span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>
                Chua co giao dich nao
              </p>
            </div>
          ) : (
            transactions.map((tx, idx) => {
              const txMeta = txIconMap[tx.type] || { icon: 'credit_card', color: '#E6BEB2' };
              const isPositive = tx.amount > 0;
              return (
                <React.Fragment key={tx.id}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 0',
                  }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '1rem',
                      backgroundColor: '#2A2A2A',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span className="material-symbols-outlined" style={{
                        fontSize: '22px', color: txMeta.color,
                      }}>{txMeta.icon}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '14px', fontWeight: 600, color: '#FDF9F3',
                        fontFamily: "'Inter', sans-serif",
                      }}>{tx.description || tx.type}</div>
                      <div style={{
                        fontSize: '12px', color: '#E6BEB2',
                        fontFamily: "'Inter', sans-serif", marginTop: '2px',
                      }}>{new Date(tx.createdAt).toLocaleDateString('vi-VN')}</div>
                    </div>
                    <div style={{
                      fontSize: '15px', fontWeight: 700,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: isPositive ? '#117500' : '#FFB59E',
                    }}>
                      {isPositive ? '+' : ''}{tx.amount.toLocaleString('vi-VN')}d
                    </div>
                  </div>
                  {idx < transactions.length - 1 && (
                    <hr style={{ height: '1px', backgroundColor: '#2A2A2A', border: 'none' }} />
                  )}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WalletPage;
