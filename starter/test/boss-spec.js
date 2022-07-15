const { expect } = require('chai');

const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {Food} = require("../class/food.js");

const {World} = require("../class/world.js");

const {Character} = require("../class/character.js");
const {Enemy} = require("../class/enemy.js");
const {Boss} = require("../class/boss");
const { Weapon } = require('../class/weapon.js');
const { Armor } = require('../class/armor.js');

describe ('Boss', function () {

    let boss;
    let room;
    let sandwich;
    let player;

    beforeEach(function() {
      room = new Room("Test Room", "A test room");
      sandwich = new Food("sandwich", "a delicious looking sandwich");
      boss = new Boss('boss', 'a scary boss monster', room);
      player = new Player("player", room);

      World.enemies.push(boss);
      World.setPlayer(player);
    });

    it('should inherit from Enemy class', function () {
        expect(boss instanceof Character).to.be.true;
        expect(boss instanceof Enemy).to.be.true;
        expect(boss instanceof Boss).to.be.true;
        expect(boss instanceof Player).to.be.false;
      });

      it('should have name, description, and room attributes', function () {
        expect(boss.name).to.equal("boss");
        expect(boss.description).to.equal('a scary boss monster');
        expect(boss.currentRoom).to.deep.equal(room);
      });

      it('should have strength and health attributes', function () {
        expect(boss.health).to.equal(200);
        expect(boss.strength).to.equal(50);
      });

      it('should start with a weapon, an armor, and a potion in its invetory', function(){
        expect(boss.items[0] instanceof Weapon).to.be.true;
        expect(boss.items[1] instanceof Armor).to.be.true;
        expect(boss.items[2] instanceof Food).to.be.true;
      });

      it('should have a cooldown attribute that defaults to 5,000ms', function () {
        expect(boss.cooldown).to.equal(5000);
      });

      it('should not move from its room', function () {

        let westRoom = new Room("West Room", "A room to the west of testRoom");
        room.connectRooms('w', westRoom);

        boss.cooldown = 0;

        expect(boss.currentRoom).to.equal(room);

        boss.randomMove();

        expect(boss.currentRoom).to.equal(room);
        expect(boss.cooldown).above(0);
      });

      it('should not steal sandwiches', function(){
        room.items.push(sandwich);
        expect(room.items.length).to.equal(1);
        expect(boss.items.length).to.equal(3);
        boss.takeSandwich();
        expect(room.items.length).to.equal(1);
        expect(boss.items.length).to.equal(3);
      });

      it('should target the player when hit', function () {

        expect(boss.attackTarget).to.equal(null);

        player.hit('boss');

        expect(boss.attackTarget).to.equal(player);
      });

      it('should attack the player when targetting player', function () {

        player.hit('boss');

        boss.cooldown = 0;

        expect(player.health).to.equal(100);
        boss.attack();
        expect(player.health).to.equal(50);
        expect(boss.cooldown).above(0);
      });

      it('should lose health when damage is applied', function () {
        expect(boss.health).to.equal(200);
        boss.applyDamage(10);
        expect(boss.health).to.equal(190);
      });

      it('should drop all held items and have currentRoom set to null when dead', function () {
        expect(boss.currentRoom).to.equal(room);
        expect(room.items.length).to.equal(0);
        boss.die();
        expect(boss.currentRoom).to.equal(null);
        expect(room.items.length).to.equal(3);
        expect(room.items[0] instanceof Weapon).to.be.true;
        expect(room.items[1] instanceof Armor).to.be.true;
        expect(room.items[2] instanceof Food).to.be.true;
      });

      it('should die when damage brings health to 0 or less', function () {
        expect(boss.currentRoom).to.equal(room);
        expect(room.items.length).to.equal(0);

        expect(boss.health).to.equal(200);
        boss.applyDamage(200);
        expect(boss.health).to.equal(0);

        expect(boss.currentRoom).to.equal(null);
        expect(room.items.length).to.equal(3);
        expect(room.items[0] instanceof Weapon).to.be.true;
        expect(room.items[1] instanceof Armor).to.be.true;
        expect(room.items[2] instanceof Food).to.be.true;
      });
});
