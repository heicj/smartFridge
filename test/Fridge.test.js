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
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 1, 'in': true } });
    });

    it('it adds to item total if item is already in fridge', () => {
        const fridge = new Fridge();
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 2, 'in': true } });
    });

    it('event handler removes item in property to false. subtracts fillFactor', () => {
        const fridge = new Fridge();
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        fridge.handleItemRemoved(1234);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 0, 'in': false } });

        fridge.handleItemAdded('dairy', 1234, 'milk', .5);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': .5, 'in': true } });
    });

    it('getItems query returns item of fillFactor less than equal to requested', () => {
        const fridge = new Fridge();
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        fridge.handleItemAdded('juice', 5678, 'orange juice', .4);
        fridge.handleItemAdded('fruit', 2468, 'apples', .3);
        const list = fridge.getItems(.5);
        assert.deepEqual(list, [['fruit', .3], ['juice', .4]]);
    });
});