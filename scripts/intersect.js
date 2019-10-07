let checkIntersection = function(ray, lines) {
	return lines.map(line => {
		let u = cross(sub(line.start, ray.origin), ray.dir)/cross(ray.dir, line.dir)
		let t = cross(sub(line.start, ray.origin), line.dir)/cross(ray.dir, line.dir)
		if(u > 0 && u < 1) {
			return t
		} else {
			return -1
		}
	})
	.filter(x => x > 0 && x < settings.maxRayLength)
	.reduce((x, y) => Math.min(x, y), Infinity)
}
let anyWallsIntersectPlayer = function(x, y) {
	return settings.walls
	.map(w => lineIntersectCircle(w, {center: vect(x, settings.screenHeight - y), radius: 10}))
	.reduce((a, b) => a || b, false)
}
let lineIntersectCircle = function(line, cir) {
	let a = sub(invertPosInCanvas(c, cir.center), line.start)
	let b = rej(a, line.dir)
	if(dot(b, b) > cir.radius*cir.radius) {
		return false
	} else {
		return true
	}
}