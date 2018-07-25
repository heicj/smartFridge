const assert = require('assert');
const Fridge = require('../Fridge');

describe('smart fridge default test', () => {
    it('smart fridge inventory defaults to empty {}', () => {
        const fridge = new Fridge();
        assert.deepEqual(fridge.inventory, {});
    });
});

describe('smart fridge class tests', () => {
    let fridge = null;

    beforeEach(function(){
        fridge = new Fridge();
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
    });

    it('adds item to fridge', () => {
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 1, 'in': true } });
    });

    it('it adds to item total if item is already in fridge', () => {
        fridge.handleItemAdded('dairy', 1234, 'milk', 1);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 2, 'in': true } });
    });

    it('event handler removes item "in" property to false. subtracts fillFactor', () => {
        fridge.handleItemRemoved(1234);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': 0, 'in': false } });

        fridge.handleItemAdded('dairy', 1234, 'milk', .5);
        assert.deepEqual(fridge.inventory, { 1234: { 'itemType': 'dairy', 'name': 'milk', 'fillFactor': .5, 'in': true } });
    });

    it('getItems query returns item of fillFactor less than or equal to argument given', () => {
        fridge.handleItemAdded('juice', 5678, 'orange juice', .4);
        fridge.handleItemAdded('fruit', 2468, 'apples', .3);
        const list = fridge.getItems(.5);
        assert.deepEqual(list, [['fruit', .3], ['juice', .4]]);
    });

    it('getFillFactor returns avg fill factor of item type. Ignores empty containers in avg', () => {
        fridge.handleItemAdded('dairy', 5678, 'chocolate milk', .5);
        fridge.handleItemAdded('dairy', 1278, 'almond milk', .0);
        const avg = fridge.getFillFactor('dairy');
        assert.equal(avg, .75);
    });

    it('forgetItem method keeps item from being added to getItems query list', () => {
        fridge.forgetItem('dairy');
        const list = fridge.getItems(1);
        assert.deepEqual(list, []);
    });
});