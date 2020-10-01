import { Game, Lfg } from '@shared/models';
import axios from 'axios';
import Environment from '@environments/environment';

const api = axios.create({
  baseURL: Environment.API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers = localStorage.token ? { Authorization: `Bearer ${localStorage.token}` } : {};
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const httpGetGames = () => {
  return api.get<Game[]>(`/games`).then((response) => response.data);
};

export const httpQueryLfg = (query: any) => {
  return api.post<Lfg[]>(`/lfg/query`, query).then((response) => response.data);
};

export const httpCreateLfg = (command: any) => {
  return api.post<Lfg>(`/lfg`, command).then((response) => response.data);
};
