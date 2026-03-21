import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: 'Thu thập dữ liệu',
    content: 'Gomet thu thập thông tin cá nhân mà bạn cung cấp khi đăng ký tài khoản bao gồm tên, email, giới tính, tuổi và vị trí. Chúng tôi cũng thu thập dữ liệu về cách bạn sử dụng ứng dụng để cải thiện trải nghiệm. Ảnh và nội dung bạn đăng tải được lưu trữ trên hệ thống bảo mật của chúng tôi.',
  },
  {
    title: 'Sử dụng dữ liệu',
    content: 'Thông tin của bạn được sử dụng để cung cấp và cải thiện dịch vụ Gomet, bao gồm gợi ý kết nối phù hợp. Chúng tôi phân tích dữ liệu sử dụng ẩn danh để nâng cao chất lượng sản phẩm. Gomet không bán thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương mại.',
  },
  {
    title: 'Chia sẻ dữ liệu',
    content: 'Gomet chỉ chia sẻ thông tin của bạn với bên thứ ba khi có sự đồng ý của bạn hoặc theo yêu cầu pháp luật. Các đối tác kỹ thuật hỗ trợ vận hành dịch vụ được yêu cầu tuân thủ chính sách bảo mật nghiêm ngặt. Hồ sơ công khai của bạn chỉ hiển thị cho những người dùng Gomet khác.',
  },
  {
    title: 'Bảo mật',
    content: 'Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ dữ liệu của bạn bao gồm mã hóa SSL và lưu trữ an toàn. Mật khẩu được mã hóa một chiều và không ai có thể truy cập mật khẩu gốc của bạn. Chúng tôi thường xuyên kiểm tra và cập nhật hệ thống bảo mật.',
  },
  {
    title: 'Cookie',
    content: 'Gomet sử dụng cookie và công nghệ tương tự để duy trì phiên đăng nhập và cải thiện trải nghiệm người dùng. Cookie giúp chúng tôi ghi nhớ tùy chọn của bạn và cung cấp nội dung phù hợp hơn. Bạn có thể quản lý cài đặt cookie trong trình duyệt của mình.',
  },
  {
    title: 'Quyền của bạn',
    content: 'Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào. Bạn có thể yêu cầu xuất toàn bộ dữ liệu cá nhân qua phần Cài đặt. Nếu bạn xóa tài khoản, dữ liệu sẽ được xóa trong vòng 30 ngày làm việc.',
  },
  {
    title: 'Liên hệ',
    content: 'Mọi thắc mắc về chính sách quyền riêng tư, vui lòng liên hệ privacy@gomet.vn. Đội ngũ bảo mật của chúng tôi sẽ phản hồi trong vòng 48 giờ làm việc. Truy cập gomet.vn để biết thêm thông tin.',
  },
];

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>
          Chính sách quyền riêng tư
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

export default PrivacyPage;
