var Storage = {};  // 封装系统的localStorage
var Default = {};  // 系统默认配置
var Special = {};  // 用户自定义设置，Special是对Default的覆盖
var History = {};  // 用户浏览历史
var Site = {};  // 特殊网站的特殊设置
var Setting = {};  // 程序配置都在里面

/*
Setting实用函数
 */
Setting.category = ["default", "special", "history", "site"];
Setting.default = {
    height: 580,  // popup窗口的默认高度
    width: 900,  // 默认宽度
    history: 2000,  // 默认记录的历史条数
    closeTab: false,  // popup之后是否默认关闭tab
    rememberSize: false,  // 是否记忆popup窗口大小，这个将覆盖默认的窗口大小
    popupKey: "Ctrl+Shift+P",  // popup快捷键，是否关闭tab和默认设置关联
    popupCloseKey: "",  // popup快捷键，弹出后关闭tab
    popupRemainKey: "",  // popup快捷键，弹出后不关闭tab
    restoreKey: "Ctrl+Shift+T"  // restore的快捷键
};
Setting.history = {
    favIconUrl: null,
    title: null,
    url: null,
    height: null,
    width: null
};
Setting.site = {
    favIconUrl: null,
    title: null,
    url: null,  // 这里可以是正则表达式
    height: null,
    width: null,
    closeTab: true,
    rememberSize: true,  // 记忆窗口大小
    defaultSize: false,  // 使用默认大小
    alwaysPopup: false
};

/*
初始化localStorage的存储，localStorage封装函数
*/
function initStorage() {
    localStorage.default = JSON.stringify(Setting.default);

    if (typeof localStorage.special == "undefined") {
        var initSpecialJson = {};
        localStorage.special = JSON.stringify(initSpecialJson);
    }

    if (typeof localStorage.history == "undefined") {
        var initHistoryJson = {};
        localStorage.history = JSON.stringify(initHistoryJson);
    }

    if (typeof localStorage.site == "undefined") {
        var initSiteJson = {};
        localStorage.site = JSON.stringify(initSiteJson);
    }
}
initStorage();

Storage.hasCategory = function hasCategory(category) {
    if ((Setting.category.indexOf(category)) == -1) {
        throw("Category Error: "+category+" not exit!")
    }
    return true;
};

Storage.updateStorgae =  function updateStorage(category, key, value) {
    if (!Storage.hasCategory(category)) {
        var tempCategoryJson = {};
        localStorage[category] = JSON.stringify(tempCategoryJson);
    }
    var categoryJson = JSON.parse(localStorage[category]);
    categoryJson[key] = value;
    localStorage[category] = JSON.stringify(categoryJson);
};

/*
Default相关函数
 */
Default.cache = JSON.parse(localStorage.default);  // 避免频繁解析string

Default.hasKey = function hasKey(key) {
    return Boolean(typeof Default.cache[key] != "undefined");
};

Default.getValue = function getValue(key) {
    if (!Default.hasKey(key)) {
        throw("Key Error: "+key+" is not defined!");
    }
    return Default.cache[key];
};


/*
定义Special常用函数
 */
Special.cache = JSON.parse(localStorage.special);

Special.hasKey = function hasKey(key) {
    return Boolean(typeof Special.cache[key] != "undefined");
};

Special.getValue = function getValue(key) {
    if (!Default.hasKey(key)) {
        throw("Key Error: "+key+" is not defined");
    }
    if (Special.hasKey(key)) {
        return Special.cache[key];
    }
    return Default.cache[key];
};

Special.setValue = function setValue(key, value) {
    if (!Default.hasKey(key)) {
        throw("Key Error: "+key+" is not defined");
    }
    Special.cache[key] = value;  // 更新缓存
    Storage.updateStorgae("special", key, value);  // 更新本地
};

Special.reset = function reset() {
    localStorage.special = JSON.stringify(Setting.default);
    Special.cache = JSON.parse(localStorage.special);
};

/*
初始化History部分，添加函数
*/
History.cache = JSON.parse(localStorage.history);

History.hasSite = function hasSite(url) {

};

History.addSite = function addSite() {

};

History.removeSite = function removeSite() {

};

History.updateSite = function updateSite() {

};



/*
 初始化Site部分，添加函数
 */
Site.cache = JSON.parse(localStorage.site);

Site.hasSite = function hasSite(url) {

};

Site.addSite = function addSite() {

};

Site.removeSite = function removeSite() {

};

Site.updateSite = function updateSite() {

};