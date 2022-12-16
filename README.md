# Adventure Game

## Description
A text based adventure game designed to be run in the command line.

## Goals
- Practice Object Oriented Programming via classes that manage characters and items
- Practice Test Driven Development by writing unit tests that define specifications, then writing classes to satisfy the test cases

## Features
- Players can name their character and then explore a dungeon filled with items and enemies
- Along their travels players will encounter weapons and armor that can be equiped, buffs that can be cast, and food that can be eaten to regain health
- Goblins populate the dungeon, moving between rooms and occasionally stealing food if the player doesn't find it first (Goblins love sandwiches!)
- If a player defeats an enemy, that enemy will drop anything it was carrying in the current room
- A boss waits in one of the rooms and will drop powerful items if defeated

## Running Project Locally
1. Clone the project from GitHub
2. In bash/command line `cd` into the project directory, and then again into the 'starter' directory
3. `npm install` to install dependencies
4. Run `node game.js` to start the game and then follow the prompts
5. Use command `mocha` to run the unit tests
