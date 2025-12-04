import run from "aocrunner";

const ROLL = "@";
const EMPTY = ".";
const MAX_ROLLS_TO_REACH = 3;
const parseInput = (rawInput: string) => rawInput.split("\n").map(r => r.split(""));

const getAdjacentRollCount = (matrix: string[][], position: { x: number, y: number }) => {
	const { x, y } = position;
	let rolls = 0;
	if (matrix[x - 1] && matrix[x - 1][y] === ROLL) rolls++;
	if (matrix[x - 1] && matrix[x - 1][y - 1] === ROLL) rolls++;
	if (matrix[x - 1] && matrix[x - 1][y + 1] === ROLL) rolls++;
	if (matrix[x + 1] && matrix[x + 1][y] === ROLL) rolls++;
	if (matrix[x + 1] && matrix[x + 1][y - 1] === ROLL) rolls++;
	if (matrix[x + 1] && matrix[x + 1][y + 1] === ROLL) rolls++;
	if (matrix[x][y - 1] === ROLL) rolls++;
	if (matrix[x][y + 1] === ROLL) rolls++;
	return rolls;
}

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	let reachable = 0;
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			if (input[x][y] === ROLL && getAdjacentRollCount(input, { x, y }) <= MAX_ROLLS_TO_REACH) {
				reachable++;
				// console.log(x, y);
			}
		}
	}
	return reachable;
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	let totalRemoved = 0;
	const removeReachableRolls = (removed: number) => {
		if (removed === 0) {
			return;
		}

		let removing = 0;
		for (let y = 0; y < input.length; y++) {
			for (let x = 0; x < input[y].length; x++) {
				if (input[x][y] === ROLL && getAdjacentRollCount(input, { x, y }) <= MAX_ROLLS_TO_REACH) {
					input[x][y] = EMPTY;
					removing++;
					totalRemoved++;
				}
			}
		}

		removeReachableRolls(removing);
	}

	removeReachableRolls(-1);

	return totalRemoved;
};

run({
	part1: {
		tests: [
			{
				input: `
					..@@.@@@@.
					@@@.@.@.@@
					@@@@@.@.@@
					@.@@@@..@.
					@@.@@@@.@@
					.@@@@@@@.@
					.@.@.@.@@@
					@.@@@.@@@@
					.@@@@@@@@.
					@.@.@@@.@.
				`,
				expected: 13,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
					..@@.@@@@.
					@@@.@.@.@@
					@@@@@.@.@@
					@.@@@@..@.
					@@.@@@@.@@
					.@@@@@@@.@
					.@.@.@.@@@
					@.@@@.@@@@
					.@@@@@@@@.
					@.@.@@@.@.
				`,
			  expected: 43,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
