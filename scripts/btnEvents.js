let buttons = {
	toggleLight: document.getElementById("light-visible"),
	toggleWalls: document.getElementById("walls-visible"),
	save: document.getElementById("save"),
	resetWalls: document.getElementById("walls-reset"),
	undo: document.getElementById("undo"),
	about: document.getElementById("about")
}
let aboutPage = document.getElementById("about-page")
let lightIntensity = document.getElementById("light-intensity")
let filler = document.getElementById("filler")
let hideAboutPage = function() {
	aboutPage.classList.add("hide");
	filler.classList.add("hide");
}

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
	window.localStorage.setItem("Light2DWalls", JSON.stringify(settings.walls))
})
buttons.about.addEventListener("click", function() {
	aboutPage.classList.toggle("hide");
	filler.classList.toggle("hide");
	filler.addEventListener("click", hideAboutPage)
})

lightIntensity.addEventListener("change", function() {
	if(!isNaN(parseInt(lightIntensity.value))) {
		settings.lightIntensity = parseInt(lightIntensity.value);
	}
})
buttons.undo.addEventListener("click", function() {
	settings.walls.pop();
})