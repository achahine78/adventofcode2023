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
  let currentNode = "AAA";
  let instructionIndex = 0;
  while (currentNode !== "ZZZ") {
    const instruction = navigationInstructions[instructionIndex];
    if (instruction === "L") {
      currentNode = map[currentNode].left;
    } else {
      currentNode = map[currentNode].right;
    }
    stepCounter++;
    instructionIndex = (instructionIndex + 1) % navigationInstructions.length;
  }

  console.log("oneStar: ", stepCounter);
};

const getAllNodesThatEndWithA = (nodes) => {
  const result = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node[node.length - 1] === "A") {
      result.push(node);
    }
  }
  return result;
};

const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);

const parseInputTwoStar = (input) => {
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

  let nodesThatEndWithA = getAllNodesThatEndWithA(Object.keys(map));
  const nodeToStepCount = {};

  nodesThatEndWithA.forEach((node) => {
    let stepCounter = 0;
    let currentNode = node;
    let instructionIndex = 0;
    while (currentNode[currentNode.length - 1] !== "Z") {
      const instruction = navigationInstructions[instructionIndex];
      if (instruction === "L") {
        currentNode = map[currentNode].left;
      } else {
        currentNode = map[currentNode].right;
      }
      stepCounter++;
      instructionIndex = (instructionIndex + 1) % navigationInstructions.length;
    }

    nodeToStepCount[node] = stepCounter;
  });

  const steps = Object.keys(nodeToStepCount)
    .map((key) => nodeToStepCount[key])
    .reduce(lcm);

  console.log("twoStar: ", steps);
};

readLinesFromFile(filePath, (err, linesArray) => {
  // parseInputOneStar(linesArray);
  parseInputTwoStar(linesArray);
});
