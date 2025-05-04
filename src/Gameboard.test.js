

import { Gameboard } from './Gameboard.js';
import { Ship } from './Ship.js';

describe('Gameboard - placeShip', () => {
  test('places a ship horizontally on the board', () => {
    const gameboard = new Gameboard(1);
    const ship = new Ship(3);
    gameboard.placeShip(ship, 2, 4, 'horizontal');

    expect(gameboard.board[2][4]).toEqual({ ship, index: 0 });
    expect(gameboard.board[2][5]).toEqual({ ship, index: 1 });
    expect(gameboard.board[2][6]).toEqual({ ship, index: 2 });
  });

  test('places a ship vertically on the board', () => {
    const gameboard = new Gameboard(1);
    const ship = new Ship(3);
    gameboard.placeShip(ship, 5, 1, 'vertical');

    expect(gameboard.board[5][1]).toEqual({ ship, index: 0 });
    expect(gameboard.board[6][1]).toEqual({ ship, index: 1 });
    expect(gameboard.board[7][1]).toEqual({ ship, index: 2 });
  });

  test('throws an error if ship goes out of bounds horizontally', () => {
    const gameboard = new Gameboard(1);
    const ship = new Ship(4);
    expect(() => {
      gameboard.placeShip(ship, 0, 8, 'horizontal');
    }).toThrow('Ship out of bounds (horizontal)');
  });

  test('throws an error if ship goes out of bounds vertically', () => {
    const gameboard = new Gameboard(1);
    const ship = new Ship(4);
    expect(() => {
      gameboard.placeShip(ship, 8, 0, 'vertical');
    }).toThrow('Ship out of bounds (vertical)');
  });

  test('throws an error if a ship overlaps another horizontally', () => {
    const gameboard = new Gameboard(2);
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    gameboard.placeShip(ship1, 0, 0, 'horizontal');
    expect(() => {
      gameboard.placeShip(ship2, 0, 1, 'horizontal');
    }).toThrow('Cannot place ship here, cell is already occupied');
  });

  test('throws an error if a ship overlaps another vertically', () => {
    const gameboard = new Gameboard(2);
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    gameboard.placeShip(ship1, 0, 0, 'vertical');
    expect(() => {
      gameboard.placeShip(ship2, 1, 0, 'vertical');
    }).toThrow('Cannot place ship here, cell is already occupied');
  });
});

describe('Gameboard - receiveAttack', () => {
  test('returns "hit" when attacking a cell containing a ship', () => {
    const gameboard = new Gameboard(1);
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');

    const result = gameboard.receiveAttack(0, 0);
    expect(result).toBe('hit');
    expect(ship.hits).toBe(1);
  });

  test('returns "miss" when attacking a cell without a ship', () => {
    const gameboard = new Gameboard(1);
    const result = gameboard.receiveAttack(5, 5);
    expect(result).toBe('miss');
    expect(gameboard.missedAttacks).toBe(1);
  });

  test('throws error when attacking the same cell twice', () => {
    const gameboard = new Gameboard(1);
    gameboard.receiveAttack(2, 2);
    expect(() => {
      gameboard.receiveAttack(2, 2);
    }).toThrow('This cell has already been attacked.');
  });

  test('decrements shipCount and sets allShipsSunk when last ship sinks', () => {
    const gameboard = new Gameboard(1);
    const ship = new Ship(1);
    gameboard.placeShip(ship, 4, 4, 'horizontal');

    expect(gameboard.areAllShipsSunk()).toBe(false);
    const result = gameboard.receiveAttack(4, 4);
    expect(result).toBe('hit');
    expect(gameboard.shipCount).toBe(0);
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  test('does not set allShipsSunk if some ships remain', () => {
    const gameboard = new Gameboard(2);
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    gameboard.placeShip(ship1, 0, 0, 'horizontal');
    gameboard.placeShip(ship2, 1, 1, 'horizontal');

    gameboard.receiveAttack(0, 0);
    expect(gameboard.areAllShipsSunk()).toBe(false);
  });
});
