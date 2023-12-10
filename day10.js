const readLinesFromFile = require("./fileReader");
const filePath = "./day10input.txt";

let testInput = [".....", ".S-7.", ".|.|.", ".L-J.", "....."];
let secondTestInput = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];

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

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
//  is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

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

  return neighbours.filter(([x,y]) => !visited[`${x}-${y}`]);
};

const oneStar = (map) => {
  map = map.map((line) => line.split(""));
  console.log(map)
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
  console.log((counter - 1) / 2)
};

readLinesFromFile(filePath, (err, linesArray) => {
  oneStar(linesArray);
});
