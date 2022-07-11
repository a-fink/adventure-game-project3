module.exports = {
  rooms: [
    {
      id: 1,
      name: "Crossroad",
      description: "You are standing at a crossroad. To the north, east, south and west you see empty space, waiting to be filled.",
      exits: {n: 2, e: 4, w: 8, s: 6}
    },
    {
      id: 2,
      name: "Northern point",
      description: "You are standing at the north point of a crossroad. To the south, west, and east, you see an empty intersection.",
      exits: {s: 1, e: 3, w: 9}
    },
    {
      id: 3,
      name: "Northeastern point",
      description: "You are standing at the northeastern point of a crossroad. To the west and south, you see an empty intersection.",
      exits: {w: 2, s: 4}
    },
    {
      id: 4,
      name: "Eastern point",
      description: "You are standing at the east point of a crossroad. To the west, north, and south, you see an empty intersection.",
      exits: {w: 1, n: 3, s: 5}
    },
    {
      id: 5,
      name: "Southeastern point",
      description: "You are standing at the southeastern point of a crossroad. To the west and north, you see an empty intersection.",
      exits: {w: 6, n: 4}
    },
    {
      id: 6,
      name: "Southern point",
      description: "You are standing at the south point of a crossroad. To the north, west, and east, you see an empty intersection.",
      exits: {n: 1, e: 5, w: 7}
    },
    {
      id: 7,
      name: "Southwestern point",
      description: "You are standing at the southwestern point of a crossroad. To the east and north, you see an empty intersection.",
      exits: {e: 6, n: 8}
    },
    {
      id: 8,
      name: "Western point",
      description: "You are standing at the west point of a crossroad. To the east, north, and south, you see an empty intersection.",
      exits: {e: 1, s: 7, n: 9}
    },
    {
      id: 9,
      name: "Northwestern point",
      description: "You are standing at the northwestern point of a crossroad. To the east and south, you see an empty intersection.",
      exits: {e: 2, s: 8}
    }
  ],
  items: [
    {
      name: "rock",
      description: "a simple rock",
      room: 1
    },
    {
      name: "sandwich",
      description: "a peanut butter and jelly sandwich",
      hitpoints: 10,
      room: 2,
      isFood: true
    },
    {
      name: "stick",
      description: "a stick",
      room: 3
    },
    {
      name: "candy",
      description: "a tasty candy bar",
      hitpoints: 5,
      room: 3,
      isFood: true
    },
    {
      name: "club",
      description: "a wooden club",
      bonus: 5,
      room: 4,
      isWeapon: true
    },
    {
      name: "hat",
      description: "a tinfoil hat",
      damageReduction: 2,
      room: 5,
      isArmor: true
    },
    {
      name: "helmet",
      description: "a knight's helmet",
      damageReduction: 5,
      room: 5,
      isArmor: true
    },
    {
      name: "spear",
      description: "a metal spear",
      bonus: 10,
      room: 6,
      isWeapon: true
    },
    {
      name: "sandwich",
      description: "a turkey sandwich",
      hitpoints: 10,
      room: 6,
      isFood: true
    },
    {
      name: "sandwich",
      description: "a ham sandwich",
      hitpoints: 10,
      room: 6,
      isFood: true
    },
    {
      name: "sword",
      description: "a sharp metal sword",
      bonus: 15,
      room: 7,
      isWeapon: true
    },
    {
      name: "donut",
      description: "a sweet glazed donut",
      hitpoints: 5,
      room: 7,
      isFood: true
    },
    {
      name: "coffee",
      description: "a hot cup of coffee",
      hitpoints: 2,
      room: 8,
      isFood: true
    },
    {
      name: "torch",
      description: "a makeshift torch",
      room: 8
    },
    {
      name: "cake",
      description: "a whole chocolate cake",
      hitpoints: 20,
      room: 9,
      isFood: true
    },
    {
      name: "sandwich",
      description: "a 12\" sub sandwich",
      hitpoints: 15,
      room: 9,
      isFood: true
    },
    {
      name: "chainmail",
      description: "a full set of chainmail armor",
      damageReduction: 15,
      room: 9,
      isArmor: true
    }
  ],
  enemies: [
    {
      name: "minion",
      description: "A goblin minion",
      room: 3
    },
    {
      name: "minion",
      description: "A goblin minion",
      room: 7
    },
    {
      name: "king",
      description: "A scary goblin king",
      room: 2
    },
  ]
}
