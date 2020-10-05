import axios from 'axios';
import Environment from '@environments/environment';
import store from '../store';

const api = axios.create({
  baseURL: Environment.API_URL,
});

api.interceptors.request.use(
  function (config) {
    const state = store.getState();
    config.headers = state.core.google?.tokenId ? { Authorization: `Bearer ${state.core.google.tokenId}` } : {};
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const httpLogin = () => {
  return api.post<string>('/user/login').then((response) => response.data);
};

export const httpSignup = (param: any) => {
  return api.post<string>('/user/signup', param).then((response) => response.data);
};
