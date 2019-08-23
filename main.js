let settings = {
	rayColor: "#FFFFFF",
	wallColor: "#000000",
	mousePressed: false,
	lightIntensity: 100,
	screenWidth: 600,
	screenHeight: 600,
	maxRayLength: 500,
	walls: [],
	lightVisible: true,
	wallsVisible: false,
	backgroundColor: "#000000"
}
let c = document.getElementById("c")
let ctx = c.getContext("2d")

function setLightColor(picker) {
	settings.rayColor = '#' + picker.toString()
}
function setWallColor(picker) {
	settings.wallColor = '#' + picker.toString()
}

let drawLine = function(x1, y1, x2, y2, col) {
	ctx.beginPath()
	ctx.strokeStyle = col
	ctx.moveTo(x1, settings.screenHeight - y1)
	ctx.lineTo(x2, settings.screenHeight - y2)
	ctx.stroke()
	let dist = Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1))
	let dirx = (x2 - x1)
	let diry = (y2 - y1)
	return {
		start: vect(x1, y1),
		end: vect(x2, y2),
		dir: vect(dirx, diry)
	}
}
let checkIntersection = function(ray, lines) {
	let arrOfPts = []
	for(let i = 0; i < lines.length; i++) {
		let u = cross(sub(lines[i].start, ray.origin), ray.dir)/cross(ray.dir, lines[i].dir)
		let t = cross(sub(lines[i].start, ray.origin), lines[i].dir)/cross(ray.dir, lines[i].dir)
		if(u > 0 && u < 1) {
			arrOfPts.push(t)
		}
	}
	return arrOfPts.filter(x => x > 0 && x < settings.maxRayLength).reduce((x, y) => Math.min(x, y), Infinity)
}
let drawRay = function(ray, lines) {
	let intersection = checkIntersection(ray, lines)
	let pt = -1
	if(intersection != Infinity) {
		pt = add(scale(ray.dir, intersection), ray.origin)
	} else {
		pt = add(scale(ray.dir, settings.maxRayLength), ray.origin)
	}
	if(pt != -1) {
		ctx.beginPath()
		ctx.strokeStyle = settings.rayColor
		ctx.moveTo(ray.origin.x, settings.screenHeight - ray.origin.y)
		ctx.lineTo(pt.x, settings.screenHeight - pt.y)
		ctx.stroke()
	}
}
let clearScreen = function() {
	ctx.fillStyle = settings.backgroundColor
	ctx.fillRect(0, 0, settings.screenWidth, settings.screenHeight)
}
function getMousePosInCanvas(canvas, evt) {
	let rect = canvas.getBoundingClientRect();
	return vect(evt.clientX - rect.left, evt.clientY - rect.top)
}


let newLineStart = vect(0, 0)
c.addEventListener("mousemove", function(e) {
	let x = getMousePosInCanvas(c, e).x
	let y = settings.screenHeight - getMousePosInCanvas(c, e).y
	clearScreen()
	if(settings.mousePressed) {
		ctx.beginPath()
		ctx.strokeStyle = "red"
		ctx.moveTo(newLineStart.x, newLineStart.y)
		ctx.lineTo(getMousePosInCanvas(c, e).x, getMousePosInCanvas(c, e).y)
		ctx.lineWidth = 3
		ctx.stroke()
		settings.walls.map(function(wall) {
			drawLine(wall.start.x, wall.start.y, wall.end.x, wall.end.y, "red") 
		})
		ctx.lineWidth = 1
	} else if(settings.lightVisible) {
		for(let i = 0; i < settings.lightIntensity; i++) {
			let ray = createRay(vect(x, y), 2*i*Math.PI/settings.lightIntensity)
			drawRay(ray, settings.walls)
		}
	}
	if(settings.wallsVisible) {
		settings.walls.map(function(x) {
			drawLine(x.start.x, x.start.y, x.end.x, x.end.y, settings.wallColor)
		})
	}
})
c.addEventListener("mousedown", function(e) {
	newLineStart = getMousePosInCanvas(c, e)
	settings.mousePressed = true
})
c.addEventListener("mouseup", function(e) {
	settings.walls.push(drawLine(newLineStart.x, settings.screenHeight - newLineStart.y, getMousePosInCanvas(c, e).x, settings.screenHeight - getMousePosInCanvas(c, e).y, "white"))
	settings.mousePressed = false
})