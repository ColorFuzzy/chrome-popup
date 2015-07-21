var goldenRatio = 0.618 * 1.2;
var settings = Object();

settings.defaultWidth = window.screen.width * goldenRatio;
settings.defaultHeight = window.screen.height * goldenRatio;

// close tab on popup new window
settings.closeOnPopup = false;