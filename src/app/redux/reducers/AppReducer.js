import {
    SET_SNACK,
} from '../actions/AppAction'

const initialState = {
    snack: {open: false, message: '', type: 'success'},
}

const AppReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_SNACK:
            debugger
            return {
                ...state,
                snack: action.payload
            };
        default:
            return state;
    }
}

export default AppReducer