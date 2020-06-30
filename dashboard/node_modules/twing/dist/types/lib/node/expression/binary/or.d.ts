import { TwingNodeExpressionBinary } from "../binary";
import { TwingCompiler } from "../../../compiler";
export declare class TwingNodeExpressionBinaryOr extends TwingNodeExpressionBinary {
    compile(compiler: TwingCompiler): void;
    operator(compiler: TwingCompiler): TwingCompiler;
}
