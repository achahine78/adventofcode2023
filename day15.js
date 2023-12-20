const readLinesFromFile = require("./fileReader");
const filePath = "./day15input.txt";

const getHashValue = (input) => {
  let currentValue = 0;
  for (let i = 0; i < input.length; i++) {
    currentValue += input.charCodeAt(i);
    currentValue *= 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
}

const oneStar = (input) => {
  let sum = 0;
  input.forEach(el => {
    sum += getHashValue(el);
  });
  console.log(sum);
}

const twoStar = (input) => {
  const hashmap = Array.from(Array(256)).map(() => []);
  for (const instruction of input) {
    if (instruction.includes("=")) {
      const [label, value] = instruction.split("=");
      const hash = getHashValue(label);
      let found = false;
      for (let i = 0; i < hashmap[hash].length; i++) {
        if (hashmap[hash][i].label === label) {
          hashmap[hash][i].value = value;
          found = true;
        }
      }

      if (!found) {
        hashmap[hash].push({ label, value })
      }
    } else {
      const [label] = instruction.split("-");
      const hash = getHashValue(label);
      for (let i = 0; i < hashmap[hash].length; i++) {
        if (hashmap[hash][i].label === label) {
          hashmap[hash].splice(i, 1);
        }
      }
    }
  }

  let focalPower = 0;

  for (let i = 0; i < hashmap.length; i++) {
    for (let j = 0; j < hashmap[i].length; j++) {
      focalPower += (i + 1) * (j + 1) * Number(hashmap[i][j].value);
    }
  }

  console.log(focalPower)
}

readLinesFromFile(filePath, (err, linesArray) => {
  const input = linesArray[0].split(",");
  oneStar(input)
  twoStar(input)
});