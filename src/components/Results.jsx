import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Winner from './Winner';

import {connect} from 'react-redux';

export const Results = React.createClass({
    mixins: [PureRenderMixin],
    
    getPair: function () {
        return this.props.pair || [];
    },
    
    getVote: function (entry) {
        let tally = this.props.tally;
        if (tally && tally.has(entry)) {
            return tally.get(entry);
        } else {
            return 0;
        }
    },
    
    render: function () {
        return this.props.winner ? <Winner ref="winner" winner={this.props.winner} /> :
            <div className="results">
                <div className="tally">
                    {this.getPair().map(entry =>
                        <div key={entry} className="entry">
                            <h1>{entry}</h1>
                            <div className="voteCount">
                                {this.getVote(entry)}
                            </div>
                        </div>
                    )}
                </div>
                <div className="management">
                    <button className="next"
                            ref="next"
                            onClick={this.props.next}>
                        Next
                    </button>
                </div>
            </div>
    }
});

function stateToProp(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    };
}

export const ResultsContainer = connect(stateToProp)(Results);