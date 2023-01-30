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
