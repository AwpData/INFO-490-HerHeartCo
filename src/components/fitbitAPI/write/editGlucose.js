import { createSlice } from "@reduxjs/toolkit";

export const editGlucose = createSlice({
    name: 'glucose',
    initialState: {
        // this is where you would initialize dexcom data? 
        value: 0
    },
    reducers: {
        editNewGlucose: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { editNewGlucose } = editGlucose.actions 

// export const currAmount = (state) => state.water.value;

export default editGlucose.reducer