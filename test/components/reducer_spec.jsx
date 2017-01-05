import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../src/reducer';

describe('reducer', () => {
    it('Handle SET_STATE', () => {
        const initialState = Map();
        
        const pair = List.of("Trainspotting", "28 Days Later");
        
        let obj = {};
        obj[pair.get(1)] = 2;
        
        /*const action = {
         type: 'SET_STATE',
         state: Map({
         vote: Map({
         pair: pair,
         tally: Map(obj)
         })
         })
         };*/
        
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: pair,
                    tally: obj
                }
            }
        };
        
        const nextState = reducer(initialState, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: pair,
                tally: {"28 Days Later": 2}
            }
        }));
        
        
        const nextState2 = reducer(undefined, action);
        
        expect(nextState2).to.equal(fromJS({
            vote: {
                pair: pair,
                tally: {"28 Days Later": 2}
            }
        }));
    });
    
    it("handles SET_STATE with plain JS playload", () => {
        const initialState = Map();
        
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ["Trainspotting", "28 Days Later"],
                    tally: {
                        Trainspotting: 77
                    }
                }
            }
        };
        
        const nextState = reducer(initialState, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {
                    Trainspotting: 77
                }
            }
        }));
    });
    
    it("handle VOTE action by setting hasVoted", () => {
        const state = fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {
                    Trainspotting: 77
                }
            }
        });
        
        const action = {
            type: 'VOTE',
            entry: "Trainspotting"
        };
        
        const nextState = reducer(state, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {
                    Trainspotting: 77
                }
            },
            hasVoted: "Trainspotting"
        }));
    });
    
    it("handle invalid VOTE action by NOT setting hasVoted", () => {
        const state = fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {
                    Trainspotting: 77
                }
            }
        });
        
        const action = {
            type: 'VOTE',
            entry: "Unknown Movie"
        };
        
        const nextState = reducer(state, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {
                    Trainspotting: 77
                }
            }
        }));
    });
    
    it("When pair changed, need to reset hasVoted", () => {
        const state = fromJS({
            vote: {
                pair: ["Loser", "28 Days Later"],
                tally: {
                    Winner: 77
                }
            },
            hasVoted: "Loser"
        });
        
        const action = {
            type: 'SET_STATE',
            state: fromJS({
                vote: {
                    pair: ["Loser", "Winner"],
                    tally: {
                        Winner: 111
                    }
                }
            })
        };
        
        const nextState = reducer(state, action);
        
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Loser", "Winner"],
                tally: {
                    Winner: 111
                }
            }
        }));
    });
});