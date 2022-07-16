const { expect } = require('chai');

const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {Food} = require("../class/food.js");
const {Buff} = require('../class/buff.js');
const { Weapon } = require('../class/weapon.js');
const { Armor } = require('../class/armor.js');

describe('buff item', function(){
    let buff, player, room, item;

    beforeEach(function(){
        buff = new Buff('scroll', 'a buff scroll', 20, 60000);
        room = new Room("Test Room", "A test room");
        player = new Player("player", room);
        item = new Item('rock', 'a simple rock');
    });

    it('should have name, description, strengthBonus, duration, and used attributes', function(){
        expect(buff.name).to.equal('scroll');
        expect(buff.description).to.equal('a buff scroll');
        expect(buff.strengthBonus).to.equal(20);
        expect(buff.duration).to.equal(60000);
        expect(buff.used).to.equal(false);
    });

    it('should be an instance of Item and Buff, but not Weapon, Armor, or Food', function () {
        expect(buff instanceof Item).to.be.true;
        expect(buff instanceof Buff).to.be.true;
        expect(buff instanceof Weapon).to.be.false;
        expect(buff instanceof Armor).to.be.false;
        expect(buff instanceof Food).to.be.false;
    });

    it('should not be edible', function () {
        player.items.push(buff);
        expect(player.items.length).to.equal(1);
        player.eatItem("scroll");
        expect(player.items.length).to.equal(1);
    });

    it('can be picked up from a room by a player', function () {
        room.items.push(buff);
        expect(room.items.length).to.equal(1);
        expect(player.items.length).to.equal(0);

        player.takeItem("scroll");

        expect(room.items.length).to.equal(0);
        expect(player.items.length).to.equal(1);

        expect(player.getItemByName("scroll")).to.equal(buff);
    });

    it('can be dropped into a room by a player', function () {
        player.items.push(buff);
        expect(room.items.length).to.equal(0);
        expect(player.items.length).to.equal(1);

        player.dropItem("scroll");

        expect(room.items.length).to.equal(1);
        expect(player.items.length).to.equal(0);

        expect(room.getItemByName("scroll")).to.equal(buff);
    });

    it('should increase player strength for the duration once used', function(){
        player.items.push(buff);
        player.useBuff(buff);
        expect(player.strength).to.equal(30);
        buff.duration = 0;
        player.removeBuff(buff);
        expect(player.strength).to.equal(10);
    });

    it('should have used property set to true once used', function(){
        player.items.push(buff);
        expect(buff.used).to.equal(false);
        player.useBuff(buff);
        expect(buff.used).to.equal(true);
    });

    it('should only be able to be used once', function(){
        buff.used = true;
        player.items.push(buff);
        expect(player.strength).to.equal(10);
        player.useBuff(buff);
        expect(player.strength).to.equal(10);
    });

    it('should not be able to be used if it is not a buff', function(){
        player.items.push(item);
        expect(player.strength).to.equal(10);
        player.useItem('rock');
        expect(player.strength).to.equal(10);
    });

    it('should not change used state when dropped or picked up', function(){
        player.items.push(buff);

        expect(room.items.length).to.equal(0);
        expect(player.items.length).to.equal(1);
        expect(buff.used).to.equal(false);

        player.dropItem('scroll');

        expect(room.items.length).to.equal(1);
        expect(player.items.length).to.equal(0);
        expect(buff.used).to.equal(false);

        player.takeItem("scroll");

        expect(room.items.length).to.equal(0);
        expect(player.items.length).to.equal(1);
        expect(buff.used).to.equal(false);
    });

});
