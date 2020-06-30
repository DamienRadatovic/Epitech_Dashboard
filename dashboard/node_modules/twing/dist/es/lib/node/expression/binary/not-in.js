import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryNotIn extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('!this.isIn(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
