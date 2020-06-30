"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("../binary");
const node_1 = require("../../../node");
class TwingNodeExpressionBinaryRange extends binary_1.TwingNodeExpressionBinary {
    constructor(nodes, lineno, columno) {
        super(nodes, lineno, columno);
        this.type = node_1.TwingNodeType.EXPRESSION_BINARY_RANGE;
    }
    compile(compiler) {
        compiler
            .raw('this.createRange(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
exports.TwingNodeExpressionBinaryRange = TwingNodeExpressionBinaryRange;
