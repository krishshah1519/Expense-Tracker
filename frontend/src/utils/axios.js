import axios from 'axios';


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  console.log(cookieValue)
  return cookieValue;
}

const api = axios.create({
  baseURL:  process.env.REACT_APP_API_BASE_URL ,
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCookie('csrftoken'),
  },
});

export default api;
