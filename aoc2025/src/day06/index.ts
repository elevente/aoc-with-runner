import run from "aocrunner";

const parseInput = (rawInput: string) => {
	const matrix = rawInput.split("\n").map(lines => lines.trim().split(/\ +/));
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const getSum = (input: string[][]) => {
	let sum = 0;
	for (const line of input) {
		let lineSum = 0;
		if (line[line.length - 1] === "+") {
			for (let num = 0; num < line.length - 1; num++) {
				lineSum += parseInt(line[num], 10);
			}
		} else {
			lineSum = 1;
			for (let num = 0; num < line.length - 1; num++) {
				lineSum *= parseInt(line[num], 10);
			}
		}
		sum += lineSum;
	}
	return sum;
}

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	// console.log(input);
	return getSum(input);
};

const parseInput2 = (rawInput: string) => {
	const inputArray = rawInput.split("\n");
	let problems: string[][] = [];
	let problem: string[] = [];
	for (let r = inputArray[0].length - 1; r >= 0; r--) {
		let numString = "";
		for (let l = 0; l < inputArray.length - 1; l++) {
			if (inputArray[l][r] !== "") {
				numString = `${numString}${inputArray[l][r]}`;
				// console.log(numString);
			}
		}
		if (numString.trim() === "" || r === 0) {
			if (r === 0) {
				problem.push(numString.trim());
			}
			const markPos = r === 0 ? r : r + 1;
			problem.push(inputArray[inputArray.length - 1][markPos]);
			problems.push(problem);
			problem = [];
		} else {
			problem.push(numString.trim());
		}
	}
	return problems;
}

const part2 = (rawInput: string) => {
	const input = parseInput2(rawInput);
	// console.log(input);
	return getSum(input);
};

run({
	part1: {
		tests: [
			{
				input: `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
				`,
				expected: 4277556,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
				`,
				expected: 3263827,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
