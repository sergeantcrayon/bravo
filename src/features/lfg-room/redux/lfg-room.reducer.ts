import { createSlice } from '@reduxjs/toolkit';
import { Lfg } from '@shared/models';
import { LfgRoomState } from './lfg-room.state';
const initialState: LfgRoomState = {
  lfg: null,
  loading: false,
  commentLoading: false,
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
      state.lfg = action.payload;
      state.loading = false;
    },
    joinLfgRoomFailure(state, action: { type: string; payload: string }) {
      state.loading = false;
    },
    addLfgComment(state, action: { type: string; payload: { text: string; lfgId: string } }) {
      state.commentLoading = true;
    },
    addLfgCommentSuccess(state, action: { type: string; payload: Lfg }) {
      state.lfg = action.payload;
      state.commentLoading = false;
    },
    addLfgCommentFailure(state) {
      state.commentLoading = false;
    },
  },
});

export const {
  getLfg,
  getLfgSuccess,
  getLfgFailure,
  joinLfgRoom,
  joinLfgRoomSuccess,
  joinLfgRoomFailure,
  addLfgComment,
  addLfgCommentSuccess,
  addLfgCommentFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
