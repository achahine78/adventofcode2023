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

const filePath = "./day4input.txt";

readLinesFromFile(filePath, (_err, linesArray) => {
  console.log(
    linesArray
      .map(parseCard)
      .map(checkHowManyMatches)
      .reduce((accumulator, currentValue) => {
        return accumulator + (currentValue ? Math.pow(2, currentValue - 1) : 0);
      }, 0)
  );
});
