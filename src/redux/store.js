// store.js
//
// Redux store


import { configureStore, combineReducers, } from '@reduxjs/toolkit';

import userReducer from './userReducer';


const rootReducer = combineReducers({
  userReducer,
});

export const Store = configureStore({reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: false,
})});