const readLinesFromFile = require("./fileReader");

const filePath = "./day7input.txt";

const mostRepeatedCharacterFrequency = (str) => {
  const charFrequency = {};

  for (const char of str) {
    charFrequency[char] = (charFrequency[char] || 0) + 1;
  }

  let mostRepeatedChar = "";
  let highestFrequency = 0;

  for (const char in charFrequency) {
    if (charFrequency[char] > highestFrequency) {
      mostRepeatedChar = char;
      highestFrequency = charFrequency[char];
    }
  }

  return { mostRepeatedChar, highestFrequency };
};

const isFullHouse = (hand) => {
  let charArray = Array.from(new Set(hand.split("")));
  return charArray.length === 2;
};

const isTwoPair = (hand) => {
  let charArray = Array.from(new Set(hand.split("")));
  return charArray.length === 3;
};

const getMostPowerfulCard = (hand) => {
  const charFrequency = {};

  for (const char of hand) {
    charFrequency[char] = (charFrequency[char] || 0) + 1;
  }

  let mostRepeatedChar = "";
  let highestFrequency = 0;

  for (const char in charFrequency) {
    if (char !== "J" && charFrequency[char] > highestFrequency) {
      mostRepeatedChar = char;
      highestFrequency = charFrequency[char];
    }
  }

  return Boolean(mostRepeatedChar) ? mostRepeatedChar : "A"
};

const getType = (hand) => {
  const fakeHand = hand.replaceAll("J", getMostPowerfulCard(hand)); // Change this to const fakeHand = hand; for one star soluton

  const { highestFrequency } = mostRepeatedCharacterFrequency(fakeHand);

  if (highestFrequency === 5) {
    return "FIVE_OF_A_KIND";
  }

  if (highestFrequency === 4) {
    return "FOUR_OF_A_KIND";
  }

  if (highestFrequency === 3) {
    return isFullHouse(fakeHand) ? "FULL_HOUSE" : "THREE_OF_A_KIND";
  }

  if (highestFrequency === 2) {
    return isTwoPair(fakeHand) ? "TWO_PAIR" : "ONE_PAIR";
  }

  return "HIGH_CARD";
};

const typeToNumberMap = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  FULL_HOUSE: 4,
  FOUR_OF_A_KIND: 5,
  FIVE_OF_A_KIND: 6,
};

const cardToNumberMap = {
  J: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  Q: 10,
  K: 11,
  A: 12,
};

const calculateStringScore = (str, charScoresMap) => {
  const scoreArray = str.split("").map((char) => charScoresMap[char]);
  return scoreArray;
};

groupByType = (data) => {
  const groupedByType = {};

  for (const obj of data) {
    const { type } = obj;

    if (!groupedByType[type]) {
      groupedByType[type] = [];
    }

    groupedByType[type].push(obj);
  }

  const resultArray = Object.values(groupedByType);

  return resultArray;
};

const unwrapData = (array) => {
  const result = [];
  array.forEach((subArray) => {
    subArray.forEach((el) => {
      result.push(el);
    });
  });
  return result;
};

const parseInput = (input) => {
  let data = [];
  for (const line of input) {
    const [hand, bid] = line.split(" ");
    data.push({
      hand,
      bid,
      type: getType(hand),
    });
  }

  data.sort((a, b) => typeToNumberMap[a.type] - typeToNumberMap[b.type]);

  data = groupByType(data);

  data.forEach((group) => {
    group.sort((a, b) => {
      const aHandScores = calculateStringScore(a.hand, cardToNumberMap);
      const bHandScores = calculateStringScore(b.hand, cardToNumberMap);
      for (let i = 0; i < 5; i++) {
        if (aHandScores[i] !== bHandScores[i]) {
          return aHandScores[i] - bHandScores[i];
        }
      }
      return 0;
    });
  });

  data = unwrapData(data);

  let sum = 0;

  data.forEach(({ bid }, index) => {
    sum += Number(bid) * (index + 1);
  });

  console.log(sum);
};

readLinesFromFile(filePath, (err, linesArray) => {
  parseInput(linesArray);
});
