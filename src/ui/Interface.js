import React, { useState } from "react";

function Interface({ handleInterface, status, time }) {
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <div className="interface">
      <div className="info-interface">
        <input readOnly type="text" value={status}></input>
      </div>
      <div className="action-interface">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="difficulty-select"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          className="generate-btn btn"
          onClick={() => handleInterface("create", { difficulty })}
        >
          Create
        </button>
        <button
          className="validate-btn btn"
          onClick={() => handleInterface("validate", { difficulty, time })}
        >
          Validate
        </button>
        {/* this will solve the hole puzzle */}
        {/* <button
          className="solve-btn btn"
          onClick={() => handleInterface("solve")}
        >
          Solve
        </button> */}
        <button
          className="clear-btn btn"
          onClick={() => handleInterface("clear", { difficulty })}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Interface;
