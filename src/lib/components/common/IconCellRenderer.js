"use strict";
exports.__esModule = true;
exports.buildIconColDef = exports.IconCellRenderer = void 0;
var IconCellRenderer = /** @class */ (function () {
    function IconCellRenderer() {
    }
    // init method gets the details of the cell to be renderer
    IconCellRenderer.prototype.init = function (params) {
        this.params = params;
        this.eGui = document.createElement('div');
        this.eGui.innerHTML =
            "<svg width=\"1em\" height=\"1em\" stroke-width=\"0\" class=\"\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n       <g><path fill=\"none\" d=\"M0 0h24v24H0z\"></path>\n         ".concat(params.path.c, "\n       </g></svg>");
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
        this.eGui.addEventListener('click', this.btnClickedHandler);
    };
    IconCellRenderer.prototype.getGui = function () {
        return this.eGui;
    };
    IconCellRenderer.prototype.destroy = function () {
        this.eGui.removeEventListener('click', this.btnClickedHandler);
    };
    IconCellRenderer.prototype.btnClickedHandler = function (event) {
        this.params.onClick(this.params.data);
    };
    IconCellRenderer.prototype.refresh = function (params) {
        return false;
    };
    return IconCellRenderer;
}());
exports.IconCellRenderer = IconCellRenderer;
var buildIconColDef = function (icon, onClick) {
    return {
        hide: false,
        headerName: ' ',
        minWidth: 35,
        maxWidth: 35,
        flex: 3,
        cellStyle: { padding: '0.2rem 0.1rem 0 0.5rem' },
        cellRenderer: 'iconCellRenderer',
        cellRendererParams: {
            onClick: onClick,
            path: icon
        }
    };
};
exports.buildIconColDef = buildIconColDef;
