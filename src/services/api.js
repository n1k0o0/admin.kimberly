import axios from "axios"
// import {ElNotification} from 'element-plus'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest'
    }
})

api.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status === 401 || error.response && error.response.status === 419) {
        if (window.location.pathname !== '/auth') {
            window.location.href = '/auth';
        }
        return
    }
    if (error.response && error.response.status === 500) {
        // ElNotification({type: 'error', title: 'Ошибка', message: 'Обратитесь к разработчикам.'})
        return;
    }
    return Promise.reject(error);
});

export default api