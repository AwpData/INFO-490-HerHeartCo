import { createSlice } from "@reduxjs/toolkit";

export const editBP2 = createSlice({
    name: 'bp2',
    initialState: {
        // this is where you would initialize dexcom data? 
        value: 0
    },
    reducers: {
        editNewBP2: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { editNewBP2 } = editBP2.actions

// export const currAmount = (state) => state.water.value;

export default editBP2.reducer