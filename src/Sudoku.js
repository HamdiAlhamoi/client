import React, { useState, useRef, useEffect } from "react";
import Board from "./ui/Board";
import Interface from "./ui/Interface";
import { REST } from "./service/api";

function copy2DArray(from, to) {
  for (let i = 0; i < from.length; i++) {
    to[i] = [...from[i]];
  }
}
function getGrid() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid.push(Array(9).fill(0));
  }
  return grid;
}
function Sudoku() {
  const [grid, setGrid] = useState(getGrid);
  const [puzzleStatus, setPuzzleStatus] = useState("");
    const [isTiming, setIsTiming] = useState(false);
  const timerRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const initialGrid = useRef(getGrid());
   useEffect(() => {
     if (isTiming) {
       timerRef.current = setInterval(() => {
         setElapsedTime((prevTime) => prevTime + 1);
       }, 1000);
     } else {
       clearInterval(timerRef.current);
     }
     return () => clearInterval(timerRef.current);
   }, [isTiming]);
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
  async function handleCreate(difficulty) {
    try {
      const response = await REST.getBoard(difficulty);
      const data = await response.json();
      setElapsedTime(0);
      setIsTiming(true);

      return data.game;
    } catch (error) {
      console.log(error);
    }
  }
  async function handleValidate(gird, level, time) {
    try {
      const response = await REST.validateBoard(gird, level, time);
      const data = await response.json();
      return data.status;
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSolve(gird) {
    try {
      const response = await REST.solveBoard(gird);
      const data = await response.json();
      if (data.status) {
        setPuzzleStatus("** SOLVED **");
        setIsTiming(false);
        return data.solution;
      } else {
        setPuzzleStatus("** UNSOLVABLE **");

        return grid;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleInterface(action, {difficulty, time}) {
    let newGrid;
    switch (action) {
      case "create":
        newGrid = await handleCreate(difficulty);
        setPuzzleStatus("");
        setGrid(newGrid);
        copy2DArray(newGrid, initialGrid.current);
        break;
      case "solve":
        newGrid = await handleSolve(initialGrid.current);
        setGrid(newGrid);
        break;
      case "validate":
        const status = await handleValidate(grid, difficulty, time);
        const puzzleStatus = status ? "SOLVED" : "UNSOLVED";
        setPuzzleStatus(puzzleStatus);
        setIsTiming(!status);
        break;
      case "clear":
        newGrid = getGrid();
        copy2DArray(newGrid, initialGrid.current);
        setGrid(getGrid);
        setPuzzleStatus("");
        setElapsedTime(0); 
        setIsTiming(false);
        break;
      default:
        throw new Error("invalid action");
    }
  }

  function handleChange(row, col, e) {
    const re = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === "" || re.test(value)) {
      if (Number(value) < 10 && initialGrid.current[row][col] === 0) {
        const newGrid = [...grid];
        newGrid[row][col] = Number(value);
        setGrid(newGrid);
      }
    }
  }
  return (
    <div className="sudoku">
      <div className="timer">Time: {formatTime(elapsedTime)}</div>
      <Board
        puzzle={initialGrid.current}
        grid={grid}
        handleChange={handleChange}
      />
      <Interface
        handleInterface={handleInterface}
        status={puzzleStatus}
        time={formatTime(elapsedTime)}
      />
    </div>
  );
}

export default Sudoku;
