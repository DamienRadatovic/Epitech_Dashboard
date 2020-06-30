import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryAdd extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('+');
    }
}
