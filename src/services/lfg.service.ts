import { Game, Lfg } from '@shared/models';
import axios from 'axios';
import Environment from '@environments/environment';
import store from '../store';

const api = axios.create({
  baseURL: Environment.API_URL,
});

api.interceptors.request.use(
  function (config) {
    const state = store.getState();
    config.headers = state.core.jwt ? { Authorization: `Bearer ${state.core.jwt}` } : {};
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

export const httpJoinLfg = (command: { lfgId: string; ign: string }) => {
  return api.post<Lfg>(`/lfg/join`, command).then((response) => response);
};
