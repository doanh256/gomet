import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  bg: '#fcf9f8',
  white: '#ffffff',
  surfaceLow: '#f6f3f2',
  surfaceContainer: '#f0edec',
  surfaceHigh: '#ebe7e7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5d4038',
  primary: '#ad2c00',
  primaryFixed: '#ffdbd1',
  outlineVariant: '#e7bdb2',
};

const FONTS = {
  headline: "'Plus Jakarta Sans', sans-serif",
  body: "'Manrope', sans-serif",
};

const bookingData = {
  venue: 'The Gourmet Junction',
  address: 'Quận 1, TP. Hồ Chí Minh',
  datetime: '19:30, Thứ Bảy, 24 Th08',
  guests: '02 người',
  totalEstimate: 1200000,
  depositRate: 0.2,
};

const deposit = Math.round(bookingData.totalEstimate * bookingData.depositRate);

const paymentMethods = [
  {
    id: 'banking',
    label: 'Chuyển khoản Ngân hàng',
    icon: 'account_balance',
    iconBg: COLORS.surfaceHigh,
    iconColor: COLORS.onSurface,
    customIcon: null,
  },
  {
    id: 'card',
    label: 'Thẻ Quốc tế (Visa/Master)',
    icon: 'credit_card',
    iconBg: COLORS.surfaceHigh,
    iconColor: COLORS.onSurface,
    customIcon: null,
  },
  {
    id: 'vang',
    label: 'VÀNG Points (8.450 pts)',
    icon: 'stars',
    iconBg: '#FFF8E1',
    iconColor: '#F59E0B',
    customIcon: null,
  },
];

const formatVND = (n) => n.toLocaleString('vi-VN') + 'đ';

const BookingConfirmPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('banking');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      navigate('/app/booking-success');
    }, 1800);
  };

  if (confirmed) {
    return (
      <div style={{
        backgroundColor: COLORS.bg, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', fontFamily: FONTS.headline, padding: 32,
        textAlign: 'center',
      }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          backgroundColor: '#dcfce7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: 52, color: '#16a34a',
            fontVariationSettings: "'FILL' 1",
          }}>
            check_circle
          </span>
        </div>
        <h2 style={{
          fontFamily: FONTS.headline, fontSize: 24, fontWeight: 800,
          color: COLORS.onSurface, margin: '0 0 8px',
        }}>
          Thanh toán thành công!
        </h2>
        <p style={{
          fontFamily: FONTS.body, fontSize: 14, color: COLORS.onSurfaceVariant,
          lineHeight: 1.6, margin: 0,
        }}>
          Đặt bàn của bạn đã được xác nhận. Chúng tôi sẽ gửi thông tin qua email.
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', fontFamily: FONTS.headline }}>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: COLORS.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
        boxShadow: '0 1px 0 rgba(28,27,27,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none',
              backgroundColor: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: COLORS.onSurface,
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 style={{
            fontFamily: FONTS.headline, fontWeight: 700, fontSize: 18,
            color: COLORS.onSurface, margin: 0,
          }}>
            Thanh toán cọc
          </h1>
        </div>
        <div style={{
          fontFamily: FONTS.headline, fontSize: 20, fontWeight: 800,
          color: COLORS.primary, letterSpacing: '-0.5px',
        }}>
          GoMet
        </div>
      </header>

      <main style={{ paddingTop: 80, paddingBottom: 120, maxWidth: 480, margin: '0 auto', padding: '80px 24px 120px' }}>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontFamily: FONTS.headline, fontWeight: 700, fontSize: 13,
            color: COLORS.onSurfaceVariant, marginBottom: 12, marginLeft: 4,
            textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            Tóm tắt lộ trình
          </h2>
          <div style={{
            backgroundColor: COLORS.white, borderRadius: 16, padding: 24,
            boxShadow: '0 4px 20px rgba(28,27,27,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg, #ffdbd1 0%, #ffb5a0 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: 32, color: COLORS.primary,
                  fontVariationSettings: "'FILL' 1",
                }}>
                  restaurant
                </span>
              </div>
              <div>
                <h3 style={{
                  fontFamily: FONTS.headline, fontWeight: 700, fontSize: 17,
                  color: COLORS.onSurface, margin: '0 0 4px', lineHeight: 1.3,
                }}>
                  {bookingData.venue}
                </h3>
                <p style={{
                  fontFamily: FONTS.body, fontSize: 13,
                  color: COLORS.onSurfaceVariant, margin: 0,
                }}>
                  {bookingData.address}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: COLORS.surfaceLow,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: COLORS.primary }}>
                    calendar_today
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 11,
                    color: COLORS.onSurfaceVariant, fontWeight: 500, margin: '0 0 2px',
                  }}>
                    Thời gian
                  </p>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 14, fontWeight: 600,
                    color: COLORS.onSurface, margin: 0,
                  }}>
                    {bookingData.datetime}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: COLORS.surfaceLow,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: COLORS.primary }}>
                    group
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 11,
                    color: COLORS.onSurfaceVariant, fontWeight: 500, margin: '0 0 2px',
                  }}>
                    Số lượng
                  </p>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 14, fontWeight: 600,
                    color: COLORS.onSurface, margin: 0,
                  }}>
                    {bookingData.guests}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <div style={{
            backgroundColor: COLORS.surfaceLow, borderRadius: 16, padding: 24,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 12,
            }}>
              <span style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.onSurfaceVariant }}>
                Tổng hóa đơn dự kiến
              </span>
              <span style={{
                fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: COLORS.onSurface,
              }}>
                {formatVND(bookingData.totalEstimate)}
              </span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: 14, borderBottom: `1px solid ${COLORS.outlineVariant}`,
            }}>
              <span style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.onSurfaceVariant }}>
                Tiền cọc giữ chỗ (20%)
              </span>
              <span style={{
                fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: COLORS.onSurface,
              }}>
                {formatVND(deposit)}
              </span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 14,
            }}>
              <span style={{
                fontFamily: FONTS.headline, fontWeight: 700, fontSize: 16, color: COLORS.onSurface,
              }}>
                Cần thanh toán
              </span>
              <span style={{
                fontFamily: FONTS.headline, fontWeight: 800, fontSize: 24,
                color: COLORS.primary, letterSpacing: '-0.5px',
              }}>
                {formatVND(deposit)}
              </span>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontFamily: FONTS.headline, fontWeight: 700, fontSize: 13,
            color: COLORS.onSurfaceVariant, marginBottom: 12, marginLeft: 4,
            textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            Phương thức thanh toán
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {paymentMethods.map((method) => {
              const isSelected = selectedPayment === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px',
                    backgroundColor: COLORS.white, borderRadius: 14, cursor: 'pointer',
                    border: isSelected ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.outlineVariant}`,
                    boxShadow: isSelected ? `0 4px 16px rgba(173,44,0,0.12)` : '0 1px 4px rgba(28,27,27,0.04)',
                    transition: 'all 0.15s',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10,
                      backgroundColor: isSelected ? COLORS.primaryFixed : method.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span className="material-symbols-outlined" style={{
                        fontSize: 22,
                        color: isSelected ? COLORS.primary : method.iconColor,
                      }}>
                        {method.icon}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: FONTS.body, fontSize: 14, fontWeight: 600,
                      color: isSelected ? COLORS.primary : COLORS.onSurface,
                    }}>
                      {method.label}
                    </span>
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: isSelected ? `6px solid ${COLORS.primary}` : `2px solid ${COLORS.outlineVariant}`,
                    backgroundColor: COLORS.white,
                    flexShrink: 0,
                    transition: 'all 0.15s',
                  }} />
                </button>
              );
            })}
          </div>
        </section>

        <section style={{
          backgroundColor: COLORS.primaryFixed,
          borderRadius: 14, padding: 18,
          display: 'flex', gap: 14, alignItems: 'flex-start',
          marginBottom: 24,
          opacity: 0.9,
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: 22, color: COLORS.primary,
            fontVariationSettings: "'FILL' 1",
            flexShrink: 0, marginTop: 1,
          }}>
            verified_user
          </span>
          <div>
            <h4 style={{
              fontFamily: FONTS.headline, fontWeight: 700, fontSize: 13,
              color: COLORS.onSurface, margin: '0 0 6px',
            }}>
              Cam kết hoàn tiền 100%
            </h4>
            <p style={{
              fontFamily: FONTS.body, fontSize: 12, color: COLORS.onSurfaceVariant,
              lineHeight: 1.6, margin: 0,
            }}>
              Bạn có thể hủy lịch và nhận lại toàn bộ tiền cọc nếu thực hiện trước giờ hẹn ít nhất{' '}
              <strong>2 tiếng</strong>. Sau thời gian này, phí cọc sẽ không được hoàn trả.
            </p>
          </div>
        </section>
      </main>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(252,249,248,0.92)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${COLORS.outlineVariant}`,
        padding: '16px 24px 28px',
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <span style={{
              fontFamily: FONTS.body, fontSize: 13, color: COLORS.onSurfaceVariant,
            }}>
              Tổng thanh toán
            </span>
            <span style={{
              fontFamily: FONTS.headline, fontSize: 18, fontWeight: 800,
              color: COLORS.primary,
            }}>
              {formatVND(deposit)}
            </span>
          </div>
          <button
            onClick={handleConfirm}
            style={{
              width: '100%', height: 56,
              backgroundColor: COLORS.primary, color: '#ffffff',
              border: 'none', borderRadius: 9999, cursor: 'pointer',
              fontFamily: FONTS.headline, fontSize: 16, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(173,44,0,0.3)',
              transition: 'opacity 0.15s',
            }}
          >
            Xác nhận thanh toán
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmPage;
