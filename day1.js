const fs = require("fs");
const readline = require("readline");

const readLinesFromFile = (filePath, callback) => {
  const linesArray = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    linesArray.push(line);
  });

  rl.on("close", () => {
    callback(null, linesArray);
  });

  rl.on("error", (err) => {
    callback(err, null);
  });
};

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
    const sum = linesArray
      .map(convertStringToTwoDigitNumber)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    console.log(sum);
  }
});
