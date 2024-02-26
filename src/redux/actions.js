export const TOGGLE_BOOLEAN = 'TOGGLE_BOOLEAN'; 

export const toggleObjectBoolean = objectId => dispatch => {
    dispatch({
        type: TOGGLE_BOOLEAN, 
        payload: objectId
    })
}
