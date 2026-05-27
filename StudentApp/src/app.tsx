const TOKEN_KEY = 'token';

export const request = {
  prefix: 'http://server:8080',
  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers = {
          ...(config.headers || {}),
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
      const pathname = window.location.pathname;

      if (!token && pathname !== '/login') {
        window.location.replace('/login');
      }
    },
  };
};