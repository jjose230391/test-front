import { combineReducers } from 'redux'
import AppReducer from "./AppReducer";

const RootReducer = combineReducers({
    appReducer: AppReducer,
})

export default RootReducer
