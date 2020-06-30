import { TwingNodeExpressionConditional } from "./conditional";
import { TwingNode } from "../../node";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionNullCoalesce extends TwingNodeExpressionConditional {
    constructor(nodes: [TwingNode, TwingNode], lineno: number, columno: number);
    compile(compiler: TwingCompiler): void;
}
