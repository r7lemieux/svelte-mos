"use strict";
exports.__esModule = true;
exports.getDocumentHeight = exports.extractViewMode = exports.sizeLabels = exports.computeHeight = void 0;
var computeHeight = function () { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight); };
exports.computeHeight = computeHeight;
var sizeLabels = function () {
    var elems = document.getElementsByTagName('label');
    for (var _i = 0, elems_1 = elems; _i < elems_1.length; _i++) {
        var elem = elems_1[_i];
        var txt = elem.innerText;
        var testElem = document.createElement('span');
        document.body.appendChild(testElem);
        testElem.innerText = txt;
        var fontStyle = window.getComputedStyle(elem, null).getPropertyValue('font');
        testElem.style.font = fontStyle;
        var textWidth = testElem.offsetWidth;
        var elemWidth = elem.offsetWidth;
        if (textWidth > elemWidth - 10) {
            var fontSizeStyle = window.getComputedStyle(elem, null).getPropertyValue('font-size');
            var fontSize = Number.parseInt(fontSizeStyle.match(/\d*/)[0]);
            elem.style.fontSize = "".concat(fontSize - 2, "px");
        }
        document.body.removeChild(testElem);
    }
};
exports.sizeLabels = sizeLabels;
function extractViewMode(page) {
    var pathParts = page.url.pathname.split('/');
    var pathTail = pathParts[pathParts.length - 1];
    if (pathTail === 'edit')
        return 'edit';
    if (pathTail === 'create')
        return 'create';
    return 'view';
}
exports.extractViewMode = extractViewMode;
var getDocumentHeight = function () { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight); };
exports.getDocumentHeight = getDocumentHeight;
