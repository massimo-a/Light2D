let vect = function(x0, y0) {
	return {x: x0, y: y0}
}
let dot = function(v1, v2) {
	return v1.x*v2.x + v1.y*v2.y
}
let sub = function(v1, v2) {
	return vect(v1.x - v2.x, v1.y - v2.y)
}
let add = function(v1, v2) {
	return vect(v1.x + v2.x, v1.y + v2.y)
}
let scale = function(v, a) {
	return vect(v.x*a, v.y*a)
}
let cross = function(v1, v2) {
	return v1.x*v2.y - v1.y*v2.x
}
let createRay = function(pt, rad) {
	return {origin: pt, dir: vect(Math.cos(rad), Math.sin(rad))}
}