import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import waterReducer from '../components/fitbitAPI/write/addWater'; 
import glucoseReducer from '../components/fitbitAPI/write/editGlucose';
import goalReducer from '../components/editGoalActions/goals';

import userReducer from './reducers';

const rootReducer = combineReducers({
  userReducer,
  waterReducer, 
  glucoseReducer
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