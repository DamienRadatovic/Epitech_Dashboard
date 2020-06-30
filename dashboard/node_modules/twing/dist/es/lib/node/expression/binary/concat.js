import { TwingNodeExpressionBinary } from "../binary";
import { TwingNodeType } from "../../../node";
export class TwingNodeExpressionBinaryConcat extends TwingNodeExpressionBinary {
    constructor(nodes, lineno, columno) {
        super(nodes, lineno, columno);
        this.type = TwingNodeType.EXPRESSION_BINARY_CONCAT;
    }
    compile(compiler) {
        compiler
            .raw('(this.concatenate(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw('))');
    }
}
