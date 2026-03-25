import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const srKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const resultTabs = ['Dia diem', 'Mon an', 'Su kien', 'Nguoi'];
const sortOpts = ['Phu hop', 'Danh gia', 'Khoang cach'];

const cuisines = ['Viet Nam', 'Nhat Ban', 'Han Quoc', 'Y', 'Thai', 'Phap'];
const priceRanges = ['Duoi 100k', '100k - 300k', '300k - 500k', 'Tren 500k'];

const results = [
  { name: 'Pho Thin', type: 'Viet Nam', rating: 4.8, price: '$$', dist: '0.5km', img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop' },
  { name: 'Sushi Rei', type: 'Nhat Ban', rating: 4.9, price: '$$$', dist: '1.2km', img: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=300&h=200&fit=crop' },
  { name: 'Banh Mi Huynh Hoa', type: 'Viet Nam', rating: 4.7, price: '$', dist: '0.8km', img: 'https://images.unsplash.com/photo-1600454021915-de753e6b5dfe?w=300&h=200&fit=crop' },
  { name: 'Pizza 4P\'s', type: 'Y', rating: 4.6, price: '$$', dist: '1.5km', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop' },
  { name: 'Som Tam Thai', type: 'Thai', rating: 4.5, price: '$$', dist: '2.0km', img: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=300&h=200&fit=crop' },
  { name: 'Le Petit Saigon', type: 'Phap', rating: 4.8, price: '$$$', dist: '1.8km', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop' },
  { name: 'Com Tam Ba Ghien', type: 'Viet Nam', rating: 4.6, price: '$', dist: '0.3km', img: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=300&h=200&fit=crop' },
  { name: 'Gogi House', type: 'Han Quoc', rating: 4.4, price: '$$', dist: '2.5km', img: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300&h=200&fit=crop' },
  { name: 'Noir Dining', type: 'Fusion', rating: 4.9, price: '$$$$', dist: '1.0km', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop' },
];

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeSort, setActiveSort] = useState(0);
  const [query, setQuery] = useState('Am thuc Sai Gon');
  const [checkedCuisines, setCheckedCuisines] = useState([0, 1]);

  const toggleCuisine = (i) => {
    setCheckedCuisines(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FDF9F3', color: '#1A1A2E' }}>
      <style>{srKeyframes}</style>

      {/* Search Bar */}
      <div style={{ padding: '20px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 24, color: '#1A1A2E' }}>arrow_back</span>
          </button>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            background: '#fff', borderRadius: 999, padding: '12px 20px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)', border: '2px solid #E8900C'
          }}>
            <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 22, color: '#E8900C' }}>search</span>
            <input value={query} onChange={e => setQuery(e.target.value)} style={{
              border: 'none', outline: 'none', flex: 1, fontSize: 15, fontWeight: 500,
              background: 'transparent', color: '#1A1A2E'
            }} placeholder="Tim kiem mon an, dia diem..." />
          </div>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {resultTabs.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: '8px 20px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: activeTab === i ? '#1A1A2E' : '#fff',
              color: activeTab === i ? '#fff' : '#888', fontSize: 13, fontWeight: 600,
              boxShadow: activeTab !== i ? '0 1px 4px rgba(0,0,0,0.06)' : 'none'
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {sortOpts.map((s, i) => (
            <button key={i} onClick={() => setActiveSort(i)} style={{
              padding: '6px 14px', borderRadius: 14, border: 'none', cursor: 'pointer',
              background: activeSort === i ? '#E8900C' : 'transparent',
              color: activeSort === i ? '#fff' : '#999', fontSize: 12, fontWeight: 600
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: 24, padding: '0 32px 32px' }}>
        {/* Left Sidebar Filters */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'sticky', top: 20 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 6, color: '#E8900C' }}>tune</span>
              Bo Loc
            </h3>

            {/* Cuisine */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#1A1A2E' }}>Loai am thuc</div>
              {cuisines.map((c, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13, color: '#555' }}>
                  <div onClick={() => toggleCuisine(i)} style={{
                    width: 18, height: 18, borderRadius: 4, border: '2px solid #ddd',
                    background: checkedCuisines.includes(i) ? '#E8900C' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {checkedCuisines.includes(i) && <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>check</span>}
                  </div>
                  {c}
                </label>
              ))}
            </div>

            {/* Price */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#1A1A2E' }}>Khoang gia</div>
              {priceRanges.map((p, i) => (
                <div key={i} style={{
                  padding: '6px 12px', borderRadius: 10, marginBottom: 6, fontSize: 12,
                  background: i === 1 ? '#FFF3E0' : '#f9f9f9', color: i === 1 ? '#E8900C' : '#666',
                  fontWeight: i === 1 ? 700 : 400, cursor: 'pointer'
                }}>{p}</div>
              ))}
            </div>

            {/* Rating */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#1A1A2E' }}>Danh gia toi thieu</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[3, 3.5, 4, 4.5].map((r, i) => (
                  <div key={i} style={{
                    padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                    background: i === 2 ? '#E8900C' : '#f5f5f5', color: i === 2 ? '#fff' : '#999', cursor: 'pointer'
                  }}>{r}+</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>{results.length} ket qua cho "{query}"</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {results.map((r, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 18, overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                animation: `fadeInUp 0.4s ease ${i * 0.05}s both`, cursor: 'pointer'
              }}>
                <img src={r.img} alt={r.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{r.type} - {r.dist}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: 16, color: '#F5C542' }}>star</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{r.rating}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#E8900C' }}>{r.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
