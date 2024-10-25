import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X'); // Player is 'X'
  const [status, setStatus] = useState('');

  const handleClick = (index) => {
    if (board[index] || status) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    if (checkWinner(newBoard, currentPlayer)) {
      setStatus(`${currentPlayer} Wins!`);
    } else if (newBoard.every(cell => cell)) {
      setStatus('It\'s a Draw!');
    } else {
      setCurrentPlayer('O'); 
      handleComputerMove(newBoard);
    }
  };

  const checkWinner = (squares, player) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
    return winConditions.some(condition => 
      condition.every(index => squares[index] === player)
    );
  };

  const handleComputerMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter(index => index !== null);

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    
    const newBoard = currentBoard.slice();
    newBoard[randomIndex] = 'O'; 
    setBoard(newBoard);
    
    if (checkWinner(newBoard, 'O')) {
      setStatus('O Wins!');
    } else if (newBoard.every(cell => cell)) {
      setStatus('It\'s a Draw!');
    } else {
      setCurrentPlayer('X'); 
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus('');
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="button" onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
      {status && <h2>{status}</h2>}
      <button className="reset" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
