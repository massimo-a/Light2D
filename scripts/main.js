let settings = {
	rayColor: "#FFFFFF",
	wallColor: "#FFFFFF",
	lightIntensity: 250,
	screenWidth: 1280,
	screenHeight: 550,
	maxRayLength: 500,
	walls: [],
	lightVisible: true,
	wallsVisible: true,
	backgroundColor: "#000000"
}
if(window.localStorage.getItem("Light2DWalls")) {
	settings.walls = JSON.parse(window.localStorage.getItem("Light2DWalls"));
}
let c = document.getElementsByTagName("canvas")[0]
let ctx = c.getContext("2d")

function setLightColor(picker) {
	settings.rayColor = '#' + picker.toString()
}
function setWallColor(picker) {
	settings.wallColor = '#' + picker.toString()
}
function setCanvasColor(picker) {
	settings.backgroundColor = '#' + picker.toString()
}

let drawLine = function(x1, y1, x2, y2, col) {
	ctx.beginPath()
	ctx.strokeStyle = col
	ctx.moveTo(x1, settings.screenHeight - y1)
	ctx.lineTo(x2, settings.screenHeight - y2)
	ctx.stroke()
	return {
		start: vect(x1, y1),
		end: vect(x2, y2),
		dir: sub(vect(x2, y2), vect(x1, y1))
	}
}
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
let update = function(e, mouseDown, linestart) {
	let x = getMousePosInCanvas(c, e).x
	let y = settings.screenHeight - getMousePosInCanvas(c, e).y
	clearScreen()
	if(mouseDown) {
		ctx.beginPath()
		ctx.strokeStyle = "#FF0000"
		ctx.moveTo(linestart.x, linestart.y)
		ctx.lineTo(getMousePosInCanvas(c, e).x, getMousePosInCanvas(c, e).y)
		ctx.lineWidth = 3
		ctx.stroke()
		settings.walls.map(function(wall) {
			drawLine(wall.start.x, wall.start.y, wall.end.x, wall.end.y, "#FF0000") 
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
}
let canvasEvents = function() {
	let newLineStart = vect(0, 0)
	let mouseDown = false
	c.addEventListener("mousemove", function(e) {update(e, mouseDown, newLineStart)})
	c.addEventListener("mousedown", function(e) {
		newLineStart = getMousePosInCanvas(c, e)
		mouseDown = true
	})
	c.addEventListener("mouseup", function(e) {
		settings.walls.push(
			drawLine(
				newLineStart.x,
				settings.screenHeight - newLineStart.y,
				getMousePosInCanvas(c, e).x,
				settings.screenHeight - getMousePosInCanvas(c, e).y,
				"#FFFFFF"
			)
		)
		mouseDown = false
	})
}
canvasEvents()