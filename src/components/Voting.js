/**
 * Created by Hunter on 5/12/2016.
 */
import React from 'react';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import {connect} from 'react-redux';

import Winner from './Winner';
import Vote from './Vote';

import * as actionCreators from './action_creators';

// Pure component
export const Voting = React.createClass({
    mixins: [PureRenderMixin],
    
    render() {
        return (
            <div className="Voting">
                {
                    this.props.winner ?
                        <Winner ref="winner" winner={this.props.winner}></Winner> :
                        <Vote {...this.props}></Vote>
                }
            </div>
        );
    }
});

function stateToProp(state) {
    return {
        winner: state.get('winner'),
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.get('hasVoted')
    };
}

// Container with store combined
export const VotingContainer = connect(
    stateToProp, actionCreators
)(Voting);