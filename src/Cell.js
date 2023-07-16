import React from "react";
import "./Cell.css";


// A single cell on the Board
// Cell has no state; only 2 props:
// - flipCellsAroundMe: a function received from Board which flips this cell and the cells around it
// - isLit: Boolean. Is this cell lit or not?
// Handles user clicks by calling flipCellsAroundMe function
function Cell({ flipCellsAroundMe, isLit, coords }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  // className="Cell Cell-lit"
  function handleClick () {
    flipCellsAroundMe(coords);
  }
  return <td className={classes} onClick={handleClick} />;
}


export default Cell;
