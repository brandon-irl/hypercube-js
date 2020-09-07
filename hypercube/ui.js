
import { range } from './util.js';

function createShapeControls(parent, shape) {
	if (!shape || !parent) return;

	// Assumes initial dimension is 3

	/* Dimensions controls */
	let dimensionControl = document.createElement('div');
	dimensionControl.classList.add('frame');
	const dTitle = document.createElement('div');
	dTitle.classList.add('title');
	dimensionControl.appendChild(dTitle);
	dTitle.innerText = "Dimensions";
	const dimensionsInput = document.createElement('div');
	const dEntry = document.createElement('input');
	dEntry.id = 'dimensions';
	dEntry.setAttribute('type', 'number');
	dEntry.value = 3;
	dimensionsInput.appendChild(dEntry);
	dimensionControl.appendChild(dimensionsInput);
	const dButton = document.createElement('button');
	dButton.innerText = "Apply";
	dButton.addEventListener('click', (ev) => {
		const dimension = parseInt(dEntry.value);
		document.dispatchEvent(new CustomEvent('onDimensionChanged', { detail: dimension }));
		if (Number.isInteger(dimension) && dimension > 0)
			axisMenus.forEach(_ => {
				_.innerHTML = '';
				_.selectedIndex = 0;
			});
		range(dimension).forEach(_ => {
			axisMenus.forEach(menu => {
				let option = document.createElement('option');
				option.value = _;
				option.text = _;
				menu.appendChild(option);
			});
		});
	});
	dimensionControl.appendChild(dButton);

	/* Rotations controls */
	const rotationsControls = document.createElement('div');
	rotationsControls.classList.add('frame');
	// Title
	const rTitle = document.createElement('div');
	rTitle.classList.add('title');
	rTitle.innerText = "Rotate";
	rotationsControls.appendChild(rTitle);
	// Axis selects
	[1, 2].forEach(axisId => {
		const id = `axis${axisId}`;
		const label = document.createElement('label');
		label.setAttribute('for', id);
		label.innerText = `Axis ${axisId}`;
		const menu = document.createElement('select');
		menu.id = id;
		range(3).forEach(_ => {
			let option = document.createElement('option');
			option.value = _;
			option.text = _;
			menu.appendChild(option);
		});
		menu.selectedIndex = -1;
		const menuDiv = document.createElement('div');
		menuDiv.appendChild(label);
		menuDiv.appendChild(menu);
		rotationsControls.appendChild(menuDiv);
	});
	const axisMenus = rotationsControls.querySelectorAll('select');
	// Speed input
	const sLabel = document.createElement('label');
	sLabel.setAttribute('for', 'speed');
	sLabel.innerText = "Speed";
	const sEntry = document.createElement('input');
	sEntry.setAttribute('type', 'number');
	sEntry.id = 'speed';
	sEntry.placeholder = 'Choose positive integer';
	const sDiv = document.createElement('div');
	sDiv.appendChild(sLabel);
	sDiv.appendChild(sEntry);
	rotationsControls.appendChild(sDiv);
	// Apply button
	const rButton = document.createElement('button');
	rButton.innerText = "Apply";
	rButton.addEventListener('click', (ev) => {
		shape.addRotation(parseInt(axisMenus[0].value), parseInt(axisMenus[1].value), parseInt(sEntry.value))
		updateScrollFrame();
	});
	rotationsControls.appendChild(rButton);
	// Scrollframe
	const scrollFrame = document.createElement('div');
	scrollFrame.classList.add('scrollframe');
	const ul = document.createElement('ul');
	scrollFrame.appendChild(ul);
	const updateScrollFrame = function () {
		ul.innerHTML = '';
		shape.rotations.forEach((rotation, i, rotations) => {
			const li = document.createElement('li');
			const btn = document.createElement('button');
			li.appendChild(btn);
			btn.classList.add('rotButton');
			btn.innerText = `Axes: ${rotation[0][0]},${rotation[0][1]} - Speed: ${rotation[2]}`;
			btn.addEventListener('click', (ev) => {
				rotations.splice(rotations.indexOf(rotation), 1);
				li.removeChild(btn);
			});
			ul.appendChild(li);
		});
	};
	updateScrollFrame();
	rotationsControls.appendChild(scrollFrame);

	// Do css
	const style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.appendChild(document.createTextNode(`
	#hypercube .controls {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	#hypercube .frame {
		border: 1px solid #111;
		padding: .5rem;
		margin: 0 0 .5rem 0;
		display: flex;
		flex-direction: column;
		width: 200px;
	}

	#hypercube .frame div {
		padding: 0 0 .5rem 0;
	}

	#hypercube .frame label, .title {
		font-family:futura;
		color: gray;
	}

	#hypercube .frame label {
		padding: 0 .5rem 0 0;
	}

	#hypercube .frame .title {
		font-size: 1.2rem;
		text-align: center;
	}
	
	#hypercube div .scrollframe {
		border: 1px solid #111;
		overflow: auto;
		margin-top: 5px;
		padding: 10px;
		max-height: 150px;
	}

	#hypercube .scrollframe ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	
	#hypercube .scrollframe .rotButton {
		background:none;
		border: none;
	}

	#hypercube .scrollframe .rotButton:hover {
		color:red;
	}
	`));
	document.head.appendChild(style);

	// Put it all together
	const controls = document.createElement('div');
	controls.classList.add('controls');
	controls.appendChild(dimensionControl);
	controls.appendChild(rotationsControls);
	parent.prepend(controls);
}

export { createShapeControls };