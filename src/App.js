import React from 'react';
import Board from './Board';
import './App.css';


// Simple app that displays LightsOut game
function App () {
  return (
    <div className="App">
      <h1>Lights Out!</h1>
      <p>Objective: Click cells to turn lights on/off of selected cell, and all adjacent cells. You win when all cell lights are turned off! Good luck!</p>
      <Board numRows={5} numCols={5} />
    </div>
  );
}


export default App;
