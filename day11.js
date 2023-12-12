const readLinesFromFile = require("./fileReader");
const filePath = "./day11input.txt";

const testInput = [
  "...#......",
  ".......#..",
  "#.........",
  "..........",
  "......#...",
  ".#........",
  ".........#",
  "..........",
  ".......#..",
  "#...#.....",
];

const isAllDots = (line) =>
  line.split("").filter((el) => el !== ".").length === 0;

const applyGravitationalEffects = (map) => {
  const expandingI = {};
  const expandingJ = {};
  for (let i = 0; i < map.length; i++) {
    if (isAllDots(map[i])) {
      expandingI[i] = true;
    }
  }

  for (let j = 0; j < map[0].length; j++) {
    let str = "";
    for (let i = 0; i < map.length; i++) {
      str += map[i][j];
    }
    if (isAllDots(str)) {
      expandingJ[j] = true;
    }
  }

  const newMap = [];

  for (let i = 0; i < map.length; i++) {
    const newLine = [];
    for (let j = 0; j < map[i].length; j++) {
      newLine.push(map[i][j]);
      if (expandingJ[j]) {
        newLine.push(".");
      }
    }
    newMap.push(newLine);
    if (expandingI[i]) {
      newMap.push(newLine);
    }
  }

  return newMap;
};

const generateGalaxyToCoordinateMap = (map) => {
  const galaxyToCoordinatesMap = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "#") {
        galaxyToCoordinatesMap.push([i, j]);
      }
    }
  }
  return galaxyToCoordinatesMap;
};

const calculateDistance = (a, b) => {
  const [x1, y1] = a;
  const [x2, y2] = b;
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const oneStar = (map) => {
  const expandedMap = applyGravitationalEffects(map);
  const galaxyToCoordinatesMap = generateGalaxyToCoordinateMap(expandedMap);
  let sum = 0;
  for (let i = 0; i < galaxyToCoordinatesMap.length - 1; i++) {
    for (let j = i + 1; j < galaxyToCoordinatesMap.length; j++) {
      sum += calculateDistance(galaxyToCoordinatesMap[i], galaxyToCoordinatesMap[j]);
    }
  }
  console.log(sum);
};

readLinesFromFile(filePath, (err, linesArray) => {
  oneStar(linesArray);
});
