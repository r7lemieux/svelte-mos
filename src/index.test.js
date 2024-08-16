"use strict";
exports.__esModule = true;
var vitest_1 = require("vitest");
(0, vitest_1.describe)('sum test', function () {
    (0, vitest_1.it)('adds 1 + 2 to equal 3', function () {
        (0, vitest_1.expect)(1 + 2).toBe(3);
    });
});
