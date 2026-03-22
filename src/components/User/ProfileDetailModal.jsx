import React from 'react';
import { X, MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';

const ProfileDetailModal = ({ isOpen, onClose, profile }) => {
  if (!isOpen || !profile) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 99999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      overflowY: 'auto',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '450px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.3s ease-out',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Nút đóng */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(0,0,0,0.5)', border: 'none',
            color: 'white', padding: '8px', borderRadius: '50%',
            cursor: 'pointer', zIndex: 10, display: 'flex',
            backdropFilter: 'blur(4px)'
          }}
        >
          <X size={20} />
        </button>

        {/* Ảnh bìa */}
        <div style={{ height: '400px', width: '100%', position: 'relative' }}>
           <img 
             src={profile.images?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800'} 
             alt={profile.name} 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
           />
           <div style={{
             position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px',
             background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
           }}></div>
           
           <div style={{ position: 'absolute', bottom: '20px', left: '24px', color: 'white' }}>
             <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 4px 0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
               {profile.name} <span style={{ fontWeight: 400, fontSize: '28px' }}>{profile.age}</span>
             </h1>
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', opacity: 0.9 }}>
               <MapPin size={16} /> Cách bạn 5 km
             </div>
           </div>
        </div>

        {/* Nội dung chi tiết */}
        <div style={{ padding: '24px', flex: 1, backgroundColor: 'white', color: '#333' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', color: '#666', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Briefcase size={18} /> Đang làm việc tại Tech Corp</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><GraduationCap size={18} /> Tốt nghiệp Đại học Gomet</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={18} /> Sống tại {profile.location}</div>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: '#eee', marginBottom: '24px' }}></div>

          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>Giới thiệu</h3>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#444', margin: '0 0 24px 0' }}>
            {profile.bio || "Người này chưa cập nhật tiểu sử."}
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>Sở thích</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {(Array.isArray(profile.interests) ? profile.interests : (typeof profile.interests === 'string' ? (() => { try { return JSON.parse(profile.interests); } catch { return []; } })() : ['Cafe', 'Du lịch'])).map((interest, idx) => (
              <span key={idx} style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '14px', color: '#555', fontWeight: 500 }}>
                {interest}
              </span>
            ))}
          </div>

          <button onClick={onClose} style={{
            width: '100%', padding: '16px', borderRadius: '30px',
            background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)', color: 'white',
            border: 'none', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(253,80,104,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
          }}>
            <Heart size={20} fill="white" /> Thích {profile.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailModal;
