export class Gameboard {
  constructor(shipCount = 10) {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null),
    );
    this.shipCount = shipCount;
    this.missedAttacks = 0;
    this.allShipsSunk = false;
    this.attackedCoordinates = [];
    this.currentTurn = false;
  }

  switchTurn() {
    this.currentTurn = !this.currentTurn;
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

    if (this.board[x][y] !== null) {
      const { ship, index } = this.board[x][y];
      ship.hit(index);
      if (ship.isSunk()) {
        this.shipCount--;
        if (this.shipCount === 0) {
          this.allShipsSunk = true;
          return 'game over';
        }
      }
      return 'hit';
    } else {
      this.missedAttacks++;
      return 'miss';
    }
  }

  updateBoardFocus(containerId) {
    const boardOne = document.querySelector('#player-one-board');
    const boardTwo = document.querySelector('#player-two-board');
    boardOne.classList.remove('active');
    boardTwo.classList.remove('active');
    if (containerId === 'player-one-board') {
      boardOne.classList.add('active');
    } else if (containerId === 'player-two-board') {
      boardTwo.classList.add('active');
    }
  }
}
