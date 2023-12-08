const readLinesFromFile = require("./fileReader");
const filePath = "./day8input.txt";

const parseInputOneStar = (input) => {
  const navigationInstructions = input.shift();
  input.shift();
  let map = {};
  input.forEach((line) => {
    let [node, neighbours] = line.split(" = ");
    let [leftNeighbour, rightNeighbour] = neighbours.split(",");
    leftNeighbour = leftNeighbour.replace("(", "");
    rightNeighbour = rightNeighbour.replace(")", "").trim();

    map[node] = {
      left: leftNeighbour,
      right: rightNeighbour,
    };
  });

  let stepCounter = 0;
  let currentNode = 'AAA';
  let instructionIndex = 0;
  while (currentNode !== 'ZZZ') {
    const instruction = navigationInstructions[instructionIndex];
    if (instruction === 'L') {
      currentNode = map[currentNode].left;
    } else {
      currentNode = map[currentNode].right;
    }
    stepCounter++;
    instructionIndex = (instructionIndex + 1) % navigationInstructions.length;
  }

  console.log("oneStar: ", stepCounter);
};
readLinesFromFile(filePath, (err, linesArray) => {
  parseInputOneStar(linesArray)
});
