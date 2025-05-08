import './styles.css';
import { Gameboard } from './Gameboard.js';
import { Player } from './Player.js';

const playerOne = new Player('John');
const playerTwo = new Player('CPU');
playerOne.placeAllShips();
playerTwo.placeAllShips();
playerOne.renderBoard('player-one-board');
playerTwo.renderBoard('player-two-board');
playerOne.gameboard.currentTurn = true;

document.querySelector('#player-two-board').addEventListener('click', (e) => {
  const target = e.target;
  const row = Number(target.dataset.row);
  const col = Number(target.dataset.col);

  if (row === undefined || col === undefined || isNaN(row) || isNaN(col))
    return;

  if (playerOne.gameboard.currentTurn) {
    try {
      const result = playerTwo.gameboard.receiveAttack(row, col);
      playerTwo.renderBoard('player-two-board');
      if(result === 'game over'){
        alert(`${playerTwo.name} wins!`)
      }
      playerOne.gameboard.switchTurn();
      playerTwo.gameboard.switchTurn();
      console.log(playerOne.gameboard);
      console.log(playerTwo.gameboard);
    } catch (error) {
      if (error.message === 'This cell has already been attacked.') {
        console.log('cell attacked');
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

  if (row === undefined || col === undefined || isNaN(row) || isNaN(col))
    return;

  if (playerTwo.gameboard.currentTurn) {
    try {
      const result = playerOne.gameboard.receiveAttack(row, col);
      playerOne.renderBoard('player-one-board');
      if(result === 'game over'){
        alert(`${playerOne.name} wins!`)
      }
      playerTwo.gameboard.switchTurn();
      playerOne.gameboard.switchTurn();
      console.log(playerOne.gameboard);
      console.log(playerTwo.gameboard);
    } catch (error) {
      if (error.message === 'This cell has already been attacked.') {
        console.log('cell attacked');
        return;
      }
      throw error;
    }
  }
});

