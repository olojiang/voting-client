/**
 * Created by Hunter on 12/24/2016.
 */
import {Map, List} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function vote(state, entry) {
    const pair = state.getIn(['vote', 'pair']);
    
    if (pair.indexOf(entry) !== -1) {
        return state.set('hasVoted', entry);
    } else {
        return state;
    }
}

function resetState(state) {
    const pair = state.getIn(['vote', 'pair'], List());
    const entry = state.get('hasVoted');
    if (pair.includes(entry)) {
        return state.remove('hasVoted');
    } else {
        return state;
    }
}

export default function (state = Map(), action) {
    console.info("action.type=%j", action.type);
    switch (action.type) {
        case "SET_STATE":
            return resetState(setState(state, action.state));
        case "VOTE":
            return vote(state, action.entry)
    }
    
    return state;
}