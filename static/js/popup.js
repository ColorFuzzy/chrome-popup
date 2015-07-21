// get host from a url
function parseHost(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser.host;
}

// popup window
chrome.browserAction.onClicked.addListener(function(tab) {
    var storage = chrome.storage.local;
    var storageKey = "_settings_v0.1_";
    var host = parseHost(tab.url);
    storage.get(storageKey, function(result) {
        // get windowSize
        var mappings = result[storageKey] || Object();
        var windowSize = {
            "width": settings.defaultWidth,
            "height": settings.defaultHeight
        };
        mappings[host] = mappings[host] || windowSize;
        windowSize = mappings[host];

        // create popup window
        chrome.windows.create({
            "url": tab.url,
            "type": "popup",
            "width": parseInt(windowSize.width),
            "height": parseInt(windowSize.height)
        });

        // save settings
        var obj = Object();
        obj[storageKey] = mappings;
        storage.set(obj);
    });

    if (settings.closeOnPopup){
        chrome.tabs.remove(tab.id);
    }
});

