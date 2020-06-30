import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryDiv extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('/');
    }
}
