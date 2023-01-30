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
