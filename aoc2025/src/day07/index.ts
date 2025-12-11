import run from "aocrunner";

let input: string[][];
let coords: string[] = [];
let splits: string[] = [];
let splitMulti: number[] = [];
let allTimelines = 0;

const parseInput = (rawInput: string) => rawInput.split("\n").map(l => l.split(""));

const findNextCoord = (y: number, x: number) => {
  if (input.length <= y || x < 0 || input[y].length <= x) {
    return;
  }
  if (!coords.includes(`${y},${x}`)) {
    coords.push(`${y},${x}`);
    // console.log(y, x);
    if (input[y][x] === "^") {
      splits.push(`${y},${x}`);
      // console.log("SPLIT");
      findNextCoord(y, x - 1);
      findNextCoord(y, x + 1);
    } else {
      input[y][x] = "|";
      findNextCoord(y + 1, x);
    }
  }
}

const part1 = (rawInput: string) => {
  input = parseInput(rawInput);
  const startCoord = input[0].indexOf("S");
  findNextCoord(0, startCoord);
  let fasz = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "^" && input [i - 1][j] === "|") {
        fasz++;
      }
    }
  }
  // for (const line of input) {
  //   console.log(line.join(""));
  // }
  return fasz;//splits.length;
};

const findNextLevelCoords = (y: number) => {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "^") {
      if (input[y - 1][x] !== ".") {
        input[y][x - 1] = `${input[y][x - 1] === "." ? parseInt(input[y - 1][x], 10) : parseInt(input[y][x - 1], 10) + parseInt(input[y - 1][x], 10)}`;
        input[y][x + 1] = `${input[y][x + 1] === "." ? parseInt(input[y - 1][x], 10) : parseInt(input[y][x + 1], 10) + parseInt(input[y - 1][x], 10)}`;
      }
    } else {
      if (input[y - 1][x] !== "." && input[y - 1][x] !== "^") {
        input[y][x] = `${input[y][x] === "." ? parseInt(input[y - 1][x], 10) : parseInt(input[y][x], 10) + parseInt(input[y - 1][x], 10)}`;
      }
    }
  
  }
}

const part2 = (rawInput: string) => {
  input = parseInput(rawInput);
  const startCoord = input[0].indexOf("S");
  input[0][startCoord] = "1";
  for (let y = 1; y < input.length; y++) {
    findNextLevelCoords(y);
  }
  let timelines = 0;
  const lastLine = input.length - 1;
  for (let x = 0; x < input[lastLine].length; x++) {
    if (input[lastLine][x] !== ".") {
      timelines += parseInt(input[lastLine][x], 10);
    }
  }
  for (const line of input) {
    console.log(line.join(""));
  }
  return timelines;
};

run({
  part1: {
    tests: [
      {
        input: `
        .......S.......
        ...............
        .......^.......
        ...............
        ......^.^......
        ...............
        .....^.^.^.....
        ...............
        ....^.^...^....
        ...............
        ...^.^...^.^...
        ...............
        ..^...^.....^..
        ...............
        .^.^.^.^.^...^.
        ...............
        `,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        .......S.......
        ...............
        .......^.......
        ...............
        ......^.^......
        ...............
        .....^.^.^.....
        ...............
        ....^.^...^....
        ...............
        ...^.^...^.^...
        ...............
        ..^...^.....^..
        ...............
        .^.^.^.^.^...^.
        ...............
        `,
        expected: 40,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
