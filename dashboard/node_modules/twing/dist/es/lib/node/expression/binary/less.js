import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryLess extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('<');
    }
}
