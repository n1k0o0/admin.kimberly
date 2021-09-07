import axios from "axios";
// import {ElNotification} from 'element-plus'

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  'X-Requested-With': 'XMLHttpRequest',
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers,
});
api.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response && error.response.status === 401 || error.response && error.response.status === 419) {
    if (window.location.pathname !== '/auth') {
      window.location.href = '/auth';
    }
    return;
  }
  if (error.response && error.response.status === 500) {
    // ElNotification({type: 'error', title: 'Ошибка', message: 'Обратитесь к разработчикам.'})
    return;
  }
  console.log(error);

  return Promise.reject(error);
});

export default api;
