import { configureStore } from '@reduxjs/toolkit';
import waterReducer from '../components/fitbitAPI/write/addWater'; 

export default configureStore({
  reducer: {
    water: waterReducer
  }
})