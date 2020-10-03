import { httpQueryLfg } from '@services/lfg.service';
import { Lfg } from '@shared/models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getLfg, getLfgFailure, getLfgSuccess } from './lfg-room.reducer';

function* getLfgSaga(action: { type: string; payload: string }) {
  const data: Lfg[] = yield call(httpQueryLfg, { _id: action.payload });
  if (data && data.length > 0) {
    yield put(getLfgSuccess(data[0]));
  } else {
    yield put(getLfgFailure());
  }
}

export default function* lfgRoomSaga() {
  yield takeLatest(getLfg, getLfgSaga);
}
