let drawCircle = function(ctx) {
	return function(fillCol) {
		return function(r) {
			return function(x, y) {
				ctx.beginPath()
				ctx.fillStyle = fillCol
				ctx.arc(x, y, r, 0, Math.PI*2)
				ctx.fill()
			}
		}
	}
}

let drawLine = function(ctx) {
	return function(s, e, col) {
		ctx.beginPath()
		ctx.strokeStyle = col
		ctx.moveTo(s.x, s.y)
		ctx.lineTo(e.x, e.y)
		ctx.stroke()
	}
}

function getPosInCanvas(canvas, v) {
	let rect = canvas.getBoundingClientRect();
	return vect(v.x - rect.left, v.y - rect.top)
}

function invertPosInCanvas(canvas, v) {
	let rect = canvas.getBoundingClientRect();
	return vect(v.x + rect.left, v.y + rect.top)
}

function setLightColor(picker) {
	settings.rayColor = '#' + picker.toString()
}
function setWallColor(picker) {
	settings.wallColor = '#' + picker.toString()
}
function setCanvasColor(picker) {
	settings.backgroundColor = '#' + picker.toString()
}

let clearScreen = function(ctx) {
	ctx.fillStyle = settings.backgroundColor
	ctx.fillRect(0, 0, settings.screenWidth, settings.screenHeight)
}

let toScreenSpace = function(pt) {
	return vect(pt.x, settings.screenHeight - pt.y)
}