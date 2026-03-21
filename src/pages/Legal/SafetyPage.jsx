import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const safetyTips = [
  {
    emoji: '📍',
    title: 'Gặp nơi công cộng',
    desc: 'Luôn hẹn gặp lần đầu ở nơi đông người như quán cà phê, trung tâm thương mại. Tránh gặp ở nơi vắng vẻ hoặc nhà riêng khi chưa thực sự tin tưởng.',
  },
  {
    emoji: '📱',
    title: 'Báo vị trí cho bạn bè',
    desc: 'Chia sẻ kế hoạch và vị trí hẹn hò với bạn bè hoặc người thân. Nên nhờ ai đó gọi điện kiểm tra trong buổi hẹn đầu tiên.',
  },
  {
    emoji: '🔒',
    title: 'Không chia sẻ thông tin cá nhân',
    desc: 'Không nên chia sẻ địa chỉ nhà, thông tin tài chính hoặc mật khẩu với người mới quen. Hãy từ từ tìm hiểu trước khi chia sẻ thông tin nhạy cảm.',
  },
  {
    emoji: '🚨',
    title: 'Báo cáo hành vi xấu',
    desc: 'Nếu ai đó khiến bạn cảm thấy không thoải mái, hãy chặn và báo cáo ngay. Đội ngũ Gomet sẽ xử lý nghiêm mọi hành vi quấy rối.',
  },
  {
    emoji: '🚗',
    title: 'Tự chủ phương tiện',
    desc: 'Tự đi bằng phương tiện của mình hoặc xe công nghệ. Không để người mới quen đưa đón bạn về nhà trong những lần đầu gặp mặt.',
  },
  {
    emoji: '🍷',
    title: 'Cẩn thận với đồ uống',
    desc: 'Luôn tự giữ đồ uống của mình và không nhận đồ uống từ người lạ. Hạn chế uống rượu bia quá mức trong buổi hẹn đầu tiên.',
  },
];

const SafetyPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>
          Trung tâm An toàn
        </h1>
        <div style={{ width: '24px' }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
        {/* Intro */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛡️</div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111418', marginBottom: '8px' }}>
            An toàn là ưu tiên hàng đầu
          </h2>
          <p style={{ fontSize: '14px', color: '#505965', lineHeight: '1.6', margin: 0 }}>
            Gomet luôn đặt sự an toàn của bạn lên hàng đầu. Dưới đây là những mẹo giúp bạn có trải nghiệm hẹn hò an toàn và vui vẻ.
          </p>
        </div>

        {/* Safety Tips Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {safetyTips.map((tip, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                borderRadius: '14px',
                padding: '20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{tip.emoji}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111418', marginBottom: '8px' }}>
                {tip.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#505965', lineHeight: '1.6', margin: 0 }}>
                {tip.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Report Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #fde8ea' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <AlertTriangle size={24} color="#fd5068" />
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111418', margin: 0 }}>
              Báo cáo người dùng
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: '#505965', lineHeight: '1.7', margin: '0 0 16px 0' }}>
            Nếu bạn gặp bất kỳ hành vi đáng ngờ hoặc vi phạm nào, hãy báo cáo ngay cho chúng tôi. Bạn có thể báo cáo thông qua nút "Báo cáo" trên hồ sơ người dùng hoặc trong cuộc trò chuyện. Mọi báo cáo đều được xem xét nghiêm túc và xử lý trong vòng 24 giờ.
          </p>
          <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
            Trường hợp khẩn cấp: gọi 113 hoặc email safety@gomet.vn
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '13px', color: '#999' }}>gomet.vn - An toàn cho mọi người</p>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;
