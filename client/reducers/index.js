import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer-activeUser'
import ComplaintsReducer from './reducer-complaints'
import JustLoggedOutReducer from './reducer-justLoggedOut'
import SocketConnectionReducer from './reducer-socketConnection'
import SortComplaintsReducer from './reducer-sortComplaints'
import Localities from './reducer-localities'


const allReducers = combineReducers({
    activeUser: ActiveUserReducer,
    complaints: ComplaintsReducer,
    justLoggedOut: JustLoggedOutReducer,
    socketConnection: SocketConnectionReducer,
    sortComplaints: SortComplaintsReducer,
    localities: Localities
})

export default allReducers;
