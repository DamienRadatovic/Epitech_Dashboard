"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const node_1 = require("../../node");
class TwingNodeExpressionParent extends expression_1.TwingNodeExpression {
    constructor(name, lineno) {
        let attributes = new Map();
        attributes.set('output', false);
        attributes.set('name', name);
        super(new Map(), attributes, lineno);
        this.type = node_1.TwingNodeType.EXPRESSION_PARENT;
    }
    compile(compiler) {
        let name = this.getAttribute('name');
        if (this.getAttribute('output')) {
            compiler
                .write(`await this.traceableDisplayParentBlock(${this.getTemplateLine()}, this.getSourceContext())(`)
                .string(name)
                .raw(", context, blocks);\n");
        }
        else {
            compiler
                .raw(`this.traceableRenderParentBlock(${this.getTemplateLine()}, this.getSourceContext())(`)
                .string(name)
                .raw(', context, blocks)');
        }
    }
}
exports.TwingNodeExpressionParent = TwingNodeExpressionParent;
