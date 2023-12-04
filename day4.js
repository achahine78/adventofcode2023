const readLinesFromFile = require("./fileReader");

const parseCard = (cardText) => {
  const [, cardContent] = cardText.split(":");
  let [winningNumbers, numbersYouHave] = cardContent.split("|");
  winningNumbers = winningNumbers
    .trim()
    .split(" ")
    .filter((s) => s !== "");
  numbersYouHave = numbersYouHave
    .trim()
    .split(" ")
    .filter((s) => s !== "");
  return {
    winningNumbers,
    numbersYouHave,
  };
};

const checkHowManyMatches = ({ winningNumbers, numbersYouHave }) => {
  const winningNumbersLookup = winningNumbers.reduce((acc, currentValue) => {
    acc[currentValue] = true;
    return acc;
  }, {});

  let count = 0;

  numbersYouHave.forEach((number) => {
    if (winningNumbersLookup[number]) {
      count++;
    }
  });

  return count;
};

const processMatches = (matches) => {
  let result = matches.map((match, index) => [index + 1]);
  for (let i = 0; i < matches.length - 1; i++) {
    const numberOfMatches = matches[i];
    for (let j = 1; j <= numberOfMatches; j++) {
      for (let k = 0; k < result[i].length; k++)
        result[i + j].push(result[i + j][0]);
    }
  }
  
  let count = 0;
  result.forEach(cardCopies => {
    count += cardCopies.length;
  });

  return count;
};

const filePath = "./day4input.txt";

readLinesFromFile(filePath, (_err, linesArray) => {
  const oneStarSum = linesArray
    .map(parseCard)
    .map(checkHowManyMatches)
    .reduce((accumulator, currentValue) => {
      return accumulator + (currentValue ? Math.pow(2, currentValue - 1) : 0);
    }, 0);
  console.log("oneStarSum: ", oneStarSum);

  const matches = linesArray.map(parseCard).map(checkHowManyMatches);
  const twoStarSum = processMatches(matches)
  console.log("twoStarSum: ", twoStarSum);
});
