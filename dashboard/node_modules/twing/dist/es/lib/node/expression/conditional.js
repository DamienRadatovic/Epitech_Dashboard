import { TwingNodeExpression } from "../expression";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionConditional extends TwingNodeExpression {
    constructor(expr1, expr2, expr3, lineno, columnno) {
        let nodes = new Map();
        nodes.set('expr1', expr1);
        nodes.set('expr2', expr2);
        nodes.set('expr3', expr3);
        super(nodes, new Map(), lineno, columnno);
        this.type = TwingNodeType.EXPRESSION_CONDITIONAL;
        this.addType(TwingNodeType.EXPRESSION_CONDITIONAL);
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
