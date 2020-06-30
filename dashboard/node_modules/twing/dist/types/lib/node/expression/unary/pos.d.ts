import { TwingNodeExpressionUnary } from "../unary";
import { TwingCompiler } from "../../../compiler";
import { TwingNode } from "../../../node";
export declare class TwingNodeExpressionUnaryPos extends TwingNodeExpressionUnary {
    constructor(expr: TwingNode, lineno: number, columno: number);
    operator(compiler: TwingCompiler): TwingCompiler;
}
