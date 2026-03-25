import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import { api } from '../../api/client';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    api.get('/date-posts?status=open&limit=12').then(data => {
      if (data?.posts) setPosts(data.posts);
    }).catch(console.error);
    api.get('/users/profiles?limit=10').then(data => {
      if (data?.profiles) setProfiles(data.profiles);
    }).catch(console.error);
    api.get('/venues?limit=10').then(data => {
      if (data?.venues) setVenues(data.venues);
      else if (Array.isArray(data)) setVenues(data);
    }).catch(console.error);
    api.get('/events?limit=6').then(data => {
      if (data?.events) setEvents(data.events);
      else if (Array.isArray(data)) setEvents(data);
    }).catch(console.error);
  }, []);

  const getAvatarUrl = (user) => {
    if (!user) return '';
    return user.avatar || user.images?.[0]?.url || user.images?.[0] || '';
  };
  const getPostImage = (post) => post.image || post.images?.[0]?.url || post.images?.[0] || '';

  const userName = currentUser?.name || currentUser?.displayName || 'Chef';

  const scrollbarHide = `
    .gomet-noscroll::-webkit-scrollbar { display: none; }
    .gomet-noscroll { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  // ── Fallback data ──
  const fallbackMatches = [
    { id: 'm1', name: 'Sarah K.', role: 'Molecular Specialist', match: 94, vang: '+80', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOdzOZJiI_t3EU4mDR588xITGt3GtPU2mKxsy5Tc7gQk5JuKowfSXr1CWi3iH2vebTXfWg5ze3uL2VkJ9Gh_7kgXUVGCWDCDGKPV5RE--Lz1oFJwZ69mhz4rpJR9v_K4hrKvMzljjR0Kpgc1XUPOlpYMxvznxKtqc98RGtjs8NczeC7LRa7819mgi6hbglFMBDh5QQR9tlrsTWRa-AFx-ZBivbyGIyfrfg5TIE2vGJawRHoc6XiHXrBZihLrL1_jtsUzafLDdfREE' },
    { id: 'm2', name: 'Marcus Chen', role: 'Street Food Archivist', match: 88, vang: '+120', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs6P98EQIcgXvMDRsb9ZEVMgHEEodAsv4sz2alzVgQ7bOGPgvMDRJDJcToSkxVUyXir7N8HSq1q0TFUHX54Q3Apu3JwlZSATWqbHPqESjwGRIjvAfAz6N3SUvgIqFkyel6mGLUDMTki3b_vzW9jZYZUWOr_CW7X87vMLJweXTJSzLtc4OjDqiTp0EvrMBUZ7UOsJOEoUpINmURJfGpy1WJNxwGYuJE2k-5teaIONZgfSu6J9fwBV6dN6NijS6Mu305pSeW0ISz2sY' },
    { id: 'm3', name: 'Linh Nguyen', role: 'Pastry Enthusiast', match: 82, vang: '+200', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjj-mCZ7rwe28xwIXs-V_cksBN30usSCBVxrWWt5dZSsDKMJTYCTecx-nYBnXzqDnUGNnT81PchF5_GXP4KBfamFFMAB3f9ZHx5qL43Y92aS9u3yF0ifA-JHxEc6ls2e0rhumsuEDtTllqKWij4QhnbRcb4eLXqVwRvUWbD6u9WWsuJ8oe41gERbdai5KM_cO88FQllcRlJPMlssLEjOqshtr3830Mi1zsSrtJC-uqMcgTa5MxkEhouDujFbWOPIQ0luutHFaMQGA' },
  ];

  const fallbackChallenges = [
    { id: 'c1', icon: 'explore_nearby', title: 'Thử món miền Bắc mới', desc: 'Khám phá hương vị miền núi. Nhận thêm điểm cho Thắng Cố.', vp: '+250 VP', color: '#b83500' },
    { id: 'c2', icon: 'add_a_photo', title: 'Chia sẻ Bún Chả của bạn', desc: 'Chụp ảnh chất lượng cao bữa Bún Chả tại địa điểm đã xác minh.', vp: '+150 VP', color: '#815f00' },
    { id: 'c3', icon: 'groups', title: 'Tổ chức Chef\'s Table', desc: 'Mời 3 người phù hợp đến bữa tối hợp tác tại bếp chung nhận Vàng.', vp: '+500 VP', color: '#117500' },
  ];

  const fallbackEvents = [
    { id: 'e1', name: 'Liên hoan Ẩm thực Phố cổ', location: 'Hoàn Kiếm', vang: '1,200 VANG', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1cvV6-TKb7Dce6-sx2SeQ3MD9v6bEqd0hq7MNn7j6p25tdXXn7rj3XyAXpFSyjb1Ash2OMZmYX5B9dPcOMmsOWd05Zbz1se207TOYkADm51G6t3GGCcXR0vuN-y72U6PFKszVfNfelL_NIDkNNoiYd0EAY9m1Mk69SKX_P93tnA1eFNsQWthP52LU3YUhNNbBLeABIp0UCYDAVJAVWgdm2KiMf3pawNSPHCdZoOKWK6P4uE190idBMP6ELtouL26xEH9nr80AfAA' },
    { id: 'e2', name: 'Trải nghiệm Steakhouse Tây Hồ', location: 'Tây Hồ', vang: '800 VANG', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU_CxTl_gelVSlG9UicQZjUREBFuPG62DJs0shHgGBR2bpgKaMkLxLuGGdfs9koHOliZnK63_Ps0gMmvWZMdEHx2awVxTSLviSr-pLamOpZ_ld4_tolasW316fyS3r4Me7FtM6IKwVWqtJ1xvx4zTMpbhc8ZWYtoexCndyprZqWZKsPlYnoR3HciebwrL1M0_uxOu7b2Z82fBTVazR0CH0w6XwGbLb28v5n09JF_XTbODd2cIs7U53khfxaNoz1chSRhdVY7DcfZ4' },
    { id: 'e3', name: 'Workshop Ramen Nhật Bản', location: 'Ba Đình', vang: '600 VANG', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADPEB0nRmhalfsTxwndKltLXji0ZgXE0-tPO0LpJNCT2xRZhH6HKEouXpCz7CYXrsScvSomWlVuYSt2riPPhq0Vzu99RQdNn1NWLbHWvJGcb6oky56hMt9yJamRNVLgJOsDeozJNEx1ycKZIQIu2Zagncivlr7BEJDMhfw8qMYv42Omzzc6PZp9qJsQ16fKJ6-pUEgqJyQr3cKx5SploDLodrsbJuvUkZtV1uS9EHXH02kBjmAIrsTJkfxzRSTn4ohOa-lnYZay6w' },
  ];

  const fallbackMoments = [
    { id: 'd1', title: 'Kỹ thuật bí mật cho bánh donut phủ men hoàn hảo.', author: 'Chef Julian', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb6AA7R59IRFZFbS4Tdr8atUmzUE7xhvxstn_Fka9pdGxDzDXdK4eTHAMPeY3FUBP8wIHaJEKKo0gYe_GQC6zIAQoypbRLMHoBDoF5UycCG0gyVl75DE8NOCS3ktY5QywOCWYFv7tf10DgjpTBVgRSCocXE9IF2nkv_6275OWKukXDgUHepnFCSZOmg-hGANSKUY_8fN_AM1qDhzOSmraEjYAVNKQ2xO8vdLXOmxXqfKLG_R6dqO0suD_sqO38JtcvDyL40gwBWuQ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8i6voK_VRjUufNc46UrBeew5hgfU5bQcLPSx7AXQ1O9MaIFDtb6T4fEmCm8aO79iUOIMzRssGKfCCjh16Yx0CBQ6Euj9vXsCfMS19pXsoSGSX4MaByJcRFe19u03N1DIcqs50YXRnV4V5DUss5dSjia37BvZj05c0TAeweEzELAG9b3TI-btLIakiVO53i4dIoujMsaoDcJFeG89yEYwqRZ_9GjoeBe2dAn7sO9xLqgxCFlThqrRXQ9E5wbDIdVOkjMX92RKEQ_o' },
    { id: 'd2', title: 'Tiệc Mezze Chủ nhật giữa lòng Hà Nội.', author: 'Elena R.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiPTjuXjNSVs0C1x-bMpIu_7F8m_NPX7fdk4mMrHTr7rrTNRBpfn8GynzgW9Yu1SCN8aQ7HHpoW8EomEI3JVGyd23HwiUoMJ5ZsvKCjU4bJ6mG6iTItxO4A5aCfE_HPyVxq6bO6-LKs2eYMuLiXvQDj1USQ8AX_luTUNE17b8vgjJN4l1Qw3CPm-ANDtVIErH_45kdNSv3vJh1OgWDTYuN965-zaXodQNUSzk-eLHuPzP6sbk2QIza-LOSu6KuEvEeIzdjvAruL8k', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnYP0nwXDzom5K5LuBXBSf1ZT5wopuiDSEPvn_THz37QTQ7DyguNsJDpwO5asANhQpADAKWHLovQCuo8CLJlSC2XgzFEt_PQywg534FZoGYWuBOO44qrc7dLsWmtyvVO7G5QhujA2QIka_hFJPgTkgblBnT7q0GYlUsrNeybTb3FLzHau0aNnuVq6D2mTJsHqg6dghCuU88f7Vc-7mECgBaueNGY3b52r2LPvBmldODbt5olCor_9foo--8XDveMC1mNRnZVNa08I' },
    { id: 'd3', title: 'Tìm vỏ pizza Neapolitan chính gốc tại Tây Hồ.', author: 'Tuan A.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJOS9egPh-2EzL7KJxbVTyesVus06QNIua8-QfDSkcgdRMd3ptQs1Yu0ov69KvOI1RRjp1fUykW5Xmo2naaQqVjiURWFutWYzp3Zz14FL4XvIHz905nkwNFbkjgpX1tTJKq9VyYDksZdEHJ5zSThzANxwjQ2T58pDpvPYPmzXEIM26SWWfzkT2ixmk1qHZEzrrJ-lr-t0RbCWbbzPhkTiC_X7ln4GH35N8lArYp40gfT6M9yJSu_cg01ntdX1haO_k8C-_HQtbeM', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKBusEZuBzSHVbsFDFGu-BMSO6NQmGF76E6PIyHPvGacXvQeaoBSS7m9p353OhcV6PsoqIKBBFYzXSGaHWQCnJAF1NMJSy52krKZ4cvgJdVOU6aoKRikVPWhdIudh-iIRQBcbTsZfU-FQjeoesTA4NlFTdaG8zrUfQpahZPfTRJbEnibC00TaxMRj5pJ7PicBbFd1U9I7hutCoKf6Mkhq-P_Z4rbv8SFsURbGiSppNMVWDrBIER8XRZnmUDrry1s153gCba2Tj2Sw' },
    { id: 'd4', title: 'Cuộc hành trình Umami đêm khuya: so sánh 3 quán ramen.', author: 'Mina S.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjLWtQNveLX7X9-WiIaBhU5vAqQUYVezyXiM0Leywy44lXV_UKapNBjzK1J_iXs-U37lAHEftaKsURLE9Lten5Vy-po3f2SkZeE7d6kiDPIlWQGqax-5SltTQ0t03kqGSOpqxCtgWJ_AMa5dfWNZLcfEsRckklYTEJ4ND87A93kY3kxxSC1I4gvbSV18g1yZ4npO1us3vF6c3uQe8G69veYttP2W0Q-zXf_4f9jjrrBNWlQ6G6K2Jl3EtGKGbx19Z1awNmIU5JFJI', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADPEB0nRmhalfsTxwndKltLXji0ZgXE0-tPO0LpJNCT2xRZhH6HKEouXpCz7CYXrsScvSomWlVuYSt2riPPhq0Vzu99RQdNn1NWLbHWvJGcb6oky56hMt9yJamRNVLgJOsDeozJNEx1ycKZIQIu2Zagncivlr7BEJDMhfw8qMYv42Omzzc6PZp9qJsQ16fKJ6-pUEgqJyQr3cKx5SploDLodrsbJuvUkZtV1uS9EHXH02kBjmAIrsTJkfxzRSTn4ohOa-lnYZay6w' },
  ];

  const displayMatches = profiles.length > 0 ? profiles.slice(0, 3).map((p, i) => ({
    id: p.id,
    name: p.name || 'User',
    role: p.bio?.slice(0, 25) || 'Food Lover',
    match: [94, 88, 82][i] || 80,
    vang: ['+80', '+120', '+200'][i],
    avatar: getAvatarUrl(p),
  })) : fallbackMatches;

  const displayEvents = events.length > 0 ? events.slice(0, 3).map((e, i) => ({
    id: e.id || `ev${i}`,
    name: e.name || e.title || 'Sự kiện',
    location: e.location || e.venue || '',
    vang: [`1,200 VANG`, `800 VANG`, `600 VANG`][i],
    img: e.image || e.images?.[0]?.url || fallbackEvents[i]?.img || '',
  })) : fallbackEvents;

  const displayMoments = posts.length > 0 ? posts.slice(0, 4).map((p, i) => ({
    id: p.id || `mo${i}`,
    title: p.title || p.content?.slice(0, 60) || 'Khoảnh khắc ẩm thực',
    author: p.author?.name || p.user?.name || 'GOMET User',
    avatar: getAvatarUrl(p.author || p.user) || fallbackMoments[i]?.avatar || '',
    img: getPostImage(p) || fallbackMoments[i]?.img || '',
  })) : fallbackMoments;

  // ── Nav tabs (inside page, not layout) ──
  const navTabs = [
    { label: 'Khám phá', active: true },
    { label: 'Ẩm thực', active: false },
    { label: 'Trạng thái Vàng', active: false },
    { label: 'Kết nối', active: false },
  ];

  // ════════════════════════════════════════════
  //  MOBILE LAYOUT
  // ════════════════════════════════════════════
  if (isMobile) {
    return (
      <div style={{ background: '#FDF9F3', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 100 }}>
        <style>{scrollbarHide}</style>
        <div style={{ padding: '0 20px' }}>
          {/* Nav tabs */}
          <div className="gomet-noscroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '16px 0', borderBottom: '1px solid #ebe8e0' }}>
            {navTabs.map((t) => (
              <span key={t.label} style={{
                whiteSpace: 'nowrap', fontSize: 14, fontWeight: 600, color: t.active ? '#FF4D00' : '#393834',
                paddingBottom: 8, borderBottom: t.active ? '2px solid #FF4D00' : '2px solid transparent', cursor: 'pointer',
              }}>{t.label}</span>
            ))}
          </div>

          {/* Personal Dashboard label */}
          <p style={{ fontSize: 10, fontWeight: 700, color: '#FF4D00', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '24px 0 4px' }}>
            PERSONAL DASHBOARD
          </p>

          {/* Welcome */}
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#393834', letterSpacing: '-0.03em', margin: '0 0 8px', lineHeight: 1.1 }}>
            Chào mừng trở lại, Chef <span style={{ color: '#FF4D00' }}>{userName}</span>.
          </h1>
          <p style={{ fontSize: 14, color: '#666460', margin: '0 0 24px', lineHeight: 1.6 }}>
            Hành trình ẩm thực Việt Nam của bạn đang tiếp tục. Bạn đã mở khoá <strong>12 điểm Vàng mới</strong> tuần này qua khám phá vùng miền.
          </p>

          {/* Vang balance */}
          <div style={{
            background: '#1a3a1a', padding: '16px 20px', borderRadius: 9999, display: 'inline-flex',
            alignItems: 'center', gap: 12, marginBottom: 32,
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#fcc43e', fontSize: 20, fontVariationSettings: "'FILL' 1" }}>toll</span>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>SỐ DƯ HIỆN TẠI</p>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#ffffff', margin: 0 }}>4,850 Vàng</p>
            </div>
          </div>

          {/* World Food Map Hero Banner */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#393834', margin: '0 0 16px' }}>Sưu tầm Ẩm thực Thế giới</h2>
            <div
              onClick={() => navigate('/app/world-food-map')}
              style={{
                position: 'relative', height: 180, borderRadius: '2rem', overflow: 'hidden',
                background: 'linear-gradient(135deg, #0D0D1A 0%, #1a1040 50%, #0D0D1A 100%)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 20,
              }}
            >
              {/* globe SVG mini */}
              <svg width="100" height="100" viewBox="0 0 200 200" style={{ flexShrink: 0 }}>
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,181,158,0.2)" strokeWidth="1.5" />
                {[-30, 0, 30].map((y, i) => (
                  <ellipse key={i} cx="100" cy={100 + y} rx={Math.sqrt(80 * 80 - y * y)} ry="14" fill="none" stroke="rgba(255,181,158,0.1)" strokeWidth="1" />
                ))}
                <ellipse cx="115" cy="78" rx="26" ry="16" fill="rgba(232,144,12,0.3)" />
                <ellipse cx="78" cy="72" rx="14" ry="20" fill="rgba(100,180,255,0.2)" />
                <ellipse cx="85" cy="108" rx="12" ry="9" fill="rgba(232,144,12,0.2)" />
                {[[115,70,'#E8900C'],[125,74,'#FFB59E'],[100,70,'#E8900C'],[82,68,'#6C63FF'],[72,80,'#2ED573']].map(([cx,cy,fill],i)=>(
                  <circle key={i} cx={cx} cy={cy} r="5" fill={fill} opacity="0.9">
                    <animate attributeName="r" values="4;6;4" dur={`${1.5+i*0.4}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                <circle cx="100" cy="100" r="80" fill="none" stroke="url(#hg)" strokeWidth="3"
                  strokeDasharray={`${2*Math.PI*80*0.34} ${2*Math.PI*80*0.66}`}
                  strokeLinecap="round" transform="rotate(-90 100 100)" />
                <defs>
                  <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E8900C" />
                    <stop offset="100%" stopColor="#FFB59E" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#E8900C', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>POKÉDEX ẨM THỰC</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#FDF9F3', lineHeight: 1.2, marginBottom: 8, fontFamily: 'var(--font-headline)' }}>
                  Bạn đã thử<br />bao nhiêu nền ẩm thực?
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['🇯🇵','🇮🇹','🇹🇭','🇫🇷','🇲🇽'].map((f,i) => (
                    <span key={i} style={{ fontSize: 20 }}>{f}</span>
                  ))}
                  <span style={{ fontSize: 14, color: '#E6BEB2', alignSelf: 'center' }}>+18 quốc gia</span>
                </div>
              </div>
              <div style={{
                position: 'absolute', right: 20, bottom: 20,
                background: 'linear-gradient(135deg, #E8900C, #FFB59E)',
                borderRadius: '9999px', padding: '8px 16px',
                fontSize: 12, fontWeight: 700, color: '#3A0B00',
              }}>
                Khám phá →
              </div>
            </div>
          </section>

          {/* Recent Matches */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#393834', margin: '0 0 16px' }}>Kết quả Phù hợp Gần đây</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {displayMatches.map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: 16, borderRadius: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ position: 'relative' }}>
                      {m.avatar ? (
                        <img src={m.avatar} alt={m.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>{m.name.charAt(0)}</div>
                      )}
                      <div style={{ position: 'absolute', bottom: -2, right: -2, background: '#117500', width: 20, height: 20, borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>{m.match}%</span>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: '#393834', margin: 0 }}>{m.name}</p>
                      <p style={{ fontSize: 12, color: '#666460', fontStyle: 'italic', margin: 0 }}>{m.role}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#117500', background: '#e6f5e0', padding: '4px 8px', borderRadius: 9999 }}>{m.vang} Vàng</span>
                    <button onClick={() => navigate('/app/chat')} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #bcb9b3', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, color: '#393834' }}>chat_bubble</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Moments Feed */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#393834', margin: '0 0 16px' }}>Moments Feed</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {displayMoments.map((m) => (
                <div key={m.id} style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate('/app/dates/all')}>
                  {m.img ? (
                    <img src={m.img} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #b83500, #ff784d)' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', padding: 4, borderRadius: '50%' }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#fff', fontSize: 14, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      {m.avatar ? <img src={m.avatar} alt="" style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid white' }} /> : <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FF571A' }} />}
                      <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{m.author}</span>
                    </div>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: 12, lineHeight: 1.3, margin: 0 }}>{m.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════
  //  DESKTOP LAYOUT
  // ════════════════════════════════════════════
  return (
    <div style={{ background: '#FDF9F3', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{scrollbarHide}</style>
      <div style={{ padding: '0 48px 64px', maxWidth: 1600 }}>

        {/* ── Top Nav Tabs (inside the page) ── */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 0', marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navTabs.map((t) => (
              <span key={t.label} style={{
                fontSize: 15, fontWeight: 600, cursor: 'pointer', paddingBottom: 6,
                color: t.active ? '#FF4D00' : '#393834',
                borderBottom: t.active ? '2px solid #FF4D00' : '2px solid transparent',
                letterSpacing: '-0.01em',
              }}>{t.label}</span>
            ))}
          </div>
          <button style={{
            padding: '10px 24px', background: '#b83500', color: '#ffffff', border: 'none',
            borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>
            Tham gia Kitchen
          </button>
        </nav>

        {/* ── Welcome Header ── */}
        <header style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <p style={{
              fontSize: 10, fontWeight: 700, color: '#FF4D00', textTransform: 'uppercase',
              letterSpacing: '0.15em', margin: '0 0 8px',
            }}>
              PERSONAL DASHBOARD
            </p>
            <h1 style={{
              fontSize: 48, fontWeight: 800, color: '#393834', letterSpacing: '-0.03em',
              margin: '0 0 12px', lineHeight: 1.05,
            }}>
              Chào mừng trở lại, Chef <span style={{ color: '#FF4D00' }}>{userName}</span>.
            </h1>
            <p style={{ fontSize: 16, color: '#666460', margin: 0, maxWidth: 560, lineHeight: 1.7 }}>
              Hành trình ẩm thực thế giới của bạn đang tiếp tục. Bạn đã sưu tầm <strong style={{ color: '#393834' }}>34 món từ 9 quốc gia</strong> — tiếp tục để trở thành chuyên gia ẩm thực!
            </p>
          </div>

          {/* Current Balance pill */}
          <div style={{
            background: '#1a3a1a', padding: '20px 28px', borderRadius: 9999,
            display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#fcc43e', fontSize: 28, fontVariationSettings: "'FILL' 1" }}>toll</span>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>SỐ DƯ HIỆN TẠI</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: '#ffffff', margin: 0 }}>4,850 Vàng</p>
            </div>
          </div>
        </header>

        {/* ── Main Grid: Left 8 + Right 4 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }}>

          {/* ─── Left Column ─── */}
          <div>
            {/* World Food Map */}
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#393834', margin: 0, letterSpacing: '-0.01em' }}>Sưu tầm Ẩm thực Thế giới</h2>
                <button style={{
                  background: 'none', border: 'none', color: '#b83500', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                }} onClick={() => navigate('/app/world-food-map')}>
                  Mở bộ sưu tập <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </button>
              </div>
              <div
                onClick={() => navigate('/app/world-food-map')}
                style={{
                  position: 'relative', height: 480, borderRadius: '2rem', overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #0D0D1A 0%, #1a1040 40%, #0a1a30 100%)',
                  display: 'flex', alignItems: 'center',
                }}>
                {/* decorative radial glow */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse at 65% 45%, rgba(232,144,12,0.2) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(108,99,255,0.15) 0%, transparent 45%)',
                }} />

                {/* globe SVG large */}
                <div style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="440" height="440" viewBox="0 0 200 200" style={{ opacity: 0.5 }}>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,181,158,0.25)" strokeWidth="1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,181,158,0.15)" strokeWidth="1" />
                    {[-40,-20,0,20,40].map((y,i)=>(
                      <ellipse key={i} cx="100" cy={100+y} rx={Math.sqrt(Math.max(0,80*80-y*y))} ry="12" fill="none" stroke="rgba(255,181,158,0.1)" strokeWidth="1" />
                    ))}
                    <ellipse cx="115" cy="75" rx="28" ry="18" fill="rgba(232,144,12,0.3)" />
                    <ellipse cx="78" cy="70" rx="16" ry="22" fill="rgba(100,160,255,0.2)" />
                    <ellipse cx="85" cy="105" rx="14" ry="10" fill="rgba(232,144,12,0.2)" />
                    {[[115,68,'#E8900C'],[127,73,'#FFB59E'],[108,78,'#E8900C'],[98,67,'#FFB59E'],[88,64,'#6C63FF'],[75,72,'#FF571A'],[70,80,'#2ED573'],[140,90,'#3742FA']].map(([cx,cy,fill],i)=>(
                      <circle key={i} cx={cx} cy={cy} r="4" fill={fill} opacity="0.9">
                        <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${1.5+i*0.25}s`} repeatCount="indefinite" />
                      </circle>
                    ))}
                  </svg>
                </div>

                {/* text content */}
                <div style={{ position: 'relative', padding: '48px 48px', maxWidth: 420 }}>
                  <div style={{ fontSize: 11, color: '#E8900C', fontWeight: 800, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>
                    Pokédex Ẩm thực
                  </div>
                  <h3 style={{ fontSize: 36, fontWeight: 800, color: '#FDF9F3', lineHeight: 1.15, margin: '0 0 16px', fontFamily: 'var(--font-headline)' }}>
                    Bạn đã thử bao nhiêu<br />nền ẩm thực thế giới?
                  </h3>
                  <p style={{ fontSize: 15, color: '#E6BEB2', lineHeight: 1.6, margin: '0 0 24px' }}>
                    Sưu tầm món ăn từ 18+ quốc gia. Trở thành chuyên gia ẩm thực và kết nối với người cùng vị.
                  </p>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
                    {['🇯🇵','🇮🇹','🇹🇭','🇫🇷','🇲🇽','🇮🇳','🇰🇷','🇬🇷'].map((f,i)=>(
                      <span key={i} style={{ fontSize: 24 }}>{f}</span>
                    ))}
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'linear-gradient(135deg, #E8900C, #FFB59E)',
                    padding: '12px 28px', borderRadius: '9999px',
                    fontSize: 14, fontWeight: 700, color: '#3A0B00',
                  }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18 }}>public</span>
                    Mở bộ sưu tập
                  </div>
                </div>

                {/* cuisine count badges */}
                <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                  {[{v:'18',l:'Quốc gia'},{v:'100+',l:'Món ăn'},{v:'34%',l:'Hoàn thành'}].map((s,i)=>(
                    <div key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', borderRadius: '1rem', padding: '8px 16px', textAlign: 'right' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#FFB59E' }}>{s.v}</div>
                      <div style={{ fontSize: 11, color: '#E6BEB2' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* Chef's Table Events - horizontal scroll */}
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#393834', margin: 0, letterSpacing: '-0.01em' }}>Sự kiện Chef's Table</h2>
                <button style={{
                  background: 'none', border: 'none', color: '#b83500', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                }} onClick={() => navigate('/app/chefs-table')}>
                  Xem tất cả <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </button>
              </div>
              <div className="gomet-noscroll" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 16 }}>
                {displayEvents.map((ev) => (
                  <div key={ev.id} style={{
                    flexShrink: 0, width: 300, borderRadius: '2rem', overflow: 'hidden',
                    background: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', cursor: 'pointer',
                  }} onClick={() => navigate('/app/chefs-table')}>
                    <div style={{ position: 'relative', height: 180 }}>
                      {ev.img ? (
                        <img src={ev.img} alt={ev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #ff784d, #b83500)' }} />
                      )}
                      <div style={{
                        position: 'absolute', top: 12, right: 12,
                        background: '#fcc43e', padding: '4px 12px', borderRadius: 9999,
                        fontSize: 10, fontWeight: 900, color: '#584000', letterSpacing: '0.05em',
                      }}>{ev.vang}</div>
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <p style={{ fontWeight: 700, fontSize: 15, color: '#393834', margin: '0 0 4px' }}>{ev.name}</p>
                      <p style={{ fontSize: 12, color: '#666460', margin: 0 }}>{ev.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Vang Point Challenges */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#393834', margin: '0 0 24px', letterSpacing: '-0.01em' }}>Thách thức Điểm Vàng</h2>
              <div className="gomet-noscroll" style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 16 }}>
                {fallbackChallenges.map((ch) => (
                  <div key={ch.id} style={{
                    flexShrink: 0, width: 320, background: '#FDF9F2', borderRadius: '2rem',
                    padding: 24, position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', top: -16, right: -16,
                      width: 96, height: 96, borderRadius: '50%',
                      background: `${ch.color}08`,
                    }} />
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ color: ch.color, fontSize: 28, display: 'block', marginBottom: 16 }}>{ch.icon}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#393834', margin: '0 0 8px' }}>{ch.title}</h3>
                    <p style={{ fontSize: 14, color: '#666460', margin: '0 0 24px', lineHeight: 1.5 }}>{ch.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: ch.color, fontWeight: 900, fontSize: 16 }}>{ch.vp}</span>
                      <button style={{
                        padding: '8px 20px', background: '#393834', color: '#FDF9F3', border: 'none',
                        borderRadius: 9999, fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.1em', cursor: 'pointer',
                      }}>Chấp nhận</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ─── Right Sidebar ─── */}
          <aside>
            <section style={{
              background: '#f7f3ec', borderRadius: '2rem', padding: 32,
              position: 'sticky', top: 28,
            }}>
              <h2 style={{
                fontSize: 20, fontWeight: 700, color: '#393834', margin: '0 0 32px',
                letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                Phù hợp Gần đây
                <span style={{ width: 8, height: 8, background: '#b83500', borderRadius: '50%', display: 'inline-block' }} />
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {displayMatches.map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ position: 'relative' }}>
                        {m.avatar ? (
                          <img src={m.avatar} alt={m.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{
                            width: 56, height: 56, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FFB59E, #FF571A)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 800, fontSize: 20,
                          }}>{m.name.charAt(0)}</div>
                        )}
                        <div style={{
                          position: 'absolute', bottom: -4, right: -4,
                          background: '#117500', width: 22, height: 22, borderRadius: '50%',
                          border: '2px solid #f7f3ec', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>{m.match}%</span>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: 15, color: '#393834', margin: '0 0 2px' }}>{m.name}</h4>
                        <p style={{ fontSize: 12, color: '#666460', fontStyle: 'italic', margin: '0 0 4px' }}>{m.role}</p>
                        <span style={{
                          fontSize: 10, fontWeight: 800, color: '#117500', background: '#e6f5e0',
                          padding: '2px 8px', borderRadius: 9999,
                        }}>{m.vang} Vàng</span>
                      </div>
                    </div>
                    <button style={{
                      width: 40, height: 40, borderRadius: '50%',
                      border: '1px solid rgba(130,128,123,0.2)', background: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }} onClick={() => navigate('/app/chat')}>
                      <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 20, color: '#393834' }}>chat_bubble</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Pro Tip */}
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid rgba(130,128,123,0.1)' }}>
                <div style={{ background: '#ffffff', padding: 24, borderRadius: '1rem' }}>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#666460', margin: '0 0 12px' }}>Mẹo hay</p>
                  <p style={{ fontSize: 14, color: '#393834', lineHeight: 1.6, margin: 0 }}>
                    Chef tương tác với 3+ người phù hợp mỗi tuần sẽ kiếm Điểm Vàng nhanh hơn 40%.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* ── Moments Feed Grid ── */}
        <section style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: '#393834', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Moments Feed</h2>
              <p style={{ fontSize: 15, color: '#666460', margin: 0 }}>Những câu chuyện ẩm thực hay nhất từ vòng bạn bè.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(130,128,123,0.1)',
                background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#393834' }}>filter_list</span>
              </button>
              <button style={{
                padding: '0 24px', height: 48, background: '#393834', color: '#FDF9F3',
                border: 'none', borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }} onClick={() => navigate('/app/dates/all')}>Xem tất cả</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {displayMoments.map((m) => (
              <div key={m.id} style={{
                position: 'relative', aspectRatio: '3/4', borderRadius: '2rem',
                overflow: 'hidden', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                transition: 'transform 0.3s ease',
              }} onClick={() => navigate('/app/dates/all')}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {m.img ? (
                  <img src={m.img} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #b83500, #ff784d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 56, color: 'rgba(255,255,255,0.2)' }}>restaurant</span>
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)', opacity: 0.7 }} />
                {/* Play button */}
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                  padding: 6, borderRadius: '50%',
                }}>
                  <span aria-hidden="true" className="material-symbols-outlined" style={{ color: '#fff', fontSize: 16, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    {m.avatar ? (
                      <img src={m.avatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid white' }} />
                    ) : (
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #FFB59E, #FF571A)', border: '1px solid white', flexShrink: 0 }} />
                    )}
                    <p style={{ color: '#fff', fontSize: 12, fontWeight: 700, margin: 0 }}>{m.author}</p>
                  </div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.3, margin: 0 }}>{m.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Review FAB */}
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 50,
        }}>
          <button style={{
            width: 60, height: 60, borderRadius: '50%',
            background: '#117500', color: '#ffffff', border: 'none',
            boxShadow: '0 8px 24px rgba(17,117,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'transform 0.2s ease',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            onClick={() => navigate('/app/review')}
            title="Gửi đánh giá"
          >
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 28 }}>rate_review</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
