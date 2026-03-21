import React, { useState, useEffect } from 'react';
import { Wallet, Plus, ArrowDownLeft, ArrowUpRight, CreditCard } from 'lucide-react';
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
  const [topupAmount, setTopupAmount] = useState(null);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const data = await api.get('/wallet');
      if (data) {
        setBalance(data.balance);
        setTransactions(data.transactions);
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
      addToast(`Nạp ${amount.toLocaleString('vi-VN')}d thành công!`, 'success');
      loadWallet();
      setTopupAmount(null);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const txIcon = (type) => {
    switch (type) {
      case 'topup': return <ArrowDownLeft size={18} color="#4ecdc4" />;
      case 'payment': return <ArrowUpRight size={18} color="#fd5068" />;
      case 'earning': return <ArrowDownLeft size={18} color="#2e7d32" />;
      case 'refund': return <ArrowDownLeft size={18} color="#ff7854" />;
      default: return <CreditCard size={18} />;
    }
  };

  if (loading) {
    return <div className="main-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Đang tải...</p></div>;
  }

  return (
    <div className="main-area" style={{ padding: '24px', overflowY: 'auto' }}>
      {/* Balance Card */}
      <div style={{
        background: 'linear-gradient(135deg, #1f1140 0%, #3d1f6d 100%)',
        borderRadius: '24px', padding: '32px', color: 'white', marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(31, 17, 64, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Wallet size={24} />
          <span style={{ fontSize: '16px', fontWeight: 600, opacity: 0.8 }}>Số dư ví Gomet</span>
        </div>
        <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>
          {balance.toLocaleString('vi-VN')}d
        </div>
        <p style={{ fontSize: '14px', opacity: 0.6, margin: 0 }}>{currentUser?.name} - {currentUser?.email}</p>
      </div>

      {/* Top up */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111418', margin: '0 0 16px' }}>Nạp tiền vào ví</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {TOPUP_AMOUNTS.map(amount => (
            <button
              key={amount}
              onClick={() => handleTopup(amount)}
              style={{
                padding: '16px', borderRadius: '16px',
                border: '2px solid #e1e4e8', background: 'white',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                fontSize: '16px', fontWeight: 700, color: '#111418',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fd5068'; e.currentTarget.style.background = '#fff5f6'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e1e4e8'; e.currentTarget.style.background = 'white'; }}
            >
              <Plus size={18} color="#fd5068" />
              {amount.toLocaleString('vi-VN')}d
            </button>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#656e7b', marginTop: '8px', textAlign: 'center' }}>
          * Đây là ví demo. Trong phiên bản chính thức sẽ tích hợp MoMo/ZaloPay.
        </p>
      </div>

      {/* Transactions */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111418', margin: '0 0 16px' }}>Lịch sử giao dịch</h2>
        {transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#656e7b' }}>
            <p>Chưa có giao dịch nào</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {transactions.map(tx => (
              <div key={tx.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 16px', background: 'white', borderRadius: '14px',
                border: '1px solid #f0f2f5',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f5f7f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {txIcon(tx.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#111418' }}>{tx.description || tx.type}</div>
                  <div style={{ fontSize: '12px', color: '#656e7b' }}>{new Date(tx.createdAt).toLocaleDateString('vi-VN')}</div>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: tx.amount > 0 ? '#2e7d32' : '#fd5068' }}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('vi-VN')}d
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
