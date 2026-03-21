const API_URL = '/api';

export const api = {
  async fetch(path, options = {}) {
    const token = localStorage.getItem('gomet_token');
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    // Don't set Content-Type for FormData (let browser set boundary)
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      localStorage.removeItem('gomet_token');
      window.location.href = '/login';
      return null;
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Đã có lỗi xảy ra');
    }
    return data;
  },

  get: (path) => api.fetch(path),
  post: (path, data) => api.fetch(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path, data) => api.fetch(path, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (path) => api.fetch(path, { method: 'DELETE' }),

  upload: (path, formData) => api.fetch(path, { method: 'POST', body: formData }),
};
