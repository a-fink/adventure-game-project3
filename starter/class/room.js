class Room {

  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = [];
  }

  getEnemies() {
    const { World } = require('./world');
    return World.getEnemiesInRoom(this);
  }

  printRoom() {
    console.clear();
    console.log("");
    console.log(this.name);
    console.log("");
    console.log(this.description);
    console.log("");
    if (this.getEnemies().length > 0) {
      console.log(`Enemies: ${this.getEnemies().map(enemy => enemy.name).join(", ")}`);
    }
    if (this.items.length > 0) {
      console.log(`Items: ${this.items.map(item => item.name).join(", ")}`);
    }
    console.log(this.getExitsString());
    console.log("");
  }

  getExits() {
    return Object.keys(this.exits);
  }

  getExitsString() {
    return `Exits: ${this.getExits().join(", ")}`
  }

  connectRooms(direction, connectingRoom) {

    // Check if the direction and connecting room are valid
    if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction) {
    return this.exits[direction];
  }

  getItemByName(name) {
    // Fill this in
    // go through the item array in the room
    // for each item object in the array check if its name is the same as the name we're looking for
    // if it is remove it from the room's array and return it
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

  getEnemyByName(name) {
    // Fill this in
    // get the array of all enemies in this room
    let enemiesInRoom = this.getEnemies();
    // for each enemy in the array see if it's name matches the given name
    // if it does - return it
    for (let i = 0; i < enemiesInRoom.length; i++){
      let enemy = enemiesInRoom[i];
      if(enemy.name === name){
        return enemy;
      }
    }

    // if none found return null
    return null;
  }
}

module.exports = {
  Room,
};
