import { TwingNodeExpression } from "../expression";
import { TwingNodeExpressionArray } from "./array";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionMethodCall extends TwingNodeExpression {
    constructor(node: TwingNodeExpression, method: string, methodArguments: TwingNodeExpressionArray, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
