import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryGreater extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('>');
    }
}
