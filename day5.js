const inputString = require("./day5input");

const mapSourceToDestination = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    let subarray = array[i];
    let [destination, source, range] = subarray;
    source = Number(source);
    destination = Number(destination);
    range = Number(range);
    const diff = value - source;
    if (diff >= 0 && diff < range) {
      return diff + destination;
    }
  }

  return Number(value);
};

const parseInputString = (input) => {
  const splitInput = input.split("\n");
  const maps = {};
  let mapName;
  splitInput.forEach((line) => {
    if (line.includes(":")) {
      mapName = line.split(":")[0];
      maps[mapName] = [];
    } else if (line !== "") {
      maps[mapName].push(line.split(" "));
    }
  });

  const [seeds] = maps["seeds"];

  const locations = seeds
    .map((seed) => mapSourceToDestination(maps["seed-to-soil map"], seed))
    .map((soil) => mapSourceToDestination(maps["soil-to-fertilizer map"], soil))
    .map((fertilizer) =>
      mapSourceToDestination(maps["fertilizer-to-water map"], fertilizer)
    )
    .map((water) => mapSourceToDestination(maps["water-to-light map"], water))
    .map((light) =>
      mapSourceToDestination(maps["light-to-temperature map"], light)
    )
    .map((temperature) =>
      mapSourceToDestination(maps["temperature-to-humidity map"], temperature)
    )
    .map((humidity) =>
      mapSourceToDestination(maps["humidity-to-location map"], humidity)
    );
  return Math.min(...locations);
};

const oneStar = parseInputString(inputString);
console.log('oneStar: ', oneStar);
