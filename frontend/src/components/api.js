import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true , // This ensures cookies are sent with requests
});
api.interceptors.request.use(
    (config) => {
        const csrf_token = localStorage.getItem('csrf_token');
        if(csrf_token)
            (config.headers['X-CSRFToken'] = csrf_token);

        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)

export default api;
