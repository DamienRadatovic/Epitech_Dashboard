import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryMod extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('%');
    }
}
