import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getBatteryBanks = (input: string) => {
  return input.split("\n").map(bank => bank.split("").map(Number));
}

const getMaxJoltage = (batteries: number[], length = 2) => {
  let max = Array(length).fill(0);
  batteries.forEach((battery, i)=> {
    for (let l = 0; l < length; l++) {
      // console.log(`max[l] < battery && i < batteries.length - (length - l) + 1: ${max[l]} < ${battery} && ${i} < ${batteries.length - (length - l) + 1}`);
      if (max[l] < battery && i < batteries.length - (length - l) + 1) {
        max[l] = battery;
        for (let m = l + 1; m < length; m++) {
          max[m] = 0;
        }
        break;
      }
    }
  });
  // console.log(max);
  let joltage = 0;
  for (let j = 0; j < length; j++) {
    joltage += max[j] * (10 ** (length - j - 1));
  }
  // console.log(joltage);
  return joltage;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const banks = getBatteryBanks(input);
  let joltage = 0;
  banks.forEach(batteries => {
    joltage += getMaxJoltage(batteries, 2);
  });
  return joltage;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const banks = getBatteryBanks(input);
  let joltage = 0;
  banks.forEach(batteries => {
    joltage += getMaxJoltage(batteries, 12);
  });
  return joltage;
};

run({
  part1: {
    tests: [
      {
        input: `
          987654321111111
          811111111111119
          234234234234278
          818181911112111
        `,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          987654321111111
          811111111111119
          234234234234278
          818181911112111
        `,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
