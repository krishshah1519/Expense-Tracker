import axios from 'axios';

// Get CSRF token from cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCookie('csrftoken'),
    'Content-Type': 'application/json'
  },
});

// Attach CSRF token for safe HTTP methods (POST, PUT, DELETE)
api.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');
  if (
    ['post', 'put', 'patch', 'delete'].includes(config.method) &&
    csrfToken
  ) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

export default api;
