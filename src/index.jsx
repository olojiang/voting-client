/**
 * Created by Hunter on 5/11/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import actionMiddleware from './components/action_middleware'

import {Provider} from 'react-redux';

import {VotingContainer} from './components/Voting';
import App from './components/App';
import {ResultsContainer} from './components/Results'

import {setState} from './components/action_creators';

import io from 'socket.io-client'

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state => {
    store.dispatch(setState(state))
});

// Create action middle ware with createStore function
const appliedActionMiddleware = applyMiddleware(actionMiddleware(socket))(createStore);

// Store with middleware
const store = appliedActionMiddleware(reducer);

// store.dispatch({
//     type: "SET_STATE",
//     state: {
//         vote: {
//             pair: ['Sunshine', '28 Days Later'],
//             tally: {'Sunshine': 3}
//         }
//     }
// });

/*
 http://localhost:8080/#/results?_k=8581jc
 http://localhost:8080/
 */
const routes = <Route component={App}>
    <Route path="/" component={VotingContainer} />
    <Route path="/results" component={ResultsContainer} />
</Route>;


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app'));