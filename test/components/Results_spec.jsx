"use strict";


import React from 'react';
import ReactDOM from 'react-dom';

import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils' // https://facebook.github.io/react/docs/test-utils.html

import {List, Map} from 'immutable';

import {expect} from 'chai'

import {Results} from '../../src/components/Results'

describe('Results', () => {
    it('Render result with vote counts or zero', () => {
        const pair = List.of("Trainspotting", "28 Days Later");
        
        const tally = Map({"28 Days Later": 75});
        
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally}></Results>
        );
        
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        
        // Render length correct
        expect(entries.length).to.equals(2);
        
        // Render content correct
        const [train, days] = entries.map(e => e.textContent);
        
        expect(train).to.contain(pair.get(0));
        expect(train).to.contain("0");
        
        expect(days).to.contain(pair.get(1));
        expect(days).to.contain("75");
    });
    
    it('renders the winner when there is one', () => {
        const pair = List.of("Trainspotting", "28 Days Later");
        
        const tally = Map({});
        const winnerName = pair.get(1);
        
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally} winner={winnerName}>
            </Results>
        );
        
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain(winnerName);
    });
});