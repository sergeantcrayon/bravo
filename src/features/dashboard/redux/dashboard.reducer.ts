import { createSlice } from '@reduxjs/toolkit';
import { Lfg } from '@shared/models';
import { DashboardState } from './dashboard.state';
const initialState: DashboardState = {
  lfgs: [],
  loadingLfgs: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    getLfgs(state, action: { type: string; payload: any }) {
      state.loadingLfgs = true;
    },
    getLfgsSucces(state, action: { type: string; payload: Lfg[] }) {
      state.lfgs = action.payload;
      state.loadingLfgs = false;
    },
    getLfgsFailure(state) {
      state.loadingLfgs = false;
    },
    createLfg(state, action: { type: string; payload: any }) {
      state.loadingLfgs = true;
    },
    createLfgSuccess(state, action: { type: string; payload: Lfg }) {
      state.loadingLfgs = false;
    },
    createLfgFailure(state) {},
  },
});

export const { getLfgs, getLfgsSucces, getLfgsFailure, createLfg, createLfgSuccess, createLfgFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;
