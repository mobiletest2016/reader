
---
###### book.png

![logo](https://raw.githubusercontent.com/mobiletest2016/reader/master/v2/book.png)


---
###### manifest.json
```json
{
  "name": "Reader",
  "description": "Read given URL/PDF",
  "manifest_version": 2,
  "version": "1.0",
  "permissions": [
    "activeTab", "tabs", "http://*/*", "https://*/*", "storage"
  ],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_title": "Reader",
    "default_icon": "book.png",
    "default_popup": "popup.html"
  },
  "web_accessible_resources": [
        "pdf/*.pdf"
  ],
  "commands": {
	"toggle" : {
		"suggested_key": { "default" : "Ctrl+Q" },
		"description": "Toggle"
	}
  }
}
```

---
###### background.js
```js
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: "read.js"});
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "toggle") {
	chrome.tabs.executeScript({file: "toggle.js"});
    }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.command == "toggle")
	chrome.tabs.executeScript({file: "toggle.js"});

    if (request.command == "read") {
	chrome.tabs.executeScript({file: "read.js"});
    }
});
```



---
###### popup.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Popup</title>
  </head>
  <body>
  <form>
    URL: <input id="read_url">
    <br>
    <br>
    Width: <input id="width" style="width:20%">
    Height: <input id="height" style="width:20%">
    <br>
    <br>
    <input type="submit" value="Read URL">
  </form>
  <br>
  <button id="read_pdf">Read PDF</button>
  <br>
  <br>
  <p style="color: red"> Use Ctrl + Q or Button to hide/show </p>
<script src="popup.js"></script>
</body>
</html>
```


---
###### popup.js
```js
document.forms[0].onsubmit = function(e) {
  e.preventDefault(); // Prevent submission
  var read_url = document.getElementById('read_url').value
  var width = document.getElementById('width').value
  var height = document.getElementById('height').value
  chrome.storage.sync.set({'read_url': read_url, 'width': width, 'height': height}, function() {})
  chrome.runtime.sendMessage({command: "read"})
};

document.getElementById("read_pdf").onclick = function() {
  var read_url = chrome.runtime.getURL("pdf/sample.pdf")
  var width = document.getElementById('width').value
  var height = document.getElementById('height').value
  chrome.storage.sync.set({'read_url': read_url, 'width': width, 'height': height}, function() {})
  chrome.runtime.sendMessage({command: "read"})
}


chrome.storage.sync.get("read_url", function (obj) {
  if (obj.read_url == undefined)
	document.getElementById('read_url').value = ""
  else
	document.getElementById('read_url').value =  obj.read_url
})

chrome.storage.sync.get("width", function (obj) {
  if (obj.width == undefined)
    document.getElementById('width').value = 500
  else
    document.getElementById('width').value =  obj.width
})

chrome.storage.sync.get("height", function (obj) {
  if (obj.height == undefined)
    document.getElementById('height').value = 500
  else
    document.getElementById('height').value =  obj.height
})
```


---
###### read.js
```js
if (document.getElementById("read_iframe") == null) {
  var iframe=document.createElement("iframe")
  iframe.setAttribute("id", "read_iframe")
  iframe.width=window.innerWidth
  iframe.style.resize="both"
  iframe.style.overflow="auto"
  iframe.style.position="fixed"
  iframe.style.bottom="0"
  document.body.append(iframe);

  var btn = document.createElement("button")
  btn.setAttribute("id", "toggle_btn")
  btn.innerHTML="-"
  btn.addEventListener("click", function() {
    chrome.runtime.sendMessage({command: "toggle"})
  })

  btn.style.overflow="auto"
  btn.style.position="fixed"
  btn.style.top="0"
  btn.style.right="0"
  document.body.append(btn)
}

chrome.storage.sync.get("read_url", function (obj) {
  document.getElementById("read_iframe").src=obj.read_url
})

chrome.storage.sync.get("width", function (obj) {
  document.getElementById("read_iframe").width = obj.width
})

chrome.storage.sync.get("height", function (obj) {
  document.getElementById("read_iframe").height = obj.height
})
```


---
###### toggle.js
```js
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
```

