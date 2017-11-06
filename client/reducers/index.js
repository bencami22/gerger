import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer-activeUser'

const allReducers = combineReducers({
    activeUser: ActiveUserReducer
})

export default allReducers;
