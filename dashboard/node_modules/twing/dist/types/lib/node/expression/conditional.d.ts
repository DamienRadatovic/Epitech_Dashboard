import { TwingNodeExpression } from "../expression";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionConditional extends TwingNodeExpression {
    constructor(expr1: TwingNodeExpression, expr2: TwingNodeExpression, expr3: TwingNodeExpression, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
