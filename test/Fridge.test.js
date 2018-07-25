const assert = require('assert');
const Fridge = require('../Fridge');

describe('smart fridge class tests', () => {
    it('smart fridge inventory defaults to empty {}', () => {
        const fridge = new Fridge();
        assert.deepEqual(fridge.inventory, {});
    });

    it('adds item to fridge', () => {
        const fridge = new Fridge();
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 1 } });
    });

    it('it adds to item total if item is already in fridge', () => {
        const fridge = new Fridge();
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 2 } });
    });
});