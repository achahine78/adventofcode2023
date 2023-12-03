const readLinesFromFile = require("./fileReader");

const filePath = "./day3input.txt";

const isNumber = (char) => {
  return !isNaN(char);
};

const isSymbol = (char) => {
  return !isNumber(char) && char !== "." && char !== undefined;
};

const isAdjacentToSymbol = (i, j, array) => {
  if (
    (array[i - 1] && isSymbol(array[i - 1][j])) ||
    (array[i - 1] && isSymbol(array[i - 1][j - 1])) ||
    (array[i - 1] && isSymbol(array[i - 1][j + 1])) ||
    (array[i] && isSymbol(array[i][j - 1])) ||
    (array[i] && isSymbol(array[i][j + 1])) ||
    (array[i + 1] && isSymbol(array[i + 1][j])) ||
    (array[i + 1] && isSymbol(array[i + 1][j + 1])) ||
    (array[i + 1] && isSymbol(array[i + 1][j - 1]))
  ) {
    return true;
  }

  return false;
};

const parseArrayOneStar = (array) => {
  const partNumbers = [];
  for (let i = 0; i < array.length; i++) {
    let line = array[i];
    let currentNumber = "";
    let doesNumberHaveAdjacentSymbol = false;
    for (let j = 0; j < line.length; j++) {
      if (isNumber(array[i][j])) {
        currentNumber += array[i][j];
        if (isAdjacentToSymbol(i, j, array)) {
          doesNumberHaveAdjacentSymbol = true;
        }
      } else {
        if (doesNumberHaveAdjacentSymbol) {
          partNumbers.push(Number(currentNumber));
        }
        currentNumber = "";
        doesNumberHaveAdjacentSymbol = false;
      }
    }
    if (doesNumberHaveAdjacentSymbol) {
      partNumbers.push(Number(currentNumber));
    }
  }

  return partNumbers;
};

const isAdjacentToAsterisk = (i, j, array) => {
  if (array[i - 1] && array[i - 1][j] === "*") {
    return {
      x: i - 1,
      y: j,
      isAdjacent: true,
    };
  }
  if (array[i - 1] && array[i - 1][j - 1] === "*") {
    return {
      x: i - 1,
      y: j - 1,
      isAdjacent: true,
    };
  }
  if (array[i - 1] && array[i - 1][j + 1] === "*") {
    return {
      x: i - 1,
      y: j + 1,
      isAdjacent: true,
    };
  }
  if (array[i] && array[i][j - 1] === "*") {
    return {
      x: i,
      y: j - 1,
      isAdjacent: true,
    };
  }
  if (array[i] && array[i][j + 1] === "*") {
    return {
      x: i,
      y: j + 1,
      isAdjacent: true,
    };
  }
  if (array[i + 1] && array[i + 1][j] === "*") {
    return {
      x: i + 1,
      y: j,
      isAdjacent: true,
    };
  }
  if (array[i + 1] && array[i + 1][j + 1] === "*") {
    return {
      x: i + 1,
      y: j + 1,
      isAdjacent: true,
    };
  }
  if (array[i + 1] && array[i + 1][j - 1] === "*") {
    return {
      x: i + 1,
      y: j - 1,
      isAdjacent: true,
    };
  }
  return {
    isAdjacent: false,
  };
};

const parseArrayTwoStar = (array) => {
  const gearNeighbours = {};
  let currentNumber = "";
  let doesNumberHaveAdjacentGear = false;
  let adjacentGears = {};
  for (let i = 0; i < array.length; i++) {
    let line = array[i];
    currentNumber = "";
    doesNumberHaveAdjacentGear = false;
    adjacentGears = {};
    for (let j = 0; j < line.length; j++) {
      if (isNumber(array[i][j])) {
        currentNumber += array[i][j];
        const { isAdjacent, x, y } = isAdjacentToAsterisk(i, j, array);
        if (isAdjacent) {
          doesNumberHaveAdjacentGear = true;
          adjacentGears = { x, y };
        }
      } else {
        if (doesNumberHaveAdjacentGear) {
          const gearCoordinatesString = `${adjacentGears.x}-${adjacentGears.y}`;
          if (gearNeighbours.hasOwnProperty(gearCoordinatesString)) {
            gearNeighbours[gearCoordinatesString].push(currentNumber);
          } else {
            gearNeighbours[gearCoordinatesString] = [currentNumber];
          }
        }
        currentNumber = "";
        doesNumberHaveAdjacentGear = false;
        adjacentGears = {};
      }
    }
    if (doesNumberHaveAdjacentGear) {
      const gearCoordinatesString = `${adjacentGears.x}-${adjacentGears.y}`;
      if (gearNeighbours.hasOwnProperty(gearCoordinatesString)) {
        gearNeighbours[gearCoordinatesString].push(currentNumber);
      } else {
        gearNeighbours[gearCoordinatesString] = [currentNumber];
      }
    }
  }

  const gears = [];
  Object.keys(gearNeighbours).forEach((key) => {
    if (gearNeighbours[key].length === 2) {
      const [firstGear, secondGear] = gearNeighbours[key];
      gears.push(Number(firstGear) * Number(secondGear));
    }
  });

  return gears;
};

readLinesFromFile(filePath, (_err, linesArray) => {
  const sumOneStar = parseArrayOneStar(linesArray).reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  console.log("sumOneStar: ", sumOneStar);

  const sumTwoStar = parseArrayTwoStar(linesArray).reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  console.log("sumOneStar: ", sumTwoStar);
});
