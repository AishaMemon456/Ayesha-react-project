import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [status, setStatus] = useState('');
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    if (board[index] || status) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winningCombination = checkWinner(newBoard, currentPlayer);
    if (winningCombination) {
      setStatus(`${currentPlayer} Wins!`);
      setScores(prevScores => ({ ...prevScores, [currentPlayer]: prevScores[currentPlayer] + 1 }));
    } else if (newBoard.every(cell => cell)) {
      setStatus('It\'s a Draw!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      handleComputerMove(newBoard);
    }
  };

  const checkWinner = (squares, player) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
      if (condition.every(index => squares[index] === player)) {
        return condition;
      }
    }
    return null;
  };

  const handleComputerMove = (currentBoard) => {
    const winningMove = findWinningMove(currentBoard, 'O');
    if (winningMove !== null) {
      currentBoard[winningMove] = 'O';
    } else {
      const blockingMove = findWinningMove(currentBoard, 'X');
      if (blockingMove !== null) {
        currentBoard[blockingMove] = 'O';
      } else {
        const emptyIndices = currentBoard
          .map((cell, index) => (cell === null ? index : null))
          .filter(index => index !== null);
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        currentBoard[randomIndex] = 'O';
      }
    }

    setBoard(currentBoard);
    const winningCombination = checkWinner(currentBoard, 'O');
    if (winningCombination) {
      setStatus('O Wins!');
      setScores(prevScores => ({ ...prevScores, O: prevScores.O + 1 }));
    } else if (currentBoard.every(cell => cell)) {
      setStatus('It\'s a Draw!');
    } else {
      setCurrentPlayer('X');
    }
  };

  const findWinningMove = (board, player) => {
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = board.slice();
        testBoard[i] = player;
        if (checkWinner(testBoard, player)) {
          return i;
        }
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus('');
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="scoreboard">
        <h2>Scores</h2>
        <p>X: {scores.X}</p>
        <p>O: {scores.O}</p>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <button 
            key={index} 
            className="button" 
            onClick={() => handleClick(index)}
          >
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
