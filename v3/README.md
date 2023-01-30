
---
###### book.png

![logo](https://raw.githubusercontent.com/mobiletest2016/reader/master/v2/book.png)


---
###### manifest.json
```json
{
  "name": "Reader",
  "description": "Read PDF/URL",
  "manifest_version": 3,
  "version": "1.0",
  "permissions": [
    "activeTab", "tabs", "storage", "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "web_accessible_resources": [{
  "resources": ["pdf/*.pdf"],
  "matches": ["<all_urls>"] 
  }],
   "action": {
    "default_title": "Reader",
    "default_icon": "book.png",
    "default_popup": "popup.html"
  },
  "commands": {
	"toggle" : {
		"suggested_key": { "default" : "Ctrl+X" },
		"description": "Toggle"
	},
	"hide": {
		"suggested_key": { "default" : "Ctrl+Space" },
		"description": "Hide"
	}
  }
}
```

---
###### background.js
```js
chrome.action.onClicked.addListener(tab => {
	chrome.tabs.executeScript(tab.id, {file: "read.js"});
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "toggle") {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
	    files: ['toggle.js'],
        },() => chrome.runtime.lastError);
    });
    }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.command == "toggle") {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
	    files: ['toggle.js'],
        },() => chrome.runtime.lastError);
    });
    }


    if (request.command == "hide") {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
	    files: ['hide.js'],
        },() => chrome.runtime.lastError);
    });
    }


    if (request.command == "read") {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
	    files: ['read.js'],
        },() => chrome.runtime.lastError);
    });

    }
});
```


---
###### hide.js
```js
var embed = document.getElementById("read_iframe")
var btn = document.getElementById("toggle_btn")
embed.style.visibility = "hidden"
embed.height = 0
btn.innerHTML = "+"
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
  <p style="color: red"> Use Ctrl + X or Button to hide/show </p>
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
  var read_url = document.getElementById('read_url').value
  if (!read_url) {
    read_url = chrome.runtime.getURL("pdf/sample.pdf")
    document.getElementById('read_url').value = read_url
  }
  var width = document.getElementById('width').value
  var height = document.getElementById('height').value
  chrome.storage.sync.set({'read_url': read_url, 'width': width, 'height': height}, function() {})
  chrome.runtime.sendMessage({command: "read"})
}


chrome.storage.sync.get("read_url", function (obj) {
  if (!obj.read_url)
	document.getElementById('read_url').value = chrome.runtime.getURL("pdf/sample.pdf")
  else
	document.getElementById('read_url').value =  obj.read_url
})

chrome.storage.sync.get("width", function (obj) {
  if (obj.width == undefined)
    document.getElementById('width').value = 650
  else
    document.getElementById('width').value =  obj.width
})

chrome.storage.sync.get("height", function (obj) {
  if (obj.height == undefined)
    document.getElementById('height').value = 350
  else
    document.getElementById('height').value =  obj.height
})
```


---
###### read.js
```js
if (document.getElementById("read_iframe") == null) {
  var div = document.createElement("div")
  div.setAttribute("id", "read_div")
  div.width=window.innerWidth
  div.style.resize="both"
  div.style.position="fixed"
  div.style.bottom="0"
  div.style.zIndex=10000
  document.body.append(div);

  var iframe=document.createElement("iframe")
  iframe.setAttribute("id", "read_iframe")
  iframe.setAttribute("frameborder", "0")
  iframe.width=window.innerWidth
  iframe.style.overflow="auto"
  div.append(iframe);

  var btn = document.createElement("button")
  btn.setAttribute("id", "toggle_btn")
  btn.innerHTML="-"
  btn.addEventListener("click", function() {
    chrome.runtime.sendMessage({command: "toggle"})
    event.stopPropagation()
  })
  btn.style.position="absolute"
  btn.style.bottom="0%"
  btn.style.left="0%"
  div.append(btn)

  document.addEventListener("click", function() {
    chrome.runtime.sendMessage({command: "hide"})
  })

  chrome.storage.sync.get("read_url", function (obj) {
    read_url = obj.read_url;
    if (obj.read_url.endsWith(".pdf"))
	  read_url += "#toolbar=0"
    document.getElementById("read_iframe").src=read_url

  })

  chrome.storage.sync.get("width", function (obj) {
    document.getElementById("read_iframe").width = obj.width
  })

  chrome.storage.sync.get("height", function (obj) {
    document.getElementById("read_iframe").height = obj.height
  })

}
```


---
###### toggle.js
```js
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
```

