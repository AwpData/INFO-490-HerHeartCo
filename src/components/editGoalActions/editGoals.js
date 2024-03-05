import { ADD_WATER, UPDATE_GLUCOSE, ADD_HRV, TOGGLE_EXERCISE, EDIT_SLEEP, UPDATE_BREAKFAST, UPDATE_LUNCH, UPDATE_DINNER } from "../../redux/actions";

const initialState = {
    exercise: false, 
    totalWater: 0, 
    glucose: 0, 
    sleep: 0, 
    totalHRVMin: 0,
    breakfast: null, 
    lunch: null, 
    dinner: null
}

function editGoalsReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_EXERCISE: 
            let newExercise = action.payload; 
            return {...state, exercise: newExercise};
        case ADD_WATER: 
            let newWater = state.totalWater + action.payload; 
            return {...state, totalWater: newWater}; 
        case UPDATE_GLUCOSE: 
            let newGlucose = action.payload; 
            return {...state, glucose: newGlucose}; 
        case EDIT_SLEEP: 
            let newSleep = action.payload; 
            return {...state, sleep: newSleep};
        case ADD_HRV: 
            let newHRVMin = state.totalHRVMin + action.payload; 
            return {...state, totalHRVMin: newHRVMin}; 
        case UPDATE_BREAKFAST:
            let newBreakfast = action.payload; 
            return {... state, breakfast: newBreakfast};
        case UPDATE_LUNCH: 
            let newLunch = action.payload; 
            return {...state, lunch: newLunch};
        case UPDATE_DINNER:
            let newDinner = action.payload; 
            return {...state, dinner: newDinner};
        default: 
            return state; 
    }
}

export default editGoalsReducer; 