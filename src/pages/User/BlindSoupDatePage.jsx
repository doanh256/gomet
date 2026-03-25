import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const soups = [
  { id: 'pho', name: 'Pho', origin: '🇻🇳', emoji: '🍜', desc: 'Nuoc dung trong, banh pho mem' },
  { id: 'bunbo', name: 'Bun Bo Hue', origin: '🇻🇳', emoji: '🌶️', desc: 'Cay nong, dam da huong vi Hue' },
  { id: 'lauthai', name: 'Lau Thai', origin: '🇹🇭', emoji: '🍲', desc: 'Chua cay, tom va nam' },
  { id: 'ramen', name: 'Ramen', origin: '🇯🇵', emoji: '🍥', desc: 'Nhat Ban chinh thong, nuoc dung ton kotsu' },
];

const steps = [
  { num: 1, icon: 'restaurant_menu', title: 'Chon mon', desc: 'Chon mon sup yeu thich' },
  { num: 2, icon: 'chat', title: 'Giao luu', desc: 'Tro chuyen an danh 30 phut' },
  { num: 3, icon: 'visibility', title: 'Tiet lo', desc: 'Quyet dinh lo dien hay khong' },
];

const chatMessages = [
  { from: 'other', text: 'Toi thich Pho nhat! Ban hay den Ha Noi thu pho Bat Dan nhe 😄' },
  { from: 'me', text: 'Toi cung vay! Toi thuong an pho vao buoi sang, con ban?' },
];

const BlindSoupDatePage = () => {
  const navigate = useNavigate();
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [isMatched, setIsMatched] = useState(true);

  const s = {
    page: {
      flex: 1,
      backgroundColor: '#131313',
      overflowY: 'auto',
      padding: '40px 24px 80px',
      maxWidth: 600,
      margin: '0 auto',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: '#E6BEB2',
      cursor: 'pointer',
      padding: 0,
      marginBottom: 16,
    },
    header: {
      textAlign: 'center',
      marginBottom: 32,
    },
    headerIcon: {
      fontSize: 48,
      color: '#FF571A',
      marginBottom: 8,
    },
    heading: {
      fontFamily: 'var(--font-headline)',
      fontSize: 28,
      fontWeight: 800,
      color: '#FDF9F3',
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 16,
    },
    stepsRow: {
      display: 'flex',
      gap: 12,
      marginBottom: 32,
    },
    stepCard: {
      flex: 1,
      textAlign: 'center',
      padding: '20px 8px',
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
    },
    stepNum: {
      width: 36,
      height: 36,
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3',
      fontFamily: 'var(--font-headline)',
      fontSize: 16,
      fontWeight: 800,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    stepIcon: {
      fontSize: 28,
      color: '#FFB59E',
      display: 'block',
      marginBottom: 8,
    },
    stepTitle: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 4,
    },
    stepDesc: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
      lineHeight: 1.4,
    },
    soupsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
    },
    soupCard: (active) => ({
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      padding: 16,
      cursor: 'pointer',
      textAlign: 'center',
      boxShadow: active ? '0 0 0 2.5px #FF571A' : 'none',
      transition: 'box-shadow 0.2s',
    }),
    soupEmoji: {
      width: '100%',
      height: 80,
      borderRadius: '1rem',
      background: 'linear-gradient(135deg, rgba(255,87,26,0.2), rgba(255,181,158,0.1))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 40,
      marginBottom: 10,
    },
    soupName: {
      fontFamily: 'var(--font-headline)',
      fontSize: 15,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 2,
    },
    soupOrigin: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
      marginBottom: 6,
    },
    soupSelect: (active) => ({
      display: 'inline-block',
      padding: '6px 16px',
      borderRadius: '9999px',
      backgroundColor: active ? '#FF571A' : '#2A2A2A',
      color: active ? '#FDF9F3' : '#E6BEB2',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
    }),
    waitingSection: {
      textAlign: 'center',
      padding: '32px 0',
      marginBottom: 32,
    },
    pulsingDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 16,
    },
    dot: (delay) => ({
      width: 12,
      height: 12,
      borderRadius: '9999px',
      backgroundColor: '#FF571A',
      animation: `pulse 1.4s ease-in-out ${delay}s infinite`,
    }),
    waitingText: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 700,
      color: '#FDF9F3',
      marginBottom: 8,
    },
    waitingCount: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
    },
    sessionCard: {
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      padding: 24,
      marginBottom: 24,
    },
    timerRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 20,
    },
    timer: {
      fontFamily: 'var(--font-headline)',
      fontSize: 36,
      fontWeight: 800,
      color: '#FF571A',
    },
    timerLabel: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: '#E6BEB2',
    },
    avatarsRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
      marginBottom: 20,
    },
    anonAvatar: {
      width: 56,
      height: 56,
      borderRadius: '9999px',
      backgroundColor: '#2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 800,
      color: '#FF571A',
      fontFamily: 'var(--font-headline)',
    },
    vsText: {
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      color: '#E6BEB2',
    },
    chatArea: {
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    chatBubble: (mine) => ({
      maxWidth: '80%',
      alignSelf: mine ? 'flex-end' : 'flex-start',
      padding: '12px 16px',
      borderRadius: '1.5rem',
      backgroundColor: mine ? '#FF571A' : '#2A2A2A',
      color: mine ? '#FDF9F3' : '#FDF9F3',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.5,
    }),
    sessionActions: {
      display: 'flex',
      gap: 12,
    },
    revealBtn: {
      flex: 1,
      padding: '14px',
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #FF571A, #FFB59E)',
      color: '#FDF9F3',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    leaveBtn: {
      flex: 1,
      padding: '14px',
      borderRadius: '9999px',
      backgroundColor: '#2A2A2A',
      color: '#E6BEB2',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
    },
    noteCard: {
      borderRadius: '1.5rem',
      backgroundColor: '#1C1B1B',
      padding: 20,
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
    },
    noteIcon: {
      fontSize: 28,
      color: '#FFB59E',
      flexShrink: 0,
    },
    noteText: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#E6BEB2',
      lineHeight: 1.6,
    },
    keyframe: `
      @keyframes pulse {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1); opacity: 1; }
      }
    `,
  };

  return (
    <div style={s.page}>
      <style>{s.keyframe}</style>

      <button style={s.backBtn} onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
      </button>

      <div style={s.header}>
        <span className="material-symbols-outlined" style={s.headerIcon}>visibility_off</span>
        <div style={s.heading}>Blind Soup Date</div>
        <div style={s.subtitle}>Hen ho an danh qua am thuc</div>
      </div>

      {/* How it works */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Cach thuc hoat dong</div>
        <div style={s.stepsRow}>
          {steps.map(step => (
            <div key={step.num} style={s.stepCard}>
              <div style={s.stepNum}>{step.num}</div>
              <span className="material-symbols-outlined" style={s.stepIcon}>{step.icon}</span>
              <div style={s.stepTitle}>{step.title}</div>
              <div style={s.stepDesc}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Soup selection */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Chon mon sup</div>
        <div style={s.soupsGrid}>
          {soups.map(soup => (
            <div
              key={soup.id}
              style={s.soupCard(selectedSoup === soup.id)}
              onClick={() => setSelectedSoup(soup.id)}
            >
              <div style={s.soupEmoji}>{soup.emoji}</div>
              <div style={s.soupName}>{soup.name} {soup.origin}</div>
              <div style={s.soupOrigin}>{soup.desc}</div>
              <div style={s.soupSelect(selectedSoup === soup.id)}>
                {selectedSoup === soup.id ? 'Da chon' : 'Chon'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waiting status */}
      {!isMatched && (
        <div style={s.waitingSection}>
          <div style={s.pulsingDots}>
            <div style={s.dot(0)} />
            <div style={s.dot(0.2)} />
            <div style={s.dot(0.4)} />
          </div>
          <div style={s.waitingText}>Dang tim doi...</div>
          <div style={s.waitingCount}>2 nguoi dang cho</div>
        </div>
      )}

      {/* Active session */}
      {isMatched && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Phien tro chuyen</div>
          <div style={s.sessionCard}>
            <div style={{ textAlign: 'center', marginBottom: 4 }}>
              <div style={s.timerLabel}>Thoi gian con lai</div>
            </div>
            <div style={s.timerRow}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#FF571A' }}>timer</span>
              <div style={s.timer}>29:45</div>
            </div>

            <div style={s.avatarsRow}>
              <div style={s.anonAvatar}>?</div>
              <div style={s.vsText}>VS</div>
              <div style={s.anonAvatar}>?</div>
            </div>

            <div style={s.chatArea}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={s.chatBubble(msg.from === 'me')}>{msg.text}</div>
              ))}
            </div>

            <div style={s.sessionActions}>
              <button style={s.revealBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                Tiet lo danh tinh
              </button>
              <button style={s.leaveBtn}>Roi di</button>
            </div>
          </div>
        </div>
      )}

      {/* Match Profile Card */}
      {isMatched && (
        <div style={{ marginBottom: 24 }}>
          <div style={s.sectionTitle}>Match Profile</div>
          <div style={{ borderRadius: '1.5rem', backgroundColor: '#1C1B1B', overflow: 'hidden', marginBottom: 16 }}>
            {/* Photo placeholder */}
            <div style={{ width: '100%', height: 180, background: 'linear-gradient(135deg, rgba(255,87,26,0.3), rgba(255,181,158,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 56, color: '#FFB59E', opacity: 0.4 }}>person</span>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800, color: '#FDF9F3', marginBottom: 4 }}>??? (An danh)</div>
              <div style={{ fontSize: 13, color: '#E6BEB2', marginBottom: 16 }}>Se duoc tiet lo sau khi ket thuc tro chuyen</div>

              {/* Kinetic Connection */}
              <div style={{ padding: '16px', borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(255,87,26,0.12), rgba(255,181,158,0.06))', border: '1px solid rgba(255,87,26,0.2)' }}>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 700, color: '#FFD54F', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#FFD54F' }}>bolt</span>
                  Kinetic Connection
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { label: 'Taste Match', value: '87%' },
                    { label: 'Vibe Score', value: '72%' },
                    { label: 'Region Sync', value: '5/8' },
                  ].map(stat => (
                    <div key={stat.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 800, color: '#FF571A' }}>{stat.value}</div>
                      <div style={{ fontSize: 10, color: '#E6BEB2' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note */}
      <div style={s.noteCard}>
        <span className="material-symbols-outlined" style={s.noteIcon}>shield</span>
        <div style={s.noteText}>
          Danh tinh cua ban duoc bao mat tuyet doi cho den khi ban quyet dinh tiet lo. Moi cuoc tro chuyen deu duoc giam sat de dam bao an toan.
        </div>
      </div>
    </div>
  );
};

export default BlindSoupDatePage;
