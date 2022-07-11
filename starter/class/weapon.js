const { Item } = require('./item');

class Weapon extends Item {
  constructor(name, description, bonus) {
    super(name, description);
    this.strengthBonus = bonus;
  }
}

module.exports = {
  Weapon,
};
