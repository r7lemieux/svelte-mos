"use strict";
exports.__esModule = true;
exports.BtnCellRenderer = void 0;
var BtnCellRenderer = /** @class */ (function () {
    function BtnCellRenderer() {
    }
    // init method gets the details of the cell to be renderer
    BtnCellRenderer.prototype.init = function (params) {
        this.params = params;
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = params.buildHtml ? params.buildHtml(params.value) : params.value,
            this.btnClickedHandler = this.btnClickedHandler.bind(this);
        this.eGui.addEventListener('click', this.btnClickedHandler);
    };
    BtnCellRenderer.prototype.getGui = function () {
        return this.eGui;
    };
    BtnCellRenderer.prototype.destroy = function () {
        this.eGui.removeEventListener('click', this.btnClickedHandler);
    };
    BtnCellRenderer.prototype.btnClickedHandler = function (event) {
        this.params.clicked(this.params.data.id);
    };
    BtnCellRenderer.prototype.refresh = function (params) {
        return false;
    };
    return BtnCellRenderer;
}());
exports.BtnCellRenderer = BtnCellRenderer;
