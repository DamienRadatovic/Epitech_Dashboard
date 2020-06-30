"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const node_1 = require("../../node");
class TwingNodeExpressionUnary extends expression_1.TwingNodeExpression {
    constructor(expr, lineno, columno) {
        let nodes = new Map();
        nodes.set('node', expr);
        super(nodes, new Map(), lineno, columno);
        this.type = node_1.TwingNodeType.EXPRESSION_UNARY;
    }
    compile(compiler) {
        this.operator(compiler);
        compiler
            .raw('(')
            .subcompile(this.getNode('node'))
            .raw(')');
    }
    operator(compiler) {
        return compiler;
    }
}
exports.TwingNodeExpressionUnary = TwingNodeExpressionUnary;
