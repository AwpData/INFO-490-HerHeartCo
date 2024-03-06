import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import userReducer from './userReducer';


const rootReducer = combineReducers({
  userReducer,
});

export const Store = configureStore({reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: false,
})});