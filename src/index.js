import './styles.css';
import { Player } from './Player.js';

const playerOne = new Player('Player 1');
const playerTwo = new Player('Player 2');
let gameOver = false;

playerOne.gameboard.currentTurn = true;
playerTwo.isComputer = true;
playerOne.gameboard.updateBoardFocus('player-two-board');
playerOne.renderBoard('player-one-board');
playerTwo.renderBoard('player-two-board');
playerOne.generateShipPlacementForm();

document.querySelector('#ship-placement-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const playerTwoContainer = document.querySelector('#player-two-board');
    const formContainer = document.querySelector('#form-container')
    const form = e.target;
    const ships = playerOne.ships;

    for (const type in ships) {
      ships[type].forEach((ship, index) => {
        const x = Number(form[`x-${type}-${index}`].value);
        const y = Number(form[`y-${type}-${index}`].value);
        const orientation = form[`orientation-${type}-${index}`].value;

        playerOne.gameboard.placeShip(ship, x, y, orientation);
      });
    }
    playerTwoContainer.style.display = 'grid';
    formContainer.style.display = 'none';
    playerOne.renderBoard('player-one-board');

    const ships2 = playerTwo.ships;
    for (const type in ships2) {
      ships2[type].forEach((ship) => {
        let placed = false;
        while (!placed) {
          try {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            playerTwo.gameboard.placeShip(ship, x, y, orientation);
            placed = true;
          } catch (error) {
            continue;
          }
        }
      });
    }
    playerTwo.renderBoard('player-two-board');
  });

document.querySelector('#player-two-board').addEventListener('click', (e) => {
  const target = e.target;
  const row = Number(target.dataset.row);
  const col = Number(target.dataset.col);
  if (gameOver) return;

  if (row === undefined || col === undefined || isNaN(row) || isNaN(col))
    return;

  if (playerOne.gameboard.currentTurn) {
    try {
      const result = playerTwo.gameboard.receiveAttack(row, col);
      playerTwo.renderBoard('player-two-board');
      if (result === 'game over') {
        alert(`${playerOne.name} wins!`);
        gameOver = true;
        return;
      }
      playerOne.gameboard.switchTurn();
      playerTwo.gameboard.switchTurn();

      playerOne.gameboard.updateBoardFocus('player-one-board');

      if (playerTwo.isComputer) {
        setTimeout(() => {
          playerTwo.makeComputerMove(playerOne);
          playerOne.gameboard.updateBoardFocus('player-two-board');
        }, 500);
      }
    } catch (error) {
      if (error.message === 'This cell has already been attacked.') {
        alert('cell attacked');
        return;
      }
      throw error;
    }
  }
});

document.querySelector('#player-one-board').addEventListener('click', (e) => {
  const target = e.target;
  const row = Number(target.dataset.row);
  const col = Number(target.dataset.col);

  if (gameOver) return;

  if (row === undefined || col === undefined || isNaN(row) || isNaN(col))
    return;

  if (playerTwo.gameboard.currentTurn) {
    try {
      const result = playerOne.gameboard.receiveAttack(row, col);
      playerOne.renderBoard('player-one-board');
      if (result === 'game over') {
        alert(`${playerTwo.name} wins!`);
        gameOver = true;
        return;
      }
      playerTwo.gameboard.switchTurn();
      playerOne.gameboard.switchTurn();
      playerTwo.gameboard.updateBoardFocus('player-two-board');
    } catch (error) {
      if (error.message === 'This cell has already been attacked.') {
        console.log('cell attacked');
        return;
      }
      throw error;
    }
  }
});
