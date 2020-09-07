import { range, deepCopy } from './util.js';

class Shape {
	constructor(dimension, rotations) {
		this.createShape(dimension);
		this.rotations = rotations;
	}

	createShape(dimension) {
		this.dimension = dimension;

		// Create shape vertices
		this.points = [[-0.5], [0.5]]; // Start at 1D
		range(1, dimension).forEach(i => {
			// Double points
			range(2 ** i).forEach(point => this.points.push(deepCopy(this.points[point])));

			// Add new component
			range(this.points.length).forEach(point => {
				if (point < this.points.length / 2) {
					this.points[point].push(-0.5);
				}
				else {
					this.points[point].push(0.5);
				}
			});
		});

		// Create shape edges
		this.edges = [];
		range(this.points.length - 1).forEach(firstPoint => {
			range(firstPoint + 1, this.points.length).forEach(secondPoint => {
				var differences = 0;
				range(this.points[firstPoint].length).forEach(component => {
					if (this.points[firstPoint][component] !== this.points[secondPoint][component]) {
						differences++;
					}
				});
				if (differences === 1) {
					this.edges.push([firstPoint, secondPoint]);
				}
			})
		});

	}

	rotate() {
		this.rotations.forEach(rotation => {
			this.points.forEach(point => {
				var new_axis1 = (point[rotation[0][0]] * Math.cos(rotation[1])) + (point[rotation[0][1]] * Math.sin(rotation[1]));
				var new_axis2 = (point[rotation[0][0]] * -Math.sin(rotation[1])) + (point[rotation[0][1]] * Math.cos(rotation[1]));
				point[rotation[0][0]] = new_axis1;
				point[rotation[0][1]] = new_axis2;
			});
		});
	}

	changeDimension(dimension) {
		// Get rid of out-of-dimension rotations
		this.rotations.forEach((rotation, i, rotations) => {
			if (rotation[0][0] >= dimension || rotation[0][1] >= dimension)
				rotations.splice(i, 1);
		});

		this.createShape(dimension);
	}

	addRotation(axis1, axis2, speed) {
		if (!Number.isInteger(axis1) || !Number.isInteger(axis2) || (axis1 == axis2) || !Number.isInteger(speed) || speed < 1) {
			alert("Couldn't add rotation. Please check your inputs");
			return;
		}

		if (speed > 180 && !window.confirm("Are you sure? Speed is measured in degrees per second")) {
			return;
		}

		const radiansSpeed = (Math.PI * speed / 50) / 180;
		for (let i = 0; i < this.rotations.length; i++) {
			let rotation = this.rotations[i];
			if (rotation[0][0] === axis1 && rotation[0][1] == axis2) {
				this.rotations.splice(i, 1);
				break;
			}
		};
		this.rotations.push([[axis1, axis2], radiansSpeed, speed]);
	}
}

export { Shape };