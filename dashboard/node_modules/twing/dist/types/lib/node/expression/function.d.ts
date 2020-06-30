import { TwingNode } from "../../node";
import { TwingNodeExpressionCall } from "./call";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionFunction extends TwingNodeExpressionCall {
    constructor(name: string, functionArguments: TwingNode, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
