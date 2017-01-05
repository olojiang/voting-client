import React from 'react';
import {List, Map} from 'immutable';

// List for the child
const pair = List.of('Trainspotting', '28 Days Later');

export default React.createClass({
    render: function () {
        return React.cloneElement(this.props.children,
            {
                pair: pair,
                tally: tally
            })
    }
});