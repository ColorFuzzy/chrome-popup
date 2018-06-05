// get host from a url
function parseHost(url) {
    let parser = document.createElement('a');
    parser.href = url;
    return parser.host;
}

// popup window
chrome.browserAction.onClicked.addListener(function(tab) {
    let storage = chrome.storage.local;
    let storageKey = "_settings_v0.1_";
    let host = parseHost(tab.url);
    storage.get(storageKey, function(result) {
        // get windowSize
        let mappings = result[storageKey] || Object();
        let windowSize = {
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
        let obj = Object();
        obj[storageKey] = mappings;
        storage.set(obj);
    });

    if (settings.closeOnPopup){
        chrome.tabs.remove(tab.id);
    }
});

