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

const parseArray = (array) => {
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

readLinesFromFile(filePath, (_err, linesArray) => {
  const sum = parseArray(linesArray).reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log("sum: ", sum);
});
