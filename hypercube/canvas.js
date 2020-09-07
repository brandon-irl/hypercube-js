function create(id, parent, width, height) {
	let divWrapper = document.createElement('div');
	let canvasElem = document.createElement('canvas');
	parent.appendChild(divWrapper);
	divWrapper.appendChild(canvasElem);

	divWrapper.id = id;
	canvasElem.width = width;
	canvasElem.height = height;

	let ctx = canvasElem.getContext('2d', { alapha: false });

	return { canvas: canvasElem, ctx: ctx, id: id };
}

export { create };