import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const commands = input.split("\n").map((c) => ({ direction: c[0], quantity: parseInt(c.substring(1), 10) }));
  const minimum = 0;
  const maximum = 99;
  let currentNumber = 50;
  let zeroes = 0;
  commands.forEach((command) => {
    // console.log(command);
    if (command.direction === "R") {
      currentNumber += command.quantity;
    } else {
      currentNumber -= command.quantity;
    }
    while (currentNumber < minimum) {
      currentNumber += maximum + 1;
    }
    while (currentNumber > maximum) {
      currentNumber -= maximum + 1;
    }
    // console.log(currentNumber);
    if (currentNumber === 0) {
      zeroes++;
    }
  });
  return zeroes;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const commands = input.split("\n").map((c) => ({ direction: c[0], quantity: parseInt(c.substring(1), 10) }));
  const minimum = 0;
  const maximum = 99;
  let currentNumber = 50;
  let zeroes = 0;
  commands.forEach((command) => {
    let rollover = false;
    // console.log(command);
    if (command.direction === "R") {
      currentNumber += command.quantity;
    } else {
      currentNumber -= command.quantity;
    }
    while (currentNumber < minimum) {
      let i = 0;
      if (i !== 0 || currentNumber !== (minimum - command.quantity)) {
        zeroes++;
        rollover = true;
        // console.log("min", currentNumber);
      }
      currentNumber += maximum + 1;
      i++;
      if (currentNumber === 0) {
        zeroes++;
        // console.log("zeromin", currentNumber);
      }
    }
    while (currentNumber > maximum) {
      zeroes++;
      rollover = true;
      // console.log("max", currentNumber);
      currentNumber -= maximum + 1;
    }
    // console.log("end", currentNumber);
    if (currentNumber === 0 && !rollover) {
      zeroes++;
      // console.log("zero", currentNumber);
    }
  });
  return zeroes;
};

run({
  part1: {
    tests: [
      {
        input: `
          L68
          L30
          R48
          L5
          R60
          L55
          L1
          L99
          R14
          L82
        `,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          L368
          L30
          R148
          L5
          R60
          L55
          L1
          L399
          R14
          L82
        `,
        expected: 13,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
