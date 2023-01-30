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
