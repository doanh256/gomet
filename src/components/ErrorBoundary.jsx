import React from 'react';
import { RefreshCw, Bug } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Trong production: gửi lỗi lên logging server (Sentry, etc.)
    console.error('[Gomet ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #1f1140 0%, #13111C 100%)',
          color: 'white', textAlign: 'center', padding: '40px'
        }}>
          <div style={{
            background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.3)',
            borderRadius: '24px', padding: '48px', maxWidth: '440px'
          }}>
            <Bug size={56} color="#FF6B6B" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              Ối! Có gì đó đã vỡ rồi 😬
            </h2>
            <p style={{ color: '#A09FB1', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
              Ứng dụng gặp lỗi không mong muốn. Đội ngũ kỹ thuật đã được thông báo. Vui lòng thử lại!
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre style={{
                background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px',
                fontSize: '11px', color: '#FF6B6B', textAlign: 'left',
                overflow: 'auto', marginBottom: '24px', maxHeight: '120px'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(260deg, #FF6B6B, #fec142)',
                color: 'white', border: 'none', borderRadius: '30px',
                padding: '14px 32px', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', margin: '0 auto'
              }}
            >
              <RefreshCw size={18} /> Tải lại ứng dụng
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
