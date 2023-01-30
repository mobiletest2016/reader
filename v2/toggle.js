var embed = document.getElementById("read_embed")
var btn = document.getElementById("toggle_btn")
if (embed.style.visibility != "hidden") {
	embed.style.visibility = "hidden"
	embed.height = 0
	btn.innerHTML = "+"
}
else {
	embed.style.visibility = "visible"
        embed.height=500
	btn.innerHTML = "-"
}
