"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../test");
const node_1 = require("../../../node");
const constant_1 = require("../constant");
const syntax_1 = require("../../../error/syntax");
/**
 * Checks if a variable is defined in the active context.
 *
 * <pre>
 * {# defined works with variable names and variable attributes #}
 * {% if foo is defined %}
 *     {# ... #}
 * {% endif %}
 * </pre>
 */
class TwingNodeExpressionTestDefined extends test_1.TwingNodeExpressionTest {
    constructor(node, name, nodeArguments, lineno, columnno) {
        let changeIgnoreStrictCheck = false;
        let error = null;
        if (node.getType() === node_1.TwingNodeType.EXPRESSION_NAME) {
            node.setAttribute('is_defined_test', true);
        }
        else if (node.getType() === node_1.TwingNodeType.EXPRESSION_GET_ATTR) {
            node.setAttribute('is_defined_test', true);
            changeIgnoreStrictCheck = true;
        }
        else if (node.getType() === node_1.TwingNodeType.EXPRESSION_BLOCK_REFERENCE) {
            node.setAttribute('is_defined_test', true);
        }
        else if (node.getType() === node_1.TwingNodeType.EXPRESSION_FUNCTION && (node.getAttribute('name') === 'constant')) {
            node.setAttribute('is_defined_test', true);
        }
        else if (node.getType() === node_1.TwingNodeType.EXPRESSION_CONSTANT || node.getType() === node_1.TwingNodeType.EXPRESSION_ARRAY) {
            node = new constant_1.TwingNodeExpressionConstant(true, node.getTemplateLine(), node.getTemplateColumn());
        }
        else if (node.getType() === node_1.TwingNodeType.EXPRESSION_METHOD_CALL) {
            node.setAttribute('is_defined_test', true);
        }
        else {
            error = 'The "defined" test only works with simple variables.';
        }
        super(node, name, nodeArguments, lineno, columnno);
        if (changeIgnoreStrictCheck) {
            this.changeIgnoreStrictCheck(node);
        }
        if (error) {
            throw new syntax_1.TwingErrorSyntax(error, this.getTemplateLine());
        }
    }
    changeIgnoreStrictCheck(node) {
        node.setAttribute('optimizable', false);
        node.setAttribute('ignore_strict_check', true);
        let exprNode = node.getNode('node');
        if (exprNode.getType() === node_1.TwingNodeType.EXPRESSION_GET_ATTR) {
            this.changeIgnoreStrictCheck(exprNode);
        }
    }
    compile(compiler) {
        compiler.subcompile(this.getNode('node'));
    }
}
exports.TwingNodeExpressionTestDefined = TwingNodeExpressionTestDefined;
