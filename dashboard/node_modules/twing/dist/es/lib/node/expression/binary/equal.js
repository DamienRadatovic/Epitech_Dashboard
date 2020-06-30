import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryEqual extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('this.compare(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
