import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryBitwiseXor extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('^');
    }
}
