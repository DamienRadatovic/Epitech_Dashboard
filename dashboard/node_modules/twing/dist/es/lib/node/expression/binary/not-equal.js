import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryNotEqual extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('!this.compare(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
