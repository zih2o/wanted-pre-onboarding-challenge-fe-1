import axios from 'axios';

const config = {
  baseURL: 'http://localhost:8080',
  headers: {
    ContentType: 'application/json',
  },
};

export const api = axios.create(config);

api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);