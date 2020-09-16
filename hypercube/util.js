
function range(start, stop, step) {
	if (typeof stop == 'undefined') {
		// one param defined
		stop = start;
		start = 0;
	}

	if (typeof step == 'undefined') {
		step = 1;
	}

	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return [];
	}

	const result = [];
	for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
		result.push(i);
	}

	return result;
};

const deepCopy = (inObject) => {
	let outObject, value, key

	if (typeof inObject !== "object" || inObject === null) {
		return inObject // Return the value if inObject is not an object
	}

	// Create an array or object to hold the values
	outObject = Array.isArray(inObject) ? [] : {}

	for (key in inObject) {
		value = inObject[key]

		// Recursively (deep) copy for nested objects, including arrays
		outObject[key] = deepCopy(value)
	}

	return outObject
}

export { range, deepCopy };