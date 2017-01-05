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

import {Voting} from '../../src/components/Voting'

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(<Voting pair={["Trainspotting", "28 Days Later"]} />);
        
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        
        expect(buttons.length).to.equals(2);
        expect(buttons[0].textContent).to.equals("Trainspotting");
        expect(buttons[1].textContent).to.equals("28 Days Later");
    });
    
    it('Invokes callback when a button is clicked', () => {
        let voteWidth;
        const vote = (entry) => voteWidth = entry;
        
        let pair = ["Trainspotting", "28 Days Later"];
        const component = renderIntoDocument(<Voting pair={pair} vote={vote} />);
        
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        
        // Simulate the button click
        Simulate.click(buttons[0]);
        
        // Check the effect of click callback
        expect(voteWidth).to.equal(pair[0])
    });
    
    it('After click it will disable the button', () => {
        let voteWidth;
        const vote = (entry) => voteWidth = entry;
        
        let pair = ["Trainspotting", "28 Days Later"];
        const component = renderIntoDocument(<Voting pair={pair}
                                                     vote={vote}
                                                     hasVoted={pair[0]}
        />);
        
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        
        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute("disabled")).to.equal(true);
        expect(buttons[1].hasAttribute("disabled")).to.equal(true);
        
        // Simulate the button click
        Simulate.click(buttons[0]);
        
        // Check the effect of click callback, disabled, can not click
        expect(voteWidth).to.equal(undefined);
        
        // Check containing dom with voted
        const label = scryRenderedDOMComponentsWithClass(component, 'label');
        expect(label[0].textContent).to.equal("Voted");
    });
    
    it('Has voted button will has the Voted text, other one not', () => {
        let pair = ["Trainspotting", "28 Days Later"];
        const component = renderIntoDocument(<Voting pair={pair}
                                                     hasVoted={pair[1]}
        />);
        
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        
        expect(buttons[1].textContent).to.contain('Voted');
        expect(buttons[0].textContent).to.not.contain('Voted');
    });
    
    it('Test winner state', () => {
        let pair = ["Trainspotting", "28 Days Later"];
        const component = renderIntoDocument(<Voting pair={pair}
                                                     winner={pair[1]}
        />);
        
        // Check no buttons
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equals(0);
        
        // Check winner
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contains(pair[1]);
    });
    
    it('renders a pure component', () => {
        // To make pure component, need to provide the pure list
        let pair = List.of("Trainspotting", "28 Days Later"); // Immutable list construction
        
        // Render into container, which simulate the re-render process
        const container = document.createElement('div');
        let component = ReactDOM.render(<Voting pair={pair} />, container);
        
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        
        expect(buttons.length).to.equals(2);
        expect(buttons[0].textContent).to.equals("Trainspotting");
        expect(buttons[1].textContent).to.equals("28 Days Later");
        
        // Create a new list from existing immutable list
        const newPair = pair.set(0, "Sunshine");
        component = ReactDOM.render(<Voting pair={newPair} />, container);
        
        // Render content must be correct
        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equals("Sunshine");
    });
});