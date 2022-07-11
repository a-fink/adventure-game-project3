const { Item } = require('./item');

class Food extends Item {
  constructor(name, description, hitpoints) {
    super(name, description);
    this.hitpoints = hitpoints;
  }
}

module.exports = {
  Food,
};
