import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryBitwiseAnd extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('&');
    }
}
