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
    topup: { icon: 'account_balance_wallet', color: '#4ecdc4' },
    payment: { icon: 'receipt_long', color: 'var(--primary)' },
    earning: { icon: 'stars', color: '#2e7d32' },
    refund: { icon: 'replay', color: '#ff7854' },
  };

  const s = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 32px 80px',
    },
    pageTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      margin: '0 0 32px',
    },
    balanceCard: {
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-lg)',
      padding: '36px',
      color: 'white',
      marginBottom: '32px',
      boxShadow: 'var(--editorial-shadow)',
      position: 'relative',
      overflow: 'hidden',
    },
    balanceDecor: {
      position: 'absolute',
      top: '-40px',
      right: '-40px',
      width: '160px',
      height: '160px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    balanceDecor2: {
      position: 'absolute',
      bottom: '-30px',
      right: '60px',
      width: '100px',
      height: '100px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
    balanceLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      fontWeight: 600,
      opacity: 0.85,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    balanceAmount: {
      fontFamily: 'var(--font-headline)',
      fontSize: '42px',
      fontWeight: 800,
      margin: '12px 0 4px',
      position: 'relative',
    },
    balanceSub: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      opacity: 0.6,
      margin: 0,
    },
    topupSection: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: '0 0 16px',
    },
    topupRow: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    topupBtn: {
      background: 'var(--primary-gradient)',
      border: 'none',
      color: 'white',
      padding: '14px 28px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: 'var(--editorial-shadow)',
      transition: 'transform 0.2s ease',
    },
    quickChip: (hover) => ({
      padding: '12px 20px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: hover ? 'var(--primary)' : 'var(--surface-container-lowest)',
      color: hover ? 'white' : 'var(--on-surface)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 700,
      fontFamily: 'var(--font-body)',
      boxShadow: 'var(--card-shadow)',
      transition: 'all 0.2s ease',
    }),
    disclaimer: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginTop: '12px',
    },
    txSection: {
      marginBottom: '40px',
    },
    card: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '8px 20px',
      boxShadow: 'var(--card-shadow)',
    },
    txItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 0',
    },
    txDivider: {
      height: '1px',
      backgroundColor: 'var(--surface-container-high)',
      border: 'none',
    },
    txIcon: {
      width: '44px',
      height: '44px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-low)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    txDesc: {
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      fontFamily: 'var(--font-body)',
    },
    txDate: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
      marginTop: '2px',
    },
    txAmount: (positive) => ({
      fontSize: '15px',
      fontWeight: 700,
      fontFamily: 'var(--font-headline)',
      color: positive ? '#2e7d32' : 'var(--primary)',
    }),
    emptyState: {
      textAlign: 'center',
      padding: '40px 0',
      color: 'var(--on-surface-variant)',
    },
    loadingState: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 0',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface-variant)',
      fontSize: '15px',
    },
  };

  if (loading) {
    return (
      <div style={s.page}>
        <div style={s.loadingState}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px', marginRight: '8px', animation: 'spin 1s linear infinite' }}>progress_activity</span>
          Dang tai vi...
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <h1 style={s.pageTitle}>Vi Gomet</h1>

      {/* Balance Card */}
      <div style={s.balanceCard}>
        <div style={s.balanceDecor} />
        <div style={s.balanceDecor2} />
        <p style={s.balanceLabel}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>account_balance_wallet</span>
          So du hien tai
        </p>
        <p style={s.balanceAmount}>
          {balance.toLocaleString('vi-VN')}d
        </p>
        <p style={s.balanceSub}>
          {currentUser?.name} &middot; {currentUser?.email}
        </p>
      </div>

      {/* Top Up Section */}
      <div style={s.topupSection}>
        <h2 style={s.sectionTitle}>Nap Credits</h2>
        <div style={s.topupRow}>
          <button
            style={s.topupBtn}
            onClick={() => handleTopup(100000)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
              style={s.quickChip(false)}
              onClick={() => handleTopup(amount)}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-container-lowest)'; e.currentTarget.style.color = 'var(--on-surface)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {amount >= 1000 ? `${(amount / 1000).toLocaleString()}k` : amount.toLocaleString('vi-VN')}d
            </button>
          ))}
        </div>

        <p style={s.disclaimer}>
          * Day la vi demo. Phien ban chinh thuc se tich hop MoMo/ZaloPay.
        </p>
      </div>

      {/* Transaction History */}
      <div style={s.txSection}>
        <h2 style={s.sectionTitle}>Lich Su Giao Dich</h2>

        <div style={s.card}>
          {transactions.length === 0 ? (
            <div style={s.emptyState}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--outline-variant)', display: 'block', marginBottom: '12px' }}>receipt_long</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', margin: 0 }}>Chua co giao dich nao</p>
            </div>
          ) : (
            transactions.map((tx, idx) => {
              const txMeta = txIconMap[tx.type] || { icon: 'credit_card', color: 'var(--on-surface-variant)' };
              return (
                <React.Fragment key={tx.id}>
                  <div style={s.txItem}>
                    <div style={s.txIcon}>
                      <span className="material-symbols-outlined" style={{ fontSize: '22px', color: txMeta.color }}>{txMeta.icon}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={s.txDesc}>{tx.description || tx.type}</div>
                      <div style={s.txDate}>{new Date(tx.createdAt).toLocaleDateString('vi-VN')}</div>
                    </div>
                    <div style={s.txAmount(tx.amount > 0)}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('vi-VN')}d
                    </div>
                  </div>
                  {idx < transactions.length - 1 && <hr style={s.txDivider} />}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
