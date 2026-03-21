import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastNotification';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';

const INTEREST_OPTIONS = ['Cong nghe', 'Nau an', 'Coffee', 'Du lich', 'The thao', 'Am nhac', 'Phim anh', 'Doc sach', 'Gaming', 'Nhiep anh', 'Yoga', 'Thu cung', 'An uong', 'Thoi trang', 'Nghe thuat'];

const TRANSACTION_FILTERS = [
  { key: 'all', label: 'Tat ca' },
  { key: 'topup', label: 'Nap tien' },
  { key: 'payment', label: 'Dat keo' },
  { key: 'earning', label: 'Thuong' },
];

const ProfilePage = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout } = useAppContext();
  const fileRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [age, setAge] = useState(currentUser?.age || '');
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [interests, setInterests] = useState(() => {
    const raw = currentUser?.interests;
    if (!raw) return [];
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);

  // Wallet state
  const [walletBalance, setWalletBalance] = useState(currentUser?.walletBalance || 0);
  const [transactions, setTransactions] = useState([]);
  const [txFilter, setTxFilter] = useState('all');
  const [walletLoading, setWalletLoading] = useState(true);

  useEffect(() => {
    api.get('/wallet').then(data => {
      if (data) {
        setWalletBalance(data.balance);
        setTransactions(data.transactions || []);
      }
    }).catch(console.error).finally(() => setWalletLoading(false));
  }, []);

  const getAvatarUrl = () => {
    if (!currentUser) return '';
    return currentUser.avatar || currentUser.images?.[0]?.url || currentUser.images?.[0] || '';
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await api.upload('/upload/avatar', file, 'avatar');
      const data = await api.get('/auth/me');
      if (data?.user) {
        await updateProfile({ avatar: data.user.avatar });
      }
      addToast('Da cap nhat anh dai dien!', 'success');
    } catch (err) {
      addToast('Upload that bai', 'error');
    } finally {
      setUploading(false);
    }
  };

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : prev.length < 8 ? [...prev, interest] : prev
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        name, age: Number(age), gender, location, bio,
        interests: JSON.stringify(interests),
      });
      setEditing(false);
      addToast('Da luu ho so!', 'success');
    } catch (err) {
      addToast(err.message || 'Luu that bai', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTopup = async (amount) => {
    try {
      const data = await api.post('/wallet/topup', { amount });
      setWalletBalance(data.balance);
      addToast(`Nap ${amount.toLocaleString('vi-VN')}d thanh cong!`, 'success');
      const walletData = await api.get('/wallet');
      if (walletData) {
        setTransactions(walletData.transactions || []);
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Ban co chac chan muon xoa tai khoan? Hanh dong nay khong the hoan tac.')) return;
    try {
      await api.delete('/auth/account');
      if (logout) logout();
      navigate('/login');
    } catch (err) {
      addToast('Xoa tai khoan that bai', 'error');
    }
  };

  const genderLabel = { male: 'Nam', female: 'Nu', other: 'Khac' };

  const filteredTransactions = txFilter === 'all'
    ? transactions
    : transactions.filter(tx => tx.type === txFilter);

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
    heroRow: {
      display: 'flex',
      gap: '32px',
      alignItems: 'flex-start',
      marginBottom: '48px',
      flexWrap: 'wrap',
    },
    heroLeft: {
      display: 'flex',
      gap: '24px',
      alignItems: 'center',
      flex: 1,
      minWidth: '300px',
    },
    avatarWrap: {
      position: 'relative',
      flexShrink: 0,
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: 'var(--radius-lg)',
      objectFit: 'cover',
      boxShadow: 'var(--editorial-shadow)',
      transition: 'transform 0.3s ease',
      transform: avatarHover ? 'rotate(-3deg) scale(1.03)' : 'rotate(0deg) scale(1)',
      cursor: 'pointer',
    },
    avatarPlaceholder: {
      width: '120px',
      height: '120px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'var(--font-headline)',
      fontSize: '40px',
      fontWeight: 800,
      boxShadow: 'var(--editorial-shadow)',
      transition: 'transform 0.3s ease',
      transform: avatarHover ? 'rotate(-3deg) scale(1.03)' : 'rotate(0deg) scale(1)',
      cursor: 'pointer',
    },
    cameraBtn: {
      position: 'absolute',
      bottom: '-4px',
      right: '-4px',
      width: '36px',
      height: '36px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-gradient)',
      border: '3px solid var(--surface)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
    nameRow: {
      flex: 1,
    },
    nameText: {
      fontFamily: 'var(--font-headline)',
      fontSize: '28px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      margin: 0,
      lineHeight: 1.3,
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      background: 'var(--surface-container-high)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '11px',
      fontWeight: 700,
      color: 'var(--primary)',
      fontFamily: 'var(--font-body)',
      letterSpacing: '0.5px',
      marginTop: '8px',
    },
    bioText: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--on-surface-variant)',
      marginTop: '10px',
      lineHeight: 1.6,
    },
    editBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--primary)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      fontWeight: 600,
      marginTop: '12px',
      padding: 0,
    },
    creditsCard: {
      background: 'var(--primary-gradient)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px',
      color: 'white',
      minWidth: '260px',
      boxShadow: 'var(--editorial-shadow)',
    },
    creditsLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 600,
      opacity: 0.85,
      margin: 0,
    },
    creditsAmount: {
      fontFamily: 'var(--font-headline)',
      fontSize: '32px',
      fontWeight: 800,
      margin: '8px 0 16px',
    },
    topupBtn: {
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.3)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'background 0.2s',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: '0 0 20px',
    },
    card: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
    },
    chip: (selected) => ({
      padding: '8px 18px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: selected ? 'var(--primary)' : 'var(--surface-container-high)',
      color: selected ? 'white' : 'var(--on-surface)',
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
    }),
    filterTab: (active) => ({
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: active ? 'var(--on-surface)' : 'transparent',
      color: active ? 'var(--surface)' : 'var(--on-surface-variant)',
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
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
    txIcon: (color) => ({
      width: '40px',
      height: '40px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-low)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }),
    settingsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '12px',
    },
    settingsCard: {
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    settingsIcon: {
      width: '40px',
      height: '40px',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingsLabel: {
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 700,
      color: 'var(--on-surface)',
    },
    dangerBtn: {
      background: 'none',
      border: '2px solid var(--error)',
      color: 'var(--error)',
      padding: '12px 24px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    // Edit mode styles
    inputLabel: {
      display: 'block',
      fontSize: '13px',
      fontWeight: 600,
      marginBottom: '6px',
      color: 'var(--on-surface-variant)',
      fontFamily: 'var(--font-body)',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: 'var(--radius)',
      border: 'none',
      backgroundColor: 'var(--surface-container-low)',
      fontSize: '15px',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      outline: 'none',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '14px 16px',
      borderRadius: 'var(--radius)',
      border: 'none',
      backgroundColor: 'var(--surface-container-low)',
      fontSize: '15px',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      resize: 'vertical',
      outline: 'none',
      boxSizing: 'border-box',
    },
    cancelBtn: {
      flex: 1,
      padding: '14px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      backgroundColor: 'var(--surface-container-high)',
      fontWeight: 600,
      fontSize: '15px',
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      cursor: 'pointer',
    },
    saveBtn: (disabled) => ({
      flex: 1,
      padding: '14px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--primary-gradient)',
      color: 'white',
      fontWeight: 600,
      fontSize: '15px',
      fontFamily: 'var(--font-body)',
      cursor: 'pointer',
      opacity: disabled ? 0.7 : 1,
    }),
    photoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
    },
    photoItem: {
      aspectRatio: '1',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      backgroundColor: 'var(--surface-container-high)',
    },
    topupChips: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginTop: '12px',
    },
    topupChip: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 700,
      fontFamily: 'var(--font-body)',
      color: 'var(--on-surface)',
      transition: 'all 0.2s',
    },
  };

  if (editing) {
    return (
      <div style={s.page}>
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--on-surface)' }}>arrow_back</span>
          </button>
          <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '24px', fontWeight: 800, color: 'var(--on-surface)', margin: 0 }}>Chinh sua ho so</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
          {/* Basic Info */}
          <div style={s.card}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '20px' }}>Thong tin co ban</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={s.inputLabel}>Ten</label>
                <input value={name} onChange={e => setName(e.target.value)} style={s.input} />
              </div>
              <div>
                <label style={s.inputLabel}>Tuoi</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} min={18} max={99} style={s.input} />
              </div>
              <div>
                <label style={s.inputLabel}>Gioi tinh</label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={{ ...s.input, backgroundColor: 'var(--surface-container-low)' }}>
                  <option value="">Chon</option>
                  <option value="male">Nam</option>
                  <option value="female">Nu</option>
                  <option value="other">Khac</option>
                </select>
              </div>
              <div>
                <label style={s.inputLabel}>Vi tri</label>
                <input value={location} onChange={e => setLocation(e.target.value)} style={s.input} />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div style={s.card}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '12px' }}>Gioi thieu ban than</h2>
            <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={300} placeholder="Viet vai dong ve ban than ban..." style={s.textarea} />
            <p style={{ textAlign: 'right', fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '4px', fontFamily: 'var(--font-body)' }}>{bio.length}/300</p>
          </div>

          {/* Interests */}
          <div style={s.card}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '12px' }}>
              So thich <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--on-surface-variant)' }}>({interests.length}/8)</span>
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {INTEREST_OPTIONS.map(interest => {
                const selected = interests.includes(interest);
                return (
                  <button key={interest} onClick={() => toggleInterest(interest)} style={s.chip(selected)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{selected ? 'close' : 'add'}</span>
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setEditing(false)} style={s.cancelBtn}>Huy</button>
            <button onClick={handleSave} disabled={saving} style={s.saveBtn(saving)}>
              {saving ? 'Dang luu...' : 'Luu thay doi'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Hero Section */}
      <div style={s.heroRow}>
        <div style={s.heroLeft}>
          {/* Avatar */}
          <div
            style={s.avatarWrap}
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            {getAvatarUrl() ? (
              <img
                src={getAvatarUrl()}
                alt="Avatar"
                style={s.avatar}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div style={s.avatarPlaceholder}>
                {currentUser?.name?.charAt(0) || '?'}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={s.cameraBtn}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>photo_camera</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
          </div>

          {/* Name + Badge */}
          <div style={s.nameRow}>
            <h1 style={s.nameText}>
              {currentUser?.name}{currentUser?.age ? `, ${currentUser.age}` : ''}
            </h1>
            <div style={s.verifiedBadge}>
              <span className="material-symbols-outlined filled" style={{ fontSize: '14px', color: 'var(--primary)' }}>verified</span>
              THANH VIEN XAC THUC
            </div>
            <p style={s.bioText}>
              {currentUser?.bio || 'Chua co gioi thieu. Nhan "Chinh sua" de them.'}
            </p>
            {currentUser?.location && (
              <p style={{ ...s.bioText, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                {currentUser.location}
              </p>
            )}
            <button onClick={() => setEditing(true)} style={s.editBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
              Chinh sua ho so
            </button>
          </div>
        </div>

        {/* Credits Balance Card */}
        <div style={s.creditsCard}>
          <p style={s.creditsLabel}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '4px' }}>account_balance_wallet</span>
            So du Credits
          </p>
          <p style={s.creditsAmount}>
            {walletBalance.toLocaleString('vi-VN')}d
          </p>
          <button
            style={s.topupBtn}
            onClick={() => handleTopup(100000)}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            Nap Credits
          </button>
          <div style={s.topupChips}>
            {[50000, 100000, 200000, 500000].map(amount => (
              <button
                key={amount}
                style={s.topupChip}
                onClick={() => handleTopup(amount)}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-container-high)'; e.currentTarget.style.color = 'var(--on-surface)'; }}
              >
                {amount >= 1000 ? `${amount / 1000}k` : amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Your Moments (Photo Grid) */}
      {currentUser?.images?.length > 0 && (
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Khoanh Khac Cua Ban</h2>
          <div style={s.photoGrid}>
            {currentUser.images.map((img, i) => (
              <div key={i} style={s.photoItem}>
                <img
                  src={typeof img === 'string' ? img : img.url}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dine Interests */}
      {interests.length > 0 && (
        <div style={s.section}>
          <h2 style={s.sectionTitle}>So Thich Hen Ho</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {interests.map((interest, i) => (
              <span key={i} style={s.chip(false)}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Lich Su Giao Dich</h2>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-full)', padding: '4px', width: 'fit-content' }}>
          {TRANSACTION_FILTERS.map(f => (
            <button
              key={f.key}
              style={s.filterTab(txFilter === f.key)}
              onClick={() => setTxFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={s.card}>
          {walletLoading ? (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--on-surface-variant)', textAlign: 'center', padding: '20px 0' }}>Dang tai...</p>
          ) : filteredTransactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--on-surface-variant)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--outline-variant)', display: 'block', marginBottom: '8px' }}>receipt_long</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>Chua co giao dich nao</p>
            </div>
          ) : (
            filteredTransactions.map((tx, idx) => {
              const txMeta = txIconMap[tx.type] || { icon: 'credit_card', color: 'var(--on-surface-variant)' };
              return (
                <React.Fragment key={tx.id}>
                  <div style={s.txItem}>
                    <div style={s.txIcon(txMeta.color)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: txMeta.color }}>{txMeta.icon}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--on-surface)', fontFamily: 'var(--font-body)' }}>
                        {tx.description || tx.type}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>
                        {new Date(tx.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-headline)',
                      color: tx.amount > 0 ? '#2e7d32' : 'var(--primary)',
                    }}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('vi-VN')}d
                    </div>
                  </div>
                  {idx < filteredTransactions.length - 1 && <hr style={s.txDivider} />}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>

      {/* Settings & Preferences */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Cai Dat & Tuy Chon</h2>
        <div style={s.settingsGrid}>
          <div
            style={s.settingsCard}
            onClick={() => setEditing(true)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--editorial-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
          >
            <div style={s.settingsIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--on-surface-variant)' }}>person</span>
            </div>
            <span style={s.settingsLabel}>Thong Tin Ca Nhan</span>
          </div>

          <div
            style={s.settingsCard}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--editorial-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
          >
            <div style={s.settingsIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--on-surface-variant)' }}>shield</span>
            </div>
            <span style={s.settingsLabel}>Bao Mat & Quyen Rieng Tu</span>
          </div>

          <div
            style={s.settingsCard}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--editorial-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
          >
            <div style={s.settingsIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--on-surface-variant)' }}>help</span>
            </div>
            <span style={s.settingsLabel}>Phan Hoi & Ho Tro</span>
          </div>

          <div
            style={{ ...s.settingsCard, cursor: 'pointer' }}
            onClick={handleLogout}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--editorial-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
          >
            <div style={s.settingsIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--primary)' }}>logout</span>
            </div>
            <span style={{ ...s.settingsLabel, color: 'var(--primary)' }}>Dang Xuat</span>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div style={{ ...s.section, marginBottom: 0 }}>
        <div style={{
          backgroundColor: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 700, color: 'var(--error)', margin: '0 0 4px' }}>Xoa Tai Khoan</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--on-surface-variant)', margin: 0 }}>
              Hanh dong nay se xoa vinh vien du lieu cua ban.
            </p>
          </div>
          <button
            style={s.dangerBtn}
            onClick={handleDeleteAccount}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--error)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--error)'; }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>delete_forever</span>
            Xoa tai khoan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
