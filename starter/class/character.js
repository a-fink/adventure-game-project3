class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    // fill in the name, description, and current room with the passed in items
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    // set health to 100 and strength to 10 by default
    this.health = 100;
    this.strength = 10;
    // set up an items array - initialize as empty array
    this.items = [];
  }

  applyDamage(amount) {
    // Fill this in
    // decrease character's health by the amount of damage received
    this.health -= amount;
    // check if health is less than or equal to 0, if it is make the character die
    if (this.health <= 0){
      this.die();
    }
  }

  die() {
    // Fill this in
    // go through items array push each item to the current room's array
    for (let i = 0; i < this.items.length; i++){
      let item = this.items[i];
      this.currentRoom.items.push(item);
    }
    // set the items array back to empty
    this.items = [];
    // set the current room to null
    this.currentRoom = null;
  }
}


module.exports = {
  Character,
};
