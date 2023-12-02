const readLinesFromFile = require("./fileReader");

const parseGameString = (str, index) => {
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

const filePath = "./day2input.txt";
readLinesFromFile(filePath, (_err, linesArray) => {
  const sum = linesArray
    .map(parseGameString)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  console.log(sum);
});
