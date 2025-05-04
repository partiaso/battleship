

import { Ship } from './Ship.js';

describe('Ship', () => {
  test('creates a ship with the correct length and initial values', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test('increments hits when hit() is called', () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(false);
  });

  test('returns true from isSunk() when hits >= length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('does not change sunk state after extra hits', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBe(true);
  });
});
