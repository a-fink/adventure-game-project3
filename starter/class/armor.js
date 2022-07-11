const { Item } = require('./item');

class Armor extends Item {
  constructor(name, description, damageReduction) {
    super(name, description);
    this.damageReduction = damageReduction;
  }
}

module.exports = {
  Armor,
};
