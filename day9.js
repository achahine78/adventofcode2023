const readLinesFromFile = require("./fileReader");
const filePath = "./day9input.txt";

// const testInput = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];

const checkAllZeros = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      return false;
    }
  }
  return true;
};

const generateNextValue = (sequence) => {
  const extrapolationArray = [sequence];
  let index = 0;
  while (true) {
    const extrapolationSubarray = [];
    for (let i = 1; i < extrapolationArray[index].length; i++) {
      extrapolationSubarray.push(
        extrapolationArray[index][i] - extrapolationArray[index][i - 1]
      );
    }
    extrapolationArray.push(extrapolationSubarray);
    index++;
    if (checkAllZeros(extrapolationSubarray)) {
      break;
    }
  }

  extrapolationArray.reverse();

  extrapolationArray[0].push(0);
  for (let i = 1; i < extrapolationArray.length; i++) {
    const previousArray = extrapolationArray[i - 1];
    const currentArray = extrapolationArray[i]
    currentArray.push(previousArray[previousArray.length - 1] + currentArray[currentArray.length - 1])
  }

  return sequence.pop();
};

const parseInputOneStar = (input) => {
  const sequences = input.map((line) => line.split(" ").map(Number));
  let sum = 0;
  sequences.forEach((sequence) => {
    sum += generateNextValue(sequence);
  });
  console.log("oneStar: ", sum)
};

readLinesFromFile(filePath, (err, linesArray) => {
  parseInputOneStar(linesArray);
});
