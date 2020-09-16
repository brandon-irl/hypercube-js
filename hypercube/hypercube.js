import { project2D } from './projection.js';
import { create } from './canvas.js';
import { Shape } from './shape.js';
import { createShapeControls } from './ui.js';

function hypercube(elementId) {
	let zoom = 500;
	let drawUI = true;
	const autoZoom = true;
	const parent = document.getElementById(elementId);
	if (!parent)
		return;
	const width = parent.clientWidth;
	const height = parent.clientHeight;
	const cvs = create('hypercube', parent, width, height);
	const ctx = cvs.ctx;
	if (cvs.canvas.getContext) {
		const onDimensionChanged = function (ev) {
			const dimension = ev.detail;
			if (Number.isInteger(dimension) && dimension > 0) {
				if (dimension == shape.dimension || (dimension > 9 && !window.confirm("Dimensions larger than nine are computationally intensive and may impact performance."))) {
					return;
				}

				shape.changeDimension(dimension);
				if (autoZoom) {
					zoom = 125 * Math.pow(2, dimension - 1);
				}
			} else {
				alert("Please enter a positive integer.");
			}
		}

		const draw = function () {
			shape.rotate();
			drawShape(shape);
			if (drawUI) drawUI();
			window.requestAnimationFrame(draw);
		}

		const drawShape = function (shape) {
			const projectedPoints = project2D(shape.points);
			// Draw Edges
			ctx.clearRect(-(width / 2), -(height / 2), width, height);
			ctx.strokeStyle = 'rgb(0,0,0)';
			ctx.beginPath();
			shape.edges.forEach(edge => {
				ctx.moveTo(projectedPoints[edge[0]][0] * zoom, projectedPoints[edge[0]][1] * zoom);
				ctx.lineTo(projectedPoints[edge[1]][0] * zoom, projectedPoints[edge[1]][1] * zoom);
			});
			ctx.stroke();
		}

		const drawUI = function (bounds) {
			ctx.fillStyle = 'gray';
			ctx.font = '20px Futura';
			ctx.fillText(`Zoom: ${zoom}`, -(width / 2) + 25, -(height / 2) + 25);
		}

		ctx.translate(width / 2, height / 2);
		const shape = new Shape(3, [[[0, 2], 0.01047, 30]]);
		draw();
		document.addEventListener('onDimensionChanged', onDimensionChanged);
		createShapeControls(document.getElementById(cvs.id), shape);
	}
}

export { hypercube };