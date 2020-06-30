import { TwingNodeExpressionCall } from "./call";
import { TwingNode } from "../../node";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionTest extends TwingNodeExpressionCall {
    constructor(node: TwingNode, name: string | TwingNode, nodeArguments: TwingNode, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
