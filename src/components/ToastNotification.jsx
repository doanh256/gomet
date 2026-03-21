import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none' // Để click xuyên qua div chứa ngoài
      }}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const ToastItem = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={20} color="#1dda95" />;
      case 'error': return <AlertCircle size={20} color="#fd5068" />;
      case 'info': return <Info size={20} color="#21c4dc" />;
      default: return <Info size={20} color="#ffffff" />;
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(25, 25, 25, 0.95)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '50px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.05)',
      animation: 'slideDown 0.3s ease-out forwards',
      pointerEvents: 'auto', // Lấy lại quyền click cho toast
      minWidth: '250px'
    }}>
      {getIcon()}
      <span style={{ fontSize: '15px', fontWeight: 500, flex: 1 }}>{toast.message}</span>
      <button 
        onClick={onRemove}
        style={{
          background: 'none', border: 'none', color: '#888',
          cursor: 'pointer', padding: 0, display: 'flex'
        }}
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
