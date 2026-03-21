import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastNotification';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import { Camera, MapPin, Edit3, Plus, X, Wallet } from 'lucide-react';

const INTEREST_OPTIONS = ['Công nghệ', 'Nấu ăn', 'Coffee', 'Du lịch', 'Thể thao', 'Âm nhạc', 'Phim ảnh', 'Đọc sách', 'Gaming', 'Nhiếp ảnh', 'Yoga', 'Thú cưng', 'Ăn uống', 'Thời trang', 'Nghệ thuật'];

const ProfilePage = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAppContext();
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
      addToast('Đã cập nhật ảnh đại diện!', 'success');
    } catch (err) {
      addToast('Upload thất bại', 'error');
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
      addToast('Đã lưu hồ sơ!', 'success');
    } catch (err) {
      addToast(err.message || 'Lưu thất bại', 'error');
    } finally {
      setSaving(false);
    }
  };

  const genderLabel = { male: 'Nam', female: 'Nữ', other: 'Khác' };

  return (
    <div style={{ flex: 1, backgroundColor: '#f0f2f5', overflowY: 'auto' }}>
      {/* Header banner */}
      <div style={{ height: '200px', background: 'linear-gradient(135deg, #fd5068 0%, #ff7854 100%)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-50px', left: '32px', display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '110px', height: '110px', borderRadius: '50%', border: '4px solid white', overflow: 'hidden', backgroundColor: '#ddd', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              <img src={getAvatarUrl()} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg,#fd5068,#ff7854)'; }} />
            </div>
            <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ position: 'absolute', bottom: '0', right: '0', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#fd5068', border: '3px solid white', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={14} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
          </div>
          <div style={{ paddingBottom: '8px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{currentUser?.name}{currentUser?.age ? `, ${currentUser.age}` : ''}</h1>
            {currentUser?.location && <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {currentUser.location}</p>}
          </div>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Edit3 size={14} /> Chỉnh sửa
          </button>
        )}
      </div>

      <div style={{ padding: '68px 32px 32px', maxWidth: '700px' }}>
        {editing ? (
          /* Edit Mode */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Thông tin cơ bản</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#505965' }}>Tên</label>
                  <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#505965' }}>Tuổi</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} min={18} max={99} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#505965' }}>Giới tính</label>
                  <select value={gender} onChange={e => setGender(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'white' }}>
                    <option value="">Chọn</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#505965' }}>Vị trí</label>
                  <input value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Giới thiệu bản thân</h2>
              <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={300} placeholder="Viết vài dòng về bản thân bạn..." style={{ width: '100%', minHeight: '100px', padding: '14px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
              <p style={{ textAlign: 'right', fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{bio.length}/300</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Sở thích <span style={{ fontSize: '13px', fontWeight: 400, color: '#aaa' }}>({interests.length}/8)</span></h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {INTEREST_OPTIONS.map(interest => {
                  const selected = interests.includes(interest);
                  return (
                    <button key={interest} onClick={() => toggleInterest(interest)} style={{ padding: '8px 16px', borderRadius: '20px', border: selected ? '2px solid #fd5068' : '2px solid #e5e7eb', backgroundColor: selected ? '#fef0f2' : 'white', color: selected ? '#fd5068' : '#505965', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {selected ? <X size={12} /> : <Plus size={12} />} {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setEditing(false)} style={{ flex: 1, padding: '14px', borderRadius: '30px', border: '2px solid #e5e7eb', backgroundColor: 'white', fontWeight: 600, fontSize: '15px', cursor: 'pointer' }}>Hủy</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '14px', borderRadius: '30px', border: 'none', background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)', color: 'white', fontWeight: 600, fontSize: '15px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Giới thiệu</h2>
              <p style={{ fontSize: '15px', color: '#505965', lineHeight: 1.6, margin: 0 }}>{currentUser?.bio || 'Chưa có giới thiệu. Nhấn "Chỉnh sửa" để thêm.'}</p>
              {currentUser?.gender && (
                <p style={{ fontSize: '14px', color: '#505965', marginTop: '12px', display: 'flex', gap: '16px' }}>
                  <span>Giới tính: <strong>{genderLabel[currentUser.gender] || currentUser.gender}</strong></span>
                  {currentUser?.age && <span>Tuổi: <strong>{currentUser.age}</strong></span>}
                </p>
              )}
            </div>

            {interests.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Sở thích</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {interests.map((interest, i) => (
                    <span key={i} style={{ background: '#fef0f2', color: '#fd5068', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>{interest}</span>
                  ))}
                </div>
              </div>
            )}

            <div onClick={() => navigate('/app/wallet')} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}><Wallet size={20} color="#fd5068" /> Ví Gomet</h2>
                <p style={{ fontSize: '13px', color: '#656e7b', margin: 0 }}>Dùng để thanh toán các kèo Trả Phí</p>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 800, color: '#111418', margin: 0 }}>{(currentUser?.walletBalance || 0).toLocaleString('vi-VN')}đ</p>
            </div>

            {/* User Images Gallery */}
            {currentUser?.images?.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Ảnh của bạn</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {currentUser.images.map((img, i) => (
                    <div key={i} style={{ aspectRatio: '1', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                      <img src={typeof img === 'string' ? img : img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
