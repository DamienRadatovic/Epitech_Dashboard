"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("../filter");
const node_1 = require("../../../node");
const constant_1 = require("../constant");
const defined_1 = require("../test/defined");
const conditional_1 = require("../conditional");
class TwingNodeExpressionFilterDefault extends filter_1.TwingNodeExpressionFilter {
    constructor(node, filterName, methodArguments, lineno, columnno, tag = null) {
        let defaultNode = new filter_1.TwingNodeExpressionFilter(node, new constant_1.TwingNodeExpressionConstant('default', node.getTemplateLine(), node.getTemplateColumn()), methodArguments, node.getTemplateLine(), node.getTemplateColumn());
        if (filterName.getAttribute('value') === 'default' && (node.getType() === node_1.TwingNodeType.EXPRESSION_NAME || node.getType() === node_1.TwingNodeType.EXPRESSION_GET_ATTR)) {
            let test = new defined_1.TwingNodeExpressionTestDefined(node.clone(), 'defined', new node_1.TwingNode(), node.getTemplateLine(), node.getTemplateColumn());
            let falseNode = methodArguments.getNodes().size ? methodArguments.getNode(0) : new constant_1.TwingNodeExpressionConstant('', node.getTemplateLine(), node.getTemplateColumn());
            node = new conditional_1.TwingNodeExpressionConditional(test, defaultNode, falseNode, node.getTemplateLine(), node.getTemplateColumn());
        }
        else {
            node = defaultNode;
        }
        super(node, filterName, methodArguments, lineno, columnno, tag);
    }
    compile(compiler) {
        compiler.subcompile(this.getNode('node'));
    }
}
exports.TwingNodeExpressionFilterDefault = TwingNodeExpressionFilterDefault;
