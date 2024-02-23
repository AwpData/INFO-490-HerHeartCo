import { configureStore } from '@reduxjs/toolkit';
import waterReducer from '../components/fitbitAPI/write/addWater'; 
import glucoseReducer from '../components/fitbitAPI/write/editGlucose';

export default configureStore({
  reducer: {
    water: waterReducer, 
    glucose: glucoseReducer, 
    // todo: store for height, weight, steps 
    // todo: store for goals: steps, sleep, water
    // todo: store for setting personal goals 
  }
})