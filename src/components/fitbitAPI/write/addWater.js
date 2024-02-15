import { createSlice } from "@reduxjs/toolkit";

export const addWater = createSlice({
    name: 'water',
    initialState: {
        // this is where you would pull fitbit api data? 
        value: 0
    },
    reducers: {
        addNewWater: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { addNewWater } = addWater.actions 

export const currAmount = (state) => state.water.value;

export default addWater.reducer