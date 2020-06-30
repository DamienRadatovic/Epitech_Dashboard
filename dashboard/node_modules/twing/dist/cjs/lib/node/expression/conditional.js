"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const node_1 = require("../../node");
class TwingNodeExpressionConditional extends expression_1.TwingNodeExpression {
    constructor(expr1, expr2, expr3, lineno, columnno) {
        let nodes = new Map();
        nodes.set('expr1', expr1);
        nodes.set('expr2', expr2);
        nodes.set('expr3', expr3);
        super(nodes, new Map(), lineno, columnno);
        this.type = node_1.TwingNodeType.EXPRESSION_CONDITIONAL;
        this.addType(node_1.TwingNodeType.EXPRESSION_CONDITIONAL);
    }
    compile(compiler) {
        compiler
            .raw('((')
            .subcompile(this.getNode('expr1'))
            .raw(') ? (')
            .subcompile(this.getNode('expr2'))
            .raw(') : (')
            .subcompile(this.getNode('expr3'))
            .raw('))');
    }
}
exports.TwingNodeExpressionConditional = TwingNodeExpressionConditional;
