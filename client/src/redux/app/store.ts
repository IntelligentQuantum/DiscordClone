import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';

const reducers = combineReducers({});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
