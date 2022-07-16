const {Character} = require('./character');

// for testing
// const {Player} = require('./player');
// const {Item} = require('./item');
// const {Room} = require('./room');
// const {Food} = require('./food');

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);
    // set a default cooldown property of 10000 ms
    this.cooldown = 10000;
    // set the default target to null - tests call this property attackTarget
    this.attackTarget = null;
    // start the process of actions
    this.act();
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    // Fill this in
    // reset the cooldown back to 10000ms
    this.cooldown += 10000;
    // get an array of valid exits from this room
    const validMoves = this.currentRoom.getExits();
    // as long as validMoves is not empty - pick a new room and go there

    if (validMoves.length !== 0){
      // generate a random integer between 0 and length-1 of valid moves array
      let min = 0;
      let max = validMoves.length - 1;
      let move = Math.floor(Math.random() * (max - min + 1) + min);
      // set the direction to be the direction contained in validMoves array at the calculated move index
      let direction = validMoves[move];
      const nextRoom = this.currentRoom.getRoomInDirection(direction);
      // update currentRoom to nextRoom (go there)
      this.currentRoom = nextRoom;
    }

    // attempt to steal sandwiches in any room you are in
    this.takeSandwich();
  }

  // enemies love sandwiches - if there's an item called sandwich in the room they will steal it!
  takeSandwich() {
    // Fill this in
    // try to pick up a sandwich in the room
    let sandwich = this.currentRoom.getItemByName("sandwich");
    // if what you got back is a sandwich (not null) put it in your inventory
    if (sandwich !== null){
      this.items.push(sandwich);
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.attackTarget && this.attackTarget.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    let enemy = this;
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      enemy.cooldown = 0;
      enemy.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  // only called when enemy has a target player already and both enemy/target are in the same room
  attack() {
    // Fill this in
    // reset the cooldown back to 10,000ms
    this.cooldown += 10000;
    // apply enemy's strength worth of damage to its target player
    this.attackTarget.applyDamage(this.strength);
  }

  applyDamage(amount) {
    // Fill this in
    // call the parent function to apply the damage and check if it has died
    super.applyDamage(amount);
    // if enemy has not been attacked before (this.attackTarger is null) set attacking player to be target
    if(this.attackTarget === null){
      this.attackTarget = this.player;
    }

    // if attack did not kill enemy let player know they hit and enemy's new health
    if (this.health > 0){
      console.log(`You hit ${this.name} for ${amount} points of damage. ${this.name}'s health: ${this.health}`);
    }
  }

  die(){
    // call the parent die method to clear items array and set room to null
    super.die();
    // tell player they killed the monster
    console.log(`You have killed ${this.name}`);
  }


  act() {
    if (this.health <= 0) {
      // Dead, do nothing
    }
    // if cooldown timer is greater than zero wait to do things
    else if (this.cooldown > 0) {
      this.rest();
    }
    // if cooldown is 0 and enemy's target is null or not in same room, move to random room
    else if (this.cooldown === 0 && (this.attackTarget === null || this.attackTarget.currentRoom !== this.currentRoom)){
      this.randomMove();
      this.rest();
    }
    // if cooldown is 0 and enemy's target is in the same room, attack them
    else if (this.cooldown === 0 && this.attackTarget.currentRoom === this.currentRoom){
      this.attack();
      this.rest();
    }
    // if cooldown is 0 and no other moves are valid, enemy should scratch it's nose
    else if (this.cooldown === 0) {
      this.scratchNose();
      this.rest();
    }
  }

  scratchNose() {
    this.cooldown += 10000;
    this.alert(`${this.name} scratches its nose`);
  }
}

// for testing
// let testRoom = new Room("test room", "a boring old test room")
// let player = new Player('player', room);
// let goblin = new Enemy('goblin', 'a goblin that loves sandwiches', testRoom);
// let sandwich = new Food('sandwich', 'a tasty sandwich');
// testRoom.items.push(sandwich);



module.exports = {
  Enemy,
};
