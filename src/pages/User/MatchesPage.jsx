import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, MapPin } from 'lucide-react';
import { api } from '../../api/client';

const MatchesPage = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await api.get('/users/matches');
        setMatches(data.matches || data || []);
      } catch (err) {
        console.error('Failed to fetch matches:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const getAvatarUrl = (user) => {
    return user.avatar || user.images?.[0]?.url || user.images?.[0] || '';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Heart size={32} color="#fd5068" style={{ animation: 'pulse 1s infinite' }} />
          <p style={{ color: '#505965', marginTop: '12px', fontSize: '14px' }}>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>
          Matches của bạn
        </h1>
        <div style={{ width: '24px' }} />
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
        {matches.length === 0 ? (
          /* Empty state */
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fef0f2, #ffe0e3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Heart size={36} color="#fd5068" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111418', marginBottom: '8px' }}>
              Chưa có match nào
            </h2>
            <p style={{ fontSize: '14px', color: '#505965', lineHeight: '1.6', marginBottom: '24px' }}>
              Hãy quẹt kèo ngay để tìm kiếm người phù hợp!
            </p>
            <button
              onClick={() => navigate('/app/swipe')}
              style={{
                background: 'linear-gradient(260deg, #fd5068 0%, #ff7854 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(253,80,104,0.3)',
              }}
            >
              Quẹt ngay
            </button>
          </div>
        ) : (
          /* Matches grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {matches.map((match) => (
              <div
                key={match._id || match.id}
                onClick={() => navigate(`/app/chat/${match._id || match.id}`)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Avatar */}
                <div style={{ width: '100%', aspectRatio: '3/4', backgroundColor: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
                  {getAvatarUrl(match) ? (
                    <img
                      src={getAvatarUrl(match)}
                      alt={match.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #fd5068, #ff7854)';
                        e.target.parentElement.style.display = 'flex';
                        e.target.parentElement.style.alignItems = 'center';
                        e.target.parentElement.style.justifyContent = 'center';
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #fd5068, #ff7854)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '32px',
                      fontWeight: 700,
                    }}>
                      {match.name?.charAt(0) || '?'}
                    </div>
                  )}

                  {/* Chat icon overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(253,80,104,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MessageCircle size={18} color="white" />
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 14px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111418', margin: '0 0 2px 0' }}>
                    {match.name}{match.age ? `, ${match.age}` : ''}
                  </h3>
                  {match.location && (
                    <p style={{ fontSize: '12px', color: '#505965', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {match.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
