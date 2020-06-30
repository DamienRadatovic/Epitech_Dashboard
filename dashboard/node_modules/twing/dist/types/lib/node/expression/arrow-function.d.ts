import { TwingNodeExpression } from "../expression";
import { TwingCompiler } from "../../compiler";
import { TwingNode } from "../../node";
/**
 * Represents an arrow function.
 */
export declare class TwingNodeExpressionArrowFunction extends TwingNodeExpression {
    constructor(expr: TwingNodeExpression, names: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
