import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const ranges = input.split(",").map((range) => {
		const [min, max] = range.split("-").map(Number);
		return { min, max };
	});
	let sum = 0;

	for (let i = 0; i < ranges.length; i++) {
		const { min, max } = ranges[i];

		for (let num = min; num <= max; num++) {
			const numStr = num.toString();
			if (numStr.length % 2 !== 0) continue;
			const regex = /^(.+)\1$/;
			// console.log(
			// 	`Checking number: ${numStr}, repeatLength: ${repeatLength}, regex: ${regex}`,
			// );
			const matches = numStr.match(regex);
			// matches && console.log(matches);
			matches && (sum += num);
		}
	}

	return sum;
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const ranges = input.split(",").map((range) => {
		const [min, max] = range.split("-").map(Number);
		return { min, max };
	});
	let sum = 0;

	for (let i = 0; i < ranges.length; i++) {
		const { min, max } = ranges[i];

		for (let num = min; num <= max; num++) {
			const numStr = num.toString();
			const regex = /^(.+)\1+$/;
			// console.log(
			// 	`Checking number: ${numStr}, repeatLength: ${repeatLength}, regex: ${regex}`,
			// );
			const matches = numStr.match(regex);
			// matches && console.log(matches);
			matches && (sum += num);
		}
	}

	return sum;
};

run({
	part1: {
		tests: [
			{
				input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
				expected: 1227775554,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
				expected: 4174379265,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
