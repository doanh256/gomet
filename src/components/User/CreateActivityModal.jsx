import React, { useState } from 'react';
import { X, CalendarHeart } from 'lucide-react';
import { useToast } from '../ToastNotification';
import { api } from '../../api/client';

const CreateActivityModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('☕');
  const [category, setCategory] = useState('tim_ban');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast('Vui lòng nhập nội dung kèo đi chơi!', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/date-posts', {
        title: `${icon} ${title}`,
        icon,
        category,
        time: time || undefined,
        place: place || undefined,
        price: category === 'tra_phi' ? parseInt(price) || 0 : undefined,
      });
      addToast(`Kèo "${icon} ${title}" đã được đăng thành công!`, 'success');
      setTitle('');
      setTime('');
      setPlace('');
      setPrice('');
      onClose();
    } catch (err) {
      addToast(err.message || 'Đăng kèo thất bại', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '440px', width: '90%', padding: '24px', backgroundColor: '#fff', borderRadius: '24px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarHeart size={24} color="#fd5068" />
            <h2 style={{ margin: 0, fontSize: '20px', color: '#111418' }}>Lên Kèo Đi Chơi</h2>
          </div>
          <X size={24} color="#656e7b" cursor="pointer" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Category Select */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '8px' }}>Loại kèo</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { key: 'tim_yeu', label: 'Tìm Yêu', color: '#fd5068' },
                { key: 'tim_ban', label: 'Tìm Bạn', color: '#4ecdc4' },
                { key: 'tra_phi', label: 'Trả Phí', color: '#fec142' },
              ].map(cat => (
                <button
                  key={cat.key} type="button"
                  onClick={() => setCategory(cat.key)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                    fontWeight: 600, fontSize: '13px',
                    background: category === cat.key ? cat.color : '#f0f2f5',
                    color: category === cat.key ? 'white' : '#505965',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '8px' }}>Nội dung kèo *</label>
            <input
              type="text" maxLength={100}
              placeholder="Ví dụ: Đi xem Dune 2 tối T7 này"
              value={title} onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '15px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Time & Place */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '8px' }}>Thời gian</label>
              <input value={time} onChange={e => setTime(e.target.value)} placeholder="Tối nay 20:00" style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '8px' }}>Địa điểm</label>
              <input value={place} onChange={e => setPlace(e.target.value)} placeholder="Cafe 123, Q1" style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Price (only for tra_phi) */}
          {category === 'tra_phi' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '8px' }}>Chi phí (VND) *</label>
              <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="200000" style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e1e4e8', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          )}

          {/* Icon picker */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111418', marginBottom: '8px' }}>Chọn Icon</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['☕', '🎬', '🍽️', '🎮', '🎵', '🏃', '🍸', '🐶', '💍', '📸', '💼', '🎤'].map(emoji => (
                <div
                  key={emoji}
                  onClick={() => setIcon(emoji)}
                  style={{
                    fontSize: '24px', padding: '8px', cursor: 'pointer',
                    backgroundColor: icon === emoji ? '#fef0f2' : '#f5f7f9',
                    border: icon === emoji ? '2px solid #fd5068' : '2px solid transparent',
                    borderRadius: '12px', transition: 'all 0.2s'
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit" disabled={isSubmitting}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)',
              color: 'white', border: 'none', borderRadius: '24px',
              fontSize: '16px', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(253, 80, 104, 0.3)',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Đang đăng...' : 'Đăng Kèo Ngay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateActivityModal;
