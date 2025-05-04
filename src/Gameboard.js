import { Ship } from './Ship.js';

export class Gameboard {
  constructor(shipCount = 10) {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null),
    );
    this.shipCount = shipCount;
    this.missedAttacks = 0;
    this.allShipsSunk = false;
    this.attackedCoordinates = [];
  }

  placeShip(ship, x, y, direction) {
    const length = ship.length;

    if (direction === 'horizontal') {
      if (y + length > 10) throw new Error('Ship out of bounds (horizontal)');
      for (let i = 0; i < length; i++) {
        if (this.board[x][y + i] !== null) {
          throw new Error('Cannot place ship here, cell is already occupied');
        }
      }
      for (let i = 0; i < length; i++) {
        this.board[x][y + i] = { ship, index: i };
      }
    } else if (direction === 'vertical') {
      if (x + length > 10) throw new Error('Ship out of bounds (vertical)');
      for (let i = 0; i < length; i++) {
        if (this.board[x + i][y] !== null) {
          throw new Error('Cannot place ship here, cell is already occupied');
        }
      }
      for (let i = 0; i < length; i++) {
        this.board[x + i][y] = { ship, index: i };
      }
    } else {
      throw new Error('Invalid direction');
    }
  }

  receiveAttack(x, y) {

    if (this.attackedCoordinates.some(([ax, ay]) => ax === x && ay === y)) {
      throw new Error('This cell has already been attacked.');
    }
    this.attackedCoordinates.push([x, y]);

    const cell = this.board[x][y];
    if (cell !== null) {
      const { ship } = cell;
      ship.hit();
      if (ship.isSunk()) {
        this.shipCount--;
        if (this.shipCount === 0) {
          this.allShipsSunk = true;
        }
      }
      // todo    REMOVE: This should clear cell or mark as hit
      this.board[x][y] = "X";
      return 'hit';
    } else {
      this.missedAttacks++;
      return 'miss';
    }
  }

  areAllShipsSunk() {
    return this.allShipsSunk;
  }
}

