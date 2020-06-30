"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("../binary");
class TwingNodeExpressionBinaryLessEqual extends binary_1.TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('<=');
    }
}
exports.TwingNodeExpressionBinaryLessEqual = TwingNodeExpressionBinaryLessEqual;
