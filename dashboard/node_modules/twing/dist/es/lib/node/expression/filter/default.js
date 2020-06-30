import { TwingNodeExpressionFilter } from "../filter";
import { TwingNode, TwingNodeType } from "../../../node";
import { TwingNodeExpressionConstant } from "../constant";
import { TwingNodeExpressionTestDefined } from "../test/defined";
import { TwingNodeExpressionConditional } from "../conditional";
export class TwingNodeExpressionFilterDefault extends TwingNodeExpressionFilter {
    constructor(node, filterName, methodArguments, lineno, columnno, tag = null) {
        let defaultNode = new TwingNodeExpressionFilter(node, new TwingNodeExpressionConstant('default', node.getTemplateLine(), node.getTemplateColumn()), methodArguments, node.getTemplateLine(), node.getTemplateColumn());
        if (filterName.getAttribute('value') === 'default' && (node.getType() === TwingNodeType.EXPRESSION_NAME || node.getType() === TwingNodeType.EXPRESSION_GET_ATTR)) {
            let test = new TwingNodeExpressionTestDefined(node.clone(), 'defined', new TwingNode(), node.getTemplateLine(), node.getTemplateColumn());
            let falseNode = methodArguments.getNodes().size ? methodArguments.getNode(0) : new TwingNodeExpressionConstant('', node.getTemplateLine(), node.getTemplateColumn());
            node = new TwingNodeExpressionConditional(test, defaultNode, falseNode, node.getTemplateLine(), node.getTemplateColumn());
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
