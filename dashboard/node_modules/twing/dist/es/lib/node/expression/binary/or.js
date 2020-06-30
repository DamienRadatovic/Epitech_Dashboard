import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryOr extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('!!');
        super.compile(compiler);
    }
    operator(compiler) {
        return compiler.raw('||');
    }
}
