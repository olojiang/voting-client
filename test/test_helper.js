/**
 * Created by Hunter on 5/11/2016.
 */
import jsdom from 'jsdom';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

/*
 * Create document and window object by jsdom
 */
const doc = jsdom.jsdom('<!doctype html><html><header></header><body></body></html>');
const win = doc.defaultView;

// global is belong to node.js
global.document = doc;
global.window = win;

/*
 * Get window objects's attribute into global variable
 */
Object.keys(win).forEach((key) => {
    if (!(key in global)) {
        global[key] = win[key];
    }
});

/*
 * Setup chai to use chai-immutable
 */
chai.use(chaiImmutable);