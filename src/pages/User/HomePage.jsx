import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import PremiumModal from '../../components/User/PremiumModal';
import ProfileDetailModal from '../../components/User/ProfileDetailModal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAppContext();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [recommendedMatches, setRecommendedMatches] = useState([]);
  const [upcomingDates, setUpcomingDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/users/profiles?limit=4').then(data => {
      if (data?.profiles) setRecommendedMatches(data.profiles);
    }).catch(console.error);

    api.get('/date-posts?status=open&limit=6').then(data => {
      if (data?.posts) setUpcomingDates(data.posts);
    }).catch(console.error);
  }, []);

  const getAvatarUrl = (user) => {
    if (!user) return '';
    return user.avatar || user.images?.[0]?.url || user.images?.[0] || '';
  };

  const dotColors = ['#ae2f34', '#ff6b6b', '#894e45', '#5f5e5e'];

  const styles = {
    page: {
      flex: 1,
      backgroundColor: 'var(--surface)',
      overflowY: 'auto',
      padding: '40px 32px 60px',
    },
    greeting: {
      marginBottom: '48px',
    },
    greetingName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '32px',
      fontWeight: 800,
      color: 'var(--on-surface)',
      margin: 0,
      lineHeight: 1.3,
    },
    greetingSub: {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      color: 'var(--on-surface-variant)',
      marginTop: '8px',
      fontWeight: 400,
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '20px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: 0,
    },
    sectionLink: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--primary)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    section: {
      marginBottom: '48px',
    },
    horizontalScroll: {
      display: 'flex',
      gap: '16px',
      overflowX: 'auto',
      paddingBottom: '8px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    dateCard: {
      minWidth: '280px',
      backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      cursor: 'pointer',
      flexShrink: 0,
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    dateCardTop: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
    dateTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: '15px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      lineHeight: 1.4,
      flex: 1,
      marginRight: '12px',
    },
    datePrice: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 700,
      color: 'var(--primary)',
      whiteSpace: 'nowrap',
    },
    dateVenue: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--on-surface-variant)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      marginBottom: '14px',
    },
    dateMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    avatarDots: {
      display: 'flex',
      alignItems: 'center',
    },
    avatarDot: (color, i) => ({
      width: '28px',
      height: '28px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: color,
      border: '2px solid var(--surface-container-lowest)',
      marginLeft: i > 0 ? '-8px' : '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      color: 'white',
      fontWeight: 600,
    }),
    dateStatus: {
      fontSize: '12px',
      fontWeight: 600,
      color: 'var(--on-surface-variant)',
      backgroundColor: 'var(--surface-container-high)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
    },
    matchCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      minWidth: '100px',
      flexShrink: 0,
    },
    matchAvatar: {
      width: '72px',
      height: '72px',
      borderRadius: 'var(--radius-full)',
      objectFit: 'cover',
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.2s ease',
    },
    matchName: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--on-surface)',
      textAlign: 'center',
    },
    matchAge: {
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      fontWeight: 400,
    },
    venueCard: {
      minWidth: '220px',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      cursor: 'pointer',
      flexShrink: 0,
      backgroundColor: 'var(--surface-container-lowest)',
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.2s ease',
    },
    venueImg: {
      width: '100%',
      height: '140px',
      objectFit: 'cover',
      display: 'block',
      backgroundColor: 'var(--surface-container-high)',
    },
    venueInfo: {
      padding: '14px 16px',
    },
    venueName: {
      fontFamily: 'var(--font-headline)',
      fontSize: '14px',
      fontWeight: 700,
      color: 'var(--on-surface)',
      margin: 0,
    },
    venueLocation: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginTop: '4px',
    },
    activityItem: {
      display: 'flex',
      gap: '14px',
      padding: '16px 0',
    },
    activityDivider: {
      borderBottom: 'none',
      backgroundColor: 'var(--surface-container-high)',
      height: '1px',
      border: 'none',
    },
    activityAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--surface-container-high)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
    },
    activityText: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: 'var(--on-surface)',
      lineHeight: 1.5,
    },
    activityTime: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      color: 'var(--on-surface-variant)',
      marginTop: '2px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: 'var(--on-surface-variant)',
    },
    emptyIcon: {
      fontSize: '48px',
      color: 'var(--outline-variant)',
      marginBottom: '12px',
    },
  };

  const trendingVenues = [
    { id: 1, name: 'The Coffee House', location: 'Quận 1, TP.HCM', img: '' },
    { id: 2, name: 'Maison Marou', location: 'Quận 3, TP.HCM', img: '' },
    { id: 3, name: 'L\'Usine', location: 'Quận 1, TP.HCM', img: '' },
  ];

  return (
    <div style={styles.page}>
      {/* Greeting */}
      <div style={styles.greeting}>
        <h1 style={styles.greetingName}>
          Xin chao, {currentUser?.name || 'ban'}.
        </h1>
        <p style={styles.greetingSub}>
          Ban co {upcomingDates.length} keo hen ho sap toi trong tuan nay.
        </p>
      </div>

      {/* Upcoming Dates */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Keo Sap Toi</h2>
          <button style={styles.sectionLink} onClick={() => navigate('/app/dates/all')}>
            Xem tat ca
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        </div>

        {upcomingDates.length === 0 ? (
          <div style={styles.emptyState}>
            <span className="material-symbols-outlined" style={styles.emptyIcon}>calendar_month</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>Chua co keo nao. Hay kham pha ngay!</p>
          </div>
        ) : (
          <div style={styles.horizontalScroll}>
            {upcomingDates.map((post, idx) => (
              <div
                key={post.id}
                style={styles.dateCard}
                onClick={() => navigate(`/app/dates/${post.category}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--editorial-shadow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              >
                <div style={styles.dateCardTop}>
                  <span style={styles.dateTitle}>{post.title}</span>
                  {post.price > 0 && (
                    <span style={styles.datePrice}>{post.price.toLocaleString('vi-VN')}d</span>
                  )}
                </div>

                <div style={styles.dateVenue}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                  {post.place || post.author?.location || 'Dia diem chua xac dinh'}
                </div>

                <div style={styles.dateMeta}>
                  <div style={styles.avatarDots}>
                    {dotColors.slice(0, Math.min(3, idx + 2)).map((color, i) => (
                      <div key={i} style={styles.avatarDot(color, i)}>
                        {post.author?.name?.charAt(0) || '?'}
                      </div>
                    ))}
                  </div>
                  <span style={styles.dateStatus}>
                    {post.icon || ''} {post.status === 'open' ? 'Dang mo' : 'Sap dien ra'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Matches */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Goi Y Cho Ban</h2>
          <button style={styles.sectionLink} onClick={() => navigate('/app/explore')}>
            Kham pha
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        </div>

        {recommendedMatches.length === 0 ? (
          <div style={styles.emptyState}>
            <span className="material-symbols-outlined" style={styles.emptyIcon}>favorite</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>Dang tim kiem nhung ho so phu hop...</p>
          </div>
        ) : (
          <div style={styles.horizontalScroll}>
            {recommendedMatches.map((profile) => (
              <div
                key={profile.id}
                style={styles.matchCard}
                onClick={() => setSelectedProfile(profile)}
              >
                {getAvatarUrl(profile) ? (
                  <img
                    src={getAvatarUrl(profile)}
                    alt={profile.name}
                    style={styles.matchAvatar}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={{
                    ...styles.matchAvatar,
                    background: 'var(--primary-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'var(--font-headline)',
                    fontSize: '24px',
                    fontWeight: 700,
                  }}>
                    {profile.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <div style={styles.matchName}>{profile.name}</div>
                  {profile.age && <div style={styles.matchAge}>{profile.age} tuoi</div>}
                </div>
              </div>
            ))}

            {/* Say Hi CTA */}
            <div
              style={{
                ...styles.matchCard,
                justifyContent: 'center',
              }}
              onClick={() => setIsPremiumModalOpen(true)}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'white' }}>
                  waving_hand
                </span>
              </div>
              <div style={styles.matchName}>Say Hi</div>
            </div>
          </div>
        )}
      </div>

      {/* Trending Venues */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Dia Diem Thinh Hanh</h2>
        </div>
        <div style={styles.horizontalScroll}>
          {trendingVenues.map((venue) => (
            <div
              key={venue.id}
              style={styles.venueCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.venueImg}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--primary-gradient)',
                  opacity: 0.15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: '40px',
                    color: 'var(--primary)',
                    opacity: 1,
                  }}>restaurant</span>
                </div>
              </div>
              <div style={styles.venueInfo}>
                <p style={styles.venueName}>{venue.name}</p>
                <p style={styles.venueLocation}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>location_on</span>
                  {' '}{venue.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Hoat Dong Gan Day</h2>
        </div>
        <div style={{
          backgroundColor: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius)',
          padding: '8px 20px',
          boxShadow: 'var(--card-shadow)',
        }}>
          {upcomingDates.length === 0 && recommendedMatches.length === 0 ? (
            <div style={{ ...styles.emptyState, padding: '24px 0' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>Chua co hoat dong nao.</p>
            </div>
          ) : (
            <>
              {upcomingDates.slice(0, 3).map((post, idx) => (
                <React.Fragment key={post.id}>
                  <div style={styles.activityItem}>
                    <div style={styles.activityAvatar}>
                      {getAvatarUrl(post.author) ? (
                        <img
                          src={getAvatarUrl(post.author)}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)' }}>person</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={styles.activityText}>
                        <strong>{post.author?.name || 'Ai do'}</strong> vua tao keo "{post.title}"
                      </p>
                      <p style={styles.activityTime}>
                        {post.place || 'Gan day'}
                      </p>
                    </div>
                  </div>
                  {idx < Math.min(upcomingDates.length, 3) - 1 && <hr style={styles.activityDivider} />}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
