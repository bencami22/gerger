import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer-activeUser'
import ComplaintsReducer from './reducer-complaints'
import JustLoggedOutReducer from './reducer-justLoggedOut'
import SocketConnectionReducer from './reducer-socketConnection'

const allReducers = combineReducers({
    activeUser: ActiveUserReducer,
    complaints: ComplaintsReducer,
    justLoggedOut: JustLoggedOutReducer,
    socketConnection: SocketConnectionReducer,

})

export default allReducers;
