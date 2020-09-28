import { call, put, takeLatest } from 'redux-saga/effects';
import { httpQueryLfg } from '../../../services/lfg.service';
import { createLfg, createLfgSuccess, getLfgs, getLfgsSucces } from './dashboard.reducer';
import { httpCreateLfg } from './../../../services/lfg.service';

function* getLfgsSaga(action: { type: string; payload: any }) {
  const data = yield call(httpQueryLfg, action.payload);
  yield put(getLfgsSucces(data));
}

function* createLfgSaga(action: { type: string; payload: any }) {
  const data = yield call(httpCreateLfg, action.payload);
  yield put(createLfgSuccess(data));
  yield put(getLfgs(null));
}

export default function* dashboardSaga() {
  yield takeLatest(getLfgs, getLfgsSaga);
  yield takeLatest(createLfg, createLfgSaga);
}
