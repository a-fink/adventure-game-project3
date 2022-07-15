const { Enemy } = require("./enemy");
const { Armor } = require("./armor");
const { Weapon } = require("./weapon");
const { Food } = require("./food");

class Boss extends Enemy{
    constructor(name, description, currentRoom){
        super(name, description, currentRoom);
        // set default strength (50) & health (200)
        this.strength = 50;
        this.health = 200;
        // set a default cooldown property of 5000 ms
        this.cooldown = 5000;
        // set the default target to null - tests call this property attackTarget
        this.attackTarget = null;
        // put a weapon, an armor, and potion in its inventory
        const sword = new Weapon('broadsword', 'a badass broadsword', 30);
        const armor = new Armor('platemail', 'a shiny set of platemail', 30);
        const potion = new Food('potion', 'a superior healing potion', 100)
        this.items.push(sword, armor, potion);
        // start the process of actions
        this.act();
    }

    // overwriting inherited version - bosses don't move
    randomMove() {
        // reset the cooldown back to 5000ms
        this.cooldown += 5000;
        // don't go anywhere
    }

    // boss's don't care about sandwiches
    takeSandwich() {
        // using this to overwrite the inherited method in case it ever gets called
        // this method should do nothing
    }

    // overwriting inherited version to use boss's cooldown timing
    scratchNose() {
        this.cooldown += 5000;
        this.alert(`${this.name} scratches its nose`);
    }
}

module.exports = {
    Boss,
  };
