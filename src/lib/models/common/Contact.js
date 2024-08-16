"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.contactMoMeta = exports.Contact = void 0;
var Mo_1 = require("$lib/models/managedObjects/Mo");
var MoDefinition_1 = require("$lib/models/managedObjects/MoDefinition");
var MoDefinitions_1 = require("$lib/models/managedObjects/MoDefinitions");
var index_1 = require("$lib/models/index");
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact(props) {
        var _this = _super.call(this, exports.contactMoMeta) || this;
        Object.assign(_this, props);
        return _this;
    }
    return Contact;
}(Mo_1.Mo));
exports.Contact = Contact;
var contactMoDef = MoDefinition_1.MoDefinition.fromProps({
    hasId: false,
    name: 'contacts',
    id: 'contacts',
    keyFieldnames: ['phone', 'email'],
    gridFieldnames: ['firstName', 'lastName', 'phone']
});
contactMoDef.moMeta = MoDefinition_1.moDefMeta;
contactMoDef.moClass = Contact;
contactMoDef.initFieldDefs();
(0, MoDefinitions_1.registerMoDef)(contactMoDef);
exports.contactMoMeta = new index_1.MoMeta(contactMoDef);
