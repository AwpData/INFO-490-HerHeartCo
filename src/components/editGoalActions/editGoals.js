import { ADD_WATER, UPDATE_GLUCOSE, ADD_HRV } from "../../redux/actions";

const initialState = {
    totalWater: 0, 
    glucose: 0, 
    totalHRVMin: 0
}

function editGoalsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_WATER: 
            let newWater = state.totalWater + action.payload; 
            return {...state, totalWater: newWater}; 
        case UPDATE_GLUCOSE: 
            let newGlucose = action.payload; 
            return {...state, glucose: newGlucose}; 
        case ADD_HRV: 
            let newHRVMin = state.totalHRVMin + action.payload; 
            return {...state, totalHRVMin: newHRVMin}; 
        default: 
            return state; 
    }
}

export default editGoalsReducer; 