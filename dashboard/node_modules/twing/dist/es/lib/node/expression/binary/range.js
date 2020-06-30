import { TwingNodeExpressionBinary } from "../binary";
import { TwingNodeType } from "../../../node";
export class TwingNodeExpressionBinaryRange extends TwingNodeExpressionBinary {
    constructor(nodes, lineno, columno) {
        super(nodes, lineno, columno);
        this.type = TwingNodeType.EXPRESSION_BINARY_RANGE;
    }
    compile(compiler) {
        compiler
            .raw('this.createRange(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
