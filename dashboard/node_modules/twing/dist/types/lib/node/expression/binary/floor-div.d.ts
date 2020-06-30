import { TwingNodeExpressionBinaryDiv } from "./div";
import { TwingCompiler } from "../../../compiler";
export declare class TwingNodeExpressionBinaryFloorDiv extends TwingNodeExpressionBinaryDiv {
    compile(compiler: TwingCompiler): void;
    operator(compiler: TwingCompiler): TwingCompiler;
}
