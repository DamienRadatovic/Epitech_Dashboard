import { TwingNodeExpression } from "../expression";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionGetAttr extends TwingNodeExpression {
    constructor(node: TwingNodeExpression, attribute: TwingNodeExpression, methodArguments: TwingNodeExpression, type: string, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
