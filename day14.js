const readLinesFromFile = require("./fileReader");
const filePath = "./day14input.txt";

const testInput = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

const applyGravity = (map) => {
  for (let i = 1; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'O') {
        let newI = i;
        let newJ = j;
        while (newI - 1 >= 0) {
          if (map[newI - 1][newJ] === 'O' || map[newI - 1][newJ] === '#') {
            map[i][j] = '.';
            map[newI][newJ] = 'O';
            break;
          }

          if (map[newI - 1][newJ] === '.' && !map[newI - 2]) {
            map[i][j] = '.';
            map[newI - 1][newJ] = 'O';
            break;
          }
          newI--;
        }
      }
    }
  }
}

const getSum = (map) => {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'O') {
        sum += map.length - i;
      }
    }
  }
  return sum;
}

const oneStar = (input) => {
  const newInput = input.map(line => line.split(''));
  applyGravity(newInput);
  console.log(getSum(newInput))
}

readLinesFromFile(filePath, (err, linesArray) => {
  oneStar(linesArray);
});