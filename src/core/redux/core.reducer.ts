import { createSlice } from '@reduxjs/toolkit';
import { CoreState } from './core.state';
import { GoogleLoginResponse } from 'react-google-login';
import { Game } from '../../shared/models/game';
import { User } from '../../shared/models/user';
const initialState: CoreState = {
  google: null,
  games: null,
  user: null,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState: initialState,
  reducers: {
    googleLogin(state, action: { type: string; payload: GoogleLoginResponse }) {
      state.google = action.payload;
    },
    logout(state) {
      state.google = null;
      state.user = null;
    },
    login(state, action: { type: string; payload: User }) {
      state.user = action.payload;
    },
    getGames() {},
    getGamesSuccess(state, action: { type: string; payload: Game[] }) {
      state.games = action.payload;
    },
    getGamesFailure() {},
  },
});

export const { login, googleLogin, logout, getGames, getGamesSuccess, getGamesFailure } = coreSlice.actions;
export default coreSlice.reducer;
