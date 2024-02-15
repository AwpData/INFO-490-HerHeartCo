import { configureStore } from '@reduxjs/toolkit';
import waterReducer from '../components/fitbitAPI/write/addWater'; 
import glucoseReducer from '../components/fitbitAPI/write/editGlucose';
import bpReducer1 from '../components/fitbitAPI/write/editBP1';
import bpReducer2 from '../components/fitbitAPI/write/editBP2';

export default configureStore({
  reducer: {
    water: waterReducer, 
    glucose: glucoseReducer, 
    bp1: bpReducer1,
    bp2: bpReducer2,
    // todo: store for height, weight, steps 
    // todo: store for goals: steps, sleep, water
    // todo: store for setting personal goals 
  }
})