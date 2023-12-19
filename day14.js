const readLinesFromFile = require("./fileReader");
const filePath = "./day14input.txt";

const applyNorthGravity = (map) => {
  for (let i = 1; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") {
        let newI = i;
        let newJ = j;
        while (newI - 1 >= 0) {
          if (map[newI - 1][newJ] === "O" || map[newI - 1][newJ] === "#") {
            map[i][j] = ".";
            map[newI][newJ] = "O";
            break;
          }

          if (map[newI - 1][newJ] === "." && !map[newI - 2]) {
            map[i][j] = ".";
            map[newI - 1][newJ] = "O";
            break;
          }
          newI--;
        }
      }
    }
  }
};

const applySouthGravity = (map) => {
  for (let i = map.length - 2; i >= 0; i--) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") {
        let newI = i;
        let newJ = j;
        while (newI < map.length) {
          if (map[newI + 1][newJ] === "O" || map[newI + 1][newJ] === "#") {
            map[i][j] = ".";
            map[newI][newJ] = "O";
            break;
          }

          if (map[newI + 1][newJ] === "." && !map[newI + 2]) {
            map[i][j] = ".";
            map[newI + 1][newJ] = "O";
            break;
          }

          newI++;
        }
      }
    }
  }
};

const applyWestGravity = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 1; j < map[i].length; j++) {
      if (map[i][j] === "O") {
        let newI = i;
        let newJ = j;
        while (newJ > -1) {
          if (map[newI][newJ - 1] === "O" || map[newI][newJ - 1] === "#") {
            map[i][j] = ".";
            map[newI][newJ] = "O";
            break;
          }
          if (map[newI][newJ - 1] === "." && !map[newI][newJ - 2]) {
            map[i][j] = ".";
            map[newI][newJ - 1] = "O";
            break;
          }

          newJ--;
        }
      }
    }
  }
};

const applyEastGravity = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = map[i].length - 2; j >= 0; j--) {
      if (map[i][j] === "O") {
        let newI = i;
        let newJ = j;
        while (newJ < map[i].length) {
          if (map[newI][newJ + 1] === "O" || map[newI][newJ + 1] === "#") {
            map[i][j] = ".";
            map[newI][newJ] = "O";
            break;
          }
          if (map[newI][newJ + 1] === "." && !map[newI][newJ + 2]) {
            map[i][j] = ".";
            map[newI][newJ + 1] = "O";
            break;
          }

          newJ++;
        }
      }
    }
  }
};

const applyCycle = (map) => {
  applyNorthGravity(map);
  applyWestGravity(map);
  applySouthGravity(map);
  applyEastGravity(map);
};

const getSum = (map) => {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") {
        sum += map.length - i;
      }
    }
  }
  return sum;
};

const oneStar = (input) => {
  const newInput = input.map((line) => line.split(""));
  applyNorthGravity(newInput);
  console.log(getSum(newInput));
};

const twoStar = (input) => {
  const newInput = input.map((line) => line.split(""));

  // TODO: find a way to programmatically find the cycle beginning index and length
  // probably need to modify Floyd hare and tortoise

  for (let i = 0; i < 109; i++) {
    applyCycle(newInput);
  }
  const cycle = [];
  for (let i = 109; i < 118; i++) {
    applyCycle(newInput);
    const sum = getSum(newInput);
    cycle.push(sum);
  }

  console.log(cycle[(999_999_999 - 109) % cycle.length]);
};

readLinesFromFile(filePath, (err, linesArray) => {
  twoStar(linesArray);
});
