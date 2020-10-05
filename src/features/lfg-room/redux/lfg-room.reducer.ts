import { createSlice } from '@reduxjs/toolkit';
import { Lfg } from '@shared/models';
import { LfgRoomState } from './lfg-room.state';
const initialState: LfgRoomState = {
  lfg: null,
  loading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    getLfg(state, action: { type: string; payload: string }) {
      state.loading = true;
    },
    getLfgSuccess(state, action: { type: string; payload: Lfg }) {
      state.lfg = action.payload;
      state.loading = false;
    },
    getLfgFailure(state) {
      state.loading = false;
    },
    joinLfgRoom(state, action: { type: string; payload: { lfgId: string; ign: string } }) {
      state.loading = true;
    },
    joinLfgRoomSuccess(state, action) {
      state.loading = false;
    },
    joinLfgRoomFailure(state, action: { type: string; payload: string }) {
      state.loading = false;
    },
  },
});

export const { getLfg, getLfgSuccess, getLfgFailure, joinLfgRoom, joinLfgRoomSuccess, joinLfgRoomFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;
