"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("../binary");
class TwingNodeExpressionBinaryMul extends binary_1.TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('*');
    }
}
exports.TwingNodeExpressionBinaryMul = TwingNodeExpressionBinaryMul;
