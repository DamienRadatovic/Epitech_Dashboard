import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeIf extends TwingNode {
    constructor(tests: TwingNode, elseNode: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
