import { createSlice } from "@reduxjs/toolkit";

export const editBP1 = createSlice({
    name: 'bp1',
    initialState: {
        // this is where you would initialize dexcom data? 
        value: 0
    },
    reducers: {
        editNewBP1: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { editNewBP1 } = editBP1.actions 

// export const currAmount = (state) => state.water.value;

export default editBP1.reducer