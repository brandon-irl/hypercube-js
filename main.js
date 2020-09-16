import { hypercube } from './hypercube/hypercube.js';

const eleId = 'container';
const ele = document.getElementById(eleId);
if (ele) {
	ele.style.width = `${window.innerWidth}px`;
	ele.style.height = `${window.innerHeight}px`;
}
hypercube(eleId);