const assert = require('assert');
const Fridge = require('../Fridge');

describe('smart fridge class tests', () => {
    it('smart fridge inventory defaults to empty {}', () => {
        const fridge = new Fridge();
        assert.deepEqual(fridge.inventory, {});
    });
});