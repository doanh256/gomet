import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: 'Giới thiệu',
    content: 'Chào mừng bạn đến với Gomet - nền tảng hẹn hò và kết nối xã hội hàng đầu Việt Nam. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản được nêu dưới đây. Gomet được vận hành bởi Công ty Gomet tại gomet.vn.',
  },
  {
    title: 'Điều kiện sử dụng',
    content: 'Bạn phải đủ 18 tuổi trở lên để sử dụng Gomet. Mỗi người chỉ được sở hữu một tài khoản duy nhất và phải cung cấp thông tin chính xác. Việc sử dụng tài khoản giả mạo hoặc thông tin không trung thực có thể dẫn đến việc khóa tài khoản vĩnh viễn.',
  },
  {
    title: 'Quyền và nghĩa vụ',
    content: 'Bạn có quyền sử dụng các tính năng của Gomet bao gồm tìm kiếm, kết nối và nhắn tin với người dùng khác. Bạn có nghĩa vụ tôn trọng người dùng khác, không quấy rối, không gửi nội dung không phù hợp. Gomet có quyền tạm ngưng hoặc chấm dứt tài khoản vi phạm mà không cần thông báo trước.',
  },
  {
    title: 'Nội dung người dùng',
    content: 'Bạn chịu trách nhiệm hoàn toàn về nội dung mà bạn đăng tải lên Gomet bao gồm ảnh, văn bản và tin nhắn. Gomet có quyền xóa bất kỳ nội dung nào vi phạm quy định cộng đồng. Nghiêm cấm đăng tải nội dung bạo lực, khiêu dâm, phân biệt đối xử hoặc vi phạm pháp luật.',
  },
  {
    title: 'Quyền riêng tư',
    content: 'Gomet cam kết bảo vệ thông tin cá nhân của bạn theo Chính sách quyền riêng tư. Chúng tôi chỉ thu thập thông tin cần thiết để cung cấp dịch vụ tốt nhất. Vui lòng tham khảo trang Chính sách quyền riêng tư để biết chi tiết.',
  },
  {
    title: 'Chấm dứt',
    content: 'Bạn có thể xóa tài khoản Gomet bất cứ lúc nào thông qua phần Cài đặt. Gomet có quyền chấm dứt hoặc tạm ngưng tài khoản của bạn nếu phát hiện vi phạm điều khoản sử dụng. Sau khi xóa tài khoản, dữ liệu của bạn sẽ được xử lý theo chính sách bảo mật.',
  },
  {
    title: 'Liên hệ',
    content: 'Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua email support@gomet.vn hoặc truy cập gomet.vn. Chúng tôi sẵn sàng hỗ trợ bạn trong giờ làm việc từ 8:00 đến 22:00 hàng ngày.',
  },
];

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>
          Điều khoản sử dụng
        </h1>
        <div style={{ width: '24px' }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', color: '#999' }}>Cập nhật lần cuối: 01/01/2025</p>
          </div>

          {sections.map((section, i) => (
            <div key={i} style={{ marginBottom: i < sections.length - 1 ? '24px' : 0 }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#111418', marginBottom: '8px' }}>
                {i + 1}. {section.title}
              </h2>
              <p style={{ fontSize: '14px', color: '#505965', lineHeight: '1.7', margin: 0 }}>
                {section.content}
              </p>
            </div>
          ))}

          <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
              gomet.vn - Kết nối trái tim Việt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
