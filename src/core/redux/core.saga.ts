import { getGames, getGamesSuccess, login } from './core.reducer';
import { call, put, takeEvery } from 'redux-saga/effects';
import { GoogleLoginResponse } from 'react-google-login';
import { httpGetGames } from '../../services/lfg.service';

function* loginSaga(action: { type: string; payload: GoogleLoginResponse }) {
  localStorage.token = yield action.payload.tokenId;
}

function* getGamesSaga(action: { type: string }) {
  const data = yield call(httpGetGames);
  yield put(getGamesSuccess(data));
}

export default function* coreSaga() {
  yield takeEvery(login, loginSaga);
  yield takeEvery(getGames, getGamesSaga);
}
