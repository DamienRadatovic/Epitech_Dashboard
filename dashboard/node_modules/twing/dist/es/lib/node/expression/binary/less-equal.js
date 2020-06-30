import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryLessEqual extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('<=');
    }
}
