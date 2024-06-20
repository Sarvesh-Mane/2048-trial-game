import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Game.css';
import isEqual from 'lodash/isEqual';

const TILE_COLORS = {
  2: 'bg-yellow-200',
  4: 'bg-yellow-300',
  8: 'bg-yellow-400',
  16: 'bg-yellow-500',
  32: 'bg-yellow-600',
  64: 'bg-yellow-700',
  128: 'bg-yellow-800',
  256: 'bg-yellow-900',
  512: 'bg-red-400',
  1024: 'bg-red-500',
  2048: 'bg-red-600'
};

const addNewTile = (board) => {
  let emptyPositions = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyPositions.push({ row: i, col: j });
      }
    }
  }

  if (emptyPositions.length > 0) {
    const { row, col } = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
};

const generateInitialBoard = () => {
  let board = Array(4).fill().map(() => Array(4).fill(0));
  addNewTile(board);
  addNewTile(board);
  return board;
};

const Game = () => {
  const [board, setBoard] = useState(generateInitialBoard());
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [highScores, setHighScores] = useState([]);

  const fetchHighScores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/highscores');
      setHighScores(response.data);
    } catch (error) {
      console.error('Error fetching high scores:', error);
    }
  };

  const handleMove = useCallback((direction) => {
    let newBoard = [...board];
    let newScore = score;

    const slide = (arr) => {
      let newArr = arr.filter(val => val);
      for (let i = 0; i < newArr.length - 1; i++) {
        if (newArr[i] === newArr[i + 1]) {
          newArr[i] *= 2;
          newArr[i + 1] = 0;
          newScore += newArr[i];
        }
      }
      newArr = newArr.filter(val => val);
      while (newArr.length < 4) {
        newArr.push(0);
      }
      return newArr;
    };

    const rotateLeft = (matrix) => {
      return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex])).reverse();
    };

    const rotateRight = (matrix) => {
      return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex])).map(row => row.reverse());
    };

    if (direction === 'left') {
      newBoard = newBoard.map(row => slide(row));
    } else if (direction === 'right') {
      newBoard = newBoard.map(row => slide(row.reverse()).reverse());
    } else if (direction === 'up') {
      newBoard = rotateLeft(newBoard).map(row => slide(row));
      newBoard = rotateRight(newBoard);
    } else if (direction === 'down') {
      newBoard = rotateRight(newBoard).map(row => slide(row));
      newBoard = rotateLeft(newBoard);
    }

    // Check if the board has changed, if so add a new tile
    if (!isEqual(newBoard, board)) {
      addNewTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  }, [board, score]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          handleMove('up');
          break;
        case 'ArrowDown':
          handleMove('down');
          break;
        case 'ArrowLeft':
          handleMove('left');
          break;
        case 'ArrowRight':
          handleMove('right');
          break;
        default:
          break;
      }
    };

    fetchHighScores();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleMove]);

  const handleSubmit = async () => {
    if (name && score > 0) {
      try {
        await axios.post('http://localhost:3001/highscore', { name, score });
        fetchHighScores();
      } catch (error) {
        console.error('Error submitting score:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4">2048 Game</h1>
      <input
        type="text"
        className="border p-2 mb-4"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="grid grid-cols-4 gap-4">
        {board.flat().map((tile, index) => (
          <div
            key={index}
            className={`h-20 w-20 flex items-center justify-center text-2xl font-bold ${TILE_COLORS[tile] || 'bg-gray-200'}`}
          >
            {tile !== 0 ? tile : ''}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Score
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">High Scores</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{score.name}</td>
                <td className="border px-4 py-2">{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Game;
