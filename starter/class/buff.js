const { Item } = require('./item');

class Buff extends Item {
    constructor(name, description, bonus, duration){
        super(name, description);
        this.strengthBonus = bonus;
        this.duration = duration;
        this.used = false;
    }
}

module.exports = {
    Buff,
  };
