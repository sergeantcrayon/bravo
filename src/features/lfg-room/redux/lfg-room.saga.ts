import { httpJoinLfg, httpQueryLfg } from '@services/lfg.service';
import { Lfg } from '@shared/models';
import { message } from 'antd';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addLfgComment,
  addLfgCommentFailure,
  addLfgCommentSuccess,
  getLfg,
  getLfgFailure,
  getLfgSuccess,
  joinLfgRoom,
  joinLfgRoomFailure,
  joinLfgRoomSuccess,
} from './lfg-room.reducer';
import { httpAddLfgComment } from '@services/lfg.service';

function* getLfgSaga(action: { type: string; payload: string }) {
  const data: Lfg[] = yield call(httpQueryLfg, { _id: action.payload });
  if (data && data.length > 0) {
    yield put(getLfgSuccess(data[0]));
  } else {
    yield put(getLfgFailure());
  }
}

function* joinLfgRoomSaga(action: { type: string; payload: { lfgId: string; ign: string } }) {
  try {
    const data = yield call(httpJoinLfg, action.payload);
    yield put(joinLfgRoomSuccess(data));
  } catch (error) {
    yield put(joinLfgRoomFailure(error.response.data.message));
    message.error(error.response.data.message ?? 'An Error Occured');
  }
}

function* addLfgCommentSaga(action: { type: string; payload: { text: string; lfgId: string } }) {
  try {
    const data = yield call(httpAddLfgComment, action.payload);
    yield put(addLfgCommentSuccess(data));
  } catch (error) {
    yield put(addLfgCommentFailure());
  }
}

export default function* lfgRoomSaga() {
  yield takeLatest(getLfg, getLfgSaga);
  yield takeLatest(joinLfgRoom, joinLfgRoomSaga);
  yield takeLatest(addLfgComment, addLfgCommentSaga);
}
