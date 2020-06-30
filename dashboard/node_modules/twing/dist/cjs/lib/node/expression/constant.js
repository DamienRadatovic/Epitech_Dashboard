"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const node_1 = require("../../node");
class TwingNodeExpressionConstant extends expression_1.TwingNodeExpression {
    constructor(value, lineno, columnno) {
        super(new Map(), new Map([['value', value]]), lineno, columnno);
        this.type = node_1.TwingNodeType.EXPRESSION_CONSTANT;
    }
    compile(compiler) {
        compiler.repr(this.getAttribute('value'));
    }
}
exports.TwingNodeExpressionConstant = TwingNodeExpressionConstant;
