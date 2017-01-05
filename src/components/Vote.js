/**
 * Created by Hunter on 5/12/2016.
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const Vote = React.createClass({
    mixins: [PureRenderMixin],
    
    getPair: function () {
        return this.props.pair || [];
    },
    
    isDisabled: function () {
        return !!this.props.hasVoted;
    },
    hasVotedFor: function (entry) {
        return this.props.hasVoted === entry;
    },
    render() {
        return (
            <div className="Vote">
                {
                    this.getPair().map(entry => {
                        return <button key={entry}
                                       onClick={() => this.props.vote(entry)}
                                       disabled={this.isDisabled()}>
                            <h1>{entry}</h1>
                            {
                                this.hasVotedFor(entry) ?
                                    <div className="label">Voted</div> :
                                    null
                            }
                        </button>;
                    })
                }
            </div>
        );
    }
});

export default Vote;