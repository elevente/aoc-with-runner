import run from "aocrunner";

let input: string[][];
let coords: string[] = [];
let splits: string[] = [];
let splitMulti: number[] = [];

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

const findNextCoord2 = (y: number, x: number) => {
  if (input.length <= y || x < 0 || input[y].length <= x) {
    return;
  }
  // console.log(y, x);
  if (input[y][x] === "^") {
    if (splits.includes(`${y},${x}`)) {
      splitMulti[y] = splits.length;
    } else {
      splits.push(`${y},${x}`);
      // console.log("SPLIT");
      findNextCoord2(y, x - 1);
      findNextCoord2(y, x + 1);
    }
  } else {
    input[y][x] = "|";
    findNextCoord2(y + 1, x);
  }
}

const part2 = (rawInput: string) => {
  input = parseInput(rawInput);
  const startCoord = input[0].indexOf("S");
  splits = [];
  findNextCoord2(0, startCoord);
  for (const [key, value] of Object.entries(splitMulti)) {
    console.log(`${key}: ${value}`);
  }
  return splits.length + 1;
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
