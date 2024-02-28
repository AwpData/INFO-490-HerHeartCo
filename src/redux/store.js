import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import editGoalsReducer from '../components/editGoalActions/editGoals';

import userReducer from './reducers';

const rootReducer = combineReducers({
  userReducer,
  editGoalsReducer
});

export const Store = configureStore({reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: false,
})});

// export default configureStore({
//   reducer: {
//     water: waterReducer, 
//     glucose: glucoseReducer, 
//     selectedGoals: goalReducer,
//     // todo: store for height, weight, steps 
//     // todo: store for goals: steps, sleep, water
//     // todo: store for setting personal goals 
//   }
// })