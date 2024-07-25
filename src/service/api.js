export const REST = {
  getBoard: function (difficulty = "easy") {
    return fetch(`http://localhost:3000/puzzle?difficulty=${difficulty}`);
  },
  solveBoard: function (grid) {
    const data = {
      board: grid,
    };
    return fetch("http://localhost:3000/solve", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  validateBoard: function (grid, level, time) {
    const data = {
      board: grid,
      level,
      time,
    };
    return fetch("http://207.154.194.59/validate", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
  },
};
