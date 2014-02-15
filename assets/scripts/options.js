var extension;

function init() {
    extension = chrome.extension.getBackgroundPage();
    Default = extension.Default;
    Special = extension.Special;
    History = extension.History;
    Site = extension.Site;

    loadOptions();
}

function loadOptions() {
    var defaultHeight = document.getElementById("default-height");
    var defaultWidth = document.getElementById("default-width");
    var closeTab = document.getElementById("close-tab");

    defaultHeight.value = Special.getValue("height");
    defaultWidth.value = Special.getValue("width");
    closeTab.checked = Special.getValue("closeTab");
}

function saveOptions() {
    var defaultHeight = document.getElementById("default-height");
    var defaultWidth = document.getElementById("default-width");
    var closeTab = document.getElementById("close-tab");

    Special.setValue("height", defaultHeight.value);
    Special.setValue("width", defaultWidth.value);
    Special.setValue("closeTab", closeTab.checked);
}

function resetOptions() {
    var defaultHeight = document.getElementById("default-height");
    var defaultWidth = document.getElementById("default-width");
    var closeTab = document.getElementById("close-tab");

    Special.reset();

    defaultHeight.value = Default.getValue("height");
    defaultWidth.value = Default.getValue("width");
    closeTab.checked = Default.getValue("closeTab");
}

$(document).ready(function() {
    init();
    document.querySelector('#save').addEventListener('click', saveOptions);
    document.querySelector('#reset').addEventListener('click', resetOptions);
});