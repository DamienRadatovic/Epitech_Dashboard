import { TwingNodeExpression } from "../expression";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionUnary extends TwingNodeExpression {
    constructor(expr, lineno, columno) {
        let nodes = new Map();
        nodes.set('node', expr);
        super(nodes, new Map(), lineno, columno);
        this.type = TwingNodeType.EXPRESSION_UNARY;
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
