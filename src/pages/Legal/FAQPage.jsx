import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Gomet là gì?',
    a: 'Gomet là ứng dụng hẹn hò và kết nối xã hội dành cho người Việt. Chúng tôi giúp bạn tìm kiếm bạn bè, người yêu hoặc đơn giản là những người cùng sở thích thông qua hệ thống "kèo hẹn" độc đáo.',
  },
  {
    q: 'Làm sao để match?',
    a: 'Bạn có thể quẹt phải (thích) hoặc quẹt trái (bỏ qua) hồ sơ của người khác. Khi cả hai cùng thích nhau, bạn sẽ có một match và có thể bắt đầu nhắn tin trò chuyện.',
  },
  {
    q: 'Kèo Trả Phí hoạt động thế nào?',
    a: 'Kèo Trả Phí là tính năng đặc biệt cho phép bạn tạo hoặc tham gia các hoạt động hẹn hò có chi phí như đi ăn, xem phim, du lịch. Người tạo kèo đặt giá và điều kiện, người tham gia ứng tuyển và được chọn.',
  },
  {
    q: 'Ví Gomet là gì?',
    a: 'Ví Gomet là ví điện tử trong ứng dụng, dùng để thanh toán cho các kèo Trả Phí. Bạn có thể nạp tiền vào ví thông qua các phương thức thanh toán được hỗ trợ.',
  },
  {
    q: 'Làm sao để nạp tiền?',
    a: 'Vào phần Ví Gomet trong ứng dụng, chọn "Nạp tiền" và lựa chọn phương thức thanh toán phù hợp. Gomet hỗ trợ nhiều phương thức bao gồm chuyển khoản ngân hàng và ví điện tử.',
  },
  {
    q: 'Tôi bị quấy rối thì làm sao?',
    a: 'Nếu bạn bị quấy rối, hãy sử dụng nút "Báo cáo" trên hồ sơ hoặc trong cuộc trò chuyện với người đó. Đội ngũ an toàn của Gomet sẽ xem xét và xử lý trong vòng 24 giờ. Bạn cũng có thể chặn người dùng ngay lập tức.',
  },
  {
    q: 'Tôi muốn xóa tài khoản?',
    a: 'Bạn có thể xóa tài khoản trong phần Cài đặt. Lưu ý rằng việc xóa tài khoản là vĩnh viễn và không thể khôi phục. Tất cả dữ liệu bao gồm matches, tin nhắn và ví Gomet sẽ bị xóa.',
  },
  {
    q: 'Gomet có miễn phí không?',
    a: 'Gomet hoàn toàn miễn phí để tải về và sử dụng các tính năng cơ bản như quẹt, match và nhắn tin. Các tính năng nâng cao như Kèo Trả Phí yêu cầu nạp tiền vào ví Gomet.',
  },
  {
    q: 'Thông tin của tôi có an toàn không?',
    a: 'Gomet sử dụng mã hóa SSL và các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin cá nhân của bạn. Chúng tôi cam kết không bán dữ liệu cá nhân cho bên thứ ba.',
  },
  {
    q: 'Làm sao liên hệ hỗ trợ?',
    a: 'Bạn có thể liên hệ đội ngũ hỗ trợ qua email support@gomet.vn hoặc truy cập Trung tâm trợ giúp tại gomet.vn. Thời gian phản hồi trung bình là dưới 24 giờ.',
  },
];

const FAQPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8fa' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#505965', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontSize: '18px', fontWeight: 700, textAlign: 'center', color: '#111418' }}>
          Câu hỏi thường gặp
        </h1>
        <div style={{ width: '24px' }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#111418', flex: 1, paddingRight: '12px' }}>
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={20} color="#fd5068" />
                  ) : (
                    <ChevronDown size={20} color="#999" />
                  )}
                </button>
                {isOpen && (
                  <div style={{ padding: '0 20px 16px', fontSize: '14px', color: '#505965', lineHeight: '1.7' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '13px', color: '#999' }}>
            Không tìm thấy câu trả lời? Liên hệ support@gomet.vn
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
