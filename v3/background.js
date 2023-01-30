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
