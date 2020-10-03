import createSagaMiddleware from 'redux-saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coreReducer from './core/redux/core.reducer';
import coreSaga from './core/redux/core.saga';
import dashboardReducer from './features/dashboard/redux/dashboard.reducer';
import dashboardSaga from './features/dashboard/redux/dashboard.saga';
import lfgRoomReducer from './features/lfg-room/redux/lfg-room.reducer';
import lfgRoomSaga from './features/lfg-room/redux/lfg-room.saga';

const reducer = combineReducers({
  core: coreReducer,
  dashboard: dashboardReducer,
  lfgRoom: lfgRoomReducer,
});

export type RootState = ReturnType<typeof reducer>;
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(coreSaga);
sagaMiddleware.run(dashboardSaga);
sagaMiddleware.run(lfgRoomSaga);

export default store;
