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

module.exports = readLinesFromFile;