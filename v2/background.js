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
