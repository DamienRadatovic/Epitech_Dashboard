import { TwingNodeExpression } from "../expression";
import { TwingNode } from "../../node";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionConstant extends TwingNodeExpression {
    constructor(value: TwingNode | string | number | boolean, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
