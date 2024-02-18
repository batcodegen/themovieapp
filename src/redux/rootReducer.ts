import AsyncStorage, {
  AsyncStorageStatic,
} from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import authReducer from './authReducer';
import {popularMoviesApi} from '../api/popularmovie';
type PersistConfigType = {
  key: string;
  storage: AsyncStorageStatic;
};
const persistConfig: PersistConfigType = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const rootReducer = combineReducers({
  auth: persistedReducer,
  [popularMoviesApi.reducerPath]: popularMoviesApi.reducer,
});

export default rootReducer;
