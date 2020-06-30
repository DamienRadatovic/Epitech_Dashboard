"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unary_1 = require("../unary");
class TwingNodeExpressionUnaryNot extends unary_1.TwingNodeExpressionUnary {
    operator(compiler) {
        return compiler.raw('!');
    }
}
exports.TwingNodeExpressionUnaryNot = TwingNodeExpressionUnaryNot;
