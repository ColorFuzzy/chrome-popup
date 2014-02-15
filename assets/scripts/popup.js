chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
    	"url": tab.url, 
    	"type": "detached_panel", 
    	"height": parseInt(Special.getValue("height")),
        "width": parseInt(Special.getValue("width"))
    });
    if (Special.getValue("closeTab")){
        chrome.tabs.remove(tab.id);
    }
});