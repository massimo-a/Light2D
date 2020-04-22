let c = document.getElementsByTagName("canvas")[0]
let c2 = document.getElementsByTagName("canvas")[1]
let ctx = c.getContext("2d")
let ctx2 = c2.getContext("2d")
let settings = {
	rayColor: "#FFFFFF",
	wallColor: "#FFFFFF",
	lightIntensity: 640,
	screenWidth: 640,
	screenHeight: 550,
	maxRayLength: 800,
	walls: [],
	lightVisible: true,
	wallsVisible: true,
	backgroundColor: "#000000",
	fieldOfView: Math.PI/8,
	viewDirection: Math.PI/2,
	currentPosition: vect(250, 500)
}

if(window.localStorage.getItem("Light2DWalls")) {
	settings.walls = JSON.parse(window.localStorage.getItem("Light2DWalls"));
}

let drawRay = function(ray, lines) {
	let intersection = checkIntersection(ray, lines)
	let pt = -1
	let res = settings.maxRayLength
	if(intersection != Infinity) {
		pt = add(scale(ray.dir, intersection), ray.origin)
		res = intersection
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
	return res
}

let update = function(e, v, mouseDown, linestart) {
	let x = getPosInCanvas(c, v).x
	let y = getPosInCanvas(c, v).y
	clearScreen(ctx)
	drawCircle(ctx)("#0000FF")(10)(x, y)
	if(mouseDown) {
		drawLine(ctx)(linestart, getPosInCanvas(c, vect(e.clientX, e.clientY)), "#FF0000")
		settings.walls.map(function(wall) {
			drawLine(ctx)(toScreenSpace(wall.start), toScreenSpace(wall.end), "#FF0000") 
		})
	}
	clearScreen(ctx2)
	for(let i = 0; i < settings.lightIntensity; i++) {
		let ray = createRay(vect(x, settings.screenHeight - y), i*settings.fieldOfView/settings.lightIntensity + (settings.viewDirection-settings.fieldOfView/2))
		let ratio = (settings.maxRayLength - drawRay(ray, settings.walls))/settings.maxRayLength
		let height = parseInt(settings.screenHeight*ratio*ratio)
		let color = parseInt(255*ratio*ratio)
		ctx2.fillStyle = "rgb(" + color + "," + color + "," + color + ")"
		ctx2.fillRect(settings.screenWidth - i - 1, (settings.screenHeight - height)/2, 1, height)
	}
	if(settings.wallsVisible) {
		settings.walls.map(function(w) {
			drawLine(ctx)(toScreenSpace(w.start), toScreenSpace(w.end), settings.wallColor)
		})
	}
}

let canvasEvents = function() {
	let newLineStart = vect(0, 0)
	let mouseDown = false
	window.addEventListener("keydown", function(e) {
		if(e.keyCode == 37) {
			settings.viewDirection += Math.PI/32
		} else if(e.keyCode == 39) {
			settings.viewDirection -= Math.PI/32
		} else if(e.keyCode == 38) {
			settings.currentPosition.y -= Math.sin(settings.viewDirection)*4
			settings.currentPosition.x += Math.cos(settings.viewDirection)*4
		} else if(e.keyCode == 40) {
			settings.currentPosition.y += Math.sin(settings.viewDirection)*4
			settings.currentPosition.x -= Math.cos(settings.viewDirection)*4
		}
		update(e, settings.currentPosition, mouseDown, newLineStart)
	})
	c.addEventListener("mousedown", function(e) {
		newLineStart = getPosInCanvas(c, vect(e.clientX, e.clientY))
		mouseDown = true
	})
	c.addEventListener("mousemove", function(e) {
		update(e, settings.currentPosition, mouseDown, newLineStart)
	})
	c.addEventListener("mouseup", function(e) {
		let _start = vect(newLineStart.x, settings.screenHeight - newLineStart.y)
		let _end = toScreenSpace(getPosInCanvas(c, vect(e.clientX, e.clientY)))
		settings.walls.push({start: _start, end: _end, dir: sub(_end, _start)})
		drawLine(ctx)(newLineStart, getPosInCanvas(c, vect(e.clientX, e.clientY)), "#FFFFFF")
		mouseDown = false
		update(e, settings.currentPosition, mouseDown, newLineStart)
	})
}
canvasEvents()