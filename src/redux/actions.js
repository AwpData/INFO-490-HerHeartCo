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

export const ADD_WATER_LOG = 'ADD_WATER_LOG';
export const addWaterLog = newWaterEntry => dispatch => {
    dispatch({
        type: ADD_WATER_LOG, 
        payload: newWaterEntry
    })
}

export const DELETE_WATER_LOG = 'DELETE_WATER_LOG';
export const deleteWaterLog = waterEntry => dispatch => {
    dispatch({
        type: DELETE_WATER_LOG, 
        payload: waterEntry
    })
}

export const UPDATE_GLUCOSE = 'UPDATE_GLUCOSE'; 
export const updateGlucose = newGlucose => dispatch => {
    dispatch({
        type: UPDATE_GLUCOSE, 
        payload: newGlucose
    })
}

export const EDIT_SLEEP = 'EDIT_SLEEP'; 
export const editSleep = newSleep => dispatch => {
    dispatch({
        type: EDIT_SLEEP,
        payload: newSleep
    })
}

export const ADD_HRV = 'ADD_HRV'; 
export const addHRV = newAmount => dispatch => {
    dispatch({
        type: ADD_HRV, 
        payload: newAmount
    })
}

export const UPDATE_BREAKFAST = 'UPDATE_BREAKFAST';
export const updateBreakfast = newPicture => dispatch => {
    dispatch({
        type: UPDATE_BREAKFAST, 
        payload: newPicture
    })
}

export const UPDATE_LUNCH = 'UPDATE_LUNCH';
export const updateLunch = newPicture => dispatch => {
    dispatch({
        type: UPDATE_LUNCH, 
        payload: newPicture
    })
}

export const UPDATE_DINNER = 'UPDATE_DINNER';
export const updateDinner = newPicture => dispatch => {
    dispatch({
        type: UPDATE_DINNER, 
        payload: newPicture
    })
}