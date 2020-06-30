import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinarySub extends TwingNodeExpressionBinary {
    operator(compiler) {
        return compiler.raw('-');
    }
}
