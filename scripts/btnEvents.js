let buttons = {
	toggleLight: document.getElementById("light-visible"),
	toggleWalls: document.getElementById("walls-visible"),
	save: document.getElementById("save"),
	resetWalls: document.getElementById("walls-reset")
}

buttons.toggleLight.addEventListener("click", function() {
	settings.lightVisible = !settings.lightVisible
	if(settings.lightVisible) {
		buttons.toggleLight.innerHTML = "Light On"
		buttons.toggleLight.style.backgroundColor = "#88d8b0"
	} else {
		buttons.toggleLight.innerHTML = "Light Off"
		buttons.toggleLight.style.backgroundColor = "#ff6f69"
	}
})
buttons.toggleWalls.addEventListener("click", function() {
	settings.wallsVisible = !settings.wallsVisible
	if(settings.wallsVisible) {
		buttons.toggleWalls.innerHTML = "Walls On"
		buttons.toggleWalls.style.backgroundColor = "#88d8b0"
	} else {
		buttons.toggleWalls.innerHTML = "Walls Off"
		buttons.toggleWalls.style.backgroundColor = "#ff6f69"
	}
})
buttons.save.addEventListener("click", function() {
	window.localStorage.setItem("Light2DWalls", JSON.stringify(settings.walls))
})
buttons.resetWalls.addEventListener("click", function() {
	settings.walls = []
})