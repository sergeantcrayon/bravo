import { createSlice } from '@reduxjs/toolkit';
import { CoreState } from './core.state';
import { GoogleLoginResponse } from 'react-google-login';
import { Game } from '../../shared/models/game';
const initialState: CoreState = {
  google: null,
  games: null,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState: initialState,
  reducers: {
    login(state, action: { type: string; payload: GoogleLoginResponse }) {
      state.google = action.payload;
    },
    logout(state) {
      state.google = null;
    },
    getGames() {},
    getGamesSuccess(state, action: { type: string; payload: Game[] }) {
      state.games = action.payload;
    },
    getGamesFailure() {},
  },
});

export const { login, logout, getGames, getGamesSuccess, getGamesFailure } = coreSlice.actions;
export default coreSlice.reducer;
