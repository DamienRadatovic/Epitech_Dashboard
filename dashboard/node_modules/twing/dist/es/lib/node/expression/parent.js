import { TwingNodeExpression } from "../expression";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionParent extends TwingNodeExpression {
    constructor(name, lineno) {
        let attributes = new Map();
        attributes.set('output', false);
        attributes.set('name', name);
        super(new Map(), attributes, lineno);
        this.type = TwingNodeType.EXPRESSION_PARENT;
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
