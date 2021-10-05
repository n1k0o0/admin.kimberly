import axios from "axios";
import { ElNotification } from 'element-plus'

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  'X-Requested-With': 'XMLHttpRequest',
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/dashboard',
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
  let errorMessage
  if (error.response.data.exception==='App\\Exceptions\\BusinessLogicException'){
    errorMessage=error.response.data.message
  }
  console.log()
  if (error.response && (error.response.status === 401 || error.response.status === 419)) {
    localStorage.removeItem('token');
    if (window.location.pathname !== '/auth') {
      window.location.href = '/auth';
    }
    return;
  }
  if (error.response && error.response.status === 403) {
    ElNotification({type: 'error', title: 'Ошибка авторизации', message: 'Нет прав на совершение действия'})
    return;
  }
  if (error.response && error.response.status === 404) {
    ElNotification({type: 'error', title: '404', message: 'Ресурс отсутствует'})
    return;
  }
  if (error.response && error.response.status === 500) {
    ElNotification({type: 'error', title: 'Ошибка', message: errorMessage??'Обратитесь к разработчикам.'})
    return;
  }

  if (error.response.data.errors){
    errorMessage=Object.values(error.response.data.errors).flat().toString()
  }
  ElNotification({type: 'error', title: 'Ошибка', message: errorMessage??'Нераспознання ошибка'})

  return Promise.reject(error);
});

export default api;
