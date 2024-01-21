import axios, { AxiosError } from 'axios';
import router from '@/router';
import { getToken, removeToken } from '@/utils/localStorageUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 429) {
        removeToken();
        router.replace({ name: 'home' });
      }
      if (error.response.status === 403 || error.response.status === 422) {
        router.replace({ name: 'home' });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
