import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryBitwiseOr extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('|');
    }
}
