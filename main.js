import { hypercube } from './hypercube/hypercube.js';

var eleId = 'container';
var ele = document.getElementById(eleId);
if (ele) {
	ele.style.width = `${window.innerWidth}px`;
	ele.style.height = `${window.innerHeight}px`;
}
hypercube(eleId);