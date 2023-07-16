import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";


// Game board for Lights Out
// Properties:
//  - numRows: number of board rows
//  - numCols: number of board columns
//  - chanceLightStartsOn: float, chance a cell is lit at start
// State:
//  - board: array-of-arrays of true/false
//  For this 3x3 board: . . . // 0 0 . // . . .
//  (where . is off, and 0 is on)
// This would be: [[f, f, f], [t, t, f], [f, f, f]]
// This should render an HTML table of individual <Cell /> components
// Board doesn't handle clicks; clicks handled through each cell
function Board({ numRows, numCols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  // Create a board of numRows high by numCols wide
  // Each cell randomly lit or unlit
  function createBoard() {
    let initialBoard = [];

    for (let i = 0; i < numRows; i++) {
        let row = [];
        for (let j = 0; j < numCols; j++) {
            row.push(randomize());
        }
        initialBoard.push(row);
    }
  
    return initialBoard;
    // board = [
    //     [true, false, false],
    //     [false, true, false],
    //     [false, true, true]
    // ]
  }

  // Randomly chooses true or false to populate `board` array matrix
  function randomize () {
    let num = Math.random();
    return num <= 0.5 ? true : false;
  }

  // Checks board in state to determine if player has won
  function hasWon() {
    return board.every(row => row.every(cell => cell === false));
  }


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
    
        // Checks if both x/y coordinates are in bounds of game board, then flips true-false values
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make DEEP copy of oldBoard
      let newBoard = oldBoard.map(row => [...row]);

      // in newBoard, flip cell and adjacent cells
      flipCell(y, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y, x+1, newBoard);
      flipCell(y, x-1, newBoard);

      return newBoard;
    });
  }

  if (hasWon()) return `You won!`;

  const gameMatrix = [];

  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
        row.push(
            <Cell 
                flipCellsAroundMe={flipCellsAround} 
                isLit={board[i][j]}
                coords={`${i}-${j}`}
            />
        )
    }
    gameMatrix.push(<tr>{row}</tr>)
  }

  return (
    <table className="Board-table">
        <tbody>{gameMatrix}</tbody>
    </table>
  )

}


export default Board;
