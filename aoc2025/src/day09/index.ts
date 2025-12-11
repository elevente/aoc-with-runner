import run from "aocrunner";

const parseInput = (rawInput: string) =>
	rawInput.split("\n").map((l) => l.split(",").map(Number));

const part1 = (rawInput: string) => {
	let input = parseInput(rawInput);
	input = input.map((item) => [item[1], item[0]]);
	// const lines = input.sort((a, b) => b[0] - a[0])[0][0];
	// const rows = input.sort((a, b) => b[1] - a[1])[0][1];
	// let matrix = [];
	// for (let i = 0; i <= lines; i++) {
	// 	let line = [];
	// 	for (let j = 0; j <= rows; j++) {
	// 		line.push(".");
	// 	}
	// 	matrix.push(line);
	// }
	// for (let point of input) {
	// 	matrix[point[0]][point[1]] = "#";
	// }
	// console.log(matrix.map((l) => l.join("")).join("\n"));
	let area = 0;
	for (let i = 0; i < input.length; i++) {
		for (let j = i + 1; j < input.length; j++) {
			const thisArea =
				(Math.abs(input[i][0] - input[j][0]) + 1) *
				(Math.abs(input[i][1] - input[j][1]) + 1);
			if (thisArea > area) {
				area = thisArea;
			}
		}
	}
	return area;
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	let reds = input.map((item) => [item[1], item[0]]);
	let greens: number[][] = [];
	for (let i = 0; i < reds.length; i++) {
		for (let j = i + 1; j < reds.length; j++) {
			if (reds[i][0] === reds[j][0]) {
				const small = reds[i][1] < reds[j][1] ? reds[i][1] : reds[j][1];
				const big = reds[i][1] > reds[j][1] ? reds[i][1] : reds[j][1];
				for (let k = small + 1; k < big; k++) {
					greens.push([reds[i][0], k]);
				}
			} else if (reds[i][1] === reds[j][1]) {
				const small = reds[i][0] < reds[j][0] ? reds[i][0] : reds[j][0];
				const big = reds[i][0] > reds[j][0] ? reds[i][0] : reds[j][0];
				for (let k = small + 1; k < big; k++) {
					greens.push([k, reds[i][1]]);
				}
			}
		}
	}
	// console.log("Greens before deduplication:", greens.length);
	// let greensInner: number[][] = [];
	// for (let i = 0; i < greens.length; i++) {
	// 	for (let j = i + 1; j < greens.length; j++) {
	// 		if (greens[i][0] === greens[j][0]) {
	// 			const small =
	// 				greens[i][1] < greens[j][1] ? greens[i][1] : greens[j][1];
	// 			const big =
	// 				greens[i][1] > greens[j][1] ? greens[i][1] : greens[j][1];
	// 			for (let k = small + 1; k < big; k++) {
	// 				if (
	// 					!reds
	// 						.map((r) => r.join(","))
	// 						.includes([greens[i][0], k].join(","))
	// 				) {
	// 					greensInner.push([greens[i][0], k]);
	// 				}
	// 			}
	// 		} else if (greens[i][1] === greens[j][1]) {
	// 			const small =
	// 				greens[i][0] < greens[j][0] ? greens[i][0] : greens[j][0];
	// 			const big =
	// 				greens[i][0] > greens[j][0] ? greens[i][0] : greens[j][0];
	// 			for (let k = small + 1; k < big; k++) {
	// 				if (
	// 					!reds
	// 						.map((r) => r.join(","))
	// 						.includes([k, greens[i][1]].join(","))
	// 				) {
	// 					greensInner.push([k, greens[i][1]]);
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// const lines = reds.sort((a, b) => b[0] - a[0])[0][0];
	// const rows = reds.sort((a, b) => b[1] - a[1])[0][1];
	// let matrix = [];
	// for (let i = 0; i <= lines; i++) {
	// 	let line = [];
	// 	for (let j = 0; j <= rows; j++) {
	// 		line.push(".");
	// 	}
	// 	matrix.push(line);
	// }
	// for (let point of reds) {
	// 	matrix[point[0]][point[1]] = "#";
	// }
	// for (let point of greens) {
	// 	matrix[point[0]][point[1]] = "X";
	// }
	// for (let point of greensInner) {
	// 	matrix[point[0]][point[1]] = "X";
	// }
	// console.log(matrix.map((l) => l.join("")).join("\n"));
	// let area = 0;
	// for (let i = 0; i < reds.length; i++) {
	// 	for (let j = i + 1; j < reds.length; j++) {
	// 		const thisArea =
	// 			(Math.abs(reds[i][0] - reds[j][0]) + 1) *
	// 			(Math.abs(reds[i][1] - reds[j][1]) + 1);
	// 		if (thisArea > area) {
	// 			// console.log(
	// 			// 	`Reds coordinates at ${i} and ${j} are ${reds[i]} and ${reds[j]}`,
	// 			// );
	// 			const smallY =
	// 				reds[i][0] < reds[j][0] ? reds[i][0] : reds[j][0];
	// 			const bigY = reds[i][0] > reds[j][0] ? reds[i][0] : reds[j][0];
	// 			const smallX =
	// 				reds[i][1] < reds[j][1] ? reds[i][1] : reds[j][1];
	// 			const bigX = reds[i][1] > reds[j][1] ? reds[i][1] : reds[j][1];
	// 			let valid = true;
	// 			// console.log(
	// 			// 	`Checking area between ${smallY},${smallX} and ${bigY},${bigX}`,
	// 			// );
	// 			for (let y = smallY; y <= bigY; y++) {
	// 				for (let x = smallX; x <= bigX; x++) {
	// 					if (matrix[y][x] === ".") {
	// 						valid = false;
	// 					}
	// 				}
	// 			}
	// 			if (valid) {
	// 				area = thisArea;
	// 			}
	// 		}
	// 	}
	// }
	// return area;

	const lines = reds.sort((a, b) => b[0] - a[0])[0][0];
	const rows = reds.sort((a, b) => b[1] - a[1])[0][1];
	let area = 0;
	for (let i = 0; i < reds.length; i++) {
		for (let j = i + 1; j < reds.length; j++) {
			const thisArea =
				(Math.abs(reds[i][0] - reds[j][0]) + 1) *
				(Math.abs(reds[i][1] - reds[j][1]) + 1);
			if (thisArea > area) {
				const corner1 = [reds[i][0], reds[j][1]];
				const corner2 = [reds[j][0], reds[i][1]];
				console.log(
					`Reds are ${reds[i]} and ${reds[j]}. Corners are ${corner1} and ${corner2}`,
				);
				let valid = true;
				if (!reds.map((r) => r.join(",")).includes(corner1.join(","))) {
					const checkSmallerY = reds[j][0] > corner1[0];
					const checkSmallerX = reds[i][1] > corner1[1];
					if (checkSmallerY) {
						let validY = false;
						for (let y = corner1[0]; y >= 0; y--) {
							if (
								reds
									.map((r) => r.join(","))
									.includes([y, corner1[1]].join(","))
							) {
								validY = true;
								break;
							}
						}
						if (!validY) valid = false;
					} else {
						let validY = false;
						for (let y = corner1[0]; y < corner2[0]; y++) {
							if (
								reds
									.map((r) => r.join(","))
									.includes([y, corner1[1]].join(","))
							) {
								validY = true;
								break;
							}
						}
						if (!validY) valid = false;
					}
					if (checkSmallerX) {
						let validX = false;
						for (let x = corner1[1]; x >= 0; x--) {
							if (
								reds
									.map((r) => r.join(","))
									.includes([corner1[0], x].join(","))
							) {
								validX = true;
								break;
							}
						}
						if (!validX) valid = false;
					} else {
						let validX = false;
						for (let x = corner1[1]; x < corner2[1]; x++) {
							if (
								reds
									.map((r) => r.join(","))
									.includes([corner1[0], x].join(","))
							) {
								validX = true;
								break;
							}
						}
						if (!validX) valid = false;
					}
					// console.log(
					// 	`Checking green at ${corner1}, smallerY: ${checkSmallerY}, smallerX: ${checkSmallerX}`,
					// );
				}
				if (!reds.map((r) => r.join(",")).includes(corner2.join(","))) {
					const checkSmallerY = reds[i][0] > corner2[0];
					const checkSmallerX = reds[j][1] > corner2[1];
					if (checkSmallerY) {
						let validY = false;
						for (let y = corner2[0]; y >= 0; y--) {
							console.log(`Checking red at ${y},${corner2[1]}`);
							if (
								reds
									.map((r) => r.join(","))
									.includes([y, corner2[1]].join(","))
							) {
								validY = true;
								break;
							}
							let redsOnLine = 0;
							let redsOnLineSmaller = 0;
							let redsOnLineBigger = 0;
							for (let z = 0; z <= rows; z++) {
								console.log(
									`Checking red on line at ${y},${z}`,
								);
								if (
									reds
										.map((r) => r.join(","))
										.includes([y, z].join(","))
								) {
									redsOnLine++;
									if (z < corner2[1]) {
										redsOnLineSmaller++;
									} else if (z > corner2[1]) {
										redsOnLineBigger++;
									}
								}
							}
							console.log(
								`Reds on line ${y}: ${redsOnLine}, smaller ${redsOnLineSmaller}, bigger ${redsOnLineBigger}`,
							);
							if (
								redsOnLine > 1 &&
								redsOnLineSmaller > 0 &&
								redsOnLineBigger > 0
							) {
								validY = true;
								break;
							}
						}
						if (!validY) valid = false;
					} else {
						let validY = false;
						for (let y = corner2[0]; y < corner1[0]; y++) {
							if (
								reds
									.map((r) => r.join(","))
									.includes([y, corner2[1]].join(","))
							) {
								validY = true;
								break;
							}
							let redsOnLine = 0;
							let redsOnLineSmaller = 0;
							let redsOnLineBigger = 0;
							for (let z = 0; z <= rows; z++) {
								console.log(
									`Checking red on line at ${y},${z}`,
								);
								if (
									reds
										.map((r) => r.join(","))
										.includes([y, z].join(","))
								) {
									redsOnLine++;
									if (z < corner2[1]) {
										redsOnLineSmaller++;
									} else if (z > corner2[1]) {
										redsOnLineBigger++;
									}
								}
							}
							console.log(
								`Reds on line ${y}: ${redsOnLine}, smaller ${redsOnLineSmaller}, bigger ${redsOnLineBigger}`,
							);
							if (
								redsOnLine > 1 &&
								redsOnLineSmaller > 0 &&
								redsOnLineBigger > 0
							) {
								validY = true;
								break;
							}
						}
						if (!validY) valid = false;
					}
					if (checkSmallerX) {
						let validX = false;
						for (let x = corner2[1]; x >= 0; x--) {
							if (
								reds
									.map((r) => r.join(","))
									.includes([corner2[0], x].join(","))
							) {
								validX = true;
								break;
							}
							let redsOnRow = 0;
							for (let z = 0; z < input.length; z++) {
								if (
									reds
										.map((r) => r.join(","))
										.includes([z, x].join(","))
								) {
									redsOnRow++;
								}
							}
							if (redsOnRow > 1) {
								validX = true;
							}
						}
						if (!validX) valid = false;
					} else {
						let validX = false;
						for (let x = corner2[1]; x < corner1[1]; x++) {
							if (
								reds
									.map((r) => r.join(","))
									.includes([corner2[0], x].join(","))
							) {
								validX = true;
								break;
							}
							let redsOnRow = 0;
							for (let z = 0; z < input.length; z++) {
								if (
									reds
										.map((r) => r.join(","))
										.includes([z, x].join(","))
								) {
									redsOnRow++;
								}
							}
							if (redsOnRow > 1) {
								validX = true;
							}
						}
						if (!validX) valid = false;
					}
					// console.log(
					// 	`Checking green at ${corner2}, smallerY: ${checkSmallerY}, smallerX: ${checkSmallerX}`,
					// );
				}
				console.log(
					`Area between ${reds[i]} and ${reds[j]} is valid: ${valid}`,
				);
				if (valid) {
					area = thisArea;
				}
			}
		}
	}

	return area;
};

run({
	part1: {
		tests: [
			{
				input: `
					7,1
					11,1
					11,7
					9,7
					9,5
					2,5
					2,3
					7,3
				`,
				expected: 50,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
					7,1
					11,1
					11,7
					9,7
					9,5
					2,5
					2,3
					7,3
				`,
				expected: 24,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
