const readLinesFromFile = require("./fileReader");

const howManyWaysToWin = (time, distance) => {
  let winningStrategies = [];
  for (let i = 1; i < time; i++) {
    const speed = i;
    const remainingTime = Number(time) - i;
    const travelledDistance = speed * remainingTime;
    if (travelledDistance > Number(distance)) {
      winningStrategies.push(i);
    }
  }
  return winningStrategies.length;
};

const generateRacesFromInputOneStar = (input) => {
  let [time, distance] = input;
  let [, timeArray] = time.split(":");
  let [, distanceArray] = distance.split(":");
  timeArray = timeArray.split(" ").filter((el) => el !== "");
  distanceArray = distanceArray.split(" ").filter((el) => el !== "");
  console.log("timeArray: ", timeArray);
  console.log("distanceArray: ", distanceArray);

  return { timeArray, distanceArray };
};

const generateRaceFromInputTwoStar = (input) => {
  let [time, distance] = input;
  let [, timeArray] = time.split(":");
  let [, distanceArray] = distance.split(":");
  timeArray = timeArray
    .split(" ")
    .filter((el) => el !== "")
    .join("");
  distanceArray = distanceArray
    .split(" ")
    .filter((el) => el !== "")
    .join("");

  return {
    raceTime: timeArray,
    raceDistance: distanceArray,
  };
};

const countStrategies = (timeArray, distanceArray) => {
  let product = 1;
  for (let i = 0; i < timeArray.length; i++) {
    product *= howManyWaysToWin(timeArray[i], distanceArray[i]);
  }
  return product;
};

const filePath = "./day6input.txt";

readLinesFromFile(filePath, (_err, linesArray) => {
  const { timeArray, distanceArray } = generateRacesFromInputOneStar(linesArray);
  const oneStarProduct = countStrategies(timeArray, distanceArray);

  console.log(oneStarProduct)

  const { raceTime, raceDistance } = generateRaceFromInputTwoStar(linesArray);
  const twoStarSolution = howManyWaysToWin(raceTime, raceDistance);

  console.log(twoStarSolution);
});
