import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/AppComponent.jsx';
import { compose, createStore } from 'redux';
import allReducers from '../reducers';
import { Provider } from 'react-redux';
import persistState from 'redux-sessionstorage';


const createPersistentStore = compose(
    persistState(["activeUser"], { key: "activeUser" }),
    persistState(["complaints"], { key: "complaints" }),
    persistState(["localities"], { key: "localities" }))(createStore)


const store = createPersistentStore(allReducers);

ReactDOM.render(
    <Provider store={store} ><App /></Provider>, document.getElementById("appComponent"));
