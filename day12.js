const readLinesFromFile = require("./fileReader");
const filePath = "./day12input.txt";

const isLineValid = (line, conditions) => {
  let lineArray = line.split(".").filter((el) => el !== "");

  if (lineArray.length !== conditions.length) {
    return false;
  }

  for (let i = 0; i < lineArray.length; i++) {
    if (lineArray[i].length !== conditions[i]) {
      return false;
    }
  }
  return true;
};

const generatePossibleLines = (line) => {
  const result = [];
  const _generatePossibleLinesRecursively = (currentLine, index) => {
    if (currentLine.length === index) {
      return result.push(currentLine);
    }

    if (currentLine[index] === "?") {
      let damagedReplacement = currentLine.split("");
      damagedReplacement[index] = "#";
      damagedReplacement = damagedReplacement.join("");
      let operationalReplacement = currentLine.split("");
      operationalReplacement[index] = ".";
      operationalReplacement = operationalReplacement.join("");
      _generatePossibleLinesRecursively(damagedReplacement, index + 1);
      _generatePossibleLinesRecursively(operationalReplacement, index + 1);
    } else {
      _generatePossibleLinesRecursively(currentLine, index + 1);
    }
  };

  _generatePossibleLinesRecursively(line, 0);

  return result;
};

const oneStar = (input) => {
  let sum = 0;
  input.forEach((entry) => {
    const [line, conditionsString] = entry.split(" ");
    const conditions = conditionsString.split(",").map(Number);
    const possibleLines = generatePossibleLines(line);
    const validLines = possibleLines.filter((line) =>
      isLineValid(line, conditions)
    );
    sum += validLines.length;
  });
  console.log(sum);
};

readLinesFromFile(filePath, (err, linesArray) => {
  oneStar(linesArray);
});
