import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryAnd extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('!!');
        super.compile(compiler);
    }
    operator(compiler) {
        return compiler.raw('&&');
    }
}
