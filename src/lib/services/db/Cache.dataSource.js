"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CacheDataSource = void 0;
var db_service_1 = require("$lib/services/db/db.service");
var rezult_1 = require("$lib/services/common/message/rezult");
var errorName_1 = require("$lib/services/common/message/errorName");
var CacheDataSource = /** @class */ (function () {
    function CacheDataSource(moDef) {
        var _this = this;
        this.records = new Map();
        this.db = new db_service_1.DbService();
        this.getMo = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var mo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.records.has(id)) return [3 /*break*/, 1];
                        return [2 /*return*/, this.records.get(id)];
                    case 1: return [4 /*yield*/, this.db.getMo(this.moDef, id)];
                    case 2:
                        mo = _a.sent();
                        if (mo) {
                            this.records.set(id, mo);
                        }
                        return [2 /*return*/, mo];
                }
            });
        }); };
        this.saveMo = function (mo) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!mo)
                    throw new rezult_1.Rezult(errorName_1.ErrorName.missing_param);
                return [2 /*return*/, this.db.saveMo(mo)
                        .then(function (mo) {
                        if (mo) {
                            _this.records.set(mo.id, mo);
                        }
                        return mo;
                    })];
            });
        }); };
        this.updateMo = function (mo) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!mo)
                    throw new rezult_1.Rezult(errorName_1.ErrorName.missing_param);
                return [2 /*return*/, this.db.updateMo(mo)
                        .then(function (mo) {
                        if (mo) {
                            _this.records.set(mo.id, mo);
                        }
                        return mo;
                    })];
            });
        }); };
        this.addMo = function (mo) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!mo)
                    throw new rezult_1.Rezult(errorName_1.ErrorName.missing_param);
                return [2 /*return*/, this.db.addMo(mo)
                        .then(function (mo) {
                        if (mo) {
                            _this.records.set(mo.id, mo);
                        }
                        return mo;
                    })];
            });
        }); };
        this.getMos = function () { return __awaiter(_this, void 0, void 0, function () {
            var mos, _i, mos_1, mo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.getMos(this.moDef)];
                    case 1:
                        mos = _a.sent();
                        if (mos) {
                            for (_i = 0, mos_1 = mos; _i < mos_1.length; _i++) {
                                mo = mos_1[_i];
                                this.records.set(mo.id, mo);
                            }
                        }
                        return [2 /*return*/, mos];
                }
            });
        }); };
        this.saveMos = function (givenMos) { return __awaiter(_this, void 0, void 0, function () {
            var savedMos, _i, savedMos_1, mo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.saveMos(givenMos)];
                    case 1:
                        savedMos = _a.sent();
                        for (_i = 0, savedMos_1 = savedMos; _i < savedMos_1.length; _i++) {
                            mo = savedMos_1[_i];
                            this.records.set(mo.id, mo);
                        }
                        return [2 /*return*/, savedMos];
                }
            });
        }); };
        this.deleteMo = function (id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.deleteMo(id)];
                    case 1:
                        _a.sent();
                        this.records["delete"](id);
                        return [2 /*return*/];
                }
            });
        }); };
        this.moDef = moDef;
    }
    return CacheDataSource;
}());
exports.CacheDataSource = CacheDataSource;
