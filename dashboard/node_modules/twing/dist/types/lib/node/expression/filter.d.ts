import { TwingNode } from "../../node";
import { TwingNodeExpressionConstant } from "./constant";
import { TwingNodeExpressionCall } from "./call";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionFilter extends TwingNodeExpressionCall {
    constructor(node: TwingNode, filterName: TwingNodeExpressionConstant, methodArguments: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
