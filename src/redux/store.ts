import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from './rootReducer';
import {popularMoviesApi} from '../api/popularmovie';
import {persistStore} from 'redux-persist';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).prepend(
      popularMoviesApi.middleware,
    ),
});
export const peristor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
