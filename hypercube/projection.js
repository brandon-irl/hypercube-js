import { range, deepCopy } from './util.js';

function project2D(originalPoints) {
	var points = deepCopy(originalPoints);

	// Special case 1D
	if (points[0].length === 1) {
		points[0].push(0);
		points[1].push(0);
	}

	while (points[0].length !== 2) {
		points.forEach(point => {
			var scaleFactor = 1 / (2 - point[point.length - 1]);
			range(point.length - 1).forEach(_ => {
				point[_] *= scaleFactor;
			});
			point = point.splice(point.length - 1, 1);
		});
	}
	return points;
}

export { project2D };