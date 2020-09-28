import createSagaMiddleware from 'redux-saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coreReducer from './core/redux/core.reducer';
import coreSaga from './core/redux/core.saga';
import dashboardReducer from './features/dashboard/redux/dashboard.reducer';
import dashboardSaga from './features/dashboard/redux/dashboard.saga';
const reducer = combineReducers({
  core: coreReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof reducer>;
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(coreSaga);
sagaMiddleware.run(dashboardSaga);
export default store;
