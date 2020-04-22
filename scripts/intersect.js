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
};