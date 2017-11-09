import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer-activeUser'
import ComplaintsReducer from './reducer-complaints'

const allReducers = combineReducers({
    activeUser: ActiveUserReducer,
    complaints: ComplaintsReducer
})

export default allReducers;
