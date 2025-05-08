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

  getRandomAttackCoordinates(opponentBoard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * opponentBoard.board.length);
      y = Math.floor(Math.random() * opponentBoard.board[0].length);
    } while (
      opponentBoard.attackedCoordinates.some(([ax, ay]) => ax === x && ay === y)
    );
    return [x, y];
  }

  makeComputerMove(opponent) {
    if (!this.isComputer || !this.gameboard.currentTurn) return;
    const [x, y] = this.getRandomAttackCoordinates(opponent.gameboard);
    const result = opponent.gameboard.receiveAttack(x, y);
    opponent.renderBoard('player-one-board');

    if (result === 'game over') {
      alert(`${this.name} wins!`);
      return;
    }

    this.gameboard.switchTurn();
    opponent.gameboard.switchTurn();
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
          if (cell.ship.sunk) {
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

  generateShipPlacementForm(containerId = 'form-container') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Container with id "${containerId}" not found.`);
      return;
    }

    if (!this.ships || Object.keys(this.ships).length === 0) {
      console.warn('There are no ships defined in this.ships');
      return;
    }

    const form = document.createElement('form');
    form.id = 'ship-placement-form';

    const heading = document.createElement('h3');
    heading.textContent = 'Place the ships ';
    form.appendChild(heading);

    for (const type in this.ships) {
      const shipsArray = this.ships[type];
      if (!Array.isArray(shipsArray)) continue;

      const group = document.createElement('div');
      group.classList.add('ship-group');

      const title = document.createElement('h4');
      title.textContent = `${type} (${shipsArray[0].length} cells)`;
      group.appendChild(title);

      shipsArray.forEach((ship, index) => {
        const instanceDiv = document.createElement('div');
        instanceDiv.classList.add('ship-instance');

        const inputX = document.createElement('input');
        inputX.type = 'number';
        inputX.name = `x-${type}-${index}`;
        inputX.min = 0;
        inputX.max = 9;
        inputX.placeholder = 'X';
        inputX.required = true;

        const inputY = document.createElement('input');
        inputY.type = 'number';
        inputY.name = `y-${type}-${index}`;
        inputY.min = 0;
        inputY.max = 9;
        inputY.placeholder = 'Y';
        inputY.required = true;

        const orientation = document.createElement('select');
        orientation.name = `orientation-${type}-${index}`;
        ['horizontal', 'vertical'].forEach((opt) => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt[0].toUpperCase() + opt.slice(1);
          orientation.appendChild(option);
        });

        instanceDiv.appendChild(inputX);
        instanceDiv.appendChild(inputY);
        instanceDiv.appendChild(orientation);
        group.appendChild(instanceDiv);
      });

      form.appendChild(group);
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Start';
    form.appendChild(submitBtn);

    container.innerHTML = '';
    container.appendChild(form);
  }
}
