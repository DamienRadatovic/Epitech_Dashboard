import { TwingNodeExpression } from "../expression";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionBinary extends TwingNodeExpression {
    constructor(nodes, lineno, columno) {
        super(new Map([
            ['left', nodes[0]],
            ['right', nodes[1]]
        ]), new Map(), lineno, columno);
        this.type = TwingNodeType.EXPRESSION_BINARY;
    }
    compile(compiler) {
        compiler
            .raw('(')
            .subcompile(this.getNode('left'))
            .raw(' ');
        this.operator(compiler);
        compiler
            .raw(' ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
    /**
     *
     * @param {TwingCompiler} compiler
     * @returns {TwingCompiler}
     */
    operator(compiler) {
        return compiler;
    }
}
