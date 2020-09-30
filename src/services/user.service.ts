import axios from 'axios';
import { Secrets } from '../environments/environment';

const api = axios.create({
  baseURL: Secrets.API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers = localStorage.googleToken ? { Authorization: `Bearer ${localStorage.googleToken}` } : {};
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const httpLogin = () => {
  return api.post<string>('/user/login').then((response) => response.data);
};
