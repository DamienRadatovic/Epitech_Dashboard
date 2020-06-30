import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryMatches extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('this.parseRegExp(')
            .subcompile(this.getNode('right'))
            .raw(').test(')
            .subcompile(this.getNode('left'))
            .raw(')');
    }
}
