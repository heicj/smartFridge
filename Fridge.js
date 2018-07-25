class SmartFridgeManager {
    constructor(){
        this.inventory = {};
    }

    handleItemAdded(itemType, itemUUID, name, fillFactor){
        if(this.inventory[itemUUID]){
            this.inventory[itemUUID].fillFactor += fillFactor;
        } else {
            this.inventory[itemUUID] = {itemType: itemType, name: name, fillFactor: fillFactor };
        }
    }
}

module.exports = SmartFridgeManager;