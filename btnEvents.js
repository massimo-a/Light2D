document.getElementById("light-visible").addEventListener("click", function() {
	settings.lightVisible = !settings.lightVisible
})
document.getElementById("walls-visible").addEventListener("click", function() {
	settings.wallsVisible = !settings.wallsVisible
})
document.getElementById("walls-reset").addEventListener("click", function() {
	settings.walls = []
})
document.getElementById("light-intensity").addEventListener("change", function(e) {
	settings.lightIntensity = parseInt(document.getElementById("light-intensity").value)
})