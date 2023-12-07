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

const sort = (list) => {
  let sortedList = [...list];
  let n = -1;

  while (true) {
    n += 1;

    const current = sortedList[n];
    const next = sortedList[n + 1];

    if (next == undefined) {
      break;
    }

    if (current.start <= next.start) {
      continue;
    }

    sortedList[n] = next;
    sortedList[n + 1] = current;

    n = -1;
  }

  return sortedList;
}

const fillGaps = (oldRange, doneRanges) => {
  const newRanges = [];

  const sortedDoneRanges = sort(doneRanges);

  let start = oldRange.start;

  while (sortedDoneRanges.length > 0) {
    const doneRange = sortedDoneRanges.shift();

    if (start < doneRange.start) {
      newRanges.push({ start, end: doneRange.start - 1 });
    }

    start = doneRange.end + 1;
  }

  if (start < oldRange.end) {
    newRanges.push({ start, end: oldRange.end });
  }

  return newRanges;
};

const searchMap = (map, oldRanges) => {
  const newRanges = [];

  for (const oldRange of oldRanges) {
    const doneRanges = [];

    for (const mapObj of map) {
      const start = Math.max(oldRange.start, mapObj.source.start);

      const end = Math.min(oldRange.end, mapObj.source.end);

      if (start > end) {
        continue;
      }

      const newRange = {
        start: start + mapObj.diff,
        end: end + mapObj.diff,
      };

      newRanges.push(newRange);

      doneRanges.push({ start, end });
    }

    for (const newRange of fillGaps(oldRange, doneRanges)) {
      newRanges.push(newRange);
    }
  }
  return newRanges;
};

const parseInputStringTwoStar = (input) => {
  const parts = input.split("\n\n");
  const seedRanges = [];
  let maps = [];
  const tokens = parts.shift().split(":").pop().trim().split(" ");
  while (tokens.length) {
    const start = Number(tokens.shift());
    const length = Number(tokens.shift());
    const end = start + length - 1;
    seedRanges.push({
      start,
      end,
    });
  }

  while (true) {
    let part = parts.shift();

    if (part == undefined) break;
  
    const lines = part.split(":").pop().trim().split("\n");
    const map = [];
    for (const line of lines) {
      const lineTokens = line.trim().split(" ");
      const destinationStart = Number(lineTokens.shift());
      const sourceStart = Number(lineTokens.shift());
      const length = Number(lineTokens.shift());
      const destinationEnd = destinationStart + length - 1;
      const sourceEnd = sourceStart + length - 1;
      const diff = destinationStart - sourceStart;
      map.push({
        source: {
          start: sourceStart,
          end: sourceEnd,
        },
        destination: {
          start: destinationStart,
          end: destinationEnd,
        },
        diff,
      });
    }
    maps.push(map);
  }

  let tempRanges = seedRanges;

  for (const map of maps) {
    tempRanges = searchMap(map, tempRanges);
  }

  let ranges = tempRanges;

  let best = ranges[0].start;

  for (const range of ranges) {
    if (range.start < best) {
      best = range.start;
    }
  }

  return best;
};

// const oneStar = parseInputString(inputString);
// console.log("oneStar: ", oneStar);

const twoStar = parseInputStringTwoStar(inputString);
console.log("twoStar: ", twoStar);
