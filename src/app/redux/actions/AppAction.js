export const SET_SNACK = 'SET_SNACK'

export const setSnack = (data) => (dispatch) => {
    dispatch({
        type: SET_SNACK,
        payload: data,
    })
}