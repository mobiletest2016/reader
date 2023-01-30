var embed = document.getElementById("read_iframe")
var btn = document.getElementById("toggle_btn")
if (embed.style.visibility == "hidden") {
	embed.style.visibility = "visible"
	chrome.storage.sync.get("height", function (obj) {
		embed.height = obj.height
	});
	btn.innerHTML = "-"

}
else {
	embed.style.visibility = "hidden"
	embed.height = 0
	btn.innerHTML = "+"
}
