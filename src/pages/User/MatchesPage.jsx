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
      <div style={{ minHeight: '100vh', backgroundColor: '#131313', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Heart size={32} color="#FFB59E" style={{ animation: 'pulse 1s infinite' }} />
          <p style={{ color: '#E6BEB2', marginTop: '12px', fontSize: '14px' }}>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#131313' }}>
      {/* Header */}
      <div style={{
        background: 'rgba(57,57,57,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#E6BEB2', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#FDF9F3' }}>
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
              background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Heart size={36} color="#3A0B00" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FDF9F3', marginBottom: '8px' }}>
              Chưa có match nào
            </h2>
            <p style={{ fontSize: '14px', color: '#E6BEB2', lineHeight: '1.6', marginBottom: '24px' }}>
              Hãy quẹt kèo ngay để tìm kiếm người phù hợp!
            </p>
            <button
              onClick={() => navigate('/app/swipe')}
              style={{
                background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                color: '#3A0B00',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
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
                  backgroundColor: '#1C1B1B',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Avatar */}
                <div style={{ width: '100%', aspectRatio: '3/4', backgroundColor: '#2A2A2A', position: 'relative', overflow: 'hidden' }}>
                  {getAvatarUrl(match) ? (
                    <img
                      src={getAvatarUrl(match)}
                      alt={match.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #FFB59E, #FF571A)';
                        e.target.parentElement.style.display = 'flex';
                        e.target.parentElement.style.alignItems = 'center';
                        e.target.parentElement.style.justifyContent = 'center';
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3A0B00',
                      fontSize: '32px',
                      fontWeight: 700,
                    }}>
                      {match.name?.charAt(0) || '?'}
                    </div>
                  )}

                  {/* Match % badge */}
                  {match.matchPercent && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                      color: '#3A0B00',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                    }}>
                      {match.matchPercent}%
                    </div>
                  )}

                  {/* Tier badge */}
                  {match.tier && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: '#FFD54F',
                      color: '#3A0B00',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                    }}>
                      {match.tier}
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
                    background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
                  }}>
                    <MessageCircle size={18} color="#3A0B00" />
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 14px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#FDF9F3', margin: '0 0 2px 0' }}>
                    {match.name}{match.age ? `, ${match.age}` : ''}
                  </h3>
                  {match.location && (
                    <p style={{ fontSize: '12px', color: '#E6BEB2', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
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
