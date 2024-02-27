export const TOGGLE_BOOLEAN = 'TOGGLE_BOOLEAN'; 
export const toggleObjectBoolean = objectId => dispatch => {
    dispatch({
        type: TOGGLE_BOOLEAN, 
        payload: objectId
    })
}

export const UPDATE_GOALS = 'UPDATE_GOALS'; 
export const updateGoals = goalsList => dispatch => {
    dispatch({
        type: UPDATE_GOALS, 
        payload: goalsList
    })
}