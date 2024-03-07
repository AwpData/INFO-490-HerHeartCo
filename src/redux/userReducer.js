import { TOGGLE_BOOLEAN, UPDATE_GOALS, ADD_WATER, ADD_WATER_LOG, DELETE_WATER_LOG, UPDATE_GLUCOSE, ADD_GLUCOSE_LOG, DELETE_GLUCOSE_LOG, ADD_HRV, TOGGLE_EXERCISE, EDIT_SLEEP, UPDATE_BREAKFAST, UPDATE_LUNCH, UPDATE_DINNER } from "./actions";


const initialState = {
    allGoals: [ 
        {id: 1, category: 'EXERCISE', title: 'Exercise for 3 times/ Week', isSelected: false, recommendation: 'Any movement of 20 minutes or more counts whether that is a brisk walk, run, or a workout class is totally up to you. You choose which movement is best for your body. This goal will increase your heart rate, improve your aerobic fitness, muscle recovery and endurance.'}, 
        {id: 2, category: 'STEPS', title: 'Move 5,000 Steps/ Daily', isSelected: false, recommendation: 'The best way to get your steps up is to do a short, 3-5 minute walk (250 steps) every hour. This helps to move stagnation and enhance circulation evenly throughout the day.'},
        {id: 3, category: 'WATER', title: 'Drink 7 Glasses of Water / Daily', isSelected: false, recommendation: 'Tracking your water intake is the first step in making sure you are staying hydrated on a regular basis. Hydration is essential for detoxification, lubrication of your joints and good digestion. Drinking 7 glasses of water or half of your body weight in ounces will boost energy and focus too!'},
        {id: 4, category: 'SLEEP', title: 'Sleep 7 hours/ Daily', isSelected: false, recommendation: 'Sleep 7 hours a day'},
        {id: 5, category: 'HRV', title: 'Meditate for 15mins / Daily', isSelected: false, recommendation: 'HRV measures your resiliency to everyday stressors that are both internal and external. To increase your HRV, training your breathing patterns to have a slightly longer time exhaling than inhaling is essential and is called resonance breathing. To train, set aside 10-20 minutes, twice daily in a comfortable place. Inhale for a count of 4 and exhale for a count of 6.'},
    ], 
    exercise: false, 
    totalWater: 0, 
    waterLog: [], 
    glucose: 0, 
    glucoseLog: [],
    sleep: 0, 
    totalHRVMin: 0,
    meals: {
        breakfast: null, 
        lunch: null, 
        dinner: null
    },
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_BOOLEAN:
            let toggledGoalsList = state.allGoals.map((goal) =>
                goal.id === action.payload.id
                ? { ...goal, isSelected: !goal.isSelected }
                : goal )
            ;
            return {...state, allGoals: toggledGoalsList};
        case UPDATE_GOALS: 
            let newGoalsList = action.payload.map((goal) => goal);
            return {...state, allGoals: newGoalsList};
        case TOGGLE_EXERCISE: 
            let newExercise = action.payload; 
            return {...state, exercise: newExercise};
        case ADD_WATER: 
            let newWater = state.totalWater + action.payload; 
            return {...state, totalWater: newWater}; 
        case ADD_WATER_LOG: 
            let newWaterEntry = action.payload; 
            let largerWaterList = state.waterLog.map((entry) => entry);
            largerWaterList.push(newWaterEntry);
            return {...state, waterLog: largerWaterList};
        case DELETE_WATER_LOG: 
            let deleteWaterEntry = action.payload; 
            let lessWater = state.totalWater - deleteWaterEntry; 
            let shrinkWaterList = state.waterLog.filter((entry) => entry !== deleteWaterEntry);
            return {...state, totalWater: lessWater, waterLog: shrinkWaterList};
        case UPDATE_GLUCOSE: 
            let newGlucose = action.payload; 
            return {...state, glucose: newGlucose}; 
        case ADD_GLUCOSE_LOG: 
            let newGlucoseEntry = action.payload; 
            let largerGlucoseList = state.glucoseLog.map((entry) => entry); 
            largerGlucoseList.push(newGlucoseEntry);
            return {...state, glucoseLog: largerGlucoseList};
        case DELETE_GLUCOSE_LOG: 
            let deleteGlucoseEntry = action.payload; 
            let shrinkGlucoseList = state.glucoseLog.filter((entry) => entry !== deleteGlucoseEntry);
            return {...state, glucoseLog: shrinkGlucoseList};
        case EDIT_SLEEP: 
            let newSleep = action.payload; 
            return {...state, sleep: newSleep};
        case ADD_HRV: 
            let newHRVMin = state.totalHRVMin + action.payload; 
            return {...state, totalHRVMin: newHRVMin}; 
        case UPDATE_BREAKFAST:
            let newBreakfast = action.payload; 
            return {... state, meals: {...state.meals, breakfast: newBreakfast}};
        case UPDATE_LUNCH: 
            let newLunch = action.payload; 
            return {...state, meals: {...state.meals, lunch: newLunch}};
        case UPDATE_DINNER:
            let newDinner = action.payload; 
            return {...state, meals: {...state.meals, dinner: newDinner}};
        default: 
            return state; 
    }
}

export default userReducer; 