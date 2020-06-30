import { TwingNodeExpressionBinary } from "../binary";
import { TwingCompiler } from "../../../compiler";
export declare class TwingNodeExpressionBinaryAnd extends TwingNodeExpressionBinary {
    compile(compiler: TwingCompiler): void;
    operator(compiler: TwingCompiler): TwingCompiler;
}
