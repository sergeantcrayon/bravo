import { getGames, getGamesSuccess, googleLogin, login } from './core.reducer';
import { call, put, takeEvery } from 'redux-saga/effects';
import { GoogleLoginResponse } from 'react-google-login';
import { httpGetGames } from '../../services/lfg.service';
import { httpLogin } from './../../services/user.service';
import jwt_decode from 'jwt-decode';

function* googleLoginSaga(action: { type: string; payload: GoogleLoginResponse }) {
  localStorage.googleToken = action.payload.tokenId;
  try {
    const data = yield call(httpLogin);
    localStorage.token = data;
    var decoded = jwt_decode(data);
    yield put(login(decoded['_doc']));
  } catch (error) {
    // Ask to signup
    console.log(error);
  }
}

function* getGamesSaga(action: { type: string }) {
  const data = yield call(httpGetGames);
  yield put(getGamesSuccess(data));
}

export default function* coreSaga() {
  yield takeEvery(googleLogin, googleLoginSaga);
  yield takeEvery(getGames, getGamesSaga);
}
