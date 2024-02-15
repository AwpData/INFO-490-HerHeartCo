import { createSlice } from "@reduxjs/toolkit";

export const addWater = createSlice({
    name: 'water',
    initialState: {
        // this is where you would pull fitbit api data? 
        value: 0
    },
    reducers: {
        addAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { addAmount } = addWater.actions 

export const currAmount = (state) => state.water.value;

export default addWater.reducer