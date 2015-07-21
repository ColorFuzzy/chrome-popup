(function() {
    // register new on window resize event function,
    // never overwrite old function
    function popupExtensionAddResizeEvent(func) {
        var oldResize = window.onresize;
        window.onresize = function () {
            func();
            if (typeof oldResize === 'function') {
                oldResize();
            }
        };
    }

    // save window size on window resize event
    function popupExtensionSaveWindowSize() {
        var storage = chrome.storage.local;
        var storageKey = "_settings_v0.1_";
        storage.get(storageKey, function(result) {
            var mappings = result[storageKey];

            // only save the popup window
            if (mappings == null || mappings[window.location.host] == null) {
                return
            } else {
                mappings[window.location.host] = {
                    "height": window.innerHeight,
                    "width": window.innerWidth
                };
            }

            // save settings
            var obj = Object();
            obj[storageKey] = mappings;
            storage.set(obj);
        });
    }

    // register onclick handler
    popupExtensionAddResizeEvent(popupExtensionSaveWindowSize);

    // todo: hide scroll bar on popup
})();
