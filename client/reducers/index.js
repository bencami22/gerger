import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer-activeUser'
import ComplaintsReducer from './reducer-complaints'
import JustLoggedOutReducer from './reducer-justLoggedOut'

const allReducers = combineReducers({
    activeUser: ActiveUserReducer,
    complaints: ComplaintsReducer,
    justLoggedOut: JustLoggedOutReducer

})

export default allReducers;
