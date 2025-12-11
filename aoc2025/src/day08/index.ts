import run from "aocrunner";

const parseInput = (rawInput: string) =>
	rawInput.split("\n").map((l) => l.split(",").map(Number));

const distance = (coord1: number[], coord2: number[]) => {
	return (
		(coord1[0] - coord2[0]) ** 2 +
		(coord1[1] - coord2[1]) ** 2 +
		(coord1[2] - coord2[2]) ** 2
	);
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	let distances: { coords: number[]; distance: number }[] = [];
	for (let x = 0; x < input.length; x++) {
		for (let y = x + 1; y < input.length; y++) {
			distances.push({
				coords: [x, y],
				distance: distance(input[x], input[y]),
			});
		}
	}
	distances.sort((a, b) => a.distance - b.distance);
	// console.log(distances);
	let circuits: number[][] = [];
	if (distances.length < 1000) {
		return;
	}
	for (let i = 0; i < 1000; i++) {
		const found = circuits.filter(
			(circuit) =>
				circuit.includes(distances[i].coords[0]) ||
				circuit.includes(distances[i].coords[1]),
		);
		if (found.length === 0) {
			circuits.push(distances[i].coords);
		}
		if (found.length === 1) {
			const index = circuits.findIndex(
				(circuit) => circuit.join(",") === found[0].join(","),
			);
			circuits[index].push(...distances[i].coords);
		}
		if (found.length === 2) {
			const index1 = circuits.findIndex(
				(circuit) => circuit.join(",") === found[0].join(","),
			);
			const index2 = circuits.findIndex(
				(circuit) => circuit.join(",") === found[1].join(","),
			);
			circuits[index1].push(...circuits[index2]);
			circuits[index1].push(...distances[i].coords);
			circuits.splice(index2, 1);
		}
		// console.log(circuits);
	}
	const uniqueCircuits = circuits.map((circuit) => new Set(circuit));
	uniqueCircuits.sort((a, b) => b.size - a.size);
	// console.log(uniqueCircuits);
	// console.log(circuits);
	let total = 1;
	for (let j = 0; j < 3; j++) {
		total *= uniqueCircuits[j].size;
	}
	return total;
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	let distances: { coords: number[]; distance: number }[] = [];
	for (let x = 0; x < input.length; x++) {
		for (let y = x + 1; y < input.length; y++) {
			distances.push({
				coords: [x, y],
				distance: distance(input[x], input[y]),
			});
		}
	}
	distances.sort((a, b) => a.distance - b.distance);
	// console.log(distances);
	let circuits: number[][] = [];
	let total = 0;
	for (let i = 0; i < distances.length; i++) {
		const found = circuits.filter(
			(circuit) =>
				circuit.includes(distances[i].coords[0]) ||
				circuit.includes(distances[i].coords[1]),
		);
		if (found.length === 0) {
			circuits.push(distances[i].coords);
		}
		if (found.length === 1) {
			const index = circuits.findIndex(
				(circuit) => circuit.join(",") === found[0].join(","),
			);
			circuits[index].push(...distances[i].coords);
		}
		if (found.length === 2) {
			const index1 = circuits.findIndex(
				(circuit) => circuit.join(",") === found[0].join(","),
			);
			const index2 = circuits.findIndex(
				(circuit) => circuit.join(",") === found[1].join(","),
			);
			circuits[index1].push(...circuits[index2]);
			circuits[index1].push(...distances[i].coords);
			circuits.splice(index2, 1);
		}
		// console.log(circuits);
		if (circuits.length === 1) {
			const uniqueCircuits = circuits.map((circuit) => new Set(circuit));
			if (uniqueCircuits[0].size === input.length) {
				console.log(
					"All connected with last coords:",
					distances[i].coords,
				);
				total =
					input[distances[i].coords[0]][0] *
					input[distances[i].coords[1]][0];
				break;
			}
		}
	}
	return total;
};

run({
	part1: {
		tests: [
			{
				input: `
					162,817,812
					57,618,57
					906,360,560
					592,479,940
					352,342,300
					466,668,158
					542,29,236
					431,825,988
					739,650,466
					52,470,668
					216,146,977
					819,987,18
					117,168,530
					805,96,715
					346,949,466
					970,615,88
					941,993,340
					862,61,35
					984,92,344
					425,690,689
				`,
				expected: 40,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `
					162,817,812
					57,618,57
					906,360,560
					592,479,940
					352,342,300
					466,668,158
					542,29,236
					431,825,988
					739,650,466
					52,470,668
					216,146,977
					819,987,18
					117,168,530
					805,96,715
					346,949,466
					970,615,88
					941,993,340
					862,61,35
					984,92,344
					425,690,689
				`,
				expected: 25272,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
