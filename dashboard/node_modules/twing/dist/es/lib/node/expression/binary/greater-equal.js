import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryGreaterEqual extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('>=');
    }
}
