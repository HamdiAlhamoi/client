import React from "react";

function Tile({ puzzle, grid, handleChange }) {
  return grid.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      return (
        <input
          className={
            puzzle[rowIndex][colIndex] !== 0
              ? "initial"
              : col !== 0
              ? "taken"
              : "tile"
          }
          type="text"
          value={col === 0 ? "" : col}
          key={rowIndex + " " + colIndex}
          onChange={(e) => handleChange(rowIndex, colIndex, e)}
        ></input>
      );
    });
  });
}

export default Tile;
