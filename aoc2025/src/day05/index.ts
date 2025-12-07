import run from "aocrunner";

const parseInput = (rawInput: string) => {
	const parts = rawInput.split("\n\n");
	// console.log(parts[0]);
	let freshIdRanges = parts[0].split("\n").map(ranges => ranges.split("-").map(Number));
	const ingredientIds = parts[1].split("\n").map(Number);
	return { freshIdRanges, ingredientIds };
}

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	// console.log(input);
	let fresh = 0;
	for (const i of input.ingredientIds) {
		for (const f of input.freshIdRanges) {
			if (i >= f[0] && i <= f[1]) {
				fresh++;
				break;
			}
		}
	}
	return fresh;
};

const getUnionOfRanges = (range1: number[], range2: number[]): number[] | undefined => {
	if (range1[0] === range2[0]) {
		return range1[1] > range2[1] ? range1 : range2;
	}

	if (range2[0] <= range1[1]) {
		return [
			range1[0],
			range1[1] > range2[1] ? range1[1] : range2[1]
		];
	}

	return undefined;
}

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	let ranges = input.freshIdRanges;
	ranges.sort((a, b) => a[0] - b[0]);
	for (let i = 0; i < ranges.length - 1; i++) {
		const union = getUnionOfRanges(ranges[i], ranges[i + 1]);
		if (union) {
			ranges.splice(i, 2, union);
			i--;
		}
	}
	// console.log(ranges);
	let idsCount = 0;
	for (let i = 0; i < ranges.length; i++) {
		idsCount += (ranges[i][1] - ranges[i][0] + 1);
	}
	return idsCount;
};

run({
	part1: {
		tests: [
			{
				input: `
					3-5
					10-14
					16-20
					12-18

					1
					5
					8
					11
					17
					32
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
					3-5
					10-14
					16-20
					12-18

					1
					5
					8
					11
					17
					32
				`,
				expected: 14,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
