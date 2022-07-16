const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const {Weapon} = require('./weapon');
const {Armor} = require('./armor');
const {Room} = require('./room');
const {Buff} = require('./buff');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
    // set default weapon and armor values to null - players will be able to carry one of each at a time
    this.weapon = null;
    this.armor = null;
    this.damageReduction = 0;
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    }
    else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Fill this in
    // get item from room's array
    let newItem = this.currentRoom.getItemByName(itemName);
    // if item you got back exists (not null) put it in player array
    if (newItem !== null){
      // if item is a weapon call add weapon method
      if (newItem instanceof Weapon){
        this.addWeapon(newItem);
      }
      // if item is armor call add armor method
      else if (newItem instanceof Armor){
        this.addArmor(newItem);
      }
      // otherwise put the item in the item array
      else{
        this.items.push(newItem);
      }
    }
  }

  // if given item is a weapon and player doesn't already have one set the weapon property and add the strenth bonus, and put item in items array
  // otherwise tell player they can only have 1 weapon at a time and put the item back in the room's array
  addWeapon(item){
    if (this.weapon === null){
      this.items.push(item);
      this.weapon = item;
      this.strength += this.weapon.strengthBonus;
      console.log(`You picked up ${item.description}. Strength increased to ${this.strength}.`);
    }
    else{
      this.currentRoom.items.push(item);
      console.log(`You can only carry one weapon. Drop ${this.weapon.name} first if you want to pick up ${item.name}`);
    }
  }

  // if item is a weapon, set item property back to null and remove strength bonus, otherwise do nothing
  // tell player that they dropped a weapon and their strength decreased
  removeWeapon(item){
    if (item instanceof Weapon){
      this.strength -= this.weapon.strengthBonus;
      this.weapon = null;
      console.log(`You dropped ${item.description}. Strength decreased to ${this.strength}.`);
    }
  }

  // if given item is armor and player doesn't already have one set the armor property and add the damage reduction, and put item in items array
  // otherwise tell player they can only have 1 armor at a time and put the item back in the room's array
  addArmor(item){
    if (this.armor === null){
      this.items.push(item);
      this.armor = item;
      this.damageReduction += this.armor.damageReduction;
      console.log(`You picked up ${item.description}. Damage reduction increased to ${this.damageReduction}.`);
    }
    else{
      this.currentRoom.items.push(item);
      console.log(`You can only wear one piece of armor. Drop ${this.armor.name} first if you want to pick up ${item.name}`);
    }
  }

  // if given item is armor set armor property back to null, otherwise do nothing
  // tell player that they dropped the armor and their damage reduction decreased
  removeArmor(item){
    if (item instanceof Armor){
      this.damageReduction -= this.armor.damageReduction;
      this.armor = null;
      console.log(`You dropped ${item.description}. Damage reduction decreased to ${this.damageReduction}.`);
    }
  }

  dropItem(itemName) {
    // Fill this in
    // get item from players item array
    let newItem = this.getItemByName(itemName);
    // if item returned exits (not null) put it in the current room's array
    if (newItem !== null){
      this.currentRoom.items.push(newItem);

      // run armor and weapon removal on item (if not a weapon/armor these won't change anything)
      this.removeWeapon(newItem);
      this.removeArmor(newItem);
    }
  }

  eatItem(itemName) {
    // Fill this in
    let removed = false;
    // go through item array in the player inventory
    // for each item object in the array check if its name is the same name as the name we're looking for
    // if it is, check if the item with the matching name is of type food
    // if both true, remove food item from items array, increase health by the food's hitpoint value, and tell player
    for (let i = 0; i < this.items.length; i++){
      let item = this.items[i];
      if (item.name === itemName){
          if (item instanceof Food){
              this.health += item.hitpoints;
              console.log(`You ate ${item.description}. Health increased to ${this.health}.`);
              this.items.splice(i, 1);
              removed = true;
          }
      }
    }

    // after search all items, if removed is still false, tell player the item they tried to eat is not food
    if(removed === false){
      console.log(`${itemName} is not edible.`);
    }
  }

  useItem(itemName){
    let itemUsed = false;
    // go through item array in player inventory
    // for each item in the array check if its name is the same name as what we're looking for
    // if find, check if item is of type Buff
    // if both true, send item to useBuff helper
    for (let i =0; i < this.items.length; i++){
      let item = this.items[i];
      if(item.name === itemName){
        if(item instanceof Buff){
          this.useBuff(item);
          itemUsed = true;
        }
      }
    }
    // after search all items, if found is still false, tell player the item they tried to use is not a buff
    if (itemUsed === false){
      console.log(`${itemName} is not a buff.`);
    }
  }

  useBuff(buff){
    // if used property is true, the item has already been used, tell player they can't use it again
    if (buff.used === true){
      console.log(`${buff.name} has already been used`);
    }
    else{
      // if not used, increase strength by the bonus amount, and tell player
      let duration = buff.duration;
      this.strength += buff.strengthBonus;
      console.log(`You used ${buff.description}. Your strength has been increased to ${this.strength} for ${duration / 1000} seconds.`);
      // set used to true and buff duration to 0, and set timout for duration, once timeout finishes call removeBuff helper
      buff.used = true;
      buff.duration = 0;
      setTimeout(() => this.removeBuff(buff), duration);
    }
  }

  removeBuff = (buff) => {
    if(buff.duration === 0){
      this.strength -= buff.strengthBonus;
    }
  }

  getItemByName(name) {
    // Fill this in
    // go through the item array in the player inventory
    // for each item object in the array check if its name is the same as the name we're looking for
    // if it is remove it from the player's array and return it
    for (let i = 0; i < this.items.length; i++){
      let item = this.items[i];
      if (item.name === name){
          this.items.splice(i, 1);
          return item;
      }
    }

    // if make it this far return null
    return null;
  }

  hit(name) {
    // Fill this in
    // try to get the enemy in the same room with the given name
    let enemy = this.currentRoom.getEnemyByName(name);

    // if enemy is in the room (didn't get a null result)
    // apply player's strength worth of damage to the enemy and tell enemy which player hit it
    if (enemy !== null){
      enemy.applyDamage(this.strength);
    }
  }

  // override parent's apply damage to show new health after hit
  applyDamage(amount){
    let totalDamage = amount - this.damageReduction;
    // if damage reduction negates damage
    if (totalDamage <= 0){
      // do nothing
      console.log(`You were hit for 0 points of damage. Health: ${this.health}`);
    }
    else {
      // call parent apply damage method on damage that gets through
      super.applyDamage(totalDamage);
      // if die it will auto quit, if it doesn't and reaches the below code, let player know they were hit and their new health
      console.log(`You were hit for ${totalDamage} points of damage. Health: ${this.health}`);
    }
  }

  die() {
    // call the parent die method to clear items array and set room to null
    super.die();
    // tell player they have died & exit
    console.log("You are dead!");
    process.exit();
  }
}

// for testing only
// let testRoom = new Room('test room', 'a boring test room');
// let testPlayer = new Player('player', testRoom);
// let sword = new Weapon('sword', 'a sharp sword', 10);
// let betterSword = new Weapon('better', 'a better sword', 15);
// let helmet = new Armor('helmet', 'a tinfoil hat', 5);
// let leather = new Armor('leather', 'a leather breastplate', 10);
// let sandwich = new Food('sandwich', 'a tatsy sandwich', 10);
// testRoom.items.push(sandwich);
// testRoom.items.push(sword);
// testRoom.items.push(helmet);
// testRoom.items.push(betterSword);
// testRoom.items.push(leather);
// console.log(`player health is ${testPlayer.health}`);
// console.log(`player strength is ${testPlayer.strength}`);
// console.log(`player damage reduction is ${testPlayer.damageReduction}`)
// testPlayer.takeItem('sword');
// testPlayer.takeItem('sandwich');
// testPlayer.takeItem('helmet');
// console.log(`room's array has ${testRoom.items.length} items`);
// testPlayer.takeItem('better');
// testPlayer.takeItem('leather');
// console.log(`room's array has ${testRoom.items.length} items`);
// testPlayer.eatItem('sword');
// testPlayer.eatItem('sandwich');
// testPlayer.dropItem('sword');
// testPlayer.dropItem('helmet');
// console.log(`room's array has ${testRoom.items.length} items`);
// testPlayer.takeItem('better');
// testPlayer.takeItem('leather');
// console.log(`room's array has ${testRoom.items.length} items`);

module.exports = {
  Player,
};
