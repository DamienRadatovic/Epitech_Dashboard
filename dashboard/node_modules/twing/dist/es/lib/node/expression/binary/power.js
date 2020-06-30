import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryPower extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('Math.pow(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
