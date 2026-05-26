import { history, type RequestConfig } from '@umijs/max';

const TOKEN_KEY = 'token';

export const request: RequestConfig = {
  baseURL: 'https://localhost:60974',
  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
  ],
};

export const layout = () => {
  return {
    onPageChange: () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const pathname = history.location.pathname;

      if (!token && pathname !== '/login') {
        history.push('/login');
      }
    },
  };
};