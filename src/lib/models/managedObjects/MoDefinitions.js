"use strict";
exports.__esModule = true;
exports.getMoDef = exports.registerMoDef = exports.getUiMoDef = exports.UiMoDefs = void 0;
var MoDefinition_1 = require("$lib/models/managedObjects/MoDefinition");
var FieldDefinitionMo_1 = require("$lib/models/fields/FieldDefinitionMo");
exports.UiMoDefs = {};
var getUiMoDef = function (moDef) {
    var uiMoDef = new MoDefinition_1.MoDefinition(moDef.name);
    Object.assign(uiMoDef, moDef);
    uiMoDef.fieldDefs = new Map();
    for (var _i = 0, _a = (Array.from(moDef.fieldDefs.values())); _i < _a.length; _i++) {
        var fieldDef = _a[_i];
        var uiFieldDef = new FieldDefinitionMo_1.FieldDefinitionMo(fieldDef);
        uiMoDef.fieldDefs.set(fieldDef.name, uiFieldDef);
    }
    return moDef;
};
exports.getUiMoDef = getUiMoDef;
var registerMoDef = function (moDef) {
    var _a;
    (_a = MoDefinition_1.moDefMeta.dataSource) === null || _a === void 0 ? void 0 : _a.saveMo(moDef);
};
exports.registerMoDef = registerMoDef;
var getMoDef = function (moname) {
    var _a;
    return (_a = MoDefinition_1.moDefMeta.dataSource) === null || _a === void 0 ? void 0 : _a.getMo(moname).then(function (mo) {
        return mo;
    });
};
exports.getMoDef = getMoDef;
