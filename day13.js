const readLinesFromFile = require("./fileReader");
const filePath = "./day13input.txt";

const testInput = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#.",
  "",
  "#...##..#",
  "#....#..#",
  "..##..###",
  "#####.##.",
  "#####.##.",
  "..##..###",
  "#....#..#",
];

const isStringMirror = (arr, mirroredAt) => {
  let leftSlice;
  let rightSlice;
  if (mirroredAt < arr.length / 2) {
    leftSlice = arr.slice(0, mirroredAt);
    rightSlice = arr.slice(mirroredAt, mirroredAt + leftSlice.length);
  } else {
    rightSlice = arr.slice(mirroredAt, arr.length);
    leftSlice = arr.slice(mirroredAt - rightSlice.length, mirroredAt);
  }
  return leftSlice.join('') === rightSlice.toReversed().join('');
};

const isArrayMirror = (arr, mirroredAt) => {
  let leftSlice;
  let rightSlice;
  if (mirroredAt < arr.length / 2) {
    leftSlice = arr.slice(0, mirroredAt);
    rightSlice = arr.slice(mirroredAt, mirroredAt + leftSlice.length);
  } else {
    rightSlice = arr.slice(mirroredAt, arr.length);
    leftSlice = arr.slice(mirroredAt - rightSlice.length, mirroredAt);
  }

  rightSlice.reverse();

  for (let i = 0; i < leftSlice.length; i++) {
    if (leftSlice[i] !== rightSlice[i]) {
      return false;
    }
  }
  return true;
}

const isVerticalMirror = (map, index) => {
  for (const line of map) {
    if (!isStringMirror(line.split(''), index)) {
      return false;
    }
  }
  return true;
}

const isHorrizontalMirror = (map, index) => {
  return isArrayMirror(map, index);
}

const getVerticalMirrorIndices = (map) => {
  const indices = [];
  for (let i = 1; i < map[0].length; i++) {
    let firstLine = "";
    let secondLine = "";
    for (let j = 0; j < map.length; j++) {
      firstLine += map[j][i - 1];
    }
    for (let k = 0; k < map.length; k++) {
      secondLine += map[k][i];
    }
    if (firstLine === secondLine) {
      indices.push(i);
    }
  }
  return indices;
};

const getHorizontalMirrorIndices = (map) => {
  const indices = [];
  for (let i = 1; i < map.length; i++) {
    const firstLine = map[i - 1];
    const secondLine = map[i];
    if (firstLine === secondLine) {
      indices.push(i);
    }
  }
  return indices;
};

const oneStar = (input) => {
  const parsedInput = [];
  let tempMap = [];
  for (const line of input) {
    if (line === "") {
      parsedInput.push(tempMap);
      tempMap = [];
    } else {
      tempMap.push(line);
    }
  }

  if (tempMap.length) {
    parsedInput.push(tempMap);
  }

  let sum = 0;

  for (const map of parsedInput) {
    const verticalIndices = getVerticalMirrorIndices(map);
    const verticalMirrorIndices = verticalIndices.filter(index => isVerticalMirror(map, index));
    const horizontalIndices = getHorizontalMirrorIndices(map);
    const horizontalMirrorIndices = horizontalIndices.filter(index => isHorrizontalMirror(map, index));
    if (verticalMirrorIndices.length) {
      sum += verticalMirrorIndices[0];
    }

    if (horizontalMirrorIndices.length) {
      sum += horizontalMirrorIndices[0] * 100;
    }
  }
  console.log(sum)
};

readLinesFromFile(filePath, (err, linesArray) => {
  oneStar(linesArray);
});
