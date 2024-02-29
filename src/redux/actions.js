export const TOGGLE_BOOLEAN = 'TOGGLE_BOOLEAN'; 
export const toggleObjectBoolean = objectId => dispatch => {
    dispatch({
        type: TOGGLE_BOOLEAN, 
        payload: objectId
    })
}

export const TOGGLE_EXERCISE = 'TOGGLE_EXERCISE'; 
export const toggleExercise = goalsList => dispatch => {
    dispatch({ 
        type: TOGGLE_EXERCISE, 
        payload: goalsList
    })
}

export const UPDATE_GOALS = 'UPDATE_GOALS'; 
export const updateGoals = goalsList => dispatch => {
    dispatch({
        type: UPDATE_GOALS, 
        payload: goalsList
    })
}

export const ADD_WATER = 'ADD_WATER';
export const addWater = newAmount => dispatch => {
    dispatch({
        type: ADD_WATER, 
        payload: newAmount
    })
}

export const UPDATE_GLUCOSE = 'UPDATE_GLUCOSE'; 
export const updateGlucose = newGlucose => dispatch => {
    dispatch({
        type: UPDATE_GLUCOSE, 
        payload: newGlucose
    })
}

export const ADD_HRV = 'ADD_HRV'; 
export const addHRV = newAmount => dispatch => {
    dispatch({
        type: ADD_HRV, 
        payload: newAmount
    })
}