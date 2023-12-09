const readLinesFromFile = require("./fileReader");
const filePath = "./day9input.txt";

const checkAllZeros = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      return false;
    }
  }
  return true;
};

const generateNextValueOneStar = (sequence) => {
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
    const currentArray = extrapolationArray[i];
    currentArray.push(
      previousArray[previousArray.length - 1] +
        currentArray[currentArray.length - 1]
    );
  }

  return sequence.pop();
};

const parseInputOneStar = (input) => {
  const sequences = input.map((line) => line.split(" ").map(Number));
  let sum = 0;
  sequences.forEach((sequence) => {
    sum += generateNextValueOneStar(sequence);
  });
  console.log("oneStar: ", sum);
};

const generateNextValueTwoStar = (sequence) => {
  const extrapolationArray = [sequence];
  let index = 0;
  while (true) {
    const extrapolationSubarray = [];
    for (let i = 1; i < extrapolationArray[index].length; i++) {
      extrapolationSubarray.push(
        extrapolationArray[index][i - 1] - extrapolationArray[index][i]
      );
    }
    extrapolationArray.push(extrapolationSubarray);
    index++;
    if (checkAllZeros(extrapolationSubarray)) {
      break;
    }
  }

  extrapolationArray.reverse();

  extrapolationArray[0].unshift(0);
  for (let i = 1; i < extrapolationArray.length; i++) {
    const previousArray = extrapolationArray[i - 1];
    const currentArray = extrapolationArray[i];
    currentArray.unshift(
      previousArray[0] +
        currentArray[0]
    );
  }

  return sequence.shift();
};

const parseInputTwoStar = (input) => {
  const sequences = input.map((line) => line.split(" ").map(Number));
  let sum = 0;
  sequences.forEach((sequence) => {
    sum += generateNextValueTwoStar(sequence);
  });
  console.log("twoStar: ", sum);
};

readLinesFromFile(filePath, (err, linesArray) => {
  parseInputOneStar(linesArray);
  parseInputTwoStar(linesArray);
});
