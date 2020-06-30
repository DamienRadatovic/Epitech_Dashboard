import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeInlinePrint extends TwingNode {
    constructor(node: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
