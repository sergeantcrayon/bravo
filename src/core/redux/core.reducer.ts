import { createSlice } from '@reduxjs/toolkit';
import { CoreState } from './core.state';
import { GoogleLoginResponse } from 'react-google-login';
import { Game, User } from '@shared/models';
const initialState: CoreState = {
  google: null,
  games: null,
  user: null,
  signupModal: false,
  jwt: null,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState: initialState,
  reducers: {
    googleLogin(state, action: { type: string; payload: GoogleLoginResponse }) {
      state.google = action.payload;
      state.jwt = action.payload.tokenId;
    },
    logout(state) {
      state.google = null;
      state.user = null;
      state.jwt = null;
    },
    login(state, action: { type: string; payload: { user: User; token: string } }) {
      state.user = action.payload.user;
      state.jwt = action.payload.token;
      state.signupModal = false;
    },
    setSignupModal(state, action: { type: string; payload: boolean }) {
      state.signupModal = action.payload;
    },
    signup(state, action: { type: string; payload: any }) {},
    getGames() {},
    getGamesSuccess(state, action: { type: string; payload: Game[] }) {
      state.games = action.payload;
    },
    getGamesFailure() {},
  },
});

export const { login, googleLogin, logout, setSignupModal, signup, getGames, getGamesSuccess, getGamesFailure } = coreSlice.actions;
export default coreSlice.reducer;
