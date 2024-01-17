import axios, { AxiosError } from 'axios';
import router from '@/router';
import { getToken, removeToken } from '@/utils/localStorageUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: false
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
    const token = getToken();
    if (error.response) {
      const excludedRoutes = ['home'];
      if (
        error.response.status === 401 ||
        error.response.status === 429 ||
        (!token && !excludedRoutes.includes(router.currentRoute.value.name as string))
      ) {
        removeToken();
        router.push({ name: 'home' });
        location.reload();
      }
      if (
        (!excludedRoutes.includes(router.currentRoute.value.name as string) &&
          error.response.status === 403) ||
        error.response.status === 422
      ) {
        router.push({ name: 'home' });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
