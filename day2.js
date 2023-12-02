const readLinesFromFile = require("./fileReader");

const parseGameStringOneStar = (str, index) => {
  const [, gamesString] = str.split(":");
  const games = gamesString.split(";");
  let isValid = true;
  games.forEach((game) => {
    const reveals = game.split(",").map((reveal) => reveal.trim());
    reveals.forEach((reveal) => {
      const [count, color] = reveal.split(" ");
      if (color === "red" && count > 12) {
        isValid = false;
      }
      if (color === "green" && count > 13) {
        isValid = false;
      }
      if (color === "blue" && count > 14) {
        isValid = false;
      }
    });
  });

  return isValid ? index + 1 : 0;
};

const parseGameStringTwoStars = (str, index) => {
  const [, gamesString] = str.split(":");
  const games = gamesString.split(";");
  const colorCountMap = {
    red: 0,
    green: 0,
    blue: 0,
  };
  games.forEach((game) => {
    const reveals = game.split(",").map((reveal) => reveal.trim());
    reveals.forEach((reveal) => {
      const [count, color] = reveal.split(" ");
      colorCountMap[color] = Math.max(count, colorCountMap[color]);
    });
  });
  let power = 1;
  Object.keys(colorCountMap).forEach((key) => {
    power *= colorCountMap[key];
  });
  return power;
};

const filePath = "./day2input.txt";
readLinesFromFile(filePath, (_err, linesArray) => {
  const oneStarSum = linesArray
    .map(parseGameStringOneStar)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  console.log(oneStarSum);

  const twoStarSum = linesArray
    .map(parseGameStringTwoStars)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  console.log(twoStarSum);
});
