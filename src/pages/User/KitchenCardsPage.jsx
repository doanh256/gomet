import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cardTemplates = [
  {
    id: 'street-food', name: 'Street Food Crawl',
    description: 'Perfect for adventurous eaters who love exploring hidden gems and local favorites.',
    gradient: 'linear-gradient(135deg, #FF571A 0%, #FFB59E 100%)', emoji: '🍜',
    tags: ['Casual', 'Adventure', 'Local'],
  },
  {
    id: 'chefs-table', name: "Chef's Table",
    description: 'An intimate fine dining experience with curated courses and wine pairings.',
    gradient: 'linear-gradient(135deg, #1C1B1B 0%, #393834 100%)', emoji: '👨‍🍳',
    tags: ['Fine Dining', 'Intimate', 'Premium'],
  },
  {
    id: 'sunday-sourcing', name: 'Sunday Sourcing',
    description: 'A relaxed morning at the market picking fresh ingredients together.',
    gradient: 'linear-gradient(135deg, #117500 0%, #4CAF50 100%)', emoji: '🌿',
    tags: ['Relaxed', 'Market', 'Fresh'],
  },
  {
    id: 'spice-level-5', name: 'Spice Level 5',
    description: 'For the brave. A fiery culinary challenge that will test your heat tolerance.',
    gradient: 'linear-gradient(135deg, #B71C1C 0%, #FF571A 100%)', emoji: '🌶️',
    tags: ['Spicy', 'Challenge', 'Bold'],
  },
];

const savedCards = [
  { id: 1, name: 'Date Night at Noir', template: 'chefs-table', date: '28/03', partner: 'Minh Anh' },
  { id: 2, name: 'Pho Crawl with Squad', template: 'street-food', date: '02/04', partner: 'Foodie Team' },
];

const KitchenCardsPage = () => {
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState('classic');
  const [recipient, setRecipient] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      flex: 1, backgroundColor: '#FDF9F3', overflowY: 'auto',
      fontFamily: "'Inter', sans-serif", minHeight: '100vh',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 100px' }}>
        {/* Back button */}
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', color: '#393834', cursor: 'pointer',
          padding: 0, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>Back</span>
        </button>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 800,
            color: '#393834', margin: '0 0 8px',
          }}>
            Select Your Kitchen Card
          </h1>
          <p style={{ fontSize: 16, color: '#666460', margin: 0, lineHeight: 1.6 }}>
            Choose a themed card to send your next dinner invitation. Make it memorable.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 32 }}>
          {/* Main grid */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
            }}>
              {cardTemplates.map(card => (
                <div key={card.id} style={{
                  backgroundColor: '#ffffff', borderRadius: '1.5rem', overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  transform: hoveredCard === card.id ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredCard === card.id
                    ? '0 20px 40px rgba(0,0,0,0.12)'
                    : '0 4px 16px rgba(0,0,0,0.06)',
                }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card preview */}
                  <div style={{
                    height: 200, background: card.gradient, position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <span style={{ fontSize: 72, opacity: 0.25, userSelect: 'none' }}>{card.emoji}</span>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '50%', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))',
                    }} />
                    <h3 style={{
                      position: 'absolute', bottom: 16, left: 20,
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20,
                      fontWeight: 800, color: '#FDF9F3', margin: 0,
                    }}>
                      {card.name}
                    </h3>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '20px' }}>
                    <p style={{
                      fontSize: 14, color: '#666460', lineHeight: 1.6, margin: '0 0 16px',
                      minHeight: 44,
                    }}>
                      {card.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                      {card.tags.map(tag => (
                        <span key={tag} style={{
                          padding: '4px 12px', borderRadius: 9999,
                          backgroundColor: 'rgba(255,87,26,0.08)', color: '#FF571A',
                          fontSize: 12, fontWeight: 600,
                        }}>{tag}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button style={{
                        flex: 1, padding: '12px 16px', borderRadius: 9999, border: 'none',
                        background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                        color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 14, fontWeight: 700, cursor: 'pointer',
                      }}>
                        Use This Card
                      </button>
                      <button style={{
                        padding: '12px 16px', borderRadius: 9999, border: 'none',
                        backgroundColor: 'rgba(57,56,52,0.08)', color: '#393834',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      }}>
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Custom */}
            <div style={{
              marginTop: 32, backgroundColor: '#ffffff', borderRadius: '1.5rem',
              padding: 32, display: 'flex', alignItems: 'center', gap: 24,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '1.5rem',
                background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#3A0B00' }}>add</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700,
                  color: '#393834', margin: '0 0 4px',
                }}>Create Custom Card</h3>
                <p style={{ fontSize: 14, color: '#666460', margin: 0 }}>
                  Design your own unique kitchen card from scratch
                </p>
              </div>
              <button style={{
                padding: '12px 28px', borderRadius: 9999, border: 'none',
                background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                color: '#3A0B00', fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>
                Create
              </button>
            </div>
          </div>

          {/* Sidebar - Your Collection */}
          <div style={{ width: 280, flexShrink: 0 }}>
            <div style={{
              backgroundColor: '#ffffff', borderRadius: '1.5rem', padding: 24,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)', position: 'sticky', top: 24,
            }}>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700,
                color: '#393834', margin: '0 0 20px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#FF571A' }}>folder_special</span>
                Your Collection
              </h3>

              {savedCards.map(card => (
                <div key={card.id} style={{
                  padding: '14px 0', display: 'flex', alignItems: 'center', gap: 12,
                  borderBottom: 'none',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '1rem', flexShrink: 0,
                    background: cardTemplates.find(t => t.id === card.template)?.gradient || 'linear-gradient(135deg, #FFB59E, #FF571A)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#FDF9F3' }}>card_giftcard</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700,
                      color: '#393834', margin: '0 0 2px',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{card.name}</p>
                    <p style={{ fontSize: 12, color: '#666460', margin: 0 }}>
                      {card.partner} &middot; {card.date}
                    </p>
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: 20, padding: '16px', borderRadius: '1.5rem',
                backgroundColor: 'rgba(255,87,26,0.06)', textAlign: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#FF571A', marginBottom: 8, display: 'block' }}>
                  collections_bookmark
                </span>
                <p style={{ fontSize: 13, color: '#666460', margin: '0 0 4px' }}>
                  {savedCards.length} cards saved
                </p>
                <p style={{ fontSize: 12, color: '#b83500', fontWeight: 600, margin: 0, cursor: 'pointer' }}>
                  View all
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenCardsPage;
