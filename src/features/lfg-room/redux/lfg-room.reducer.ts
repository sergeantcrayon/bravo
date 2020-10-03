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
  },
});

export const { getLfg, getLfgSuccess, getLfgFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;
