import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryMul extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('*');
    }
}
