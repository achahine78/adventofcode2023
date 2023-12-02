const readLinesFromFile = require('./fileReader');

const numberLookup = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
};

const wordToNumberMap = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const convertStringToTwoDigitNumberWithWords = (str) => {
  const stringLength = str.length;
  let leftNum = "";
  let rightNum = "";
  for (let i = 0; i < stringLength; i++) {
    if (numberLookup[str[i]]) {
      leftNum = String(str[i]);
      break;
    } else {
      const stringSlice = str.slice(0, i + 1);
      let found;
      numberWords.map((word) => {
        if (!found && stringSlice.includes(word)) {
          found = word;
        }
      });

      if (found) {
        leftNum = wordToNumberMap[found];
        break;
      }
    }
  }

  for (let i = stringLength - 1; i >= 0; i--) {
    if (numberLookup[str[i]]) {
      rightNum = String(str[i]);
      break;
    } else {
      const stringSlice = str.slice(i, stringLength);
      let found;
      numberWords.map((word) => {
        if (!found && stringSlice.includes(word)) {
          found = word;
        }
      });

      if (found) {
        rightNum = wordToNumberMap[found];
        break;
      }
    }
  }

  return Number(leftNum + rightNum);
};

const convertStringToTwoDigitNumber = (str) => {
  const stringLength = str.length;
  let number = "";
  for (let i = 0; i < stringLength; i++) {
    if (numberLookup[str[i]]) {
      number += String(str[i]);
      break;
    }
  }

  for (let i = stringLength - 1; i >= 0; i--) {
    if (numberLookup[str[i]]) {
      number += str[i];
      break;
    }
  }
  return Number(number);
};

const filePath = "./day1input.txt";
readLinesFromFile(filePath, (err, linesArray) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    const oneStarSum = linesArray
      .map(convertStringToTwoDigitNumber)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    console.log(oneStarSum);

    const twoStarSum = linesArray
      .map(convertStringToTwoDigitNumberWithWords)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    console.log(twoStarSum);
  }
});
