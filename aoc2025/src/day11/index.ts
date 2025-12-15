import run from "aocrunner";

const parseInput = (rawInput: string) => Object.fromEntries(rawInput.split("\n").map(l => [ l.split(":")[0], l.split(":")[1].trim().split(" ") ]));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);
  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
          aaa: you hhh
          you: bbb ccc
          bbb: ddd eee
          ccc: ddd eee fff
          ddd: ggg
          eee: out
          fff: out
          ggg: out
          hhh: ccc fff iii
          iii: out
        `,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
