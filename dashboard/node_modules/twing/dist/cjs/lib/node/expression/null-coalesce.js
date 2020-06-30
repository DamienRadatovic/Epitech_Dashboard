"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conditional_1 = require("./conditional");
const defined_1 = require("./test/defined");
const not_1 = require("./unary/not");
const node_1 = require("../../node");
const and_1 = require("./binary/and");
const test_1 = require("./test");
class TwingNodeExpressionNullCoalesce extends conditional_1.TwingNodeExpressionConditional {
    constructor(nodes, lineno, columno) {
        let left = nodes[0];
        let right = nodes[1];
        let test = new and_1.TwingNodeExpressionBinaryAnd([
            new defined_1.TwingNodeExpressionTestDefined(left.clone(), 'defined', new node_1.TwingNode(), left.getTemplateLine(), left.getTemplateColumn()),
            new not_1.TwingNodeExpressionUnaryNot(new test_1.TwingNodeExpressionTest(left, 'null', new node_1.TwingNode(), left.getTemplateLine(), left.getTemplateColumn()), left.getTemplateLine(), left.getTemplateColumn())
        ], left.getTemplateLine(), left.getTemplateColumn());
        super(test, left, right, lineno, columno);
        this.type = node_1.TwingNodeType.EXPRESSION_NULL_COALESCE;
    }
    compile(compiler) {
        if (this.getNode('expr2').getType() === node_1.TwingNodeType.EXPRESSION_NAME) {
            this.getNode('expr2').setAttribute('always_defined', true);
        }
        return super.compile(compiler);
    }
}
exports.TwingNodeExpressionNullCoalesce = TwingNodeExpressionNullCoalesce;
