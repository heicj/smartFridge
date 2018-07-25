class SmartFridgeManager {
    constructor(){
        this.inventory = {};
    }

    handleItemAdded(itemType, itemUUID, name, fillFactor){
        if(this.inventory[itemUUID]){
            this.inventory[itemUUID].fillFactor += fillFactor;
            this.inventory[itemUUID].in = true;
        } else {
            this.inventory[itemUUID] = { itemType: itemType, name: name, fillFactor: fillFactor, in: true };
        }
    }

    handleItemRemoved(itemUUID){
        const item = this.inventory[itemUUID];
        item.in = false;
        item.fillFactor -= item.fillFactor; 
    }
}

module.exports = SmartFridgeManager;