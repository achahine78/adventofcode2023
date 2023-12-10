const readLinesFromFile = require("./fileReader");
const filePath = "./day10input.txt";

const visited = {};

const getStartingPosition = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "S") {
        return [i, j];
      }
    }
  }
};

const getAdjacentElements = (i, j, map) => {
  const result = {
    above: i > 0 ? map[i - 1][j] : null,
    below: i < map.length - 1 ? map[i + 1][j] : null,
    left: j > 0 ? map[i][j - 1] : null,
    right: j < map[0].length - 1 ? map[i][j + 1] : null,
  };

  return result;
};

const getNeighbours = (i, j, map) => {
  const pipeType = map[i][j];
  const { above, below, left, right } = getAdjacentElements(i, j, map);
  const neighbours = [];

  if (pipeType === "S") {
    if (above === "|" || above === "F" || above === "7") {
      neighbours.push([i - 1, j]);
    }

    if (right === "-" || right === "7" || right === "J") {
      neighbours.push([i, j + 1]);
    }

    if (left === "-" || left === "L" || left === "F") {
      neighbours.push([i, j - 1]);
    }

    if (below === "|" || below === "J" || below === "L") {
      neighbours.push([i + 1, j]);
    }
  }

  if (pipeType === "|") {
    if (above === "|" || above === "F" || above === "7") {
      neighbours.push([i - 1, j]);
    }
    if (below === "|" || below === "J" || below === "L") {
      neighbours.push([i + 1, j]);
    }
  }

  if (pipeType === "-") {
    if (right === "-" || right === "7" || right === "J") {
      neighbours.push([i, j + 1]);
    }

    if (left === "-" || left === "L" || left === "F") {
      neighbours.push([i, j - 1]);
    }
  }

  if (pipeType === "L") {
    if (above === "|" || above === "F" || above === "7") {
      neighbours.push([i - 1, j]);
    }

    if (right === "-" || right === "7" || right === "J") {
      neighbours.push([i, j + 1]);
    }
  }

  if (pipeType === "J") {
    if (left === "-" || left === "L" || left === "F") {
      neighbours.push([i, j - 1]);
    }

    if (above === "|" || above === "F" || above === "7") {
      neighbours.push([i - 1, j]);
    }
  }

  if (pipeType === "F") {
    if (right === "-" || right === "7" || right === "J") {
      neighbours.push([i, j + 1]);
    }

    if (below === "|" || below === "J" || below === "L") {
      neighbours.push([i + 1, j]);
    }
  }

  if (pipeType === "7") {
    if (left === "-" || left === "L" || left === "F") {
      neighbours.push([i, j - 1]);
    }

    if (below === "|" || below === "J" || below === "L") {
      neighbours.push([i + 1, j]);
    }
  }

  return neighbours.filter(([x, y]) => !visited[`${x}-${y}`]);
};

const oneStar = (map) => {
  map = map.map((line) => line.split(""));
  let [startI, startJ] = getStartingPosition(map);

  let counter = 0;

  const queue = [[startI, startJ]];

  while (queue.length) {
    const [i, j] = queue.shift();
    visited[`${i}-${j}`] = true;
    const neighbours = getNeighbours(i, j, map);
    map[i][j] = counter;
    counter++;
    for (const neighbour of neighbours) {
      queue.push(neighbour);
    }
  }
  console.log((counter - 1) / 2);
};

const isPointInInterior = (matrix, boundary, point) => {
  const [x, y] = point;

  if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length) {
      return false;
  }

  let count = 0;

  for (let i = 0; i < boundary.length; i++) {
      const [x1, y1] = boundary[i];
      const [x2, y2] = boundary[(i + 1) % boundary.length];

      if (
          ((y1 <= y && y < y2) || (y2 <= y && y < y1)) &&
          x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1
      ) {
          count++;
      }
  }

  return count % 2 === 1;
}

const twoStar = (map) => {
  map = map.map((line) => line.split(""));
  let [startI, startJ] = getStartingPosition(map);

  const stack = [[startI, startJ]];
  const boundary = [];

  while (stack.length) {
    const [i, j] = stack.pop();
    visited[`${i}-${j}`] = true;
    const neighbours = getNeighbours(i, j, map);
    boundary.push([i, j]);
    for (const neighbour of neighbours) {
      stack.push(neighbour);
    }
  }

  let counter = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (!visited[`${i}-${j}`]) {
        if (isPointInInterior(map, boundary, [i, j])) {
          counter++
        }
      }
    }
  }

  console.log(counter);
};

readLinesFromFile(filePath, (err, linesArray) => {
  twoStar(linesArray);
});
