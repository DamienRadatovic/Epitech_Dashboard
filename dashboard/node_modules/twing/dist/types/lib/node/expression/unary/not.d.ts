import { TwingNodeExpressionUnary } from "../unary";
import { TwingCompiler } from "../../../compiler";
export declare class TwingNodeExpressionUnaryNot extends TwingNodeExpressionUnary {
    operator(compiler: TwingCompiler): TwingCompiler;
}
