import { Gameboard } from './Gameboard.js';
import { Ship } from './Ship.js';
export class Player {
  constructor(name = 'Guest') {
    this.name = name;
    this.gameboard = new Gameboard();
    this.isComputer = false;
    this.attacksMade = [];
    this.ships = {
      patrolBoats: [new Ship(1), new Ship(1), new Ship(1), new Ship(1)],
      submarines: [new Ship(2), new Ship(2), new Ship(2)],
      destroyers: [new Ship(3), new Ship(3)],
      carrier: [new Ship(4)],
    };
  }

  placeAllShips() {
    try {
      this.gameboard.placeShip(this.ships.patrolBoats[0], 0, 0, 'vertical');
      this.gameboard.placeShip(this.ships.patrolBoats[1], 2, 0, 'vertical');
      this.gameboard.placeShip(this.ships.patrolBoats[2], 4, 0, 'vertical');
      this.gameboard.placeShip(this.ships.patrolBoats[3], 6, 0, 'vertical');

      this.gameboard.placeShip(this.ships.submarines[0], 2, 2, 'horizontal');
      this.gameboard.placeShip(this.ships.submarines[1], 3, 6, 'horizontal');
      this.gameboard.placeShip(this.ships.submarines[2], 1, 9, 'vertical');

      this.gameboard.placeShip(this.ships.destroyers[0], 9, 4, 'horizontal');
      this.gameboard.placeShip(this.ships.destroyers[1], 6, 2, 'vertical');

      this.gameboard.placeShip(this.ships.carrier[0], 4, 4, 'vertical');
    } catch (error) {
      console.error(error.message);
    }
  }

  renderBoard(containerId) {
    const container = document.querySelector(`#${containerId}`);
    container.innerHTML = ' ';
    const gameboard = this.gameboard.board;

    gameboard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const playerGrid = document.createElement('div');
        playerGrid.classList.add('cell');
        playerGrid.dataset.row = rowIndex;
        playerGrid.dataset.col = colIndex;
        if (cell && cell.ship) {
          playerGrid.textContent = cell.ship.shipType[0];
          if(cell.ship.sunk){
            playerGrid.classList.add('sunk');
          }
          if (cell.ship.length === 1) {
            playerGrid.classList.add('patrol');
          }
          if (cell.ship.length === 2) {
            playerGrid.classList.add('submarine');
          }
          if (cell.ship.length === 3) {
            playerGrid.classList.add('destroyer');
          }
          if (cell.ship.length === 4) {
            playerGrid.classList.add('carrier');
          }
        } else {
          playerGrid.textContent = '';
        }

        container.appendChild(playerGrid);
      });
    });
  }

  addEventsToCells() {
    const cell = document.querySelectorAll('.cell');
    cell.forEach((c) => {
      c.addEventListener('click', () => {
        console.log(`X= ${c.dataset.row} | Y= ${c.dataset.col}`);
      });
    });
  }
}



